"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import Alert from "../components/Alert";
import { mySocials } from "../constants";
import { Globe } from "../components/globe";
import { motion } from "motion/react";

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 32 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
};

const slideLeftVariants = {
    hidden: { opacity: 0, x: -40 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
};

const slideRightVariants = {
    hidden: { opacity: 0, x: 40 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
};

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertType, setAlertType] = useState("success");
    const [alertMessage, setAlertMessage] = useState("");
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const showAlertMessage = (type, message) => {
        setAlertType(type);
        setAlertMessage(message);
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 5000);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await emailjs.send(
                "service_1imza2b",
                "template_sylgx3c",
                {
                    from_name: formData.name,
                    to_name: "Nishan",
                    from_email: formData.email,
                    to_email: "nishanshrestha212@gmail.com",
                    message: formData.message,
                },
                "0AoKROfLvTJ5z20BK"
            );
            setIsLoading(false);
            setFormData({ name: "", email: "", message: "" });
            showAlertMessage("success", "You message has been sent!");
        } catch (error) {
            setIsLoading(false);
            showAlertMessage("danger", "Somthing went wrong!");
        }
    };
    return (
        <section
            id="contact"
            className="c-space section-spacing scroll-mt-20"
        >
            <div className="h-5 md:h-32" /> {/* Mobile Spacer */}
            {showAlert && <Alert type={alertType} text={alertMessage} />}
            
            {/* Page heading animation */}
            <motion.div
                className="text-center mb-12"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
            >
                <h1 className="text-heading text-4xl md:text-5xl mb-3">Get In Touch</h1>
                {/* Animated accent line */}
                <motion.div
                    className="h-[2px] w-20 mx-auto rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                />
            </motion.div>

            <div className="relative flex items-center justify-center flex-col">
                <div className="relative w-full max-w-7xl mx-auto border border-white/10 rounded-3xl overflow-hidden bg-black/20 backdrop-blur-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2">

                    {/* Left Side - Visual & Info */}
                    <motion.div
                        className="relative p-10 flex flex-col justify-between min-h-[500px] bg-gradient-to-br from-neutral-900 to-black overflow-hidden"
                        variants={slideLeftVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <div className="absolute inset-0 flex items-center justify-center opacity-50 pointer-events-none">
                            <Globe />
                        </div>
                            
                            <motion.div
                                className="relative z-10"
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                <motion.h2
                                    variants={itemVariants}
                                    className="text-4xl md:text-6xl font-bold text-white mb-6"
                                >
                                    Let's Talk
                                </motion.h2>
                                <motion.p
                                    variants={itemVariants}
                                    className="text-neutral-400 text-lg max-w-md leading-relaxed"
                                >
                                    Whether you're looking to build a new website, improve
                                    your existing platform, or bring a unique project to
                                    life, I'm here to help.
                                </motion.p>
                            </motion.div>

                            <motion.div
                                className="relative z-10 space-y-6 mt-12"
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                <motion.div variants={itemVariants}>
                                    <p className="text-sm text-neutral-500 mb-2 uppercase tracking-wider">Email Me</p>
                                    <a href="mailto:nishanshrestha212@gmail.com" className="text-lg md:text-xl text-white hover:text-blue-400 transition-colors break-all">
                                        nishanshrestha212@gmail.com
                                    </a>
                                </motion.div>
                                
                                <motion.div variants={itemVariants}>
                                    <p className="text-sm text-neutral-500 mb-4 uppercase tracking-wider">Connect</p>
                                    <div className="flex gap-4">
                                        {mySocials.map((social) => (
                                            <motion.a 
                                                key={social.name}
                                                href={social.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-all border border-white/10"
                                                whileHover={{ scale: 1.15, filter: 'drop-shadow(0 0 8px rgba(129,140,248,0.6))' }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <img src={social.icon} alt={social.name} className="w-5 h-5" />
                                            </motion.a>
                                        ))}
                                    </div>
                                </motion.div>
                            </motion.div>
                        </motion.div>

                        {/* Right Side - Form */}
                        <motion.div
                            className="p-5 md:p-10 bg-white/5 backdrop-blur-md"
                            variants={slideRightVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <motion.form
                                className="w-full space-y-6"
                                onSubmit={handleSubmit}
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                <motion.div variants={itemVariants}>
                                    <label htmlFor="name" className="field-label block mb-2 text-neutral-300">
                                        Full Name
                                    </label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-white placeholder-neutral-600"
                                        placeholder="John Doe"
                                        autoComplete="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </motion.div>
                                <motion.div variants={itemVariants}>
                                    <label htmlFor="email" className="field-label block mb-2 text-neutral-300">
                                        Email Address
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-white placeholder-neutral-600"
                                        placeholder="johndoe@example.com"
                                        autoComplete="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </motion.div>
                                <motion.div variants={itemVariants}>
                                    <label htmlFor="message" className="field-label block mb-2 text-neutral-300">
                                        Your Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows="5"
                                        className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-white placeholder-neutral-600 resize-none"
                                        placeholder="Share your thoughts..."
                                        autoComplete="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                    />
                                </motion.div>
                                <motion.button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl text-white font-medium hover:shadow-lg hover:shadow-indigo-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(99,102,241,0.4)' }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {isLoading ? (
                                        "Sending..."
                                    ) : (
                                        <>
                                            Send Message
                                            <img src="/assets/arrow-up.svg" alt="arrow" className="w-4 h-4 rotate-45" />
                                        </>
                                    )}
                                </motion.button>
                            </motion.form>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
