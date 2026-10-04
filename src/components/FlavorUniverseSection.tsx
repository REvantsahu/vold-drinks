import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Droplets } from 'lucide-react';
import { BEVERAGES } from '../data/beverages';
import { audioManager } from '../utils/audio';

export const FlavorUniverseSection: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const offset = direction === 'left' ? -380 : 380;
    scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    audioManager.playFizz();
  };

  return (
    <section id="flavors" className="relative py-24 sm:py-32 bg-[#090f0c] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-3">
              <Sparkles className="w-3.5 h-3.5 text-lime-400" />
              <span className="text-xs uppercase tracking-[0.2em] font-mono text-neutral-300 font-semibold">
                Sensory Voyage
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight">
              The Flavor <span className="bg-gradient-to-r from-amber-400 via-lime-400 to-emerald-400 bg-clip-text text-transparent">Universe</span>
            </h2>
            <p className="text-base text-neutral-300 mt-3 max-w-xl">
              Swipe or explore through each crafted flavor profile. Experience the distinct nuances of cold-pressed fruits and mountain effervescence.
            </p>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll('left')}
              className="p-3.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 hover:border-lime-400 text-white transition-all cursor-pointer shadow-md"
              aria-label="Scroll flavors left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-3.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 hover:border-lime-400 text-white transition-all cursor-pointer shadow-md"
              aria-label="Scroll flavors right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Carousel (accessible touch & mouse scroll, non-trapping) */}
      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto pb-8 pt-4 px-4 sm:px-8 lg:px-16 scrollbar-none snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {BEVERAGES.map((bev, index) => (
          <div
            key={bev.id}
            className="shrink-0 w-[300px] sm:w-[360px] snap-center group relative rounded-3xl bg-neutral-900/80 border border-white/10 p-6 backdrop-blur-xl transition-all duration-500 hover:border-lime-400/50 hover:shadow-[0_15px_40px_rgba(0,0,0,0.6)] flex flex-col justify-between overflow-hidden"
          >
            {/* Background color glow on hover */}
            <div
              className="absolute -top-16 -right-16 w-48 h-48 rounded-full opacity-25 filter blur-3xl group-hover:opacity-60 transition-opacity duration-500"
              style={{ backgroundColor: bev.accentHex }}
            />

            {/* Top Bar inside card */}
            <div className="flex items-center justify-between mb-4 relative z-10">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-400">
                0{index + 1} // {bev.id}
              </span>
              <span
                className="text-[11px] font-bold px-2.5 py-0.5 rounded-full text-white"
                style={{ backgroundColor: bev.accentHex }}
              >
                {bev.realFruitPercent} Pure Fruit
              </span>
            </div>

            {/* Product Centerpiece image */}
            <div className="relative my-4 flex items-center justify-center h-64 overflow-hidden rounded-2xl bg-black/40 p-2">
              <img
                src={bev.glassImage}
                alt={bev.name}
                loading="lazy"
                className="w-full h-full object-cover rounded-xl filter contrast-[1.05] group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-3 left-3 right-3 text-left">
                <span className="text-xs text-lime-300 font-mono font-semibold">{bev.flavor}</span>
                <h3 className="text-lg font-bold text-white tracking-tight">{bev.headline}</h3>
              </div>
            </div>

            {/* Card Content & Tasting Notes */}
            <div className="relative z-10 pt-2">
              <p className="text-xs text-neutral-300 line-clamp-2 mb-4 leading-relaxed">
                {bev.description}
              </p>

              <div className="border-t border-white/10 pt-4 flex items-center justify-between text-xs font-mono text-neutral-400">
                <div className="flex items-center gap-1.5">
                  <Droplets className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{bev.volume}</span>
                </div>
                <div className="font-bold text-white">
                  {bev.calories}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
