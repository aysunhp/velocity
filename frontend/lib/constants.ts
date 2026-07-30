export const SITE = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'Velocity',
  tagline: 'Drive Your Dream Car',
  description:
    'Premium luxury car rental — Rolls-Royce, Ferrari, Lamborghini, Bentley and more. Drive your dream car, delivered in seconds.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
};

export const CONTACT = {
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || '994501234567',
  phone: process.env.NEXT_PUBLIC_PHONE || '+994501234567',
  email: process.env.NEXT_PUBLIC_EMAIL || 'xipiyevaaysun@gmail.com',
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM || 'https://instagram.com/velocity',
  address: 'Baku, Azerbaijan',
};

export const NAV_LINKS = [
  { href: '/', key: 'home' },
  { href: '/cars', key: 'cars' },
  { href: '/services', key: 'services' },
  { href: '/about', key: 'about' },
  { href: '/contact', key: 'contact' },
] as const;

export const LOCALES = ['az', 'en', 'ru'] as const;
export const DEFAULT_LOCALE = 'az';

/**
 * Empty string = same origin, so requests hit the route handlers in `app/api`.
 * Deliberately not read from NEXT_PUBLIC_API_URL: a stale value left in the
 * host's dashboard would silently point the whole site at a dead backend.
 * To run against the standalone Express API instead, set this to its URL.
 */
export const API_BASE = '';
