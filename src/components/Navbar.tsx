import React, { useState } from 'react';
import { Globe, User, LogOut, Bug, Menu, X, LayoutDashboard, History, BookOpen, Bot, Mail, Info, Home } from 'lucide-react';
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (view: ViewMode) => {
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  return (
    <header className="w-full bg-[#f4f7ee] border-b border-[#e2ebd4] px-4 lg:px-8 py-3 sticky top-0 z-50 shadow-2xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => handleNavClick(user ? 'dashboard' : 'home')} 
          className="flex items-center gap-2 cursor-pointer group shrink-0"
        >
          <div className="w-9 h-9 rounded-lg bg-[#14532d] flex items-center justify-center text-white shadow-xs transition-transform group-hover:scale-105">
            <Bug className="w-5 h-5" />
          </div>
          <span className="text-lg sm:text-xl font-extrabold tracking-tight text-[#14532d] font-sans">
            {t.brandName}
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-5 lg:gap-7 font-medium text-xs lg:text-sm text-gray-700">
          <button
            onClick={() => onNavigate(user ? 'dashboard' : 'home')}
            className={`transition-colors hover:text-[#14532d] py-1 ${
              currentView === 'home' || (currentView === 'dashboard' && user)
                ? 'text-[#14532d] font-bold border-b-2 border-[#14532d]'
                : ''
            }`}
          >
            {t.home}
          </button>
          
          {user && (
            <>
              <button
                onClick={() => onNavigate('dashboard')}
                className={`transition-colors hover:text-[#14532d] py-1 ${
                  currentView === 'dashboard'
                    ? 'text-[#14532d] font-bold border-b-2 border-[#14532d]'
                    : ''
                }`}
              >
                {t.dashboard}
              </button>
              <button
                onClick={() => onNavigate('history')}
                className={`transition-colors hover:text-[#14532d] py-1 ${
                  currentView === 'history'
                    ? 'text-[#14532d] font-bold border-b-2 border-[#14532d]'
                    : ''
                }`}
              >
                {t.history}
              </button>
            </>
          )}

          <button
            onClick={() => onNavigate('symptoms')}
            className={`transition-colors hover:text-[#14532d] py-1 ${
              currentView === 'symptoms'
                ? 'text-[#14532d] font-bold border-b-2 border-[#14532d]'
                : ''
            }`}
          >
            {t.symptomsGuide}
          </button>

          <button
            onClick={() => onNavigate('chatbot')}
            className={`transition-colors hover:text-[#14532d] py-1 ${
              currentView === 'chatbot'
                ? 'text-[#14532d] font-bold border-b-2 border-[#14532d]'
                : ''
            }`}
          >
            {t.aiAssistant}
          </button>

          <button
            onClick={() => onNavigate('contact')}
            className={`transition-colors hover:text-[#14532d] py-1 ${
              currentView === 'contact'
                ? 'text-[#14532d] font-bold border-b-2 border-[#14532d]'
                : ''
            }`}
          >
            {t.contact}
          </button>

          <button
            onClick={() => onNavigate('about')}
            className={`transition-colors hover:text-[#14532d] py-1 ${
              currentView === 'about'
                ? 'text-[#14532d] font-bold border-b-2 border-[#14532d]'
                : ''
            }`}
          >
            {t.about}
          </button>
        </nav>

        {/* Right actions: Language Switcher & Desktop Profile / Login / Logout & Mobile Menu Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Switcher pill */}
          <div className="flex items-center bg-[#eaf2e0] border border-[#d2e2bd] rounded-full p-0.5 text-xs font-medium">
            <button
              onClick={() => onToggleLanguage('en')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full transition-all text-xs ${
                language === 'en'
                  ? 'bg-white text-[#14532d] shadow-2xs font-bold'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Globe className="w-3 h-3 text-[#14532d]" />
              <span className="hidden xs:inline">English</span>
              <span className="xs:hidden">EN</span>
            </button>
            <button
              onClick={() => onToggleLanguage('sw')}
              className={`px-2.5 py-1 rounded-full transition-all text-xs ${
                language === 'sw'
                  ? 'bg-white text-[#14532d] shadow-2xs font-bold'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span className="hidden xs:inline">Kiswahili</span>
              <span className="xs:hidden">SW</span>
            </button>
          </div>

          {/* Desktop User actions */}
          <div className="hidden md:flex items-center gap-2">
            {user ? (
              <>
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#d2e2bd] text-[#14532d] bg-white hover:bg-[#eaf2e0] text-xs font-semibold transition-colors"
                >
                  <User className="w-3.5 h-3.5" />
                  <span className="max-w-[100px] truncate">{user.name.split(' ')[0]}</span>
                </button>
                <button
                  onClick={onLogout}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#14532d] text-white hover:bg-[#0f4023] text-xs font-semibold shadow-2xs transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>{t.logout}</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => onNavigate('login')}
                  className="px-3.5 py-1.5 rounded-lg border border-[#14532d] text-[#14532d] bg-white hover:bg-[#eaf2e0] text-xs font-semibold transition-colors"
                >
                  {t.login}
                </button>
                <button
                  onClick={() => onNavigate('register')}
                  className="px-3.5 py-1.5 rounded-lg bg-[#14532d] text-white hover:bg-[#0f4023] text-xs font-semibold shadow-2xs transition-colors"
                >
                  {t.getStarted}
                </button>
              </>
            )}
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl border border-[#d2e2bd] bg-white text-[#14532d] hover:bg-[#eaf2e0] transition-colors focus:outline-none min-h-[40px] min-w-[40px] flex items-center justify-center"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-down Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 pt-3 border-t border-[#e2ebd4] bg-[#f8fbef] rounded-2xl p-4 shadow-lg space-y-3 animate-fadeIn">
          {user && (
            <div className="p-3 bg-white border border-[#e2ebd4] rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover border border-[#14532d]"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <p className="text-xs font-extrabold text-gray-900">{user.name}</p>
                  <p className="text-[10px] text-gray-500 font-semibold">{user.role} • {user.district}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  onLogout();
                  setMobileMenuOpen(false);
                }}
                className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg text-xs font-bold transition-colors"
                title={t.logout}
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
            <button
              onClick={() => handleNavClick(user ? 'dashboard' : 'home')}
              className={`p-3 rounded-xl border flex items-center gap-2 transition-all ${
                currentView === 'home' || (currentView === 'dashboard' && user)
                  ? 'bg-[#14532d] text-white border-[#14532d] font-bold shadow-xs'
                  : 'bg-white border-[#e2ebd4] text-gray-800 hover:bg-[#eaf2e0]'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>{t.home}</span>
            </button>

            {user && (
              <>
                <button
                  onClick={() => handleNavClick('dashboard')}
                  className={`p-3 rounded-xl border flex items-center gap-2 transition-all ${
                    currentView === 'dashboard'
                      ? 'bg-[#14532d] text-white border-[#14532d] font-bold shadow-xs'
                      : 'bg-white border-[#e2ebd4] text-gray-800 hover:bg-[#eaf2e0]'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>{t.dashboard}</span>
                </button>

                <button
                  onClick={() => handleNavClick('history')}
                  className={`p-3 rounded-xl border flex items-center gap-2 transition-all ${
                    currentView === 'history'
                      ? 'bg-[#14532d] text-white border-[#14532d] font-bold shadow-xs'
                      : 'bg-white border-[#e2ebd4] text-gray-800 hover:bg-[#eaf2e0]'
                  }`}
                >
                  <History className="w-4 h-4" />
                  <span>{t.history}</span>
                </button>
              </>
            )}

            <button
              onClick={() => handleNavClick('symptoms')}
              className={`p-3 rounded-xl border flex items-center gap-2 transition-all ${
                currentView === 'symptoms'
                  ? 'bg-[#14532d] text-white border-[#14532d] font-bold shadow-xs'
                  : 'bg-white border-[#e2ebd4] text-gray-800 hover:bg-[#eaf2e0]'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>{t.symptomsGuide}</span>
            </button>

            <button
              onClick={() => handleNavClick('chatbot')}
              className={`p-3 rounded-xl border flex items-center gap-2 transition-all ${
                currentView === 'chatbot'
                  ? 'bg-[#14532d] text-white border-[#14532d] font-bold shadow-xs'
                  : 'bg-white border-[#e2ebd4] text-gray-800 hover:bg-[#eaf2e0]'
              }`}
            >
              <Bot className="w-4 h-4" />
              <span>{t.aiAssistant}</span>
            </button>

            <button
              onClick={() => handleNavClick('contact')}
              className={`p-3 rounded-xl border flex items-center gap-2 transition-all ${
                currentView === 'contact'
                  ? 'bg-[#14532d] text-white border-[#14532d] font-bold shadow-xs'
                  : 'bg-white border-[#e2ebd4] text-gray-800 hover:bg-[#eaf2e0]'
              }`}
            >
              <Mail className="w-4 h-4" />
              <span>{t.contact}</span>
            </button>

            <button
              onClick={() => handleNavClick('about')}
              className={`p-3 rounded-xl border flex items-center gap-2 transition-all ${
                currentView === 'about'
                  ? 'bg-[#14532d] text-white border-[#14532d] font-bold shadow-xs'
                  : 'bg-white border-[#e2ebd4] text-gray-800 hover:bg-[#eaf2e0]'
              }`}
            >
              <Info className="w-4 h-4" />
              <span>{t.about}</span>
            </button>
          </div>

          {!user && (
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#e2ebd4]">
              <button
                onClick={() => handleNavClick('login')}
                className="w-full py-2.5 px-4 rounded-xl border border-[#14532d] text-[#14532d] bg-white text-xs font-bold text-center"
              >
                {t.login}
              </button>
              <button
                onClick={() => handleNavClick('register')}
                className="w-full py-2.5 px-4 rounded-xl bg-[#14532d] text-white text-xs font-bold text-center shadow-xs"
              >
                {t.getStarted}
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
