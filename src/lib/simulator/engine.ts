// src/lib/simulator/engine.ts
import { SimulatorState, PlacedIC } from "@/types";
import { simulate7483 } from "@/lib/experiments/exp04-full-adder/logic";

const IC_SIMULATORS: Record<string, (ic: PlacedIC) => PlacedIC> = {
  "7483": simulate7483,
};

export function runSimulation(state: SimulatorState): SimulatorState {
  let { placedICs, leds } = state;

  // Auto-connect power pins for all placed ICs
  placedICs = placedICs.map((ic) => ({
    ...ic,
    pinValues: { ...ic.pinValues, VCC: 1 as 0|1, GND: 0 as 0|1 },
  }));

  // ── Auto-connect VCC=1 GND=0 for all placed ICs ─────────────────────
  placedICs = placedICs.map((ic) => ({
    ...ic,
    pinValues: { ...ic.pinValues, VCC: 1 as 0|1, GND: 0 as 0|1 },
  }));
  const { wires, switches } = state;

  // ── Step 1: Propagate switch → IC input pins via wires ───────────────
  placedICs = placedICs.map((ic) => {
    const updatedPinValues = { ...ic.pinValues };
    wires.forEach((wire) => {
      if (
        wire.from.terminalType === "switch" &&
        wire.to.terminalType === "ic" &&
        wire.to.instanceId === ic.instanceId
      ) {
        const sw = switches.find((s) => s.id === wire.from.instanceId);
        if (sw) updatedPinValues[wire.to.pinId] = sw.value;
      }
      if (
        wire.to.terminalType === "switch" &&
        wire.from.terminalType === "ic" &&
        wire.from.instanceId === ic.instanceId
      ) {
        const sw = switches.find((s) => s.id === wire.to.instanceId);
        if (sw) updatedPinValues[wire.from.pinId] = sw.value;
      }
    });
    return { ...ic, pinValues: updatedPinValues };
  });

  // ── Step 2: Run IC logic ─────────────────────────────────────────────
  placedICs = placedICs.map((ic) => {
    const simulator = IC_SIMULATORS[ic.icId];
    if (!simulator) return ic;
    return simulator(ic);
  });

  // ── Step 3: Propagate IC output → LEDs via wires ────────────────────
  leds = leds.map((led) => {
    const wire = wires.find(
      (w) =>
        (w.from.terminalType === "ic" &&
          w.to.terminalType === "led" &&
          w.to.instanceId === led.id) ||
        (w.to.terminalType === "ic" &&
          w.from.terminalType === "led" &&
          w.from.instanceId === led.id),
    );
    if (!wire) return { ...led, value: 0 as 0 | 1 };
    const icTerminal = wire.from.terminalType === "ic" ? wire.from : wire.to;
    const ic = placedICs.find((i) => i.instanceId === icTerminal.instanceId);
    if (!ic) return { ...led, value: 0 as 0 | 1 };
    return { ...led, value: (ic.pinValues[icTerminal.pinId] ?? 0) as 0 | 1 };
  });

  return { placedICs, wires, switches, leds, pendingWire: state.pendingWire };
}
