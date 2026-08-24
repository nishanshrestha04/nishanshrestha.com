'use client';

import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { toast } from 'sonner';
import { mySocials } from '@/core/constants';
import TimezoneWidget from '@/features/contact/TimezoneWidget';
import FadeIn from '@/core/components/animations/FadeIn';
import RevealLeft from '@/core/components/animations/RevealLeft';
import StaggerContainer from '@/core/components/animations/StaggerContainer';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill out all fields.');
      return;
    }
    setLoading(true);

    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_id',
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_id',
        {
          from_name: form.name,
          to_name: 'Nishan',
          from_email: form.email,
          to_email: 'nishanshrestha212@gmail.com',
          message: form.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'public_key',
      )
      .then(
        () => {
          setLoading(false);
          toast.success(
            'Thank you. I will get back to you as soon as possible.',
          );
          setForm({ name: '', email: '', message: '' });
        },
        (error) => {
          setLoading(false);
          console.error(error);
          toast.error('Ahh, something went wrong. Please try again.');
        },
      );
  };

  return (
    <section className="c-space section-spacing pt-40 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-16 lg:gap-24">
        {/* LEFT COLUMN */}
        <StaggerContainer className="flex flex-col gap-8" stagger={0.15}>
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-2.5 h-2.5 bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.6)]" />
              <span className="font-mono text-sm tracking-widest text-text-secondary uppercase">
                Available for freelance
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-text-primary leading-[1.1] mb-8">
              LET'S BUILD
              <br />
              SOMETHING USEFUL.
            </h1>

            <p className="text-xl md:text-2xl text-text-secondary font-light leading-relaxed max-w-md">
              Available for software development opportunities, AI projects and
              interesting technical problems.
            </p>
          </div>

          <TimezoneWidget />

          <div className="flex flex-col gap-4 mt-2">
            <a
              href="mailto:nishanshrestha212@gmail.com"
              className="text-lg font-medium text-text-primary hover:text-[#0070f3] transition-colors flex items-center gap-3"
            >
              <span className="w-1.5 h-1.5 bg-[#0070f3]" />
              Email
            </a>
            {mySocials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-medium text-text-primary hover:text-[#0070f3] transition-colors flex items-center gap-3"
              >
                <span className="w-1.5 h-1.5 bg-[#0070f3]" />
                {social.name}
              </a>
            ))}
          </div>
        </StaggerContainer>

        {/* RIGHT COLUMN */}
        <RevealLeft
          x={50}
          delay={0.4}
          className="w-full max-w-xl bg-bg-secondary border border-border-primary p-8 md:p-12"
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="name"
                className="text-sm font-mono tracking-widest text-text-secondary uppercase"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full bg-transparent border-b border-border-primary pb-3 text-text-primary placeholder-gray-700 focus:outline-none focus:border-white transition-colors"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-sm font-mono tracking-widest text-text-secondary uppercase"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="w-full bg-transparent border-b border-border-primary pb-3 text-text-primary placeholder-gray-700 focus:outline-none focus:border-white transition-colors"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="message"
                className="text-sm font-mono tracking-widest text-text-secondary uppercase"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me about your project..."
                rows={6}
                className="w-full bg-transparent border-b border-border-primary pb-3 text-text-primary placeholder-gray-700 focus:outline-none focus:border-white transition-colors resize-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-[var(--text-primary)] text-[var(--bg-primary)] py-4 px-8 font-bold hover:opacity-80 transition-opacity disabled:opacity-50 mt-2"
            >
              {loading ? 'SENDING...' : 'SUBMIT'}
            </button>
          </form>
        </RevealLeft>
      </div>
    </section>
  );
};

export default Contact;
