import { getNews, getNewsById, saveNews, deleteNews } from './actions';
import Link from 'next/link';

export default async function NewsAdmin({ searchParams }: { searchParams: Promise<{ edit?: string, new?: string }> }) {
  const { edit, new: isNew } = await searchParams;
  const isEditing = !!edit || !!isNew;
  
  let newsItem = null;
  if (edit) {
    newsItem = await getNewsById(parseInt(edit));
  }

  if (isEditing) {
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>{edit ? 'Edit Berita' : 'Tambah Berita'}</h2>
          <Link href="/admin/news" style={{ padding: '8px 16px', background: '#ccc', color: '#333', borderRadius: '4px' }}>Kembali</Link>
        </div>
        
        <form action={saveNews} style={{ display: 'flex', flexDirection: 'column', gap: '15px', background: 'white', padding: '20px', borderRadius: '8px' }}>
          {edit && <input type="hidden" name="id" value={edit} />}
          
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Judul</label>
            <input type="text" name="title" defaultValue={newsItem?.title} required style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }} />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Gambar Berita (Upload)</label>
            {newsItem?.image_url && (
              <div style={{ marginBottom: '10px' }}>
                <img src={newsItem.image_url} alt="Preview" style={{ maxHeight: '100px', borderRadius: '4px' }} />
              </div>
            )}
            <input type="hidden" name="existing_image_url" value={newsItem?.image_url || ''} />
            <input type="file" name="image" accept="image/*" style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }} />
            <small style={{ color: '#666' }}>Pilih gambar jika ingin mengunggah baru.</small>
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Konten Berita</label>
            <textarea name="content" defaultValue={newsItem?.content} required rows={10} style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}></textarea>
          </div>
          
          <button type="submit" style={{ padding: '10px', background: '#db261f', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
            Simpan
          </button>
        </form>
      </div>
    );
  }

  const newsList = await getNews();

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>Manajemen Berita</h2>
        <Link href="/admin/news?new=true" style={{ padding: '8px 16px', background: '#db261f', color: 'white', borderRadius: '4px', fontWeight: 'bold' }}>+ Tambah Berita</Link>
      </div>
      
      <div style={{ background: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#222232', color: 'white' }}>
              <th style={{ padding: '12px 15px' }}>ID</th>
              <th style={{ padding: '12px 15px' }}>Judul</th>
              <th style={{ padding: '12px 15px' }}>Tanggal</th>
              <th style={{ padding: '12px 15px', textAlign: 'right' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {newsList.length === 0 ? (
              <tr><td colSpan={4} style={{ padding: '20px', textAlign: 'center' }}>Belum ada data berita.</td></tr>
            ) : newsList.map(item => (
              <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '12px 15px' }}>{item.id}</td>
                <td style={{ padding: '12px 15px' }}>{item.title}</td>
                <td style={{ padding: '12px 15px' }}>{new Date(item.created_at).toLocaleDateString('id-ID')}</td>
                <td style={{ padding: '12px 15px', textAlign: 'right', display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                  <Link href={`/admin/news?edit=${item.id}`} style={{ color: '#0066cc' }}>Edit</Link>
                  <form action={deleteNews} style={{ display: 'inline' }}>
                    <input type="hidden" name="id" value={item.id} />
                    <button type="submit" style={{ background: 'none', border: 'none', color: '#db261f', cursor: 'pointer', fontSize: '16px' }}>Hapus</button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
