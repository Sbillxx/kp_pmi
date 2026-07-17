import Link from "next/link";

interface ServiceItem {
  icon: string;
  title: string;
  description: string;
  link: string;
}

export default function Services() {
  const services: ServiceItem[] = [
    {
      icon: "fas fa-ambulance",
      title: "Layanan Ambulans",
      description: "Siaga 24 jam untuk melayani kebutuhan darurat medis masyarakat.",
      link: "/layanan/ambulans",
    },
    {
      icon: "fas fa-hand-holding-heart",
      title: "Unit Donor Darah",
      description: "Melayani donor darah sukarela dan penyediaan darah berkualitas.",
      link: "/donor-darah/stok-darah",
    },
    {
      icon: "fas fa-house-damage",
      title: "Penanggulangan Bencana",
      description: "Tanggap darurat dan pemulihan pasca bencana di wilayah Kota Tasikmalaya.",
      link: "/layanan/tanggap-bencana",
    },
  ];

  return (
    <section className="services-section" id="layanan">
      <div className="container">
        <div className="section-title">
          <h2>LAYANAN KAMI</h2>
          <div className="title-line"></div>
        </div>
        <div className="services-grid">
          {services.map((service, index) => (
            <div className="service-card" key={index}>
              <div className="icon-box">
                <i className={service.icon}></i>
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
