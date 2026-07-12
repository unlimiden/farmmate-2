import React, { useState } from 'react';
import { ViewMode, Language } from '../types';
import { translations } from '../data/translations';
import { Bug, ArrowRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: ViewMode) => void;
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, language }) => {
  const t = translations[language];
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="w-full bg-[#e8eedd] border-t border-[#d5e2c2] pt-12 pb-8 px-4 lg:px-8 mt-16 text-gray-700">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-[#d2e2bd]">
        {/* Brand Column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#14532d] flex items-center justify-center text-white">
              <Bug className="w-4 h-4" />
            </div>
            <span className="text-xl font-bold tracking-tight text-[#14532d]">
              {t.brandName}
            </span>
          </div>
          <p className="text-sm text-gray-600 max-w-sm leading-relaxed">
            Professional Stewardship of the Land. Advanced AI diagnostics and automated crop health tracking for regional agricultural managers.
          </p>
          <p className="text-xs text-gray-500">
            {t.copyright}
          </p>
        </div>

        {/* Resources */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm text-[#14532d] tracking-wide uppercase">
            {t.resources}
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <button onClick={() => onNavigate('about')} className="hover:text-[#14532d] transition-colors">
                {t.about}
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('history')} className="hover:text-[#14532d] transition-colors">
                {t.history}
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('contact')} className="hover:text-[#14532d] transition-colors">
                {t.helpCenter}
              </button>
            </li>
            <li>
              <span className="text-gray-500 cursor-not-allowed">API Documentation</span>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm text-[#14532d] tracking-wide uppercase">
            {t.support}
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <button onClick={() => onNavigate('contact')} className="hover:text-[#14532d] transition-colors">
                {t.contactUs}
              </button>
            </li>
            <li>
              <span className="text-gray-500">Farmer Guides</span>
            </li>
            <li>
              <span className="text-gray-500">Community Forums</span>
            </li>
            <li>
              <span className="text-gray-500">{t.privacyPolicy}</span>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm text-[#14532d] tracking-wide uppercase">
            {t.newsletter}
          </h4>
          <p className="text-xs text-gray-600">
            {t.newsletterDesc}
          </p>
          {subscribed ? (
            <div className="p-3 bg-[#d5e2c2] text-[#14532d] text-xs font-medium rounded-lg">
              ✓ Successfully subscribed to agricultural updates!
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Your Email Address"
                className="w-full px-3 py-2 bg-white border border-[#c5d8a8] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#14532d]"
              />
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-1.5 px-4 py-2 bg-[#14532d] text-white rounded-lg text-sm font-semibold hover:bg-[#0f4023] transition-colors shadow-xs"
              >
                <span>{t.joinNewsletter}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
        <div className="flex gap-6">
          <button onClick={() => onNavigate('contact')} className="hover:underline">{t.privacyPolicy}</button>
          <button onClick={() => onNavigate('contact')} className="hover:underline">{t.helpCenter}</button>
          <button onClick={() => onNavigate('contact')} className="hover:underline">{t.terms}</button>
        </div>
        <p>{t.copyright}</p>
      </div>
    </footer>
  );
};
