import Link from 'next/link';
import { Container } from '@/components/ui/Container';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center pt-20">
      <Container className="text-center max-w-2xl">
        <p className="font-accent text-[10rem] leading-none gold-text">404</p>
        <h1 className="font-display text-4xl md:text-5xl mt-4">Lost on the highway</h1>
        <p className="text-platinum/70 mt-4">
          The page you&apos;re looking for has taken an exit. Let&apos;s navigate back to the fleet.
        </p>
        <div className="flex justify-center gap-3 mt-8">
          <Link href="/" className="btn-gold">Home</Link>
          <Link href="/cars" className="btn-ghost">Browse fleet</Link>
        </div>
      </Container>
    </main>
  );
}
