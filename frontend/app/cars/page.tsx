'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { CarCard } from '@/components/cars/CarCard';
import { CarFilters } from '@/components/cars/Filters';
import { Skeleton } from '@/components/ui/Skeleton';
import { useCars } from '@/hooks/useApi';
import { useT } from '@/components/providers/LanguageProvider';
import type { CarsQuery } from '@/types';

const PAGE_SIZE = 9;

export default function CarsPage() {
  return (
    <Suspense fallback={<CarsPageFallback />}>
      <CarsPageInner />
    </Suspense>
  );
}

function CarsPageFallback() {
  return (
    <main className="pt-32 pb-24">
      <Container>
        <Skeleton className="h-12 w-1/2 mb-10" />
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="aspect-[16/14] rounded-2xl" />
          ))}
        </div>
      </Container>
    </main>
  );
}

function CarsPageInner() {
  const router = useRouter();
  const params = useSearchParams();
  const t = useT();

  const [query, setQuery] = useState<CarsQuery>(() => ({
    category: params.get('category') ?? undefined,
    search: params.get('search') ?? undefined,
    page: 1,
    limit: PAGE_SIZE,
    sort: 'newest',
  }));

  // Sync category param into local state when URL changes (e.g., from footer link)
  useEffect(() => {
    const cat = params.get('category') ?? undefined;
    setQuery((q) => (q.category === cat ? q : { ...q, category: cat, page: 1 }));
  }, [params]);

  const { data, isLoading } = useCars(query);
  const items = data?.data ?? [];
  const meta = data?.meta;

  const reset = () => {
    setQuery({ page: 1, limit: PAGE_SIZE, sort: 'newest' });
    router.replace('/cars');
  };

  return (
    <main className="pt-32 pb-24">
      <Container>
        <header className="mb-10">
          <p className="heading-eyebrow">{t.carsPage.eyebrow}</p>
          <h1 className="font-display text-5xl md:text-6xl mt-2">
            {t.carsPage.title1} <span className="gold-text">{t.carsPage.title2}</span>
          </h1>
          <p className="text-platinum/70 mt-3 max-w-2xl">
            {t.carsPage.subtitle}
          </p>
        </header>

        <div className="grid lg:grid-cols-[280px_1fr] gap-10">
          <CarFilters value={query} onChange={setQuery} onReset={reset} />

          <section>
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-platinum/70">
                {meta ? `${meta.total} ${t.carsPage.count}` : t.carsPage.loading}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {isLoading &&
                Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="aspect-[16/14] rounded-2xl" />
                ))}
              {!isLoading && items.length === 0 && (
                <div className="col-span-full glass rounded-2xl p-12 text-center">
                  <p className="font-display text-2xl">{t.carsPage.noResultsTitle}</p>
                  <p className="text-platinum/65 mt-2">{t.carsPage.noResultsDesc}</p>
                  <button onClick={reset} className="btn-ghost mt-6 mx-auto">
                    {t.carsPage.reset}
                  </button>
                </div>
              )}
              {items.map((car) => (
                <CarCard key={car._id} car={car} />
              ))}
            </div>

            {meta && meta.totalPages > 1 && (
              <nav className="mt-12 flex items-center justify-center gap-2">
                {Array.from({ length: meta.totalPages }).map((_, i) => {
                  const p = i + 1;
                  const active = p === meta.page;
                  return (
                    <button
                      key={p}
                      onClick={() => setQuery((q) => ({ ...q, page: p }))}
                      className={`min-w-10 h-10 rounded-lg text-sm font-medium transition ${
                        active
                          ? 'bg-gold-gradient text-rich'
                          : 'border border-white/10 text-platinum/80 hover:border-gold/40'
                      }`}
                    >
                      {p}
                    </button>
                  );
                })}
              </nav>
            )}
          </section>
        </div>
      </Container>
    </main>
  );
}
