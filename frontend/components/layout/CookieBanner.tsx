'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X } from 'lucide-react';
import Link from 'next/link';
import { useT } from '@/components/providers/LanguageProvider';

const KEY = 'velocity:cookies-v1';

export function CookieBanner() {
  const [show, setShow] = useState(false);
  const t = useT();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!localStorage.getItem(KEY)) {
      // Defer to avoid jank during initial paint
      const t = setTimeout(() => setShow(true), 1200);
      return () => clearTimeout(t);
    }
  }, []);

  // Nothing optional is stored, so there is no consent to grant or withhold —
  // this only records that the notice has been seen, so it stops reappearing.
  const acknowledge = () => {
    try {
      localStorage.setItem(KEY, JSON.stringify({ value: 'seen', at: new Date().toISOString() }));
    } catch {
      /* storage may be blocked */
    }
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          role="dialog"
          aria-label={t.cookies.title}
          className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-md z-50 glass-dark rounded-2xl p-5 border border-gold/20 shadow-elev"
        >
          <button
            aria-label={t.cookies.dismiss}
            onClick={acknowledge}
            className="absolute top-3 right-3 p-1 text-platinum/50 hover:text-cream"
          >
            <X size={16} />
          </button>
          <div className="flex items-start gap-3">
            <span className="w-9 h-9 rounded-lg bg-gold/10 text-gold grid place-items-center flex-shrink-0">
              <Cookie size={18} />
            </span>
            <div>
              <h3 className="font-display text-lg leading-tight">{t.cookies.title}</h3>
              <p className="text-platinum/70 text-sm mt-1">
                {t.cookies.desc}
                <Link href="/privacy" className="text-gold underline-offset-2 hover:underline">
                  {t.cookies.policy}
                </Link>
                .
              </p>
              <div className="flex items-center gap-2 mt-4">
                <button onClick={acknowledge} className="btn-gold text-xs px-4 py-2">
                  {t.cookies.ok}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
