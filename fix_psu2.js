const fs = require('fs');
const path = 'src/components/simulator/BreadboardCanvas.tsx';
let c = fs.readFileSync(path, 'utf8');

// Extend panel height to show terminals
c = c.replace('rect width={115} height={135}', 'rect width={115} height={155}');

// Move terminals down a bit and add labels
c = c.replace(
  '<circle cx={30} cy={115} r={7}',
  '<circle cx={30} cy={118} r={8}'
);
c = c.replace(
  'const ax=10+30;const ay=10+115;',
  'const ax=10+30;const ay=10+118;'
);
c = c.replace(
  '<circle cx={85} cy={115} r={7}',
  '<circle cx={85} cy={118} r={8}'
);
c = c.replace(
  'const ax=10+85;const ay=10+115;',
  'const ax=10+85;const ay=10+118;'
);

// Fix label positions
c = c.replace(
  '<text x={30} y={128} textAnchor="middle" fontSize={7} fill="#fca5a5">+5V</text>',
  '<text x={30} y={134} textAnchor="middle" fontSize={8} fontWeight="bold" fill="#fca5a5">+5V</text>'
);
c = c.replace(
  '<text x={85} y={128} textAnchor="middle" fontSize={7} fill="#93c5fd">COM</text>',
  '<text x={85} y={134} textAnchor="middle" fontSize={8} fontWeight="bold" fill="#93c5fd">COM</text>'
);

// Add section label
c = c.replace(
  '<circle cx={30} cy={118} r={8}',
  '<text x={57} y={110} textAnchor="middle" fontSize={8} fill="#9ca3af">Wire Terminals:</text>\n          <circle cx={30} cy={118} r={8}'
);

fs.writeFileSync(path, c);
console.log('Done!');
