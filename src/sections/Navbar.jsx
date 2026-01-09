import { useState } from "react";
import { motion as Motion } from "motion/react";
import { NavLink } from "react-router-dom";

function Navigation({ onNavClick }) {
    const navLinks = [
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "Projects", path: "/projects" },
        { name: "Work", path: "/work" },
        { name: "Contact", path: "/contact" },
    ];

    return (
        <ul className="nav-ul">
            {navLinks.map(({ name, path }) => (
                <li className="nav-li" key={name}>
                    <NavLink
                        to={path}
                        className={({ isActive }) =>
                            `nav-link ${isActive ? "text-white font-bold" : "text-neutral-400"}`
                        }
                        onClick={onNavClick}
                    >
                        {name}
                    </NavLink>
                </li>
            ))}
        </ul>
    );
}
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const closeMenu = () => setIsOpen(false);

    return (
        <div className="fixed inset-x-0 z-20 w-full backdrop-blur-lg bg-primary/40">
            <div className="mx-auto c-space max-w-7xl">
                <div className="flex items-center justify-between py-2 sm:py-0">
                    <NavLink
                        to="/"
                        className="text-xl font-bold transition-colors text-neutral-400 hover:text-white"
                    >
                        Nishan
                    </NavLink>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex cursor-pointer text-neutral-400 hover:text-white focus:outline-none sm:hidden"
                        aria-label="Toggle menu"
                    >
                        <img
                            src={
                                isOpen ? "assets/close.svg" : "assets/menu.svg"
                            }
                            className="w-6 h-6"
                            alt="toggle"
                        />
                    </button>
                    <nav className="hidden sm:flex">
                        <Navigation />
                    </nav>
                </div>
            </div>
            {isOpen && (
                <Motion.div
                    className="block overflow-hidden text-center sm:hidden"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    style={{ maxHeight: "100vh" }}
                    transition={{ duration: 1 }}
                >
                    <nav className="pb-5">
                        <Navigation onNavClick={closeMenu} />
                    </nav>
                </Motion.div>
            )}
        </div>
    );
};

export default Navbar;
