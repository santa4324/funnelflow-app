import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';

import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';

const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const fontHeadline = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-headline',
});

export const metadata: Metadata = {
  title: 'FunnelFlow',
  description: 'Build High-Converting Funnels in Minutes with AI',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
          fontHeadline.variable
        )}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
