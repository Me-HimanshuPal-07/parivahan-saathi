const HACKATHON_NOW = new Date();

function addHours(base, hours) {
  return new Date(base.getTime() + hours * 3600000);
}

function addDays(base, days) {
  return new Date(base.getTime() + days * 86400000);
}

function isoDate(date) {
  return date.toISOString();
}

function daysBetween(fromDate, toDate) {
  return Math.round((toDate.getTime() - fromDate.getTime()) / 86400000);
}

function hoursBetween(fromDate, toDate) {
  return Math.round((toDate.getTime() - fromDate.getTime()) / 3600000);
}

function maskMobile(fullNumber) {
  const digits = String(fullNumber).replace(/\D/g, '');
  const lastFour = digits.slice(-4);
  return `+91 ******${lastFour}`;
}

function maskChassis(prefix, lastThree) {
  return `${prefix}XXXXXX${lastThree}`;
}

function syntheticHash(seed) {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 33 + seed.charCodeAt(i)) % 999999937;
  }
  return `sha256-demo-${hash.toString(16)}`;
}

const RAJESH_PUCC_EXPIRY = addHours(HACKATHON_NOW, 48);
const RAJESH_INSURANCE_EXPIRY = addDays(HACKATHON_NOW, 452);
const RAHUL_LL_EXPIRY = addDays(HACKATHON_NOW, 12);
const RAHUL_LL_ISSUED = addDays(HACKATHON_NOW, -168);

