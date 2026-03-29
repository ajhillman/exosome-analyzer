export interface LitigationCase {
  case_name: string;
  case_number?: string;
  filed_date?: string;
  court?: string;
  allegations?: string[];
  status?: "Ongoing" | "Settled" | "Dismissed" | "Won" | "Lost";
  parties?: string[];
}

export interface FDAWarning {
  warning_letter_date?: string;
  warning_letter_number?: string;
  violations?: string[];
  products_cited?: string[];
  directed_to?: "Company" | "Physicians" | "Both";
}

export interface NegativePressArticle {
  title: string;
  source: string;
  date?: string;
  url?: string;
  summary?: string;
  category?: "FDA Enforcement" | "Litigation" | "Scientific Criticism" | "Media Coverage" | "Leadership Issues";
}

export interface LeadershipMember {
  name: string;
  title?: string;
  background?: string;
  regulatory_history?: string;
  litigation_involved?: boolean;
  pedigree_level?: "High" | "Medium" | "Low";
}

export interface ExosomeCompany {
  id: string;
  name: string;
  section: "351(a)" | "361" | "351(a) (Investigational)" | "361 (FDA disputes)" | "361 (Cosmetic)" | "Autologous (Practice of Medicine)";
  manufacturing: "cGMP" | "cGMP (TRUE - Current, Verified, Documented)" | "GMP" | "GMP (Cited for violations)" | "GMP (FDA cited cGMP deviations)" | "GMP (with cGMP deviations)" | "GMP (Non-Compliant)" | "Point-of-Care Processing";
  fda_status: "No Warning Letters" | "Warning Letter (Sept 2023)" | "Warning Letter (Jan 2025)" | "Warning Letter (Sept 2025)" | "Warning Letter (July 2022)" | "Warning Letter (Aug 2025)" | "No Warning Letters (Settled FDA litigation)";
  coa: "Yes (Batch-by-batch)" | "Yes (Internal)" | "Yes" | "No/Unclear" | "Yes (Patient-specific)";
  source: string;
  dmf: "Yes" | "Yes (IND for ExoFlo)" | "Yes (IND for Zofin)" | "No" | "No (In process for IND)" | "Yes (EA-IND for TBI)" | "N/A (Autologous approach)";
  notes: string;
  hasWarningLetter: boolean;
  regulatoryScore: number;
  // Manufacturing Details
  iso_cleanroom?: "ISO 5" | "ISO 6" | "ISO 7" | "ISO 8" | "N/A (Point-of-Care)" | "Unknown";
  storage_method?: "Cryogenic (-80°C)" | "Lyophilized" | "Refrigerated (4°C)" | "N/A (Autologous)" | "Unknown";
  container_type?: "Glass Vials" | "Plastic Vials" | "Cryogenic Bags" | "Mixed" | "N/A (Autologous)" | "Unknown";
  facility_owned?: boolean;
  facility_location?: string;
  third_party_testing?: "Eurofins" | "Eurofins BioPharma (Independent)" | "Zen Bio" | "Other" | "Internal Only" | "Internal" | "N/A (Patient-Specific)" | "Unknown";
  post_thaw_viability?: string;
  mesenchymal_source_detail?: string;
  leadership_experience?: "High" | "Medium" | "Low" | "Unknown";
  insurance_coverage?: boolean;
  delivery_methods?: string[];
  legal_status?: "FDA-Approved" | "IND Active" | "361 Compliant" | "Disputed" | "Illegal" | "Practice of Medicine Exemption" | "Unknown";
  // Company History
  founded_year?: number;
  company_age?: number;
  website?: string;
  facility_type?: "Drug Manufacturing Facility" | "Tissue Bank" | "Point-of-Care Network";
  company_location?: string;
  // Regulatory Timeline
  ind_irb_filed_date?: string;
  ind_irb_status?: string;
  pre_ind_pathways?: number;
  dmf_number?: string;
  dmf_type?: string;
  // Litigation
  litigation_cases?: LitigationCase[];
  litigation_count?: number;
  // FDA Warnings to Physicians
  fda_warnings_to_physicians?: FDAWarning[];
  // Leadership
  leadership_team?: LeadershipMember[];
  genuine_pedigree_count?: number;
  // Company Logo
  company_logo_url?: string;
  // FDA Compliance Rating
  fda_compliance_rating?: "Gold" | "Silver" | "Bronze" | "Red" | "Yellow";
  fda_compliance_description?: string;
  // Patents
  patents?: string[];
  // Negative Press
  negative_press_articles?: NegativePressArticle[];
  negative_press_count?: number;
  // Company Details
  years_in_business?: number;
  american_owned_operated?: boolean;
  company_grade?: "A+" | "A" | "B" | "C" | "D" | "F";
  regulatory_risk_level?: "Lowest" | "Low" | "Moderate" | "High" | "Extreme";
  regulatory_classification?: string;
  dmf_received_date?: string;
  mesenchymal_viability_rank?: string;
}

export interface FilterState {
  section: string[];
  manufacturing: string[];
  fda_status: string[];
  coa: string[];
  dmf: string[];
  iso_cleanroom?: string[];
  storage_method?: string[];
  third_party_testing?: string[];
  searchTerm: string;
}

export interface ComparisonMetrics {
  totalCompanies: number;
  compliantCompanies: number;
  warningLetterCount: number;
  averageRegulatoryScore: number;
}
