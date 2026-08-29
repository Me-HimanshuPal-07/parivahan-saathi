export function normalizeVehicleNumber(value) {
  return String(value ?? "")
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "");
}

// Complete mock system database with all required keys
export const MOCK_SYSTEM_DB = {
  vahanLedger: {
    ananyaSharma: {
      name: "Ananya Sharma",
      vehicles: [
        {
          vehicleId: "v1",
          registrationNumber: "UP16BT7788",
          insuranceExpiry: "2026-12-31",
          fitnessExpiry: "2028-05-10",
          puccExpiry: "2026-10-15",
          puccAlert: { active: false },
        },
        {
          vehicleId: "v2",
          registrationNumber: "UP16AB1234",
          insuranceExpiry: "2025-08-20",
          fitnessExpiry: "2027-01-15",
          puccAlert: { active: true, bodyHinglish: "PUCC Expiring Soon" },
        },
      ],
    },
    user2: {
      name: "Rahul Verma",
      vehicles: [
        {
          vehicleId: "v3",
          registrationNumber: "UP16CD4455",
          insuranceExpiry: "2026-11-01",
          fitnessExpiry: "2029-03-22",
          puccAlert: { active: false },
        },
      ],
    },
  },
  sarathiLedger: {
    ananyaSharma: {
      dl: {
        dlNumber: "DL1420240098765",
        licenceType: "LMV / MCWG",
        expiryDate: "2035-04-12",
        status: "Verified",
      },
    },
  },
  challans: [
    {
      registrationNumber: "UP16BT7788",
      status: "Unpaid",
      amount: 1000,
      reasonEn: "Over-speeding caught on NH-24 CCTV",
      location: "Noida Expressway, KM 14",
    },
  ],
};

// Safe helper to build registries
const vahanRegistry = Object.values(MOCK_SYSTEM_DB?.vahanLedger || {}).reduce(
  (registry, ownerRecord) => {
    for (const vehicle of ownerRecord?.vehicles ?? []) {
      const normalized = normalizeVehicleNumber(vehicle.registrationNumber);

      registry[normalized] = {
        vehicleNumber: vehicle.registrationNumber,
        ownerMasked: "A***** S*****",
        overallStatus: "clear",
        metrics: {
          rc: {
            status: "clear",
            label: "Registration Certificate",
            labelHi: "पंजीकरण प्रमाणपत्र",
            headline: "RC record available",
            detail: `${vehicle.registrationNumber} is registered in the local sandbox ledger.`,
          },
          insurance: {
            status: "clear",
            label: "Insurance",
            labelHi: "बीमा",
            headline: "Insurance record available",
            detail: vehicle.insuranceExpiry
              ? `Valid through ${vehicle.insuranceExpiry}`
              : "Insurance record available.",
          },
          pucc: {
            status: vehicle.puccAlert?.active ? "attention" : "clear",
            label: "PUCC",
            labelHi: "प्रदूषण प्रमाणपत्र",
            headline: vehicle.puccAlert?.active
              ? "Renewal required soon"
              : "PUCC record available",
            detail:
              vehicle.puccAlert?.bodyHinglish ||
              (vehicle.puccExpiry
                ? `Valid through ${vehicle.puccExpiry}`
                : "PUCC record available."),
          },
          fitness: {
            status: "clear",
            label: "Fitness",
            labelHi: "फिटनेस",
            headline: "Fitness record available",
            detail: vehicle.fitnessExpiry
              ? `Valid through ${vehicle.fitnessExpiry}`
              : "Fitness record available.",
          },
        },
      };

      const challan = MOCK_SYSTEM_DB.challans.find(
        (item) =>
          normalizeVehicleNumber(item.registrationNumber) === normalized &&
          item.status === "Unpaid",
      );

      if (challan) {
        registry[normalized].overallStatus = "concern";
        registry[normalized].activeChallan = challan;
        registry[normalized].metrics.challan = {
          status: "concern",
          label: "Challan",
          labelHi: "चालान",
          headline: `₹${challan.amount.toLocaleString("en-IN")} outstanding`,
          detail: challan.reasonEn,
        };
      }

      registry[normalized].ownerUserId = Object.entries(
        MOCK_SYSTEM_DB.vahanLedger,
      ).find(([, record]) =>
        (record.vehicles ?? []).some(
          (item) => item.vehicleId === vehicle.vehicleId,
        ),
      )?.[0];
    }

    return registry;
  },
  {},
);

const sarathiRegistry = Object.entries(MOCK_SYSTEM_DB?.sarathiLedger || {}).reduce(
  (registry, [ownerUserId, record]) => {
    if (record?.dl?.dlNumber) {
      const normalized = normalizeVehicleNumber(record.dl.dlNumber);

      registry[normalized] = {
        dlNumber: record.dl.dlNumber,
        licenceClass: record.dl.licenceType,
        expiryDate: record.dl.expiryDate,
        enforcementStatus: record.dl.status || "Verified",
        ownerName: "Masked Holder",
        // Lets Hero pass along which account this DL belongs to when it
        // creates the session, so AccountDashboard resolves the right
        // owner's records instead of always falling back to the first
        // ledger entry.
        ownerUserId,
      };
    }

    return registry;
  },
  {},
);

MOCK_SYSTEM_DB.vahanRegistry = vahanRegistry;
MOCK_SYSTEM_DB.sarathiRegistry = sarathiRegistry;