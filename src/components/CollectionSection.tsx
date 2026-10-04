import React, { useState } from 'react';
import { ArrowRight, Check, Droplets, Sparkles, X, Info, Flame, Heart } from 'lucide-react';
import type { Beverage } from '../data/beverages';
import { audioManager } from '../utils/audio';
import { useCms } from '../context/CmsContext';

interface CollectionSectionProps {
  selectedBeverageId?: string;
  onSelectBeverage?: (id: string) => void;
}

export const CollectionSection: React.FC<CollectionSectionProps> = ({
  selectedBeverageId,
  onSelectBeverage,
}) => {
  const { cmsData } = useCms();
  const [activeFlavor, setActiveFlavor] = useState<Beverage>(() => {
    if (selectedBeverageId) {
      const match = cmsData.beverages.find((b) => b.id === selectedBeverageId);
      if (match) return match;
    }
    return cmsData.beverages[0];
  });

  const [selectedSize, setSelectedSize] = useState<'can' | 'glass'>('can');
  const [detailModalOpen, setDetailModalOpen] = useState(false);

  // Sync external selection if changed
  React.useEffect(() => {
    if (selectedBeverageId) {
      const match = cmsData.beverages.find((b) => b.id === selectedBeverageId);
      if (match) setActiveFlavor(match);
    }
  }, [selectedBeverageId, cmsData.beverages]);

  const handleSelectFlavor = (bev: Beverage) => {
    setActiveFlavor(bev);
    if (onSelectBeverage) {
      onSelectBeverage(bev.id);
    }
    audioManager.playIceClink();
  };

  const handleOrderWholesale = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
    audioManager.playFizz();
  };

  return (
    <section id="drinks" className="relative min-h-screen py-24 sm:py-32 bg-[#060b08] overflow-hidden">
      {/* Background ambient lighting linked to active flavor */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[140px] opacity-20 pointer-events-none transition-colors duration-700"
        style={{ backgroundColor: activeFlavor.accentHex }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-3">
            <Sparkles className="w-3.5 h-3.5 text-lime-400" />
            <span className="text-xs uppercase tracking-[0.2em] font-mono text-neutral-300 font-semibold">
              Signature Lineup
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-4">
            Explore the <span className="text-lime-400">VOLD Collection</span>
          </h2>
          <p className="text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto">
            Four crafted recipes. Each formulated from cold-pressed sun-ripened fruit, lightly carbonated mineral spring water, and wild botanical herbs.
          </p>

          {/* Flavor Switcher Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-8">
            {cmsData.beverages.map((bev) => {
              const isSelected = activeFlavor.id === bev.id;
              return (
                <button
                  key={bev.id}
                  type="button"
                  onClick={() => handleSelectFlavor(bev)}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer flex items-center gap-2 border ${
                    isSelected
                      ? 'bg-white text-black border-white shadow-lg shadow-white/10 scale-105'
                      : 'bg-white/5 text-neutral-300 border-white/10 hover:border-white/20 hover:bg-white/10'
                  }`}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: bev.accentHex }}
                  />
                  <span>{bev.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Product Showcase Card */}
        <div className="relative rounded-3xl bg-neutral-900/60 border border-white/10 p-6 sm:p-10 lg:p-12 backdrop-blur-xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left: Product Visual Composition */}
            <div className="lg:col-span-6 relative flex items-center justify-center min-h-[380px] sm:min-h-[460px]">
              {/* Product Background Glow */}
              <div
                className="absolute inset-0 rounded-3xl opacity-30 filter blur-3xl transition-colors duration-700"
                style={{ backgroundColor: activeFlavor.accentHex }}
              />

              {/* Product Graphic */}
              <div className="relative z-10 w-full max-w-sm sm:max-w-md flex items-center justify-center">
                <img
                  src={selectedSize === 'can' ? '/images/vold-can-collection.jpg' : activeFlavor.glassImage}
                  alt={`${activeFlavor.name} ${selectedSize === 'can' ? 'Cans Lineup' : 'Chilled Glass Serve'}`}
                  className="w-full h-auto max-h-[440px] object-contain rounded-2xl drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] transition-all duration-500 transform hover:scale-105"
                />
              </div>

              {/* Packaging Size Switcher */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 p-1.5 rounded-full bg-black/70 border border-white/15 backdrop-blur-md">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedSize('can');
                    audioManager.playFizz();
                  }}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    selectedSize === 'can'
                      ? 'bg-lime-400 text-black shadow-sm'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  330ml Can Lineup
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedSize('glass');
                    audioManager.playIceClink();
                  }}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    selectedSize === 'glass'
                      ? 'bg-lime-400 text-black shadow-sm'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Bistro Glass Serve
                </button>
              </div>
            </div>

            {/* Right: Flavor Breakdown & Specs */}
            <div className="lg:col-span-6 flex flex-col items-start text-left">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="text-xs font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-md text-white"
                  style={{ backgroundColor: activeFlavor.accentHex }}
                >
                  {activeFlavor.flavor}
                </span>
                <span className="text-xs text-neutral-400 font-mono">Real Fruit {activeFlavor.realFruitPercent}</span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
                {activeFlavor.headline}
              </h3>
              <p className="text-sm font-medium text-lime-300 mb-4">{activeFlavor.tagline}</p>
              
              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed mb-6">
                {activeFlavor.description}
              </p>

              {/* Key Nutrition Metrics Pills */}
              <div className="grid grid-cols-3 gap-3 w-full mb-6">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center">
                  <div className="flex items-center justify-center gap-1 text-neutral-400 mb-1">
                    <Flame className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-[11px] uppercase tracking-wider">Energy</span>
                  </div>
                  <span className="text-lg font-bold text-white font-mono">{activeFlavor.calories}</span>
                </div>
                
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center">
                  <div className="flex items-center justify-center gap-1 text-neutral-400 mb-1">
                    <Droplets className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="text-[11px] uppercase tracking-wider">Fruit Juice</span>
                  </div>
                  <span className="text-lg font-bold text-white font-mono">{activeFlavor.realFruitPercent}</span>
                </div>

                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center">
                  <div className="flex items-center justify-center gap-1 text-neutral-400 mb-1">
                    <Heart className="w-3.5 h-3.5 text-rose-400" />
                    <span className="text-[11px] uppercase tracking-wider">Added Sugar</span>
                  </div>
                  <span className="text-lg font-bold text-emerald-400 font-mono">0 Grams</span>
                </div>
              </div>

              {/* Tasting Notes */}
              <div className="w-full mb-8">
                <span className="block text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-2">
                  Tasting Notes &amp; Palate:
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeFlavor.tastingNotes.map((note) => (
                    <span
                      key={note}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 border border-white/10 text-xs font-medium text-neutral-200"
                    >
                      <Check className="w-3 h-3 text-lime-400" />
                      {note}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setDetailModalOpen(true);
                    audioManager.playIceClink();
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-black bg-lime-400 hover:bg-lime-300 transition-all cursor-pointer shadow-lg shadow-lime-400/20 transform hover:-translate-y-0.5 active:scale-95"
                >
                  <Info className="w-4 h-4" />
                  <span>Discover Flavor Details</span>
                </button>

                <button
                  type="button"
                  onClick={handleOrderWholesale}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
                >
                  <span>Order Samples / Wholesale</span>
                  <ArrowRight className="w-4 h-4 text-lime-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Flavor Detail Modal */}
      {detailModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="flavor-detail-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fadeIn"
        >
          <div className="relative w-full max-w-2xl bg-neutral-900 border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: activeFlavor.accentHex }} />
                <h3 id="flavor-detail-title" className="text-xl font-bold text-white">
                  {activeFlavor.name} Specification
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setDetailModalOpen(false)}
                className="p-2 rounded-full hover:bg-white/10 text-neutral-400 hover:text-white cursor-pointer"
                aria-label="Close flavor specifications modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-sm text-neutral-300">
              <div>
                <h4 className="font-bold text-white mb-2">Verified Real Ingredients:</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeFlavor.ingredients.map((ing) => (
                    <li key={ing} className="flex items-start gap-2 bg-black/40 p-2 rounded-xl border border-white/5">
                      <Check className="w-4 h-4 text-lime-400 shrink-0 mt-0.5" />
                      <span>{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2">
                <h4 className="font-bold text-white mb-1">Serving Recommendation:</h4>
                <p className="text-neutral-300">
                  Best served cold at 4°C over fresh crystal ice. {activeFlavor.pairing ? `Pairs wonderfully with: ${activeFlavor.pairing}.` : ''}
                </p>
              </div>

              <div className="pt-2">
                <h4 className="font-bold text-white mb-1">Packaging &amp; Eco-Footprint:</h4>
                <p className="text-neutral-300">
                  330ml infinitely recyclable aluminum can. BPA-NI interior protective liner. 100% plastic-free packaging box.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
              <button
                type="button"
                onClick={() => setDetailModalOpen(false)}
                className="px-6 py-2.5 rounded-full bg-lime-400 hover:bg-lime-300 text-black font-bold text-sm cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
