import Hero from '@/features/home/Hero';
import FeaturedProjects from '@/features/home/FeaturedProjects';
import Toolkit from '@/features/about/Toolkit';
import WhatIBuild from '@/features/home/WhatIBuild';
import Experiences from '@/features/experience/Experiences';
import AboutSummary from '@/features/about/AboutSummary';
import ContactTeaser from '@/features/contact/ContactTeaser';

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <Toolkit />
      <WhatIBuild />
      <Experiences />
      <AboutSummary />
      <ContactTeaser />
    </>
  );
}
