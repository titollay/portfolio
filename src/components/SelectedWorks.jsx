import React, { useRef, useState, useEffect } from "react";
import { motion, useSpring } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

import projectAllzy from "../assets/mokkup.webp";
import projectVetcare from "../assets/vett.webp";
import projectMyCVForge from "../assets/mycvforge.webp";
import projectBusway from "../assets/bus.webp";
import projectAllzyDash from "../assets/dash2.webp";
import projectAnalyseMed from "../assets/med.webp";
import projectCRFR from "../assets/crfr.webp";

const PROJECT_LINKS = [
  "https://allzy.gt.tc",
  "https://allzy.gt.tc/login",
  "https://vetcare.wuaze.com/vett/",
  "https://mycvforge.vercel.app/",
  "https://github.com/titollay/busway",
  "https://github.com/titollay/crfr",
  "https://github.com/titollay/analysemed",
];

const PROJECT_IMAGES = [
  projectAllzy,
  projectAllzyDash,
  projectVetcare,
  projectMyCVForge,
  projectBusway,
  projectCRFR,
  projectAnalyseMed,
];

export default function SelectedWorks() {
  const { t } = useLanguage();
  const [activeProject, setActiveProject] = useState(null);
  const containerRef = useRef(null);

  const projectItems = t("projects.items") || [];
  const projects = projectItems.map((item, i) => ({
    ...item,
    image: PROJECT_IMAGES[i],
    link:  PROJECT_LINKS[i],
  }));

  // Smooth cursor movement
  const mouseX = useSpring(0, { stiffness: 60, damping: 15 });
  const mouseY = useSpring(0, { stiffness: 60, damping: 15 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();

      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.section
      id="projects"
      ref={containerRef}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="relative w-full min-h-[100vh] text-[#111] py-24 flex flex-col justify-center px-[5vw] overflow-hidden"
      style={{ backgroundColor: 'var(--bg)', color: 'var(--color-text)' }}
    >
      {/* Title */}
      <div className="mb-16 pb-4" style={{ borderBottom: '1px solid var(--color-border)' }}>
        <h2 className="text-[1.5rem] font-bold tracking-widest uppercase">
          {t("projects.title")}
        </h2>
      </div>

      {/* Projects list */}
      <motion.div
        initial={{ opacity: 0.5, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="flex flex-col w-full relative z-[10]"
      >
        {projects.map((project, index) => (
          <a
            key={index}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group block relative flex flex-col md:flex-row md:items-center justify-between py-12 md:py-20 cursor-pointer transition-colors duration-500 px-8 -mx-8 gap-6 md:gap-0 hover:text-white"
            style={{ 
              borderBottom: '1px solid var(--color-border)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#111';
              e.currentTarget.style.color = '#f3f3f3';
              setActiveProject(index);
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'var(--color-text)';
              setActiveProject(null);
            }}
          >
            {/* Mobile Card Image */}
            <div className="md:hidden w-full aspect-[16/9] overflow-hidden rounded-xl mb-4 relative shadow-lg">
               <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
            </div>

            <h3 className="text-[clamp(1.5rem,6vw,6rem)] font-[800] uppercase leading-none md:mix-blend-difference z-[11] relative">
              {project.title}
            </h3>

            <span className="text-sm md:text-lg tracking-widest font-medium z-[11] relative opacity-60 md:opacity-100 uppercase">
              {project.category}
            </span>
          </a>
        ))}
      </motion.div>

      {/* Floating preview image (Desktop Only) */}
      <motion.div
        className="hidden md:block absolute top-0 left-0 w-[500px] aspect-[4/3] pointer-events-none z-20 overflow-hidden rounded-xl shadow-2xl"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className="absolute inset-0 w-full h-full"
            initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
            animate={{
              opacity: activeProject === index ? 1 : 0,
              scale: activeProject === index ? 1 : 0.85,
              rotate: activeProject === index ? 0 : 6,
            }}
            transition={{
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-contain"
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}