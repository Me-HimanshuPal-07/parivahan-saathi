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