export const MOCK_SYSTEM_DB = {
  users: {
    ananyaSharma: {
      id: 'ananyaSharma',
      personaTag: 'fresh_onboarding',
      fullName: 'Ananya Sharma',
      age: 21,
      dob: '2005-03-14',
      gender: 'Female',
      mobileMasked: maskMobile('9876547812'),
      mobileHash: syntheticHash('ananyaSharma:9876547812'),
      email: 'ananya.sharma.demo@parivahansaathi.mock',
      address: 'Civil Lines, Muzaffarnagar, Uttar Pradesh - 251001',
      city: 'Muzaffarnagar',
      state: 'Uttar Pradesh',
      pincode: '251001',
      geo: { lat: 29.4727, lng: 77.7085 },
      avatarSeed: 'ananya_sharma',
      kycStatus: 'aadhaar_verified',
      registeredAt: isoDate(addDays(HACKATHON_NOW, -2)),
    },
    rameshSrivastava: {
      id: 'rameshSrivastava',
      personaTag: 'license_only',
      fullName: 'Ramesh Srivastava',
      age: 34,
      dob: '1992-06-02',
      gender: 'Male',
      mobileMasked: maskMobile('9812345670'),
      mobileHash: syntheticHash('rameshSrivastava:9812345670'),
      email: 'ramesh.srivastava.demo@parivahansaathi.mock',
      address: 'Shastri Nagar, Muzaffarnagar, Uttar Pradesh - 251002',
      city: 'Muzaffarnagar',
      state: 'Uttar Pradesh',
      pincode: '251002',
      geo: { lat: 29.4685, lng: 77.7146 },
      avatarSeed: 'ramesh_srivastava',
      kycStatus: 'aadhaar_verified',
      registeredAt: isoDate(addDays(HACKATHON_NOW, -410)),
    },
    surajVerma: {
      id: 'surajVerma',
      personaTag: 'vehicle_only',
      fullName: 'Suraj Verma',
      age: 29,
      dob: '1997-01-19',
      gender: 'Male',
      mobileMasked: maskMobile('9911223344'),
      mobileHash: syntheticHash('surajVerma:9911223344'),
      email: 'suraj.verma.demo@parivahansaathi.mock',
      address: 'Transport Nagar, Muzaffarnagar, Uttar Pradesh - 251001',
      city: 'Muzaffarnagar',
      state: 'Uttar Pradesh',
      pincode: '251001',
      geo: { lat: 29.4602, lng: 77.6981 },
      avatarSeed: 'suraj_verma',
      kycStatus: 'aadhaar_verified',
      registeredAt: isoDate(addDays(HACKATHON_NOW, -190)),
    },
    rajeshKumar: {
      id: 'rajeshKumar',
      personaTag: 'omnichannel_super_user',
      fullName: 'Rajesh Kumar',
      age: 32,
      dob: '1994-08-15',
      gender: 'Male',
      mobileMasked: maskMobile('9876543456'),
      mobileHash: syntheticHash('rajeshKumar:9876543456'),
      email: 'rajesh.kumar.demo@parivahansaathi.mock',
      address: 'Civil Lines, Muzaffarnagar, Uttar Pradesh - 251001',
      city: 'Muzaffarnagar',
      state: 'Uttar Pradesh',
      pincode: '251001',
      geo: { lat: 29.4727, lng: 77.7085 },
      avatarSeed: 'rajesh_kumar',
      kycStatus: 'aadhaar_verified',
      registeredAt: isoDate(addDays(HACKATHON_NOW, -730)),
    },
    rahulMalhotra: {
      id: 'rahulMalhotra',
      personaTag: 'cross_link_expiry_demo',
      fullName: 'Rahul Malhotra',
      age: 19,
      dob: '2007-05-09',
      gender: 'Male',
      mobileMasked: maskMobile('9955667788'),
      mobileHash: syntheticHash('rahulMalhotra:9955667788'),
      email: 'rahul.malhotra.demo@parivahansaathi.mock',
      address: 'Meenakshi Chowk, Muzaffarnagar, Uttar Pradesh - 251001',
      city: 'Muzaffarnagar',
      state: 'Uttar Pradesh',
      pincode: '251001',
      geo: { lat: 29.4750, lng: 77.7050 },
      avatarSeed: 'rahul_malhotra',
      kycStatus: 'aadhaar_verified',
      registeredAt: isoDate(addDays(HACKATHON_NOW, -168)),
      familyLinks: [{ relation: 'father', userId: 'amanMalhotra' }],
    },
    amanMalhotra: {
      id: 'amanMalhotra',
      personaTag: 'relation_candidate',
      fullName: 'Aman Malhotra',
      age: 51,
      dob: '1975-02-27',
      gender: 'Male',
      mobileMasked: maskMobile('9871122334'),
      mobileHash: syntheticHash('amanMalhotra:9871122334'),
      email: 'aman.malhotra.demo@parivahansaathi.mock',
      address: 'Meenakshi Chowk, Muzaffarnagar, Uttar Pradesh - 251001',
      city: 'Muzaffarnagar',
      state: 'Uttar Pradesh',
      pincode: '251001',
      geo: { lat: 29.4750, lng: 77.7050 },
      avatarSeed: 'aman_malhotra',
      kycStatus: 'aadhaar_verified',
      registeredAt: isoDate(addDays(HACKATHON_NOW, -1210)),
      familyLinks: [{ relation: 'son', userId: 'rahulMalhotra' }],
    },
  },

  sarathiLedger: {
    ananyaSharma: {
      hasLicense: false,
      dl: null,
      llApplication: {
        status: 'not_started',
        currentStepIndex: 0,
        pipeline: [
          { id: 'mobile_aadhaar_auth', label: 'Mobile OTP + Aadhaar Authentication', status: 'pending' },
          { id: 'digilocker_sync', label: 'DigiLocker Legal Data Hydration', status: 'pending' },
          { id: 'signature_upload', label: 'Canvas Compressor Signature Upload', status: 'pending' },
          { id: 'proctored_quiz', label: 'Faceless Home AI Proctoring Quiz', status: 'pending' },
          { id: 'fee_payment', label: 'Online Fee UPI Counter', status: 'pending' },
          { id: 'll_issuance', label: 'Digital LL Certificate Issuance', status: 'pending' },
        ],
        documentMatrix: {
          ageProof: 'not_uploaded',
          addressProof: 'not_uploaded',
          signatureCopy: 'not_uploaded',
        },
        mockTestScore: null,
        mockTestAttempts: 0,
      },
    },
    rameshSrivastava: {
      hasLicense: true,
      llApplication: null,
      dl: {
        dlNumber: 'UP15420220034521',
        licenceType: 'LMV & MCWG',
        rtoCode: 'UP-15 Muzaffarnagar',
        issueDate: '2018-06-02',
        expiryDate: '2038-06-01',
        status: 'Verified',
      },
    },
    surajVerma: {
      hasLicense: false,
      dl: null,
      llApplication: null,
      regulatoryWarning: {
        active: true,
        severity: 'critical',
        code: 'MVA_181_NO_LICENSE_COMMERCIAL_OPS',
        titleHi: 'बिना ड्राइविंग लाइसेंस के कमर्शियल वाहन चलाना गैर-कानूनी है',
        titleEn: 'Operating a commercial vehicle without a valid DL is a punishable offence',
        bodyHinglish:
          'Motor Vehicles Act ke section 181 ke tahat bina valid DL commercial vehicle chalana strictly prohibited hai. Penalty aur vehicle seizure dono ho sakte hain. Turant apni Learner Licence (LL) journey shuru karein.',
        ctaLabel: 'Start Learner Licence Application',
        ctaTarget: '2.1.1',
      },
    },
    rajeshKumar: {
      hasLicense: true,
      llApplication: null,
      dl: {
        dlNumber: 'DL-1420240098765',
        licenceType: 'LMV & MCWG',
        rtoCode: 'UP-16 Noida',
        issueDate: '2016-08-15',
        expiryDate: '2039-08-15',
        status: 'Verified',
      },
    },
    rahulMalhotra: {
      hasLicense: false,
      dl: null,
      llApplication: null,
      ll: {
        llNumber: 'LL-16202600445',
        rtoCode: 'UP-16 Noida',
        issueDate: isoDate(RAHUL_LL_ISSUED),
        expiryDate: isoDate(RAHUL_LL_EXPIRY),
        validityWindowDays: 180,
        daysRemaining: daysBetween(HACKATHON_NOW, RAHUL_LL_EXPIRY),
        status: 'expiring_soon',
        warningLevel: 'critical',
        upgradeEligible: true,
        upgradeCtaLabel: 'Book Permanent DL Track Test Now',
        upgradeCtaTarget: '2.2.2',
      },
    },
    amanMalhotra: {
      hasLicense: true,
      llApplication: null,
      dl: {
        dlNumber: 'UP16420120076543',
        licenceType: 'LMV & MCWG',
        rtoCode: 'UP-16 Noida',
        issueDate: '2005-02-27',
        expiryDate: '2035-02-27',
        status: 'Verified',
      },
    },
  },

  vahanLedger: {
    ananyaSharma: {
      hasVehicle: false,
      vehicles: [],
      emptyStatePrompt: {
        titleHinglish: 'Aapka garage abhi khaali hai',
        bodyHinglish: 'Jab aap koi vehicle purchase ya register karenge, uski RC, insurance aur PUCC details yahan automatically dikhengi.',
        ctaLabel: 'Learn how vehicle registration works',
        ctaTarget: '3.1.1',
      },
    },
    rameshSrivastava: {
      hasVehicle: false,
      vehicles: [],
      conditionalPrompt: {
        active: true,
        severity: 'info',
        titleHinglish: 'Aapke naam par koi registered vehicle nahi hai',
        bodyHinglish: 'Aap ek naya vehicle register kar sakte hain, ya kisi purani gadi ki used-RC ownership transfer process shuru kar sakte hain.',
        options: [
          { label: 'Register a new vehicle', ctaTarget: '3.1.1' },
          { label: 'Start RC ownership transfer for a used vehicle', ctaTarget: '3.2.1' },
        ],
      },
    },
    surajVerma: {
      hasVehicle: true,
      vehicles: [
        {
          vehicleId: 'VH-SV-001',
          registrationNumber: 'UP-16-BT-7788',
          modelName: 'Mahindra Bolero Pickup',
          vehicleClass: 'commercial_goods_carrier',
          chassisMasked: maskChassis('MA1TC2', '901'),
          fitnessExpiry: isoDate(addDays(HACKATHON_NOW, 96)),
          insuranceExpiry: isoDate(addDays(HACKATHON_NOW, 210)),
          puccExpiry: isoDate(addDays(HACKATHON_NOW, 40)),
          commercialPermit: {
            status: 'active',
            permitType: 'State Goods Carrier Permit',
            expiryDate: isoDate(addDays(HACKATHON_NOW, 300)),
          },
          ownershipStatus: 'primary_owner',
        },
      ],
    },
    rajeshKumar: {
      hasVehicle: true,
      vehicles: [
        {
          vehicleId: 'VH-RK-001',
          registrationNumber: 'UP-16-AB-1234',
          modelName: 'Tata Nexon EV',
          vehicleClass: 'private_four_wheeler',
          chassisMasked: maskChassis('MAT74X', '089'),
          fitnessExpiry: isoDate(addDays(HACKATHON_NOW, 900)),
          insuranceExpiry: isoDate(RAJESH_INSURANCE_EXPIRY),
          puccExpiry: isoDate(RAJESH_PUCC_EXPIRY),
          puccAlert: {
            active: true,
            severity: 'urgent',
            hoursRemaining: hoursBetween(HACKATHON_NOW, RAJESH_PUCC_EXPIRY),
            titleHinglish: 'PUCC sirf 48 ghanton mein expire ho raha hai',
            bodyHinglish: 'Aapki gadi ka Pollution Under Control Certificate jald expire hone wala hai. Bina valid PUCC ke driving par challan kata ja sakta hai.',
            ctaLabel: 'Renew PUCC Now',
            ctaTarget: '3.2.1',
          },
          ownershipStatus: 'primary_owner',
        },
      ],
    },
    rahulMalhotra: {
      hasVehicle: false,
      vehicles: [],
      relationLinks: [
        {
          relation: 'father',
          linkedUserId: 'amanMalhotra',
          linkStatus: 'pending_consent',
          candidateVehicle: {
            vehicleId: 'VH-AM-001',
            registrationNumber: 'UP-16-CD-4455',
            modelName: 'Maruti Suzuki Swift',
            vehicleClass: 'private_four_wheeler',
            chassisMasked: maskChassis('MA3ER6', '512'),
            fitnessExpiry: isoDate(addDays(HACKATHON_NOW, 1180)),
            insuranceExpiry: isoDate(addDays(HACKATHON_NOW, 260)),
            puccExpiry: isoDate(addDays(HACKATHON_NOW, 55)),
            ownershipStatus: 'family_linked_not_owner',
          },
          consentPromptHinglish: 'Aapke pita Aman Malhotra ki Swift ko apne terminal view mein link karne ke liye unse consent approval chahiye hoga.',
        },
      ],
    },
    amanMalhotra: {
      hasVehicle: true,
      vehicles: [
        {
          vehicleId: 'VH-AM-001',
          registrationNumber: 'UP-16-CD-4455',
          modelName: 'Maruti Suzuki Swift',
          vehicleClass: 'private_four_wheeler',
          chassisMasked: maskChassis('MA3ER6', '512'),
          fitnessExpiry: isoDate(addDays(HACKATHON_NOW, 1180)),
          insuranceExpiry: isoDate(addDays(HACKATHON_NOW, 260)),
          puccExpiry: isoDate(addDays(HACKATHON_NOW, 55)),
          ownershipStatus: 'primary_owner',
        },
      ],
    },
  },

  challans: [
    {
      challanId: 'CH-2026-9908',
      userId: 'rajeshKumar',
      vehicleId: 'VH-RK-001',
      registrationNumber: 'UP-16-AB-1234',
      amount: 1000,
      currency: 'INR',
      reasonEn: 'Over-speeding caught by Automated Speed Camera on NH-58',
      reasonHi: 'एनएच-58 पर स्वचालित स्पीड कैमरे द्वारा ओवर-स्पीडिंग पकड़ी गई',
      issuedAt: isoDate(addDays(HACKATHON_NOW, -6)),
      dueDate: isoDate(addDays(HACKATHON_NOW, 24)),
      status: 'Unpaid',
      paymentMethodOptions: ['upi', 'card', 'netbanking'],
      idempotencyKey: syntheticHash('challan:CH-2026-9908:rajeshKumar:1000'),
      checkoutSteps: ['review_amount', 'confirm_otp'],
    },
  ],
};

