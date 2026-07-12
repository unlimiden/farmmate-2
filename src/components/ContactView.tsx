import React, { useState } from 'react';
import { ViewMode, Language } from '../types';
import { translations } from '../data/translations';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

interface ContactViewProps {
  onNavigate: (view: ViewMode) => void;
  language: Language;
}

export const ContactView: React.FC<ContactViewProps> = ({ language }) => {
  const t = translations[language];
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="w-full bg-[#f8fbef] min-h-screen px-4 lg:px-8 py-12 font-sans max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">{t.contactUs}</h1>
        <p className="text-gray-600 text-base leading-relaxed">
          {t.getInTouch}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Information Cards */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white border border-[#e2ebd4] rounded-2xl p-6 shadow-xs space-y-6">
            <h3 className="text-xl font-bold text-gray-900">Regional Support Centers</h3>
            
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#c5e6ad] text-[#14532d] flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm">Headquarters</h4>
                <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                  AgriTech Innovation Center, Valley Road, Block 4<br />
                  Nairobi & Northern Agricultural District
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#c5e6ad] text-[#14532d] flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm">Email Assistance</h4>
                <p className="text-xs text-gray-600 mt-0.5">
                  support@farmmate.org<br />
                  diagnostics@farmmate.org
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#c5e6ad] text-[#14532d] flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm">Helpline</h4>
                <p className="text-xs text-gray-600 mt-0.5">
                  +1 (800) 555-FARM<br />
                  Mon - Sat: 7:00 AM - 7:00 PM EAT
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white border border-[#e2ebd4] rounded-2xl p-8 shadow-xs">
          {formSubmitted ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-[#14532d] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Message Received</h3>
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
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900 pb-2 border-b border-gray-100">
                Send us a Message
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
                    placeholder="Johnathan Appleseed"
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
                  placeholder="Inquiry regarding tomato blight treatment..."
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
                  placeholder="Describe your question or technical issue..."
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#14532d]"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-[#14532d] text-white rounded-xl text-sm font-semibold hover:bg-[#0f4023] shadow-md transition-colors"
              >
                <span>{t.sendMessage}</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
