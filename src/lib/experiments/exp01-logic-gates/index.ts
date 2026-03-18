// src/lib/experiments/exp01-logic-gates/index.ts
import { ExperimentConfig } from '@/types';
import { IC_7408, IC_7432, IC_7404, IC_7400, IC_7402, IC_7486, IC_7466 } from './ics';

export const exp01Config: ExperimentConfig = {
  meta: {
    id: 'exp01-logic-gates',
    number: 1,
    title: 'Logic Gates & Truth Tables',
    description: 'Study and verify truth tables of AND, OR, NOT, NAND, NOR, XOR and XNOR logic gates.',
    icsRequired: ['7408','7432','7404','7400','7402','7486','7466'],
  },
  defaultSwitches: [
    { id: 'sw-A', label: 'A', value: 0 },
    { id: 'sw-B', label: 'B', value: 0 },
  ],
  defaultLEDs: [
    { id: 'led-Y1', label: 'Y1', value: 0 },
    { id: 'led-Y2', label: 'Y2', value: 0 },
  ],
};

export { IC_7408, IC_7432, IC_7404, IC_7400, IC_7402, IC_7486, IC_7466 };
