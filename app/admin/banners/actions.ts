'use server';

import db from '@/lib/db';
import { revalidatePath } from 'next/cache';
import fs from 'fs/promises';
import path from 'path';

export async function getBanners() {
  const [rows] = await db.query('SELECT * FROM banners ORDER BY created_at DESC');
  return rows as any[];
}

export async function getBannerById(id: number) {
  const [rows] = await db.query('SELECT * FROM banners WHERE id = ?', [id]) as any;
  return rows[0] || null;
}

export async function saveBanner(formData: FormData) {
  try {
    const id = formData.get('id');
    const is_active = formData.get('is_active') === 'true' ? 1 : 0;
    
    let image_url = formData.get('existing_image_url') as string || '';
    const file = formData.get('image') as File | null;

    if (file && file.size > 0) {
      const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'banners');
      await fs.mkdir(uploadDir, { recursive: true });

      const buffer = Buffer.from(await file.arrayBuffer());
      const filename = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
      await fs.writeFile(path.join(uploadDir, filename), buffer);
      
      image_url = `/uploads/banners/${filename}`;
    }

    if (!image_url) {
      throw new Error("Gambar banner harus diunggah!");
    }

    if (id) {
      await db.query(
        'UPDATE banners SET image_url=?, is_active=? WHERE id=?',
        [image_url, is_active, id]
      );
    } else {
      await db.query(
        'INSERT INTO banners (image_url, is_active) VALUES (?, ?)',
        [image_url, is_active]
      );
    }

    revalidatePath('/admin/banners');
    revalidatePath('/'); // assuming banners are used on the homepage
    
    return { success: true };
  } catch (err: any) {
    console.error("saveBanner Error:", err);
    return { error: err.message || 'Terjadi kesalahan pada server.' };
  }
}

export async function deleteBanner(formData: FormData) {
  const id = formData.get('id');
  if (id) {
    await db.query('DELETE FROM banners WHERE id=?', [id]);
    revalidatePath('/admin/banners');
    revalidatePath('/');
  }
}
