const fs = require('fs');
const path = 'src/lib/simulator/engine.ts';
let c = fs.readFileSync(path, 'utf8');

// Auto-connect VCC=1 GND=0 always (power is always on for IC to work)
c = c.replace(
  'let { placedICs, leds } = state;',
  `let { placedICs, leds } = state;

  // Auto-connect power pins for all placed ICs
  placedICs = placedICs.map((ic) => ({
    ...ic,
    pinValues: { ...ic.pinValues, VCC: 1 as 0|1, GND: 0 as 0|1 },
  }));`
);

fs.writeFileSync(path, c);
console.log('Done!');
