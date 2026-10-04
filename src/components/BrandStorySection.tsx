import React from 'react';
import { Leaf, Award, Recycle, Sun } from 'lucide-react';

export const BrandStorySection: React.FC = () => {
  return (
    <section id="about" className="relative py-28 sm:py-36 bg-[#060b08] text-white overflow-hidden">
      {/* Decorative botanical backdrop elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-lime-950/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-950/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Editorial Top Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24">
          
          {/* Left Column: Story Typography */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-lime-950/60 border border-lime-400/20 backdrop-blur-md mb-4">
              <Leaf className="w-3.5 h-3.5 text-lime-400" />
              <span className="text-xs uppercase tracking-[0.2em] font-mono text-lime-200 font-semibold">
                Our Heritage & Craft
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.08] mb-6">
              Born from Sun, Soil, <br />
              <span className="bg-gradient-to-r from-lime-300 via-emerald-300 to-teal-400 bg-clip-text text-transparent">
                and Pure Cold Press.
              </span>
            </h2>

            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed mb-6 font-normal">
              VOLD was created to challenge the artificial beverage norm. For too long, carbonated drinks relied on lab-synthesized extracts, high-fructose syrups, and synthetic dyes that mask what fruit truly tastes like.
            </p>

            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed mb-8 font-normal">
              Our philosophy is simple: source only peak-ripened fruit from family-tended orchards, press it gently without destructive heat pasteurization, and blend it with mountain spring water that carries pure natural minerals.
            </p>

            {/* 3 Core Commitments */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <Sun className="w-5 h-5 text-amber-400 mb-2" />
                <h4 className="text-sm font-bold text-white mb-1">Sun-Ripened</h4>
                <p className="text-xs text-neutral-400 leading-normal">
                  Harvested at natural peak sugar levels for genuine depth.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <Recycle className="w-5 h-5 text-emerald-400 mb-2" />
                <h4 className="text-sm font-bold text-white mb-1">Infinite Recycled</h4>
                <p className="text-xs text-neutral-400 leading-normal">
                  100% aluminum packaging with zero plastic bottles.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <Award className="w-5 h-5 text-lime-400 mb-2" />
                <h4 className="text-sm font-bold text-white mb-1">Clean Label</h4>
                <p className="text-xs text-neutral-400 leading-normal">
                  No artificial preservatives, flavors, or sweeteners.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Visual Mask */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl group">
              <img
                src="/images/vold-orchard-harvest.jpg"
                alt="VOLD Orchard harvest farmer gathering ripe oranges"
                loading="lazy"
                className="w-full h-auto object-cover filter contrast-[1.05] brightness-90 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-lime-300">
                  Ethical Sourcing
                </span>
                <p className="text-sm font-medium text-white mt-1">
                  Direct partnership with certified sustainable citrus orchards.
                </p>
              </div>
            </div>

            {/* Floating stats card */}
            <div className="absolute -bottom-6 -left-6 sm:-bottom-8 sm:-left-8 p-5 rounded-2xl bg-black/85 border border-lime-400/40 backdrop-blur-xl shadow-2xl hidden sm:block max-w-xs">
              <span className="block text-2xl font-black text-lime-400 font-mono">100%</span>
              <span className="text-xs font-semibold text-white uppercase tracking-wider">
                Direct Cold Press Sourcing
              </span>
              <p className="text-[11px] text-neutral-400 mt-1">
                Zero concentrates or reconstituted powders.
              </p>
            </div>
          </div>
        </div>

        {/* Full Bleed Editorial Quote Banner */}
        <div className="relative rounded-3xl overflow-hidden p-8 sm:p-14 bg-gradient-to-r from-emerald-950/60 via-black to-neutral-900 border border-white/10 text-center">
          <blockquote className="max-w-3xl mx-auto">
            <p className="text-xl sm:text-2xl md:text-3xl font-medium text-white italic leading-relaxed mb-6">
              "We didn't invent the orange, the mango, or the mountain spring. We just refused to ruin them."
            </p>
            <footer className="text-xs sm:text-sm font-mono text-lime-400 uppercase tracking-widest font-bold">
              — The VOLD Craft Manifesto
            </footer>
          </blockquote>
        </div>

      </div>
    </section>
  );
};
