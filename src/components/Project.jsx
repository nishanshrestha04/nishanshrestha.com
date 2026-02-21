import React, { useState, useRef } from "react";
import ProjectDetails from "./ProjectDetails";

const Project = ({
  title,
  description,
  subDescription,
  href,
  image,
  tags,
  setPreview,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <>
      <div
        ref={cardRef}
        className="group relative flex flex-col p-4 md:p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/[0.08] transition-all duration-300 hover:-translate-y-2 cursor-pointer h-full overflow-hidden"
        onClick={() => setIsOpen(true)}
        onMouseMove={handleMouseMove}
      >
        {/* Spotlight hover effect */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
          style={{
            background: 'radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(129,140,248,0.1), transparent 60%)',
          }}
        />

        {/* Gradient border shine on hover */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(129,140,248,0.15), transparent 40%, transparent 60%, rgba(244,114,182,0.15))',
          }}
        />

        {/* Image */}
        <div className="relative w-full h-48 md:h-56 mb-6 overflow-hidden rounded-xl bg-black/20">
            <img 
                src={image} 
                alt={title} 
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
              <span className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2">
                View Project
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </span>
            </div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col flex-grow">
            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors duration-300">{title}</h3>
            <p className="text-neutral-400 text-sm leading-relaxed mb-4 line-clamp-3">{description}</p>
            
            <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                    {tags.slice(0, 3).map((tag) => (
                    <div key={tag.id} className="p-2 rounded-lg bg-white/5 border border-white/5 group-hover:border-white/10 group-hover:bg-white/10 transition-all duration-300">
                        <img src={tag.path} alt={tag.name} className="w-4 h-4" />
                    </div>
                    ))}
                    {tags.length > 3 && (
                        <span className="text-xs text-neutral-500 self-center">+{tags.length - 3}</span>
                    )}
                </div>
                
                <div className="p-2 rounded-full bg-white/5 group-hover:bg-indigo-500/20 group-hover:text-indigo-400 transition-all duration-300 group-hover:scale-110">
                    <img src="assets/arrow-up.svg" className="w-4 h-4 rotate-45" />
                </div>
            </div>
        </div>
      </div>

      {isOpen && (
        <ProjectDetails
          title={title}
          description={description}
          subDescription={subDescription}
          image={image}
          tags={tags}
          href={href}
          closeModal={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Project;
