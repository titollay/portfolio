import React, { useEffect, useRef } from 'react';

const WavyBackground = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const W0 = window.innerWidth;
    const H0 = window.innerHeight;
    svg.setAttribute('viewBox', `0 0 ${W0} ${H0}`);
    svg.setAttribute('width', W0);
    svg.setAttribute('height', H0);

    const COLS = 28;
    const colW = W0 / (COLS - 1);

    // Clean up any previously created paths from strict mode re-renders
    let existingPaths = svg.querySelectorAll('path');
    existingPaths.forEach(p => p.remove());

    const paths = [];

    for (let c = 0; c < COLS; c++) {
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      // Apply Tailwind classes instead of custom CSS class
      path.setAttribute('class', 'fill-none stroke-black stroke-1');
      const phase = c * 0.6;
      const amp = 18 + Math.random() * 14;
      const freq = 0.006 + Math.random() * 0.004;
      const x0 = c * colW;
      let d = `M ${x0} 0`;
      for (let y = 0; y <= H0; y += 6) {
        const x = x0 + Math.sin(y * freq + phase) * amp;
        d += ` L ${x.toFixed(1)} ${y}`;
      }
      path.setAttribute('d', d);
      path.style.animationDelay = `${(c * 0.12).toFixed(2)}s`;
      svg.appendChild(path);
      paths.push({ el: path, c });
    }

    let t = 0;
    let animationFrameId;

    const animateWaves = () => {
      t += 0.008;
      paths.forEach(({ el, c }) => {
        const phase = c * 0.6 + t;
        const amp = 18 + Math.sin(c * 0.4) * 6;
        const freq = 0.006 + (c % 3) * 0.001;
        const x0 = c * colW;
        let d = `M ${x0} 0`;
        for (let y = 0; y <= H0; y += 8) {
          const x = x0 + Math.sin(y * freq + phase) * amp;
          d += ` L ${x.toFixed(1)} ${y}`;
        }
        el.setAttribute('d', d);
      });
      animationFrameId = requestAnimationFrame(animateWaves);
    };

    animateWaves();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <svg ref={svgRef} className="absolute inset-0 z-0 pointer-events-none opacity-[0.18] w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice"></svg>
  );
};

export default WavyBackground;
