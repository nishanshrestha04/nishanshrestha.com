import Project from "../components/Project";
import { myProjects } from "../constants";
import { motion } from "motion/react";


const Projects = () => {
    return (
        <section
            id="projects"
            className="c-space section-spacing scroll-mt-20"
        >
            <div className="h-5 md:h-0" /> {/* Mobile Spacer */}
            <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: false, amount: 0.2 }}
                className="text-heading"
            >
                My Selected Projects
            </motion.h2>
            
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                {myProjects.map((project, index) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: false, amount: 0.2 }}
                    >
                        <Project
                            {...project}
                        />
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Projects;
