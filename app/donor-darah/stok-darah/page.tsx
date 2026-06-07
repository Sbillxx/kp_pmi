import type { Metadata } from "next";
import db from "@/lib/db";

export const metadata: Metadata = {
  title: "Stok Darah - PMI Kota Tasikmalaya",
  description: "Informasi ketersediaan stok darah PMI Kota Tasikmalaya secara real-time.",
};

export default async function StokDarahPage() {
  const [rows] = await db.query('SELECT * FROM blood_stocks ORDER BY id ASC LIMIT 1') as any;
  
  let latestUpdate = new Date();
  let data = { a_pos: 0, a_neg: 0, b_pos: 0, b_neg: 0, o_pos: 0, o_neg: 0, ab_pos: 0, ab_neg: 0 };
  
  if (rows.length > 0) {
    latestUpdate = new Date(rows[0].updated_at);
    data = rows[0];
  }

  const updateTime = latestUpdate.toLocaleString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }) + " WIB";

  const totalStock = 
    (data.a_pos || 0) + (data.a_neg || 0) + 
    (data.b_pos || 0) + (data.b_neg || 0) + 
    (data.ab_pos || 0) + (data.ab_neg || 0) + 
    (data.o_pos || 0) + (data.o_neg || 0);
    
  const safeTotal = totalStock > 0 ? totalStock : 1;

  const calculatePercentage = (val: number) => {
    const num = Number(val) || 0;
    return ((num / safeTotal) * 100).toFixed(1);
  };

  const bloodTypes = [
    { type: 'A+', count: data.a_pos || 0, percentage: calculatePercentage(data.a_pos) },
    { type: 'A-', count: data.a_neg || 0, percentage: calculatePercentage(data.a_neg) },
    { type: 'B+', count: data.b_pos || 0, percentage: calculatePercentage(data.b_pos) },
    { type: 'B-', count: data.b_neg || 0, percentage: calculatePercentage(data.b_neg) },
    { type: 'O+', count: data.o_pos || 0, percentage: calculatePercentage(data.o_pos) },
    { type: 'O-', count: data.o_neg || 0, percentage: calculatePercentage(data.o_neg) },
    { type: 'AB+', count: data.ab_pos || 0, percentage: calculatePercentage(data.ab_pos) },
    { type: 'AB-', count: data.ab_neg || 0, percentage: calculatePercentage(data.ab_neg) },
  ];

  return (
    <>
      <section className="hero" style={{ height: '300px' }}>
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <h1>STOK DARAH</h1>
        </div>
      </section>

      <section className="info-section" style={{ padding: "60px 0", background: "#f9f9f9" }}>
        <div className="container">
          <div className="section-title" style={{ textAlign: "center" }}>
            <h2>Ketersediaan Stok Darah (Persentase)</h2>
            <div className="title-line" style={{ margin: "10px auto 30px" }}></div>
          </div>

          <div style={{ maxWidth: '800px', margin: '0 auto', background: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <h3 style={{ color: '#db261f', fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>
                Total Stok Darah: {totalStock} Kantung
              </h3>
              <span style={{ display: 'inline-block', background: '#ffebeb', padding: '8px 20px', borderRadius: '30px', color: '#db261f', fontSize: '14px', fontWeight: 'bold' }}>
                <i className="far fa-clock" style={{ marginRight: '8px' }}></i> Update Terakhir: {updateTime}
              </span>
            </div>
            
            <div style={{ display: 'grid', gap: '20px' }}>
              {bloodTypes.map((blood, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <div style={{ width: '60px', fontWeight: 'bold', fontSize: '18px', color: '#222232' }}>{blood.type}</div>
                  <div style={{ flex: 1, background: '#eee', height: '24px', borderRadius: '12px', overflow: 'hidden' }}>
                    <div style={{ 
                      width: `${blood.percentage}%`, 
                      height: '100%', 
                      background: blood.type.includes('-') ? '#ff7b7b' : '#db261f',
                      transition: 'width 1s ease-in-out'
                    }}></div>
                  </div>
                  <div style={{ width: '100px', textAlign: 'right', fontWeight: 'bold' }}>
                    {blood.percentage}% <span style={{ fontSize: '12px', color: '#888', fontWeight: 'normal' }}>({blood.count})</span>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: "40px", textAlign: "center" }}>
              <p style={{ color: "#db261f", fontWeight: "600", fontStyle: "italic", fontSize: "14px" }}>
                *Stok darah sewaktu-waktu dapat berubah. Segera hubungi Markas PMI Kota Tasikmalaya untuk informasi lebih lanjut.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
