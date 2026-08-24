"use client";

import { useState } from "react";
import { AnimatePresence, motion as Motion } from "motion/react";
import { toast } from "sonner";
const CopyEmailButton = () => {
  const [copied, setCopied] = useState(false);
  const email = "nishanshrestha212@gmail.com";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email); 
    setCopied(true);
    toast.success("Email copied!");

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  return (
    <Motion.button
      onClick={copyToClipboard}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 1.05 }}
      className="relative px-1 py-4 text-sm text-center rounded-full font-extralight bg-primary w-48 cursor-pointer overflow-hidden"
    >
      <AnimatePresence mode="wait">
        {copied ? (
          <Motion.p
            className="flex items-center justify-center gap-2"
            key="copied"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.1, ease: "easeInOut" }}
          >
            <img src="assets/copy-done.svg" className="w-5" alt="copy Icon" />
            Email Copied
          </Motion.p>
        ) : (
          <Motion.p
            className="flex items-center justify-center gap-2"
            key="copy"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
          >
            <img src="assets/copy.svg" className="w-5" alt="copy icon" />
            Copy Email Address
          </Motion.p>
        )}
      </AnimatePresence>
    </Motion.button>
  );
};

export default CopyEmailButton;
