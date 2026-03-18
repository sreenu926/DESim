const fs = require('fs');
const path = 'src/components/simulator/BreadboardCanvas.tsx';
let c = fs.readFileSync(path, 'utf8');

// Add HoleTerminal type to the tkey function area - add hole click handler
const holeHandler = `
  const handleHoleClick = useCallback((col: number, row: string, x: number, y: number) => {
    const terminal: WireTerminal = {
      terminalType: 'switch',
      instanceId: 'hole-' + row + '-' + col,
      pinId: 'hole',
    };
    const ax = x + BOARD_X;
    const ay = y + BOARD_Y;
    reg(tkey(terminal), ax, ay);
    onPinClick(terminal, ax, ay);
  }, [onPinClick, reg]);
`;

c = c.replace(
  'const handleIC = useCallback',
  holeHandler + '\n  const handleIC = useCallback'
);

// Make holes clickable - replace static circles with interactive ones for rows a-e and f-j
c = c.replace(
  `{Array.from({length:COLS},(_,ci)=><circle key={ci} cx={cx(ci)} cy={BODY_TOP_Y+ri*ROW_H+ROW_H/2} r={3} fill="#5c534a" opacity={0.55}/>)}`,
  `{Array.from({length:COLS},(_,ci)=>{
              const hx = cx(ci);
              const hy = BODY_TOP_Y+ri*ROW_H+ROW_H/2;
              const isRowE = ri===4;
              return <circle key={ci} cx={hx} cy={hy} r={isRowE?4:3}
                fill={isRowE?"#3d2b1a":"#5c534a"} opacity={0.7}
                style={{cursor: isRowE?'crosshair':'default'}}
                onClick={isRowE?(e)=>{e.stopPropagation();handleHoleClick(ci,'e',hx,hy);}:undefined}
              />;
            })}`
);

c = c.replace(
  `{Array.from({length:COLS},(_,ci)=><circle key={ci} cx={cx(ci)} cy={BODY_BOT_Y+ri*ROW_H+ROW_H/2} r={3} fill="#5c534a" opacity={0.55}/>)}`,
  `{Array.from({length:COLS},(_,ci)=>{
              const hx = cx(ci);
              const hy = BODY_BOT_Y+ri*ROW_H+ROW_H/2;
              const isRowF = ri===0;
              return <circle key={ci} cx={hx} cy={hy} r={isRowF?4:3}
                fill={isRowF?"#3d2b1a":"#5c534a"} opacity={0.7}
                style={{cursor: isRowF?'crosshair':'default'}}
                onClick={isRowF?(e)=>{e.stopPropagation();handleHoleClick(ci,'f',hx,hy);}:undefined}
              />;
            })}`
);

fs.writeFileSync(path, c);
console.log('Done!');
