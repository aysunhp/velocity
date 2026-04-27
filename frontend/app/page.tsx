import { Hero } from '@/components/home/Hero';
import { Categories } from '@/components/home/Categories';
import { FeaturedCars } from '@/components/home/FeaturedCars';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { HowItWorks } from '@/components/home/HowItWorks';
import { Showcase } from '@/components/home/Showcase';
import { Testimonials } from '@/components/home/Testimonials';
import { Stats } from '@/components/home/Stats';
import { Faq } from '@/components/home/Faq';
import { CTABanner } from '@/components/home/CTABanner';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Categories />
      <FeaturedCars />
      <WhyChooseUs />
      <HowItWorks />
      <Showcase />
      <Stats />
      <Testimonials />
      <Faq />
      <CTABanner />
    </main>
  );
}
