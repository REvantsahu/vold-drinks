import React, { useState } from 'react';
import { Send, CheckCircle2, Mail, MapPin, Sparkles, ArrowUp } from 'lucide-react';
import { audioManager } from '../utils/audio';
import { InstagramIcon, FacebookIcon, YoutubeIcon } from './SocialIcons';

export const ContactFooterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [inquiryType, setInquiryType] = useState('consumer');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    setErrorMsg('');
    setIsSubmitting(true);

    // Simulate reliable dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      audioManager.playFizz();
    }, 800);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="relative bg-[#040805] text-white pt-24 pb-12 border-t border-white/10 overflow-hidden">
      {/* Soft background ambient gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-lime-900/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Contact / Newsletter Card */}
        <div className="relative rounded-3xl bg-neutral-900/70 border border-white/15 p-8 sm:p-12 lg:p-16 mb-20 backdrop-blur-2xl shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            {/* Left Column: Heading */}
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-4">
                <Sparkles className="w-3.5 h-3.5 text-lime-400" />
                <span className="text-xs uppercase tracking-[0.2em] font-mono text-neutral-300 font-semibold">
                  Stay Refreshed
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
                Join the <span className="text-lime-400">VOLD Collective</span>
              </h2>
              <p className="text-base text-neutral-300 leading-relaxed max-w-lg mb-6">
                Receive exclusive seasonal drop notifications, invitations to tasting pop-ups, and behind-the-scenes stories from our family orchards.
              </p>

              <div className="space-y-3 text-sm text-neutral-400 font-mono">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-lime-400" />
                  <a href="mailto:hello@voldbeverages.com" className="hover:text-white transition-colors">
                    hello@voldbeverages.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-lime-400" />
                  <span>Cold Press Artisan Facility & Distribution HQ</span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Subscription / Wholesale Form */}
            <div className="lg:col-span-6">
              {isSubmitted ? (
                <div className="p-8 rounded-2xl bg-lime-950/40 border border-lime-400/40 text-center animate-fadeIn">
                  <CheckCircle2 className="w-12 h-12 text-lime-400 mx-auto mb-3" />
                  <h3 className="text-xl font-bold text-white mb-2">Welcome to VOLD!</h3>
                  <p className="text-sm text-neutral-300">
                    Thank you, <strong className="text-white">{name || email}</strong>. A welcome tasting guide has been dispatched to your inbox.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setEmail('');
                      setName('');
                    }}
                    className="mt-6 px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold uppercase tracking-wider text-lime-300 cursor-pointer"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Inquiry toggle */}
                  <div className="flex gap-2 p-1 rounded-xl bg-black/40 border border-white/10">
                    <button
                      type="button"
                      onClick={() => setInquiryType('consumer')}
                      className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                        inquiryType === 'consumer' ? 'bg-lime-400 text-black shadow-sm' : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      General & Fan Club
                    </button>
                    <button
                      type="button"
                      onClick={() => setInquiryType('wholesale')}
                      className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                        inquiryType === 'wholesale' ? 'bg-lime-400 text-black shadow-sm' : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      Wholesale & Cafes
                    </button>
                  </div>

                  <div>
                    <label htmlFor="user-name" className="block text-xs font-mono uppercase text-neutral-300 mb-1">
                      Your Name / Venue (Optional)
                    </label>
                    <input
                      id="user-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Alex Miller"
                      className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/15 text-white placeholder-neutral-500 focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="user-email" className="block text-xs font-mono uppercase text-neutral-300 mb-1">
                      Email Address *
                    </label>
                    <input
                      id="user-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@domain.com"
                      className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/15 text-white placeholder-neutral-500 focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 text-sm"
                    />
                  </div>

                  {errorMsg && (
                    <p className="text-xs text-rose-400 font-semibold">{errorMsg}</p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl bg-lime-400 hover:bg-lime-300 text-black font-bold text-sm tracking-wide transition-all shadow-lg shadow-lime-400/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Transmitting...</span>
                    ) : (
                      <>
                        <span>{inquiryType === 'wholesale' ? 'Request Wholesale Catalog' : 'Subscribe to VOLD Drops'}</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-neutral-500 text-center">
                    We respect your privacy. No spam, ever. Unsubscribe anytime.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-16 border-b border-white/10">
          {/* Brand info */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/images/vold-logo.svg"
                alt="VOLD Beverages"
                className="h-10 w-auto"
              />
            </div>
            <p className="text-xs text-neutral-400 max-w-sm leading-relaxed mb-6">
              VOLD is an artisan beverage company crafting natural fruit drinks, sparkling citrus coolers, and botanical refreshments using pure cold-pressed fruit juices and mineral spring water.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/voldbeverages"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:border-lime-400 hover:text-lime-400 transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com/voldbeverages"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:border-lime-400 hover:text-lime-400 transition-colors"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com/@voldbeverages"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:border-lime-400 hover:text-lime-400 transition-colors"
                aria-label="YouTube"
              >
                <YoutubeIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Drinks */}
          <div>
            <span className="block text-xs font-mono uppercase tracking-wider text-neutral-400 font-bold mb-4">
              Drinks
            </span>
            <ul className="space-y-2 text-xs text-neutral-300">
              <li><a href="#drinks" className="hover:text-lime-400 transition-colors">Orange Citrus</a></li>
              <li><a href="#drinks" className="hover:text-lime-400 transition-colors">Mango Gold</a></li>
              <li><a href="#drinks" className="hover:text-lime-400 transition-colors">Wild Strawberry</a></li>
              <li><a href="#drinks" className="hover:text-lime-400 transition-colors">Lime Mint Cooler</a></li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <span className="block text-xs font-mono uppercase tracking-wider text-neutral-400 font-bold mb-4">
              Company
            </span>
            <ul className="space-y-2 text-xs text-neutral-300">
              <li><a href="#about" className="hover:text-lime-400 transition-colors">Our Story</a></li>
              <li><a href="#ingredients" className="hover:text-lime-400 transition-colors">Ingredients</a></li>
              <li><a href="#gallery" className="hover:text-lime-400 transition-colors">Visual Archive</a></li>
              <li><a href="#faq" className="hover:text-lime-400 transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Column 4: Sourcing & Legal */}
          <div>
            <span className="block text-xs font-mono uppercase tracking-wider text-neutral-400 font-bold mb-4">
              Sustainability
            </span>
            <ul className="space-y-2 text-xs text-neutral-300">
              <li><span className="text-neutral-400">100% Recyclable Cans</span></li>
              <li><span className="text-neutral-400">Regenerative Orchards</span></li>
              <li><span className="text-neutral-400">Zero Added Sugars</span></li>
              <li><span className="text-neutral-400">Certified Non-GMO</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Discreet Revant Sahu Developer Credit */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            © {new Date().getFullYear()} VOLD Beverages Inc. All rights reserved.
          </div>

          {/* Requested Developer Credit */}
          <div className="text-neutral-400 hover:text-white transition-colors flex items-center gap-1 font-mono text-[11px]">
            <span>Designed &amp; developed by</span>
            <span className="text-lime-400 font-semibold">Revant Sahu</span>
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Scroll back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-lime-400" />
          </button>
        </div>

      </div>
    </footer>
  );
};
