import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
import { audioManager } from '../utils/audio';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const muted = audioManager.toggleMute();
    setIsMuted(muted);
  };

  const navLinks = [
    { name: 'Home', id: 'hero' },
    { name: 'Our Drinks', id: 'drinks' },
    { name: 'Flavors', id: 'flavors' },
    { name: 'About', id: 'about' },
    { name: 'Gallery', id: 'gallery' },
    { name: 'Contact', id: 'contact' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    audioManager.playFizz();
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#080d0a]/85 backdrop-blur-md py-3.5 border-b border-white/10 shadow-lg shadow-black/20'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('hero');
            }}
            className="flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 rounded-lg p-1"
            aria-label="VOLD Beverages Home"
          >
            <div className="relative flex items-center">
              <img
                src="/images/vold-logo.svg"
                alt="VOLD Beverages"
                className="h-10 md:h-12 w-auto transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </a>

          {/* Center Navigation Links - Desktop */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-inner" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-lime-500 text-black font-semibold shadow-md shadow-lime-500/25'
                      : 'text-neutral-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.name}
                </button>
              );
            })}
          </nav>

          {/* Right Controls: Sound Toggle + CTA */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Audio Ambiance Toggle */}
            <button
              onClick={toggleSound}
              className={`p-2.5 rounded-full border transition-all cursor-pointer ${
                !isMuted
                  ? 'bg-lime-500/20 text-lime-400 border-lime-500/50 shadow-sm shadow-lime-500/30'
                  : 'bg-white/5 text-neutral-400 border-white/10 hover:text-white hover:bg-white/10'
              }`}
              title={isMuted ? 'Turn Sound On' : 'Mute Ambient Sound'}
              aria-label={isMuted ? 'Enable Sound' : 'Mute Sound'}
            >
              {!isMuted ? <Volume2 className="w-4 h-4 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Explore Drinks CTA Button */}
            <button
              onClick={() => handleLinkClick('drinks')}
              className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide text-white bg-gradient-to-r from-emerald-600/80 to-lime-600/80 hover:from-emerald-500 hover:to-lime-500 border border-lime-400/30 shadow-lg shadow-lime-900/30 hover:shadow-lime-500/30 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-lime-200" />
              <span>Explore Drinks</span>
              <ArrowUpRight className="w-4 h-4 text-lime-200 opacity-80" />
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={toggleSound}
              className="p-2 rounded-full bg-white/5 border border-white/10 text-neutral-300"
              aria-label="Toggle Sound"
            >
              {!isMuted ? <Volume2 className="w-4 h-4 text-lime-400" /> : <VolumeX className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#080d0a]/98 backdrop-blur-xl border-b border-white/10 px-6 py-6 transition-all duration-300 animate-fadeIn">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`text-left px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                  activeSection === link.id
                    ? 'bg-lime-500 text-black font-semibold'
                    : 'text-neutral-200 hover:bg-white/10 hover:text-white'
                }`}
              >
                {link.name}
              </button>
            ))}
            <div className="pt-3 border-t border-white/10">
              <button
                onClick={() => handleLinkClick('drinks')}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-lime-500 text-black font-semibold text-center shadow-lg shadow-lime-500/20"
              >
                <span>Explore All Drinks</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
