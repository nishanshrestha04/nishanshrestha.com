import { motion } from "motion/react";
import { experiences } from "../constants";
import { useRef } from "react";

const Timeline = () => {
  return (
    <section className="w-full py-10 text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: false, amount: 0.2 }}
        className="flex flex-col items-center mb-14"
      >
        <h3 className="text-heading text-4xl mb-3">My Journey</h3>
        {/* Animated accent line */}
        <motion.div 
          className="h-[2px] w-20 mb-5 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: false }}
        />
        <p className="text-neutral-400 text-center max-w-2xl">
          A timeline of my professional experience and growth.
        </p>
      </motion.div>

      <div className="relative max-w-4xl mx-auto px-4">
        {/* Vertical Line - enhanced gradient */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 md:-translate-x-1/2 bg-gradient-to-b from-indigo-500/80 via-purple-500/50 to-transparent" />

        <div className="space-y-10">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className={`relative flex flex-col md:flex-row gap-8 ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Timeline Dot - enhanced with glow */}
              <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full transform -translate-x-1/2 mt-1.5 z-10"
                style={{
                  background: 'linear-gradient(135deg, #818cf8, #a78bfa)',
                  boxShadow: '0 0 12px rgba(129,140,248,0.5), 0 0 24px rgba(129,140,248,0.2)',
                  border: '3px solid #030412',
                }}
              />

              {/* Content Card */}
              <TimelineCard exp={exp} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TimelineCard = ({ exp, index }) => {
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
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: false, amount: 0.2 }}
      className={`ml-12 md:ml-0 md:w-1/2 ${
        index % 2 === 0 ? "md:pl-12" : "md:pr-12 md:text-right"
      }`}
    >
      <div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className="relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/[0.08] transition-all duration-300 group shadow-lg backdrop-blur-sm overflow-hidden glow-border"
      >
        {/* Spotlight hover effect */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
          style={{
            background: 'radial-gradient(300px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(129,140,248,0.08), transparent 60%)',
          }}
        />

        <div className="relative z-10">
          {/* Date badge */}
          <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 mb-3">
            {exp.date}
          </span>
          
          <h4 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors duration-300">
            {exp.title}
          </h4>
          <p className="text-neutral-200 font-medium mb-3">{exp.job}</p>
          
          <ul
            className={`space-y-2 text-neutral-400 text-sm ${
              index % 2 === 0 ? "text-left" : "md:text-right text-left"
            }`}
          >
            {exp.contents.map((item, i) => (
              <li key={i} className={`leading-relaxed flex items-start gap-2 ${
                index % 2 !== 0 ? "md:flex-row-reverse" : ""
              }`}>
                <span className="text-indigo-400 mt-1 shrink-0">▸</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default Timeline;
