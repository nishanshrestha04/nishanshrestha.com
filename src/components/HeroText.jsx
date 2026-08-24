"use client";

import { FlipWords } from "./FlipWords";
import { motion } from "motion/react";
import { useState } from "react";
import ResumeModal from "./ResumeModal";

const HeroText = () => {
    const [isResumeOpen, setIsResumeOpen] = useState(false);
    const words = ["Secure", "Modern", "Scalable"];
    const variants = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0 },
    };

    const scrollToProjects = () => {
        const target = document.getElementById('projects');
        if (!target) return;
        
        const targetPosition = target.getBoundingClientRect().top + window.scrollY;
        const startPosition = window.scrollY;
        const distance = targetPosition - startPosition;
        const duration = 1500;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t * t + b;
            t -= 2;
            return c / 2 * (t * t * t + 2) + b;
        }

        requestAnimationFrame(animation);
    };

    return (
        <>
            <div className="z-10 mt-20 text-center md:mt-40 md:text-left rounded-3xl bg-clip-text">
                
                {/* Animated Gradient Orb */}
                <div 
                    className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none hidden md:block"
                    style={{
                        background: 'radial-gradient(circle, rgba(129,140,248,0.15) 0%, rgba(167,139,250,0.08) 40%, transparent 70%)',
                        animation: 'gradient-orb 6s ease-in-out infinite',
                    }}
                />

                {/* Desktop */}
                <div className="flex-col hidden md:flex c-space">
                    {/* Available for Work Badge */}
                    <motion.div
                        className="flex items-center gap-2 mb-4 w-fit"
                        variants={variants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.8 }}
                    >
                        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                            <span 
                                className="w-2 h-2 rounded-full bg-emerald-400"
                                style={{ animation: 'pulse-dot 2s ease-in-out infinite' }}
                            />
                            <span className="text-xs font-medium text-neutral-300 tracking-wide uppercase">Available for Work</span>
                        </div>
                    </motion.div>

                    <motion.h1
                        className="text-4xl font-medium"
                        variants={variants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 1 }}
                        style={{ textShadow: '0 0 40px rgba(129,140,248,0.15)' }}
                    >
                        Hi I'm Nishan
                    </motion.h1>
                    <div className="flex flex-col items-start">
                        <motion.p
                            className="text-5xl font-medium text-neutral-300"
                            variants={variants}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: 1.2 }}
                        >
                            A Developer
                            <br /> Focusing on Building
                        </motion.p>
                        <motion.div
                            variants={variants}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: 1.5 }}
                        >
                            <FlipWords
                                words={words}
                                className="font-black text-8xl gradient-text"
                            />
                        </motion.div>
                        <motion.p
                            className="text-4xl font-medium text-neutral-300"
                            variants={variants}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: 1.8 }}
                        >
                            AI & Web Applications
                        </motion.p>
                        
                        <div className="flex items-center gap-4 mt-8">
                            <motion.button
                                onClick={() => setIsResumeOpen(true)}
                                className="shimmer-btn px-8 py-3 text-lg font-medium text-black bg-white rounded-full hover:bg-neutral-200 transition-all flex items-center gap-2 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                                variants={variants}
                                initial="hidden"
                                animate="visible"
                                transition={{ delay: 2.0 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span>View Resume</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                    <polyline points="14 2 14 8 20 8"></polyline>
                                    <line x1="16" y1="13" x2="8" y2="13"></line>
                                    <line x1="16" y1="17" x2="8" y2="17"></line>
                                    <polyline points="10 9 9 9 8 9"></polyline>
                                </svg>
                            </motion.button>
                            
                            <motion.button
                                onClick={scrollToProjects}
                                className="px-8 py-3 text-lg font-medium text-white border border-white/20 rounded-full hover:bg-white/10 hover:border-white/30 transition-all"
                                variants={variants}
                                initial="hidden"
                                animate="visible"
                                transition={{ delay: 2.1 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                View My Work
                            </motion.button>
                        </div>
                    </div>
                </div>

                {/* Mobile */}
                <div className="flex flex-col space-y-6 md:hidden">
                    {/* Available for Work Badge - Mobile */}
                    <motion.div
                        className="flex items-center justify-center"
                        variants={variants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.8 }}
                    >
                        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                            <span 
                                className="w-2 h-2 rounded-full bg-emerald-400"
                                style={{ animation: 'pulse-dot 2s ease-in-out infinite' }}
                            />
                            <span className="text-xs font-medium text-neutral-300 tracking-wide uppercase">Available for Work</span>
                        </div>
                    </motion.div>

                    <motion.p
                        className="text-4xl font-medium"
                        variants={variants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 1 }}
                    >
                        Hi,I'm Nishan
                    </motion.p>
                    <div>
                        <motion.p
                            className="text-5xl font-black text-neutral-300"
                            variants={variants}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: 1.2 }}
                        >
                            Building
                        </motion.p>
                        <motion.div
                            variants={variants}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: 1.5 }}
                        >
                            <FlipWords
                                words={words}
                                className="font-bold text-7xl gradient-text"
                            />
                        </motion.div>
                        <motion.p
                            className="text-4xl font-black text-neutral300"
                            variants={variants}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: 1.8 }}
                        >
                            AI & Web Applications
                        </motion.p>
                        
                        <div className="flex flex-col gap-4 mt-6">
                            <motion.button
                                onClick={() => setIsResumeOpen(true)}
                                className="shimmer-btn px-6 py-3 text-base font-medium text-black bg-white rounded-full hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 w-full"
                                variants={variants}
                                initial="hidden"
                                animate="visible"
                                transition={{ delay: 2.0 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span>View Resume</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                    <polyline points="14 2 14 8 20 8"></polyline>
                                    <line x1="16" y1="13" x2="8" y2="13"></line>
                                    <line x1="16" y1="17" x2="8" y2="17"></line>
                                    <polyline points="10 9 9 9 8 9"></polyline>
                                </svg>
                            </motion.button>

                            <motion.button
                                onClick={scrollToProjects}
                                className="px-6 py-3 text-base font-medium text-white border border-white/20 rounded-full hover:bg-white/10 hover:border-white/30 transition-all text-center w-full"
                                variants={variants}
                                initial="hidden"
                                animate="visible"
                                transition={{ delay: 2.1 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                View My Work
                            </motion.button>
                        </div>
                    </div>
                </div>


            </div>
            <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
        </>
    );
};

export default HeroText;
