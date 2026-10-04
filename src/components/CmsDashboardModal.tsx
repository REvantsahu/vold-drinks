import React, { useState } from 'react';
import {
  X,
  RotateCcw,
  Download,
  Upload,
  Sparkles,
  Layers,
  FileText,
  HelpCircle,
  Mail,
  Check,
  Plus,
  Trash2,
  Sliders,
} from 'lucide-react';
import { useCms } from '../context/CmsContext';

export const CmsDashboardModal: React.FC = () => {
  const {
    cmsData,
    updateCmsData,
    resetToDefaults,
    exportJson,
    importJson,
    isDashboardOpen,
    setIsDashboardOpen,
  } = useCms();

  const [activeTab, setActiveTab] = useState<
    'hero' | 'beverages' | 'ingredients' | 'story' | 'faqs' | 'contact'
  >('hero');

  const [selectedBevIndex, setSelectedBevIndex] = useState(0);
  const [saveToast, setSaveToast] = useState(false);

  if (!isDashboardOpen) return null;

  const showSaveSuccess = () => {
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2000);
  };

  const handleHeroChange = (field: keyof typeof cmsData.hero, val: string) => {
    updateCmsData((prev) => ({
      ...prev,
      hero: { ...prev.hero, [field]: val },
    }));
    showSaveSuccess();
  };

  const handleBeverageFieldChange = (
    field: string,
    val: string | string[]
  ) => {
    updateCmsData((prev) => {
      const updated = [...prev.beverages];
      updated[selectedBevIndex] = {
        ...updated[selectedBevIndex],
        [field]: val,
      };
      return { ...prev, beverages: updated };
    });
    showSaveSuccess();
  };

  const handleIngredientsChange = (
    field: keyof typeof cmsData.ingredients,
    val: unknown
  ) => {
    updateCmsData((prev) => ({
      ...prev,
      ingredients: { ...prev.ingredients, [field]: val },
    }));
    showSaveSuccess();
  };

  const handleStoryChange = (field: keyof typeof cmsData.story, val: string) => {
    updateCmsData((prev) => ({
      ...prev,
      story: { ...prev.story, [field]: val },
    }));
    showSaveSuccess();
  };

  const handleContactChange = (
    field: keyof typeof cmsData.contact,
    val: string
  ) => {
    updateCmsData((prev) => ({
      ...prev,
      contact: { ...prev.contact, [field]: val },
    }));
    showSaveSuccess();
  };

  const handleAddFaq = () => {
    updateCmsData((prev) => ({
      ...prev,
      faqs: [
        ...prev.faqs,
        {
          question: 'New Question Title Here',
          answer: 'Enter answer details here.',
          category: 'General',
        },
      ],
    }));
    showSaveSuccess();
  };

  const handleFaqChange = (
    index: number,
    field: 'question' | 'answer' | 'category',
    val: string
  ) => {
    updateCmsData((prev) => {
      const updated = [...prev.faqs];
      updated[index] = { ...updated[index], [field]: val };
      return { ...prev, faqs: updated };
    });
    showSaveSuccess();
  };

  const handleDeleteFaq = (index: number) => {
    updateCmsData((prev) => {
      const updated = prev.faqs.filter((_, i) => i !== index);
      return { ...prev, faqs: updated };
    });
    showSaveSuccess();
  };

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const success = importJson(content);
        if (success) {
          alert('Configuration successfully restored!');
        } else {
          alert('Failed to parse JSON file.');
        }
      }
    };
    reader.readAsText(file);
  };

  const currentBev = cmsData.beverages[selectedBevIndex];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-2xl animate-fadeIn"
    >
      <div className="relative w-full max-w-5xl h-[92vh] flex flex-col bg-[#0b120e] border border-white/20 rounded-3xl shadow-2xl overflow-hidden text-neutral-200">
        
        {/* Top Header Bar */}
        <div className="flex flex-wrap items-center justify-between px-6 py-4 border-b border-white/10 bg-black/60 shrink-0 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-lime-500/20 text-lime-400 border border-lime-500/40">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span>VOLD Client CMS &amp; Content Control</span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-lime-400/20 text-lime-300 border border-lime-400/30">
                  Live Sync
                </span>
              </h2>
              <p className="text-xs text-neutral-400">
                Edit website headlines, drinks, images, buttons, and links in real time.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {saveToast && (
              <span className="text-xs text-lime-400 font-mono font-semibold flex items-center gap-1 animate-pulse">
                <Check className="w-3.5 h-3.5" /> Saved
              </span>
            )}

            <button
              onClick={exportJson}
              className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-neutral-300 hover:text-white flex items-center gap-1.5 cursor-pointer"
              title="Download backup file"
            >
              <Download className="w-3.5 h-3.5 text-lime-400" />
              <span className="hidden sm:inline">Export JSON</span>
            </button>

            <label className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-neutral-300 hover:text-white flex items-center gap-1.5 cursor-pointer">
              <Upload className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Import JSON</span>
              <input
                type="file"
                accept=".json"
                onChange={handleFileImport}
                className="hidden"
              />
            </label>

            <button
              onClick={() => {
                if (confirm('Reset all website content back to factory defaults?')) {
                  resetToDefaults();
                }
              }}
              className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-xs font-semibold text-rose-300 flex items-center gap-1.5 cursor-pointer"
              title="Reset to factory brand settings"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>

            <button
              onClick={() => setIsDashboardOpen(false)}
              className="p-2 rounded-xl bg-lime-400 hover:bg-lime-300 text-black font-bold transition-transform hover:scale-105 cursor-pointer ml-1"
              title="Close and view site"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex overflow-x-auto border-b border-white/10 bg-black/30 px-6 py-2 gap-2 shrink-0 scrollbar-none">
          {[
            { id: 'hero', name: 'Hero & Identity', icon: Sparkles },
            { id: 'beverages', name: 'Drinks & Flavors', icon: Layers },
            { id: 'ingredients', name: 'Ingredients', icon: FileText },
            { id: 'story', name: 'Brand Story', icon: FileText },
            { id: 'faqs', name: 'FAQ Manager', icon: HelpCircle },
            { id: 'contact', name: 'Contact & Social', icon: Mail },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-lime-400 text-black shadow-md'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Body (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* TAB 1: HERO & IDENTITY */}
          {activeTab === 'hero' && (
            <div className="space-y-5 max-w-3xl">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono text-lime-400">
                  Hero Typography &amp; Headlines
                </h3>

                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                    Top Tagline Badge
                  </label>
                  <input
                    type="text"
                    value={cmsData.hero.tagline}
                    onChange={(e) => handleHeroChange('tagline', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-sm focus:border-lime-400 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                      Headline Part 1 (First Word)
                    </label>
                    <input
                      type="text"
                      value={cmsData.hero.headlinePart1}
                      onChange={(e) =>
                        handleHeroChange('headlinePart1', e.target.value)
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-sm focus:border-lime-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                      Headline Part 2 (Second Word)
                    </label>
                    <input
                      type="text"
                      value={cmsData.hero.headlinePart2}
                      onChange={(e) =>
                        handleHeroChange('headlinePart2', e.target.value)
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-sm focus:border-lime-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                    Hero Description Copy
                  </label>
                  <textarea
                    rows={3}
                    value={cmsData.hero.description}
                    onChange={(e) =>
                      handleHeroChange('description', e.target.value)
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-sm focus:border-lime-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono text-lime-400">
                  CTA Buttons &amp; Accents
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                      Primary CTA Button Label
                    </label>
                    <input
                      type="text"
                      value={cmsData.hero.primaryCtaText}
                      onChange={(e) =>
                        handleHeroChange('primaryCtaText', e.target.value)
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-sm focus:border-lime-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                      Secondary CTA Button Label
                    </label>
                    <input
                      type="text"
                      value={cmsData.hero.secondaryCtaText}
                      onChange={(e) =>
                        handleHeroChange('secondaryCtaText', e.target.value)
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-sm focus:border-lime-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                    Handwritten Floating Note (Right of Glass)
                  </label>
                  <input
                    type="text"
                    value={cmsData.hero.handwrittenNote}
                    onChange={(e) =>
                      handleHeroChange('handwrittenNote', e.target.value)
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-sm focus:border-lime-400 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: BEVERAGES & FLAVORS */}
          {activeTab === 'beverages' && (
            <div className="space-y-6 max-w-4xl">
              {/* Flavor Selector */}
              <div className="flex gap-2">
                {cmsData.beverages.map((bev, idx) => (
                  <button
                    key={bev.id}
                    onClick={() => setSelectedBevIndex(idx)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                      selectedBevIndex === idx
                        ? 'bg-lime-400 text-black border-lime-400 shadow-md'
                        : 'bg-black/40 text-neutral-300 border-white/10 hover:border-white/20'
                    }`}
                  >
                    {bev.name}
                  </button>
                ))}
              </div>

              {currentBev && (
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                        Drink Title
                      </label>
                      <input
                        type="text"
                        value={currentBev.name}
                        onChange={(e) =>
                          handleBeverageFieldChange('name', e.target.value)
                        }
                        className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-sm focus:border-lime-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                        Flavor Subtitle
                      </label>
                      <input
                        type="text"
                        value={currentBev.flavor}
                        onChange={(e) =>
                          handleBeverageFieldChange('flavor', e.target.value)
                        }
                        className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-sm focus:border-lime-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                        Headline
                      </label>
                      <input
                        type="text"
                        value={currentBev.headline}
                        onChange={(e) =>
                          handleBeverageFieldChange('headline', e.target.value)
                        }
                        className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-sm focus:border-lime-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                        Tagline
                      </label>
                      <input
                        type="text"
                        value={currentBev.tagline}
                        onChange={(e) =>
                          handleBeverageFieldChange('tagline', e.target.value)
                        }
                        className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-sm focus:border-lime-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                      Full Flavor Description
                    </label>
                    <textarea
                      rows={3}
                      value={currentBev.description}
                      onChange={(e) =>
                        handleBeverageFieldChange('description', e.target.value)
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-sm focus:border-lime-400 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                        Calories
                      </label>
                      <input
                        type="text"
                        value={currentBev.calories}
                        onChange={(e) =>
                          handleBeverageFieldChange('calories', e.target.value)
                        }
                        className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                        Fruit %
                      </label>
                      <input
                        type="text"
                        value={currentBev.realFruitPercent}
                        onChange={(e) =>
                          handleBeverageFieldChange(
                            'realFruitPercent',
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                        Accent Color (HEX)
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={currentBev.accentHex}
                          onChange={(e) =>
                            handleBeverageFieldChange(
                              'accentHex',
                              e.target.value
                            )
                          }
                          className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                        />
                        <span className="text-xs font-mono text-neutral-300">
                          {currentBev.accentHex}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                      Glass Image URL / Path
                    </label>
                    <input
                      type="text"
                      value={currentBev.glassImage}
                      onChange={(e) =>
                        handleBeverageFieldChange('glassImage', e.target.value)
                      }
                      className="w-full px-4 py-2 rounded-xl bg-black/60 border border-white/15 text-white text-xs"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: INGREDIENTS */}
          {activeTab === 'ingredients' && (
            <div className="space-y-5 max-w-3xl">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono text-lime-400">
                  Ingredients Section Copy
                </h3>

                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                    Badge Label
                  </label>
                  <input
                    type="text"
                    value={cmsData.ingredients.badge}
                    onChange={(e) =>
                      handleIngredientsChange('badge', e.target.value)
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                      Headline Part 1
                    </label>
                    <input
                      type="text"
                      value={cmsData.ingredients.headlinePart1}
                      onChange={(e) =>
                        handleIngredientsChange('headlinePart1', e.target.value)
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                      Headline Part 2
                    </label>
                    <input
                      type="text"
                      value={cmsData.ingredients.headlinePart2}
                      onChange={(e) =>
                        handleIngredientsChange('headlinePart2', e.target.value)
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={cmsData.ingredients.description}
                    onChange={(e) =>
                      handleIngredientsChange('description', e.target.value)
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-sm"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: BRAND STORY */}
          {activeTab === 'story' && (
            <div className="space-y-5 max-w-3xl">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono text-lime-400">
                  Story &amp; Manifesto
                </h3>

                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                    Main Headline
                  </label>
                  <input
                    type="text"
                    value={cmsData.story.headline}
                    onChange={(e) => handleStoryChange('headline', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                    First Paragraph
                  </label>
                  <textarea
                    rows={3}
                    value={cmsData.story.p1}
                    onChange={(e) => handleStoryChange('p1', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                    Second Paragraph
                  </label>
                  <textarea
                    rows={3}
                    value={cmsData.story.p2}
                    onChange={(e) => handleStoryChange('p2', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                    Manifesto Quote
                  </label>
                  <input
                    type="text"
                    value={cmsData.story.manifestoQuote}
                    onChange={(e) =>
                      handleStoryChange('manifestoQuote', e.target.value)
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-sm"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: FAQ MANAGER */}
          {activeTab === 'faqs' && (
            <div className="space-y-4 max-w-3xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase font-mono text-neutral-400">
                  Total Questions: {cmsData.faqs.length}
                </span>
                <button
                  onClick={handleAddFaq}
                  className="px-3 py-1.5 rounded-xl bg-lime-400 text-black font-bold text-xs flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add New FAQ</span>
                </button>
              </div>

              {cmsData.faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3 relative group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-lime-400">
                      FAQ #{idx + 1}
                    </span>
                    <button
                      onClick={() => handleDeleteFaq(idx)}
                      className="p-1 rounded-lg text-rose-400 hover:bg-rose-500/10 cursor-pointer"
                      title="Delete this question"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">
                      Question
                    </label>
                    <input
                      type="text"
                      value={faq.question}
                      onChange={(e) =>
                        handleFaqChange(idx, 'question', e.target.value)
                      }
                      className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white text-sm focus:border-lime-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">
                      Answer
                    </label>
                    <textarea
                      rows={2}
                      value={faq.answer}
                      onChange={(e) =>
                        handleFaqChange(idx, 'answer', e.target.value)
                      }
                      className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white text-sm focus:border-lime-400 focus:outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 6: CONTACT & SOCIAL */}
          {activeTab === 'contact' && (
            <div className="space-y-5 max-w-3xl">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono text-lime-400">
                  Contact Details &amp; Social Profiles
                </h3>

                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                    Contact Email Address
                  </label>
                  <input
                    type="email"
                    value={cmsData.contact.email}
                    onChange={(e) => handleContactChange('email', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                    Physical Address / HQ Note
                  </label>
                  <input
                    type="text"
                    value={cmsData.contact.address}
                    onChange={(e) =>
                      handleContactChange('address', e.target.value)
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                    Instagram URL
                  </label>
                  <input
                    type="url"
                    value={cmsData.contact.instagramUrl}
                    onChange={(e) =>
                      handleContactChange('instagramUrl', e.target.value)
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                    Facebook URL
                  </label>
                  <input
                    type="url"
                    value={cmsData.contact.facebookUrl}
                    onChange={(e) =>
                      handleContactChange('facebookUrl', e.target.value)
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                    YouTube Channel URL
                  </label>
                  <input
                    type="url"
                    value={cmsData.contact.youtubeUrl}
                    onChange={(e) =>
                      handleContactChange('youtubeUrl', e.target.value)
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-sm"
                  />
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Bottom Status Bar */}
        <div className="px-6 py-3 border-t border-white/10 bg-black/70 flex items-center justify-between text-xs text-neutral-400 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
            <span>Changes are stored automatically in browser memory &amp; persist on refresh.</span>
          </div>
          <button
            onClick={() => setIsDashboardOpen(false)}
            className="px-5 py-2 rounded-xl bg-lime-400 text-black font-bold text-xs hover:bg-lime-300 cursor-pointer"
          >
            Apply &amp; View Site
          </button>
        </div>

      </div>
    </div>
  );
};
