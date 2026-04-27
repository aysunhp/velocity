import { cn } from '@/lib/utils';
import { ScrollReveal } from './ScrollReveal';

interface Props {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: 'center' | 'left';
  className?: string;
}

export function SectionHeading({ eyebrow, title, subtitle, align = 'center', className }: Props) {
  return (
    <ScrollReveal
      className={cn(
        'max-w-3xl space-y-4',
        align === 'center' ? 'mx-auto text-center' : 'text-left',
        className
      )}
    >
      {eyebrow && <p className="heading-eyebrow">{eyebrow}</p>}
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-display leading-[1.05]">{title}</h2>
      {subtitle && <p className="text-platinum/80 text-lg leading-relaxed">{subtitle}</p>}
    </ScrollReveal>
  );
}
