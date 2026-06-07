import { getUnits, getUnitById } from './actions';
import Link from 'next/link';
import UnitForm from './UnitForm';
import DeleteUnitButton from './DeleteUnitButton';

export default async function UnitsAdmin({ searchParams }: { searchParams: Promise<{ edit?: string, new?: string }> }) {
  const sp = await searchParams;
  const isEditing = sp.edit;
  const isNew = sp.new === 'true';

  let unitData = null;
  if (isEditing) {
    unitData = await getUnitById(parseInt(isEditing));
  }

  const units = await getUnits();

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ fontSize: '28px', color: '#222232' }}>Manajemen Galeri Unit (Kendaraan)</h1>
        {!isNew && !isEditing && (
          <Link href="/admin/units?new=true" style={{ background: '#db261f', color: '#fff', padding: '10px 20px', borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold' }}>
            + Tambah Unit Baru
          </Link>
        )}
      </div>

      {(isNew || isEditing) ? (
        <UnitForm unitData={unitData} />
      ) : (
        <div style={{ background: '#fff', borderRadius: '12px', padding: '20px', boxShadow: '0 5px 20px rgba(0,0,0,0.05)' }}>
          {units.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#888', padding: '40px 0' }}>Belum ada data unit. Silakan tambah baru.</p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f5f5f5', textAlign: 'left' }}>
                  <th style={{ padding: '15px', borderBottom: '2px solid #ddd' }}>Foto</th>
                  <th style={{ padding: '15px', borderBottom: '2px solid #ddd' }}>Nama/Jenis Kendaraan</th>
                  <th style={{ padding: '15px', borderBottom: '2px solid #ddd', textAlign: 'center' }}>Jumlah Unit</th>
                  <th style={{ padding: '15px', borderBottom: '2px solid #ddd', textAlign: 'right' }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {units.map((u) => (
                  <tr key={u.id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '15px' }}>
                      <img src={u.image_url} alt={u.title} style={{ width: '120px', height: '80px', objectFit: 'cover', borderRadius: '6px' }} />
                    </td>
                    <td style={{ padding: '15px', fontWeight: 'bold' }}>{u.title}</td>
                    <td style={{ padding: '15px', textAlign: 'center' }}>
                      <span style={{ background: '#e6f2ff', color: '#0055cc', padding: '5px 15px', borderRadius: '20px', fontWeight: 'bold' }}>
                        {u.quantity} Unit
                      </span>
                    </td>
                    <td style={{ padding: '15px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                        <Link href={`/admin/units?edit=${u.id}`} style={{ background: '#f0f0f0', color: '#333', padding: '8px 15px', borderRadius: '4px', textDecoration: 'none', fontSize: '14px' }}>
                          Edit
                        </Link>
                        <DeleteUnitButton id={u.id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
