import db from "@/lib/db";

export default async function Banners() {
  let banners = [];
  try {
    const [rows] = await db.query('SELECT * FROM banners WHERE is_active = 1 ORDER BY created_at DESC') as any;
    banners = rows;
  } catch (e) {
    console.error("Failed to fetch banners", e);
  }

  if (banners.length === 0) return null;

  return (
    <section className="banners-section" style={{ padding: "40px 0", background: "#f9f9f9" }}>
      <div className="container">
        <div style={{ 
          maxWidth: "1200px", 
          margin: "0 auto", 
          borderRadius: "12px", 
          overflow: "hidden", 
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          position: "relative"
        }}>
          {/* Untuk saat ini kita tampilkan banner pertama, atau bisa dibuat slider CSS */}
          <div className="banner-track" style={{ display: "flex", overflowX: "auto", scrollSnapType: "x mandatory", scrollBehavior: "smooth" }}>
            {banners.map((banner: any, idx: number) => (
              <div key={banner.id} style={{ flex: "0 0 100%", scrollSnapAlign: "start" }}>
                <img 
                  src={banner.image_url} 
                  alt={`Banner PMI ${idx + 1}`} 
                  style={{ width: "100%", height: "auto", display: "block", aspectRatio: "1200/250", objectFit: "cover" }} 
                />
              </div>
            ))}
          </div>
          
          {banners.length > 1 && (
            <div style={{ position: "absolute", bottom: "10px", left: "0", right: "0", display: "flex", justifyContent: "center", gap: "8px" }}>
              {banners.map((_: any, idx: number) => (
                <div key={idx} style={{ width: "10px", height: "10px", borderRadius: "50%", background: idx === 0 ? "#db261f" : "rgba(255,255,255,0.7)", boxShadow: "0 2px 4px rgba(0,0,0,0.2)" }}></div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
