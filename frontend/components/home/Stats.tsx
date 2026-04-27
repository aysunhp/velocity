'use client';

import { Container } from '@/components/ui/Container';
import { Counter } from '@/components/ui/Counter';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useT } from '@/components/providers/LanguageProvider';

export function Stats() {
  const t = useT();

  return (
    <section className="relative section overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-midnight via-midnight-700 to-midnight" />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=2000&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-midnight/70" />

      <Container className="relative">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {t.stats.statsArr.map((s, idx) => (
            <ScrollReveal key={s.label} delay={idx * 0.1}>
              <p className="font-accent text-6xl md:text-7xl gold-text leading-none">
                <Counter to={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-3 text-xs md:text-sm uppercase tracking-[0.3em] text-platinum/70">
                {s.label}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
