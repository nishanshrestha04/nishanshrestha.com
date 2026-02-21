import Project from "../components/Project";
import { myProjects } from "../constants";
import { motion } from "motion/react";

const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.6,
            delay: i * 0.1,
            ease: [0.22, 1, 0.36, 1],
        },
    }),
};

const Projects = () => {
    return (
        <section
            id="projects"
            className="c-space section-spacing scroll-mt-20"
        >
            <div className="h-5 md:h-0" /> {/* Mobile Spacer */}

            {/* Heading with accent line */}
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="mb-12"
            >
                <h2 className="text-heading">My Selected Projects</h2>
                <motion.div
                    className="h-[2px] w-20 mt-3 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    style={{ transformOrigin: 'left' }}
                />
                <motion.p
                    className="text-neutral-400 mt-3 max-w-xl"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                >
                    A collection of things I've built — from AI tools to full-stack web apps.
                </motion.p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {myProjects.map((project, index) => (
                    <motion.div
                        key={project.id}
                        custom={index}
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <Project {...project} />
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Projects;
