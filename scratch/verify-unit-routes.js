const http = require('http');

function getCsrfToken() {
  return new Promise((resolve) => {
    http.get('http://localhost:3000/api/auth/csrf', (res) => {
      let data = '';
      const cookies = res.headers['set-cookie'] || [];
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const json = JSON.parse(data);
        resolve({ csrfToken: json.csrfToken, cookies });
      });
    });
  });
}

function login(csrfToken, initialCookies) {
  return new Promise((resolve) => {
    const postData = new URLSearchParams({
      csrfToken,
      email: 'student@socplatform.com',
      password: 'password123',
      redirect: 'false',
      json: 'true'
    }).toString();

    const cookieHeader = initialCookies.map(c => c.split(';')[0]).join('; ');

    const req = http.request('http://localhost:3000/api/auth/callback/credentials', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData),
        'Cookie': cookieHeader
      }
    }, (res) => {
      const cookies = res.headers['set-cookie'] || [];
      res.on('data', () => {});
      res.on('end', () => {
        const sessionCookie = cookies.find(c => c.includes('next-auth.session-token'));
        resolve(sessionCookie ? sessionCookie.split(';')[0] : '');
      });
    });
    req.write(postData);
    req.end();
  });
}

function getContent(path, cookie) {
  return new Promise((resolve) => {
    http.get({
      hostname: 'localhost',
      port: 3000,
      path: path,
      headers: { Cookie: cookie },
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ statusCode: res.statusCode, html: data }));
    });
  });
}

async function run() {
  const { csrfToken, cookies } = await getCsrfToken();
  const sessionCookie = await login(csrfToken, cookies);

  const tests = [
    { path: '/modules/04?unit=unit-1', shouldContain: 'Unit 1: Architecture' },
    { path: '/modules/04?unit=unit-2', shouldContain: 'Alerts &amp; Events' },
    { path: '/modules/04?topic=topic-2-1', shouldContain: 'Topic 2.1: Understanding Events' },
    { path: '/modules/04?unit=unit-3', shouldContain: 'Alert Triage' },
    { path: '/modules/04?topic=topic-4-1', shouldContain: 'False Positives' },
    { path: '/modules/04?unit=unit-5', shouldContain: 'Severity Classification' },
    { path: '/modules/04?unit=unit-6', shouldContain: 'Escalation — Handing Off' },
    { path: '/modules/04?unit=unit-7', shouldContain: 'SOC Documentation — Creating the Audit Record' },
  ];

  let allPass = true;
  for (const t of tests) {
    const { statusCode, html } = await getContent(t.path, sessionCookie);
    const pass = html.includes(t.shouldContain);
    if (!pass) allPass = false;
    console.log(`${t.path.padEnd(30)} [${statusCode}]: ${pass ? '✅ PASS' : '❌ FAIL (missing ' + t.shouldContain + ')'}`);
  }

  if (allPass) {
    console.log('\n🎉 ALL 7 UNITS LOAD DIRECTLY VIA QUERY PARAMS WITH ZERO UNWANTED REDIRECTION TO UNIT 1!');
  }
}

run();
