export interface LitigationRecord {
  id: string;
  companyName: string;
  caseNumber: string;
  jurisdiction: string;
  filingDate: string;
  plaintiff: string;
  defendant: string;
  allegations: string[];
  status: string;
  notes: string;
}

export interface InspectionRecord {
  id: string;
  companyName: string;
  inspectionDate: string;
  feiNumber: string;
  violations: string[];
  formFDA483: boolean;
  notes: string;
}

export interface ExecutiveBackground {
  id: string;
  name: string;
  title: string;
  companyName: string;
  background: string;
  regulatoryHistory: string;
  litigationHistory: string;
  riskLevel: "high" | "medium" | "low";
}

export const litigationRecords: LitigationRecord[] = [
  {
    id: "vitti-v-platinum",
    companyName: "Platinum Biologics",
    caseNumber: "4:24-cv-264",
    jurisdiction: "U.S. District Court, Western District of Missouri",
    filingDate: "2024-04-12",
    plaintiff: "Vitti Labs LLC, Vitti Corporate LLC, Gold Prairie Distribution LLC",
    defendant: "The Regenerative Project LLC d/b/a Platinum Biologics, Michael Beeben Russell",
    allegations: [
      "False advertising",
      "Unfair competition",
      "Injurious falsehood (trade libel)",
      "Defamation",
      "Tortious interference with business relationships",
      "Deliberate efforts to mislead and misrepresent products",
    ],
    status: "Ongoing",
    notes: "Motion to dismiss filed with jurisdictional challenges. Suggestions in opposition filed June 5, 2024.",
  },
  {
    id: "vitti-v-fda",
    companyName: "Vitti Labs",
    caseNumber: "4:2025cv00011",
    jurisdiction: "U.S. District Court, Western District of Missouri",
    filingDate: "2025-01-07",
    plaintiff: "Vitti Labs LLC",
    defendant: "Robert Califf M.D., U.S. Department of Health and Human Services, FDA",
    allegations: [
      "Challenge to FDA minimal manipulation classification",
      "Dispute over 361 HCT/P qualification criteria",
    ],
    status: "Ongoing",
    notes: "Vitti Labs challenging FDA's interpretation of minimal manipulation standard for umbilical cord products.",
  },
  {
    id: "stem-cell-v-venable",
    companyName: "Stem Cell Clinic (California)",
    caseNumber: "Unknown",
    jurisdiction: "California",
    filingDate: "2024-01-01",
    plaintiff: "Stem Cell Clinic",
    defendant: "Venable LLP (Law Firm)",
    allegations: ["Professional malpractice", "Inadequate legal representation"],
    status: "Settled",
    notes: "Stem cell clinic ended $10 million lawsuit against law firm Venable on December 11, 2025.",
  },
  {
    id: "row1-v-russell",
    companyName: "Multiple (Russell involved)",
    caseNumber: "Unknown",
    jurisdiction: "Unknown",
    filingDate: "2023-04-18",
    plaintiff: "ROW1 Inc",
    defendant: "Michael Russell, Arian Carney, Scott Martin MD, Stephen Mesa, Marcus Russell",
    allegations: ["Business dispute"],
    status: "Unknown",
    notes: "Complaint filed involving Michael Russell and other parties in business dispute.",
  },
];

