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
    notes: "GOLD STANDARD: Only company registered under 351(a) with batch-by-batch COA from Eurofins. $20M CNA liability insurance. Partners with leading U.S. medical research institutions. ISO 5 cGMP manufacturing. Cryogenic storage in glass vials. Post-thaw viability 95-97%. 13 pre-IND pathways. Academic partnerships with LSU School of Medicine.",
    hasWarningLetter: false,
    regulatoryScore: 95,
    founded_year: 2015,
    company_age: 11,
    website: "dynacord.com, dyna-cord.com",
    facility_type: "Drug Manufacturing Facility",
    company_location: "United States",
    iso_cleanroom: "ISO 5",
    storage_method: "Cryogenic (-80°C)",
    container_type: "Glass Vials",
    facility_owned: true,
    facility_location: "United States (Company-Owned Facility)",
    third_party_testing: "Eurofins BioPharma (Independent)",
    post_thaw_viability: "95-97% (Third-Party Validated)",
    mesenchymal_source_detail: "Wharton's Jelly from Umbilical Cord - Donor-Screened for Communicable Diseases, Batch-Traceable, Low-Passage MSCs",
    leadership_experience: "High",
    insurance_coverage: true,
    delivery_methods: ["IV Infusion", "Intra-Articular", "Intrathecal"],
    legal_status: "IND Active",
    pre_ind_pathways: 13,
    dmf_type: "Type II Master File",
    dmf_number: "Acknowledged by FDA",
    litigation_count: 0,
    genuine_pedigree_count: 3,
    fda_compliance_rating: "Gold",
    fda_compliance_description: "CBER-Registered 351(a) drug product with active IND pathways. Meets all cGMP requirements. Batch-by-batch third-party testing. FDA-compliant manufacturing facility.",
    patents: [
      "US20240180831A1 - Exosome systems, products and methods (Inventors: Babak Ghalili, Keyon Janani, Peter Scherp, John Borja)",
      "US20220362306 - Compositions and methods for delivering exosomes using preservative systems",
      "Priority applications: US18/438,944, US19/066,279, US19/196,805"
    ],
    leadership_team: [
      {
        name: "Keyon Janani",
        title: "Chief Executive Officer, Co-Founder",
        background: "CEO and co-founder of DynaCord",
        pedigree_level: "High",
      },
      {
        name: "Peter Scherp, Ph.D.",
        title: "Chief Scientific Officer, Co-Founder",
        background: "Co-founder with Keyon Janani. Patent inventor on exosome systems and compositions.",
        pedigree_level: "High",
      },
      {
        name: "Dr. Lucio Miele, M.D., Ph.D.",
        title: "Independent Regulatory Consultant",
        background: "Professor & Department Head, Department of Genetics, LSU Health School of Medicine. Director for Inter-Institutional Programs, LSU Stanley Scott Cancer Center. Published researcher in cancer biology and translational science. Assistant Dean for Translational Science.",
        regulatory_history: "Academic regulatory expertise from leading medical school",
        pedigree_level: "High",
      },
    ],
    negative_press_count: 0,
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
    notes: "ExoFlo in Phase 3 clinical trials for ARDS. cGMP manufacturing with rigorous quality controls. Active FDA engagement through IND pathway. Strong regulatory compliance record.",
    hasWarningLetter: false,
    regulatoryScore: 88,
    founded_year: 2017,
    company_age: 9,
    website: "directbiologics.com",
    facility_type: "Drug Manufacturing Facility",
    company_location: "Austin, Texas",
    iso_cleanroom: "ISO 5",
    storage_method: "Cryogenic (-80°C)",
    container_type: "Glass Vials",
    facility_owned: true,
    facility_location: "United States",
    third_party_testing: "Zen Bio",
    post_thaw_viability: "95%+",
    mesenchymal_source_detail: "Bone Marrow-Derived MSCs, Donor-Screened",
    leadership_experience: "High",
    insurance_coverage: true,
    delivery_methods: ["IV Infusion"],
    legal_status: "IND Active",
    ind_irb_status: "Phase 3 Clinical Trials",
    litigation_count: 1,
    genuine_pedigree_count: 2,
    fda_compliance_rating: "Yellow",
    fda_compliance_description: "Investigational status. Active IND with Phase 3 trials. No FDA approval yet. Cannot achieve drug status as 361 or 351(a) investigational.",
    negative_press_articles: [
      {
        title: "Direct Biologics v. McQueen - Trade Secret Misappropriation Lawsuit",
        source: "U.S. Court of Appeals, Fifth Circuit",
        date: "2023-04-03",
        category: "Litigation",
        summary: "Direct Biologics filed suit against former employee Adam McQueen and competitor Vivex for breach of non-compete and misappropriation of trade secrets. Fifth Circuit Court involved in dispute."
      },
      {
        title: "Fifth Circuit Vacates Order in Trade Secret Dispute",
        source: "National Law Review",
        date: "2023-04-26",
        category: "Litigation",
        summary: "Federal appellate court vacated order denying injunction in biotechnology trade secret dispute involving Direct Biologics and former employee."
      }
    ],
    negative_press_count: 2,
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
    notes: "Zofin investigational drug for inflammatory conditions. cGMP manufacturing with active FDA IND engagement. Strong regulatory compliance and clinical development pathway.",
    hasWarningLetter: false,
    regulatoryScore: 85,
    founded_year: 2016,
    company_age: 10,
    website: "organicell.com",
    facility_type: "Drug Manufacturing Facility",
    company_location: "United States",
    iso_cleanroom: "ISO 5",
    storage_method: "Cryogenic (-80°C)",
    container_type: "Glass Vials",
    facility_owned: true,
    facility_location: "United States",
    third_party_testing: "Zen Bio",
    post_thaw_viability: "94%+",
    mesenchymal_source_detail: "Amniotic Fluid-Derived MSCs, Non-Invasive Collection",
    leadership_experience: "High",
    insurance_coverage: true,
    delivery_methods: ["IV Infusion", "Intra-Articular"],
    legal_status: "IND Active",
    ind_irb_status: "Active IND for Long COVID and COPD",
    litigation_count: 0,
    genuine_pedigree_count: 2,
    fda_compliance_rating: "Yellow",
    fda_compliance_description: "Investigational status. Active IND with clinical trials for Long COVID and COPD. No FDA approval yet. Cannot achieve drug status as 361 or 351(a) investigational.",
    negative_press_count: 0,
  },
  {
    id: "exoqure",
    name: "Exoqure",
    section: "361 (Cosmetic)",
    manufacturing: "GMP",
    fda_status: "No Warning Letters",
    coa: "Yes",
    source: "Wharton's Jelly MSCs from Umbilical Cord",
    dmf: "Yes (EA-IND for TBI)",
    notes: "GMP manufactured in ISO 5 facility, compliant with FDA 21 CFR 1271 & ISO 13485. Low-passage UC-MSCs. EA-IND approval for Traumatic Brain Injury indicates investigational pathway.",
    hasWarningLetter: false,
    regulatoryScore: 68,
    founded_year: 2017,
    company_age: 9,
    website: "exoqure.com",
    facility_type: "Drug Manufacturing Facility",
    company_location: "United States",
    iso_cleanroom: "ISO 5",
    storage_method: "Cryogenic (-80°C)",
    container_type: "Glass Vials",
    facility_owned: true,
    facility_location: "United States",
    third_party_testing: "Zen Bio",
    post_thaw_viability: "95%+",
    mesenchymal_source_detail: "Wharton's Jelly from Umbilical Cord, Low-Passage MSCs, Donor-Screened",
    leadership_experience: "High",
    insurance_coverage: true,
    delivery_methods: ["IV Infusion", "Intranasal"],
    legal_status: "IND Active",
    ind_irb_status: "EA-IND for TBI",
    litigation_count: 0,
    genuine_pedigree_count: 2,
    fda_compliance_rating: "Yellow",
    fda_compliance_description: "Investigational status with EA-IND for Traumatic Brain Injury. GMP manufacturing. Cannot achieve drug status as 361 or 351(a) investigational.",
    negative_press_count: 0,
  },
  {
    id: "regenexx",
    name: "Regenexx",
    section: "Autologous (Practice of Medicine)",
    manufacturing: "Point-of-Care Processing",
    fda_status: "No Warning Letters (Settled FDA litigation)",
    coa: "Yes (Patient-specific)",
    source: "Bone Marrow Concentrate (Autologous MSCs)",
    dmf: "N/A (Autologous approach)",
    notes: "Founded 2005 by Dr. Chris Centeno and Dr. John Schultz. Pioneered interventional orthopedics. Successfully adapted business model post-FDA litigation (2010-2014). Over 100 licensed physician network locations. Explicitly does NOT use exosome products. Research-based with published clinical trials.",
    hasWarningLetter: false,
    regulatoryScore: 82,
    founded_year: 2005,
    company_age: 21,
    website: "regenexx.com",
    facility_type: "Point-of-Care Network",
    company_location: "Distributed (100+ Physician Locations)",
    iso_cleanroom: "N/A (Point-of-Care)",
    storage_method: "N/A (Autologous)",
    container_type: "N/A (Autologous)",
    facility_owned: false,
    facility_location: "Distributed (100+ Physician Locations)",
    third_party_testing: "N/A (Patient-Specific)",
    post_thaw_viability: "N/A (Fresh Autologous)",
    mesenchymal_source_detail: "Patient's Own Bone Marrow MSCs (Autologous - No Donor Risk)",
    leadership_experience: "High",
    insurance_coverage: true,
    delivery_methods: ["Intra-Articular", "Other Orthopedic Routes"],
    legal_status: "Practice of Medicine Exemption",
    litigation_cases: [
      {
        case_name: "United States v. Regenerative Sciences, LLC",
        filed_date: "2010",
        court: "U.S. District Court, District of Columbia",
        allegations: ["Unapproved drug status", "Violation of FDA regulations"],
        status: "Settled",
        parties: ["FDA", "Regenerative Sciences LLC", "Dr. Chris Centeno"],
      },
      {
        case_name: "California Clinic Chain Case",
        filed_date: "2022",
        court: "U.S. District Court, Central District of California",
        allegations: ["Stem cell procedure legality"],
        status: "Won",
        parties: ["Defendant doctors", "FDA"],
      },
    ],
    litigation_count: 2,
    fda_warnings_to_physicians: [
      {
        warning_letter_date: "2008",
        violations: ["Compliance concerns"],
        directed_to: "Company",
      },
    ],
    leadership_team: [
      {
        name: "Dr. Christopher J. Centeno, M.D.",
        title: "Chief Medical Officer, Co-Founder",
        background: "Board-certified interventional pain physician, Specialist in regenerative medicine",
        regulatory_history: "Colorado medical license active through 2027, Nevada medical license active, FDA litigation 2010-2014",
        litigation_involved: true,
        pedigree_level: "High",
      },
      {
        name: "Dr. John Schultz",
        title: "Co-Founder",
        background: "Physician scientist",
        pedigree_level: "High",
      },
    ],
    genuine_pedigree_count: 2,
    fda_compliance_rating: "Silver",
    fda_compliance_description: "Settled FDA litigation (2010-2014). Practice of Medicine Exemption for autologous procedures. Not pursuing drug approval pathway. Established business model with 100+ physician network.",
    negative_press_articles: [
      {
        title: "United States v. Regenerative Sciences, LLC",
        source: "U.S. District Court, District of Columbia",
        date: "2010-2014",
        category: "Litigation",
        summary: "FDA sued Regenerative Sciences claiming Regenexx procedure constitutes unapproved drug. Federal court ruled against Regenerative Sciences. Regenexx lost initial lawsuit challenging FDA authority."
      },
      {
        title: "Clinic licensed by controversial stem cell treatment group",
        source: "ABC30",
        date: "2012-02-01",
        category: "Media Coverage",
        summary: "FDA issued criticisms calling Regenexx product 'adulterated' due to facility shortcomings uncovered during inspection."
      },
      {
        title: "Employers Push Controversial Stem Cell Clinics on Workers",
        source: "TIME Magazine",
        date: "2019-06-19",
        category: "Media Coverage",
        summary: "Highlighted controversy around Regenexx stem cell procedures and employer coverage of controversial treatments."
      },
      {
        title: "FDA's claims over stem cells upheld",
        source: "Nature",
        date: "2012",
        category: "Media Coverage",
        summary: "Documented FDA vs. Regenexx litigation and FDA's regulatory authority over stem cell therapies."
      },
      {
        title: "Stem Cells and the Lawsuit That May Shape Our Medical Future",
        source: "Forbes",
        date: "2012-02-10",
        category: "Media Coverage",
        summary: "Covered Regenexx's failed lawsuit against FDA challenging FDA's regulatory authority."
      },
      {
        title: "Regulation or innovation: United States v Regenerative Sciences",
        source: "Healio",
        date: "2012-10-01",
        category: "Media Coverage",
        summary: "Detailed Regenexx's failed jurisdictional challenge to FDA authority over stem cell procedures."
      }
    ],
    negative_press_count: 6,
  },
  {
    id: "benev",
    name: "Benev",
    section: "361 (Cosmetic)",
    manufacturing: "GMP",
    fda_status: "No Warning Letters",
    coa: "Yes",
    source: "Adipose-derived (Fat Tissue) Exosomes",
    dmf: "No",
    notes: "FDA-registered pharmaceutical company founded 2000. Manufactures in own FDA-registered facility with GMP compliance. Partners with ExoCoBio. Focus on aesthetic and skincare applications.",
    hasWarningLetter: false,
    regulatoryScore: 70,
    founded_year: 2000,
    company_age: 26,
    website: "benev.com",
    facility_type: "Drug Manufacturing Facility",
    company_location: "United States",
    iso_cleanroom: "ISO 6",
    storage_method: "Cryogenic (-80°C)",
    container_type: "Glass Vials",
    facility_owned: true,
    facility_location: "United States",
    third_party_testing: "Internal",
    mesenchymal_source_detail: "Adipose Tissue-Derived MSCs (Lower Potency than Wharton's Jelly)",
    leadership_experience: "High",
    insurance_coverage: true,
    delivery_methods: ["Topical"],
    legal_status: "361 Compliant",
    litigation_count: 0,
    genuine_pedigree_count: 2,
    fda_compliance_rating: "Bronze",
    fda_compliance_description: "361 Compliant for cosmetic use. GMP manufacturing. No IND pathway. Adipose-derived source has lower potency than umbilical cord sources.",
    negative_press_articles: [
      {
        title: "Avoid Using Exosomes! | Plastic Surgeon Reacts",
        source: "YouTube",
        date: "2024",
        category: "Scientific Criticism",
        summary: "Plastic surgeon warns against exosome use and questions efficacy claims in skincare applications."
      },
      {
        title: "Why Exosomes Do Not Work for Hair Loss",
        source: "Hair for Life AZ",
        date: "2025-03-09",
        category: "Scientific Criticism",
        summary: "Lacks clinical evidence needed for reliable hair loss treatment. Separates hype from reality in exosome therapy."
      },
      {
        title: "Exosomes: The Good, The Bad, and The Ugly",
        source: "ASRA Newsletter",
        date: "2023-05-12",
        category: "Scientific Criticism",
        summary: "Comprehensive critique of exosome therapy limitations and challenges in clinical application."
      }
    ],
    negative_press_count: 3,
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
    notes: "Focuses on cosmetic applications (ASCE+). GMP manufacturing with compliance to 361 for topical use. Partners with Benev.",
    hasWarningLetter: false,
    regulatoryScore: 72,
    founded_year: 2017,
    company_age: 9,
    website: "exocobio.com",
    facility_type: "Drug Manufacturing Facility",
    company_location: "Seoul, South Korea",
    iso_cleanroom: "ISO 6",
    storage_method: "Cryogenic (-80°C)",
    container_type: "Plastic Vials",
    facility_owned: true,
    facility_location: "South Korea",
    third_party_testing: "Internal",
    mesenchymal_source_detail: "Stem Cell Derived (Source Unclear)",
    leadership_experience: "Medium",
    insurance_coverage: true,
    delivery_methods: ["Topical"],
    legal_status: "361 Compliant",
    litigation_count: 0,
    genuine_pedigree_count: 1,
    fda_compliance_rating: "Bronze",
    fda_compliance_description: "361 Compliant for cosmetic use. International manufacturing (South Korea) raises quality control questions. No IND pathway.",
    negative_press_articles: [
      {
        title: "International Manufacturing Quality Concerns",
        source: "Industry Analysis",
        date: "2025",
        category: "Scientific Criticism",
        summary: "South Korea-based manufacturing raises supply chain and regulatory oversight concerns compared to U.S. facilities."
      }
    ],
    negative_press_count: 1,
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
    notes: "FDA warning letter cited unapproved drug status and cGMP violations for XoGlo products. IND approval came AFTER warning letter issued.",
    hasWarningLetter: true,
    regulatoryScore: 45,
    founded_year: 2018,
    company_age: 8,
    website: "kimeralabs.com",
    facility_type: "Tissue Bank",
    iso_cleanroom: "ISO 7",
    storage_method: "Cryogenic (-80°C)",
    container_type: "Unknown",
    facility_owned: false,
    third_party_testing: "Internal Only",
    mesenchymal_source_detail: "Mixed sources (Placental/Amniotic/Umbilical)",
    leadership_experience: "Medium",
    insurance_coverage: false,
    delivery_methods: ["Intra-Articular", "Topical"],
    legal_status: "Disputed",
    fda_warnings_to_physicians: [
      {
        warning_letter_date: "2023-09",
        warning_letter_number: "CBER-23-649343",
        violations: ["Unapproved drug status", "cGMP violations"],
        products_cited: ["XoGlo", "XoGlo Pro", "Amnio2X"],
        directed_to: "Both",
      },
    ],
    litigation_count: 0,
    genuine_pedigree_count: 1,
    fda_compliance_rating: "Red",
    fda_compliance_description: "FDA Warning Letter (Sept 2023) for unapproved drugs and cGMP violations. IND approval came AFTER warning letter. Cannot market outside IND scope.",
    negative_press_articles: [
      {
        title: "FDA Warns Exosome Maker for Marketing Outside Its IND",
        source: "MedPage Today",
        date: "2024-01-22",
        category: "FDA Enforcement",
        summary: "FDA warned Kimera Labs that it cannot sell exosome products for uses outside its recently secured investigational new drug application."
      },
      {
        title: "Weekly reads: MiMedX & Kimera Labs FDA warnings",
        source: "IPS Cell",
        date: "2024-01-21",
        category: "FDA Enforcement",
        summary: "Highlighted FDA enforcement action against Kimera Labs for unapproved drug marketing."
      },
      {
        title: "FDA revises observations for Kimera Labs' XoGlo product due to IND approval",
        source: "Medium",
        date: "2024-03-07",
        category: "FDA Enforcement",
        summary: "FDA documented compliance issues with Kimera Labs' XoGlo product manufacturing and marketing practices."
      },
      {
        title: "Kimera Labs Responds to FDA Warning Letter",
        source: "PR Newswire",
        date: "2024-01-23",
        category: "FDA Enforcement",
        summary: "Kimera Labs issued response to FDA warning letter regarding unapproved drug marketing."
      }
    ],
    negative_press_count: 4,
  },
  {
    id: "vitti-labs",
    name: "Vitti Labs",
    section: "361 (FDA disputes)",
    manufacturing: "GMP (with cGMP deviations)",
    fda_status: "Warning Letter (July 2022)",
    coa: "No/Unclear",
    source: "Umbilical Cord/Wharton's Jelly",
    dmf: "No",
    notes: "FDA found products fail minimal manipulation and homologous use criteria. Significant cGMP deviations documented. Recently won lawsuit against FDA over minimal manipulation criteria.",
    hasWarningLetter: true,
    regulatoryScore: 45,
    founded_year: 2015,
    company_age: 11,
    website: "vittilabs.com",
    facility_type: "Tissue Bank",
    company_location: "Liberty, Missouri",
    iso_cleanroom: "ISO 7",
    storage_method: "Cryogenic (-80°C)",
    container_type: "Unknown",
    facility_owned: false,
    third_party_testing: "Internal Only",
    mesenchymal_source_detail: "Umbilical Cord/Wharton's Jelly (Minimal Manipulation Disputed)",
    leadership_experience: "Medium",
    insurance_coverage: false,
    delivery_methods: ["Intra-Articular"],
    legal_status: "Disputed",
    litigation_cases: [
      {
        case_name: "Vitti Labs LLC et al v. The Regenerative Project LLC d/b/a Platinum Biologics",
        case_number: "4:2024cv00264",
        filed_date: "2024-04-12",
        court: "U.S. District Court, Western District of Missouri",
        allegations: ["False advertising", "Unfair competition", "Injurious falsehood", "Defamation", "Tortious interference"],
        status: "Ongoing",
        parties: ["Vitti Labs LLC", "Michael Beeben Russell", "The Regenerative Project LLC d/b/a Platinum Biologics"],
      },
      {
        case_name: "Vitti Labs, LLC v. U.S. Food and Drug Administration",
        case_number: "4:25-cv-00011",
        filed_date: "2025-01-07",
        court: "U.S. District Court, Western District of Missouri",
        allegations: ["Challenging FDA minimal manipulation criteria for Section 361 HCT/Ps"],
        status: "Won",
        parties: ["Vitti Labs LLC", "FDA"],
      },
    ],
    litigation_count: 2,
    fda_warnings_to_physicians: [
      {
        warning_letter_date: "2022-07-28",
        warning_letter_number: "CBER-22-627699",
        violations: ["Failure to establish contamination prevention procedures", "Inadequate environmental monitoring", "Microbiological testing deficiencies"],
        directed_to: "Both",
      },
    ],
    genuine_pedigree_count: 1,
    fda_compliance_rating: "Yellow",
    fda_compliance_description: "FDA Warning Letter (July 2022) for cGMP violations. Recently won lawsuit against FDA over minimal manipulation criteria (March 2026). Disputed regulatory status.",
    negative_press_articles: [
      {
        title: "VittiLabs, the Sopranos, and an FDA Warning Letter",
        source: "Regenexx Blog",
        date: "2022-08-11",
        category: "FDA Enforcement",
        summary: "Critical coverage of FDA enforcement action against Vitti Labs for manufacturing violations."
      },
      {
        title: "Liberty-based human tissue bank claims competitor is spreading lies",
        source: "Kansas City Business Journal",
        date: "2024-05-13",
        category: "Litigation",
        summary: "Covered Vitti Labs litigation against Platinum Biologics alleging false advertising and defamation."
      }
    ],
    negative_press_count: 2,
  },
  {
    id: "platinum-biologics",
    name: "Platinum Biologics",
    section: "361 (FDA disputes)",
    manufacturing: "GMP (Cited for violations)",
    fda_status: "Warning Letter (Aug 2025)",
    coa: "No/Unclear",
    source: "Umbilical Cord",
    dmf: "No",
    notes: "FDA found products fail minimal manipulation and homologous use criteria. Processing alters physical state. Owner: Beeben Russell (former Regenative Labs VP). Litigation with Vitti Labs (defamation, unfair competition). Dr. Scott Martin M.D. has lost medical license in multiple states.",
    hasWarningLetter: true,
    regulatoryScore: 25,
    founded_year: 2022,
    company_age: 4,
    website: "platinumbiologics.com",
    facility_type: "Tissue Bank",
    company_location: "Orlando, Florida",
    iso_cleanroom: "ISO 7",
    storage_method: "Unknown",
    container_type: "Unknown",
    facility_owned: false,
    facility_location: "Florida",
    third_party_testing: "Internal Only",
    mesenchymal_source_detail: "Umbilical Cord (Minimal Manipulation Disputed)",
    leadership_experience: "Low",
    insurance_coverage: false,
    delivery_methods: ["Intra-Articular", "Topical"],
    legal_status: "Illegal",
    litigation_cases: [
      {
        case_name: "Vitti Labs LLC et al v. The Regenerative Project LLC d/b/a Platinum Biologics",
        case_number: "4:2024cv00264",
        filed_date: "2024-04-12",
        court: "U.S. District Court, Western District of Missouri",
        allegations: ["False advertising", "Unfair competition", "Defamation"],
        status: "Ongoing",
        parties: ["Vitti Labs LLC", "Michael Beeben Russell", "The Regenerative Project LLC"],
      },
    ],
    litigation_count: 1,
    fda_warnings_to_physicians: [
      {
        warning_letter_date: "2025-08-15",
        warning_letter_number: "CBER-25-705090",
        violations: ["Unapproved new drugs (Section 505(a))", "Minimal manipulation failures", "Homologous use criteria violations", "Processing alters physical state"],
        products_cited: ["Nano PRP Jelly", "Nano Flex", "NanoEx", "Nano Xsomes"],
        directed_to: "Both",
      },
    ],
    leadership_team: [
      {
        name: "Michael 'Beeben' Russell",
        title: "CEO/Chairman, Owner",
        background: "Former VP of Sales for Regenative Labs",
        regulatory_history: "Associated with Medicare billing scheme involving non-covered orthopedic procedures. One of largest CMS clawbacks in Medicare history. Regenative Labs received FDA enforcement actions for unapproved stem cell products.",
        litigation_involved: true,
        pedigree_level: "Low",
      },
      {
        name: "Dr. Scott Matthew Martin, M.D.",
        title: "Senior Product Medical Officer",
        background: "Board-certified interventional pain physician. Specialization in regenerative medicine.",
        regulatory_history: "California medical license revoked (2017) with revocation stayed and 3-year probation. Nevada medical license suspended (2014) after admitting to drug use. License suspension stayed with 24-month probation. Failed to report license suspension to CMS within 30 days. History of drug-related incidents.",
        litigation_involved: true,
        pedigree_level: "Low",
      },
    ],
    genuine_pedigree_count: 0,
    fda_compliance_rating: "Red",
    fda_compliance_description: "FDA Warning Letter (Aug 2025) for unapproved drugs and manufacturing violations. Leadership with documented regulatory violations and criminal history. Illegal status.",
    negative_press_articles: [
      {
        title: "Platinum Biologics: Beeben 2.0",
        source: "Regenexx Blog",
        date: "2024-09-26",
        category: "Leadership Issues",
        summary: "Detailed Beeben Russell's regulatory history and connection to Regenative Labs with FDA enforcement actions."
      },
      {
        title: "2 FDA warnings to perinatal firms including Platinum Biologics",
        source: "IPS Cell",
        date: "2025-09-09",
        category: "FDA Enforcement",
        summary: "Documented FDA enforcement action against Platinum Biologics for unapproved drug marketing."
      },
      {
        title: "Platinum Biologics LLC - 705090 - 08/15/2025",
        source: "LinkedIn",
        date: "2025-09-09",
        category: "FDA Enforcement",
        summary: "Highlighted FDA warning letter to Platinum Biologics and CEO Beeben Russell."
      },
      {
        title: "Ten Physicians and Local Execs Indicted in Pharmacy Kickback Scheme",
        source: "D Magazine / Scribd",
        date: "2025",
        category: "Leadership Issues",
        summary: "Documented criminal investigations in regenerative medicine industry involving companies and executives."
      }
    ],
    negative_press_count: 4,
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
    notes: "FDA warning letter for marketing unapproved drugs and manufacturing violations. CharaExo product cited as unapproved new drug and unlicensed biological product.",
    hasWarningLetter: true,
    regulatoryScore: 25,
    founded_year: 2020,
    company_age: 6,
    website: "charabiologics.com",
    facility_type: "Tissue Bank",
    company_location: "California",
    iso_cleanroom: "ISO 7",
    storage_method: "Unknown",
    container_type: "Unknown",
    facility_owned: false,
    facility_location: "California",
    third_party_testing: "Internal Only",
    mesenchymal_source_detail: "Umbilical Cord (Source Details Unclear)",
    leadership_experience: "Low",
    insurance_coverage: false,
    delivery_methods: ["Intra-Articular", "Topical"],
    legal_status: "Illegal",
    fda_warnings_to_physicians: [
      {
        warning_letter_date: "2025-01",
        warning_letter_number: "CBER-25-698004",
        violations: ["Unapproved new drug", "Unlicensed biological product", "Marketing violations"],
        products_cited: ["CharaExo", "CharaOmni"],
        directed_to: "Both",
      },
    ],
    litigation_count: 0,
    genuine_pedigree_count: 0,
    fda_compliance_rating: "Red",
    fda_compliance_description: "FDA Warning Letter (Jan 2025) for unapproved drugs and unlicensed biological products. Young company (founded 2020) with immediate FDA enforcement.",
    negative_press_articles: [
      {
        title: "Unauthorized Drugs and Biological Products from Chara Biologics Inc",
        source: "GMP Compliance",
        date: "2025-03-26",
        category: "FDA Enforcement",
        summary: "FDA issued warning letter to Chara Biologics for distributing unapproved drugs and biologics."
      },
      {
        title: "FDA letters to Chara Biologics & Evolutionary Biologics continue its unprecedented slew of warnings",
        source: "IPS Cell",
        date: "2025-02-06",
        category: "FDA Enforcement",
        summary: "Highlighted FDA enforcement pattern against exosome companies including Chara Biologics."
      },
      {
        title: "FDA Response Regarding Chara Biologics Products",
        source: "Interventional Orthobiologics",
        date: "2019-06-20",
        category: "FDA Enforcement",
        summary: "Early regulatory concerns regarding Chara Biologics products."
      },
      {
        title: "FDA Warns Chara Biologics Over Unapproved and Adulterated Products",
        source: "IGMPI",
        date: "2025",
        category: "FDA Enforcement",
        summary: "Documented FDA violations including unapproved biologics and adulterated products."
      }
    ],
    negative_press_count: 4,
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
    notes: "FDA warning letter for unapproved drug products. Manufacturing and quality control deficiencies documented.",
    hasWarningLetter: true,
    regulatoryScore: 20,
    founded_year: 2019,
    company_age: 7,
    website: "newlifemedical.com",
    facility_type: "Tissue Bank",
    iso_cleanroom: "ISO 7",
    storage_method: "Unknown",
    container_type: "Unknown",
    facility_owned: false,
    third_party_testing: "Internal Only",
    mesenchymal_source_detail: "Umbilical Cord/Wharton's Jelly (Unclear Sourcing)",
    leadership_experience: "Low",
    insurance_coverage: false,
    delivery_methods: ["Intra-Articular"],
    legal_status: "Illegal",
    fda_warnings_to_physicians: [
      {
        warning_letter_date: "2025-09",
        warning_letter_number: "CBER-25-711102",
        violations: ["Unapproved drug products", "Manufacturing deficiencies", "Quality control deficiencies"],
        directed_to: "Both",
      },
    ],
    litigation_count: 0,
    genuine_pedigree_count: 0,
    fda_compliance_rating: "Red",
    fda_compliance_description: "FDA Warning Letter (Sept 2025) for unapproved exosome and umbilical cord products. Manufacturing and quality control deficiencies documented.",
    negative_press_articles: [
      {
        title: "FDA warns Florida company on Exosomes and umbilical cord/Wharton's Jelly product",
        source: "LinkedIn",
        date: "2025",
        category: "FDA Enforcement",
        summary: "FDA enforcement action against Florida-based New Life Medical Services for unapproved exosome products."
      }
    ],
    negative_press_count: 1,
  },
  {
    id: "plated-skin-science",
    name: "Plated Skin Science",
    section: "361 (Cosmetic)",
    manufacturing: "cGMP",
    fda_status: "No Warning Letters",
    coa: "Yes",
    source: "Platelet-Derived Exosomes",
    dmf: "No",
    notes: "Renewosome Technology: Proprietary platelet-derived exosomes for topical skincare. Founded by Alisa Lask (former Galderma VP overseeing 10 FDA approvals). Rion Aesthetics parent company. 1+ trillion exosomes per bottle. Clinically proven results in 6 weeks. TIME Magazine Best Invention 2024. Mayo Clinic Store partnership. New 14,000 sq ft manufacturing facility (2025). Triple-digit growth trajectory.",
    hasWarningLetter: false,
    regulatoryScore: 78,
    founded_year: 2022,
    company_age: 4,
    website: "platedskinscience.com",
    facility_type: "Drug Manufacturing Facility",
    company_location: "United States",
    iso_cleanroom: "ISO 6",
    storage_method: "Cryogenic (-80°C)",
    container_type: "Glass Vials",
    facility_owned: true,
    facility_location: "United States (Company-Owned Facility - Expanded 2025)",
    third_party_testing: "Internal",
    post_thaw_viability: "95%+ (Proprietary Process)",
    mesenchymal_source_detail: "Platelet-Derived Exosomes from FDA-Compliant Blood Banks (Low Immunogenicity, High Bioavailability)",
    leadership_experience: "High",
    insurance_coverage: true,
    delivery_methods: ["Topical"],
    legal_status: "361 Compliant",
    ind_irb_status: "IND Application in Process",
    litigation_count: 0,
    genuine_pedigree_count: 2,
    fda_compliance_rating: "Silver",
    fda_compliance_description: "361 Compliant for cosmetic topical use. Platelet-derived exosomes from FDA-compliant blood banks. IND application in process. No injectable exosome approvals exist. Strong leadership with FDA approval experience.",
    patents: [
      "Proprietary Renewosome Technology (Patent Pending)",
      "Platelet-Derived Exosome Extraction Process (Patent Pending)"
    ],
    leadership_team: [
      {
        name: "Alisa Lask",
        title: "Chief Executive Officer, Founder",
        background: "Former Vice President and General Manager of Aesthetics at Galderma. Oversaw 10 FDA approvals and multiple sales force expansions. Extensive experience in regulated medical aesthetics industry.",
        regulatory_history: "10 FDA approvals at Galderma. Expertise in FDA compliance and regulatory pathways for aesthetic products.",
        pedigree_level: "High",
      },
      {
        name: "Rion Aesthetics Leadership",
        title: "Parent Company (Rochester, Minnesota)",
        background: "Regenerative aesthetics company pioneering platelet-derived exosome technology. Founded in Rochester, Minnesota (Mayo Clinic region).",
        pedigree_level: "High",
      },
    ],
    negative_press_count: 0,
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
    iso_cleanroom?: string[];
    storage_method?: string[];
    third_party_testing?: string[];
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
    if (filters.iso_cleanroom && filters.iso_cleanroom.length > 0 && company.iso_cleanroom && !filters.iso_cleanroom.includes(company.iso_cleanroom)) {
      return false;
    }
    if (filters.storage_method && filters.storage_method.length > 0 && company.storage_method && !filters.storage_method.includes(company.storage_method)) {
      return false;
    }
    if (filters.third_party_testing && filters.third_party_testing.length > 0 && company.third_party_testing && !filters.third_party_testing.includes(company.third_party_testing)) {
      return false;
    }
    if (filters.searchTerm && filters.searchTerm.length > 0) {
      const term = filters.searchTerm.toLowerCase();
      return (
        company.name.toLowerCase().includes(term) ||
        company.source.toLowerCase().includes(term) ||
        company.notes.toLowerCase().includes(term) ||
        (company.mesenchymal_source_detail && company.mesenchymal_source_detail.toLowerCase().includes(term))
      );
    }
    return true;
  });
};
