'use server';

import db from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function getManagement() {
  const [rows] = await db.query('SELECT * FROM management ORDER BY id ASC');
  return rows as any[];
}

export async function getManagementById(id: number) {
  const [rows] = await db.query('SELECT * FROM management WHERE id = ?', [id]) as any;
  return rows[0];
}

import fs from 'fs/promises';
import path from 'path';

export async function saveManagement(formData: FormData) {
  try {
    const id = formData.get('id');
    const title = formData.get('title') as string || '';
    const description = formData.get('description') as string || '';

    let image_url = formData.get('existing_image_url') as string || '';
    let document_url = formData.get('existing_document_url') as string || '';

    const imageFile = formData.get('image') as File | null;
    const documentFile = formData.get('document') as File | null;

    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'management');
    await fs.mkdir(uploadDir, { recursive: true });

    if (imageFile && imageFile.size > 0) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const filename = `img_${Date.now()}_${imageFile.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
      await fs.writeFile(path.join(uploadDir, filename), buffer);
      image_url = `/uploads/management/${filename}`;
    }

    if (documentFile && documentFile.size > 0) {
      const buffer = Buffer.from(await documentFile.arrayBuffer());
      const filename = `doc_${Date.now()}_${documentFile.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
      await fs.writeFile(path.join(uploadDir, filename), buffer);
      document_url = `/uploads/management/${filename}`;
    }

    if (id) {
      await db.query(
        'UPDATE management SET title=?, description=?, image_url=?, document_url=? WHERE id=?',
        [title, description, image_url, document_url, id]
      );
    } else {
      await db.query(
        'INSERT INTO management (title, description, image_url, document_url) VALUES (?, ?, ?, ?)',
        [title, description, image_url, document_url]
      );
    }

    revalidatePath('/admin/management');
    revalidatePath('/profil/kepengurusan');
    
    return { success: true };
  } catch (err: any) {
    console.error("saveManagement Error: ", err);
    return { error: err.message || 'Unknown error occurred' };
  }
}

export async function deleteManagement(formData: FormData) {
  const id = formData.get('id');
  if (id) {
    await db.query('DELETE FROM management WHERE id=?', [id]);
    revalidatePath('/admin/management');
    revalidatePath('/profil/kepengurusan');
  }
}
