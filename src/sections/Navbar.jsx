import { useState, useEffect } from "react";
import { motion as Motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";
import { NavLink } from "react-router-dom";

const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Work", path: "/work" },
    { name: "Projects", path: "/projects" },
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isNavVisible, setIsNavVisible] = useState(true);
    const { scrollY } = useScroll();
    const [lastScrollY, setLastScrollY] = useState(0);

    const closeMenu = () => setIsOpen(false);

    useMotionValueEvent(scrollY, "change", (current) => {
        if (typeof current === "number") {
            // Always show at the top or if menu is open
            if (current < 10 || isOpen) {
                setIsNavVisible(true);
            } else {
                // Show if scrolling up, hide if scrolling down
                if (current < lastScrollY) {
                    setIsNavVisible(true);
                } else if (current > lastScrollY && current > 50) {
                    setIsNavVisible(false);
                }
            }
            setLastScrollY(current);
        }
    });

    // Force visibility when menu is toggled open
    useEffect(() => {
        if (isOpen) setIsNavVisible(true);
    }, [isOpen]);

    return (
        <>
            {/* Floating Island Container */}
            <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
                <Motion.div 
                    className="flex items-center justify-between w-full max-w-5xl px-6 py-3 border rounded-full shadow-lg backdrop-blur-lg bg-black/50 border-white/10 pointer-events-auto"
                    initial={{ y: 0, opacity: 1 }}
                    animate={{ 
                        y: isNavVisible ? 0 : -100,
                        opacity: isNavVisible ? 1 : 0
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                    
                    {/* Logo */}
                    <NavLink
                        to="/"
                        className="text-xl font-bold tracking-tight text-white uppercase transition-colors hover:text-neutral-300"
                        onClick={closeMenu}
                    >
                        Nishan
                    </NavLink>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map(({ name, path }) => (
                            <NavLink
                                key={name}
                                to={path}
                                className={({ isActive }) =>
                                    `text-sm font-medium transition-colors hover:text-white ${
                                        isActive ? "text-white" : "text-neutral-400"
                                    }`
                                }
                            >
                                {name}
                            </NavLink>
                        ))}
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen((prev) => !prev)}
                        className="flex md:hidden cursor-pointer text-neutral-400 hover:text-white focus:outline-none"
                        aria-label="Open menu"
                    >
                        <img
                            src={isOpen ? "assets/close.svg" : "assets/menu.svg"}
                            className="w-6 h-6"
                            alt="menu"
                        />
                    </button>

                    {/* Desktop: Call to Action */}
                    <div className="hidden md:block">
                        <NavLink 
                            to="/contact"
                            className="px-4 py-2 text-xs font-bold text-black bg-white rounded-full hover:bg-neutral-200 transition-colors"
                        >
                            Let's Talk
                        </NavLink>
                    </div>
                </Motion.div>
            </div>

            {/* Mobile Menu - Floating Glass Card */}
            <AnimatePresence>
                {isOpen && (
                    <Motion.div
                        className="fixed top-24 left-4 right-4 z-[40] p-6 rounded-3xl border border-white/10 backdrop-blur-xl bg-black/50 shadow-2xl flex flex-col items-center gap-4 md:hidden"
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                        {navLinks.map(({ name, path }) => (
                            <NavLink
                                key={name}
                                to={path}
                                onClick={closeMenu}
                                className={({ isActive }) =>
                                    `text-lg font-bold uppercase tracking-widest transition-colors duration-200 ${
                                        isActive
                                            ? "text-white"
                                            : "text-neutral-400 hover:text-white"
                                    }`
                                }
                            >
                                {name}
                            </NavLink>
                        ))}
                    </Motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
