'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Gauge, Users, Cog, Fuel, ArrowUpRight } from 'lucide-react';
import type { Car } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { useT } from '@/components/providers/LanguageProvider';

export function CarCard({ car }: { car: Car }) {
  const t = useT();
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      className="group relative overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-b from-white/[0.04] to-transparent shadow-elev"
    >
      <Link href={`/cars/${car.slug}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={car.thumbnail}
            alt={car.name}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className={`object-cover transition-transform duration-700 group-hover:scale-110 ${
              !car.available ? 'grayscale opacity-70' : ''
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/30 to-transparent" />
          <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs uppercase tracking-widest glass">
            {car.brand}
          </div>
          <div className="absolute top-3 right-3 flex flex-col items-end gap-2">
            {!car.available ? (
              <span className="px-3 py-1 rounded-full text-xs uppercase tracking-widest bg-coral/90 text-white font-semibold">
                {t.carCard.unavailable}
              </span>
            ) : car.featured ? (
              <span className="px-3 py-1 rounded-full text-xs uppercase tracking-widest bg-gold-gradient text-rich font-semibold">
                {t.carCard.featured}
              </span>
            ) : null}
          </div>
        </div>

        <div className="p-5 space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-display text-xl leading-tight">{car.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${car.available ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.7)]' : 'bg-coral'}`}
                  aria-hidden
                />
                <p className="text-platinum/60 text-xs uppercase tracking-widest">
                  {car.available ? t.carCard.available : t.carCard.unavailable} · {car.categorySlug}
                </p>
              </div>
            </div>
            <ArrowUpRight className="text-gold opacity-0 group-hover:opacity-100 transition" size={20} />
          </div>

          <div className="grid grid-cols-4 gap-2 text-xs text-platinum/80">
            <Spec icon={<Gauge size={14} />} label={`${car.specs.topSpeed}`} unit="km/h" />
            <Spec icon={<Cog size={14} />} label={car.specs.transmission.slice(0, 4)} />
            <Spec icon={<Users size={14} />} label={`${car.specs.seats}`} unit={t.carCard.seats} />
            <Spec icon={<Fuel size={14} />} label={car.specs.fuelType.slice(0, 4)} />
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-white/5">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-platinum/50">{t.carCard.from}</p>
              <p className="font-display text-2xl gold-text">
                {formatCurrency(car.pricePerDay, car.currency)}
                <span className="text-xs text-platinum/60 font-sans"> /{t.carCard.day}</span>
              </p>
            </div>
            {car.available ? (
              <span className="btn-gold text-xs px-4 py-2">{t.carCard.reserve}</span>
            ) : (
              <span className="text-xs px-4 py-2 rounded-full border border-white/10 text-platinum/60 uppercase tracking-widest">
                {t.carCard.unavailable}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

function Spec({ icon, label, unit }: { icon: React.ReactNode; label: string; unit?: string }) {
  return (
    <div className="flex flex-col items-center gap-1 py-2 rounded-lg bg-white/[0.02]">
      <span className="text-gold">{icon}</span>
      <span className="font-medium capitalize">{label}</span>
      {unit && <span className="text-[10px] text-platinum/50">{unit}</span>}
    </div>
  );
}
