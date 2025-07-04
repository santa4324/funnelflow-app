'use client';
import React from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header style={{ padding: '1rem', borderBottom: '1px solid #eee' }}>
        <h1 style={{ fontWeight: 'bold' }}>FunnelFlow</h1>
      </header>
      <main>{children}</main>
    </div>
  );
}
