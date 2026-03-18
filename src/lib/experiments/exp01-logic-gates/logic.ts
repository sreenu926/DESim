// src/lib/experiments/exp01-logic-gates/logic.ts
import { PlacedIC } from '@/types';

export function simulate7408(ic: PlacedIC): PlacedIC {
  const p = ic.pinValues;
  return { ...ic, pinValues: { ...p,
    Y1: ((p['A1']??0) & (p['B1']??0)) as 0|1,
    Y2: ((p['A2']??0) & (p['B2']??0)) as 0|1,
    Y3: ((p['A3']??0) & (p['B3']??0)) as 0|1,
    Y4: ((p['A4']??0) & (p['B4']??0)) as 0|1,
  }};
}

export function simulate7432(ic: PlacedIC): PlacedIC {
  const p = ic.pinValues;
  return { ...ic, pinValues: { ...p,
    Y1: ((p['A1']??0) | (p['B1']??0)) as 0|1,
    Y2: ((p['A2']??0) | (p['B2']??0)) as 0|1,
    Y3: ((p['A3']??0) | (p['B3']??0)) as 0|1,
    Y4: ((p['A4']??0) | (p['B4']??0)) as 0|1,
  }};
}

export function simulate7404(ic: PlacedIC): PlacedIC {
  const p = ic.pinValues;
  return { ...ic, pinValues: { ...p,
    Y1: ((p['A1']??0) === 0 ? 1 : 0) as 0|1,
    Y2: ((p['A2']??0) === 0 ? 1 : 0) as 0|1,
    Y3: ((p['A3']??0) === 0 ? 1 : 0) as 0|1,
    Y4: ((p['A4']??0) === 0 ? 1 : 0) as 0|1,
    Y5: ((p['A5']??0) === 0 ? 1 : 0) as 0|1,
    Y6: ((p['A6']??0) === 0 ? 1 : 0) as 0|1,
  }};
}

export function simulate7400(ic: PlacedIC): PlacedIC {
  const p = ic.pinValues;
  return { ...ic, pinValues: { ...p,
    Y1: (((p['A1']??0) & (p['B1']??0)) === 1 ? 0 : 1) as 0|1,
    Y2: (((p['A2']??0) & (p['B2']??0)) === 1 ? 0 : 1) as 0|1,
    Y3: (((p['A3']??0) & (p['B3']??0)) === 1 ? 0 : 1) as 0|1,
    Y4: (((p['A4']??0) & (p['B4']??0)) === 1 ? 0 : 1) as 0|1,
  }};
}

export function simulate7402(ic: PlacedIC): PlacedIC {
  const p = ic.pinValues;
  return { ...ic, pinValues: { ...p,
    Y1: (((p['A1']??0) | (p['B1']??0)) === 1 ? 0 : 1) as 0|1,
    Y2: (((p['A2']??0) | (p['B2']??0)) === 1 ? 0 : 1) as 0|1,
    Y3: (((p['A3']??0) | (p['B3']??0)) === 1 ? 0 : 1) as 0|1,
    Y4: (((p['A4']??0) | (p['B4']??0)) === 1 ? 0 : 1) as 0|1,
  }};
}

export function simulate7486(ic: PlacedIC): PlacedIC {
  const p = ic.pinValues;
  return { ...ic, pinValues: { ...p,
    Y1: ((p['A1']??0) ^ (p['B1']??0)) as 0|1,
    Y2: ((p['A2']??0) ^ (p['B2']??0)) as 0|1,
    Y3: ((p['A3']??0) ^ (p['B3']??0)) as 0|1,
    Y4: ((p['A4']??0) ^ (p['B4']??0)) as 0|1,
  }};
}

export function simulate7466(ic: PlacedIC): PlacedIC {
  const p = ic.pinValues;
  return { ...ic, pinValues: { ...p,
    Y1: (((p['A1']??0) ^ (p['B1']??0)) === 0 ? 1 : 0) as 0|1,
    Y2: (((p['A2']??0) ^ (p['B2']??0)) === 0 ? 1 : 0) as 0|1,
    Y3: (((p['A3']??0) ^ (p['B3']??0)) === 0 ? 1 : 0) as 0|1,
    Y4: (((p['A4']??0) ^ (p['B4']??0)) === 0 ? 1 : 0) as 0|1,
  }};
}
