import { ExosomeCompany } from "@/types";

export const companiesData: ExosomeCompany[] = [
  {
    id: "dynacord",
    name: "DynaCord",
    section: "351(a)",
    manufacturing: "cGMP",
    fda_status: "No Warning Letters",
    coa: "Yes (Batch-by-batch)",
    source: "Mesenchymal Exosomes from Wharton's Jelly Umbilical Cord",
    dmf: "Yes",
    notes: "Marketed as the only company registered under 351(a) with batch-by-batch COA and $20M liability insurance.",
    hasWarningLetter: false,
    regulatoryScore: 95,
  },
  {
    id: "kimera-labs",
    name: "Kimera Labs",
    section: "361 (FDA disputes)",
    manufacturing: "GMP (FDA cited cGMP deviations)",
    fda_status: "Warning Letter (Sept 2023)",
    coa: "Yes (Internal)",
    source: "Placental/Amniotic/Umbilical",
    dmf: "No (In process for IND)",
    notes: "FDA warning letter cited unapproved drug status and cGMP violations for XoGlo products.",
    hasWarningLetter: true,
    regulatoryScore: 45,
  },
  {
    id: "direct-biologics",
    name: "Direct Biologics",
    section: "351(a) (Investigational)",
    manufacturing: "cGMP",
    fda_status: "No Warning Letters",
    coa: "Yes",
    source: "Bone Marrow MSCs",
    dmf: "Yes (IND for ExoFlo)",
    notes: "ExoFlo is in Phase 3 clinical trials for ARDS; regulated as a biologic drug under IND.",
    hasWarningLetter: false,
    regulatoryScore: 88,
  },
  {
    id: "organicell",
    name: "Organicell",
    section: "351(a) (Investigational)",
    manufacturing: "cGMP",
    fda_status: "No Warning Letters",
    coa: "Yes",
    source: "Amniotic Fluid",
    dmf: "Yes (IND for Zofin)",
    notes: "Zofin is an investigational drug for various inflammatory conditions.",
    hasWarningLetter: false,
    regulatoryScore: 85,
  },
  {
    id: "chara-biologics",
    name: "Chara Biologics",
    section: "361 (FDA disputes)",
    manufacturing: "GMP (Cited for violations)",
    fda_status: "Warning Letter (Jan 2025)",
    coa: "No/Unclear",
    source: "Umbilical Cord",
    dmf: "No",
    notes: "FDA warning letter for marketing unapproved drugs and manufacturing violations.",
    hasWarningLetter: true,
    regulatoryScore: 25,
  },
  {
    id: "new-life-medical",
    name: "New Life Medical Services",
    section: "361 (FDA disputes)",
    manufacturing: "GMP (Cited for violations)",
    fda_status: "Warning Letter (Sept 2025)",
    coa: "No/Unclear",
    source: "Umbilical Cord/Wharton's Jelly",
    dmf: "No",
    notes: "FDA warning letter for unapproved drug products.",
    hasWarningLetter: true,
    regulatoryScore: 20,
  },
  {
    id: "exocobio",
    name: "ExoCoBio",
    section: "361 (Cosmetic)",
    manufacturing: "GMP",
    fda_status: "No Warning Letters",
    coa: "Yes",
    source: "Stem Cell Derived",
    dmf: "No",
    notes: "Focuses on cosmetic applications (ASCE+), generally compliant with 361 for topical use.",
    hasWarningLetter: false,
    regulatoryScore: 72,
  },
];

export const getCompanyById = (id: string): ExosomeCompany | undefined => {
  return companiesData.find((company) => company.id === id);
};

export const filterCompanies = (
  companies: ExosomeCompany[],
  filters: {
    section?: string[];
    manufacturing?: string[];
    fda_status?: string[];
    coa?: string[];
    dmf?: string[];
    searchTerm?: string;
  }
): ExosomeCompany[] => {
  return companies.filter((company) => {
    if (filters.section && filters.section.length > 0 && !filters.section.includes(company.section)) {
      return false;
    }
    if (filters.manufacturing && filters.manufacturing.length > 0 && !filters.manufacturing.includes(company.manufacturing)) {
      return false;
    }
    if (filters.fda_status && filters.fda_status.length > 0 && !filters.fda_status.includes(company.fda_status)) {
      return false;
    }
    if (filters.coa && filters.coa.length > 0 && !filters.coa.includes(company.coa)) {
      return false;
    }
    if (filters.dmf && filters.dmf.length > 0 && !filters.dmf.includes(company.dmf)) {
      return false;
    }
    if (filters.searchTerm && filters.searchTerm.length > 0) {
      const term = filters.searchTerm.toLowerCase();
      return (
        company.name.toLowerCase().includes(term) ||
        company.source.toLowerCase().includes(term) ||
        company.notes.toLowerCase().includes(term)
      );
    }
    return true;
  });
};
