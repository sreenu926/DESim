// src/lib/experiments/exp04-full-adder/index.ts
import { ExperimentConfig } from "@/types";
import { IC_7483 } from "./ics";

export const exp04Config: ExperimentConfig = {
  meta: {
    id: "exp04-full-adder",
    number: 4,
    title: "4-Bit Full Adder",
    description:
      "Implement a 4-bit binary full adder using IC 7483 and verify its truth table.",
    icsRequired: ["7483"],
  },
  defaultSwitches: [
    { id: "sw-A1", label: "A1", value: 0 },
    { id: "sw-A2", label: "A2", value: 0 },
    { id: "sw-A3", label: "A3", value: 0 },
    { id: "sw-A4", label: "A4", value: 0 },
    { id: "sw-B1", label: "B1", value: 0 },
    { id: "sw-B2", label: "B2", value: 0 },
    { id: "sw-B3", label: "B3", value: 0 },
    { id: "sw-B4", label: "B4", value: 0 },
    { id: "sw-CIN", label: "CIN", value: 0 },
  ],
  defaultLEDs: [
    { id: "led-S1", label: "S1", value: 0 },
    { id: "led-S2", label: "S2", value: 0 },
    { id: "led-S3", label: "S3", value: 0 },
    { id: "led-S4", label: "S4", value: 0 },
    { id: "led-COUT", label: "COUT", value: 0 },
  ],
};

export { IC_7483 };
