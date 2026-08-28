import React, { useState } from "react";
import {
  HelpCircle,
  MessageSquare,
  FileQuestion,
  PhoneCall,
  ShieldAlert,
  Zap,
  ArrowRight,
  Lightbulb,
  ChevronsRight,
  Mail,
  Clock,
  Send
} from "lucide-react";

/* =========================================================================
   MASTER SUPPORT DICTIONARY (Multilingual: English, Hinglish, Hindi)
   ========================================================================= */
const MASTER_SUPPORT_DICTIONARY = {
  english: {
    hubTitle: "Help, Grievance & Support Engine",
    cat_faq: "Frequently Asked Questions Shell",
    cat_grievance: "RTO Complaints & Grievance Shell",
    cat_contact: "Direct Helpdesk & Contact Shell",
    cat_dispute: "Challan & Refund Dispute Shell",

    cat_faq_sub: "1.1 General Navigation & Process FAQs",
    cat_griev_sub: "1.2 Official Escalation & Portal Complaints",
    cat_contact_sub: "2.1 Toll-Free & Direct Email Nodes",
    cat_dispute_sub: "2.2 Payment & E-Challan Grievances",

    explainTitle: "24/7 Citizen Rights & Portal Support",
    explainBody: "Track your pending grievances, submit portal bug reports, or get direct assistance for failed RTO payments.",

    services: {
      "4.1.1": { title: "Portal User Guide & FAQs", desc: "Step-by-step guides for DL, RC, and citizen online services." },
      "4.1.2": { title: "Track Support Ticket Status", desc: "Check live status of your submitted complaint or query." },
      "4.1.3": { title: "Report Technical Issue", desc: "Log system errors, OTP failures, or portal crashing bugs." },
      "4.1.4": { title: "Faceless Service Rules", desc: "Understand Aadhaar-based faceless RTO application rules." },

      "4.2.1": { title: "RTO Office Grievance", desc: "Escalate delayed applications or RTO officer inaction." },
      "4.2.2": { title: "CPGRAMS National Portal", desc: "Submit central government public grievances directly." },
      "4.2.3": { title: "RTI Application Guidance", desc: "Learn how to file RTI for pending motor vehicle cases." },
      "4.2.4": { title: "Corruption / Vigilance Report", desc: "Report bribery, middleman demands, or illegal practices." },

      "4.3.1": { title: "National Toll-Free Helpline", desc: "Direct dial official Parivahan 1077 / helpline desks." },
      "4.3.2": { title: "Email Support Desk", desc: "Send official email tickets to state transport departments." },
      "4.3.3": { title: "Virtual AI Assistant Desk", desc: "Get instant answers to driving and vehicle rules 24/7." },

      "4.4.1": { title: "Failed Payment Refund", desc: "Raise claim for money deducted without application receipt." },
      "4.4.2": { title: "Wrong E-Challan Dispute", desc: "Contest incorrect traffic camera or speed violation fines." },
      "4.4.3": { title: "Double Payment Reconcile", desc: "Merge or refund duplicate transaction charges automatically." },
      "4.4.4": { title: "Slot Booking Reschedule", desc: "Request helpline assistance for missed RTO test appointments." },
    },
  },
  hinglish: {
    hubTitle: "Help, Grievance & Support Engine",
    cat_faq: "Frequently Asked Questions Shell",
    cat_grievance: "RTO Complaints & Grievance Shell",
    cat_contact: "Direct Helpdesk & Contact Shell",
    cat_dispute: "Challan & Refund Dispute Shell",

    cat_faq_sub: "1.1 General Navigation & Process FAQs",
    cat_griev_sub: "1.2 Official Escalation & Portal Complaints",
    cat_contact_sub: "2.1 Toll-Free & Direct Email Nodes",
    cat_dispute_sub: "2.2 Payment & E-Challan Grievances",

    explainTitle: "24/7 Citizen Rights & Portal Support",
    explainBody: "Apni pending complaint ka status dekhein, payment failures clear karein, ya galat challan par dispute raise karein.",

    services: {
      "4.1.1": { title: "Portal User Guide & FAQs", desc: "DL, RC aur baaki services ke liye step-by-step guidance." },
      "4.1.2": { title: "Track Support Ticket Status", desc: "Apni submit ki hui complaint ka live status check karein." },
      "4.1.3": { title: "Report Technical Issue", desc: "OTP error ya payment fail hone par technical issue log karein." },
      "4.1.4": { title: "Faceless Service Rules", desc: "Aadhaar e-KYC faceless application ke rules aur guidelines jaanein." },

      "4.2.1": { title: "RTO Office Grievance", desc: "RTO office me delay ya officer response na milne par complaint karein." },
      "4.2.2": { title: "CPGRAMS National Portal", desc: "Central government public grievance portal par direct complaint submit karein." },
      "4.2.3": { title: "RTI Application Guidance", desc: "Pending DL/RC file ki jankari ke liye RTI kaise file karein." },
      "4.2.4": { title: "Corruption / Vigilance Report", desc: "Kisi bhi tarah ke bribery ya agent demand ki complaint lodge karein." },

      "4.3.1": { title: "National Toll-Free Helpline", desc: "Official Parivahan helpline number par direct call karein." },
      "4.3.2": { title: "Email Support Desk", desc: "State Transport Department ko official email ticket bhejein." },
      "4.3.3": { title: "Virtual AI Assistant Desk", desc: "RTO rules aur forms ke baare me 24/7 instant jawab paayein." },

      "4.4.1": { title: "Failed Payment Refund", desc: "Account se paise katne par receipt na milne par refund claim karein." },
      "4.4.2": { title: "Wrong E-Challan Dispute", desc: "Galat kate hue camera ya traffic challan ko online contest karein." },
      "4.4.3": { title: "Double Payment Reconcile", desc: "Ek hi service ke do baar paise katne par automatic refund lein." },
      "4.4.4": { title: "Slot Booking Reschedule", desc: "Missed RTO test appointment reschedule karne me help lein." },
    },
  },
  hi: {
    hubTitle: "सहायता, शिकायत एवं सपोर्ट इंजन",
    cat_faq: "सामान्य प्रश्न (FAQ) शैल",
    cat_grievance: "आरटीओ शिकायत एवं निवारण शैल",
    cat_contact: "हेल्पडेस्क एवं संपर्क शैल",
    cat_dispute: "चालान एवं रिफंड विवाद शैल",

    cat_faq_sub: "१.१ सामान्य मार्गदर्शन प्रश्नोत्तर",
    cat_griev_sub: "१.२ आधिकारिक शिकायत एवं पोर्टल ट्रैकिंग",
    cat_contact_sub: "२.१ टोल-फ्री एवं ईमेल संपर्क",
    cat_dispute_sub: "२.२ भुगतान एवं चालान विवाद निवारण",

    explainTitle: "२४x७ नागरिक अधिकार एवं पोर्टल सहायता",
    explainBody: "अपनी लंबित शिकायतों का स्टेटस ट्रैक करें, पोर्टल समस्याओं की रिपोर्ट करें या विफल भुगतान पर तुरंत सहायता प्राप्त करें।",

    services: {
      "4.1.1": { title: "पोर्टल उपयोगकर्ता निर्देशिका", desc: "डीएल, आरसी और नागरिक सेवाओं के लिए चरण-दर-चरण मार्गदर्शन।" },
      "4.1.2": { title: "शिकायत टिकट स्टेटस ट्रैक करें", desc: "अपनी दर्ज की गई शिकायत का लाइव स्टेटस देखें।" },
      "4.1.3": { title: "तकनीकी समस्या दर्ज करें", desc: "ओटीपी विफलता या पोर्टल त्रुटियों की ऑनलाइन रिपोर्ट करें।" },
      "4.1.4": { title: "फेसलेस सेवा नियम", desc: "आधार-आधारित फेसलेस आरटीओ प्रक्रिया के दिशानिर्देश समझें।" },

      "4.2.1": { title: "आरटीओ कार्यालय शिकायत", desc: "आवेदन में देरी या अधिकारियों द्वारा कार्रवाई न करने पर शिकायत दर्ज करें।" },
      "4.2.2": { title: "CPGRAMS राष्ट्रीय पोर्टल", desc: "केंद्र सरकार के लोक शिकायत निवारण पोर्टल पर सीधी शिकायत करें।" },
      "4.2.3": { title: "आरटीआई (RTI) मार्गदर्शन", desc: "लंबित परिवहन फाइलों की जानकारी हेतु आरटीआई दाखिल करना सीखें।" },
      "4.2.4": { title: "सतर्कता / भ्रष्टाचार रिपोर्ट", desc: "अनुचित मांग, रिश्वत या बिचौलियों की शिकायत दर्ज कराएं।" },

      "4.3.1": { title: "राष्ट्रीय टोल-फ्री हेल्पलाइन", desc: "परिवहन आधिकारिक हेल्पलाइन 1077 पर सीधा संपर्क करें।" },
      "4.3.2": { title: "ईमेल सहायता डेस्क", desc: "राज्य परिवहन विभाग को आधिकारिक ईमेल टिकट भेजें।" },
      "4.3.3": { title: "वर्चुअल एआई सहायक", desc: "ड्राइविंग और आरटीओ नियमों पर २४x७ त्वरित उत्तर प्राप्त करें।" },

      "4.4.1": { title: "विफल भुगतान रिफंड", desc: "खाते से पैसे कटने और रसीद न मिलने पर रिफंड का दावा करें।" },
      "4.4.2": { title: "गलत ई-चालान विवाद", desc: "गलत तरीके से कटे ट्रैफिक या स्पीड चालान को चुनौती दें।" },
      "4.4.3": { title: "दोहरे भुगतान का समाधान", desc: "एक ही सेवा के लिए दोबारा कटे पैसे का रिफंड प्राप्त करें।" },
      "4.4.4": { title: "स्लॉट बुकिंग पुनर्निर्धारण", desc: "छूटे हुए आरटीओ टेस्ट अपॉइंटमेंट को री-शेड्यूल करने में मदद लें।" },
    },
  },
};

