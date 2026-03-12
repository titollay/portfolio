import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PageTransition() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Hide transition overlay after a short delay
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[100] bg-[#111] flex flex-col items-center justify-center text-[#f3f3f3] overflow-hidden"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 1.2, ease: [0.87, 0, 0.13, 1], delay: 0.5 }}
        >
          {/* Welcome Text animation */}
          <div className="overflow-hidden">
            <motion.h1 
              className="text-[10vw] md:text-[8vw] font-[800] uppercase tracking-tighter"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0.2 }}
              exit={{ opacity: 0 }}
            >
              TAHA ALLAY
            </motion.h1>
          </div>
          
          <div className="overflow-hidden mt-4">
             <motion.p
              className="text-sm md:text-xl font-light tracking-widest uppercase opacity-70"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0.4 }}
              exit={{ opacity: 0 }}
             >
               Digital Portfolio
             </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