export const DEMO_NEW_CITIZEN = {
  fullName: MOCK_SYSTEM_DB.users.ananyaSharma.fullName,
  dob: MOCK_SYSTEM_DB.users.ananyaSharma.dob,
  address: MOCK_SYSTEM_DB.users.ananyaSharma.address,
  registeredMobile: MOCK_SYSTEM_DB.users.ananyaSharma.mobileMasked,
  avatarSeed: MOCK_SYSTEM_DB.users.ananyaSharma.avatarSeed,
};

export const MOCK_LEARNING_PROGRESS = {
  ananyaProgress: {
    userId: 'ananyaSharma',
    completedNodes: ['1.1', '1.2', '1.3', '1.4'],
    currentLLStep: '2.1.5',
    mockQuizScore: 0,
    quizCompleted: false,
    signatureCompressedUrl: null,
    eligibilityCheck: true,
  },
  rameshProgress: {
    userId: 'rameshSrivastava',
    completedNodes: ['1.1', '3.1.1'],
    vehicleRegistrationPromptSeen: true,
    usedRcTransferInterestFlag: false,
  },
  surajProgress: {
    userId: 'surajVerma',
    completedNodes: ['1.1'],
    regulatoryWarningAcknowledged: false,
    llStartRedirectClicked: false,
  },
  rajeshProgress: {
    userId: 'rajeshKumar',
    completedNodes: ['1.1', '3.1.1', '4.2.1'],
    puccAlertTriggered: true,
    challanPaidViaUpi: false,
    rcTransferNocStatus: 'Pending_RTO_Verification',
  },
  rahulProgress: {
    userId: 'rahulMalhotra',
    completedNodes: ['1.1'],
    llExpiryAlertTriggered: true,
    fatherLinkConsentRequested: false,
    dlUpgradeTrackBookingClicked: false,
  },
};