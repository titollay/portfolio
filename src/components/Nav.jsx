import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";

const getNavLinks = (t) => [
  { label: t('nav.home'),     href: "#home" },
  { label: t('nav.about'),    href: "#about-us" },
  { label: t('nav.projects'), href: "#projects" },
  { label: t('nav.skills'),   href: "#skills" },
  { label: t('nav.contact'),  href: "#contact" },
];

export default function Nav({ className = "" }) {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [langOpen,  setLangOpen]  = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { darkMode, toggleDarkMode } = useTheme();

  const navLinks = getNavLinks(t);

  /* ── scroll ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── close mobile on resize ── */
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* ── close lang dropdown on click outside ── */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (langOpen && !e.target.closest('.lang-dropdown')) {
        setLangOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [langOpen]);

  /* ── helpers ── */
  const LANGS = ["EN", "FR", "AR"];

  const textColor   = scrolled || darkMode ? "text-white"        : "text-black";
  const borderColor = scrolled || darkMode ? "border-white/20"   : "border-black/20";
  const hoverBg     = scrolled || darkMode ? "hover:bg-white/10" : "hover:bg-black/5";

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 w-full z-50 transition-all duration-500
          ${scrolled ? "bg-black/60 backdrop-blur-xl shadow-2xl border-b border-white/5" : "bg-transparent border-b border-transparent"}
          ${className}
        `}
      >
        <div className="grid grid-cols-2 lg:grid-cols-3 items-center px-6 sm:px-10 xl:px-14 py-4">

          {/* ── LEFT : Logo ── */}
          <div className={`font-black-han text-[20px] tracking-[0.02em] leading-[1.15] uppercase cursor-default ${textColor}`}>
            <span className="block font-averia italic font-light text-[15px] tracking-[0.04em] normal-case opacity-70">
              Taha
            </span>
            <span className="block font-normal">Allay</span>
          </div>

          {/* ── CENTER : Nav links (desktop) ── */}
          <nav className="hidden lg:flex justify-center">
            <ul className="flex items-center gap-1">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className={`
                      font-black-han text-[11px] tracking-[0.08em] uppercase
                      px-4 py-2 rounded-full border-[1.5px] transition-all duration-200
                      ${textColor} ${borderColor} ${hoverBg}
                    `}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* ── RIGHT : Lang button + Dark mode + Hamburger ── */}
          <div className="flex items-center justify-end gap-2">

            {/* Language dropdown — desktop */}
            <div className="relative lang-dropdown hidden lg:block">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className={`
                  inline-flex items-center justify-center gap-1
                  font-black-han text-[11px] tracking-[0.1em] uppercase
                  h-9 px-3 rounded-full border-[1.5px] transition-all duration-200
                  ${textColor} ${borderColor} ${hoverBg}
                `}
              >
                {language.toUpperCase()}
                <svg 
                  className={`w-3 h-3 transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor" 
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className={`
                      absolute top-full right-0 mt-2 min-w-[80px]
                      rounded-xl overflow-hidden
                      backdrop-blur-xl shadow-xl
                      ${scrolled || darkMode ? "bg-black/80 border border-white/10" : "bg-white/90 border border-black/10"}
                    `}
                  >
                    {LANGS.map((lang) => (
                      <button
                        key={lang}
                        onClick={() => {
                          setLanguage(lang.toLowerCase());
                          setLangOpen(false);
                        }}
                        className={`
                          w-full px-4 py-2 text-left
                          font-black-han text-[11px] tracking-[0.1em] uppercase
                          transition-all duration-150
                          ${language.toUpperCase() === lang 
                            ? (scrolled || darkMode ? "bg-white/10 text-white" : "bg-black/5 text-black") 
                            : (scrolled || darkMode ? "text-white/70 hover:bg-white/5 hover:text-white" : "text-black/70 hover:bg-black/5 hover:text-black")
                          }
                        `}
                      >
                        {lang}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Dark mode toggle — desktop */}
            <button
              onClick={() => toggleDarkMode()}
              aria-label="Toggle dark mode"
              className={`
                hidden lg:inline-flex items-center justify-center
                w-9 h-9 rounded-full border-[1.5px] transition-all duration-200
                ${textColor} ${borderColor} ${hoverBg}
              `}
            >
              {darkMode ? (
                /* sun */
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                </svg>
              ) : (
                /* moon */
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
                </svg>
              )}
            </button>

            {/* Hamburger — mobile */}
            <button
              className="lg:hidden flex flex-col justify-center items-center gap-[5px] w-9 h-9 relative z-50"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className={`block w-[22px] h-[2px] transition-all duration-300 origin-center ${scrolled || menuOpen ? "bg-white" : "bg-black"}`}
                  style={{
                    transform:
                      i === 0 && menuOpen ? "translateY(7px) rotate(45deg)"  :
                      i === 2 && menuOpen ? "translateY(-7px) rotate(-45deg)" : "none",
                    opacity: i === 1 && menuOpen ? 0 : 1,
                  }}
                />
              ))}
            </button>
          </div>
        </div>

        {/* ── Mobile Menu ── */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{  opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden overflow-hidden bg-black/80 backdrop-blur-xl border-t border-white/5"
            >
              <div className="px-6 py-6 space-y-1">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1,  x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="block py-3 border-b border-white/5 text-xs uppercase tracking-[0.18em] text-white/60 hover:text-white hover:pl-2 transition-all duration-200"
                  >
                    {link.label}
                  </motion.a>
                ))}

                {/* Mobile lang + dark */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: navLinks.length * 0.06 + 0.05 }}
                  className="pt-5 flex items-center gap-3"
                >
                  <div className="flex-1 flex gap-2">
                    {LANGS.map((lang) => (
                      <button
                        key={lang}
                        onClick={() => setLanguage(lang.toLowerCase())}
                        className={`flex-1 py-2.5 rounded-full border text-xs tracking-widest uppercase font-semibold transition-all ${
                          language.toUpperCase() === lang 
                            ? "bg-white text-black border-white" 
                            : "border-white/20 text-white/60 hover:text-white hover:bg-white/10"
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => toggleDarkMode()}
                    className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-all flex-shrink-0"
                  >
                    {darkMode ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
                      </svg>
                    )}
                  </button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
