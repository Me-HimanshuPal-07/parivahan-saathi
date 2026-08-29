import React, { useEffect, useState } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  ArrowUpRight,
  Calendar,
  Check,
  CheckCircle2,
  Clock3,
  Copy,
  CreditCard,
  FileText,
  Gauge,
  IndianRupee,
  Leaf,
  Lock,
  MapPin,
  RefreshCw,
  ScanFace,
  Search,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Zap,
  X,
  UserCheck,
  LogIn,
  KeyRound,
  ChevronRight,
  Fuel,
  Award,
} from "lucide-react";
import { normalizeVehicleNumber, MOCK_SYSTEM_DB } from "../data/mockSystem";

const SAMPLES = ["UP16BT7788", "DL1420240098765"];

// Status styling mapping
const STATUS_STYLES = {
  clear: {
    chip: "border-emerald-200 bg-emerald-50 text-emerald-700",
    dot: "bg-emerald-500",
    ring: "hover:border-emerald-300",
    label: "All clear",
  },
  attention: {
    chip: "border-amber-200 bg-amber-50 text-amber-700",
    dot: "bg-amber-500",
    ring: "hover:border-amber-300",
    label: "Action soon",
  },
  concern: {
    chip: "border-rose-200 bg-rose-50 text-rose-700",
    dot: "bg-rose-500",
    ring: "hover:border-rose-300",
    label: "Needs action",
  },
};

// Complete 9-Point Vehicle Icons
const METRIC_ICONS = {
  rc: FileText,
  pucc: Leaf,
  insurance: ShieldCheck,
  challan: IndianRupee,
  roadtax: MapPin,
  fitness: Activity,
  permit: ArrowUpRight,
  chassis: Lock,
  fuel: Fuel,
};

// Complete 5-Point DL Icons
const DL_METRIC_ICONS = {
  validity: Calendar,
  category: Gauge,
  badge: Award,
  endorsement: CheckCircle2,
  biometrics: ScanFace,
};

// What each protected action needs, shown consistently across the OTP
// step, and the in-sheet action/success screens — all rendered inside
// the SAME drawer the user is already looking at.
const INTENT_COPY = {
  challan_settlement: {
    authMessage: (amount) => `Verify to pay ₹${amount} challan.`,
    sheetEyebrow: "Checkout",
    sheetTitle: "Review challan payment",
    successTitle: "Challan settled successfully",
    successDetail: "Your account is logged in and record cleared.",
  },
  dl_renew: {
    authMessage: () => "Verify to renew Driving Licence.",
    sheetEyebrow: "DL renewal",
    sheetTitle: "Confirm renewal application",
    successTitle: "DL renewal application submitted",
    successDetail: "Your account is logged in and the renewal is now in progress.",
  },
};

const getStatus = (status) =>
  STATUS_STYLES[status] || STATUS_STYLES.clear;

// Skeleton placeholder for a single audit metric while its own
// (simulated) government-server call is still in flight. Every item
// fetches independently and in parallel — this is what an item looks
// like before its own response has arrived.
function MetricSkeletonCard() {
  return (
    <div className="animate-pulse rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <div className="h-7 w-7 rounded-lg bg-slate-100" />
        <span className="h-1.5 w-1.5 rounded-full bg-slate-200" />
      </div>
      <div className="mt-2.5 h-2.5 w-4/5 rounded bg-slate-100" />
      <div className="mt-1.5 h-2 w-2/5 rounded bg-slate-100" />
      <div className="mt-1.5 h-2 w-3/5 rounded bg-slate-100" />
    </div>
  );
}

// Small "verified" burst used right after OTP success — a filled green
// check that scales/fades in, with a soft pulse ring behind it. Mirrors
// the same emerald ShieldCheck language used on the final success screen.
function AnimatedSuccessCheck({ label }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setShow(true), 30);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-6 text-center">
      <div className="relative flex h-16 w-16 items-center justify-center">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-30" />
        <span
          className={`relative flex h-16 w-16 items-center justify-center rounded-full border border-emerald-200 bg-emerald-100 text-emerald-600 transition-all duration-500 ease-out ${
            show ? "scale-100 opacity-100" : "scale-50 opacity-0"
          }`}
        >
          <ShieldCheck className="h-8 w-8" />
        </span>
      </div>
      <div>
        <h3 className="text-base font-black text-slate-950">Verified</h3>
        {label && <p className="mt-1 text-xs text-slate-500">{label}</p>}
      </div>
    </div>
  );
}

/* =========================================================================
   RESPONSIVE RESULT SHEET WRAPPER
   ========================================================================= */
