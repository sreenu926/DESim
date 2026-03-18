// src/lib/simulator/engine.ts
import { SimulatorState, PlacedIC, WireTerminal } from '@/types';
import { ICDefinition } from "@/types";
import { IC_7483 } from "@/lib/experiments/exp04-full-adder/ics";
import { IC_7408, IC_7432, IC_7404, IC_7400, IC_7402, IC_7486, IC_7466 } from "@/lib/experiments/exp01-logic-gates/ics";

const IC_DEFS: Record<string, ICDefinition> = {
  "7483": IC_7483, "7408": IC_7408, "7432": IC_7432, "7404": IC_7404,
  "7400": IC_7400, "7402": IC_7402, "7486": IC_7486, "7466": IC_7466,
};
import { simulate7483 } from '@/lib/experiments/exp04-full-adder/logic';
import { simulate7408, simulate7432, simulate7404, simulate7400, simulate7402, simulate7486, simulate7466 } from '@/lib/experiments/exp01-logic-gates/logic';

const IC_SIMULATORS: Record<string, (ic: PlacedIC) => PlacedIC> = {
  '7483': simulate7483,
  '7408': simulate7408,
  '7432': simulate7432,
  '7404': simulate7404,
  '7400': simulate7400,
  '7402': simulate7402,
  '7486': simulate7486,
  '7466': simulate7466,
};

// ── Output pin registry ───────────────────────────────────────────────────────
const IC_OUTPUT_PINS: Record<string, string[]> = {
  '7483': ['S1','S2','S3','S4','COUT'],
  '7408': ['Y1','Y2','Y3','Y4'],
  '7432': ['Y1','Y2','Y3','Y4'],
  '7404': ['Y1','Y2','Y3','Y4','Y5','Y6'],
  '7400': ['Y1','Y2','Y3','Y4'],
  '7402': ['Y1','Y2','Y3','Y4'],
  '7486': ['Y1','Y2','Y3','Y4'],
  '7466': ['Y1','Y2','Y3','Y4'],
};

function isOutputPin(ic: PlacedIC, pinId: string): boolean {
  return (IC_OUTPUT_PINS[ic.icId] || []).includes(pinId);
}

// ── Node key helpers ──────────────────────────────────────────────────────────
function getNodeKey(t: WireTerminal): string {
    const parts = t.instanceId.split('-');
    // row+col = unique point
    // Rows a-e are top half, f-j are bottom half
    // All holes in same row are internally connected
    return 'hole:' + t.instanceId;
  }
  return t.terminalType + ':' + t.instanceId + ':' + t.pinId;
}

function parseNodeKey(key: string): WireTerminal {
  const [terminalType, instanceId, pinId] = key.split(':');
  return { terminalType: terminalType as WireTerminal['terminalType'], instanceId, pinId };
}

// ── Build adjacency graph ─────────────────────────────────────────────────────
function buildGraph(wires: SimulatorState["wires"], placedICs: PlacedIC[]): Map<string, Set<string>> {
  const graph = new Map<string, Set<string>>();
  const addEdge = (a: string, b: string) => {
    if (!graph.has(a)) graph.set(a, new Set());
    if (!graph.has(b)) graph.set(b, new Set());
    graph.get(a)!.add(b);
    graph.get(b)!.add(a);
  };
  for (const wire of wires) {
    addEdge(getNodeKey(wire.from), getNodeKey(wire.to));
  }
  // Inject IC pin <-> breadboard hole connections
  for (const ic of placedICs) {
    const def = IC_DEFS[ic.icId];
    if (!def) continue;
    for (const pin of def.pins) {
      const col = ic.col + pin.index;
      const row = pin.side === "top" ? "e" : "f";
      const icKey = "ic:" + ic.instanceId + ":" + pin.id;
      const holeKey = "hole:hole-" + row + "-" + col;
      addEdge(icKey, holeKey);
    }
  }
  return graph;
}

