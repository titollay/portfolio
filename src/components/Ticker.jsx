import React from 'react';

const Ticker = ({ topWords, botWords }) => {
  const buildTickerString = (words, repeat) => {
    const str = words.join(' · ');
    let full = '';
    for (let i = 0; i < repeat; i++) {
        full += str + ' · ';
    }
    return full;
  };

  const topString = buildTickerString(topWords, 4);
  const botString = buildTickerString(botWords, 3);

  return (
    <>
      <div className="absolute left-0 right-0 overflow-hidden pointer-events-none z-[5] whitespace-nowrap top-[46%]">
        <div className="inline-flex gap-0 animate-ticker-scroll">
          <span className="font-black-han uppercase inline-block px-[0.15em] text-black/80 leading-none tracking-[-0.02em] text-[clamp(40px,6vw,80px)]">{topString}</span>
          <span className="font-black-han uppercase inline-block px-[0.15em] text-black/80 leading-none tracking-[-0.02em] text-[clamp(40px,6vw,80px)]">{topString}</span>
        </div>
      </div>
      <div className="absolute left-0 right-0 h-[1px] bg-black/8 pointer-events-none z-[6] top-[calc(46%+clamp(40px,6vw,80px)+4px)]"></div>
      <div className="absolute left-0 right-0 overflow-hidden pointer-events-none z-[5] whitespace-nowrap top-[56%]">
        <div className="inline-flex gap-0 animate-ticker-scroll [animation-direction:reverse]">
          <span className="font-black-han uppercase inline-block px-[0.15em] text-black/8 leading-none tracking-[-0.02em] text-[clamp(60px,10vw,140px)]">{botString}</span>
          <span className="font-black-han uppercase inline-block px-[0.15em] text-black/8 leading-none tracking-[-0.02em] text-[clamp(60px,10vw,140px)]">{botString}</span>
        </div>
      </div>
    </>
  );
};

export default Ticker;
