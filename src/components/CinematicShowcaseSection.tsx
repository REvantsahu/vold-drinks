import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { audioManager } from '../utils/audio';

export const CinematicShowcaseSection: React.FC = () => {
  const [rotationIndex, setRotationIndex] = useState(0);

  const showcaseFrames = [
    {
      title: 'Valencia Orange',
      subtitle: 'Crisp Citrus Radiance',
      image: '/images/flavor-orange-glass.jpg',
      quote: 'Sunlight bottled in crystal-clear effervescence.',
      accent: '#f97316',
    },
    {
      title: 'Alphonso Mango',
      subtitle: 'Liquid Tropical Gold',
      image: '/images/flavor-mango-glass.jpg',
      quote: 'Smooth velvety nectar with a bright carbonated finish.',
      accent: '#eab308',
    },
    {
      title: 'Wild Strawberry',
      subtitle: 'Alpine Mountain Berry',
      image: '/images/flavor-strawberry-glass.jpg',
      quote: 'Delicate summer sweetness balanced with botanicals.',
      accent: '#ef4444',
    },
    {
      title: 'Lime Mint Cooler',
      subtitle: 'Electric Herbal Crispness',
      image: '/images/flavor-lemon-mint-glass.jpg',
      quote: 'Zesty sharp citrus and cooling field spearmint.',
      accent: '#84cc16',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setRotationIndex((prev) => (prev + 1) % showcaseFrames.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [showcaseFrames.length]);

  const current = showcaseFrames[rotationIndex];

  return (
    <section className="relative min-h-[95vh] w-full py-24 flex items-center justify-center bg-black overflow-hidden">
      {/* Dynamic atmospheric backlighting */}
      <div
        className="absolute inset-0 opacity-20 filter blur-[120px] transition-colors duration-1000 pointer-events-none"
        style={{ backgroundColor: current.accent }}
      />

      {/* Oversized background editorial watermark typography */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none opacity-5">
        <span className="text-[18vw] font-black tracking-tighter text-white whitespace-nowrap">
          VOLD DRINKS
        </span>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-3">
            <Sparkles className="w-3.5 h-3.5 text-lime-400" />
            <span className="text-xs uppercase tracking-[0.2em] font-mono text-neutral-300 font-semibold">
              Cinematic Masterpiece
            </span>
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight uppercase">
            Elevate Your <span className="text-lime-400">Senses</span>
          </h2>
        </div>

        {/* Dynamic Centerpiece Presentation */}
        <div className="relative max-w-4xl mx-auto rounded-3xl bg-neutral-900/40 border border-white/15 p-6 sm:p-10 backdrop-blur-2xl shadow-2xl flex flex-col md:flex-row items-center gap-8 lg:gap-12">
          {/* Glass Feature Image */}
          <div className="relative w-full md:w-1/2 flex items-center justify-center">
            <div
              className="absolute inset-0 rounded-full filter blur-2xl opacity-40 transition-colors duration-700"
              style={{ backgroundColor: current.accent }}
            />
            <div className="relative z-10 h-[360px] sm:h-[420px] w-full flex items-center justify-center">
              <img
                key={current.title}
                src={current.image}
                alt={current.title}
                className="h-full w-auto object-contain rounded-2xl drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)] animate-fadeIn transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>

          {/* Right Description */}
          <div className="w-full md:w-1/2 flex flex-col items-start text-left">
            <span
              className="text-xs font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-md text-white mb-2"
              style={{ backgroundColor: current.accent }}
            >
              Frame 0{rotationIndex + 1}
            </span>

            <h3 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
              {current.title}
            </h3>
            <p className="text-sm font-semibold text-lime-300 mb-4">{current.subtitle}</p>

            <blockquote className="border-l-2 border-lime-400 pl-4 py-1 italic text-neutral-200 text-base mb-6">
              "{current.quote}"
            </blockquote>

            {/* Frame Selector Buttons */}
            <div className="flex items-center gap-2 mb-6">
              {showcaseFrames.map((frame, idx) => (
                <button
                  key={frame.title}
                  onClick={() => {
                    setRotationIndex(idx);
                    audioManager.playIceClink();
                  }}
                  className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
                    rotationIndex === idx
                      ? 'w-8 bg-lime-400 ring-2 ring-lime-400/40'
                      : 'bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`View ${frame.title}`}
                />
              ))}
            </div>

            <a
              href="#drinks"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm transition-all"
            >
              <span>Explore Entire Collection</span>
              <ArrowUpRight className="w-4 h-4 text-lime-400" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
