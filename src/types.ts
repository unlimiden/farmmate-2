export type ViewMode = 'home' | 'dashboard' | 'history' | 'contact' | 'about' | 'login' | 'register';

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
  notes?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  role: string;
  district: string;
  avatar: string;
}
