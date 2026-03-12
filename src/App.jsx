import React from 'react';
import CustomCursor from './components/Cursor';
import Navbar from './components/Nav';
import WavyBackground from './components/WavyBackground';
import Hero from './components/HeroComponent';
import Ticker from './components/Ticker';
import Parallax1 from './parallax/parallax1';
import SelectedWorks from './components/SelectedWorks';
import Services from './components/Skils';
import ImageMarquee from './components/ImageMarquee';
import Footer from './components/Footer';
import PageTransition from './components/PageTransition';
import Parallax2 from './parallax/Parallax2';
import Skills from './components/Skils';

import { LanguageProvider, useLanguage } from './context/LanguageContext';

function AppContent() {
  const { t } = useLanguage();
  const topWords = [t('hero.tagline') + ' ', t('hero.branding') + ' ', t('hero.productDesign') + ' ', t('hero.webDesign') + ' ', t('hero.marketing') + ' '];
  const botWords = [t('hero.webDesign') + ' ', t('hero.productDesign') + ' ', t('hero.branding') + ' ', t('hero.marketing') + ' '];

  return (
    <>
      <PageTransition />
      <CustomCursor />
      <Navbar />

      <WavyBackground />
      <section className="relative w-full h-[100vh]">
        <Hero />
        <Ticker topWords={topWords} botWords={botWords} />
      </section>
      <Parallax1 sectionName="Welcome" />
      <Parallax2 sectionName={"Parallax1"} />
      <SelectedWorks />
   <Skills/>
      <ImageMarquee />
      <Footer />
    </>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}


export default App; // Trigger HMR
