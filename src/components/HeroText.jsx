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
    return (
        <>
            <div className="z-10 mt-20 text-center md:mt-40 md:text-left rounded-3xl bg-clip-text">
                <div className="flex-col hidden md:flex c-space">
                    <motion.h1
                        className="text-4xl font-medium"
                        variants={variants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 1 }}
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
                                className="font-black text-white text-8xl"
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
                                className="px-8 py-3 text-lg font-medium text-black bg-white rounded-full hover:bg-neutral-200 transition-colors flex items-center gap-2"
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
                                onClick={() => {
                                    const target = document.getElementById('projects');
                                    if (!target) return;
                                    
                                    const targetPosition = target.getBoundingClientRect().top + window.scrollY;
                                    const startPosition = window.scrollY;
                                    const distance = targetPosition - startPosition;
                                    const duration = 1500; // 1.5 seconds for a slow, premium feel
                                    let startTime = null;

                                    function animation(currentTime) {
                                        if (startTime === null) startTime = currentTime;
                                        const timeElapsed = currentTime - startTime;
                                        const run = ease(timeElapsed, startPosition, distance, duration);
                                        window.scrollTo(0, run);
                                        if (timeElapsed < duration) requestAnimationFrame(animation);
                                    }

                                    // Ease-in-out cubic function
                                    function ease(t, b, c, d) {
                                        t /= d / 2;
                                        if (t < 1) return c / 2 * t * t * t + b;
                                        t -= 2;
                                        return c / 2 * (t * t * t + 2) + b;
                                    }

                                    requestAnimationFrame(animation);
                                }}
                                className="px-8 py-3 text-lg font-medium text-white border border-white/20 rounded-full hover:bg-white/10 transition-colors"
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

                <div className="flex flex-col space-y-6 md:hidden">
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
                                className="font-bold text-white text-7xl"
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
                                className="px-6 py-3 text-base font-medium text-black bg-white rounded-full hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 w-full"
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
                                onClick={() => {
                                    const target = document.getElementById('projects');
                                    if (!target) return;
                                    
                                    const targetPosition = target.getBoundingClientRect().top + window.scrollY;
                                    const startPosition = window.scrollY;
                                    const distance = targetPosition - startPosition;
                                    const duration = 1500; // 1.5 seconds for a slow, premium feel
                                    let startTime = null;

                                    function animation(currentTime) {
                                        if (startTime === null) startTime = currentTime;
                                        const timeElapsed = currentTime - startTime;
                                        const run = ease(timeElapsed, startPosition, distance, duration);
                                        window.scrollTo(0, run);
                                        if (timeElapsed < duration) requestAnimationFrame(animation);
                                    }

                                    // Ease-in-out cubic function
                                    function ease(t, b, c, d) {
                                        t /= d / 2;
                                        if (t < 1) return c / 2 * t * t * t + b;
                                        t -= 2;
                                        return c / 2 * (t * t * t + 2) + b;
                                    }

                                    requestAnimationFrame(animation);
                                }}
                                className="px-6 py-3 text-base font-medium text-white border border-white/20 rounded-full hover:bg-white/10 transition-colors text-center w-full"
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

                {/* Scroll Indicator */}
                <motion.div 
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.5, duration: 1 }}
                >
                    <span className="text-xs font-light tracking-widest text-neutral-500 uppercase">Scroll</span>
                    <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent"></div>
                </motion.div>
            </div>
            <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
        </>
    );
};

export default HeroText;
