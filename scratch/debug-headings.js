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
      res.on('end', () => resolve(data));
    });
  });
}

async function run() {
  const { csrfToken, cookies } = await getCsrfToken();
  const sessionCookie = await login(csrfToken, cookies);

  const html2 = await getContent('/modules/04?topic=topic-2-1', sessionCookie);
  const titles2 = html2.match(/<h[1-3][^>]*>.*?<\/h[1-3]>/g) || [];
  console.log('Headings for /modules/04?topic=topic-2-1:');
  titles2.slice(0, 8).forEach(h => console.log('  ', h.replace(/<[^>]+>/g, '').trim()));

  const html7 = await getContent('/modules/04?unit=unit-7', sessionCookie);
  const titles7 = html7.match(/<h[1-3][^>]*>.*?<\/h[1-3]>/g) || [];
  console.log('\nHeadings for /modules/04?unit=unit-7:');
  titles7.slice(0, 8).forEach(h => console.log('  ', h.replace(/<[^>]+>/g, '').trim()));
}

run();
