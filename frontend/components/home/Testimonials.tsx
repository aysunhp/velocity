'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Skeleton } from '@/components/ui/Skeleton';
import { useFeaturedReviews } from '@/hooks/useApi';
import { useT } from '@/components/providers/LanguageProvider';

export function Testimonials() {
  const { data, isLoading } = useFeaturedReviews();
  const [idx, setIdx] = useState(0);
  const t = useT();

  const items = data ?? [];

  useEffect(() => {
    if (items.length < 2) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % items.length), 6000);
    return () => clearInterval(t);
  }, [items.length]);

  return (
    <section className="section">
      <Container>
        <SectionHeading
          eyebrow={t.testimonials.eyebrow}
          title={<>{t.testimonials.title1} <span className="gold-text">{t.testimonials.title2}</span></>}
        />

        <div className="mt-14 max-w-4xl mx-auto">
          {isLoading && <Skeleton className="h-64 rounded-2xl" />}

          {!isLoading && items.length > 0 && (
            <div className="relative">
              <Quote className="absolute -top-6 -left-2 text-gold/20" size={80} />
              <AnimatePresence mode="wait">
                <motion.figure
                  key={items[idx]._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="glass rounded-2xl p-8 md:p-12 text-center relative"
                >
                  <div className="flex justify-center gap-1 mb-6">
                    {Array.from({ length: items[idx].rating }).map((_, i) => (
                      <Star key={i} size={16} className="text-gold fill-gold" />
                    ))}
                  </div>
                  <blockquote className="font-display text-xl md:text-2xl leading-relaxed text-cream">
                    &ldquo;{items[idx].comment}&rdquo;
                  </blockquote>
                  <figcaption className="mt-8 flex flex-col items-center gap-3">
                    {items[idx].avatar && (
                      <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-gold/30">
                        <Image
                          src={items[idx].avatar!}
                          alt={items[idx].name}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <p className="font-display text-lg">{items[idx].name}</p>
                      <p className="text-platinum/60 text-xs uppercase tracking-widest">
                        {items[idx].role}
                      </p>
                    </div>
                  </figcaption>
                </motion.figure>
              </AnimatePresence>

              <div className="flex items-center justify-center gap-3 mt-8">
                <button
                  aria-label="Previous testimonial"
                  onClick={() => setIdx((i) => (i - 1 + items.length) % items.length)}
                  className="p-2 rounded-full border border-white/10 hover:bg-gold/10 hover:border-gold/40 transition"
                >
                  <ChevronLeft size={18} />
                </button>
                <div className="flex items-center gap-2">
                  {items.map((_, i) => (
                    <button
                      key={i}
                      aria-label={`Go to testimonial ${i + 1}`}
                      onClick={() => setIdx(i)}
                      className={`h-1.5 rounded-full transition-all ${
                        i === idx ? 'w-6 bg-gold' : 'w-1.5 bg-white/20'
                      }`}
                    />
                  ))}
                </div>
                <button
                  aria-label="Next testimonial"
                  onClick={() => setIdx((i) => (i + 1) % items.length)}
                  className="p-2 rounded-full border border-white/10 hover:bg-gold/10 hover:border-gold/40 transition"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
