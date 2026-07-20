import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json({ limit: '20mb' }));

// ----------------------------------------------------
// DATABASE SEED DATA FROM THE SQL SCHEMA SPECIFICATION
// ----------------------------------------------------

let users = [
  {
    user_id: 1,
    full_name: "John Mwema Kamau",
    role: "Farmer",
    phone: "+254 712 111 222",
    county: "Kiambu",
    preferred_language: "Kiswahili",
    primary_crops_grown: "Maize, Beans",
    password: "Test@1234",
    date_registered: "2026-01-15",
    email: "john.kamau@farmmate.org",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
  },
  {
    user_id: 2,
    full_name: "Susan Wairimu Mbugua",
    role: "Farmer",
    phone: "+254 722 222 333",
    county: "Nyandarua",
    preferred_language: "Kiswahili",
    primary_crops_grown: "Irish Potato, Kale",
    password: "Test@1234",
    date_registered: "2026-01-18",
    email: "susan.mbugua@farmmate.org",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200"
  },
  {
    user_id: 3,
    full_name: "Hassan Juma Mwakio",
    role: "Farmer",
    phone: "+254 733 333 444",
    county: "Kilifi",
    preferred_language: "Kiswahili",
    primary_crops_grown: "Cassava, Banana",
    password: "Test@1234",
    date_registered: "2026-01-20",
    email: "hassan.mwakio@farmmate.org",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200"
  },
  {
    user_id: 4,
    full_name: "Lucy Nyambura Wanjiku",
    role: "Farmer",
    phone: "+254 701 444 555",
    county: "Murang'a",
    preferred_language: "English",
    primary_crops_grown: "Coffee, Beans",
    password: "Test@1234",
    date_registered: "2026-01-22",
    email: "lucy.wanjiku@farmmate.org",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200"
  },
  {
    user_id: 5,
    full_name: "Brian Otieno Ouma",
    role: "Farmer",
    phone: "+254 745 555 666",
    county: "Kisumu",
    preferred_language: "Kiswahili",
    primary_crops_grown: "Maize, Tomato",
    password: "Test@1234",
    date_registered: "2026-01-25",
    email: "brian.ouma@farmmate.org",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200"
  },
  {
    user_id: 6,
    full_name: "Agnes Chepkemoi Ruto",
    role: "Farmer",
    phone: "+254 711 666 777",
    county: "Uasin Gishu",
    preferred_language: "English",
    primary_crops_grown: "Maize, Irish Potato",
    password: "Test@1234",
    date_registered: "2026-01-28",
    email: "agnes.ruto@farmmate.org",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
  },
  {
    user_id: 7,
    full_name: "James Mwangi Karanja",
    role: "Agricultural Officer",
    phone: "+254 712 345 678",
    county: "Kiambu",
    preferred_language: "English",
    primary_crops_grown: "N/A",
    password: "Test@1234",
    date_registered: "2026-01-10",
    email: "james.karanja@kilimo.go.ke",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200"
  },
  {
    user_id: 8,
    full_name: "Grace Wanjiru Njoroge",
    role: "Agricultural Officer",
    phone: "+254 722 456 789",
    county: "Nyandarua",
    preferred_language: "English",
    primary_crops_grown: "N/A",
    password: "Test@1234",
    date_registered: "2026-01-10",
    email: "grace.njoroge@kalro.org",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200"
  },
  {
    user_id: 9,
    full_name: "Admin User",
    role: "Administrator",
    phone: "+254 700 000 001",
    county: "Nairobi",
    preferred_language: "English",
    primary_crops_grown: "N/A",
    password: "Test@1234",
    date_registered: "2026-01-01",
    email: "admin@farmmate.org",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200"
  },
  {
    user_id: 10,
    full_name: "Test Tester Mwangi",
    role: "Farmer",
    phone: "+254 700 999 888",
    county: "Nakuru",
    preferred_language: "Kiswahili",
    primary_crops_grown: "Kale, Beans",
    password: "Test@1234",
    date_registered: "2026-02-02",
    email: "farmer@example.com", // Default email from login
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
  }
];

// Seed active user session
let currentUserSession: any = users[9]; // Defaults to Johnathan (or Test Tester Mwangi)

const crops = [
  { crop_id: 1, crop_name: "Maize", scientific_name: "Zea mays" },
  { crop_id: 2, crop_name: "Common Bean", scientific_name: "Phaseolus vulgaris" },
  { crop_id: 3, crop_name: "Tomato", scientific_name: "Solanum lycopersicum" },
  { crop_id: 4, crop_name: "Irish Potato", scientific_name: "Solanum tuberosum" },
  { crop_id: 5, crop_name: "Cassava", scientific_name: "Manihot esculenta" },
  { crop_id: 6, crop_name: "Banana", scientific_name: "Musa spp." },
  { crop_id: 7, crop_name: "Kale", scientific_name: "Brassica oleracea var. acephala" },
  { crop_id: 8, crop_name: "Coffee", scientific_name: "Coffea arabica" }
];

