'use client';

import { useEffect } from 'react';
import Hero from '@/components/sections/Hero';
import DemoWheel from '@/components/sections/DemoWheel';
import Features from '@/components/sections/Features';
import HowItWorks from '@/components/sections/HowItWorks';
import Pricing from '@/components/sections/Pricing';
import CallToAction from '@/components/sections/CallToAction';

export default function Home() {
  useEffect(() => {
    // Любой код, использующий window, должен быть здесь
  }, []);

  return (
    <main>
      <Hero />
      <DemoWheel />
      <Features />
      <HowItWorks />
      <Pricing />
      <CallToAction />
    </main>
  );
}
