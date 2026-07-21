import React from 'react';
import { Globe, User, LogOut, Bug } from 'lucide-react';
import { ViewMode, Language, UserProfile } from '../types';
import { translations } from '../data/translations';

interface NavbarProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  language: Language;
  onToggleLanguage: (lang: Language) => void;
  user: UserProfile | null;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  language,
  onToggleLanguage,
  user,
  onLogout,
}) => {
  const t = translations[language];

  return (
    <header className="w-full bg-[#f4f7ee] border-b border-[#e2ebd4] px-4 lg:px-8 py-3.5 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => onNavigate(user ? 'dashboard' : 'home')} 
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-lg bg-[#14532d] flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
            <Bug className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-[#14532d] font-sans">
            {t.brandName}
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 font-medium text-sm text-gray-700">
          <button
            onClick={() => onNavigate(user ? 'dashboard' : 'home')}
            className={`transition-colors hover:text-[#14532d] ${
              currentView === 'home' || (currentView === 'dashboard' && user)
                ? 'text-[#14532d] font-semibold border-b-2 border-[#14532d] pb-0.5'
                : ''
            }`}
          >
            {t.home}
          </button>
          
          {user && (
            <>
              <button
                onClick={() => onNavigate('dashboard')}
                className={`transition-colors hover:text-[#14532d] ${
                  currentView === 'dashboard'
                    ? 'text-[#14532d] font-semibold border-b-2 border-[#14532d] pb-0.5'
                    : ''
                }`}
              >
                {t.dashboard}
              </button>
              <button
                onClick={() => onNavigate('history')}
                className={`transition-colors hover:text-[#14532d] ${
                  currentView === 'history'
                    ? 'text-[#14532d] font-semibold border-b-2 border-[#14532d] pb-0.5'
                    : ''
                }`}
              >
                {t.history}
              </button>
            </>
          )}

          <button
            onClick={() => onNavigate('symptoms')}
            className={`transition-colors hover:text-[#14532d] ${
              currentView === 'symptoms'
                ? 'text-[#14532d] font-semibold border-b-2 border-[#14532d] pb-0.5'
                : ''
            }`}
          >
            {t.symptomsGuide}
          </button>

          <button
            onClick={() => onNavigate('chatbot')}
            className={`transition-colors hover:text-[#14532d] ${
              currentView === 'chatbot'
                ? 'text-[#14532d] font-semibold border-b-2 border-[#14532d] pb-0.5'
                : ''
            }`}
          >
            {t.aiAssistant}
          </button>

          <button
            onClick={() => onNavigate('contact')}
            className={`transition-colors hover:text-[#14532d] ${
              currentView === 'contact'
                ? 'text-[#14532d] font-semibold border-b-2 border-[#14532d] pb-0.5'
                : ''
            }`}
          >
            {t.contact}
          </button>

          <button
            onClick={() => onNavigate('about')}
            className={`transition-colors hover:text-[#14532d] ${
              currentView === 'about'
                ? 'text-[#14532d] font-semibold border-b-2 border-[#14532d] pb-0.5'
                : ''
            }`}
          >
            {t.about}
          </button>
        </nav>

        {/* Right actions: Language Switcher & Profile/Login/Logout */}
        <div className="flex items-center gap-3">
          {/* Language Switcher pill as seen in screenshot */}
          <div className="flex items-center bg-[#eaf2e0] border border-[#d2e2bd] rounded-full p-1 text-xs font-medium">
            <button
              onClick={() => onToggleLanguage('en')}
              className={`flex items-center gap-1 px-3 py-1 rounded-full transition-all ${
                language === 'en'
                  ? 'bg-white text-[#14532d] shadow-xs font-semibold'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-[#14532d]" />
              <span>English</span>
            </button>
            <button
              onClick={() => onToggleLanguage('sw')}
              className={`px-3 py-1 rounded-full transition-all ${
                language === 'sw'
                  ? 'bg-white text-[#14532d] shadow-xs font-semibold'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span>Kiswahili</span>
            </button>
          </div>

          {user ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigate('dashboard')}
                className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#d2e2bd] text-[#14532d] bg-white hover:bg-[#eaf2e0] text-sm font-medium transition-colors"
              >
                <User className="w-4 h-4" />
                <span>{t.profile}</span>
              </button>
              <button
                onClick={onLogout}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#14532d] text-white hover:bg-[#0f4023] text-sm font-semibold shadow-xs transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">{t.logout}</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigate('login')}
                className="px-4 py-2 rounded-lg border border-[#14532d] text-[#14532d] bg-white hover:bg-[#eaf2e0] text-sm font-semibold transition-colors"
              >
                {t.login}
              </button>
              <button
                onClick={() => onNavigate('register')}
                className="hidden sm:inline-flex px-4 py-2 rounded-lg bg-[#14532d] text-white hover:bg-[#0f4023] text-sm font-semibold shadow-xs transition-colors"
              >
                {t.getStarted}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
