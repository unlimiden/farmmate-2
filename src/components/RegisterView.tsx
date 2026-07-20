import React, { useState } from 'react';
import { ViewMode, Language, UserProfile } from '../types';
import { translations } from '../data/translations';
import { Lock, Mail, User, Phone, Eye, EyeOff, ShieldCheck, Cpu, ArrowRight } from 'lucide-react';
import { getApiUrl } from '../lib/api';

interface RegisterViewProps {
  onNavigate: (view: ViewMode) => void;
  language: Language;
  onRegisterSuccess: (user: UserProfile) => void;
}

export const RegisterView: React.FC<RegisterViewProps> = ({
  onNavigate,
  language,
  onRegisterSuccess,
}) => {
  const t = translations[language];
  const [fullName, setFullName] = useState('Johnathan Appleseed');
  const [email, setEmail] = useState('newfarmer@example.com');
  const [phone, setPhone] = useState('+254 700 111 222');
  const [password, setPassword] = useState('Test@1234');
  const [confirmPassword, setConfirmPassword] = useState('Test@1234');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('Farmer');
  const [county, setCounty] = useState('Kiambu');
  const [primaryCropsGrown, setPrimaryCropsGrown] = useState('Maize, Beans');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError(language === 'sw' ? 'Nenosiri hailingani.' : 'Passwords do not match.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(getApiUrl('/api/auth/register'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: fullName,
          email,
          phone,
          role,
          county,
          preferred_language: language === 'sw' ? 'Kiswahili' : 'English',
          primary_crops_grown: primaryCropsGrown,
          password
        })
      });
      const data = await response.json();
      if (response.ok && data.success) {
        const mappedUser: UserProfile = {
          ...data.user,
          name: data.user.full_name,
          district: `${data.user.county} County`
        };
        onRegisterSuccess(mappedUser);
      } else {
        setError(data.message || (language === 'sw' ? 'Sajili imeshindikana.' : 'Registration failed. Please try again.'));
      }
    } catch (err) {
      setError(language === 'sw' ? 'Hitilafu ya mtandao.' : 'Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-[#f8fbef] min-h-screen flex flex-col justify-between py-12 px-4 font-sans">
      <div className="max-w-xl w-full mx-auto space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight text-[#14532d]">
            {t.brandName}
          </h1>
          <p className="text-xs text-gray-600 font-medium">
            Empowering the future of agriculture.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white border border-[#e2ebd4] rounded-3xl p-8 sm:p-10 shadow-xl space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-extrabold text-gray-900">{t.createAccount}</h2>
            <p className="text-xs text-gray-500 font-medium">{t.joinNetwork}</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                {t.fullName}
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Johnathan Appleseed"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#fcfdfa] border border-[#d8e5c4] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#14532d]"
                />
              </div>
            </div>

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
                {t.phoneNumber}
              </label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+254 700 111 222"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#fcfdfa] border border-[#d8e5c4] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#14532d]"
                />
              </div>
            </div>

            {error && (
              <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-xl leading-relaxed">
                {error}
              </div>
            )}

            {/* Custom Database Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  {language === 'sw' ? 'Jukumu' : 'Role'}
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#fcfdfa] border border-[#d8e5c4] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#14532d]"
                >
                  <option value="Farmer">{language === 'sw' ? 'Mkulima' : 'Farmer'}</option>
                  <option value="Agricultural Officer">{language === 'sw' ? 'Afisa wa Kilimo' : 'Agricultural Officer'}</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  {language === 'sw' ? 'Kaunti' : 'County'}
                </label>
                <select
                  value={county}
                  onChange={(e) => setCounty(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#fcfdfa] border border-[#d8e5c4] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#14532d]"
                >
                  <option value="Kiambu">Kiambu</option>
                  <option value="Nyandarua">Nyandarua</option>
                  <option value="Kilifi">Kilifi</option>
                  <option value="Murang'a">Murang'a</option>
                  <option value="Kisumu">Kisumu</option>
                  <option value="Uasin Gishu">Uasin Gishu</option>
                  <option value="Nakuru">Nakuru</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                {language === 'sw' ? 'Mazao Makuu Unayokuza' : 'Primary Crops Grown'}
              </label>
              <input
                type="text"
                required
                value={primaryCropsGrown}
                onChange={(e) => setPrimaryCropsGrown(e.target.value)}
                placeholder="e.g. Maize, Beans, Potato"
                className="w-full px-4 py-2.5 bg-[#fcfdfa] border border-[#d8e5c4] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#14532d]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  {t.confirmPassword}
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2.5 bg-[#fcfdfa] border border-[#d8e5c4] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#14532d]"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#14532d] text-white rounded-xl text-sm font-semibold hover:bg-[#0f4023] shadow-md transition-all mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>{loading ? (language === 'sw' ? 'Inasajili...' : 'Registering...') : t.registerAccount}</span>
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          <div className="text-center pt-2 text-xs">
            <span className="text-gray-500">{t.alreadyHaveAccount}</span>{' '}
            <button
              onClick={() => onNavigate('login')}
              className="text-[#14532d] font-bold hover:underline"
            >
              {t.loginHere}
            </button>
          </div>

          {/* Enterprise badges matching screenshot */}
          <div className="pt-4 border-t border-gray-100 flex items-center justify-center gap-6 text-[10px] font-bold tracking-wider text-gray-500 uppercase">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#14532d]" />
              {t.enterpriseSecure}
            </span>
            <span className="flex items-center gap-1">
              <Cpu className="w-3.5 h-3.5 text-[#14532d]" />
              {t.aiSynced}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-xl mx-auto w-full pt-8 flex items-center justify-between text-xs text-gray-500 border-t border-[#e2ebd4]">
        <p>{t.copyright}</p>
        <div className="flex gap-4">
          <button onClick={() => onNavigate('contact')} className="hover:underline">{t.privacyPolicy}</button>
          <button onClick={() => onNavigate('contact')} className="hover:underline">{t.helpCenter}</button>
          <button onClick={() => onNavigate('contact')} className="hover:underline">{t.terms}</button>
        </div>
      </div>
    </div>
  );
};