const diseases = [
  // Maize (crop_id: 1)
  { disease_id: 1, crop_id: 1, disease_name: "Maize Lethal Necrosis (MLN)", description: "A viral disease causing yellowing, necrosis and severe yield loss." },
  { disease_id: 2, crop_id: 1, disease_name: "Gray Leaf Spot", description: "A fungal disease that causes rectangular gray lesions on maize leaves." },
  { disease_id: 3, crop_id: 1, disease_name: "Maize Streak Virus", description: "A viral disease spread by leafhoppers causing yellow streaks on leaves." },
  { disease_id: 26, crop_id: 1, disease_name: "Maize Ear Rot", description: "White or pink fungal growth on maize ears, kernel decay and poor grain quality." },
  { disease_id: 27, crop_id: 1, disease_name: "Northern Corn Leaf Blight", description: "A fungal disease causing long gray-green cigar-shaped lesions on maize leaves." },
  { disease_id: 28, crop_id: 1, disease_name: "Common Rust (Maize)", description: "Small reddish-brown raised pustules on leaves leading to premature drying." },

  // Common Bean (crop_id: 2)
  { disease_id: 4, crop_id: 2, disease_name: "Bean Anthracnose", description: "A fungal disease affecting pods, stems and leaves." },
  { disease_id: 5, crop_id: 2, disease_name: "Angular Leaf Spot", description: "A fungal disease causing angular brown lesions restricted by leaf veins." },
  { disease_id: 6, crop_id: 2, disease_name: "Bean Rust", description: "A fungal disease producing reddish-brown pustules on leaves." },
  { disease_id: 29, crop_id: 2, disease_name: "Bean Root Rot", description: "Fungal infection causing brown lesions on roots and lower stem leading to wilting." },

  // Tomato (crop_id: 3)
  { disease_id: 7, crop_id: 3, disease_name: "Late Blight", description: "A fungal disease causing dark lesions on leaves, stems and fruits." },
  { disease_id: 8, crop_id: 3, disease_name: "Early Blight", description: "A fungal disease causing concentric brown spots on leaves." },
  { disease_id: 9, crop_id: 3, disease_name: "Bacterial Wilt", description: "A bacterial disease causing sudden wilting of tomato plants." },
  { disease_id: 30, crop_id: 3, disease_name: "Fusarium Wilt (Tomato)", description: "Fungal disease causing yellowing of lower leaves and complete plant wilting." },

  // Irish Potato (crop_id: 4)
  { disease_id: 10, crop_id: 4, disease_name: "Late Blight", description: "A destructive fungal disease causing leaf and tuber rot." },
  { disease_id: 11, crop_id: 4, disease_name: "Bacterial Wilt", description: "A bacterial disease causing rapid wilting of potato plants." },
  { disease_id: 12, crop_id: 4, disease_name: "Potato Virus Y", description: "A viral disease causing mottling, mosaic patterns, and crinkled leaves." },

  // Cassava (crop_id: 5)
  { disease_id: 13, crop_id: 5, disease_name: "Cassava Mosaic Disease", description: "A viral disease causing mosaic leaf patterns and poor growth." },
  { disease_id: 14, crop_id: 5, disease_name: "Cassava Brown Streak Disease", description: "A viral disease causing root necrosis and yellow leaf veins." },

  // Banana (crop_id: 6)
  { disease_id: 15, crop_id: 6, disease_name: "Banana Xanthomonas Wilt", description: "A bacterial disease causing angular water-soaked leaf spots and stem dieback." },
  { disease_id: 16, crop_id: 6, disease_name: "Panama Disease", description: "A fungal disease causing yellowing and wilting of banana plants." },
  { disease_id: 17, crop_id: 6, disease_name: "Banana Bunchy Top Virus", description: "A virus causing yellowing of older leaves progressing upward, stunting and bunching." },
  { disease_id: 18, crop_id: 6, disease_name: "Black Sigatoka", description: "A fungal disease causing black streaks and reduced yield." },

  // Kale (crop_id: 7)
  { disease_id: 21, crop_id: 7, disease_name: "Black Rot", description: "A bacterial disease causing V-shaped yellow lesions on leaves." },
  { disease_id: 22, crop_id: 7, disease_name: "Downy Mildew", description: "A fungal disease causing yellow patches with gray fungal growth." },
  { disease_id: 23, crop_id: 7, disease_name: "Alternaria Leaf Spot", description: "A fungal disease causing dark circular spots on leaves." },
  { disease_id: 24, crop_id: 7, disease_name: "Powdery Mildew", description: "White powder-like growth on leaf surfaces causing leaves to distort." },

  // Coffee (crop_id: 8)
  { disease_id: 19, crop_id: 8, disease_name: "Coffee Berry Disease", description: "A fungal disease attacking developing coffee berries." },
  { disease_id: 20, crop_id: 8, disease_name: "Coffee Leaf Rust", description: "A fungal disease causing orange powdery spots on leaves." },
  { disease_id: 25, crop_id: 8, disease_name: "Coffee Wilt Disease", description: "Bacterial infection causing leaves to lose green color and tree branches to dry." }
];

