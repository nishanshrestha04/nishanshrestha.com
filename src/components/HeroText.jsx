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
                        
                        <motion.button
                            onClick={() => setIsResumeOpen(true)}
                            className="mt-8 px-8 py-3 text-lg font-medium text-black bg-white rounded-full hover:bg-neutral-200 transition-colors flex items-center gap-2"
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
                    </div>
                </div>

                <div className="flex- flex-col space-y-6 md:hidden">
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
                        
                        <motion.button
                            onClick={() => setIsResumeOpen(true)}
                            className="mt-6 px-6 py-3 text-base font-medium text-black bg-white rounded-full hover:bg-neutral-200 transition-colors flex items-center gap-2 mx-auto"
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
                    </div>
                </div>
            </div>
            <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
        </>
    );
};

export default HeroText;
