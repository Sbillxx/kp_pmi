import type { Metadata } from "next";
import db from "@/lib/db";

export const metadata: Metadata = {
  title: "Galeri Unit Kendaraan - PMI Kota Tasikmalaya",
  description: "Inventaris unit kendaraan dan fasilitas operasional PMI Kota Tasikmalaya.",
};

export default async function UnitGalleryPage() {
  const [units] = await db.query('SELECT * FROM units ORDER BY created_at DESC') as any;

  return (
    <>
      <section className="hero" style={{ height: '300px' }}>
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <h1>GALERI UNIT KENDARAAN</h1>
        </div>
      </section>

      <section className="unit-gallery" style={{ padding: '80px 0', background: '#f5f5f5' }}>
        <div className="container">
          <div className="section-title" style={{ textAlign: "center", marginBottom: '50px' }}>
            <h2>Fasilitas Operasional Kami</h2>
            <div className="title-line" style={{ margin: "10px auto 20px" }}></div>
            <p style={{ color: '#666', maxWidth: '600px', margin: '0 auto' }}>
              Berikut adalah galeri inventaris kendaraan operasional yang disiagakan oleh PMI Kota Tasikmalaya untuk mendukung pelayanan kemanusiaan.
            </p>
          </div>

          {units.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '50px', background: 'white', borderRadius: '12px', color: '#888' }}>
              Belum ada data unit kendaraan.
            </div>
          ) : (
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
              gap: '30px' 
            }}>
              {units.map((u: any) => (
                <div key={u.id} style={{
                  background: 'white',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                  transition: 'transform 0.3s ease'
                }}>
                  <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
                    <img 
                      src={u.image_url} 
                      alt={u.title} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{
                      position: 'absolute',
                      top: '15px',
                      right: '15px',
                      background: 'rgba(219, 38, 31, 0.9)',
                      color: 'white',
                      padding: '5px 15px',
                      borderRadius: '20px',
                      fontWeight: 'bold',
                      fontSize: '14px',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
                    }}>
                      {u.quantity} Unit
                    </div>
                  </div>
                  <div style={{ padding: '20px', textAlign: 'center' }}>
                    <h3 style={{ fontSize: '18px', color: '#222232', margin: '0' }}>{u.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
