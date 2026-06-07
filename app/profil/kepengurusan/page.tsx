import type { Metadata } from "next";
import db from "@/lib/db";

export const metadata: Metadata = {
  title: "Kepengurusan - PMI Kota Tasikmalaya",
  description: "Daftar Kepengurusan Palang Merah Indonesia (PMI) Kota Tasikmalaya.",
};

export default async function KepengurusanPage() {
  const [rows] = await db.query('SELECT * FROM management ORDER BY id ASC') as any;

  return (
    <>
      <section className="hero" style={{ height: '300px' }}>
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <h1>STRUKTUR KEPENGURUSAN</h1>
        </div>
      </section>

      <section className="info-section">
        <div className="container">
          {rows.length === 0 ? (
            <p style={{ textAlign: 'center', padding: '40px' }}>Data kepengurusan belum tersedia.</p>
          ) : rows.map((item: any) => (
            <div key={item.id} style={{ background: 'white', borderRadius: '12px', padding: '30px', marginBottom: '40px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #eee', paddingBottom: '15px', marginBottom: '25px', flexWrap: 'wrap', gap: '15px' }}>
                <h2 style={{ margin: 0, color: '#333' }}>{item.title || 'Struktur Organisasi'}</h2>
                <div style={{ fontSize: '14px', color: '#666', fontStyle: 'italic' }}>
                  Update Terakhir: {item.updated_at ? new Date(item.updated_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '-'}
                </div>
              </div>

              {item.image_url && (
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                  <img 
                    src={item.image_url} 
                    alt="Bagan Struktur Kepengurusan"
                    style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px', border: '1px solid #ddd' }}
                  />
                </div>
              )}

              {item.description && (
                <div style={{ lineHeight: '1.8', color: '#444', marginBottom: '25px', fontSize: '16px' }} dangerouslySetInnerHTML={{ __html: item.description.replace(/\n/g, '<br/>') }} />
              )}

              {item.document_url && (
                <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px', borderLeft: '4px solid #db261f', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '15px' }}>
                  <div>
                    <h4 style={{ margin: '0 0 5px 0', color: '#333' }}>Dokumen SK Kepengurusan</h4>
                    <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>Unduh atau lihat salinan resmi SK Kepengurusan.</p>
                  </div>
                  <a href={item.document_url} target="_blank" rel="noopener noreferrer" style={{ 
                    padding: '10px 20px', 
                    background: '#db261f', 
                    color: 'white', 
                    textDecoration: 'none', 
                    borderRadius: '6px',
                    fontWeight: 'bold',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    📄 Lihat Dokumen SK
                  </a>
                </div>
              )}

            </div>
          ))}
        </div>
      </section>
    </>
  );
}
