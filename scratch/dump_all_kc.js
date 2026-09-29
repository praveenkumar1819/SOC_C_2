const fs = require('fs');
const content = fs.readFileSync('src/data/modules/module-04-units.ts', 'utf8');

const topicMatches = content.split(/\{\s*"id":\s*"(topic-\d+-\d+)"/g);
for (let i = 1; i < topicMatches.length; i += 2) {
  const topicId = topicMatches[i];
  const topicBody = topicMatches[i + 1];
  
  const kcIdx = topicBody.indexOf('"knowledgeCheck":');
  const endIdx = topicBody.indexOf('},\n      "socContext"', kcIdx);
  // Actually knowledgeCheck is after socContext in each topic:
  // "knowledgeCheck": { ... }
  // followed by either next topic or end of unit
  const nextTopicIdx = topicBody.indexOf('},\n        {', kcIdx);
  const endUnitIdx = topicBody.indexOf('}\n    ],\n    "assessment"', kcIdx);
  
  let sliceEnd = topicBody.length;
  if (nextTopicIdx !== -1 && nextTopicIdx < sliceEnd) sliceEnd = nextTopicIdx;
  if (endUnitIdx !== -1 && endUnitIdx < sliceEnd) sliceEnd = endUnitIdx;
  
  console.log(`==================== ${topicId} ====================`);
  console.log(topicBody.substring(kcIdx, sliceEnd).trim());
}
