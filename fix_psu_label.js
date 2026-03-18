const fs = require('fs');
const path = 'src/components/simulator/BreadboardCanvas.tsx';
let c = fs.readFileSync(path, 'utf8');

// Update power supply status text to show auto-connect info
c = c.replace(
  `{powerOn ? '● ON' : '○ OFF'}`,
  `{powerOn ? '● ON - VCC/GND Auto-Connected' : '○ OFF - Click to Power ON'}`
);

// Make power button glow when on
c = c.replace(
  `<rect x={10} y={76} width={100} height={26} rx={4} fill={powerOn ? '#14532d' : '#111827'}/>`,
  `<rect x={10} y={76} width={100} height={36} rx={4} fill={powerOn ? '#14532d' : '#111827'}/>`
);

fs.writeFileSync(path, c);
console.log('Done!');
