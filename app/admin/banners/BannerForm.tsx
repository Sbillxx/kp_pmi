"use client";

import { useState } from 'react';
import { saveBanner } from './actions';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Konfigurasi ukuran banner yang diizinkan
const TARGET_WIDTH = 1200;
const TARGET_HEIGHT = 250;

export default function BannerForm({ item }: { item: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{text: string, type: 'success'|'error'} | null>(null);
  
  const [isActive, setIsActive] = useState(item ? item.is_active === 1 : true);

  // Fungsi untuk mengecek dimensi gambar
  const checkImageDimensions = (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        URL.revokeObjectURL(url);
        // Cek apakah ukurannya pas
        if (img.width === TARGET_WIDTH && img.height === TARGET_HEIGHT) {
          resolve(true);
        } else {
          resolve(false);
        }
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        resolve(false);
      };
      img.src = url;
    });
  };

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setMessage(null);
    
    const file = formData.get('image') as File | null;
    
    // Jika user mengunggah file baru, cek dimensinya
    if (file && file.size > 0) {
      const isDimensionValid = await checkImageDimensions(file);
      if (!isDimensionValid) {
        setMessage({ 
          text: `❌ Gambar ditolak! Ukuran gambar wajib pas ${TARGET_WIDTH} x ${TARGET_HEIGHT} pixel.`, 
          type: 'error' 
        });
        setLoading(false);
        return; // Hentikan proses simpan
      }
    } else if (!item?.image_url) {
       // Kasus tambah baru tapi tidak ada file
       setMessage({ text: '❌ Anda harus memilih gambar terlebih dahulu.', type: 'error' });
       setLoading(false);
       return;
    }

    try {
      // Pastikan status aktif masuk ke formData
      formData.set('is_active', isActive ? 'true' : 'false');
      
      const res = await saveBanner(formData);
      if (res && res.success) {
        setMessage({ text: '✅ Banner berhasil disimpan!', type: 'success' });
        router.push('/admin/banners');
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
        <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>{item ? 'Edit Banner (Ads)' : 'Tambah Banner (Ads)'}</h2>
        <Link href="/admin/banners" style={{ padding: '8px 16px', background: '#ccc', color: '#333', borderRadius: '4px' }}>Kembali</Link>
      </div>

      {message && (
        <div style={{ 
          padding: '15px', 
          marginBottom: '20px',
          borderRadius: '4px', 
          background: message.type === 'success' ? '#d4edda' : '#f8d7da',
          color: message.type === 'success' ? '#155724' : '#721c24',
          border: `1px solid ${message.type === 'success' ? '#c3e6cb' : '#f5c6cb'}`,
          fontWeight: 'bold'
        }}>
          {message.text}
        </div>
      )}

      <form action={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', background: 'white', padding: '25px', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
        {item && <input type="hidden" name="id" value={item.id} />}
        <input type="hidden" name="existing_image_url" value={item?.image_url || ''} />

        <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '6px', border: '1px solid #e9ecef' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#db261f' }}>File Gambar Banner *</label>
          <div style={{ fontSize: '14px', marginBottom: '10px', color: '#666' }}>
            Syarat wajib: Ukuran gambar harus sama persis dengan <strong>{TARGET_WIDTH} x {TARGET_HEIGHT} pixel</strong>.
          </div>
          
          {item?.image_url && (
            <div style={{ marginBottom: '10px' }}>
              <img src={item.image_url} alt="Banner Saat Ini" style={{ maxHeight: '150px', borderRadius: '4px', border: '1px solid #ccc' }} />
            </div>
          )}
          <input type="file" name="image" accept="image/*" required={!item?.image_url} style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', background: 'white' }} />
        </div>

        <div>
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 'bold', cursor: 'pointer' }}>
            <input 
              type="checkbox" 
              checked={isActive} 
              onChange={e => setIsActive(e.target.checked)} 
              style={{ width: '20px', height: '20px' }}
            />
            Banner Aktif (Ditampilkan)
          </label>
        </div>

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
          {loading ? 'Menyimpan & Mengecek Dimensi...' : 'Simpan Banner'}
        </button>
      </form>
    </div>
  );
}
