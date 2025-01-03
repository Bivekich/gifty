import Hero from '@/components/sections/Hero';
import HowItWorks from '@/components/sections/HowItWorks';
import Features from '@/components/sections/Features';
import Pricing from '@/components/sections/Pricing';
import CallToAction from '@/components/sections/CallToAction';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <HowItWorks />
      <Features />
      <Pricing />
      <CallToAction />
    </main>
  );
}
