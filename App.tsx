
import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Map, 
  MessageSquare, 
  BookOpen, 
  Settings, 
  Bell, 
  User, 
  Menu, 
  X, 
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Zap,
  Globe,
  Calendar,
  Send,
  Upload,
  CreditCard,
  FileSearch,
  Lock,
  Star,
  CheckCircle,
  FileText,
  MapPin,
  Layers,
  Sparkles
} from 'lucide-react';
import { AppSection, ZoningControl } from './types';
import SearchInterface from './components/SearchInterface';
import PlanningDashboard from './components/PlanningDashboard';
import KnowledgeBase from './components/KnowledgeBase';
import { getPlanningAdvice, analyzeDocument } from './services/geminiService';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<AppSection>(AppSection.HOME);
  const [selectedZoning, setSelectedZoning] = useState<ZoningControl | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isConsultModalOpen, setIsConsultModalOpen] = useState(false);
  const [isDeepAiModalOpen, setIsDeepAiModalOpen] = useState(false);
  
  // Premium States
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [analysisStep, setAnalysisStep] = useState<'payment' | 'upload' | 'analyzing' | 'result'>('payment');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [analysisQuery, setAnalysisQuery] = useState('');
  const [deepAiResult, setDeepAiResult] = useState<string>('');
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success'>('idle');
  const [isFollowUpLoading, setIsFollowUpLoading] = useState(false);

  const [aiLoading, setAiLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | undefined>('');
  const [consultFormStatus, setConsultFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAiConsult = async (query: string) => {
    setAiLoading(true);
    const advice = await getPlanningAdvice(query);
    setAiResponse(advice);
    setAiLoading(false);
  };

  const handleDeepAiAnalysis = async (queryOverride?: string) => {
    const finalQuery = queryOverride || analysisQuery;
    if (!uploadedFile || !finalQuery) return;
    
    if (analysisStep === 'result') {
      setIsFollowUpLoading(true);
    } else {
      setAnalysisStep('analyzing');
    }
    
    // Simulate reading file content
    const mockFileContent = `Document Analysis for ${uploadedFile.name}: Scheme clauses for South Coast region regarding building lines and FAR relaxations. Full text: Regulations on development and spatial planning for coastal zones.`;
    const result = await analyzeDocument(mockFileContent, finalQuery);
    
    if (analysisStep === 'result') {
      setDeepAiResult(prev => prev + "\n\n---\n\n**Follow-up Response:**\n" + result);
      setIsFollowUpLoading(false);
    } else {
      setDeepAiResult(result);
      setAnalysisStep('result');
    }
  };

  const processMockPayment = () => {
    setPaymentStatus('processing');
    setTimeout(() => {
      setPaymentStatus('success');
      setTimeout(() => {
        setIsSubscribed(true);
        setAnalysisStep('upload');
      }, 1500);
    }, 2000);
  };

  const handleConsultSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConsultFormStatus('submitting');
    console.log("Routing consultation request to: lwazikhwela@outlook.com");
    setTimeout(() => {
      setConsultFormStatus('success');
      setTimeout(() => {
        setIsConsultModalOpen(false);
        setConsultFormStatus('idle');
      }, 3500);
    }, 1500);
  };

  const NavItem: React.FC<{ section: AppSection, icon: React.ReactNode, label: string }> = ({ section, icon, label }) => (
    <button
      onClick={() => {
        setActiveSection(section);
        setMobileMenuOpen(false);
        setSelectedZoning(null);
      }}
      className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all ${
        activeSection === section 
        ? 'bg-blue-50 text-blue-600 font-medium' 
        : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      {icon}
      <span className="font-google text-sm">{label}</span>
    </button>
  );

  const BackButton = () => (
    <button 
      onClick={() => setActiveSection(AppSection.HOME)}
      className="flex items-center space-x-2 px-6 py-2.5 bg-blue-600 text-white rounded-full font-google font-bold shadow-lg hover:bg-blue-700 transition-all active:scale-95 mb-6 animate-in slide-in-from-left duration-300"
    >
      <ArrowLeft size={18} />
      <span>Back</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50/50 text-gray-900">
      {/* Deep AI Analysis Modal */}
      {isDeepAiModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={() => setIsDeepAiModalOpen(false)} />
          <div className="relative bg-white w-full max-w-4xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 min-h-[600px] flex flex-col">
            <div className="absolute top-6 right-6 z-10">
              <button onClick={() => setIsDeepAiModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full text-gray-400"><X size={24} /></button>
            </div>

            {/* Header */}
            <div className="bg-silver-gradient p-10 text-gray-800 shrink-0">
               <div className="flex items-center space-x-3 mb-2">
                  <Star className="text-gray-600" fill="currentColor" size={24} />
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-500 tracking-widest">Premium Analysis Engine</span>
               </div>
               <h2 className="text-4xl font-google font-bold mb-2">Deep AI Analysis</h2>
               <p className="text-gray-600 max-w-lg font-medium italic">High-fidelity interpretation of your planning documents.</p>
            </div>

            <div className="p-10 flex-1 overflow-y-auto">
              {analysisStep === 'payment' && !isSubscribed && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                       <h3 className="text-2xl font-google font-bold">Analysis Subscription</h3>
                       <p className="text-gray-500">Analyze up to 5 documents per month with high-fidelity extraction.</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-google font-bold">R200</div>
                      <div className="text-sm text-gray-400">per month</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     {[
                       "Infinite follow-up questions",
                       "By-law Logic Breakdown",
                       "Context-Aware Interpretation",
                       "Regulatory Intersection Mapping"
                     ].map(f => (
                       <div key={f} className="flex items-center space-x-3 text-sm text-gray-600">
                         <CheckCircle size={18} className="text-blue-500" />
                         <span>{f}</span>
                       </div>
                     ))}
                  </div>

                  <div className="pt-6 border-t border-gray-100 space-y-4 text-center">
                    <p className="text-sm text-gray-500">To unlock, please reach out to <strong>lwazikhwela@outlook.com</strong> for bank account details.</p>
                    <button 
                      onClick={processMockPayment}
                      className="w-full py-5 bg-gray-900 text-white rounded-2xl font-bold text-lg hover:bg-blue-600 transition-all flex items-center justify-center space-x-3 shadow-xl active:scale-[0.98]"
                    >
                      {paymentStatus === 'processing' ? (
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : paymentStatus === 'success' ? (
                        <div className="flex items-center space-x-2 text-green-400"><CheckCircle /> <span>Access Granted</span></div>
                      ) : (
                        <><span>Unlock Analysis Mode</span> <ArrowRight size={20} /></>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {analysisStep === 'upload' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                  <div className="text-center space-y-2">
                    <h3 className="text-2xl font-google font-bold">Step 1: Upload Scheme</h3>
                    <p className="text-gray-500">Upload PDF or Text scheme documents to begin.</p>
                  </div>

                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-200 rounded-[2.5rem] p-12 flex flex-col items-center justify-center space-y-4 hover:border-blue-400 hover:bg-blue-50/30 transition-all cursor-pointer group"
                  >
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      className="hidden" 
                      accept=".pdf,.txt,.doc,.docx"
                      onChange={(e) => setUploadedFile(e.target.files?.[0] || null)}
                    />
                    <div className="w-16 h-16 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Upload size={32} />
                    </div>
                    <div className="text-center">
                      <p className="font-google font-bold text-gray-900">{uploadedFile ? uploadedFile.name : "Choose a file or drag here"}</p>
                      <p className="text-xs text-gray-400">PDF, TXT up to 10MB</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                     <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">What should AI look for?</label>
                     <textarea 
                       className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
                       rows={3}
                       placeholder="e.g. Find all clauses related to side-boundary relaxations for multi-unit dwellings..."
                       value={analysisQuery}
                       onChange={(e) => setAnalysisQuery(e.target.value)}
                     />
                  </div>

                  <button 
                    disabled={!uploadedFile || !analysisQuery}
                    onClick={() => handleDeepAiAnalysis()}
                    className="w-full py-5 bg-gray-900 text-white rounded-2xl font-bold text-lg hover:bg-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl active:scale-[0.98]"
                  >
                    Start Analysis
                  </button>
                </div>
              )}

              {analysisStep === 'analyzing' && (
                <div className="py-20 text-center space-y-8 animate-in fade-in zoom-in duration-500">
                  <div className="relative inline-block">
                    <div className="w-24 h-24 border-4 border-gray-100 border-t-blue-600 rounded-full animate-spin mx-auto" />
                    <div className="absolute inset-0 flex items-center justify-center text-blue-600">
                      <FileSearch size={32} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-google font-bold">Analyzing Clauses...</h3>
                    <p className="text-gray-500 italic max-w-sm mx-auto">Cross-referencing regulations and identifying interacting bylaws.</p>
                  </div>
                </div>
              )}

              {analysisStep === 'result' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                  <div className="flex items-center justify-between">
                     <h3 className="text-2xl font-google font-bold flex items-center space-x-2">
                        <FileSearch className="text-blue-500" size={24} />
                        <span>Analysis Result</span>
                     </h3>
                     <button onClick={() => setAnalysisStep('upload')} className="text-gray-400 hover:text-blue-600 font-bold text-sm">New File</button>
                  </div>
                  
                  {/* Results Window */}
                  <div className="p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 max-h-[400px] overflow-y-auto custom-scrollbar">
                     <div className="whitespace-pre-wrap text-gray-700 font-light leading-relaxed prose prose-blue max-w-none">
                       {deepAiResult}
                     </div>
                     {isFollowUpLoading && (
                        <div className="mt-4 flex items-center space-x-2 text-blue-500">
                           <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" />
                           <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce delay-100" />
                           <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce delay-200" />
                           <span className="text-xs font-bold uppercase tracking-wider">Refining analysis...</span>
                        </div>
                     )}
                  </div>

                  {/* Iterative Message Box */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                       <MessageSquare size={14} />
                       <span>Need more clarity? Ask a follow-up</span>
                    </div>
                    <div className="flex space-x-3">
                      <input 
                        type="text" 
                        placeholder="Ask specifically about a clause or regulation..."
                        className="flex-1 px-6 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            const val = (e.target as HTMLInputElement).value;
                            handleDeepAiAnalysis(val);
                            (e.target as HTMLInputElement).value = '';
                          }
                        }}
                      />
                      <button 
                        onClick={(e) => {
                          const input = (e.currentTarget.previousSibling as HTMLInputElement);
                          handleDeepAiAnalysis(input.value);
                          input.value = '';
                        }}
                        className="p-4 bg-gray-900 text-white rounded-2xl hover:bg-blue-600 transition-all shadow-lg"
                      >
                        <Send size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Consultation Modal */}
      {isConsultModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setIsConsultModalOpen(false)} />
          <div className="relative bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="absolute top-6 right-6">
              <button onClick={() => setIsConsultModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><X size={24} className="text-gray-400" /></button>
            </div>
            <div className="p-10 space-y-6">
              <div className="flex items-center space-x-4 mb-2">
                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600"><Calendar size={28} /></div>
                <div>
                  <h2 className="text-2xl font-google font-bold">Request a Consultation</h2>
                  <p className="text-gray-500 text-sm">Direct to: lwazikhwela@outlook.com</p>
                </div>
              </div>

              {consultFormStatus === 'success' ? (
                <div className="py-12 text-center space-y-4 animate-in fade-in zoom-in duration-500">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto"><Send size={40} /></div>
                  <h3 className="text-xl font-google font-bold">Request Sent!</h3>
                  <p className="text-gray-600">Details forwarded to <span className="font-bold text-blue-600">lwazikhwela@outlook.com</span>.</p>
                </div>
              ) : (
                <form onSubmit={handleConsultSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input required type="text" placeholder="Full Name" className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none" />
                    <input required type="email" placeholder="Email" className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>
                  <input required type="text" placeholder="Property Address" className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none" />
                  <select className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer">
                    <option>Building Line Relaxation</option>
                    <option>Special Consent</option>
                    <option>Zoning Review</option>
                    <option>GIS Mapping Services</option>
                    <option>Other</option>
                  </select>
                  <textarea rows={3} placeholder="Tell us about your project..." className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none resize-none"></textarea>
                  <button type="submit" className="w-full py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-blue-600 transition-all shadow-lg active:scale-[0.98] flex items-center justify-center space-x-2">
                    {consultFormStatus === 'submitting' ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><span>Submit Request</span><ArrowRight size={18} /></>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <button onClick={() => setActiveSection(AppSection.HOME)} className="flex items-center space-x-1.5">
              <span className="text-2xl font-google font-bold tracking-tight">
                <span className="google-blue">N</span>
                <span className="google-red">e</span>
                <span className="google-yellow">X</span>
                <span className="google-green">T</span>
                <span className="ml-1 text-gray-700">Plan</span>
              </span>
            </button>
            <nav className="hidden lg:flex items-center space-x-2">
              <NavItem section={AppSection.HOME} icon={<Map size={18} />} label="Overview" />
              <NavItem section={AppSection.SEARCH} icon={<Search size={18} />} label="Intelligence" />
              <NavItem section={AppSection.KNOWLEDGE} icon={<BookOpen size={18} />} label="Knowledge Base" />
              <NavItem section={AppSection.CONSULT} icon={<MessageSquare size={18} />} label="AI Consult" />
            </nav>
          </div>
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setIsDeepAiModalOpen(true)}
              className="hidden xl:flex items-center space-x-2 px-5 py-2 bg-silver-gradient text-gray-800 border border-gray-200 font-google font-bold rounded-full shadow-md hover:shadow-xl hover:scale-105 transition-all"
            >
              <Star size={16} className="text-gray-600" fill="currentColor" />
              <span>Deep AI Analysis</span>
            </button>
            <button onClick={() => setIsConsultModalOpen(true)} className="hidden md:flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white font-google font-bold rounded-full hover:bg-blue-700 shadow-md active:scale-95 transition-all">
              <Calendar size={16} />
              <span>Book Consult</span>
            </button>
            <div className="h-8 w-[1px] bg-gray-200 mx-2 hidden md:block" />
            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full relative"><Bell size={20} /><span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" /></button>
            <button className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg"><User size={20} /></button>
            <button className="lg:hidden p-2 text-gray-600" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>{mobileMenuOpen ? <X /> : <Menu />}</button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-white pt-20 px-4 animate-in slide-in-from-top-10 duration-200">
           <div className="flex flex-col space-y-4">
              <button onClick={() => { setActiveSection(AppSection.HOME); setMobileMenuOpen(false); }} className="p-4 text-left font-google font-bold text-gray-900 border-b border-gray-100">Overview</button>
              <button onClick={() => { setActiveSection(AppSection.SEARCH); setMobileMenuOpen(false); }} className="p-4 text-left font-google font-bold text-gray-900 border-b border-gray-100">Intelligence</button>
              <button onClick={() => { setActiveSection(AppSection.KNOWLEDGE); setMobileMenuOpen(false); }} className="p-4 text-left font-google font-bold text-gray-900 border-b border-gray-100">Knowledge Base</button>
              <button onClick={() => { setIsConsultModalOpen(true); setMobileMenuOpen(false); }} className="p-4 text-left font-google font-bold text-blue-600 border-b border-gray-100">Book Consult</button>
           </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {selectedZoning && activeSection === AppSection.SEARCH ? (
          <div className="space-y-8">
            <button onClick={() => setSelectedZoning(null)} className="flex items-center text-blue-600 hover:underline mb-4 font-google text-sm">← Back to results</button>
            <PlanningDashboard data={selectedZoning} onClose={() => setSelectedZoning(null)} onRequestConsult={() => setIsConsultModalOpen(true)} />
          </div>
        ) : activeSection === AppSection.HOME ? (
          <div className="space-y-16">
            <div className="text-center space-y-8 pt-12">
              <h1 className="text-5xl md:text-7xl font-google font-bold text-gray-900 tracking-tight leading-[1.1]">
                Your Development <br />
                <span className="google-blue">Deciphered.</span>
              </h1>
              <p className="text-xl text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
                NeXT Plan provides clarity on Town Planning applications in the <span className="font-bold text-gray-900">South Coast Region</span>.
              </p>
              
              <div className="pt-4 flex flex-col items-center space-y-6">
                <SearchInterface onSelect={(z) => { setSelectedZoning(z); setActiveSection(AppSection.SEARCH); }} />
                <button onClick={() => setIsConsultModalOpen(true)} className="flex items-center space-x-2 px-8 py-3 bg-gray-900 text-white rounded-full font-bold shadow-xl hover:bg-gray-800 transition-all active:scale-95">
                  <Calendar size={18} />
                  <span>Talk to an Expert</span>
                </button>
              </div>

              <div className="flex flex-wrap justify-center gap-8 text-gray-400 pt-12">
                <div className="flex items-center space-x-2"><ShieldCheck size={18} /> <span>SCR Specialists</span></div>
                <div className="flex items-center space-x-2"><Zap size={18} /> <span>Instant Intelligence</span></div>
                <div className="flex items-center space-x-2"><Globe size={18} /> <span>South Coast Region Operating</span></div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Relaxation Card */}
              <div className="bg-white p-8 rounded-[3rem] shadow-sm hover:shadow-xl transition-all border border-gray-100 group">
                <div className="text-5xl font-google font-bold text-blue-600 mb-4">80</div>
                <h3 className="text-xl font-google font-bold mb-3">Successful Relaxations</h3>
                <p className="text-gray-500 text-sm leading-relaxed">Oversaw 100+ relaxation applications for building lines and coverage for small developments.</p>
                <div className="mt-6 flex items-center text-blue-600 font-bold group-hover:translate-x-2 transition-transform">
                  <button onClick={() => setIsConsultModalOpen(true)}>Learn how</button> <ArrowRight size={18} className="ml-2" />
                </div>
              </div>

              {/* SCR Region Card replaced by Knowledge Base Card */}
              <div 
                onClick={() => setActiveSection(AppSection.KNOWLEDGE)}
                className="bg-white p-8 rounded-[3rem] shadow-sm border border-gray-100 group relative overflow-hidden cursor-pointer hover:shadow-xl transition-all"
              >
                <BookOpen className="text-yellow-500/20 w-32 h-32 absolute -bottom-8 -right-8 group-hover:rotate-12 transition-transform" />
                <div className="text-5xl font-google font-bold text-yellow-500 mb-4">Blog</div>
                <h3 className="text-xl font-google font-bold mb-3">Knowledge Base</h3>
                <p className="text-gray-500 text-sm leading-relaxed">Explore articles on town planning history, legislation updates, and economic insights.</p>
                <div className="mt-6 flex items-center text-yellow-600 font-bold group-hover:translate-x-2 transition-transform">
                  <span>Start Reading</span> <ArrowRight size={18} className="ml-2" />
                </div>
              </div>

              {/* Deep AI Analysis Card - SILVER */}
              <div className="bg-silver-gradient p-8 rounded-[3rem] shadow-2xl hover:shadow-xl transition-all group cursor-pointer border border-gray-200 relative overflow-hidden" onClick={() => setIsDeepAiModalOpen(true)}>
                <div className="absolute top-4 right-8 bg-gray-900 text-white text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-widest flex items-center space-x-1">
                  <Sparkles size={10} />
                  <span>Premium</span>
                </div>
                <div className="w-14 h-14 bg-white/40 backdrop-blur-md rounded-2xl flex items-center justify-center text-gray-800 mb-6">
                  <FileSearch size={28} />
                </div>
                <h3 className="text-xl font-google font-bold mb-3 text-gray-800">Deep AI Analysis</h3>
                <p className="text-gray-700 text-sm leading-relaxed font-medium">Analyze specific municipal files to find regulation interactions.</p>
                <div className="mt-6 flex items-center text-gray-800 font-bold group-hover:translate-x-2 transition-transform">
                  <span>Open Premium Tool</span> <ArrowRight size={18} className="ml-2" />
                </div>
              </div>

              {/* GIS Solutions Card */}
              <div className="bg-blue-900 p-8 rounded-[3rem] shadow-sm hover:shadow-xl transition-all group text-white border border-blue-800 cursor-pointer" onClick={() => setIsConsultModalOpen(true)}>
                <div className="w-14 h-14 bg-blue-800/50 rounded-2xl flex items-center justify-center mb-6">
                  <MapPin size={28} className="text-blue-300" />
                </div>
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-google font-bold">GIS Solutions</h3>
                  <span className="bg-blue-500 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">R800</span>
                </div>
                <p className="text-blue-200 text-sm leading-relaxed">Our <strong>specialist team</strong> creates detailed site maps and spatial feasibility reports.</p>
                <div className="mt-6 flex items-center text-blue-300 font-bold group-hover:translate-x-2 transition-transform">
                  <span>Order Site Map</span> <ArrowRight size={18} className="ml-2" />
                </div>
              </div>
            </div>
          </div>
        ) : activeSection === AppSection.SEARCH ? (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-google font-bold">Scheme Intelligence</h2>
              <p className="text-gray-500">Dive into the deep controls of local municipal schemes.</p>
            </div>
            <SearchInterface onSelect={setSelectedZoning} />
          </div>
        ) : activeSection === AppSection.KNOWLEDGE ? (
          <KnowledgeBase />
        ) : (
          <div className="max-w-4xl mx-auto space-y-8 py-20 text-center">
             <BackButton />
             <div className="bg-white p-20 rounded-[4rem] border border-gray-100 shadow-sm">
                <Layers className="mx-auto mb-6 text-blue-500" size={60} />
                <h2 className="text-3xl font-google font-bold">Under Construction</h2>
                <p className="text-gray-500">Our deep documentation library for the South Coast Region is being indexed.</p>
             </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-20 py-12 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 text-sm text-gray-500">
          <div className="space-y-4">
            <span className="text-xl font-google font-bold text-gray-900">NeXT Plan</span>
            <p className="leading-relaxed">Advancing SCR development through clarity and intelligence.</p>
          </div>
          <div>
            <h4 className="font-google font-bold text-gray-900 mb-4">Core Focus</h4>
            <ul className="space-y-2">
              <li className="hover:text-blue-600 cursor-pointer" onClick={() => setIsConsultModalOpen(true)}>Relaxation Consults</li>
              <li className="hover:text-blue-600 cursor-pointer" onClick={() => setIsDeepAiModalOpen(true)}>AI Analysis</li>
              <li className="hover:text-blue-600 cursor-pointer" onClick={() => setIsConsultModalOpen(true)}>GIS Specialist Maps</li>
            </ul>
          </div>
          <div>
            <h4 className="font-google font-bold text-gray-900 mb-4">Contact</h4>
            <ul className="space-y-2">
              <li>
                <a href="mailto:lwazikhwela@outlook.com" className="font-bold text-gray-900 hover:text-blue-600 transition-colors">
                  Click to email
                </a>
              </li>
              <li>South Coast Region, SA</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
