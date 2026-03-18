// src/lib/experiments/exp04-full-adder/ics.ts
import { ICDefinition } from "@/types";

export const IC_7483: ICDefinition = {
  icId: "7483",
  name: "IC 7483",
  description: "4-Bit Binary Full Adder",
  pinCount: 16,
  pins: [
    { id: "A4", label: "A4", type: "input", side: "bottom", index: 0 },
    { id: "S3", label: "S3", type: "output", side: "bottom", index: 1 },
    { id: "A3", label: "A3", type: "input", side: "bottom", index: 2 },
    { id: "B3", label: "B3", type: "input", side: "bottom", index: 3 },
    { id: "VCC", label: "VCC", type: "power", side: "bottom", index: 4 },
    { id: "S2", label: "S2", type: "output", side: "bottom", index: 5 },
    { id: "B2", label: "B2", type: "input", side: "bottom", index: 6 },
    { id: "A2", label: "A2", type: "input", side: "bottom", index: 7 },
    { id: "B4", label: "B4", type: "input", side: "top", index: 0 },
    { id: "S4", label: "S4", type: "output", side: "top", index: 1 },
    { id: "COUT", label: "COUT", type: "output", side: "top", index: 2 },
    { id: "CIN", label: "CIN", type: "input", side: "top", index: 3 },
    { id: "GND", label: "GND", type: "ground", side: "top", index: 4 },
    { id: "B1", label: "B1", type: "input", side: "top", index: 5 },
    { id: "A1", label: "A1", type: "input", side: "top", index: 6 },
    { id: "S1", label: "S1", type: "output", side: "top", index: 7 },
  ],
};
