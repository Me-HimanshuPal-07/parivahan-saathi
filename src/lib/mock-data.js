// Mock data for Parivahan Saathi — hardcoded for a consistent demo.
// No real backend. 4 sample vehicle numbers, three with challans.

export const VEHICLE_RECORDS = [
  {
    vehicleNumber: "UP32EA1234",
    ownerName: "Ramesh Kumar",
    ownerNameHi: "रमेश कुमार",
    challans: [
      {
        id: "CH-UP32-001",
        challanNumber: "UP32EA2026110423",
        date: "2026-07-12",
        violationType: "Overspeeding",
        violationTypeHi: "ओवरस्पीडिंग",
        fineAmount: 1000,
        location: "Gomti Nagar, Lucknow",
        status: "pending",
      },
    ],
  },
  {
    vehicleNumber: "DL01CD5678",
    ownerName: "Anita Sharma",
    ownerNameHi: "अनिता शर्मा",
    challans: [
      {
        id: "CH-DL01-001",
        challanNumber: "DL01CD2026088712",
        date: "2026-06-28",
        violationType: "Wrong-side Driving",
        violationTypeHi: "गलत दिशा में ड्राइविंग",
        fineAmount: 5000,
        location: "Connaught Place, New Delhi",
        status: "pending",
      },
      {
        id: "CH-DL01-002",
        challanNumber: "DL01CD2026088713",
        date: "2026-07-03",
        violationType: "No Parking",
        violationTypeHi: "नो पार्किंग",
        fineAmount: 1500,
        location: "Karol Bagh, New Delhi",
        status: "pending",
      },
    ],
  },
  {
    vehicleNumber: "MH14EF9012",
    ownerName: "Sandeep Patil",
    ownerNameHi: "संदीप पाटिल",
    challans: [
      {
        id: "CH-MH14-001",
        challanNumber: "MH14EF2026210955",
        date: "2026-07-19",
        violationType: "Without Helmet",
        violationTypeHi: "हेलमेट के बिना",
        fineAmount: 1000,
        location: "Hinjawadi, Pune",
        status: "pending",
      },
    ],
  },
  {
    vehicleNumber: "KA05GH3456",
    ownerName: "Lakshmi Nair",
    ownerNameHi: "लक्ष्मी नायर",
    challans: [],
  },
];

/** Normalize a vehicle number: uppercase, strip spaces. */
export function normalizeVehicleNumber(input) {
  return input.trim().toUpperCase().replace(/\s+/g, "");
}

export function findVehicle(input) {
  const normalized = normalizeVehicleNumber(input);
  return VEHICLE_RECORDS.find((v) => v.vehicleNumber === normalized);
}

export function getChallanById(challanId) {
  for (const vehicle of VEHICLE_RECORDS) {
    const challan = vehicle.challans.find((c) => c.id === challanId);
    if (challan) return { challan, vehicle };
  }
  return undefined;
}

export function formatIndianRupee(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/** Vehicle numbers a visitor can try, surfaced as quick-pick chips. */
export const SAMPLE_VEHICLE_NUMBERS = [
  "UP32EA1234",
  "DL01CD5678",
  "MH14EF9012",
  "KA05GH3456",
];

/* ---------------------------------------------------------------------------
 * Tier-2 "All-in-one health audit" mock layer.
 * One vehicle number -> RC, Insurance, PUCC and E-Challan status together.
 * ------------------------------------------------------------------------ */

/** Mask an owner name for privacy: "Ramesh Kumar" -> "R***** K****". */
export function maskOwnerName(name) {
  return name
    .split(" ")
    .map((part) => (part ? part[0] + "*".repeat(Math.max(part.length - 1, 1)) : part))
    .join(" ");
}

/** Deterministic pseudo-random 0..n-1 from a vehicle number. */
function seedIndex(input, n) {
  let hash = 0;
  for (let i = 0; i < input.length; i++) hash = (hash * 31 + input.charCodeAt(i)) % 100000;
  return hash % n;
}

function addDays(days) {
  const d = new Date("2026-08-26T00:00:00Z");
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

const DEMO_CHALLANS = [
  {
    id: "MOCK-1",
    challanNumber: "PS2026500011",
    date: "2026-07-08",
    violationType: "No-parking violation",
    violationTypeHi: "नो पार्किंग",
    fineAmount: 500,
    location: "City Centre",
    status: "pending",
  },
  {
    id: "MOCK-2",
    challanNumber: "PS2026500012",
    date: "2026-07-21",
    violationType: "Helmet violation",
    violationTypeHi: "हेलमेट के बिना",
    fineAmount: 1000,
    location: "Ring Road",
    status: "pending",
  },
];

/** Build the four-way audit for any vehicle number (mock, no backend). */
export function getVehicleAudit(input) {
  const vehicleNumber = normalizeVehicleNumber(input);
  const record = findVehicle(vehicleNumber);
  const challans = record ? record.challans : DEMO_CHALLANS;
  const totalDue = challans
    .filter((c) => c.status === "pending")
    .reduce((sum, c) => sum + c.fineAmount, 0);

  const insDays = [-14, 21, 96, 240][seedIndex(vehicleNumber + "ins", 4)];
  const pucDays = [-6, 12, 74, 158][seedIndex(vehicleNumber + "puc", 4)];

  const spanStatus = (days) =>
    days < 0 ? "concern" : days <= 30 ? "attention" : "clear";

  const spanText = (days) =>
    days < 0
      ? `${Math.abs(days)} din pehle expire ho chuka`
      : days <= 30
        ? `Sirf ${days} din bache — abhi renew karein`
        : `Valid till ${formatDate(addDays(days))}`;

  const items = [
    {
      id: "rc",
      label: "RC Status",
      labelHi: "आर.सी.",
      status: "clear",
      headline: "Active",
      detail: `Registered${record ? "" : " (demo record)"} · Valid till ${formatDate(addDays(900))}`,
    },
    {
      id: "insurance",
      label: "Insurance",
      labelHi: "बीमा",
      status: spanStatus(insDays),
      headline: insDays < 0 ? "Expired" : insDays <= 30 ? "Expiring soon" : "Valid",
      detail: spanText(insDays),
    },
    {
      id: "pucc",
      label: "PUCC",
      labelHi: "प्रदूषण",
      status: spanStatus(pucDays),
      headline: pucDays < 0 ? "Expired" : pucDays <= 30 ? "Expiring soon" : "Valid",
      detail: spanText(pucDays),
    },
    {
      id: "challan",
      label: "E-Challan",
      labelHi: "चालान",
      status: totalDue > 0 ? "concern" : "clear",
      headline: totalDue > 0 ? `${challans.length} pending` : "No pending challan",
      detail:
        totalDue > 0
          ? `${formatIndianRupee(totalDue)} due — abhi pay kar sakte hain`
          : "Aap clear hain, koi fine baaki nahi",
    },
  ];

  const overall = items.some((i) => i.status === "concern")
    ? "concern"
    : items.some((i) => i.status === "attention")
      ? "attention"
      : "clear";

  return {
    vehicleNumber,
    ownerMasked: maskOwnerName(record?.ownerName ?? "Demo Owner"),
    overall,
    items,
    challans,
    totalDue,
  };
}