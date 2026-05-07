import Link from "next/link";

export default function Footer() {
  return (
    <footer className="main-footer">
      <div className="footer-cta">
        <div className="container cta-content">
          <h2>SIAP MELAYANI KEMANUSIAAN 24 JAM</h2>
          <div className="cta-btns">
            <a href="tel:0265123456" className="btn btn-white"><i className="fas fa-phone-alt"></i> (0265) 123456</a>
            <a href="#" className="btn btn-outline-white">Hubungi Kami</a>
          </div>
        </div>
      </div>
      <div className="footer-main">
        <div className="container footer-grid">
          <div className="footer-col about-col">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Logo_PMI.svg/1200px-Logo_PMI.svg.png" alt="PMI Logo" className="footer-logo" style={{ filter: 'brightness(0) invert(1)' }} />
            <p>PMI Kota Tasikmalaya berkomitmen untuk terus memberikan pelayanan terbaik bagi masyarakat dalam bidang kemanusiaan, kesehatan, dan donor darah.</p>
          </div>
          <div className="footer-col">
            <h3>Menu Utama</h3>
            <ul>
              <li><Link href="/">Beranda</Link></li>
              <li><a href="#">Donasi</a></li>
              <li><a href="#">Layanan Kami</a></li>
              <li><a href="#">Stok Darah</a></li>
              <li><a href="#">Pendaftaran Relawan</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h3>Hubungi Kami</h3>
            <p><i className="fas fa-map-marker-alt"></i> Jl. Rumah Sakit No. 1, Kota Tasikmalaya, Jawa Barat</p>
            <p><i className="fas fa-phone"></i> (0265) 123456</p>
            <p><i className="fas fa-envelope"></i> info@pmitasikmalayakota.or.id</p>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; 2026 PMI KOTA TASIKMALAYA. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
