import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { Sliders } from 'lucide-react';
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
import { CmsProvider, useCms } from './context/CmsContext';
import { CmsDashboardModal } from './components/CmsDashboardModal';

function MainApp() {
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedBeverageId, setSelectedBeverageId] = useState<string>('orange');
  const { setIsDashboardOpen } = useCms();

  // Initialize Lenis smooth scroll
  useEffect(() => {
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

  const handleSelectBeverage = (id: string) => {
    setSelectedBeverageId(id);
  };

  return (
    <div className="min-h-screen bg-[#060b08] text-white selection:bg-lime-400 selection:text-black relative">
      {/* Sticky Glassmorphic Header */}
      <Navbar onNavigate={handleNavigate} activeSection={activeSection} />

      {/* Main Content Flow */}
      <main>
        {/* Section A: Cinematic Hero */}
        <HeroSection
          onExploreClick={() => handleNavigate('drinks')}
          onStoryClick={() => handleNavigate('about')}
          selectedBeverageId={selectedBeverageId}
          onSelectBeverage={handleSelectBeverage}
        />

        {/* Section B: Natural Ingredients Submerged Experience */}
        <IngredientsSection />

        {/* Section C: Explore the VOLD Collection */}
        <CollectionSection
          selectedBeverageId={selectedBeverageId}
          onSelectBeverage={handleSelectBeverage}
        />

        {/* Section D: The Flavor Universe */}
        <FlavorUniverseSection onSelectBeverage={handleSelectBeverage} />

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

      {/* Floating Client CMS Control Button */}
      <aside aria-label="Client CMS Control" className="fixed bottom-6 left-6 z-40">
        <button
          type="button"
          onClick={() => setIsDashboardOpen(true)}
          className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-black/80 hover:bg-lime-400 hover:text-black border border-lime-400/40 text-white backdrop-blur-xl shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer text-xs font-bold"
          title="Open Client Content Dashboard"
        >
          <Sliders className="w-4 h-4 text-lime-400 group-hover:text-black transition-colors" />
          <span>Client CMS</span>
          <span className="w-2 h-2 rounded-full bg-lime-400 group-hover:bg-black animate-pulse" />
        </button>
      </aside>

      {/* Client CMS Dashboard Modal */}
      <CmsDashboardModal />
    </div>
  );
}

export default function App() {
  return (
    <CmsProvider>
      <MainApp />
    </CmsProvider>
  );
}
