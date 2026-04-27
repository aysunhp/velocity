'use client';

import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { ArrowLeft, Check, Gauge, Users, Cog, Fuel, Calendar, Zap, Activity } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Gallery } from '@/components/cars/Gallery';
import { BookingForm } from '@/components/cars/BookingForm';
import { Skeleton } from '@/components/ui/Skeleton';
import { useCarBySlug } from '@/hooks/useApi';
import { useT } from '@/components/providers/LanguageProvider';

export default function CarDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug;
  const { data: car, isLoading, error } = useCarBySlug(slug ?? '');
  const t = useT();

  if (error) notFound();

  return (
    <main className="pt-28 pb-24">
      <Container>
        <Link
          href="/cars"
          className="inline-flex items-center gap-2 text-sm text-platinum/70 hover:text-gold transition mb-6"
        >
          <ArrowLeft size={14} /> {t.carDetail.back}
        </Link>

        {isLoading || !car ? (
          <div className="grid lg:grid-cols-[1.5fr_1fr] gap-8">
            <Skeleton className="aspect-[16/10] rounded-2xl" />
            <Skeleton className="h-[600px] rounded-2xl" />
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1.5fr_1fr] gap-10">
            {/* Left column */}
            <div className="space-y-10">
              <Gallery images={car.images?.length ? car.images : [car.thumbnail]} alt={car.name} />

              <header>
                <p className="heading-eyebrow">{car.brand} · {car.specs.year}</p>
                <div className="flex items-center gap-3 mt-2 flex-wrap">
                  <h1 className="font-display text-4xl md:text-5xl">{car.name}</h1>
                  <span
                    className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs uppercase tracking-widest ${
                      car.available
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                        : 'bg-coral/15 text-coral border border-coral/40'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${car.available ? 'bg-emerald-500' : 'bg-coral'}`}
                      aria-hidden
                    />
                    {car.available ? t.carCard.available : t.carCard.unavailable}
                  </span>
                </div>
                <p className="text-platinum/75 mt-3 leading-relaxed max-w-2xl">{car.description}</p>
              </header>

              {/* Specs grid */}
              <section>
                <h2 className="font-display text-2xl mb-5">{t.carDetail.specifications}</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <Spec icon={<Gauge size={16} />} label={t.carDetail.topSpeed} value={`${car.specs.topSpeed} km/h`} />
                  <Spec icon={<Activity size={16} />} label={t.carDetail.acceleration} value={`${car.specs.acceleration}s`} />
                  <Spec icon={<Zap size={16} />} label={t.carDetail.power} value={`${car.specs.power} hp`} />
                  <Spec icon={<Cog size={16} />} label={t.carDetail.transmission} value={car.specs.transmission} />
                  <Spec icon={<Fuel size={16} />} label={t.carDetail.fuel} value={car.specs.fuelType} />
                  <Spec icon={<Users size={16} />} label={t.carDetail.seats} value={String(car.specs.seats)} />
                  <Spec icon={<Calendar size={16} />} label={t.carDetail.year} value={String(car.specs.year)} />
                  <Spec icon={<Cog size={16} />} label={t.carDetail.engine} value={car.specs.engine} />
                  <Spec icon={<Cog size={16} />} label={t.carDetail.doors} value={String(car.specs.doors)} />
                </div>
              </section>

              {/* Features */}
              {car.features?.length ? (
                <section>
                  <h2 className="font-display text-2xl mb-5">{t.carDetail.highlights}</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {car.features.map((f) => (
                      <div
                        key={f}
                        className="flex items-center gap-2 px-4 py-3 rounded-lg bg-white/[0.03] border border-white/5"
                      >
                        <Check size={14} className="text-gold flex-shrink-0" />
                        <span className="text-sm text-platinum/85">{f}</span>
                      </div>
                    ))}
                  </div>
                </section>
              ) : null}
            </div>

            {/* Right column — booking form (sticky) */}
            <div className="lg:sticky lg:top-28 lg:self-start">
              <BookingForm car={car} />
            </div>
          </div>
        )}
      </Container>
    </main>
  );
}

function Spec({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
      <div className="flex items-center gap-2 text-gold">
        {icon}
        <span className="text-[10px] uppercase tracking-widest text-platinum/60">{label}</span>
      </div>
      <p className="font-display text-lg mt-2 capitalize">{value}</p>
    </div>
  );
}
