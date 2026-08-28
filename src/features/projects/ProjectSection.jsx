'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/core/utils/apiClient';
import ProjectDrawer from '@/features/projects/ProjectDrawer';
import { ArrowRight } from 'lucide-react';
import FadeIn from '@/core/components/animations/FadeIn';
import StaggerContainer from '@/core/components/animations/StaggerContainer';
import ScaleUp from '@/core/components/animations/ScaleUp';
import RevealLeft from '@/core/components/animations/RevealLeft';

const categories = [
  'ALL',
  'AI / Audio ML',
  'GenAI / RAG',
  'Full Stack',
  'Backend',
  'MLOps / Data',
  'AI / Vision',
];

const Project = () => {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [selectedProject, setSelectedProject] = useState(null);

  const { data: myProjects = [], isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: () => apiClient('/api/projects'),
  });

  const filteredProjects = myProjects.filter((project) => {
    if (activeCategory === 'ALL') return true;
    return project.category === activeCategory;
  });

  const featuredProject =
    filteredProjects.length > 0 ? filteredProjects[0] : null;
  const remainingProjects = filteredProjects.slice(1);

  if (isLoading) {
    return (
      <section className="c-space section-spacing pt-40 min-h-screen flex items-center justify-center">
        <div className="font-mono text-text-secondary animate-pulse">LOADING_PROJECTS...</div>
      </section>
    );
  }

  return (
    <section className="c-space section-spacing pt-40 min-h-screen">
      <RevealLeft className="mb-20">
        <h1 className="text-hero mb-6">Selected Projects</h1>
        <p className="subtext">
          A collection of AI systems, software products, and engineering
          projects I've built.
        </p>
      </RevealLeft>

      {/* Massive Filter */}
      <RevealLeft
        delay={0.2}
        x={-20}
        className="flex flex-wrap items-center gap-6 mb-24 border-b border-border-primary pb-8"
      >
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`text-lg md:text-xl font-bold tracking-tight transition-colors ${
              activeCategory === category
                ? 'text-text-primary'
                : 'text-gray-600 hover:text-text-secondary'
            }`}
          >
            [{category}]
          </button>
        ))}
      </RevealLeft>

      {/* Filter Results Container */}
      <div key={activeCategory}>
        {/* Large Featured Project */}
        {featuredProject && (
          <ScaleUp delay={0.4} scale={0.95} className="mb-32">
            <div
              className="w-full aspect-[21/9] md:aspect-[21/7] bg-bg-secondary border border-border-primary overflow-hidden mb-8 group cursor-pointer"
              onClick={() => setSelectedProject(featuredProject)}
            >
              {(featuredProject.image || featuredProject.imageUrl) &&
              !(featuredProject.image || featuredProject.imageUrl).includes('code-placeholder') ? (
                <img
                  src={featuredProject.imageUrl || featuredProject.image}
                  alt={featuredProject.title}
                  className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-700"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center font-mono text-text-secondary">
                  {featuredProject.title.toUpperCase()}_VISUAL
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              <div className="md:col-span-3">
                <span className="text-4xl font-bold text-[#27272a]">01</span>
                <p className="font-mono text-sm tracking-widest text-text-secondary mt-2">
                  — {featuredProject.category}
                </p>
              </div>

              <div className="md:col-span-6">
                <h3 className="text-3xl md:text-5xl font-bold text-text-primary mb-6">
                  {featuredProject.title}
                </h3>
                <p className="text-lg text-text-secondary leading-relaxed">
                  {featuredProject.description}
                </p>
              </div>

              <div className="md:col-span-3 flex flex-col gap-6 md:items-end md:text-right">
                <div className="flex flex-wrap md:justify-end gap-2 font-mono text-xs text-text-secondary">
                  {featuredProject.tags?.map((t) => (
                    <span key={t.name}>{t.name}</span>
                  ))}
                </div>
                <button
                  onClick={() => setSelectedProject(featuredProject)}
                  className="text-text-primary hover:text-[#0070f3] font-medium flex items-center md:justify-end gap-2 transition-colors group/btn"
                >
                  View Case Study{' '}
                  <ArrowRight
                    size={16}
                    className="transform group-hover/btn:translate-x-1 transition-transform"
                  />
                </button>
              </div>
            </div>
          </ScaleUp>
        )}

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          {remainingProjects.map((project, idx) => (
            <FadeIn
              key={project.id}
              className="group flex flex-col"
              delay={idx % 2 === 0 ? 0 : 0.1}
            >
              <div
                className="w-full aspect-video bg-bg-secondary border border-border-primary overflow-hidden mb-6 cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                {(project.image || project.imageUrl) &&
                !(project.image || project.imageUrl).includes('code-placeholder') ? (
                  <img
                    src={project.imageUrl || project.image}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-mono text-text-secondary text-sm">
                    PREVIEW_{project.title.replace(/\s+/g, '_').toUpperCase()}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4 mb-4">
                <span className="text-2xl font-bold text-[#27272a]">
                  {(idx + 2).toString().padStart(2, '0')}
                </span>
                <span className="font-mono text-xs tracking-widest text-text-secondary uppercase">
                  {project.category}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-text-primary mb-3 group-hover:text-[#0070f3] transition-colors">
                {project.title}
              </h3>
              <p className="text-text-secondary mb-6 flex-1 leading-relaxed">
                {project.description}
              </p>

              <div className="flex justify-between items-center mt-auto border-t border-border-primary pt-6">
                <div className="flex gap-2 font-mono text-xs text-gray-600">
                  {project.tags?.slice(0, 3).map((t) => (
                    <span key={t.name}>{t.name}</span>
                  ))}
                </div>
                <button
                  onClick={() => setSelectedProject(project)}
                  className="text-sm font-medium text-text-primary hover:text-[#0070f3] flex items-center gap-2 transition-colors group/btn"
                >
                  View{' '}
                  <ArrowRight
                    size={14}
                    className="transform group-hover/btn:translate-x-1 transition-transform"
                  />
                </button>
              </div>
            </FadeIn>
          ))}
        </div>
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

export default Project;
