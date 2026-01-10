import { NavLink } from "react-router-dom";

const AboutSummary = () => {
  return (
      <section className="c-space section-spacing scroll-mt-20" id="about-summary">
        <h2 className="text-heading">About Me</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-6 mt-12">
          {/* Intro Card */}
          <div className="md:col-span-4 relative overflow-hidden h-[22rem] md:h-[25rem] rounded-2xl p-6 md:p-8 bg-gradient-to-b from-storm to-indigo hover:-translate-y-1 duration-200">
            {/* Background image with reduced opacity */}
            <img
                src="assets/coding-pov.png"
                className="absolute scale-[1.75] -right-[5rem] -top-[1rem] md:scale-[2.5] md:-right-10 md:-top-10 opacity-40 md:opacity-30"
            />
            
            {/* Content with better contrast */}
            <div className="relative z-10 flex flex-col justify-between h-full">
              <div className="bg-black/40 backdrop-blur-sm p-4 md:p-6 rounded-xl">
                <p className="text-3xl md:text-5xl font-bold text-white leading-tight">Hi, I'm Nishan Shrestha</p>
                <p className="text-neutral-200 mt-3 md:mt-4 text-sm md:text-lg max-w-lg leading-relaxed">
                  I'm an AI/ML enthusiast and passionate developer, driven to turn data into decisions and ideas into impactful applications.
                </p>
              </div>
              
              {/* Enhanced CTA Button */}
              <NavLink 
                to="/about"
                className="inline-flex items-center gap-2 px-5 py-2.5 md:px-6 md:py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-sm md:text-base font-medium hover:bg-white/20 hover:gap-3 transition-all w-fit group"
              >
                More About Me
                <img src="assets/arrow-right.svg" className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
              </NavLink>
            </div>
          </div>

          {/* Tech Stack Teaser */}
          <div className="md:col-span-2 relative overflow-hidden h-[18rem] md:h-[25rem] rounded-2xl p-6 md:p-8 bg-gradient-to-br from-[#2A2A2A] via-[#1f1f1f] to-[#2A2A2A] hover:-translate-y-1 duration-200 flex flex-col justify-center items-center text-center border border-white/5">
            {/* Gradient accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo/20 to-transparent blur-3xl" />
            
            <div className="relative z-10">
              <p className="text-5xl md:text-7xl font-bold text-neutral-300 mb-3 md:mb-4" style={{ textShadow: '0 0 40px rgba(255,255,255,0.1)' }}>
                AI & Web
              </p>
              <p className="text-neutral-400 text-xs md:text-base max-w-[200px] md:max-w-[220px] mx-auto leading-relaxed">
                Specializing in Python, React, Next, and Modern Web Technologies
              </p>
            </div>
          </div>
        </div>
      </section>
  );
};

export default AboutSummary;
