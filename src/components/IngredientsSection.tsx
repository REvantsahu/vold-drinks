import React, { useState } from 'react';
import { Play, Sparkles, Droplets, Leaf, ShieldCheck, X } from 'lucide-react';
import { audioManager } from '../utils/audio';
import { useCms } from '../context/CmsContext';

export const IngredientsSection: React.FC = () => {
  const { cmsData } = useCms();
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [activePillar, setActivePillar] = useState(0);

  const icons = [Leaf, Droplets, Sparkles, ShieldCheck];

  const handlePlayClick = () => {
    setVideoModalOpen(true);
    audioManager.playFizz();
  };

  return (
    <section
      id="ingredients"
      className="relative min-h-[90vh] w-full flex flex-col justify-center overflow-hidden py-24 sm:py-32"
    >
      {/* Layer 0: Full Bleed Underwater Crystal Clear Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/underwater-ingredients.jpg"
          alt="Crystal clear submerged water with fresh lime wheels, mint and ice"
          loading="lazy"
          className="w-full h-full object-cover object-center filter brightness-[0.72] contrast-[1.1] saturate-[1.15]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#060b08]/80 via-transparent to-[#060b08]/90" />
        <div className="absolute inset-0 bg-cyan-950/20 mix-blend-color" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-400/20 backdrop-blur-md mb-3">
              <Droplets className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-xs uppercase tracking-[0.2em] font-mono text-cyan-200 font-semibold">
                {cmsData.ingredients.badge}
              </span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-4">
              {cmsData.ingredients.headlinePart1}{' '}
              <span className="bg-gradient-to-r from-lime-300 to-emerald-400 bg-clip-text text-transparent">
                {cmsData.ingredients.headlinePart2}
              </span>
            </h2>

            <p className="text-base sm:text-lg text-neutral-200/90 leading-relaxed font-normal">
              {cmsData.ingredients.description}
            </p>
          </div>

          {/* "Watch Our Story" Play Trigger */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={handlePlayClick}
              className="group relative flex items-center gap-4 px-6 py-3.5 rounded-full bg-black/50 hover:bg-black/70 border border-white/20 hover:border-lime-400/60 backdrop-blur-md transition-all duration-300 cursor-pointer shadow-lg shadow-black/40 active:scale-95"
              aria-label="Watch Our Story Brand Film"
            >
              <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-lime-400 to-emerald-500 flex items-center justify-center text-black shadow-md shadow-lime-500/40 group-hover:scale-110 transition-transform">
                <Play className="w-5 h-5 fill-current ml-0.5" />
                <span className="absolute inset-0 rounded-full bg-lime-400 animate-ping opacity-25" />
              </div>
              <div className="text-left">
                <span className="block text-sm font-bold text-white tracking-wide">Watch Our Story</span>
                <span className="block text-xs text-lime-300 font-mono">2 Min Brand Film</span>
              </div>
            </button>
          </div>
        </div>

        {/* 4 Interactive Ingredient Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cmsData.ingredients.pillars.map((pillar, idx) => {
            const Icon = icons[idx % icons.length];
            const isSelected = activePillar === idx;
            return (
              <div
                key={pillar.title}
                onClick={() => {
                  setActivePillar(idx);
                  audioManager.playIceClink();
                }}
                className={`relative p-6 rounded-3xl transition-all duration-300 cursor-pointer backdrop-blur-xl border ${
                  isSelected
                    ? 'bg-black/70 border-lime-400/60 shadow-[0_10px_30px_rgba(132,204,22,0.2)] transform -translate-y-1'
                    : 'bg-black/40 border-white/10 hover:border-white/25 hover:bg-black/55'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-2xl ${isSelected ? 'bg-lime-400 text-black' : 'bg-white/10 text-lime-400'}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-right">
                    <span className="block text-lg font-bold text-white font-mono">{pillar.metric}</span>
                    <span className="block text-[11px] text-neutral-400 uppercase tracking-wider">{pillar.metricLabel}</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-1">{pillar.title}</h3>
                <p className="text-xs font-semibold text-lime-300/90 mb-3">{pillar.subtitle}</p>
                <p className="text-xs text-neutral-300 leading-relaxed">{pillar.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Video Modal Player */}
      {videoModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="video-dialog-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-fadeIn"
        >
          <div className="relative w-full max-w-4xl bg-neutral-900 border border-white/20 rounded-3xl overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/50">
              <div className="flex items-center gap-2">
                <Leaf className="w-5 h-5 text-lime-400" />
                <h3 id="video-dialog-title" className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                  The VOLD Craft — Botanical Documentary
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setVideoModalOpen(false)}
                className="p-2 rounded-full hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close brand film modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Container with Mock Interactive Player */}
            <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
              <img
                src="/images/vold-orchard-harvest.jpg"
                alt="VOLD Sun-Drenched Orchard Craft"
                className="w-full h-full object-cover filter brightness-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
                <div className="w-16 h-16 rounded-full bg-lime-400/90 text-black flex items-center justify-center mb-4 shadow-xl">
                  <Play className="w-8 h-8 fill-current ml-1" />
                </div>
                <h4 className="text-2xl font-bold text-white mb-2">From Earth To Can</h4>
                <p className="text-sm text-neutral-300 max-w-md">
                  Experience how our local growers harvest ripe Valencia oranges and Alphonso mangoes, pressed within hours to retain natural vitality.
                </p>
                <button
                  type="button"
                  onClick={() => setVideoModalOpen(false)}
                  className="mt-6 px-6 py-2.5 rounded-full bg-lime-400 hover:bg-lime-300 text-black font-bold text-xs uppercase tracking-wider cursor-pointer"
                >
                  Return to Website
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
