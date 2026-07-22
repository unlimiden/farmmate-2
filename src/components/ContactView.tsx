import React, { useState, useEffect } from 'react';
import { ViewMode, Language, UserProfile } from '../types';
import { translations } from '../data/translations';
import { Mail, Phone, MapPin, Send, CheckCircle2, UserCheck, Star, Building } from 'lucide-react';
import { getApiUrl } from '../lib/api';

interface ContactViewProps {
  onNavigate: (view: ViewMode) => void;
  language: Language;
  currentUser?: UserProfile | null;
}

export const ContactView: React.FC<ContactViewProps> = ({ language, currentUser }) => {
  const t = translations[language];
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [officers, setOfficers] = useState<any[]>([]);
  const [selectedCounty, setSelectedCounty] = useState<string>('All');
  const [counties, setCounties] = useState<string[]>([]);
  const [loadingOfficers, setLoadingOfficers] = useState(true);

  // Sync selected county to user's county on mount if they are logged in
  useEffect(() => {
    if (currentUser && currentUser.county) {
      setSelectedCounty(currentUser.county);
    } else {
      setSelectedCounty('All');
    }
  }, [currentUser]);

  // Fetch Officers
  useEffect(() => {
    setLoadingOfficers(true);
    const endpoint = selectedCounty === 'All' ? '/api/officers' : `/api/officers/county/${selectedCounty}`;
    fetch(getApiUrl(endpoint))
      .then(res => res.json())
      .then(data => {
        if (data.success && data.officers) {
          setOfficers(data.officers);
          
          // Seed counties array from list if All is selected
          if (selectedCounty === 'All') {
            const uniqueCounties: string[] = Array.from(new Set(data.officers.map((o: any) => o.county)));
            setCounties(uniqueCounties);
          }
        }
      })
      .catch(err => console.error("Error fetching officers list:", err))
      .finally(() => setLoadingOfficers(false));
  }, [selectedCounty]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="w-full bg-[#f8fbef] min-h-screen px-4 sm:px-6 lg:px-8 py-6 sm:py-12 font-sans max-w-7xl mx-auto space-y-8 sm:space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2 sm:space-y-3">
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
          {language === 'sw' ? 'Wasiliana Nasi' : t.contactUs}
        </h1>
        <p className="text-gray-600 text-xs sm:text-base leading-relaxed">
          {language === 'sw' ? 'Tupo hapa kukusaidia na masuala yote ya kilimo.' : t.getInTouch}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Contact Information Cards */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white border border-[#e2ebd4] rounded-2xl p-5 sm:p-6 shadow-2xs space-y-5 sm:space-y-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900">
              {language === 'sw' ? 'Vituo vya Msaada' : 'Regional Support Centers'}
            </h3>
            
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#c5e6ad] text-[#14532d] flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-xs sm:text-sm">
                  {language === 'sw' ? 'Ofisi Kuu' : 'Headquarters'}
                </h4>
                <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                  AgriTech Innovation Center, Valley Road, Block 4<br />
                  Nairobi & Northern Agricultural District
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#c5e6ad] text-[#14532d] flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-xs sm:text-sm">
                  {language === 'sw' ? 'Msaada kwa Barua Pepe' : 'Email Assistance'}
                </h4>
                <p className="text-xs text-gray-600 mt-0.5">
                  support@farmmate.org<br />
                  diagnostics@farmmate.org
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#c5e6ad] text-[#14532d] flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-xs sm:text-sm">
                  {language === 'sw' ? 'Nambari ya Simu' : 'Helpline'}
                </h4>
                <p className="text-xs text-gray-600 mt-0.5">
                  +254 700 000 001<br />
                  {language === 'sw' ? 'Jumatatu - Jumamosi: Saa 1 asubuhi - Saa 1 jioni EAT' : 'Mon - Sat: 7:00 AM - 7:00 PM EAT'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white border border-[#e2ebd4] rounded-2xl p-5 sm:p-8 shadow-2xs">
          {formSubmitted ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-[#14532d] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                {language === 'sw' ? 'Ujumbe Umepokelewa' : 'Message Received'}
              </h3>
              <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
                {t.messageSentSuccess}
              </p>
              <button
                onClick={() => {
                  setFormSubmitted(false);
                  setFormData({ name: '', email: '', subject: '', message: '' });
                }}
                className="mt-4 px-6 py-2.5 bg-[#14532d] text-white rounded-lg text-sm font-semibold hover:bg-[#0f4023] transition-colors"
              >
                {language === 'sw' ? 'Tuma Ujumbe Mwingine' : 'Send Another Message'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900 pb-2 border-b border-gray-100">
                {language === 'sw' ? 'Tuma Ujumbe Kwetu' : 'Send us a Message'}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    {t.fullName}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Mwema"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#14532d]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    {t.emailAddress}
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="farmer@example.com"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#14532d]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  {t.subject}
                </label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder={language === 'sw' ? 'Mfano: Msaada wa matibabu ya choma ya nyanya...' : 'Inquiry regarding tomato blight treatment...'}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#14532d]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  {t.yourMessage}
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={language === 'sw' ? 'Eleza swali lako hapa...' : 'Describe your question or technical issue...'}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#14532d]"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-[#14532d] text-white rounded-xl text-sm font-semibold hover:bg-[#0f4023] shadow-md transition-colors"
              >
                <span>{language === 'sw' ? 'Tuma Ujumbe' : t.sendMessage}</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Database Integrated Agricultural Officers Directory */}
      <div className="bg-white border border-[#e2ebd4] rounded-3xl p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <UserCheck className="w-6 h-6 text-[#14532d]" />
              {language === 'sw' ? 'Maimla ya Maafisa wa Kilimo' : 'Agricultural Extension Officers'}
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              {language === 'sw' ? 'Maafisa waliothibitishwa katika eneo lako kutoa usaidizi wa kitaalam' : 'Verified experts assigned to provide regional pathological guidance'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              {language === 'sw' ? 'Chagua Kaunti:' : 'Filter County:'}
            </span>
            <select
              value={selectedCounty}
              onChange={(e) => setSelectedCounty(e.target.value)}
              className="px-3 py-1.5 bg-[#fcfdfa] border border-[#d8e5c4] rounded-xl text-xs font-semibold text-[#14532d] focus:outline-none focus:ring-2 focus:ring-[#14532d]"
            >
              <option value="All">{language === 'sw' ? 'Kaunti Zote' : 'All Counties'}</option>
              <option value="Kiambu">Kiambu</option>
              <option value="Nakuru">Nakuru</option>
              <option value="Nyandarua">Nyandarua</option>
              <option value="Uasin Gishu">Uasin Gishu</option>
              <option value="Kisumu">Kisumu</option>
              <option value="Machakos">Machakos</option>
              <option value="Nyeri">Nyeri</option>
              <option value="Kakamega">Kakamega</option>
              <option value="Kericho">Kericho</option>
            </select>
          </div>
        </div>

        {loadingOfficers ? (
          <div className="flex items-center justify-center py-12 gap-2 text-sm text-gray-500">
            <Loader2 className="w-5 h-5 animate-spin text-[#14532d]" />
            <span>{language === 'sw' ? 'Inapakia maafisa...' : 'Loading officers directory...'}</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {officers.map((officer) => (
              <div 
                key={officer.officer_id}
                className="bg-[#fdfefb] border border-[#eaf2e0] rounded-2xl p-5 hover:border-[#14532d] hover:shadow-md transition-all space-y-4 relative"
              >
                {/* County indicator badge */}
                <span className="absolute top-4 right-4 bg-[#eaf2e0] text-[#14532d] px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                  {officer.county}
                </span>

                <div className="space-y-1">
                  <h4 className="font-bold text-gray-900 text-base">{officer.officer_name}</h4>
                  <p className="text-xs text-[#14532d] font-semibold flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    {officer.specialization}
                  </p>
                </div>

                <div className="text-xs text-gray-600 space-y-2 pt-2 border-t border-gray-100">
                  <p className="flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-gray-400" />
                    <span className="font-medium text-gray-700">{officer.organization}</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-gray-400" />
                    <span>{officer.email}</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-gray-400" />
                    <span className="font-mono">{officer.phone}</span>
                  </p>
                </div>

                <div className="pt-3 flex items-center justify-between text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                  <span>{language === 'sw' ? 'Uzoefu' : 'Experience'}</span>
                  <span className="text-gray-700">{officer.years_experience} {language === 'sw' ? 'Miaka' : 'Years'}</span>
                </div>
              </div>
            ))}

            {officers.length === 0 && (
              <div className="col-span-full text-center py-12 border-2 border-dashed border-gray-200 rounded-2xl">
                <p className="text-sm text-gray-500 font-medium">
                  {language === 'sw' ? 'Hakuna maafisa waliopatikana katika kaunti hii.' : 'No officers listed for this county yet.'}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Simple loader helper icon
const Loader2: React.FC<any> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);
