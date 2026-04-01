import React from 'react';
import CustomCursor from './components/Cursor';
import Navbar from './components/Nav';

import Hero from './components/HeroComponent';
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
  const { t, language } = useLanguage();
  return (
    <div dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <PageTransition />
      <CustomCursor />
      <Navbar />


      <section className="relative w-full h-[100vh]">
        <Hero />
      </section>
      <Parallax1 sectionName="Welcome" />
      <Parallax2 sectionName={"Parallax1"} />
      <SelectedWorks />
   <Skills/>
      <ImageMarquee />
      <Footer />
    </div>
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
