export default function VisiMisiPage() {
  return (
    <>
      <section className="hero" style={{ height: '300px' }}>
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <h1>VISI & MISI</h1>
        </div>
      </section>

      <section className="info-section">
        <div className="container">
          <div className="vision-mission-container">
            <div className="vision-box">
              <h3>VISI</h3>
              <p>"Terwujudnya Palang Merah Indonesia Kota Tasikmalaya yang profesional, modern, dan berdaya saing dalam memberikan pelayanan kemanusiaan terbaik serta pelayanan transfusi darah yang bermutu, aman, and berbasis teknologi serta termaju di priangan timur"</p>
            </div>
            <div className="section-title" style={{ marginTop: '60px', textAlign: 'center' }}>
              <h2>MISI</h2>
              <div className="title-line" style={{ margin: '10px auto' }}></div>
            </div>
            <div className="mission-grid">
              {[
                "Meningkatkan kualitas pelayanan kemanusiaan yang cepat, tepat, dan berorientasi pada kebutuhan masyarakat melalui penguatan kapasitas organisasi dan jejaring kemitraan.",
                "Mengembangkan sistem pengkaderan Palang Merah yang terstruktur, berkelanjutan, dan berjenjang guna mencetak relawan dan pengurus yang kompeten, berintegritas, serta berjiwa kemanusiaan.",
                "Memperkuat tata kelola organisasi yang profesional, transparan, dan akuntabel dalam mendukung pelaksanaan tugas-tugas kepalangmerahan.",
                "Meningkatkan peran edukasi dan partisipasi masyarakat dalam kegiatan kepalangmerahan melalui sosialisasi, pelatihan, dan pemberdayaan relawan.",
                "Mewujudkan pelayanan transfusi darah yang aman, bermutu, dan berbasis digital sesuai dengan standar pelayanan kesehatan dan peraturan perundang-undangan.",
                "Meningkatkan ketersediaan alat, sarana, dan prasarana pendukung serta komponen darah yang berkualitas untuk menjamin keselamatan dan kepuasan penerima layanan.",
                "Meningkatkan kompetensi sumber daya manusia PMI melalui pelatihan, sertifikasi, dan penguatan budaya mutu dalam setiap proses pelayanan."
              ].map((item, index) => (
                <div className="mission-item" key={index}>
                  <div className="mission-num">{index + 1}</div>
                  <div className="mission-text">{item}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
