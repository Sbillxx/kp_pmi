'use server';

import db from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function getLegalBasis() {
  const [rows] = await db.query('SELECT * FROM legal_basis ORDER BY id ASC');
  return rows as any[];
}

export async function getLegalBasisById(id: number) {
  const [rows] = await db.query('SELECT * FROM legal_basis WHERE id = ?', [id]) as any;
  return rows[0];
}

import fs from 'fs/promises';
import path from 'path';

export async function saveLegalBasis(formData: FormData) {
  try {
    const id = formData.get('id');
    const title = formData.get('title') as string;
    const description = formData.get('description') as string || '';
    const document_number = formData.get('document_number') as string || '';
    const year = formData.get('year') as string || '';

    let file_url = formData.get('existing_file_url') as string || '';

    const file = formData.get('file') as File | null;
    if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const filename = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
      const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'documents');
      
      await fs.mkdir(uploadDir, { recursive: true });
      
      const filePath = path.join(uploadDir, filename);
      await fs.writeFile(filePath, buffer);
      
      file_url = `/uploads/documents/${filename}`;
    }

    if (id) {
      await db.query(
        'UPDATE legal_basis SET title=?, document_number=?, year=?, description=?, file_url=? WHERE id=?',
        [title, document_number, year, description, file_url, id]
      );
    } else {
      await db.query(
        'INSERT INTO legal_basis (title, document_number, year, description, file_url) VALUES (?, ?, ?, ?, ?)',
        [title, document_number, year, description, file_url]
      );
    }

    revalidatePath('/admin/legal-basis');
    revalidatePath('/profil/landasan-hukum');
    
    return { success: true };
  } catch (err: any) {
    console.error("saveLegalBasis Error: ", err);
    return { error: err.message || 'Unknown error occurred' };
  }
}

export async function deleteLegalBasis(formData: FormData) {
  const id = formData.get('id');
  if (id) {
    await db.query('DELETE FROM legal_basis WHERE id=?', [id]);
    revalidatePath('/admin/legal-basis');
    revalidatePath('/profil/landasan-hukum');
  }
}
