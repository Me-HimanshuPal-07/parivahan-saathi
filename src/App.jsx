import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import {
  Bell,
  Bike,
  BookOpenCheck,
  BusFront,
  ChevronRight,
  GraduationCap,
  FileClock,
  IdCard,
  ListChecks,
  LifeBuoy,
  LogIn,
  MapPin,
  Menu,
  ShieldCheck,
  Sparkles,
  UserRound,
  X,
} from "lucide-react";
import { AuthFlow } from "./components/AuthFlow";
import { AuthenticatedWorkspace } from "./components/AuthenticatedWorkspace";
import Hero from "./components/Hero";
import { AISaathi } from "./components/AISaathi";
import { LanguagePicker } from "./components/LanguagePicker";
import { getCopy } from "./data/copy";
import { MOCK_SYSTEM_DB } from "./data/mockSystem";

function App() {
  const [activeView, setActiveView] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [language, setLanguage] = useState("hinglish");
  const [session, setSession] = useState(null);
  const mainRef = useRef(null);
  const sidebarRef = useRef(null);
  const [appState] = useState({
    location: "Muzaffarnagar, Uttar Pradesh",
    identity: MOCK_SYSTEM_DB.newCitizenAccount,
    existingProfile: MOCK_SYSTEM_DB.existingOfflineUser,
    application: null,
  });
  const t = getCopy(language);
  const displayLocation = "Muzaffarnagar, UP";
  const navItems = [
    { id: "home", label: language === "hi" ? "होम" : "Saathi", icon: Sparkles },
    {
      id: "services",
      label:
        language === "hi"
          ? "क्विक चेcks"
          : language === "hinglish"
            ? "Quick checks"
            : "Quick checks",
      icon: ListChecks,
    },
    {
      id: "driver",
      label:
        language === "hi"
          ? "ड्राइवर सेवाएँ"
          : language === "hinglish"
            ? "Driver services"
            : "Driver services",
      icon: IdCard,
    },
    { id: "vehicle", label: "Vahan", icon: Bike },
    {
      id: "learn",
      label: language === "hi" ? "सीखें" : "Learn",
      icon: GraduationCap,
    },
    {
      id: "help",
      label: language === "hi" ? "मदद" : "Help & support",
      icon: LifeBuoy,
    },
  ];

  const changeView = (view) => {
    setActiveView(view);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  const startSession = (newSession) => {
    setSession(newSession);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  useEffect(() => {
    const updateScrollState = () => setIsScrolled(window.scrollY > 32);
    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const targets = mainRef.current?.querySelectorAll(
      ".page-heading, .home-hero, .primary-actions-panel, .quick-checks-card, .persona-section, .future-section, .placeholder-card",
    );
    if (!targets?.length) return;
    gsap.fromTo(
      targets,
      { autoAlpha: 0, y: 10 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.32,
        ease: "power2.out",
        stagger: 0.045,
        clearProps: "transform,opacity,visibility",
      },
    );
  }, [activeView, session]);

  useEffect(() => {
    if (
      !isMenuOpen ||
      !sidebarRef.current ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    gsap.fromTo(
      sidebarRef.current,
      { autoAlpha: 0, x: -12 },
      {
        autoAlpha: 1,
        x: 0,
        duration: 0.22,
        ease: "power2.out",
        clearProps: "transform,opacity,visibility",
      },
    );
  }, [isMenuOpen]);

  const viewTitle =
    navItems.find((item) => item.id === activeView)?.label ?? "Home";
  const screenName =
    activeView === "auth" ? t.authTitle : session ? t.dashboard : viewTitle;

  return (
    <div
      className={`min-h-screen bg-[#F5F7FA] text-slate-900 lang-${language}`}
    >
      <div className="demo-banner">
        <ShieldCheck size={16} aria-hidden="true" />
        <span>
          Prototype only — all profiles, documents, payments and records are
          synthetic.
        </span>
      </div>

      <header className={`topbar ${isScrolled ? "topbar-scrolled" : ""}`}>
        <a
          className="brand"
          href="#home"
          onClick={() => changeView("home")}
          aria-label={`${t.brandName} home`}
        >
          <span className="brand-mark">
            <BusFront size={20} aria-hidden="true" />
            <span className="brand-flag" aria-hidden="true">
              🇮🇳
            </span>
          </span>
          <span className="brand-copy">
            <strong>{t.brandName}</strong>
            <small>{t.brandTagline}</small>
            <span className="brand-location" title={appState.location}>
              <MapPin size={11} aria-hidden="true" />
              {displayLocation}
            </span>
          </span>
        </a>
        <div className="topbar-actions">
          <LanguagePicker language={language} onChange={setLanguage} />
          {!session && (
            <button
              className="icon-button desktop-only"
              type="button"
              aria-label="Notifications"
            >
              <Bell size={20} aria-hidden="true" />
            </button>
          )}
          {!session && (
            <button
              className="icon-button mobile-only notification-button"
              type="button"
              aria-label="Notifications"
            >
              <Bell size={19} aria-hidden="true" />
              <span className="notification-dot" aria-hidden="true" />
            </button>
          )}
          {session ? (
            <span className="session-chip">
              <UserRound size={16} />
              {session.profile.fullName.split(" ")[0]}
            </span>
          ) : (
            <button
              className="login-button desktop-only"
              type="button"
              onClick={() => changeView("auth")}
            >
              <LogIn size={18} aria-hidden="true" /> {t.signIn}
            </button>
          )}
          {!session && (
            <button
              className="icon-button mobile-only menu-toggle"
              type="button"
              aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              {isMenuOpen ? (
                <X size={22} strokeWidth={2.4} aria-hidden="true" />
              ) : (
                <Menu size={23} strokeWidth={2.4} aria-hidden="true" />
              )}
            </button>
          )}
        </div>
      </header>

      {session ? (
        <AuthenticatedWorkspace
          session={session}
          language={language}
          onSignOut={() => {
            setSession(null);
            changeView("home");
          }}
        />
      ) : activeView === "auth" ? (
        <AuthFlow
          language={language}
          onAuthenticated={startSession}
          onBack={() => changeView("home")}
        />
      ) : (
        <>
          <div className="app-frame">
            <aside
              ref={sidebarRef}
              className={`sidebar ${isMenuOpen ? "sidebar-open" : ""} ${isScrolled ? "sidebar-scrolled" : ""}`}
              aria-label="Main navigation"
            >
              <button
                className="mobile-menu-login"
                type="button"
                onClick={() => changeView("auth")}
              >
                <LogIn size={18} aria-hidden="true" />
                {t.signIn}
              </button>
              <nav>
                <p className="nav-label">Navigate</p>
                {navItems.map(({ id, label, icon: Icon }) => (
                  <button
                    className={`nav-item ${activeView === id ? "nav-item-active" : ""}`}
                    type="button"
                    key={id}
                    onClick={() => changeView(id)}
                  >
                    <Icon size={20} aria-hidden="true" />
                    <span>{label}</span>
                  </button>
                ))}
              </nav>
              <div className="sidebar-note">
                <Sparkles size={19} aria-hidden="true" />
                <div>
                  <strong>LL journey coming next</strong>
                  <p>
                    Eligibility, documents, payment, test and digital licence
                    will be connected here.
                  </p>
                </div>
              </div>
            </aside>
            <main className="main-content" id="main-content" ref={mainRef}>
              {activeView === "home" ? (
                <HomeView
                  onNavigate={changeView}
                  onSignIn={() => changeView("auth")}
                  copy={t.home}
                />
              ) : (
                <FoundationView activeView={activeView} />
              )}
            </main>
          </div>
          <nav className="bottom-nav" aria-label="Mobile navigation">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                className={activeView === id ? "bottom-nav-active" : ""}
                type="button"
                key={id}
                onClick={() => changeView(id)}
              >
                <Icon size={20} aria-hidden="true" />
                <span>{label.replace(" application", "")}</span>
              </button>
            ))}
          </nav>
        </>
      )}
      <AISaathi language={language} currentScreen={screenName} />
    </div>
  );
}

