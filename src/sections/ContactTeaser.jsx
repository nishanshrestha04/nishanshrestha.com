import { NavLink } from "react-router-dom";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";

const ContactTeaser = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <section className="c-space section-spacing scroll-mt-20" id="contact-teaser">
      <div className="relative p-[1px] overflow-hidden rounded-3xl group">
        
        {/* Animated Gradient Border */}
        <div className="absolute inset-[-100%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
        
        <div 
          className="relative flex flex-col items-center justify-center p-12 md:p-20 overflow-hidden rounded-3xl backdrop-blur-xl bg-black/90 h-full w-full"
          onMouseMove={handleMouseMove}
        >
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

          {/* Spotlight Glow */}
          <motion.div
            className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
            style={{
              background: useMotionTemplate`
                radial-gradient(
                  600px circle at ${mouseX}px ${mouseY}px,
                  rgba(79, 70, 229, 0.15),
                  transparent 80%
                )
              `,
            }}
          />

          {/* Ambient Glow (Static) */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-lg bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />

          {/* Floating Gradient Orbs */}
          <div 
            className="absolute top-10 left-20 w-32 h-32 rounded-full pointer-events-none opacity-20 blur-3xl"
            style={{
              background: 'radial-gradient(circle, #818cf8, transparent)',
              animation: 'float 6s ease-in-out infinite',
            }}
          />
          <div 
            className="absolute bottom-20 right-16 w-24 h-24 rounded-full pointer-events-none opacity-15 blur-3xl"
            style={{
              background: 'radial-gradient(circle, #f472b6, transparent)',
              animation: 'float 8s ease-in-out infinite 2s',
            }}
          />

          <div className="relative z-10 flex flex-col items-center text-center gap-6">
            <motion.h2 
              className="text-4xl md:text-6xl font-bold font-display tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: false }}
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #a78bfa 40%, #818cf8 60%, #f472b6 100%)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'shimmer-text 4s linear infinite',
              }}
            >
              Let's Work Together
            </motion.h2>
            <motion.p 
              className="text-neutral-400 max-w-xl text-lg md:text-xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              viewport={{ once: false }}
            >
              Have a project in mind or just want to say hi? I'm always open to discussing new opportunities and ideas.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: false }}
            >
              <NavLink 
                to="/contact"
                className="shimmer-btn mt-6 px-10 py-4 text-lg font-medium text-black bg-white rounded-full hover:bg-neutral-200 transition-all hover:scale-105 flex items-center gap-2"
                style={{ animation: 'pulse-glow 3s ease-in-out infinite' }}
              >
                Get in Touch
                <img src="assets/arrow-right.svg" alt="" className="w-5 h-5 invert" />
              </NavLink>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactTeaser;
