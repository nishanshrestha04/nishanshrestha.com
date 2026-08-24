import FadeIn from '@/core/components/animations/FadeIn';
import StaggerContainer from '@/core/components/animations/StaggerContainer';

const WhatIBuild = () => {
  return (
    <section
      className="c-space section-spacing border-t border-border-primary"
      id="what-i-build"
    >
      <FadeIn className="mb-16">
        <h2 className="text-heading mb-4">What I Build</h2>
        <p className="text-text-secondary text-lg md:text-xl max-w-2xl font-light">
          Engineering capabilities spanning from ML models to full-stack
          applications.
        </p>
      </FadeIn>

      <StaggerContainer
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        stagger={0.15}
      >
        {/* AI / ML */}
        <div className="bg-bg-secondary border border-border-primary p-8 md:p-12">
          <span className="font-mono text-xs tracking-widest text-text-secondary uppercase mb-4 block">
            01
          </span>
          <h3 className="text-2xl font-bold text-text-primary tracking-tight mb-4">
            AI / ML Systems
          </h3>
          <p className="text-text-secondary leading-relaxed">
            Machine learning systems, computer vision pipelines, predictive
            models, and intelligent applications built to solve complex domain
            problems.
          </p>
        </div>

        {/* GenAI */}
        <div className="bg-bg-secondary border border-border-primary p-8 md:p-12">
          <span className="font-mono text-xs tracking-widest text-[#0070f3] uppercase mb-4 block">
            02
          </span>
          <h3 className="text-2xl font-bold text-text-primary tracking-tight mb-4">
            Generative AI
          </h3>
          <p className="text-text-secondary leading-relaxed">
            LLM applications, sophisticated RAG architectures, embeddings, and
            agentic workflows that augment human capability.
          </p>
        </div>

        {/* Full Stack */}
        <div className="bg-bg-secondary border border-border-primary p-8 md:p-12">
          <span className="font-mono text-xs tracking-widest text-text-secondary uppercase mb-4 block">
            03
          </span>
          <h3 className="text-2xl font-bold text-text-primary tracking-tight mb-4">
            Modern Full Stack
          </h3>
          <p className="text-text-secondary leading-relaxed">
            Responsive frontend interfaces, robust state management,
            authentication, and highly polished user experiences.
          </p>
        </div>

        {/* Backend & Infra */}
        <div className="bg-bg-secondary border border-border-primary p-8 md:p-12">
          <span className="font-mono text-xs tracking-widest text-text-secondary uppercase mb-4 block">
            04
          </span>
          <h3 className="text-2xl font-bold text-text-primary tracking-tight mb-4">
            Backend & Infra
          </h3>
          <p className="text-text-secondary leading-relaxed">
            Scalable REST APIs, relational and vector databases, background
            jobs, Docker orchestration, and automated CI/CD pipelines.
          </p>
        </div>
      </StaggerContainer>
    </section>
  );
};

export default WhatIBuild;
