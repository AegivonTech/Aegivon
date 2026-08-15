const email = 'test@test.com';
const password = 'testpassword';
fetch('https://aegivon-9sc9-eight.vercel.app/api/v1/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Origin': 'https://aegivon-ye4j.vercel.app'
  },
  body: JSON.stringify({ email, password })
}).then(async res => {
  console.log('Status:', res.status);
  console.log('Headers:', Object.fromEntries(res.headers.entries()));
  console.log('Body:', await res.text());
}).catch(console.error);
