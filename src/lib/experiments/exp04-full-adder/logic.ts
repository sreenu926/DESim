// src/lib/experiments/exp04-full-adder/logic.ts

import { PlacedIC } from "@/types";

// ─── IC 7483 Logic Simulation ─────────────────────────────────────────────────
// Takes two 4-bit numbers A and B + Carry In
// Returns 4-bit Sum S + Carry Out
// Formula: S = A + B + CIN

export function simulate7483(ic: PlacedIC): PlacedIC {
  const p = ic.pinValues;

  // Read inputs
  const A1 = p["A1"] ?? 0;
  const A2 = p["A2"] ?? 0;
  const A3 = p["A3"] ?? 0;
  const A4 = p["A4"] ?? 0;

  const B1 = p["B1"] ?? 0;
  const B2 = p["B2"] ?? 0;
  const B3 = p["B3"] ?? 0;
  const B4 = p["B4"] ?? 0;

  const CIN = p["CIN"] ?? 0;

  // Convert to decimal
  const A = (A4 << 3) | (A3 << 2) | (A2 << 1) | A1;
  const B = (B4 << 3) | (B3 << 2) | (B2 << 1) | B1;

  // Perform addition
  const sum = A + B + CIN;

  // Extract output bits
  const S1 = (sum >> 0) & 1;
  const S2 = (sum >> 1) & 1;
  const S3 = (sum >> 2) & 1;
  const S4 = (sum >> 3) & 1;
  const COUT = (sum >> 4) & 1;

  // Return updated IC with output pin values
  return {
    ...ic,
    pinValues: {
      ...p,
      S1: S1 as 0 | 1,
      S2: S2 as 0 | 1,
      S3: S3 as 0 | 1,
      S4: S4 as 0 | 1,
      COUT: COUT as 0 | 1,
    },
  };
}
