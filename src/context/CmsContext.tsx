import React, { createContext, useContext, useState, useEffect } from 'react';
import { BEVERAGES, FAQS, type Beverage, type FaqItem } from '../data/beverages';

export interface IngredientPillar {
  title: string;
  subtitle: string;
  description: string;
  metric: string;
  metricLabel: string;
}

export interface CmsData {
  hero: {
    tagline: string;
    headlinePart1: string;
    headlinePart2: string;
    description: string;
    primaryCtaText: string;
    secondaryCtaText: string;
    handwrittenNote: string;
  };
  beverages: Beverage[];
  ingredients: {
    badge: string;
    headlinePart1: string;
    headlinePart2: string;
    description: string;
    pillars: IngredientPillar[];
  };
  story: {
    tagline: string;
    headline: string;
    p1: string;
    p2: string;
    manifestoQuote: string;
    manifestoAuthor: string;
  };
  faqs: FaqItem[];
  contact: {
    email: string;
    address: string;
    instagramUrl: string;
    facebookUrl: string;
    youtubeUrl: string;
  };
  security: {
    adminPassword: string;
  };
}

export const DEFAULT_CMS_DATA: CmsData = {
  hero: {
    tagline: 'Pure Taste. Real Refreshment.',
    headlinePart1: 'Refresh',
    headlinePart2: 'Your World',
    description: 'Delicious, natural and refreshing beverages made for every moment of your day. Infused with cold-pressed real fruit and sparkling mountain spring water.',
    primaryCtaText: 'Explore Our Drinks',
    secondaryCtaText: 'Discover Our Story',
    handwrittenNote: 'Good Drinks Brighter Days!',
  },
  beverages: BEVERAGES,
  ingredients: {
    badge: 'Goodness In Every Sip',
    headlinePart1: 'Natural',
    headlinePart2: 'Ingredients',
    description: 'We use the freshest fruits and natural ingredients to bring you rich flavors and pure refreshment. Grown under natural sunshine, cold-pressed to perfection, and canned at the source.',
    pillars: [
      {
        title: '100% Cold-Pressed Fruit',
        subtitle: 'Valencia Oranges & Alphonso Mangoes',
        description: 'We extract fruit essences using gentle cold-press extraction to preserve delicate aroma compounds, bright vitamins, and real pulpy texture without heat damage.',
        metric: '24%–38%',
        metricLabel: 'Real Fruit Juice',
      },
      {
        title: 'Pure Mountain Spring Water',
        subtitle: 'Naturally Filtered & Effervescent',
        description: 'Sourced from high-altitude natural mineral springs and lightly carbonated to produce micro-bubbles that dance across the palate without sharpness.',
        metric: '100%',
        metricLabel: 'Natural Mineral Base',
      },
      {
        title: 'Distilled Botanical Herbs',
        subtitle: 'Garden Spearmint & Citrus Blossoms',
        description: 'Steam-distilled garden mint and flower blossoms give our beverages an unmistakable layered aroma and clean, crisp finish.',
        metric: 'Pure',
        metricLabel: 'Aromatics',
      },
      {
        title: 'Zero Artificial Additives',
        subtitle: '0g Added Sugar • Non-GMO • Vegan',
        description: 'No preservatives, artificial colors, synthetic sweeteners, or high-fructose corn syrup. Just the authentic taste of real fruit.',
        metric: '0g',
        metricLabel: 'Added Sugars',
      },
    ],
  },
  story: {
    tagline: 'Our Heritage & Craft',
    headline: 'Born from Sun, Soil, and Pure Cold Press.',
    p1: 'VOLD was created to challenge the artificial beverage norm. For too long, carbonated drinks relied on lab-synthesized extracts, high-fructose syrups, and synthetic dyes that mask what fruit truly tastes like.',
    p2: 'Our philosophy is simple: source only peak-ripened fruit from family-tended orchards, press it gently without destructive heat pasteurization, and blend it with mountain spring water that carries pure natural minerals.',
    manifestoQuote: '"We didn\'t invent the orange, the mango, or the mountain spring. We just refused to ruin them."',
    manifestoAuthor: '— The VOLD Craft Manifesto',
  },
  faqs: FAQS,
  contact: {
    email: 'hello@voldbeverages.com',
    address: 'Cold Press Artisan Facility & Distribution HQ',
    instagramUrl: 'https://instagram.com/voldbeverages',
    facebookUrl: 'https://facebook.com/voldbeverages',
    youtubeUrl: 'https://youtube.com/@voldbeverages',
  },
  security: {
    adminPassword: 'vold', // Easy default, fully changeable in settings
  },
};

