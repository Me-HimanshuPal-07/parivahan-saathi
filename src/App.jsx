import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import {
  Award,
  Bell,
  Bike,
  BookOpenCheck,
  BusFront,
  ChevronRight,
  ChevronLeft,
  ChevronsLeft,
  ChevronsRight,
  CircleUserRound,
  Crown,
  FileBadge,
  GraduationCap,
  IdCard,
  LifeBuoy,
  Lightbulb,
  LogIn,
  MapPin,
  Menu,
  Scale,
  ShieldCheck,
  Sparkles,
  UserRound,
  X,
  Zap,
  ArrowRight,
} from "lucide-react";

import { AuthFlow } from "./components/AuthFlow";
import AccountDashboard from "./components/Account/AccountDashboard";
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
import VahanView from "./components/VahanView";
import SupportView from "./components/SupportView";

/* =========================================================================
   MASTER DRIVER DICTIONARY (रेंडर साइकिल से बाहर सुरक्षित)
   ========================================================================= */
const MASTER_DRIVER_DICTIONARY = {
  english: {
    hubTitle: "Sarathi Mobility Identity Engine",
    hubSubtitle:
      "Bypass legacy public tech layers. Access, update, and manage your statutory legal operating credentials across 20 core transaction paths directly on client memory hooks.",
    llExplainTitle:
      "Why is a Learner's Licence mandatory before permanent issuance?",
    llExplainBody:
      "Under Motor Vehicles Acts, the Learner's Licence is a controlled statutory training permit valid for 180 days. It gives citizens a safe, zero-liability practice window to learn road rule markers before testing for an unrestricted driving title on a physical RTO track loop.",
    llMainHeader: "🪪 Learner's Licence (LL) Privilege Shell",
    dlMainHeader: "👑 Unrestricted Driving Licence (DL) Lifecycle Shell",
    ll_onboard: "Category 1.1: Core Onboarding (Form to Proctored Exam)",
    ll_maintenance: "Category 1.2: Maintenance & Digital Copy Recovery",
    dl_track: "Category 2.1: Formal Track Clearance & Slot Allotments",
    dl_mod: "Category 2.2: Legal Identity Profile Modifications",
    dl_fleet: "Category 2.3: Fleet Lifecycle & Commercial Endorsements",
    viewAll: "View All 15+ Paths",

    services: {
      "2.1.1": {
        title: "New LL Application",
        desc: "Initiate faceless identity sync forms.",
      },
      "2.1.2": {
        title: "Faceless Video Test Slot",
        desc: "Take your face-proctored road exam from home.",
      },
      "2.1.7": {
        title: "Mock Sign Quiz Game",
        desc: "Practice road safety signs trivia in a gamified grid.",
      },
      "2.1.5": {
        title: "Duplicate LL Print Download",
        desc: "Recover and reprint your digital certificate copy instantly.",
      },
      "2.1.3": {
        title: "Class of Vehicle Endorsement",
        desc: "Add scooter or four-wheeler tags to your file.",
      },
      "2.1.6": {
        title: "Expired LL File Recovery Node",
        desc: "Restore expired training records safely.",
      },
      "2.1.4": {
        title: "Online Fee UPI Counter",
        desc: "Clear application taxes via instant UPI tokens.",
      },
      "2.1.8": {
        title: "Identity Bio-Data Re-hydration",
        desc: "Sync updated address details to your license file.",
      },
      "2.2.1": {
        title: "Fresh Permanent DL Form",
        desc: "Upgrade training permit to a permanent card title.",
      },
      "2.2.2": {
        title: "Automated RTO Track Booking",
        desc: "Schedule your physical driving track slot loop.",
      },
      "2.2.3": {
        title: "Mandatory DL Renewal Desk",
        desc: "Extend expired smart-card validation dates online.",
      },
      "2.3.1": {
        title: "Change of Address Registry",
        desc: "Migrate residential state listings via identity hooks.",
      },
      "2.3.2": {
        title: "Official Name & Initial Correction",
        desc: "Rectify spelling errors after marriage or gazette updates.",
      },
      "2.3.3": {
        title: "Duplicate Smart Card Issuance",
        desc: "Order replacement cards for lost or mutilated DLs.",
      },
      "2.3.4": {
        title: "International Driving Permit (IDP)",
        desc: "Request global driving permissions valid for 1 year.",
      },
      "2.3.5": {
        title: "Paper to Smart Card Upgrade",
        desc: "Convert legacy hand-written books to digital chip cards.",
      },
      "2.3.6": {
        title: "DL Extract History Verification",
        desc: "Retrieve verified administrative logs for insurance files.",
      },
      "2.3.7": {
        title: "Hazardous Transport Class Endorsement",
        desc: "Unlock commercial permits for liquid/gas fleet operations.",
      },
      "2.3.8": {
        title: "Organ Donor Voluntary Switch",
        desc: "Toggle voluntary organ donor metrics on your credential file.",
      },
      "2.3.9": {
        title: "Surrender of DL Category",
        desc: "Voluntarily forfeit heavy machinery operating permissions safely.",
      },
    },
  },
  hinglish: {
    hubTitle: "Sarathi Mobility Identity Engine",
    hubSubtitle:
      "Purane complicated system ko kahein bye. Apne licenses aur rules ko manage karein direct client-side state rows ke through—bina bicheliyo ke.",
    llExplainTitle:
      "Permanent Driving Licence se pehle Learner Licence lena kyun zaroori hai?",
    llExplainBody:
      "Motor Vehicles Act ke mutabik, Learner License ek 180-days ka mandatory learning permit hai. Ye citizens ko bina ghabrahat road signs aur driving practice karne ka mauka deta hai, taaki aap physical RTO automated driving track test pehli baar mein clear kar sakein.",
    llMainHeader: "🪪 Learner's Licence (LL) Privilege Shell",
    dlMainHeader: "👑 Unrestricted Driving Licence (DL) Lifecycle Shell",
    ll_onboard: "Category 1.1: Core Onboarding (Form Application to Exam)",
    ll_maintenance: "Category 1.2: Maintenance & Digital Copy Recovery",
    dl_track: "Category 2.1: RTO Track Clearance & Slot Booking",
    dl_mod: "Category 2.2: Profile & Identity Modifications",
    dl_fleet: "Category 2.3: Fleet Lifecycles & Commercial Permissions",
    viewAll: "View All 15+ Paths",

    services: {
      "2.1.1": {
        title: "New LL Application",
        desc: "Faceless verification sync ke through 5 mins mein apply karein.",
      },
      "2.1.2": {
        title: "Faceless Video Test Slot",
        desc: "Ghar baithe camera ke saamne online safe test slot dein.",
      },
      "2.1.7": {
        title: "Mock Sign Quiz Game",
        desc: "Real test se pehle road signs safety game kheleina.",
      },
      "2.1.5": {
        title: "Duplicate LL Print Download",
        desc: "Apna digital certificate copy instantly re-download karein.",
      },
      "2.1.3": {
        title: "Class of Vehicle Endorsement",
        desc: "Apne licence file mein scooter ya four-wheeler categories jodein.",
      },
      "2.1.6": {
        title: "Expired LL File Recovery Node",
        desc: "180 days khatam hone par purana record dobara active karein.",
      },
      "2.1.4": {
        title: "Online Fee UPI Counter",
        desc: "Application taxes aur slot fees simple UPI se bharein.",
      },
      "2.1.8": {
        title: "Identity Bio-Data Re-hydration",
        desc: "Naya mobile number aur address license profile mein sync karein.",
      },
      "2.2.1": {
        title: "Fresh Permanent DL Form",
        desc: "Upgrade training permit to a permanent card title.",
      },
      "2.2.2": {
        title: "Automated RTO Track Booking",
        desc: "Physical driving trial ke liye nearby track aur time book karein.",
      },
      "2.2.3": {
        title: "Mandatory DL Renewal Desk",
        desc: "Expired DL smart card ko bina kisi agent ke renew karein.",
      },
      "2.3.1": {
        title: "Change of Address Registry",
        desc: "Naya residential address identity hooks se update karein.",
      },
      "2.3.2": {
        title: "Official Name & Initial Correction",
        desc: "DL par naam ki spelling ya surname securely thik karein.",
      },
      "2.3.3": {
        title: "Duplicate Smart Card Issuance",
        desc: "DL khone ya tootne par naya smart card order karein.",
      },
      "2.3.4": {
        title: "International Driving Permit (IDP)",
        desc: "Foreign countries mein drive karne ke liye 1-year permit lein.",
      },
      "2.3.5": {
        title: "Paper to Smart Card Upgrade",
        desc: "Purani offline kitabo ko chip-enabled digital card mein badlein.",
      },
      "2.3.6": {
        title: "DL Extract History Verification",
        desc: "Insurance claims ke liye official history record check karein.",
      },
      "2.3.7": {
        title: "Hazardous Transport Class Endorsement",
        desc: "Heavy commercial liquid/gas vehicles chalane ki special tag jodein.",
      },
      "2.3.8": {
        title: "Organ Donor Voluntary Switch",
        desc: "Accident conditions ke liye swa-ichhik organ donation toggle karein.",
      },
      "2.3.9": {
        title: "Surrender of DL Category",
        desc: "Heavy loading category ka access securely department ko vapis karein.",
      },
    },
  },
  hi: {
    hubTitle: "सारथी गतिशीलता पहचान इंजन",
    hubSubtitle:
      "पुराने जटिल सिस्टम को कहें अलविदा। बिना किसी दलाल के, सीधे अपने ब्राउज़र की रैम मेमोरी पर अपने ड्राइविंग लाइसेंस, नियमों और दस्तावेज़ों को प्रबंधित करें।",
    llExplainTitle:
      "स्थायी ड्राइविंग लाइसेंस (DL) से पहले लर्निंग लाइसेंस (LL) बनाना क्यों अनिवार्य है?",
    llExplainBody:
      "मोटर वाहन अधिनियम के तहत, लर्नर लाइसेंस १८० दिनों के लिए मान्य एक प्राथमिक प्रशिक्षण परमिट है। यह नागरिकों को सड़कों पर नियमों और संकेतों को सीखने की पूरी आजादी देता है, ताकि वे बिना किसी दुर्घटना जोखिम के अभ्यास कर सकें और आरटीओ के ऑटोमेटेड ट्रैक पर पहली बार में ही टेस्ट पास कर सकें।",
    llMainHeader: "🪪 १. लर्नर लाइसेंस (LL) प्रोग्रेस शेल",
    dlMainHeader: "👑 २. स्थायी ड्राइविंग लाइसेंस (DL) जीवनचक्र शेल",
    ll_onboard: "श्रेणी 1.1: मुख्य पंजीकरण (फॉर्म से वीडियो परीक्षा)",
    ll_maintenance: "श्रेणी 1.2: रखरखाव एवं डिजिटल कॉपी रिकवरी",
    dl_track: "श्रेणी 2.1: आरटीओ ट्रैक क्लीयरेंस एवं स्लॉट अलॉटमेंट",
    dl_mod: "श्रेणी 2.2: प्रोफाइल एवं व्यक्तिगत विवरण संशोधन",
    dl_fleet: "श्रेणी 2.3: लाइसेंस जीवनचक्र एवं व्यावसायिक अनुमतियां",
    viewAll: "सभी १५+ सेवाएं देखें",

    services: {
      "2.1.1": {
        title: "नया लर्नर लाइसेंस आवेदन",
        desc: "फेसलेस ई-केवाईसी द्वारा मात्र ५ मिनट में नया फॉर्म सबमिट करें।",
      },
      "2.1.2": {
        title: "फेसलेस होम वीडियो टेस्ट स्लॉट",
        desc: "आरटीओ के धक्के खाए बिना घर बैठे कैमरे के सामने ऑनलाइन परीक्षा दें।",
      },
      "2.1.7": {
        title: "मॉक ट्रैफिक संकेत क्विज़ गेम",
        desc: "परीक्षा के डर को दूर करने के लिए सड़क सुरक्षा संकेतों का लाइव गेम खेलें।",
      },
      "2.1.5": {
        title: "डुप्लिकेट एलएल कॉपी डाउनलोड",
        desc: "अपना सर्टिफिकेट खो जाने या फट जाने पर डिजिटल कॉपी तुरंत निकालें।",
      },
      "2.1.3": {
        title: "वाहन श्रेणी एंडोर्समेंट (COV)",
        desc: "अपने लाइसेंस रिकॉर्ड में टू-व्हीलर या फोर-व्हीलर की श्रेणी जोड़ें।",
      },
      "2.1.6": {
        title: "एक्सपायर्ड एलएल फाइल रिकवरी नोड",
        desc: "१८० दिन की अवधि बीत जाने पर पुराने रिकॉर्ड को पुनः सक्रिय करें।",
      },
      "2.1.4": {
        title: "ऑनलाइन सरकारी फीस यूपीआई काउंटर",
        desc: "आवेदन एवं स्लॉट की सरकारी फीस का पारदर्शी २-क्लिक यूपीआई भुगतान।",
      },
      "2.1.8": {
        title: "बायो-डेटा री-हाइड्रेशन",
        desc: "कार्ड का नया पता या मोबाइल नंबर लाइसेंस फाइल में अपडेट करें।",
      },
      "2.2.1": {
        title: "नया स्थायी लाइसेंस आवेदन",
        desc: "लर्निंग लाइसेंस के ३० दिन पूरे होने पर पक्के ड्राइविंग कार्ड का आवेदन।",
      },
      "2.2.2": {
        title: "स्वचालित आरटीओ ट्रैक बुकिंग",
        desc: "क्षेत्रीय आरटीओ ट्रैक पर गाड़ी चलाने के टेस्ट का समय ऑनलाइन बुक करें।",
      },
      "2.2.3": {
        title: "अनिवार्य डीएल नवीनीकरण डेस्क",
        desc: "वैधता खत्म होने पर पक्के स्मार्ट कार्ड के ऑनलाइन नवीनीकरण का फॉर्म।",
      },
      "2.3.1": {
        title: "लाइसेंस पर घर का पता बदलें",
        desc: "राज्य या शहर बदलने पर सिंक द्वारा पते का ऑनलाइन स्थानांतरण।",
      },
      "2.3.2": {
        title: "आधिकारिक नाम एवं स्पेलिंग सुधार",
        desc: "विवाह या गजट के बाद लाइसेंस पर अक्षरों की त्रुटियों को दूर करें।",
      },
      "2.3.3": {
        title: "डुप्लिकेट स्मार्ट कार्ड जारी करना",
        desc: "डीएल कार्ड खो जाने या टूटने पर नया क्यूआर-कोड स्मार्ट कार्ड मंगाएं।",
      },
      "2.3.4": {
        title: "अंतरराष्ट्रीय ड्राइविंग परमिट (IDP)",
        desc: "विदेशों में गाड़ी चलाने के लिए १ वर्ष के विशेष परमिट का ऑनलाइन आवेदन।",
      },
      "2.3.5": {
        title: "कागजी लाइसेंस से स्मार्ट कार्ड अपग्रेड",
        desc: "पुरानी ऑफलाइन कागजी बही को चिप वाले डिजिटल स्मार्ट कार्ड में बदलें।",
      },
      "2.3.6": {
        title: "डीएल एक्सट्रैक्ट इतिहास सत्यापन",
        desc: "बीमा दावों के लिए लाइसेंस का प्रमाणित इतिहास रिकॉर्ड प्राप्त करें।",
      },
      "2.3.7": {
        title: "कमर्शियल हैजार्डस श्रेणी एंडोर्समेंट",
        desc: "तरल पदार्थ/गैस टैंकर जैसे भारी वाहनों को चलाने की विशेष अनुमति जोड़ें।",
      },
      "2.3.8": {
        title: "स्वैच्छिक अंगदान सहमति स्विच",
        desc: "दुर्घटना की स्थिति में अंगदान करने की डिजिटल रजामंदी का टॉगल।",
      },
      "2.3.9": {
        title: "डीएल विशिष्ट श्रेणी सरेंडर प्रक्रिया",
        desc: "भारी मशीनरी चलाने के अधिकार को विभाग को सुरक्षित वापस सौंपें।",
      },
    },
  },
};

