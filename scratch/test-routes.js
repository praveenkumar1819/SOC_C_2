const http = require('http');

function getCsrfToken() {
  return new Promise((resolve, reject) => {
    http.get('http://localhost:3000/api/auth/csrf', (res) => {
      let data = '';
      const cookies = res.headers['set-cookie'] || [];
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve({ csrfToken: json.csrfToken, cookies });
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

function login(csrfToken, initialCookies) {
  return new Promise((resolve, reject) => {
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
      let data = '';
      const cookies = res.headers['set-cookie'] || [];
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const sessionCookie = cookies.find(c => c.includes('next-auth.session-token'));
        resolve(sessionCookie ? sessionCookie.split(';')[0] : cookieHeader);
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

function fetchPage(url, cookie) {
  return new Promise((resolve) => {
    http.get(url, {
      headers: {
        'Cookie': cookie
      }
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        resolve({
          url,
          status: res.statusCode,
          body
        });
      });
    }).on('error', (err) => {
      resolve({ url, error: err.message });
    });
  });
}

async function run() {
  const { csrfToken, cookies } = await getCsrfToken();
  const authCookie = await login(csrfToken, cookies);

  const tests = [
    { url: 'http://localhost:3000/modules/04?unit=2', shouldContain: 'Alerts &amp; Events' },
    { url: 'http://localhost:3000/modules/04?topic=topic-2-1', shouldContain: '2.1 Raw Events' },
    { url: 'http://localhost:3000/modules/04?topic=topic-2-2', shouldContain: '2.3 Alert vs Incident' },
    { url: 'http://localhost:3000/modules/04?assessment=unit-2-assessment', shouldContain: 'Unit 2 Knowledge Check' },
    { url: 'http://localhost:3000/modules/04?topic=topic-3-1', shouldContain: 'Unit 3 Triage Lab' },
    { url: 'http://localhost:3000/modules/04?unit=unit-4', shouldContain: 'The 5-Pillar Context' },
    { url: 'http://localhost:3000/modules/04?topic=topic-5-1', shouldContain: 'Severity Calculator' },
    { url: 'http://localhost:3000/modules/04?topic=topic-6-1', shouldContain: 'Specialist Routing' },
    { url: 'http://localhost:3000/modules/04?topic=topic-7-1', shouldContain: 'Audit-Grade Case Dossier' },
  ];

  for (const t of tests) {
    const res = await fetchPage(t.url, authCookie);
    const hasExpected = res.body && res.body.includes(t.shouldContain);
    console.log(`[${res.status}] ${t.url} | Expected: "${t.shouldContain}" -> Found: ${hasExpected}`);
  }
}

run();
