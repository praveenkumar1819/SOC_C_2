const fs = require('fs');
const content = fs.readFileSync('src/data/modules/module-04-units.ts', 'utf8');

const topicMatches = content.split(/\{\s*"id":\s*"(topic-\d+-\d+)"/g);
for (let i = 1; i < topicMatches.length; i += 2) {
  const topicId = topicMatches[i];
  const topicBody = topicMatches[i + 1];
  
  const hasDragDrop = topicBody.includes('"dragDrop":');
  const hasMatching = topicBody.includes('"matching":');
  const hasTriage = topicBody.includes('"triageScenario":');
  
  console.log(`${topicId}: dragDrop=${hasDragDrop}, matching=${hasMatching}, triageScenario=${hasTriage}`);
}
