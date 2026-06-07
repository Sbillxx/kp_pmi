import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-overlay"></div>
      <div className="container hero-content">
        <h2>SELAMAT DATANG DI WEBSITE RESMI</h2>
        <h1>PMI KOTA TASIKMALAYA</h1>
        <p>Bertekad memberikan pelayanan kemanusiaan terbaik bagi masyarakat Kota Tasikmalaya.</p>
        <div className="hero-btns">
          <Link href="#layanan" className="btn btn-primary">
            Layanan Kami
          </Link>
          <Link href="#stok-darah" className="btn btn-outline">
            Cari Stok Darah
          </Link>
        </div>
      </div>
    </section>
  );
}