const symptoms = [
  // MLN
  { disease_id: 1, symptom_name: "Chlorotic mottling and yellow streaking starting from the leaf base", severity_stage: "Early" },
  { disease_id: 1, symptom_name: "Severe leaf necrosis, premature drying (dead heart)", severity_stage: "Advanced" },
  { disease_id: 1, symptom_name: "Stunted growth and poor/no cob formation", severity_stage: "Advanced" },
  // GLS
  { disease_id: 2, symptom_name: "Small, narrow, tan-to-gray rectangular lesions running parallel to leaf veins", severity_stage: "Early" },
  { disease_id: 2, symptom_name: "Lesions merge and cause large areas of leaf blighting", severity_stage: "Advanced" },
  // MSV
  { disease_id: 3, symptom_name: "Narrow, broken yellow streaks running parallel to leaf veins", severity_stage: "Early" },
  { disease_id: 3, symptom_name: "Severe stunting and reduced cob size", severity_stage: "Advanced" },
  // Bean Anthracnose
  { disease_id: 4, symptom_name: "Dark sunken lesions on pods and stems", severity_stage: "Early" },
  { disease_id: 4, symptom_name: "Blackened veins on the underside of leaves", severity_stage: "Advanced" },
  // Angular Leaf Spot
  { disease_id: 5, symptom_name: "Angular brown lesions restricted by leaf veins", severity_stage: "General" },
  { disease_id: 5, symptom_name: "Premature leaf drop", severity_stage: "Advanced" },
  // Bean Rust
  { disease_id: 6, symptom_name: "Small reddish-brown pustules on leaves", severity_stage: "Early" },
  { disease_id: 6, symptom_name: "Yellowing and drying of leaves", severity_stage: "Advanced" },
  // Tomato Late Blight
  { disease_id: 7, symptom_name: "Dark water-soaked lesions on leaves", severity_stage: "Early" },
  { disease_id: 7, symptom_name: "White fungal growth under leaves during humid conditions", severity_stage: "Advanced" },
  // Early Blight Tomato
  { disease_id: 8, symptom_name: "Brown concentric ring lesions on older leaves", severity_stage: "Early" },
  { disease_id: 8, symptom_name: "Yellowing around leaf spots", severity_stage: "Advanced" },
  // Bacterial Wilt Tomato
  { disease_id: 9, symptom_name: "Sudden wilting without yellowing", severity_stage: "Early" },
  { disease_id: 9, symptom_name: "Brown discoloration inside stem tissues", severity_stage: "Advanced" },
  // Potato Late Blight
  { disease_id: 10, symptom_name: "Dark irregular leaf lesions", severity_stage: "Early" },
  { disease_id: 10, symptom_name: "Brown rotting tubers", severity_stage: "Advanced" },
  // Potato Bacterial Wilt
  { disease_id: 11, symptom_name: "Wilting of individual stems despite moist soil", severity_stage: "Early" },
  { disease_id: 11, symptom_name: "Brown ring of discoloration visible when tuber is cut; bacterial ooze", severity_stage: "Advanced" },
  // Potato Virus Y
  { disease_id: 12, symptom_name: "Mottling, mosaic, and crinkling of leaves", severity_stage: "Early" },
  { disease_id: 12, symptom_name: "Stunted plants and reduced, deformed tubers", severity_stage: "Advanced" },
  // CMD
  { disease_id: 13, symptom_name: "Yellow-green mosaic patterns and leaf distortion", severity_stage: "Early" },
  { disease_id: 13, symptom_name: "Severe leaf curling, stunting, and reduced root yield", severity_stage: "Advanced" },
  // CBSD
  { disease_id: 14, symptom_name: "Yellowing along leaf veins (often mild or absent)", severity_stage: "Early" },
  { disease_id: 14, symptom_name: "Brown, corky necrotic rot inside tuberous roots, undetectable until harvest", severity_stage: "Advanced" },
  // Banana Xanthomonas
  { disease_id: 15, symptom_name: "Angular, water-soaked leaf spots and wilting of young shoots", severity_stage: "Early" },
  { disease_id: 15, symptom_name: "Stem dieback and gum exudation", severity_stage: "Advanced" },
  // Panama Disease
  { disease_id: 16, symptom_name: "Yellowing and wilting of leaves starting from leaf margins", severity_stage: "Early" },
  { disease_id: 16, symptom_name: "Premature ripening of bunches and yellow bacterial ooze from cut stems", severity_stage: "Advanced" },
  // BBTV
  { disease_id: 17, symptom_name: "Yellowing of older leaves progressing upward", severity_stage: "Early" },
  { disease_id: 17, symptom_name: "Splitting of the lower pseudostem and plant collapse", severity_stage: "Advanced" },
  // Black Sigatoka
  { disease_id: 18, symptom_name: "Small yellow-brown streaks on leaves that enlarge into black-brown spots", severity_stage: "Early" },
  { disease_id: 18, symptom_name: "Extensive leaf death and reduced bunch size", severity_stage: "Advanced" },
  // Coffee Berry
  { disease_id: 19, symptom_name: "Small, sunken, dark brown-to-black lesions on green berries", severity_stage: "Early" },
  { disease_id: 19, symptom_name: "Berries shrivel, mummify, and drop prematurely", severity_stage: "Advanced" },
  // Coffee Rust
  { disease_id: 20, symptom_name: "Pale yellow-orange powdery pustules on leaf undersides", severity_stage: "Early" },
  { disease_id: 20, symptom_name: "Severe defoliation and dieback of branches", severity_stage: "Advanced" },
  // Black Rot Kale
  { disease_id: 21, symptom_name: "Yellow V-shaped lesions beginning at the leaf edges", severity_stage: "Early" },
  { disease_id: 21, symptom_name: "Blackened leaf veins and complete leaf wilting", severity_stage: "Advanced" },
  // Downy Mildew Kale
  { disease_id: 22, symptom_name: "Yellow patches on the upper leaf surface", severity_stage: "Early" },
  { disease_id: 22, symptom_name: "Gray-purple fungal growth on the underside of leaves", severity_stage: "Advanced" },
  // Alternaria Kale
  { disease_id: 23, symptom_name: "Small dark circular spots with concentric rings", severity_stage: "Early" },
  { disease_id: 23, symptom_name: "Large dead patches causing leaf drop", severity_stage: "Advanced" },
  // Powdery Mildew Kale
  { disease_id: 24, symptom_name: "White powder-like growth on leaf surfaces", severity_stage: "Early" },
  { disease_id: 24, symptom_name: "Leaves become yellow, dry and distorted", severity_stage: "Advanced" },
  // Coffee Wilt
  { disease_id: 25, symptom_name: "Leaves lose their green colour and begin wilting", severity_stage: "Early" },
  { disease_id: 25, symptom_name: "Complete drying of branches and eventual death of the tree", severity_stage: "Advanced" },
  // Maize Ear Rot
  { disease_id: 26, symptom_name: "White or pink fungal growth on maize ears", severity_stage: "Early" },
  { disease_id: 26, symptom_name: "Kernel decay and poor grain quality", severity_stage: "Advanced" },
  // Northern Corn Blight
  { disease_id: 27, symptom_name: "Long gray-green cigar-shaped lesions", severity_stage: "Early" },
  { disease_id: 27, symptom_name: "Large dead leaf areas reducing photosynthesis", severity_stage: "Advanced" },
  // Maize Common Rust
  { disease_id: 28, symptom_name: "Small reddish-brown raised pustules", severity_stage: "Early" },
  { disease_id: 28, symptom_name: "Leaves dry prematurely under severe infection", severity_stage: "Advanced" },
  // Bean Root Rot
  { disease_id: 29, symptom_name: "Brown lesions on roots and lower stem", severity_stage: "Early" },
  { disease_id: 29, symptom_name: "Root decay leading to plant wilting", severity_stage: "Advanced" },
  // Tomato Fusarium
  { disease_id: 30, symptom_name: "Yellowing of lower leaves", severity_stage: "Early" },
  { disease_id: 30, symptom_name: "Complete plant wilting with brown vascular tissue", severity_stage: "Advanced" }
];

