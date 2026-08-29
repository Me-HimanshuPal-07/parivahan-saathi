import React, { useState } from "react";
import {
  Award,
  ChevronRight,
  X,
  Sparkles,
  CheckCircle2,
  Target,
  Rocket,
  ShieldAlert,
  Cpu,
  UserCheck,
  Building2,
  Server,
  Scale,
  Zap,
  BookOpen,
  Database,
  Lock,
  Globe2,
  Smartphone,
} from "lucide-react";

export default function JuryDeckModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <>
      {/* 🚀 Floating Launch Capsule */}
      <div className="fixed bottom-20 left-4 z-50 sm:bottom-6 sm:right-6 sm:left-auto">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2.5 rounded-full border border-amber-300 bg-amber-500/10 px-4 py-2.5 text-xs font-bold text-amber-900 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-amber-500/20 active:scale-95 font-['Baloo_2']"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-500 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-amber-600" />
          </span>
          <Award className="h-4 w-4 text-amber-600" />
          <span className="tracking-wide">Reviewer Deck & Product Breakdown</span>
          <ChevronRight className="h-3.5 w-3.5 text-amber-600 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>

      {/* 🪟 Interactive Overlay (Light Theme + Adaptive Mobile Drawer / Desktop Modal) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/40 backdrop-blur-xs p-0 sm:p-6 font-['Baloo_2'] transition-all">
          
          <div className="relative flex max-h-[90vh] sm:max-h-[88vh] w-full max-w-4xl flex-col rounded-t-3xl sm:rounded-3xl border border-slate-200 bg-white shadow-2xl overflow-hidden animate-slideUp sm:animate-fadeIn text-slate-800">
            
            {/* 📱 Mobile Handle Bar (Drawer visual cue) */}
            <div className="sm:hidden w-full flex justify-center pt-2.5 pb-1 bg-slate-50">
              <div className="w-12 h-1.5 rounded-full bg-slate-300" />
            </div>

            {/* 🔝 TOP HEADER BAR */}
            <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/80 px-5 py-3.5">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-2xl bg-amber-500/10 text-amber-600 border border-amber-500/20">
                  <Building2 className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold leading-none text-slate-900">
                      Parivahan Saathi
                    </h3>
                    <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-bold text-amber-800 border border-amber-200">
                      Product & Arch Blueprint
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-sans mt-0.5">
                    Build with India Hackathon 2026 Submission
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-xl p-2 text-slate-400 hover:bg-slate-200/60 hover:text-slate-700 transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* 📑 Navigation Tabs */}
            <div className="flex border-b border-slate-200 bg-slate-100/60 px-4 py-2 gap-2 text-xs font-bold overflow-x-auto scrollbar-none">
              {[
                { id: "overview", label: "1. Problem & Core Value", icon: Target },
                { id: "infra", label: "2. Server Infra & Bottlenecks", icon: Server },
                { id: "product", label: "3. Product Thinking & AI", icon: Cpu },
                { id: "risk", label: "4. Risks, Rules & Security", icon: Scale },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all shrink-0 ${
                      activeTab === tab.id
                        ? "bg-[#2A52BE] text-white shadow-md shadow-[#2A52BE]/20 border border-blue-600/20"
                        : "text-slate-600 hover:bg-slate-200/60 hover:text-slate-900"
                    }`}
                  >
                    <Icon size={14} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* 📜 Scrollable Light Theme Case-Study Body */}
            <div className="overflow-y-auto p-4 sm:p-6 space-y-5 max-h-[68vh] text-slate-700 bg-slate-50/50 font-sans">
              
              {/* TAB 1: OVERVIEW & REAL-WORLD PROBLEMS */}
              {activeTab === "overview" && (
                <div className="space-y-5">
                  <div className="rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-50/80 via-white to-white p-5 shadow-xs">
                    <div className="flex items-center gap-2 text-amber-700 text-xs font-bold font-['Baloo_2'] uppercase tracking-wider">
                      <Sparkles size={16} /> Executive Summary
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 mt-1 font-['Baloo_2']">
                      Solving India's Digital Transport Friction for 1.4B Citizens
                    </h2>
                    <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                      Official transport portals (Vahan, Sarathi, E-Challan) are siloed, requiring repetitive logins, complex navigation, and legal jargon. Parivahan Saathi unifies <strong>58 core services</strong> into a zero-login, 3-second diagnostic audit.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="rounded-2xl border border-red-200 bg-red-50/50 p-4 space-y-2">
                      <div className="flex items-center gap-2 font-bold text-red-700 text-sm font-['Baloo_2']">
                        <ShieldAlert size={16} /> Identified Citizen Pains
                      </div>
                      <ul className="space-y-1.5 text-xs text-slate-700 list-disc list-inside">
                        <li>Fragmented portals force users to re-enter registration numbers across 4+ sites.</li>
                        <li>High OTP friction just to check basic compliance (PUCC/Insurance expiry).</li>
                        <li>Complex legal English in rules confuses non-tech-savvy commercial drivers.</li>
                      </ul>
                    </div>

                    <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4 space-y-2">
                      <div className="flex items-center gap-2 font-bold text-emerald-700 text-sm font-['Baloo_2']">
                        <CheckCircle2 size={16} /> The Parivahan Saathi Solution
                      </div>
                      <ul className="space-y-1.5 text-xs text-slate-700 list-disc list-inside">
                        <li>Single input vehicle health audit rendered in under 3 seconds.</li>
                        <li>58-Service Learn Hub with Lovable-inspired clear documentation.</li>
                        <li>Screen-aware AI Saathi for step-by-step guidance in Hindi & Hinglish.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: SERVER INFRASTRUCTURE & BOTTLENECK STRATEGY */}
              {activeTab === "infra" && (
                <div className="space-y-5">
                  <div className="rounded-2xl border border-blue-200 bg-blue-50/40 p-5 space-y-2 shadow-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 font-bold text-blue-900 text-sm font-['Baloo_2']">
                        <Server size={18} /> Handling Govt Server Infra Bottlenecks
                      </div>
                      <span className="text-[10px] bg-blue-100 border border-blue-200 text-blue-800 px-2 py-0.5 rounded-full font-mono font-bold">
                        Arch Strategy
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Government backends face extreme traffic spikes causing timeout errors. Parivahan Saathi implements a <strong>Federated Gateway & Intelligent Caching Pattern</strong> to shield state infrastructure.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-1.5 shadow-xs">
                      <Database className="text-amber-600" size={20} />
                      <h4 className="text-xs font-bold text-slate-900 font-['Baloo_2']">24-Hour Static TTL Caching</h4>
                      <p className="text-[11px] text-slate-500 leading-snug">
                        RC parameters and vehicle models rarely change. Caching static data reduces legacy database load by up to 80%.
                      </p>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-1.5 shadow-xs">
                      <Zap className="text-blue-600" size={20} />
                      <h4 className="text-xs font-bold text-slate-900 font-['Baloo_2']">Parallel Non-Blocking Async Polling</h4>
                      <p className="text-[11px] text-slate-500 leading-snug">
                        Challan, PUCC, and Insurance queries execute asynchronously. If one server lags, the UI renders partial data instantly.
                      </p>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-1.5 shadow-xs">
                      <Globe2 className="text-emerald-600" size={20} />
                      <h4 className="text-xs font-bold text-slate-900 font-['Baloo_2']">Edge Geo-Routing (Leaflet)</h4>
                      <p className="text-[11px] text-slate-500 leading-snug">
                        Reverse geocodes state/city parameters locally to fetch RTO specific rules without hitting national mainframes.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: PRODUCT THINKING & OPENAI SAATHI */}
              {activeTab === "product" && (
                <div className="space-y-5">
                  <div className="rounded-2xl border border-purple-200 bg-purple-50/40 p-5 space-y-2 shadow-xs">
                    <div className="flex items-center gap-2 font-bold text-purple-900 text-sm font-['Baloo_2']">
                      <Cpu size={18} /> Context-Aware OpenAI Saathi Engine
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Instead of generic chatbots, <strong>AI Saathi</strong> accepts runtime context (`currentScreen`) and state/city parameters from the LocationPicker to generate contextually precise, step-by-step guidance.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-3 shadow-xs">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-900 font-['Baloo_2']">
                      <BookOpen className="text-amber-600" size={16} /> 58 Citizen Services · Lovable Documentation UX
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                        <span className="text-amber-800 font-bold block mb-1">3-Pane Hierarchy</span>
                        <p className="text-[11px] text-slate-600">Left category index, middle actionable steps, right quick jump anchor links.</p>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                        <span className="text-amber-800 font-bold block mb-1">Multilingual Localized Rules</span>
                        <p className="text-[11px] text-slate-600">Generates guidance in Hindi, English, and Hinglish according to target audience preferences.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: RISKS, RULES & REGULATORY COMPLIANCE */}
              {activeTab === "risk" && (
                <div className="space-y-5">
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-5 space-y-2 shadow-xs">
                    <div className="flex items-center gap-2 font-bold text-emerald-900 text-sm font-['Baloo_2']">
                      <Scale size={18} /> Risk Management & Data Integrity
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Designed strictly adhering to hackathon guidelines and Indian DPDP (Digital Personal Data Protection) standards.
                    </p>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="flex items-start gap-3 p-3.5 bg-white rounded-xl border border-slate-200 shadow-2xs">
                      <CheckCircle2 className="text-emerald-600 shrink-0 mt-0.5" size={16} />
                      <div>
                        <strong className="text-slate-900 font-['Baloo_2'] block">What Works Live Today</strong>
                        <span className="text-slate-600 text-[11px]">
                          Full interactive UI, client-side runtime database (`MOCK_SYSTEM_DB`), realtime OpenAI Saathi execution, and Leaflet location engine.
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3.5 bg-white rounded-xl border border-slate-200 shadow-2xs">
                      <Lock className="text-amber-600 shrink-0 mt-0.5" size={16} />
                      <div>
                        <strong className="text-slate-900 font-['Baloo_2'] block">Masked PII & Safe Synthetic Sandbox</strong>
                        <span className="text-slate-600 text-[11px]">
                          Government privacy compliance ki wajah se live APIs ki jagah `MOCK_SYSTEM_DB` sandbox data render hota hai, with zero PII exposure (`A***** S*****`).
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* 🏁 Footer Bar */}
            <div className="border-t border-slate-200 bg-slate-50/80 px-5 py-3.5 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1.5 font-bold text-amber-700 font-['Baloo_2']">
                <Rocket className="h-4 w-4 text-[#2A52BE]" /> Ready for Hackathon Review
              </span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-xl bg-[#2A52BE] hover:bg-[#2042a1] px-4 py-2 text-xs font-bold text-white transition-colors shadow-sm font-['Baloo_2']"
              >
                Back to Live Portal Demo
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}