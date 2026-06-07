import { getLegalBasis, getLegalBasisById, deleteLegalBasis } from './actions';
import Link from 'next/link';
import LegalBasisForm from './LegalBasisForm';

export default async function LegalBasisAdmin({ searchParams }: { searchParams: Promise<{ edit?: string, new?: string }> }) {
  const { edit, new: isNew } = await searchParams;
  const isEditing = !!edit || !!isNew;
  
  let item = null;
  if (edit) {
    item = await getLegalBasisById(parseInt(edit));
  }

  if (isEditing) {
    return <LegalBasisForm item={item} />;
  }

  const list = await getLegalBasis();

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>Manajemen Landasan Hukum</h2>
        <Link href="/admin/legal-basis?new=true" style={{ padding: '8px 16px', background: '#db261f', color: 'white', borderRadius: '4px', fontWeight: 'bold' }}>+ Tambah Dokumen</Link>
      </div>
      
      <div style={{ background: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#222232', color: 'white' }}>
              <th style={{ padding: '12px 15px' }}>Nomor & Tahun</th>
              <th style={{ padding: '12px 15px' }}>Judul Dokumen</th>
              <th style={{ padding: '12px 15px' }}>Dokumen</th>
              <th style={{ padding: '12px 15px', textAlign: 'right' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {list.length === 0 ? (
              <tr><td colSpan={4} style={{ padding: '20px', textAlign: 'center' }}>Belum ada data dokumen hukum.</td></tr>
            ) : list.map(row => (
              <tr key={row.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '12px 15px' }}>
                  {row.document_number ? `No. ${row.document_number}` : ''} 
                  {row.year ? ` Tahun ${row.year}` : ''}
                </td>
                <td style={{ padding: '12px 15px', fontWeight: 'bold' }}>{row.title}</td>
                <td style={{ padding: '12px 15px' }}>
                  {row.file_url ? (
                    <a href={row.file_url} target="_blank" rel="noopener noreferrer" style={{ color: '#db261f', display: 'flex', alignItems: 'center', gap: '5px' }}>
                      📄 Lihat PDF
                    </a>
                  ) : (
                    <span style={{ color: '#888' }}>-</span>
                  )}
                </td>
                <td style={{ padding: '12px 15px', textAlign: 'right', display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                  <Link href={`/admin/legal-basis?edit=${row.id}`} style={{ color: '#0066cc' }}>Edit</Link>
                  <form action={deleteLegalBasis} style={{ display: 'inline' }}>
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
