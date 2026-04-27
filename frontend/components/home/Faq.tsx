'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Skeleton } from '@/components/ui/Skeleton';
import { useFaqs } from '@/hooks/useApi';
import { useT } from '@/components/providers/LanguageProvider';

export function Faq() {
  const { data, isLoading } = useFaqs();
  const [openId, setOpenId] = useState<string | null>(null);
  const t = useT();

  return (
    <section id="faq" className="section">
      <Container>
        <SectionHeading
          eyebrow={t.faq.eyebrow}
          title={<>{t.faq.title1} <span className="gold-text">{t.faq.title2}</span></>}
        />

        <div className="mt-14 max-w-3xl mx-auto space-y-3">
          {isLoading &&
            Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-16 rounded-xl" />
            ))}

          {data?.map((faq) => {
            const open = openId === faq._id;
            return (
              <div
                key={faq._id}
                className="border border-white/8 rounded-xl bg-white/[0.02] overflow-hidden"
              >
                <button
                  onClick={() => setOpenId(open ? null : faq._id)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-white/[0.03] transition"
                  aria-expanded={open}
                >
                  <span className="font-display text-lg">{faq.question}</span>
                  <motion.span
                    animate={{ rotate: open ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-gold flex-shrink-0"
                  >
                    <Plus size={20} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-platinum/75 leading-relaxed">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
