import React from 'react';
import { DiagnosisItem, Language } from '../types';
import { X, Calendar, CheckCircle2, AlertTriangle, Pill, Stethoscope, Database } from 'lucide-react';

interface DiagnosisDetailModalProps {
  item: DiagnosisItem | null;
  onClose: () => void;
  language: Language;
}

export const DiagnosisDetailModal: React.FC<DiagnosisDetailModalProps> = ({
  item,
  onClose,
  language,
}) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white border border-[#e2ebd4] rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative space-y-6">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with image */}
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-gray-100">
          <img
            src={item.image}
            alt={item.crop}
            className="w-28 h-28 rounded-2xl object-cover border-2 border-emerald-600 shadow-md"
            referrerPolicy="no-referrer"
          />
          <div className="space-y-2 text-center sm:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                {item.crop} {language === 'sw' ? 'Ripoti ya Hifadhidata' : 'Database Record'}
              </span>
              {item.status === 'Success' ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {language === 'sw' ? 'Afya Njema' : 'Healthy'}
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  {language === 'sw' ? 'Inahitaji Hatua' : 'Requires Action'}
                </span>
              )}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">{item.disease}</h2>
            <div className="flex items-center justify-center sm:justify-start gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {item.date}
              </span>
              <span className="flex items-center gap-1 font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                <Database className="w-3 h-3" />
                {item.confidence}% {language === 'sw' ? 'Ulinganishaji wa Hifadhidata' : 'Database Match'}
              </span>
            </div>
          </div>
        </div>

        {/* Symptoms Section */}
        {item.symptoms && item.symptoms.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-gray-900 flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-[#14532d]" />
              <span>{language === 'sw' ? 'Dalili Zilizorekodiwa' : 'Recorded Symptoms'}</span>
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {item.symptoms.map((symptom, idx) => (
                <li key={idx} className="bg-[#fcfdfa] border border-[#e5edd8] rounded-xl p-3 text-xs text-gray-700 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#14532d] mt-1.5 shrink-0"></span>
                  <span>{symptom}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Treatment Recommendation */}
        <div className="space-y-3">
          <h4 className="font-bold text-sm text-gray-900 flex items-center gap-2">
            <Pill className="w-4 h-4 text-[#14532d]" />
            <span>{language === 'sw' ? 'Mwongozo wa Matibabu ya Hifadhidata' : 'Database Treatment Protocol'}</span>
          </h4>
          <div className="bg-[#f0f5e8] border border-[#d2e2bd] rounded-2xl p-4 text-sm text-gray-800 leading-relaxed">
            {item.treatment}
          </div>
        </div>

        {/* Footer actions */}
        <div className="pt-4 flex items-center justify-end gap-3 border-t border-gray-100">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-[#14532d] text-white text-sm font-semibold hover:bg-[#0f4023] shadow-md transition-all"
          >
            {language === 'sw' ? 'Funga Ripoti' : 'Close Report'}
          </button>
        </div>
      </div>
    </div>
  );
};