const treatments = [
  { disease_id: 1, treatment: "There is no cure. Remove and destroy infected plants; plant certified disease-free seed." },
  { disease_id: 2, treatment: "Apply fungicides containing azoxystrobin, pyraclostrobin or propiconazole." },
  { disease_id: 3, treatment: "There is no cure. Control leafhoppers and plant resistant varieties." },
  { disease_id: 4, treatment: "Apply fungicides containing mancozeb or copper oxychloride." },
  { disease_id: 5, treatment: "Apply fungicides containing chlorothalonil or mancozeb." },
  { disease_id: 6, treatment: "There is no cure. Plant certified virus-free seed and remove infected plants." },
  { disease_id: 7, treatment: "Apply fungicides containing mancozeb, metalaxyl or chlorothalonil." },
  { disease_id: 8, treatment: "Apply fungicides containing chlorothalonil or copper oxychloride." },
  { disease_id: 9, treatment: "There is no effective chemical cure. Remove infected plants immediately." },
  { disease_id: 10, treatment: "Apply fungicides containing mancozeb, metalaxyl or chlorothalonil." },
  { disease_id: 11, treatment: "Remove infected plants and use certified disease-free seed tubers." },
  { disease_id: 12, treatment: "Control aphids and plant certified virus-free seed." },
  { disease_id: 13, treatment: "Use resistant cassava varieties and remove infected plants." },
  { disease_id: 14, treatment: "Plant resistant varieties and use disease-free cuttings." },
  { disease_id: 15, treatment: "Remove infected plants and disinfect farm tools after use." },
  { disease_id: 16, treatment: "Use resistant banana varieties and destroy infected plants." },
  { disease_id: 17, treatment: "Control aphids and remove infected banana plants." },
  { disease_id: 18, treatment: "Apply fungicides containing mancozeb or propiconazole." },
  { disease_id: 19, treatment: "Apply copper-based fungicides during the rainy season." },
  { disease_id: 20, treatment: "Apply fungicides containing copper oxychloride or triadimefon." },
  { disease_id: 21, treatment: "Apply copper-based bactericides, remove infected plants and practice crop rotation." },
  { disease_id: 22, treatment: "Apply fungicides containing mancozeb or metalaxyl and improve field drainage." },
  { disease_id: 23, treatment: "Apply fungicides such as chlorothalonil or mancozeb." },
  { disease_id: 24, treatment: "Apply sulfur-based or potassium bicarbonate fungicides." },
  { disease_id: 25, treatment: "Remove infected trees completely and disinfect farm tools." },
  { disease_id: 26, treatment: "Harvest promptly, dry grain properly and discard infected ears." },
  { disease_id: 27, treatment: "Apply fungicides containing azoxystrobin or propiconazole." },
  { disease_id: 28, treatment: "Apply fungicides such as propiconazole or tebuconazole." },
  { disease_id: 29, treatment: "Improve soil drainage, rotate crops and apply recommended fungicides." },
  { disease_id: 30, treatment: "Use resistant varieties and practice crop rotation." }
];

