// src/lib/experiments/exp01-logic-gates/ics.ts
import { ICDefinition } from '@/types';

export const IC_7408: ICDefinition = {
  icId: '7408', name: 'IC 7408', description: 'Quad 2-Input AND Gate', pinCount: 14,
  pins: [
    { id: 'A1', label: 'A1', type: 'input',  side: 'bottom', index: 0 },
    { id: 'B1', label: 'B1', type: 'input',  side: 'bottom', index: 1 },
    { id: 'Y1', label: 'Y1', type: 'output', side: 'bottom', index: 2 },
    { id: 'A2', label: 'A2', type: 'input',  side: 'bottom', index: 3 },
    { id: 'B2', label: 'B2', type: 'input',  side: 'bottom', index: 4 },
    { id: 'Y2', label: 'Y2', type: 'output', side: 'bottom', index: 5 },
    { id: 'GND', label: 'GND', type: 'ground', side: 'bottom', index: 6 },
    { id: 'Y3', label: 'Y3', type: 'output', side: 'top', index: 0 },
    { id: 'A3', label: 'A3', type: 'input',  side: 'top', index: 1 },
    { id: 'B3', label: 'B3', type: 'input',  side: 'top', index: 2 },
    { id: 'Y4', label: 'Y4', type: 'output', side: 'top', index: 3 },
    { id: 'A4', label: 'A4', type: 'input',  side: 'top', index: 4 },
    { id: 'B4', label: 'B4', type: 'input',  side: 'top', index: 5 },
    { id: 'VCC', label: 'VCC', type: 'power', side: 'top', index: 6 },
  ],
};

export const IC_7432: ICDefinition = {
  icId: '7432', name: 'IC 7432', description: 'Quad 2-Input OR Gate', pinCount: 14,
  pins: [
    { id: 'A1', label: 'A1', type: 'input',  side: 'bottom', index: 0 },
    { id: 'B1', label: 'B1', type: 'input',  side: 'bottom', index: 1 },
    { id: 'Y1', label: 'Y1', type: 'output', side: 'bottom', index: 2 },
    { id: 'A2', label: 'A2', type: 'input',  side: 'bottom', index: 3 },
    { id: 'B2', label: 'B2', type: 'input',  side: 'bottom', index: 4 },
    { id: 'Y2', label: 'Y2', type: 'output', side: 'bottom', index: 5 },
    { id: 'GND', label: 'GND', type: 'ground', side: 'bottom', index: 6 },
    { id: 'Y3', label: 'Y3', type: 'output', side: 'top', index: 0 },
    { id: 'A3', label: 'A3', type: 'input',  side: 'top', index: 1 },
    { id: 'B3', label: 'B3', type: 'input',  side: 'top', index: 2 },
    { id: 'Y4', label: 'Y4', type: 'output', side: 'top', index: 3 },
    { id: 'A4', label: 'A4', type: 'input',  side: 'top', index: 4 },
    { id: 'B4', label: 'B4', type: 'input',  side: 'top', index: 5 },
    { id: 'VCC', label: 'VCC', type: 'power', side: 'top', index: 6 },
  ],
};

export const IC_7404: ICDefinition = {
  icId: '7404', name: 'IC 7404', description: 'Hex Inverter NOT Gate', pinCount: 14,
  pins: [
    { id: 'A1', label: 'A1', type: 'input',  side: 'bottom', index: 0 },
    { id: 'Y1', label: 'Y1', type: 'output', side: 'bottom', index: 1 },
    { id: 'A2', label: 'A2', type: 'input',  side: 'bottom', index: 2 },
    { id: 'Y2', label: 'Y2', type: 'output', side: 'bottom', index: 3 },
    { id: 'A3', label: 'A3', type: 'input',  side: 'bottom', index: 4 },
    { id: 'Y3', label: 'Y3', type: 'output', side: 'bottom', index: 5 },
    { id: 'GND', label: 'GND', type: 'ground', side: 'bottom', index: 6 },
    { id: 'Y4', label: 'Y4', type: 'output', side: 'top', index: 0 },
    { id: 'A4', label: 'A4', type: 'input',  side: 'top', index: 1 },
    { id: 'Y5', label: 'Y5', type: 'output', side: 'top', index: 2 },
    { id: 'A5', label: 'A5', type: 'input',  side: 'top', index: 3 },
    { id: 'Y6', label: 'Y6', type: 'output', side: 'top', index: 4 },
    { id: 'A6', label: 'A6', type: 'input',  side: 'top', index: 5 },
    { id: 'VCC', label: 'VCC', type: 'power', side: 'top', index: 6 },
  ],
};

