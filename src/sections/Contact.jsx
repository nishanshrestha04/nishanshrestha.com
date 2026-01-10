import { useState } from "react";
import emailjs from "@emailjs/browser";
import Alert from "../components/Alert";
import { mySocials } from "../constants";
import { Globe } from "../components/globe";


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
            
            <div className="relative flex items-center justify-center flex-col">
                <div className="relative w-full max-w-7xl mx-auto border border-white/10 rounded-3xl overflow-hidden bg-black/20 backdrop-blur-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                    {/* Left Side - Visual & Info */}
                    <div className="relative p-10 flex flex-col justify-between min-h-[500px] bg-gradient-to-br from-neutral-900 to-black overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center opacity-50 pointer-events-none">
                            <Globe />
                        </div>
                            
                            <div className="relative z-10">
                                <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Let's Talk</h2>
                                <p className="text-neutral-400 text-lg max-w-md leading-relaxed">
                                    Whether you're looking to build a new website, improve
                                    your existing platform, or bring a unique project to
                                    life, I'm here to help.
                                </p>
                            </div>

                            <div className="relative z-10 space-y-6 mt-12">
                                <div>
                                    <p className="text-sm text-neutral-500 mb-2 uppercase tracking-wider">Email Me</p>
                                    <a href="mailto:nishanshrestha212@gmail.com" className="text-lg md:text-xl text-white hover:text-blue-400 transition-colors break-all">
                                        nishanshrestha212@gmail.com
                                    </a>
                                </div>
                                
                                <div>
                                    <p className="text-sm text-neutral-500 mb-4 uppercase tracking-wider">Connect</p>
                                    <div className="flex gap-4">
                                        {mySocials.map((social) => (
                                            <a 
                                                key={social.name}
                                                href={social.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-3 bg-white/5 rounded-full hover:bg-white/10 hover:scale-110 transition-all border border-white/10"
                                            >
                                                <img src={social.icon} alt={social.name} className="w-5 h-5" />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Form */}
                        <div className="p-5 md:p-10 bg-white/5 backdrop-blur-md">
                            <form className="w-full space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="name" className="field-label block mb-2 text-neutral-300">
                                        Full Name
                                    </label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all text-white placeholder-neutral-600"
                                        placeholder="John Doe"
                                        autoComplete="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="field-label block mb-2 text-neutral-300">
                                        Email Address
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all text-white placeholder-neutral-600"
                                        placeholder="johndoe@example.com"
                                        autoComplete="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message" className="field-label block mb-2 text-neutral-300">
                                        Your Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows="5"
                                        className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all text-white placeholder-neutral-600 resize-none"
                                        placeholder="Share your thoughts..."
                                        autoComplete="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl text-white font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isLoading ? (
                                        "Sending..."
                                    ) : (
                                        <>
                                            Send Message
                                            <img src="/assets/arrow-up.svg" alt="arrow" className="w-4 h-4 rotate-45" />
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
