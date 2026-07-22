import React, { useState, useEffect, useRef } from 'react';
import { ViewMode, Language, UserProfile } from '../types';
import { translations } from '../data/translations';
import { 
  Send, 
  Bot, 
  User as UserIcon, 
  Sparkles, 
  Sprout, 
  ShieldAlert, 
  Info,
  ArrowRight,
  MessageSquare,
  RefreshCw,
  HelpCircle,
  TrendingUp,
  MapPin,
  ClipboardList,
  ChevronRight
} from 'lucide-react';
import { fetchWithAuth } from '../lib/api';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatbotViewProps {
  language: Language;
  onNavigate: (view: ViewMode) => void;
  user: UserProfile | null;
}

export const ChatbotView: React.FC<ChatbotViewProps> = ({ language, onNavigate, user }) => {
  const t = translations[language];
  const isSw = language === 'sw';

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: isSw 
        ? `Habari! Mimi ni Msaidizi wako wa FarmMate AI. Ninajua kuhusu eneo lako, mazao unayokuza, na historia yako ya uchunguzi.\n\nUna swali gani leo kuhusu mimea au kilimo chako? Unaweza pia kubofya mojawapo ya maswali ya haraka hapa chini!`
        : `Hello! I am your personalized FarmMate AI Assistant. I have loaded your regional context, crops, and diagnostic history to give you tailored agricultural support.\n\nWhat would you like to ask about your crops or land health today? You can also click any of the quick suggestions below!`,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [historyCount, setHistoryCount] = useState<number>(0);
  const [showContextMobile, setShowContextMobile] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever messages list changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Fetch some metrics for personalization panel
  useEffect(() => {
    const fetchHistoryDetails = async () => {
      try {
        const res = await fetchWithAuth('/api/history/me');
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.history) {
            setHistoryCount(data.history.length);
          }
        }
      } catch (e) {
        console.error("Failed to load user diagnostics count:", e);
      }
    };
    fetchHistoryDetails();
  }, []);

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    if (!textToSend) {
      setInput('');
    }

    const newUserMsg: Message = {
      id: `msg-${Date.now()}-user`,
      role: 'user',
      content: query,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMsg]);
    setLoading(true);

    // Create assistant message placeholder for real-time streaming
    const botMsgId = `msg-${Date.now()}-bot`;
    const initialBotMsg: Message = {
      id: botMsgId,
      role: 'assistant',
      content: '',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, initialBotMsg]);

    try {
      // Build full conversation history for the endpoint
      const conversationalHistory = [...messages, newUserMsg].map(m => ({
        role: m.role,
        content: m.content
      }));

      const response = await fetchWithAuth('/api/chat/stream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'text/event-stream'
        },
        body: JSON.stringify({
          messages: conversationalHistory
        })
      });

      const contentType = response.headers.get('content-type') || '';

      if (contentType.includes('text/event-stream') && response.body) {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let accumulatedText = '';
        let done = false;
        let buffer = '';

        while (!done) {
          const { value, done: doneReading } = await reader.read();
          done = doneReading;
          if (value) {
            buffer += decoder.decode(value, { stream: !done });
            const lines = buffer.split('\n\n');
            buffer = lines.pop() || '';

            for (const line of lines) {
              const trimmed = line.trim();
              if (trimmed.startsWith('data: ')) {
                const jsonStr = trimmed.slice(6);
                if (jsonStr === '[DONE]') break;
                try {
                  const parsed = JSON.parse(jsonStr);
                  if (parsed.text) {
                    accumulatedText += parsed.text;
                    setMessages(prev => prev.map(m => m.id === botMsgId ? { ...m, content: accumulatedText } : m));
                  }
                } catch (e) {
                  accumulatedText += jsonStr;
                  setMessages(prev => prev.map(m => m.id === botMsgId ? { ...m, content: accumulatedText } : m));
                }
              }
            }
          }
        }
      } else {
        // Fallback standard JSON response
        const data = await response.json();
        if (response.ok && data.success) {
          const fullText = data.text || '';
          // Stream text smoothly onto screen
          let currentText = '';
          const words = fullText.split(' ');
          for (let i = 0; i < words.length; i++) {
            currentText += (i === 0 ? '' : ' ') + words[i];
            setMessages(prev => prev.map(m => m.id === botMsgId ? { ...m, content: currentText } : m));
            await new Promise(r => setTimeout(r, 15));
          }
        } else {
          throw new Error(data.message || 'Error from chatbot service');
        }
      }
    } catch (err: any) {
      console.error("Chat error:", err);
      setMessages(prev => prev.map(m => m.id === botMsgId ? {
        ...m,
        content: isSw 
          ? `Pole, nilipata hitilafu wakati wa kuwasiliana na mfumo wa AI. Tafadhali hakikisha ufunguo wa Gemini API umewekwa au jaribu tena baada ya muda mfupi.` 
          : `I am sorry, but I encountered an error connecting to the AI system. Please verify that your Gemini API key is configured correctly or try again in a few moments.`
      } : m));
    } finally {
      setLoading(false);
    }
  };

  const handleQuickQuestion = (q: string) => {
    handleSend(q);
  };

  const clearChat = () => {
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content: isSw 
          ? `Habari! Mimi ni Msaidizi wako wa FarmMate AI. Ninajua kuhusu eneo lako, mazao unayokuza, na historia yako ya uchunguzi.\n\nUna swali gani leo kuhusu mimea au kilimo chako? Unaweza pia kubofya mojawapo ya maswali ya haraka hapa chini!`
          : `Hello! I am your personalized FarmMate AI Assistant. I have loaded your regional context, crops, and diagnostic history to give you tailored agricultural support.\n\nWhat would you like to ask about your crops or land health today? You can also click any of the quick suggestions below!`,
        timestamp: new Date()
      }
    ]);
  };

  // Safe markdown text line renderer
  const renderMessageContent = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      // Remove starting bullet chars for clean bullet display
      let cleanLine = line;
      let isBullet = false;
      if (line.trim().startsWith('- ')) {
        cleanLine = line.trim().substring(2);
        isBullet = true;
      } else if (line.trim().startsWith('* ')) {
        cleanLine = line.trim().substring(2);
        isBullet = true;
      }

      // Format bold text (**text**)
      const parts = cleanLine.split(/\*\*(.*?)\*\*/g);
      const renderedText = parts.map((part, pIdx) => {
        if (pIdx % 2 === 1) {
          return <strong key={pIdx} className="font-extrabold text-emerald-950">{part}</strong>;
        }
        return part;
      });

      // Headers formatting
      if (line.startsWith('### ')) {
        return <h4 key={idx} className="text-xs font-bold text-[#14532d] mt-3 mb-1 uppercase tracking-wider">{line.substring(4)}</h4>;
      }
      if (line.startsWith('## ')) {
        return <h3 key={idx} className="text-sm font-black text-[#14532d] mt-4 mb-1.5 border-b border-gray-100 pb-0.5">{line.substring(3)}</h3>;
      }
      if (line.startsWith('# ')) {
        return <h2 key={idx} className="text-base font-black text-[#14532d] mt-5 mb-2">{line.substring(2)}</h2>;
      }

      if (isBullet) {
        return (
          <div key={idx} className="flex items-start gap-2 ml-3 my-1">
            <span className="text-[#14532d] font-bold mt-1 text-sm">•</span>
            <span className="text-xs text-gray-700 leading-relaxed font-medium">{renderedText}</span>
          </div>
        );
      }

      // Paragraph spacing
      return (
        <p key={idx} className="text-xs text-gray-700 leading-relaxed min-h-[1rem] my-1 font-medium">
          {renderedText}
        </p>
      );
    });
  };

  // Suggestions depending on language
  const quickPrompts = isSw ? [
    "Je, ninawezaje kuzuia Madoa ya Mapema kwenye Viazi vyangu?",
    "Ni dalili gani za kwanza za Kutu ya Mahindi (Maize Rust)?",
    "Nipe mpango mzuri wa mzunguko wa mazao shamba langu.",
    "Swahili advisory juu ya kuzuia kunyauka kwa Nyanya."
  ] : [
    "How can I prevent Late Blight on my Potatoes?",
    "What are the early signs of Maize Rust?",
    "Give me an organic treatment plan for Tomato Early Blight.",
    "Recommend a crop rotation schedule for Maize."
  ];

  const profileUser = user || {
    full_name: isSw ? "Mkulima wa FarmMate" : "FarmMate Farmer",
    role: "Farmer",
    county: "Uasin Gishu",
    primary_crops_grown: "Maize, Potatoes, Beans"
  };

  return (
    <div className="w-full bg-[#f8fbef] min-h-[calc(100vh-4rem)] py-4 sm:py-6 px-3 sm:px-6 lg:px-8 font-sans">
      {/* Mobile Toggle Bar for Context Panel */}
      <div className="lg:hidden mb-3">
        <button
          onClick={() => setShowContextMobile(!showContextMobile)}
          className="w-full p-3 bg-white border border-[#e2ebd4] rounded-2xl flex items-center justify-between text-xs font-bold text-[#14532d] shadow-2xs"
        >
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#14532d]" />
            <span>{isSw ? 'Taarifa za Eneo Lako & Mazao' : 'View AI Grounding Context'}</span>
          </div>
          <ChevronRight className={`w-4 h-4 transition-transform ${showContextMobile ? 'rotate-90' : ''}`} />
        </button>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side: Personalization Advisory Board */}
        <div className={`lg:col-span-4 space-y-6 ${showContextMobile ? 'block' : 'hidden lg:block'}`}>
          <div className="bg-white border border-[#e2ebd4] rounded-3xl p-4 sm:p-5 shadow-xs space-y-4 sm:space-y-5">
            <div className="flex items-center gap-2 border-b border-[#f4f7ee] pb-3">
              <Sparkles className="w-5 h-5 text-[#14532d]" />
              <div>
                <h2 className="text-base font-black text-gray-900 tracking-tight">
                  {isSw ? 'Usimamizi wa AI' : 'AI Context Grounding'}
                </h2>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                  {isSw ? 'Rekodi Zilizounganishwa' : 'Active Personalized Profile'}
                </p>
              </div>
            </div>

            {/* Profile Context */}
            <div className="space-y-4">
              
              {/* User Bio */}
              <div className="flex items-start gap-3 p-3 bg-[#fcfdfa] border border-[#e2ebd4]/80 rounded-2xl">
                <div className="w-10 h-10 bg-[#eaf2e0] border border-[#d2e2bd] rounded-full flex items-center justify-center text-sm font-bold text-[#14532d] shrink-0">
                  {profileUser.full_name.charAt(0).toUpperCase()}
                </div>
                <div className="space-y-1 min-w-0">
                  <p className="text-xs font-black text-gray-800 truncate">{profileUser.full_name}</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">{profileUser.role}</p>
                </div>
              </div>

              {/* Geographic Region Grounding */}
              <div className="p-3 bg-white border border-gray-100 rounded-2xl space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#14532d]">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{isSw ? 'Eneo la Kilimo' : 'Geographic District'}</span>
                </div>
                <p className="text-xs text-gray-600 pl-5 font-semibold">
                  {profileUser.county} {isSw ? 'Kaunti' : 'County'}, Kenya
                </p>
                <p className="text-[10px] text-gray-400 pl-5 font-medium italic leading-relaxed">
                  {isSw 
                    ? `AI inajumuisha ushauri maalum kwa udongo na hewa ya ${profileUser.county}.`
                    : `AI tailors advisory based on localized soil and weather patterns of ${profileUser.county}.`
                  }
                </p>
              </div>

              {/* Primary Crops grown */}
              <div className="p-3 bg-white border border-gray-100 rounded-2xl space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#14532d]">
                  <Sprout className="w-3.5 h-3.5" />
                  <span>{isSw ? 'Mazao Yako Makuu' : 'Crops Grown'}</span>
                </div>
                <p className="text-xs text-gray-600 pl-5 font-semibold">
                  {profileUser.primary_crops_grown || "Maize, Potatoes, Beans"}
                </p>
              </div>

              {/* Diagnostic History Count */}
              <div className="p-3 bg-white border border-gray-100 rounded-2xl space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#14532d]">
                  <ClipboardList className="w-3.5 h-3.5" />
                  <span>{isSw ? 'Historia ya Uchunguzi' : 'Scan Registry'}</span>
                </div>
                <div className="flex items-center justify-between pl-5">
                  <span className="text-xs font-semibold text-gray-600">
                    {isSw ? 'Rekodi zilizohifadhiwa:' : 'Saved diagnostics:'}
                  </span>
                  <span className="text-xs font-bold bg-[#eaf2e0] text-[#14532d] px-2.5 py-0.5 rounded-full border border-[#d2e2bd]">
                    {historyCount} {isSw ? 'Picha' : 'Scans'}
                  </span>
                </div>
                <p className="text-[10px] text-gray-400 pl-5 font-medium italic leading-relaxed">
                  {isSw 
                    ? 'AI inaweza kurejelea matokeo ya vipimo vyako vya awali kusaidia sasa.' 
                    : 'AI analyzes your past crop diagnoses to contextualize new concerns.'
                  }
                </p>
              </div>

            </div>

            {/* Quick Actions / Navigation */}
            <div className="pt-3 border-t border-[#f4f7ee] flex flex-col gap-2">
              <button
                onClick={() => onNavigate('symptoms')}
                className="w-full p-2.5 bg-gray-50 hover:bg-[#eaf2e0] text-[#14532d] rounded-xl text-xs font-bold border border-gray-100 hover:border-[#d2e2bd] transition-all flex items-center justify-between group"
              >
                <span>{isSw ? 'Fungua Mwongozo wa Dalili' : 'Browse Symptoms database'}</span>
                <ChevronRight className="w-4 h-4 text-[#14532d] group-hover:translate-x-0.5 transition-transform" />
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="w-full p-2.5 bg-gray-50 hover:bg-[#eaf2e0] text-[#14532d] rounded-xl text-xs font-bold border border-gray-100 hover:border-[#d2e2bd] transition-all flex items-center justify-between group"
              >
                <span>{isSw ? 'Ongea na Afisa Kilimo' : 'Contact Extension Officer'}</span>
                <ChevronRight className="w-4 h-4 text-[#14532d] group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

          </div>
        </div>

        {/* Right Side: Conversation Area */}
        <div className="lg:col-span-8 flex flex-col h-[550px] sm:h-[620px] lg:h-[calc(100vh-8rem)] bg-white border border-[#e2ebd4] rounded-3xl overflow-hidden shadow-xs">
          
          {/* Chat Header */}
          <div className="p-3.5 sm:p-4 bg-[#fcfdfa] border-b border-[#e2ebd4] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#14532d] rounded-2xl flex items-center justify-center text-white shadow-2xs">
                <Bot className="w-5 h-5 sm:w-5.5 sm:h-5.5 animate-pulse" />
              </div>
              <div>
                <h1 className="text-xs sm:text-sm font-black text-gray-900 tracking-tight">FarmMate AI Advisory</h1>
                <p className="text-[9px] sm:text-[10px] text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-ping"></span>
                  {isSw ? 'Msaidizi Maalum Amekamilika' : 'Personalized Assistant Active'}
                </p>
              </div>
            </div>

            <button
              onClick={clearChat}
              className="px-2.5 py-1.5 border border-gray-100 hover:border-red-200 text-gray-500 hover:text-red-700 bg-white rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isSw ? 'Anzisha Upya' : 'Restart Chat'}</span>
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-5 space-y-3 sm:space-y-4 bg-[#fafdf6]">
            {messages.map((m) => {
              const isBot = m.role === 'assistant';
              return (
                <div
                  key={m.id}
                  className={`flex gap-2.5 sm:gap-3 max-w-4xl ${isBot ? 'mr-4 sm:mr-12' : 'ml-auto mr-0 flex-row-reverse pl-4 sm:pl-12'}`}
                >
                  <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center text-xs sm:text-sm font-bold shrink-0 shadow-2xs ${
                    isBot ? 'bg-[#14532d] text-white' : 'bg-[#eaf2e0] border border-[#d2e2bd] text-[#14532d]'
                  }`}>
                    {isBot ? <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <UserIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                  </div>

                  <div className={`p-3 sm:p-4 rounded-2xl shadow-2xs space-y-1 ${
                    isBot 
                      ? 'bg-white border border-[#e2ebd4] text-gray-800 rounded-tl-xs' 
                      : 'bg-[#14532d] text-white rounded-tr-xs'
                  }`}>
                    {isBot ? (
                      <div>{renderMessageContent(m.content)}</div>
                    ) : (
                      <p className="text-xs font-semibold leading-relaxed">{m.content}</p>
                    )}
                    <span className={`text-[8px] font-bold block text-right mt-1.5 ${isBot ? 'text-gray-400' : 'text-emerald-200/80'}`}>
                      {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* AI Typing Loader Indicator */}
            {loading && (
              <div className="flex gap-2.5 mr-4 sm:mr-12 max-w-lg">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-[#14532d] text-white flex items-center justify-center shrink-0">
                  <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-bounce" />
                </div>
                <div className="p-3 sm:p-4 bg-white border border-[#e2ebd4] rounded-2xl rounded-tl-xs shadow-2xs">
                  <div className="flex items-center gap-1 py-1 px-1.5">
                    <span className="w-2 h-2 bg-[#14532d] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 bg-[#14532d] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 bg-[#14532d] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick templates & input section */}
          <div className="p-4 bg-[#fcfdfa] border-t border-[#e2ebd4] space-y-4 shrink-0">
            
            {/* Quick Prompts Carousel */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                {isSw ? 'Mifano ya Maswali (Bonyeza kuuliza AI hapa)' : 'Suggested Questions (Click to Ask instant)'}
              </span>
              <div className="flex gap-2 overflow-x-auto pb-1 max-w-full no-scrollbar">
                {quickPrompts.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleQuickQuestion(q)}
                    disabled={loading}
                    className="whitespace-nowrap px-3 py-1.5 bg-white hover:bg-[#eaf2e0]/60 border border-gray-100 hover:border-[#14532d]/40 rounded-full text-[11px] font-bold text-[#14532d] transition-all shrink-0 cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Form Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isSw ? 'Uliza lolote kuhusu mahindi, viazi au shamba lako...' : 'Ask anything about potato diseases, crop hygiene, maize streak...'}
                className="flex-1 px-4 py-3 bg-white border border-[#d8e5c4] rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#14532d]"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="p-3 bg-[#14532d] hover:bg-[#0f4023] disabled:bg-gray-200 text-white disabled:text-gray-400 rounded-xl transition-all shadow-xs shrink-0 cursor-pointer"
              >
                <Send className="w-4.5 h-4.5" />
              </button>
            </form>

          </div>

        </div>

      </div>
    </div>
  );
};
