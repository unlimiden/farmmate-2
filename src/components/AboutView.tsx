import React from 'react';
import { ViewMode, Language } from '../types';
import { translations } from '../data/translations';
import { Bug, ShieldCheck, Cpu, Award } from 'lucide-react';

interface AboutViewProps {
  onNavigate: (view: ViewMode) => void;
  language: Language;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate, language }) => {
  const t = translations[language];

  return (
    <div className="w-full bg-[#f8fbef] min-h-screen px-4 lg:px-8 py-12 font-sans max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">{t.about} Farm Mate</h1>
        <p className="text-gray-600 text-base leading-relaxed">
          Pioneering knowledge-based agricultural AI systems for regional managers and local farmers worldwide.
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">Protecting Harvests Through Advanced Neural Networks</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Farm Mate integrates cutting-edge computer vision models trained on millions of agricultural data points. Our systems identify crop pests, nutritional deficiencies, and fungal pathologies in seconds, empowering agronomists to apply targeted treatments with pinpoint accuracy.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              Whether managing thousands of hectares across northern district farms or smallholder family plots, Farm Mate ensures food security and sustainable soil stewardship.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="bg-white p-4 rounded-xl border border-[#e2ebd4] space-y-1">
              <h3 className="text-2xl font-extrabold text-[#14532d]">50+</h3>
              <p className="text-xs text-gray-500 font-medium">Major Crop Species Supported</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-[#e2ebd4] space-y-1">
              <h3 className="text-2xl font-extrabold text-[#14532d]">98.4%</h3>
              <p className="text-xs text-gray-500 font-medium">Diagnostic Accuracy Rate</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 flex justify-center">
          <div className="relative w-full max-w-lg aspect-4/3 rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-white">
            <img
              src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&q=80&w=800"
              alt="Agricultural fields and crops"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>

      {/* Core Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
        <div className="bg-white p-6 rounded-2xl border border-[#e2ebd4] space-y-3">
          <div className="w-12 h-12 rounded-xl bg-[#c5e6ad] text-[#14532d] flex items-center justify-center">
            <Cpu className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg text-gray-900">knowledge based AI</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Trained on expert agronomist datasets to recognize subtle symptoms of early blight, rust, and viral infections before spread occurs.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#e2ebd4] space-y-3">
          <div className="w-12 h-12 rounded-xl bg-[#c5e6ad] text-[#14532d] flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg text-gray-900">Enterprise Secure</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Bank-grade encryption protecting farm geospatial data, harvest metrics, and regional supervisor logs.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#e2ebd4] space-y-3">
          <div className="w-12 h-12 rounded-xl bg-[#c5e6ad] text-[#14532d] flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg text-gray-900">Sustainable Stewardship</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Promoting organic treatments and precise chemical usage to preserve soil micro-biomes for future generations.
          </p>
        </div>
      </div>
    </div>
  );
};
