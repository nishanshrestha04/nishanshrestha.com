import Hero from '../sections/Hero';
import AboutSummary from '../sections/AboutSummary';
import FeaturedProjects from '../sections/FeaturedProjects';
import ContactTeaser from '../sections/ContactTeaser';

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSummary />
      <FeaturedProjects />
      <ContactTeaser />
    </>
  );
}