export const inspectionRecords: InspectionRecord[] = [
  {
    id: "vitti-labs-inspection",
    companyName: "Vitti Labs",
    inspectionDate: "2022-07-28",
    feiNumber: "627699",
    violations: [
      "Products fail minimal manipulation criterion (21 CFR 1271.10(a)(1))",
      "Products fail homologous use criterion (21 CFR 1271.10(a)(2))",
      "Significant deviations from cGMP requirements",
      "Deviations from section 501(a)(2)(B) of FD&C Act",
      "Deviations from 21 CFR Parts 210 and 211",
    ],
    formFDA483: true,
    notes: "Warning letter OBPO 22-627699. Products EV-PURE+, WJ-PURE+, VITTI-PURE fail to meet 361 criteria.",
  },
  {
    id: "platinum-biologics-inspection",
    companyName: "Platinum Biologics",
    inspectionDate: "2025-08-15",
    feiNumber: "705090",
    violations: [
      "Products marketed as unapproved new drugs (Section 505(a) violation)",
      "Products fail minimal manipulation criterion (21 CFR 1271.10(a)(1))",
      "Products fail homologous use criterion (21 CFR 1271.10(a)(2))",
      "Processing alters physical state from conduit to injectable/flowable form",
      "Products marketed for non-homologous uses (healing, repair of age-related defects)",
      "Unlicensed biological products (Section 351(i) violation)",
    ],
    formFDA483: true,
    notes: "Warning letter CBER 25-705090. Products Nano PRP Jelly, Nano Flex, NanoEx, Nano Xsomes.",
  },
  {
    id: "kimera-labs-inspection",
    companyName: "Kimera Labs",
    inspectionDate: "2023-09-01",
    feiNumber: "649343",
    violations: [
      "Unapproved drug status",
      "cGMP violations",
      "Manufacturing quality control failures",
    ],
    formFDA483: true,
    notes: "Warning letter 23-649343. Products XoGlo marketed without FDA approval.",
  },
  {
    id: "chara-biologics-inspection",
    companyName: "Chara Biologics",
    inspectionDate: "2025-01-15",
    feiNumber: "Unknown",
    violations: [
      "Marketing unapproved drugs",
      "Manufacturing violations",
      "Failure to meet 361 criteria",
    ],
    formFDA483: true,
    notes: "Warning letter issued January 2025 for umbilical cord-derived exosome products.",
  },
  {
    id: "new-life-medical-inspection",
    companyName: "New Life Medical Services",
    inspectionDate: "2025-09-24",
    feiNumber: "711102",
    violations: [
      "Unapproved new drugs in violation of Section 505(a)",
      "Failure to meet 361 HCT/P criteria",
    ],
    formFDA483: true,
    notes: "Warning letter 711102. Products marketed without FDA approval.",
  },
  {
    id: "neobiosis-inspection",
    companyName: "Neobiosis LLC",
    inspectionDate: "2024-06-05",
    feiNumber: "662985",
    violations: [
      "Significant inspectional observations",
      "Manufacturing quality issues",
    ],
    formFDA483: true,
    notes: "Form FDA-483 issued. Significant deviations from compliance noted.",
  },
  {
    id: "evolutionary-biologics-inspection",
    companyName: "Evolutionary Biologics Inc",
    inspectionDate: "2024-12-30",
    feiNumber: "681586",
    violations: [
      "Unapproved new drugs",
      "Unlicensed biological products",
    ],
    formFDA483: true,
    notes: "Warning letter 681586. Products marketed as biological products without BLA.",
  },
];

export const executiveBackgrounds: ExecutiveBackground[] = [
  {
    id: "beeben-russell",
    name: "Michael Beeben Russell",
    title: "Owner/Chairman",
    companyName: "Platinum Biologics (The Regenerative Project LLC)",
    background: "Former VP of Sales for Regenative Labs. High school education only (one year).",
    regulatoryHistory:
      "Associated with Regenative Labs which received FDA warning letter for unapproved stem cell products. Regenative Labs involved in Medicare billing scheme for non-covered orthopedic procedures.",
    litigationHistory:
      "Defendant in Vitti Labs v. Platinum Biologics (2024) for defamation, unfair competition, and tortious interference. Involved in ROW1 Inc litigation (2023).",
    riskLevel: "high",
  },
  {
    id: "philipp-vitti",
    name: "Philipp R. Vitti",
    title: "Chief Science Officer and Co-Owner",
    companyName: "Vitti Labs",
    background: "Co-founder and CSO of Vitti Labs. AATB accredited tissue bank.",
    regulatoryHistory:
      "Received FDA warning letter (July 2022) for products failing minimal manipulation and homologous use criteria. Filed litigation against FDA (January 2025) challenging minimal manipulation classification.",
    litigationHistory:
      "Plaintiff in Vitti Labs v. Platinum Biologics (2024) for defamation and unfair competition. Plaintiff in Vitti Labs v. FDA (2025) challenging regulatory classification.",
    riskLevel: "medium",
  },
  {
    id: "christopher-bartalos",
    name: "Christopher Bartalos DO",
    title: "Medical Director and Co-Owner",
    companyName: "Vitti Labs",
    background: "Medical director and co-owner of Vitti Labs.",
    regulatoryHistory:
      "Associated with Vitti Labs which received FDA warning letter (July 2022) for regulatory violations.",
    litigationHistory:
      "Plaintiff in Vitti Labs v. Platinum Biologics (2024) for defamation and unfair competition.",
    riskLevel: "medium",
  },
];

export const getMeetingsByCompany = (companyName: string): LitigationRecord[] => {
  return litigationRecords.filter((record) => record.companyName === companyName);
};

export const getInspectionsByCompany = (companyName: string): InspectionRecord[] => {
  return inspectionRecords.filter((record) => record.companyName === companyName);
};

export const getExecutiveByName = (name: string): ExecutiveBackground | undefined => {
  return executiveBackgrounds.find((exec) => exec.name === name);
};
