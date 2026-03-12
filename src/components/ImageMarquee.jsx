import React from 'react';
import { motion } from 'framer-motion';
import marquee1 from '../assets/marquee1.png';
import marquee2 from '../assets/marquee2.png';
import marquee3 from '../assets/marquee3.png';

export default function ImageMarquee() {
  const images = [marquee1, marquee2, marquee3];
  
  // We duplicate the array to create an infinite loop effect
  const marqueeItems = [...images, ...images, ...images, ...images];

  return (
    <section className="w-full bg-[#111] py-20 overflow-hidden relative z-[15]">
      <div className="flex w-fit animate-[marquee_40s_linear_infinite] hover:[animation-play-state:paused] cursor-none">
        {marqueeItems.map((imgSrc, idx) => (
          <div 
            key={idx} 
            className="w-[60vw] md:w-[40vw] max-w-[800px] flex-shrink-0 px-4"
          >
            <div className="w-full relative pt-[60%] overflow-hidden rounded-md group">
              <img 
                src={imgSrc} 
                alt={`Portfolio Marquee ${idx}`}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.87,0,0.13,1)] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
