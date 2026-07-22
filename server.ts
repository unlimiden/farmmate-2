import express from "express";
import path from "path";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";

// Initialize Firebase Admin DB and Seeder
import { db } from "./src/lib/firebase.js";
import { seedDatabase } from "./src/lib/seeder.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json({ limit: '20mb' }));

// ID Normalization Helpers to bridge number and string IDs perfectly
function normalizeCropId(id: any): string {
  if (!id) return '';
  const s = String(id).trim();
  if (s.startsWith('C')) return s;
  const num = parseInt(s);
  if (!isNaN(num)) {
    return `C${String(num).padStart(3, '0')}`;
  }
  return s;
}

function normalizeDiseaseId(id: any): string {
  if (!id) return '';
  const s = String(id).trim();
  if (s.startsWith('D')) return s;
  const num = parseInt(s);
  if (!isNaN(num)) {
    return `D${String(num).padStart(3, '0')}`;
  }
  return s;
}

function normalizeUserId(id: any): string {
  if (!id) return '';
  const s = String(id).trim();
  if (s.startsWith('U')) return s;
  const num = parseInt(s);
  if (!isNaN(num)) {
    return `U${String(num).padStart(3, '0')}`;
  }
  return s;
}

// In-memory active user session (backed by Firestore users)
let currentUserSession: any = null;

// Initial session setup helper
async function setupInitialSession() {
  try {
    const defaultUserSnap = await db.collection('users').doc('U010').get();
    if (defaultUserSnap.exists) {
      const data = defaultUserSnap.data();
      currentUserSession = {
        ...data,
        user_id: data?.user_id || 'U010',
        phone: data?.phone_number || data?.phone || "+254 700 999 888"
      };
    }
  } catch (err) {
    console.error("Failed to load default user session:", err);
  }
}

// Request user resolver helper (checks X-User-Id header or falls back to server session)
async function getReqUser(req: express.Request) {
  const headerUserId = req.headers['x-user-id'] as string;
  if (headerUserId) {
    const userId = normalizeUserId(headerUserId);
    try {
      const snap = await db.collection('users').doc(userId).get();
      if (snap.exists) {
        const data = snap.data();
        return {
          ...data,
          user_id: data?.user_id || snap.id,
          phone: data?.phone_number || data?.phone || ""
        };
      }
    } catch (e) {
      console.error("Error fetching user by header ID:", e);
    }
  }
  return currentUserSession;
}

// Helper to enrich history record with relational details from Firestore
async function enrichHistoryRecord(record: any) {
  const cropId = normalizeCropId(record.crop_id);
  const diseaseId = normalizeDiseaseId(record.disease_id);

  const [cropDoc, diseaseDoc, treatmentsSnap, symptomsSnap] = await Promise.all([
    db.collection('crops').doc(cropId).get(),
    db.collection('diseases').doc(diseaseId).get(),
    db.collection('treatments').where('disease_id', '==', diseaseId).get(),
    db.collection('symptoms').where('disease_id', '==', diseaseId).get()
  ]);

  const crop = cropDoc.exists ? cropDoc.data() : null;
  const disease = diseaseDoc.exists ? diseaseDoc.data() : null;

  const cropName = crop ? crop.crop_name : "Crop";
  const diseaseName = disease ? disease.disease_name : "Healthy";

  const isHealthy = diseaseName.toLowerCase().includes("healthy");
  const status = isHealthy ? "Success" : "Warning";

  const diseaseTreatments = treatmentsSnap.docs.map(doc => doc.data().treatment_recommendation);
  const diseaseSymptoms = symptomsSnap.docs.map(doc => doc.data().symptom_description);

  // Generate a seed-like numeric confidence
  const diseaseNum = parseInt(diseaseId.replace(/\D/g, '')) || 1;
  const confidence = isHealthy ? 99.8 : parseFloat((90 + (diseaseNum % 9) + 0.4).toFixed(1));

  return {
    id: record.history_id,
    date: record.diagnosis_date,
    crop: cropName,
    image: record.image || "https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&q=80&w=300",
    disease: diseaseName,
    status: status,
    confidence: confidence,
    treatment: diseaseTreatments.join(". ") || "Maintain general field monitoring and crop hygiene.",
    symptoms: diseaseSymptoms.length > 0 ? diseaseSymptoms : ["Observed leaf spots or discoloration."],
    notes: record.notes,
    user_id: record.user_id,
    crop_id: record.crop_id,
    disease_id: record.disease_id
  };
}

