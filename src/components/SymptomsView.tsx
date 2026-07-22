import React, { useState, useEffect } from 'react';
import { ViewMode, Language } from '../types';
import { translations } from '../data/translations';
import { 
  Search, 
  Sprout, 
  HeartPulse, 
  ShieldCheck, 
  Info, 
  ChevronDown, 
  ChevronUp, 
  AlertTriangle, 
  AlertCircle,
  HelpCircle,
  Activity,
  CheckCircle2,
  X,
  FileText
} from 'lucide-react';
import { fetchWithAuth } from '../lib/api';

interface Crop {
  crop_id: string;
  crop_name: string;
  scientific_name: string;
  category: string;
  local_name_sw: string;
  notes?: string;
}

interface Symptom {
  symptom_id: string;
  disease_id: string;
  disease_name: string;
  symptom_description: string;
  severity_stage: string;
}

interface Treatment {
  treatment_id: string;
  disease_id: string;
  disease_name: string;
  treatment_recommendation: string;
  treatment_type: string;
}

interface Prevention {
  prevention_id: string;
  disease_id: string;
  disease_name: string;
  prevention_method: string;
}

interface DetailedDisease {
  disease_id: string;
  crop_id: string;
  crop_name: string;
  disease_name: string;
  causal_agent: string;
  type: string;
  description: string;
  symptoms: Symptom[];
  treatments: Treatment[];
  preventions: Prevention[];
}

interface SymptomsViewProps {
  language: Language;
  onNavigate: (view: ViewMode) => void;
}

