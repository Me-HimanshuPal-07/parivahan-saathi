import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Bell,
  Bike,
  BookOpenCheck,
  CarFront,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  Clock3,
  CreditCard,
  FileCheck2,
  IndianRupee,
  LifeBuoy,
  LogOut,
  MapPin,
  MessageCircle,
  Settings,
  ShieldCheck,
  Sparkles,
  UserRound,
  WalletCards,
} from "lucide-react";
import { MOCK_SYSTEM_DB } from "../../data/mockSystem";

const ACCOUNT_NAV = [
  { id: "home", label: "Saathi", hint: "Account home", icon: Sparkles },
  { id: "vehicle", label: "Vahan", hint: "Vehicles & challans", icon: Bike },
  { id: "driver", label: "Saarthi", hint: "LL & DL services", icon: CreditCard },
  { id: "learn_hub", label: "Learn Hub", hint: "Learn & prepare", icon: BookOpenCheck },
  { id: "support", label: "Help", hint: "Support centre", icon: CircleHelp },
];

function firstLetter(name) {
  return String(name || "Citizen").trim().charAt(0).toUpperCase() || "C";
}

function formatDate(value) {
  if (!value || value === "Verification pending") return value || "Not available";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function StatusPill({ children, tone = "blue" }) {
  return <span className={`account-status-pill account-status-${tone}`}>{children}</span>;
}

function SectionHeading({ eyebrow, title, detail, action, onAction }) {
  return (
    <div className="account-section-heading">
      <div>
        {eyebrow && <p className="account-eyebrow">{eyebrow}</p>}
        <h2>{title}</h2>
        {detail && <p>{detail}</p>}
      </div>
      {action && (
        <button type="button" className="account-text-action" onClick={onAction}>
          {action} <ArrowRight size={15} />
        </button>
      )}
    </div>
  );
}

function ProfileDrawer({ profile, onClose, onLogout }) {
  return (
    <div
      className="account-drawer-backdrop"
      role="presentation"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <aside
        className="account-profile-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="account-profile-title"
      >
        <div className="account-drawer-handle" />
        <div className="account-drawer-profile">
          <div className="account-avatar account-avatar-large">{firstLetter(profile.fullName)}</div>
          <div>
            <p className="account-eyebrow">Your account</p>
            <h2 id="account-profile-title">{profile.fullName}</h2>
            <p>{profile.registeredMobile || "Verified citizen"}</p>
          </div>
        </div>
        <div className="account-drawer-menu">
          <button type="button" onClick={onClose}>
            <UserRound size={18} /> Profile <ChevronRight size={16} />
          </button>
          <button type="button" onClick={onClose}>
            <Settings size={18} /> Settings <ChevronRight size={16} />
          </button>
          <button type="button" onClick={onClose}>
            <Bell size={18} /> Notifications <span className="account-notification-dot" />
          </button>
          <button type="button" className="account-drawer-logout" onClick={onLogout}>
            <LogOut size={18} /> Logout
          </button>
        </div>
        <p className="account-drawer-safe">
          <ShieldCheck size={15} /> Your information stays protected.
        </p>
      </aside>
    </div>
  );
}

function PaymentDialog({ challan, onClose, onPaid }) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePay = () => {
    setIsProcessing(true);
    window.setTimeout(() => {
      setIsProcessing(false);
      onPaid();
    }, 650);
  };

  return (
    <div
      className="account-payment-backdrop"
      role="presentation"
      onClick={(event) => {
        if (event.target === event.currentTarget && !isProcessing) onClose();
      }}
    >
      <section
        className="account-payment-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="payment-dialog-title"
      >
        <div className="account-payment-dialog-top">
          <div className="account-stat-icon account-stat-blue"><WalletCards size={19} /></div>
          <button type="button" className="account-payment-close" onClick={onClose} disabled={isProcessing} aria-label="Close payment dialog">×</button>
        </div>
        <p className="account-eyebrow">Secure payment</p>
        <h2 id="payment-dialog-title">Settle this e-challan</h2>
        <p className="account-payment-copy">Account verified hai. Payment ab secure account flow ke andar continue hoga.</p>
        <div className="account-payment-summary">
          <span><small>Vehicle</small><strong>{challan.registrationNumber || "Your vehicle"}</strong></span>
          <span><small>Amount due</small><strong>₹{Number(challan.amount || 0).toLocaleString("en-IN")}</strong></span>
        </div>
        <button type="button" className="account-primary-button account-payment-button" onClick={handlePay} disabled={isProcessing}>
          {isProcessing ? "Processing securely…" : "Pay via UPI"} {!isProcessing && <ArrowRight size={15} />}
        </button>
        <p className="account-payment-safe"><ShieldCheck size={14} /> No OTP required again in your account.</p>
      </section>
    </div>
  );
}

