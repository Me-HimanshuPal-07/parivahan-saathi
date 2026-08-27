import { useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  FileText,
  Gauge,
  Lock,
  ScanFace,
  ShieldCheck,
  Sparkles,
  Leaf,
  IndianRupee,
} from "lucide-react";
import {
  formatIndianRupee,
  getVehicleAudit,
  normalizeVehicleNumber,
} from "../lib/mock-data";

const SAMPLES = ["UP32EA1234", "DL01CD5678", "MH14EF9012", "KA05GH3456"];

const ICONS = {
  rc: <FileText className="h-5 w-5" />,
  insurance: <ShieldCheck className="h-5 w-5" />,
  pucc: <Leaf className="h-5 w-5" />,
  challan: <IndianRupee className="h-5 w-5" />,
};

const STATUS_STYLES = {
  clear: {
    chip: "bg-emerald-50 text-emerald-700 border-emerald-200",
    dot: "bg-emerald-500",
    ring: "border-emerald-200",
    text: "All clear",
  },
  attention: {
    chip: "bg-amber-50 text-amber-700 border-amber-200",
    dot: "bg-amber-500",
    ring: "border-amber-200",
    text: "Action soon",
  },
  concern: {
    chip: "bg-red-50 text-red-700 border-red-200",
    dot: "bg-red-500",
    ring: "border-red-200",
    text: "Raised concern",
  },
};

// Basic Indian plate shape: 2 letters, 2 digits, 1-2 letters, 4 digits.
const PLATE_PATTERN = /^[A-Z]{2}\d{2}[A-Z]{1,2}\d{4}$/;

