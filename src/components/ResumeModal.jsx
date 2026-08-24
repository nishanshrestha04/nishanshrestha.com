"use client";

import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { motion, AnimatePresence } from 'motion/react';
import ResumePDF from './ResumePDF';
import { Particles } from './Particles';

const ResumeModal = ({ isOpen, onClose }) => {
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    if (isOpen) {
      fetch('/RESUME.md')
        .then((res) => res.text())
        .then((text) => setMarkdown(text))
        .catch((err) => console.error('Error loading resume:', err));

      // Lock body scroll and hide navbar
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('hideNavbar'));
      }, 10);
    } else {
      // Restore body scroll and show navbar
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
      
      window.dispatchEvent(new CustomEvent('showNavbar'));
    }

    // Cleanup function
    return () => {
        if (isOpen) {
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            document.body.style.overflow = '';
            window.dispatchEvent(new CustomEvent('showNavbar'));
        }
    };
  }, [isOpen]);

  // Original renderer for the dark mode modal
  const DarkListItemRenderer = ({ children }) => {
    let categoryText = '';
    let skillsText = '';
    let isSkillItem = false;

    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child) && child.type === 'strong') {
        const text = child.props.children?.toString();
        if (text && (
          text.includes('Programming Languages') || 
          text.includes('Frameworks') || 
          text.includes('Tools') || 
          text.includes('Databases') || 
          text.includes('Machine Learning') ||
          text.includes('Soft Skills')
        )) {
          categoryText = text.replace(':', '');
          isSkillItem = true;
        }
      } else if (typeof child === 'string') {
        skillsText += child;
      }
    });

    if (isSkillItem) {
      const skills = skillsText.replace(/^[:\s]+/, '').split(',').filter(s => s.trim());
      
      return (
        <div className="mb-6 block">
          <h3 className="text-sm font-bold text-gray-200 mb-3 uppercase tracking-wider border-b border-white/10 pb-1">
            {categoryText}
          </h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span 
                key={index} 
                className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium
                  bg-white/10 text-gray-200 border border-white/5
                  hover:bg-white/20 hover:text-white
                  transition-colors duration-200 cursor-default select-none"
              >
                {skill.trim()}
              </span>
            ))}
          </div>
        </div>
      );
    }

    return <li className="leading-relaxed text-gray-300 pl-1 mb-2">{children}</li>;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0a0a0a] border border-white/10 rounded-xl shadow-2xl custom-scrollbar"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Particles Background */}
            <Particles
              className="fixed inset-0 z-0 rounded-xl pointer-events-none"
              quantity={50}
              ease={80}
              color={"#ffffff"}
              refresh
            />
            
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between p-6 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/10">
              <h2 className="text-xl font-bold text-white tracking-wide uppercase">Resume</h2>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/10"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* Content (Visible Dark Mode) */}
            <div className="p-8 md:p-12 prose prose-invert max-w-none prose-headings:text-gray-100 prose-p:text-gray-300 prose-strong:text-white prose-li:text-gray-300">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({node, ...props}) => <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-2" {...props} />,
                  h2: ({node, ...props}) => <h2 className="text-xl font-bold text-gray-100 mt-8 mb-4 border-b border-white/20 pb-2 uppercase tracking-wide" {...props} />,
                  h3: ({node, ...props}) => <h3 className="text-lg font-semibold text-gray-200 mt-6 mb-2" {...props} />,
                  p: ({node, ...props}) => <p className="text-gray-300 leading-relaxed mb-3 text-base" {...props} />,
                  ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-4 space-y-1 text-gray-300" {...props} />,
                  li: DarkListItemRenderer,
                  a: ({node, ...props}) => <a className="text-blue-300 hover:text-blue-200 hover:underline decoration-blue-300/30 underline-offset-4 transition-colors font-medium" target="_blank" rel="noopener noreferrer" {...props} />,
                  strong: ({node, ...props}) => <strong className="font-semibold text-white" {...props} />,
                  hr: ({node, ...props}) => <hr className="my-8 border-white/10" {...props} />,
                }}
              >
                {markdown}
              </ReactMarkdown>
            </div>
            
            {/* Footer */}
            <div className="sticky bottom-0 z-10 p-6 bg-[#0a0a0a]/90 backdrop-blur-md border-t border-white/10 flex flex-wrap justify-end gap-4">
                <a 
                    href="/RESUME.md" 
                    download="Nishan_Shrestha_Resume.md"
                    className="flex items-center gap-2 px-6 py-3 text-base font-medium text-neutral-300 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:text-white transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                    Download Markdown
                </a>
                
                {markdown && (
                  <button 
                    onClick={async () => {
                      try {
                        const { pdf } = await import('@react-pdf/renderer');
                        const blob = await pdf(<ResumePDF markdown={markdown} />).toBlob();
                        const url = URL.createObjectURL(blob);
                        const link = document.createElement('a');
                        link.href = url;
                        link.download = 'Nishan_Shrestha_Resume.pdf';
                        link.click();
                        URL.revokeObjectURL(url);
                      } catch (error) {
                        console.error('PDF generation error:', error);
                        alert('Failed to generate PDF. Check console for details.');
                      }
                    }}
                    className="flex items-center gap-2 px-6 py-3 text-base font-medium text-black bg-white rounded-full hover:bg-neutral-200 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="12" y1="18" x2="12" y2="12"></line>
                        <line x1="9" y1="15" x2="12" y2="18"></line>
                        <line x1="15" y1="15" x2="12" y2="18"></line>
                    </svg>
                    Download PDF
                  </button>
                )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResumeModal;
