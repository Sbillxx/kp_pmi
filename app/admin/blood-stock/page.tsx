import { getBloodStocks } from './actions';
import BloodStockForm from './BloodStockForm';

export default async function BloodStockAdmin() {
  const stocks = await getBloodStocks();

  return (
    <div>
      <h2 style={{ fontSize: '24px', marginBottom: '20px', fontWeight: 'bold' }}>Manajemen Stok Darah</h2>
      
      {/* 1. Preview Table */}
      <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', marginBottom: '30px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '15px' }}>Preview Stok Tersedia</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
            <thead>
              <tr style={{ background: '#222232', color: 'white' }}>
                <th colSpan={2}>A</th>
                <th colSpan={2}>B</th>
                <th colSpan={2}>O</th>
                <th colSpan={2}>AB</th>
                <th style={{ padding: '10px' }} rowSpan={2}>Update Terakhir</th>
              </tr>
              <tr style={{ background: '#333344', color: 'white' }}>
                <th style={{ padding: '5px' }}>+</th><th style={{ padding: '5px' }}>-</th>
                <th style={{ padding: '5px' }}>+</th><th style={{ padding: '5px' }}>-</th>
                <th style={{ padding: '5px' }}>+</th><th style={{ padding: '5px' }}>-</th>
                <th style={{ padding: '5px' }}>+</th><th style={{ padding: '5px' }}>-</th>
              </tr>
            </thead>
            <tbody>
              {stocks.map(row => (
                <tr key={row.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '10px' }}>{row.a_pos}</td><td style={{ padding: '10px', color: '#888' }}>{row.a_neg}</td>
                  <td style={{ padding: '10px' }}>{row.b_pos}</td><td style={{ padding: '10px', color: '#888' }}>{row.b_neg}</td>
                  <td style={{ padding: '10px' }}>{row.o_pos}</td><td style={{ padding: '10px', color: '#888' }}>{row.o_neg}</td>
                  <td style={{ padding: '10px' }}>{row.ab_pos}</td><td style={{ padding: '10px', color: '#888' }}>{row.ab_neg}</td>
                  <td style={{ padding: '10px', fontSize: '12px' }}>{new Date(row.updated_at).toLocaleString('id-ID')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2. Dynamic Input Form */}
      <BloodStockForm initialStocks={stocks} />
    </div>
  );
}