const prevention = [
  { disease_id: 1, prevention_method: "Plant certified disease-free seed" },
  { disease_id: 1, prevention_method: "Control maize insect vectors" },
  { disease_id: 1, prevention_method: "Remove and destroy infected plants" },
  { disease_id: 2, prevention_method: "Practice crop rotation" },
  { disease_id: 2, prevention_method: "Plant resistant maize varieties" },
  { disease_id: 3, prevention_method: "Control leafhopper populations" },
  { disease_id: 3, prevention_method: "Plant resistant maize varieties" },
  { disease_id: 4, prevention_method: "Use certified disease-free seed" },
  { disease_id: 4, prevention_method: "Practice crop rotation" },
  { disease_id: 5, prevention_method: "Avoid overhead irrigation" },
  { disease_id: 5, prevention_method: "Plant resistant bean varieties" },
  { disease_id: 6, prevention_method: "Plant certified virus-free seed" },
  { disease_id: 6, prevention_method: "Control aphids" },
  { disease_id: 7, prevention_method: "Avoid wetting leaves" },
  { disease_id: 7, prevention_method: "Rotate tomato crops" },
  { disease_id: 7, prevention_method: "Use resistant varieties" },
  { disease_id: 8, prevention_method: "Rotate with non-host crops" },
  { disease_id: 8, prevention_method: "Maintain clean weed-free fields" },
  { disease_id: 9, prevention_method: "Use clean planting materials" },
  { disease_id: 9, prevention_method: "Practice crop rotation" },
  { disease_id: 10, prevention_method: "Use certified seed potatoes" },
  { disease_id: 10, prevention_method: "Avoid overhead irrigation" },
  { disease_id: 11, prevention_method: "Use disease-free seed tubers" },
  { disease_id: 11, prevention_method: "Practice crop rotation" },
  { disease_id: 12, prevention_method: "Control aphids" },
  { disease_id: 12, prevention_method: "Plant certified seed" },
  { disease_id: 13, prevention_method: "Use resistant cassava varieties" },
  { disease_id: 13, prevention_method: "Plant healthy stem cuttings" },
  { disease_id: 14, prevention_method: "Plant disease-free cuttings" },
  { disease_id: 14, prevention_method: "Destroy infected plants" },
  { disease_id: 15, prevention_method: "Disinfect farm tools" },
  { disease_id: 15, prevention_method: "Remove infected banana plants" },
  { disease_id: 16, prevention_method: "Plant resistant banana varieties" },
  { disease_id: 16, prevention_method: "Avoid moving contaminated soil" },
  { disease_id: 17, prevention_method: "Control aphids" },
  { disease_id: 17, prevention_method: "Destroy infected plants" },
  { disease_id: 18, prevention_method: "Remove infected leaves" },
  { disease_id: 18, prevention_method: "Improve air circulation" },
  { disease_id: 19, prevention_method: "Prune coffee trees regularly" },
  { disease_id: 19, prevention_method: "Remove infected berries" },
  { disease_id: 20, prevention_method: "Plant resistant coffee varieties" },
  { disease_id: 20, prevention_method: "Maintain proper field sanitation" },
  { disease_id: 21, prevention_method: "Practice crop rotation" },
  { disease_id: 21, prevention_method: "Use certified disease-free seed" },
  { disease_id: 21, prevention_method: "Remove infected plants immediately" },
  { disease_id: 22, prevention_method: "Avoid overhead irrigation" },
  { disease_id: 22, prevention_method: "Improve air circulation between plants" },
  { disease_id: 23, prevention_method: "Destroy infected plant debris" },
  { disease_id: 23, prevention_method: "Maintain proper plant spacing" },
  { disease_id: 24, prevention_method: "Avoid overcrowding" },
  { disease_id: 24, prevention_method: "Remove infected leaves" },
  { disease_id: 25, prevention_method: "Use disease-free planting materials" },
  { disease_id: 25, prevention_method: "Disinfect pruning tools" },
  { disease_id: 26, prevention_method: "Harvest on time" },
  { disease_id: 26, prevention_method: "Dry harvested grain properly" },
  { disease_id: 26, prevention_method: "Store grain in dry conditions" },
  { disease_id: 27, prevention_method: "Plant resistant maize varieties" },
  { disease_id: 27, prevention_method: "Practice crop rotation" },
  { disease_id: 28, prevention_method: "Plant resistant maize varieties" },
  { disease_id: 28, prevention_method: "Monitor crops regularly" },
  { disease_id: 29, prevention_method: "Improve soil drainage" },
  { disease_id: 29, prevention_method: "Avoid waterlogging" },
  { disease_id: 29, prevention_method: "Practice crop rotation" },
  { disease_id: 30, prevention_method: "Use resistant tomato varieties" },
  { disease_id: 30, prevention_method: "Avoid planting tomatoes repeatedly in the same field" }
];

