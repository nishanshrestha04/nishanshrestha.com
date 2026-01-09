import { NavLink } from "react-router-dom";

const AboutSummary = () => {
  return (
      <section className="c-space section-spacing scroll-mt-20" id="about-summary">
        <h2 className="text-heading">About Me</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-6 mt-12">
          {/* Intro Card */}
          <div className="md:col-span-4 relative overflow-hidden h-[20rem] md:h-[25rem] rounded-2xl p-8 bg-gradient-to-b from-storm to-indigo hover:-translate-y-1 duration-200">
            <img
                src="assets/coding-pov.png"
                className="absolute scale-[1.75] -right-[5rem] -top-[1rem] md:scale-[2.5] md:-right-10 md:-top-10 opacity-50 md:opacity-100"
            />
            <div className="relative z-10 flex flex-col justify-between h-full">
              <div>
                <p className="headtext text-3xl">Hi, I'm Nishan Shrestha</p>
                <p className="subtext mt-4 text-lg max-w-md">
                  I'm an AI/ML enthusiast and passionate developer, driven to turn data into decisions and ideas into impactful applications.
                </p>
              </div>
              
              <NavLink 
                to="/about"
                className="inline-flex items-center gap-2 text-white font-medium hover:gap-3 transition-all mt-6 w-fit"
              >
                More About Me
                <img src="assets/arrow-right.svg" className="w-5 h-5" />
              </NavLink>
            </div>
          </div>

          {/* Tech Stack Teaser */}
          <div className="md:col-span-2 relative overflow-hidden h-[20rem] md:h-[25rem] rounded-2xl p-8 bg-gradient-to-tl from-[#3A3A3A] via-[#242424] to-[#3A3A3A] hover:-translate-y-1 duration-200 flex flex-col justify-center items-center text-center">
             <p className="text-5xl font-bold text-neutral-600 mb-4">AI & Web</p>
             <p className="subtext">
                Specializing in Python, React, TensorFlow, and Modern Web Technologies.
             </p>
          </div>
        </div>
      </section>
  );
};

export default AboutSummary;
