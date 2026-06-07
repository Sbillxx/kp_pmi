import type { Metadata } from "next";
import DonorRequirements from "@/components/DonorRequirements";

export const metadata: Metadata = {
  title: "Prosedur Donor Darah - PMI Kota Tasikmalaya",
  description: "Informasi persyaratan dan prosedur untuk melakukan donor darah di PMI Kota Tasikmalaya.",
};

export default function ProsedurDonorPage() {
  return (
    <>
      <section className="hero" style={{ height: '300px' }}>
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <h1>PROSEDUR DONOR DARAH</h1>
        </div>
      </section>

      <div style={{ background: '#f9f9f9', paddingBottom: '60px' }}>
        <DonorRequirements />
      </div>
    </>
  );
}