function HomePanel({ profile, vehicles, challans, pendingAction, onOpenTab }) {
  const firstVehicle = vehicles[0];
  const totalDue = challans.reduce((sum, item) => sum + Number(item.amount || 0), 0);

  return (
    <>
      {pendingAction && (
        <section className="account-resume-card">
          <div className="account-resume-icon"><WalletCards size={21} /></div>
          <div className="account-resume-copy">
            <p className="account-eyebrow">You&apos;re all set</p>
            <h2>
              {pendingAction.type === "dl_renew"
                ? "DL renewal is ready to continue"
                : "Challan settlement is ready to continue"}
            </h2>
            <p>
              Identity verify ho gayi. Ab secure account ke andar se{" "}
              <strong>
                {pendingAction.type === "dl_renew"
                  ? pendingAction.dlNumber || "your licence"
                  : pendingAction.vehicleNumber || "your vehicle"}
              </strong>{" "}
              ka action complete karein.
            </p>
          </div>
          <button
            type="button"
            className="account-primary-button"
            onClick={() => onOpenTab(pendingAction.type === "dl_renew" ? "driver" : "vehicle")}
          >
            Continue <ArrowRight size={16} />
          </button>
        </section>
      )}

      <section className="account-welcome">
        <div>
          <p className="account-eyebrow">Saturday, 29 August 2026</p>
          <h1>Namaste, {profile.fullName?.split(" ")[0] || "Citizen"} <span>👋</span></h1>
          <p>Saathi is your one place to manage every driving and vehicle document.</p>
        </div>
        <div className="account-trust-badge">
          <BadgeCheck size={17} />
          <span><strong>Verified account</strong><small>OTP protected access</small></span>
        </div>
      </section>

      <section className="account-stat-grid" aria-label="Account summary">
        <button type="button" className="account-stat-card" onClick={() => onOpenTab("vehicle")}>
          <span className="account-stat-icon account-stat-blue"><CarFront size={19} /></span>
          <span><strong>{vehicles.length}</strong><small>Registered vehicle{vehicles.length === 1 ? "" : "s"}</small></span>
          <ChevronRight size={16} />
        </button>
        <button type="button" className="account-stat-card" onClick={() => onOpenTab("driver")}>
          <span className="account-stat-icon account-stat-purple"><CreditCard size={19} /></span>
          <span><strong>{profile.hasLicense ? "Active" : "Ready"}</strong><small>Driving licence</small></span>
          <ChevronRight size={16} />
        </button>
        <button type="button" className="account-stat-card" onClick={() => onOpenTab("vehicle")}>
          <span className={`account-stat-icon ${challans.length ? "account-stat-red" : "account-stat-green"}`}><IndianRupee size={19} /></span>
          <span><strong>{challans.length ? `₹${totalDue.toLocaleString("en-IN")}` : "Clear"}</strong><small>{challans.length ? "Pending challan" : "No pending challan"}</small></span>
          <ChevronRight size={16} />
        </button>
      </section>

      <section className="account-content-grid">
        <div className="account-panel account-panel-primary">
          <SectionHeading
            eyebrow="Quick access"
            title="Aapko kya manage karna hai?"
            detail="Frequently used services, one tap away."
          />
          <div className="account-quick-grid">
            <button type="button" onClick={() => onOpenTab("vehicle")}><span className="account-quick-icon account-quick-teal"><Bike size={18} /></span><span><strong>My vehicles</strong><small>RC, PUCC & insurance</small></span><ArrowRight size={15} /></button>
            <button type="button" onClick={() => onOpenTab("driver")}><span className="account-quick-icon account-quick-purple"><CreditCard size={18} /></span><span><strong>Driving licence</strong><small>DL & LL services</small></span><ArrowRight size={15} /></button>
            <button type="button" onClick={() => onOpenTab("learn_hub")}><span className="account-quick-icon account-quick-amber"><BookOpenCheck size={18} /></span><span><strong>Learn Hub</strong><small>Rules & test prep</small></span><ArrowRight size={15} /></button>
            <button type="button" onClick={() => onOpenTab("support")}><span className="account-quick-icon account-quick-blue"><LifeBuoy size={18} /></span><span><strong>Get help</strong><small>Guided support</small></span><ArrowRight size={15} /></button>
          </div>
        </div>

        <div className="account-panel account-panel-side">
          <SectionHeading eyebrow="Your garage" title="Most recent vehicle" action="View all" onAction={() => onOpenTab("vehicle")} />
          {firstVehicle ? (
            <div className="account-feature-vehicle">
              <div className="account-vehicle-topline"><span className="account-plate">{firstVehicle.registrationNumber}</span><StatusPill tone="green">Active</StatusPill></div>
              <p>{firstVehicle.modelName || "Registered private vehicle"}</p>
              <div className="account-mini-metrics">
                <span><small>PUCC</small><strong>{formatDate(firstVehicle.puccExpiry) || "Available"}</strong></span>
                <span><small>Insurance</small><strong>{formatDate(firstVehicle.insuranceExpiry) || "Available"}</strong></span>
              </div>
            </div>
          ) : (
            <div className="account-empty-state"><CarFront size={24} /><p>Garage khaali hai</p><small>Apna vehicle record yahan dekhein.</small></div>
          )}
        </div>
      </section>
    </>
  );
}

