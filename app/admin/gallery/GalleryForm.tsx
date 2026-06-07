"use client";

import { useState } from 'react';
import { saveGallery } from './actions';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function GalleryForm({ item }: { item: any }) {
  const router = useRouter();
  const [title, setTitle] = useState(item?.title || '');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{text: string, type: 'success'|'error'} | null>(null);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setMessage(null);
    try {
      const res = await saveGallery(formData);
      if (res && res.success) {
        setMessage({ text: '✅ Foto berhasil disimpan!', type: 'success' });
        router.push('/admin/gallery');
        router.refresh();
      } else if (res && res.error) {
        setMessage({ text: `❌ Gagal: ${res.error}`, type: 'error' });
      }
    } catch (err) {
      setMessage({ text: '❌ Terjadi kesalahan pada server.', type: 'error' });
    }
    setLoading(false);
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>{item ? 'Edit Foto Galeri' : 'Tambah Foto Galeri'}</h2>
        <Link href="/admin/gallery" style={{ padding: '8px 16px', background: '#ccc', color: '#333', borderRadius: '4px' }}>Kembali</Link>
      </div>

      <form action={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', background: 'white', padding: '25px', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
        {item && <input type="hidden" name="id" value={item.id} />}
        <input type="hidden" name="existing_image_url" value={item?.image_url || ''} />

        <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '6px', border: '1px solid #e9ecef' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#db261f' }}>Foto Galeri *</label>
          {item?.image_url && (
            <div style={{ marginBottom: '10px' }}>
              <img src={item.image_url} alt="Galeri Saat Ini" style={{ maxHeight: '150px', borderRadius: '4px', border: '1px solid #ccc' }} />
            </div>
          )}
          <input type="file" name="image" accept="image/*" required={!item?.image_url} style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', background: 'white' }} />
          <small style={{ color: '#666', display: 'block', marginTop: '5px' }}>Disarankan ukuran file tidak melebihi 2MB.</small>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Judul Foto (Opsional)</label>
          <input type="text" name="title" value={title} onChange={e => setTitle(e.target.value)} style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }} placeholder="Kegiatan Apel PMI..." />
        </div>
        
        {message && (
          <div style={{ 
            padding: '12px', 
            borderRadius: '4px', 
            background: message.type === 'success' ? '#d4edda' : '#f8d7da',
            color: message.type === 'success' ? '#155724' : '#721c24',
            border: `1px solid ${message.type === 'success' ? '#c3e6cb' : '#f5c6cb'}`
          }}>
            {message.text}
          </div>
        )}

        <button type="submit" disabled={loading} style={{ 
          padding: '12px', 
          background: loading ? '#888' : '#db261f', 
          color: 'white', 
          border: 'none', 
          borderRadius: '4px', 
          cursor: loading ? 'not-allowed' : 'pointer', 
          fontWeight: 'bold',
          fontSize: '16px'
        }}>
          {loading ? 'Menyimpan...' : 'Simpan Foto'}
        </button>
      </form>
    </div>
  );
}