function HomeView({ onNavigate, onSignIn, copy }) {
  const primaryActions = [
    {
      title: copy.quickChecks,
      subtitle: copy.quickSubtitle,
      action: "Check now",
      onClick: () => onNavigate("services"),
    },
    {
      title: "LL / DL",
      subtitle: copy.driverSubtitle,
      action: "Start now",
      onClick: onSignIn,
    },
    {
      title: "My Garage",
      subtitle: copy.garageSubtitle,
      action: "Manage",
      onClick: onSignIn,
    },
  ];
  const quickChecks = copy.quickCheckItems;
  const personaCards = copy.personas.map((persona, index) => ({
    ...persona,
    accent: ["persona-blue", "persona-green", "persona-gold"][index],
  }));
  const icons = [BookOpenCheck, FileClock, Bike, Sparkles, ShieldCheck];
  const futureModules = copy.modules.map((module, index) => ({
    ...module,
    icon: icons[index],
  }));

  return (
    <div className="home-hero-layout">
      {/* Old home-hero <section> replaced with the new interactive Hero */}
      <Hero />
      <div className="content-grid">
        <section className="primary-actions-panel">
          {primaryActions.map(({ title, subtitle, action, onClick }) => (
            <button
              key={title}
              type="button"
              className="primary-action-card"
              onClick={onClick}
            >
              <div>
                <span className="mini-label">{copy.service}</span>
                <strong>{title}</strong>
                <small>{subtitle}</small>
              </div>
              <span className="action-link">
                {action} <ChevronRight size={16} aria-hidden="true" />
              </span>
            </button>
          ))}
        </section>

        <section className="quick-checks-card">
          <div className="section-heading-row compact-row">
            <div>
              <p className="eyebrow">{copy.quickCheck}</p>
              <h2>{copy.noLogin}</h2>
            </div>
          </div>
          <div className="quick-checks-grid">
            {quickChecks.map(({ label, detail, action }) => (
              <button
                key={label}
                type="button"
                className="quick-check-item"
                onClick={() => onNavigate("services")}
              >
                <div>
                  <strong>{label}</strong>
                  <small>{detail}</small>
                </div>
                <span>{action}</span>
              </button>
            ))}
          </div>
        </section>

      <section className="persona-section">
        <div className="section-heading-row">
          <div>
            <p className="eyebrow">{copy.personasEyebrow}</p>
            <h2>{copy.personasTitle}</h2>
          </div>
        </div>

        <div className="persona-grid">
          {personaCards.map(({ title, subtitle, stat, accent }) => (
            <div key={title} className={`persona-card ${accent}`}>
              <span className="persona-tag">{stat}</span>
              <h3>{title}</h3>
              <p>{subtitle}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="future-section">
        <div className="future-heading">
          <div>
            <p className="eyebrow">{copy.visionEyebrow}</p>
            <h2>{copy.visionTitle}</h2>
            <p>{copy.visionText}</p>
          </div>
          <span className="round-status">{copy.roadmap}</span>
        </div>
        <div className="future-grid">
          {futureModules.map(({ title, detail, icon: Icon }) => (
            <div key={title} className="future-item">
              <span className="future-icon">
                <Icon size={18} aria-hidden="true" />
              </span>
              <div>
                <strong>{title}</strong>
                <p>{detail}</p>
              </div>
              <span className="coming-soon">{copy.comingNext}</span>
            </div>
          ))}
        </div>
      </section>
      </div>
    </div>
  );
}

function FoundationView({ activeView }) {
  const descriptions = {
    services: [
      "Quick checks",
      "Citizens can instantly check challan, PUCC, insurance and vehicle status without a long sign-in flow.",
    ],
    driver: [
      "Driver services",
      "Guided LL, DL renewal and document updates will help citizens complete the driving journey step-by-step.",
    ],
    vehicle: [
      "Vahan",
      "RC, ownership, compliance and due reminders will be grouped here for garage and vehicle management.",
    ],
    learn: [
      "Learn Hub",
      "Understand LL, DL, documents, rules and every service step through simple citizen-first guidance.",
    ],
    track: [
      "Application tracker",
      "The LL tracker will show current status, action required, recovery instructions, and next step.",
    ],
    help: [
      "Help & support",
      "Plain-language help content and recovery routes will be introduced with the Learner’s Licence journey.",
    ],
  };
  const [title, description] = descriptions[activeView];
  return (
    <section className="placeholder-card">
      <div className="placeholder-icon">
        <BookOpenCheck size={28} aria-hidden="true" />
      </div>
      <p className="eyebrow">Foundation view</p>
      <h2>{title}</h2>
      <p>{description}</p>
      <span className="status-pill status-muted">
        Planned — not implemented in Task 1
      </span>
    </section>
  );
}

export default App;
