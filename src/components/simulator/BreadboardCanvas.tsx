// src/components/simulator/BreadboardCanvas.tsx
'use client';
import { useRef, useCallback, useState } from 'react';
import { SimulatorState, ICDefinition, WireTerminal } from '@/types';

const COL_W      = 18;
const ROW_H      = 18;
const COLS       = 53;
const PIN_ROWS   = 5;
const RAIL_H     = 22;
const RAIL_GAP   = 6;
const CENTER_GAP = 16;
const PAD_X      = 30;
const PAD_Y      = 10;

const TOP_VCC_Y  = PAD_Y;
const TOP_GND_Y  = TOP_VCC_Y + RAIL_H + RAIL_GAP;
const BODY_TOP_Y = TOP_GND_Y + RAIL_H + RAIL_GAP;
const BODY_BOT_Y = BODY_TOP_Y + PIN_ROWS * ROW_H + CENTER_GAP;
const BOT_GND_Y  = BODY_BOT_Y + PIN_ROWS * ROW_H + RAIL_GAP;
const BOT_VCC_Y  = BOT_GND_Y + RAIL_H + RAIL_GAP;
const BOARD_H    = BOT_VCC_Y + RAIL_H + PAD_Y;
const BOARD_W    = COLS * COL_W + PAD_X * 2;

const ROW_E_CY   = BODY_TOP_Y + 4 * ROW_H + ROW_H / 2;
const ROW_F_CY   = BODY_BOT_Y + ROW_H / 2;
const IC_BODY_Y  = ROW_E_CY;
const IC_BODY_H  = ROW_F_CY - ROW_E_CY;
const PIN_SPACE  = COL_W;

const WIRE_COLORS = ['#ef4444','#3b82f6','#22c55e','#f59e0b','#a855f7','#06b6d4','#f97316','#ec4899'];

function cx(col: number) { return PAD_X + col * COL_W + COL_W / 2; }

interface Props {
  state: SimulatorState;
  icDefinitions: Record<string, ICDefinition>;
  onToggleSwitch: (id: string) => void;
  onPinClick: (terminal: WireTerminal, x: number, y: number) => void;
  onDeleteWire: (wireId: string) => void;
  onAddIC: (icId: string) => void;
  onMoveIC: (instanceId: string, col: number) => void;
  onCancelWire: () => void;
  onMouseMove: (x: number, y: number) => void;
}