// Let's seed initial diagnostics list linked to users, crops and diseases.
// We maintain real relational data where possible, but also make it easy to digest for client.
let historyRecords = [
  {
    history_id: 1,
    user_id: 1,
    crop_id: 1,
    disease_id: 2, // Gray Leaf Spot
    diagnosis_date: "2026-07-10",
    image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&q=80&w=300",
    notes: "Detected during mid-season routine inspection."
  },
  {
    history_id: 2,
    user_id: 2,
    crop_id: 4,
    disease_id: 10, // Late Blight
    diagnosis_date: "2026-07-15",
    image: "https://images.unsplash.com/photo-1518977676601-b5ff321035b3?auto=format&fit=crop&q=80&w=300",
    notes: "Late Blight spreading fast due to high humidity levels."
  },
  {
    history_id: 3,
    user_id: 3,
    crop_id: 3,
    disease_id: 7, // Late Blight
    diagnosis_date: "2026-07-18",
    image: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&q=80&w=300",
    notes: "Late Blight spotted on southern leaves."
  },
  {
    history_id: 4,
    user_id: 4,
    crop_id: 8,
    disease_id: 20, // Coffee Leaf Rust
    diagnosis_date: "2026-07-19",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=300",
    notes: "Coffee Leaf Rust detected. Heavy orange pustules underneath."
  },
  {
    history_id: 5,
    user_id: 10, // Test Tester Mwangi
    crop_id: 7,
    disease_id: 21, // Black Rot
    diagnosis_date: "2026-07-20",
    image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&q=80&w=300",
    notes: "Black Rot detected. Distinct yellow V-shapes."
  }
];

