import React, { useEffect, useRef, useState } from "react";
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
  const [isScrolled, setIsScrolled] = useState(false);
  const [language, setLanguage] = useState("hinglish"); // 'hi' | 'hinglish' | 'en'
  const [session, setSession] = useState(null);

  const [currentNode, setCurrentNode] = useState("1.1");
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  // Persistent Location State across Modal Re-opens & Language Swapping
  const [locationData, setLocationData] = useState({
    stateKey: "up",
    cityKey: "muzaffarnagar",
    coords: { lat: 29.4727, lng: 77.7085 },
    customCityName: null,
  });

  const mainRef = useRef(null);
  const sidebarRef = useRef(null);

  const t = getCopy(language);

  // Compute Header City Display Name dynamically based on active language
  const getDisplayCityName = () => {
    const currentCityObj = INDIA_LOCATIONS_DATA[
      locationData.stateKey
    ]?.cities.find((c) => c.key === locationData.cityKey);

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
    { id: "home", label: language === "hi" ? "होम" : "Saathi", icon: Sparkles },
    {
      id: "driver",
      label: language === "hi" ? "ड्राइवर सेवाएँ" : "Driver services",
      icon: IdCard,
    },
    {
      id: "vehicle",
      label: language === "hi" ? "वाहन" : "Vehicle",
      icon: Bike,
    },
    {
      id: "learn_hub",
      label: language === "hi" ? "शिक्षा" : "Learn Hub",
      icon: GraduationCap,
    },
    {
      id: "judge_panel",
      label: language === "hi" ? "जूरी स्पेस" : "Jury",
      icon: Award,
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
      className={`min-h-screen bg-[#F5F7FA] text-slate-900 lang-${language} font-['Baloo_2']`}
    >
      <div className="demo-banner">
        <ShieldCheck size={16} aria-hidden="true" />
        <span>
          Prototype only — all profiles, documents, payments and records are
          synthetic.
        </span>
      </div>

      <header className={`topbar ${isScrolled ? "topbar-scrolled" : ""}`}>
        {/* Left Side: Only Logo & Brand Name */}
        <a
          className="brand"
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            changeView("home");
          }}
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
          </span>
        </a>

        {/* Right Side Actions Block */}
        <div className="topbar-actions flex items-center gap-2">
          {/* 🖥️ DESKTOP LOCATION CHIP: Ab yahan Right side me Place hai */}
          <button
            type="button"
            onClick={() => setIsLocationModalOpen(true)}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#EBF3FC] text-[#2A52BE] hover:bg-[#2A52BE] hover:text-white transition-all text-xs font-semibold cursor-pointer shadow-xs border border-[#2A52BE]/10"
            title={headerCityName}
          >
            <MapPin size={13} aria-hidden="true" />
            <span className="truncate max-w-[130px]">{headerCityName}</span>
          </button>

          {/* 📱 MOBILE LOCATION ICON */}
          <button
            type="button"
            onClick={() => setIsLocationModalOpen(true)}
            className="lg:hidden flex items-center justify-center p-2 rounded-full bg-[#EBF3FC] text-[#2A52BE] active:scale-95 transition-all border border-[#2A52BE]/10 shadow-xs"
            title={`Location: ${headerCityName}`}
            aria-label="Change location"
          >
            <MapPin size={16} className="shrink-0" />
          </button>

          {/* 🌐 Language Switcher */}
          <LanguagePicker language={language} onChange={setLanguage} />

          {/* Notifications & Auth Buttons */}
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
              className="icon-button mobile-only menu-toggle flex items-center justify-center p-2 rounded-xl text-slate-700 hover:bg-slate-100 active:scale-95 transition-all cursor-pointer"
              type="button"
              aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              {isMenuOpen ? (
                <X size={20} strokeWidth={2.2} aria-hidden="true" />
              ) : (
                <Menu size={20} strokeWidth={2.2} aria-hidden="true" />
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
              className={`sidebar ${
                isMenuOpen ? "sidebar-open" : ""
              } ${isScrolled ? "sidebar-scrolled" : ""}`}
              aria-label="Main navigation"
            >
              <div className="lg:hidden px-3 py-2.5 mb-2 bg-[#EBF3FC] rounded-2xl border border-[#2A52BE]/10 flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#2A52BE]">
                  <MapPin size={16} />
                  <span className="text-xs font-bold truncate max-w-[150px]">
                    {headerCityName}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsLocationModalOpen(true);
                  }}
                  className="text-[11px] font-bold text-[#2A52BE] underline"
                >
                  Change
                </button>
              </div>

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
                    className={`nav-item ${
                      activeView === id ? "nav-item-active" : ""
                    }`}
                    type="button"
                    key={id}
                    onClick={() => changeView(id)}
                  >
                    <Icon size={18} aria-hidden="true" />
                    <span>{label}</span>
                  </button>
                ))}
              </nav>
            </aside>

            <div ref={mainRef} className="main-content">
              {activeView === "home" && (
                <HomeView
                  language={language}
                  copy={t.home}
                  onNavigate={changeView}
                  onSignIn={() => changeView("auth")}
                />
              )}

              {activeView === "learn_hub" && (
                <div className="flex w-full min-h-[calc(100vh-140px)] bg-[#F5F7FA] rounded-2xl border border-gray-200/60 overflow-hidden shadow-2xs animate-fadeIn">
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
                  <div className="placeholder-card">
                    <span aria-hidden="true">⚙️</span>
                    <h2>{viewTitle} Engine View</h2>
                    <p>
                      This standard transactional module view is fully
                      cataloged. Transaction state logs are locked under the
                      primary portal gateway.
                    </p>
                  </div>
                )}
            </div>
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
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </>
      )}

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

      <AISaathi language={language} currentScreen={screenName} />
    </div>
  );
}

function HomeView({ language, copy, onNavigate, onSignIn }) {
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
    <div className="content-grid home-hero-layout space-y-8 animate-fadeIn">
      <Hero language={language} onStartService={onSignIn} />

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
              onClick={() => onNavigate("driver")}
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
  );
}

export default App;
