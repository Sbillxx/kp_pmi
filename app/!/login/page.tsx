'use client';

import { useActionState } from 'react';
import { loginAction } from './actions';
import { useFormStatus } from 'react-dom';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      style={{
        width: '100%',
        padding: '12px',
        background: 'var(--primary-red, #db261f)',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: pending ? 'not-allowed' : 'pointer',
        opacity: pending ? 0.7 : 1,
        marginTop: '10px'
      }}
    >
      {pending ? 'Logging in...' : 'Login'}
    </button>
  );
}

export default function LoginPage() {
  const [state, formAction] = useActionState(loginAction, null);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--light-bg, #f5f5f5)'
    }}>
      <div style={{
        background: 'white',
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{
            background: 'transparent',
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 15px'
          }}>
            <img 
              src="/logo-pmi.png" 
              alt="PMI Logo" 
              style={{ height: '50px', width: 'auto', objectFit: 'contain' }} 
            />
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, color: 'var(--deep-navy, #222232)' }}>Admin Login</h1>
          <p style={{ fontSize: '14px', color: 'var(--text-muted, #7c7c82)', margin: '5px 0 0' }}>PMI Kota Tasikmalaya</p>
        </div>

        <form action={formAction} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <label htmlFor="username" style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: '600' }}>Username</label>
            <input
              type="text"
              id="username"
              name="username"
              required
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid var(--border-color, #ebebeb)',
                borderRadius: '6px',
                fontSize: '14px',
                outline: 'none'
              }}
              placeholder="Masukkan username"
            />
          </div>

          <div>
            <label htmlFor="password" style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: '600' }}>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid var(--border-color, #ebebeb)',
                borderRadius: '6px',
                fontSize: '14px',
                outline: 'none'
              }}
              placeholder="Masukkan password"
            />
          </div>

          {state?.error && (
            <div style={{ color: 'red', fontSize: '14px', textAlign: 'center', background: '#ffebee', padding: '10px', borderRadius: '6px' }}>
              {state.error}
            </div>
          )}

          <SubmitButton />
        </form>
      </div>
    </div>
  );
}