// ----------------------------------------------------
// API ENDPOINTS
// ----------------------------------------------------

// GET /api/health
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// AUTH
// POST /api/auth/register
app.post("/api/auth/register", async (req, res) => {
  const { full_name, email, role, phone, county, preferred_language, primary_crops_grown, password } = req.body;
  if (!full_name || !email || !password) {
    return res.status(400).json({ success: false, message: "Missing required registration parameters." });
  }

  try {
    const usersRef = db.collection('users');
    const cleanEmail = String(email).trim().toLowerCase();

    // Check if user with email exists
    const existsSnap = await usersRef.where('email', '==', cleanEmail).get();
    if (!existsSnap.empty) {
      return res.status(400).json({ success: false, message: "A user with this email already exists." });
    }

    const countSnap = await usersRef.get();
    const nextId = `U${String(countSnap.size + 1).padStart(3, '0')}`;
    
    const newUser = {
      user_id: nextId,
      full_name,
      email: cleanEmail,
      role: role || "Farmer",
      phone_number: phone || "+254 700 000 000",
      phone: phone || "+254 700 000 000",
      county: county || "Nairobi",
      preferred_language: preferred_language || "English",
      primary_crops_grown: primary_crops_grown || "N/A",
      password,
      date_registered: new Date().toISOString().split('T')[0],
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
    };

    await usersRef.doc(nextId).set(newUser);
    currentUserSession = newUser;
    res.json({ success: true, user: newUser });
  } catch (err: any) {
    console.error("Register error:", err);
    res.status(500).json({ success: false, message: err.message || "Registration failed." });
  }
});

// POST /api/auth/login
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required." });
  }

  try {
    const cleanEmail = String(email).trim().toLowerCase();

    // Query by email alone to avoid requiring Firestore composite indexes
    const usersSnap = await db.collection('users')
      .where('email', '==', cleanEmail)
      .get();

    let userDoc = usersSnap.empty ? null : usersSnap.docs[0];

    // Case-insensitive fallback if exact email equality query didn't match
    if (!userDoc) {
      const allUsersSnap = await db.collection('users').get();
      userDoc = allUsersSnap.docs.find(d => {
        const dEmail = String(d.data().email || '').trim().toLowerCase();
        return dEmail === cleanEmail;
      }) || null;
    }

    if (!userDoc) {
      return res.status(401).json({ success: false, message: "Invalid email or password." });
    }

    const userData = userDoc.data();

    // Check password
    if (userData.password && userData.password !== password) {
      return res.status(401).json({ success: false, message: "Invalid email or password." });
    }

    const user = {
      ...userData,
      user_id: userData.user_id || userDoc.id,
      phone: userData.phone_number || userData.phone || ""
    };

    currentUserSession = user;
    res.json({ success: true, user });
  } catch (err: any) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, message: err.message || "Login failed." });
  }
});

// POST /api/auth/logout
app.post("/api/auth/logout", (req, res) => {
  currentUserSession = null;
  res.json({ success: true, message: "Logged out successfully" });
});