function VehiclePanel({ vehicles, challans, pendingAction, onPayChallan }) {
  return (
    <>
      <section className="account-page-intro">
        <div><p className="account-eyebrow">Vahan services</p><h1>Everything for your vehicles</h1><p>RC, PUCC, insurance aur challan records ek hi jagah.</p></div>
        <span className="account-page-icon account-page-icon-teal"><Bike size={24} /></span>
      </section>
      {pendingAction && pendingAction.type !== "dl_renew" && (
        <section className="account-action-focus"><Clock3 size={19} /><div><strong>Continue your pending action</strong><p>{pendingAction.vehicleNumber} · ₹{pendingAction.amount || "—"} settlement ready hai.</p></div><StatusPill tone="amber">Ready</StatusPill></section>
      )}
      <section className="account-panel">
        <SectionHeading eyebrow="Registered garage" title={`${vehicles.length} vehicle${vehicles.length === 1 ? "" : "s"} linked`} detail="Status snapshots from your connected Vahan records." />
        <div className="account-vehicle-list">
          {vehicles.length ? vehicles.map((vehicle) => (
            <article className="account-vehicle-card" key={vehicle.vehicleId || vehicle.registrationNumber}>
              <div className="account-vehicle-card-head"><div><span className="account-plate">{vehicle.registrationNumber}</span><h3>{vehicle.modelName || "Private vehicle"}</h3></div><StatusPill tone="green">Record active</StatusPill></div>
              <div className="account-record-grid">
                <span><small>RC status</small><strong><CheckCircle2 size={14} /> Available</strong></span>
                <span><small>PUCC</small><strong className={vehicle.puccAlert?.active ? "is-warning" : ""}>{vehicle.puccAlert?.active ? "Renew soon" : formatDate(vehicle.puccExpiry) || "Available"}</strong></span>
                <span><small>Insurance</small><strong>{formatDate(vehicle.insuranceExpiry) || "Available"}</strong></span>
              </div>
            </article>
          )) : <div className="account-empty-state"><CarFront size={26} /><p>No vehicle linked yet</p><small>Vehicle lookup se apna record add karein.</small></div>}
        </div>
      </section>
      <section className="account-panel">
        <SectionHeading eyebrow="Payments" title="E-challan centre" detail="Review outstanding penalties and keep your record clear." />
        {challans.length ? challans.map((challan) => (
          <article className="account-challan-card" key={challan.challanId || `${challan.registrationNumber}-${challan.amount}`}>
            <div><StatusPill tone="red">Payment due</StatusPill><h3>{challan.challanId || "E-challan"} <span>· {challan.registrationNumber}</span></h3><p>{challan.reasonEn || "Traffic penalty record"}</p></div>
            <div className="account-challan-pay"><strong>₹{Number(challan.amount || 0).toLocaleString("en-IN")}</strong><button type="button" className="account-primary-button" onClick={() => onPayChallan?.(challan)}>Pay securely <ArrowRight size={15} /></button></div>
          </article>
        )) : <div className="account-clear-state"><CheckCircle2 size={19} /><strong>Koi pending challan nahi hai — record clear hai.</strong></div>}
      </section>
    </>
  );
}

