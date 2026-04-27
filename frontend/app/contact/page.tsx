'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, MessageCircle, CheckCircle2 } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { CONTACT } from '@/lib/constants';
import { useT } from '@/components/providers/LanguageProvider';

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const t = useT();

  return (
    <main className="pt-32 pb-24">
      <Container>
        <header className="max-w-3xl">
          <p className="heading-eyebrow">{t.contact.eyebrow}</p>
          <h1 className="font-display text-5xl md:text-6xl mt-2 leading-tight">
            {t.contact.title1} <span className="gold-text">{t.contact.title2}</span>
          </h1>
          <p className="text-platinum/75 text-lg mt-6">{t.contact.subtitle}</p>
        </header>

        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-10 mt-14">
          {/* Info column */}
          <div className="space-y-4">
            <Info
              icon={<Phone size={18} />}
              label={t.contact.phone}
              value={CONTACT.phone}
              href={`tel:${CONTACT.phone}`}
            />
            <Info
              icon={<MessageCircle size={18} />}
              label={t.contact.whatsapp}
              value={`+${CONTACT.whatsapp}`}
              href={`https://wa.me/${CONTACT.whatsapp}`}
            />
            <Info
              icon={<Mail size={18} />}
              label={t.contact.email}
              value={CONTACT.email}
              href={`mailto:${CONTACT.email}`}
            />
            <Info icon={<MapPin size={18} />} label={t.contact.address} value={CONTACT.address} />
            <Info icon={<Clock size={18} />} label={t.contact.hours} value={t.contact.hoursValue} />

            <div className="rounded-2xl overflow-hidden border border-white/5 mt-6 aspect-[4/3]">
              <iframe
                title="Map"
                src="https://www.openstreetmap.org/export/embed.html?bbox=49.83%2C40.36%2C49.89%2C40.40&layer=mapnik&marker=40.3777%2C49.8516"
                className="w-full h-full"
                loading="lazy"
              />
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="glass-dark rounded-2xl p-6 lg:p-8 border border-gold/15 space-y-4 self-start"
          >
            {sent ? (
              <div className="text-center py-12 space-y-3">
                <CheckCircle2 className="text-emerald mx-auto" size={48} />
                <h3 className="font-display text-2xl">{t.contact.sent}</h3>
                <p className="text-platinum/70 text-sm">{t.contact.sentDesc}</p>
              </div>
            ) : (
              <>
                <h2 className="font-display text-2xl">{t.contact.formTitle}</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  <Field label={t.contact.name}>
                    <input required className="form-input" />
                  </Field>
                  <Field label={t.contact.email}>
                    <input required type="email" className="form-input" />
                  </Field>
                </div>
                <Field label={t.contact.subject}>
                  <input required className="form-input" />
                </Field>
                <Field label={t.contact.message}>
                  <textarea required rows={5} className="form-input resize-none" />
                </Field>
                <button type="submit" className="btn-gold w-full">
                  {t.contact.send}
                </button>
              </>
            )}
          </form>
        </div>
      </Container>
    </main>
  );
}

function Info({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-start gap-4 p-5 rounded-xl border border-white/5 bg-white/[0.02] hover:border-gold/30 transition">
      <span className="w-10 h-10 rounded-lg bg-gold/10 text-gold grid place-items-center flex-shrink-0">
        {icon}
      </span>
      <div>
        <p className="text-[10px] uppercase tracking-widest text-platinum/60">{label}</p>
        <p className="text-cream mt-1">{value}</p>
      </div>
    </div>
  );
  return href ? (
    <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
      {content}
    </a>
  ) : (
    content
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-widest text-platinum/60 mb-1 inline-block">
        {label}
      </span>
      {children}
    </label>
  );
}
