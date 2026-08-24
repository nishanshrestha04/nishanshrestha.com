import Link from 'next/link';
import RevealLeft from '@/core/components/animations/RevealLeft';
import FadeIn from '@/core/components/animations/FadeIn';

const AboutSummary = () => {
  return (
    <section
      className="c-space section-spacing border-t border-border-primary"
      id="about-summary"
    >
      <div className="flex flex-col lg:flex-row gap-12 items-start justify-between">
        <RevealLeft className="w-full lg:w-1/3">
          <h2 className="text-heading">About</h2>
        </RevealLeft>

        <FadeIn
          delay={0.2}
          className="w-full lg:w-2/3 flex flex-col gap-8 max-w-3xl"
        >
          <h3 className="text-3xl md:text-5xl font-bold text-text-primary tracking-tight leading-tight">
            I'm a software developer focused on AI-powered applications.
          </h3>

          <p className="text-text-secondary text-xl md:text-2xl leading-relaxed font-light">
            I work across machine learning, backend systems and modern web
            interfaces.
          </p>

          <div>
            <Link
              href="/about"
              className="text-text-primary hover:text-[#0070f3] font-medium text-lg flex items-center gap-2 group transition-colors"
            >
              Read About Me
              <svg
                width="20"
                height="20"
                viewBox="0 0 15 15"
                fill="none"
                className="transform group-hover:translate-x-1 transition-transform"
              >
                <path
                  d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default AboutSummary;
