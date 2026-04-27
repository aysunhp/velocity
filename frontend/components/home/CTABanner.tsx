'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { useT } from '@/components/providers/LanguageProvider';

export function CTABanner() {
  const t = useT();

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(212,175,55,0.18), transparent 60%), linear-gradient(135deg, #0A1628 0%, #1B3358 100%)',
        }}
      />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-gold/10 blur-3xl" />

      <Container className="relative text-center max-w-3xl">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-display text-4xl md:text-6xl leading-[1.05]"
        >
          {t.ctaBanner.title1} <span className="gold-text">{t.ctaBanner.title2}</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-platinum/80 mt-6 text-lg"
        >
          {t.ctaBanner.subtitle}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-10 flex justify-center"
        >
          <Link href="/cars" className="btn-gold text-base animate-pulse-glow">
            {t.cta.reserve} <ArrowRight size={18} />
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
