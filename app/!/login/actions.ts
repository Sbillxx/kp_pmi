'use server';

import bcrypt from 'bcryptjs';
import db from '@/lib/db';
import { createSession } from '@/lib/session';
import { redirect } from 'next/navigation';

export async function loginAction(prevState: any, formData: FormData) {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  if (!username || !password) {
    return { error: 'Username dan Password harus diisi!' };
  }

  try {
    const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]) as any;
    
    if (rows.length === 0) {
      return { error: 'Username atau password salah!' };
    }

    const user = rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return { error: 'Username atau password salah!' };
    }

    // Create session
    await createSession(user.id, user.username);
  } catch (error) {
    console.error('Login error:', error);
    return { error: 'Terjadi kesalahan sistem.' };
  }

  redirect('/admin');
}
