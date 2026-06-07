'use server';

import db from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function getNews() {
  const [rows] = await db.query('SELECT * FROM news ORDER BY created_at DESC');
  return rows as any[];
}

export async function getNewsById(id: number) {
  const [rows] = await db.query('SELECT * FROM news WHERE id = ?', [id]) as any;
  return rows[0];
}

import fs from 'fs/promises';
import path from 'path';

export async function saveNews(formData: FormData) {
  const id = formData.get('id');
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  
  let image_url = formData.get('existing_image_url') as string || '';

  const file = formData.get('image') as File | null;
  if (file && file.size > 0) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'news');
    
    await fs.mkdir(uploadDir, { recursive: true });
    
    const filePath = path.join(uploadDir, filename);
    await fs.writeFile(filePath, buffer);
    
    image_url = `/uploads/news/${filename}`;
  }

  if (id) {
    await db.query(
      'UPDATE news SET title=?, content=?, image_url=? WHERE id=?',
      [title, content, image_url, id]
    );
  } else {
    await db.query(
      'INSERT INTO news (title, content, image_url) VALUES (?, ?, ?)',
      [title, content, image_url]
    );
  }

  revalidatePath('/admin/news');
  revalidatePath('/'); // Revalidate public pages
  
  // Redirect back to news list
  const { redirect } = await import('next/navigation');
  redirect('/admin/news');
}

export async function deleteNews(formData: FormData) {
  const id = formData.get('id');
  if (id) {
    await db.query('DELETE FROM news WHERE id=?', [id]);
    revalidatePath('/admin/news');
    revalidatePath('/');
  }
}
