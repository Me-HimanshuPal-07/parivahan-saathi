import React, { useState } from "react";
import { copy } from "../data/copy";
import CanvasCompressor from "./CanvasCompressor";
import SignQuizGame from "./SignQuizGame";
import * as Icons from "lucide-react";

export default function LearnHubContent({
  currentNode,
  isLoggedIn,
  userProfile,
}) {
  const [currentLang, setCurrentLang] = useState("hinglish");

  // Only these two academy pages currently support 3 languages
  const isMultilingualNode =
    currentNode === "1.1" || currentNode === "1.4";

  // Get content from:
  // copy[currentLang].learningHub[currentNode]
  const activeContent = isMultilingualNode
    ? copy[currentLang]?.learningHub?.[currentNode]
    : null;

  return (
    <div className="flex-1 bg-[#F5F7FA] min-h-[calc(100vh-73px)] p-6 lg:p-8 space-y-8 overflow-y-auto selection:bg-[#2A52BE] selection:text-white">

      {/* =========================================================
          HEADER
      ========================================================= */}

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-gray-200/80 pb-4 gap-4">

        <div>
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            Active Workspace Node:{" "}
            <span className="text-[#2A52BE] font-mono">
              {currentNode}
            </span>
          </div>

          {isLoggedIn && userProfile && (
            <div className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-green-700 bg-green-50 px-2.5 py-1 rounded-md border border-green-100">
              <Icons.ShieldCheck className="h-3.5 w-3.5" />

              <span>
                Verified Session: {userProfile.name} ({userProfile.rto})
              </span>
            </div>
          )}
        </div>

        {/* =====================================================
            LANGUAGE SWITCHER
        ===================================================== */}

        <div className="flex gap-1 bg-gray-100 p-1 rounded-xl border border-gray-200/50 w-full sm:w-auto">

          {["en", "hi", "hinglish"].map((lang) => (
            <button
              key={lang}
              type="button"
              onClick={() => setCurrentLang(lang)}
              className={`flex-1 sm:flex-none text-xs font-bold px-3 py-1.5 rounded-lg transition-all duration-150 thumb-accessible-action ${
                currentLang === lang
                  ? "bg-[#2A52BE] text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-900 hover:bg-white/50"
              }`}
            >
              {lang === "en"
                ? "English"
                : lang === "hi"
                  ? "हिंदी"
                  : "Hinglish"}
            </button>
          ))}

        </div>
      </div>

      {/* =========================================================
          MULTILINGUAL ACADEMY CONTENT
          Nodes: 1.1 and 1.4
      ========================================================= */}

      {isMultilingualNode ? (
        <div className="space-y-6 animate-fadeIn">

          {/* Breadcrumb */}

          <div className="flex items-center gap-1 text-xs font-semibold text-[#2A52BE]">
            <Icons.ChevronRight className="h-3 w-3" />

            <span>
              {activeContent?.breadcrumb}
            </span>
          </div>

          {/* Title */}

          <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-gray-900">
            {activeContent?.title}
          </h1>

          {/* Lead */}

          <p className="text-sm lg:text-md text-gray-600 leading-relaxed max-w-3xl">
            {activeContent?.lead}
          </p>

          {/* =====================================================
              NODE 1.1
              Welcome / Sarathi vs Vahan
          ===================================================== */}

          {currentNode === "1.1" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">

              {/* Sarathi */}

              <div className="bento-card-sheet bg-white p-5 space-y-3">

                <div className="flex items-center gap-2 text-gray-900 font-bold">
                  <Icons.UserCheck className="h-5 w-5 text-[#2A52BE]" />

                  <h3>
                    {activeContent?.bento_title_1}
                  </h3>
                </div>

                <p className="text-xs lg:text-sm text-gray-600 leading-relaxed">
                  {activeContent?.bento_desc_1}
                </p>

              </div>

              {/* Vahan */}

              <div className="bento-card-sheet bg-white p-5 space-y-3">

                <div className="flex items-center gap-2 text-gray-900 font-bold">
                  <Icons.Car className="h-5 w-5 text-[#2A52BE]" />

                  <h3>
                    {activeContent?.bento_title_2}
                  </h3>
                </div>

                <p className="text-xs lg:text-sm text-gray-600 leading-relaxed">
                  {activeContent?.bento_desc_2}
                </p>

              </div>

            </div>
          )}

          {/* =====================================================
              NODE 1.4
              Portal Guide
          ===================================================== */}

          {currentNode === "1.4" && (
            <div className="space-y-4 bg-white p-6 rounded-2xl border border-gray-200/60 shadow-sm">

              {/* Step 1 */}

              <div className="flex gap-3 p-3 bg-gray-50 rounded-xl text-xs lg:text-sm text-gray-700 font-semibold border-l-4 border-gray-300">

                <div className="shrink-0 w-6 h-6 rounded-full bg-[#2A52BE] text-white flex items-center justify-center text-[10px] font-bold">
                  1
                </div>

                <p>
                  {activeContent?.step_1}
                </p>

              </div>

              {/* Step 2 */}

              <div className="flex gap-3 p-3 bg-gray-50 rounded-xl text-xs lg:text-sm text-gray-700 font-semibold border-l-4 border-gray-300">

                <div className="shrink-0 w-6 h-6 rounded-full bg-[#2A52BE] text-white flex items-center justify-center text-[10px] font-bold">
                  2
                </div>

                <p>
                  {activeContent?.step_2}
                </p>

              </div>

              {/* Step 3 */}

              <div className="flex gap-3 p-3 bg-gray-50 rounded-xl text-xs lg:text-sm text-gray-700 font-semibold border-l-4 border-gray-400">

                <div className="shrink-0 w-6 h-6 rounded-full bg-[#2A52BE] text-white flex items-center justify-center text-[10px] font-bold">
                  3
                </div>

                <p>
                  {activeContent?.step_3}
                </p>

              </div>

            </div>
          )}

        </div>
      ) : (

        /* =======================================================
           NON-MULTILINGUAL ACADEMY CONTENT
           Nodes: 2.1.1 → 2.1.7
        ======================================================= */

        <div className="space-y-8 animate-fadeIn">

          {/* =====================================================
              NODE 2.1.1
              LL vs DL Foundation
          ===================================================== */}

          {currentNode === "2.1.1" && (
            <div className="space-y-6">

              <div className="text-sm font-semibold text-[#2A52BE]">
                Home → Sarathi → Learner's Licence → Overview
              </div>

              <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-gray-900">
                Understanding the Learner’s Licence Foundation
              </h1>

              <p className="text-sm text-gray-600 leading-relaxed max-w-2xl">
                A Learner's Licence (LL) is a temporary operating credential
                issued to enable citizens to practice road rules before testing
                for an unrestricted title.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* LL */}

                <div className="bento-card-sheet bg-white p-5 border-l-4 border-[#2A52BE] space-y-3">

                  <span className="text-xs font-bold text-[#2A52BE] bg-[#EBF3FC] px-2.5 py-1 rounded-md uppercase tracking-wider">
                    Permit Layer
                  </span>

                  <h3 className="text-md font-bold text-gray-900">
                    🪪 Learner's Licence (LL)
                  </h3>

                  <p className="text-xs text-gray-600 leading-relaxed">
                    Valid for a strict threshold of 180 days nationwide.
                    Enforces a legal mandate: the vehicle
                    must display a prominent red block letter 'L' sticker on
                    the front and rear screens, and a passenger holding a
                    valid permanent DL must accompany you to monitor control
                    transitions.
                  </p>

                </div>

                {/* DL */}

                <div className="bento-card-sheet bg-white p-5 border-l-4 border-gray-400 space-y-3">

                  <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-md uppercase tracking-wider">
                    Asset Layer
                  </span>

                  <h3 className="text-md font-bold text-gray-900">
                    👑 Permanent Driving Licence (DL)
                  </h3>

                  <p className="text-xs text-gray-600 leading-relaxed">
                    Your definitive unrestricted operational privilege across
                    India. Candidates attain legal eligibility to schedule
                    their formal physical RTO driving track exam exactly
                    30 days post the initial issuance checkpoint of their
                    Learner's Certificate.
                  </p>

                </div>

              </div>
            </div>
          )}

          {/* =====================================================
              NODE 2.1.2
              LL Journey
          ===================================================== */}

          {currentNode === "2.1.2" && (
            <div className="space-y-6">

              <h1 className="text-2xl font-extrabold text-gray-900">
                Your Step-by-Step Faceless LL Journey
              </h1>

              <p className="text-xs text-gray-500 max-w-xl">
                Bypass old RTO line wait times completely. Below is the
                automated roadmap mapping file creation straight to issuance
                logs:
              </p>

              <div className="relative border-l border-gray-200 ml-4 pl-6 space-y-6">

                {/* Step 1 */}

                <div className="relative">

                  <span className="absolute -left-[31px] bg-[#2A52BE] text-white h-4 w-4 rounded-full text-[9px] font-bold flex items-center justify-center">
                    1
                  </span>

                  <h4 className="text-xs font-bold text-gray-900">
                    Mobile OTP + Aadhaar Authentication
                  </h4>

                  <p className="text-[11px] text-gray-500 mt-0.5">
                    Locks identity indices and generates a clean citizen
                    account profile.
                  </p>

                </div>

                {/* Step 2 */}

                <div className="relative">

                  <span className="absolute -left-[31px] bg-[#2A52BE] text-white h-4 w-4 rounded-full text-[9px] font-bold flex items-center justify-center">
                    2
                  </span>

                  <h4 className="text-xs font-bold text-gray-900">
                    DigiLocker Legal Data Hydration
                  </h4>

                  <p className="text-[11px] text-gray-500 mt-0.5">
                    Pulls pre-verified age and residential proofs instantly
                    without typing game loops.
                  </p>

                </div>

                {/* Step 3 */}

                <div className="relative">

                  <span className="absolute -left-[31px] bg-[#2A52BE] text-white h-4 w-4 rounded-full text-[9px] font-bold flex items-center justify-center">
                    3
                  </span>

                  <h4 className="text-xs font-bold text-gray-900">
                    Canvas Compressor Upload
                  </h4>

                  <p className="text-[11px] text-gray-500 mt-0.5">
                    Captures your signature photo and scales it locally down
                    to 42KB for clerk compliance.
                  </p>

                </div>

                {/* Step 4 */}

                <div className="relative">

                  <span className="absolute -left-[31px] bg-purple-700 text-white h-4 w-4 rounded-full text-[9px] font-bold flex items-center justify-center">
                    4
                  </span>

                  <h4 className="text-xs font-bold text-gray-900">
                    Faceless Home AI Proctoring Quiz
                  </h4>

                  <p className="text-[11px] text-gray-500 mt-0.5">
                    Tracks your gaze via front-facing camera nodes while you
                    clear 3 road rule questions.
                  </p>

                </div>

              </div>
            </div>
          )}

          {/* =====================================================
              NODE 2.1.3
              Required Documents
          ===================================================== */}

          {currentNode === "2.1.3" && (
            <div className="space-y-6">

              <h1 className="text-2xl font-extrabold text-gray-900">
                Required Documents Matrix
              </h1>

              <p className="text-xs text-gray-500 max-w-xl">
                Zero manual typing or uploading for standard assets. Our
                integration stack handles validation instantly:
              </p>

              <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">

                <table className="min-w-full divide-y divide-gray-200 text-left text-xs">

                  <thead className="bg-gray-50 text-gray-500 font-bold uppercase">

                    <tr>
                      <th className="px-4 py-3">
                        Document Type
                      </th>

                      <th className="px-4 py-3">
                        Verification Path
                      </th>

                      <th className="px-4 py-3">
                        Action Required
                      </th>
                    </tr>

                  </thead>

                  <tbody className="divide-y divide-gray-200 text-gray-700">

                    <tr>
                      <td className="px-4 py-3 font-semibold">
                        1. Age Proof
                      </td>

                      <td className="px-4 py-3 text-[#2A52BE] font-medium">
                        Instant Aadhaar / DigiLocker Sync
                      </td>

                      <td className="px-4 py-3 text-green-600 font-bold">
                        Auto-Verified ✓
                      </td>
                    </tr>

                    <tr>
                      <td className="px-4 py-3 font-semibold">
                        2. Address Proof
                      </td>

                      <td className="px-4 py-3 text-[#2A52BE] font-medium">
                        National Identity Grid Handshake
                      </td>

                      <td className="px-4 py-3 text-green-600 font-bold">
                        Auto-Verified ✓
                      </td>
                    </tr>

                    <tr>
                      <td className="px-4 py-3 font-semibold">
                        3. Signature Copy
                      </td>

                      <td className="px-4 py-3 text-amber-600 font-medium">
                        In-Browser Local Compressor
                      </td>

                      <td className="px-4 py-3">
                        <span className="bg-amber-50 text-amber-700 border border-amber-200 text-[10px] px-2 py-0.5 rounded font-bold">
                          Upload Snapshot
                        </span>
                      </td>
                    </tr>

                  </tbody>

                </table>

              </div>
            </div>
          )}

          {/* =====================================================
              NODE 2.1.4
              Fees
          ===================================================== */}

          {currentNode === "2.1.4" && (
            <div className="space-y-6">

              <h1 className="text-2xl font-extrabold text-gray-900">
                Fee Structure & Financial Guidelines
              </h1>

              <p className="text-xs text-gray-500 max-w-xl">
                Complete transparency over state metrics. Eliminate cash
                extraction loops entirely:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                {/* Application Fee */}

                <div className="p-4 bg-white border border-gray-200 rounded-xl space-y-1">

                  <span className="text-[10px] font-bold text-gray-400 uppercase">
                    Application Fee
                  </span>

                  <div className="text-xl font-black text-gray-900">
                    ₹150
                  </div>

                  <p className="text-[11px] text-gray-500">
                    Standard central processing charge.
                  </p>

                </div>

                {/* Test Fee */}

                <div className="p-4 bg-white border border-gray-200 rounded-xl space-y-1">

                  <span className="text-[10px] font-bold text-gray-400 uppercase">
                    Online Test Fee
                  </span>

                  <div className="text-xl font-black text-gray-900">
                    ₹50
                  </div>

                  <p className="text-[11px] text-gray-500">
                    Automated AI proctoring slot allocation.
                  </p>

                </div>

                {/* Penalty */}

                <div className="p-4 bg-white border border-gray-200 border-l-4 border-l-green-600 rounded-xl space-y-1">

                  <span className="text-[10px] font-bold text-green-600 uppercase">
                    Late Penalty
                  </span>

                  <div className="text-xl font-black text-green-700">
                    ₹0
                  </div>

                  <p className="text-[11px] text-green-600">
                    No hidden middleman fees or cash traps.
                  </p>

                </div>

              </div>
            </div>
          )}

          {/* =====================================================
              NODE 2.1.5
              Canvas Compressor
          ===================================================== */}

          {currentNode === "2.1.5" && (
            <div className="space-y-4">

              <h1 className="text-2xl font-extrabold text-gray-900">
                HTML Canvas Photo Optimization Suite
              </h1>

              <p className="text-xs text-gray-500 max-w-xl">
                Test our built-in file resizing toolkit below. Drop any heavy
                smartphone image to view instant offline local conversion to
                a compliant 42KB standard format.
              </p>

              <CanvasCompressor />

            </div>
          )}

          {/* =====================================================
              NODE 2.1.6
              Broker Traps
          ===================================================== */}

          {currentNode === "2.1.6" && (
            <div className="space-y-6">

              <h1 className="text-2xl font-extrabold text-gray-900">
                Eliminating Broker Exploitation & Traps
              </h1>

              <div className="space-y-4">

                {/* Trap 1 */}

                <div className="rounded-xl bg-amber-50 p-4 border border-amber-100 flex items-start gap-3">

                  <Icons.AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />

                  <div>

                    <h4 className="text-xs font-bold text-amber-900">
                      Trap 1: The 180-Day Expiration Cliff
                    </h4>

                    <p className="text-[11px] text-amber-800 leading-relaxed mt-1">
                      Failing to apply for an unrestricted permanent DL test
                      exactly between Day 30 and Day 180 will drop your file
                      into an unrecoverable archive pool. You must forfeit all
                      transaction state fees and restart application forms
                      from zero.
                    </p>

                  </div>

                </div>

                {/* Trap 2 */}

                <div className="rounded-xl bg-amber-50 p-4 border border-amber-100 flex items-start gap-3">

                  <Icons.AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />

                  <div>

                    <h4 className="text-xs font-bold text-amber-900">
                      Trap 2: High Resolution Upload Rejections
                    </h4>

                    <p className="text-[11px] text-amber-800 leading-relaxed mt-1">
                      Uploading uncompressed 5MB smartphone pictures of
                      signatures causes legacy server databases to hang and
                      prompt silent application rejection alerts. Middlemen
                      use this exact tech barrier to trap citizens into high
                      cash fees.
                    </p>

                  </div>

                </div>

              </div>
            </div>
          )}

          {/* =====================================================
              NODE 2.1.7
              Sign Quiz
          ===================================================== */}

          {currentNode === "2.1.7" && (
            <div className="space-y-4">

              <h1 className="text-2xl font-extrabold text-gray-900">
                Road Sign Practice Simulation Hub
              </h1>

              <p className="text-xs text-gray-500 max-w-xl">
                Guarantee a 100% pass score on your home video test by
                playing our gamified rule matcher below:
              </p>

              <SignQuizGame />

            </div>
          )}

          {/* =====================================================
              FALLBACK
          ===================================================== */}

          {![
            "2.1.1",
            "2.1.2",
            "2.1.3",
            "2.1.4",
            "2.1.5",
            "2.1.6",
            "2.1.7",
          ].includes(currentNode) && (
            <div className="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-2xl border border-gray-200/50 p-8 text-center space-y-4 shadow-sm">

              <div className="p-3 bg-[#EBF3FC] rounded-full text-[#2A52BE] animate-bounce">
                <Icons.Rocket className="h-6 w-6" />
              </div>

              <h3 className="text-lg font-bold text-gray-900">
                Concept Fully Validated
              </h3>

              <p className="text-xs text-gray-500 max-w-xs leading-relaxed">
                This specific transport registry asset path is completely
                mapped and cataloged. Full written content guides are coming
                soon in the upcoming Beta release bundle.
              </p>

              <span className="text-[10px] font-bold text-[#2A52BE] bg-[#EBF3FC] px-3 py-1 rounded-full border border-blue-100/50 uppercase tracking-wider">
                RTO Registry Synced ✓
              </span>

            </div>
          )}

        </div>
      )}

    </div>
  );
}