export function SupportView({ language = "hinglish", setCurrentNode, changeView }) {
  const [activeTab, setActiveTab] = useState("all");
  const langKey = MASTER_SUPPORT_DICTIONARY[language] ? language : "english";
  const dict = MASTER_SUPPORT_DICTIONARY[langKey];

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
            <span>Support Mesh Active</span>
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
              className={`segment-btn ${activeTab === 'grievance' ? 'active' : ''}`}
              onClick={() => setActiveTab('grievance')}
            >
              Complaints
            </button>
            <button 
              type="button"
              className={`segment-btn ${activeTab === 'finance' ? 'active' : ''}`}
              onClick={() => setActiveTab('finance')}
            >
              Refund & Challan
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
        {/* SECTION 1: FAQ & Portal Guides */}
        {(activeTab === 'all' || activeTab === 'grievance') && (
          <div className="app-section-panel">
            <div className="panel-header">
              <h3>
                <FileQuestion size={20} style={{ display: 'inline', marginRight: 8 }} />
                {dict.cat_faq}
              </h3>
              <span className="panel-tag">Stage 01</span>
            </div>

            <div className="panel-group">
              <span className="group-label">{dict.cat_faq_sub}</span>
              <div className="app-tiles-grid">
                {renderServiceCard("4.1.1", { type: "online", label: "Self-Help" })}
                {renderServiceCard("4.1.2", { type: "interactive", label: "Live Tracker" })}
              </div>
            </div>

            <div className="panel-group mt-mobile-4">
              <div className="app-tiles-grid">
                {renderServiceCard("4.1.3", { type: "rto", label: "Tech Bug" })}
                {renderServiceCard("4.1.4")}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 2: Official Grievances & RTI */}
        {(activeTab === 'all' || activeTab === 'grievance') && (
          <div className="app-section-panel">
            <div className="panel-header">
              <h3>
                <ShieldAlert size={20} style={{ display: 'inline', marginRight: 8 }} />
                {dict.cat_grievance}
              </h3>
              <span className="panel-tag gold">Stage 02</span>
            </div>

            <div className="panel-group">
              <span className="group-label">{dict.cat_griev_sub}</span>
              <div className="app-tiles-grid">
                {renderServiceCard("4.2.1", { type: "rto", label: "Official" })}
                {renderServiceCard("4.2.2", { type: "online", label: "CPGRAMS" })}
              </div>
            </div>

            <div className="panel-group mt-mobile-4">
              <div className="app-tiles-grid">
                {renderServiceCard("4.2.3")}
                {renderServiceCard("4.2.4", { type: "pay", label: "Vigilance" })}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 3: Direct Helpdesk & Channels */}
        {(activeTab === 'all' || activeTab === 'finance') && (
          <div className="app-section-panel">
            <div className="panel-header">
              <h3>
                <PhoneCall size={20} style={{ display: 'inline', marginRight: 8 }} />
                {dict.cat_contact}
              </h3>
              <span className="panel-tag">Stage 03</span>
            </div>

            <div className="panel-group">
              <span className="group-label">{dict.cat_contact_sub}</span>
              <div className="app-tiles-grid">
                {renderServiceCard("4.3.1", { type: "interactive", label: "1077 Free" })}
                {renderServiceCard("4.3.2")}
                {renderServiceCard("4.3.3", { type: "online", label: "24x7 AI" })}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 4: Payment Refunds & E-Challan Disputes */}
        {(activeTab === 'all' || activeTab === 'finance') && (
          <div className="app-section-panel">
            <div className="panel-header">
              <h3>
                <MessageSquare size={20} style={{ display: 'inline', marginRight: 8 }} />
                {dict.cat_dispute}
              </h3>
              <span className="panel-tag gold">Stage 04</span>
            </div>

            <div className="panel-group">
              <span className="group-label">{dict.cat_dispute_sub}</span>
              <div className="app-tiles-grid">
                {renderServiceCard("4.4.1", { type: "pay", label: "Auto Refund" })}
                {renderServiceCard("4.4.2", { type: "rto", label: "Dispute" })}
                {renderServiceCard("4.4.3")}
                {renderServiceCard("4.4.4")}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SupportView;