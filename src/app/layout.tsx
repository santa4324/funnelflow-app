import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'FunnelFlow - A Fresh Start',
  description: 'A stable foundation to build upon.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
