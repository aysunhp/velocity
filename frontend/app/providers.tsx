'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { useState, type ReactNode } from 'react';
import { createQueryClient } from '@/lib/queryClient';
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider';
import { LanguageProvider } from '@/components/providers/LanguageProvider';

export function Providers({ children }: { children: ReactNode }) {
  const [client] = useState(createQueryClient);
  return (
    <QueryClientProvider client={client}>
      <LanguageProvider>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </LanguageProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#0A1628',
            color: '#F5F1E8',
            border: '1px solid rgba(212,175,55,0.3)',
          },
        }}
      />
    </QueryClientProvider>
  );
}
