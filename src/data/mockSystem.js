export const MOCK_SYSTEM_DB = {
  newCitizenAccount: {
    authenticated: false,
    profile: null,
    hasLicenses: false,
    hasVehicles: false,
  },
  existingOfflineUser: {
    authenticated: false,
    profile: {
      fullName: 'Rajesh Kumar',
      dob: '1994-08-15',
      address: 'Civil Lines, Muzaffarnagar, Uttar Pradesh - 251001',
      registeredMobile: '+91 ******3456',
      avatarSeed: 'rajesh_kumar',
    },
    drivingLicense: {
      dlNumber: 'DL-1420240098765',
      licenceType: 'LMV & MCWG',
      status: 'Verified',
      expiryDate: '2039-08-15',
    },
    vehicles: [
      {
        registrationNumber: 'UP-16-AB-1234',
        modelName: 'Tata Nexon EV',
        insuranceExpiry: '2027-11-20',
        puccExpiry: '2026-08-28',
        chassisMasked: 'MAT74XXXXXX89',
      },
    ],
    challans: [
      {
        id: 'CH-2026-9908',
        amount: 1000,
        reason: 'Over-speeding caught by Automated Speed Camera on NH-58',
        status: 'Unpaid',
      },
    ],
  },
}

export const DEMO_NEW_CITIZEN = {
  fullName: 'Ananya Sharma',
  dob: '2004-09-18',
  address: 'Civil Lines, Muzaffarnagar, Uttar Pradesh - 251001',
  registeredMobile: '+91 ******7812',
  avatarSeed: 'ananya_sharma',
}

export const MOCK_LEARNING_PROGRESS = {
  // अनन्य शर्मा (New Citizen) के लिए स्टेट ड्रिवेन प्रोग्रेस पैरामीटर्स
  ananyaProgress: {
    completedNodes: ["1.1", "1.2", "1.3", "1.4"],
    currentLLStep: "2.1.5", // Image Compressor पर एक्टिव है
    mockQuizScore: 0,
    quizCompleted: false,
    signatureCompressedUrl: null,
    eligibilityCheck: true
  },
  // राजेश कुमार (Existing Driver) के लिए स्टेट ड्रिवेन प्रोग्रेस पैरामीटर्स
  rajeshProgress: {
    completedNodes: ["1.1", "3.1.1", "4.2.1"],
    puccAlertTriggered: true, // 28 अगस्त की डेडलाइन का अलर्ट एक्टिव
    challanPaidViaUpi: false,
    rcTransferNocStatus: "Pending_RTO_Verification"
  }
};