import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import {
  Bell,
  Bike,
  BookOpenCheck,
  BusFront,
  ChevronRight,
  ChevronLeft,
  ChevronsLeft,
  ChevronsRight,
  CircleUserRound,
  GraduationCap,
  IdCard,
  LifeBuoy,
  LogIn,
  MapPin,
  Menu,
  ShieldCheck,
  Sparkles,
  UserRound,
  X,
  Award,
} from "lucide-react";

import { AuthFlow } from "./components/AuthFlow";
import { AuthenticatedWorkspace } from "./components/AuthenticatedWorkspace";
import { Hero } from "./components/Hero";
import { AISaathi } from "./components/AISaathi";
import { LanguagePicker } from "./components/LanguagePicker";

import LocationPicker, {
  INDIA_LOCATIONS_DATA,
} from "./components/LocationPicker";

import { getCopy } from "./data/copy";
import { MOCK_SYSTEM_DB } from "./data/mockSystem";

import LearnHubSidebar from "./components/LearnHubSidebar";
import LearnHubContent from "./components/LearnHubContent";
import JudgeDashboard from "./components/JudgeDashboard";

function App() {
  const [activeView, setActiveView] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [language, setLanguage] = useState("hinglish");
  const [session, setSession] = useState(null);
  const [currentNode, setCurrentNode] = useState("1.1");
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  const [locationData, setLocationData] = useState({
    stateKey: "up",
    cityKey: "muzaffarnagar",
    coords: {
      lat: 29.4727,
      lng: 77.7085,
    },
    customCityName: null,
  });

  const mainRef = useRef(null);
  const sidebarRef = useRef(null);

  const t = getCopy(language);

  const [appState] = useState({
    location: "Muzaffarnagar, Uttar Pradesh",
    identity: MOCK_SYSTEM_DB.newCitizenAccount,
    existingProfile: MOCK_SYSTEM_DB.existingOfflineUser,
    application: null,
  });

  const getDisplayCityName = () => {
    const currentCityObj = INDIA_LOCATIONS_DATA[
      locationData.stateKey
    ]?.cities.find((city) => city.key === locationData.cityKey);

    if (currentCityObj) {
      return currentCityObj.names[language] || currentCityObj.names.en;
    }

    return (
      locationData.customCityName ||
      (language === "hi" ? "मुज़फ़्फ़रनगर" : "Muzaffarnagar")
    );
  };

  const headerCityName = getDisplayCityName();

  const handleLocationSelect = (selectedData) => {
    setLocationData({
      stateKey: selectedData.stateKey,
      cityKey: selectedData.cityKey,
      coords: selectedData.coordinates,
      customCityName: selectedData.cityName,
    });
  };

  const navItems = [
    {
      id: "home",
      label: language === "hi" ? "होम" : "Saathi",
      icon: Sparkles,
      description: language === "hi" ? "मुख्य पृष्ठ" : "Home",
    },
    {
      id: "driver",
      label: language === "hi" ? "ड्राइवर सेवाएँ" : "Driver services",
      icon: IdCard,
      description: language === "hi" ? "LL और DL" : "LL & DL",
    },
    {
      id: "vehicle",
      label: language === "hi" ? "वाहन" : "Vehicle",
      icon: Bike,
      description:
        language === "hi" ? "RC और vehicle services" : "RC & vehicle services",
    },
    {
      id: "learn_hub",
      label: language === "hi" ? "सीखें" : "Learn Hub",
      icon: GraduationCap,
      description: language === "hi" ? "Rules और guidance" : "Rules & guidance",
    },
    {
      id: "help",
      label: language === "hi" ? "मदद" : "Help & support",
      icon: LifeBuoy,
      description: language === "hi" ? "सहायता पाएँ" : "Get help",
    },
  ];

  const screenName =
    {
      home: "Saathi",
      driver: "Driver services",
      vehicle: "Vehicle",
      learn_hub: "Learn Hub",
      help: "Help & support",
      judge_panel: "Jury",
      auth: "Sign in",
    }[activeView] || "Saathi";

  const changeView = (view) => {
    setActiveView(view);
    setIsMenuOpen(false);

    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  };

  const startSession = (newSession) => {
    setSession(newSession);

    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  };

  useEffect(() => {
    const updateScrollState = () => {
      setIsScrolled(window.scrollY > 32);
    };

    updateScrollState();

    window.addEventListener("scroll", updateScrollState, { passive: true });

    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarCollapsed((current) => !current);
  };

  useEffect(() => {
    if (!sidebarRef.current) return;

    const targets = sidebarRef.current.querySelectorAll(
      ".nav-item span, .nav-label, .sidebar-note",
    );

    if (targets.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        {
          opacity: isSidebarCollapsed ? 1 : 0,
          x: isSidebarCollapsed ? 0 : -6,
        },
        {
          opacity: isSidebarCollapsed ? 0 : 1,
          x: isSidebarCollapsed ? -6 : 0,
          duration: 0.18,
          stagger: 0.015,
          ease: "power2.out",
        },
      );
    }, sidebarRef);

    return () => ctx.revert();
  }, [isSidebarCollapsed]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "b") {
        event.preventDefault();
        toggleSidebar();
      }

      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div
      className={`saathi-app ${
        isSidebarCollapsed ? "sidebar-collapsed" : "sidebar-expanded"
      }`}
    >
      <header className={`topbar ${isScrolled ? "topbar-scrolled" : ""}`}>
        <div className="topbar-inner">
          {/* ROW 1 — Brand · Bell · Profile/Login */}
          <div className="topbar-row topbar-row-primary">
            <button
              type="button"
              className="brand-lockup"
              onClick={() => changeView("home")}
              aria-label="Parivahan Saathi home"
            >
              <span className="brand-mark">
                <BusFront size={21} strokeWidth={2.2} aria-hidden="true" />
              </span>
              <span className="brand-copy">
                <strong>{t.brandName}</strong>
                <small>{t.brandTagline}</small>
              </span>
            </button>

            <div className="topbar-actions topbar-actions-primary">
              <button
                type="button"
                className="icon-button notification-button"
                aria-label="Notifications"
              >
                <Bell size={18} aria-hidden="true" />
                <span className="notification-dot" aria-hidden="true" />
              </button>

              {session ? (
                <>
                  <button
                    type="button"
                    className="session-chip desktop-only"
                    onClick={() => changeView("home")}
                  >
                    <UserRound size={16} aria-hidden="true" />
                    <span>
                      {session.profile?.fullName?.split(" ")[0] || "Citizen"}
                    </span>
                  </button>
                  <button
                    type="button"
                    className="icon-button profile-icon-button mobile-only"
                    onClick={() => changeView("home")}
                    aria-label={session.profile?.fullName || "Profile"}
                  >
                    <CircleUserRound size={22} aria-hidden="true" />
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    className="login-button desktop-only"
                    onClick={() => changeView("auth")}
                  >
                    <LogIn size={17} aria-hidden="true" />
                    {t.signIn}
                  </button>
                  <button
                    type="button"
                    className="icon-button profile-icon-button mobile-only"
                    onClick={() => changeView("auth")}
                    aria-label={t.signIn}
                  >
                    <CircleUserRound size={22} aria-hidden="true" />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* ROW 2 — Location · Language */}
          <div className="topbar-row topbar-row-secondary">
            <button
              type="button"
              className="location-button"
              onClick={() => setIsLocationModalOpen(true)}
              aria-label={`Location: ${headerCityName}`}
            >
              <MapPin size={16} aria-hidden="true" />
              <span>
                <small>{language === "hi" ? "स्थान" : "Location"}</small>
                <strong>{headerCityName}</strong>
              </span>
            </button>

            <LanguagePicker language={language} onChange={setLanguage} />
          </div>
        </div>
      </header>
      {/* AUTHENTICATED EXPERIENCE / PUBLIC WORKSPACE */}
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
          <div
            className={`app-frame ${
              isMenuOpen ? "mobile-navigation-open" : ""
            }`}
          >
            {/* SIDEBAR / MOBILE DRAWER */}
            <aside
              ref={sidebarRef}
              className={`sidebar ${isMenuOpen ? "sidebar-open" : ""} ${
                isScrolled ? "sidebar-scrolled" : ""
              }`}
              aria-label="Main navigation"
            >
              <div className="sidebar-header">
                <button
                  type="button"
                  className="sidebar-collapse-button"
                  onClick={toggleSidebar}
                  aria-label={
                    isSidebarCollapsed
                      ? "Expand navigation"
                      : "Collapse navigation"
                  }
                  aria-expanded={!isSidebarCollapsed}
                  title={
                    isSidebarCollapsed
                      ? "Expand navigation"
                      : "Collapse navigation"
                  }
                >
                  {isSidebarCollapsed ? (
                    <ChevronsRight size={18} aria-hidden="true" />
                  ) : (
                    <ChevronsLeft size={18} aria-hidden="true" />
                  )}
                </button>

                <div className="mobile-location-card">
                  <MapPin size={15} aria-hidden="true" />
                  <span>{headerCityName}</span>
                  <button
                    type="button"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsLocationModalOpen(true);
                    }}
                  >
                    Change
                  </button>
                </div>
              </div>

              {/* Desktop Nav Items (Mobile me hidden rahenge taaki duplicates na banein) */}
              <nav className="sidebar-nav desktop-only-nav">
                {!isSidebarCollapsed && (
                  <p className="nav-label">
                    {language === "hi" ? "नेविगेट करें" : "Navigate"}
                  </p>
                )}

                {navItems.map(({ id, label, icon: Icon, description }) => (
                  <button
                    type="button"
                    key={id}
                    className={`nav-item ${
                      activeView === id ? "nav-item-active" : ""
                    }`}
                    onClick={() => changeView(id)}
                    title={
                      isSidebarCollapsed
                        ? `${label} — ${description}`
                        : undefined
                    }
                    aria-current={activeView === id ? "page" : undefined}
                  >
                    <span className="nav-icon">
                      <Icon size={18} strokeWidth={2} aria-hidden="true" />
                    </span>

                    <span className="nav-item-content">
                      <strong>{label}</strong>
                      <small>{description}</small>
                    </span>
                  </button>
                ))}
              </nav>
              <div className="sidebar-footer">
                {!isSidebarCollapsed && (
                  <div className="sidebar-note">
                    <ShieldCheck size={17} aria-hidden="true" />
                    <div>
                      <strong>Citizen-first</strong>
                      <p>
                        {language === "hi"
                          ? "Simple, clear aur guided."
                          : "Simple, clear and guided."}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </aside>

            {/* MAIN CONTENT */}
            <main ref={mainRef} className="main-content" id="main-content">
              {activeView === "home" && (
                <HomeView
                  language={language}
                  copy={t.home}
                  onSignIn={() => changeView("auth")}
                />
              )}

              {activeView === "learn_hub" && (
                <div className="learn-hub-frame">
                  <LearnHubSidebar
                    currentNode={currentNode}
                    setCurrentNode={setCurrentNode}
                  />

                  <LearnHubContent
                    currentNode={currentNode}
                    isLoggedIn={!!session}
                    userProfile={session?.profile || null}
                  />
                </div>
              )}

              {activeView === "judge_panel" && <JudgeDashboard />}

              {activeView !== "home" &&
                activeView !== "learn_hub" &&
                activeView !== "judge_panel" && (
                  <FoundationView activeView={activeView} language={language} />
                )}
            </main>
          </div>

          {/* MOBILE BOTTOM NAV */}
          <nav className="bottom-nav" aria-label="Mobile navigation">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                type="button"
                key={id}
                className={activeView === id ? "bottom-nav-active" : ""}
                onClick={() => changeView(id)}
              >
                <Icon size={20} aria-hidden="true" />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </>
      )}

      {/* LOCATION PICKER MODAL */}
      {isLocationModalOpen && (
        <LocationPicker
          savedStateKey={locationData.stateKey}
          savedCityKey={locationData.cityKey}
          savedCoords={locationData.coords}
          savedCityName={headerCityName}
          lang={language}
          onSelectLocation={handleLocationSelect}
          onClose={() => setIsLocationModalOpen(false)}
        />
      )}

      {/* FLOATING ACTION ASSISTANTS */}
      <div className="floating-actions" aria-label="Assistant and Jury tools">
        <button
          type="button"
          className="floating-jury-button"
          onClick={() => changeView("judge_panel")}
          aria-label="Open Jury"
          title="Open Jury"
        >
          <Award size={18} aria-hidden="true" />
          <span>Jury</span>
        </button>

        <AISaathi language={language} currentScreen={screenName} />
      </div>
    </div>
  );
}

