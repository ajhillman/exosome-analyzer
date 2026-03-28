export interface ExosomeCompany {
  id: string;
  name: string;
  section: "351(a)" | "361" | "351(a) (Investigational)" | "361 (FDA disputes)" | "361 (Cosmetic)";
  manufacturing: "cGMP" | "GMP" | "GMP (Cited for violations)" | "GMP (FDA cited cGMP deviations)";
  fda_status: "No Warning Letters" | "Warning Letter (Sept 2023)" | "Warning Letter (Jan 2025)" | "Warning Letter (Sept 2025)";
  coa: "Yes (Batch-by-batch)" | "Yes (Internal)" | "Yes" | "No/Unclear";
  source: string;
  dmf: "Yes" | "Yes (IND for ExoFlo)" | "Yes (IND for Zofin)" | "No" | "No (In process for IND)";
  notes: string;
  hasWarningLetter: boolean;
  regulatoryScore: number;
}

export interface FilterState {
  section: string[];
  manufacturing: string[];
  fda_status: string[];
  coa: string[];
  dmf: string[];
  searchTerm: string;
}

export interface ComparisonMetrics {
  totalCompanies: number;
  compliantCompanies: number;
  warningLetterCount: number;
  averageRegulatoryScore: number;
}
