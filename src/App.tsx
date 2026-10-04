import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { IngredientsSection } from './components/IngredientsSection';
import { CollectionSection } from './components/CollectionSection';
import { FlavorUniverseSection } from './components/FlavorUniverseSection';
import { BrandStorySection } from './components/BrandStorySection';
import { CinematicShowcaseSection } from './components/CinematicShowcaseSection';
import { BrandGallerySection } from './components/BrandGallerySection';
import { FaqSection } from './components/FaqSection';
import { ContactFooterSection } from './components/ContactFooterSection';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');

  // Initialize Lenis smooth scroll
  useEffect(() => {
    // Disable smooth scroll if reduced motion requested
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    let animationFrameId: number;
    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }
    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, []);

  // Section Observer to highlight active navigation link
  useEffect(() => {
    const sectionIds = ['hero', 'ingredients', 'drinks', 'flavors', 'about', 'gallery', 'faq', 'contact'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 250;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#060b08] text-white selection:bg-lime-400 selection:text-black">
      {/* Sticky Glassmorphic Header */}
      <Navbar onNavigate={handleNavigate} activeSection={activeSection} />

      {/* Main Content Flow */}
      <main>
        {/* Section A: Cinematic Hero with 3D Centerpiece */}
        <HeroSection
          onExploreClick={() => handleNavigate('drinks')}
          onStoryClick={() => handleNavigate('about')}
        />

        {/* Section B: Natural Ingredients Submerged Experience */}
        <IngredientsSection />

        {/* Section C: Explore the VOLD Collection */}
        <CollectionSection />

        {/* Section D: The Flavor Universe */}
        <FlavorUniverseSection />

        {/* Section E: Editorial Brand Story & Manifesto */}
        <BrandStorySection />

        {/* Section F: Cinematic Showcase & Transition */}
        <CinematicShowcaseSection />

        {/* Section G: Visual Archive / Brand Gallery */}
        <BrandGallerySection />

        {/* Section H: FAQ */}
        <FaqSection />
      </main>

      {/* Section I: Contact and Footer */}
      <ContactFooterSection />
    </div>
  );
}
