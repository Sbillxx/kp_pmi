'use server';

import db from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function getContact() {
  const [rows] = await db.query('SELECT * FROM contacts LIMIT 1') as any;
  return rows[0] || null;
}

export async function saveContact(formData: FormData) {
  try {
    const id = formData.get('id');
    const address = formData.get('address') as string;
    const phone = formData.get('phone') as string;
    const email = formData.get('email') as string;
    const social_links = formData.get('social_links') as string;

    if (id) {
      await db.query(
        'UPDATE contacts SET address=?, phone=?, email=?, social_links=? WHERE id=?',
        [address, phone, email, social_links, id]
      );
    } else {
      await db.query(
        'INSERT INTO contacts (address, phone, email, social_links) VALUES (?, ?, ?, ?)',
        [address, phone, email, social_links]
      );
    }

    revalidatePath('/admin/contact');
    revalidatePath('/'); // Contacts are in footer, so revalidate homepage
    return { success: true };
  } catch (err: any) {
    console.error("saveContact error:", err);
    return { error: err.message || "Terjadi kesalahan pada server." };
  }
}
