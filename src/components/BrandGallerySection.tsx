import React, { useState, useEffect } from 'react';
import { Camera, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/beverages';
import type { GalleryItem } from '../data/beverages';
import { audioManager } from '../utils/audio';

export const BrandGallerySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'flavors' | 'harvest' | 'lifestyle'>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);

  const filteredItems = activeCategory === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedPhoto) return;
      if (e.key === 'Escape') {
        setSelectedPhoto(null);
      } else if (e.key === 'ArrowRight') {
        const currIdx = filteredItems.findIndex((i) => i.id === selectedPhoto.id);
        const nextIdx = (currIdx + 1) % filteredItems.length;
        setSelectedPhoto(filteredItems[nextIdx]);
      } else if (e.key === 'ArrowLeft') {
        const currIdx = filteredItems.findIndex((i) => i.id === selectedPhoto.id);
        const prevIdx = (currIdx - 1 + filteredItems.length) % filteredItems.length;
        setSelectedPhoto(filteredItems[prevIdx]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhoto, filteredItems]);

  const openLightbox = (item: GalleryItem) => {
    setSelectedPhoto(item);
    audioManager.playFizz();
  };

  return (
    <section id="gallery" className="relative py-24 sm:py-32 bg-[#060b08] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-3">
              <Camera className="w-3.5 h-3.5 text-lime-400" />
              <span className="text-xs uppercase tracking-[0.2em] font-mono text-neutral-300 font-semibold">
                Visual Archive
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight">
              The VOLD <span className="text-lime-400">Gallery</span>
            </h2>
            <p className="text-base text-neutral-300 mt-2 max-w-xl">
              Moments of real refreshment, botanical harvests, and the art of pure fruit crafting.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {(['all', 'flavors', 'harvest', 'lifestyle'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  audioManager.playIceClink();
                }}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                  activeCategory === cat
                    ? 'bg-lime-400 text-black border-lime-400 shadow-md shadow-lime-400/20'
                    : 'bg-white/5 text-neutral-300 border-white/10 hover:border-white/25 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry / Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => openLightbox(item)}
              className="group relative rounded-3xl overflow-hidden bg-neutral-900 border border-white/10 cursor-pointer shadow-xl transition-all duration-500 hover:-translate-y-1 hover:border-lime-400/50"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-black">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108 filter contrast-[1.05]"
                />
              </div>

              {/* Hover overlay with title & expand icon */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-mono text-lime-300 uppercase tracking-wider font-semibold">
                      {item.category}
                    </span>
                    <h3 className="text-lg font-bold text-white tracking-tight">{item.title}</h3>
                    <p className="text-xs text-neutral-300 mt-1 line-clamp-1">{item.caption}</p>
                  </div>
                  <div className="p-2.5 rounded-full bg-lime-400 text-black">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl animate-fadeIn"
        >
          {/* Close button */}
          <button
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white z-50 cursor-pointer"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Arrows */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              const currIdx = filteredItems.findIndex((i) => i.id === selectedPhoto.id);
              const prevIdx = (currIdx - 1 + filteredItems.length) % filteredItems.length;
              setSelectedPhoto(filteredItems[prevIdx]);
            }}
            className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white z-50 cursor-pointer"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              const currIdx = filteredItems.findIndex((i) => i.id === selectedPhoto.id);
              const nextIdx = (currIdx + 1) % filteredItems.length;
              setSelectedPhoto(filteredItems[nextIdx]);
            }}
            className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white z-50 cursor-pointer"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Lightbox Content */}
          <div className="relative max-w-5xl w-full max-h-[85vh] flex flex-col items-center">
            <img
              src={selectedPhoto.image}
              alt={selectedPhoto.title}
              className="max-h-[70vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl"
            />
            <div className="text-center mt-4">
              <h3 id="lightbox-title" className="text-xl font-bold text-white">
                {selectedPhoto.title}
              </h3>
              <p className="text-sm text-neutral-300 mt-1 max-w-lg mx-auto">
                {selectedPhoto.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
