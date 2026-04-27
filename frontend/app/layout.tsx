import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display, Bebas_Neue } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FloatingButtons } from '@/components/layout/FloatingButtons';
import { CookieBanner } from '@/components/layout/CookieBanner';
import { SITE } from '@/lib/constants';

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});
const display = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});
const accent = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-accent',
  display: 'swap',
});

export const metadata: Metadata = {
  title: { default: `${SITE.name} — ${SITE.tagline}`, template: `%s | ${SITE.name}` },
  description: SITE.description,
  metadataBase: new URL(SITE.url),
  openGraph: {
    title: SITE.name,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    type: 'website',
  },
  icons: { icon: '/favicon.ico' },
};

export const viewport: Viewport = {
  themeColor: '#0A1628',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="az" className={`${sans.variable} ${display.variable} ${accent.variable}`}>
      <body className="min-h-screen antialiased">
        <Providers>
          <Navbar />
          {children}
          <Footer />
          <CookieBanner />
          <FloatingButtons />
        </Providers>
      </body>
    </html>
  );
}
