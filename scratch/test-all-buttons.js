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
  console.log('Logging in to test all Next & Proceed buttons...');
  const { csrfToken, cookies } = await getCsrfToken();
  const authCookie = await login(csrfToken, cookies);

  const checks = [
    {
      unit: 'Unit 1 (Architecture)',
      url: 'http://localhost:3000/modules/04?unit=1',
      expectedButtons: ['Advance to Chapter 2: Process', 'Unit 1: Architecture', 'Unit 2: Alerts &amp; Events']
    },
    {
      unit: 'Unit 2 (Alerts & Events)',
      url: 'http://localhost:3000/modules/04?unit=2',
      expectedButtons: ['Advance to Topic 2.2: Understanding Alerts', '2.1 Raw Events', '2.2 Events vs Alerts']
    },
    {
      unit: 'Unit 2 (Topic 2.2)',
      url: 'http://localhost:3000/modules/04?topic=topic-2-2',
      expectedButtons: ['Advance to Topic 2.4: Understanding Cases']
    },
    {
      unit: 'Unit 2 (Assessment)',
      url: 'http://localhost:3000/modules/04?assessment=unit-2-assessment',
      expectedButtons: ['Submit &amp; Certify Unit 2 (+100 XP)']
    },
    {
      unit: 'Unit 3 (Alert Triage)',
      url: 'http://localhost:3000/modules/04?unit=3',
      expectedButtons: ['Next Alert', 'Submit &amp; Proceed to Unit 4: False Positives']
    },
    {
      unit: 'Unit 4 (False Positives)',
      url: 'http://localhost:3000/modules/04?unit=4',
      expectedButtons: ['Proceed to Unit 4 Assessment', 'Submit &amp; Proceed to Unit 5: Severity &amp; SLAs']
    },
    {
      unit: 'Unit 5 (Severity & SLAs)',
      url: 'http://localhost:3000/modules/04?unit=5',
      expectedButtons: ['Proceed to Unit 5 Assessment', 'Submit &amp; Proceed to Unit 6: Escalation &amp; Routing']
    },
    {
      unit: 'Unit 6 (Escalation & Routing)',
      url: 'http://localhost:3000/modules/04?unit=6',
      expectedButtons: ['Proceed to Unit 6 Assessment', 'Submit &amp; Proceed to Unit 7: Documentation &amp; Capstone']
    },
    {
      unit: 'Unit 7 (Documentation & Capstone)',
      url: 'http://localhost:3000/modules/04?unit=7',
      expectedButtons: ['Next Section', 'Complete Module 04 &amp; Graduate']
    }
  ];

  let allPassed = true;
  for (const c of checks) {
    const res = await fetchPage(c.url, authCookie);
    console.log(`\n--- Testing ${c.unit} [${res.status}] ---`);
    for (const btn of c.expectedButtons) {
      const found = res.body && res.body.includes(btn);
      console.log(`  Button "${btn}": ${found ? '✅ PASS' : '❌ FAIL'}`);
      if (!found) allPassed = false;
    }
  }

  console.log(`\n========================================`);
  console.log(`ALL BUTTON CHECKS: ${allPassed ? '✅ ALL PASSED' : '❌ SOME FAILED'}`);
  console.log(`========================================`);
}

run();