/* =========================================================================
   🪪 DRIVER VIEW COMPONENT
   ========================================================================= */
function DriverView({ language, setCurrentNode, changeView }) {
  const [activeTab, setActiveTab] = useState("all");
  const langKey = MASTER_DRIVER_DICTIONARY[language] ? language : "english";
  const dict = MASTER_DRIVER_DICTIONARY[langKey];

  const handleActionRedirect = (nodeId) => {
    setCurrentNode(nodeId);
    changeView("learn_hub");
  };

  const renderServiceCard = (id, badge = null) => {
    const service = dict.services[id];
    if (!service) return null;
    return (
      <div
        key={id}
        onClick={() => handleActionRedirect(id)}
        className="app-service-tile"
        tabIndex={0}
      >
        <div className="app-tile-header">
          <div className="app-tile-icon">
            <Zap size={18} />
          </div>
          {badge && (
            <span className={`app-badge ${badge.type}`}>{badge.label}</span>
          )}
        </div>
        <div className="app-tile-body">
          <h4 className="app-tile-title">{service.title}</h4>
          <p className="app-tile-desc">{service.desc}</p>
        </div>
        <div className="app-tile-action">
          <span>Action Node</span>
          <ArrowRight size={14} className="arrow" />
        </div>
      </div>
    );
  };

  return (
    <div className="app-workspace-container">
      {/* Top Mobile-Optimized Header */}
      <header className="app-top-bar">
        <div className="app-title-group">
          <div className="app-live-indicator">
            <span className="pulse-dot"></span>
            <span>RTO Registry Mesh Active</span>
          </div>
          <h1 className="app-main-heading">{dict.hubTitle}</h1>
        </div>

        {/* Dynamic Mobile Segmented Tabs */}
        <div className="segmented-control-wrapper">
          <div className="segmented-control">
            <button
              type="button"
              className={`segment-btn ${activeTab === "all" ? "active" : ""}`}
              onClick={() => setActiveTab("all")}
            >
              All Nodes
            </button>
            <button
              type="button"
              className={`segment-btn ${activeTab === "ll" ? "active" : ""}`}
              onClick={() => setActiveTab("ll")}
            >
              LL Privilege
            </button>
            <button
              type="button"
              className={`segment-btn ${activeTab === "dl" ? "active" : ""}`}
              onClick={() => setActiveTab("dl")}
            >
              DL Lifecycle
            </button>
          </div>
        </div>
      </header>

      {/* Mobile-Friendly Advisory Glass Card */}
      <div className="app-advisory-floating">
        <div className="advisory-icon-glow">
          <Lightbulb size={20} />
        </div>
        <div className="advisory-content">
          <h4>{dict.llExplainTitle}</h4>
          <p>{dict.llExplainBody}</p>
        </div>
      </div>

      {/* Main Responsive Grid */}
      <div className="app-grid-workspace">
        {/* SECTION 1: Learner Licence Shell */}
        {(activeTab === "all" || activeTab === "ll") && (
          <div className="app-section-panel">
            <div className="panel-header">
              <h3>
                <FileBadge
                  size={20}
                  style={{ display: "inline", marginRight: 8 }}
                />
                {dict.llMainHeader.replace("🪪 ", "")}
              </h3>
              <span className="panel-tag">Stage 01</span>
            </div>

            <div className="panel-group">
              <span className="group-label">{dict.ll_onboard}</span>
              <div className="app-tiles-grid">
                {renderServiceCard("2.1.1", {
                  type: "online",
                  label: "Faceless",
                })}
                {renderServiceCard("2.1.2", {
                  type: "online",
                  label: "Faceless",
                })}
                {renderServiceCard("2.1.7", {
                  type: "interactive",
                  label: "Quiz",
                })}
                {renderServiceCard("2.1.4", {
                  type: "pay",
                  label: "Instant UPI",
                })}
              </div>
            </div>

            <div className="panel-group mt-mobile-4">
              <span className="group-label">{dict.ll_maintenance}</span>
              <div className="app-tiles-grid">
                {renderServiceCard("2.1.5")}
                {renderServiceCard("2.1.3")}
                {renderServiceCard("2.1.6")}
                {renderServiceCard("2.1.8")}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 2: Driving Licence Shell */}
        {(activeTab === "all" || activeTab === "dl") && (
          <div className="app-section-panel">
            <div className="panel-header">
              <h3>
                <Crown
                  size={20}
                  style={{ display: "inline", marginRight: 8 }}
                />
                {dict.dlMainHeader.replace("👑 ", "")}
              </h3>
              <span className="panel-tag gold">Stage 02</span>
            </div>

            <div className="panel-group">
              <span className="group-label">{dict.dl_track}</span>
              <div className="app-tiles-grid">
                {renderServiceCard("2.2.1", {
                  type: "rto",
                  label: "RTO Track",
                })}
                {renderServiceCard("2.2.2")}
                {renderServiceCard("2.2.3")}
              </div>
            </div>

            <div className="panel-group mt-mobile-4">
              <span className="group-label">{dict.dl_mod}</span>
              <div className="app-tiles-grid">
                {renderServiceCard("2.3.1")}
                {renderServiceCard("2.3.2")}
                {renderServiceCard("2.3.3")}
              </div>
            </div>

            <div className="panel-group mt-mobile-4">
              <span className="group-label">{dict.dl_fleet}</span>
              <div className="app-tiles-grid">
                {["2.3.4", "2.3.5", "2.3.6", "2.3.7", "2.3.8", "2.3.9"].map(
                  (id) => renderServiceCard(id),
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

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
      id: "support",
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
      support: "Help & support",
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

      {session ? (
        <AccountDashboard
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

            <main ref={mainRef} className="main-content" id="main-content">
              {/* 1. Home View */}
              {activeView === "home" && (
                <HomeView
                  language={language}
                  copy={t.home}
                  onSignIn={() => changeView("auth")}
                  setCurrentNode={setCurrentNode}
                  changeView={changeView}
                />
              )}

              {/* 2. Driver Services View */}
              {activeView === "driver" && (
                <DriverView
                  language={language}
                  setCurrentNode={setCurrentNode}
                  changeView={changeView}
                />
              )}

              {/* 3. Vehicle (Vahan) Services View */}
              {activeView === "vehicle" && (
                <VahanView
                  language={language}
                  setCurrentNode={setCurrentNode}
                  changeView={changeView}
                />
              )}

              {/* 4. Support View */}
              {activeView === "support" && (
                <SupportView
                  language={language}
                  setCurrentNode={setCurrentNode}
                  changeView={changeView}
                />
              )}

              {/* 5. Learn Hub View */}
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

              {/* 6. Jury / Judge Panel View */}
              {activeView === "judge_panel" && (
                <JudgeDashboard language={language} />
              )}

              {/* 7. Fallback View (Valid Screens ke bahar koi unexpected view aaye tabhi load hoga) */}
              {activeView !== "home" &&
                activeView !== "driver" &&
                activeView !== "vehicle" &&
                activeView !== "support" &&
                activeView !== "learn_hub" &&
                activeView !== "judge_panel" && (
                  <FoundationView activeView={activeView} language={language} />
                )}
            </main>
          </div>

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

function HomeView({ language, copy, onSignIn, setCurrentNode, changeView }) {
  const [openFaq, setOpenFaq] = useState(null);

  const sarathiServices = Array.isArray(copy?.sarathiServices)
    ? copy.sarathiServices
    : [];

  const vahanServices = Array.isArray(copy?.vahanServices)
    ? copy.vahanServices
    : [];

  const regulations = Array.isArray(copy?.regulations) ? copy.regulations : [];

  const faqs = Array.isArray(copy?.faqs)
    ? copy.faqs
    : Array.isArray(copy?.quickQuestions)
      ? copy.quickQuestions
      : [];

  const sarathiAccents = [
    "persona-blue",
    "persona-green",
    "persona-gold",
    "persona-blue",
  ];

  const vahanAccents = [
    "persona-green",
    "persona-gold",
    "persona-blue",
    "persona-green",
  ];

  const regulationIcons = [Scale, ShieldCheck, BookOpenCheck];

  const openService = (serviceId) => {
    if (!serviceId) return;

    setCurrentNode(serviceId);
    changeView("learn_hub");
  };

  const toggleFaq = (index) => {
    setOpenFaq((current) => (current === index ? null : index));
  };

  return (
    <div className="content-grid home-page">
      <Hero language={language} onStartService={onSignIn} />

      <section className="persona-section">
        <div className="section-heading-row">
          <div>
            <p className="eyebrow">
              {copy?.sarathiEyebrow ||
                copy?.personasEyebrow ||
                "Built for real citizens"}
            </p>

            <h2>{copy?.sarathiTitle || "Sarathi Hub: Most Asked Services"}</h2>
          </div>

          <button
            type="button"
            className="section-action-link"
            onClick={() => changeView("driver")}
          >
            {copy?.sarathiViewAll || "View All 15+ Paths"}

            <ChevronRight size={16} aria-hidden="true" />
          </button>
        </div>

        <div className="persona-grid">
          {sarathiServices.map((service, index) => (
            <button
              type="button"
              key={service.id || service.title}
              className={`persona-card ${
                sarathiAccents[index % sarathiAccents.length]
              }`}
              onClick={() => openService(service.id)}
            >
              <span className="persona-tag">{service.stat}</span>

              <h3>{service.title}</h3>

              <p>{service.subtitle}</p>

              <span className="persona-card-arrow" aria-hidden="true">
                <ChevronRight size={17} />
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="persona-section">
        <div className="section-heading-row">
          <div>
            <p className="eyebrow">
              {copy?.vahanEyebrow || "Vehicle services"}
            </p>

            <h2>{copy?.vahanTitle || "Vahan Hub: Most Asked Services"}</h2>
          </div>

          <button
            type="button"
            className="section-action-link"
            onClick={() => changeView("vehicle")}
          >
            {copy?.vahanViewAll || "View All 15+ Paths"}

            <ChevronRight size={16} aria-hidden="true" />
          </button>
        </div>

        <div className="persona-grid">
          {vahanServices.map((service, index) => (
            <button
              type="button"
              key={service.id || service.title}
              className={`persona-card ${
                vahanAccents[index % vahanAccents.length]
              }`}
              onClick={() => openService(service.id)}
            >
              <span className="persona-tag">{service.stat}</span>

              <h3>{service.title}</h3>

              <p>{service.subtitle}</p>

              <span className="persona-card-arrow" aria-hidden="true">
                <ChevronRight size={17} />
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="future-section">
        <div className="future-heading">
          <div>
            <p className="eyebrow">
              {copy?.rulesEyebrow || "National Safety Codes"}
            </p>

            <h2>{copy?.rulesTitle || "Citizen Rights, Rules & Regulations"}</h2>

            <p>
              {copy?.rulesText ||
                "Understand your legal rights, safety rules and mobility regulations."}
            </p>
          </div>

          <button
            type="button"
            className="section-action-link"
            onClick={() => changeView("learn_hub")}
          >
            {copy?.rulesViewAll || "View All 15+ Paths"}

            <ChevronRight size={16} aria-hidden="true" />
          </button>
        </div>

        <div className="future-grid">
          {regulations.map((regulation, index) => {
            const Icon = regulationIcons[index % regulationIcons.length];

            return (
              <div
                key={regulation.title || `regulation-${index}`}
                className="future-item"
              >
                <span className="future-icon">
                  <Icon size={18} aria-hidden="true" />
                </span>

                <div>
                  <strong>{regulation.title}</strong>

                  <p>{regulation.detail}</p>
                </div>

                <span className="coming-soon">
                  {copy?.rulesBadge || "Verified Law ✓"}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      <section className="future-section">
        <div className="future-heading">
          <div>
            <p className="eyebrow">{copy?.faqEyebrow || "Citizen help desk"}</p>

            <h2>{copy?.faqTitle || "Universal Citizen FAQ Board"}</h2>

            <p>
              {copy?.faqText ||
                "Common transport questions answered in simple language."}
            </p>
          </div>
        </div>

        <div className="future-grid">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;

            return (
              <div
                key={faq.question || `faq-${index}`}
                className={`future-item ${isOpen ? "faq-item-open" : ""}`}
              >
                <button
                  type="button"
                  className="faq-question"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="future-icon">
                    <BookOpenCheck size={18} aria-hidden="true" />
                  </span>

                  <strong>{faq.question}</strong>

                  <span className="faq-chevron" aria-hidden="true">
                    <ChevronRight
                      size={18}
                      className={isOpen ? "faq-chevron-open" : ""}
                    />
                  </span>
                </button>

                {isOpen && (
                  <div id={`faq-answer-${index}`} className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}

          {faqs.length === 0 && (
            <div className="future-item">
              <span className="future-icon">
                <BookOpenCheck size={18} aria-hidden="true" />
              </span>

              <div>
                <strong>
                  {language === "hi"
                    ? "FAQ उपलब्ध नहीं है"
                    : "No FAQ entries available"}
                </strong>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

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
    support: [
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
