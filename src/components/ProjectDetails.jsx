import { createPortal } from "react-dom";
import { motion } from "motion/react";
import { useEffect } from "react";

const ProjectDetails = ({
  title,
  description,
  subDescription,
  image,
  tags,
  href,
  closeModal,
}) => {
  // Lock body scroll when modal is open and hide navbar
  useEffect(() => {
    // Get current scroll position
    const scrollY = window.scrollY;
    
    // Lock scroll with position fixed
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';
    
    // Dispatch event to hide navbar with slight delay to ensure listeners are ready
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('hideNavbar'));
    }, 10);
    
    return () => {
      // Restore scroll
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      window.scrollTo(0, scrollY);
      
      // Show navbar again
      window.dispatchEvent(new CustomEvent('showNavbar'));
    };
  }, []);

  return createPortal(
    <div 
      className="fixed inset-0 z-[60] flex items-center justify-center w-full h-full overflow-auto bg-black/70 backdrop-blur-md p-4"
      onClick={closeModal}
    >
      <motion.div
        className="relative max-w-3xl w-full max-h-[90vh] shadow-2xl rounded-2xl bg-gradient-to-br from-midnight via-navy to-midnight border border-white/20 overflow-hidden"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute z-10 p-2 rounded-full top-4 right-4 bg-black/50 backdrop-blur-sm border border-white/20 hover:bg-black/70 transition-all group"
        >
          <img src="assets/close.svg" className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
        </button>

        {/* Scrollable Content */}
        <div className="overflow-auto max-h-[90vh]">
          {/* Project Image */}
          <div className="relative">
            <img src={image} alt={title} className="w-full max-h-[40vh] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 to-transparent" />
          </div>

          {/* Content Section */}
          <div className="p-6 md:p-8">
            {/* Title */}
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{title}</h2>
            
            {/* Description */}
            <p className="text-neutral-300 text-base md:text-lg leading-relaxed mb-4">{description}</p>
            
            {/* Detailed Description */}
            <div className="space-y-3 mb-6">
              {subDescription.map((subDesc, index) => (
                <div key={index} className="flex gap-3">
                  <span className="text-indigo text-lg mt-1">•</span>
                  <p className="text-neutral-400 text-sm md:text-base leading-relaxed">{subDesc}</p>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8" />

            {/* Tech Stack Section */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent mb-4">
                Built with
              </h3>
              <div className="flex flex-wrap gap-3">
                {tags.map((tag) => (
                  <div
                    key={tag.id}
                    className="flex items-center justify-center md:justify-start gap-2 px-3 md:px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:bg-white/10 hover:scale-105 transition-all cursor-default"
                  >
                    <img src={tag.path} alt={tag.name} className="w-5 h-5 flex-shrink-0" />
                    <span className="hidden md:inline text-sm text-neutral-300 truncate">{tag.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* View Project Button - Centered */}
            <div className="flex justify-center">
              <a 
                href={href} 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white font-medium hover:bg-white/20 hover:gap-3 transition-all group shadow-lg hover:shadow-xl"
              >
                View on GitHub
                <img src="assets/arrow-up.svg" className="w-4 h-4 group-hover:translate-y-[-2px] transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>,
    document.body
  );
};

export default ProjectDetails;
