import React, { useState } from 'react';
import { ViewMode, Language, UserProfile } from '../types';
import { translations } from '../data/translations';
import { Bug, Lock, Mail, Eye, EyeOff, ArrowRight } from 'lucide-react';

interface LoginViewProps {
  onNavigate: (view: ViewMode) => void;
  language: Language;
  onLoginSuccess: (user: UserProfile) => void;
}

export const LoginView: React.FC<LoginViewProps> = ({
  onNavigate,
  language,
  onLoginSuccess,
}) => {
  const t = translations[language];
  const [email, setEmail] = useState('farmer@example.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess({
      name: "Jonathan Reed",
      email: email,
      role: "Regional Supervisor",
      district: "Northern District Farms",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
    });
  };

  return (
    <div className="w-full bg-[#f8fbef] min-h-screen flex flex-col justify-between py-12 px-4 font-sans">
      <div className="max-w-md w-full mx-auto space-y-6">
        {/* Main Card */}
        <div className="bg-white border border-[#e2ebd4] rounded-3xl p-8 shadow-xl space-y-6 relative overflow-hidden">
          {/* Logo Badge */}
          <div className="flex justify-center">
            <div className="w-12 h-12 rounded-2xl bg-[#14532d] flex items-center justify-center text-white shadow-md">
              <Bug className="w-6 h-6" />
            </div>
          </div>

          <div className="text-center space-y-1">
            <h2 className="text-2xl font-extrabold text-gray-900">{t.welcomeBack}</h2>
            <p className="text-xs text-gray-500 font-medium">{t.continueManaging}</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                {t.emailAddress}
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="farmer@example.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#fcfdfa] border border-[#d8e5c4] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#14532d]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                {t.password}
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 bg-[#fcfdfa] border border-[#d8e5c4] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#14532d]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded border-gray-300 text-[#14532d] focus:ring-[#14532d]" />
                <span className="text-gray-600 font-medium">{t.rememberMe}</span>
              </label>
              <a href="#forgot" onClick={(e) => { e.preventDefault(); alert("Password reset instructions sent to your email."); }} className="text-[#14532d] font-semibold hover:underline">
                {t.forgotPassword}
              </a>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#14532d] text-white rounded-xl text-sm font-semibold hover:bg-[#0f4023] shadow-md transition-all mt-2"
            >
              <span>{t.login}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* OR separator */}
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink mx-4 text-xs font-bold text-gray-400 uppercase">{t.or}</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => onLoginSuccess({
                name: "Google Farmer",
                email: "google.farmer@farmmate.org",
                role: "Local Steward",
                district: "Central District",
                avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
              })}
              className="flex items-center justify-center gap-2 py-2.5 px-3 bg-[#fcfdfa] border border-[#d8e5c4] rounded-xl text-xs font-semibold text-gray-700 hover:bg-[#f0f5e8] transition-colors"
            >
              <span className="text-sm">🌐</span>
              <span>{t.google}</span>
            </button>

            <button
              onClick={() => onLoginSuccess({
                name: "Microsoft Supervisor",
                email: "ms.supervisor@farmmate.org",
                role: "Regional Supervisor",
                district: "North District",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
              })}
              className="flex items-center justify-center gap-2 py-2.5 px-3 bg-[#fcfdfa] border border-[#d8e5c4] rounded-xl text-xs font-semibold text-gray-700 hover:bg-[#f0f5e8] transition-colors"
            >
              <span className="text-sm">🪟</span>
              <span>{t.microsoft}</span>
            </button>
          </div>

          <div className="text-center pt-2 text-xs">
            <span className="text-gray-500">{t.newToFarmMate}</span>{' '}
            <button
              onClick={() => onNavigate('register')}
              className="text-[#14532d] font-bold hover:underline"
            >
              {t.createAccount}
            </button>
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 pt-8">
        {t.copyright}
      </div>
    </div>
  );
};
