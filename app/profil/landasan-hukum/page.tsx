import type { Metadata } from "next";
import db from "@/lib/db";

export const metadata: Metadata = {
  title: "Landasan Hukum - PMI Kota Tasikmalaya",
  description: "Landasan Hukum resmi berdirinya Palang Merah Indonesia (PMI) Kota Tasikmalaya.",
};

export default async function LandasanHukumPage() {
  const [rows] = await db.query('SELECT * FROM legal_basis ORDER BY id ASC') as any;

  return (
    <>
      <section className="hero" style={{ height: '300px' }}>
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <h1>LANDASAN HUKUM</h1>
        </div>
      </section>

      <section className="info-section">
        <div className="container">
          <div className="legal-grid">
            {rows.length === 0 ? (
              <p style={{ gridColumn: '1 / -1', textAlign: 'center' }}>Data landasan hukum belum tersedia.</p>
            ) : rows.map((item: any, index: number) => (
                <div key={index} style={{ marginBottom: "20px", padding: "20px", background: "#f9f9f9", borderRadius: "8px", borderLeft: "4px solid var(--primary-color, #dc2626)" }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
                    <div>
                      <h3 style={{ margin: "0 0 10px 0", fontSize: "1.2rem" }}>{item.title}</h3>
                      {(item.document_number || item.year) && (
                        <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '10px', fontWeight: 'bold' }}>
                          {item.document_number && `Nomor: ${item.document_number} `}
                          {item.year && `Tahun: ${item.year}`}
                        </div>
                      )}
                    </div>
                    
                    {item.file_url && (
                      <a href={item.file_url} target="_blank" rel="noopener noreferrer" style={{ 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        gap: '5px', 
                        padding: '8px 15px', 
                        background: '#dc261f', 
                        color: 'white', 
                        textDecoration: 'none', 
                        borderRadius: '4px',
                        fontWeight: 'bold',
                        fontSize: '0.9rem'
                      }}>
                        📄 Lihat/Unduh PDF
                      </a>
                    )}
                  </div>
                  
                  {item.description && (
                    <div style={{ lineHeight: "1.6", color: "#444", marginTop: "10px" }} dangerouslySetInnerHTML={{ __html: item.description.replace(/\n/g, '<br/>') }} />
                  )}
                </div>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
