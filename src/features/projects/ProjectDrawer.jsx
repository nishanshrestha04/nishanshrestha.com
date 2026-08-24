'use client';

import { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { myProjects } from '@/core/constants';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const ProjectDrawer = ({ project, isOpen, onClose, onNavigate }) => {
  const [mounted, setMounted] = useState(false);
  const drawerRef = useRef(null);
  const backdropRef = useRef(null);
  const leftPaneRef = useRef(null);

  useEffect(() => {
    if (drawerRef.current) {
      drawerRef.current.scrollTop = 0;
    }
  }, [project]);

  useEffect(() => {
    setMounted(true);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    const handlePopState = () => {
      if (isOpen) onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      // Push history state to intercept mobile back button
      window.history.pushState({ modal: 'ProjectDrawer' }, '');
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('popstate', handlePopState);

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('popstate', handlePopState);

      // Cleanup the dummy history state if closed via UI (not back button)
      if (isOpen && window.history.state?.modal === 'ProjectDrawer') {
        window.history.back();
      }
    };
  }, [isOpen, onClose]);

  useGSAP(() => {
    if (isOpen && mounted && drawerRef.current) {
      gsap.from(drawerRef.current, {
        x: '100%',
        duration: 0.5,
        ease: 'power3.out',
      });

      if (backdropRef.current) {
        gsap.from(backdropRef.current, { opacity: 0, duration: 0.4 });
      }

      if (leftPaneRef.current) {
        gsap.from(leftPaneRef.current, {
          opacity: 0,
          duration: 0.6,
          delay: 0.1,
        });
      }
    }
  }, [isOpen, mounted, project?.id]);

  if (!mounted || !isOpen || !project) return null;

  const currentIndex = myProjects.findIndex((p) => p.id === project.id);
  const prevProject = currentIndex > 0 ? myProjects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < myProjects.length - 1 ? myProjects[currentIndex + 1] : null;

  const drawerContent = (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Mobile Backdrop */}
      <div
        ref={backdropRef}
        className="absolute inset-0 bg-bg-primary/60 backdrop-blur-sm md:hidden"
        onClick={onClose}
      />

      {/* Desktop Left Split Pane */}
      <div
        ref={leftPaneRef}
        className="hidden md:flex absolute inset-0 right-[600px] lg:right-[700px] bg-bg-primary flex-col items-center justify-center"
      >
        {project.liveUrl ? (
          <div className="w-full h-full flex flex-col">
            <div className="h-12 bg-bg-secondary border-b border-border-primary flex items-center px-6 gap-3 z-10">
              <div className="w-3 h-3 bg-red-500" />
              <div className="w-3 h-3 bg-yellow-500" />
              <div className="w-3 h-3 bg-green-500" />
              <div className="ml-4 bg-bg-primary border border-border-primary px-4 py-1 text-xs font-mono text-text-secondary flex-1 max-w-xl truncate">
                {project.liveUrl}
              </div>
            </div>
            <iframe
              src={project.liveUrl}
              title={`${project.title} live preview`}
              className="w-full flex-1 border-none bg-white"
            />
          </div>
        ) : (
          <div className="w-full max-w-5xl p-8 lg:p-16 h-full flex flex-col justify-center">
            <div className="w-full aspect-video overflow-hidden shadow-2xl border border-border-primary bg-bg-primary">
              <div className="w-full h-full">
                {project.image &&
                !project.image.includes('code-placeholder') ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-mono text-text-secondary text-sm">
                    PREVIEW_NOT_AVAILABLE
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Drawer */}
      <div
        ref={drawerRef}
        className="relative w-full md:w-[600px] lg:w-[700px] h-full bg-bg-primary border-l border-border-primary shadow-2xl overflow-y-auto transform flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 bg-bg-secondary border border-border-primary text-text-secondary hover:text-text-primary transition-colors z-20"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div className="p-8 md:p-12 pb-24 flex-1">
          <span className="font-mono text-sm tracking-widest text-[#0070f3] uppercase block mb-4">
            {project.category}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-8">
            {project.title}
          </h2>

          {/* Visual Area inside Drawer */}
          <div
            className={`w-full overflow-hidden mb-12 shadow-xl border border-border-primary ${!project.liveUrl ? 'md:hidden' : ''}`}
          >
            {project.liveUrl ? (
              <>
                {/* Mobile: Iframe */}
                <div className="w-full h-[400px] bg-bg-primary relative md:hidden">
                  <div className="absolute top-0 left-0 right-0 h-8 bg-bg-secondary border-b border-border-primary flex items-center px-4 gap-2 -xl z-10">
                    <div className="w-2.5 h-2.5 bg-red-500/50" />
                    <div className="w-2.5 h-2.5 bg-yellow-500/50" />
                    <div className="w-2.5 h-2.5 bg-green-500/50" />
                  </div>
                  <iframe
                    src={project.liveUrl}
                    title={`${project.title} live preview`}
                    className="w-full h-full pt-8 border-none"
                    loading="lazy"
                  />
                </div>
                {/* Desktop: Static Image */}
                <div className="hidden md:block w-full max-h-[400px]">
                  {project.image &&
                  !project.image.includes('code-placeholder') ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-64 bg-bg-secondary flex items-center justify-center font-mono text-text-secondary text-sm">
                      NO_SCREENSHOT_AVAILABLE
                    </div>
                  )}
                </div>
              </>
            ) : (
              /* No live URL: Mobile shows image (desktop hidden as it's on left pane) */
              <div className="w-full max-h-[400px]">
                {project.image &&
                !project.image.includes('code-placeholder') ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-64 bg-bg-secondary flex items-center justify-center font-mono text-text-secondary text-sm">
                    PREVIEW_NOT_AVAILABLE
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-10">
            {/* Overview */}
            <section>
              <h3 className="text-xl font-bold text-text-primary mb-4">
                Overview
              </h3>
              <p className="text-text-secondary leading-relaxed text-lg">
                {project.overview}
              </p>
            </section>

            {/* Problem & Approach */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <section>
                <h3 className="text-lg font-bold text-text-primary mb-3">
                  The Problem
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {project.problem}
                </p>
              </section>
              <section>
                <h3 className="text-lg font-bold text-text-primary mb-3">
                  The Approach
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {project.approach}
                </p>
              </section>
            </div>

            {/* Architecture Pipeline */}
            {project.architecture && project.architecture.length > 0 && (
              <section className="bg-bg-secondary border border-border-primary p-6 md:p-8">
                <h3 className="text-lg font-bold text-text-primary mb-6">
                  Architecture
                </h3>
                <div className="relative pl-6 py-2">
                  {/* Continuous flowing line */}
                  <div className="absolute top-4 bottom-4 left-[9px] w-[2px] bg-[#27272a] overflow-hidden ">
                    <div className="w-full h-1/2 bg-gradient-to-b from-transparent via-[#0070f3] to-transparent animate-[flow-down_3s_ease-in-out_infinite]" />
                  </div>

                  {project.architecture.map((step, idx) => (
                    <div key={idx} className="relative mb-6 last:mb-0">
                      {/* Glowing Node Dot */}
                      <div className="absolute top-3 left-[-19px] w-2.5 h-2.5 bg-bg-primary border border-[#0070f3] shadow-[0_0_8px_rgba(0,112,243,0.5)] z-10" />

                      {/* Step Box */}
                      <div className="font-mono text-sm text-text-secondary bg-bg-primary border border-border-primary p-4 group relative overflow-hidden">
                        {/* Sweeping background effect delayed by index */}
                        <div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-[#0070f3]/10 to-transparent -translate-x-full animate-[sweep_3s_ease-in-out_infinite]"
                          style={{ animationDelay: `${idx * 0.4}s` }}
                        />
                        <span className="relative z-10 text-[#0070f3] mr-3 font-bold">
                          {(idx + 1).toString().padStart(2, '0')}
                        </span>
                        <span className="relative z-10">{step}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Tech Stack */}
            <section>
              <h3 className="text-xl font-bold text-text-primary mb-4">
                Technology Stack
              </h3>
              <div className="flex flex-wrap gap-3">
                {project.technologies?.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 bg-bg-secondary border border-border-primary text-text-secondary text-sm font-mono "
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* Sticky Action Footer */}
        <div className="mt-auto sticky bottom-0 left-0 w-full bg-bg-primary border-t border-border-primary p-4 md:p-6 md:px-12 flex flex-col gap-4 z-50">
          <div className="flex gap-3 items-center w-full">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex justify-center items-center gap-2 bg-[var(--text-primary)] text-[var(--bg-primary)] px-4 py-2.5 text-sm md:text-base font-semibold hover:opacity-80 transition-opacity "
              >
                Open Site <ExternalLink size={16} />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex justify-center items-center gap-2 border border-border-primary text-text-primary px-4 py-2.5 text-sm md:text-base font-semibold hover:bg-bg-secondary transition-colors "
              >
                GitHub{' '}
                <img
                  src="/assets/socials/github.svg"
                  alt="GitHub"
                  className="w-4 h-4"
                />
              </a>
            )}
            {!project.liveUrl && (
              <span className="text-xs font-mono text-text-secondary mx-auto">
                [ NOT DEPLOYED ]
              </span>
            )}
          </div>

          {/* Navigation Controls */}
          {onNavigate && (
            <div className="flex items-center justify-between border-t border-border-primary pt-3 md:pt-4">
              <button
                onClick={() => prevProject && onNavigate(prevProject)}
                disabled={!prevProject}
                className={`flex items-center gap-1 md:gap-2 text-xs md:text-sm font-mono transition-colors ${prevProject ? 'text-text-secondary hover:text-text-primary' : 'text-gray-700 cursor-not-allowed'}`}
              >
                <ChevronLeft size={16} className="md:hidden" />
                <ChevronLeft size={18} className="hidden md:block" />
                <span className="hidden sm:inline">Prev Project</span>
                <span className="sm:hidden">Prev</span>
              </button>

              <div className="text-xs font-mono text-gray-600">
                {String(currentIndex + 1).padStart(2, '0')} /{' '}
                {String(myProjects.length).padStart(2, '0')}
              </div>

              <button
                onClick={() => nextProject && onNavigate(nextProject)}
                disabled={!nextProject}
                className={`flex items-center gap-1 md:gap-2 text-xs md:text-sm font-mono transition-colors ${nextProject ? 'text-text-secondary hover:text-text-primary' : 'text-gray-700 cursor-not-allowed'}`}
              >
                <span className="hidden sm:inline">Next Project</span>
                <span className="sm:hidden">Next</span>
                <ChevronRight size={16} className="md:hidden" />
                <ChevronRight size={18} className="hidden md:block" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(drawerContent, document.body);
};

export default ProjectDrawer;
