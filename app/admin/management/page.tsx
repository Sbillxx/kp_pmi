import { getManagement, getManagementById, deleteManagement } from './actions';
import Link from 'next/link';
import ManagementForm from './ManagementForm';

export default async function ManagementAdmin({ searchParams }: { searchParams: Promise<{ edit?: string, new?: string }> }) {
  const { edit, new: isNew } = await searchParams;
  const isEditing = !!edit || !!isNew;
  
  let item = null;
  if (edit) {
    item = await getManagementById(parseInt(edit));
  }

  if (isEditing) {
    return <ManagementForm item={item} />;
  }

  const list = await getManagement();

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>Manajemen Kepengurusan</h2>
        <Link href="/admin/management?new=true" style={{ padding: '8px 16px', background: '#db261f', color: 'white', borderRadius: '4px', fontWeight: 'bold' }}>+ Tambah Data</Link>
      </div>
      
      <div style={{ background: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#222232', color: 'white' }}>
              <th style={{ padding: '12px 15px' }}>Periode / Judul</th>
              <th style={{ padding: '12px 15px' }}>Bagan Struktur</th>
              <th style={{ padding: '12px 15px' }}>Dokumen SK</th>
              <th style={{ padding: '12px 15px' }}>Update Terakhir</th>
              <th style={{ padding: '12px 15px', textAlign: 'right' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {list.length === 0 ? (
              <tr><td colSpan={5} style={{ padding: '20px', textAlign: 'center' }}>Belum ada data kepengurusan.</td></tr>
            ) : list.map(row => (
              <tr key={row.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '12px 15px', fontWeight: 'bold' }}>{row.title || 'Data Kepengurusan'}</td>
                <td style={{ padding: '12px 15px' }}>
                  {row.image_url ? (
                    <img src={row.image_url} alt="Bagan" style={{ height: '40px', borderRadius: '4px' }} />
                  ) : '-'}
                </td>
                <td style={{ padding: '12px 15px' }}>
                  {row.document_url ? (
                    <a href={row.document_url} target="_blank" rel="noopener noreferrer" style={{ color: '#0066cc' }}>📄 Lihat Dokumen</a>
                  ) : '-'}
                </td>
                <td style={{ padding: '12px 15px' }}>
                  {row.updated_at ? new Date(row.updated_at).toLocaleDateString('id-ID') : '-'}
                </td>
                <td style={{ padding: '12px 15px', textAlign: 'right', display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                  <Link href={`/admin/management?edit=${row.id}`} style={{ color: '#0066cc' }}>Edit</Link>
                  <form action={deleteManagement} style={{ display: 'inline' }}>
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
