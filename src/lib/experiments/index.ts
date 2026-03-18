// src/lib/experiments/index.ts

import { ExperimentConfig } from "@/types";
import { exp04Config } from "./exp04-full-adder";

// ─── Experiment Registry ──────────────────────────────────────────────────────
// To add a new experiment:
// 1. Create a new folder under src/lib/experiments/
// 2. Import its config here
// 3. Add it to the EXPERIMENTS array below
// That's it! No other file needs to change. 🎯
// ─────────────────────────────────────────────────────────────────────────────

export const EXPERIMENTS: ExperimentConfig[] = [
  exp04Config,
  // exp01Config,  ← future experiments get added here
  // exp02Config,
  // exp03Config,
  // exp05Config,
];

// ─── Helper: Get experiment by ID ────────────────────────────────────────────
export function getExperiment(id: string): ExperimentConfig | undefined {
  return EXPERIMENTS.find((e) => e.meta.id === id);
}

// ─── Helper: Get all experiment metas (for home page listing) ────────────────
export function getAllExperimentMetas() {
  return EXPERIMENTS.map((e) => e.meta);
}
