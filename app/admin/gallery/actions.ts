'use server';

import db from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function getGallery() {
  const [rows] = await db.query('SELECT * FROM gallery ORDER BY created_at DESC');
  return rows as any[];
}

export async function getGalleryById(id: number) {
  const [rows] = await db.query('SELECT * FROM gallery WHERE id = ?', [id]) as any;
  return rows[0];
}

import fs from 'fs/promises';
import path from 'path';

export async function saveGallery(formData: FormData) {
  try {
    const id = formData.get('id');
    const title = formData.get('title') as string || '';
    
    let image_url = formData.get('existing_image_url') as string || '';
    const file = formData.get('image') as File | null;

    if (file && file.size > 0) {
      const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'gallery');
      await fs.mkdir(uploadDir, { recursive: true });

      const buffer = Buffer.from(await file.arrayBuffer());
      const filename = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
      await fs.writeFile(path.join(uploadDir, filename), buffer);
      
      image_url = `/uploads/gallery/${filename}`;
    }

    if (!image_url) {
      throw new Error("Gambar harus diunggah!");
    }

    if (id) {
      await db.query(
        'UPDATE gallery SET title=?, image_url=? WHERE id=?',
        [title, image_url, id]
      );
    } else {
      await db.query(
        'INSERT INTO gallery (title, image_url) VALUES (?, ?)',
        [title, image_url]
      );
    }

    revalidatePath('/admin/gallery');
    revalidatePath('/galeri');
    
    return { success: true };
  } catch (err: any) {
    console.error("saveGallery Error:", err);
    return { error: err.message || 'Terjadi kesalahan pada server.' };
  }
}

export async function deleteGallery(formData: FormData) {
  const id = formData.get('id');
  if (id) {
    await db.query('DELETE FROM gallery WHERE id=?', [id]);
    revalidatePath('/admin/gallery');
    revalidatePath('/galeri');
  }
}
