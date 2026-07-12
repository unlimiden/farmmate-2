import React from 'react';
import { ViewMode, Language } from '../types';
import { translations } from '../data/translations';
import { ArrowRight, Camera, Cpu, ShieldCheck, History } from 'lucide-react';

interface HomeViewProps {
  onNavigate: (view: ViewMode) => void;
  language: Language;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate, language }) => {
  const t = translations[language];

  return (
    <div className="w-full bg-[#f8fbef] min-h-screen flex flex-col justify-between font-sans">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 pt-12 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Text Content */}
        <div className="lg:col-span-7 space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-[1.1]">
            knowledge based <span className="text-[#14532d]">Crop Disease Identification</span> system
          </h1>
          <p className="text-lg text-gray-600 max-w-xl leading-relaxed">
            {t.heroDesc}
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={() => onNavigate('register')}
              className="flex items-center gap-2 px-6 py-3.5 bg-[#14532d] text-white rounded-lg font-semibold hover:bg-[#0f4023] shadow-md transition-all group"
            >
              <span>{t.getStarted}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => onNavigate('login')}
              className="px-6 py-3.5 bg-white border border-[#14532d] text-[#14532d] rounded-lg font-semibold hover:bg-[#f0f5e8] transition-colors shadow-xs"
            >
              {t.login}
            </button>
          </div>
        </div>

        {/* Right Hero Image */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-full max-w-md aspect-4/3 rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-white">
            <img
              src="https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&q=80&w=800"
              alt="Farmer holding tablet scanning crop leaf"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {/* Overlay badge matching screenshot aesthetic */}
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-md border border-gray-100 flex items-center gap-2 text-xs font-semibold text-[#14532d]">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>{language === 'sw' ? 'Hifadhidata ya Kilimo Hai (99.4% Sahihi)' : 'Database Registry Active (99.4% Match)'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Empowering Modern Stewardship Section */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16 w-full">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
            {t.empoweringTitle}
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            {t.empoweringDesc}
          </p>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div 
            onClick={() => onNavigate('dashboard')} 
            className="bg-[#fcfdfa] border border-[#e5edd8] rounded-2xl p-6 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#c5e6ad] text-[#14532d] flex items-center justify-center transition-transform group-hover:scale-110">
                <Camera className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-gray-900 group-hover:text-[#14532d] transition-colors">
                {t.feature1Title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {t.feature1Desc}
              </p>
            </div>
            <div className="pt-6 flex items-center gap-1 text-xs font-semibold text-[#14532d]">
              <span>Try scanner</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </div>

          {/* Card 2 */}
          <div 
            onClick={() => onNavigate('dashboard')} 
            className="bg-[#fcfdfa] border border-[#e5edd8] rounded-2xl p-6 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#c5e6ad] text-[#14532d] flex items-center justify-center transition-transform group-hover:scale-110">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-gray-900 group-hover:text-[#14532d] transition-colors">
                {t.feature2Title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {t.feature2Desc}
              </p>
            </div>
            <div className="pt-6 flex items-center gap-1 text-xs font-semibold text-[#14532d]">
              <span>Learn more</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </div>

          {/* Card 3 */}
          <div 
            onClick={() => onNavigate('dashboard')} 
            className="bg-[#fcfdfa] border border-[#e5edd8] rounded-2xl p-6 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#c5e6ad] text-[#14532d] flex items-center justify-center transition-transform group-hover:scale-110">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-gray-900 group-hover:text-[#14532d] transition-colors">
                {t.feature3Title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {t.feature3Desc}
              </p>
            </div>
            <div className="pt-6 flex items-center gap-1 text-xs font-semibold text-[#14532d]">
              <span>View guides</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </div>

          {/* Card 4 */}
          <div 
            onClick={() => onNavigate('history')} 
            className="bg-[#fcfdfa] border border-[#e5edd8] rounded-2xl p-6 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#c5e6ad] text-[#14532d] flex items-center justify-center transition-transform group-hover:scale-110">
                <History className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-gray-900 group-hover:text-[#14532d] transition-colors">
                {t.feature4Title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {t.feature4Desc}
              </p>
            </div>
            <div className="pt-6 flex items-center gap-1 text-xs font-semibold text-[#14532d]">
              <span>View reports</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
