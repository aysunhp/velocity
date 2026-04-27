'use client';

import { Zap, Shield, Wallet, Car as CarIcon } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Counter } from '@/components/ui/Counter';
import { useT } from '@/components/providers/LanguageProvider';

const ICONS = [Zap, Shield, Wallet, CarIcon];

export function WhyChooseUs() {
  const t = useT();

  return (
    <section className="section bg-gradient-to-b from-transparent via-midnight-800/40 to-transparent">
      <Container>
        <SectionHeading
          eyebrow={t.whyUs.eyebrow}
          title={<>{t.whyUs.title1} <span className="gold-text">{t.whyUs.title2}</span></>}
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-14">
          {t.whyUs.features.map(({ label, stat, suffix, desc }, idx) => {
            const Icon = ICONS[idx];
            return (
            <ScrollReveal key={label} delay={idx * 0.08}>
              <div className="h-full p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-gold/30 hover:bg-gold/5 transition group">
                <div className="w-12 h-12 rounded-xl bg-gold/10 grid place-items-center text-gold group-hover:bg-gold-gradient group-hover:text-rich transition">
                  <Icon size={22} />
                </div>
                <p className="font-display text-4xl mt-5 gold-text">
                  <Counter to={stat} suffix={suffix} />
                </p>
                <h3 className="font-display text-lg mt-2">{label}</h3>
                <p className="text-platinum/65 text-sm mt-2 leading-relaxed">{desc}</p>
              </div>
            </ScrollReveal>
          )})}
        </div>
      </Container>
    </section>
  );
}
