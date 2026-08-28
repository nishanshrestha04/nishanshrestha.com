'use client';

import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/core/utils/apiClient';
import FadeIn from '@/core/components/animations/FadeIn';
import RevealRightContainer from '@/core/components/animations/RevealRightContainer';

const FullExperience = () => {
  const { data: experiences = [], isLoading } = useQuery({
    queryKey: ['experiences'],
    queryFn: () => apiClient('/api/experiences'),
  });

  if (isLoading) {
    return (
      <section className="c-space section-spacing pt-40 min-h-screen flex items-center justify-center">
        <div className="font-mono text-text-secondary animate-pulse">LOADING_EXPERIENCE...</div>
      </section>
    );
  }
  return (
    <section className="c-space section-spacing pt-40 min-h-screen">
      <FadeIn className="mb-24">
        <h1 className="text-hero mb-6">Experience</h1>
        <p className="subtext">
          A detailed timeline of my professional journey in software
          engineering.
        </p>
      </FadeIn>

      <RevealRightContainer
        className="flex flex-col gap-20 border-l border-border-primary pl-8 md:pl-16 ml-4 md:ml-8"
        stagger={0.2}
        x={60}
      >
        {experiences.map((exp, index) => (
          <div key={index} className="relative group">
            {/* Timeline Dot */}
            <div className="absolute -left-[39px] md:-left-[71px] top-2 w-3 h-3 bg-[#0070f3] shadow-[0_0_10px_rgba(0,112,243,0.5)] group-hover:scale-125 transition-transform" />

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              <div className="md:col-span-4 flex flex-col gap-2">
                <span className="font-mono text-sm tracking-widest uppercase text-[#0070f3]">
                  {exp.period}
                </span>
                <div className="flex items-center gap-3 mt-1">
                  {exp.logoUrl && (
                    <div className="w-10 h-10 rounded-lg p-1 shrink-0 flex items-center justify-center border border-border-primary overflow-hidden">
                      <img src={exp.logoUrl} alt={exp.company} className="w-full h-full object-contain" />
                    </div>
                  )}
                  <h3 className="text-3xl font-bold text-text-primary tracking-tight leading-tight">
                    {exp.role}
                  </h3>
                </div>
                <p className="text-xl text-text-secondary">{exp.company}</p>
              </div>

              <div className="md:col-span-8">
                <ul className="flex flex-col gap-6">
                  {(exp.description || []).map((item, i) => (
                    <li
                      key={i}
                      className="text-text-secondary text-lg leading-relaxed flex items-start gap-4"
                    >
                      <span className="text-[#27272a] font-bold mt-0.5">/</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </RevealRightContainer>
    </section>
  );
};

export default FullExperience;
