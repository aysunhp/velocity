'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { Calendar, Mail, MapPin, Phone, User, MessageSquare, MessageCircle, CheckCircle2, AlertCircle, XCircle } from 'lucide-react';
import { useCreateBooking } from '@/hooks/useApi';
import { formatCurrency } from '@/lib/utils';
import { CONTACT } from '@/lib/constants';
import { useT } from '@/components/providers/LanguageProvider';
import { HERO_RESERVATION_KEY } from '@/components/home/Hero';
import type { Car } from '@/types';

// Hero stores dates as YYYY-MM-DD; datetime-local input wants YYYY-MM-DDTHH:mm.
const toDateTimeLocal = (date: string, time = '10:00') =>
  date ? `${date}T${time}` : '';

export function BookingForm({ car }: { car: Car }) {
  const mutation = useCreateBooking();
  const t = useT();
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    pickupLocation: 'Baku, Azerbaijan',
    returnLocation: 'Baku, Azerbaijan',
    pickupAt: '',
    returnAt: '',
    message: '',
  });

  // Prefill from Hero search if the user came from the home page.
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(HERO_RESERVATION_KEY);
      if (!raw) return;
      const draft = JSON.parse(raw) as {
        pickupLocation?: string;
        pickupAt?: string;
        returnAt?: string;
      };
      setForm((s) => ({
        ...s,
        pickupLocation: draft.pickupLocation || s.pickupLocation,
        returnLocation: draft.pickupLocation || s.returnLocation,
        pickupAt: toDateTimeLocal(draft.pickupAt ?? '', '10:00'),
        returnAt: toDateTimeLocal(draft.returnAt ?? '', '18:00'),
      }));
    } catch {
      /* ignore parse / storage errors */
    }
  }, []);

  const days = useMemo(() => {
    if (!form.pickupAt || !form.returnAt) return 0;
    const ms = new Date(form.returnAt).getTime() - new Date(form.pickupAt).getTime();
    return ms > 0 ? Math.ceil(ms / 86_400_000) : 0;
  }, [form.pickupAt, form.returnAt]);

  const total = days * car.pricePerDay;

  const onChange =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((s) => ({ ...s, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (days <= 0) return;
    mutation.mutate({
      carId: car._id,
      ...form,
    } as Parameters<typeof mutation.mutate>[0]);
  };

  if (!car.available) {
    return (
      <div className="glass-dark rounded-2xl p-8 text-center space-y-5 border border-coral/30">
        <XCircle className="text-coral mx-auto" size={48} />
        <div>
          <h3 className="font-display text-2xl">{t.booking.unavailableTitle}</h3>
          <p className="text-platinum/75 text-sm mt-2 leading-relaxed">{t.booking.unavailableDesc}</p>
        </div>
        <div className="flex flex-col gap-2 pt-2">
          <a
            href={`https://wa.me/${CONTACT.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className="btn-gold w-full justify-center"
          >
            <MessageCircle size={16} /> WhatsApp
          </a>
          <Link href="/contact" className="btn-ghost w-full justify-center">
            <Mail size={16} /> {t.contact.email}
          </Link>
        </div>
      </div>
    );
  }

  if (mutation.isSuccess) {
    return (
      <div className="glass-dark rounded-2xl p-8 text-center space-y-4 border border-emerald/30">
        <CheckCircle2 className="text-emerald mx-auto" size={48} />
        <h3 className="font-display text-2xl">{t.booking.received}</h3>
        <p className="text-platinum/75 text-sm">
          {t.booking.receivedDesc}
          <br />
          {t.booking.reference}: <span className="text-gold">{mutation.data?._id?.slice(0, 8)}</span>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="glass-dark rounded-2xl p-6 lg:p-8 space-y-4 border border-gold/15">
      <div>
        <h3 className="font-display text-2xl">{t.booking.reserveTitle} {car.name}</h3>
        <p className="text-xs uppercase tracking-widest text-gold/80 mt-1">
          {t.carCard.from} {formatCurrency(car.pricePerDay, car.currency)} {t.booking.perDay}
        </p>
      </div>

      <Field icon={<User size={14} />} label={t.booking.fullName}>
        <input required value={form.fullName} onChange={onChange('fullName')} className="form-input" />
      </Field>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field icon={<Mail size={14} />} label={t.booking.email}>
          <input required type="email" value={form.email} onChange={onChange('email')} className="form-input" />
        </Field>
        <Field icon={<Phone size={14} />} label={t.booking.phone}>
          <input required value={form.phone} onChange={onChange('phone')} placeholder="+994..." className="form-input" />
        </Field>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field icon={<MapPin size={14} />} label={t.booking.pickup}>
          <input required value={form.pickupLocation} onChange={onChange('pickupLocation')} className="form-input" />
        </Field>
        <Field icon={<MapPin size={14} />} label={t.booking.returnLoc}>
          <input required value={form.returnLocation} onChange={onChange('returnLocation')} className="form-input" />
        </Field>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field icon={<Calendar size={14} />} label={t.booking.pickupAt}>
          <input
            required
            type="datetime-local"
            value={form.pickupAt}
            onChange={onChange('pickupAt')}
            className="form-input [color-scheme:dark]"
          />
        </Field>
        <Field icon={<Calendar size={14} />} label={t.booking.returnAt}>
          <input
            required
            type="datetime-local"
            value={form.returnAt}
            onChange={onChange('returnAt')}
            className="form-input [color-scheme:dark]"
          />
        </Field>
      </div>
      <Field icon={<MessageSquare size={14} />} label={t.booking.notes}>
        <textarea rows={2} value={form.message} onChange={onChange('message')} className="form-input resize-none" />
      </Field>

      {days > 0 && (
        <div className="rounded-xl bg-gold/8 border border-gold/25 p-4 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-gold/80">{t.booking.estimatedTotal}</p>
            <p className="font-display text-2xl gold-text">
              {formatCurrency(total, car.currency)}
              <span className="text-sm text-platinum/70 font-sans"> · {days} {days > 1 ? t.booking.days : t.booking.day}</span>
            </p>
          </div>
        </div>
      )}

      {mutation.isError && (
        <p className="flex items-center gap-2 text-coral text-sm">
          <AlertCircle size={14} />
          {t.booking.error}
        </p>
      )}

      <button
        type="submit"
        disabled={mutation.isPending || days <= 0}
        className="btn-gold w-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {mutation.isPending ? t.booking.sending : t.booking.reserveBtn}
      </button>
      <p className="text-[10px] text-platinum/50 text-center">
        {t.booking.footnote}
      </p>
    </form>
  );
}

function Field({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-widest text-platinum/60 mb-1 inline-flex items-center gap-1">
        <span className="text-gold">{icon}</span> {label}
      </span>
      {children}
    </label>
  );
}
