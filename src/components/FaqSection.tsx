import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { audioManager } from '../utils/audio';
import { useCms } from '../context/CmsContext';

export const FaqSection: React.FC = () => {
  const { cmsData } = useCms();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
    audioManager.playIceClink();
  };

  return (
    <section id="faq" className="relative py-24 sm:py-32 bg-[#080d0a] text-white overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-lime-400" />
            <span className="text-xs uppercase tracking-[0.2em] font-mono text-neutral-300 font-semibold">
              Got Questions?
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Frequently Asked <span className="text-lime-400">Questions</span>
          </h2>
          <p className="text-base text-neutral-300 max-w-xl mx-auto">
            Everything you need to know about our cold-pressed process, real fruit formulation, packaging, and stockist distribution.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {cmsData.faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-neutral-900/90 border-lime-400/40 shadow-lg shadow-lime-950/20'
                    : 'bg-neutral-900/40 border-white/10 hover:border-white/20'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                  id={`faq-btn-${idx}`}
                  className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-400"
                >
                  <span className="text-base sm:text-lg font-bold text-white tracking-tight">
                    {faq.question}
                  </span>
                  <div
                    className={`p-1.5 rounded-full bg-white/5 text-lime-400 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-lime-400 text-black' : ''
                    }`}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${idx}`}
                    role="region"
                    aria-labelledby={`faq-btn-${idx}`}
                    className="px-6 pb-6 text-sm sm:text-base text-neutral-300 leading-relaxed border-t border-white/5 pt-4 animate-fadeIn"
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