const agriculturalOfficers = [
  { officer_id: 1, officer_name: "James Mwangi", organization: "Ministry of Agriculture", county: "Kiambu", specialization: "Crop Disease Management", phone: "+254712345678", email: "james.mwangi@kilimo.go.ke", years_experience: 12 },
  { officer_id: 2, officer_name: "Grace Wanjiku", organization: "KALRO", county: "Nakuru", specialization: "Plant Pathology", phone: "+254722456789", email: "grace.wanjiku@kalro.org", years_experience: 10 },
  { officer_id: 3, officer_name: "Peter Kiprono", organization: "Ministry of Agriculture", county: "Uasin Gishu", specialization: "Maize Production", phone: "+254733567890", email: "peter.kiprono@kilimo.go.ke", years_experience: 8 },
  { officer_id: 4, officer_name: "Mary Atieno", organization: "KALRO", county: "Kisumu", specialization: "Horticulture", phone: "+254711678901", email: "mary.atieno@kalro.org", years_experience: 9 },
  { officer_id: 5, officer_name: "Joseph Mutiso", organization: "County Agriculture Office", county: "Machakos", specialization: "Integrated Pest Management", phone: "+254722789012", email: "joseph.mutiso@machakos.go.ke", years_experience: 11 },
  { officer_id: 6, officer_name: "Ann Njeri", organization: "County Agriculture Office", county: "Nyeri", specialization: "Vegetable Crop Production", phone: "+254733890123", email: "ann.njeri@nyeri.go.ke", years_experience: 7 },
  { officer_id: 7, officer_name: "David Ouma", organization: "KALRO", county: "Kakamega", specialization: "Soil and Crop Health", phone: "+254711901234", email: "david.ouma@kalro.org", years_experience: 13 },
  { officer_id: 8, officer_name: "Sarah Chebet", organization: "Ministry of Agriculture", county: "Kericho", specialization: "Coffee Crop Management", phone: "+254722012345", email: "sarah.chebet@kilimo.go.ke", years_experience: 9 }
];


// ----------------------------------------------------
// API ENDPOINTS
// ----------------------------------------------------

// GET /api/health
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// AUTH
// POST /api/auth/register
app.post("/api/auth/register", (req, res) => {
  const { full_name, email, role, phone, county, preferred_language, primary_crops_grown, password } = req.body;
  if (!full_name || !email || !password) {
    return res.status(400).json({ success: false, message: "Missing required registration parameters." });
  }

  // Check if email already exists
  const exists = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (exists) {
    return res.status(400).json({ success: false, message: "A user with this email already exists." });
  }

  const newUser = {
    user_id: users.length + 1,
    full_name,
    email,
    role: role || "Farmer",
    phone: phone || "+254 700 000 000",
    county: county || "Nairobi",
    preferred_language: preferred_language || "English",
    primary_crops_grown: primary_crops_grown || "N/A",
    password,
    date_registered: new Date().toISOString().split('T')[0],
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
  };

  users.push(newUser);
  currentUserSession = newUser;
  res.json({ success: true, user: newUser });
});

// POST /api/auth/login
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required." });
  }

  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
  if (!user) {
    return res.status(401).json({ success: false, message: "Invalid email or password." });
  }

  currentUserSession = user;
  res.json({ success: true, user });
});

// POST /api/auth/logout
app.post("/api/auth/logout", (req, res) => {
  currentUserSession = null;
  res.json({ success: true, message: "Logged out successfully" });
});


// CROPS
// GET /api/crops
app.get("/api/crops", (req, res) => {
  res.json({ success: true, crops });
});

// GET /api/crops/:id
app.get("/api/crops/:id", (req, res) => {
  const cropId = parseInt(req.params.id);
  const crop = crops.find(c => c.crop_id === cropId);
  if (!crop) return res.status(404).json({ success: false, message: "Crop not found" });
  res.json({ success: true, crop });
});


// DISEASES
// GET /api/diseases/search?keyword=...
app.get("/api/diseases/search", (req, res) => {
  const keyword = (req.query.keyword as string || "").toLowerCase();
  const matched = diseases.filter(d => 
    d.disease_name.toLowerCase().includes(keyword) || 
    d.description.toLowerCase().includes(keyword)
  );
  res.json({ success: true, diseases: matched });
});

// GET /api/diseases/crop/:cropId
app.get("/api/diseases/crop/:cropId", (req, res) => {
  const cropId = parseInt(req.params.cropId);
  const matched = diseases.filter(d => d.crop_id === cropId);
  res.json({ success: true, diseases: matched });
});

// GET /api/diseases/:diseaseId
app.get("/api/diseases/:diseaseId", (req, res) => {
  const diseaseId = parseInt(req.params.diseaseId);
  const disease = diseases.find(d => d.disease_id === diseaseId);
  if (!disease) return res.status(404).json({ success: false, message: "Disease not found" });

  // Load related symptoms, treatments, preventions
  const diseaseSymptoms = symptoms.filter(s => s.disease_id === diseaseId).map(s => s.symptom_name);
  const diseaseTreatments = treatments.filter(t => t.disease_id === diseaseId).map(t => t.treatment);
  const diseasePreventions = prevention.filter(p => p.disease_id === diseaseId).map(p => p.prevention_method);

  res.json({
    success: true,
    disease: {
      ...disease,
      symptoms: diseaseSymptoms.length > 0 ? diseaseSymptoms : ["Observed standard leaf decay or yellowing."],
      treatment: diseaseTreatments.join(". ") || "No specific treatment recorded in database. Maintain crop hygiene.",
      preventions: diseasePreventions.length > 0 ? diseasePreventions : ["Disinfect tools and rotate crops."]
    }
  });
});


