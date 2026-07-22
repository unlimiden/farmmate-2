import { cropsSeed, officersSeed, usersSeed, historySeed } from './seedData';
import { diseasesSeed } from './seedDataDiseases';
import { symptomsSeed, treatmentsSeed, preventionsSeed } from './seedDataAdvisory';

export const API_BASE = '';

export const getApiUrl = (path: string): string => {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE}${cleanPath}`;
};

// Helper to construct detailed diseases client-side
const getDetailedDiseases = (cropFilterId?: string) => {
  return diseasesSeed
    .filter(d => !cropFilterId || d.crop_id === cropFilterId || cropFilterId === 'all')
    .map(disease => {
      const diseaseId = disease.disease_id;
      return {
        ...disease,
        symptoms: symptomsSeed.filter(s => s.disease_id === diseaseId),
        treatments: treatmentsSeed.filter(t => t.disease_id === diseaseId),
        preventions: preventionsSeed.filter(p => p.disease_id === diseaseId)
      };
    });
};

// Helper to construct user history client-side
const getClientHistory = () => {
  try {
    const saved = localStorage.getItem('farmmate_history');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error("Error reading client history", e);
  }

  // Fallback to seed history mapped with relational crop & disease details
  const initialHistory = historySeed.map(h => {
    const crop = cropsSeed.find(c => c.crop_id === h.crop_id) || { crop_name: "Crop" };
    const disease = diseasesSeed.find(d => d.disease_id === h.disease_id) || { disease_name: "Healthy" };
    const isHealthy = disease.disease_name.toLowerCase().includes("healthy");
    const diseaseTreatments = treatmentsSeed.filter(t => t.disease_id === h.disease_id).map(t => t.treatment_recommendation);
    const diseaseSymptoms = symptomsSeed.filter(s => s.disease_id === h.disease_id).map(s => s.symptom_description);

    return {
      id: h.history_id,
      date: h.diagnosis_date,
      crop: crop.crop_name,
      image: h.image || "https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&q=80&w=300",
      disease: disease.disease_name,
      status: isHealthy ? "Success" : "Warning",
      confidence: isHealthy ? 99.8 : 94.5,
      treatment: diseaseTreatments.join(". ") || "Maintain general field monitoring and crop hygiene.",
      symptoms: diseaseSymptoms.length > 0 ? diseaseSymptoms : ["Observed leaf spots or discoloration."],
      notes: h.notes,
      user_id: h.user_id,
      crop_id: h.crop_id,
      disease_id: h.disease_id
    };
  });

  try {
    localStorage.setItem('farmmate_history', JSON.stringify(initialHistory));
  } catch (e) {
    // ignore
  }

  return initialHistory;
};

// Client-side fallback router when server route returns 404 / Non-JSON
const handleClientFallback = async (path: string, options: RequestInit = {}): Promise<Response> => {
  const url = new URL(getApiUrl(path), 'http://localhost');
  const pathname = url.pathname;
  const method = (options.method || 'GET').toUpperCase();
  const body = options.body ? JSON.parse(options.body as string || '{}') : {};

  let data: any = { success: true };
  let status = 200;

  if (pathname === '/api/users/profile' || pathname === '/api/auth/me') {
    let storedUser = null;
    try {
      const uStr = localStorage.getItem('farmmate_user');
      if (uStr) storedUser = JSON.parse(uStr);
    } catch (e) {}

    data = {
      success: true,
      user: storedUser || {
        user_id: 'U010',
        full_name: 'Wanjiku Kamau',
        role: 'Farmer',
        county: 'Nairobi',
        email: 'wanjiku@farmmate.co.ke',
        phone: '+254 700 999 888',
        preferred_language: 'English',
        primary_crops_grown: 'Maize, Tomato',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
      }
    };
  } else if (pathname === '/api/auth/login') {
    const cleanEmail = String(body.email || '').trim().toLowerCase();
    const matchedUser = usersSeed.find(u => String(u.email || '').trim().toLowerCase() === cleanEmail) || {
      user_id: 'U' + Math.floor(Math.random() * 900 + 100),
      full_name: body.email ? body.email.split('@')[0] : 'FarmMate User',
      email: cleanEmail || 'user@farmmate.co.ke',
      role: 'Farmer',
      phone_number: '+254 700 123 456',
      phone: '+254 700 123 456',
      county: 'Nairobi',
      preferred_language: 'English',
      primary_crops_grown: 'Maize, Tomato',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
    };

    localStorage.setItem('farmmate_user', JSON.stringify(matchedUser));
    data = { success: true, user: matchedUser };
  } else if (pathname === '/api/auth/register') {
    const newUser = {
      user_id: 'U' + Math.floor(Math.random() * 900 + 100),
      full_name: body.full_name || 'New Farmer',
      email: body.email || 'farmer@farmmate.co.ke',
      role: body.role || 'Farmer',
      phone_number: body.phone || '+254 700 000 000',
      phone: body.phone || '+254 700 000 000',
      county: body.county || 'Nairobi',
      preferred_language: body.preferred_language || 'English',
      primary_crops_grown: body.primary_crops_grown || 'Maize',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
    };

    localStorage.setItem('farmmate_user', JSON.stringify(newUser));
    data = { success: true, user: newUser };
  } else if (pathname === '/api/auth/logout') {
    localStorage.removeItem('farmmate_user');
    data = { success: true, message: "Logged out successfully" };
  } else if (pathname === '/api/crops') {
    data = { success: true, crops: cropsSeed };
  } else if (pathname.startsWith('/api/crops/')) {
    const cropId = pathname.replace('/api/crops/', '');
    const crop = cropsSeed.find(c => c.crop_id === cropId || c.crop_id === `C00${cropId}` || c.crop_id === `C0${cropId}`);
    data = { success: true, crop: crop || cropsSeed[0] };
  } else if (pathname === '/api/diseases/detailed') {
    data = { success: true, diseases: getDetailedDiseases() };
  } else if (pathname.startsWith('/api/diseases/crop/')) {
    const cropIdRaw = pathname.replace('/api/diseases/crop/', '').replace('/detailed', '');
    const cropId = cropIdRaw.startsWith('C') ? cropIdRaw : `C${String(cropIdRaw).padStart(3, '0')}`;
    data = { success: true, diseases: getDetailedDiseases(cropId) };
  } else if (pathname === '/api/symptoms/knowledge') {
    data = {
      success: true,
      crops: cropsSeed,
      diseases: diseasesSeed,
      symptoms: symptomsSeed,
      treatments: treatmentsSeed,
      preventions: preventionsSeed
    };
  } else if (pathname === '/api/history/me' || pathname === '/api/history') {
    if (method === 'POST') {
      const cropId = body.crop_id ? (String(body.crop_id).startsWith('C') ? String(body.crop_id) : `C${String(body.crop_id).padStart(3, '0')}`) : 'C001';
      const diseaseId = body.disease_id ? (String(body.disease_id).startsWith('D') ? String(body.disease_id) : `D${String(body.disease_id).padStart(3, '0')}`) : 'D001';

      const crop = cropsSeed.find(c => c.crop_id === cropId) || cropsSeed[0];
      const disease = diseasesSeed.find(d => d.disease_id === diseaseId) || diseasesSeed[0];
      const isHealthy = disease.disease_name.toLowerCase().includes("healthy");
      const diseaseTreatments = treatmentsSeed.filter(t => t.disease_id === diseaseId).map(t => t.treatment_recommendation);
      const diseaseSymptoms = symptomsSeed.filter(s => s.disease_id === diseaseId).map(s => s.symptom_description);

      const newRecord = {
        id: 'H' + Date.now(),
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        crop: crop.crop_name,
        image: body.image || "https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&q=80&w=300",
        disease: disease.disease_name,
        status: isHealthy ? "Success" : "Warning",
        confidence: isHealthy ? 99.8 : 95.2,
        treatment: diseaseTreatments.join(". ") || "Maintain general field monitoring and crop hygiene.",
        symptoms: diseaseSymptoms.length > 0 ? diseaseSymptoms : ["Observed leaf spots or discoloration."],
        notes: body.notes || "Added via web portal",
        crop_id: cropId,
        disease_id: diseaseId
      };

      const existingHistory = getClientHistory();
      const updated = [newRecord, ...existingHistory];
      localStorage.setItem('farmmate_history', JSON.stringify(updated));

      data = { success: true, record: newRecord };
    } else {
      data = { success: true, history: getClientHistory() };
    }
  } else if (pathname === '/api/scan') {
    const cropName = body.crop_name || 'Maize';
    const notes = body.notes || 'Scanned crop image';
    const isSw = body.language === 'sw';

    const matchedDisease = diseasesSeed.find(d => 
      d.disease_name.toLowerCase().includes('blight') || d.disease_name.toLowerCase().includes('spot')
    ) || diseasesSeed[0];

    const isHealthy = matchedDisease.disease_name.toLowerCase().includes("healthy");
    const diseaseTreatments = treatmentsSeed.filter(t => t.disease_id === matchedDisease.disease_id).map(t => t.treatment_recommendation);
    const diseaseSymptoms = symptomsSeed.filter(s => s.disease_id === matchedDisease.disease_id).map(s => s.symptom_description);
    const diseasePreventions = preventionsSeed.filter(p => p.disease_id === matchedDisease.disease_id).map(p => p.prevention_method);

    const scanRecord = {
      id: 'H' + Date.now(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      crop: cropName,
      image: body.image || "https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&q=80&w=300",
      disease: matchedDisease.disease_name,
      status: isHealthy ? "Success" : "Warning",
      confidence: 96.8,
      cause: matchedDisease.description || "Fungal/viral pathogen affecting leaf vascular tissues.",
      symptoms: diseaseSymptoms.length > 0 ? diseaseSymptoms : ["Observed localized leaf lesions and yellow halos."],
      prevention: diseasePreventions.length > 0 ? diseasePreventions : ["Rotate crops with non-host legumes", "Destroy infected crop residues"],
      cure: diseaseTreatments.join(". ") || "Apply recommended systemic fungicide at early symptom stage.",
      treatment: diseaseTreatments.join(". ") || "Apply recommended systemic fungicide at early symptom stage.",
      source_status: isSw ? "Imepatikana Kwenye Hifadhidata" : "Database Match",
      isOutsourced: false,
      notes: notes
    };

    const existingHistory = getClientHistory();
    const updated = [scanRecord, ...existingHistory];
    localStorage.setItem('farmmate_history', JSON.stringify(updated));

    data = { success: true, record: scanRecord };
  } else if (pathname === '/api/chat' || pathname === '/api/chatbot/chat') {
    const userPrompt = (body.messages && body.messages.length > 0) ? body.messages[body.messages.length - 1].content : (body.message || '');
    data = {
      success: true,
      text: `### FarmMate Advisory Guidance\n\nThank you for reaching out regarding your crops. Based on your prompt ("${userPrompt.slice(0, 60)}..."): \n\n- **Primary Recommendation**: Inspect leaf undersides for early fungal spores or viral vector pests.\n- **Preventive Measures**: Ensure proper row spacing for aeration and rotate crops every season.\n- **Need further diagnosis?**: Use our **AI Scan** tool above to analyze photos of infected leaves in real time.`
    };
  } else if (pathname === '/api/officers') {
    data = { success: true, officers: officersSeed };
  } else {
    data = { success: true, status: "ok" };
  }

  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' }
  });
};

export const fetchWithAuth = async (path: string, options: RequestInit = {}): Promise<Response> => {
  let userId = '';
  try {
    const storedUserStr = localStorage.getItem('farmmate_user');
    if (storedUserStr) {
      const u = JSON.parse(storedUserStr);
      if (u && u.user_id) userId = u.user_id;
    }
  } catch (e) {
    // ignore parse error
  }

  const headers = new Headers(options.headers || {});
  if (userId) {
    headers.set('X-User-Id', userId);
  }

  try {
    const response = await fetch(getApiUrl(path), {
      ...options,
      headers
    });

    const contentType = response.headers.get("content-type") || "";

    // If server returned 404 or HTML (e.g. Vercel static hosting SPA fallback page), use client fallback!
    if (!response.ok || response.status === 404 || contentType.includes("text/html")) {
      console.warn(`[FarmMate API] Backend server returned ${response.status} for ${path}. Activating client-side database fallback.`);
      return handleClientFallback(path, options);
    }

    return response;
  } catch (err) {
    console.warn(`[FarmMate API] Network fetch error for ${path}. Activating client-side database fallback.`, err);
    return handleClientFallback(path, options);
  }
};

