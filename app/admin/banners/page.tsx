import { getBanners, getBannerById, deleteBanner } from './actions';
import Link from 'next/link';
import BannerForm from './BannerForm';

export default async function BannersAdmin({ searchParams }: { searchParams: Promise<{ edit?: string, new?: string }> }) {
  const { edit, new: isNew } = await searchParams;
  const isEditing = !!edit || !!isNew;
  
  let item = null;
  if (edit) {
    item = await getBannerById(parseInt(edit));
  }

  if (isEditing) {
    return <BannerForm item={item} />;
  }

  const list = await getBanners();

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>Manajemen Ads / Banner</h2>
        <Link href="/admin/banners?new=true" style={{ padding: '8px 16px', background: '#db261f', color: 'white', borderRadius: '4px', fontWeight: 'bold' }}>+ Tambah Banner</Link>
      </div>
      
      <div style={{ background: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#222232', color: 'white' }}>
              <th style={{ padding: '12px 15px' }}>ID</th>
              <th style={{ padding: '12px 15px' }}>Preview Banner</th>
              <th style={{ padding: '12px 15px' }}>Status</th>
              <th style={{ padding: '12px 15px', textAlign: 'right' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {list.length === 0 ? (
              <tr><td colSpan={4} style={{ padding: '20px', textAlign: 'center' }}>Belum ada banner terpasang.</td></tr>
            ) : list.map(row => (
              <tr key={row.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '12px 15px' }}>{row.id}</td>
                <td style={{ padding: '12px 15px' }}>
                  <img src={row.image_url} alt="Banner" style={{ height: '50px', borderRadius: '4px', border: '1px solid #ddd' }} />
                </td>
                <td style={{ padding: '12px 15px' }}>
                  {row.is_active ? (
                    <span style={{ padding: '4px 8px', background: '#d4edda', color: '#155724', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}>Aktif</span>
                  ) : (
                    <span style={{ padding: '4px 8px', background: '#f8d7da', color: '#721c24', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}>Nonaktif</span>
                  )}
                </td>
                <td style={{ padding: '12px 15px', textAlign: 'right', display: 'flex', gap: '10px', justifyContent: 'flex-end', alignItems: 'center', height: '50px' }}>
                  <Link href={`/admin/banners?edit=${row.id}`} style={{ color: '#0066cc' }}>Edit</Link>
                  <form action={deleteBanner} style={{ display: 'inline', margin: 0 }}>
                    <input type="hidden" name="id" value={row.id} />
                    <button type="submit" style={{ background: 'none', border: 'none', color: '#db261f', cursor: 'pointer', fontSize: '16px', padding: 0 }}>Hapus</button>
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
