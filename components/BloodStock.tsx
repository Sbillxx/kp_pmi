import db from '@/lib/db';

export default async function BloodStock() {
  const [rows] = await db.query('SELECT * FROM blood_stocks ORDER BY id ASC LIMIT 1') as any;
  
  // Ambil waktu update terbaru
  let latestUpdate = new Date();
  if (rows.length > 0) {
    latestUpdate = new Date(rows[0].updated_at);
  }

  const updateTime = latestUpdate.toLocaleString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }) + " WIB";

  return (
    <section className="blood-stock-section" id="stok-darah">
      <div className="container">
        <div className="section-title">
          <h2>STOK DARAH HARI INI</h2>
          <div className="title-line"></div>
          {updateTime && <p className="update-time" style={{ marginTop: "10px", fontStyle: "italic", color: "#666" }}>Update Terakhir: {updateTime}</p>}
        </div>
        <div className="blood-table-wrapper" style={{ overflowX: "auto" }}>
          <table className="blood-table" style={{ width: "100%", textAlign: "center", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th colSpan={2}>A</th>
                <th colSpan={2}>B</th>
                <th colSpan={2}>O</th>
                <th colSpan={2}>AB</th>
              </tr>
              <tr>
                <th>+</th>
                <th>-</th>
                <th>+</th>
                <th>-</th>
                <th>+</th>
                <th>-</th>
                <th>+</th>
                <th>-</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row: any, index: number) => (
                <tr key={index}>
                  <td><span className="stock-count">{row.a_pos}</span></td>
                  <td><span className="stock-count" style={{ color: "#888" }}>{row.a_neg}</span></td>
                  <td><span className="stock-count">{row.b_pos}</span></td>
                  <td><span className="stock-count" style={{ color: "#888" }}>{row.b_neg}</span></td>
                  <td><span className="stock-count">{row.o_pos}</span></td>
                  <td><span className="stock-count" style={{ color: "#888" }}>{row.o_neg}</span></td>
                  <td><span className="stock-count">{row.ab_pos}</span></td>
                  <td><span className="stock-count" style={{ color: "#888" }}>{row.ab_neg}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ marginTop: "15px", textAlign: "center" }}>
          <p style={{ color: "var(--primary-color, #dc2626)", fontWeight: "600", fontStyle: "italic", fontSize: "0.95rem" }}>
            *Stok darah sewaktu-waktu dapat berubah*
          </p>
        </div>
      </div>
    </section>
  );
}
