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
} from "lucide-react";

export default function JuryDeckModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("journey");

  return (
    <>
      {/* 🚀 Floating Capsule Pill (Bottom Launcher) */}
      <div className="fixed bottom-20 left-4 z-50 sm:bottom-6 sm:right-6 sm:left-auto">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2.5 rounded-full border border-amber-400/60 bg-slate-900/95 px-4 py-2.5 text-xs font-semibold text-amber-300 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:bg-slate-900 active:scale-95"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-amber-500" />
          </span>
          <Award className="h-4 w-4 text-amber-400" />
          <span className="tracking-wide">Reviewer Brief · Build With India</span>
          <ChevronRight className="h-3.5 w-3.5 text-amber-400 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>

      {/* 🪟 Interactive Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-3 sm:p-6">
          <div className="relative flex max-h-[90vh] w-full max-w-3xl flex-col rounded-3xl border border-slate-200 bg-white shadow-2xl overflow-hidden animate-fadeIn">
            
            {/* 🔝 TOP HEADER BAR */}
            <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900 px-6 py-4 text-white">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-amber-500/20 text-amber-400 border border-amber-400/30">
                  <Building2 className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold leading-tight text-white">
                      Parivahan Saathi
                    </h3>
                    <span className="rounded-full bg-amber-400/20 px-2 py-0.5 text-[10px] font-semibold text-amber-300 border border-amber-400/30">
                      Judge Deck
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Build with India Hackathon 2026 Submission
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-full p-2 text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* 📑 Navigation Tabs */}
            <div className="flex border-b border-slate-200 bg-slate-100 px-6 py-2.5 gap-2 text-xs font-semibold overflow-x-auto">
              <button
                type="button"
                onClick={() => setActiveTab("journey")}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all ${
                  activeTab === "journey"
                    ? "bg-[#2A52BE] text-white shadow-xs"
                    : "text-slate-600 hover:bg-slate-200"
                }`}
              >
                <UserCheck size={14} />
                <span>1. Problem & Citizen Journey</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("changes")}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all ${
                  activeTab === "changes"
                    ? "bg-[#2A52BE] text-white shadow-xs"
                    : "text-slate-600 hover:bg-slate-200"
                }`}
              >
                <Sparkles size={14} />
                <span>2. Redesign & OpenAI Integration</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("honesty")}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all ${
                  activeTab === "honesty"
                    ? "bg-[#2A52BE] text-white shadow-xs"
                    : "text-slate-600 hover:bg-slate-200"
                }`}
              >
                <ShieldAlert size={14} />
                <span>3. Honesty & Mock Data</span>
              </button>
            </div>

            {/* 📜 Scrollable Body */}
            <div className="overflow-y-auto p-6 space-y-4 max-h-[62vh] text-slate-700 bg-slate-50/50">
              {activeTab === "journey" && (
                <div className="space-y-4">
                  <div className="rounded-2xl border border-red-200 bg-red-50/70 p-4">
                    <h4 className="flex items-center gap-2 font-bold text-red-900 text-sm">
                      <ShieldAlert className="h-4 w-4 text-red-600" /> Target Audience & Problem
                    </h4>
                    <p className="mt-1 text-xs text-red-800 leading-relaxed">
                      Everyday Indian citizens and commercial drivers checking vehicle compliance or paying challans on low-spec mobile devices with slow networks.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4">
                    <h4 className="flex items-center gap-2 font-bold text-amber-900 text-sm">
                      <Target className="h-4 w-4 text-amber-600" /> Current Portal Issues
                    </h4>
                    <ul className="mt-2 space-y-1.5 text-xs text-amber-900 font-medium">
                      <li>• Complex navigation across fragmented portals (Sarathi, Vahan, PUCC).</li>
                      <li>• High friction login & OTP loops for simple status checks.</li>
                      <li>• Unclear jargon instead of direct, actionable citizen guidance.</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === "changes" && (
                <div className="space-y-4">
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4">
                    <h4 className="flex items-center gap-2 font-bold text-emerald-900 text-sm">
                      <Sparkles className="h-4 w-4 text-emerald-600" /> Core Architectural Changes
                    </h4>
                    <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div className="rounded-xl border border-emerald-200 bg-white p-3">
                        <strong className="text-slate-900 font-bold block">1-Step Audit</strong>
                        <p className="text-[11px] text-slate-500">Aggregates RC, Insurance, PUC & Challans instantly.</p>
                      </div>
                      <div className="rounded-xl border border-emerald-200 bg-white p-3">
                        <strong className="text-slate-900 font-bold block">AISaathi Engine</strong>
                        <p className="text-[11px] text-slate-500">Regional AI assistant explaining next steps simply.</p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-blue-200 bg-blue-50/70 p-4">
                    <h4 className="flex items-center gap-2 font-bold text-blue-900 text-sm">
                      <Cpu className="h-4 w-4 text-blue-600" /> OpenAI Integration
                    </h4>
                    <p className="mt-1 text-xs text-blue-800 leading-relaxed">
                      Powers the natural language regional interface to simplify policy docs and guide user interactions step-by-step.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === "honesty" && (
                <div className="space-y-4">
                  <div className="rounded-2xl border border-slate-300 bg-white p-4 shadow-2xs">
                    <h4 className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" /> What Works Live
                    </h4>
                    <p className="mt-1 text-xs text-slate-600">
                      Complete visual flow, mobile-responsive layout, and interactive AI responses.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-300 bg-white p-4 shadow-2xs">
                    <h4 className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                      <ShieldAlert className="h-4 w-4 text-amber-600" /> Safe Synthetic Data
                    </h4>
                    <p className="mt-1 text-xs text-slate-600">
                      In accordance with guidelines, no real government databases, live PII, or official identity services were accessed. All backend calls use synthetic mock responses.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* 🏁 Footer Bar */}
            <div className="border-t border-slate-200 bg-slate-100 px-6 py-3.5 flex items-center justify-between text-xs text-slate-600">
              <span className="flex items-center gap-1.5 font-medium text-slate-700">
                <Rocket className="h-4 w-4 text-[#2A52BE]" /> Submission Ready
              </span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 transition-colors"
              >
                Return to Demo
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}