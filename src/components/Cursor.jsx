import React, { useEffect, useRef } from 'react';

const Cursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px';
        cursorRef.current.style.top = e.clientY + 'px';
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <div ref={cursorRef} className="fixed w-[12px] h-[12px] bg-black rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 z-[9999] transition-[transform,background] duration-[120ms,200ms] mix-blend-difference"></div>;
};

export default Cursor;
