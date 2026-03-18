// src/app/experiment/[id]/page.tsx
"use client";
import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { SimulatorState, WireTerminal, Wire, PlacedIC } from "@/types";
import { getExperiment } from "@/lib/experiments";
import { runSimulation } from "@/lib/simulator";
import { IC_7483 } from "@/lib/experiments/exp04-full-adder";
import { IC_7408, IC_7432, IC_7404, IC_7400, IC_7402, IC_7486, IC_7466 } from "@/lib/experiments/exp01-logic-gates";

import dynamic from 'next/dynamic';

const BreadboardCanvas = dynamic(
  () => import('@/components/simulator/BreadboardCanvas'),
  { ssr: false, loading: () => <div className='flex-1 bg-amber-900' /> }
);
const IC_DEFINITIONS: Record<string, import('@/types').ICDefinition> = {
  '7483': IC_7483,
  '7408': IC_7408,
  '7432': IC_7432,
  '7404': IC_7404,
  '7400': IC_7400,
  '7402': IC_7402,
  '7486': IC_7486,
  '7466': IC_7466,
};

const HEADER_H = 56;
const TOOLBAR_H = 48;

function buildInitialState(
  experiment: ReturnType<typeof getExperiment>,
): SimulatorState {
  if (!experiment) throw new Error("No experiment");
  return {
    placedICs: [],
    wires: [],
    switches: experiment.defaultSwitches.map((s) => ({ ...s })),
    leds: experiment.defaultLEDs.map((l) => ({ ...l })),
    pendingWire: null,
  };
}

export default function ExperimentPage() {
  const params = useParams();
  const id = params.id as string;
  const experiment = getExperiment(id);
  const [state, setState] = useState<SimulatorState | null>(null);

  useEffect(() => {
    if (!experiment) return;
    setState(runSimulation(buildInitialState(experiment)));
  }, [experiment]);

  const handleToggleSwitch = useCallback((switchId: string) => {
    setState((prev) => {
      if (!prev) return prev;
      return runSimulation({
        ...prev,
        switches: prev.switches.map((sw) =>
          sw.id === switchId ? { ...sw, value: sw.value === 0 ? 1 : 0 } : sw,
        ),
      });
    });
  }, []);

  const handlePinClick = useCallback(
    (terminal: WireTerminal, x: number, y: number) => {
      setState((prev) => {
        if (!prev) return prev;
        if (!prev.pendingWire) {
          return {
            ...prev,
            pendingWire: { from: terminal, fromX: x, fromY: y, toX: x, toY: y },
          };
        }
        const from = prev.pendingWire.from;
        if (
          from.instanceId === terminal.instanceId &&
          from.pinId === terminal.pinId
        ) {
          return { ...prev, pendingWire: null };
        }
        const newWire: Wire = {
          id: `wire-${Date.now()}`,
          from,
          to: terminal,
        };
        return runSimulation({
          ...prev,
          wires: [...prev.wires, newWire],
          pendingWire: null,
        });
      });
    },
    [],
  );

  const handleCancelWire = useCallback(() => {
    setState((prev) => {
      if (!prev || !prev.pendingWire) return prev;
      return { ...prev, pendingWire: null };
    });
  }, []);

  const handleMouseMove = useCallback((x: number, y: number) => {
    setState((prev) => {
      if (!prev || !prev.pendingWire) return prev;
      return { ...prev, pendingWire: { ...prev.pendingWire, toX: x, toY: y } };
    });
  }, []);

  const handleDeleteWire = useCallback((wireId: string) => {
    setState((prev) => {
      if (!prev) return prev;
      return runSimulation({
        ...prev,
        wires: prev.wires.filter((w) => w.id !== wireId),
      });
    });
  }, []);

  const handleAddIC = useCallback((icId: string) => {
    setState((prev) => {
      if (!prev) return prev;
      const definition = IC_DEFINITIONS[icId as keyof typeof IC_DEFINITIONS];
      if (!definition) return prev;
      const instanceId = `${icId}-${Date.now()}`;
      const newIC: PlacedIC = {
        instanceId,
        icId,
        col: 10,
        pinValues: Object.fromEntries(
          definition.pins.map((p) => [p.id, 0 as 0 | 1]),
        ),
      };
      newIC.pinValues["VCC"] = 1;
      return runSimulation({ ...prev, placedICs: [...prev.placedICs, newIC] });
    });
  }, []);

  const handleMoveIC = useCallback((instanceId: string, col: number) => {
    setState((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        placedICs: prev.placedICs.map((ic) =>
          ic.instanceId === instanceId ? { ...ic, col } : ic,
        ),
      };
    });
  }, []);

  const handleReset = useCallback(() => {
    if (!experiment) return;
    setState(runSimulation(buildInitialState(experiment)));
  }, [experiment]);

  if (!experiment) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <p className="text-white text-xl">Experiment not found.</p>
      </div>
    );
  }

  if (!state) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <p className="text-white text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-900 overflow-hidden">
      {/* ── Header ──────────────────────────────────────────────────── */}
      <div
        className="flex items-center justify-between px-6 bg-blue-900 border-b border-blue-700"
        style={{ height: HEADER_H }}
      >
        <h1 className="text-white font-bold text-lg">
          Exp {experiment.meta.number}: {experiment.meta.title}
        </h1>
        <a
          href="/"
          className="text-sm text-blue-300 hover:text-blue-200 transition"
        >
          ← Back
        </a>
      </div>

      {/* ── Toolbar ─────────────────────────────────────────────────── */}
      <div
        className="flex items-center gap-3 px-4 bg-blue-800 border-b border-blue-600"
        style={{ height: TOOLBAR_H }}
      >
        <span className="text-blue-200 text-xs font-bold uppercase tracking-wider">
          Components:
        </span>
        {experiment.meta.icsRequired.map((icId) => (
          <button
            key={icId}
            onClick={() => handleAddIC(icId)}
            className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded border border-gray-500 transition"
          >
            + IC {icId}
          </button>
        ))}
        <div className="flex-1" />
        {state.pendingWire && (
          <span className="text-yellow-300 text-xs animate-pulse">
            ✦ Click a pin to complete wire · ESC to cancel
          </span>
        )}
        <span className="text-blue-300 text-xs">
          Wires: {state.wires.length} · ICs: {state.placedICs.length}
        </span>
        <button
          onClick={handleReset}
          className="px-3 py-1 bg-red-700 hover:bg-red-600 text-white text-sm rounded transition"
        >
          Reset
        </button>
      </div>

      {/* ── Simulator ───────────────────────────────────────────────── */}
      <div className="flex-1 overflow-hidden">
        <BreadboardCanvas
          state={state}
          icDefinitions={IC_DEFINITIONS}
          onToggleSwitch={handleToggleSwitch}
          onPinClick={handlePinClick}
          onDeleteWire={handleDeleteWire}
          onAddIC={handleAddIC}
          onMoveIC={handleMoveIC}
          onCancelWire={handleCancelWire}
          onMouseMove={handleMouseMove}
        />
      </div>
    </div>
  );
}
