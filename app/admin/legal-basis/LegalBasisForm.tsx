"use client";

import { useState } from 'react';
import { saveLegalBasis } from './actions';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LegalBasisForm({ item }: { item: any }) {
  const router = useRouter();
  const [title, setTitle] = useState(item?.title || '');
  const [documentNumber, setDocumentNumber] = useState(item?.document_number || '');
  const [year, setYear] = useState(item?.year || '');
  const [description, setDescription] = useState(item?.description || '');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{text: string, type: 'success'|'error'} | null>(null);

  // Auto-detect function from filename
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileName = file.name.replace(/\.[^/.]+$/, ""); // Remove extension
    
    // Example regex for parsing "UU_Nomor_1_Tahun_2018_tentang_Kepalangmerahan"
    // Or "Permenkes No 91 Tahun 2015"
    let detectedNumber = '';
    let detectedYear = '';
    let detectedTitle = fileName.replace(/_/g, ' '); // Initial fallback title

    // Match Year (4 digits preceded by Tahun/Thn/Year or just standalone 20xx)
    const yearMatch = fileName.match(/(?:Tahun|Thn)?\s*[_]?\s*(20\d{2}|19\d{2})/i);
    if (yearMatch && yearMatch[1]) {
      detectedYear = yearMatch[1];
    }

    // Match Number (Digits preceded by No/Nomor/Nr)
    const numMatch = fileName.match(/(?:No|Nomor|Nr)\.?\s*[_]?\s*(\d+)/i);
    if (numMatch && numMatch[1]) {
      detectedNumber = numMatch[1];
    }

    // Clean up title if possible
    // e.g. "UU Nomor 1 Tahun 2018 tentang Kepalangmerahan" -> "UU tentang Kepalangmerahan"
    let cleanTitle = detectedTitle;
    if (detectedYear || detectedNumber) {
      cleanTitle = cleanTitle.replace(new RegExp(`(?:No|Nomor|Nr)\\.?\\s*[_]?\\s*${detectedNumber}`, 'i'), '');
      cleanTitle = cleanTitle.replace(new RegExp(`(?:Tahun|Thn)?\\s*[_]?\\s*${detectedYear}`, 'i'), '');
      // Clean up multiple spaces
      cleanTitle = cleanTitle.replace(/\s+/g, ' ').trim();
    }

    // Update state to auto-fill
    setDocumentNumber(detectedNumber);
    setYear(detectedYear);
    setTitle(cleanTitle);
  };

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setMessage(null);
    try {
      const res = await saveLegalBasis(formData);
      if (res && res.success) {
        setMessage({ text: '✅ Data Hukum berhasil disimpan!', type: 'success' });
        router.push('/admin/legal-basis');
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
        <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>{item ? 'Edit Dokumen Hukum' : 'Tambah Dokumen Hukum'}</h2>
        <Link href="/admin/legal-basis" style={{ padding: '8px 16px', background: '#ccc', color: '#333', borderRadius: '4px' }}>Kembali</Link>
      </div>

      <form action={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', background: 'white', padding: '25px', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
        {item && <input type="hidden" name="id" value={item.id} />}
        <input type="hidden" name="existing_file_url" value={item?.file_url || ''} />

        <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '6px', border: '1px solid #e9ecef' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#db261f' }}>Unggah Dokumen (PDF/DOCX)</label>
          {item?.file_url && (
            <div style={{ marginBottom: '10px', fontSize: '14px' }}>
              File tersimpan: <a href={item.file_url} target="_blank" rel="noopener noreferrer" style={{ color: '#0066cc' }}>Lihat Dokumen Saat Ini</a>
            </div>
          )}
          <input 
            type="file" 
            name="file" 
            accept=".pdf,.doc,.docx" 
            onChange={handleFileChange}
            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', background: 'white' }} 
          />
          <small style={{ color: '#666', display: 'block', marginTop: '5px' }}>Sistem akan mencoba membaca otomatis Judul, Nomor, dan Tahun dari nama file.</small>
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Judul Dokumen</label>
          <input type="text" name="title" value={title} onChange={e => setTitle(e.target.value)} required style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }} placeholder="Contoh: UU Kepalangmerahan" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Nomor Dokumen</label>
            <input type="text" name="document_number" value={documentNumber} onChange={e => setDocumentNumber(e.target.value)} style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }} placeholder="Contoh: 1" />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Tahun</label>
            <input type="text" name="year" value={year} onChange={e => setYear(e.target.value)} style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }} placeholder="Contoh: 2018" />
          </div>
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Deskripsi / Ringkasan (Opsional)</label>
          <textarea name="description" value={description} onChange={e => setDescription(e.target.value)} rows={4} style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}></textarea>
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
          {loading ? 'Menyimpan...' : 'Simpan Dokumen'}
        </button>
      </form>
    </div>
  );
}
