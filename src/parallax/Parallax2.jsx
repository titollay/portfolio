import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import img1 from "../assets/bg10.jpg"; 
import img2 from "../assets/bg11.jpg"; 
import img3 from "../assets/bg15.jpg"; 
import img4 from "../assets/bg16.jpg"; 

const textBlocks = [
  {
    label: "BIOGRAPHY",
    title: "About Me",
    text: "Hello, I'm Taha, a passionate web developer who enjoys building modern and creative digital experiences for the web.",
    scrollRange: [0, 0.3],
    showButton: true,
  },
  {
    text: "My journey in development is driven by curiosity, learning new technologies, and transforming ideas into functional and elegant solutions.",
    scrollRange: [0.3, 0.6],
  },
  {
    text: "I focus on creating smooth user experiences, clean interfaces, and reliable systems that make technology simple and enjoyable to use.",
    scrollRange: [0.6, 0.9],
  },
];

function Parallax2() {
  const { t, language } = useLanguage();
  const cvHref = language === 'en' ? "/taha-allay-en.pdf" : "/taha-allay-fr.pdf";
  const ref = useRef();

  // Mobile Carousel Logic
  const mobileSlides = [
    { text: t('about.hello'), img: img3 },
    { text: t('about.journey'), img: img1 },
    { text: t('about.focus'), img: img4 },
  ];
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % mobileSlides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [mobileSlides.length]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end start"],
  });

  const firstBoxY = useTransform(scrollYProgress, [0, 0.3], ["500px", "0px"]);
  const firstBoxOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  const secondBoxY = useTransform(scrollYProgress, [0.3, 0.6], ["500px", "0px"]);
  const secondBoxOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);

  const thirdBoxY = useTransform(scrollYProgress, [0.6, 0.7], ["400px", "0px"]);
  const thirdBoxOpacity = useTransform(scrollYProgress, [0.6, 0.7], [0, 1]);

  const leftColumnY = useTransform(scrollYProgress, [0, 1], ["-150px", "150px"]);
  const centerColumnY = useTransform(scrollYProgress, [0, 1], ["150px", "-150px"]);
  const rightColumnY = useTransform(scrollYProgress, [0, 1], ["-100px", "100px"]);

    return (
      <section
        data-index={3}
        ref={ref}
        style={{ minHeight: "100vh" }}
        className="darkSection bg-[#111111] max-md:overflow-y-hidden text-white"
      >
        {/* Mobile View (Carousel) */}
        <div className="md:hidden relative min-h-[100vh] flex flex-col items-center justify-center px-6 py-20">
            <div className="absolute top-10 left-6">
                <p className="text-[1.2rem] font-bold tracking-widest uppercase text-[#999] mb-2">
                    {t('about.biography')}
                </p>
                <h2 className="text-3xl font-extrabold">{t('about.title')}</h2>
            </div>

            <div className="relative w-full aspect-[4/5] mt-24 mb-10 overflow-hidden rounded-2xl shadow-2xl">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={currentSlide}
                        src={mobileSlides[currentSlide].img}
                        initial={{ opacity: 0, scale: 1.1, rotate: 2 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 0.95, rotate: -2 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full h-full object-cover brightness-[0.7] contrast-[1.1]"
                    />
                </AnimatePresence>
                
                {/* Visual Accent */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent opacity-60" />
            </div>

            <div className="w-full text-center min-h-[180px] flex flex-col items-center justify-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                        <p className="text-2xl font-light leading-relaxed mb-6">
                            {mobileSlides[currentSlide].text}
                        </p>
                        {currentSlide === 0 && (
                             <motion.a
                                href={cvHref}
                                download
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white text-sm tracking-[0.08em] uppercase font-medium rounded-md transition-all duration-300 hover:bg-white hover:text-[#111]"
                            >
                                <i className="fa-solid fa-download text-xs" />
                                Download CV
                            </motion.a>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Pagination Dots */}
            <div className="flex gap-3 mt-10">
                {mobileSlides.map((_, i) => (
                    <div 
                        key={i}
                        className={`h-1.5 rounded-full transition-all duration-500 ${i === currentSlide ? "w-8 bg-white" : "w-2 bg-white/20"}`}
                    />
                ))}
            </div>
        </div>

        {/* Desktop View (Original Parallax) */}
        <div className="hidden md:block">
          <div className="parallaxContainer min-h-[300vh] max-md:min-h-[250vh] relative flex items-center justify-around max-md:justify-center max-md:flex-col max-w-7xl mx-auto">
            <div className="sticky top-[10%] h-[100vh] w-1/2 relative max-md:w-full max-md:top-[30%] max-md:h-dvh">
              <p id="about-us" className="text-[1.5rem] font-bold tracking-widest uppercase text-[#999] mb-4 ">
                <span className="divider-line" />
                {t('about.biography')}
              </p>
              <h2 className="display mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold">
               {t('about.title')}
              </h2>
              <motion.div className="aboutMeImgContainer m-4">
                <motion.div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 flex items-center justify-start max-md:justify-center"
                >
                  <div className="flex gap-8 ml-10 max-md:gap-4 max-md:ml-0">
                    {/* العمود الأول */}
                    <motion.div style={{ y: leftColumnY }} className="grid gap-6 max-md:gap-4">
                      <div className="h-64 w-44 overflow-hidden rounded-lg grid gap-6">
                        <img
                          src={img3}
                          className="h-full w-full object-cover"
                          style={{ filter: "brightness(0.6) contrast(1.05)" }}
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg grid gap-6">
                        <img
                          src={img4}
                          className="h-full w-full object-cover"
                          style={{ filter: "brightness(0.6) contrast(1.05)" }}
                        />
                      </div>
                    </motion.div>
  
                    {/* العمود الثاني */}
                    <motion.div
                      style={{ y: centerColumnY }}
                      className="grid gap-6 max-md:gap-4"
                    >
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src={img1}
                          className="h-full w-full object-cover "
                          style={{ filter: "brightness(0.6) contrast(1.05)" }}
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src={img2}
                          className="h-full w-full object-cover"
                          style={{ filter: "brightness(0.6) contrast(1.05)" }}
                        />
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
            
            <div className="content flex flex-col gap-[30vh] max-md:gap-[4vh] relative z-10">
              <motion.div
                style={{ y: firstBoxY, opacity: firstBoxOpacity }}
                className="translate-y-[300px] min-h-[240px] h-auto w-full max-w-[600px] text-center max-md:mx-auto text-white"
              >
                <div className="text-3xl max-md:text-2xl font-light">
                    {t('about.hello')}
                </div>
                <a
                    href={cvHref}
                    download
                    className="inline-flex items-center gap-2 mt-8 px-6 py-3 border border-white/20 text-white text-sm tracking-[0.08em] uppercase font-medium rounded-md transition-all duration-300 hover:bg-white hover:text-[#111]"
                >
                    <i className="fa-solid fa-download text-xs" />
                    Download CV
                </a>
              </motion.div>

              <motion.div
                style={{ y: secondBoxY, opacity: secondBoxOpacity }}
                className="translate-y-[300px] min-h-[240px] h-auto w-full max-w-[600px] text-center max-md:mx-auto text-white"
              >
                <div className="text-3xl max-md:text-2xl font-light">
                    {t('about.journey')}
                </div>
              </motion.div>

              <motion.div
                style={{ y: thirdBoxY, opacity: thirdBoxOpacity }}
                className="translate-y-[300px] min-h-[240px] h-auto w-full max-w-[600px] text-center max-md:mx-auto text-white"
              >
                <div className="text-3xl max-md:text-2xl font-light">
                    {t('about.focus')}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    );
}

export default Parallax2;