export function Hero() {
  const [step, setStep] = useState("input");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [touched, setTouched] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [audit, setAudit] = useState(null);

  const normalizedInput = normalizeVehicleNumber(vehicleNumber);
  const isValidPlate = PLATE_PATTERN.test(normalizedInput);

  function runAudit(value) {
    const normalized = normalizeVehicleNumber(value ?? vehicleNumber);
    setTouched(true);
    if (!normalized || !PLATE_PATTERN.test(normalized)) return;
    setVehicleNumber(normalized);
    setLoading(true);
    setTimeout(() => {
      setAudit(getVehicleAudit(normalized));
      setLoading(false);
      setStep("audit");
    }, 800);
  }

  function sendOtp() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("otp");
    }, 600);
  }

  function verifyOtp(e) {
    e.preventDefault();
    if (otp.length !== 6) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("payment");
    }, 700);
  }

  function payNow() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("success");
    }, 1000);
  }

  function reset() {
    setStep("input");
    setVehicleNumber("");
    setOtp("");
    setAudit(null);
  }

  const overall = audit ? STATUS_STYLES[audit.overall] : STATUS_STYLES.clear;

  return (
    <section className="relative isolate col-span-full overflow-hidden rounded-[32px]">
      {/* Scoped, reduced-motion-aware animation for the background lane lines
          and the scan sweep on the plate input. */}
      <style>{`
        @keyframes ps-lane-scroll { to { stroke-dashoffset: -64; } }
        .ps-lane-lines { animation: ps-lane-scroll 4.5s linear infinite; }
        @keyframes ps-scan-sweep {
          0% { transform: translateX(-120%); }
          100% { transform: translateX(320%); }
        }
        .ps-scan-sweep { animation: ps-scan-sweep 1.15s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .ps-lane-lines, .ps-scan-sweep { animation: none !important; }
        }
      `}</style>

      {/* Background: custom vector "road + scan grid" — no stock photography,
          lighter to load and consistent with the brand on every connection speed. */}
      <div
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_120%_80%_at_50%_-10%,#1c2f6b_0%,#0b1330_55%,#05070f_100%)]"
        aria-hidden="true"
      >
        <div className="absolute -right-16 -top-20 h-72 w-72 rounded-full bg-[#3E63D6]/30 blur-3xl" />
        <div className="absolute bottom-0 left-[12%] h-64 w-64 rounded-full bg-[#F2A93B]/10 blur-3xl" />
        <svg
          className="absolute inset-0 h-full w-full opacity-30"
          preserveAspectRatio="none"
          viewBox="0 0 1200 600"
        >
          <defs>
            <linearGradient id="psLaneFade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fff" stopOpacity="0" />
              <stop offset="55%" stopColor="#fff" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
          </defs>
          <g
            className="ps-lane-lines"
            stroke="url(#psLaneFade)"
            strokeWidth="2"
            strokeDasharray="14 18"
          >
            <path d="M -120 640 L 260 -40" />
            <path d="M 140 640 L 460 -40" />
            <path d="M 420 640 L 660 -40" />
            <path d="M 720 640 L 860 -40" />
            <path d="M 1000 640 L 1040 -40" />
            <path d="M 1320 640 L 1180 -40" />
          </g>
        </svg>
        <div className="absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#05070f]/10 to-[#05070f]/85" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:py-20">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-white/80 backdrop-blur">
          <Sparkles className="h-3.5 w-3.5 text-[#F2A93B]" />
          एक number · पूरी gaadi की report
        </span>

        <h1 className="mt-6 max-w-3xl text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.4rem]">
          Gaadi ka पूरा <span className="text-[#8FADFF]">Health Audit</span>,
          <br className="hidden sm:block" />
          एक ही जगह पर।
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">
          Challan, Insurance, PUCC और RC — अलग-अलग portal नहीं। Vehicle number
          डालें और 3 second में साफ़ traffic-light status पाएँ। Login ki
          zaroorat nahi.
        </p>

        {/* Scanner card */}
        <div className="relative mt-10 overflow-hidden rounded-[28px] border border-white/10 bg-white shadow-[0_30px_70px_-18px_rgba(5,10,26,0.6)]">
          <div className="flex flex-col gap-3 border-b border-slate-100 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#2A52BE]">
                All-in-one health audit
              </p>
              <h2 className="mt-1 truncate text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
                {step === "input"
                  ? "Apni gaadi ka status check करें"
                  : `Report · ${audit?.vehicleNumber ?? ""}`}
              </h2>
            </div>
            {step !== "input" && audit ? (
              <span
                className={
                  "inline-flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-bold " +
                  overall.chip
                }
              >
                <span
                  className={"h-2 w-2 rounded-full " + overall.dot}
                  aria-hidden="true"
                />
                {overall.text}
              </span>
            ) : (
              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-[11px] font-bold text-slate-500">
                <Lock className="h-3.5 w-3.5" />
                No login · No captcha
              </span>
            )}
          </div>

          <div className="p-6 sm:p-7">
            {step === "input" && (
              <div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    runAudit();
                  }}
                  className="space-y-3"
                  noValidate
                >
                  <label
                    htmlFor="vehicle"
                    className="block text-sm font-bold text-slate-900"
                  >
                    Vehicle Registration Number
                  </label>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <div className="relative flex-1">
                      <div className="flex items-stretch overflow-hidden rounded-2xl border-2 border-slate-900 bg-white shadow-[0_3px_0_0_#0f172a] transition-colors focus-within:border-[#2A52BE]">
                        <div className="flex w-11 shrink-0 flex-col items-center justify-center gap-1 bg-[#2A52BE] text-white">
                          <span className="text-[8px] font-black tracking-[0.18em]">
                            IND
                          </span>
                          <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
                        </div>
                        <input
                          id="vehicle"
                          value={vehicleNumber}
                          onChange={(e) => {
                            setVehicleNumber(e.target.value.toUpperCase());
                            setTouched(false);
                          }}
                          placeholder="UP32EA1234"
                          autoCapitalize="characters"
                          autoComplete="off"
                          autoCorrect="off"
                          spellCheck={false}
                          aria-label="Vehicle registration number"
                          className="h-16 min-w-0 flex-1 bg-transparent px-4 font-mono text-xl font-extrabold uppercase tracking-[0.12em] text-slate-900 outline-none placeholder:font-semibold placeholder:text-slate-300 sm:text-2xl"
                        />
                        {loading && (
                          <div
                            className="pointer-events-none absolute inset-y-0 left-11 right-0 overflow-hidden"
                            aria-hidden="true"
                          >
                            <div className="ps-scan-sweep h-full w-1/3 bg-linear-to-r from-transparent via-[#2A52BE]/15 to-transparent" />
                          </div>
                        )}
                      </div>
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="h-16 shrink-0 rounded-2xl bg-[#2A52BE] px-7 text-base font-bold text-white shadow-[0_12px_26px_-10px_rgba(42,82,190,0.75)] transition-colors hover:bg-[#2245a3] disabled:opacity-70"
                    >
                      {loading ? "Scanning..." : "Full Check करें"}
                    </button>
                  </div>
                  {touched && !isValidPlate ? (
                    <p className="text-sm font-medium text-red-600">
                      Sahi format डालें — जैसे{" "}
                      <span className="font-bold">UP32EA1234</span> (2 अक्षर, 2
                      नंबर, 1-2 अक्षर, 4 नंबर)।
                    </p>
                  ) : null}
                </form>

                <div className="mt-5 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wide text-slate-400">
                    Try:
                  </span>
                  {SAMPLES.map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => runAudit(num)}
                      className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 font-mono text-xs font-bold tracking-wider text-slate-600 transition-colors hover:border-[#2A52BE]/40 hover:bg-[#2A52BE]/5 hover:text-[#2A52BE]"
                    >
                      {num}
                    </button>
                  ))}
                </div>

                <div className="mt-6 grid gap-2 sm:grid-cols-4">
                  {[
                    { icon: <FileText className="h-4 w-4" />, label: "RC" },
                    {
                      icon: <ShieldCheck className="h-4 w-4" />,
                      label: "Insurance",
                    },
                    { icon: <Leaf className="h-4 w-4" />, label: "PUCC" },
                    {
                      icon: <IndianRupee className="h-4 w-4" />,
                      label: "E-Challan",
                    },
                  ].map((chip) => (
                    <div
                      key={chip.label}
                      className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-bold text-slate-500 transition-colors hover:border-[#2A52BE]/25 hover:bg-[#2A52BE]/5"
                    >
                      <span className="shrink-0 text-[#2A52BE]">
                        {chip.icon}
                      </span>
                      <span className="min-w-0 truncate">{chip.label}</span>
                    </div>
                  ))}
                </div>

                <p className="mt-5 flex items-center gap-2 text-sm font-medium text-slate-500">
                  <ScanFace className="h-4 w-4 shrink-0 text-[#2A52BE]" />
                  चार portal, चार form — अब बस एक input में पूरी जानकारी।
                </p>
              </div>
            )}

            {step === "audit" && audit && (
              <div className="space-y-4">
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500">
                      Owner (masked for privacy)
                    </p>
                    <p className="truncate text-base font-bold text-slate-900">
                      {audit.ownerMasked}
                    </p>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-bold text-slate-500">
                    <Gauge className="h-3 w-3" />
                    Audit in 3s
                  </span>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {audit.items.map((item) => {
                    const s = STATUS_STYLES[item.status];
                    return (
                      <div
                        key={item.id}
                        className={
                          "rounded-2xl border bg-white p-4 shadow-[0_1px_0_0_rgba(15,23,42,0.03)] " +
                          s.ring
                        }
                      >
                        <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3">
                          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#2A52BE]/10 text-[#2A52BE]">
                            {ICONS[item.id]}
                          </span>
                          <span className="min-w-0">
                            <span className="block truncate text-sm font-bold text-slate-900">
                              {item.label}
                            </span>
                            <span className="block truncate text-xs text-slate-500">
                              {item.labelHi}
                            </span>
                          </span>
                          <span
                            className={
                              "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-bold " +
                              s.chip
                            }
                          >
                            {item.status === "clear" ? (
                              <CheckCircle2 className="h-3 w-3" />
                            ) : item.status === "attention" ? (
                              <Clock className="h-3 w-3" />
                            ) : (
                              <AlertTriangle className="h-3 w-3" />
                            )}
                            {item.headline}
                          </span>
                        </div>
                        <p className="mt-2 text-xs text-slate-500">
                          {item.detail}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {audit.totalDue > 0 ? (
                  <div className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <ul className="space-y-2">
                      {audit.challans.map((c) => (
                        <li
                          key={c.id}
                          className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3"
                        >
                          <span className="min-w-0">
                            <span className="block truncate text-sm font-medium text-slate-900">
                              {c.violationType}
                            </span>
                            <span className="block truncate text-xs text-slate-500">
                              {c.location}
                            </span>
                          </span>
                          <span className="shrink-0 text-sm font-bold text-slate-900">
                            {formatIndianRupee(c.fineAmount)}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                      <span className="min-w-0 text-sm font-bold text-slate-900">
                        Total due
                      </span>
                      <span className="shrink-0 text-xl font-extrabold text-slate-900">
                        {formatIndianRupee(audit.totalDue)}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={sendOtp}
                      disabled={loading}
                      className="w-full rounded-2xl bg-[#2A52BE] px-6 py-3.5 text-sm font-bold text-white shadow-[0_10px_22px_-8px_rgba(42,82,190,0.7)] transition-colors hover:bg-[#2245a3] disabled:opacity-70"
                    >
                      {loading ? "Sending OTP..." : "Pay Now · OTP se secure"}
                    </button>
                  </div>
                ) : (
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-medium text-slate-900">
                    कोई pending challan नहीं — aapki gaadi compliant hai.
                  </div>
                )}

                <button
                  type="button"
                  onClick={reset}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-900 transition-colors hover:bg-slate-50"
                >
                  Dusri gaadi check करें
                </button>
              </div>
            )}

            {step === "otp" && (
              <form onSubmit={verifyOtp} className="space-y-4">
                <div className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                  <Lock className="h-4 w-4 shrink-0 text-[#2A52BE]" />
                  Payment ek protected step hai — mock OTP registered mobile
                  par bheja gaya.
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    value={otp}
                    onChange={(e) =>
                      setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                    }
                    placeholder="Enter 6-digit OTP"
                    inputMode="numeric"
                    aria-label="OTP"
                    className="h-16 flex-1 rounded-2xl border-2 border-slate-900 bg-white px-5 text-center font-mono text-lg font-extrabold tracking-[0.5em] text-slate-900 outline-none transition-colors placeholder:tracking-normal placeholder:font-semibold placeholder:text-slate-300 focus:border-[#2A52BE]"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="h-16 shrink-0 rounded-2xl bg-[#2A52BE] px-7 text-sm font-bold text-white shadow-[0_10px_22px_-8px_rgba(42,82,190,0.7)] transition-colors hover:bg-[#2245a3] disabled:opacity-70"
                  >
                    {loading ? "Verifying..." : "Verify OTP"}
                  </button>
                </div>
                <p className="text-xs font-semibold text-slate-500">
                  Demo OTP: 123456
                </p>
              </form>
            )}

            {step === "payment" && audit && (
              <div className="space-y-4">
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500">
                      Total payable
                    </p>
                    <p className="text-2xl font-extrabold text-slate-900">
                      {formatIndianRupee(audit.totalDue)}
                    </p>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-bold text-slate-500">
                    <ShieldCheck className="h-3 w-3" />
                    Verified session
                  </span>
                </div>
                <button
                  type="button"
                  onClick={payNow}
                  disabled={loading}
                  className="w-full rounded-2xl bg-[#2A52BE] px-6 py-4 text-base font-bold text-white shadow-[0_12px_26px_-10px_rgba(42,82,190,0.75)] transition-colors hover:bg-[#2245a3] disabled:opacity-70"
                >
                  {loading
                    ? "Processing..."
                    : `Pay ${formatIndianRupee(audit.totalDue)}`}
                </button>
              </div>
            )}

            {step === "success" && (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center">
                <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-emerald-500 text-white">
                  <CheckCircle2 className="h-6 w-6" />
                </span>
                <p className="mt-3 text-lg font-bold text-slate-900">
                  Payment successful
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Challan clear ho gaya — aapka health audit ab green hai.
                </p>
                <p className="mt-2 text-xs font-semibold text-slate-500">
                  Receipt ID: PS-2026-847291
                </p>
                <button
                  type="button"
                  onClick={reset}
                  className="mt-4 rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-900 transition-colors hover:bg-slate-50"
                >
                  Check another vehicle
                </button>
              </div>
            )}
          </div>

          {/* Trust footer */}
          <div className="grid gap-1 rounded-b-[28px] border-t border-slate-100 bg-slate-50 px-6 py-4 text-xs text-slate-500 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:px-7">
            <span className="inline-flex min-w-0 items-center gap-1.5">
              <Lock className="h-3.5 w-3.5 shrink-0" />
              Owner data masked · Rate-limit &amp; bot protection simulated ·
              Mock data only
            </span>
            <span className="shrink-0 sm:text-right">
              Parivahan Saathi · Citizen-first experience
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;