import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sejarah - PMI Kota Tasikmalaya",
  description: "Sejarah terbentuknya Palang Merah Indonesia (PMI) Kota Tasikmalaya sejak tahun 2001.",
};

export default function SejarahPage() {
  return (
    <>
      <section className="hero" style={{ height: '300px' }}>
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <h1>SEJARAH PMI KOTA TASIKMALAYA</h1>
        </div>
      </section>

      <section className="info-section">
        <div className="container">
          <div className="prose-text">
            <p>Pembentukan Kota Tasikmalaya sebagai daerah otonomi baru tidak terlepas dari kebijakan pemekaran wilayah yang dilaksanakan oleh Pemerintah pada Tahun 2001, di mana wilayah Kabupaten Tasikmalaya dimekarkan menjadi dua Daerah Otonomi Baru (DOB), yaitu Kabupaten Tasikmalaya and Kota Tasikmalaya. Pemekaran wilayah tersebut bertujuan untuk meningkatkan efektivitas penyelenggaraan pemerintahan, mempercepat pemerataan pembangunan, serta meningkatkan kualitas pelayanan kepada masyarakat, termasuk di bidang sosial dan kemanusiaan.</p>
            <p>Sejalan dengan kebijakan tersebut, berdasarkan ketentuan dan peraturan Markas Pusat Palang Merah Indonesia (PMI) yang mengamanatkan bahwa setiap wilayah administratif wajib memiliki kepengurusan PMI, maka dibentuklah Palang Merah Indonesia Kota Tasikmalaya. PMI Kota Tasikmalaya secara resmi disahkan oleh Pengurus PMI Provinsi Jawa Barat pada tanggal 16 Juli 2007 sesuai dengan Anggaran Dasar dan Anggaran Rumah Tangga (AD/ART) PMI.</p>
            <p>Pada masa awal berdirinya, selama kurang lebih satu tahun, Markas PMI Kota Tasikmalaya masih berada dalam satu lokasi (satu atap) dengan PMI Kabupaten Tasikmalaya. Pasca terjadinya bencana gempa bumi di wilayah Pangandaran pada Tahun 2009, PMI Kota Tasikmalaya melakukan relokasi Markas ke Jalan Bebedahan I Nomor 59 A, Kecamatan Purbaratu. Kemudian pada Tahun 2014, kantor dipindahkan ke Jalan Siliwangi Nomor 31, Kecamatan Tawang untuk mendukung pengembangan pelayanan donor darah.</p>
            <p>Pada Tahun 2021, PMI Kota Tasikmalaya memperoleh dukungan berupa bantuan sarana dan prasarana yang memungkinkan pelaksanaan kegiatan pengambilan dan pendistribusian darah secara lebih optimal. Dukungan tersebut menjadi tonggak penting dalam penguatan peran PMI Kota Tasikmalaya sebagai penyelenggara pelayanan kemanusiaan, sekaligus menjadi dasar dalam penyusunan Rencana Strategis Periode 2022–2027.</p>
          </div>
        </div>
      </section>
    </>
  );
}
