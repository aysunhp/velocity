'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { useT } from '@/components/providers/LanguageProvider';

const slidesImages = [
  'https://images.unsplash.com/photo-1631295868223-63265b40d9e4?auto=format&fit=crop&w=2000&q=80',
  'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=2000&q=80',
  'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=2000&q=80',
];

export function Showcase() {
  const t = useT();
  
  return (
    <section className="relative">
      {t.showcase.slides.map((s, i) => (
        <Slide key={i} {...s} img={slidesImages[i]} reverse={i % 2 === 1} />
      ))}
    </section>
  );
}

function Slide({
  img,
  eyebrow,
  title,
  text,
  reverse,
}: {
  img: string;
  eyebrow: string;
  title: string;
  text: string;
  reverse: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 1.05]);

  return (
    <div ref={ref} className="relative min-h-screen flex items-center overflow-hidden">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <Image src={img} alt={title} fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-midnight via-midnight/60 to-midnight/30" />
      </motion.div>

      <Container className="relative z-10 py-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-150px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className={`max-w-xl space-y-5 ${reverse ? 'ml-auto text-right' : ''}`}
        >
          <p className="heading-eyebrow">{eyebrow}</p>
          <h3 className="font-display text-5xl md:text-6xl leading-tight">{title}</h3>
          <p className="text-platinum/85 text-lg leading-relaxed">{text}</p>
        </motion.div>
      </Container>
    </div>
  );
}
