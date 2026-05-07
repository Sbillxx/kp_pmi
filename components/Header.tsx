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
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Logo_PMI.svg/1200px-Logo_PMI.svg.png" alt="PMI Logo" style={{ filter: 'brightness(0) invert(1)' }} />
            </div>
            <div className="brand-text">
              <h1>PMI KOTA TASIKMALAYA</h1>
              <p>Kemanusiaan Untuk Semua</p>
            </div>
          </Link>
          <nav className="desktop-nav">
            <ul>
              <li><Link href="/" className={pathname === "/" ? "active" : ""}>Beranda</Link></li>
              <li><a href="#">Donasi</a></li>
              <li>
                <a href="#">Donor Darah <i className="fas fa-chevron-down"></i></a>
                <ul className="dropdown-menu">
                  <li><a href="#"><i className="fas fa-tint"></i> Stok Darah</a></li>
                  <li><a href="#"><i className="fas fa-clipboard-check"></i> Prosedur Donor</a></li>
                  <li><a href="#"><i className="fas fa-calendar-alt"></i> Jadwal Mobile Unit</a></li>
                  <li><Link href="/#syarat-donor"><i className="fas fa-hand-holding-heart"></i> Penyelenggaraan Donor</Link></li>
                  <li><a href="#"><i className="fas fa-award"></i> Pengajuan Piagam</a></li>
                </ul>
              </li>
              <li>
                <a href="#">Layanan <i className="fas fa-chevron-down"></i></a>
                <ul className="dropdown-menu">
                  <li><a href="#"><i className="fas fa-ambulance"></i> Ambulans</a></li>
                  <li><a href="#"><i className="fas fa-cloud-showers-heavy"></i> Tanggap Bencana</a></li>
                  <li><a href="#"><i className="fas fa-users"></i> Kemitraan</a></li>
                  <li><a href="#"><i className="fas fa-graduation-cap"></i> Pelatihan</a></li>
                  <li><a href="#"><i className="fas fa-bullhorn"></i> Pengaduan</a></li>
                </ul>
              </li>
              <li>
                <a href="#">Informasi Publik <i className="fas fa-chevron-down"></i></a>
                <ul className="dropdown-menu">
                  <li><Link href="/profil/sejarah"><i className="fas fa-history"></i> Sejarah PMI</Link></li>
                  <li><Link href="/profil/landasan-hukum"><i className="fas fa-gavel"></i> Landasan Hukum</Link></li>
                  <li><Link href="/profil/visi-misi"><i className="fas fa-bullseye"></i> Visi Misi</Link></li>
                  <li><a href="#"><i className="fas fa-newspaper"></i> Berita</a></li>
                  <li><a href="#"><i className="fas fa-sitemap"></i> Kepengurusan</a></li>
                  <li><a href="#"><i className="fas fa-images"></i> Galeri</a></li>
                </ul>
              </li>
              <li><a href="#">Relawan</a></li>
              <li><a href="#">Kontak</a></li>
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
            <div className="logo-box" style={{ width: '40px', height: '40px' }}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Logo_PMI.svg/1200px-Logo_PMI.svg.png" alt="PMI Logo" style={{ height: '25px', filter: 'brightness(0) invert(1)' }} />
            </div>
            <div className="brand-text">
              <h1 style={{ fontSize: '14px' }}>PMI TASIKMALAYA</h1>
            </div>
          </div>
          <button className="close-menu" onClick={toggleMenu}><i className="fas fa-times"></i></button>
        </div>
        <ul>
          <li><Link href="/" className={pathname === "/" ? "active" : ""} onClick={toggleMenu}>Beranda</Link></li>
          <li><a href="#" onClick={toggleMenu}>Donasi</a></li>
          <li><a href="#" onClick={toggleMenu}>Donor Darah</a></li>
          <li><a href="#" onClick={toggleMenu}>Layanan</a></li>
          <li><a href="#" onClick={toggleMenu}>Informasi Publik</a></li>
          <li><a href="#" onClick={toggleMenu}>Relawan</a></li>
          <li><a href="#" onClick={toggleMenu}>Kontak</a></li>
        </ul>
      </nav>
    </>
  );
}