export const SymptomsView: React.FC<SymptomsViewProps> = ({ language, onNavigate }) => {
  const t = translations[language];
  const isSw = language === 'sw';

  const [crops, setCrops] = useState<Crop[]>([]);
  const [diseases, setDiseases] = useState<DetailedDisease[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Filter states
  const [selectedCropId, setSelectedCropId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [expandedDiseaseId, setExpandedDiseaseId] = useState<string | null>(null);

  // Fetch data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [cropsRes, diseasesRes] = await Promise.all([
          fetchWithAuth('/api/crops'),
          fetchWithAuth('/api/diseases/detailed')
        ]);

        if (!cropsRes.ok || !diseasesRes.ok) {
          throw new Error('Failed to load database records.');
        }

        const cropsData = await cropsRes.json();
        const diseasesData = await diseasesRes.json();

        if (cropsData.success) {
          setCrops(cropsData.crops || []);
        }
        if (diseasesData.success) {
          setDiseases(diseasesData.diseases || []);
        }
      } catch (err: any) {
        console.error('Error loading symptoms data:', err);
        setError(isSw ? 'Imeshindikana kupakia rekodi za hifadhidata.' : 'Failed to load database records.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [isSw]);

  // Extract unique disease/pathogen types for the filter dropdown
  const pathogenTypes = Array.from(new Set(diseases.map(d => d.type || 'Other'))).sort();

  // Filter Logic
  const filteredDiseases = diseases.filter(disease => {
    // 1. Crop filter
    if (selectedCropId !== 'all' && disease.crop_id !== selectedCropId) {
      return false;
    }

    // 2. Pathogen type filter
    if (selectedType !== 'all' && disease.type !== selectedType) {
      return false;
    }

    // 3. Search query (matches disease name, description, crop name, causal agent, symptom descriptions, or treatments)
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      const matchName = String(disease.disease_name || '').toLowerCase().includes(query);
      const matchDesc = String(disease.description || '').toLowerCase().includes(query);
      const matchCrop = String(disease.crop_name || '').toLowerCase().includes(query);
      const matchAgent = String(disease.causal_agent || '').toLowerCase().includes(query);
      
      const matchSymptoms = disease.symptoms?.some(s => 
        String(s.symptom_description || '').toLowerCase().includes(query) || 
        String(s.severity_stage || '').toLowerCase().includes(query)
      );

      const matchTreatments = disease.treatments?.some(tr => 
        String(tr.treatment_recommendation || '').toLowerCase().includes(query) ||
        String(tr.treatment_type || '').toLowerCase().includes(query)
      );

      const matchPreventions = disease.preventions?.some(pr => 
        String(pr.prevention_method || '').toLowerCase().includes(query)
      );

      return matchName || matchDesc || matchCrop || matchAgent || matchSymptoms || matchTreatments || matchPreventions;
    }

    return true;
  });

  const toggleExpand = (diseaseId: string) => {
    if (expandedDiseaseId === diseaseId) {
      setExpandedDiseaseId(null);
    } else {
      setExpandedDiseaseId(diseaseId);
    }
  };

  const getPathogenBadgeStyles = (type?: string) => {
    const cleanType = String(type || '').toLowerCase();
    if (cleanType.includes('fungal')) {
      return 'bg-purple-50 text-purple-700 border-purple-200';
    } else if (cleanType.includes('viral')) {
      return 'bg-blue-50 text-blue-700 border-blue-200';
    } else if (cleanType.includes('bacterial')) {
      return 'bg-amber-50 text-amber-700 border-amber-200';
    } else if (cleanType.includes('pest')) {
      return 'bg-rose-50 text-rose-700 border-rose-200';
    } else {
      return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const clearFilters = () => {
    setSelectedCropId('all');
    setSelectedType('all');
    setSearchQuery('');
    setExpandedDiseaseId(null);
  };

  return (
    <div className="w-full bg-[#f8fbef] min-h-screen py-8 px-4 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#eaf2e0] border border-[#d2e2bd] rounded-full text-xs font-semibold text-[#14532d] uppercase tracking-wide">
            <Activity className="w-3.5 h-3.5" />
            <span>{isSw ? 'Hifadhidata ya Ushauri' : 'Database Advisory Portal'}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
            {isSw ? 'Mwongozo wa Dalili & Matibabu' : 'Symptom & Treatment Guide'}
          </h1>
          <p className="text-sm text-gray-600 leading-relaxed">
            {isSw 
              ? 'Tafuta kwa urahisi dalili za magonjwa ya mazao kulingana na aina ya zao ili kupata njia salama za kuzuia, matibabu, na ushauri wa kitaalamu wa kilimo.' 
              : 'Easily search crop disease symptoms by crop type to access prevention strategies, treatment recommendations, and professional agricultural guidance.'
            }
          </p>
        </div>

        {/* Database Search & Filter Panel */}
        <div className="bg-white border border-[#e2ebd4] rounded-2xl p-5 shadow-sm space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <Search className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isSw ? 'Tafuta dalili (mf. madoa ya manjano, kunyauka)...' : 'Search symptoms (e.g., yellow spots, wilting, rust)...'}
                className="w-full pl-10 pr-4 py-3 bg-[#fcfdfa] border border-[#d8e5c4] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#14532d]"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Pathogen Type Filter */}
            <div className="md:col-span-3">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3.5 py-3 bg-[#fcfdfa] border border-[#d8e5c4] rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#14532d]"
              >
                <option value="all">{isSw ? 'Aina Zote za Magonjwa' : 'All Pathology Types'}</option>
                {pathogenTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Reset Filter Button */}
            <div className="md:col-span-3">
              <button
                onClick={clearFilters}
                className="w-full py-3 border border-[#d8e5c4] text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <span>{isSw ? 'Safisha Kichujio' : 'Clear Filters'}</span>
              </button>
            </div>

          </div>

          {/* Horizontal Crop Selection Pills */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
              {isSw ? 'Chagua Zao la Kilimo' : 'Select Agricultural Crop'}
            </label>
            <div className="flex overflow-x-auto sm:flex-wrap gap-2 pt-1 pb-2 no-scrollbar scroll-smooth -mx-1 px-1">
              <button
                onClick={() => setSelectedCropId('all')}
                className={`shrink-0 px-4 py-2 rounded-full border text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  selectedCropId === 'all'
                    ? 'bg-[#14532d] text-white border-[#14532d] shadow-2xs font-bold'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                }`}
              >
                <Sprout className="w-3.5 h-3.5" />
                <span>{isSw ? 'Mazao Yote' : 'All Crops'}</span>
              </button>

              {crops.map((crop) => (
                <button
                  key={crop.crop_id}
                  onClick={() => setSelectedCropId(crop.crop_id)}
                  className={`shrink-0 px-4 py-2 rounded-full border text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    selectedCropId === crop.crop_id
                      ? 'bg-[#14532d] text-white border-[#14532d] shadow-2xs font-bold'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="text-sm">🌱</span>
                  <span>{isSw ? crop.local_name_sw || crop.crop_name : crop.crop_name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Loading / Error States */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 space-y-3">
            <div className="w-10 h-10 border-4 border-[#14532d] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm text-gray-500 font-medium">
              {isSw ? 'Inapakia hifadhidata...' : 'Loading agricultural registry...'}
            </p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center max-w-md mx-auto space-y-3">
            <AlertCircle className="w-8 h-8 text-red-600 mx-auto" />
            <p className="text-sm font-semibold text-red-800">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-red-600 text-white rounded-lg text-xs font-bold hover:bg-red-700"
            >
              {isSw ? 'Jaribu Tena' : 'Retry'}
            </button>
          </div>
        )}

        {/* Results Count & Disease List */}
        {!loading && !error && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500 font-semibold">
                {isSw 
                  ? `Zimepatikana rekodi ${filteredDiseases.length} za magonjwa` 
                  : `Found ${filteredDiseases.length} disease records`
                }
              </p>
              {searchQuery && (
                <span className="text-xs bg-[#eaf2e0] text-[#14532d] font-bold px-2.5 py-1 rounded-full">
                  {isSw ? `Kichujio: "${searchQuery}"` : `Keyword: "${searchQuery}"`}
                </span>
              )}
            </div>

            {/* Empty State */}
            {filteredDiseases.length === 0 && (
              <div className="bg-white border border-dashed border-[#e2ebd4] rounded-3xl p-16 text-center max-w-xl mx-auto space-y-4 shadow-xs">
                <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 mx-auto">
                  <HelpCircle className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-gray-900">
                    {isSw ? 'Hakuna matokeo yaliyopatikana' : 'No matches found'}
                  </h3>
                  <p className="text-xs text-gray-500 max-w-sm mx-auto leading-relaxed">
                    {isSw 
                      ? 'Jaribu kutafuta kwa neno lingine au chagua aina tofauti ya zao la kilimo kwenye orodha hapo juu.' 
                      : 'Try typing other symptoms or select a different crop type from the filter pills above.'
                    }
                  </p>
                </div>
                <button
                  onClick={clearFilters}
                  className="px-4.5 py-2 bg-[#14532d] hover:bg-[#0f4023] text-white rounded-xl text-xs font-bold transition-all shadow-xs"
                >
                  {isSw ? 'Onyesha Mazao Yote' : 'Reset Search filters'}
                </button>
              </div>
            )}

            {/* Disease Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredDiseases.map((disease) => {
                const isExpanded = expandedDiseaseId === disease.disease_id;
                
                return (
                  <div 
                    key={disease.disease_id}
                    className="bg-white border border-[#e2ebd4] hover:border-[#14532d]/40 rounded-3xl shadow-xs overflow-hidden transition-all flex flex-col justify-between"
                  >
                    <div className="p-6 space-y-4">
                      
                      {/* Header Badge Row */}
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#f4f7ee] pb-4">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">🌱</span>
                          <div>
                            <span className="text-xs font-bold text-[#14532d] uppercase">
                              {disease.crop_name}
                            </span>
                            <span className="text-[10px] text-gray-400 font-bold block">
                              ID: {disease.disease_id}
                            </span>
                          </div>
                        </div>

                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getPathogenBadgeStyles(disease.type)}`}>
                          {disease.type}
                        </span>
                      </div>

                      {/* Disease Name & Scientific Details */}
                      <div className="space-y-1">
                        <h3 className="text-xl font-black text-gray-900 tracking-tight">
                          {disease.disease_name}
                        </h3>
                        {disease.causal_agent && (
                          <p className="text-xs font-semibold text-gray-500 font-mono">
                            <span className="text-gray-400">{isSw ? 'Wakala:' : 'Causal Agent:'}</span> {disease.causal_agent}
                          </p>
                        )}
                      </div>

                      {/* Brief Description */}
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {disease.description}
                      </p>

                      {/* Expandable Section for Detailed Symptoms, Treatments, Preventions */}
                      {isExpanded ? (
                        <div className="pt-4 border-t border-[#f4f7ee] space-y-5 animate-fadeIn">
                          
                          {/* Symptoms Grid */}
                          <div className="space-y-2.5">
                            <div className="flex items-center gap-1.5 text-xs font-bold text-[#14532d] uppercase tracking-wide">
                              <AlertTriangle className="w-4 h-4 text-[#14532d]" />
                              <span>{isSw ? 'Dalili Kulingana na Hatua' : 'Symptoms By Severity'}</span>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {/* Early Stage Symptoms */}
                              <div className="p-3 bg-amber-50/50 border border-amber-100 rounded-xl space-y-1">
                                <span className="text-[9px] font-extrabold text-amber-700 uppercase tracking-widest bg-amber-100/50 px-1.5 py-0.5 rounded-md">
                                  {isSw ? 'Hatua ya Mapema' : 'Early Stage'}
                                </span>
                                <ul className="space-y-1 pt-1">
                                  {disease.symptoms.filter(s => String(s?.severity_stage || '').toLowerCase().includes('early') || disease.symptoms.length === 1).map((s, i) => (
                                    <li key={i} className="text-[11px] text-gray-600 leading-relaxed flex items-start gap-1.5">
                                      <span className="text-amber-500 mt-0.5">•</span>
                                      <span>{s.symptom_description}</span>
                                    </li>
                                  ))}
                                  {disease.symptoms.length === 0 && (
                                    <li className="text-[11px] text-gray-400 italic">No specific early symptom listed</li>
                                  )}
                                </ul>
                              </div>

                              {/* Advanced Stage Symptoms */}
                              <div className="p-3 bg-red-50/30 border border-red-100/50 rounded-xl space-y-1">
                                <span className="text-[9px] font-extrabold text-red-700 uppercase tracking-widest bg-red-100/30 px-1.5 py-0.5 rounded-md">
                                  {isSw ? 'Hatua ya Juu' : 'Advanced Stage'}
                                </span>
                                <ul className="space-y-1 pt-1">
                                  {disease.symptoms.filter(s => String(s?.severity_stage || '').toLowerCase().includes('advanced')).map((s, i) => (
                                    <li key={i} className="text-[11px] text-gray-600 leading-relaxed flex items-start gap-1.5">
                                      <span className="text-red-500 mt-0.5">•</span>
                                      <span>{s.symptom_description}</span>
                                    </li>
                                  ))}
                                  {disease.symptoms.filter(s => String(s?.severity_stage || '').toLowerCase().includes('advanced')).length === 0 && (
                                    <li className="text-[11px] text-gray-400 italic">
                                      {isSw ? 'Madoa kuenea au kukausha mmea' : 'General spreading and severe foliage damage'}
                                    </li>
                                  )}
                                </ul>
                              </div>
                            </div>
                          </div>

                          {/* Preventions */}
                          <div className="space-y-2">
                            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 uppercase tracking-wide">
                              <ShieldCheck className="w-4 h-4 text-emerald-700" />
                              <span>{isSw ? 'Njia za Kuzuia' : 'Prevention & Hygiene'}</span>
                            </div>
                            <ul className="space-y-1.5 bg-emerald-50/20 border border-emerald-100/30 p-3 rounded-xl">
                              {disease.preventions.map((pr, i) => (
                                <li key={i} className="text-[11px] text-gray-600 leading-relaxed flex items-start gap-2">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                                  <span>{pr.prevention_method}</span>
                                </li>
                              ))}
                              {disease.preventions.length === 0 && (
                                <li className="text-[11px] text-gray-500 italic">
                                  {isSw ? 'Zungusha mazao, weka usafi wa shamba na disinfekta zana zote.' : 'Rotate crops, clear plant residues, and disinfect farming tools.'}
                                </li>
                              )}
                            </ul>
                          </div>

                          {/* Treatments */}
                          <div className="space-y-2">
                            <div className="flex items-center gap-1.5 text-xs font-bold text-blue-800 uppercase tracking-wide">
                              <HeartPulse className="w-4 h-4 text-blue-700" />
                              <span>{isSw ? 'Matibabu na Udhibiti' : 'Treatments & Advisory'}</span>
                            </div>
                            <div className="space-y-2">
                              {disease.treatments.map((tr, i) => (
                                <div key={i} className="p-3 bg-blue-50/40 border border-blue-100 rounded-xl space-y-1">
                                  <div className="flex items-center justify-between">
                                    <span className="text-[9px] font-extrabold text-blue-800 bg-blue-100/50 px-1.5 py-0.5 rounded">
                                      {tr.treatment_type}
                                    </span>
                                  </div>
                                  <p className="text-[11px] text-gray-700 leading-relaxed">
                                    {tr.treatment_recommendation}
                                  </p>
                                </div>
                              ))}
                              {disease.treatments.length === 0 && (
                                <div className="p-3 bg-blue-50/20 border border-blue-100/30 rounded-xl">
                                  <p className="text-[11px] text-gray-500 italic">
                                    {isSw ? 'Ondoa mmea ulioambukizwa haraka kuzuia kuenea. Hakuna dawa maalum ya kikemia.' : 'Remove infected plants immediately to stop vector transmission. No chemical cure.'}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>

                        </div>
                      ) : null}

                    </div>

                    {/* Bottom Action Area */}
                    <div className="px-6 py-3 bg-[#fcfdfa] border-t border-[#f4f7ee] flex items-center justify-between">
                      <button
                        onClick={() => toggleExpand(disease.disease_id)}
                        className="text-xs font-bold text-[#14532d] hover:text-[#0f4023] flex items-center gap-1 focus:outline-none py-1"
                      >
                        <span>
                          {isExpanded 
                            ? (isSw ? 'Funga Maelezo' : 'Hide Treatment details') 
                            : (isSw ? 'Tazama Matibabu & Dalili' : 'Show Treatments & Symptoms')
                          }
                        </span>
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>

                      <button
                        onClick={() => {
                          // Quick route to contact an officer
                          onNavigate('contact');
                        }}
                        className="text-[10px] font-semibold text-gray-500 hover:text-gray-800 border border-gray-200 hover:border-gray-300 rounded-lg px-2.5 py-1 bg-white transition-colors"
                      >
                        {isSw ? 'Ongea na Mtaalamu' : 'Consult Officer'}
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
