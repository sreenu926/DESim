const fs = require('fs');
const path = 'src/components/simulator/BreadboardCanvas.tsx';
let c = fs.readFileSync(path, 'utf8');
c = c.replace('rect width={115} height={115}', 'rect width={115} height={135}');
c = c.replace('setPowerOn(p=>!p);', 'setPowerOn(prev => { return !prev; });');
fs.writeFileSync(path, c);
console.log('Done!');
