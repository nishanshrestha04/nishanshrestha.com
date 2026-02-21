import Project from "../components/Project";
import { myProjects } from "../constants";
import { NavLink } from "react-router-dom";
import { motion } from "motion/react";

const FeaturedProjects = () => {
    return (
        <section
            id="projects"
            className="relative c-space section-spacing scroll-mt-20"
        >
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: false, amount: 0.2 }}
                className="flex items-center justify-between mb-12"
            >
                <div className="relative">
                    <h2 className="text-heading">Featured Projects</h2>
                    {/* Animated accent line */}
                    <motion.div 
                        className="h-[2px] mt-3 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        viewport={{ once: false }}
                        style={{ transformOrigin: 'left' }}
                    />
                </div>
                <NavLink 
                    to="/projects"
                    className="hidden md:flex items-center gap-2 px-4 py-2 shimmer-btn bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-white/20 transition-all group"
                >
                    View All Projects
                    <img src="assets/arrow-right.svg" className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </NavLink>
            </motion.div>
            
            {/* Project Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {myProjects.slice(0, 2).map((project, index) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 30, scale: 0.95 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.6, delay: index * 0.15 }}
                        viewport={{ once: false, amount: 0.2 }}
                    >
                        <Project
                            {...project}
                        />
                    </motion.div>
                ))}
            </div>

            <div className="flex md:hidden justify-center mt-8">
                <NavLink 
                    to="/projects"
                    className="shimmer-btn inline-flex items-center gap-2 px-6 py-3 text-sm font-medium bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-white/20 transition-all group"
                >
                    View All Projects
                    <img src="assets/arrow-right.svg" className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </NavLink>
            </div>
        </section>
    );
};

export default FeaturedProjects;
