// src/types/index.ts

// ─── Pin Types ────────────────────────────────────────────────────────────────
export type PinType = 'input' | 'output' | 'power' | 'ground';
export type PinSide = 'top' | 'bottom';

export interface PinDefinition {
  id: string;
  label: string;
  type: PinType;
  side: PinSide;
  index: number; // left-to-right position on that side
}

export interface ICDefinition {
  icId: string;
  name: string;
  description: string;
  pins: PinDefinition[];
  pinCount: number; // total pins (e.g. 16)
}

// ─── Placed IC ────────────────────────────────────────────────────────────────
export interface PlacedIC {
  instanceId: string;
  icId: string;
  col: number;   // breadboard column where pin1 starts
  pinValues: Record<string, 0 | 1>;
}

// ─── Wire ─────────────────────────────────────────────────────────────────────
export type TerminalType = 'switch' | 'led' | 'ic';

export interface WireTerminal {
  terminalType: TerminalType;
  instanceId: string;
  pinId: string;
}

export interface Wire {
  id: string;
  from: WireTerminal;
  to: WireTerminal;
}

// ─── Pending Wire ─────────────────────────────────────────────────────────────
export interface PendingWire {
  from: WireTerminal;
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
}

// ─── Switch & LED ─────────────────────────────────────────────────────────────
export interface InputSwitch {
  id: string;
  label: string;
  value: 0 | 1;
}

export interface OutputLED {
  id: string;
  label: string;
  value: 0 | 1;
}

// ─── Experiment ───────────────────────────────────────────────────────────────
export interface ExperimentMeta {
  id: string;
  number: number;
  title: string;
  description: string;
  icsRequired: string[];
}

export interface ExperimentConfig {
  meta: ExperimentMeta;
  defaultSwitches: InputSwitch[];
  defaultLEDs: OutputLED[];
}

// ─── Simulator State ──────────────────────────────────────────────────────────
export interface SimulatorState {
  placedICs: PlacedIC[];
  wires: Wire[];
  switches: InputSwitch[];
  leds: OutputLED[];
  pendingWire: PendingWire | null;
}
