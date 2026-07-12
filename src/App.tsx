import React, { useState } from 'react';
import { ViewMode, Language, UserProfile, DiagnosisItem } from './types';
import { mockDiagnoses, mockUserProfile } from './data/mockData';
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

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [language, setLanguage] = useState<Language>('en');
  const [user, setUser] = useState<UserProfile | null>(mockUserProfile);
  const [diagnoses, setDiagnoses] = useState<DiagnosisItem[]>(mockDiagnoses);
  const [isScanModalOpen, setIsScanModalOpen] = useState(false);
  const [selectedDiagnosis, setSelectedDiagnosis] = useState<DiagnosisItem | null>(null);

  const handleNavigate = (view: ViewMode) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginSuccess = (loggedInUser: UserProfile) => {
    setUser(loggedInUser);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('home');
  };

  const handleNewDiagnosis = (newDiag: DiagnosisItem) => {
    setDiagnoses([newDiag, ...diagnoses]);
    setSelectedDiagnosis(newDiag);
  };

  return (
    <div className="min-h-screen bg-[#f8fbef] text-gray-900 flex flex-col justify-between font-sans selection:bg-[#14532d] selection:text-white">
      {/* Navigation Bar (hidden on dedicated auth full-screens if desired, but user screenshots show top navbar across landing/dashboard and language selector on auth screens) */}
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
          <ContactView onNavigate={handleNavigate} language={language} />
        )}
        {currentView === 'about' && (
          <AboutView onNavigate={handleNavigate} language={language} />
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
