const fs = require('fs');

const content = fs.readFileSync('./src/data/modules/module-04-units.ts', 'utf8');
const units = [];
const lines = content.split('\n');

lines.forEach((l, idx) => {
  if (l.includes('"id": "unit-') || l.includes('"id": "topic-') || l.includes('"title": "Unit ') || l.includes('"title": "Chapter ') || l.includes('"title": "Topic ')) {
    console.log(`${idx + 1}: ${l.trim()}`);
  }
});
