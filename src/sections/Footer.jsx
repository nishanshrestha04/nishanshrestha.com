import { mySocials } from "../constants";
import { twMerge } from "tailwind-merge";

const Footer = ({ className }) => {
  const currentYear = new Date().getFullYear();
  
  return (
    <section className={twMerge("c-space pb-6 pt-5 md:pb-4 md:pt-4 border-t border-neutral-800/50", className)}>
      {/* Footer Content */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 md:gap-4 text-neutral-400">
        {/* Name */}
        <div className="flex gap-2 text-sm justify-center md:justify-start order-2 md:order-1">
          <p>Nishan</p>
          <p>|</p>
          <p>Shrestha</p>
        </div>
        
        {/* Social Icons - centered and larger on mobile */}
        <div className="flex gap-5 justify-center order-1 md:order-2">
          {mySocials.map((social, index) => (
            <a 
              href={social.href} 
              key={index}
              className="hover:opacity-70 transition-opacity"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img 
                src={social.icon} 
                className="w-6 h-6 md:w-5 md:h-5" 
                alt={social.name} 
              />
            </a>
          ))}
        </div>
        
        {/* Copyright - shorter on mobile */}
        <p className="text-xs md:text-sm text-center md:text-right order-3">
          <span className="md:hidden">© {currentYear} Nishan Shrestha</span>
          <span className="hidden md:inline">© {currentYear} Nishan Shrestha. All rights reserved.</span>
        </p>
      </div>
    </section>
  );
};

export default Footer;
