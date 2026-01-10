import React, { useState } from "react";
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
  return (
    <>
      <div
        className="group relative flex flex-col p-4 md:p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 cursor-pointer h-full"
        onClick={() => setIsOpen(true)}
      >
        {/* Image */}
        <div className="relative w-full h-48 md:h-56 mb-6 overflow-hidden rounded-xl bg-black/20">
            <img 
                src={image} 
                alt={title} 
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
            />
        </div>

        {/* Content */}
        <div className="flex flex-col flex-grow">
            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{title}</h3>
            <p className="text-neutral-400 text-sm leading-relaxed mb-4 line-clamp-3">{description}</p>
            
            <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                    {tags.slice(0, 3).map((tag) => (
                    <div key={tag.id} className="p-2 rounded-lg bg-white/5 border border-white/5">
                        <img src={tag.path} alt={tag.name} className="w-4 h-4" />
                    </div>
                    ))}
                    {tags.length > 3 && (
                        <span className="text-xs text-neutral-500 self-center">+{tags.length - 3}</span>
                    )}
                </div>
                
                <div className="p-2 rounded-full bg-white/5 group-hover:bg-blue-500/20 group-hover:text-blue-400 transition-colors">
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
