import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

const skillCategories = [
  {
    title: "FRONT-END",
    skills: [
      { name: "HTML", icon: "fa-brands fa-html5" },
      { name: "CSS", icon: "fa-brands fa-css3-alt" },
      { name: "JavaScript", icon: "fa-brands fa-js" },
      { name: "AJAX", icon: "fa-solid fa-network-wired" },
      { name: "jQuery", icon: "fa-brands fa-js-square" },
      { name: "Bootstrap", icon: "fa-brands fa-bootstrap" },
      { name: "React", icon: "fa-brands fa-react" },
      { name: "Vite", icon: "fa-solid fa-bolt" },
      { name: "TailwindCSS", icon: "fa-solid fa-wind" },
    ],
  },
  {
    title: "BACK-END",
    skills: [
      { name: "Python", icon: "fa-brands fa-python" },
      { name: "Django", icon: "fa-solid fa-server" },
      { name: "Node.js", icon: "fa-brands fa-node-js" },
      { name: "PHP", icon: "fa-brands fa-php" },
      { name: "Laravel", icon: "fa-brands fa-laravel" },
    ],
  },
  {
    title: "DATABASES",
    skills: [
      { name: "SQL Server", icon: "fa-solid fa-database" },
      { name: "MySQL", icon: "fa-solid fa-database" },
    ],
  },
  {
    title: "DEVELOPMENT TOOLS",
    skills: [
      { name: "Git", icon: "fa-brands fa-git-alt" },
      { name: "GitHub", icon: "fa-brands fa-github" },
      { name: "GitLab", icon: "fa-brands fa-gitlab" },
      { name: "Jira", icon: "fa-brands fa-jira" },
      { name: "SonarQube", icon: "fa-solid fa-code" },
    ],
  },
];

export default function Skills() {
  const { t } = useLanguage();
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleCategory = (index) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      id="skills"
      className="w-full bg-[#111] text-[#f3f3f3] py-32 px-[5vw] relative z-[15]"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-20">
          <h2 className="text-[1.5rem] font-bold tracking-widest text-white/50 uppercase mb-4">
            {t("skills.title")}
          </h2>

          <p className="text-[clamp(1.5rem,3vw,3rem)] font-light leading-tight max-w-4xl">
            {t("skills.description")}
          </p>
        </div>

        {/* Categories */}
        <div className="border-t border-white/20">
          {skillCategories.map((category, index) => {
            const isExpanded = expandedIndex === index;

            return (
              <div
                key={category.title}
                className="border-b border-white/20 overflow-hidden"
              >
                {/* Header */}
                <button
                  onClick={() => toggleCategory(index)}
                  className="w-full py-10 flex justify-between items-center cursor-pointer group text-left"
                >
                  <h3 className="text-[clamp(2.5rem,5vw,5rem)] font-[800] uppercase tracking-tighter group-hover:pl-4 transition-all duration-300">
                    {category.title}
                  </h3>

                  {/* Plus Icon */}
                  <motion.div
                    animate={{ rotate: isExpanded ? 45 : 0 }}
                    transition={{ duration: 0.4 }}
                    className="text-3xl font-light"
                  >
                    +
                  </motion.div>
                </button>

                {/* Expand Content */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        duration: 0.5,
                        ease: [0.87, 0, 0.13, 1],
                      }}
                    >
                      <div className="pb-12 grid grid-cols-2 md:grid-cols-3 gap-6 text-lg text-white/80 max-w-3xl font-light">

                        {category.skills.map((skill) => (
                          <motion.div
                            key={skill.name}
                            whileHover={{ x: 6 }}
                            className="flex items-center gap-3 hover:text-white transition"
                          >
                            <i className={`${skill.icon} text-gray-400`} />
                            {skill.name}
                          </motion.div>
                        ))}

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}