"use client";

export default function Home() {
  return (
    <>
      <main>
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-overlay"></div>
          <div className="container hero-content">
            <h2>SELAMAT DATANG DI WEBSITE RESMI</h2>
            <h1>PMI KOTA TASIKMALAYA</h1>
            <p>Bertekad memberikan pelayanan kemanusiaan terbaik bagi masyarakat Kota Tasikmalaya.</p>
            <div className="hero-btns">
              <a href="#" className="btn btn-primary">Layanan Kami</a>
              <a href="#" className="btn btn-outline">Cari Stok Darah</a>
            </div>
          </div>
        </section>

        {/* Quick Stats / Blood Stock */}
        <section className="blood-stock-section">
          <div className="container">
            <div className="section-title">
              <h2>STOK DARAH HARI INI</h2>
              <div className="title-line"></div>
            </div>
            <div className="blood-table-wrapper">
              <table className="blood-table">
                <thead>
                  <tr>
                    <th>GOLONGAN DARAH</th>
                    <th>A</th>
                    <th>B</th>
                    <th>O</th>
                    <th>AB</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>WB (Whole Blood)</td>
                    <td>12</td>
                    <td>25</td>
                    <td>18</td>
                    <td>5</td>
                  </tr>
                  <tr>
                    <td>PRC (Packed Red Cell)</td>
                    <td>8</td>
                    <td>15</td>
                    <td>22</td>
                    <td>3</td>
                  </tr>
                  <tr>
                    <td>TC (Thrombocyte)</td>
                    <td>5</td>
                    <td>10</td>
                    <td>12</td>
                    <td>2</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="services-section">
          <div className="container">
            <div className="section-title">
              <h2>LAYANAN KAMI</h2>
              <div className="title-line"></div>
            </div>
            <div className="services-grid">
              <div className="service-card">
                <div className="icon-box"><i className="fas fa-ambulance"></i></div>
                <h3>Layanan Ambulans</h3>
                <p>Siaga 24 jam untuk melayani kebutuhan darurat medis masyarakat.</p>
                <a href="#">Selengkapnya <i className="fas fa-arrow-right"></i></a>
              </div>
              <div className="service-card">
                <div className="icon-box"><i className="fas fa-hand-holding-heart"></i></div>
                <h3>Unit Donor Darah</h3>
                <p>Melayani donor darah sukarela dan penyediaan darah berkualitas.</p>
                <a href="#">Selengkapnya <i className="fas fa-arrow-right"></i></a>
              </div>
              <div className="service-card">
                <div className="icon-box"><i className="fas fa-house-damage"></i></div>
                <h3>Penanggulangan Bencana</h3>
                <p>Tanggap darurat dan pemulihan pasca bencana di wilayah Kota Tasikmalaya.</p>
                <a href="#">Selengkapnya <i className="fas fa-arrow-right"></i></a>
              </div>
            </div>
          </div>
        </section>

        {/* Donor Requirements */}
        <section className="requirements-section" id="syarat-donor">
          <div className="container">
            <div className="section-title">
              <h2>PENYELENGGARAAN DONOR DARAH</h2>
              <div className="title-line"></div>
            </div>
            
            <div className="req-intro">
              <p>Untuk menyelenggarakan kegiatan donor darah yang lancar dan efektif di instansi atau komunitas Anda, mohon perhatikan persyaratan berikut:</p>
            </div>

            <div className="requirements-grid">
              <div className="req-card">
                <h3><i className="fas fa-file-alt"></i> Surat Permohonan</h3>
                <ul className="req-list">
                  <li>Mengirimkan surat permohonan kegiatan donor darah yang ditujukan kepada Kepala UTD PMI Kota Tasikmalaya.</li>
                  <li>Mencantumkan waktu dan tempat pelaksanaan kegiatan secara jelas.</li>
                  <li>Penentuan lokasi kegiatan (di dalam gedung atau menggunakan Bus Donor Darah).</li>
                  <li>Durasi pelaksanaan kegiatan donor darah maksimal 5 jam.</li>
                </ul>
              </div>

              <div className="req-card">
                <h3><i className="fas fa-users-cog"></i> Persiapan & Fasilitas</h3>
                <ul className="req-list">
                  <li>Mendata calon pendonor minimal 40 orang sebelum kegiatan.</li>
                  <li>Menyediakan sumber listrik dan terminal kabel yang memadai di lokasi.</li>
                  <li>Memastikan akses lokasi mudah dijangkau oleh tim medis dan peralatan.</li>
                  <li>Koordinasi aktif dengan tim UTD PMI H-3 sebelum pelaksanaan.</li>
                </ul>
              </div>
            </div>

            <div className="facilities-container">
              <div className="facilities-title">
                <h3>Kebutuhan Fasilitas di Lokasi</h3>
              </div>
              <div className="facilities-grid">
                <div className="facility-card">
                  <div className="facility-icon"><i className="fas fa-clipboard-list"></i></div>
                  <h4>Area Registrasi</h4>
                  <p>Menyediakan 1 Meja dan 2 Kursi khusus untuk pendaftaran calon pendonor.</p>
                </div>
                <div className="facility-card">
                  <div className="facility-icon"><i className="fas fa-stethoscope"></i></div>
                  <h4>Area Seleksi & Donor</h4>
                  <p>Minimal 2 meja dan 5 kursi. Jumlah disesuaikan dengan perkiraan jumlah pendonor.</p>
                </div>
                <div className="facility-card">
                  <div className="facility-icon"><i className="fas fa-chair"></i></div>
                  <h4>Area Pasca Donor</h4>
                  <p>Kursi yang cukup untuk observasi setelah donor dan ruang tunggu yang nyaman.</p>
                </div>
              </div>
            </div>

            <div className="req-highlight">
              <div className="highlight-text">
                <h3>Siap Mengadakan Donor Darah?</h3>
                <p>Pastikan semua persyaratan terpenuhi untuk kelancaran aksi kemanusiaan Anda.</p>
              </div>
              <div className="highlight-badge">
                Minimal 40 Pendonor
              </div>
            </div>
          </div>
        </section>

        {/* News Section */}
        <section className="news-section">
          <div className="container">
            <div className="section-header">
              <div className="section-title">
                <h2>BERITA TERBARU</h2>
                <div className="title-line"></div>
              </div>
              <a href="#" className="view-all">Lihat Semua Berita</a>
            </div>
            <div className="news-grid">
              <article className="news-card">
                <div className="news-thumb">
                  <img src="https://images.unsplash.com/photo-1579154235602-4c202022a468?auto=format&fit=crop&q=80&w=800" alt="News 1" />
                  <span className="news-date">05 Mei 2026</span>
                </div>
                <div className="news-body">
                  <h3>PMI Tasikmalaya Gelar Pelatihan Relawan Masa Kini</h3>
                  <p>Sebanyak 50 anggota KSR mengikuti pelatihan tanggap darurat di markas PMI...</p>
                  <a href="#" className="read-more">BACA SELENGKAPNYA</a>
                </div>
              </article>
              <article className="news-card">
                <div className="news-thumb">
                  <img src="https://images.unsplash.com/photo-1615461066870-40b124f29392?auto=format&fit=crop&q=80&w=800" alt="News 2" />
                  <span className="news-date">03 Mei 2026</span>
                </div>
                <div className="news-body">
                  <h3>Kegiatan Donor Darah di Balai Kota Tasikmalaya</h3>
                  <p>Antusiasme ASN dalam menyumbangkan darahnya untuk kemanusiaan sangat tinggi...</p>
                  <a href="#" className="read-more">BACA SELENGKAPNYA</a>
                </div>
              </article>
              <article className="news-card">
                <div className="news-thumb">
                  <img src="https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&q=80&w=800" alt="News 3" />
                  <span className="news-date">01 Mei 2026</span>
                </div>
                <div className="news-body">
                  <h3>Distribusi Bantuan Logistik Untuk Korban Banjir</h3>
                  <p>PMI bergerak cepat menyalurkan bantuan makanan dan pakaian layak pakai...</p>
                  <a href="#" className="read-more">BACA SELENGKAPNYA</a>
                </div>
              </article>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
