

import Hero from "@/components/Hero";
import Banners from "@/components/Banners";
import BloodStock from "@/components/BloodStock";
import Services from "@/components/Services";
import DonorRequirements from "@/components/DonorRequirements";
import News from "@/components/News";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <section className="map-section" style={{ padding: "60px 0 0 0" }}>
          <div className="container">
            <div className="section-title" style={{ textAlign: "center", marginBottom: "30px" }}>
              <h2>LOKASI MARKAS PMI</h2>
              <div className="title-line" style={{ margin: "10px auto 0" }}></div>
            </div>
            <div style={{ 
              borderRadius: "15px", 
              overflow: "hidden", 
              boxShadow: "0 15px 40px rgba(0,0,0,0.08)",
              border: "1px solid var(--border-color, #ebebeb)"
            }}>
              <iframe
                src="https://maps.google.com/maps?q=PMI%20Kota%20Tasikmalaya&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="450"
                style={{ border: 0, display: "block" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi PMI Kota Tasikmalaya"
              ></iframe>
            </div>
          </div>
        </section>
        <BloodStock />
        <Services />
        <DonorRequirements />
        <Banners />
        <News />
      </main>
    </>
  );
}

