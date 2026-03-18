const fs = require('fs');
const path = 'src/components/simulator/BreadboardCanvas.tsx';
let c = fs.readFileSync(path, 'utf8');

// Make ALL top rows clickable
c = c.replace(
  `{Array.from({length:COLS},(_,ci)=>{
              const hx = cx(ci);
              const hy = BODY_TOP_Y+ri*ROW_H+ROW_H/2;
              const isRowE = ri===4;
              return <circle key={ci} cx={hx} cy={hy} r={isRowE?4:3}
                fill={isRowE?"#3d2b1a":"#5c534a"} opacity={0.7}
                style={{cursor: isRowE?'crosshair':'default'}}
                onClick={isRowE?(e)=>{e.stopPropagation();handleHoleClick(ci,'e',hx,hy);}:undefined}
              />;
            })}`,
  `{Array.from({length:COLS},(_,ci)=>{
              const hx = cx(ci);
              const hy = BODY_TOP_Y+ri*ROW_H+ROW_H/2;
              const rowName = ['a','b','c','d','e'][ri];
              return <circle key={ci} cx={hx} cy={hy} r={4}
                fill="#3d2b1a" opacity={0.75}
                style={{cursor:'crosshair'}}
                onClick={(e)=>{e.stopPropagation();handleHoleClick(ci,rowName,hx,hy);}}
              />;
            })}`
);

// Make ALL bottom rows clickable
c = c.replace(
  `{Array.from({length:COLS},(_,ci)=>{
              const hx = cx(ci);
              const hy = BODY_BOT_Y+ri*ROW_H+ROW_H/2;
              const isRowF = ri===0;
              return <circle key={ci} cx={hx} cy={hy} r={isRowF?4:3}
                fill={isRowF?"#3d2b1a":"#5c534a"} opacity={0.7}
                style={{cursor: isRowF?'crosshair':'default'}}
                onClick={isRowF?(e)=>{e.stopPropagation();handleHoleClick(ci,'f',hx,hy);}:undefined}
              />;
            })}`,
  `{Array.from({length:COLS},(_,ci)=>{
              const hx = cx(ci);
              const hy = BODY_BOT_Y+ri*ROW_H+ROW_H/2;
              const rowName = ['f','g','h','i','j'][ri];
              return <circle key={ci} cx={hx} cy={hy} r={4}
                fill="#3d2b1a" opacity={0.75}
                style={{cursor:'crosshair'}}
                onClick={(e)=>{e.stopPropagation();handleHoleClick(ci,rowName,hx,hy);}}
              />;
            })}`
);

// Make power rail holes clickable too
// Top VCC rail holes
c = c.replace(
  `{Array.from({length:COLS},(_,i)=><circle key={i} cx={cx(i)} cy={TOP_VCC_Y+RAIL_H/2} r={3} fill="#dc2626" opacity={0.8}/>)}`,
  `{Array.from({length:COLS},(_,i)=>{
            const hx=cx(i); const hy=TOP_VCC_Y+RAIL_H/2;
            return <circle key={i} cx={hx} cy={hy} r={4} fill="#dc2626" opacity={0.8}
              style={{cursor:'crosshair'}}
              onClick={(e)=>{e.stopPropagation();handleHoleClick(i,'vcc-top',hx,hy);}}/>;
          })}`
);

// Top GND rail holes
c = c.replace(
  `{Array.from({length:COLS},(_,i)=><circle key={i} cx={cx(i)} cy={TOP_GND_Y+RAIL_H/2} r={3} fill="#2563eb" opacity={0.8}/>)}`,
  `{Array.from({length:COLS},(_,i)=>{
            const hx=cx(i); const hy=TOP_GND_Y+RAIL_H/2;
            return <circle key={i} cx={hx} cy={hy} r={4} fill="#2563eb" opacity={0.8}
              style={{cursor:'crosshair'}}
              onClick={(e)=>{e.stopPropagation();handleHoleClick(i,'gnd-top',hx,hy);}}/>;
          })}`
);

// Bottom GND rail holes
c = c.replace(
  `{Array.from({length:COLS},(_,i)=><circle key={i} cx={cx(i)} cy={BOT_GND_Y+RAIL_H/2} r={3} fill="#2563eb" opacity={0.8}/>)}`,
  `{Array.from({length:COLS},(_,i)=>{
            const hx=cx(i); const hy=BOT_GND_Y+RAIL_H/2;
            return <circle key={i} cx={hx} cy={hy} r={4} fill="#2563eb" opacity={0.8}
              style={{cursor:'crosshair'}}
              onClick={(e)=>{e.stopPropagation();handleHoleClick(i,'gnd-bot',hx,hy);}}/>;
          })}`
);

// Bottom VCC rail holes
c = c.replace(
  `{Array.from({length:COLS},(_,i)=><circle key={i} cx={cx(i)} cy={BOT_VCC_Y+RAIL_H/2} r={3} fill="#dc2626" opacity={0.8}/>)}`,
  `{Array.from({length:COLS},(_,i)=>{
            const hx=cx(i); const hy=BOT_VCC_Y+RAIL_H/2;
            return <circle key={i} cx={hx} cy={hy} r={4} fill="#dc2626" opacity={0.8}
              style={{cursor:'crosshair'}}
              onClick={(e)=>{e.stopPropagation();handleHoleClick(i,'vcc-bot',hx,hy);}}/>;
          })}`
);

// Add Power Supply wire terminals below the ON/OFF button
c = c.replace(
  `<text x={57} y={91} textAnchor="middle" fontSize={10} fontWeight="bold" fill={powerOn?'#22c55e':'#4b5563'}>
            {powerOn?'● ON':'○ OFF'}
          </text>`,
  `<text x={57} y={91} textAnchor="middle" fontSize={10} fontWeight="bold" fill={powerOn?'#22c55e':'#4b5563'}>
            {powerOn?'● ON':'○ OFF'}
          </text>
          {/* +5V wire terminal */}
          <circle cx={30} cy={115} r={7} fill={powerOn?'#ef4444':'#7f1d1d'} stroke="#fca5a5" strokeWidth={1.5} style={{cursor:'crosshair'}}
            onMouseDown={(e)=>e.stopPropagation()}
            onClick={(e)=>{e.stopPropagation();const ax=10+30;const ay=10+115;onPinClick({terminalType:'switch',instanceId:'psu-vcc',pinId:'vcc'},ax,ay);}}/>
          <text x={30} y={128} textAnchor="middle" fontSize={7} fill="#fca5a5">+5V</text>
          {/* COM wire terminal */}
          <circle cx={85} cy={115} r={7} fill="#1e3a5f" stroke="#93c5fd" strokeWidth={1.5} style={{cursor:'crosshair'}}
            onMouseDown={(e)=>e.stopPropagation()}
            onClick={(e)=>{e.stopPropagation();const ax=10+85;const ay=10+115;onPinClick({terminalType:'switch',instanceId:'psu-com',pinId:'com'},ax,ay);}}/>
          <text x={85} y={128} textAnchor="middle" fontSize={7} fill="#93c5fd">COM</text>`
);

fs.writeFileSync(path, c);
console.log('Done!');
