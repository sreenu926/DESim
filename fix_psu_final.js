const fs = require('fs');
const path = 'src/components/simulator/BreadboardCanvas.tsx';
let c = fs.readFileSync(path, 'utf8');

// Remove all the complex psu wire terminal code
// Replace entire power supply section with clean simple version
const lines = c.split('\n');
let startLine = -1, endLine = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('── POWER SUPPLY ──')) startLine = i - 1;
  if (startLine > -1 && lines[i].includes('</g>') && i > startLine + 5) {
    endLine = i;
    break;
  }
}

if (startLine > -1 && endLine > -1) {
  const newPSU = `        {/* ── POWER SUPPLY ── */}
        <g transform="translate(10,10)" onClick={(e) => e.stopPropagation()}>
          <rect width={120} height={110} rx={8} fill="#1f2937" stroke="#4b5563" strokeWidth={1.5}/>
          <text x={60} y={16} textAnchor="middle" fontSize={10} fontWeight="bold" fill="#f9fafb">Power Supply</text>
          <text x={32} y={33} textAnchor="middle" fontSize={9} fontWeight="bold" fill="#fca5a5">+5V</text>
          <circle cx={32} cy={52} r={14} fill={powerOn?'#dc2626':'#7f1d1d'} stroke="#fca5a5" strokeWidth={2}
            style={{cursor:'pointer'}}
            onMouseDown={(e)=>{e.stopPropagation();e.preventDefault();}}
            onClick={(e)=>{e.stopPropagation();e.preventDefault();setPowerOn(prev => { return !prev; });}}/>
          <circle cx={32} cy={52} r={6} fill={powerOn?'#fca5a5':'#450a0a'} style={{pointerEvents:'none'}}/>
          <text x={88} y={33} textAnchor="middle" fontSize={9} fontWeight="bold" fill="#93c5fd">COM</text>
          <circle cx={88} cy={52} r={14} fill="#1e3a5f" stroke="#93c5fd" strokeWidth={2}/>
          <circle cx={88} cy={52} r={6} fill="#1e40af"/>
          <rect x={10} y={76} width={100} height={26} rx={4} fill={powerOn?'#14532d':'#111827'}/>
          <text x={60} y={93} textAnchor="middle" fontSize={11} fontWeight="bold" fill={powerOn?'#22c55e':'#4b5563'}>
            {powerOn?'● ON  (Auto-connected)':'○ OFF'}
          </text>
        </g>`;

  lines.splice(startLine, endLine - startLine + 1, newPSU);
  c = lines.join('\n');
  console.log('PSU block replaced! Lines', startLine, 'to', endLine);
} else {
  console.log('Could not find PSU block. Start:', startLine, 'End:', endLine);
}

fs.writeFileSync(path, c);
console.log('Done!');
