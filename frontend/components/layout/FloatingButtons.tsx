'use client';

import { Phone, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { CONTACT } from '@/lib/constants';

export function FloatingButtons() {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      <motion.a
        href={`https://wa.me/${CONTACT.whatsapp}`}
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.96 }}
        className="w-14 h-14 rounded-full bg-[#25D366] text-white grid place-items-center shadow-elev animate-pulse-glow"
      >
        <MessageCircle size={22} />
      </motion.a>
      <motion.a
        href={`tel:${CONTACT.phone}`}
        aria-label="Call"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.96 }}
        className="w-14 h-14 rounded-full bg-gold-gradient text-rich grid place-items-center shadow-gold"
      >
        <Phone size={20} />
      </motion.a>
    </div>
  );
}
