import { DiagnosisItem, UserProfile } from '../types';

export const mockUserProfile: UserProfile = {
  name: "Jonathan Reed",
  email: "jonathan.reed@farmmate.org",
  role: "Regional Supervisor",
  district: "Northern District Farms",
  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
};

export const mockDiagnoses: DiagnosisItem[] = [
  {
    id: "diag-1",
    date: "Oct 24, 2024",
    crop: "Tomato",
    image: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&q=80&w=300",
    disease: "Late Blight",
    status: "Warning",
    confidence: 94.2,
    treatment: "Apply copper-based fungicide every 7-10 days. Remove and destroy infected foliage immediately to prevent spore spread.",
    symptoms: ["Dark water-soaked spots on leaves", "White fungal growth under humid conditions", "Rapid wilting of stems"]
  },
  {
    id: "diag-2",
    date: "Oct 23, 2024",
    crop: "Wheat",
    image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&q=80&w=300",
    disease: "Healthy",
    status: "Success",
    confidence: 98.7,
    treatment: "No treatment required. Maintain current nitrogen fertilization schedule and standard irrigation.",
    symptoms: ["Vibrant green canopy", "Strong erect stems", "Uniform grain head development"]
  },
  {
    id: "diag-3",
    date: "Oct 23, 2024",
    crop: "Corn",
    image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&q=80&w=300",
    disease: "Common Rust",
    status: "Warning",
    confidence: 91.5,
    treatment: "Apply resistant hybrid seeds in subsequent seasons. Use registered foliar fungicides if pustules cover more than 15% of ear leaf.",
    symptoms: ["Cinnamon-brown pustules on upper and lower leaf surfaces", "Chlorotic halos around lesions"]
  },
  {
    id: "diag-4",
    date: "Oct 22, 2024",
    crop: "Potato",
    image: "https://images.unsplash.com/photo-1518977676601-b5ff321035b3?auto=format&fit=crop&q=80&w=300",
    disease: "Healthy",
    status: "Success",
    confidence: 96.4,
    treatment: "Crop is in optimal health condition. Ensure proper hilling and monitor soil moisture levels.",
    symptoms: ["Robust green foliage", "Clean tuber development", "No sign of pest nibbling"]
  },
  {
    id: "diag-5",
    date: "Oct 20, 2024",
    crop: "Coffee",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=300",
    disease: "Coffee Berry Disease",
    status: "Critical",
    confidence: 95.8,
    treatment: "Prune shade trees to improve air circulation. Apply copper fungicides during early berry expansion phase.",
    symptoms: ["Dark sunken lesions on green berries", "Mummified berries hanging on branches", "Premature fruit drop"]
  },
  {
    id: "diag-6",
    date: "Oct 18, 2024",
    crop: "Banana",
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&q=80&w=300",
    disease: "Black Sigatoka",
    status: "Warning",
    confidence: 89.3,
    treatment: "Remove severely infected leaves and bury them. Apply systemic fungicides in rotation with protectants.",
    symptoms: ["Narrow dark streaks parallel to leaf veins", "Necrotic rectangular spots", "Reduced fruit yield"]
  }
];
