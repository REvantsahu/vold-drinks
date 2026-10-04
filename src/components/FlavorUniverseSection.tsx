import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Droplets, ArrowRight } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { audioManager } from '../utils/audio';

interface FlavorUniverseSectionProps {
  onSelectBeverage?: (id: string) => void;
}

export const FlavorUniverseSection: React.FC<FlavorUniverseSectionProps> = ({ onSelectBeverage }) => {
  const { cmsData } = useCms();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentCardIdx, setCurrentCardIdx] = useState(0);

  const total = cmsData.beverages.length;

  const scrollToCard = (index: number) => {
    const targetIdx = Math.max(0, Math.min(total - 1, index));
    setCurrentCardIdx(targetIdx);

    const container = scrollContainerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll<HTMLElement>('.flavor-card');
    if (cards[targetIdx]) {
      const card = cards[targetIdx];
      const containerWidth = container.clientWidth;
      const cardWidth = card.clientWidth;
      const scrollLeft = card.offsetLeft - (containerWidth / 2 - cardWidth / 2);

      container.scrollTo({
        left: Math.max(0, scrollLeft),
        behavior: 'smooth',
      });
    }

    audioManager.playIceClink();
  };

  const handleNext = () => {
    const nextIdx = (currentCardIdx + 1) % total;
    scrollToCard(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = (currentCardIdx - 1 + total) % total;
    scrollToCard(prevIdx);
  };

  const handleCardClick = (bevId: string, idx: number) => {
    setCurrentCardIdx(idx);
    if (onSelectBeverage) {
      onSelectBeverage(bevId);
    }
    const drinksSection = document.getElementById('drinks');
    if (drinksSection) {
      drinksSection.scrollIntoView({ behavior: 'smooth' });
    }
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
              Swipe or click below to explore each crafted profile. Experience the distinct nuances of cold-pressed fruits and mountain effervescence.
            </p>
          </div>

          {/* Carousel Navigation Buttons */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrev}
              className="p-3.5 rounded-full bg-white/10 hover:bg-lime-400 hover:text-black border border-white/15 text-white transition-all cursor-pointer shadow-lg active:scale-95"
              aria-label="Previous flavor"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="p-3.5 rounded-full bg-white/10 hover:bg-lime-400 hover:text-black border border-white/15 text-white transition-all cursor-pointer shadow-lg active:scale-95"
              aria-label="Next flavor"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Carousel with data-lenis-prevent to prevent scroll hijacking */}
      <div
        ref={scrollContainerRef}
        data-lenis-prevent="true"
        className="flex gap-6 overflow-x-auto pb-8 pt-4 px-4 sm:px-8 lg:px-16 scrollbar-none snap-x snap-mandatory select-none"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {cmsData.beverages.map((bev, index) => {
          const isActive = currentCardIdx === index;
          return (
            <div
              key={bev.id}
              onClick={() => handleCardClick(bev.id, index)}
              className={`flavor-card shrink-0 w-[300px] sm:w-[360px] snap-center group relative rounded-3xl bg-neutral-900/80 border p-6 backdrop-blur-xl transition-all duration-500 cursor-pointer flex flex-col justify-between overflow-hidden ${
                isActive
                  ? 'border-lime-400/80 shadow-[0_15px_40px_rgba(132,204,22,0.2)] scale-[1.02]'
                  : 'border-white/10 hover:border-white/30'
              }`}
            >
              {/* Background color glow on hover */}
              <div
                className="absolute -top-16 -right-16 w-48 h-48 rounded-full opacity-25 filter blur-3xl group-hover:opacity-60 transition-opacity duration-500 pointer-events-none"
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-80" />
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

                {/* Working Action Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardClick(bev.id, index);
                  }}
                  className="mt-4 w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-lime-400 hover:text-black text-white text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span>Explore Recipe &amp; Specs</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Direct Dot Pagination Indicators */}
      <div className="flex items-center justify-center gap-2 mt-4">
        {cmsData.beverages.map((bev, idx) => (
          <button
            key={bev.id}
            onClick={() => scrollToCard(idx)}
            className={`transition-all rounded-full cursor-pointer ${
              currentCardIdx === idx
                ? 'w-8 h-2.5 bg-lime-400'
                : 'w-2.5 h-2.5 bg-white/20 hover:bg-white/40'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