function DriverPanel({ sarathi, onOpenTab, pendingAction }) {
  const hasDl = Boolean(sarathi?.dl);
  return (
    <>
      <section className="account-page-intro"><div><p className="account-eyebrow">Saarthi services</p><h1>Your driving identity, simplified</h1><p>Licence status, LL/DL applications aur practice guidance yahin milegi.</p></div><span className="account-page-icon account-page-icon-purple"><CreditCard size={24} /></span></section>
      {pendingAction && pendingAction.type === "dl_renew" && (
        <section className="account-action-focus"><Clock3 size={19} /><div><strong>Renewal application submitted</strong><p>{pendingAction.dlNumber || "Your DL"} · status yahin track karein.</p></div><StatusPill tone="green">Submitted</StatusPill></section>
      )}
      <section className="account-driver-hero"><div className="account-driver-icon"><ShieldCheck size={25} /></div><div><p className="account-eyebrow">Licence status</p><h2>{hasDl ? "Driving licence is active" : "Start your driving journey"}</h2><p>{hasDl ? "Your verified licence details are safely available in this account." : "Learner licence se shuru karein aur guided steps follow karein."}</p></div><StatusPill tone={hasDl ? "green" : "amber"}>{hasDl ? "Verified" : "Get started"}</StatusPill></section>
      {hasDl && <section className="account-panel"><SectionHeading eyebrow="Verified document" title="Driving Licence" detail="Your current Saarthi record." /><div className="account-dl-card"><div className="account-dl-number">{sarathi.dl.dlNumber}</div><div className="account-record-grid"><span><small>Class</small><strong>{sarathi.dl.licenceType || sarathi.dl.licenceClass || "LMV / MCWG"}</strong></span><span><small>RTO code</small><strong>{sarathi.dl.rtoCode || "—"}</strong></span><span><small>Valid till</small><strong>{formatDate(sarathi.dl.expiryDate)}</strong></span></div></div></section>}
      <section className="account-panel"><SectionHeading eyebrow="Popular services" title="What would you like to do?" /><div className="account-service-grid"><button type="button"><FileCheck2 size={19} /><span><strong>Apply for Learner Licence</strong><small>Start your LL application</small></span><ArrowRight size={15} /></button><button type="button"><CreditCard size={19} /><span><strong>Renew or update DL</strong><small>Keep licence details current</small></span><ArrowRight size={15} /></button><button type="button" onClick={() => onOpenTab("learn_hub")}><BookOpenCheck size={19} /><span><strong>Practice for driving test</strong><small>Signs, rules and mock quiz</small></span><ArrowRight size={15} /></button></div></section>
    </>
  );
}

