import React, { useState, useEffect, useRef } from 'react';
import { DiagnosisItem, Language } from '../types';
import { translations } from '../data/translations';
import { X, Upload, Camera, Sparkles, Globe, Database, Loader2, CheckCircle2, AlertTriangle, RefreshCw, Shield, Stethoscope, Pill, Info } from 'lucide-react';
import { fetchWithAuth } from '../lib/api';

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
  const isSw = language === 'sw';
  const t = translations[language];

  const [cropsList, setCropsList] = useState<any[]>([]);
  const [selectedCropName, setSelectedCropName] = useState<string>('Maize');
  const [notes, setNotes] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  // Scanning state
  const [isScanning, setIsScanning] = useState(false);
  const [scanStatus, setScanStatus] = useState<string>('');
  const [scanResult, setScanResult] = useState<DiagnosisItem | null>(null);

  // Camera state
  const [isCameraActive, setIsCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Presets
  const sampleImages = [
    { name: isSw ? "Mahindi - Madoa" : "Maize GLS", url: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&q=80&w=400", crop: "Maize" },
    { name: isSw ? "Viazi - Kimatunda" : "Potato Late Blight", url: "https://images.unsplash.com/photo-1518977676601-b5ff321035b3?auto=format&fit=crop&q=80&w=400", crop: "Potato" },
    { name: isSw ? "Nyanya - Kimatunda" : "Tomato Blight", url: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&q=80&w=400", crop: "Tomato" },
    { name: isSw ? "Sukuma Wiki - Kuoza" : "Kale Rot", url: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&q=80&w=400", crop: "Kale" }
  ];

  // Load Crops list
  useEffect(() => {
    if (isOpen) {
      fetchWithAuth('/api/crops')
        .then(res => res.json())
        .then(data => {
          if (data.success && data.crops) {
            setCropsList(data.crops);
          }
        })
        .catch(err => console.error("Error loading crops:", err));
    }
  }, [isOpen]);

  // Clean up camera stream on close
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  useEffect(() => {
    if (!isOpen) {
      stopCamera();
      setSelectedImage(null);
      setScanResult(null);
      setIsScanning(false);
      setNotes('');
    }
  }, [isOpen]);

  const startCamera = async () => {
    try {
      stopCamera();
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsCameraActive(true);
    } catch (err) {
      console.error("Camera access error:", err);
      alert(isSw ? "Imeshindikana kufungua kamera ya kifaa. Tafadhali tumia chaguo la kupakia picha." : "Could not open camera. Please use file upload instead.");
    }
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth || 640;
      canvas.height = videoRef.current.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg');
        setSelectedImage(dataUrl);
        stopCamera();
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      stopCamera();
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRunAiScan = async () => {
    if (!selectedImage) {
      alert(isSw ? 'Tafadhali chukua au pakia picha ya zao kabla ya kuchanganua.' : 'Please take or upload a crop photo first.');
      return;
    }

    setIsScanning(true);
    setScanResult(null);
    setScanStatus(isSw ? 'Inachanganua picha kwa kutumia AI...' : 'Analyzing crop image with Gemini AI...');

    const timer1 = setTimeout(() => {
      setScanStatus(isSw ? 'Inatafuta kwenye hifadhidata ya magonjwa ya kilimo...' : 'Searching local agricultural database...');
    }, 1200);

    const timer2 = setTimeout(() => {
      setScanStatus(isSw ? 'Ugonjwa haupo! Inafanya utafiti wa mtandaoni na kuhifadhi kwenye hifadhidata...' : 'Checking web sources and updating database with new disease findings...');
    }, 2500);

    try {
      const response = await fetchWithAuth('/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: selectedImage,
          crop_name: selectedCropName,
          notes: notes,
          language: language
        })
      });

      clearTimeout(timer1);
      clearTimeout(timer2);

      const data = await response.json();
      if (response.ok && data.success && data.record) {
        setScanResult(data.record);
      } else {
        throw new Error(data.message || 'Scan failed');
      }
    } catch (err: any) {
      console.error("Scan error:", err);
      clearTimeout(timer1);
      clearTimeout(timer2);
      alert(isSw ? 'Hitilafu wakati wa kuchanganua picha. Tafadhali jaribu tena.' : 'Error performing crop scan. Please try again.');
    } finally {
      setIsScanning(false);
    }
  };

  const handleSaveToHistory = () => {
    if (scanResult) {
      onDiagnosisComplete(scanResult);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white border border-[#e2ebd4] rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative space-y-6 my-6 max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#14532d] text-white flex items-center justify-center shadow-sm">
            <Sparkles className="w-6 h-6 text-emerald-300" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-gray-900">
              {isSw ? 'Uchunguzi wa Magonjwa kwa AI' : 'Smart AI Crop Disease Scanner'}
            </h3>
            <p className="text-xs text-gray-500">
              {isSw 
                ? 'Piga picha ya zao -> AI itatambua ugonjwa kwenye hifadhidata au kutafuta mtandaoni na kuhifadhi.' 
                : 'Take a photo -> AI scans database, searches internet if missing, and records findings.'}
            </p>
          </div>
        </div>

        {/* Scanner Body */}
        {!scanResult ? (
          <div className="space-y-5">
            {/* Crop Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                {isSw ? 'Chagua Au Thibitisha Aina ya Zao' : 'Select or Confirm Crop Type'}
              </label>
              <select
                value={selectedCropName}
                onChange={(e) => setSelectedCropName(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#14532d]"
              >
                {cropsList.length > 0 ? (
                  cropsList.map((crop) => (
                    <option key={crop.crop_id} value={crop.crop_name}>
                      {crop.crop_name} {crop.scientific_name ? `(${crop.scientific_name})` : ''}
                    </option>
                  ))
                ) : (
                  <>
                    <option value="Maize">Maize (Mahindi)</option>
                    <option value="Potato">Potato (Viazi Mviringo)</option>
                    <option value="Tomato">Tomato (Nyanya)</option>
                    <option value="Cassava">Cassava (Muhogo)</option>
                    <option value="Beans">Beans (Maharagwe)</option>
                    <option value="Kale">Kale / Sukuma Wiki</option>
                  </>
                )}
              </select>
            </div>

            {/* Photo Capture & Upload Area */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center justify-between">
                <span>{isSw ? 'Picha ya Zao / Jani Lililoathirika' : 'Crop Photo / Leaf Image'}</span>
                {isCameraActive && (
                  <button onClick={stopCamera} className="text-xs text-red-600 underline font-normal">
                    {isSw ? 'Funga Kamera' : 'Close Camera'}
                  </button>
                )}
              </label>

              {isCameraActive ? (
                <div className="relative rounded-2xl overflow-hidden border-2 border-[#14532d] bg-black aspect-4/3 flex items-center justify-center">
                  <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                  <div className="absolute bottom-4 inset-x-0 flex justify-center">
                    <button
                      type="button"
                      onClick={capturePhoto}
                      className="px-6 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-xl flex items-center gap-2 border-2 border-white"
                    >
                      <Camera className="w-5 h-5" />
                      <span>{isSw ? 'Piga Picha Sasa' : 'Snap Photo Now'}</span>
                    </button>
                  </div>
                </div>
              ) : selectedImage ? (
                <div className="relative rounded-2xl border-2 border-[#14532d] overflow-hidden bg-gray-900 group aspect-4/3 flex items-center justify-center">
                  <img src={selectedImage} alt="Crop Preview" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                  
                  {/* Laser Beam Animation Overlay while scanning */}
                  {isScanning && (
                    <div className="absolute inset-0 bg-emerald-950/40 backdrop-blur-xs flex flex-col items-center justify-center p-4 text-center">
                      <div className="w-full h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_#34d399] animate-pulse my-auto"></div>
                      <div className="bg-black/80 border border-emerald-500/50 rounded-2xl p-4 text-white max-w-xs shadow-2xl space-y-2 my-auto">
                        <Loader2 className="w-8 h-8 text-emerald-400 animate-spin mx-auto" />
                        <p className="text-xs font-bold text-emerald-300">{scanStatus}</p>
                      </div>
                    </div>
                  )}

                  {!isScanning && (
                    <div className="absolute top-3 right-3 flex gap-2">
                      <button
                        onClick={() => setSelectedImage(null)}
                        className="p-2 rounded-xl bg-black/60 text-white hover:bg-black/80 text-xs font-semibold backdrop-blur-xs"
                      >
                        {isSw ? 'Badilisha Picha' : 'Change Image'}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Camera Button */}
                  <button
                    type="button"
                    onClick={startCamera}
                    className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-[#14532d] bg-[#f2f7ec] hover:bg-[#e6f0db] rounded-2xl transition-all cursor-pointer text-center group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#14532d] text-white flex items-center justify-center mb-2 shadow-xs group-hover:scale-110 transition-transform">
                      <Camera className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-bold text-[#14532d]">
                      {isSw ? 'Fungua Kamera' : 'Use Camera'}
                    </span>
                    <span className="text-xs text-gray-500 mt-0.5">
                      {isSw ? 'Piga picha moja kwa moja' : 'Take live picture'}
                    </span>
                  </button>

                  {/* File Upload Button */}
                  <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 rounded-2xl transition-all cursor-pointer text-center group">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <div className="w-12 h-12 rounded-xl bg-gray-800 text-white flex items-center justify-center mb-2 shadow-xs group-hover:scale-110 transition-transform">
                      <Upload className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-bold text-gray-800">
                      {isSw ? 'Pakia Picha' : 'Upload File'}
                    </span>
                    <span className="text-xs text-gray-500 mt-0.5">
                      {isSw ? 'Kutoka kwa kifaa chako' : 'PNG, JPG, WEBP'}
                    </span>
                  </label>
                </div>
              )}
            </div>

            {/* Presets */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                {isSw ? 'Au jaribu kwa kutumia picha za sampuli:' : 'Or test with sample crop photos:'}
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {sampleImages.map((sample, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      stopCamera();
                      setSelectedImage(sample.url);
                      setSelectedCropName(sample.crop);
                    }}
                    className={`flex flex-col items-center p-2 rounded-xl border text-center text-xs font-medium transition-all ${
                      selectedImage === sample.url
                        ? 'border-[#14532d] bg-emerald-50 text-[#14532d] font-bold ring-2 ring-[#14532d]'
                        : 'border-gray-200 bg-white hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <img src={sample.url} alt={sample.name} className="w-full h-14 rounded-lg object-cover mb-1" referrerPolicy="no-referrer" />
                    <span className="truncate w-full">{sample.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                {isSw ? 'Maelezo ya Ziada (Hiari)' : 'Inspection Notes (Optional)'}
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={isSw ? 'Mfano: Majani ya chini yana madoa ya kahawia...' : 'e.g., Lower canopy leaves showing brown necrotic spots...'}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#14532d]"
              />
            </div>

            {/* Scan Action Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleRunAiScan}
                disabled={isScanning || !selectedImage}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-[#14532d] hover:bg-[#0f4023] text-white text-base font-bold shadow-lg transition-all disabled:opacity-50"
              >
                {isScanning ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-emerald-300" />
                    <span>{scanStatus || (isSw ? 'Inachanganua Zao...' : 'Scanning Crop...')}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-emerald-300" />
                    <span>{isSw ? 'Changanua na AI & Tafuta Hifadhidata' : 'Scan & Analyze Crop with AI'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          /* Scan Result Display */
          <div className="space-y-5 animate-fadeIn">
            {/* Header & Source Badge */}
            <div className="p-4 rounded-2xl bg-[#f4f7ee] border border-[#d2e2bd] space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#14532d]">
                  {scanResult.crop} {isSw ? 'Utafiti wa AI' : 'AI Scan Result'}
                </span>

                {scanResult.isOutsourced ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-800 border border-indigo-200">
                    <Globe className="w-3.5 h-3.5 text-indigo-600" />
                    {scanResult.source_status || (isSw ? 'Utafiti wa Mtandaoni na Kuhifadhiwa' : 'Outsourced & Saved to DB')}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                    <Database className="w-3.5 h-3.5 text-emerald-600" />
                    {scanResult.source_status || (isSw ? 'Imepatikana Kwenye Hifadhidata' : 'Database Match')}
                  </span>
                )}
              </div>

              <div className="flex items-start gap-4">
                <img src={scanResult.image} alt="Scanned" className="w-20 h-20 rounded-xl object-cover border shadow-sm shrink-0" referrerPolicy="no-referrer" />
                <div className="space-y-1">
                  <h4 className="text-xl font-black text-gray-900">{scanResult.disease}</h4>
                  <p className="text-xs font-semibold text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded inline-block">
                    {scanResult.confidence}% {isSw ? 'Kiwango cha Uhakika' : 'Match Confidence'}
                  </p>
                </div>
              </div>
            </div>

            {/* Cause / Chanzo */}
            {scanResult.cause && (
              <div className="space-y-1.5">
                <h5 className="text-xs font-bold text-gray-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-[#14532d]" />
                  <span>{isSw ? 'Chanzo cha Ugonjwa' : 'Biological Cause'}</span>
                </h5>
                <p className="text-xs text-gray-700 bg-gray-50 border border-gray-200 p-3 rounded-xl leading-relaxed">
                  {scanResult.cause}
                </p>
              </div>
            )}

            {/* Symptoms / Dalili */}
            {scanResult.symptoms && scanResult.symptoms.length > 0 && (
              <div className="space-y-1.5">
                <h5 className="text-xs font-bold text-gray-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Stethoscope className="w-4 h-4 text-[#14532d]" />
                  <span>{isSw ? 'Dalili Zilizobainishwa' : 'Observed Symptoms'}</span>
                </h5>
                <ul className="grid grid-cols-1 gap-1.5">
                  {scanResult.symptoms.map((s, idx) => (
                    <li key={idx} className="text-xs text-gray-700 bg-gray-50 border border-gray-200 px-3 py-2 rounded-xl flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#14532d] shrink-0"></span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Prevention / Njia za Kuzuia */}
            {scanResult.prevention && scanResult.prevention.length > 0 && (
              <div className="space-y-1.5">
                <h5 className="text-xs font-bold text-gray-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-[#14532d]" />
                  <span>{isSw ? 'Njia za Kuzuia' : 'Prevention Strategy'}</span>
                </h5>
                <ul className="grid grid-cols-1 gap-1.5">
                  {scanResult.prevention.map((p, idx) => (
                    <li key={idx} className="text-xs text-gray-700 bg-[#f8fbef] border border-[#d2e2bd] px-3 py-2 rounded-xl flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#14532d] shrink-0" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Cure & Treatment / Tiba & Matibabu */}
            {scanResult.treatment && (
              <div className="space-y-1.5">
                <h5 className="text-xs font-bold text-gray-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Pill className="w-4 h-4 text-[#14532d]" />
                  <span>{isSw ? 'Tiba na Matibabu' : 'Cure & Recommended Treatment'}</span>
                </h5>
                <div className="text-xs text-gray-800 bg-[#eaf2e0] border border-[#c2dca8] p-3 rounded-xl leading-relaxed font-medium">
                  {scanResult.treatment}
                </div>
              </div>
            )}

            {/* Modal Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-3 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setScanResult(null)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-gray-200 text-gray-700 text-sm font-semibold hover:bg-gray-100 flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>{isSw ? 'Changanua Picha Nyengine' : 'Scan Another Photo'}</span>
              </button>
              <button
                type="button"
                onClick={handleSaveToHistory}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#14532d] hover:bg-[#0f4023] text-white text-sm font-bold shadow-md flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{isSw ? 'Hifadhi Kwenye Historia' : 'Save to Diagnostic History'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
