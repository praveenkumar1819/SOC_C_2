function sanitizeTopic(topicParam) {
  let raw = topicParam.trim();
  if (raw.startsWith('unit-')) {
    const uNum = raw.replace(/^unit-/, '');
    if (uNum.includes('-')) {
      raw = `topic-${uNum}`;
    } else {
      raw = `topic-${uNum}-1`;
    }
  } else {
    const clean = raw.replace(/^topic-/, '').replace('.', '-');
    if (clean.includes('-')) {
      raw = `topic-${clean}`;
    } else {
      raw = `topic-${clean}-1`;
    }
  }
  return raw;
}

const tests = [
  'topic-1-1',
  'topic-2-1',
  'topic-2-2',
  'topic-3-1',
  'topic-3-2',
  'topic-7-1',
  'topic-7-2',
  'topic-2.1',
  'topic-3.2',
  '2.1',
  '2-1',
  '3.2',
  '2',
  '3',
  'unit-2',
  'unit-3',
  'unit-2-1'
];

tests.forEach(t => {
  console.log(`${t.padEnd(15)} -> ${sanitizeTopic(t)}`);
});
