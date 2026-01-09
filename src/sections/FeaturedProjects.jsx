import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import Project from "../components/Project";
import { myProjects } from "../constants";
import { NavLink } from "react-router-dom";

const FeaturedProjects = () => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { damping: 10, stiffness: 50 });
    const springY = useSpring(y, { damping: 10, stiffness: 50 });
    const handleMouseMove = (e) => {
        x.set(e.clientX + 20);
        y.set(e.clientY + 20);
    };
    const [preview, setPreview] = useState(null);
    const [isDesktop, setIsDesktop] = useState(true);

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 640);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <section
            id="projects"
            onMouseMove={handleMouseMove}
            className="relative c-space section-spacing scroll-mt-20"
        >
            <div className="flex items-center justify-between mb-12">
                <h2 className="text-heading">Featured Projects</h2>
                <NavLink 
                    to="/projects"
                    className="hidden md:flex items-center gap-2 text-neutral-400 hover:text-white transition-colors group"
                >
                    View All
                    <img src="assets/arrow-right.svg" className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </NavLink>
            </div>
            
            <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent h-[1px] w-full" />
            
            {myProjects.slice(0, 2).map((project) => (
                <Project
                    key={project.id}
                    {...project}
                    setPreview={setPreview}
                />
            ))}

            <div className="flex md:hidden justify-center mt-8">
                <NavLink 
                    to="/projects"
                    className="px-6 py-3 text-sm font-medium text-black bg-white rounded-full hover:bg-neutral-200 transition-colors"
                >
                    View All Projects
                </NavLink>
            </div>

            {preview && isDesktop && (
                <motion.img
                    className="fixed top-0 left-0 z-50 object-cover h-56 rounded-lg shadow-lg pointer-events-none w-80"
                    src={preview}
                    style={{ x: springX, y: springY }}
                />
            )}
        </section>
    );
};

export default FeaturedProjects;
