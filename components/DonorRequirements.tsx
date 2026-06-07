import Link from "next/link";

interface ReqCardData {
  icon: string;
  title: string;
  items: string[];
}

interface FacilityItem {
  icon: string;
  title: string;
  description: string;
}

export default function DonorRequirements() {
  const requirements: ReqCardData[] = [
    {
      icon: "fas fa-file-alt",
      title: "Surat Permohonan",
      items: [
        "Mengirimkan surat permohonan kegiatan donor darah yang ditujukan kepada Kepala UTD PMI Kota Tasikmalaya.",
        "Mencantumkan waktu dan tempat pelaksanaan kegiatan secara jelas.",
        "Penentuan lokasi kegiatan (di dalam gedung atau menggunakan Bus Donor Darah).",
        "Durasi pelaksanaan kegiatan donor darah maksimal 5 jam.",
      ],
    },
    {
      icon: "fas fa-users-cog",
      title: "Persiapan & Fasilitas",
      items: [
        "Mendata calon pendonor minimal 40 orang sebelum kegiatan.",
        "Menyediakan sumber listrik dan terminal kabel yang memadai di lokasi.",
        "Memastikan akses lokasi mudah dijangkau oleh tim medis dan peralatan.",
        "Koordinasi aktif dengan tim UTD PMI H-3 sebelum pelaksanaan.",
      ],
    },
  ];

  const facilities: FacilityItem[] = [
    {
      icon: "fas fa-clipboard-list",
      title: "Area Registrasi",
      description: "Menyediakan 1 Meja dan 2 Kursi khusus untuk pendaftaran calon pendonor.",
    },
    {
      icon: "fas fa-stethoscope",
      title: "Area Seleksi & Donor",
      description: "Minimal 2 meja dan 5 kursi. Jumlah disesuaikan dengan perkiraan jumlah pendonor.",
    },
    {
      icon: "fas fa-chair",
      title: "Area Pasca Donor",
      description: "Kursi yang cukup untuk observasi setelah donor dan ruang tunggu yang nyaman.",
    },
  ];

  return (
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
          {requirements.map((req, index) => (
            <div className="req-card" key={index}>
              <h3>
                <i className={req.icon}></i> {req.title}
              </h3>
              <ul className="req-list">
                {req.items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
