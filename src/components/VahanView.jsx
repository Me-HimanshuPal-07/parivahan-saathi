import React, { useState } from "react";
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
  Truck,
  Building2,
  CreditCard,
  FileText
} from "lucide-react";

/* =========================================================================
   MASTER VAHAN DICTIONARY (Multilingual: English, Hinglish, Hindi)
   ========================================================================= */
const MASTER_VAHAN_DICTIONARY = {
  english: {
    hubTitle: "Vahan Mobility & Registry Engine",
    cat_onboarding: "Registration & Fitness Shell",
    cat_transfer: "Ownership Transfer & NOC Shell",
    cat_finance: "Bank Hypothecation & Loan Shell",
    cat_permits: "Commercial Permits & Tax Shell",
    
    cat_reg_sub: "1.1 Registration Clearance",
    cat_fit_sub: "1.2 Vehicle Health & Logs",
    cat_trans_sub: "2.1 Ownership & Transfer",
    cat_noc_sub: "2.2 State & BH Operations",
    cat_hyp_sub: "3.1 Bank Lien Management",
    cat_tax_sub: "4.1 Fleet Permits & Taxes",

    explainTitle: "Vahan Digital Identity Privilege",
    explainBody: "All RC modifications, transfer of ownership, and bank hypothecation clearance paths are faceless-enabled via digital verification.",
    
    services: {
      "3.1.1": { title: "New RC Application", desc: "Apply for fresh vehicle registration & temporary RC tags." },
      "3.1.2": { title: "Fitness Certificate Renewal", desc: "Renew mandatory fitness validation for commercial & private fleets." },
      "3.1.3": { title: "Duplicate RC Download", desc: "Recover lost or damaged registration cards digitally." },
      "3.1.4": { title: "RC Extract Verification", desc: "Download verified administrative vehicle logs for legal/insurance use." },
      
      "3.2.1": { title: "RC Transfer of Ownership", desc: "Transfer vehicle title after sale, death, or public auction." },
      "3.2.2": { title: "Address Change in RC", desc: "Update current residential address across inter-state boundaries." },
      "3.2.3": { title: "NOC Issuance (Inter-State)", desc: "Apply for No Objection Certificate to re-register in another state." },
      "3.2.4": { title: "BH-Series Conversion", desc: "Convert standard state plate to national BH-series tax permit." },

      "3.3.1": { title: "Hypothecation Addition (HP)", desc: "Endorse bank loan details on vehicle registration records." },
      "3.3.2": { title: "Hypothecation Termination (HPT)", desc: "Remove bank lien tags after completing loan repayment." },
      "3.3.3": { title: "Loan Continuation Clearance", desc: "Renew or shift existing bank finance agreements on RC." },

      "3.4.1": { title: "Road Tax & Green Tax", desc: "Pay annual motor vehicle taxes and green environmental surcharges." },
      "3.4.2": { title: "National Commercial Permit", desc: "Issue 5-year all-India permits for heavy goods & passenger fleet." },
      "3.4.3": { title: "Trade Certificate Desk", desc: "Apply and renew vehicle dealer/manufacturer operating tags." },
      "3.4.4": { title: "RC Scrapping Surrender", desc: "File mandatory surrender for end-of-life or scrapped vehicles." },
    },
  },
  hinglish: {
    hubTitle: "Vahan Mobility & Registry Engine",
    cat_onboarding: "Registration & Fitness Shell",
    cat_transfer: "Ownership Transfer & NOC Shell",
    cat_finance: "Bank Hypothecation & Loan Shell",
    cat_permits: "Commercial Permits & Tax Shell",
    
    cat_reg_sub: "1.1 Registration Clearance",
    cat_fit_sub: "1.2 Vehicle Health & Logs",
    cat_trans_sub: "2.1 Ownership & Transfer",
    cat_noc_sub: "2.2 State & BH Operations",
    cat_hyp_sub: "3.1 Bank Lien Management",
    cat_tax_sub: "4.1 Fleet Permits & Taxes",

    explainTitle: "Vahan Digital Identity Privilege",
    explainBody: "Apne vehicle ki registration, ownership transfer, bank NOC aur road tax ko manage karein bina RTO ke chakkar kaate.",
    
    services: {
      "3.1.1": { title: "New RC Application", desc: "Naye vahan ki permanent registration aur number plate process karein." },
      "3.1.2": { title: "Fitness Certificate Renewal", desc: "15 sal se purani gadiyon ya commercial fleet ki fitness renew karein." },
      "3.1.3": { title: "Duplicate RC Download", desc: "Ghum ya kharab hui RC ki official digital copy re-download karein." },
      "3.1.4": { title: "RC Extract Verification", desc: "Insurance claims ya court verification ke liye official history extract lein." },
      
      "3.2.1": { title: "RC Transfer of Ownership", desc: "Gadi bechne par malikana haq buyer ke naam securely transfer karein." },
      "3.2.2": { title: "Address Change in RC", desc: "Naya ghar ya shehar badalney par RC me naya address sync karein." },
      "3.2.3": { title: "NOC Issuance (Inter-State)", desc: "Dusre rajya me gadi shift karne ke liye RTO No-Objection Certificate lein." },
      "3.2.4": { title: "BH-Series Conversion", desc: "State registration ko hassle-free BH (Bharat) series me convert karein." },

      "3.3.1": { title: "Hypothecation Addition (HP)", desc: "Gadi par bank loan tag digital RC record me add karein." },
      "3.3.2": { title: "Hypothecation Termination (HPT)", desc: "Loan poora hone par bank ka naam aur HP lien tag hatayein." },
      "3.3.3": { title: "Loan Continuation Clearance", desc: "Bank refinance ya loan extension details RC file me update karein." },

      "3.4.1": { title: "Road Tax & Green Tax", desc: "Pending road tax aur green pollution surcharges online clear karein." },
      "3.4.2": { title: "National Commercial Permit", desc: "Commercial trucks aur taxis ke liye All India Tourist Permit lein." },
      "3.4.3": { title: "Trade Certificate Desk", desc: "Auto dealers aur test-drive vehicles ke liye trade tags issue karein." },
      "3.4.4": { title: "RC Scrapping Surrender", desc: "Purani ya scrap gadiyon ka RC record official system se surrender karein." },
    },
  },
  hi: {
    hubTitle: "वाहन गतिशीलता एवं पंजीकरण इंजन",
    cat_onboarding: "पंजीकरण एवं फिटनेस शैल",
    cat_transfer: "स्वामित्व हस्तांतरण एवं एनओसी शैल",
    cat_finance: "बैंक हाइपोथेकेशन एवं लोन शैल",
    cat_permits: "कमर्शियल परमिट एवं टैक्स शैल",

    cat_reg_sub: "१.१ पंजीकरण मंजूरी",
    cat_fit_sub: "१.२ वाहन फिटनेस रिकॉर्ड",
    cat_trans_sub: "२.१ मालिकाना हस्तांतरण",
    cat_noc_sub: "२.२ राज्य व बीएच ट्रांसफर",
    cat_hyp_sub: "३.१ बैंक लोन एनओसी",
    cat_tax_sub: "४.१ commercial परमिट व टैक्स",

    explainTitle: "वाहन डिजिटल पहचान सुविधा",
    explainBody: "अपने वाहन का पंजीकरण, मालिकाना हस्तांतरण, बैंक लोन एनओसी और रोड टैक्स सीधे डिजिटल सत्यापन द्वारा प्रबंधित करें।",

    services: {
      "3.1.1": { title: "नया आरसी पंजीकरण", desc: "नए वाहन का स्थायी रजिस्ट्रेशन और नंबर प्लेट आवेदन करें।" },
      "3.1.2": { title: "फिटनेस प्रमाण पत्र नवीनीकरण", desc: "१५ वर्ष पुरानी गाड़ियों एवं वाणिज्यिक वाहनों की फिटनेस रिन्यू करें।" },
      "3.1.3": { title: "डुप्लिकेट आरसी कॉपी डाउनलोड", desc: "आरसी खो जाने या फटने पर आधिकारिक डिजिटल कार्ड डाउनलोड करें।" },
      "3.1.4": { title: "आरसी एक्सट्रैक्ट सत्यापन", desc: "बीमा दावों एवं कानूनी कार्यों के लिए प्रमाणित वाहन इतिहास प्राप्त करें।" },
      
      "3.2.1": { title: "आरसी स्वामित्व हस्तांतरण", desc: "वाहन बेचने या ट्रांसफर करने पर नए मालिक के नाम ट्रांसफर दर्ज करें।" },
      "3.2.2": { title: "आरसी पर पता बदलें", desc: "स्थान परिवर्तन होने पर नया निवास स्थान आरसी में ऑनलाइन अपडेट करें।" },
      "3.2.3": { title: "अंतर-राज्यीय एनओसी (NOC)", desc: "वाहन को दूसरे राज्य में ले जाने के लिए नो-ऑब्जेक्शन सर्टिफिकेट प्राप्त करें।" },
      "3.2.4": { title: "बीएच-सीरीज (BH-Series) रूपांतरण", desc: "राज्य नंबर को भारत (BH) सीरीज में बदलकर ऑल-इंडिया ट्रांसफर फ्री करें।" },

      "3.3.1": { title: "हाइपोथेकेशन दर्ज करें (HP)", desc: "आरसी रिकॉर्ड पर बैंक लोन का ब्योरा जोड़ें।" },
      "3.3.2": { title: "हाइपोथेकेशन समाप्त करें (HPT)", desc: "लोन चुकता होने पर बैंक का नाम और हाइपोथेकेशन टैग हटाएं।" },
      "3.3.3": { title: "लोन निरन्तरता मंजूरी", desc: "वाहन के रिफाइनेंस या लोन एक्सटेंशन का रिकॉर्ड आरसी पर चढ़ाएं।" },

      "3.4.1": { title: "रोड टैक्स एवं ग्रीन टैक्स", desc: "वाहन का बकाया रोड टैक्स और पर्यावरण ग्रीन टैक्स ऑनलाइन भरें।" },
      "3.4.2": { title: "राष्ट्रीय वाणिज्यिक परमिट", desc: "व्यावसायिक ट्रकों और टैक्सियों के लिए ऑल-इंडिया परमिट प्राप्त करें।" },
      "3.4.3": { title: "ट्रेड सर्टिफिकेट डेस्क", desc: "वाहन विक्रेताओं (Dealers) के लिए व्यापार प्रमाण पत्र जारी व रिन्यू करें।" },
      "3.4.4": { title: "आरसी रद्दीकरण व स्क्रैपिंग", desc: "कबाड़ या जीवनकाल पूर्ण कर चुकी गाड़ियों का आरसी नंबर सरेंडर करें।" },
    },
  },
};