/* HOME VIEW */
function HomeView({ language, copy, onSignIn }) {
  const personaCards = copy.personas.map((persona, index) => ({
    ...persona,
    accent: ["persona-blue", "persona-green", "persona-gold"][index],
  }));

  const icons = [BookOpenCheck, Bike, Sparkles, ShieldCheck];

  const futureModules = copy.modules.map((module, index) => ({
    ...module,
    icon: icons[index % icons.length],
  }));

  return (
    <div className="content-grid home-page">
      <Hero language={language} onStartService={onSignIn} />

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
  );
}

/* FOUNDATION VIEW */
function FoundationView({ activeView, language }) {
  const descriptions = {
    driver: [
      "Driver services",
      language === "hi"
        ? "LL, DL renewal aur document-related journeys ko step-by-step samajhein."
        : "Understand LL, DL renewal and document journeys step by step.",
    ],
    vehicle: [
      "Vehicle",
      language === "hi"
        ? "RC, ownership aur compliance se related information ek clearer flow mein milegi."
        : "RC, ownership and compliance information will be organized into a clearer flow.",
    ],
    help: [
      "Help & support",
      language === "hi"
        ? "Agar kahin stuck hain, simple next-step guidance yahan milegi."
        : "If you are stuck, simple next-step guidance will be available here.",
    ],
  };

  const fallback = [
    "Parivahan Saathi",
    language === "hi"
      ? "Citizen service experience"
      : "Citizen service experience",
  ];

  const [title, description] = descriptions[activeView] || fallback;

  return (
    <section className="placeholder-card foundation-view">
      <div className="placeholder-icon">
        <Sparkles size={28} aria-hidden="true" />
      </div>

      <p className="eyebrow">
        {language === "hi" ? "नागरिक सेवा" : "Citizen service"}
      </p>

      <h2>{title}</h2>
      <p>{description}</p>

      <span className="status-pill status-muted">Prototype view</span>
    </section>
  );
}

export default App;
