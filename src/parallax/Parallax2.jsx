import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import img1 from "../assets/bg10.jpg"; // Fallback to existing asset
import img2 from "../assets/bg11.jpg"; // Fallback to existing asset
import img3 from "../assets/bg15.jpg"; // Fallback to existing asset 
import img4 from "../assets/bg16.jpg"; // Fallback to existing asset
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
  const { t } = useLanguage();
  const ref = useRef();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end start"],
  });

  const firstBoxY = useTransform(scrollYProgress, [0, 0.3], ["500px", "0px"]);
  const firstBoxOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  const secondBoxY = useTransform(
    scrollYProgress,
    [0.3, 0.6],
    ["500px", "0px"]
  );
  const secondBoxOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);

  const thirdBoxY = useTransform(scrollYProgress, [0.6, 0.7], ["400px", "0px"]);
  const thirdBoxOpacity = useTransform(scrollYProgress, [0.6, 0.7], [0, 1]);

  const leftColumnY = useTransform(
    scrollYProgress,
    [0, 1],
    ["-150px", "150px"]
  );
  const centerColumnY = useTransform(
    scrollYProgress,
    [0, 1],
    ["150px", "-150px"]
  );
  const rightColumnY = useTransform(
    scrollYProgress,
    [0, 1],
    ["-100px", "100px"]
  );
  
  return (
    <>
      <section
        
        data-index={3}
        ref={ref}
        style={{ minHeight: "100vh" }}
        className="darkSection bg-[#111111] max-md:overflow-y-hidden text-white"
      >
        <div  className="parallaxContainer min-h-[300vh]  max-md:min-h-[250vh] relative flex items-center justify-around max-md:justify-center max-md:flex-col max-w-7xl mx-auto">
          <div class="sticky top-[10%] h-[100vh] w-1/2 relative max-md:w-full max-md:top-[30%]   max-md:h-dvh">
            <p id="about-us" className="text-[1.5rem] font-bold tracking-widest uppercase text-[#999] mb-4 ">
              <span className="divider-line" />
              {t('about.biography')}
            </p>
            <h2 className="display mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold">
             {t('about.title')}
            </h2>
            <motion.div  className="aboutMeImgContainer m-4">
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 flex items-center justify-start max-md:justify-center"
              >
                <div class="flex gap-8 ml-10  max-md:gap-4 max-md:ml-0">
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
          

          <div className="content flex flex-col gap-[30vh] max-md:gap-[8vh] relative z-10">
            <motion.div
    style={{ y: firstBoxY, opacity: firstBoxOpacity }}
    className="translate-y-[300px] min-h-[240px] h-auto w-full max-w-[600px] text-center max-md:mx-auto text-white"
  >
    <div className="text-3xl font-light">
      {t('about.hello')}
    </div>
    <a
      href="/cv.pdf"
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
              <div className="text-3xl font-light">
                 {t('about.journey')}
              </div>
            </motion.div>
            <motion.div
              style={{ y: thirdBoxY, opacity: thirdBoxOpacity }}
              className="translate-y-[300px] min-h-[240px] h-auto w-full max-w-[600px] text-center max-md:mx-auto text-white"
            >
              <div className="text-3xl font-light">
                {t('about.focus')}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Parallax2;
