import React, { useState, useEffect } from 'react';
import { ViewMode, Language, UserProfile, DiagnosisItem } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { DashboardView } from './components/DashboardView';
import { HistoryView } from './components/HistoryView';
import { ContactView } from './components/ContactView';
import { AboutView } from './components/AboutView';
import { LoginView } from './components/LoginView';
import { RegisterView } from './components/RegisterView';
import { ScanModal } from './components/ScanModal';
import { DiagnosisDetailModal } from './components/DiagnosisDetailModal';
import { SymptomsView } from './components/SymptomsView';
import { ChatbotView } from './components/ChatbotView';
import { fetchWithAuth } from './lib/api';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [language, setLanguage] = useState<Language>('en');
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('farmmate_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });
  const [diagnoses, setDiagnoses] = useState<DiagnosisItem[]>([]);
  const [isScanModalOpen, setIsScanModalOpen] = useState(false);
  const [selectedDiagnosis, setSelectedDiagnosis] = useState<DiagnosisItem | null>(null);
  const [loading, setLoading] = useState(true);

  // Load profile and history on mount
  useEffect(() => {
    async function loadInitialData() {
      try {
        const profileRes = await fetchWithAuth('/api/users/profile');
        if (profileRes.ok) {
          const profileData = await profileRes.json();
          if (profileData.success && profileData.user) {
            const mappedUser: UserProfile = {
              ...profileData.user,
              name: profileData.user.full_name,
              district: `${profileData.user.county} County`
            };
            setUser(mappedUser);
            try {
              localStorage.setItem('farmmate_user', JSON.stringify(mappedUser));
            } catch (e) {
              console.error("localStorage save error", e);
            }
            fetchHistory();
          }
        } else if (user) {
          // Fallback fetch history with existing stored user
          fetchHistory();
        }
      } catch (err) {
        console.error("Error fetching initial profile", err);
        if (user) {
          fetchHistory();
        }
      } finally {
        setLoading(false);
      }
    }
    loadInitialData();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await fetchWithAuth('/api/history/me');
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.history) {
          setDiagnoses(data.history);
        }
      }
    } catch (err) {
      console.error("Error fetching history", err);
    }
  };

  const fetchProfile = async () => {
    try {
      const profileRes = await fetchWithAuth('/api/users/profile');
      if (profileRes.ok) {
        const profileData = await profileRes.json();
        if (profileData.success && profileData.user) {
          const mappedUser: UserProfile = {
            ...profileData.user,
            name: profileData.user.full_name,
            district: `${profileData.user.county} County`
          };
          setUser(mappedUser);
          try {
            localStorage.setItem('farmmate_user', JSON.stringify(mappedUser));
          } catch (e) {
            console.error("localStorage save error", e);
          }
        }
      }
    } catch (err) {
      console.error("Error refreshing profile", err);
    }
  };

  const handleNavigate = (view: ViewMode) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginSuccess = (loggedInUser: UserProfile) => {
    setUser(loggedInUser);
    try {
      localStorage.setItem('farmmate_user', JSON.stringify(loggedInUser));
    } catch (e) {
      console.error("localStorage save error", e);
    }
    fetchHistory();
    setCurrentView('dashboard');
  };

  const handleLogout = async () => {
    try {
      await fetchWithAuth('/api/auth/logout', { method: 'POST' });
    } catch (err) {
      console.error("Logout error", err);
    }
    localStorage.removeItem('farmmate_user');
    setUser(null);
    setDiagnoses([]);
    setCurrentView('home');
  };

  const handleNewDiagnosis = (newDiag: DiagnosisItem) => {
    setDiagnoses([newDiag, ...diagnoses]);
    setSelectedDiagnosis(newDiag);
  };

  return (
    <div className="min-h-screen bg-[#f8fbef] text-gray-900 flex flex-col justify-between font-sans selection:bg-[#14532d] selection:text-white">
      {/* Navigation Bar */}
      {currentView !== 'login' && currentView !== 'register' && (
        <Navbar
          currentView={currentView}
          onNavigate={handleNavigate}
          language={language}
          onToggleLanguage={setLanguage}
          user={user}
          onLogout={handleLogout}
        />
      )}

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'home' && (
          <HomeView onNavigate={handleNavigate} language={language} />
        )}
        {currentView === 'dashboard' && user && (
          <DashboardView
            user={user}
            diagnoses={diagnoses}
            onNavigate={handleNavigate}
            language={language}
            onOpenScanModal={() => setIsScanModalOpen(true)}
            onSelectDiagnosis={setSelectedDiagnosis}
          />
        )}
        {currentView === 'dashboard' && !user && (
          <LoginView
            onNavigate={handleNavigate}
            language={language}
            onLoginSuccess={handleLoginSuccess}
          />
        )}
        {currentView === 'history' && (
          <HistoryView
            diagnoses={diagnoses}
            onNavigate={handleNavigate}
            language={language}
            onSelectDiagnosis={setSelectedDiagnosis}
            onOpenScanModal={() => setIsScanModalOpen(true)}
          />
        )}
        {currentView === 'contact' && (
          <ContactView 
            onNavigate={handleNavigate} 
            language={language} 
            currentUser={user}
          />
        )}
        {currentView === 'about' && (
          <AboutView onNavigate={handleNavigate} language={language} />
        )}
        {currentView === 'symptoms' && (
          <SymptomsView onNavigate={handleNavigate} language={language} />
        )}
        {currentView === 'chatbot' && (
          <ChatbotView onNavigate={handleNavigate} language={language} user={user} />
        )}
        {currentView === 'login' && (
          <LoginView
            onNavigate={handleNavigate}
            language={language}
            onLoginSuccess={handleLoginSuccess}
          />
        )}
        {currentView === 'register' && (
          <RegisterView
            onNavigate={handleNavigate}
            language={language}
            onRegisterSuccess={handleLoginSuccess}
          />
        )}
      </main>

      {/* Footer */}
      {currentView !== 'login' && currentView !== 'register' && (
        <Footer onNavigate={handleNavigate} language={language} />
      )}

      {/* Modals */}
      <ScanModal
        isOpen={isScanModalOpen}
        onClose={() => setIsScanModalOpen(false)}
        onDiagnosisComplete={handleNewDiagnosis}
        language={language}
      />

      <DiagnosisDetailModal
        item={selectedDiagnosis}
        onClose={() => setSelectedDiagnosis(null)}
        language={language}
      />
    </div>
  );
}
