const fs = require('fs');
const path = require('path');
const { V2_MODULES } = require('../src/data/curriculum-v2-data');

const DATA_DIR = path.join(process.cwd(), '.data');
const DATA_FILE = path.join(DATA_DIR, 'local-store.json');

const v2LocalModules = V2_MODULES.map((m) => {
  return {
    id: m.id,
    title: m.title,
    description: m.story,
    order: m.order,
    difficulty: m.difficulty,
    estimatedHours: m.totalHours,
    resourceLabs: m.units.length,
    liveLabs: m.units.length,
    isPublished: true,
    isLocked: false,
    learningObjectives: [
      `Master core principles of ${m.title} in the CDAC Bengaluru learning setting.`,
      `Learn with mentor ${m.mentor} (${m.mentorRole}).`,
      `Understand theoretical frameworks and complete practical exercises.`,
      `Complete unit assessments and hands-on lab requirements.`
    ],
    prerequisites: m.order === 0 ? [] : [String(m.order - 1).padStart(2, '0')]
  };
});

if (fs.existsSync(DATA_FILE)) {
  const store = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  store.modules = v2LocalModules;
  fs.writeFileSync(DATA_FILE, JSON.stringify(store, null, 2), 'utf8');
  console.log(`✅ Updated .data/local-store.json with ${v2LocalModules.length} V2 modules!`);
} else {
  console.log('⚠️ local-store.json does not exist yet.');
}
