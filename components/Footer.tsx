import Link from "next/link";
import db from "@/lib/db";

export default async function Footer() {
  let contact = {
    address: "Jl. Otto Iskandardinata No.18, Empangsari, Kec. Tawang, Kab. Tasikmalaya, Jawa Barat 46113",
    phone: "0265-331333",
    email: "pmikotatasikmalaya@gmail.com",
    social_links: ""
  };

  try {
    const [rows] = await db.query('SELECT * FROM contacts LIMIT 1') as any;
    if (rows.length > 0) {
      contact = {
        address: rows[0].address || contact.address,
        phone: rows[0].phone || contact.phone,
        email: rows[0].email || contact.email,
        social_links: rows[0].social_links || contact.social_links
      };
    }
  } catch (e) {
    console.error("Failed to fetch contact", e);
  }

  return (
    <footer className="main-footer">
      <div className="footer-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Mari Bergabung Menjadi Relawan Kemanusiaan!</h2>
            <div className="cta-btns">
              <a href="https://wa.me/628119022021" target="_blank" rel="noopener noreferrer" className="btn btn-outline-white">
                Berdonasi
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col about-col">
              <img src="/logo-pmi.png" alt="PMI Logo" className="footer-logo" />
              <p>
                Palang Merah Indonesia (PMI) Kota Tasikmalaya merupakan organisasi kemanusiaan yang berstatus badan hukum, diundangkan dengan Undang-Undang nomor 1 tahun 2018 tentang Kepalangmerahan.
              </p>
            </div>

            <div className="footer-col">
              <h3>Tautan Cepat</h3>
              <ul>
                <li><Link href="/profil/sejarah">Sejarah PMI</Link></li>
                <li><Link href="/profil/visi-misi">Visi & Misi</Link></li>
                <li><Link href="/donor-darah/stok-darah">Info Donor Darah</Link></li>
                <li><Link href="/berita">Berita Terbaru</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <h3>Hubungi Kami</h3>
              <p><i className="fas fa-map-marker-alt" style={{ width: "20px", color: "#db261f" }}></i> {contact.address}</p>
              <p><i className="fas fa-phone-alt" style={{ width: "20px", color: "#db261f" }}></i> {contact.phone}</p>
              <p><i className="fas fa-envelope" style={{ width: "20px", color: "#db261f" }}></i> {contact.email}</p>
              
              {/* Menampilkan Ikon Sosial Media dari JSON */}
              <div className="social-links" style={{ display: "flex", gap: "15px", marginTop: "20px" }}>
                {(() => {
                  try {
                    const socials = JSON.parse(contact.social_links);
                    return (
                      <>
                        {socials.instagram && <a href={socials.instagram} target="_blank" rel="noopener noreferrer" style={{ color: "white", fontSize: "24px", transition: "color 0.3s" }}><i className="fab fa-instagram"></i></a>}
                        {socials.facebook && <a href={socials.facebook} target="_blank" rel="noopener noreferrer" style={{ color: "white", fontSize: "24px", transition: "color 0.3s" }}><i className="fab fa-facebook"></i></a>}
                        {socials.twitter && <a href={socials.twitter} target="_blank" rel="noopener noreferrer" style={{ color: "white", fontSize: "24px", transition: "color 0.3s" }}><i className="fab fa-twitter"></i></a>}
                        {socials.youtube && <a href={socials.youtube} target="_blank" rel="noopener noreferrer" style={{ color: "white", fontSize: "24px", transition: "color 0.3s" }}><i className="fab fa-youtube"></i></a>}
                      </>
                    );
                  } catch (e) {
                    return null;
                  }
                })()}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Palang Merah Indonesia Kota Tasikmalaya. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