export default function BreadboardCanvas({ state, icDefinitions, onToggleSwitch, onPinClick, onDeleteWire, onCancelWire, onMouseMove }: Props) {
  const svgRef  = useRef<SVGSVGElement>(null);
  const [powerOn, setPowerOn] = useState(false);
  const termPos = useRef<Map<string, {x:number;y:number}>>(new Map());
  const BOARD_X = 140;
  const BOARD_Y = 20;
  const tkey = (t: WireTerminal) => t.terminalType + ':' + t.instanceId + ':' + t.pinId;
  const reg = useCallback((key: string, ax: number, ay: number) => { termPos.current.set(key, { x: ax, y: ay }); }, []);
  const handleHoleClick = useCallback((col: number, row: string, bx: number, by: number) => {
    const terminal: WireTerminal = { terminalType: 'switch', instanceId: 'hole-' + row + '-' + col, pinId: 'hole' };
    const ax = bx + BOARD_X; const ay = by + BOARD_Y;
    reg(tkey(terminal), ax, ay);
    onPinClick(terminal, ax, ay);
  }, [onPinClick, reg]);
  const handleIC = useCallback((terminal: WireTerminal, bx: number, by: number) => {
    const ax = bx + BOARD_X; const ay = by + BOARD_Y;
    reg(tkey(terminal), ax, ay);
    onPinClick(terminal, ax, ay);
  }, [onPinClick, reg]);

  return (
    <div className="relative w-full h-full overflow-auto select-none"
      style={{ background: 'linear-gradient(135deg,#92400e,#78350f)' }}
      onClick={onCancelWire}
      onMouseMove={(e) => { const r = svgRef.current?.getBoundingClientRect(); if (r) onMouseMove(e.clientX - r.left, e.clientY - r.top); }}>
      <svg ref={svgRef} width="100%" height="100%"
        style={{ minWidth: BOARD_W + 320, minHeight: BOARD_H + 80, display: 'block' }}
        onClick={(e) => e.stopPropagation()}>

        {/* POWER SUPPLY */}
        <g transform="translate(10,10)" onClick={(e) => e.stopPropagation()}>
          <rect width={120} height={110} rx={8} fill="#1f2937" stroke="#4b5563" strokeWidth={1.5}/>
          <text x={60} y={16} textAnchor="middle" fontSize={10} fontWeight="bold" fill="#f9fafb">Power Supply</text>
          <text x={32} y={33} textAnchor="middle" fontSize={9} fontWeight="bold" fill="#fca5a5">+5V</text>
          <circle cx={32} cy={52} r={14} fill={powerOn ? '#dc2626' : '#7f1d1d'} stroke="#fca5a5" strokeWidth={2}
            style={{cursor:'pointer'}}
            onMouseDown={(e) => { e.stopPropagation(); e.preventDefault(); }}
            onClick={(e) => { e.stopPropagation(); e.preventDefault(); setPowerOn(prev => { return !prev; }); }}/>
          <circle cx={32} cy={52} r={6} fill={powerOn ? '#fca5a5' : '#450a0a'} style={{pointerEvents:'none'}}/>
          <text x={88} y={33} textAnchor="middle" fontSize={9} fontWeight="bold" fill="#93c5fd">COM</text>
          <circle cx={88} cy={52} r={14} fill="#1e3a5f" stroke="#93c5fd" strokeWidth={2}/>
          <circle cx={88} cy={52} r={6} fill="#1e40af"/>
          <rect x={10} y={76} width={100} height={36} rx={4} fill={powerOn ? '#14532d' : '#111827'}/>
          <text x={60} y={93} textAnchor="middle" fontSize={10} fontWeight="bold" fill={powerOn ? '#22c55e' : '#4b5563'}>
            {powerOn ? '● ON - VCC/GND Auto-Connected' : '○ OFF - Click to Power ON'}
          </text>
        </g>

        {/* INPUT SWITCHES */}
        <g transform="translate(10,140)" onClick={(e) => e.stopPropagation()}>
          <text x={57} y={0} textAnchor="middle" fontSize={9} fontWeight="bold" fill="#fcd34d">INPUT SWITCHES</text>
          {state.switches.map((sw, i) => {
            const isOn = sw.value === 1;
            const sy = 12 + i * 44;
            const ax = 10 + 105; const ay = 140 + sy + 13;
            reg(tkey({terminalType:'switch', instanceId:sw.id, pinId:'out'}), ax, ay);
            return (
              <g key={sw.id}>
                <rect x={4} y={sy} width={62} height={26} rx={5}
                  fill={isOn ? '#15803d' : '#374151'} stroke={isOn ? '#22c55e' : '#6b7280'} strokeWidth={1}
                  style={{cursor:'pointer'}} onClick={() => onToggleSwitch(sw.id)}/>
                <text x={20} y={sy+17} fontSize={12} fontWeight="bold" fill="white">{isOn ? '1' : '0'}</text>
                <text x={36} y={sy+17} fontSize={10} fill="#e5e7eb">{sw.label}</text>
                <line x1={66} y1={sy+13} x2={97} y2={sy+13} stroke={isOn ? '#22c55e' : '#6b7280'} strokeWidth={1.5}/>
                <circle cx={103} cy={sy+13} r={7}
                  fill={isOn ? '#22c55e' : '#4b5563'} stroke={isOn ? '#86efac' : '#9ca3af'} strokeWidth={1.5}
                  style={{cursor:'crosshair'}}
                  onClick={(e) => { e.stopPropagation(); onPinClick({terminalType:'switch', instanceId:sw.id, pinId:'out'}, ax, ay); }}/>
              </g>
            );
          })}
        </g>

        {/* BREADBOARD */}
        <g transform={`translate(${BOARD_X},${BOARD_Y})`}>
          <rect width={BOARD_W} height={BOARD_H} rx={8} fill="#d4c9b0" stroke="#b5a88a" strokeWidth={2}/>
          <rect x={8} y={TOP_VCC_Y} width={BOARD_W-16} height={RAIL_H} rx={3} fill="#fee2e2" stroke="#fca5a5" strokeWidth={1}/>
          <text x={5} y={TOP_VCC_Y+15} fontSize={13} fontWeight="bold" fill="#dc2626">+</text>
          {Array.from({length:COLS},(_,i) => { const hx=cx(i); const hy=TOP_VCC_Y+RAIL_H/2; return <circle key={i} cx={hx} cy={hy} r={4} fill="#dc2626" opacity={0.8} style={{cursor:'crosshair'}} onClick={(e) => { e.stopPropagation(); handleHoleClick(i,'vcc-top',hx,hy); }}/>; })}
          <rect x={8} y={TOP_GND_Y} width={BOARD_W-16} height={RAIL_H} rx={3} fill="#dbeafe" stroke="#93c5fd" strokeWidth={1}/>
          <text x={4} y={TOP_GND_Y+16} fontSize={14} fontWeight="bold" fill="#2563eb">-</text>
          {Array.from({length:COLS},(_,i) => { const hx=cx(i); const hy=TOP_GND_Y+RAIL_H/2; return <circle key={i} cx={hx} cy={hy} r={4} fill="#2563eb" opacity={0.8} style={{cursor:'crosshair'}} onClick={(e) => { e.stopPropagation(); handleHoleClick(i,'gnd-top',hx,hy); }}/>; })}
          {Array.from({length:COLS},(_,i)=>i+1).filter(c=>c%5===0).map(c=>(<text key={c} x={cx(c-1)-4} y={BODY_TOP_Y-3} fontSize={7} fill="#78716c">{c}</text>))}
          {['a','b','c','d','e'].map((lt,ri) => (
            <g key={lt}>
              <text x={6} y={BODY_TOP_Y+ri*ROW_H+ROW_H/2+4} fontSize={8} fill="#78716c">{lt}</text>
              {Array.from({length:COLS},(_,ci) => { const hx=cx(ci); const hy=BODY_TOP_Y+ri*ROW_H+ROW_H/2; const rn=['a','b','c','d','e'][ri]; return <circle key={ci} cx={hx} cy={hy} r={4} fill="#3d2b1a" opacity={0.75} style={{cursor:'crosshair'}} onClick={(e) => { e.stopPropagation(); handleHoleClick(ci,rn,hx,hy); }}/>; })}
            </g>
          ))}
          <rect x={8} y={BODY_TOP_Y+PIN_ROWS*ROW_H} width={BOARD_W-16} height={CENTER_GAP} fill="#c4b99a"/>
          <text x={BOARD_W/2} y={BODY_TOP_Y+PIN_ROWS*ROW_H+CENTER_GAP/2+4} textAnchor="middle" fontSize={7} fill="#92816a">DIP</text>
          {['f','g','h','i','j'].map((lt,ri) => (
            <g key={lt}>
              <text x={6} y={BODY_BOT_Y+ri*ROW_H+ROW_H/2+4} fontSize={8} fill="#78716c">{lt}</text>
              {Array.from({length:COLS},(_,ci) => { const hx=cx(ci); const hy=BODY_BOT_Y+ri*ROW_H+ROW_H/2; const rn=['f','g','h','i','j'][ri]; return <circle key={ci} cx={hx} cy={hy} r={4} fill="#3d2b1a" opacity={0.75} style={{cursor:'crosshair'}} onClick={(e) => { e.stopPropagation(); handleHoleClick(ci,rn,hx,hy); }}/>; })}
            </g>
          ))}
          {Array.from({length:COLS},(_,i)=>i+1).filter(c=>c%5===0).map(c=>(<text key={c} x={cx(c-1)-4} y={BOT_GND_Y-3} fontSize={7} fill="#78716c">{c}</text>))}
          <rect x={8} y={BOT_GND_Y} width={BOARD_W-16} height={RAIL_H} rx={3} fill="#dbeafe" stroke="#93c5fd" strokeWidth={1}/>
          <text x={4} y={BOT_GND_Y+16} fontSize={14} fontWeight="bold" fill="#2563eb">-</text>
          {Array.from({length:COLS},(_,i) => { const hx=cx(i); const hy=BOT_GND_Y+RAIL_H/2; return <circle key={i} cx={hx} cy={hy} r={4} fill="#2563eb" opacity={0.8} style={{cursor:'crosshair'}} onClick={(e) => { e.stopPropagation(); handleHoleClick(i,'gnd-bot',hx,hy); }}/>; })}
          <rect x={8} y={BOT_VCC_Y} width={BOARD_W-16} height={RAIL_H} rx={3} fill="#fee2e2" stroke="#fca5a5" strokeWidth={1}/>
          <text x={5} y={BOT_VCC_Y+15} fontSize={13} fontWeight="bold" fill="#dc2626">+</text>
          {Array.from({length:COLS},(_,i) => { const hx=cx(i); const hy=BOT_VCC_Y+RAIL_H/2; return <circle key={i} cx={hx} cy={hy} r={4} fill="#dc2626" opacity={0.8} style={{cursor:'crosshair'}} onClick={(e) => { e.stopPropagation(); handleHoleClick(i,'vcc-bot',hx,hy); }}/>; })}

          {/* ICs */}
          {state.placedICs.map((ic) => {
            const def = icDefinitions[ic.icId]; if (!def) return null;
            const half = def.pinCount/2; const icX = cx(ic.col)-PIN_SPACE/2; const icW = (half-1)*PIN_SPACE+PIN_SPACE;
            const topPins = def.pins.filter(p=>p.side==='top').sort((a,b)=>a.index-b.index);
            const botPins = def.pins.filter(p=>p.side==='bottom').sort((a,b)=>a.index-b.index);
            return (
              <g key={ic.instanceId}>
                <rect x={icX} y={IC_BODY_Y} width={icW} height={IC_BODY_H} rx={3} fill="#1e293b" stroke="#64748b" strokeWidth={1.5}/>
                <circle cx={icX+10} cy={IC_BODY_Y+IC_BODY_H/2} r={5} fill="#0f172a" stroke="#475569" strokeWidth={1}/>
                <text x={icX+icW/2} y={IC_BODY_Y+IC_BODY_H/2+4} textAnchor="middle" fontSize={9} fontWeight="bold" fill="#f1f5f9">{def.name}</text>
                {topPins.map(pin => {
                  const px=icX+PIN_SPACE/2+pin.index*PIN_SPACE; const holeY=ROW_E_CY;
                  const color=pin.type==='power'?'#ef4444':pin.type==='ground'?'#475569':pin.type==='output'?(ic.pinValues[pin.id]===1?'#22c55e':'#64748b'):(ic.pinValues[pin.id]===1?'#3b82f6':'#94a3b8');
                  return (<g key={pin.id}><line x1={px} y1={IC_BODY_Y} x2={px} y2={holeY} stroke={color} strokeWidth={2}/><text x={px} y={holeY-7} textAnchor="middle" fontSize={6.5} fill="#94a3b8">{pin.label}</text><circle cx={px} cy={holeY} r={4.5} fill={color} stroke="#0f172a" strokeWidth={1} style={{cursor:'crosshair'}} onClick={(e) => { e.stopPropagation(); handleIC({terminalType:'ic',instanceId:ic.instanceId,pinId:pin.id},px,holeY); }}/></g>);
                })}
                {botPins.map(pin => {
                  const px=icX+PIN_SPACE/2+pin.index*PIN_SPACE; const holeY=ROW_F_CY;
                  const color=pin.type==='power'?'#ef4444':pin.type==='ground'?'#475569':pin.type==='output'?(ic.pinValues[pin.id]===1?'#22c55e':'#64748b'):(ic.pinValues[pin.id]===1?'#3b82f6':'#94a3b8');
                  return (<g key={pin.id}><line x1={px} y1={IC_BODY_Y+IC_BODY_H} x2={px} y2={holeY} stroke={color} strokeWidth={2}/><text x={px} y={holeY+14} textAnchor="middle" fontSize={6.5} fill="#94a3b8">{pin.label}</text><circle cx={px} cy={holeY} r={4.5} fill={color} stroke="#0f172a" strokeWidth={1} style={{cursor:'crosshair'}} onClick={(e) => { e.stopPropagation(); handleIC({terminalType:'ic',instanceId:ic.instanceId,pinId:pin.id},px,holeY); }}/></g>);
                })}
              </g>
            );
          })}
        </g>

        {/* OUTPUT LEDs */}
        <g transform={`translate(${BOARD_X+BOARD_W+14},140)`} onClick={(e) => e.stopPropagation()}>
          <text x={60} y={0} textAnchor="middle" fontSize={9} fontWeight="bold" fill="#fcd34d">OUTPUT LEDs</text>
          {state.leds.map((led,i) => {
            const isOn=led.value===1; const ly=12+i*44;
            const ax=BOARD_X+BOARD_W+14+8; const ay=140+ly+13;
            reg(tkey({terminalType:'led',instanceId:led.id,pinId:'in'}), ax, ay);
            return (
              <g key={led.id}>
                <circle cx={8} cy={ly+13} r={7} fill={isOn?'#22c55e':'#4b5563'} stroke={isOn?'#86efac':'#9ca3af'} strokeWidth={1.5} style={{cursor:'crosshair'}} onClick={(e) => { e.stopPropagation(); onPinClick({terminalType:'led',instanceId:led.id,pinId:'in'},ax,ay); }}/>
                <line x1={15} y1={ly+13} x2={28} y2={ly+13} stroke={isOn?'#22c55e':'#4b5563'} strokeWidth={1.5}/>
                <circle cx={42} cy={ly+13} r={13} fill={isOn?'#22c55e':'#1e293b'} stroke={isOn?'#16a34a':'#475569'} strokeWidth={2}/>
                {isOn && <circle cx={42} cy={ly+13} r={13} fill="none" stroke="#4ade80" strokeWidth={5} opacity={0.25}/>}
                <text x={42} y={ly+17} textAnchor="middle" fontSize={11} fontWeight="bold" fill="white">{isOn?'1':'0'}</text>
                <text x={62} y={ly+17} fontSize={11} fill="#e5e7eb">{led.label}</text>
              </g>
            );
          })}
        </g>

        {/* WIRES */}
        {state.wires.map((wire,i) => {
          const f=termPos.current.get(tkey(wire.from)); const t=termPos.current.get(tkey(wire.to));
          if (!f||!t) return null;
          const color=WIRE_COLORS[i%WIRE_COLORS.length]; const mx=(f.x+t.x)/2; const my=Math.min(f.y,t.y)-35;
          return (
            <g key={wire.id} style={{cursor:'pointer'}} onClick={(e) => { e.stopPropagation(); onDeleteWire(wire.id); }}>
              <path d={`M${f.x},${f.y} Q${mx},${my} ${t.x},${t.y}`} stroke={color} strokeWidth={2.5} fill="none" strokeLinecap="round" opacity={0.85}/>
              <circle cx={f.x} cy={f.y} r={4} fill={color}/>
              <circle cx={t.x} cy={t.y} r={4} fill={color}/>
            </g>
          );
        })}

        {/* PENDING WIRE */}
        {state.pendingWire && (
          <line x1={state.pendingWire.fromX} y1={state.pendingWire.fromY} x2={state.pendingWire.toX} y2={state.pendingWire.toY}
            stroke="#facc15" strokeWidth={2.5} strokeDasharray="8,5" strokeLinecap="round"/>
        )}
      </svg>
    </div>
  );
}
