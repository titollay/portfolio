import React, { useRef, useState, useEffect } from "react";
import { motion, useSpring } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

import projectAllzy from "../assets/mokkup.jpg";
import projectVetcare from "../assets/vett.png";
import projectPulsecare from "../assets/pulse.jpg";
import projectBusway from "../assets/bus.jpg";
import projectAllzyDash from "../assets/dash2.jpg";

const projects = [
  {
    title: "ALLZY — E-COMMERCE",
    category: "WEB DESIGN / DEVELOPMENT",
    image: projectAllzy,
    link: "https://github.com/titollay/allzy",
  },
  {
    title: "ALLZY — E-COMMERCE DASHBOARD",
    category: "ADMIN PANEL / MANAGEMENT",
    image: projectAllzyDash,
    link: "https://github.com/titollay/allzy",
  },
  {
    title: "VETCARE — VETERINARY SYSTEM",
    category: "WEB APP / MANAGEMENT SYSTEM",
    image: projectVetcare,
    link: "https://github.com/titollay/vetcare",
  },
  {
    title: "PULSECARE — MEDICAL PLATFORM",
    category: "WEB DESIGN / HEALTHCARE",
    image: projectPulsecare,
    link: "https://github.com/titollay/pulsecare",
  },
  {
    title: "BUSWAY — BUS TRACKING APP",
    category: "PRODUCT DESIGN / MOBILE & WEB",
    image: projectBusway,
    link: "https://github.com/titollay/busway",
  },
];

export default function SelectedWorks() {
  const { t } = useLanguage();

  const [activeProject, setActiveProject] = useState(null);

  const containerRef = useRef(null);

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
      className="relative w-full min-h-[100vh] bg-[#f3f3f3] text-[#111] py-24 flex flex-col justify-center px-[5vw] overflow-hidden"
    >
      {/* Title */}
      <div className="mb-16 border-b border-[#111]/20 pb-4">
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
            className="group block relative flex items-center justify-between py-12 border-b border-[#111]/20 cursor-pointer transition-colors duration-500 hover:bg-[#111] hover:text-[#f3f3f3] px-8 -mx-8"
            onMouseEnter={() => setActiveProject(index)}
            onMouseLeave={() => setActiveProject(null)}
          >
            <h3 className="text-[clamp(2rem,6vw,6rem)] font-[800] uppercase leading-none mix-blend-difference z-[11] relative">
              {project.title}
            </h3>

            <span className="text-sm md:text-lg tracking-widest font-medium z-[11] relative">
              {project.category}
            </span>
          </a>
        ))}
      </motion.div>

      {/* Floating preview image */}
      <motion.div
        className="absolute top-0 left-0 w-[420px] aspect-[4/3] pointer-events-none z-20 overflow-hidden rounded-xl shadow-2xl"
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
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}