'use client';

import dynamic from 'next/dynamic';
import FadeIn from '@/core/components/animations/FadeIn';
import StaggerContainer from '@/core/components/animations/StaggerContainer';

const GitHubCalendar = dynamic(
  () => import('react-github-calendar').then((mod) => mod.GitHubCalendar),
  { ssr: false },
);
import CopyEmailButton from '@/features/contact/CopyEmailButton';

const About = () => {
  return (
    <section className="c-space section-spacing pt-40 min-h-screen">
      <div className="w-full">
        <FadeIn y={20}>
          <h1 className="text-hero mb-20">About</h1>
        </FadeIn>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-16 xl:gap-24">
          {/* Left Column (Content) */}
          <StaggerContainer
            className="xl:col-span-7 flex flex-col gap-24"
            stagger={0.15}
          >
            {/* Intro */}
            <div className="border-l-2 border-[#0070f3] pl-6 md:pl-10">
              <h2 className="text-3xl md:text-5xl font-bold text-text-primary leading-tight">
                I'm a software developer focused on AI-powered applications.
              </h2>
            </div>

            {/* Core Philosophy */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-8">
              <div className="md:col-span-4">
                <h3 className="font-mono text-sm tracking-widest uppercase text-text-secondary mb-4">
                  Engineering Philosophy
                </h3>
              </div>
              <div className="md:col-span-8 flex flex-col gap-6 text-xl text-text-secondary leading-relaxed font-light">
                <p>
                  I believe that the best software is both powerful and
                  invisible. When building an AI product, it's not enough to
                  just wrap an API; the system must be reliable, scalable, and
                  provide a seamless user experience.
                </p>
                <p>
                  I prefer taking ownership of the entire pipeline: from data
                  processing and model fine-tuning to exposing it via robust
                  APIs and building clean, responsive interfaces.
                </p>
              </div>
            </div>

            {/* Visual System */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-8 items-center">
              <div className="md:col-span-4">
                <h3 className="font-mono text-sm tracking-widest uppercase text-text-secondary mb-4">
                  Pipeline
                </h3>
              </div>
              <div className="md:col-span-8">
                <div className="flex items-center gap-2 md:gap-4 bg-bg-primary border border-border-primary p-6 md:p-8 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0070f3]/0 via-[#0070f3]/5 to-[#0070f3]/0 opacity-50" />

                  <div
                    className="flex-1 text-center font-bold text-sm md:text-lg"
                    style={{
                      animation: 'flow-light 3s infinite',
                      animationDelay: '0s',
                    }}
                  >
                    MODEL
                  </div>

                  <div
                    className="w-8 md:w-16 h-px bg-gradient-to-r from-transparent via-[#0070f3] to-transparent relative"
                    style={{
                      animation: 'flow-line 3s infinite',
                      animationDelay: '0.6s',
                    }}
                  >
                    <div className="absolute top-1/2 left-full -translate-x-full -translate-y-1/2 w-0 h-0 border-y-4 border-y-transparent border-l-4 border-l-[#0070f3]" />
                  </div>

                  <div
                    className="flex-1 text-center font-bold text-sm md:text-lg"
                    style={{
                      animation: 'flow-light 3s infinite',
                      animationDelay: '1.2s',
                    }}
                  >
                    API
                  </div>

                  <div
                    className="w-8 md:w-16 h-px bg-gradient-to-r from-transparent via-[#0070f3] to-transparent relative"
                    style={{
                      animation: 'flow-line 3s infinite',
                      animationDelay: '1.8s',
                    }}
                  >
                    <div className="absolute top-1/2 left-full -translate-x-full -translate-y-1/2 w-0 h-0 border-y-4 border-y-transparent border-l-4 border-l-[#0070f3]" />
                  </div>

                  <div
                    className="flex-1 text-center font-bold text-sm md:text-lg"
                    style={{
                      animation: 'flow-light 3s infinite',
                      animationDelay: '2.4s',
                    }}
                  >
                    PRODUCT
                  </div>
                </div>
              </div>
            </div>

            {/* Currently Exploring */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-8 border-t border-border-primary pt-16">
              <div className="md:col-span-4">
                <h3 className="font-mono text-sm tracking-widest uppercase text-text-secondary mb-4">
                  Currently Exploring
                </h3>
              </div>
              <div className="md:col-span-8">
                <ul className="flex flex-col gap-6 text-lg md:text-xl text-text-primary">
                  <li className="flex items-center gap-4 border-b border-border-primary pb-6">
                    <span className="text-[#0070f3] font-bold">01</span>
                    Agentic Workflows
                  </li>
                  <li className="flex items-center gap-4 border-b border-border-primary pb-6">
                    <span className="text-[#0070f3] font-bold">02</span>
                    Advanced RAG Architectures
                  </li>
                  <li className="flex items-center gap-4 pb-6">
                    <span className="text-[#0070f3] font-bold">03</span>
                    Edge Deployment for ML Models
                  </li>
                </ul>
              </div>
            </div>
          </StaggerContainer>

          {/* Right Column (Widgets) */}
          <FadeIn
            delay={0.3}
            className="xl:col-span-5 flex flex-col gap-12 mt-16 xl:mt-0 xl:pt-16"
          >
            {/* GitHub Graph */}
            <div className="bg-bg-secondary border border-border-primary p-6 md:p-8 overflow-hidden w-full">
              <h4 className="text-text-primary font-bold text-xl mb-6">
                GitHub Contributions
              </h4>
              <div className="w-full overflow-x-auto pb-4">
                <div className="min-w-[700px]">
                  <GitHubCalendar
                    username="nishanshrestha04"
                    colorScheme="dark"
                    theme={{
                      dark: [
                        '#171717',
                        '#004085',
                        '#0056b3',
                        '#0070f3',
                        '#3291ff',
                      ],
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Contact / Copy Email */}
            <div className="bg-bg-primary border border-border-primary p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
              <div>
                <h4 className="text-text-primary font-bold text-xl mb-2">
                  Let's build together
                </h4>
                <p className="text-text-secondary font-light">
                  I'm currently open for new opportunities and collaborations.
                </p>
              </div>
              <CopyEmailButton />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default About;
