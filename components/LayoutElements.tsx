"use client";

import { usePathname } from 'next/navigation';
import React from 'react';

export default function ConditionalLayout({
  header,
  footer,
  children
}: {
  header: React.ReactNode;
  footer: React.ReactNode;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hide = pathname?.startsWith('/!/login') || pathname?.startsWith('/admin');

  return (
    <div className="pmi-app">
      {!hide && header}
      <main>{children}</main>
      {!hide && footer}
    </div>
  );
}
