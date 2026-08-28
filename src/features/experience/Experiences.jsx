'use client';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/core/utils/apiClient';
import FadeIn from '@/core/components/animations/FadeIn';

const Experiences = () => {
  const { data: experiences = [], isLoading } = useQuery({
    queryKey: ['experiences'],
    queryFn: () => apiClient('/api/experiences'),
  });

  if (isLoading) {
    return (
      <section id="experience" className="c-space section-spacing border-t border-border-primary flex items-center justify-center">
        <div className="font-mono text-text-secondary animate-pulse">LOADING_EXPERIENCE...</div>
      </section>
    );
  }

  // Only show the first experience
  const exp = experiences[0];

  if (!exp) return null;

  return (
    <section
      id="experience"
      className="c-space section-spacing border-t border-border-primary"
    >
      <FadeIn className="flex flex-col md:flex-row gap-12 lg:gap-24 items-start">
        <div className="w-full md:w-1/3">
          <h2 className="text-heading mb-6">Experience</h2>
          <p className="text-text-secondary text-lg mb-8 leading-relaxed">
            A timeline of my professional experience and growth.
          </p>
          <Link
            href="/experience"
            className="inline-flex items-center gap-2 font-medium text-text-primary hover:text-[#0070f3] transition-colors group"
          >
            View Full Experience
            <svg
              width="15"
              height="15"
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

        <div className="w-full md:w-2/3 border border-border-primary bg-bg-primary p-8 hover:border-[#0070f3]/50 transition-colors">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              {exp.logoUrl && (
                <div className="w-12 h-12 rounded-lg p-1 shrink-0 flex items-center justify-center border border-border-primary overflow-hidden">
                  <img
 src={exp.logoUrl} alt={exp.company} className="w-full h-full object-contain" />
                </div>
              )}
              <div>
                <h3 className="text-2xl font-bold text-text-primary tracking-tight">
                  {exp.role}
                </h3>
                <p className="text-[#0070f3] font-medium mt-1">{exp.company}</p>
              </div>
            </div>
            <div className="font-mono text-xs tracking-widest uppercase text-text-secondary border border-border-primary bg-bg-secondary px-3 py-1.5 ">
              {exp.period}
            </div>
          </div>
          <ul className="flex flex-col gap-4">
            {(exp.description || []).slice(0, 3).map((item, i) => (
              <li
                key={i}
                className="text-text-secondary leading-relaxed flex items-start gap-3 text-lg"
              >
                <span className="text-[#0070f3] mt-1 shrink-0">▹</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </FadeIn>
    </section>
  );
};

export default Experiences;
