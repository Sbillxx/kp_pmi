import Link from "next/link";
import db from '@/lib/db';
export default async function News() {
  const [newsList] = await db.query('SELECT * FROM news ORDER BY created_at DESC LIMIT 3') as any;

  return (
    <section className="news-section" id="berita" style={{ background: "var(--light-bg)" }}>
      <div className="container">
        <div className="section-header">
          <div className="section-title" style={{ marginBottom: 0 }}>
            <h2>BERITA TERKINI</h2>
            <div className="title-line"></div>
          </div>
          {/* <Link href="/berita" className="view-all">Lihat Semua Berita &rarr;</Link> */}
        </div>

        <div className="news-grid">
          {newsList.length === 0 ? (
            <p>Belum ada berita yang diterbitkan.</p>
          ) : newsList.map((news: any) => (
            <div className="news-card" key={news.id}>
              <div className="news-thumb">
                <img 
                  src={news.image_url || "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=800"} 
                  alt={news.title} 
                />
                <div className="news-date">
                  {new Date(news.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                </div>
              </div>
              <div className="news-body">
                <h3>{news.title}</h3>
                <p>{news.content.length > 100 ? news.content.substring(0, 100) + '...' : news.content}</p>
                <Link href={`/berita/${news.id}`} className="read-more">BACA SELENGKAPNYA &rarr;</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
