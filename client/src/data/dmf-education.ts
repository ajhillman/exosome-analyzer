export interface DMFStep {
  number: number;
  title: string;
  description: string;
  details?: string[];
}

export interface DMFSection {
  id: string;
  title: string;
  content: string;
}

export interface CTDModule {
  section: string;
  content: string;
}

export interface FeeReference {
  item: string;
  detail: string;
  link?: string;
}

export const dmfDefinition = {
  title: "What Is an FDA Type II Drug Master File",
  plainDefinition: "A Drug Master File (DMF) is a submission to FDA that provides confidential detailed information about facilities, processes, or articles used in the manufacturing, processing, packaging, and storing of one or more human drugs. Submitting a DMF is not required by law or FDA regulation. A DMF is submitted solely at the discretion of the holder. The information in the DMF supports an IND, NDA, ANDA, another DMF, an Export Application, or amendments to any of these. A DMF is not a substitute for an IND, NDA, ANDA, or Export Application. It is not approved or disapproved. FDA reviews the technical contents of a DMF only in connection with the review of another application.",
  plainTerms: "A DMF is your manufacturing dossier on file with FDA. It proves to any reviewer that your product is made correctly and consistently. It is not a product approval. It is evidence of manufacturing credibility.",
  typeIICovers: "A Type II DMF covers the drug substance, drug substance intermediates, and materials used in their preparation, or the drug product. For WJ-MSC mesenchymal exosomes, the Type II DMF documents the exosome biological substance itself, including how it is sourced, processed, characterized, tested, and stored. This is the DMF type DynaCord filed.",
  biologicsDistinction: "DynaCord's product is a 351(a) biologic reviewed by CBER, not a conventional drug reviewed by CDER. For a new biologic product being proposed for testing in the clinic, the FDA allows the use of DMFs for drug substance, drug substance intermediate, or drug product. For a new biologic product applying for marketing authorization under a BLA, the DMF is used for raw materials, starting materials, and packaging materials, but not for drug substance, drug substance intermediate, or drug product. For new biologic-related submissions, DMF numbers for biologics are no longer issued through CDER's NextGen Portal. Sponsors must now submit an email request through CBER's Regulatory Information Management Staff at CBERRIMS@fda.hhs.gov.",
};

export const dmfSteps: DMFStep[] = [
  {
    number: 1,
    title: "Confirm You Need a DMF and Which Center",
    description: "Contact CBER directly at cberrims@fda.hhs.gov. Manufacturers should get in touch with FDA to confirm a DMF is appropriate for the product's intended use. For exosomes: a Type II DMF filed with CBER covers your drug substance and manufacturing details for IND support. It is the appropriate vehicle.",
    details: [
      "Proprietary cell culture media: appropriate for Type II master file",
      "Cross-referencing an entire manufacturing process: NOT appropriate",
      "Exosome drug substance and manufacturing details: appropriate for IND support"
    ]
  },
  {
    number: 2,
    title: "Request a Pre-Assigned Application Number",
    description: "Send a secure email to cberrims@fda.hhs.gov that includes the sponsor/applicant name and address, point of contact name and number, product name, and anticipated submission date. FDA issues your DMF number (e.g., DMF #040123). That number is referenced in all future correspondence and in any IND or BLA that cites your file.",
  },
  {
    number: 3,
    title: "Prepare the eCTD-Formatted Document",
    description: "It is an FDA requirement to submit DMFs in eCTD (electronic Common Technical Document) format. The CTD is divided into five modules. Module 3 carries all the scientific weight for a Type II biological substance DMF. It follows the ICH CTD-Quality format.",
    details: [
      "Module 1: Regional administrative information",
      "Module 2: Quality overall summary",
      "Module 3: Detailed information about the drug substance or product (core of the DMF)",
      "Module 4: Nonclinical study reports (not always applicable)",
      "Module 5: Clinical study reports (not always applicable)"
    ]
  },
  {
    number: 4,
    title: "Complete All Required Administrative Documents",
    description: "DMF submissions must include FDA Form 3938, a cover letter, and administrative and technical information. The original submission should contain complete administrative and technical information.",
    details: [
      "FDA Form 3938",
      "Cover letter with statement of commitment",
      "Administrative section (holder identity, manufacturer identity, contacts)",
      "Letter of Authorization (LOA) template for future references",
      "Debarment certification",
      "Full Module 3 technical package"
    ]
  },
  {
    number: 5,
    title: "Validate the eCTD File",
    description: "After preparation in eCTD format, validate it using an eCTD validation tool such as Lorenz docuBridge, eCTDmanager, or GlobalSubmit. Ensure the XML backbone is correct and contains no broken hyperlinks. Any technical issues lead to rejection before FDA begins reviewing the DMF.",
  },
  {
    number: 6,
    title: "Submit Through the Electronic Submissions Gateway",
    description: "After validation, upload the eCTD file to the FDA Electronic Submissions Gateway (ESG) portal using active ESG credentials. After a successful submission, you receive a Receipt of Acknowledgement and Technical Acceptance Notification from FDA. For CBER submissions, select CBER as the receiving center when transmitting through the ESG.",
  },
  {
    number: 7,
    title: "Ongoing Maintenance",
    description: "The DMF does not expire, but it requires active maintenance. Failure to submit annual reports is a problem. To close a DMF, DMF holders must submit an administrative amendment requesting closure.",
    details: [
      "Confirm the DMF is current",
      "List all authorized parties who have referenced the DMF",
      "Report changes made since the last annual report"
    ]
  },
];

