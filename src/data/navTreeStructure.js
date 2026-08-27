export const NAV_TREE_STRUCTURE = [
  {
    grandparentId: "1",
    grandparentTitle: "1. GET STARTED & PORTAL ONBOARDING",
    grandparentIcon: "Globe", // Lucide Icon: Globe
    parents: [
      {
        parentId: "1.0",
        parentTitle: "Quick Start Guides",
        parentIcon: "FolderOpen", // Lucide Icon: FolderOpen
        children: [
          { id: "1.1", title: "1.1 Welcome to Parivahan Saathi", icon: "FileText" },
          { id: "1.2", title: "1.2 What is Parivahan Saathi?", icon: "FileText" },
          { id: "1.3", title: "1.3 Why we built this? (The Friction Fix)", icon: "FileText" },
          { id: "1.4", title: "1.4 How to use this Portal? (60-Sec Guide)", icon: "FileText" }
        ]
      }
    ]
  },
  {
    grandparentId: "2",
    grandparentTitle: "2. SARATHI HUB: CITIZEN ID & LICENCES",
    grandparentIcon: "UserCheck", // Lucide Icon: UserCheck
    parents: [
      {
        parentId: "2.1",
        parentTitle: "Learner's Licence (LL) Academy",
        parentIcon: "FolderOpen",
        children: [
          { id: "2.1.1", title: "2.1.1 Overview: What is an LL? (LL vs DL)", icon: "FileText" },
          { id: "2.1.2", title: "2.1.2 Step-by-Step Faceless LL Journey", icon: "FileText" },
          { id: "2.1.3", title: "2.1.3 The Hybrid Document Matrix", icon: "FileText" },
          { id: "2.1.4", title: "2.1.4 Fee Structuring & Penalty Rules", icon: "FileText" },
          { id: "2.1.5", title: "2.1.5 In-Browser Image Compressor", icon: "FileText" },
          { id: "2.1.6", title: "2.1.6 Common Mistakes & Agent Traps", icon: "FileText" },
          { id: "2.1.7", title: "2.1.7 Interactive Traffic Sign Quiz", icon: "FileText" }
        ]
      },
      {
        parentId: "2.2",
        parentTitle: "Permanent Driving Licence (DL) Lifecycle",
        parentIcon: "FolderOpen",
        children: [
          { id: "2.2.1", title: "2.2.1 After Your LL: The 30-Day Window", icon: "FileText" },
          { id: "2.2.2", title: "2.2.2 Eligibility Criteria for Track Booking", icon: "FileText" },
          { id: "2.2.3", title: "2.2.3 DL Renewal & Grace Horizon Mandates", icon: "FileText" },
          { id: "2.2.4", title: "2.2.4 Ordering Duplicate DL (Lost Card)", icon: "FileText" }
        ]
      },
      {
        parentId: "2.3",
        parentTitle: "Identity Profile Modifications",
        parentIcon: "FolderOpen",
        children: [
          { id: "2.3.1", title: "2.3.1 Profile Mod: Change of Address", icon: "FileText" },
          { id: "2.3.2", title: "2.3.2 Profile Mod: Official Name Correction", icon: "FileText" }
        ]
      }
    ]
  },
  {
    grandparentId: "3",
    grandparentTitle: "3. VAHAN HUB: VEHICLE PROPERTY REGISTRY",
    grandparentIcon: "Car", // Lucide Icon: Car
    parents: [
      {
        parentId: "3.1",
        parentTitle: "Vehicle Registration Certificate (RC) Basics",
        parentIcon: "FolderOpen",
        children: [
          { id: "3.1.1", title: "3.1.1 Temporary vs Permanent Workflows", icon: "FileText" },
          { id: "3.1.2", title: "3.1.2 Issuing Duplicate RC Cards", icon: "FileText" }
        ]
      },
      {
        parentId: "3.2",
        parentTitle: "Vehicle Lifespan Extension (Green Tax Gates)",
        parentIcon: "FolderOpen",
        children: [
          { id: "3.2.1", title: "3.2.1 The 15-Year Mandatory RC Renewal", icon: "FileText" },
          { id: "3.2.2", title: "3.2.2 Green Tax Calculation & Penalty Matrix", icon: "FileText" },
          { id: "3.2.3", title: "3.2.3 Private Vehicle Fitness Safety Parameters", icon: "FileText" }
        ]
      },
      {
        parentId: "3.3",
        parentTitle: "Ownership Transfers & Liability Migrations",
        parentIcon: "FolderOpen",
        children: [
          { id: "3.3.1", title: "3.3.2 Used Car RC Transfer Protocol", icon: "FileText" },
          { id: "3.3.2", title: "3.3.3 Inter-State NOC Clearance Blueprint", icon: "FileText" },
          { id: "3.3.3", title: "3.3.4 RC Transfers in Special Cases (Death)", icon: "FileText" }
        ]
      },
      {
        parentId: "3.4",
        parentTitle: "Asset Finance & Hypothecation Management",
        parentIcon: "FolderOpen",
        children: [
          { id: "3.4.1", title: "3.4.1 Endorsing a New Bank Loan on RC", icon: "FileText" },
          { id: "3.4.2", title: "3.4.2 Terminating a Bank Loan (HP Removal)", icon: "FileText" }
        ]
      }
    ]
  },
  {
    grandparentId: "4",
    grandparentTitle: "4. CITIZEN KNOWLEDGE LABS: RULES & LAWS",
    grandparentIcon: "Scale", // Lucide Icon: Scale
    parents: [
      {
        parentId: "4.1",
        parentTitle: "Immersive Traffic Sign Glossary",
        parentIcon: "FolderOpen",
        children: [
          { id: "4.1.1", title: "4.1.1 Mandatory Regulatory Signs (Red Circles)", icon: "FileText" },
          { id: "4.1.2", title: "4.1.2 Cautionary Warning Signs (Triangles)", icon: "FileText" },
          { id: "4.1.3", title: "4.1.3 Informational Utility Signs (Squares)", icon: "FileText" }
        ]
      },
      {
        parentId: "4.2",
        parentTitle: "Central Motor Vehicle Acts (Simplified)",
        parentIcon: "FolderOpen",
        children: [
          { id: "4.2.1", title: "4.2.1 The Good Samaritan Law (Help No Fear)", icon: "FileText" },
          { id: "4.2.2", title: "4.2.2 Digital Documents Validity Law", icon: "FileText" }
        ]
      },
      {
        parentId: "4.3",
        parentTitle: "Penalty Lookup & Enforcement Counters",
        parentIcon: "FolderOpen",
        children: [
          { id: "4.3.1", title: "4.3.1 Instant Fine Matrix (Top 25 Violations)", icon: "FileText" },
          { id: "4.3.2", title: "4.3.2 Online Traffic E-Challan Dispute Path", icon: "FileText" }
        ]
      }
    ]
  },
  {
    grandparentId: "5",
    grandparentTitle: "5. HACKATHON JURY SPACE",
    grandparentIcon: "Award", // Lucide Icon: Award
    parents: [
      {
        parentId: "5.0",
        parentTitle: "Evaluation Center",
        parentIcon: "FolderOpen",
        children: [
          { id: "5.1", title: "5.1 Project Redesign Evaluation Center", icon: "ShieldCheck" }
        ]
      }
    ]
  }
];
