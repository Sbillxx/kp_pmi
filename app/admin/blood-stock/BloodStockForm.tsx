"use client";

import { useState } from 'react';
import { updateBloodStock } from './actions';

export default function BloodStockForm({ initialStocks }: { initialStocks: any[] }) {
  // Use the first (and only) stock item
  const selectedStock = initialStocks[0];
  
  // Format today's date as YYYY-MM-DD for the date input default
  const today = new Date().toISOString().split('T')[0];
  const [date, setDate] = useState(today);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{text: string, type: 'success'|'error'} | null>(null);

  if (!selectedStock) return null;

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setMessage(null);
    try {
      const res = await updateBloodStock(formData);
      if (res && res.success) {
        setMessage({ text: '✅ Stok darah berhasil di-update!', type: 'success' });
        // Sembunyikan pesan setelah 3 detik
        setTimeout(() => setMessage(null), 3000);
      } else {
        setMessage({ text: '❌ Gagal meng-update stok darah.', type: 'error' });
      }
    } catch (err) {
      setMessage({ text: '❌ Terjadi kesalahan pada server.', type: 'error' });
    }
    setLoading(false);
  }

  return (
    <div style={{ background: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
      <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px', paddingBottom: '10px', borderBottom: '1px solid #eee' }}>
        Form Update Stok Darah
      </h3>
      
      <form action={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Tanggal Pencatatan</label>
            <input 
              type="date" 
              name="custom_date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }} 
            />
            <small style={{ color: '#666', display: 'block', marginTop: '5px' }}>Otomatis mengubah "Update Terakhir" di halaman depan.</small>
          </div>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '15px', fontWeight: 'bold' }}>Jumlah Stok per Golongan</label>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))', gap: '15px' }}>
              <div style={{ background: '#f9f9f9', padding: '10px', borderRadius: '8px', textAlign: 'center' }}>
                <label style={{ display: 'block', fontWeight: 'bold', color: '#db261f', marginBottom: '8px' }}>A (+)</label>
                <input type="number" name="a_pos" defaultValue={selectedStock.a_pos} min="0" style={{ width: '100%', padding: '8px', textAlign: 'center', border: '1px solid #ccc', borderRadius: '4px' }} />
              </div>
              <div style={{ background: '#f9f9f9', padding: '10px', borderRadius: '8px', textAlign: 'center' }}>
                <label style={{ display: 'block', fontWeight: 'bold', color: '#888', marginBottom: '8px' }}>A (-)</label>
                <input type="number" name="a_neg" defaultValue={selectedStock.a_neg} min="0" style={{ width: '100%', padding: '8px', textAlign: 'center', border: '1px solid #ccc', borderRadius: '4px' }} />
              </div>
              
              <div style={{ background: '#f9f9f9', padding: '10px', borderRadius: '8px', textAlign: 'center' }}>
                <label style={{ display: 'block', fontWeight: 'bold', color: '#db261f', marginBottom: '8px' }}>B (+)</label>
                <input type="number" name="b_pos" defaultValue={selectedStock.b_pos} min="0" style={{ width: '100%', padding: '8px', textAlign: 'center', border: '1px solid #ccc', borderRadius: '4px' }} />
              </div>
              <div style={{ background: '#f9f9f9', padding: '10px', borderRadius: '8px', textAlign: 'center' }}>
                <label style={{ display: 'block', fontWeight: 'bold', color: '#888', marginBottom: '8px' }}>B (-)</label>
                <input type="number" name="b_neg" defaultValue={selectedStock.b_neg} min="0" style={{ width: '100%', padding: '8px', textAlign: 'center', border: '1px solid #ccc', borderRadius: '4px' }} />
              </div>

              <div style={{ background: '#f9f9f9', padding: '10px', borderRadius: '8px', textAlign: 'center' }}>
                <label style={{ display: 'block', fontWeight: 'bold', color: '#db261f', marginBottom: '8px' }}>O (+)</label>
                <input type="number" name="o_pos" defaultValue={selectedStock.o_pos} min="0" style={{ width: '100%', padding: '8px', textAlign: 'center', border: '1px solid #ccc', borderRadius: '4px' }} />
              </div>
              <div style={{ background: '#f9f9f9', padding: '10px', borderRadius: '8px', textAlign: 'center' }}>
                <label style={{ display: 'block', fontWeight: 'bold', color: '#888', marginBottom: '8px' }}>O (-)</label>
                <input type="number" name="o_neg" defaultValue={selectedStock.o_neg} min="0" style={{ width: '100%', padding: '8px', textAlign: 'center', border: '1px solid #ccc', borderRadius: '4px' }} />
              </div>

              <div style={{ background: '#f9f9f9', padding: '10px', borderRadius: '8px', textAlign: 'center' }}>
                <label style={{ display: 'block', fontWeight: 'bold', color: '#db261f', marginBottom: '8px' }}>AB (+)</label>
                <input type="number" name="ab_pos" defaultValue={selectedStock.ab_pos} min="0" style={{ width: '100%', padding: '8px', textAlign: 'center', border: '1px solid #ccc', borderRadius: '4px' }} />
              </div>
              <div style={{ background: '#f9f9f9', padding: '10px', borderRadius: '8px', textAlign: 'center' }}>
                <label style={{ display: 'block', fontWeight: 'bold', color: '#888', marginBottom: '8px' }}>AB (-)</label>
                <input type="number" name="ab_neg" defaultValue={selectedStock.ab_neg} min="0" style={{ width: '100%', padding: '8px', textAlign: 'center', border: '1px solid #ccc', borderRadius: '4px' }} />
              </div>
            </div>
          </div>

        {message && (
          <div style={{ 
            padding: '12px 20px', 
            borderRadius: '6px', 
            fontWeight: 'bold',
            background: message.type === 'success' ? '#d4edda' : '#f8d7da',
            color: message.type === 'success' ? '#155724' : '#721c24',
            border: `1px solid ${message.type === 'success' ? '#c3e6cb' : '#f5c6cb'}`
          }}>
            {message.text}
          </div>
        )}

        <button type="submit" disabled={loading} style={{ 
          padding: '12px 20px', 
          background: loading ? '#888' : '#db261f', 
          color: 'white', 
          border: 'none', 
          borderRadius: '6px', 
          cursor: loading ? 'not-allowed' : 'pointer', 
          fontWeight: 'bold',
          fontSize: '16px',
          marginTop: '10px'
        }}>
          {loading ? 'Menyimpan...' : 'Update Stok Darah'}
        </button>
      </form>
    </div>
  );
}
