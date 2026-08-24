import Link from 'next/link';
import AIPipelineVisual from '@/features/projects/AIPipelineVisual';
import StaggerContainer from '@/core/components/animations/StaggerContainer';
import FadeIn from '@/core/components/animations/FadeIn';

const Hero = () => {
  return (
    <section className="c-space min-h-[100dvh] flex flex-col justify-start md:justify-center pt-32 pb-32 md:pb-20 overflow-hidden">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-10 md:gap-16 lg:gap-24 w-full">
        {/* Left Content */}
        <StaggerContainer
          className="flex-1 flex flex-col gap-8 w-full max-w-3xl z-10"
          duration={1}
          stagger={0.2}
        >
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-2 h-2 bg-[#0070f3] animate-pulse"></span>
              <p className="text-text-secondary font-mono text-sm tracking-widest uppercase">
                AI / Software Developer
              </p>
            </div>
            <h1 className="text-hero">
              I build <br className="hidden md:block" /> AI-powered{' '}
              <br className="hidden md:block" /> products{' '}
              <span className="text-text-secondary">that</span>{' '}
              <br className="hidden md:block" />{' '}
              <span className="text-text-secondary">actually</span> ship.
            </h1>
          </div>

          <p className="text-text-secondary text-xl md:text-2xl leading-relaxed max-w-2xl font-light">
            I build AI-powered applications and full-stack software across
            machine learning, APIs, databases and modern frontend systems.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-6 mt-4">
            <Link
              href="/projects"
              className="bg-[var(--text-primary)] text-[var(--bg-primary)] px-8 py-4 font-semibold hover:opacity-80 transition-opacity"
            >
              View Work
            </Link>
            <a
              href="https://pdflink.to/7445fe63/"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-border-primary text-text-primary px-8 py-4 font-semibold hover:bg-bg-secondary transition-colors"
            >
              Resume
            </a>
          </div>
        </StaggerContainer>

        {/* Right Visual */}
        <FadeIn
          delay={0.6}
          y={0}
          duration={1.5}
          className="flex-1 w-full flex justify-end lg:justify-center relative"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-br from-[#0070f3]/10 to-transparent blur-3xl pointer-events-none -z-10" />
          <AIPipelineVisual />
        </FadeIn>
      </div>
    </section>
  );
};

export default Hero;
