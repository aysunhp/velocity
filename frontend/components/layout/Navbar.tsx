'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { NAV_LINKS, SITE } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/components/providers/LanguageProvider';
import type { Locale } from '@/types';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { locale, setLocale, t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        scrolled ? 'glass-dark border-b border-white/5 py-3' : 'bg-transparent py-5'
      )}
    >
      <Container className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="font-display text-2xl tracking-wider gold-text">{SITE.name}</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className="relative text-sm uppercase tracking-widest text-cream/85 hover:text-gold transition-colors group"
            >
              {t.nav[link.key as keyof typeof t.nav]}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <select
            aria-label="Language"
            className="bg-transparent text-xs tracking-widest uppercase text-cream/70 outline-none cursor-pointer"
            value={locale}
            onChange={(e) => setLocale(e.target.value as Locale)}
          >
            <option value="az" className="text-midnight">AZ</option>
            <option value="en" className="text-midnight">EN</option>
            <option value="ru" className="text-midnight">RU</option>
          </select>
          <Link href="/cars" className="btn-gold text-sm">
            {t.cta.reserve}
          </Link>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((s) => !s)}
          className="lg:hidden p-2 text-cream"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass-dark border-t border-white/5 overflow-hidden"
          >
            <Container className="py-6 flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.key}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-cream/90 hover:text-gold tracking-widest uppercase text-sm"
                >
                  {t.nav[link.key as keyof typeof t.nav]}
                </Link>
              ))}
              <Link href="/cars" className="btn-gold w-fit text-sm" onClick={() => setOpen(false)}>
                {t.cta.reserve}
              </Link>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