function LearnPanel() {
  return (
    <>
      <section className="account-page-intro"><div><p className="account-eyebrow">Learn Hub</p><h1>Learn before you apply</h1><p>Guest shell ka Learn Hub ab aapke account ke andar — save, revisit aur practice karein.</p></div><span className="account-page-icon account-page-icon-amber"><BookOpenCheck size={24} /></span></section>
      <section className="account-learning-grid"><article><span className="account-learning-number">01</span><h2>Road signs, made simple</h2><p>Warning, mandatory aur informatory signs ko quick visual lessons mein samjhein.</p><button type="button">Open lesson <ArrowRight size={15} /></button></article><article><span className="account-learning-number">02</span><h2>Mock driving quiz</h2><p>Test se pehle apni readiness check karein with real-world situations.</p><button type="button">Start quiz <ArrowRight size={15} /></button></article><article><span className="account-learning-number">03</span><h2>Document checklist</h2><p>LL, DL, RC aur insurance ke liye required documents ready rakhein.</p><button type="button">View checklist <ArrowRight size={15} /></button></article></section>
    </>
  );
}

function HelpPanel() {
  return (
    <>
      <section className="account-page-intro"><div><p className="account-eyebrow">Help centre</p><h1>We&apos;re here to make it clear</h1><p>Service choose karein, guided answers paayein, ya Saathi team se connect karein.</p></div><span className="account-page-icon account-page-icon-blue"><LifeBuoy size={24} /></span></section>
      <section className="account-help-grid"><button type="button"><MessageCircle size={21} /><span><strong>Ask Saathi</strong><small>Get a guided answer in chat</small></span><ArrowRight size={15} /></button><button type="button"><FileCheck2 size={21} /><span><strong>Track an application</strong><small>Check your request status</small></span><ArrowRight size={15} /></button><button type="button"><CircleHelp size={21} /><span><strong>Browse FAQs</strong><small>Quick answers to common questions</small></span><ArrowRight size={15} /></button></section>
      <section className="account-help-note"><ShieldCheck size={19} /><div><strong>Safe by design</strong><p>Saathi kabhi bhi OTP ya password chat mein nahi maangta.</p></div></section>
    </>
  );
}

