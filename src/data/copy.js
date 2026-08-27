export const copy = {
  en: {
    language: "English",
    brandName: "Parivahan Saathi",
    signIn: "Sign in",
    signOut: "Sign out",

    home: {
      welcome: "Welcome to Saathi",
      title: "What do you need today?",
      subtitle:
        "Start with a quick check, begin your LL / DL journey, or learn what to do next.",

      badge: "Citizen-first mobility",
      heroTitle: "One clear path for every transport problem.",
      heroText:
        "Check your challan, understand your LL / DL next step, or manage your vehicle from one simple service layer.",

      startService: "Start your service",
      quickChecks: "Quick checks",
      service: "Service",
      today: "Example view",
      actionsDue: "Demo snapshot",
      pending: "pending",
      validTill: "Valid till 30 Oct",
      docsPending: "Docs pending",

      quickSubtitle: "Challan, PUCC, insurance",
      driverSubtitle: "New learner or renewal",
      garageSubtitle: "RC, ownership, compliance",

      noLogin: "No login needed",

      quickCheck: "Quick checks",

      quickCheckItems: [
        {
          label: "e-Challan",
          detail: "No login · instant check",
          action: "Check now",
        },
        {
          label: "PUCC",
          detail: "No login · validity status",
          action: "Verify",
        },
        {
          label: "Insurance",
          detail: "No login · expiry alert",
          action: "Review",
        },
        {
          label: "Vehicle status",
          detail: "No login · current record",
          action: "View",
        },
      ],

      personasEyebrow: "Built for real citizens",
      personasTitle: "Three everyday journeys",

      personas: [
        {
          title: "Daily commuter",
          subtitle: "Need quick answers before the problem grows.",
          stat: "Fast issue checks",
        },
        {
          title: "New driver",
          subtitle:
            "Need clear LL and DL guidance from first step to final status.",
          stat: "Step-by-step help",
        },
        {
          title: "Vehicle owner",
          subtitle:
            "Need garage, renewal, and compliance clarity in one place.",
          stat: "One linked view",
        },
      ],

      visionEyebrow: "The bigger vision",
      visionTitle: "More than a quick-check app",
      visionText:
        "Today is focused on the first useful action. Round 2 will connect the full citizen journey around it.",

      roadmap: "Round 2 roadmap",
      comingNext: "Coming next",

      modules: [
        {
          title: "Learn Hub",
          detail:
            "Rules, documents and step-by-step explainers for every citizen.",
        },
        {
          title: "Complete LL journey",
          detail:
            "Eligibility to test, approval and every next step in one flow.",
        },
        {
          title: "My Garage",
          detail:
            "Connected vehicles, ownership context and compliance timelines.",
        },
        {
          title: "AI Saathi",
          detail: "Screen-aware guidance in Hindi, Hinglish and English.",
        },
        {
          title: "36 services",
          detail: "A structured Saathi and Vahan library with See all paths.",
        },
      ],
    },

    authTitle: "Continue with your ID",
    authIntro:
      "Enter your phone, Aadhaar, PAN or DL number — we'll detect it and check if you're already registered.",

    asideEyebrow: "Secure demo access",
    asideHeading: "One input. Auto-detected. Verified.",
    asideBody:
      "Enter any identifier — phone, Aadhaar, PAN or DL number. We detect what it is and route you automatically.",
    authSteps: ["Enter any identifier", "Verify with the demo OTP", "Land on your workspace"],

    identifyLabel: "Phone / Aadhaar / PAN / DL number",
    detected: "Detected",
    fieldLabels: { phone: "Phone", aadhaar: "Aadhaar", pan: "PAN", dl: "DL No." },
    identityPlaceholder: "Type any ID — e.g. 98765 43210",

    continueBtn: "Continue",
    tapHint: "Tap a chip to autofill",
    newUser: "New user",
    existingUser: "Existing user",

    phone: "Phone number",
    aadhaar: "Aadhaar number",
    pan: "PAN card",
    dl: "DL number",

    back: "Back",

    fieldRequired: "Enter your phone, Aadhaar, PAN or DL number.",

    otpTitle: "Enter OTP",
    otpIntro: "We've sent a 4-digit code to the registered mobile.",
    welcomeBack: (name) => `Welcome back, ${name}`,
    newRegistration: "New registration",
    demoOtpLabel: "Demo OTP",
    reviewerOnly: "For reviewer testing only",
    verifyBtn: "Verify & Continue",
    invalidOtp: "Incorrect OTP — try 1234.",

    secureDemo: "No real personal information is collected or transmitted.",

    verified: "Identity verified",
    welcomeNew: "Welcome, Ananya",
    welcomeExisting: "Welcome back, Rajesh",

    readyLL: "Your profile is ready for a Learner’s Licence application.",

    currentRecords: "Your connected records",

    llNext: "Learner’s Licence journey is next",
    dashboard: "Your workspace",

    aiName: "AI Saathi",
    aiPrompt: "AI guide · Ask me anything",

    chooseHelp: "Choose a problem to get help",
    nextHelp: "What would you like to do next?",
    mostAsked: "Most asked questions",
    askAnything: "Ask a question about this screen",
    send: "Ask Saathi",

    quickQuestions: [
      {
        question: "How do I check my challan?",
        answer:
          "Open Quick checks and enter your vehicle number. You can view the amount, reason and next action without signing in.",
      },
      {
        question: "How do I start an LL?",
        answer:
          "Open Driver services to see eligibility, documents, application and test steps in order.",
      },
      {
        question: "How do I renew my DL?",
        answer:
          "Choose DL renewal, review your documents and follow the guided application timeline.",
      },
      {
        question: "What does my vehicle status mean?",
        answer:
          "Open Vehicle services to review RC, PUCC, insurance and other compliance details.",
      },
    ],

    guidedAnswer:
      "I can guide you through this demo. Choose a common question or describe where you are stuck.",

    typing: "AI Saathi is typing...",

    namaste:
      "Namaste! I am AI Saathi, your screen-aware guide. Don’t worry, I will stay with you and explain every step simply.",

    questionReceived: "I heard your question:",

    nextActions: [
      {
        label: "See required documents",
        answer: "I will show the documents needed for this service.",
      },
      {
        label: "Start this service",
        answer: "I will take you to the right service starting point.",
      },
      {
        label: "Explain the next step",
        answer: "I will explain what happens next in simple language.",
      },
    ],

    qLogin: "How do I sign in?",
    aLogin:
      "Choose a verification method. For this safe demo, use OTP 123456 or the returning-user MPIN 4455.",

    qRecords: "Will this use my real records?",
    aRecords:
      "No. This prototype displays only synthetic local data. It never connects to government systems.",

    qNext: "What happens after verification?",
    aNext:
      "New citizens will begin the Learner’s Licence journey. Existing users can see their connected demo records.",

    qOtp: "Why do I need an OTP?",
    aOtp: "An OTP represents a consent and account-verification step. Here it is fully simulated.",

    learningHub: {
      1.1: {
        breadcrumb: "Home → Get Started → Welcome",
        title: "Welcome to Parivahan Saathi 2026",
        lead: "Your simplified, visual citizen education platform built for the modern generation. Access 36 personal mobility registers instantly without middlemen.",
        bento_title_1: "🪪 Identity Gateway (Sarathi)",
        bento_desc_1:
          "Apply and manage your Learner and Permanent Driving Licences securely through our Faceless AI Engine.",
        bento_title_2: "🚗 Asset Ledger (Vahan)",
        bento_desc_2:
          "Track your vehicle's Registration Certificate (RC), transfer ownership, and monitor environmental green compliance on the fly.",
      },
      1.4: {
        breadcrumb: "Home → Get Started → Portal Guide",
        title: "How to use this Portal? (60-Second Walkthrough)",
        lead: "Bypass legacy public tech complexity. Follow this structural micro-learning loop to navigate your files efficiently.",
        step_1:
          "1. Scan Left Menu: Use the long 45-node tree sidebar to jump directly into specific Sarathi or Vahan chapters.",
        step_2:
          "2. Launch AI Assistant: Click the bottom pill console 'Ask Assistant... ⌘K' to semantically search any rule in natural phrasing.",
        step_3:
          "3. Run Active Demos: Click folder 2.1 to test our real in-browser HTML Canvas file compressor and signage quiz games.",
      },
    },
  },

  hinglish: {
    language: "Hinglish",
    brandName: "Parivahan Saathi",
    signIn: "Sign in karein",
    signOut: "Sign out",

    home: {
      welcome: "Saathi par aapka swagat hai",
      title: "Aaj aapko kis cheez mein madad chahiye?",
      subtitle:
        "Quick check se shuru karein, apni LL / DL journey start karein, ya agla step samjhein.",
      badge: "Citizen-first mobility",
      heroTitle: "Har transport problem ke liye ek clear raasta.",
      heroText:
        "Apna challan check karein, LL / DL ka next step samjhein, ya vehicle ko ek simple service layer se manage karein.",

      startService: "Apni service shuru karein",
      quickChecks: "Quick checks",
      service: "Service",
      today: "Example view",
      actionsDue: "Demo snapshot",
      pending: "pending",
      validTill: "30 Oct tak valid",
      docsPending: "Documents pending",

      quickSubtitle: "Challan, PUCC, insurance",
      driverSubtitle: "Naya learner ya renewal",
      garageSubtitle: "RC, ownership, compliance",

      noLogin: "No login needed",

      quickCheck: "Quick checks",

      quickCheckItems: [
        {
          label: "e-Challan",
          detail: "No login · turant check",
          action: "Check now",
        },
        {
          label: "PUCC",
          detail: "No login · validity status",
          action: "Verify",
        },
        {
          label: "Insurance",
          detail: "No login · expiry alert",
          action: "Review",
        },
        {
          label: "Vehicle status",
          detail: "No login · current record",
          action: "View",
        },
      ],

      personasEyebrow: "Real citizens ke liye bana",
      personasTitle: "Teen everyday journeys",

      personas: [
        {
          title: "Daily commuter",
          subtitle: "Problem badhne se pehle quick answer chahiye.",
          stat: "Fast issue checks",
        },
        {
          title: "New driver",
          subtitle:
            "First step se final status tak clear LL aur DL guidance chahiye.",
          stat: "Step-by-step help",
        },
        {
          title: "Vehicle owner",
          subtitle: "Garage, renewal aur compliance sab ek jagah chahiye.",
          stat: "One linked view",
        },
      ],

      visionEyebrow: "Badi vision",
      visionTitle: "Sirf quick-check app nahi",
      visionText:
        "Aaj focus pehle useful action par hai. Round 2 mein poori citizen journey connect hogi.",

      roadmap: "Round 2 roadmap",
      comingNext: "Coming next",

      modules: [
        {
          title: "Learn Hub",
          detail:
            "Rules, documents aur step-by-step explainers har citizen ke liye.",
        },
        {
          title: "Complete LL journey",
          detail:
            "Eligibility se test, approval aur har next step ek hi flow mein.",
        },
        {
          title: "My Garage",
          detail:
            "Connected vehicles, ownership context aur compliance timelines.",
        },
        {
          title: "AI Saathi",
          detail: "Hindi, Hinglish aur English mein screen-aware guidance.",
        },
        {
          title: "36 services",
          detail: "Saathi aur Vahan ki structured library with See all paths.",
        },
      ],
    },

    authTitle: "Apni ID se continue karein",
    authIntro:
      "Apna phone, Aadhaar, PAN ya DL number daalein — hum ise detect karke check karenge ki aap already registered hain ya nahi.",

    asideEyebrow: "Secure demo access",
    asideHeading: "Ek input. Auto-detect. Verified.",
    asideBody:
      "Koi bhi identifier daalein — phone, Aadhaar, PAN ya DL number. Hum ise detect karke aapko automatically route kar denge.",
    authSteps: ["Koi bhi identifier daalein", "Demo OTP se verify karein", "Apne workspace par pahunchein"],

    identifyLabel: "Phone / Aadhaar / PAN / DL number",
    detected: "Detected",
    fieldLabels: { phone: "Phone", aadhaar: "Aadhaar", pan: "PAN", dl: "DL No." },
    identityPlaceholder: "Koi bhi ID daalein — jaise 98765 43210",

    continueBtn: "Continue",
    tapHint: "Autofill ke liye chip par tap karein",
    newUser: "Naya user",
    existingUser: "Existing user",

    phone: "Phone number",
    aadhaar: "Aadhaar number",
    pan: "PAN card",
    dl: "DL number",

    back: "Back",

    fieldRequired: "Apna phone, Aadhaar, PAN ya DL number daalein.",

    otpTitle: "OTP daalein",
    otpIntro: "Registered mobile par 4-digit code bheja gaya hai.",
    welcomeBack: (name) => `Wapas swagat hai, ${name}`,
    newRegistration: "Naya registration",
    demoOtpLabel: "Demo OTP",
    reviewerOnly: "Sirf reviewer testing ke liye",
    verifyBtn: "Verify & Continue",

    invalidOtp: "Galat OTP — 1234 try karein.",

    secureDemo: "Koi real personal information collect ya transmit nahi hoti.",

    verified: "Identity verified",
    welcomeNew: "Welcome, Ananya",
    welcomeExisting: "Welcome back, Rajesh",

    readyLL: "Aapka profile Learner’s Licence application ke liye ready hai.",

    currentRecords: "Aapke connected records",

    llNext: "Learner’s Licence journey next hai",
    dashboard: "Aapka workspace",

    aiName: "AI Saathi",
    aiPrompt: "AI guide · Kuch bhi poochhein",

    chooseHelp: "Help ke liye problem choose karein",
    nextHelp: "Aap next kya karna chahenge?",
    mostAsked: "Sabse zyada pooche gaye questions",
    askAnything: "Is screen ke baare mein question poochein",
    send: "Saathi se poochein",

    quickQuestions: [
      {
        question: "Main apna challan kaise check karun?",
        answer:
          "Quick checks open karein aur apna vehicle number enter karein. Bina sign in kiye amount, reason aur next action dekh sakte hain.",
      },
      {
        question: "LL kaise start karun?",
        answer:
          "Driver services open karein. Wahan eligibility, documents, application aur test steps order mein milenge.",
      },
      {
        question: "DL renew kaise karun?",
        answer:
          "DL renewal choose karein, apne documents review karein aur guided application timeline follow karein.",
      },
      {
        question: "Mere vehicle status ka kya matlab hai?",
        answer:
          "RC, PUCC, insurance aur other compliance details review karne ke liye Vehicle services open karein.",
      },
    ],

    guidedAnswer:
      "Main is demo mein aapko guide kar sakta hoon. Common question choose karein ya batayein ki aap kahan stuck hain.",

    typing: "AI Saathi type kar raha hai...",

    namaste:
      "Namaste! Main AI Saathi hoon, aapka screen-aware guide. Tension mat lijiye, main aapke saath rahunga aur har step ko simple language mein samjhaunga.",

    questionReceived: "Maine aapka question suna:",

    nextActions: [
      {
        label: "Required documents dekhein",
        answer: "Main is service ke liye required documents dikhaunga.",
      },
      {
        label: "Ye service start karein",
        answer: "Main aapko service ke correct starting point par le jaunga.",
      },
      {
        label: "Next step samjhein",
        answer: "Main simple language mein explain karunga ki next kya hoga.",
      },
    ],

    qLogin: "Main sign in kaise karun?",
    aLogin:
      "Verification method choose karein. Safe demo ke liye OTP 123456 ya returning-user MPIN 4455 use karein.",

    qRecords: "Kya ye mere real records use karega?",
    aRecords:
      "Nahi. Ye prototype sirf synthetic local data display karta hai. Ye government systems se kabhi connect nahi hota.",

    qNext: "Verification ke baad kya hoga?",
    aNext:
      "New citizens Learner’s Licence journey start karenge. Existing users apne connected demo records dekh sakte hain.",

    qOtp: "OTP kyun chahiye?",
    aOtp:
      "OTP consent aur account-verification step ko represent karta hai. Is demo mein ye completely simulated hai.",

    learningHub: {
      1.1: {
        breadcrumb: "Home → Start Karo → Welcome",
        title: "Parivahan Saathi 2026 mein Aapka Swagat Hai",
        lead: "Modern generation ke liye banaya gaya aapka simple aur visual citizen learning platform. Bina kisi agent ya bicheliya ke directly 36 personal mobility services ko access karein.",
        bento_title_1: "🪪 Identity Gateway (Sarathi)",
        bento_desc_1:
          "Humare Faceless AI Engine ke through apne Learner aur Permanent Driving Licence ke liye safely apply aur manage karein.",
        bento_title_2: "🚗 Asset Ledger (Vahan)",
        bento_desc_2:
          "Apni gaadi ke Registration Certificate (RC) ko track karein, ownership transfer karein aur environmental green compliance monitor karein.",
      },
      1.4: {
        breadcrumb: "Home → Start Karo → Portal Guide",
        title: "Iss Portal ko kaise use karein? (60-Second Tour Guide)",
        lead: "Purani government websites ki complication ko bypass karein. Apne files aur rules ko efficiently navigate karne ke liye iss micro-learning loop ko follow karein.",
        step_1:
          "1. Left Menu Scan Karein: Specific Sarathi ya Vahan sections mein directly jaane ke liye long 45-node sidebar tree ka use karein.",
        step_2:
          "2. AI Assistant Launch Karein: Natural language mein kisi bhi rule ko directly search karne ke liye bottom pill 'Ask Assistant... ⌘K' par click karein.",
        step_3:
          "3. Active Demos Run Karein: Humare real in-browser HTML Canvas image compressor aur traffic signage quiz games ko test karne ke liye folder 2.1 par click karein.",
      },
    },
  },

  hi: {
    language: "हिंदी",
    brandName: "परिवहन साथी",
    signIn: "साइन इन करें",
    signOut: "साइन आउट",

    home: {
      welcome: "साथी में आपका स्वागत है",
      title: "आज आपको किस चीज़ में मदद चाहिए?",
      subtitle:
        "क्विक चेक से शुरुआत करें, अपनी LL / DL यात्रा शुरू करें या अगला कदम समझें।",
      badge: "नागरिक-प्रथम मोबिलिटी",
      heroTitle: "हर परिवहन समस्या के लिए एक स्पष्ट रास्ता।",
      heroText:
        "अपना चालान चेक करें, LL / DL का अगला कदम समझें या अपने वाहन को एक सरल सर्विस लेयर से मैनेज करें।",

      startService: "अपनी सेवा शुरू करें",
      quickChecks: "क्विक चेक",
      service: "सेवा",
      today: "उदाहरण दृश्य",
      actionsDue: "डेमो स्नैपशॉट",
      pending: "लंबित",
      validTill: "30 अक्टूबर तक मान्य",
      docsPending: "दस्तावेज़ लंबित",

      quickSubtitle: "चालान, PUCC, बीमा",
      driverSubtitle: "नया लर्नर या नवीनीकरण",
      garageSubtitle: "RC, स्वामित्व, अनुपालन",

      noLogin: "लॉगिन की आवश्यकता नहीं",

      quickCheck: "क्विक चेक",

      quickCheckItems: [
        {
          label: "ई-चालान",
          detail: "लॉगिन नहीं · तुरंत चेक करें",
          action: "अभी चेक करें",
        },
        {
          label: "PUCC",
          detail: "लॉगिन नहीं · वैधता स्थिति",
          action: "सत्यापित करें",
        },
        {
          label: "बीमा",
          detail: "लॉगिन नहीं · समाप्ति अलर्ट",
          action: "समीक्षा करें",
        },
        {
          label: "वाहन स्थिति",
          detail: "लॉगिन नहीं · वर्तमान रिकॉर्ड",
          action: "देखें",
        },
      ],

      personasEyebrow: "वास्तविक नागरिकों के लिए बनाया गया",
      personasTitle: "तीन रोज़मर्रा की यात्राएँ",

      personas: [
        {
          title: "दैनिक यात्री",
          subtitle: "समस्या बढ़ने से पहले तुरंत जवाब चाहिए।",
          stat: "तेज़ समस्या जाँच",
        },
        {
          title: "नया ड्राइवर",
          subtitle:
            "पहले कदम से अंतिम स्थिति तक स्पष्ट LL और DL मार्गदर्शन चाहिए।",
          stat: "स्टेप-बाय-स्टेप सहायता",
        },
        {
          title: "वाहन मालिक",
          subtitle: "गैरेज, नवीनीकरण और अनुपालन की जानकारी एक जगह चाहिए।",
          stat: "एक जुड़ा हुआ दृश्य",
        },
      ],

      visionEyebrow: "बड़ी सोच",
      visionTitle: "सिर्फ क्विक-चेक ऐप नहीं",
      visionText:
        "आज हमारा फोकस पहले उपयोगी एक्शन पर है। राउंड 2 में पूरी नागरिक यात्रा को एक साथ जोड़ा जाएगा।",

      roadmap: "राउंड 2 रोडमैप",
      comingNext: "आगे आने वाला है",

      modules: [
        {
          title: "लर्न हब",
          detail:
            "हर नागरिक के लिए नियम, दस्तावेज़ और स्टेप-बाय-स्टेप जानकारी।",
        },
        {
          title: "पूरी LL यात्रा",
          detail: "पात्रता से टेस्ट, अप्रूवल और हर अगले कदम तक एक ही फ्लो।",
        },
        {
          title: "मेरा गैरेज",
          detail: "जुड़े हुए वाहन, स्वामित्व की जानकारी और अनुपालन टाइमलाइन।",
        },
        {
          title: "AI साथी",
          detail: "हिंदी, हिंग्लिश और अंग्रेज़ी में स्क्रीन-अवेयर मार्गदर्शन।",
        },
        {
          title: "36 सेवाएँ",
          detail:
            "साथी और वाहन की व्यवस्थित लाइब्रेरी के साथ सभी रास्ते देखें।",
        },
      ],
    },

    authTitle: "अपनी पहचान से आगे बढ़ें",
    authIntro:
      "अपना फ़ोन, आधार, पैन या डीएल नंबर दर्ज करें — हम इसे पहचान लेंगे और जांचेंगे कि आप पहले से पंजीकृत हैं या नहीं।",

    asideEyebrow: "सुरक्षित डेमो एक्सेस",
    asideHeading: "एक इनपुट. ऑटो-पहचान. सत्यापित.",
    asideBody:
      "कोई भी पहचान डालें — फ़ोन, आधार, पैन या डीएल नंबर। हम इसे पहचानकर आपको आगे बढ़ा देंगे।",
    authSteps: ["कोई भी पहचान दर्ज करें", "डेमो OTP से सत्यापित करें", "अपने वर्कस्पेस पर पहुंचें"],

    identifyLabel: "फ़ोन / आधार / पैन / डीएल नंबर",
    detected: "पहचाना गया",
    fieldLabels: { phone: "फ़ोन", aadhaar: "आधार", pan: "पैन", dl: "डीएल नंबर" },
    identityPlaceholder: "कोई भी ID डालें — जैसे 98765 43210",

    continueBtn: "जारी रखें",
    tapHint: "ऑटोफिल के लिए चिप पर टैप करें",
    newUser: "नया उपयोगकर्ता",
    existingUser: "मौजूदा उपयोगकर्ता",

    phone: "फ़ोन नंबर",
    aadhaar: "आधार नंबर",
    pan: "PAN कार्ड",
    dl: "डीएल नंबर",

    back: "वापस",

    fieldRequired: "अपना फ़ोन, आधार, पैन या डीएल नंबर दर्ज करें।",

    otpTitle: "OTP दर्ज करें",
    otpIntro: "पंजीकृत मोबाइल पर 4 अंकों का कोड भेजा गया है।",
    welcomeBack: (name) => `वापसी पर स्वागत है, ${name}`,
    newRegistration: "नया पंजीकरण",
    demoOtpLabel: "डेमो OTP",
    reviewerOnly: "केवल रिव्यूअर टेस्टिंग के लिए",
    verifyBtn: "सत्यापित करें और जारी रखें",

    invalidOtp: "गलत OTP — 1234 आज़माएं।",

    secureDemo:
      "कोई वास्तविक व्यक्तिगत जानकारी एकत्र या प्रसारित नहीं की जाती।",

    verified: "पहचान सत्यापित",
    welcomeNew: "स्वागत है, अनन्या",
    welcomeExisting: "वापसी पर स्वागत है, राजेश",

    readyLL: "आपकी प्रोफ़ाइल लर्नर लाइसेंस आवेदन के लिए तैयार है।",

    currentRecords: "आपके जुड़े हुए रिकॉर्ड",

    llNext: "अब लर्नर लाइसेंस की यात्रा शुरू करें",
    dashboard: "आपका वर्कस्पेस",

    aiName: "AI साथी",
    aiPrompt: "AI गाइड · कुछ भी पूछें",

    chooseHelp: "मदद के लिए समस्या चुनें",
    nextHelp: "आप आगे क्या करना चाहेंगे?",
    mostAsked: "सबसे अधिक पूछे जाने वाले सवाल",
    askAnything: "इस स्क्रीन के बारे में सवाल पूछें",
    send: "साथी से पूछें",

    quickQuestions: [
      {
        question: "मैं अपना चालान कैसे चेक करूं?",
        answer:
          "क्विक चेक खोलें और अपना वाहन नंबर दर्ज करें। बिना साइन इन किए राशि, कारण और अगला एक्शन देख सकते हैं।",
      },
      {
        question: "मैं LL कैसे शुरू करूं?",
        answer:
          "ड्राइवर सर्विसेज खोलें। वहाँ पात्रता, दस्तावेज़, आवेदन और टेस्ट के चरण क्रम से मिलेंगे।",
      },
      {
        question: "मैं अपना DL कैसे रिन्यू करूं?",
        answer:
          "DL रिन्यूअल चुनें, अपने दस्तावेज़ों की समीक्षा करें और गाइडेड आवेदन टाइमलाइन का पालन करें।",
      },
      {
        question: "मेरे वाहन की स्थिति का क्या मतलब है?",
        answer:
          "RC, PUCC, बीमा और अन्य अनुपालन विवरण देखने के लिए वाहन सेवाएँ खोलें।",
      },
    ],

    guidedAnswer:
      "मैं इस डेमो में आपका मार्गदर्शन कर सकता हूँ। कोई सामान्य सवाल चुनें या बताएं कि आप कहाँ अटके हैं।",

    typing: "AI साथी टाइप कर रहा है...",

    namaste:
      "नमस्ते! मैं AI साथी हूँ, आपका स्क्रीन-अवेयर गाइड। चिंता न करें, मैं आपके साथ रहूँगा और हर चरण को सरल भाषा में समझाऊँगा।",

    questionReceived: "मैंने आपका सवाल सुना:",

    nextActions: [
      {
        label: "ज़रूरी दस्तावेज़ देखें",
        answer: "मैं इस सेवा के लिए आवश्यक दस्तावेज़ दिखाऊँगा।",
      },
      {
        label: "यह सेवा शुरू करें",
        answer: "मैं आपको सही सर्विस स्टार्टिंग पॉइंट पर ले जाऊँगा।",
      },
      {
        label: "अगला कदम समझें",
        answer: "मैं सरल भाषा में समझाऊँगा कि आगे क्या होगा।",
      },
    ],

    qLogin: "मैं साइन इन कैसे करूं?",
    aLogin:
      "सत्यापन विधि चुनें। सुरक्षित डेमो के लिए OTP 123456 या returning-user MPIN 4455 का उपयोग करें।",

    qRecords: "क्या यह मेरे वास्तविक रिकॉर्ड का उपयोग करेगा?",
    aRecords:
      "नहीं। यह प्रोटोटाइप केवल सिंथेटिक लोकल डेटा दिखाता है। यह कभी भी सरकारी सिस्टम से कनेक्ट नहीं होता।",

    qNext: "सत्यापन के बाद क्या होगा?",
    aNext:
      "नए नागरिक लर्नर लाइसेंस की यात्रा शुरू करेंगे। मौजूदा उपयोगकर्ता अपने जुड़े हुए डेमो रिकॉर्ड देख सकते हैं।",

    qOtp: "OTP की आवश्यकता क्यों है?",
    aOtp:
      "OTP सहमति और अकाउंट सत्यापन चरण को दर्शाता है। इस डेमो में यह पूरी तरह से सिम्युलेटेड है।",

    learningHub: {
      1.1: {
        breadcrumb: "होम → शुरुआत करें → स्वागत है",
        title: "परिवहन साथी 2026 में आपका स्वागत है",
        lead: "आधुनिक पीढ़ी के लिए बनाया गया आपका सरल और सचित्र नागरिक ज्ञान केंद्र। बिना किसी दलाल या बिचौलिए के सीधे 36 व्यक्तिगत गतिशीलता सेवाओं तक पहुँचें।",
        bento_title_1: "🪪 पहचान गेटवे (सारथी)",
        bento_desc_1:
          "हमारे फेसलेस एआई इंजन के माध्यम से अपने लर्नर और स्थायी ड्राइविंग लाइसेंस के लिए सुरक्षित रूप से आवेदन और प्रबंधन करें।",
        bento_title_2: "🚗 वाहन संपत्ति खाता (वाहन)",
        bento_desc_2:
          "अपनी गाड़ी के रजिस्ट्रेशन सर्टिफिकेट (RC) को ट्रैक करें, मालिकाना हक ट्रांसफर करें और ग्रीन टैक्स अनुपालन की तुरंत जाँच करें।",
      },
      1.4: {
        breadcrumb: "होम → शुरुआत करें → पोर्टल मार्गदर्शिका",
        title: "इस पोर्टल का उपयोग कैसे करें? (60-सेकंड की गाइड)",
        lead: "पुरानी सरकारी वेबसाइटों की जटिलता को कहें अलविदा। अपनी फाइलों और नियमों को आसानी से समझने के लिए इस छोटे लर्निंग लूप का पालन करें।",
        step_1:
          "1. बाएँ मेनू को देखें: विशिष्ट सारथी या वाहन अध्यायों में सीधे जाने के लिए 45-नोड वाले लंबे साइडबार का उपयोग करें।",
        step_2:
          "2. एआई असिस्टेंट शुरू करें: प्राकृतिक भाषा में किसी भी नियम को तुरंत खोजने के लिए नीचे बने 'Ask Assistant... ⌘K' पर क्लिक करें।",
        step_3:
          "3. लाइव डेमो चलाएँ: हमारे ब्राउज़र-नेटिव इमेज कंप्रेसर और ट्रैफिक साइन क्विज़ गेम का लाइव परीक्षण करने के लिए फ़ोल्डर 2.1 पर क्लिक करें।",
      },
    },
  },
};

export function getCopy(lang) {
  return copy[lang];
}