// HISTORY
// Helper to enrich history record with relational details
function enrichHistoryRecord(record: any) {
  const user = users.find(u => u.user_id === record.user_id);
  const crop = crops.find(c => c.crop_id === record.crop_id);
  const disease = diseases.find(d => d.disease_id === record.disease_id);

  // Fallbacks if deleted/missing
  const cropName = crop ? crop.crop_name : "Crop";
  const diseaseName = disease ? disease.disease_name : "Healthy";
  
  // Status depends on disease_name (Healthy = Success, else Warning)
  const isHealthy = diseaseName.toLowerCase().includes("healthy");
  const status = isHealthy ? "Success" : "Warning";

  // Load treatment
  const diseaseTreatments = treatments.filter(t => t.disease_id === record.disease_id).map(t => t.treatment);
  const diseaseSymptoms = symptoms.filter(s => s.disease_id === record.disease_id).map(s => s.symptom_name);

  return {
    id: `rec-${record.history_id}`,
    date: record.diagnosis_date,
    crop: cropName,
    image: record.image || "https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&q=80&w=300",
    disease: diseaseName,
    status: status,
    confidence: isHealthy ? 99.8 : parseFloat((90 + (record.history_id % 9) + 0.4).toFixed(1)),
    treatment: diseaseTreatments.join(". ") || "Maintain general field monitoring and crop hygiene.",
    symptoms: diseaseSymptoms.length > 0 ? diseaseSymptoms : ["Observed leaf spots or discoloration."],
    notes: record.notes,
    user_id: record.user_id,
    crop_id: record.crop_id,
    disease_id: record.disease_id
  };
}

// POST /api/history
app.post("/api/history", (req, res) => {
  const { crop_id, disease_id, image, notes } = req.body;
  if (!crop_id || !disease_id) {
    return res.status(400).json({ success: false, message: "crop_id and disease_id are required." });
  }

  const userId = currentUserSession ? currentUserSession.user_id : 10; // Default to test user if not logged in

  const newHistoryRecord = {
    history_id: historyRecords.length + 1,
    user_id: userId,
    crop_id: parseInt(crop_id),
    disease_id: parseInt(disease_id),
    diagnosis_date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    image: image || "https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&q=80&w=300",
    notes: notes || "Added via web portal"
  };

  historyRecords.unshift(newHistoryRecord);
  res.json({ success: true, record: enrichHistoryRecord(newHistoryRecord) });
});

// GET /api/history/me
app.get("/api/history/me", (req, res) => {
  const userId = currentUserSession ? currentUserSession.user_id : 10;
  const filtered = historyRecords.filter(h => h.user_id === userId);
  const enriched = filtered.map(enrichHistoryRecord);
  res.json({ success: true, history: enriched });
});

// GET /api/history/user/:userId
app.get("/api/history/user/:userId", (req, res) => {
  const userId = parseInt(req.params.userId);
  const filtered = historyRecords.filter(h => h.user_id === userId);
  const enriched = filtered.map(enrichHistoryRecord);
  res.json({ success: true, history: enriched });
});


// OFFICERS
// GET /api/officers
app.get("/api/officers", (req, res) => {
  res.json({ success: true, officers: agriculturalOfficers });
});

// GET /api/officers/county/:county
app.get("/api/officers/county/:county", (req, res) => {
  const county = req.params.county.toLowerCase();
  const matched = agriculturalOfficers.filter(o => o.county.toLowerCase() === county);
  res.json({ success: true, officers: matched });
});


// USERS PROFILE
// GET /api/users/profile
app.get("/api/users/profile", (req, res) => {
  if (!currentUserSession) {
    return res.status(401).json({ success: false, message: "Unauthorized. No active session." });
  }
  res.json({ success: true, user: currentUserSession });
});

// PUT /api/users/profile
app.put("/api/users/profile", (req, res) => {
  if (!currentUserSession) {
    return res.status(401).json({ success: false, message: "Unauthorized. No active session." });
  }

  const { full_name, phone, county, preferred_language, primary_crops_grown } = req.body;
  
  // Find index in main users list
  const userIdx = users.findIndex(u => u.user_id === currentUserSession.user_id);
  if (userIdx !== -1) {
    if (full_name) users[userIdx].full_name = full_name;
    if (phone) users[userIdx].phone = phone;
    if (county) users[userIdx].county = county;
    if (preferred_language) users[userIdx].preferred_language = preferred_language;
    if (primary_crops_grown) users[userIdx].primary_crops_grown = primary_crops_grown;

    currentUserSession = users[userIdx];
  }

  res.json({ success: true, user: currentUserSession });
});


// ----------------------------------------------------
// VITE OR STATIC ASSETS SERVING MIDDLEWARE
// ----------------------------------------------------

async function startServer() {
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
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