export function AccountDashboard({
  userSession,
  session,
  onLogout,
  onSignOut,
  onPayChallan,
  isProfileOpen,
  onCloseProfile,
  // Shared "already settled" ledger from the App shell — kept separate
  // from this component's own `paidChallans` (which only tracks challans
  // paid via THIS component's own PaymentDialog), so a challan settled
  // inside Hero's guest drawer is filtered out here too, immediately.
  paidVehicleNumbers = [],
}) {
  const activeSession = userSession || session || {};
  const [activeTab, setActiveTab] = useState("home");
  const [localProfileOpen, setLocalProfileOpen] = useState(false);
  const [paymentChallan, setPaymentChallan] = useState(null);
  const [paidChallans, setPaidChallans] = useState([]);
  const profileOpen = isProfileOpen ?? localProfileOpen;
  const profile = activeSession.profile || {};
  const userId = activeSession.userId;
  const fallbackVahan = MOCK_SYSTEM_DB?.vahanLedger?.[userId] || Object.values(MOCK_SYSTEM_DB?.vahanLedger || {})[0] || {};
  const fallbackSarathi = MOCK_SYSTEM_DB?.sarathiLedger?.[userId] || Object.values(MOCK_SYSTEM_DB?.sarathiLedger || {})[0] || {};
  const vehicles = fallbackVahan.vehicles || [];
  const registrationNumbers = new Set(vehicles.map((vehicle) => vehicle.registrationNumber));
  const challans = (MOCK_SYSTEM_DB?.challans || []).filter((challan) => (
    (challan.userId === userId || registrationNumbers.has(challan.registrationNumber)) &&
    !paidChallans.includes(challan.challanId || `${challan.registrationNumber}-${challan.amount}`) &&
    !paidVehicleNumbers.includes(challan.registrationNumber)
  ));
  const normalizedProfile = useMemo(() => ({
    fullName: profile.fullName || activeSession.name || fallbackVahan.name || "Demo Citizen",
    registeredMobile: profile.registeredMobile || profile.mobileMasked || "Verified mobile",
    hasLicense: Boolean(fallbackSarathi?.dl),
  }), [activeSession.name, fallbackSarathi?.dl, fallbackVahan.name, profile.fullName, profile.mobileMasked, profile.registeredMobile]);

  useEffect(() => {
    if (profileOpen) {
      document.body.classList.add("account-drawer-open");
      return () => document.body.classList.remove("account-drawer-open");
    }
    return undefined;
  }, [profileOpen]);

  const closeProfile = () => {
    setLocalProfileOpen(false);
    onCloseProfile?.();
  };

  const logout = () => {
    closeProfile();
    (onLogout || onSignOut)?.();
  };

  return (
    <div className="account-shell">
      <main className="account-main">
        <div className="account-shell-topline">
          <span><ShieldCheck size={15} /> Secure account shell</span>
          <span className="account-topline-location"><MapPin size={13} /> India citizen services</span>
        </div>
        {activeTab === "home" && <HomePanel profile={normalizedProfile} vehicles={vehicles} challans={challans} pendingAction={activeSession.pendingAction} onOpenTab={setActiveTab} />}
        {activeTab === "vehicle" && <VehiclePanel vehicles={vehicles} challans={challans} pendingAction={activeSession.pendingAction} onPayChallan={onPayChallan || setPaymentChallan} />}
        {activeTab === "driver" && <DriverPanel sarathi={fallbackSarathi} onOpenTab={setActiveTab} pendingAction={activeSession.pendingAction} />}
        {activeTab === "learn_hub" && <LearnPanel />}
        {activeTab === "support" && <HelpPanel />}
      </main>

      {/* Desktop tab strip — hidden on mobile, where the fixed bottom
          nav below takes over. Reuses the same desktop-only /
          mobile-only utility classes the rest of the app shell uses,
          so behaviour matches the guest shell's own nav instead of
          relying on a second, unrelated set of breakpoint rules. */}
      <nav className="account-desktop-tabs desktop-only" aria-label="Account sections">
        {ACCOUNT_NAV.map(({ id, label, icon: Icon }) => <button type="button" key={id} className={activeTab === id ? "is-active" : ""} onClick={() => setActiveTab(id)}><Icon size={16} /><span>{label}</span></button>)}
      </nav>

      <nav className="account-bottom-nav mobile-only" aria-label="Account navigation">
        {ACCOUNT_NAV.map(({ id, label, icon: Icon }) => <button type="button" key={id} className={activeTab === id ? "is-active" : ""} onClick={() => setActiveTab(id)}><Icon size={19} /><span>{label}</span></button>)}
      </nav>

      {profileOpen && <ProfileDrawer profile={normalizedProfile} onClose={closeProfile} onLogout={logout} />}
      {paymentChallan && (
        <PaymentDialog
          challan={paymentChallan}
          onClose={() => setPaymentChallan(null)}
          onPaid={() => {
            setPaidChallans((current) => [
              ...current,
              paymentChallan.challanId || `${paymentChallan.registrationNumber}-${paymentChallan.amount}`,
            ]);
            setPaymentChallan(null);
          }}
        />
      )}
    </div>
  );
}

export default AccountDashboard;