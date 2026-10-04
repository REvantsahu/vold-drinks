import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { BEVERAGES } from '../data/beverages';
import type { Beverage } from '../data/beverages';
import { audioManager } from '../utils/audio';
import { HeroInteractiveCanvas } from './HeroInteractiveCanvas';
import { InstagramIcon, FacebookIcon, YoutubeIcon } from './SocialIcons';

interface HeroSectionProps {
  onExploreClick: () => void;
  onStoryClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreClick, onStoryClick }) => {
  const [selectedBeverage, setSelectedBeverage] = useState<Beverage>(BEVERAGES[0]);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse tilt effect for 3D glass interaction
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 768) return; // Disable expensive 3D on small mobile screens
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 16; // -8 to 8 deg
      const y = (e.clientY / innerHeight - 0.5) * -16; // -8 to 8 deg
      setTilt({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleFlavorSelect = (bev: Beverage) => {
    setSelectedBeverage(bev);
    audioManager.playIceClink();
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-20 pb-16 lg:py-0 select-none"
      style={{
        background: 'radial-gradient(ellipse at 50% 40%, rgba(18, 38, 25, 0.4) 0%, rgba(6, 13, 8, 0.95) 100%)',
      }}
    >
      {/* Layer 0: High-Res Cinematic Background with subtle parallax */}
      <div
        className="absolute inset-0 pointer-events-none transition-transform duration-700 ease-out z-0 scale-105"
        style={{
          transform: `translate(${tilt.x * 0.4}px, ${-tilt.y * 0.4}px)`,
        }}
      >
        <img
          src="/images/hero-waterfall-bg.jpg"
          alt="Lush tropical rainforest waterfall background"
          fetchPriority="high"
          className="w-full h-full object-cover object-center filter brightness-[0.78] contrast-[1.08] saturate-[1.15]"
        />
        {/* Cinematic Vignette & Atmospheric Color Wash */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#060b08] via-transparent to-[#060b08]/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#060b08]/80 via-transparent to-[#060b08]/60" />
        {/* Dynamic flavor aura glow */}
        <div
          className="absolute inset-0 opacity-25 transition-colors duration-1000 mix-blend-color-dodge"
          style={{ backgroundColor: selectedBeverage.accentHex }}
        />
      </div>

      {/* Layer 1: Universal 60fps Interactive Canvas (Ice cubes, bubbles, particle caustics) */}
      <HeroInteractiveCanvas accentColor={selectedBeverage.accentHex} />

      {/* Layer 2: Left Vertical Social Icons */}
      <div className="hidden lg:flex fixed left-6 top-1/2 -translate-y-1/2 z-30 flex-col items-center gap-5 text-neutral-300">
        <a
          href="https://instagram.com/voldbeverages"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 rounded-full bg-black/30 border border-white/10 hover:border-lime-400 hover:text-lime-400 hover:scale-110 transition-all backdrop-blur-md"
          aria-label="VOLD Beverages Instagram"
        >
          <InstagramIcon className="w-4 h-4" />
        </a>
        <a
          href="https://facebook.com/voldbeverages"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 rounded-full bg-black/30 border border-white/10 hover:border-lime-400 hover:text-lime-400 hover:scale-110 transition-all backdrop-blur-md"
          aria-label="VOLD Beverages Facebook"
        >
          <FacebookIcon className="w-4 h-4" />
        </a>
        <a
          href="https://youtube.com/@voldbeverages"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 rounded-full bg-black/30 border border-white/10 hover:border-lime-400 hover:text-lime-400 hover:scale-110 transition-all backdrop-blur-md"
          aria-label="VOLD Beverages YouTube"
        >
          <YoutubeIcon className="w-4 h-4" />
        </a>
        <div className="w-[1px] h-12 bg-white/20 mt-2" />
      </div>

      {/* Layer 3: Right Vertical Section Progress Indicator (01 - 05) */}
      <div className="hidden lg:flex fixed right-8 top-1/2 -translate-y-1/2 z-30 flex-col items-center gap-4 text-xs font-mono">
        {[
          { num: '01', active: true },
          { num: '02', active: false },
          { num: '03', active: false },
          { num: '04', active: false },
          { num: '05', active: false },
        ].map((item, idx) => (
          <div key={item.num} className="flex items-center gap-2 group cursor-pointer">
            <span className={`transition-colors ${item.active ? 'text-lime-400 font-bold' : 'text-neutral-500'}`}>
              {item.num}
            </span>
            <div
              className={`w-2 h-2 rounded-full transition-all ${
                item.active
                  ? 'bg-lime-400 ring-4 ring-lime-400/25 scale-125'
                  : 'bg-neutral-600 group-hover:bg-neutral-400'
              }`}
            />
            {idx < 4 && <div className="absolute w-[1px] h-4 bg-white/10" />}
          </div>
        ))}
      </div>

      {/* Main Container Content */}
      <div className="relative z-20 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">
          
          {/* Left Column: Brand Typography & Controls */}
          <div className="lg:col-span-5 flex flex-col items-start z-20 text-left">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 border border-white/15 backdrop-blur-md mb-4 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-lime-400 animate-ping" />
              <span className="text-xs uppercase tracking-[0.22em] text-neutral-200 font-semibold font-mono">
                Pure Taste. Real Refreshment.
              </span>
            </div>

            {/* Main Editorial Headline with Leaf Mark */}
            <div className="relative mb-5">
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.04] text-white">
                Refresh
                <span className="inline-block relative text-lime-400 ml-1">
                  {/* Decorative Leaf Icon sitting gracefully on the typography */}
                  <svg
                    className="absolute -top-6 -right-5 sm:-top-7 sm:-right-6 w-9 h-9 sm:w-11 sm:h-11 text-lime-400 filter drop-shadow-[0_2px_8px_rgba(132,204,22,0.6)] animate-float-slow"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
                  </svg>
                </span>
                <br />
                <span className="bg-gradient-to-r from-white via-neutral-100 to-lime-200 bg-clip-text text-transparent">
                  Your World
                </span>
              </h1>
            </div>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-neutral-200/90 font-normal leading-relaxed max-w-md mb-8 drop-shadow-sm">
              Delicious, natural and refreshing beverages made for every moment of your day. 
              Infused with cold-pressed real fruit and sparkling mountain spring water.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <button
                onClick={onExploreClick}
                className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full text-base font-semibold text-white bg-black/60 hover:bg-black/80 border border-lime-500/40 hover:border-lime-400 backdrop-blur-md shadow-[0_4px_25px_rgba(132,204,22,0.25)] hover:shadow-[0_6px_30px_rgba(132,204,22,0.45)] transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Explore Our Drinks</span>
                <ArrowRight className="w-4 h-4 text-lime-400 group-hover:translate-x-1.5 transition-transform" />
              </button>

              <button
                onClick={onStoryClick}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full text-sm font-medium text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md transition-all cursor-pointer"
              >
                <span>Discover Our Story</span>
              </button>
            </div>

            {/* Flavor Selector Dock (4 Cards) */}
            <div className="w-full">
              <div className="text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-2.5 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-lime-400" />
                <span>Select Signature Flavor:</span>
              </div>
              <div className="grid grid-cols-4 gap-2.5 sm:gap-3 max-w-md">
                {BEVERAGES.map((bev) => {
                  const isSelected = selectedBeverage.id === bev.id;
                  return (
                    <button
                      key={bev.id}
                      onClick={() => handleFlavorSelect(bev)}
                      className={`group relative flex flex-col items-center p-2 rounded-2xl transition-all duration-300 cursor-pointer text-center ${
                        isSelected
                          ? 'bg-black/65 border-2 border-lime-400 shadow-[0_0_20px_rgba(132,204,22,0.35)] scale-105'
                          : 'bg-black/35 border border-white/10 hover:border-white/30 hover:bg-black/50'
                      }`}
                    >
                      {/* Thumbnail Container */}
                      <div className="w-12 h-14 sm:w-14 sm:h-16 rounded-xl overflow-hidden mb-1.5 bg-black/40 flex items-center justify-center p-0.5 relative">
                        <img
                          src={bev.thumbImage}
                          alt={bev.name}
                          className="w-full h-full object-cover rounded-lg group-hover:scale-110 transition-transform duration-300"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = bev.glassImage;
                          }}
                        />
                      </div>
                      <span
                        className={`text-[11px] sm:text-xs font-semibold tracking-tight transition-colors line-clamp-1 ${
                          isSelected ? 'text-lime-300 font-bold' : 'text-neutral-300 group-hover:text-white'
                        }`}
                      >
                        {bev.id === 'lemon-mint' ? 'Lemon Mint' : bev.name.split(' ')[1]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Center Column: The Signature 3D Interactive Beverage Centerpiece */}
          <div className="lg:col-span-7 relative flex items-center justify-center min-h-[440px] sm:min-h-[520px] lg:min-h-[620px]">
            {/* Parallax Container with 3D Tilt */}
            <div
              className="relative w-full max-w-[420px] sm:max-w-[480px] lg:max-w-[540px] flex items-center justify-center transition-transform duration-300 ease-out"
              style={{
                perspective: '1000px',
                transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
              }}
            >
              {/* Backlight Ambient Glow tailored to flavor */}
              <div
                className="absolute inset-0 rounded-full blur-[80px] opacity-60 transition-colors duration-700 pointer-events-none scale-90"
                style={{ backgroundColor: selectedBeverage.accentHex }}
              />

              {/* Centerpiece Beverage Glass Art with Condensation & Splash */}
              <div className="relative z-10 w-full flex items-center justify-center">
                <img
                  src={selectedBeverage.glassImage}
                  alt={selectedBeverage.name}
                  fetchPriority="high"
                  className="w-full h-auto max-h-[560px] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.85)] filter contrast-[1.05] saturate-[1.1] transition-all duration-500 transform hover:scale-[1.02]"
                />

                {/* Subtle Brand Watermark on the Glass matching the mockup */}
                <div className="absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none text-center opacity-85 mix-blend-overlay">
                  <span className="block font-sans font-black text-2xl sm:text-3xl tracking-[0.25em] text-white">
                    VOLD
                  </span>
                  <span className="block font-sans font-bold text-[8px] sm:text-[9px] tracking-[0.35em] text-white/90">
                    BEVERAGES
                  </span>
                </div>
              </div>

              {/* Playful Handwritten Script on the right: "Good Drinks Brighter Days!" with Sun Doodle */}
              <div className="absolute -right-2 sm:-right-8 top-16 sm:top-20 z-20 pointer-events-none transform rotate-3 hidden sm:block">
                <div className="flex items-start gap-2">
                  <div className="text-right">
                    <p className="font-script text-2xl sm:text-3xl text-white font-bold leading-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
                      Good<br />Drinks<br />
                      <span className="text-amber-300">Brighter<br />Days!</span>
                    </p>
                  </div>
                  {/* Sun doodle SVG */}
                  <svg className="w-9 h-9 text-amber-300 animate-spin" style={{ animationDuration: '24s' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="4" fill="currentColor" fillOpacity="0.3" />
                    <path d="M12 2v2" />
                    <path d="M12 20v2" />
                    <path d="m4.93 4.93 1.41 1.41" />
                    <path d="m17.66 17.66 1.41 1.41" />
                    <path d="M2 12h2" />
                    <path d="M20 12h2" />
                    <path d="m6.34 17.66-1.41 1.41" />
                    <path d="m19.07 4.93-1.41 1.41" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator matching mockup */}
      <div className="absolute bottom-5 right-8 z-20 hidden md:flex items-center gap-3 pointer-events-none text-white/80">
        <div className="w-5 h-8 rounded-full border-2 border-white/40 flex items-start justify-center p-1">
          <div className="w-1 h-2 bg-lime-400 rounded-full animate-bounce" />
        </div>
        <span className="text-[10px] uppercase font-mono tracking-[0.2em] font-semibold text-neutral-300">
          Scroll To Explore
        </span>
      </div>
    </section>
  );
};