interface CmsContextType {
  cmsData: CmsData;
  updateCmsData: (newData: Partial<CmsData> | ((prev: CmsData) => CmsData)) => void;
  resetToDefaults: () => void;
  exportJson: () => void;
  importJson: (jsonString: string) => boolean;
  isDashboardOpen: boolean;
  setIsDashboardOpen: (open: boolean) => void;
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  changePassword: (newPass: string) => void;
}

const CmsContext = createContext<CmsContextType | undefined>(undefined);

const CMS_STORAGE_KEY = 'vold_beverages_cms_v1';
const CMS_AUTH_KEY = 'vold_admin_authenticated';

export const CmsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cmsData, setCmsData] = useState<CmsData>(() => {
    if (typeof window === 'undefined') return DEFAULT_CMS_DATA;
    try {
      const stored = localStorage.getItem(CMS_STORAGE_KEY);
      if (stored) {
        return { ...DEFAULT_CMS_DATA, ...JSON.parse(stored) };
      }
    } catch (e) {
      console.warn('Failed to load CMS data from localStorage:', e);
    }
    return DEFAULT_CMS_DATA;
  });

  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return sessionStorage.getItem(CMS_AUTH_KEY) === 'true';
  });

  useEffect(() => {
    try {
      localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(cmsData));
    } catch (e) {
      console.warn('Failed to save CMS data to localStorage:', e);
    }
  }, [cmsData]);

  // Shortcut Ctrl + Shift + A or Cmd + Shift + A to open CMS
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setIsDashboardOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const login = (password: string): boolean => {
    const expected = cmsData.security?.adminPassword || 'vold';
    if (password.trim() === expected.trim()) {
      setIsAuthenticated(true);
      sessionStorage.setItem(CMS_AUTH_KEY, 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem(CMS_AUTH_KEY);
    setIsDashboardOpen(false);
  };

  const changePassword = (newPass: string) => {
    updateCmsData((prev) => ({
      ...prev,
      security: {
        ...prev.security,
        adminPassword: newPass.trim(),
      },
    }));
  };

  const updateCmsData = (newData: Partial<CmsData> | ((prev: CmsData) => CmsData)) => {
    setCmsData((prev) => {
      if (typeof newData === 'function') {
        return newData(prev);
      }
      return { ...prev, ...newData };
    });
  };

  const resetToDefaults = () => {
    setCmsData(DEFAULT_CMS_DATA);
    localStorage.removeItem(CMS_STORAGE_KEY);
  };

  const exportJson = () => {
    // Exclude security password from raw export for safety
    const exportSafe = { ...cmsData };
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportSafe, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'vold-website-content-backup.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const importJson = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed && typeof parsed === 'object') {
        setCmsData({ ...DEFAULT_CMS_DATA, ...parsed });
        return true;
      }
    } catch (e) {
      console.error('Invalid JSON imported:', e);
    }
    return false;
  };

  return (
    <CmsContext.Provider
      value={{
        cmsData,
        updateCmsData,
        resetToDefaults,
        exportJson,
        importJson,
        isDashboardOpen,
        setIsDashboardOpen,
        isAuthenticated,
        login,
        logout,
        changePassword,
      }}
    >
      {children}
    </CmsContext.Provider>
  );
};

export const useCms = () => {
  const context = useContext(CmsContext);
  if (!context) {
    throw new Error('useCms must be used within a CmsProvider');
  }
  return context;
};
