'use server';

import db from '@/lib/db';
import { revalidatePath } from 'next/cache';
import fs from 'fs/promises';
import path from 'path';

export async function getUnits() {
  const [rows] = await db.query('SELECT * FROM units ORDER BY created_at DESC');
  return rows as any[];
}

export async function getUnitById(id: number) {
  const [rows] = await db.query('SELECT * FROM units WHERE id = ?', [id]) as any;
  return rows[0] || null;
}

export async function saveUnit(formData: FormData) {
  try {
    const id = formData.get('id');
    const title = formData.get('title') as string;
    const quantity = parseInt(formData.get('quantity') as string) || 1;
    
    let image_url = formData.get('existing_image_url') as string || '';
    const file = formData.get('image') as File | null;

    if (!title) {
      throw new Error("Judul kendaraan harus diisi!");
    }

    if (file && file.size > 0) {
      const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'units');
      await fs.mkdir(uploadDir, { recursive: true });

      const buffer = Buffer.from(await file.arrayBuffer());
      const filename = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
      await fs.writeFile(path.join(uploadDir, filename), buffer);
      
      image_url = `/uploads/units/${filename}`;
    }

    if (!image_url && !id) {
      throw new Error("Gambar kendaraan harus diunggah untuk data baru!");
    }

    if (id) {
      await db.query(
        'UPDATE units SET title=?, quantity=?, image_url=? WHERE id=?',
        [title, quantity, image_url, id]
      );
    } else {
      await db.query(
        'INSERT INTO units (title, quantity, image_url) VALUES (?, ?, ?)',
        [title, quantity, image_url]
      );
    }

    revalidatePath('/admin/units');
    revalidatePath('/unit');
    
    return { success: true };
  } catch (err: any) {
    console.error("saveUnit Error:", err);
    return { error: err.message || 'Terjadi kesalahan pada server.' };
  }
}

export async function deleteUnit(formData: FormData) {
  const id = formData.get('id');
  if (id) {
    await db.query('DELETE FROM units WHERE id=?', [id]);
    revalidatePath('/admin/units');
    revalidatePath('/unit');
  }
}
