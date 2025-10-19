'use client';

import { signIn } from 'next-auth/react';

export default function SimpleLoginTest() {
  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h1>Login Test Page</h1>
      
      <div style={{ marginTop: '30px' }}>
        <button
          onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
          style={{
            padding: '15px 30px',
            fontSize: '18px',
            backgroundColor: '#4285F4',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          🔐 Sign in with Google (TEST)
        </button>
      </div>

      <div style={{ marginTop: '30px' }}>
        <p>If this button works, NextAuth is configured correctly.</p>
        <p>If you see errors, check the browser console (F12)</p>
      </div>
    </div>
  );
}
