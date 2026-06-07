import Link from 'next/link';
import AdminSidebarNav from '@/components/AdminSidebarNav';
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-layout">
      {/* Sidebar / Bottom Nav */}
      <aside className="admin-sidebar">
        <div style={{ marginBottom: '30px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold' }}>PMI Admin</h2>
        </div>
        <AdminSidebarNav />
      </aside>

      {/* Main Content */}
      <div className="admin-main">
        {/* Header */}
        <header style={{ 
          background: 'white', 
          padding: '15px 30px', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
        }}>
          <h1 style={{ fontSize: '20px', margin: 0 }}>Dashboard Admin</h1>
          <form action={async () => {
            'use server';
            const { deleteSession } = await import('@/lib/session');
            const { redirect } = await import('next/navigation');
            await deleteSession();
            redirect('/!/login');
          }}>
            <button type="submit" style={{ 
              padding: '8px 15px', 
              background: '#db261f', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px',
              cursor: 'pointer'
            }}>
              Logout
            </button>
          </form>
        </header>

        {/* Page Content */}
        <main style={{ padding: '30px', flex: 1 }}>
          {children}
        </main>
      </div>
    </div>
  );
}
