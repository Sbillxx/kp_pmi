import db from '@/lib/db';
import Link from 'next/link';

export default async function NewsDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [rows] = await db.query('SELECT * FROM news WHERE id = ?', [id]) as any;
  const newsItem = rows[0];

  if (!newsItem) {
    return (
      <div className="container" style={{ padding: '100px 20px', textAlign: 'center' }}>
        <h2>Berita tidak ditemukan.</h2>
        <Link href="/" style={{ color: 'var(--primary-red)' }}>Kembali ke Beranda</Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '60px 20px', maxWidth: '800px', margin: '0 auto' }}>
      <Link href="/" style={{ display: 'inline-block', marginBottom: '20px', color: 'var(--text-muted)' }}>&larr; Kembali</Link>
      <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '15px' }}>{newsItem.title}</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>
        Diterbitkan pada: {new Date(newsItem.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
      </p>
      
      {newsItem.image_url && (
        <div style={{ marginBottom: '40px', borderRadius: '12px', overflow: 'hidden' }}>
          <img src={newsItem.image_url} alt={newsItem.title} style={{ width: '100%', maxHeight: '500px', objectFit: 'cover' }} />
        </div>
      )}

      <div className="prose-text" style={{ whiteSpace: 'pre-wrap' }}>
        {newsItem.content}
      </div>
    </div>
  );
}
