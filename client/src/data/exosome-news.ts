export interface ExosomeArticle {
  title: string;
  source: string;
  date: string;
  summary: string;
  url: string;
  category: "Partnership" | "Clinical" | "Industry" | "Regulatory" | "Cosmeceutical" | "Manufacturing" | "Research";
}

export const exosomeArticles: ExosomeArticle[] = [
  {
    title: "RoosterBio and MineBio Partner for MSC/Exosome Bioprocessing in China",
    source: "BioInformant",
    date: "2026-04-08",
    summary: "RoosterBio partners with MineBio to advance MSC and exosome bioprocessing capabilities in the Chinese market, expanding global manufacturing capacity.",
    url: "https://bioinformant.com/roosterbio-and-minebio/",
    category: "Partnership",
  },
  {
    title: "EXO 001 Exosome Platform: In Vivo Multi-Target CAR-T for Solid Tumors",
    source: "BioInformant",
    date: "2026-02-15",
    summary: "Novel exosome-based platform enabling in vivo generation of multi-target CAR-T cells for solid tumor treatment without ex vivo cell manufacturing.",
    url: "https://bioinformant.com/exo-001-exosome-platform/",
    category: "Clinical",
  },
  {
    title: "Exosomes: Company Spotlights A-Z (26,805 Articles, 301 Clinical Trials)",
    source: "BioInformant",
    date: "2026-01-20",
    summary: "Comprehensive directory of exosome companies worldwide. The exosome field now spans 26,805 published articles and 301 registered clinical trials.",
    url: "https://bioinformant.com/category/exosomes/",
    category: "Industry",
  },
  {
    title: "Kexing Biopharm UC-MSC Exosomes Registered with FDA DMF",
    source: "BioInformant",
    date: "2025-09-16",
    summary: "Kexing Biopharm announces successful Type II Drug Master File registration with the U.S. FDA for Human Umbilical Cord MSC-Derived Exosomes.",
    url: "https://bioinformant.com/kexing-biopharm-fda-dmf/",
    category: "Regulatory",
  },
  {
    title: "The Rise of Exosome-Based Cosmeceuticals in 2026",
    source: "BioInformant",
    date: "2025-10-22",
    summary: "Exosomes are being utilized within the global cosmetics industry for skincare products that enhance skin health, scar improvement, hair regrowth, and anti-aging effects.",
    url: "https://bioinformant.com/exosome-cosmeceuticals/",
    category: "Cosmeceutical",
  },
  {
    title: "The Emerging Role of Exosome Therapeutics in 2026",
    source: "BioInformant",
    date: "2025-11-10",
    summary: "Exosomes carry cell-specific cargos of proteins, lipids, and nucleic acids selectively taken up by recipient cells. Pharmaceutical industry focusing on drug-loaded exosomes.",
    url: "https://bioinformant.com/exosome-therapeutics/",
    category: "Research",
  },
  {
    title: "Demand for Exosome Technologies Drives Billion Dollar Price Tags",
    source: "BioInformant",
    date: "2025-08-15",
    summary: "Industry partnerships and acquisitions in the exosome space are commanding billion-dollar valuations as therapeutic and diagnostic applications expand.",
    url: "https://bioinformant.com/exosome-technologies-billion-dollar/",
    category: "Industry",
  },
  {
    title: "Esco Aster and Shine-On Biomedical: cGMP Exosome Manufacturing",
    source: "BioInformant",
    date: "2025-12-05",
    summary: "Esco Aster partners with Shine-On Biomedical for cGMP exosome manufacturing. FDA IND cleared Q1 2025 for their exosome product.",
    url: "https://bioinformant.com/esco-aster-shine-on/",
    category: "Manufacturing",
  },
  {
    title: "An Introduction to Exosome Therapy And Its Costs",
    source: "BioInformant",
    date: "2025-11-06",
    summary: "Comprehensive overview of exosome therapy, its regenerative capabilities, and current cost structures across different treatment modalities.",
    url: "https://bioinformant.com/exosome-therapy-costs/",
    category: "Industry",
  },
];

export const therapyCosts = {
  title: "Stem Cell and Exosome Therapy Cost Guide (2026)",
  source: "BioInformant",
  sourceUrl: "https://bioinformant.com/cost-of-stem-cell-therapy/",
  categories: [
    {
      name: "Simple Procedures (PRP, Platelet-Rich Plasma)",
      range: "$500 - $2,000 per treatment",
      notes: "Blood-drawn, minimal processing. Typically for joint pain, tendon injuries.",
    },
    {
      name: "Bone Marrow / Adipose Stem Cell Extraction",
      range: "$15,000 - $30,000 per treatment",
      notes: "Requires surgical extraction. Used for orthopedic, neurological, and autoimmune conditions.",
    },
    {
      name: "Exosome IV Infusion (Domestic US)",
      range: "$5,000 - $15,000 per session",
      notes: "Pricing varies by provider, source material, and dosing protocol. Not FDA-approved for most indications.",
    },
    {
      name: "Complex Systemic Treatments (MS, Alzheimer's, Parkinson's)",
      range: "$20,000 - $100,000+",
      notes: "Multi-session protocols. Often requires travel to specialized centers.",
    },
    {
      name: "Medical Tourism: Panama (Stem Cell Institute)",
      range: "$10,000 - $30,000",
      notes: "Established medical tourism destination. Includes treatment, monitoring, and follow-up.",
    },
    {
      name: "Medical Tourism: Cayman Islands (Regenexx)",
      range: "$5,000 - $8,000 per treatment",
      notes: "Regenexx operates offshore facility for procedures not available in the US.",
    },
    {
      name: "Medical Tourism: Mexico (Celltex, others)",
      range: "$3,000 - $15,000",
      notes: "Growing market. Variable quality and regulatory oversight.",
    },
  ],
  keyFacts: [
    "Most stem cell and exosome treatments are out-of-pocket, not covered by insurance.",
    "FDA has approved only a limited number of stem cell products (primarily for blood disorders).",
    "Exosome products marketed as 361 HCT/P tissue products have no FDA approval for therapeutic claims.",
    "DynaCord operates under 351(a) as a drug, the highest regulatory pathway for exosome products.",
    "Patients should verify the manufacturer's FDA registration status, cGMP compliance, and third-party testing before treatment.",
  ],
};