export const IC_7400: ICDefinition = {
  icId: '7400', name: 'IC 7400', description: 'Quad 2-Input NAND Gate', pinCount: 14,
  pins: [
    { id: 'A1', label: 'A1', type: 'input',  side: 'bottom', index: 0 },
    { id: 'B1', label: 'B1', type: 'input',  side: 'bottom', index: 1 },
    { id: 'Y1', label: 'Y1', type: 'output', side: 'bottom', index: 2 },
    { id: 'A2', label: 'A2', type: 'input',  side: 'bottom', index: 3 },
    { id: 'B2', label: 'B2', type: 'input',  side: 'bottom', index: 4 },
    { id: 'Y2', label: 'Y2', type: 'output', side: 'bottom', index: 5 },
    { id: 'GND', label: 'GND', type: 'ground', side: 'bottom', index: 6 },
    { id: 'Y3', label: 'Y3', type: 'output', side: 'top', index: 0 },
    { id: 'A3', label: 'A3', type: 'input',  side: 'top', index: 1 },
    { id: 'B3', label: 'B3', type: 'input',  side: 'top', index: 2 },
    { id: 'Y4', label: 'Y4', type: 'output', side: 'top', index: 3 },
    { id: 'A4', label: 'A4', type: 'input',  side: 'top', index: 4 },
    { id: 'B4', label: 'B4', type: 'input',  side: 'top', index: 5 },
    { id: 'VCC', label: 'VCC', type: 'power', side: 'top', index: 6 },
  ],
};

export const IC_7402: ICDefinition = {
  icId: '7402', name: 'IC 7402', description: 'Quad 2-Input NOR Gate', pinCount: 14,
  pins: [
    { id: 'Y1', label: 'Y1', type: 'output', side: 'bottom', index: 0 },
    { id: 'A1', label: 'A1', type: 'input',  side: 'bottom', index: 1 },
    { id: 'B1', label: 'B1', type: 'input',  side: 'bottom', index: 2 },
    { id: 'Y2', label: 'Y2', type: 'output', side: 'bottom', index: 3 },
    { id: 'A2', label: 'A2', type: 'input',  side: 'bottom', index: 4 },
    { id: 'B2', label: 'B2', type: 'input',  side: 'bottom', index: 5 },
    { id: 'GND', label: 'GND', type: 'ground', side: 'bottom', index: 6 },
    { id: 'A3', label: 'A3', type: 'input',  side: 'top', index: 0 },
    { id: 'B3', label: 'B3', type: 'input',  side: 'top', index: 1 },
    { id: 'Y3', label: 'Y3', type: 'output', side: 'top', index: 2 },
    { id: 'A4', label: 'A4', type: 'input',  side: 'top', index: 3 },
    { id: 'B4', label: 'B4', type: 'input',  side: 'top', index: 4 },
    { id: 'Y4', label: 'Y4', type: 'output', side: 'top', index: 5 },
    { id: 'VCC', label: 'VCC', type: 'power', side: 'top', index: 6 },
  ],
};

export const IC_7486: ICDefinition = {
  icId: '7486', name: 'IC 7486', description: 'Quad 2-Input XOR Gate', pinCount: 14,
  pins: [
    { id: 'A1', label: 'A1', type: 'input',  side: 'bottom', index: 0 },
    { id: 'B1', label: 'B1', type: 'input',  side: 'bottom', index: 1 },
    { id: 'Y1', label: 'Y1', type: 'output', side: 'bottom', index: 2 },
    { id: 'A2', label: 'A2', type: 'input',  side: 'bottom', index: 3 },
    { id: 'B2', label: 'B2', type: 'input',  side: 'bottom', index: 4 },
    { id: 'Y2', label: 'Y2', type: 'output', side: 'bottom', index: 5 },
    { id: 'GND', label: 'GND', type: 'ground', side: 'bottom', index: 6 },
    { id: 'Y3', label: 'Y3', type: 'output', side: 'top', index: 0 },
    { id: 'A3', label: 'A3', type: 'input',  side: 'top', index: 1 },
    { id: 'B3', label: 'B3', type: 'input',  side: 'top', index: 2 },
    { id: 'Y4', label: 'Y4', type: 'output', side: 'top', index: 3 },
    { id: 'A4', label: 'A4', type: 'input',  side: 'top', index: 4 },
    { id: 'B4', label: 'B4', type: 'input',  side: 'top', index: 5 },
    { id: 'VCC', label: 'VCC', type: 'power', side: 'top', index: 6 },
  ],
};

export const IC_7466: ICDefinition = {
  icId: '7466', name: 'IC 7466', description: 'Quad 2-Input XNOR Gate', pinCount: 14,
  pins: [
    { id: 'A1', label: 'A1', type: 'input',  side: 'bottom', index: 0 },
    { id: 'B1', label: 'B1', type: 'input',  side: 'bottom', index: 1 },
    { id: 'Y1', label: 'Y1', type: 'output', side: 'bottom', index: 2 },
    { id: 'A2', label: 'A2', type: 'input',  side: 'bottom', index: 3 },
    { id: 'B2', label: 'B2', type: 'input',  side: 'bottom', index: 4 },
    { id: 'Y2', label: 'Y2', type: 'output', side: 'bottom', index: 5 },
    { id: 'GND', label: 'GND', type: 'ground', side: 'bottom', index: 6 },
    { id: 'Y3', label: 'Y3', type: 'output', side: 'top', index: 0 },
    { id: 'A3', label: 'A3', type: 'input',  side: 'top', index: 1 },
    { id: 'B3', label: 'B3', type: 'input',  side: 'top', index: 2 },
    { id: 'Y4', label: 'Y4', type: 'output', side: 'top', index: 3 },
    { id: 'A4', label: 'A4', type: 'input',  side: 'top', index: 4 },
    { id: 'B4', label: 'B4', type: 'input',  side: 'top', index: 5 },
    { id: 'VCC', label: 'VCC', type: 'power', side: 'top', index: 6 },
  ],
};
