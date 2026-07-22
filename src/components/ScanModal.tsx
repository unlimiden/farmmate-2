import React, { useState, useEffect } from 'react';
import { DiagnosisItem, Language } from '../types';
import { translations } from '../data/translations';
import { X, Upload, Database, Loader2, CheckCircle2 } from 'lucide-react';
import { getApiUrl, fetchWithAuth } from '../lib/api';

interface ScanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDiagnosisComplete: (newDiag: DiagnosisItem) => void;
  language: Language;
}

export const ScanModal: React.FC<ScanModalProps> = ({
  isOpen,
  onClose,
  onDiagnosisComplete,
  language,
}) => {
  const t = translations[language];
  const [cropsList, setCropsList] = useState<any[]>([]);
  const [selectedCropId, setSelectedCropId] = useState<number>(1);
  const [diseasesList, setDiseasesList] = useState<any[]>([]);
  const [selectedDiseaseId, setSelectedDiseaseId] = useState<number>(1);
  const [notes, setNotes] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Preset sample crop images for quick testing, mapped to our relational DB structure
  const sampleImages = [
    { name: "Maize GLS", url: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&q=80&w=300", crop_id: 1, disease_id: 2 },
    { name: "Potato Late Blight", url: "https://images.unsplash.com/photo-1518977676601-b5ff321035b3?auto=format&fit=crop&q=80&w=300", crop_id: 4, disease_id: 10 },
    { name: "Tomato Late Blight", url: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&q=80&w=300", crop_id: 3, disease_id: 7 },
    { name: "Kale Black Rot", url: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&q=80&w=300", crop_id: 7, disease_id: 21 }
  ];

  // Load Crops
  useEffect(() => {
    if (isOpen) {
      fetchWithAuth('/api/crops')
        .then(res => res.json())
        .then(data => {
          if (data.success && data.crops) {
            setCropsList(data.crops);
            if (data.crops.length > 0) {
              setSelectedCropId(data.crops[0].crop_id);
            }
          }
        })
        .catch(err => console.error("Error loading crops list from DB:", err));
    }
  }, [isOpen]);

  // Load Diseases associated with the selected crop
  useEffect(() => {
    if (isOpen && selectedCropId) {
      fetchWithAuth(`/api/diseases/crop/${selectedCropId}`)
        .then(res => res.json())
        .then(data => {
          if (data.success && data.diseases) {
            setDiseasesList(data.diseases);
            if (data.diseases.length > 0) {
              // Try to find if we selected a sample image that has a specific disease
              const matchingSample = sampleImages.find(s => s.url === selectedImage && s.crop_id === selectedCropId);
              if (matchingSample && data.diseases.some((d: any) => d.disease_id === matchingSample.disease_id)) {
                setSelectedDiseaseId(matchingSample.disease_id);
              } else {
                setSelectedDiseaseId(data.diseases[0].disease_id);
              }
            }
          }
        })
        .catch(err => console.error("Error loading diseases for crop:", err));
    }
  }, [isOpen, selectedCropId, selectedImage]);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveRecord = async () => {
    if (!selectedImage) {
      alert(language === 'sw' ? 'Tafadhali pakia au chagua picha ya zao.' : 'Please upload or select a crop image first.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetchWithAuth('/api/history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          crop_id: selectedCropId,
          disease_id: selectedDiseaseId,
          image: selectedImage,
          notes: notes || "Inspected and updated via inspection wizard."
        })
      });
      const data = await response.json();
      if (response.ok && data.success) {
        onDiagnosisComplete(data.record);
        // Reset state
        setNotes('');
        setSelectedImage(null);
        onClose();
      } else {
        alert(language === 'sw' ? 'Mchakato umeshindikana: ' + data.message : 'Error saving record: ' + data.message);
      }
    } catch (err) {
      alert(language === 'sw' ? 'Hitilafu ya mtandao wakati wa kuhifadhi.' : 'Network error saving record to database.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white border border-[#e2ebd4] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative space-y-6 my-8 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#14532d] text-white flex items-center justify-center">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">
              {language === 'sw' ? 'Ongeza Rekodi ya Ukaguzi' : 'Add Inspection Record'}
            </h3>
            <p className="text-xs text-gray-500">
              {language === 'sw' ? 'Hifadhi rekodi kwenye hifadhidata ya kilimo (Mstari Salama)' : 'Save record directly to SQL agricultural database'}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                {language === 'sw' ? 'Aina ya Zao' : 'Crop Type'}
              </label>
              <select
                value={selectedCropId}
                onChange={(e) => setSelectedCropId(parseInt(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#14532d]"
              >
                {cropsList.map((crop) => (
                  <option key={crop.crop_id} value={crop.crop_id}>
                    {crop.crop_name} {crop.scientific_name ? `(${crop.scientific_name})` : ''}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                {language === 'sw' ? 'Ugonjwa / Hali' : 'Disease / Condition'}
              </label>
              <select
                value={selectedDiseaseId}
                onChange={(e) => setSelectedDiseaseId(parseInt(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#14532d]"
              >
                {diseasesList.map((disease) => (
                  <option key={disease.disease_id} value={disease.disease_id}>
                    {disease.disease_name}
                  </option>
                ))}
                {diseasesList.length === 0 && (
                  <option value="">{language === 'sw' ? 'Inapakia...' : 'No diseases configured'}</option>
                )}
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
              {language === 'sw' ? 'Pakia Picha ya Zao' : 'Upload Crop Image'}
            </label>
            <div className="border-2 border-dashed border-[#c5d8a8] rounded-2xl p-5 text-center bg-[#f8fbef] hover:bg-[#f0f5e8] transition-colors relative cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              {selectedImage ? (
                <div className="flex flex-col items-center gap-2">
                  <img
                    src={selectedImage}
                    alt="Preview"
                    className="w-20 h-20 rounded-xl object-cover border shadow-sm"
                    referrerPolicy="no-referrer"
                  />
                  <span className="text-xs font-semibold text-[#14532d]">
                    {language === 'sw' ? 'Picha imepakiwa (Bofya kubadili)' : 'Image loaded (Click to change)'}
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-white text-[#14532d] flex items-center justify-center shadow-xs">
                    <Upload className="w-5 h-5" />
                  </div>
                  <p className="text-sm font-semibold text-gray-800">
                    {language === 'sw' ? 'Bofya kupakia au buruta picha' : 'Click to upload or drag & drop'}
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG, WEBP</p>
                </div>
              )}
            </div>
          </div>

          {/* Quick preset selector */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              {language === 'sw' ? 'Au chagua sampuli ya hifadhidata:' : 'Or choose sample database record:'}
            </span>
            <div className="grid grid-cols-2 gap-2">
              {sampleImages.map((sample, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setSelectedImage(sample.url);
                    setSelectedCropId(sample.crop_id);
                    // Diseases list will automatically reload for this crop type
                  }}
                  className={`flex items-center gap-2 p-2 rounded-xl border text-left text-xs font-medium transition-all ${
                    selectedImage === sample.url
                      ? 'border-[#14532d] bg-emerald-50 text-[#14532d]'
                      : 'border-gray-200 bg-white hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <img src={sample.url} alt={sample.name} className="w-8 h-8 rounded-lg object-cover" referrerPolicy="no-referrer" />
                  <span className="truncate">{sample.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
              {language === 'sw' ? 'Maelezo ya Ziada' : 'Inspection Notes'}
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={language === 'sw' ? 'Mfano: Madoa ya njano kwenye majani ya chini...' : 'e.g. Leaf spot detected on lower canopy leaves...'}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#14532d]"
            />
          </div>
        </div>

        <div className="pt-4 flex items-center justify-end gap-3 border-t border-gray-100">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-700 text-sm font-semibold hover:bg-gray-100 transition-colors"
          >
            {language === 'sw' ? 'Ghairi' : 'Cancel'}
          </button>
          <button
            onClick={handleSaveRecord}
            disabled={loading || !selectedImage}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#14532d] text-white text-sm font-semibold hover:bg-[#0f4023] shadow-md transition-all disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>{language === 'sw' ? 'Inahifadhi...' : 'Saving to Database...'}</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>{language === 'sw' ? 'Hifadhi kwenye Hifadhidata' : 'Save Record'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
