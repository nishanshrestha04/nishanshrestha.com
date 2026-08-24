'use client';

import { useState } from 'react';
import { myProjects } from '@/core/constants';
import ProjectDrawer from '@/features/projects/ProjectDrawer';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import FadeIn from '@/core/components/animations/FadeIn';
import StaggerContainer from '@/core/components/animations/StaggerContainer';

const FeaturedProjects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const getProjectData = (id) => myProjects.find((p) => p.id === id) || {};

  const banRakshak = getProjectData('banrakshak');
  const stroke = getProjectData('stroke-prediction');
  const pdfChatbot = getProjectData('pdf-chatbot');

  return (
    <section
      id="projects"
      className="c-space section-spacing border-t border-border-primary"
    >
      <FadeIn className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <h2 className="text-heading mb-0">Selected Projects</h2>
        </div>
        <Link
          href="/projects"
          className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors flex items-center gap-2 group"
        >
          View All Projects
          <ArrowRight
            size={16}
            className="transform group-hover:translate-x-1 transition-transform"
          />
        </Link>
      </FadeIn>

      <div className="flex flex-col gap-8">
        {/* Project 1: Massive Feature */}
        <FadeIn
          y={30}
          duration={1}
          className="w-full bg-bg-secondary border border-border-primary overflow-hidden group"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 md:p-12 flex flex-col h-full justify-between">
              <div>
                <div className="flex items-center gap-4 mb-6 border-b border-border-primary pb-4">
                  <span className="font-mono text-sm tracking-widest uppercase text-text-secondary">
                    {banRakshak.category}
                  </span>
                </div>

                <h3 className="text-3xl md:text-5xl font-bold text-text-primary mb-6 group-hover:text-[#0070f3] transition-colors">
                  {banRakshak.title}
                </h3>
                <p className="text-lg text-text-secondary leading-relaxed max-w-lg mb-8">
                  {banRakshak.description}
                </p>

                <div className="flex flex-wrap gap-3 font-mono text-xs text-text-secondary mb-8">
                  {banRakshak.tags?.map((t) => (
                    <span
                      key={t.name}
                      className="px-3 py-1 bg-bg-primary border border-border-primary "
                    >
                      {t.name}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setSelectedProject(banRakshak)}
                className="self-start text-text-primary hover:text-[#0070f3] font-medium flex items-center gap-2 transition-colors group/btn"
              >
                View Case Study{' '}
                <ArrowRight
                  size={16}
                  className="transform group-hover/btn:translate-x-1 transition-transform"
                />
              </button>
            </div>

            <div className="w-full min-h-[300px] lg:min-h-full bg-bg-primary border-t lg:border-t-0 lg:border-l border-border-primary relative overflow-hidden">
              <img
                src={banRakshak.image}
                alt={banRakshak.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </FadeIn>

        {/* Bento Grid for other featured projects */}
        <StaggerContainer
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          stagger={0.15}
        >
          {/* Project 2 */}
          <div className="w-full bg-bg-secondary border border-border-primary overflow-hidden flex flex-col group">
            <div className="w-full aspect-[4/3] bg-bg-primary border-b border-border-primary relative overflow-hidden">
              <img
                src={stroke.image}
                alt={stroke.title}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
              />
            </div>
            <div className="p-8 flex flex-col flex-1">
              <span className="font-mono text-sm tracking-widest uppercase text-text-secondary mb-3">
                {stroke.category}
              </span>
              <h3 className="text-2xl font-bold text-text-primary mb-4 group-hover:text-[#0070f3] transition-colors">
                {stroke.title}
              </h3>
              <p className="text-text-secondary leading-relaxed mb-6 flex-1">
                {stroke.description}
              </p>

              <button
                onClick={() => setSelectedProject(stroke)}
                className="self-start text-text-primary hover:text-[#0070f3] font-medium flex items-center gap-2 transition-colors group/btn"
              >
                View Case Study{' '}
                <ArrowRight
                  size={16}
                  className="transform group-hover/btn:translate-x-1 transition-transform"
                />
              </button>
            </div>
          </div>

          {/* Project 3 */}
          <div className="w-full bg-bg-secondary border border-border-primary overflow-hidden flex flex-col group">
            <div className="w-full aspect-video bg-bg-primary border-b border-border-primary relative overflow-hidden">
              <img
                src={pdfChatbot.image}
                alt={pdfChatbot.title}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
              />
            </div>
            <div className="p-8 flex flex-col flex-1">
              <span className="font-mono text-sm tracking-widest uppercase text-text-secondary mb-3">
                {pdfChatbot.category}
              </span>
              <h3 className="text-2xl font-bold text-text-primary mb-4 group-hover:text-[#0070f3] transition-colors">
                {pdfChatbot.title}
              </h3>
              <p className="text-text-secondary leading-relaxed mb-6 flex-1">
                {pdfChatbot.description}
              </p>

              <button
                onClick={() => setSelectedProject(pdfChatbot)}
                className="self-start text-text-primary hover:text-[#0070f3] font-medium flex items-center gap-2 transition-colors group/btn"
              >
                View Case Study{' '}
                <ArrowRight
                  size={16}
                  className="transform group-hover/btn:translate-x-1 transition-transform"
                />
              </button>
            </div>
          </div>
        </StaggerContainer>
      </div>

      <ProjectDrawer
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        onNavigate={setSelectedProject}
      />
    </section>
  );
};

export default FeaturedProjects;