// CROPS
// GET /api/crops
app.get("/api/crops", async (req, res) => {
  try {
    const snap = await db.collection('crops').get();
    const crops = snap.docs.map(doc => {
      const data = doc.data();
      return {
        ...data,
        crop_id: data.crop_id || doc.id
      };
    });
    res.json({ success: true, crops });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/crops/:id
app.get("/api/crops/:id", async (req, res) => {
  try {
    const cropId = normalizeCropId(req.params.id);
    const doc = await db.collection('crops').doc(cropId).get();
    if (!doc.exists) return res.status(404).json({ success: false, message: "Crop not found" });
    const data = doc.data();
    res.json({
      success: true,
      crop: {
        ...data,
        crop_id: data?.crop_id || doc.id
      }
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DISEASES
// GET /api/diseases/search?keyword=...
app.get("/api/diseases/search", async (req, res) => {
  const keyword = (req.query.keyword as string || "").toLowerCase();
  try {
    const snap = await db.collection('diseases').get();
    const allDiseases = snap.docs.map(doc => {
      const data = doc.data() as any;
      return {
        ...data,
        disease_id: data.disease_id || doc.id
      };
    });

    const matched = allDiseases.filter((d: any) => 
      d.disease_name.toLowerCase().includes(keyword) || 
      (d.description && d.description.toLowerCase().includes(keyword)) ||
      (d.crop_name && d.crop_name.toLowerCase().includes(keyword))
    );
    res.json({ success: true, diseases: matched });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/diseases/crop/:cropId
app.get("/api/diseases/crop/:cropId", async (req, res) => {
  try {
    const cropId = normalizeCropId(req.params.cropId);
    const snap = await db.collection('diseases').where('crop_id', '==', cropId).get();
    const matched = snap.docs.map(doc => {
      const data = doc.data();
      return {
        ...data,
        disease_id: data.disease_id || doc.id
      };
    });
    res.json({ success: true, diseases: matched });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/diseases/detailed
app.get("/api/diseases/detailed", async (req, res) => {
  try {
    const snap = await db.collection('diseases').get();
    const detailedDiseases = await Promise.all(snap.docs.map(async doc => {
      const disease = doc.data();
      const diseaseId = disease.disease_id || doc.id;
      
      const [symptomsSnap, treatmentsSnap, preventionsSnap] = await Promise.all([
        db.collection('symptoms').where('disease_id', '==', diseaseId).get(),
        db.collection('treatments').where('disease_id', '==', diseaseId).get(),
        db.collection('preventions').where('disease_id', '==', diseaseId).get()
      ]);
      
      return {
        ...disease,
        disease_id: diseaseId,
        symptoms: symptomsSnap.docs.map(d => d.data()),
        treatments: treatmentsSnap.docs.map(d => d.data()),
        preventions: preventionsSnap.docs.map(d => d.data())
      };
    }));
    res.json({ success: true, diseases: detailedDiseases });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/diseases/crop/:cropId/detailed
app.get("/api/diseases/crop/:cropId/detailed", async (req, res) => {
  try {
    const cropId = normalizeCropId(req.params.cropId);
    const snap = await db.collection('diseases').where('crop_id', '==', cropId).get();
    
    const detailedDiseases = await Promise.all(snap.docs.map(async doc => {
      const disease = doc.data();
      const diseaseId = disease.disease_id || doc.id;
      
      const [symptomsSnap, treatmentsSnap, preventionsSnap] = await Promise.all([
        db.collection('symptoms').where('disease_id', '==', diseaseId).get(),
        db.collection('treatments').where('disease_id', '==', diseaseId).get(),
        db.collection('preventions').where('disease_id', '==', diseaseId).get()
      ]);
      
      return {
        ...disease,
        disease_id: diseaseId,
        symptoms: symptomsSnap.docs.map(d => d.data()),
        treatments: treatmentsSnap.docs.map(d => d.data()),
        preventions: preventionsSnap.docs.map(d => d.data())
      };
    }));
    res.json({ success: true, diseases: detailedDiseases });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/diseases/:diseaseId
app.get("/api/diseases/:diseaseId", async (req, res) => {
  try {
    const diseaseId = normalizeDiseaseId(req.params.diseaseId);
    const doc = await db.collection('diseases').doc(diseaseId).get();
    if (!doc.exists) return res.status(404).json({ success: false, message: "Disease not found" });
    const disease = doc.data();

    // Load related symptoms, treatments, preventions
    const [symptomsSnap, treatmentsSnap, preventionsSnap] = await Promise.all([
      db.collection('symptoms').where('disease_id', '==', diseaseId).get(),
      db.collection('treatments').where('disease_id', '==', diseaseId).get(),
      db.collection('preventions').where('disease_id', '==', diseaseId).get()
    ]);

    const diseaseSymptoms = symptomsSnap.docs.map(doc => doc.data().symptom_description);
    const diseaseTreatments = treatmentsSnap.docs.map(doc => doc.data().treatment_recommendation);
    const diseasePreventions = preventionsSnap.docs.map(doc => doc.data().prevention_method);

    res.json({
      success: true,
      disease: {
        ...disease,
        disease_id: disease?.disease_id || doc.id,
        symptoms: diseaseSymptoms.length > 0 ? diseaseSymptoms : ["Observed standard leaf decay or yellowing."],
        treatment: diseaseTreatments.join(". ") || "No specific treatment recorded in database. Maintain crop hygiene.",
        preventions: diseasePreventions.length > 0 ? diseasePreventions : ["Disinfect tools and rotate crops."]
      }
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// HISTORY
// POST /api/history
app.post("/api/history", async (req, res) => {
  const { crop_id, disease_id, image, notes } = req.body;
  if (!crop_id || !disease_id) {
    return res.status(400).json({ success: false, message: "crop_id and disease_id are required." });
  }

  try {
    const user = await getReqUser(req);
    const userId = user ? normalizeUserId(user.user_id) : "U010";

    const countSnap = await db.collection('history').get();
    const nextId = `H${String(countSnap.size + 1).padStart(3, '0')}`;

    const newHistoryRecord = {
      history_id: nextId,
      user_id: userId,
      crop_id: normalizeCropId(crop_id),
      disease_id: normalizeDiseaseId(disease_id),
      diagnosis_date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      image: image || "https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&q=80&w=300",
      notes: notes || "Added via web portal"
    };

    await db.collection('history').doc(nextId).set(newHistoryRecord);
    const enriched = await enrichHistoryRecord(newHistoryRecord);
    res.json({ success: true, record: enriched });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/history/me
app.get("/api/history/me", async (req, res) => {
  try {
    const user = await getReqUser(req);
    const userId = user ? normalizeUserId(user.user_id) : "U010";
    const snap = await db.collection('history').where('user_id', '==', userId).get();
    
    const records = snap.docs.map(doc => {
      const data = doc.data();
      return {
        ...data,
        history_id: data.history_id || doc.id
      };
    });

    const enriched = await Promise.all(records.map(enrichHistoryRecord));
    res.json({ success: true, history: enriched });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/history/user/:userId
app.get("/api/history/user/:userId", async (req, res) => {
  try {
    const userId = normalizeUserId(req.params.userId);
    const snap = await db.collection('history').where('user_id', '==', userId).get();
    
    const records = snap.docs.map(doc => {
      const data = doc.data();
      return {
        ...data,
        history_id: data.history_id || doc.id
      };
    });

    const enriched = await Promise.all(records.map(enrichHistoryRecord));
    res.json({ success: true, history: enriched });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// OFFICERS
// GET /api/officers
app.get("/api/officers", async (req, res) => {
  try {
    const snap = await db.collection('officers').get();
    const officers = snap.docs.map(doc => {
      const data = doc.data();
      const phone = data.phone_number || data.phone || "";
      return {
        ...data,
        officer_id: data.officer_id || doc.id,
        phone: phone,
        phone_number: phone
      };
    });
    res.json({ success: true, officers });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/officers/county/:county
app.get("/api/officers/county/:county", async (req, res) => {
  const county = req.params.county.toLowerCase();
  try {
    const snap = await db.collection('officers').get();
    const allOfficers = snap.docs.map(doc => {
      const data = doc.data() as any;
      const phone = data.phone_number || data.phone || "";
      return {
        ...data,
        officer_id: data.officer_id || doc.id,
        phone: phone,
        phone_number: phone
      };
    });

    const matched = allOfficers.filter((o: any) => o.county.toLowerCase() === county);
    res.json({ success: true, officers: matched });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// USERS PROFILE
// GET /api/users/profile
app.get("/api/users/profile", async (req, res) => {
  const user = await getReqUser(req);
  if (!user) {
    return res.status(401).json({ success: false, message: "Unauthorized. No active session." });
  }
  res.json({ success: true, user });
});

// PUT /api/users/profile
app.put("/api/users/profile", async (req, res) => {
  const user = await getReqUser(req);
  if (!user) {
    return res.status(401).json({ success: false, message: "Unauthorized. No active session." });
  }

  const { full_name, phone, county, preferred_language, primary_crops_grown } = req.body;
  const userId = normalizeUserId(user.user_id);

  try {
    const userRef = db.collection('users').doc(userId);
    const updateData: any = {};
    if (full_name) updateData.full_name = full_name;
    if (phone) {
      updateData.phone = phone;
      updateData.phone_number = phone;
    }
    if (county) updateData.county = county;
    if (preferred_language) updateData.preferred_language = preferred_language;
    if (primary_crops_grown) updateData.primary_crops_grown = primary_crops_grown;

    await userRef.update(updateData);
    
    // Refresh session
    const refreshedDoc = await userRef.get();
    const data = refreshedDoc.data();
    const updatedUser = {
      ...data,
      user_id: data?.user_id || refreshedDoc.id,
      phone: data?.phone_number || data?.phone || ""
    };
    currentUserSession = updatedUser;

    res.json({ success: true, user: updatedUser });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Lazy initialize Gemini client
let aiClient: any = null;
function getGeminiClient() {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY environment variable is required but was not found.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// POST /api/chatbot/chat
app.post("/api/chatbot/chat", async (req, res) => {
  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ success: false, message: "Invalid or missing messages array." });
  }

  try {
    const ai = getGeminiClient();

    // Fetch user details
    const user = currentUserSession || {
      full_name: "Farmer",
      role: "Farmer",
      county: "Uasin Gishu",
      preferred_language: "English",
      primary_crops_grown: "Maize, Potatoes"
    };

    // Fetch some context from Firestore if possible to ground the AI model
    let diseaseContext = "";
    try {
      const diseasesSnap = await db.collection('diseases').get();
      const cropDocs = diseasesSnap.docs.map(d => d.data());
      diseaseContext = cropDocs.map(c => `- ${c.disease_name} (Crop: ${c.crop_name}): ${c.description || ''}`).join("\n");
    } catch (e) {
      console.error("Error fetching diseases for chat grounding:", e);
    }

    // Fetch user diagnostic history
    let historyContext = "";
    try {
      const userId = user.user_id || "U010";
      const historySnap = await db.collection('history').where('user_id', '==', userId).get();
      if (!historySnap.empty) {
        const records = historySnap.docs.map(doc => doc.data());
        const enriched = await Promise.all(records.map(enrichHistoryRecord));
        historyContext = enriched.map(h => `- Detected ${h.disease} on ${h.crop} on ${h.date}. Status: ${h.status}. Notes: ${h.notes || 'None'}`).join("\n");
      }
    } catch (e) {
      console.error("Error fetching user history for chat grounding:", e);
    }

    // Build system instruction
    const systemInstruction = `You are FarmMate AI, an elite agricultural consultant and smart crop disease expert in Kenya.
Your goal is to provide highly practical, expert-level advice on crop symptoms, prevention, treatment, and general husbandry.

Information about the currently logged-in user:
- Name: ${user.full_name}
- Role: ${user.role} (Farmer, Extension Officer, or Admin)
- County: ${user.county}
- Preferred Language: ${user.preferred_language || 'English'}
- Primary Crops Grown: ${user.primary_crops_grown || 'N/A'}

${historyContext ? `\nThe user's history of diagnosed crop conditions is:\n${historyContext}` : ''}

Here are some diseases and details available in the local FarmMate database for reference:
${diseaseContext || 'No details available'}

Guidelines:
1. Always be polite, warm, and highly practical.
2. Format your output with clear, beautiful markdown (headings, bold text, bullet points).
3. If the user's preferred language is Swahili (or if they ask in Swahili), feel free to reply in Swahili or offer a bilingual response.
4. Keep treatment advice realistic and appropriate for East African / Kenyan smallholder farming (mentioning both organic/cultural practices and chemical options where suitable).
5. Ground your diagnostic suggestions in the local diseases context above whenever possible.
6. If the crop query is complex, suggest they use the "Consult Officer" feature in FarmMate to reach out to an extension officer in ${user.county} County.`;

    // Format chat contents for the generateContent API
    const contents = messages.map((m: any) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content || m.text || "" }]
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    res.json({ success: true, text: response.text });
  } catch (err: any) {
    console.error("Gemini API Error in chatbot route:", err);
    res.status(500).json({ success: false, message: err.message || "An error occurred with the AI model." });
  }
});

// ----------------------------------------------------
// VITE OR STATIC ASSETS SERVING MIDDLEWARE
// ----------------------------------------------------

async function startServer() {
  // Boot & seed database bulk records if empty
  await seedDatabase();
  await setupInitialSession();

  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
