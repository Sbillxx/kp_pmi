"use client";

import { useState } from 'react';
import { saveUnit } from './actions';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function UnitForm({ unitData }: { unitData?: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [preview, setPreview] = useState<string | null>(unitData?.image_url || null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });

    const formData = new FormData(e.currentTarget);
    if (unitData) formData.append('id', unitData.id.toString());

    try {
      const res = await saveUnit(formData);
      if (res && res.success) {
        setMessage({ text: '✅ Data kendaraan berhasil disimpan!', type: 'success' });
        router.push('/admin/units');
        router.refresh();
      } else if (res && res.error) {
        setMessage({ text: `❌ ${res.error}`, type: 'error' });
      }
    } catch (err: any) {
      setMessage({ text: '❌ Terjadi kesalahan.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: '#fff', padding: '30px', borderRadius: '12px', boxShadow: '0 5px 20px rgba(0,0,0,0.05)' }}>
      <h2 style={{ marginBottom: '20px', borderBottom: '2px solid #f0f0f0', paddingBottom: '10px' }}>
        {unitData ? 'Edit Data Kendaraan' : 'Tambah Kendaraan Baru'}
      </h2>

      {message.text && (
        <div style={{ 
          padding: '15px', 
          marginBottom: '20px', 
          borderRadius: '8px',
          background: message.type === 'success' ? '#e6ffe6' : '#ffe6e6',
          color: message.type === 'success' ? '#006600' : '#cc0000',
          fontWeight: '500'
        }}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Nama/Jenis Kendaraan <span style={{color:'red'}}>*</span></label>
          <input 
            type="text" 
            name="title" 
            defaultValue={unitData?.title || ''} 
            required
            style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '6px' }}
            placeholder="Misal: Ambulans Gawat Darurat"
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Jumlah Unit (Quantity) <span style={{color:'red'}}>*</span></label>
          <input 
            type="number" 
            name="quantity" 
            defaultValue={unitData?.quantity || 1} 
            min="1"
            required
            style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '6px' }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Foto Kendaraan {unitData ? '' : <span style={{color:'red'}}>*</span>}</label>
          
          {preview && (
            <div style={{ marginBottom: '15px' }}>
              <p style={{ fontSize: '12px', color: '#666', marginBottom: '5px' }}>Preview:</p>
              <img src={preview} alt="Preview" style={{ maxWidth: '300px', borderRadius: '8px', border: '1px solid #eee' }} />
            </div>
          )}

          <input 
            type="file" 
            name="image" 
            accept="image/*"
            onChange={handleImageChange}
            required={!unitData}
            style={{ width: '100%', padding: '10px', background: '#f9f9f9', border: '1px dashed #ccc', borderRadius: '6px' }}
          />
          {unitData && (
            <input type="hidden" name="existing_image_url" value={unitData.image_url} />
          )}
        </div>

        <div style={{ display: 'flex', gap: '15px', marginTop: '30px' }}>
          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              padding: '12px 25px', 
              background: '#db261f', 
              color: 'white', 
              border: 'none', 
              borderRadius: '6px', 
              cursor: loading ? 'not-allowed' : 'pointer',
              fontWeight: 'bold',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? 'Menyimpan...' : 'Simpan Data'}
          </button>
          <Link href="/admin/units" style={{
            padding: '12px 25px', 
            background: '#eee', 
            color: '#333', 
            textDecoration: 'none', 
            borderRadius: '6px',
            fontWeight: 'bold'
          }}>
            Batal
          </Link>
        </div>
      </form>
    </div>
  );
}
