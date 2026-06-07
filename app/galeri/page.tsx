import type { Metadata } from "next";
import db from "@/lib/db";

export const metadata: Metadata = {
  title: "Galeri - PMI Kota Tasikmalaya",
  description: "Galeri foto kegiatan Palang Merah Indonesia (PMI) Kota Tasikmalaya.",
};

export default async function GalleryPage() {
  const [rows] = await db.query('SELECT * FROM gallery ORDER BY created_at DESC') as any;

  return (
    <>
      <section className="hero" style={{ height: '300px' }}>
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <h1>GALERI KEGIATAN</h1>
        </div>
      </section>

      <section className="info-section">
        <div className="container">
          <div className="gallery-masonry" style={{ 
            columnCount: 3, 
            columnGap: '20px',
            padding: '20px 0'
          }}>
            {rows.length === 0 ? (
              <p style={{ textAlign: 'center' }}>Data galeri belum tersedia.</p>
            ) : rows.map((item: any) => (
              <div className="gallery-item" key={item.id} style={{ 
                breakInside: 'avoid', 
                marginBottom: '20px',
                borderRadius: '12px', 
                overflow: 'hidden', 
                boxShadow: '0 8px 25px rgba(0,0,0,0.08)', 
                position: 'relative',
                cursor: 'pointer'
              }}>
                <img 
                  src={item.image_url} 
                  alt={item.title || "Galeri PMI"}
                  style={{ width: '100%', display: 'block', transition: 'transform 0.4s ease' }}
                  className="gallery-img"
                />
                {item.title && (
                  <div className="gallery-caption" style={{ 
                    position: 'absolute', 
                    bottom: 0, 
                    left: 0, 
                    width: '100%', 
                    background: 'linear-gradient(transparent, rgba(0,0,0,0.8))', 
                    color: 'white', 
                    padding: '20px 15px 15px', 
                    fontSize: '15px',
                    fontWeight: '600',
                    opacity: 0,
                    transition: 'opacity 0.3s ease'
                  }}>
                    {item.title}
                  </div>
                )}
              </div>
            ))}
          </div>

          <style dangerouslySetInnerHTML={{__html: `
            .gallery-item:hover .gallery-img { transform: scale(1.05); }
            .gallery-item:hover .gallery-caption { opacity: 1 !important; }
            @media (max-width: 768px) { .gallery-masonry { column-count: 2 !important; } }
            @media (max-width: 480px) { .gallery-masonry { column-count: 1 !important; } }
          `}} />
        </div>
      </section>
    </>
  );
}
