"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminSidebarNav() {
  const pathname = usePathname();

  const links = [
    { href: '/admin', label: 'Beranda' },
    { href: '/admin/blood-stock', label: 'Stok Darah' },
    { href: '/admin/news', label: 'Berita' },
    { href: '/admin/legal-basis', label: 'Hukum' },
    { href: '/admin/management', label: 'Pengurus' },
    { href: '/admin/gallery', label: 'Galeri' },
    { href: '/admin/units', label: 'Unit' },
    { href: '/admin/contact', label: 'Kontak' },
    { href: '/admin/banners', label: 'Banner / Ads' },
  ];

  return (
    <nav className="admin-nav">
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link 
            key={link.href}
            href={link.href} 
            style={{ 
              padding: '10px', 
              borderRadius: '6px', 
              background: isActive ? 'rgba(255,255,255,0.15)' : 'transparent',
              fontWeight: isActive ? 'bold' : 'normal',
              color: isActive ? '#fff' : 'rgba(255,255,255,0.7)',
              transition: 'background 0.2s'
            }}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
