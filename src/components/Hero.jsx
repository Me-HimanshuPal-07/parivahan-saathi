import { useEffect, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  FileText,
  Gauge,
  Lock,
  Search,
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

const backgrounds = [
  "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=2200&q=85",
  "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=2200&q=85",
  "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=2200&q=85",
  "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=2200&q=85",
];

const SAMPLES = ["UP32EA1234", "DL01CD5678", "MH14EF9012", "KA05GH3456"];

const ICONS = {
  rc: <FileText className="h-5 w-5" />,
  insurance: <ShieldCheck className="h-5 w-5" />,
  pucc: <Leaf className="h-5 w-5" />,
  challan: <IndianRupee className="h-5 w-5" />,
};

// Mapped to the project's #2A52BE theme (no CSS variables — plain hex/Tailwind).
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
  const [background, setBackground] = useState(0);
  const [step, setStep] = useState("input");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [touched, setTouched] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [audit, setAudit] = useState(null);

  const normalizedInput = normalizeVehicleNumber(vehicleNumber);
  const isValidPlate = PLATE_PATTERN.test(normalizedInput);

  useEffect(() => {
    const timer = setInterval(() => {
      setBackground((current) => (current + 1) % backgrounds.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

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
    <section className="hero-full-bleed relative isolate overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        {backgrounds.map((image, index) => (
          <div
            key={image}
            aria-hidden="true"
            className={
              "absolute inset-0 bg-cover bg-center transition-opacity duration-1000 " +
              (index === background ? "opacity-100" : "opacity-0")
            }
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}
        <div className="absolute inset-0 bg-[#0B142B]/70" aria-hidden="true" />
        <div
          className="absolute inset-0 bg-linear-to-b from-[#0B142B]/80 via-[#0B142B]/40 to-[#0B142B]/85"
          aria-hidden="true"
        />
      </div>

      <div className="mx-auto w-full max-w-5xl px-4 py-12 sm:py-16">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur">
          <Sparkles className="h-3.5 w-3.5 shrink-0" />
          एक number · पूरी gaadi की report
        </span>

        <h1 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
          Gaadi ka पूरा Health Audit,
          <br />
          <span className="text-white/75">एक ही जगह पर।</span>
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
          Challan, Insurance, PUCC और RC — अलग-अलग portal नहीं। Vehicle number
          डालें और 3 second में साफ़ traffic-light status पाएँ। Login ki
          zaroorat nahi.
        </p>

        {/* Audit hub */}
        <div className="mt-8 overflow-hidden rounded-3xl border border-[#e4eaf2] bg-white/95 shadow-2xl backdrop-blur-xl">
          <div className="grid gap-3 border-b border-[#e4eaf2] p-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:p-6">
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                All-in-one health audit
              </p>
              <h2 className="mt-0.5 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                {step === "input"
                  ? "Apni gaadi ka status check करें"
                  : `Report · ${audit?.vehicleNumber ?? ""}`}
              </h2>
            </div>
            {step !== "input" && audit ? (
              <span
                className={
                  "inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold " +
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
              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#e4eaf2] bg-slate-100 px-3 py-1.5 text-[11px] font-semibold text-slate-500">
                <Lock className="h-3 w-3" />
                No login · No captcha
              </span>
            )}
          </div>

          <div className="p-5 sm:p-6">
            {step === "input" && (
              <div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    runAudit();
                  }}
                  className="space-y-2"
                  noValidate
                >
                  <label
                    htmlFor="vehicle"
                    className="block text-sm font-semibold text-slate-900"
                  >
                    Vehicle Registration Number
                  </label>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <div className="relative flex-1">
                      <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                      <input
                        id="vehicle"
                        value={vehicleNumber}
                        onChange={(e) => {
                          setVehicleNumber(e.target.value.toUpperCase());
                          setTouched(false);
                        }}
                        placeholder="जैसे UP32EA1234"
                        autoCapitalize="characters"
                        autoComplete="off"
                        autoCorrect="off"
                        spellCheck={false}
                        aria-label="Vehicle registration number"
                        className="h-14 w-full rounded-2xl border-2 border-slate-200 bg-white pl-12 pr-5 text-base font-semibold uppercase tracking-[0.14em] outline-none transition placeholder:font-medium placeholder:normal-case placeholder:tracking-normal focus:border-[#2A52BE] focus:ring-4 focus:ring-blue-100"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="h-14 shrink-0 rounded-2xl bg-[#2A52BE] px-6 text-base font-semibold text-white shadow-md transition-colors hover:bg-[#2245a3] disabled:opacity-70"
                    >
                      {loading ? "Checking..." : "Full Check करें"}
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

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-medium text-slate-500">
                    Try:
                  </span>
                  {SAMPLES.map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => runAudit(num)}
                      className="rounded-full border border-[#2A52BE]/20 bg-[#2A52BE]/5 px-3 py-1.5 text-xs font-semibold tracking-wide text-[#2A52BE] transition-colors hover:bg-[#2A52BE]/10"
                    >
                      {num}
                    </button>
                  ))}
                </div>

                <div className="mt-5 grid gap-2 sm:grid-cols-4">
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
                      className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-2 rounded-xl border border-[#e4eaf2] bg-slate-50 px-3 py-2.5 text-xs font-semibold text-slate-500"
                    >
                      <span className="shrink-0 text-[#2A52BE]">
                        {chip.icon}
                      </span>
                      <span className="min-w-0 truncate">{chip.label}</span>
                    </div>
                  ))}
                </div>

                <p className="mt-4 text-sm font-medium text-slate-500">
                  चार portal, चार form — अब बस एक input में पूरी जानकारी।
                </p>
              </div>
            )}

            {step === "audit" && audit && (
              <div className="space-y-4">
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-2xl border border-[#e4eaf2] bg-slate-50 p-4">
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                      Owner (masked for privacy)
                    </p>
                    <p className="truncate text-base font-bold text-slate-900">
                      {audit.ownerMasked}
                    </p>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-[#e4eaf2] bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-500">
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
                        className={"rounded-2xl border bg-white p-4 " + s.ring}
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
                              "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold " +
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
                  <div className="space-y-3 rounded-2xl border border-[#e4eaf2] bg-slate-50 p-4">
                    <ul className="space-y-2">
                      {audit.challans.map((c) => (
                        <li
                          key={c.id}
                          className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-[#e4eaf2] bg-white px-4 py-3"
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
                      <span className="min-w-0 text-sm font-semibold text-slate-900">
                        Total due
                      </span>
                      <span className="shrink-0 text-xl font-bold text-slate-900">
                        {formatIndianRupee(audit.totalDue)}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={sendOtp}
                      disabled={loading}
                      className="w-full rounded-2xl bg-[#2A52BE] px-6 py-3.5 text-sm font-semibold text-white shadow-md transition-colors hover:bg-[#2245a3] disabled:opacity-70"
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
                  className="w-full rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-50"
                >
                  Dusri gaadi check करें
                </button>
              </div>
            )}

            {step === "otp" && (
              <form onSubmit={verifyOtp} className="space-y-3">
                <p className="inline-flex items-center gap-1.5 text-sm text-slate-500">
                  <Lock className="h-4 w-4 shrink-0" />
                  Payment ek protected step hai — mock OTP registered mobile par
                  bheja gaya.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    value={otp}
                    onChange={(e) =>
                      setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                    }
                    placeholder="Enter 6-digit OTP"
                    inputMode="numeric"
                    aria-label="OTP"
                    className="h-14 flex-1 rounded-xl border-2 border-slate-200 bg-white px-5 text-center text-lg font-semibold tracking-[0.4em] outline-none transition placeholder:tracking-normal focus:border-[#2A52BE]"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="h-14 shrink-0 rounded-2xl bg-[#2A52BE] px-6 text-sm font-semibold text-white shadow-md transition-colors hover:bg-[#2245a3] disabled:opacity-70"
                  >
                    {loading ? "Verifying..." : "Verify OTP"}
                  </button>
                </div>
                <p className="text-xs font-medium text-slate-500">
                  Demo OTP: 123456
                </p>
              </form>
            )}

            {step === "payment" && audit && (
              <div className="space-y-4">
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-2xl border border-[#e4eaf2] bg-slate-50 p-4">
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                      Total payable
                    </p>
                    <p className="text-2xl font-bold text-slate-900">
                      {formatIndianRupee(audit.totalDue)}
                    </p>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-[#e4eaf2] bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-500">
                    <ShieldCheck className="h-3 w-3" />
                    Verified session
                  </span>
                </div>
                <button
                  type="button"
                  onClick={payNow}
                  disabled={loading}
                  className="w-full rounded-2xl bg-[#2A52BE] px-6 py-4 text-base font-semibold text-white shadow-md transition-colors hover:bg-[#2245a3] disabled:opacity-70"
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
                  className="mt-4 rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-50"
                >
                  Check another vehicle
                </button>
              </div>
            )}
          </div>

          {/* Trust footer */}
          <div className="grid gap-1 border-t border-[#e4eaf2] bg-slate-50 px-5 py-4 text-xs text-slate-500 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
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

        {/* Carousel indicators */}
        <div className="mt-6 flex items-center gap-2">
          {backgrounds.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => setBackground(index)}
              aria-label={`Show background ${index + 1}`}
              className={
                "h-1.5 rounded-full transition-all " +
                (index === background ? "w-8 bg-white" : "w-2 bg-white/40")
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;
