'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Skeleton } from '@/components/ui/Skeleton';
import { CarCard } from '@/components/cars/CarCard';
import { useFeaturedCars } from '@/hooks/useApi';
import { useT } from '@/components/providers/LanguageProvider';

export function FeaturedCars() {
  const { data, isLoading, error } = useFeaturedCars();
  const t = useT();

  return (
    <section className="section">
      <Container>
        <SectionHeading
          eyebrow={t.featured.eyebrow}
          title={<>{t.featured.title1} <span className="gold-text">{t.featured.title2}</span></>}
          subtitle={t.featured.subtitle}
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
          {isLoading &&
            Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="aspect-[16/10] rounded-2xl" />
            ))}

          {error && (
            <p className="col-span-full text-center text-coral">
              Unable to load fleet. Please refresh.
            </p>
          )}

          {data?.slice(0, 6).map((car, idx) => (
            <ScrollReveal key={car._id} delay={idx * 0.05}>
              <CarCard car={car} />
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/cars" className="btn-ghost">
            {t.cta.viewAll} <ArrowRight size={16} />
          </Link>
        </div>
      </Container>
    </section>
  );
}
