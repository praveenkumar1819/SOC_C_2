const fs = require('fs');

function auditFile(filePath) {
  console.log(`\n=================== AUDIT: ${filePath} ===================`);
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');

  lines.forEach((line, idx) => {
    if (
      line.includes('onClick=') ||
      line.includes('handleAdvance') ||
      line.includes('Advance') ||
      line.includes('Next') ||
      line.includes('Proceed') ||
      line.includes('Continue')
    ) {
      if (
        line.includes('Button') ||
        line.includes('<button') ||
        line.includes('handleAdvance') ||
        line.includes('handleNext') ||
        line.includes('Advance to') ||
        line.includes('Next Chapter') ||
        line.includes('Proceed to')
      ) {
        console.log(`Line ${idx + 1}: ${line.trim()}`);
      }
    }
  });
}

auditFile('src/components/learning/soc-architecture-story.tsx');
auditFile('src/components/learning/soc-triage-story.tsx');
auditFile('src/components/modules/module-details-view.tsx');
