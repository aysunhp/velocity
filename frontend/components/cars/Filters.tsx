'use client';

import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useCategories } from '@/hooks/useApi';
import { useT } from '@/components/providers/LanguageProvider';
import type { CarsQuery } from '@/types';

interface Props {
  value: CarsQuery;
  onChange: (next: CarsQuery) => void;
  onReset: () => void;
}

const transmissions = ['automatic', 'manual'] as const;
const fuels = ['petrol', 'diesel', 'hybrid', 'electric'] as const;
const sortKeys = ['newest', 'price_asc', 'price_desc', 'rating'] as const;

export function CarFilters({ value, onChange, onReset }: Props) {
  const { data: categories } = useCategories();
  const t = useT();
  const set = <K extends keyof CarsQuery>(k: K, v: CarsQuery[K]) =>
    onChange({ ...value, [k]: v, page: 1 });

  return (
    <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={18} className="text-gold" />
          <h2 className="font-display text-xl">{t.filters.refine}</h2>
        </div>
        <button
          onClick={onReset}
          className="text-xs uppercase tracking-widest text-platinum/60 hover:text-gold transition flex items-center gap-1"
        >
          <X size={12} /> {t.filters.reset}
        </button>
      </header>

      <Group label={t.filters.search}>
        <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-white/[0.04] border border-white/10 focus-within:border-gold/40 transition">
          <Search size={14} className="text-gold" />
          <input
            type="search"
            value={value.search ?? ''}
            onChange={(e) => set('search', e.target.value || undefined)}
            placeholder={t.filters.searchPlaceholder}
            className="bg-transparent w-full outline-none text-sm text-cream placeholder:text-platinum/40"
          />
        </div>
      </Group>

      <Group label={t.filters.category}>
        <select
          value={value.category ?? ''}
          onChange={(e) => set('category', e.target.value || undefined)}
          className="select-input"
        >
          <option value="">{t.filters.allCategories}</option>
          {categories?.map((c) => (
            <option key={c._id} value={c.slug}>
              {c.name} ({c.carCount ?? 0})
            </option>
          ))}
        </select>
      </Group>

      <Group label={t.filters.price}>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            min={0}
            placeholder={t.filters.min}
            value={value.minPrice ?? ''}
            onChange={(e) => set('minPrice', e.target.value ? Number(e.target.value) : undefined)}
            className="select-input"
          />
          <input
            type="number"
            min={0}
            placeholder={t.filters.max}
            value={value.maxPrice ?? ''}
            onChange={(e) => set('maxPrice', e.target.value ? Number(e.target.value) : undefined)}
            className="select-input"
          />
        </div>
      </Group>

      <Group label={t.filters.transmission}>
        <div className="flex flex-wrap gap-2">
          {transmissions.map((tr) => (
            <Chip
              key={tr}
              active={value.transmission === tr}
              onClick={() => set('transmission', value.transmission === tr ? undefined : tr)}
            >
              {t.filters.transmissions[tr]}
            </Chip>
          ))}
        </div>
      </Group>

      <Group label={t.filters.fuel}>
        <div className="flex flex-wrap gap-2">
          {fuels.map((f) => (
            <Chip
              key={f}
              active={value.fuelType === f}
              onClick={() => set('fuelType', value.fuelType === f ? undefined : f)}
            >
              {t.filters.fuels[f]}
            </Chip>
          ))}
        </div>
      </Group>

      <Group label={t.filters.sort}>
        <select
          value={value.sort ?? 'newest'}
          onChange={(e) => set('sort', e.target.value as CarsQuery['sort'])}
          className="select-input"
        >
          {sortKeys.map((k) => (
            <option key={k} value={k}>{t.filters.sorts[k]}</option>
          ))}
        </select>
      </Group>
    </aside>
  );
}

function Group({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] uppercase tracking-widest text-platinum/60">{label}</label>
      {children}
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-xs uppercase tracking-widest border transition ${
        active
          ? 'bg-gold-gradient text-rich border-gold'
          : 'border-white/10 text-platinum/80 hover:border-gold/40'
      }`}
    >
      {children}
    </button>
  );
}
