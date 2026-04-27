'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ChevronDown, MapPin, Calendar, Search } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { useT } from '@/components/providers/LanguageProvider';

export const HERO_RESERVATION_KEY = 'velocity.heroReservation';

export function Hero() {
  const t = useT();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const draft = {
      pickupLocation: String(fd.get('pickupLocation') ?? ''),
      pickupAt: String(fd.get('pickupAt') ?? ''),
      returnAt: String(fd.get('returnAt') ?? ''),
    };
    try {
      sessionStorage.setItem(HERO_RESERVATION_KEY, JSON.stringify(draft));
    } catch {
      /* ignore quota / privacy errors */
    }
    router.push('/cars');
  };
  
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-hero-gradient" />
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-60"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2400&q=80"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
        <source
          src="https://videos.pexels.com/video-files/3066482/3066482-uhd_2560_1440_24fps.mp4"
          type="video/mp4"
        />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-midnight/70 via-midnight/60 to-midnight" />
      {/* Decorative orbs */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-gold/10 blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-electric/10 blur-3xl" />

      <Container className="relative z-10 py-32 grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 space-y-8">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="heading-eyebrow"
          >
            {t.hero.eyebrow}
          </motion.p>

          <h1 className="font-display leading-[1.02] text-5xl md:text-7xl lg:text-8xl">
            {t.hero.title.split(' ').map((word, i) => (
              <motion.span
                key={`${word}-${i}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block mr-4"
              >
                {i === t.hero.titleAccentIdx ? <span className="gold-text">{word}</span> : word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="text-platinum/80 text-lg max-w-xl leading-relaxed"
          >
            {t.hero.desc}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="flex flex-wrap items-center gap-3"
          >
            <Link href="/cars" className="btn-gold">{t.cta.explore}</Link>
            <Link href="/contact" className="btn-ghost">{t.cta.talk}</Link>
          </motion.div>
        </div>

        {/* Reservation card */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          onSubmit={handleSubmit}
          className="lg:col-span-5 glass-dark rounded-2xl p-6 lg:p-8 border border-gold/20 shadow-elev space-y-5"
        >
          <div>
            <h3 className="font-display text-2xl">{t.hero.reserveTitle}</h3>
            <p className="text-platinum/60 text-sm">{t.hero.reserveDesc}</p>
          </div>

          <Field label={t.hero.pickupLoc} icon={<MapPin size={16} />}>
            <input
              name="pickupLocation"
              type="text"
              defaultValue="Baku, Azerbaijan"
              className="bg-transparent w-full outline-none text-cream placeholder:text-platinum/40"
            />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label={t.hero.pickupDate} icon={<Calendar size={16} />}>
              <input
                name="pickupAt"
                type="date"
                className="bg-transparent w-full min-w-0 outline-none text-cream text-sm [color-scheme:dark]"
              />
            </Field>
            <Field label={t.hero.returnDate} icon={<Calendar size={16} />}>
              <input
                name="returnAt"
                type="date"
                className="bg-transparent w-full min-w-0 outline-none text-cream text-sm [color-scheme:dark]"
              />
            </Field>
          </div>

          <button type="submit" className="btn-gold w-full">
            <Search size={16} /> {t.cta.find}
          </button>
        </motion.form>
      </Container>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-platinum/60"
      >
        <span className="text-[10px] uppercase tracking-[0.4em]">{t.hero.scroll}</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </motion.div>
    </section>
  );
}

function Field({
  label,
  icon,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-widest text-platinum/60 mb-1 inline-block">
        {label}
      </span>
      <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-white/[0.04] border border-white/10 focus-within:border-gold/40 transition">
        <span className="text-gold">{icon}</span>
        {children}
      </div>
    </label>
  );
}
