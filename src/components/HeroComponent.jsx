import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaFacebook, FaLinkedinIn, FaGithub, FaInstagram } from 'react-icons/fa';
import WavyBackground from './WavyBackground';
import img1Str from "../assets/first.png";
import img2Str from "../assets/1212.png";

const Hero = () => {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setMousePos({ x, y });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseenter', () => setIsHovered(true));
      container.addEventListener('mouseleave', () => setIsHovered(false));
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseenter', () => setIsHovered(true));
        container.removeEventListener('mouseleave', () => setIsHovered(false));
      }
    };
  }, []);

  const svgMask = `data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23000' d='M43,-75.4C56.6,-66.6,69.2,-55.8,77.5,-42.1C85.7,-28.4,89.5,-11.9,87.6,3.9C85.8,19.7,78.3,34.8,68.4,47.7C58.4,60.6,46,71.2,31.7,78.2C17.4,85.2,1.3,88.5,-13.7,85.9C-28.7,83.3,-42.6,74.9,-54.2,64.2C-65.7,53.5,-74.9,40.5,-80.7,25.9C-86.5,11.3,-88.9,-4.9,-85,-20.1C-81.1,-35.3,-70.9,-49.4,-57.8,-59C-44.7,-68.6,-28.7,-73.7,-13.3,-76.3C2,-78.9,18,-79,31.5,-75.4Z' transform='translate(100 100)'%3E%3Canimate attributeName='d' dur='8s' repeatCount='indefinite' values='M43,-75.4C56.6,-66.6,69.2,-55.8,77.5,-42.1C85.7,-28.4,89.5,-11.9,87.6,3.9C85.8,19.7,78.3,34.8,68.4,47.7C58.4,60.6,46,71.2,31.7,78.2C17.4,85.2,1.3,88.5,-13.7,85.9C-28.7,83.3,-42.6,74.9,-54.2,64.2C-65.7,53.5,-74.9,40.5,-80.7,25.9C-86.5,11.3,-88.9,-4.9,-85,-20.1C-81.1,-35.3,-70.9,-49.4,-57.8,-59C-44.7,-68.6,-28.7,-73.7,-13.3,-76.3C2,-78.9,18,-79,31.5,-75.4Z; M50.4,-75.2C65.5,-67.7,77.9,-53.4,85.1,-37.2C92.2,-21,94.1,-2.9,90.2,13.6C86.3,30.2,76.6,45.2,63.6,56.5C50.6,67.8,34.3,75.4,17.1,79.5C0,83.5,-18.1,84.1,-34.2,78.3C-50.3,72.5,-64.4,60.3,-75.2,46.1C-86,31.9,-93.5,15.7,-93.6,-0.6C-93.7,-16.9,-86.4,-33.3,-75.5,-46.8C-64.6,-60.3,-50.1,-70.9,-34.5,-77.7C-18.9,-84.5,-2.2,-87.5,14.2,-84.4C30.6,-81.3,46.6,-72.1,50.4,-75.2Z; M43,-75.4C56.6,-66.6,69.2,-55.8,77.5,-42.1C85.7,-28.4,89.5,-11.9,87.6,3.9C85.8,19.7,78.3,34.8,68.4,47.7C58.4,60.6,46,71.2,31.7,78.2C17.4,85.2,1.3,88.5,-13.7,85.9C-28.7,83.3,-42.6,74.9,-54.2,64.2C-65.7,53.5,-74.9,40.5,-80.7,25.9C-86.5,11.3,-88.9,-4.9,-85,-20.1C-81.1,-35.3,-70.9,-49.4,-57.8,-59C-44.7,-68.6,-28.7,-73.7,-13.3,-76.3C2,-78.9,18,-79,31.5,-75.4Z'/%3E%3C/path%3E%3C/svg%3E`;

  const maskSize = isHovered ? 480 : 0; 

  const socialLinks = [
    { icon: <FaFacebook />, href: "https://www.facebook.com/taha.allay.6" },
    { icon: <FaLinkedinIn />, href: "https://www.linkedin.com/in/taha-allay-baa0a72a9/" },
    { icon: <FaGithub />, href: "https://github.com/titollay" },
    { icon: <FaInstagram />, href: "https://www.instagram.com/tahaallay/" },
  ];

  return (
    <div className="absolute inset-0 flex items-center justify-center z-10 bg-[#f3f3f3]">
      <WavyBackground />

      {/* Mobile-Only Redesign Layout */}
      <div className="flex md:hidden flex-col items-center justify-center text-center px-6 w-full h-[100dvh] relative z-20">
        <div className="relative mb-8">
          {/* Portrait Container */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="w-[200px] h-[200px] relative rounded-full border-4 border-white shadow-2xl overflow-hidden z-30"
          >
            <img 
              src={img1Str} 
              alt="Portrait" 
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Floating Social Icons */}
          {socialLinks.map((social, i) => (
            <motion.a
              key={i}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + i * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.2 }}
              className="absolute w-10 h-10 rounded-full bg-black/10 backdrop-blur-md flex items-center justify-center text-black shadow-lg z-40 transition-colors hover:bg-black hover:text-white"
              style={{
                top: `${50 + 60 * Math.sin(i * (Math.PI / 1.5))}%`,
                left: `${50 + 60 * Math.cos(i * (Math.PI / 1.5))}%`,
              }}
            >
              {social.icon}
            </motion.a>
          ))}
        </div>

        {/* Text Content */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="flex flex-col items-center "
        >
          <h2 className="text-[#777] mt-10 font-black-han text-3xl uppercase tracking-tighter mb-1">
            ALLAY
          </h2>
          <h1 className="text-black font-black-han text-5xl uppercase tracking-tighter leading-none mb-4">
            TAHA
          </h1>
          <p className="text-black/60 font-averia text-lg font-medium">
            I'm a Full Stack Developer
          </p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 flex flex-col items-center gap-2"
        >
          <div className="w-6 h-10 border-2 border-black rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-black rounded-full"></div>
          </div>
        </motion.div>
      </div>

      {/* Desktop Layout (Blob Mask) */}
      <div 
        ref={containerRef}
        className="hidden md:block w-[900px] h-[100dvh] max-w-full relative overflow-hidden rounded-[4px] z-20"
      >
        <img 
          className="base-img mix-blend-darken" 
          src={img1Str} 
          alt="Base Portrait" 
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: "brightness(0.8)" }} 
        />
        <div
          className="hidden md:block"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            WebkitMaskImage: `url("${svgMask}")`,
            maskImage: `url("${svgMask}")`,
            WebkitMaskPosition: `${mousePos.x - maskSize/2}px ${mousePos.y - maskSize/2}px`,
            maskPosition: `${mousePos.x - maskSize/2}px ${mousePos.y - maskSize/2}px`,
            WebkitMaskSize: `${maskSize}px`,
            maskSize: `${maskSize}px`,
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
            transition: 'mask-size 0.4s cubic-bezier(0.16, 1, 0.3, 1), -webkit-mask-size 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            pointerEvents: 'none'
          }}
        >
          <img 
            src={img2Str} 
            alt="Reveal Portrait" 
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;

