import React from 'react';
import { ViewMode, Language, UserProfile, DiagnosisItem } from '../types';
import { translations } from '../data/translations';
import { Camera, ShieldCheck, History, Pill, UserCheck, ArrowRight, AlertTriangle, CheckCircle2, TrendingUp } from 'lucide-react';

interface DashboardViewProps {
  user: UserProfile;
  diagnoses: DiagnosisItem[];
  onNavigate: (view: ViewMode) => void;
  language: Language;
  onOpenScanModal: () => void;
  onSelectDiagnosis: (item: DiagnosisItem) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  user,
  diagnoses,
  onNavigate,
  language,
  onOpenScanModal,
  onSelectDiagnosis,
}) => {
  const t = translations[language];

  return (
    <div className="w-full bg-[#f8fbef] min-h-screen px-4 lg:px-8 py-8 font-sans space-y-8 max-w-7xl mx-auto">
      {/* Top Header & Supervisor Card Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        <div className="lg:col-span-8 space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
            Hello, {user.name}
          </h1>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            Welcome back to your stewardship portal. Here is your farm's health overview.
          </p>
        </div>

        {/* Supervisor Card */}
        <div className="lg:col-span-4 bg-white border border-[#e2ebd4] rounded-2xl p-4 shadow-xs flex items-center gap-4">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-14 h-14 rounded-full object-cover border-2 border-[#14532d]"
            referrerPolicy="no-referrer"
          />
          <div>
            <h4 className="font-bold text-gray-900 text-sm">{user.role}</h4>
            <p className="text-xs text-gray-500 font-medium">{user.district}</p>
          </div>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-white border-l-4 border-l-[#14532d] border border-[#e2ebd4] rounded-xl p-5 shadow-xs space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-500">{t.totalDiagnoses}</p>
          <div className="flex items-baseline justify-between">
            <h3 className="text-3xl font-extrabold text-gray-900">{diagnoses.length}</h3>
            <span className="flex items-center text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
              <TrendingUp className="w-3 h-3 mr-1" />
              Active Database Records
            </span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white border-l-4 border-l-[#16a34a] border border-[#e2ebd4] rounded-xl p-5 shadow-xs space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-500">{t.healthyCrops}</p>
          <div className="flex items-baseline justify-between">
            <h3 className="text-3xl font-extrabold text-[#16a34a]">
              {diagnoses.filter(d => d.status === 'Success').length}
            </h3>
            <span className="text-xs font-medium text-gray-500">
              {diagnoses.length > 0
                ? ((diagnoses.filter(d => d.status === 'Success').length / diagnoses.length) * 100).toFixed(1)
                : 0}% of total scans
            </span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white border-l-4 border-l-amber-600 border border-[#e2ebd4] rounded-xl p-5 shadow-xs space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-500">{t.diseasedCrops}</p>
          <div className="flex items-baseline justify-between">
            <h3 className="text-3xl font-extrabold text-amber-700">
              {diagnoses.filter(d => d.status !== 'Success').length}
            </h3>
            <span className="flex items-center text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
              <AlertTriangle className="w-3 h-3 mr-1" />
              {diagnoses.filter(d => d.status !== 'Success').length > 0 ? 'Action required' : 'All clear'}
            </span>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white border-l-4 border-l-[#7c2d12] border border-[#e2ebd4] rounded-xl p-5 shadow-xs space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-500">{t.treatmentsViewed}</p>
          <div className="flex items-baseline justify-between">
            <h3 className="text-3xl font-extrabold text-[#7c2d12]">
              {diagnoses.filter(d => d.status !== 'Success' && d.treatment).length}
            </h3>
            <span className="text-xs font-medium text-gray-500">
              Across {new Set(diagnoses.map(d => d.crop)).size} crop types
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Layout (Table + Quick Actions) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Recent Diagnoses Table */}
        <div className="lg:col-span-8 bg-white border border-[#e2ebd4] rounded-2xl shadow-xs p-6 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <h3 className="font-bold text-lg text-gray-900">{t.recentDiagnoses}</h3>
            <button
              onClick={() => onNavigate('history')}
              className="text-xs font-semibold text-[#14532d] hover:underline flex items-center gap-1"
            >
              <span>{t.viewAllHistory}</span>
              <History className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-xs font-semibold uppercase text-gray-500 border-b border-gray-100">
                  <th className="pb-3">Date</th>
                  <th className="pb-3">Crop</th>
                  <th className="pb-3">Disease</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {diagnoses.slice(0, 4).map((item) => (
                  <tr key={item.id} className="hover:bg-[#fcfdfa] transition-colors">
                    <td className="py-4 text-gray-600 font-medium text-xs">{item.date}</td>
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.crop}
                          className="w-9 h-9 rounded-lg object-cover border border-gray-200"
                          referrerPolicy="no-referrer"
                        />
                        <span className="font-semibold text-gray-900">{item.crop}</span>
                      </div>
                    </td>
                    <td className="py-4 text-gray-700">{item.disease}</td>
                    <td className="py-4">
                      {item.status === 'Success' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3" />
                          Success
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                          <AlertTriangle className="w-3 h-3" />
                          Warning
                        </span>
                      )}
                    </td>
                    <td className="py-4 text-right">
                      <button
                        onClick={() => onSelectDiagnosis(item)}
                        className="px-3 py-1.5 rounded-lg bg-[#14532d] text-white hover:bg-[#0f4023] text-xs font-semibold shadow-xs transition-colors"
                      >
                        View Report
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Quick Actions Panel */}
        <div className="lg:col-span-4 space-y-4">
          <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
            <span>{t.quickActions}</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          </h3>

          <div className="space-y-3">
            {/* Quick Action 1: Upload Image (Triggers Scan) */}
            <div
              onClick={onOpenScanModal}
              className="bg-white border border-[#e2ebd4] rounded-xl p-4 shadow-xs hover:border-[#14532d] hover:shadow-md transition-all cursor-pointer flex items-center gap-4 group"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#14532d] flex items-center justify-center group-hover:scale-110 transition-transform">
                <Camera className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-sm text-gray-900">Upload Image</h4>
                <p className="text-xs text-gray-500">Start a new diagnosis</p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#14532d] group-hover:translate-x-1 transition-all" />
            </div>

            {/* Quick Action 2: Crop Selection */}
            <div
              onClick={() => onNavigate('history')}
              className="bg-white border border-[#e2ebd4] rounded-xl p-4 shadow-xs hover:border-[#14532d] hover:shadow-md transition-all cursor-pointer flex items-center gap-4 group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#e5edd8] text-[#14532d] flex items-center justify-center group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-sm text-gray-900">{t.cropSelection}</h4>
                <p className="text-xs text-gray-500">Manage your farm registry</p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#14532d] group-hover:translate-x-1 transition-all" />
            </div>

            {/* Quick Action 3: Diagnosis History */}
            <div
              onClick={() => onNavigate('history')}
              className="bg-white border border-[#e2ebd4] rounded-xl p-4 shadow-xs hover:border-[#14532d] hover:shadow-md transition-all cursor-pointer flex items-center gap-4 group"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                <History className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-sm text-gray-900">{t.history}</h4>
                <p className="text-xs text-gray-500">Review past reports</p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#14532d] group-hover:translate-x-1 transition-all" />
            </div>

            {/* Quick Action 4: Treatment Library */}
            <div
              onClick={() => onNavigate('history')}
              className="bg-white border border-[#e2ebd4] rounded-xl p-4 shadow-xs hover:border-[#14532d] hover:shadow-md transition-all cursor-pointer flex items-center gap-4 group"
            >
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Pill className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-sm text-gray-900">{t.treatmentLibrary}</h4>
                <p className="text-xs text-gray-500">Professional cure database</p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#14532d] group-hover:translate-x-1 transition-all" />
            </div>

            {/* Quick Action 5: Agricultural Officer */}
            <div
              onClick={() => onNavigate('contact')}
              className="bg-white border border-dashed border-[#14532d]/40 rounded-xl p-4 shadow-xs hover:border-[#14532d] hover:shadow-md transition-all cursor-pointer flex items-center gap-4 group"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#14532d] flex items-center justify-center group-hover:scale-110 transition-transform">
                <UserCheck className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-sm text-gray-900">{t.agriculturalOfficer}</h4>
                <p className="text-xs text-gray-500">{t.getExpertAdvice}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#14532d] group-hover:translate-x-1 transition-all" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
