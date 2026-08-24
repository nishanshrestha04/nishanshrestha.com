import Link from 'next/link';
import CopyEmailButton from '@/features/contact/CopyEmailButton';
import FadeIn from '@/core/components/animations/FadeIn';

const ContactTeaser = () => {
  return (
    <section className="c-space section-spacing pb-32" id="contact-teaser">
      <FadeIn className="relative overflow-hidden border-t border-border-primary pt-16 md:pt-24 flex flex-col items-start md:items-center text-left md:text-center group">
        {/* Animated background element */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#0070f3] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/4 h-32 bg-[#0070f3]/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -z-10 pointer-events-none" />

        <div className="flex items-center gap-3 mb-8">
          <span className="w-2 h-2 bg-green-500 animate-pulse" />
          <span className="font-mono text-sm tracking-widest text-text-secondary uppercase">
            Available for work
          </span>
        </div>

        <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-text-primary mb-8">
          Let's build <br className="md:hidden" /> something{' '}
          <span className="text-[#0070f3] opacity-80">useful.</span>
        </h2>

        <p className="text-text-secondary text-lg md:text-xl max-w-2xl leading-relaxed mb-12">
          Whether you need an AI-powered system or a robust full-stack
          application, I'm open to new opportunities and interesting technical
          collaborations.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto">
          <Link
            href="/contact"
            className="w-full sm:w-auto bg-[var(--text-primary)] text-[var(--bg-primary)] px-10 py-4 font-semibold hover:opacity-80 transition-opacity text-center text-lg "
          >
            Get in Touch
          </Link>
          <div className="text-text-secondary hidden sm:block font-mono">
            or
          </div>
          <div className="w-full sm:w-auto flex justify-center">
            <CopyEmailButton />
          </div>
        </div>
      </FadeIn>
    </section>
  );
};

export default ContactTeaser;
