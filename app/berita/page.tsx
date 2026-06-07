import type { Metadata } from "next";
import db from "@/lib/db";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Berita & Kegiatan - PMI Kota Tasikmalaya",
  description: "Berita terbaru dan kegiatan Palang Merah Indonesia (PMI) Kota Tasikmalaya.",
};

export default async function NewsPage() {
  const [rows] = await db.query('SELECT * FROM news ORDER BY created_at DESC') as any;

  return (
    <>
      <section className="hero" style={{ height: '300px' }}>
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <h1>BERITA & KEGIATAN TERBARU</h1>
        </div>
      </section>

      <section className="info-section" style={{ padding: "60px 0", background: "#f9f9f9" }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
            {rows.length === 0 ? (
              <p style={{ gridColumn: '1 / -1', textAlign: 'center', fontSize: '18px', color: '#666' }}>Belum ada berita diterbitkan.</p>
            ) : rows.map((item: any) => (
              <Link href={`/berita/${item.id}`} key={item.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="news-card" style={{ 
                  background: 'white', 
                  borderRadius: '12px', 
                  overflow: 'hidden', 
                  boxShadow: '0 8px 25px rgba(0,0,0,0.06)',
                  transition: 'transform 0.3s ease, boxShadow 0.3s ease',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <div style={{ height: '220px', overflow: 'hidden' }}>
                    <img 
                      src={item.image_url || "https://via.placeholder.com/600x400?text=Berita+PMI"} 
                      alt={item.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      className="news-img"
                    />
                  </div>
                  <div style={{ padding: '25px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ fontSize: '13px', color: '#db261f', fontWeight: 'bold', marginBottom: '10px' }}>
                      <i className="far fa-calendar-alt" style={{ marginRight: '5px' }}></i>
                      {new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </div>
                    <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px', lineHeight: '1.4' }}>
                      {item.title}
                    </h3>
                    <p style={{ color: '#666', fontSize: '15px', lineHeight: '1.6', flex: 1 }}>
                      {item.content.replace(/<[^>]*>?/gm, '').substring(0, 120)}...
                    </p>
                    <div style={{ marginTop: '20px', fontWeight: '600', color: '#0066cc', display: 'flex', alignItems: 'center', gap: '5px' }}>
                      Baca Selengkapnya <i className="fas fa-arrow-right" style={{ fontSize: '12px' }}></i>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <style dangerouslySetInnerHTML={{__html: `
            .news-card:hover { transform: translateY(-8px); box-shadow: 0 15px 35px rgba(219,38,31,0.15) !important; }
            .news-card:hover .news-img { transform: scale(1.05); transition: transform 0.4s ease; }
            .news-img { transition: transform 0.4s ease; }
          `}} />
        </div>
      </section>
    </>
  );
}
