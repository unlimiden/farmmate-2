import React, { useState } from 'react';
import { ViewMode, Language, DiagnosisItem } from '../types';
import { translations } from '../data/translations';
import { Search, Filter, CheckCircle2, AlertTriangle, ArrowRight, Calendar } from 'lucide-react';

interface HistoryViewProps {
  diagnoses: DiagnosisItem[];
  onNavigate: (view: ViewMode) => void;
  language: Language;
  onSelectDiagnosis: (item: DiagnosisItem) => void;
  onOpenScanModal: () => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  diagnoses,
  onNavigate,
  language,
  onSelectDiagnosis,
  onOpenScanModal,
}) => {
  const t = translations[language];
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Success' | 'Warning' | 'Critical'>('All');

  const filteredDiagnoses = diagnoses.filter((item) => {
    const matchesSearch = item.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.disease.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="w-full bg-[#f8fbef] min-h-screen px-4 lg:px-8 py-8 font-sans max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{t.history}</h1>
          <p className="text-gray-600 text-sm">Comprehensive log of all AI crop scans and pathology reports.</p>
        </div>
        <button
          onClick={onOpenScanModal}
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[#14532d] text-white rounded-lg text-sm font-semibold hover:bg-[#0f4023] shadow-xs transition-colors"
        >
          <span>New AI Scan</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-[#e2ebd4] rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by crop or disease..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#14532d]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <Filter className="w-4 h-4 text-gray-500 mr-1" />
          {(['All', 'Success', 'Warning', 'Critical'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                statusFilter === status
                  ? 'bg-[#14532d] text-white shadow-xs'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Diagnoses Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDiagnoses.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectDiagnosis(item)}
            className="bg-white border border-[#e2ebd4] rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
                <img
                  src={item.image}
                  alt={item.crop}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 right-3">
                  {item.status === 'Success' ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500 text-white shadow-sm">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Success
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500 text-white shadow-sm">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      Warning
                    </span>
                  )}
                </div>
              </div>

              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="flex items-center gap-1 font-medium">
                    <Calendar className="w-3.5 h-3.5" />
                    {item.date}
                  </span>
                  <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                    {item.confidence}% Match
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#14532d] transition-colors">
                  {item.crop} - <span className="font-medium text-gray-700">{item.disease}</span>
                </h3>

                <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                  {item.treatment}
                </p>
              </div>
            </div>

            <div className="px-5 py-3.5 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-[#14532d]">
              <span>View full AI pathology report</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        ))}
      </div>

      {filteredDiagnoses.length === 0 && (
        <div className="text-center py-16 bg-white border border-[#e2ebd4] rounded-2xl space-y-3">
          <p className="text-gray-500 text-sm">No diagnosis records found matching your filters.</p>
          <button
            onClick={() => { setSearchTerm(''); setStatusFilter('All'); }}
            className="text-xs font-semibold text-[#14532d] underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
};
