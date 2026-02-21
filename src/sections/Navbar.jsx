import { useState, useEffect } from "react";
import { motion as Motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";
import { NavLink, useLocation } from "react-router-dom";

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
    const location = useLocation();

    const closeMenu = () => setIsOpen(false);

    useMotionValueEvent(scrollY, "change", (current) => {
        if (typeof current === "number") {
            if (current < 10 || isOpen) {
                setIsNavVisible(true);
            } else {
                if (current < lastScrollY) {
                    setIsNavVisible(true);
                } else if (current > lastScrollY && current > 50) {
                    setIsNavVisible(false);
                }
            }
            setLastScrollY(current);
        }
    });

    useEffect(() => {
        if (isOpen) setIsNavVisible(true);
    }, [isOpen]);

    useEffect(() => {
        const handleHideNavbar = () => {
            setIsNavVisible(false);
            setIsOpen(false);
        };
        
        const handleShowNavbar = () => {
            setIsNavVisible(true);
        };
        
        window.addEventListener('hideNavbar', handleHideNavbar);
        window.addEventListener('showNavbar', handleShowNavbar);
        
        return () => {
            window.removeEventListener('hideNavbar', handleHideNavbar);
            window.removeEventListener('showNavbar', handleShowNavbar);
        };
    }, []);

    return (
        <>
            {/* Floating Island Container */}
            <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
                <Motion.div 
                    className="relative flex items-center justify-between w-full max-w-5xl px-6 py-3 border rounded-full shadow-lg backdrop-blur-md bg-black/80 border-white/10 pointer-events-auto"
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

                    {/* Desktop Navigation with Active Pill */}
                    <nav className="hidden md:flex items-center gap-1">
                        {navLinks.map(({ name, path }) => {
                            const isActive = path === '/' 
                                ? location.pathname === '/' 
                                : location.pathname.startsWith(path);
                            return (
                                <NavLink
                                    key={name}
                                    to={path}
                                    className="relative px-4 py-1.5 text-sm font-medium transition-colors hover:text-white"
                                    style={{ color: isActive ? '#ffffff' : '#a3a3a3' }}
                                >
                                    {/* Animated Pill Background */}
                                    {isActive && (
                                        <Motion.div
                                            layoutId="nav-pill"
                                            className="absolute inset-0 bg-white/10 rounded-full border border-white/10"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                                        />
                                    )}
                                    <span className="relative z-10">{name}</span>
                                </NavLink>
                            );
                        })}
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
                            className="shimmer-btn px-5 py-2 text-xs font-bold text-black bg-white rounded-full hover:bg-neutral-200 transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
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
                        className="fixed top-24 left-4 right-4 z-[40] p-6 rounded-3xl border border-white/10 backdrop-blur-2xl bg-black/60 shadow-2xl flex flex-col items-center gap-4 md:hidden"
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
