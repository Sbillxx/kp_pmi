"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState("");
  const pathname = usePathname();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    // Set date
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    setCurrentDate(now.toLocaleDateString('id-ID', options));

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top Bar */}
      <div className="top-bar">
        <div className="container">
          <div className="top-info">
            <span>{currentDate}</span>
          </div>
          <div className="top-social">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-youtube"></i></a>
          </div>
        </div>
      </div>

      {/* Header / Navbar */}
      <header className={`main-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="container header-content">
          <Link href="/" className="logo-area">
            <div className="logo-box">
              <img src="/logo-pmi.png" alt="PMI Logo" style={{ height: '40px', width: 'auto', objectFit: 'contain' }} />
            </div>
            <div className="brand-text" style={{ display: 'none' }}>
              <h1>PMI KOTA TASIKMALAYA</h1>
              <p>Kemanusiaan Untuk Semua</p>
            </div>
          </Link>
          <nav className="desktop-nav">
            <ul>
              <li><Link href="/" className={pathname === "/" ? "active" : ""}>Beranda</Link></li>
              <li>
                <Link href="/donor-darah/stok-darah">Donor Darah <i className="fas fa-chevron-down"></i></Link>
                <ul className="dropdown-menu">
                  <li><Link href="/donor-darah/stok-darah"><i className="fas fa-tint"></i> Stok Darah</Link></li>
                  <li><Link href="/donor-darah/prosedur"><i className="fas fa-clipboard-check"></i> Prosedur Donor</Link></li>
                </ul>
              </li>
              <li><Link href="/unit">Unit</Link></li>
              <li>
                <Link href="/profil/sejarah">Kemarkasan <i className="fas fa-chevron-down"></i></Link>
                <ul className="dropdown-menu">
                  <li><Link href="/profil/sejarah"><i className="fas fa-history"></i> Sejarah PMI</Link></li>
                  <li><Link href="/profil/landasan-hukum"><i className="fas fa-gavel"></i> Landasan Hukum</Link></li>
                  <li><Link href="/profil/visi-misi"><i className="fas fa-bullseye"></i> Visi Misi</Link></li>
                  <li><Link href="/berita"><i className="fas fa-newspaper"></i> Berita</Link></li>
                  <li><Link href="/profil/kepengurusan"><i className="fas fa-sitemap"></i> Kepengurusan</Link></li>
                  <li><Link href="/galeri"><i className="fas fa-images"></i> Galeri</Link></li>
                </ul>
              </li>
              {/* <li><Link href="/#syarat-donor">Relawan</Link></li> */}
              <li><a href="https://wa.me/628119022021" target="_blank" rel="noopener noreferrer">Kontak</a></li>
            </ul>
          </nav>
          <button
            className="mobile-toggle"
            onClick={(e) => {
              e.preventDefault();
              toggleMenu();
            }}
            aria-label="Toggle Menu"
          >
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <div className={`mobile-overlay ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}></div>

      {/* Mobile Nav Menu */}
      <nav className={`mobile-nav ${isMenuOpen ? 'active' : ''}`}>
        <div className="mobile-nav-header">
          <div className="logo-area">
            <div className="logo-box" style={{ width: 'auto', height: '40px' }}>
              <img src="/logo-pmi.png" alt="PMI Logo" style={{ height: '70px', width: 'auto', objectFit: 'contain' }} />
            </div>
            <div className="brand-text" style={{ display: 'none' }}>
              <h1 style={{ fontSize: '14px' }}>PMI TASIKMALAYA</h1>
            </div>
          </div>
          <button className="close-menu" onClick={toggleMenu}><i className="fas fa-times"></i></button>
        </div>
        <ul>
          <li><Link href="/" className={pathname === "/" ? "active" : ""} onClick={toggleMenu}>Beranda</Link></li>
          <li><Link href="/#stok-darah" onClick={toggleMenu}>Donor Darah</Link></li>
          <li><Link href="/unit" onClick={toggleMenu}>Unit</Link></li>
          <li><Link href="/profil/sejarah" onClick={toggleMenu}>Kemarkasan</Link></li>
          {/* <li><Link href="/#syarat-donor" onClick={toggleMenu}>Relawan</Link></li> */}
          <li><a href="https://wa.me/628119022021" target="_blank" rel="noopener noreferrer" onClick={toggleMenu}>Kontak</a></li>
        </ul>
      </nav>
    </>
  );
}
