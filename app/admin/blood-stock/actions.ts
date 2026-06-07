'use server';

import db from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function getBloodStocks() {
  const [rows] = await db.query('SELECT * FROM blood_stocks ORDER BY id ASC LIMIT 1');
  return rows as any[];
}

export async function updateBloodStock(formData: FormData) {
  try {
    const id = 1; // Force ID 1 since we only have one row now

    const a_pos = parseInt(formData.get('a_pos') as string) || 0;
    const a_neg = parseInt(formData.get('a_neg') as string) || 0;
    const b_pos = parseInt(formData.get('b_pos') as string) || 0;
    const b_neg = parseInt(formData.get('b_neg') as string) || 0;
    const o_pos = parseInt(formData.get('o_pos') as string) || 0;
    const o_neg = parseInt(formData.get('o_neg') as string) || 0;
    const ab_pos = parseInt(formData.get('ab_pos') as string) || 0;
    const ab_neg = parseInt(formData.get('ab_neg') as string) || 0;
    
    let custom_date = formData.get('custom_date') as string;
    if (!custom_date) {
      // Fallback to MySQL NOW() equivalent if no date provided
      custom_date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    } else {
      // Append time to date if only YYYY-MM-DD was provided
      if (custom_date.length === 10) {
        custom_date += ' ' + new Date().toTimeString().slice(0, 8);
      }
    }

    await db.query(
      `UPDATE blood_stocks 
       SET a_pos=?, a_neg=?, b_pos=?, b_neg=?, o_pos=?, o_neg=?, ab_pos=?, ab_neg=?, updated_at=? 
       WHERE id=?`,
      [a_pos, a_neg, b_pos, b_neg, o_pos, o_neg, ab_pos, ab_neg, custom_date, id]
    );

    revalidatePath('/admin/blood-stock');
    revalidatePath('/'); // Revalidate homepage where blood stock is shown
    return { success: true };
  } catch (error) {
    console.error('Failed to update blood stock:', error);
    return { error: 'Failed to update' };
  }
}
