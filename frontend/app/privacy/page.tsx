import type { Metadata } from 'next';
import { PrivacyClient } from './PrivacyClient';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'What the Velocity site collects, how it is used, and what we do not do — no cookies, no analytics, no tracking.',
};

export default function PrivacyPage() {
  return <PrivacyClient />;
}