function ResponsiveResultSheet({
  title,
  eyebrow,
  onClose,
  closeLabel = "Back to search",
  children,
  dismissible = true,
}) {
  // Must match the app shell's fixed bottom nav bar height (the
  // Saathi / Driver services / Vehicle / Learn Hub / Help & support
  // strip). Update this if that bar's height ever changes.
  const MOBILE_BOTTOM_NAV_HEIGHT = 64;
  const MOBILE_BREAKPOINT = 640; // Tailwind's `sm`

  // On mobile we track the real visible viewport (visualViewport, which
  // shrinks live when the keyboard opens — unlike dvh) minus the bottom
  // nav bar's height, and size the sheet to exactly that. This keeps the
  // sheet's bottom edge — and any buttons near it — always above both
  // the keyboard AND the bottom nav bar, never hidden behind either.
  // On desktop/tablet (sm and up) this is skipped entirely; the sm:
  // classes below take over unmodified.
  const [availableHeight, setAvailableHeight] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined" || !window.visualViewport) return;
    const vv = window.visualViewport;
    const update = () => {
      const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
      setAvailableHeight(isMobile ? vv.height - MOBILE_BOTTOM_NAV_HEIGHT : null);
    };
    update();
    vv.addEventListener("resize", update);
    vv.addEventListener("scroll", update);
    window.addEventListener("resize", update);
    return () => {
      vv.removeEventListener("resize", update);
      vv.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      className="fixed inset-x-0 top-0 bottom-16 z-[9999] flex items-end justify-center bg-slate-950/40 p-0 backdrop-blur-[2px] sm:inset-0 sm:items-center sm:p-6"
      style={availableHeight ? { height: `${Math.max(availableHeight, 0)}px` } : undefined}
      onClick={(event) => {
        if (dismissible && event.target === event.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="hero-result-title"
        className="flex min-h-0 max-h-[60dvh] w-full flex-col overflow-hidden rounded-t-[26px] border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.24)] sm:max-h-[86dvh] sm:max-w-3xl sm:rounded-[28px]"
        style={
          availableHeight
            ? { maxHeight: `${Math.max(Math.round(availableHeight * 0.6), 0)}px` }
            : undefined
        }
      >
        <div className="mx-auto mt-2.5 h-1 w-10 shrink-0 rounded-full bg-slate-300 sm:hidden" />

        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-slate-100 px-4 py-3.5 sm:px-6 sm:py-4">
          <div className="min-w-0">
            <p className="text-[9px] font-black uppercase tracking-[0.16em] text-blue-600">
              {eyebrow}
            </p>
            <h2
              id="hero-result-title"
              className="mt-0.5 truncate text-base font-black text-slate-950 sm:text-lg"
            >
              {title}
            </h2>
          </div>

          {dismissible && (
            <button
              type="button"
              onClick={onClose}
              aria-label={closeLabel}
              className="inline-flex shrink-0 items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-bold text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
            >
              <span className="hidden sm:inline">{closeLabel}</span>
              <X className="h-4 w-4 sm:hidden" />
            </button>
          )}
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-3.5 sm:p-6">
          {children}
        </div>
      </div>
    </div>
  );
}

function StatusChip({ status }) {
  const style = getStatus(status);
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-black ${style.chip}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
      {style.label}
    </span>
  );
}

/* =========================================================================
   COMPLETE 9-POINT VEHICLE AUDIT RESULT
   ========================================================================= */
function VehicleResult({ data, copied, onCopy, onProtectedAction, onReset, loading, metricsLoaded = {} }) {
  const challanAmount =
    data?.activeChallan?.amount != null ? Number(data.activeChallan.amount) : 0;

  // Complete 9-point default metrics fallback
  const complete9Metrics = {
    rc: { label: "1. RC Validation Status", headline: "Active", detail: "Registered with Home RTO", status: "clear" },
    pucc: { label: "2. PUC Emission Certificate", headline: "Valid", detail: "Expires in 184 Days", status: "clear" },
    insurance: { label: "3. Third-Party Insurance", headline: "Live", detail: "Policy Active till Dec 2026", status: "clear" },
    challan: { label: "4. Pending Traffic Challans", headline: challanAmount > 0 ? `₹${challanAmount}` : "0 Clear", detail: challanAmount > 0 ? "Pending payment" : "No pending violations", status: challanAmount > 0 ? "concern" : "clear" },
    roadtax: { label: "5. Road Tax Compliance", headline: "Paid", detail: "LTT Paid (One Time)", status: "clear" },
    fitness: { label: "6. Fitness Certificate", headline: "Valid", detail: "Valid up to 2030", status: "clear" },
    permit: { label: "7. Commercial Permit Status", headline: "N/A", detail: "Private Passenger Vehicle", status: "clear" },
    chassis: { label: "8. Chassis & Engine Match", headline: "Verified", detail: "Digital Hash Matched", status: "clear" },
    fuel: { label: "9. Bio-Fuel / Fuel Tag", headline: "BS6 Petrol", detail: "Compliant with E20 Norms", status: "clear" },
    ...(data.metrics || {}),
  };

  // The challan banner/action is only safe to offer once the challan
  // server itself has actually responded — not the other 8, and not a
  // guess made while its own call is still in flight.
  const challanResolved = metricsLoaded.challan === true;

  return (
    <div className="space-y-3.5">
      <div className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3.5">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-200 bg-blue-100 font-mono text-xs font-black text-blue-700">
            RC
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <p className="truncate font-mono text-base font-black text-slate-950">
                {data.vehicleNumber}
              </p>
              <button
                type="button"
                onClick={() => onCopy(data.vehicleNumber)}
                aria-label={copied ? "Token copied" : "Copy token"}
                className="rounded p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-800"
              >
                {copied ? (
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
              </button>
            </div>
            <p className="truncate text-[11px] text-slate-500">
              Owner:{" "}
              <span className="font-mono font-bold text-slate-700">
                {data.ownerMasked || "C****** S****"}
              </span>
            </p>
          </div>
        </div>

        <StatusChip status={data.overallStatus} />
      </div>

      <div className="flex items-center justify-between px-1">
        <p className="text-[11px] font-black uppercase tracking-wider text-slate-500">
          Complete 9-Point Compliance Checklist
        </p>
        <span className="text-[10px] font-bold text-emerald-600">Verified Vahan DB</span>
      </div>

      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
        {Object.entries(complete9Metrics).map(([key, item]) => {
          const Icon = METRIC_ICONS[key] || FileText;
          const style = getStatus(item?.status);
          const isLoaded = metricsLoaded[key] === true;

          if (!isLoaded) {
            return <MetricSkeletonCard key={key} />;
          }

          return (
            <div
              key={key}
              className={`rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition duration-300 ${style.ring}`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-50 text-blue-600">
                  <Icon className="h-3.5 w-3.5" />
                </div>
                <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
              </div>
              <p className="mt-2 text-xs font-black text-slate-900">
                {item?.label || key}
              </p>
              <p className="mt-0.5 text-[10px] font-bold text-slate-600">
                {item?.headline || style.label}
              </p>
              <p className="mt-1 text-[10px] leading-relaxed text-slate-500">
                {item?.detail}
              </p>
            </div>
          );
        })}
      </div>

      {data.activeChallan && challanResolved && (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-3.5 sm:p-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-2">
              <ShieldAlert className="h-5 w-5 shrink-0 text-rose-600" />
              <div className="min-w-0">
                <p className="text-xs font-black text-rose-900">
                  Pending challan detected
                </p>
                <p className="truncate text-[11px] text-rose-800">
                  {data.activeChallan.reasonEn}
                </p>
              </div>
            </div>
            <p className="shrink-0 font-mono text-lg font-black text-slate-950">
              ₹{challanAmount.toLocaleString("en-IN")}
            </p>
          </div>

          <button
            type="button"
            onClick={() => onProtectedAction("challan_settlement")}
            disabled={loading}
            className="mt-3 inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 text-xs font-black text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <CreditCard className="h-4 w-4" />
            {loading ? "Starting secure flow…" : "Settle challan now"}
          </button>
        </div>
      )}

      {data.activeChallan && !challanResolved && (
        <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3.5 py-3">
          <Gauge className="h-4 w-4 animate-spin text-slate-400" />
          <p className="text-[11px] font-bold text-slate-500">
            Checking challan status with e-Challan server…
          </p>
        </div>
      )}

      <button
        type="button"
        onClick={onReset}
        className="inline-flex items-center gap-2 px-1 text-xs font-bold text-slate-500 hover:text-slate-900"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Search another number
      </button>
    </div>
  );
}

/* =========================================================================
   COMPLETE 5-POINT DL AUDIT RESULT
   ========================================================================= */
function DriverResult({ data, onProtectedAction, onReset, loading, metricsLoaded = {} }) {
  const complete5DlMetrics = {
    validity: { label: "1. Licence Validity Desk", headline: data.expiryDate || "Valid till 2035", detail: "Non-Transport Active", status: "clear" },
    category: { label: "2. Vehicle Class Auth", headline: data.licenceClass || "LMV / MCWG", detail: "Car & Motorbike Approved", status: "clear" },
    badge: { label: "3. Commercial Badge", headline: "Not Issued", detail: "Private Driver Record", status: "clear" },
    endorsement: { label: "4. RTO Endorsement", headline: "Clear Record", detail: "No Penalty Points", status: "clear" },
    biometrics: { label: "5. Digital Biometrics", headline: "Verified", detail: "Sarathi Bio-linked", status: "clear" },
  };

  const allResolved = Object.keys(complete5DlMetrics).every((key) => metricsLoaded[key] === true);

  return (
    <div className="space-y-3.5">
      <div className="rounded-2xl border border-purple-200 bg-purple-50/70 p-4">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-purple-200 bg-white text-purple-700">
            <ScanFace className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <p className="text-[9px] font-black uppercase tracking-[0.14em] text-purple-700">
              Driving licence audit
            </p>
            <p className="mt-1 truncate font-mono text-sm font-black text-slate-950">
              {data.dlNumber}
            </p>
            <p className="mt-1 text-[11px] font-bold text-emerald-700">
              {data.enforcementStatus || "Verified active"}
            </p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-purple-100 pt-3">
          <div>
            <p className="text-[9px] font-black uppercase tracking-wider text-slate-400">
              Holder
            </p>
            <p className="mt-0.5 text-xs font-extrabold text-slate-900">
              {data.ownerName || "Masked Holder"}
            </p>
          </div>
          <div>
            <p className="text-[9px] font-black uppercase tracking-wider text-slate-400">
              Class
            </p>
            <p className="mt-0.5 text-xs font-extrabold text-slate-900">
              {data.licenceClass || "LMV / MCWG"}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between px-1">
        <p className="text-[11px] font-black uppercase tracking-wider text-slate-500">
          Complete 5-Point DL Checklist
        </p>
        <span className="text-[10px] font-bold text-purple-600">Sarathi Registry</span>
      </div>

      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {Object.entries(complete5DlMetrics).map(([key, item]) => {
          const Icon = DL_METRIC_ICONS[key] || CheckCircle2;
          const isLoaded = metricsLoaded[key] === true;

          if (!isLoaded) {
            return <MetricSkeletonCard key={key} />;
          }

          return (
            <div
              key={key}
              className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition duration-300"
            >
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                  <Icon className="h-3.5 w-3.5" />
                </div>
                <div>
                  <p className="text-xs font-black text-slate-900">{item.label}</p>
                  <p className="text-[10px] font-bold text-emerald-700">{item.headline}</p>
                </div>
              </div>
              <p className="mt-1 text-[10px] text-slate-500">{item.detail}</p>
            </div>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => onProtectedAction("dl_renew")}
        disabled={loading || !allResolved}
        className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 text-xs font-black text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading
          ? "Starting secure flow…"
          : allResolved
            ? "Renew / Upgrade DL"
            : "Checking with Sarathi…"}
        {!loading && allResolved && <ArrowUpRight className="h-4 w-4" />}
      </button>

      <button
        type="button"
        onClick={onReset}
        className="inline-flex items-center gap-2 px-1 text-xs font-bold text-slate-500 hover:text-slate-900"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Search another number
      </button>
    </div>
  );
}

/* =========================================================================
   MAIN HERO COMPONENT
   ========================================================================= */
export function Hero({
  setCurrentNode,
  changeView,
  onStartService,
  onAuthenticated,
  onActionCompleted,
  onGoToAccount,
  language,
  isAuthenticated = false, // Current auth state from parent app
}) {
  const [step, setStep] = useState("input");
  const [inputValue, setInputValue] = useState("");
  const [touched, setTouched] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeVehicleData, setActiveVehicleData] = useState(null);
  const [activeDriverData, setActiveDriverData] = useState(null);
  const [copied, setCopied] = useState(false);
  const [settledAmount, setSettledAmount] = useState(0);

  // Tracks which protected action (challan payment / DL renewal) is in
  // flight, so once OTP is verified — right here, inside the same
  // drawer the user already opened — we know exactly which step to
  // resume next. The user never leaves this sheet.
  const [activeIntentType, setActiveIntentType] = useState(null);

  // Which sheet the OTP step should "return to" on cancel — vehicle or
  // dl — so Cancel goes back to the audit result, not to a dead end.
  const [otpReturnStep, setOtpReturnStep] = useState("vehicle");

  // Per-item loading state for the 9-point / 5-point checklist. In
  // production each of these comes from a different government server
  // (Vahan, e-Challan, Sarathi, PUCC registry, etc.), so they resolve
  // independently and in parallel — not one after another. This state
  // tracks which of those (simulated) calls have come back.
  const [metricsLoaded, setMetricsLoaded] = useState({});

  const cleanInput = normalizeVehicleNumber(inputValue);
  const isValidToken = cleanInput.length >= 8;
  const inputKind = cleanInput.startsWith("DL") ? "DL" : "vehicle";
  const isHindi = language === "hi";

  const challanAmount =
    activeVehicleData?.activeChallan?.amount != null
      ? Number(activeVehicleData.activeChallan.amount)
      : 0;

  const activeResult =
    step === "vehicle" ? activeVehicleData : step === "dl" ? activeDriverData : null;

  const activeIntentCopy = activeIntentType ? INTENT_COPY[activeIntentType] : null;

  // Fires a fresh, independent (simulated) request per checklist item as
  // soon as an audit result is shown. Each item gets its own random
  // delay and flips to "loaded" on its own timer — genuinely parallel,
  // not staggered-but-sequential — mirroring separate async calls out
  // to separate government registries.
  useEffect(() => {
    if (step !== "vehicle" && step !== "dl") return;

    const keys = step === "vehicle" ? Object.keys(METRIC_ICONS) : Object.keys(DL_METRIC_ICONS);
    const initial = {};
    keys.forEach((key) => {
      initial[key] = false;
    });
    setMetricsLoaded(initial);

    const timers = keys.map((key) =>
      window.setTimeout(
        () => {
          setMetricsLoaded((current) => ({ ...current, [key]: true }));
        },
        350 + Math.random() * 1400,
      ),
    );

    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [step, activeVehicleData, activeDriverData]);

  useEffect(() => {
    const isSheetOpen = step !== "input";
    document.body.style.overflow = isSheetOpen ? "hidden" : "";
    // Lets any global stylesheet hide/dim the persistent bottom nav bar
    // and the "AI Saathi" chat FAB while a sheet is open, so they can't
    // float on top of the drawer's own buttons on short mobile screens.
    document.body.classList.toggle("app-sheet-open", isSheetOpen);

    const handleEscape = (event) => {
      if (event.key !== "Escape" || !isSheetOpen) return;
      if (step === "otp" || step === "otp_success" || step === "action") return;
      if (step === "action_success") {
        finishAndGoToAccount();
        return;
      }
      returnToSearch();
    };

    if (isSheetOpen) window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("app-sheet-open");
      window.removeEventListener("keydown", handleEscape);
    };
  }, [step]);

  // Auto-advance the brief "Verified" checkmark screen into the actual
  // action screen — this is a transient confirmation beat, not a
  // dead-end the user needs a button to escape.
  useEffect(() => {
    if (step !== "otp_success") return;
    const t = window.setTimeout(() => setStep("action"), 900);
    return () => window.clearTimeout(t);
  }, [step]);

  async function handleCopy(text) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  function runGlobalAudit(overrideValue) {
    const targetToken = normalizeVehicleNumber(overrideValue ?? inputValue);

    setTouched(true);
    if (targetToken.length < 8) return;

    setInputValue(targetToken);
    setLoading(true);

    window.setTimeout(() => {
      const driverMatch = MOCK_SYSTEM_DB?.sarathiRegistry?.[targetToken];
      const vehicleMatch = MOCK_SYSTEM_DB?.vahanRegistry?.[targetToken];
      const isDL = targetToken.startsWith("DL");

      setLoading(false);

      if (isDL) {
        setActiveVehicleData(null);
        setActiveDriverData(
          driverMatch || {
            dlNumber: targetToken,
            licenceClass: "LMV / MCWG",
            expiryDate: "Verification pending",
            enforcementStatus: "Demo credential",
            ownerName: "Masked Holder",
          },
        );
        setStep("dl");
        return;
      }

      setActiveDriverData(null);
      setActiveVehicleData(
        vehicleMatch || {
          vehicleNumber: targetToken,
          ownerMasked: "C****** S****",
          overallStatus: "clear",
          isCleanPlaceholder: true,
          metrics: {},
        },
      );
      setStep("vehicle");
    }, 450);
  }

  // Closes out Hero's own local guest-search state. If the user is
  // already authenticated (e.g. they just verified OTP mid-action and
  // then dismissed the sheet before finishing), we don't want to strand
  // them back on the raw guest homepage behind this drawer — hand off
  // to the account shell instead, same as finishAndGoToAccount does.
  function returnToSearch() {
    setLoading(false);
    setStep("input");
    setOtp("");
    setOtpError("");
    setActiveVehicleData(null);
    setActiveDriverData(null);
    setSettledAmount(0);
    setActiveIntentType(null);
    setMetricsLoaded({});

    if (isAuthenticated) {
      onGoToAccount?.();
    }
  }

  // Called from the success screen's primary action / close. Clears out
  // Hero's own guest-search state (same as returnToSearch) and then hands
  // control up to the app shell to switch into the Account Dashboard —
  // this is the one moment Hero is allowed to navigate away.
  function finishAndGoToAccount() {
    setLoading(false);
    setStep("input");
    setOtp("");
    setOtpError("");
    setActiveVehicleData(null);
    setActiveDriverData(null);
    setSettledAmount(0);
    setActiveIntentType(null);
    setMetricsLoaded({});
    onGoToAccount?.();
  }

  /* -------------------------------------------------------------------------
     ACTION TRIGGER — INLINE, INSIDE THE SAME DRAWER
     Every protected action (challan payment, DL renewal) is handled the
     same way: remember which intent was requested, then either jump
     straight to the in-sheet "action" step (already authenticated) or
     move straight to the in-sheet "otp" step. No separate banner, no
     separate popup — verification is just the next screen inside the
     same audit drawer the user already has open, and completing it
     also logs them into their account.
     ------------------------------------------------------------------------- */
  function handleProtectedAction(intentType) {
    setActiveIntentType(intentType);
    setOtpReturnStep(step); // remember whether we came from "vehicle" or "dl"

    // If user is already authenticated, go straight to the in-sheet action.
    if (isAuthenticated) {
      setStep("action");
      return;
    }

    // Move straight to the in-drawer OTP step — same sheet, next screen.
    setOtp("");
    setOtpError("");
    setStep("otp");
  }

  function verifyOtp(event) {
    event.preventDefault();

    if (otp !== "123456") {
      setOtpError("Incorrect code. Use demo OTP 123456.");
      return;
    }

    setOtpError("");
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);

      if (onAuthenticated) {
        // Tell the app which record this session belongs to and which
        // action is still waiting to be finished — AccountDashboard's
        // home panel uses `pendingAction` to show a "continue where you
        // left off" resume card once the user gets there.
        const pendingAction =
          activeIntentType === "challan_settlement"
            ? {
                type: "challan_settlement",
                vehicleNumber: activeVehicleData?.vehicleNumber,
                amount: challanAmount,
              }
            : activeIntentType === "dl_renew"
              ? {
                  type: "dl_renew",
                  dlNumber: activeDriverData?.dlNumber,
                }
              : null;

        onAuthenticated({
          profile: {
            // Real name resolves via AccountDashboard's own fallback
            // chain (ledger lookup by userId, then a generic default) —
            // don't hardcode a display name here, or it will always win
            // over the actual citizen record.
            verificationStatus: "Verified",
          },
          authMethod: "otp",
          isNewUser: false,
          userId: activeVehicleData?.ownerUserId || activeDriverData?.ownerUserId || undefined,
          pendingAction,
        });
      }

      // Now on the secured session. We deliberately do NOT navigate away
      // here — resume exactly where the user left off (this same drawer).
      // Show a brief "Verified" confirmation first, then land on the
      // action screen. activeIntentType was set back in
      // handleProtectedAction, so we already know what to complete.
      setStep("otp_success");
    }, 450);
  }

  function completeChallanPayment() {
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      setSettledAmount(challanAmount);
      const paidVehicleNumber = activeVehicleData?.vehicleNumber;
      setActiveVehicleData((current) =>
        current
          ? { ...current, overallStatus: "clear", activeChallan: null }
          : current,
      );
      // Tell the app shell right now — not when the user later taps
      // "Back to main screen" — so the account shell (and any other
      // screen reading shared session/ledger state) reflects this the
      // instant it actually happens, not a stale "still pending" state.
      onActionCompleted?.({
        type: "challan_settlement",
        vehicleNumber: paidVehicleNumber,
      });
      setStep("action_success");
    }, 750);
  }

  function completeDlRenewal() {
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      const renewedDlNumber = activeDriverData?.dlNumber;
      setActiveDriverData((current) =>
        current
          ? { ...current, enforcementStatus: "Renewal application submitted" }
          : current,
      );
      onActionCompleted?.({
        type: "dl_renew",
        dlNumber: renewedDlNumber,
      });
      setStep("action_success");
    }, 750);
  }

  function goToLearnHub(node) {
    if (setCurrentNode && changeView) {
      setCurrentNode(node);
      changeView("learn_hub");
      return;
    }
    onStartService?.(node);
  }

  // Once the user is authenticated, dismissing the mid-action sheets
  // (backdrop tap / X / Cancel) should never dump them back on the raw
  // guest homepage — send them to the account shell instead, same as a
  // completed action would. While still a guest, dismissing just steps
  // back to the audit result sheet as before.
  function closeActionSheet(fallbackStep) {
    if (isAuthenticated) {
      finishAndGoToAccount();
      return;
    }
    setStep(fallbackStep);
  }

  const resultTitle =
    step === "vehicle"
      ? `${activeVehicleData?.vehicleNumber || inputValue} · Vehicle status`
      : step === "dl"
        ? `${activeDriverData?.dlNumber || inputValue} · DL status`
        : step === "otp"
          ? `${otpReturnStep === "dl" ? activeDriverData?.dlNumber : activeVehicleData?.vehicleNumber} · Verify to continue`
          : step === "otp_success"
            ? "Verified"
            : step === "action"
              ? activeIntentCopy?.sheetTitle || "Complete action"
              : activeIntentCopy?.successTitle || "Payment complete";

  const resultEyebrow =
    step === "vehicle"
      ? "Vehicle audit"
      : step === "dl"
        ? "Driver audit"
        : step === "otp"
          ? otpReturnStep === "dl"
            ? "Driver audit"
            : "Vehicle audit"
          : step === "otp_success"
            ? "Success"
            : step === "action"
              ? activeIntentCopy?.sheetEyebrow
              : "Completed";

  return (
    <section
      id="hero-lookup"
      className="relative isolate col-span-full overflow-hidden text-slate-900"
      data-step={step}
    >
      <div
        className="pointer-events-none absolute -right-24 -top-28 h-64 w-64 rounded-full bg-blue-200/30 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-36 -left-24 h-64 w-64 rounded-full bg-amber-100/40 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-6xl px-3.5 py-4 sm:px-7 sm:py-8 lg:px-9">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-white/85 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.12em] text-blue-700 shadow-sm backdrop-blur">
            <Sparkles className="h-3 w-3 text-amber-500" />
            {isHindi ? "एक नंबर · साफ़ जवाब" : "One number · clear answer"}
          </span>
          <span className="hidden text-[10px] font-bold text-slate-400 sm:inline">
            No sign-in required for audit
          </span>
        </div>

        <div className="mt-3 flex flex-col gap-4 sm:mt-5 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
          <div className="max-w-2xl">
            <p className="mb-1 text-[10px] font-black uppercase tracking-[0.15em] text-slate-500">
              Parivahan Saathi
            </p>
            <h1 className="text-[1.7rem] font-black leading-[1.06] tracking-[-0.045em] text-slate-950 sm:text-4xl lg:text-[3rem]">
              Check your{" "}
              <span className="text-blue-600">vehicle or DL</span> in seconds
            </h1>
            <p className="mt-2 max-w-xl text-xs leading-relaxed text-slate-600 sm:text-sm">
              Complete 9-point Vehicle audit & 5-point DL verification in one instant search.
            </p>
          </div>

          <div className="hidden max-w-sm grid-cols-2 gap-2 sm:grid">
            <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-3 shadow-sm backdrop-blur">
              <p className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-wider text-slate-400">
                <Lock className="h-3 w-3 text-blue-600" />
                Private Audit
              </p>
              <p className="mt-1 text-[11px] font-bold text-slate-700">
                Identifiers Masked
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-3 shadow-sm backdrop-blur">
              <p className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-wider text-slate-400">
                <Zap className="h-3 w-3 text-amber-500" />
                Instant Flow
              </p>
              <p className="mt-1 text-[11px] font-bold text-slate-700">
                Verify Inline On Action
              </p>
            </div>
          </div>
        </div>

        <div className="relative mt-4 overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)] sm:mt-6 sm:rounded-3xl">
          <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/75 px-3.5 py-3 sm:px-5">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-blue-200 bg-blue-100 text-blue-600">
                <Gauge className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.14em] text-blue-600">
                  Quick audit
                </p>
                <h2 className="text-sm font-black text-slate-900">
                  Find RC or DL record
                </h2>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[9px] font-bold text-slate-500">
              <ShieldCheck className="h-3 w-3 text-emerald-600" />
              Private lookup
            </span>
          </div>

          <div className="p-3.5 sm:p-6 lg:p-7">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                runGlobalAudit();
              }}
              className="space-y-2.5"
            >
              <div className="flex items-end justify-between gap-3">
                <div>
                  <label
                    htmlFor="tokenInput"
                    className="block text-xs font-black text-slate-900 sm:text-sm"
                  >
                    Vehicle number or DL number
                  </label>
                  <p id="tokenHelp" className="mt-0.5 text-[10px] text-slate-500">
                    {inputKind === "DL"
                      ? "DL detected · spaces and hyphens are okay"
                      : "RC detected · spaces and hyphens are okay"}
                  </p>
                </div>
                <span className="hidden text-[9px] font-black uppercase tracking-wider text-slate-400 sm:inline">
                  National Registry
                </span>
              </div>

              <div className="flex flex-col gap-2.5 sm:flex-row">
                <div className="relative flex-1">
                  <div className="flex items-stretch overflow-hidden rounded-xl border-2 border-slate-200 bg-slate-50 transition focus-within:border-blue-600 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-500/10 sm:rounded-2xl">
                    <div className="flex w-10 shrink-0 flex-col items-center justify-center border-r border-blue-500 bg-blue-600 text-[8px] font-black tracking-widest text-white sm:w-[52px] sm:text-[9px]">
                      <span>IND</span>
                      <span className="mt-0.5 text-[10px] sm:text-xs">🇮🇳</span>
                    </div>
                    <input
                      id="tokenInput"
                      value={inputValue}
                      onChange={(event) => {
                        setInputValue(event.target.value.toUpperCase());
                        setTouched(false);
                      }}
                      placeholder="e.g. UP16BT7788 / DL1420240098765"
                      autoCapitalize="characters"
                      autoComplete="off"
                      spellCheck="false"
                      aria-invalid={touched && !isValidToken}
                      aria-describedby="tokenHelp"
                      className="h-12 min-w-0 flex-1 bg-transparent px-3 font-mono text-sm font-black tracking-wide text-slate-900 outline-none placeholder:text-[11px] placeholder:text-slate-400 sm:h-14 sm:px-4 sm:text-lg"
                    />
                    {inputValue && (
                      <button
                        type="button"
                        onClick={() => setInputValue("")}
                        aria-label="Clear number"
                        className="px-2.5 text-slate-400 hover:text-slate-700 sm:px-3"
                      >
                        <RefreshCw className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                  {touched && !isValidToken && (
                    <p
                      role="alert"
                      className="mt-1.5 flex items-center gap-1 text-[10px] font-bold text-rose-600"
                    >
                      <AlertTriangle className="h-3 w-3" />
                      Enter at least 8 characters.
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  aria-busy={loading}
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-xs font-black text-white shadow-md shadow-blue-600/20 transition hover:bg-blue-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 sm:h-14 sm:w-auto sm:min-w-[150px] sm:rounded-2xl"
                >
                  {loading ? (
                    <>
                      <Gauge className="h-4 w-4 animate-spin" />
                      <span>Checking…</span>
                    </>
                  ) : (
                    <>
                      <ScanFace className="h-4 w-4" />
                      <span className="sm:hidden">Audit</span>
                      <span className="hidden sm:inline">Start audit</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-3 flex items-center gap-2">
              <p className="shrink-0 text-[10px] font-black text-slate-500">
                Try sample
              </p>
              <div className="grid min-w-0 flex-1 grid-cols-2 gap-2">
                {SAMPLES.map((sample) => (
                  <button
                    key={sample}
                    type="button"
                    onClick={() => runGlobalAudit(sample)}
                    className="flex min-w-0 items-center justify-between gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2 py-2 text-left transition hover:border-blue-300 hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  >
                    <span className="flex min-w-0 items-center gap-1.5">
                      <Search className="h-3 w-3 shrink-0 text-slate-400" />
                      <span className="truncate font-mono text-[10px] font-bold text-slate-700">
                        {sample}
                      </span>
                    </span>
                    <span className="shrink-0 rounded-full bg-white px-1.5 py-0.5 text-[8px] font-black text-slate-500">
                      {sample.startsWith("DL") ? "DL" : "RC"}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vehicle Modal with 9-Point Audit */}
      {step === "vehicle" && activeResult && (
        <ResponsiveResultSheet
          eyebrow="Vehicle audit"
          title={resultTitle}
          onClose={returnToSearch}
        >
          <VehicleResult
            data={activeResult}
            copied={copied}
            onCopy={handleCopy}
            onProtectedAction={handleProtectedAction}
            onReset={returnToSearch}
            loading={loading}
            metricsLoaded={metricsLoaded}
          />
        </ResponsiveResultSheet>
      )}

      {/* DL Modal with 5-Point Audit */}
      {step === "dl" && activeResult && (
        <ResponsiveResultSheet
          eyebrow="Driver audit"
          title={resultTitle}
          onClose={returnToSearch}
        >
          <DriverResult
            data={activeResult}
            onProtectedAction={handleProtectedAction}
            onReset={returnToSearch}
            loading={loading}
            metricsLoaded={metricsLoaded}
          />
        </ResponsiveResultSheet>
      )}

      {/* Inline verify step — same drawer as the audit result the user
          was just looking at (eyebrow/title carry over via otpReturnStep),
          so this reads as the next screen in one continuous action, not
          a separate login popup. Cancel returns to that same result. */}
      {step === "otp" && (
        <ResponsiveResultSheet
          eyebrow={resultEyebrow}
          title={resultTitle}
          onClose={() => setStep(otpReturnStep)}
          closeLabel="Cancel"
        >
          <form onSubmit={verifyOtp} className="mx-auto max-w-sm space-y-4">
            <div className="text-center">
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl border border-blue-200 bg-blue-50 text-blue-600">
                <Lock className="h-5 w-5" />
              </div>
              <h3 className="mt-3 text-base font-black text-slate-950">
                Verify to continue
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-500">
                {activeIntentCopy
                  ? activeIntentCopy.authMessage(challanAmount)
                  : "Enter OTP to continue this action."}{" "}
                This also logs you into your account.
              </p>
            </div>

            <div className="rounded-xl border border-blue-200 bg-blue-50 px-3 py-2 text-center text-[11px] font-bold text-blue-800">
              Demo OTP:{" "}
              <span className="font-mono text-blue-950 underline">123456</span>
            </div>

            <div>
              <input
                id="otpInput"
                value={otp}
                onChange={(event) => {
                  setOtp(event.target.value.replace(/\D/g, "").slice(0, 6));
                  setOtpError("");
                }}
                placeholder="123456"
                inputMode="numeric"
                autoFocus
                className="h-12 w-full rounded-xl border-2 border-slate-200 bg-slate-50 px-4 text-center font-mono text-lg font-black tracking-[0.45em] text-slate-900 outline-none focus:border-blue-600 focus:bg-white"
              />
              {otpError && (
                <p className="mt-1.5 text-center text-[10px] font-bold text-rose-600">
                  {otpError}
                </p>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={loading || otp.length !== 6}
                className="h-11 w-full rounded-xl bg-blue-600 text-xs font-black text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? "Verifying…" : "Verify & Continue"}
              </button>
            </div>
          </form>
        </ResponsiveResultSheet>
      )}

      {/* Brief in-drawer "Verified" confirmation right after OTP success,
          before landing on the actual payment/renewal screen — same
          drawer, no separate popup. Auto-advances; not dismissible. */}
      {step === "otp_success" && (
        <ResponsiveResultSheet
          eyebrow={resultEyebrow}
          title={resultTitle}
          onClose={() => {}}
          dismissible={false}
        >
          <AnimatedSuccessCheck label="Taking you to the next step…" />
        </ResponsiveResultSheet>
      )}

      {/* In-sheet Action Screen — handles both challan payment and DL
          renewal, right here in the same drawer the user started in,
          whether they arrived already authenticated or straight after
          OTP verification. Once authenticated, dismissing this sheet
          (backdrop / X / Cancel) hands off to the account shell instead
          of dropping back to the guest audit result behind it. */}
      {step === "action" && activeIntentType === "challan_settlement" && activeVehicleData && (
        <ResponsiveResultSheet
          eyebrow={activeIntentCopy.sheetEyebrow}
          title={resultTitle}
          onClose={() => closeActionSheet("vehicle")}
          closeLabel="Cancel"
        >
          <div className="mx-auto max-w-sm space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-200 bg-emerald-100 text-emerald-700">
                  <IndianRupee className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-wider text-slate-500">
                    Challan settlement
                  </p>
                  <p className="text-xl font-mono font-black text-slate-950">
                    ₹{challanAmount.toLocaleString("en-IN")}.00
                  </p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={completeChallanPayment}
              disabled={loading}
              className="h-11 w-full rounded-xl bg-emerald-600 text-xs font-black text-white shadow-sm hover:bg-emerald-700 disabled:opacity-60"
            >
              {loading ? "Processing…" : "Confirm & pay"}
            </button>
          </div>
        </ResponsiveResultSheet>
      )}

      {step === "action" && activeIntentType === "dl_renew" && activeDriverData && (
        <ResponsiveResultSheet
          eyebrow={activeIntentCopy.sheetEyebrow}
          title={resultTitle}
          onClose={() => closeActionSheet("dl")}
          closeLabel="Cancel"
        >
          <div className="mx-auto max-w-sm space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-purple-200 bg-purple-100 text-purple-700">
                  <ScanFace className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-wider text-slate-500">
                    Renewing licence
                  </p>
                  <p className="font-mono text-sm font-black text-slate-950">
                    {activeDriverData.dlNumber}
                  </p>
                  <p className="mt-0.5 text-[11px] font-bold text-slate-600">
                    {activeDriverData.licenceClass || "LMV / MCWG"}
                  </p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={completeDlRenewal}
              disabled={loading}
              className="h-11 w-full rounded-xl bg-emerald-600 text-xs font-black text-white shadow-sm hover:bg-emerald-700 disabled:opacity-60"
            >
              {loading ? "Submitting…" : "Confirm & submit application"}
            </button>
          </div>
        </ResponsiveResultSheet>
      )}

      {/* In-Drawer Success — same drawer the user started in. Closing it
          (X, backdrop tap, or the primary button) is the one moment we
          hand off to the app shell and land the user in the Account
          Dashboard, already on the secured/authenticated session. */}
      {step === "action_success" && (
        <ResponsiveResultSheet
          eyebrow="Completed"
          title={resultTitle}
          onClose={finishAndGoToAccount}
          closeLabel="Back to main screen"
        >
          <div className="mx-auto max-w-sm space-y-4 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-200 bg-emerald-100 text-emerald-700">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-950">
                Action Completed Successfully
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                {activeIntentCopy?.successDetail || "Your account is logged in."}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3.5 text-left">
              <div className="flex items-center justify-between gap-3">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                  Document ID
                </span>
                <span className="font-mono text-xs font-black text-slate-950">
                  {activeIntentType === "dl_renew"
                    ? activeDriverData?.dlNumber
                    : activeVehicleData?.vehicleNumber}
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between gap-3 border-t border-slate-200 pt-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                  Security status
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-black text-emerald-700">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Active
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={finishAndGoToAccount}
              className="h-11 w-full rounded-xl bg-blue-600 text-xs font-black text-white hover:bg-blue-700"
            >
              Back to main screen
            </button>

            {activeIntentType === "dl_renew" && (
              <button
                type="button"
                onClick={() => goToLearnHub("2.2.3")}
                className="h-11 w-full rounded-xl border border-slate-200 bg-white text-xs font-black text-slate-700 hover:bg-slate-50"
              >
                Learn more about DL renewal in Learn Hub
              </button>
            )}

            <button
              type="button"
              onClick={returnToSearch}
              className="inline-flex items-center gap-2 px-1 text-xs font-bold text-slate-500 hover:text-slate-900"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Audit another number
            </button>
          </div>
        </ResponsiveResultSheet>
      )}
    </section>
  );
}

export default Hero;