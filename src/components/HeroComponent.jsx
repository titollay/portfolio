import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaLinkedinIn, FaGithub, FaInstagram, FaXTwitter, FaFacebookF } from 'react-icons/fa6';
import { useLanguage } from '../context/LanguageContext';
import img1Str from "../assets/first.png";
import wavingImg from "../assets/wayving.png";

const Hero = () => {
  const { t, language } = useLanguage();
  const imageRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollPos, setScrollPos] = useState(0);

  // Handle mouse move for 3D tilt effect
  const handleMouseMove = (e) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = (y / rect.height) * -10;
    const rotateY = (x / rect.width) * 10;
    setMousePos({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setMousePos({ rotateX: 0, rotateY: 0 });
  };

  // Handle scroll for marquee
  useEffect(() => {
    const handleScroll = () => {
      setScrollPos(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate marquee position
  const marqueeTransform = -scrollPos * 0.5;

  // Animated button download CV
  const handleDownloadCV = () => {
    const cvPath = language === 'ar' ? '/taha-allay-ar.pdf' : 
                   language === 'fr' ? '/taha-allay-fr.pdf' : 
                   '/taha-allay-en.pdf';
    window.open(cvPath, '_blank');
  };

  // Social Media Links
  const socialLinks = [
    { 
      icon: <FaLinkedinIn size={20} />, 
      href: "https://www.linkedin.com/in/taha-allay-baa0a72a9/",
      position: { top: '5%', left: '45%', transform: 'translateX(-50%)' }
    },
    { 
      icon: <FaXTwitter size={20} />, 
      href: "https://twitter.com/tahaallay",
      position: { top: '30%', left: '5%', transform: 'translateX(-50%)' }
    },
    { 
      icon: <FaGithub size={20} />, 
      href: "https://github.com/titollay",
      position: { top: '30%', right: '5%', transform: 'translateX(-50%)' }
    },
    { 
      icon: <FaFacebookF size={20} />, 
      href: "https://www.facebook.com/taha.allay.6",
      position: { bottom: '30%', left: '5%', transform: 'translateX(-50%)' }
    },
    { 
      icon: <FaInstagram size={20} />, 
      href: "https://www.instagram.com/tahaallay/",
      position: { bottom: '30%', right: '5%', transform: 'translateX(-50%)' }
    },
  ];

  return (
    <section 
      data-index="0" 
      id="home" 
      className="lightSection min-h-[100vh] max-sm:min-h-[100vh] relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg)' }}
    >
      <div className="homePageContainer min-h-screen w-full flex flex-col-reverse lg:flex-row justify-center lg:justify-around items-center p-6 pt-24 lg:pt-6 gap-8 lg:gap-0">
        
        {/* Home Content */}
        <motion.div 
          className="homeContent max-w-[580px]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Greeting Tag */}
          {/* <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-black/10 bg-white/60 backdrop-blur-sm text-sm text-[#555] font-medium mb-6 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            {language === 'ar' ? 'متاح للعمل' : language === 'fr' ? 'Disponible' : 'Available for work'}
          </motion.div> */}

          {/* Name Block */}
          <div className="mb-6">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="text-[1.4rem] max-sm:text-xl font-medium mb-1"
              style={{ color: 'var(--color-muted)' }}
            >
            Hey&nbsp;
              <motion.img
                src={wavingImg}
                alt="waving"
                className="inline-block w-[1.3em] h-[1.3em] object-contain align-middle"
                animate={{ rotate: [0, 20, -5, 20, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", repeatDelay: 1 }}
              />
              ,&nbsp;
              {language === 'ar' ? 'أنا' : language === 'fr' ? "je suis" : "I'm"}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.7 }}
              className="text-[7rem] max-lg:text-[5.5rem] max-sm:text-[3.8rem] font-black leading-none tracking-tight"
              style={{ color: 'var(--color-heading)' }}
            >
              {t('hero.firstName')}
              <span style={{ color: 'var(--color-heading)' }}>.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="text-[1.2rem] max-sm:text-base font-medium tracking-wide mt-1"
              style={{ color: 'var(--color-muted)' }}
            >
              — {t('hero.role')}
            </motion.p>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="text-[1.05rem] max-sm:text-sm leading-relaxed mb-8 max-w-[480px]"
            style={{ color: 'var(--color-muted)' }}
          >
            {t('hero.tagline')}
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            className="flex items-center gap-4 flex-wrap"
          >
            <button 
              onClick={handleDownloadCV}
              className="animated-button group relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-bold text-white rounded-full bg-black transition-all duration-300 hover:scale-105"
            >
              <svg 
                viewBox="0 0 24 24" 
                className="arr-2 absolute left-[-20px] w-5 h-5 transition-all duration-300 group-hover:left-[calc(100%+10px)]" 
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
              >
                <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
              </svg>
              <span className="text relative z-10 transition-all duration-300 group-hover:pr-4">
                {t('hero.downloadCV')}
              </span>
              <span className="circle absolute inset-0 rounded-full bg-white scale-0 transition-transform duration-300 group-hover:scale-100 opacity-20"></span>
              <svg 
                viewBox="0 0 24 24" 
                className="arr-1 absolute right-4 w-5 h-5 opacity-0 transition-all duration-300 group-hover:opacity-100" 
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
              >
                <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
              </svg>
            </button>

            <a
              href="#projects"
              className="text-sm font-semibold underline underline-offset-4 transition-all duration-200"
              style={{ 
                color: 'var(--color-heading)',
                textDecorationColor: 'var(--color-border)'
              }}
              onMouseEnter={(e) => e.target.style.textDecorationColor = 'var(--color-heading)'}
              onMouseLeave={(e) => e.target.style.textDecorationColor = 'var(--color-border)'}
            >
              {language === 'ar' ? 'مشاهدة الأعمال ↓' : language === 'fr' ? 'Voir mes projets ↓' : 'See my work ↓'}
            </a>
          </motion.div>
        </motion.div>
        

        {/* Image Block with Social Icons */}
        <motion.div 
          className="imageBloc relative"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="relative w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] lg:w-[450px] lg:h-[450px]">
            {/* Central Portrait Circle */}
            <div 
              ref={imageRef}
              className="homeImage absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] sm:w-[260px] sm:h-[260px] lg:w-[320px] lg:h-[320px] rounded-full overflow-hidden shadow-2xl z-10"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                border: '8px solid #fff',
                boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                perspective: '300px',
                transformStyle: 'preserve-3d',
                transition: 'transform 0.15s',
                transform: `rotateX(${mousePos.rotateX}deg) rotateY(${mousePos.rotateY}deg) scale(1)`,
              }}
            >
              <img 
                src={img1Str} 
                alt="Portrait" 
                className="w-full h-full object-cover"
              />
            </div>
            

            {/* Floating Social Icons */}
            {socialLinks.map((social, i) => (
              <motion.a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + i * 0.1, duration: 0.5, type: "spring" }}
                whileHover={{ scale: 1.2, backgroundColor: '#000' }}
                className="absolute w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full bg-[#3a3a3a] flex items-center justify-center text-white shadow-lg z-20 transition-colors duration-300 hover:text-white"
                style={social.position}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
      

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 max-sm:hidden">
        <div className="scrolldown">
          <div className="chevrons">
            <div className="chevrondown" />
            <div className="chevrondown" />
          </div>
        </div>
      </div>

      {/* Marquee Text at Bottom */}
      <div className="absolute bottom-50 w-full overflow-hidden pointer-events-none">
        <div 
          className="py-6 text-[40vh] max-sm:text-[20vh] whitespace-nowrap font-[700] marquee-text"
          style={{
            willChange: 'transform',
            transform: `translateX(${marqueeTransform}%)`,
            color: 'var(--color-border)',
          }}
        >
          {t('hero.firstName')} {t('hero.lastName')} - {t('hero.firstName')} {t('hero.lastName')} - {t('hero.firstName')} {t('hero.lastName')} - {t('hero.firstName')} {t('hero.lastName')}
        </div>
      </div> 
     
    </section>
  );
};

export default Hero;

