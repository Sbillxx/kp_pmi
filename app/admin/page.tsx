export default function AdminDashboard() {
  return (
    <div>
      <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>Ringkasan Sistem</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', color: '#666', margin: '0 0 10px' }}>Total Produk Darah</h3>
          <p style={{ fontSize: '28px', fontWeight: 'bold', margin: 0 }}>3</p>
        </div>
        
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', color: '#666', margin: '0 0 10px' }}>Iklan Aktif</h3>
          <p style={{ fontSize: '28px', fontWeight: 'bold', margin: 0 }}>0</p>
        </div>
        
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', color: '#666', margin: '0 0 10px' }}>Update Terakhir Stok Darah</h3>
          <p style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>Belum ada data</p>
        </div>
      </div>
    </div>
  );
}
