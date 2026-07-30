'use client';

import { Mail, Phone, ShieldCheck } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { CONTACT } from '@/lib/constants';
import { useT } from '@/components/providers/LanguageProvider';

export function PrivacyClient() {
  const t = useT();

  return (
    <main className="pt-32 pb-24">
      <Container>
        <header className="max-w-3xl">
          <p className="heading-eyebrow">{t.privacy.eyebrow}</p>
          <h1 className="font-display text-5xl md:text-6xl mt-2 leading-tight">
            {t.privacy.title1} <span className="gold-text">{t.privacy.title2}</span>
          </h1>
          <p className="text-[11px] uppercase tracking-widest text-platinum/50 mt-5">
            {t.privacy.updated}
          </p>
          <p className="text-platinum/75 text-lg mt-6 leading-relaxed">{t.privacy.intro}</p>
        </header>

        <div className="max-w-3xl mt-14 space-y-4">
          {t.privacy.sections.map((section, i) => (
            <ScrollReveal key={section.title} delay={i * 0.04}>
              <section className="p-7 rounded-2xl border border-white/5 bg-white/[0.02]">
                <h2 className="font-display text-2xl flex items-baseline gap-3">
                  <span className="text-gold/50 text-sm font-sans tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {section.title}
                </h2>
                <div className="mt-4 space-y-3">
                  {section.body.map((paragraph) => (
                    <p key={paragraph} className="text-platinum/70 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            </ScrollReveal>
          ))}
        </div>

        {/* Contact */}
        <div className="max-w-3xl mt-8">
          <ScrollReveal>
            <section className="p-7 rounded-2xl border border-gold/20 bg-gold/[0.04]">
              <h2 className="font-display text-2xl flex items-center gap-3">
                <span className="w-10 h-10 rounded-lg bg-gold/10 text-gold grid place-items-center flex-shrink-0">
                  <ShieldCheck size={18} />
                </span>
                {t.privacy.contactTitle}
              </h2>
              <p className="text-platinum/70 leading-relaxed mt-4">{t.privacy.contactBody}</p>
              <div className="flex flex-col sm:flex-row gap-3 mt-5">
                <a href={`mailto:${CONTACT.email}`} className="btn-gold justify-center">
                  <Mail size={16} /> {CONTACT.email}
                </a>
                <a href={`tel:${CONTACT.phone}`} className="btn-ghost justify-center">
                  <Phone size={16} /> {CONTACT.phone}
                </a>
              </div>
            </section>
          </ScrollReveal>
        </div>

        <p className="max-w-3xl text-xs text-platinum/45 leading-relaxed mt-8">
          {t.privacy.disclaimer}
        </p>
      </Container>
    </main>
  );
}
