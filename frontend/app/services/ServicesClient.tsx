'use client';

import { Container } from '@/components/ui/Container';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Plane, UserCheck, Calendar, Crown, ShieldCheck, Building } from 'lucide-react';
import { useT } from '@/components/providers/LanguageProvider';

const ICONS = [Plane, UserCheck, Calendar, Crown, Building, ShieldCheck];

export function ServicesClient() {
  const t = useT();

  return (
    <main className="pt-32 pb-24">
      <Container>
        <header className="max-w-3xl">
          <p className="heading-eyebrow">{t.services.eyebrow}</p>
          <h1 className="font-display text-5xl md:text-6xl mt-2 leading-tight">
            <span className="gold-text">{t.services.title1}</span> {t.services.title2}
          </h1>
          <p className="text-platinum/75 text-lg mt-6">{t.services.subtitle}</p>
        </header>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-14">
          {t.services.items.map(({ title, desc }, i) => {
            const Icon = ICONS[i];
            return (
              <ScrollReveal key={title} delay={i * 0.06}>
                <div className="h-full p-7 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-gold/30 hover:bg-gold/5 transition group">
                  <div className="w-12 h-12 rounded-xl bg-gold/10 grid place-items-center text-gold group-hover:bg-gold-gradient group-hover:text-rich transition">
                    <Icon size={22} />
                  </div>
                  <h3 className="font-display text-xl mt-5">{title}</h3>
                  <p className="text-platinum/70 text-sm mt-2 leading-relaxed">{desc}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </Container>
    </main>
  );
}