// ── Find connected components via BFS ────────────────────────────────────────
function findNets(graph: Map<string, Set<string>>): string[][] {
  const visited = new Set<string>();
  const nets: string[][] = [];
  for (const node of Array.from(graph.keys())) {
    if (visited.has(node)) continue;
    const queue = [node];
    const net: string[] = [];
    while (queue.length) {
      const curr = queue.pop()!;
      if (visited.has(curr)) continue;
      visited.add(curr);
      net.push(curr);
      for (const nei of Array.from(graph.get(curr) || [])) {
        if (!visited.has(nei)) queue.push(nei);
      }
    }
    nets.push(net);
  }
  return nets;
}

// ── Resolve net signal: IC outputs > switches ─────────────────────────────────
function resolveNetValue(
  net: string[],
  switches: SimulatorState['switches'],
  placedICs: PlacedIC[],
): 0 | 1 | null {

  // Priority 1: IC output pins (highest priority — driven)
  for (const key of net) {
    const t = parseNodeKey(key);
    if (t.terminalType === 'ic') {
      const ic = placedICs.find(i => i.instanceId === t.instanceId);
      if (ic && isOutputPin(ic, t.pinId)) {
        const v = ic.pinValues[t.pinId];
        if (v !== undefined) return v as 0 | 1;
      }
    }
  }

  // Priority 2: Switch sources
  for (const key of net) {
    const t = parseNodeKey(key);
    if (t.terminalType === 'switch' && !t.instanceId.startsWith('hole-')) {
      const sw = switches.find(s => s.id === t.instanceId);
      if (sw !== undefined) return sw.value;
    }
  }

  return null;
}

// ── Main simulation engine ────────────────────────────────────────────────────
export function runSimulation(state: SimulatorState): SimulatorState {
  let { placedICs, leds } = state;
  const { wires, switches } = state;

  // Auto-connect VCC=1 GND=0
  placedICs = placedICs.map(ic => ({
    ...ic,
    pinValues: { ...ic.pinValues, VCC: 1 as 0|1, GND: 0 as 0|1 },
  }));
  const graph = buildGraph(wires, placedICs);

  const nets  = findNets(graph);

  // ── Pass 1: Apply switch signals to IC input pins ─────────────────────
  placedICs = placedICs.map(ic => {
    const updatedPinValues = { ...ic.pinValues };
    nets.forEach(net => {
      // Find switch value in this net
      let switchValue: 0 | 1 | null = null;
      for (const key of net) {
        const t = parseNodeKey(key);
        if (t.terminalType === 'switch' && !t.instanceId.startsWith('hole-')) {
          const sw = switches.find(s => s.id === t.instanceId);
          if (sw !== undefined) { switchValue = sw.value; break; }
        }
      }
      if (switchValue === null) return;
      // Apply to IC input pins in this net
      for (const key of net) {
        const t = parseNodeKey(key);
        if (t.terminalType === 'ic' &&
            t.instanceId === ic.instanceId &&
            !isOutputPin(ic, t.pinId)) {
          updatedPinValues[t.pinId] = switchValue!;
        }
      }
    });
    return { ...ic, pinValues: updatedPinValues };
  });

  // ── Pass 2: Run IC logic ──────────────────────────────────────────────
  placedICs = placedICs.map(ic => {
    const simulator = IC_SIMULATORS[ic.icId];
    if (!simulator) return ic;
    return simulator(ic);
  });

  // ── Pass 3: Resolve all net signals with IC outputs ───────────────────
  const netSignals = new Map<string, 0 | 1>();
  nets.forEach(net => {
    const value = resolveNetValue(net, switches, placedICs);
    if (value !== null) {
      net.forEach(key => netSignals.set(key, value));
    }
  });

  // ── Pass 4: Update LED values ─────────────────────────────────────────
  leds = leds.map(led => {
    const key = getNodeKey({ terminalType: 'led', instanceId: led.id, pinId: 'in' });
    const value = netSignals.get(key);
    return { ...led, value: (value ?? 0) as 0 | 1 };
  });

  return { placedICs, wires, switches, leds, pendingWire: state.pendingWire };
}
