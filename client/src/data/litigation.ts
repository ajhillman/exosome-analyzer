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
  {
    id: "liveyon-criminal",
    companyName: "Liveyon / Genetech",
    caseNumber: "8:23-cr-00150",
    jurisdiction: "U.S. District Court, Central District of California",
    filingDate: "2023-01-01",
    plaintiff: "United States of America",
    defendant: "John Warrington Kosolcharoen (Liveyon CEO)",
    allegations: ["Introducing unapproved new drug into interstate commerce", "Felony FDA violation"],
    status: "Convicted. Sentenced to 3 years federal prison (Sep 2024). FDA permanently debarred (Mar 2025).",
    notes: "Liveyon CEO pleaded guilty to felony charge. Company generated $21.6M in revenue from contaminated umbilical cord blood products. CDC identified 20+ patients sickened by bacterially contaminated products.",
  },
  {
    id: "liveyon-cdc",
    companyName: "Liveyon / Genetech",
    caseNumber: "MMWR 67(50)",
    jurisdiction: "CDC / FDA Joint Investigation",
    filingDate: "2018-12-01",
    plaintiff: "CDC / FDA",
    defendant: "Liveyon / Genetech Inc.",
    allegations: ["Product contamination", "Public safety violation"],
    status: "Voluntary recall executed. Multiple hospitalizations.",
    notes: "CDC identified 13+ patients hospitalized with bacterial infections (E. coli and other pathogens) after receiving Liveyon umbilical cord blood treatments. Nationwide recall December 2018.",
  },
  {
    id: "regenexx-fda",
    companyName: "Regenexx",
    caseNumber: "1:2010cv01327",
    jurisdiction: "U.S. District Court, District of Columbia",
    filingDate: "2010-08-06",
    plaintiff: "United States of America (FDA)",
    defendant: "Regenerative Sciences, LLC",
    allegations: ["Marketing unapproved biological product", "Violation of Section 351 PHS Act"],
    status: "FDA prevailed. Summary judgment for FDA (Jul 2012). Affirmed on appeal (Feb 2014).",
    notes: "Landmark case. FDA sued Regenerative Sciences (Regenexx) for marketing autologous stem cell procedure as unapproved biological product. Court ruled FDA has jurisdiction to regulate autologous cell products under 351 of PHS Act.",
  },
  {
    id: "regenexx-appeal",
    companyName: "Regenexx",
    caseNumber: "12-5254",
    jurisdiction: "U.S. Court of Appeals, D.C. Circuit",
    filingDate: "2012-01-01",
    plaintiff: "Regenerative Sciences, LLC",
    defendant: "FDA",
    allegations: ["Challenge to FDA jurisdiction over autologous stem cell products"],
    status: "Appeal denied. FDA jurisdiction upheld (Feb 2014).",
    notes: "D.C. Circuit affirmed district court ruling. Held that Regenexx procedure produces a biological product subject to FDA regulation under Section 351 of PHS Act.",
  },
  {
    id: "direct-bio-mcqueen",
    companyName: "Direct Biologics",
    caseNumber: "22-50442",
    jurisdiction: "U.S. Court of Appeals, Fifth Circuit",
    filingDate: "2022-01-01",
    plaintiff: "Direct Biologics, LLC",
    defendant: "Adam McQueen",
    allegations: ["Breach of non-compete covenant", "Misappropriation of trade secrets"],
    status: "Affirmed in part, reversed in part (Apr 2023)",
    notes: "Direct Biologics sued former employee for breach of non-compete and misappropriation of trade secrets related to ExoFlo exosome product. Fifth Circuit ruled on specificity requirements for trade secret identification.",
  },
  {
    id: "kimera-exocel",
    companyName: "Kimera Labs",
    caseNumber: "3:2021cv02137",
    jurisdiction: "U.S. District Court, Southern District of California",
    filingDate: "2021-12-01",
    plaintiff: "Kimera Labs Inc",
    defendant: "Exocel Bio Inc, Jayashankar",
    allegations: ["Theft of trade secrets", "Misappropriation of proprietary exosome manufacturing processes"],
    status: "Ongoing proceedings through 2024",
    notes: "Kimera Labs sued Exocel Bio Inc and its CEO for alleged theft of trade secrets related to exosome and conditioned medium production processes.",
  },
  {
    id: "kimera-exocel-fl",
    companyName: "Kimera Labs",
    caseNumber: "Not specified",
    jurisdiction: "U.S. District Court, Southern District of Florida",
    filingDate: "2024-01-01",
    plaintiff: "Kimera Labs Inc",
    defendant: "Exocel Bio Inc",
    allegations: ["Trade secret theft", "Misappropriation"],
    status: "Active",
    notes: "Continuation of trade secrets litigation against Exocel Bio and former employees in Florida.",
  },
  {
    id: "organicell-sec",
    companyName: "Organicell",
    caseNumber: "SEC Investigation (2021)",
    jurisdiction: "U.S. Securities and Exchange Commission",
    filingDate: "2021-07-01",
    plaintiff: "SEC",
    defendant: "Organicell Regenerative Medicine, Inc.",
    allegations: ["Securities fraud", "Potential violations during COVID-era marketing"],
    status: "Under investigation. Company stated it intends to fully cooperate.",
    notes: "SEC opened investigation into Organicell, a Miami biotech developing COVID-19 treatments using exosomes. Investigation focused on potential securities violations during COVID-era marketing claims.",
  },
  {
    id: "organicell-yourke",
    companyName: "Organicell",
    caseNumber: "2:2022cv11589",
    jurisdiction: "U.S. District Court, Eastern District of Michigan",
    filingDate: "2022-07-13",
    plaintiff: "Tracy Yourke",
    defendant: "Organicell Regenerative Medicine, Inc.",
    allegations: ["Civil lawsuit"],
    status: "Filed Jul 2022",
    notes: "Civil lawsuit filed against Organicell in Michigan federal court.",
  },
  {
    id: "organicell-lae",
    companyName: "Organicell",
    caseNumber: "Not specified",
    jurisdiction: "State Court",
    filingDate: "2021-01-01",
    plaintiff: "LAE",
    defendant: "Organicell Regenerative Medicine, Albert Mitrani, Mari Mitrani, Ian Bothwell",
    allegations: ["Breach of contract"],
    status: "Settled April 2022. Company paid $45,000 cash plus shares.",
    notes: "LAE alleged breach of contract. Settled with $45,000 cash payment and issuance of company shares.",
  },
  {
    id: "biostem-protectus",
    companyName: "BioStem Life Sciences",
    caseNumber: "2:2022cv01024",
    jurisdiction: "U.S. District Court, District of Nevada",
    filingDate: "2022-06-28",
    plaintiff: "Biostem Technologies, Inc",
    defendant: "Protectus Technologies LLC et al",
    allegations: ["Intellectual property dispute", "Trade secrets"],
    status: "Filed Jun 2022",
    notes: "BioStem Technologies sued Protectus Technologies in Nevada federal court. Assigned to Judge Jennifer A. Dorsey.",
  },
  {
    id: "biostem-klein",
    companyName: "BioStem Life Sciences",
    caseNumber: "Not specified",
    jurisdiction: "State Court, Florida",
    filingDate: "2022-01-01",
    plaintiff: "Biostem Technologies Inc",
    defendant: "Laura Klein et al",
    allegations: ["Trade secret misappropriation", "Emergency injunction"],
    status: "Emergency motion for temporary injunction filed",
    notes: "BioStem filed emergency motion for temporary restraining order against Laura Klein and related parties.",
  },
  {
    id: "predictive-surgenex",
    companyName: "Predictive Biotech",
    caseNumber: "2:19-cv-00295",
    jurisdiction: "U.S. District Court, District of Utah",
    filingDate: "2019-01-01",
    plaintiff: "Surgenex et al",
    defendant: "Predictive Therapeutics et al",
    allegations: ["Breach of contract"],
    status: "Filed 2019",
    notes: "Contract dispute between Surgenex and Predictive Therapeutics/Predictive Biotech in Utah federal court.",
  },
  {
    id: "predictive-auxocell",
    companyName: "Predictive Biotech",
    caseNumber: "2:20-cv-00183",
    jurisdiction: "U.S. District Court, District of Utah",
    filingDate: "2020-03-18",
    plaintiff: "Predictive Biotech",
    defendant: "Auxocell Laboratories",
    allegations: ["Civil lawsuit"],
    status: "Filed Mar 2020",
    notes: "Predictive Biotech filed suit against Auxocell Laboratories. Assigned to Judge Bruce S. Jenkins.",
  },
  {
    id: "predictive-bankruptcy",
    companyName: "Predictive Biotech",
    caseNumber: "23-25147",
    jurisdiction: "U.S. Bankruptcy Court, District of Utah",
    filingDate: "2023-01-01",
    plaintiff: "Predictive Technology Group Inc.",
    defendant: "N/A (Voluntary Petition)",
    allegations: ["Bankruptcy filing"],
    status: "Bankruptcy petition filed",
    notes: "Parent company Predictive Technology Group Inc. filed for bankruptcy. Prior lawsuit by RTJ LLC referenced in filings.",
  },
  {
    id: "capricor-securities",
    companyName: "Capricor Therapeutics",
    caseNumber: "Pending",
    jurisdiction: "U.S. District Court (pending lead plaintiff)",
    filingDate: "2025-07-01",
    plaintiff: "Class of investors",
    defendant: "Capricor Therapeutics, Inc. (NASDAQ: CAPR)",
    allegations: ["Securities fraud", "Concealing battery line deficiencies", "Misleading investor statements"],
    status: "Active. Lead plaintiff deadline September 15, 2025.",
    notes: "Securities fraud class action. Complaint alleges company concealed battery line deficiencies and made misleading statements between October 9, 2024 and July 10, 2025. Multiple law firms pursuing class certification.",
  },
  {
    id: "united-liquidia",
    companyName: "United Therapeutics",
    caseNumber: "Multiple",
    jurisdiction: "North Carolina Business Court / Federal Court",
    filingDate: "2020-06-01",
    plaintiff: "United Therapeutics Corp.",
    defendant: "Liquidia Technologies, Inc.",
    allegations: ["Patent infringement (U.S. Patent No. 10,716,793)"],
    status: "Ongoing through 2025",
    notes: "Multi-year patent litigation over treprostinil inhalation product (Yutrepia) competing with United Therapeutics' Tyvaso.",
  },
  {
    id: "united-espinosa",
    companyName: "United Therapeutics",
    caseNumber: "Not specified",
    jurisdiction: "Federal Court",
    filingDate: "2026-04-01",
    plaintiff: "United Therapeutics Corp.",
    defendant: "Espinosa et al",
    allegations: ["Challenge to 340B Drug Pricing Program enforcement"],
    status: "Filed Apr 2026",
    notes: "United Therapeutics challenged agency enforcement actions requiring drug manufacturers to offer discounted prescription drugs under 340B Drug Pricing Program.",
  },
  {
    id: "creative-med-employee",
    companyName: "Creative Medical Technology Holdings",
    caseNumber: "Not specified",
    jurisdiction: "Not specified",
    filingDate: "2022-12-01",
    plaintiff: "Former employee",
    defendant: "Creative Medical Technology Holdings, Inc.",
    allegations: ["Breach of contract", "Wrongful termination"],
    status: "Filed Dec 2022",
    notes: "Former employee brought claims for breach of contract, wrongful termination, and related causes of action following termination.",
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
    id: "chris-centeno",
    name: "Dr. Christopher J. Centeno, MD",
    title: "Co-Founder and Medical Director",
    companyName: "Regenexx",
    background: "Pioneered interventional orthopedics in 2005 with Dr. John Schultz. Physician specializing in pain management and orthopedic regenerative medicine. Completed IRB-approved research studies on stem cell therapies for orthopedic injuries.",
    regulatoryHistory:
      "Defendant in United States v. Regenerative Sciences LLC (2010-2014). FDA challenged Regenexx Procedure as unapproved drug. Court upheld FDA authority to regulate cultured stem cell products. Successfully adapted business model post-litigation to autologous approach. No recent FDA enforcement actions. Explicitly avoids exosome products.",
    litigationHistory:
      "Major FDA litigation (2010-2014) challenging FDA jurisdiction over autologous stem cell use. DC Circuit Court upheld FDA authority (2014). Centeno argued physicians have right to use stem cells for healing but lost on regulatory grounds.",
    riskLevel: "low",
  },
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
