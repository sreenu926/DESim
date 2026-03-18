const fs = require('fs');
const path = 'src/components/simulator/BreadboardCanvas.tsx';
let c = fs.readFileSync(path, 'utf8');

// Find and replace entire power supply g block
const oldPSU = `        {/* ── POWER SUPPLY ── */}
        <g transform="translate(10,10)" onClick={(e) => e.stopPropagation()}>
          <rect width={115} height={155} rx={8} fill="#1f2937" stroke="#4b5563" strokeWidth={1.5}/>
          <text x={57} y={16} textAnchor="middle" fontSize={9} fontWeight="bold" fill="#d1d5db">Power Supply</text>
          <text x={30} y={34} textAnchor="middle" fontSize={9} fontWeight="bold" fill="#ef4444">+5V</text>
          <circle cx={30} cy={50} r={12} fill={powerOn?'#dc2626':'#7f1d1d'} stroke="#fca5a5" strokeWidth={1.5} style={{cursor:'pointer'}}
            onMouseDown={(e)=>e.stopPropagation()}
            onClick={(e)=>{e.stopPropagation();e.preventDefault();setPowerOn(prev => { return !prev; });}}/>
          <circle cx={30} cy={50} r={5} fill={powerOn?'#fca5a5':'#450a0a'}/>
          <text x={85} y={34} textAnchor="middle" fontSize={9} fontWeight="bold" fill="#60a5fa">COM</text>
          <circle cx={85} cy={50} r={12} fill="#1e3a5f" stroke="#93c5fd" strokeWidth={1.5}/>
          <circle cx={85} cy={50} r={5} fill="#1e40af"/>
          <rect x={12} y={74} width={91} height={26} rx={4} fill={powerOn?'#14532d':'#111827'}/>
          <text x={57} y={91} textAnchor="middle" fontSize={10} fontWeight="bold" fill={powerOn?'#22c55e':'#4b5563'}>
            {powerOn?'● ON':'○ OFF'}
          </text>
          <text x={57} y={110} textAnchor="middle" fontSize={8} fill="#9ca3af">Wire Terminals:</text>
          {/* +5V wire terminal */}
          <circle cx={30} cy={118} r={8} fill={powerOn?'#ef4444':'#7f1d1d'} stroke="#fca5a5" strokeWidth={1.5} style={{cursor:'crosshair'}}
            onMouseDown={(e)=>e.stopPropagation()}
            onClick={(e)=>{e.stopPropagation();const ax=10+30;const ay=10+118;onPinClick({terminalType:'switch',instanceId:'psu-vcc',pinId:'vcc'},ax,ay);}}/>
          <text x={30} y={134} textAnchor="middle" fontSize={8} fontWeight="bold" fill="#fca5a5">+5V</text>
          {/* COM wire terminal */}
          <circle cx={85} cy={118} r={8} fill="#1e3a5f" stroke="#93c5fd" strokeWidth={1.5} style={{cursor:'crosshair'}}
            onMouseDown={(e)=>e.stopPropagation()}
            onClick={(e)=>{e.stopPropagation();const ax=10+85;const ay=10+118;onPinClick({terminalType:'switch',instanceId:'psu-com',pinId:'com'},ax,ay);}}/>
          <text x={85} y={134} textAnchor="middle" fontSize={8} fontWeight="bold" fill="#93c5fd">COM</text>
        </g>`;

const newPSU = `        {/* ── POWER SUPPLY ── */}
        <g transform="translate(10,10)" onClick={(e) => e.stopPropagation()}>
          <rect width={120} height={175} rx={8} fill="#1f2937" stroke="#4b5563" strokeWidth={1.5}/>
          <text x={60} y={16} textAnchor="middle" fontSize={10} fontWeight="bold" fill="#f9fafb">Power Supply</text>
          {/* +5V button */}
          <text x={32} y={32} textAnchor="middle" fontSize={9} fontWeight="bold" fill="#fca5a5">+5V</text>
          <circle cx={32} cy={50} r={14} fill={powerOn?'#dc2626':'#7f1d1d'} stroke="#fca5a5" strokeWidth={2}
            style={{cursor:'pointer'}}
            onMouseDown={(e)=>{e.stopPropagation();e.preventDefault();}}
            onClick={(e)=>{e.stopPropagation();e.preventDefault();setPowerOn(prev => { return !prev; });}}/>
          <circle cx={32} cy={50} r={6} fill={powerOn?'#fca5a5':'#450a0a'} style={{pointerEvents:'none'}}/>
          {/* COM button */}
          <text x={88} y={32} textAnchor="middle" fontSize={9} fontWeight="bold" fill="#93c5fd">COM</text>
          <circle cx={88} cy={50} r={14} fill="#1e3a5f" stroke="#93c5fd" strokeWidth={2}/>
          <circle cx={88} cy={50} r={6} fill="#1e40af"/>
          {/* Status */}
          <rect x={10} y={74} width={100} height={26} rx={4} fill={powerOn?'#14532d':'#111827'}/>
          <text x={60} y={91} textAnchor="middle" fontSize={11} fontWeight="bold" fill={powerOn?'#22c55e':'#4b5563'}>
            {powerOn?'● ON':'○ OFF'}
          </text>
          {/* Divider */}
          <line x1={10} y1={108} x2={110} y2={108} stroke="#374151" strokeWidth={1}/>
          <text x={60} y={120} textAnchor="middle" fontSize={8} fill="#9ca3af">── Wire Terminals ──</text>
          {/* +5V wire terminal - big clickable dot */}
          <circle cx={32} cy={145} r={10} fill={powerOn?'#ef4444':'#4b1111'} stroke={powerOn?'#fca5a5':'#6b2222'} strokeWidth={2}
            style={{cursor:'crosshair'}}
            onMouseDown={(e)=>e.stopPropagation()}
            onClick={(e)=>{e.stopPropagation();const ax=10+32;const ay=10+145;onPinClick({terminalType:'switch',instanceId:'psu-vcc',pinId:'vcc'},ax,ay);}}/>
          <text x={32} y={163} textAnchor="middle" fontSize={9} fontWeight="bold" fill={powerOn?'#fca5a5':'#6b2222'}>+5V</text>
          {/* COM wire terminal - big clickable dot */}
          <circle cx={88} cy={145} r={10} fill="#1e3a5f" stroke="#93c5fd" strokeWidth={2}
            style={{cursor:'crosshair'}}
            onMouseDown={(e)=>e.stopPropagation()}
            onClick={(e)=>{e.stopPropagation();const ax=10+88;const ay=10+145;onPinClick({terminalType:'switch',instanceId:'psu-com',pinId:'com'},ax,ay);}}/>
          <text x={88} y={163} textAnchor="middle" fontSize={9} fontWeight="bold" fill="#93c5fd">COM</text>
        </g>`;

if (c.includes(oldPSU.substring(0, 50))) {
  c = c.replace(oldPSU, newPSU);
  console.log('Replaced PSU block!');
} else {
  // Find and replace just the rect
  c = c.replace('rect width={115} height={155}', 'rect width={120} height={175}');
  console.log('Fallback: just fixed rect size');
}

fs.writeFileSync(path, c);
console.log('Done!');
