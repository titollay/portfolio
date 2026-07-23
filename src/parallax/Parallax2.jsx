import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import img1 from "../assets/bg10.jpg";
import img2 from "../assets/bg11.jpg";
import img3 from "../assets/bg15.webp";
import img4 from "../assets/bg16.webp";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

const IMG_STYLE = { filter: "brightness(0.6) contrast(1.05)" };

const ColImg = ({ src, alt }) => (
  <div className="h-48 w-36 overflow-hidden rounded-lg shadow-lg">
    <img
      src={src}
      className="h-full w-full object-cover"
      style={IMG_STYLE}
      alt={alt}
    />
  </div>
);

function Parallax2() {
  const { t, language } = useLanguage();
  const cvHref = language === 'ar' ? "/taha-allay-ar.pdf" :
                 language === 'fr' ? "/taha-allay-fr.pdf" :
                 "/taha-allay-en.pdf";

  const ref = useRef();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end start"],
  });

  const makeAnim = (range) => ({
    y: useTransform(scrollYProgress, range, ["400px", "0px"]),
    opacity: useTransform(scrollYProgress, range, [0, 1]),
  });

  const anims = [
    makeAnim([0, 0.3]),
    makeAnim([0.3, 0.6]),
    makeAnim([0.6, 0.7]),
  ];

  const leftY  = useTransform(scrollYProgress, [0, 1], ["-150px", "150px"]);
  const centerY = useTransform(scrollYProgress, [0, 1], ["150px", "-150px"]);

  const texts = [
    t('about.hello'),
    t('about.journey'),
    t('about.focus'),
  ];

  return (
    <section
      data-index={3}
      ref={ref}
      className="darkSection bg-[#111] max-md:overflow-hidden text-white"
      style={{ minHeight: "100vh" }}
    >
      <div className="min-h-[120vh] max-md:min-h-screen relative flex items-center justify-around max-md:justify-center max-md:flex-col max-w-7xl mx-auto">

        {/* ── Left: sticky images — desktop only ── */}
        <div className="hidden md:block sticky top-[10%] h-screen w-1/2">
          <p
            id="about-us"
            className="text-md uppercase tracking-[0.3em] text-[#888788] mb-4"
          >
            <span className="divider-line" />
            {t('about.biography')}
          </p>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold max-md:mb-10 text-white">
            {t('about.title')}
          </h2>

          <div className="m-4 max-md:m-0 max-md:h-[50vh] max-md:relative">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 flex items-center justify-start max-md:justify-center"
            >
              <div className="flex gap-8 ml-10 max-md:gap-4 max-md:ml-0">
                <motion.div style={{ y: leftY }} className="grid gap-4 max-md:[transform:none!important]">
                  <ColImg src={img3} alt="Portfolio visual 1" />
                  <ColImg src={img4} alt="Portfolio visual 2" />
                </motion.div>
                <motion.div style={{ y: centerY }} className="grid gap-4 max-md:[transform:none!important]">
                  <ColImg src={img1} alt="Portfolio visual 3" />
                  <ColImg src={img2} alt="Portfolio visual 4" />
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right: animated text blocks — desktop only ── */}
        <div className="flex flex-col gap-[10vh] relative z-10 max-md:hidden">
          <motion.div
            style={anims[0]}
            className="min-h-[200px] h-auto w-full max-w-[600px] text-center flex flex-col items-center justify-center"
          >
            <p className="text-2xl font-light text-white mb-6">{texts[0]}</p>
            <a
              href={cvHref}
              download
              className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white text-sm tracking-[0.08em] uppercase font-medium rounded-md transition-all duration-300 hover:bg-white hover:text-[#111]"
            >
              <i className="fa-solid fa-download text-xs" />
              {t('hero.downloadCV') || 'Download CV'}
            </a>
          </motion.div>

          {texts.slice(1).map((text, i) => (
            <motion.div
              key={i + 1}
              style={anims[i + 1]}
              className="min-h-[200px] h-auto w-full max-w-[600px] text-center flex items-center justify-center"
            >
              <p className="text-2xl font-light text-white">{text}</p>
            </motion.div>
          ))}
        </div>

        {/* ── Mobile: Swiper with images + text + CV button ── */}
        <div className="md:hidden w-full px-4 pt-20 pb-12">
          <p
            className="text-xs uppercase tracking-[0.3em] text-[#888788] mb-3"
          >
            <span className="divider-line" />
            {t('about.biography')}
          </p>
          <h2 className="text-2xl font-extrabold text-white mb-6">
            {t('about.title')}
          </h2>

          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            loop
            slidesPerView={1}
            className="w-full rounded-2xl overflow-hidden"
            style={{ paddingBottom: "2.5rem" }}
          >
            {/* Slide 1 — first text + CV button */}
            <SwiperSlide>
              <div className="flex flex-col">
                <div className="w-full aspect-[4/3] overflow-hidden rounded-2xl">
                  <img src={img1} alt="about 1" className="w-full h-full object-cover" style={IMG_STYLE} />
                </div>
                <div className="pt-6 px-2 text-center flex flex-col items-center gap-4">
                  <p className="text-base font-medium text-white leading-relaxed">{texts[0]}</p>
                  <a
                    href={cvHref}
                    download
                    className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/20 text-white text-xs tracking-[0.08em] uppercase font-medium rounded-md transition-all duration-300 hover:bg-white hover:text-[#111]"
                  >
                    <i className="fa-solid fa-download text-xs" />
                    {t('hero.downloadCV') || 'Download CV'}
                  </a>
                </div>
              </div>
            </SwiperSlide>

            {/* Slide 2 */}
            <SwiperSlide>
              <div className="flex flex-col">
                <div className="w-full aspect-[4/3] overflow-hidden rounded-2xl">
                  <img src={img2} alt="about 2" className="w-full h-full object-cover" style={IMG_STYLE} />
                </div>
                <div className="pt-6 px-2 text-center">
                  <p className="text-base font-medium text-white leading-relaxed">{texts[1]}</p>
                </div>
              </div>
            </SwiperSlide>

            {/* Slide 3 */}
            <SwiperSlide>
              <div className="flex flex-col">
                <div className="w-full aspect-[4/3] overflow-hidden rounded-2xl">
                  <img src={img3} alt="about 3" className="w-full h-full object-cover" style={IMG_STYLE} />
                </div>
                <div className="pt-6 px-2 text-center">
                  <p className="text-base font-medium text-white leading-relaxed">{texts[2]}</p>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>

      </div>
    </section>
  );
}

export default Parallax2;
