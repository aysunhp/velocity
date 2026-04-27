'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X } from 'lucide-react';
import Link from 'next/link';

const KEY = 'velocity:cookies-v1';

export function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!localStorage.getItem(KEY)) {
      // Defer to avoid jank during initial paint
      const t = setTimeout(() => setShow(true), 1200);
      return () => clearTimeout(t);
    }
  }, []);

  const decide = (value: 'accepted' | 'rejected') => {
    try {
      localStorage.setItem(KEY, JSON.stringify({ value, at: new Date().toISOString() }));
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
          aria-label="Cookie consent"
          className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-md z-50 glass-dark rounded-2xl p-5 border border-gold/20 shadow-elev"
        >
          <button
            aria-label="Dismiss"
            onClick={() => decide('rejected')}
            className="absolute top-3 right-3 p-1 text-platinum/50 hover:text-cream"
          >
            <X size={16} />
          </button>
          <div className="flex items-start gap-3">
            <span className="w-9 h-9 rounded-lg bg-gold/10 text-gold grid place-items-center flex-shrink-0">
              <Cookie size={18} />
            </span>
            <div>
              <h3 className="font-display text-lg leading-tight">We use cookies</h3>
              <p className="text-platinum/70 text-sm mt-1">
                We use essential cookies to keep the site running and analytics to improve your
                experience. See our{' '}
                <Link href="/privacy" className="text-gold underline-offset-2 hover:underline">
                  privacy policy
                </Link>
                .
              </p>
              <div className="flex items-center gap-2 mt-4">
                <button onClick={() => decide('accepted')} className="btn-gold text-xs px-4 py-2">
                  Accept all
                </button>
                <button onClick={() => decide('rejected')} className="btn-ghost text-xs px-4 py-2">
                  Essential only
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
