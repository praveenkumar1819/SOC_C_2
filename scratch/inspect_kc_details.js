const fs = require('fs');
const content = fs.readFileSync('src/data/modules/module-04-units.ts', 'utf8');

const topicMatches = content.split(/\{\s*"id":\s*"(topic-\d+-\d+)"/g);
for (let i = 1; i < topicMatches.length; i += 2) {
  const topicId = topicMatches[i];
  const topicBody = topicMatches[i + 1];
  
  const kcIdx = topicBody.indexOf('"knowledgeCheck":');
  const nextSectionIdx = topicBody.indexOf('},\n        "');
  console.log(`=== ${topicId} ===`);
  if (kcIdx !== -1) {
    const kcBlock = topicBody.substring(kcIdx, kcIdx + 400);
    console.log(kcBlock);
  } else {
    console.log('NO KNOWLEDGE CHECK FOUND!');
  }
}
