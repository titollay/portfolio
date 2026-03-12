// import React from 'react';

// const Nav = () => {
//   return (
//     <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-7 py-5">
//       <div className="font-black-han text-[15px] tracking-[0.02em] leading-[1.15] uppercase text-black cursor-none">
//         <span className="block font-averia italic font-light text-[13px] tracking-[0.04em] normal-case">
//           Taha        </span>
//         <span className="block font-normal">Allay</span>
//       </div>
//       <div className="flex gap-2">
//         <button className="font-black-han text-[11px] tracking-[0.08em] uppercase px-4 py-2 rounded-[100px] border-[1.5px] border-black bg-transparent text-black cursor-pointer transition-colors duration-200 hover:bg-[#777]">Original</button>
//         <button className="font-black-han text-[11px] tracking-[0.08em] uppercase px-4 py-2 rounded-[100px] border-[1.5px] border-black bg-transparent text-black cursor-pointer transition-colors duration-200 hover:bg-[#777]">Remix</button>
//         <button className="font-black-han text-[11px] tracking-[0.08em] uppercase px-4 py-2 rounded-[100px] border-[1.5px] border-black bg-black text-white cursor-pointer transition-colors duration-200 hover:bg-[#222]">Copy Component</button>
//       </div>
//     </nav>
//   );
// };

// export default Nav;
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";


const getNavLinks = (t) => [
  { label: t('nav.home'), href: "/" },
  { label: t('nav.about'), href: "/#about-us" },
  { label: t('nav.projects'), href: "/#projects" },
  { label: t('nav.skills'), href: "/#skills" },
  { label: t('nav.contact'), href: "/#contact" },
];

export default function Nav({ className = "" }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const navLinks = getNavLinks(t);

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);



  

  return (
    <>
      <style>{`
        .nav-root {
          font-family: 'DM Sans', sans-serif;
        }

       

        
        .ham-line {
          display: block;
          width: 25px;
          height: 2px;
          background: #000;
          transition: all 0.3s cubic-bezier(0.22,1,0.36,1);
          transform-origin: center;
        }

        .mob-link {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.75rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.65);
          text-decoration: none;
          padding: 14px 0;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          display: block;
          transition: color 0.25s ease, padding-left 0.25s ease;
        }

        .mob-link:hover { color: #FC8C06; padding-left: 8px; }

       

        .lang-btn:hover {
          background: #777;
          border-color: #777;
          color: #fff;
        }

        .lang-btn option {
          background: #fff;
          color: #000;
        }
      `}</style>

      <header
       className={`
  nav-root fixed top-0 left-0 w-full z-50 
  transition-all duration-500 ease-[cubic-bezier(0.87,0,0.13,1)]
  ${
    scrolled
      ? "bg-black/60 backdrop-blur-xl border-b border-white/5 text-white shadow-2xl"
      : "bg-transparent text-black border-b border-transparent"
  }
  ${className}
`}
      >
        <div className="flex justify-between items-center px-6 sm:px-10 xl:px-14 py-4">
          {/* Logo */}
          <div className={`font-black-han text-[20px] tracking-[0.02em] leading-[1.15] uppercase text-black cursor-none  ${scrolled ? "text-white" : "text-black"}`}>
            <span className="block font-averia italic font-light text-[16px] tracking-[0.04em] normal-case">
              Taha        </span>
            <span className="block font-normal">Allay</span>
          </div>

          <nav className="hidden lg:block">
            <ul className="flex flex-row items-center text-xs xl:text-sm 2xl:text-base md:text-xs gap-2 xl:gap-2 md:gap-4 sm:gap-3 text-shadow-2xs bold justify-around space-x-2">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className={`font-black-han text-[11px] tracking-[0.08em] uppercase px-4 py-2 rounded-[100px] border-[1.5px] border-black bg-transparent text-black cursor-pointer transition-colors duration-200 hover:bg-[#777]  ${
          scrolled
            ? "border-white/20 text-white hover:bg-white/10"
            : "border-black text-black hover:bg-[#777]"
        }`}>
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <select 
                  className=" font-black-han text-[11px] tracking-[0.08em] uppercase px-4 py-2 rounded-[100px] border-[1.5px] border-black bg-black text-white cursor-pointer transition-colors duration-200 hover:bg-[#222]" 
                  value={language} 
                  onChange={handleLanguageChange}
                >
                  <option value="en">EN</option>
                  <option value="fr">FR</option>
                </select>
              </li>
            </ul>
          </nav>

          

          {/* Hamburger */}
          <button
            className="lg:hidden  flex flex-col justify-center items-center gap-[5px] w-9 h-9 relative z-50"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className="ham-line "
              style={{
                transform: menuOpen
                  ? "translateY(6.5px) rotate(45deg)"
                  : "none",
                background: menuOpen ? "#000" : undefined,
              }}
            />
            <span
              className="ham-line"
              style={{
                opacity: menuOpen ? 0 : 1,
                transform: menuOpen ? "scaleX(0)" : "none",
              }}
            />
            <span
              className="ham-line"
              style={{
                transform: menuOpen
                  ? "translateY(-6.5px) rotate(-45deg)"
                  : "none",
                background: menuOpen ? "#FC8C06" : undefined,
              }}
            />
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden text-center overflow-hidden bg-black/50 backdrop-blur-xl border-t border-white/5"
            >
              <div className="px-6 py-6">
                <div className="mb-6 flex justify-center">
                  <select 
                    className="lang-btn !border-white !color-white" 
                    value={language} 
                    onChange={handleLanguageChange}
                    style={{ borderColor: 'rgba(255,255,255,0.3)', color: 'white' }}
                  >
                    <option value="en">EN</option>
                    <option value="fr">FR</option>
                  </select>
                </div>
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.3 }}
                  >
                    <a
                      href={link.href}
                      className="mob-link"
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                    </a>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.06 + 0.05 }}
                  className="pt-5 pb-2"
                >
                  

                  {/* <div className="relative group px-3 py-2 overflow-hidden rounded-lg border w-full text-center block border-orange-500 bg-transparent">
                    <span className="absolute top-0 left-0 w-0 h-full bg-orange-500 transition-all duration-500 group-hover:w-full"></span>
                    <a
                      className="relative z-10 text-xs xl:text-sm shadow-2xl text-shadow-2xs w-full text-center block 2xl:text-base sm:text-sm text-[#FC8C06] font-semibold group-hover:text-white transition-colors"
                      href=""
                    >
                      Shop Now
                    </a>
                  </div> */}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}

// ─────────────────────────────────────────────