export function VahanView({ language = "hinglish", setCurrentNode, changeView }) {
  const [activeTab, setActiveTab] = useState("all");
  const langKey = MASTER_VAHAN_DICTIONARY[language] ? language : "english";
  const dict = MASTER_VAHAN_DICTIONARY[langKey];

  const handleActionRedirect = (nodeId) => {
    if (setCurrentNode) setCurrentNode(nodeId);
    if (changeView) changeView("learn_hub");
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
          {badge && <span className={`app-badge ${badge.type}`}>{badge.label}</span>}
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
            <span>Vahan Registry Mesh Active</span>
          </div>
          <h1 className="app-main-heading">{dict.hubTitle}</h1>
        </div>

        {/* Dynamic Mobile Segmented Tabs */}
        <div className="segmented-control-wrapper">
          <div className="segmented-control">
            <button 
              type="button"
              className={`segment-btn ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              All Nodes
            </button>
            <button 
              type="button"
              className={`segment-btn ${activeTab === 'rc' ? 'active' : ''}`}
              onClick={() => setActiveTab('rc')}
            >
              RC & Transfer
            </button>
            <button 
              type="button"
              className={`segment-btn ${activeTab === 'fin' ? 'active' : ''}`}
              onClick={() => setActiveTab('fin')}
            >
              Loan & Permits
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
          <h4>{dict.explainTitle}</h4>
          <p>{dict.explainBody}</p>
        </div>
      </div>

      {/* Main Responsive Grid Workspace */}
      <div className="app-grid-workspace">
        {/* SECTION 1: Registration & Fitness Shell */}
        {(activeTab === 'all' || activeTab === 'rc') && (
          <div className="app-section-panel">
            <div className="panel-header">
              <h3>
                <FileBadge size={20} style={{ display: 'inline', marginRight: 8 }} />
                {dict.cat_onboarding}
              </h3>
              <span className="panel-tag">Stage 01</span>
            </div>

            <div className="panel-group">
              <span className="group-label">{dict.cat_reg_sub}</span>
              <div className="app-tiles-grid">
                {renderServiceCard("3.1.1", { type: "online", label: "Faceless" })}
                {renderServiceCard("3.1.3", { type: "online", label: "Instant" })}
              </div>
            </div>

            <div className="panel-group mt-mobile-4">
              <span className="group-label">{dict.cat_fit_sub}</span>
              <div className="app-tiles-grid">
                {renderServiceCard("3.1.2", { type: "rto", label: "Inspection" })}
                {renderServiceCard("3.1.4")}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 2: Ownership Transfer & NOC Shell */}
        {(activeTab === 'all' || activeTab === 'rc') && (
          <div className="app-section-panel">
            <div className="panel-header">
              <h3>
                <Crown size={20} style={{ display: 'inline', marginRight: 8 }} />
                {dict.cat_transfer}
              </h3>
              <span className="panel-tag gold">Stage 02</span>
            </div>

            <div className="panel-group">
              <span className="group-label">{dict.cat_trans_sub}</span>
              <div className="app-tiles-grid">
                {renderServiceCard("3.2.1", { type: "rto", label: "Transfer" })}
                {renderServiceCard("3.2.2")}
              </div>
            </div>

            <div className="panel-group mt-mobile-4">
              <span className="group-label">{dict.cat_noc_sub}</span>
              <div className="app-tiles-grid">
                {renderServiceCard("3.2.3", { type: "pay", label: "Inter-State" })}
                {renderServiceCard("3.2.4", { type: "interactive", label: "BH Tag" })}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 3: Bank Hypothecation & Loan Shell */}
        {(activeTab === 'all' || activeTab === 'fin') && (
          <div className="app-section-panel">
            <div className="panel-header">
              <h3>
                <Building2 size={20} style={{ display: 'inline', marginRight: 8 }} />
                {dict.cat_finance}
              </h3>
              <span className="panel-tag">Stage 03</span>
            </div>

            <div className="panel-group">
              <span className="group-label">{dict.cat_hyp_sub}</span>
              <div className="app-tiles-grid">
                {renderServiceCard("3.3.1")}
                {renderServiceCard("3.3.2", { type: "online", label: "Bank NOC" })}
                {renderServiceCard("3.3.3")}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 4: Commercial Permits & Tax Shell */}
        {(activeTab === 'all' || activeTab === 'fin') && (
          <div className="app-section-panel">
            <div className="panel-header">
              <h3>
                <CreditCard size={20} style={{ display: 'inline', marginRight: 8 }} />
                {dict.cat_permits}
              </h3>
              <span className="panel-tag gold">Stage 04</span>
            </div>

            <div className="panel-group">
              <span className="group-label">{dict.cat_tax_sub}</span>
              <div className="app-tiles-grid">
                {renderServiceCard("3.4.1", { type: "pay", label: "Instant UPI" })}
                {renderServiceCard("3.4.2", { type: "rto", label: "5-Yr Permit" })}
                {renderServiceCard("3.4.3")}
                {renderServiceCard("3.4.4")}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default VahanView;