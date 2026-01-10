import { motion } from "motion/react";
import { experiences } from "../constants";

const Timeline = () => {
  return (
    <section className="w-full py-10 text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: false, amount: 0.2 }}
        className="flex flex-col items-center mb-10"
      >
        <h3 className="text-4xl font-bold mb-4">My Journey</h3>
        <p className="text-neutral-400 text-center max-w-2xl">
          A timeline of my professional experience and growth.
        </p>
      </motion.div>

      <div className="relative max-w-4xl mx-auto px-4">
        {/* Vertical Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo via-purple to-transparent md:-translate-x-1/2" />

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className={`relative flex flex-col md:flex-row gap-8 ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-indigo rounded-full border-4 border-black-200 transform -translate-x-1/2 mt-1.5 z-10 shadow-[0_0_10px_rgba(92,51,204,0.5)]" />

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: false, amount: 0.2 }}
                className={`ml-12 md:ml-0 md:w-1/2 ${
                  index % 2 === 0 ? "md:pl-12" : "md:pr-12 md:text-right"
                }`}
              >
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300 group shadow-lg backdrop-blur-sm">
                  <h4 className="text-xl font-bold text-white group-hover:text-lavender transition-colors">
                    {exp.title}
                  </h4>
                  <p className="text-neutral-200 font-medium mb-2">{exp.job}</p>
                  <p className="text-sm text-neutral-400 mb-4">{exp.date}</p>
                  <ul
                    className={`space-y-2 text-neutral-400 text-sm ${
                      index % 2 === 0 ? "text-left" : "md:text-right text-left"
                    }`}
                  >
                    {exp.contents.map((item, i) => (
                      <li key={i} className="leading-relaxed">
                        • {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
