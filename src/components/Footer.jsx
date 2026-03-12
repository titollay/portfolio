import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaInstagram, FaLinkedin,FaWhatsapp } from "react-icons/fa";

import { useLanguage } from "../context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  const buttonRef = useRef(null);

  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Magnetic Effect
  const handleMouseMove = (e) => {
    if (!buttonRef.current) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } =
      buttonRef.current.getBoundingClientRect();

    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const dx = clientX - centerX;
    const dy = clientY - centerY;

    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 150) {
      setPosition({ x: dx * 0.3, y: dy * 0.3 });
    } else {
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.footer
      id="contact"
      className="w-full bg-[#f3f3f3] text-[#111] overflow-hidden relative z-[20] flex flex-col justify-between min-h-[80vh] px-[5vw] py-16"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {/* Top Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mt-10 mb-32 gap-12 z-[25]">

        {/* Left Side */}
        <div className="flex flex-col gap-6">
          <p className="text-xl md:text-3xl font-light uppercase tracking-widest leading-relaxed">
            {t('footer.idea')}
            <br />
            {t('footer.buildTogether')}
          </p>

          <a
            href="mailto:tahaallay123@gmail.com"
            className="text-lg opacity-60 hover:opacity-100 transition-opacity uppercase tracking-widest w-fit"
          >
            tahaallay123@gmail.com
          </a>
        </div>

        {/* Magnetic Button */}
        <div className="relative w-40 h-40 flex items-center justify-center">
          <motion.div
            ref={buttonRef}
            className="absolute w-32 h-32 rounded-full bg-[#111] text-[#f3f3f3] flex items-center justify-center cursor-pointer z-[30] shadow-2xl"
            animate={{ x: position.x, y: position.y }}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            transition={{
              type: "spring",
              stiffness: 150,
              damping: 15,
              mass: 0.5,
            }}
            onClick={() =>
              (window.location.href = "mailto:tahaallay123@gmail.com")
            }
          >
            <span className="uppercase text-sm font-bold tracking-widest">
              {t('footer.getInTouch')}
            </span>
          </motion.div>
        </div>
      </div>

      {/* Big Call to Action */}
      <motion.h1
        className="text-[14vw] md:text-[15vw] leading-[0.8] font-extrabold uppercase text-center w-full z-[25]"
        initial={{ opacity: 0.5, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        {t('footer.letsWork')}
        <br />
        {t('footer.together')}
      </motion.h1>

      {/* Bottom Section */}
      <div className="mt-16 flex justify-between items-center uppercase text-xs font-bold tracking-widest opacity-60 z-[25]">

        <span>© 2026 Taha Allay</span>

        <div className="flex gap-6 text-xl">
          {/* Instagram */}
          <a
            href="https://www.instagram.com/tahaallay/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black/60 transition"
          >
            <FaInstagram />
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/taha-allay-baa0a72a9/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black/60 transition"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://wa.me/212676892376" 
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black/60transition"
          >
            <FaWhatsapp />
          </a>
        </div>
      </div>
    </motion.footer>
  );
}