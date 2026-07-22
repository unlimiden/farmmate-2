export type ViewMode = 'home' | 'dashboard' | 'history' | 'contact' | 'about' | 'login' | 'register' | 'symptoms' | 'chatbot';

export type Language = 'en' | 'sw';

export interface DiagnosisItem {
  id: string;
  date: string;
  crop: string;
  image: string;
  disease: string;
  status: 'Warning' | 'Success' | 'Critical';
  confidence: number;
  treatment: string;
  symptoms: string[];
  cause?: string;
  prevention?: string[];
  source_status?: string;
  isOutsourced?: boolean;
  notes?: string;
}

export interface UserProfile {
  user_id?: number;
  full_name: string;
  name: string; // compatibility with user.name
  email: string;
  role: string;
  phone: string;
  county: string;
  district: string; // compatibility with user.district
  preferred_language: string;
  primary_crops_grown: string;
  avatar: string;
}
