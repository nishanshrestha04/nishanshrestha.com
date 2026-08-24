import { Mail } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="border-t border-border-primary bg-bg-primary mt-auto">
      <div className="c-space py-16 md:py-24 flex flex-col items-center text-center">
        <h2 className="font-mono text-sm tracking-widest text-[#0070f3] uppercase mb-4">
          AI / Full-Stack Developer
        </h2>

        <p className="text-text-secondary text-lg md:text-xl font-light mb-12 max-w-md">
          Building intelligent software from models to products.
        </p>

        <div className="flex items-center justify-center gap-8 mb-12">
          <a
            href="https://github.com/nishanshrestha04"
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-70 hover:opacity-100 transition-opacity p-2 border border-border-primary hover:bg-bg-secondary text-text-primary"
          >
            <FaGithub className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/shresthanishan/"
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-70 hover:opacity-100 transition-opacity p-2 border border-border-primary hover:bg-bg-secondary text-text-primary"
          >
            <FaLinkedin className="w-5 h-5" />
          </a>
          <a
            href="mailto:nishanshrestha212@gmail.com"
            className="text-text-secondary hover:text-text-primary transition-colors p-2 border border-border-primary hover:bg-bg-secondary"
          >
            <Mail size={20} />
          </a>
        </div>

        <p className="text-sm font-mono text-gray-600">© 2026</p>
      </div>
    </footer>
  );
};

export default Footer;