export const ctdModules: CTDModule[] = [
  { section: "3.2.S.1", content: "General information: nomenclature, structure, physical/chemical properties" },
  { section: "3.2.S.2", content: "Manufacture: manufacturer name, batch formula, process description, process controls" },
  { section: "3.2.S.3", content: "Characterization: elucidation of structure, impurities" },
  { section: "3.2.S.4", content: "Control of drug substance: specifications, analytical procedures, validation, batch analyses" },
  { section: "3.2.S.5", content: "Reference standards: characterization of standards used in testing" },
  { section: "3.2.S.6", content: "Container/closure system" },
  { section: "3.2.S.7", content: "Stability: protocols, data, post-approval commitments" },
];

export const dmfBenefits = [
  {
    title: "Supports Your IND",
    description: "Any clinical investigation of the exosome product in the U.S. references the DMF to satisfy CMC requirements without re-disclosing proprietary manufacturing data."
  },
  {
    title: "Protects Intellectual Property",
    description: "A Drug Master File becomes necessary when confidential information that a manufacturer does not wish to share with the applicant needs to be kept protected. The contents of a DMF are cross-referenced by a partner but not accessed."
  },
  {
    title: "Demonstrates Manufacturing Credibility",
    description: "For a physician or patient, the existence of a filed DMF with FDA signals that the product's manufacturing process has been formally documented and submitted to the federal government. That is not a product approval, but it is the strongest manufacturing transparency signal available short of a full BLA."
  }
];

export const feeReferences: FeeReference[] = [
  { item: "CBER DMF number request", detail: "cberrims@fda.hhs.gov", link: "mailto:cberrims@fda.hhs.gov" },
  { item: "DMF questions (CDER)", detail: "dmfquestion@fda.hhs.gov", link: "mailto:dmfquestion@fda.hhs.gov" },
  { item: "Type II API fee (GDUFA, ANDA support)", detail: "$95,084 for FY2025" },
  { item: "Fee for IND/NDA/BLA support", detail: "No fee" },
  { item: "Primary regulation", detail: "21 CFR 314.420 (CDER), 21 CFR 601.51 (CBER)" },
  { item: "Governing guidance", detail: "FDA DMF Draft Guidance, November 2019", link: "https://www.fda.gov/media/131861/download" },
  { item: "FDA DMF page", detail: "fda.gov/drugs/forms-submission-requirements/drug-master-files-dmfs", link: "https://www.fda.gov/drugs/forms-submission-requirements/drug-master-files-dmfs" },
  { item: "Types of DMFs", detail: "fda.gov/drugs/drug-master-files-dmfs/types-drug-master-files-dmfs", link: "https://www.fda.gov/drugs/drug-master-files-dmfs/types-drug-master-files-dmfs" },
  { item: "Submission resources", detail: "fda.gov/drugs/drug-master-files-dmfs/drug-master-file-dmf-submission-resources", link: "https://www.fda.gov/drugs/drug-master-files-dmfs/drug-master-file-dmf-submission-resources" },
];

export const bottomLine = "The Type II DMF tells FDA exactly what is in the product, who makes it, how it is made, and how it is tested and stored. The fact that DynaCord's WJ-MSC exosome product has a registered DMF number on file with FDA means the manufacturer put their manufacturing process and quality data on the record with the federal government. That file supports every future clinical application. It does not equal FDA approval of the product. It equals proof that the manufacturer operates with the transparency and documentation discipline that FDA demands from every legitimate drug substance manufacturer in the United States.";
