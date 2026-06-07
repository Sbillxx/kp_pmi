import { getGallery, getGalleryById, deleteGallery } from './actions';
import Link from 'next/link';
import GalleryForm from './GalleryForm';

export default async function GalleryAdmin({ searchParams }: { searchParams: Promise<{ edit?: string, new?: string }> }) {
  const { edit, new: isNew } = await searchParams;
  const isEditing = !!edit || !!isNew;
  
  let item = null;
  if (edit) {
    item = await getGalleryById(parseInt(edit));
  }

  if (isEditing) {
    return <GalleryForm item={item} />;
  }

  const list = await getGallery();

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>Manajemen Galeri</h2>
        <Link href="/admin/gallery?new=true" style={{ padding: '8px 16px', background: '#db261f', color: 'white', borderRadius: '4px', fontWeight: 'bold' }}>+ Tambah Foto</Link>
      </div>
      
      <div style={{ background: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#222232', color: 'white' }}>
              <th style={{ padding: '12px 15px' }}>ID</th>
              <th style={{ padding: '12px 15px' }}>Foto</th>
              <th style={{ padding: '12px 15px' }}>Judul</th>
              <th style={{ padding: '12px 15px', textAlign: 'right' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {list.length === 0 ? (
              <tr><td colSpan={4} style={{ padding: '20px', textAlign: 'center' }}>Belum ada foto galeri.</td></tr>
            ) : list.map(row => (
              <tr key={row.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '12px 15px' }}>{row.id}</td>
                <td style={{ padding: '12px 15px' }}><img src={row.image_url} alt={row.title} style={{ height: '40px', borderRadius: '4px' }} /></td>
                <td style={{ padding: '12px 15px' }}>{row.title}</td>
                <td style={{ padding: '12px 15px', textAlign: 'right', display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                  <Link href={`/admin/gallery?edit=${row.id}`} style={{ color: '#0066cc' }}>Edit</Link>
                  <form action={deleteGallery} style={{ display: 'inline' }}>
                    <input type="hidden" name="id" value={row.id} />
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
