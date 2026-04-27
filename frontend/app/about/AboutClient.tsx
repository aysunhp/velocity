'use client';

import { Container } from '@/components/ui/Container';
import { Counter } from '@/components/ui/Counter';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Award, Heart, Sparkles, ShieldCheck } from 'lucide-react';
import { useT } from '@/components/providers/LanguageProvider';

const ICONS = [Sparkles, Heart, ShieldCheck, Award];

export function AboutClient() {
  const t = useT();

  return (
    <main className="pt-32 pb-24">
      <Container>
        <header className="max-w-3xl">
          <p className="heading-eyebrow">{t.about.eyebrow}</p>
          <h1 className="font-display text-5xl md:text-6xl mt-2 leading-tight">
            {t.about.title1} <span className="gold-text">{t.about.title2}</span>
          </h1>
          <p className="text-platinum/75 text-lg mt-6 leading-relaxed">{t.about.subtitle}</p>
        </header>

        <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          {t.about.stats.map((s, i) => (
            <ScrollReveal key={s.l} delay={i * 0.06} className="text-center">
              <p className="font-accent text-5xl gold-text">
                <Counter to={s.v} suffix={s.s} />
              </p>
              <p className="text-xs uppercase tracking-[0.3em] text-platinum/60 mt-2">{s.l}</p>
            </ScrollReveal>
          ))}
        </section>

        <section className="mt-24">
          <h2 className="font-display text-3xl md:text-4xl">{t.about.valuesTitle}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            {t.about.values.map(({ title, desc }, i) => {
              const Icon = ICONS[i];
              return (
                <ScrollReveal key={title} delay={i * 0.07}>
                  <div className="h-full p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-gold/30 hover:bg-gold/5 transition">
                    <div className="w-11 h-11 rounded-xl bg-gold/10 grid place-items-center text-gold">
                      <Icon size={20} />
                    </div>
                    <h3 className="font-display text-xl mt-4">{title}</h3>
                    <p className="text-platinum/65 text-sm mt-2 leading-relaxed">{desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </section>
      </Container>
    </main>
  );
}
