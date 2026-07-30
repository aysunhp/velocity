'use client';

import Link from 'next/link';
import { Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { CONTACT, SITE } from '@/lib/constants';
import { useT } from '@/components/providers/LanguageProvider';

export function Footer() {
  const t = useT();

  const cols = [
    {
      title: t.footer.company,
      links: [
        { label: t.nav.about, href: '/about' },
        { label: t.nav.services, href: '/services' },
        { label: t.nav.contact, href: '/contact' },
      ],
    },
    {
      title: t.footer.fleet,
      links: [
        { label: t.footer.luxury, href: '/cars?category=luxury' },
        { label: t.footer.suv, href: '/cars?category=suv' },
        { label: t.footer.sport, href: '/cars?category=sport' },
        { label: t.footer.electric, href: '/cars?category=electric' },
      ],
    },
    {
      title: t.footer.support,
      links: [
        { label: t.footer.howItWorks, href: '/#how-it-works' },
        { label: t.footer.faq, href: '/#faq' },
        { label: t.footer.insurance, href: '/services' },
      ],
    },
  ];

  return (
    <footer className="border-t border-white/5 mt-20 bg-rich/40">
      <Container className="py-16 grid gap-12 lg:grid-cols-4">
        <div className="space-y-4">
          <div className="font-display text-3xl gold-text">{SITE.name}</div>
          <p className="text-platinum/70 text-sm leading-relaxed max-w-xs">
            {t.footer.tagline}
          </p>
          <div className="flex items-center gap-3 pt-2">
            <a
              href={CONTACT.instagram}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full border border-white/10 hover:bg-gold/10 hover:border-gold/40 transition"
              aria-label="Instagram"
            >
              <Instagram size={16} />
            </a>
            <a
              href={`mailto:${CONTACT.email}`}
              className="p-2 rounded-full border border-white/10 hover:bg-gold/10 hover:border-gold/40 transition"
              aria-label="Email"
            >
              <Mail size={16} />
            </a>
            <a
              href={`tel:${CONTACT.phone}`}
              className="p-2 rounded-full border border-white/10 hover:bg-gold/10 hover:border-gold/40 transition"
              aria-label="Phone"
            >
              <Phone size={16} />
            </a>
          </div>
        </div>

        {cols.map((col) => (
          <div key={col.title}>
            <h4 className="font-display text-lg mb-4">{col.title}</h4>
            <ul className="space-y-3 text-sm">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-platinum/70 hover:text-gold transition">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>

      <div className="border-t border-white/5">
        <Container className="py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-xs text-platinum/60">
          <div className="flex items-center gap-2">
            <MapPin size={12} />
            <span>{CONTACT.address}</span>
          </div>
          <div>© {new Date().getFullYear()} {SITE.name}. {t.footer.rights}</div>
          <div className="flex items-center gap-3">
            <span>Visa</span>
            <span>·</span>
            <span>MasterCard</span>
            <span>·</span>
            <span>Apple Pay</span>
          </div>
        </Container>
      </div>
    </footer>
  );
}
