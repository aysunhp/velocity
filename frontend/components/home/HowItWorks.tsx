'use client';

import { Search, CalendarCheck, FileSignature, KeyRound } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useT } from '@/components/providers/LanguageProvider';

const ICONS = [Search, CalendarCheck, FileSignature, KeyRound];

export function HowItWorks() {
  const t = useT();

  return (
    <section id="how-it-works" className="section">
      <Container>
        <SectionHeading
          eyebrow={t.howItWorks.eyebrow}
          title={<>{t.howItWorks.title1} <span className="gold-text">{t.howItWorks.title2}</span></>}
        />

        <div className="relative mt-16">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-12 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {t.howItWorks.steps.map(({ title, desc }, idx) => {
              const Icon = ICONS[idx];
              return (
              <ScrollReveal key={title} delay={idx * 0.1} className="text-center">
                <div className="relative mx-auto w-24 h-24 rounded-full glass-dark border border-gold/30 grid place-items-center">
                  <Icon className="text-gold" size={28} />
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-gold-gradient text-rich text-xs font-bold grid place-items-center">
                    {idx + 1}
                  </span>
                </div>
                <h3 className="font-display text-xl mt-6">{title}</h3>
                <p className="text-platinum/65 text-sm mt-2 max-w-xs mx-auto leading-relaxed">
                  {desc}
                </p>
              </ScrollReveal>
            )})}
          </div>
        </div>
      </Container>
    </section>
  );
}
