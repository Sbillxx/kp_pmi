export default function LandasanHukumPage() {
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
            {[
              "Undang-Undang Nomor 1 Tahun 2018 tentang Kepalangmerahan",
              "Undang-Undang Nomor 23 Tahun 2014 tentang Pemerintahan Daerah",
              "Anggaran Dasar dan Anggaran Rumah Tangga Palang Merah Indonesia",
              "Kebijakan dan Pedoman Organisasi PMI",
              "Rencana Strategis PMI Provinsi Jawa Barat",
              "Rencana Pembangunan Jangka Menengah Daerah (RPJMD) Kota Tasikmalaya",
              "Ketentuan peraturan perundang-undangan lain yang terkait"
            ].map((item, index) => (
              <div className="legal-item" key={index}>
                <i className="fas fa-balance-scale"></i>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
