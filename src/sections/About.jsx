import { useRef } from "react";
import { Globe } from "../components/globe";
import CopyEmailButton from "../components/CopyEmailButton";
import Card from "../components/Card";
import { Frameworks } from "../components/Frameworks";
import { mySocials } from "../constants";
import DayInLife from "../components/DayInLife";
import { motion } from "motion/react";
import { 
  SiReact, 
  SiNodedotjs, 
  SiTailwindcss, 
  SiNextdotjs, 
  SiTensorflow, 
  SiPython, 
  SiJupyter, 
  SiDocker, 
  SiPandas, 
  SiNumpy, 
  SiDjango,
  SiLangchain
} from "react-icons/si";
import { GiBearFace } from "react-icons/gi"; // For Zustand (Bear)
import { TbBrandNextjs } from "react-icons/tb"; // Alternative for Next.js if needed


const About = () => {
  const grid2Container = useRef();
  
  return (
      <section className="c-space section-spacing scroll-mt-28" id="about">
        <div className="h-5 md:h-0" /> {/* Mobile Spacer */}

        {/* Heading with accent line — animates on page open */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          <h2 className="text-heading">About Me</h2>
          <motion.div
            className="h-[2px] w-20 mt-3 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: 'left' }}
          />
        </motion.div>
        
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[18rem]">
          
          {/* Grid 1: Intro */}
          <motion.div 
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-end grid-default-color grid-1 group"
          >
            <img
                src="assets/coding-pov.png"
                alt="Nishan Shrestha Coding Setup"
                className="absolute scale-[1.75] -right-[5rem] -top-[1rem] md:scale-[3] md:left-50 md:inset-y-10 lg:scale-[2.5] group-hover:scale-[1.8] md:group-hover:scale-[3.1] transition-transform duration-500"
            />
            <div className="z-10">
              <p className="headtext">Hi, I'm Nishan Shrestha</p>
              <p className="subtext">
                I'm an AI/ML enthusiast and passionate developer, driven to turn data into decisions and ideas into impactful applications.
              </p>
            </div>
            <div className="absolute inset-x-0 pointer-events-none -bottom-4 h-1/2 sm:h-1/3 bg-gradient-to-t from-indigo" />
          </motion.div>

          {/* Grid 2: Floating Cards */}
          <motion.div 
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="grid-default-color grid-2"
          >
            <div
                ref={grid2Container}
                className="flex items-start justify-center w-full h-full relative overflow-hidden pt-6 md:pt-0 md:items-center"
            >
              <p className="text-2xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 text-center px-4 z-0 opacity-50">
                LEARNING AI & <br /> Web Development
              </p>
              
              {/* Web Development - Distributed around the bottom/sides */}
              <Card
                  style={{ rotate: "15deg", top: "35%", left: "10%" }}
                  icon={() => <SiReact className="w-6 h-6 sm:w-10 sm:h-10 text-[#61DAFB]" />}
                  alt="React"
                  containerRef={grid2Container}
              />
              <Card
                  style={{ rotate: "-10deg", top: "35%", left: "80%" }}
                  icon={() => <TbBrandNextjs className="w-6 h-6 sm:w-10 sm:h-10 text-white" />}
                  alt="Next.js"
                  containerRef={grid2Container}
              />
              <Card
                  style={{ rotate: "20deg", top: "50%", left: "5%" }}
                  icon={() => <SiTailwindcss className="w-6 h-6 sm:w-10 sm:h-10 text-[#38B2AC]" />}
                  alt="Tailwind CSS"
                  containerRef={grid2Container}
              />
              <Card
                  style={{ rotate: "-5deg", top: "65%", left: "20%" }}
                  icon={() => <SiNodedotjs className="w-6 h-6 sm:w-10 sm:h-10 text-[#339933]" />}
                  alt="Node.js"
                  containerRef={grid2Container}
              />
              <Card
                  style={{ rotate: "10deg", top: "60%", left: "45%" }}
                  icon={() => <GiBearFace className="w-6 h-6 sm:w-10 sm:h-10 text-[#f0e5cf]" />} // Bear color
                  alt="Zustand"
                  containerRef={grid2Container}
              />
               <Card
                  style={{ rotate: "-15deg", top: "55%", left: "70%" }}
                  icon={() => <SiDocker className="w-6 h-6 sm:w-10 sm:h-10 text-[#2496ED]" />}
                  alt="Docker"
                  containerRef={grid2Container}
              />

              {/* AI / Data Science - Distributed to fill gaps */}
              <Card
                  style={{ rotate: "12deg", top: "45%", left: "30%" }}
                  icon={() => <SiPython className="w-6 h-6 sm:w-10 sm:h-10 text-[#3776AB]" />}
                  alt="Python"
                  containerRef={grid2Container}
              />
              <Card
                  style={{ rotate: "-8deg", top: "65%", left: "80%" }}
                  icon={() => <SiTensorflow className="w-6 h-6 sm:w-10 sm:h-10 text-[#FF6F00]" />}
                  alt="TensorFlow"
                  containerRef={grid2Container}
              />
              <Card
                  style={{ rotate: "15deg", top: "45%", left: "85%" }}
                  icon={() => <SiLangchain className="w-6 h-6 sm:w-10 sm:h-10 text-white" />}
                  alt="LangChain"
                  containerRef={grid2Container}
              />
            </div>
          </motion.div>

          {/* Grid 3: Globe */}
          <motion.div 
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="grid-black-color grid-3"
          >
            <div className="z-10 w-[50%]">
              <p className="headtext">Time Zone</p>
              <p className="subtext">
                I'm based in Nepal, and open to remote work worldwide
              </p>
            </div>
            <figure className="absolute inset-0 flex items-end justify-center">
              <Globe className="w-full md:w-full mx-auto translate-y-[55%]" />
            </figure>
          </motion.div>

          {/* Grid 4: Contact */}
          <motion.div 
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="grid-special-color grid-4"
          >
            <div className="flex flex-col items-center justify-center gap-4 size-full">
              <p className="text-center headtext">
                Do you want to start a project together?
              </p>
              <CopyEmailButton />
            </div>
          </motion.div>

          {/* Grid 5: Tech Stack */}
          <motion.div 
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="grid-default-color grid-5"
          >
            <div className="z-10 w-[50%]">
              <p className="headText">Tech Stack</p>
              <p className="subtext">
                I specialize in a variety of languages, frameworks, and tools that
                allow me to build robust and scalable applications
              </p>
            </div>
            <div className="absolute inset-y-0 md:inset-y-9 w-full h-full start-[50%] md:scale-125">
              <Frameworks />
            </div>
          </motion.div>
          {/* Grid 6: Day In Life */}
          <motion.div 
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="grid-default-color grid-6"
          >
            <DayInLife />
          </motion.div>
        </div>

      </section>
  );
};

export default About;
