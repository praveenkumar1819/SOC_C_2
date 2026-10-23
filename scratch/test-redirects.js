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

function testRedirect(path, cookie) {
  return new Promise((resolve) => {
    http.get({
      hostname: 'localhost',
      port: 3000,
      path: path,
      headers: { Cookie: cookie },
    }, (res) => {
      resolve({ path, statusCode: res.statusCode, location: res.headers.location });
    }).on('error', (err) => {
      resolve({ path, error: err.message });
    });
  });
}

async function run() {
  const { csrfToken, cookies } = await getCsrfToken();
  const sessionCookie = await login(csrfToken, cookies);

  const testPaths = [
    '/modules/04/topics?topic=topic-2-1',
    '/modules/04/topics?topic=2.1',
    '/modules/04/topics?topic=2-1',
    '/modules/04/topics?unit=2',
    '/modules/04/topics?unit=unit-3',
    '/modules/04/topics?assessment=2',
    '/modules/04/topics?assessment=unit-4-assessment',
  ];

  console.log('Testing authenticated topic URL redirects:');
  for (const p of testPaths) {
    const res = await testRedirect(p, sessionCookie);
    console.log(`${res.path.padEnd(48)} -> [${res.statusCode}] ${res.location}`);
  }
}

run();
