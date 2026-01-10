import React, { useState } from "react";
import ProjectDetails from "./ProjectDetails";

const ProjectCard = ({
  title,
  description,
  subDescription,
  href,
  image,
  tags,
}) => {
  const [isHidden, setIsHidden] = useState(false);

  return (
    <>
      <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-storm/50 to-indigo/50 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-[1.01]">
        {/* Layout: Side by side on desktop, stacked on mobile */}
        <div className="flex flex-col md:flex-row">
          {/* Project Image */}
          <div className="md:w-2/5 aspect-video md:aspect-auto overflow-hidden">
            <img 
              src={image} 
              alt={title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
            />
          </div>
          
          {/* Content */}
          <div className="p-5 md:p-8 md:w-3/5 flex flex-col justify-between">
            <div>
              {/* Title */}
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">{title}</h3>
              
              {/* Description */}
              <p className="text-neutral-300 mb-4 md:mb-6 leading-relaxed line-clamp-2 md:line-clamp-3">{description}</p>
              
              {/* Tech Stack Badges */}
              <div className="flex flex-wrap gap-2.5 mb-6">
                {tags.map(tag => (
                  <div 
                    key={tag.id}
                    className="flex items-center justify-center md:justify-start gap-2 p-2.5 md:px-3 md:py-1.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl md:rounded-full hover:bg-white/10 hover:scale-105 transition-all"
                  >
                    <img src={tag.path} alt={tag.name} className="w-5 h-5 md:w-4 md:h-4 flex-shrink-0" />
                    <span className="hidden md:inline text-sm text-neutral-400">{tag.name}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* CTA Button */}
            <div className="flex justify-center md:justify-start">
              <button 
                onClick={() => setIsHidden(true)}
                className="inline-flex items-center gap-2 px-6 py-3 md:px-6 md:py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-sm md:text-base hover:bg-white/20 hover:gap-3 transition-all group/btn shadow-md hover:shadow-lg"
              >
                View Details
                <img src="assets/arrow-right.svg" alt="arrow" className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {isHidden && (
        <ProjectDetails
          title={title}
          description={description}
          subDescription={subDescription}
          image={image}
          tags={tags}
          href={href}
          closeModal={() => setIsHidden(false)}
        />
      )}
    </>
  );
};

export default ProjectCard;
