'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Skeleton } from '@/components/ui/Skeleton';
import { useCategories } from '@/hooks/useApi';
import { useT } from '@/components/providers/LanguageProvider';

export function Categories() {
  const { data, isLoading } = useCategories();
  const t = useT();

  return (
    <section className="section">
      <Container>
        <SectionHeading
          eyebrow={t.categories.eyebrow}
          title={<>{t.categories.title1} <span className="gold-text">{t.categories.title2}</span></>}
          subtitle={t.categories.subtitle}
        />

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mt-14">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="aspect-[4/5] rounded-2xl" />
              ))
            : data?.map((cat, idx) => (
                <motion.div
                  key={cat._id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: idx * 0.07 }}
                >
                  <Link
                    href={`/cars?category=${cat.slug}`}
                    className="group relative block aspect-[4/5] overflow-hidden rounded-2xl border border-white/5"
                  >
                    {cat.image && (
                      <Image
                        src={cat.image}
                        alt={cat.name}
                        fill
                        sizes="(min-width: 1024px) 33vw, 50vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/40 to-midnight/10" />
                    <div className="absolute inset-0 p-6 flex flex-col justify-end">
                      <p className="text-[10px] uppercase tracking-[0.3em] text-gold/80 mb-2">
                        {cat.carCount ?? 0} {t.categories.carsCount}
                      </p>
                      <h3 className="font-display text-3xl group-hover:text-gold transition">
                        {cat.name}
                      </h3>
                      <p className="text-platinum/70 text-sm mt-1 line-clamp-2">
                        {cat.description}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
        </div>
      </Container>
    </section>
  );
}
