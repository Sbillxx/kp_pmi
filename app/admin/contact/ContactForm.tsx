"use client";

import { useState } from 'react';
import { saveContact } from './actions';
import { useRouter } from 'next/navigation';

export default function ContactForm({ contact }: { contact: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{text: string, type: 'success'|'error'} | null>(null);

  // Parse social links if it's JSON
  let initialSocials = { instagram: '', facebook: '', twitter: '', youtube: '' };
  try {
    if (contact?.social_links) {
      const parsed = JSON.parse(contact.social_links);
      initialSocials = { ...initialSocials, ...parsed };
    }
  } catch (e) {
    // If it's not JSON, maybe just keep it as fallback
  }

  const [socials, setSocials] = useState(initialSocials);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setMessage(null);
    
    // Inject the stringified socials into formData
    formData.set('social_links', JSON.stringify(socials));

    try {
      const res = await saveContact(formData);
      if (res && res.success) {
        setMessage({ text: '✅ Data kontak berhasil disimpan!', type: 'success' });
        router.push('/admin/contact');
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
    <form action={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', background: 'white', padding: '25px', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
      {contact?.id && <input type="hidden" name="id" value={contact.id} />}
      
      <div>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Alamat Markas</label>
        <textarea name="address" defaultValue={contact?.address} rows={3} style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }} placeholder="Jl. ..."></textarea>
      </div>
      
      <div>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Nomor Telepon / WhatsApp</label>
        <input type="text" name="phone" defaultValue={contact?.phone} style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }} placeholder="08..." />
      </div>
      
      <div>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Email</label>
        <input type="email" name="email" defaultValue={contact?.email} style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }} placeholder="email@pmi.or.id" />
      </div>

      <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '6px', border: '1px solid #e9ecef' }}>
        <h3 style={{ margin: '0 0 15px 0', fontSize: '16px', color: '#db261f' }}>Sosial Media</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '14px' }}>Instagram URL</label>
            <input 
              type="text" 
              value={socials.instagram} 
              onChange={e => setSocials({...socials, instagram: e.target.value})} 
              style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }} 
              placeholder="https://instagram.com/..." 
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '14px' }}>Facebook URL</label>
            <input 
              type="text" 
              value={socials.facebook} 
              onChange={e => setSocials({...socials, facebook: e.target.value})} 
              style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }} 
              placeholder="https://facebook.com/..." 
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '14px' }}>Twitter / X URL</label>
            <input 
              type="text" 
              value={socials.twitter} 
              onChange={e => setSocials({...socials, twitter: e.target.value})} 
              style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }} 
              placeholder="https://x.com/..." 
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '14px' }}>YouTube URL</label>
            <input 
              type="text" 
              value={socials.youtube} 
              onChange={e => setSocials({...socials, youtube: e.target.value})} 
              style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }} 
              placeholder="https://youtube.com/..." 
            />
          </div>
        </div>
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

      <button type="submit" disabled={loading} style={{ padding: '12px', background: loading ? '#888' : '#db261f', color: 'white', border: 'none', borderRadius: '4px', cursor: loading ? 'not-allowed' : 'pointer', fontWeight: 'bold', fontSize: '16px' }}>
        {loading ? 'Menyimpan...' : 'Simpan Kontak'}
      </button>
    </form>
  );
}
