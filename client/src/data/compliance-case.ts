export interface LawCitation {
  code: string;
  title: string;
  link: string;
}

export interface ComplianceCategory {
  id: string;
  title: string;
  subtitle: string;
  whatTheyAre: string;
  whyTheyFail: string;
  whatDynacordIs: string;
  citations: LawCitation[];
}

export interface ComplianceStandard {
  standard: string;
  greyMarket361: string;
  rosePlant: string;
  conditionedMedia: string;
  researchVials: string;
  lyophilized: string;
  dynacord: string;
}

export interface ViolationRow {
  law: string;
  violation: string;
  link: string;
}

export interface TexasDefensibilityRow {
  element: string;
  status: string;
}

export const complianceCategories: ComplianceCategory[] = [
  {
    id: "grey-market-361",
    title: "Category 1: Grey Market 361 Tissue Products",
    subtitle: "The most common exosome products sold in the U.S. today",
    whatTheyAre: "The most common exosome products on the market today are sold under the claim that they qualify as 361 HCT/P tissue products under Section 361 of the Public Health Service Act. These sellers argue their products are \"minimally manipulated\" and \"homologous use\" tissue and therefore exempt from full drug approval.",
    whyTheyFail: "Under 21 CFR 1271.10(a), an HCT/P is regulated solely under Section 361 of the PHS Act only if it meets ALL of the following criteria: it is minimally manipulated, it is intended for homologous use only, its manufacture does not involve combination with another article except water, crystalloids, or a sterilizing or preserving agent, and it does not have a systemic effect and is not dependent upon the metabolic activity of living cells for its primary function. Exosomes fail this test on multiple grounds. Minimal manipulation failure: Cell culture, MSC expansion, and exosome isolation from conditioned media alter the relevant biological characteristics of the source tissue. Homologous use failure: Wharton's Jelly cushions the umbilical cord. Injecting isolated exosomes to reduce inflammation is not homologous use. Systemic effect failure: IV-administered exosomes have systemic effects.",
    whatDynacordIs: "Dynacord WJ-MSC exosomes are classified as a Section 351(a) biologic under the Public Health Service Act. This means the product is manufactured under cGMP standards with a registered FDA Drug Master File. It is not a 361 HCT/P and does not claim to be.",
    citations: [
      { code: "42 U.S.C. \u00A7 264", title: "PHS Act Section 361 (the 361 exemption sellers claim)", link: "https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title42-section264&num=0&edition=prelim" },
      { code: "21 CFR \u00A7 1271.10", title: "Four-criteria test for 361 exemption", link: "https://www.ecfr.gov/current/title-21/chapter-I/subchapter-L/part-1271/subpart-A/section-1271.10" },
      { code: "42 U.S.C. \u00A7 262", title: "PHS Act Section 351(a) (BLA requirement for biologics)", link: "https://www.law.cornell.edu/uscode/text/42/262" },
      { code: "21 U.S.C. \u00A7 331(d)", title: "Prohibition on interstate commerce of unapproved biologics", link: "https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title21-section331&num=0&edition=prelim" },
      { code: "FDA Safety Notification", title: "Public Safety Notification on Exosome Products (2019)", link: "https://www.fda.gov/vaccines-blood-biologics/safety-availability-biologics/public-safety-notification-exosome-products" },
      { code: "FDA Guidance", title: "Minimal Manipulation and Homologous Use Guidance", link: "https://www.fda.gov/regulatory-information/search-fda-guidance-documents/regulatory-considerations-human-cells-tissues-and-cellular-and-tissue-based-products-minimal" },
    ],
  },
  {
    id: "rose-plant",
    title: "Category 2: Rose Exosome and Plant-Derived Products",
    subtitle: "Products derived from plants marketed as therapeutic exosomes",
    whatTheyAre: "A growing number of products marketed as \"exosomes\" are derived from plants, most commonly roses, grapes, or ginger. These are often sold at aesthetics clinics and med spas with claims about skin regeneration, anti-aging, and cellular repair.",
    whyTheyFail: "Plant-derived extracellular vesicles are not human mesenchymal exosomes. They do not contain the signaling proteins, growth factors, or microRNA cargo derived from Wharton's Jelly MSCs. Any claim that a plant-derived product produces human therapeutic effects is unsupported by clinical evidence and triggers drug regulation under the FD&C Act. 21 U.S.C. \u00A7 321(g)(1) defines a \"drug\" as any article intended to affect the structure or function of the human body. Making any such claim for a plant vesicle product causes it to be regulated as an unapproved new drug.",
    whatDynacordIs: "Dynacord's product is derived exclusively from Wharton's Jelly mesenchymal stem cells under pharmaceutical-grade cell culture conditions. It produces human MSC-derived exosomes with documented particle size distribution, surface marker characterization (CD9, CD63, CD81), and validated growth factor content. No plant material. No animal serum. No undefined source.",
    citations: [
      { code: "21 U.S.C. \u00A7 321(g)(1)", title: "Definition of \"drug\" under FD&C Act", link: "https://www.law.cornell.edu/uscode/text/21/321" },
      { code: "21 U.S.C. \u00A7 355(a)", title: "Prohibition on unapproved new drugs in interstate commerce", link: "https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title21-section355&num=0&edition=prelim" },
    ],
  },
  {
    id: "conditioned-media",
    title: "Category 3: Conditioned Media Only Products",
    subtitle: "Raw supernatant sold as exosomes without proper isolation",
    whatTheyAre: "Some products sold as exosomes are not isolated exosome preparations at all. They are conditioned media, the liquid supernatant left after cells are cultured. They contain a mix of secreted proteins, cytokines, cell debris, and vesicles of all sizes, without proper isolation, characterization, or standardization.",
    whyTheyFail: "21 CFR \u00A7 610.13 (purity standard for biologics) requires that biological products be free of extraneous material except that which is unavoidable in the manufacturing process. Conditioned media cannot meet the purity, potency, or identity standards required under 21 CFR Part 610. A product that cannot be characterized cannot be dosed. A product that cannot be dosed cannot be safely administered to a patient.",
    whatDynacordIs: "Dynacord uses validated ultracentrifugation and size exclusion chromatography protocols to isolate exosomes from conditioned media. The final product is characterized by nanoparticle tracking analysis (NTA) for particle size and concentration, transmission electron microscopy for morphology, and Western blot for surface marker confirmation. Every lot is a defined, characterized exosome preparation, not raw conditioned media.",
    citations: [
      { code: "21 CFR \u00A7 610.13", title: "Purity standard for biologics", link: "https://www.ecfr.gov/current/title-21/chapter-I/subchapter-F/part-610/subpart-B/section-610.13" },
      { code: "21 CFR Part 610", title: "General Biological Products Standards", link: "https://www.ecfr.gov/current/title-21/chapter-I/subchapter-F/part-610" },
    ],
  },
  {
    id: "research-vials",
    title: "Category 4: Plastic Vials Labeled \"Research Use Only\"",
    subtitle: "Products sold in plastic cryovials for obvious clinical use",
    whatTheyAre: "Dozens of companies sell exosome products in plastic cryovials labeled \"for research use only\" or \"not for human use.\" These products are then purchased by clinics and injected into patients.",
    whyTheyFail: "The \"research use only\" label does not create a safe harbor for clinical use. FDA evaluates the totality of circumstances, including the manufacturer's marketing, the customer base, and the intended use. If a product is manufactured and marketed in a context where clinical use is the obvious purpose, FDA treats it as a drug regardless of the label. Plastic vials are not appropriate primary containers for a cryopreserved biological product intended for human injection. Plastic is gas-permeable, reactive at low temperatures, and presents leachable contamination risks that pharmaceutical glass eliminates.",
    whatDynacordIs: "Dynacord ships its WJ-MSC exosome product in pharmaceutical-grade Type I borosilicate glass vials, the same container standard used by FDA-approved injectable biologics. Product is shipped cryogenic at -80\u00B0C or on dry ice to maintain biological activity throughout the cold chain.",
    citations: [
      { code: "21 CFR \u00A7 801.4", title: "Intended use determinations for products", link: "https://www.ecfr.gov/current/title-21/chapter-I/subchapter-H/part-801/subpart-A/section-801.4" },
      { code: "21 CFR \u00A7 211.94", title: "Container-closure requirements for drug products", link: "https://www.ecfr.gov/current/title-21/chapter-I/subchapter-C/part-211/subpart-F/section-211.94" },
      { code: "21 CFR \u00A7 211.142", title: "Warehousing procedures", link: "https://www.ecfr.gov/current/title-21/chapter-I/subchapter-C/part-211/subpart-H/section-211.142" },
    ],
  },
  {
    id: "lyophilized",
    title: "Category 5: Lyophilized Products Without Stability Data",
    subtitle: "Freeze-dried exosomes with unvalidated reconstitution",
    whatTheyAre: "Some manufacturers lyophilize (freeze-dry) their exosome products to extend shelf life and eliminate the cold chain requirement. These products are sold as powder to be reconstituted before use.",
    whyTheyFail: "Lyophilization of exosomes is a complex process that frequently damages the lipid bilayer structure of vesicles, alters particle size distribution, reduces surface marker integrity, and changes biological activity. Without validated lyophilization cycle development and stability data demonstrating that the reconstituted product retains the same characterization profile as the pre-lyophilized product, there is no basis for concluding the product is equivalent.",
    whatDynacordIs: "Dynacord does not lyophilize its product. The product is cryopreserved in liquid form and shipped cryogenic. This preserves the biological integrity of the exosome lipid bilayer, maintains surface marker fidelity, and ensures that what the physician receives is the same product that passed lot release testing.",
    citations: [
      { code: "21 CFR \u00A7 211.166", title: "Stability testing requirements for shelf life claims", link: "https://www.ecfr.gov/current/title-21/chapter-I/subchapter-C/part-211/subpart-I/section-211.166" },
      { code: "ICH Q1A(R2)", title: "Stability Testing of New Drug Substances and Products", link: "https://www.fda.gov/media/71707/download" },
    ],
  },
];

export const dynacordStandards = [
  {
    title: "Section 351(a) Classification with Registered Drug Master File",
    description: "Dynacord's WJ-MSC exosome product is classified as a Section 351(a) biologic under the Public Health Service Act. A Drug Master File is registered with FDA under 21 CFR \u00A7 314.420 and 21 CFR \u00A7 601.51, containing the full chemistry, manufacturing, and controls (CMC) documentation for the drug substance. No other commercial exosome manufacturer has achieved this for a WJ-MSC-derived exosome product.",
    citations: [
      { code: "21 CFR \u00A7 314.420", title: "DMF regulation", link: "https://www.ecfr.gov/current/title-21/chapter-I/subchapter-D/part-314/subpart-D/section-314.420" },
      { code: "FDA DMF Program", title: "Drug Master Files overview", link: "https://www.fda.gov/drugs/forms-submission-requirements/drug-master-files-dmfs" },
    ],
  },
  {
    title: "cGMP Manufacturing Under 21 CFR Parts 210, 211, and 600-680",
    description: "Every batch of Dynacord exosomes is manufactured under current Good Manufacturing Practice regulations. This means documented SOPs, batch records, environmental monitoring, deviation management, CAPA systems, and quality unit oversight for every lot.",
    citations: [
      { code: "21 CFR Part 210", title: "Minimum cGMP requirements", link: "https://www.ecfr.gov/current/title-21/chapter-I/subchapter-C/part-210" },
      { code: "21 CFR Part 211", title: "cGMP for finished pharmaceuticals", link: "https://www.ecfr.gov/current/title-21/chapter-I/subchapter-C/part-211" },
      { code: "21 CFR Parts 600-680", title: "Biologics-specific manufacturing standards", link: "https://www.ecfr.gov/current/title-21/chapter-I/subchapter-F" },
    ],
  },
  {
    title: "Batch-by-Batch Third-Party Release Testing",
    description: "Dynacord conducts third-party lot release testing for every batch, including sterility, endotoxin, mycoplasma, identity (surface markers CD9, CD63, CD81), and potency (particle count by NTA, growth factor content). No lot ships without a passing Certificate of Analysis from an independent, accredited laboratory.",
    citations: [
      { code: "21 CFR \u00A7 610.12", title: "Sterility testing requirements", link: "https://www.ecfr.gov/current/title-21/chapter-I/subchapter-F/part-610/subpart-B/section-610.12" },
      { code: "21 CFR \u00A7 610.30", title: "Mycoplasma testing", link: "https://www.ecfr.gov/current/title-21/chapter-I/subchapter-F/part-610/subpart-D/section-610.30" },
      { code: "21 CFR \u00A7 610.10", title: "Potency requirements", link: "https://www.ecfr.gov/current/title-21/chapter-I/subchapter-F/part-610/subpart-B/section-610.10" },
    ],
  },
  {
    title: "Completed Animal Safety Studies",
    description: "Before any human administration, Dynacord completed animal toxicology and safety studies. This work supports the product's clinical use profile and aligns with the pre-IND development requirements under 21 CFR Part 312 and ICH S7A. No other commercial exosome product being administered to patients in the U.S. today has disclosed completed animal safety studies for its specific formulation.",
    citations: [
      { code: "21 CFR Part 312", title: "IND regulations", link: "https://www.ecfr.gov/current/title-21/chapter-I/subchapter-D/part-312" },
      { code: "FDA Guidance", title: "Nonclinical Safety Studies", link: "https://www.fda.gov/media/71547/download" },
    ],
  },
  {
    title: "Defined Dosing at 20 Billion Exosomes Per Milliliter",
    description: "The Dynacord product is standardized at 20 billion exosomes per milliliter, with a standard therapeutic dose of 5 mL (100 billion exosomes). This dosing is validated by NTA particle counting on every batch. Most exosome products on the market cannot state a particle count because they have not characterized their product.",
    citations: [
      { code: "21 CFR \u00A7 610.10", title: "Potency requirement for biologics", link: "https://www.ecfr.gov/current/title-21/chapter-I/subchapter-F/part-610/subpart-B/section-610.10" },
    ],
  },
  {
    title: "Wharton's Jelly MSC Source with Full Donor Screening",
    description: "The product source is Wharton's Jelly mesenchymal stem cells from consented donors. Donor screening and testing follows the requirements applicable to allogeneic cell-derived biologics, aligned with 21 CFR Part 1271 Subpart C.",
    citations: [
      { code: "21 CFR \u00A7 1271.75", title: "Donor screening requirements", link: "https://www.ecfr.gov/current/title-21/chapter-I/subchapter-L/part-1271/subpart-C/section-1271.75" },
      { code: "21 CFR \u00A7 1271.80", title: "Donor testing requirements", link: "https://www.ecfr.gov/current/title-21/chapter-I/subchapter-L/part-1271/subpart-C/section-1271.80" },
    ],
  },
];

export const complianceComparison: ComplianceStandard[] = [
  { standard: "Correct regulatory classification", greyMarket361: "No", rosePlant: "No", conditionedMedia: "No", researchVials: "No", lyophilized: "No", dynacord: "YES, 351(a)" },
  { standard: "FDA Drug Master File", greyMarket361: "No", rosePlant: "No", conditionedMedia: "No", researchVials: "No", lyophilized: "No", dynacord: "YES" },
  { standard: "cGMP manufacturing", greyMarket361: "No", rosePlant: "No", conditionedMedia: "No", researchVials: "No", lyophilized: "No", dynacord: "YES" },
  { standard: "Batch-by-batch third-party testing", greyMarket361: "No", rosePlant: "No", conditionedMedia: "No", researchVials: "No", lyophilized: "No", dynacord: "YES" },
  { standard: "Sterility per 21 CFR 610.12", greyMarket361: "No", rosePlant: "No", conditionedMedia: "No", researchVials: "No", lyophilized: "No", dynacord: "YES" },
  { standard: "Endotoxin testing", greyMarket361: "No", rosePlant: "No", conditionedMedia: "No", researchVials: "No", lyophilized: "No", dynacord: "YES" },
  { standard: "Mycoplasma testing", greyMarket361: "No", rosePlant: "No", conditionedMedia: "No", researchVials: "No", lyophilized: "No", dynacord: "YES" },
  { standard: "Defined particle count / potency", greyMarket361: "No", rosePlant: "No", conditionedMedia: "No", researchVials: "No", lyophilized: "Rarely", dynacord: "YES" },
  { standard: "Animal safety studies completed", greyMarket361: "No", rosePlant: "No", conditionedMedia: "No", researchVials: "No", lyophilized: "No", dynacord: "YES" },
  { standard: "Pharmaceutical glass vials", greyMarket361: "No", rosePlant: "No", conditionedMedia: "No", researchVials: "No", lyophilized: "No", dynacord: "YES" },
  { standard: "Cryogenic shipping", greyMarket361: "No", rosePlant: "No", conditionedMedia: "No", researchVials: "Rarely", lyophilized: "No", dynacord: "YES" },
  { standard: "Donor eligibility documentation", greyMarket361: "Rarely", rosePlant: "N/A", conditionedMedia: "Rarely", researchVials: "No", lyophilized: "Rarely", dynacord: "YES" },
];

export const violationTable: ViolationRow[] = [
  { law: "42 U.S.C. \u00A7 262(a)(1)", violation: "Distribution of unlicensed biological product", link: "https://www.law.cornell.edu/uscode/text/42/262" },
  { law: "21 U.S.C. \u00A7 355(a)", violation: "Distribution of unapproved new drug", link: "https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title21-section355&num=0&edition=prelim" },
  { law: "21 U.S.C. \u00A7 331(d)", violation: "Prohibited act: introduction into interstate commerce", link: "https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title21-section331&num=0&edition=prelim" },
  { law: "21 CFR \u00A7 1271.10", violation: "False claim of 361 HCT/P exemption", link: "https://www.ecfr.gov/current/title-21/chapter-I/subchapter-L/part-1271/subpart-A/section-1271.10" },
  { law: "21 CFR Parts 210/211", violation: "Failure to manufacture under cGMP", link: "https://www.ecfr.gov/current/title-21/chapter-I/subchapter-C/part-211" },
  { law: "21 CFR Part 610", violation: "Failure to conduct batch release testing", link: "https://www.ecfr.gov/current/title-21/chapter-I/subchapter-F/part-610" },
  { law: "21 CFR \u00A7 610.12", violation: "No sterility testing per lot", link: "https://www.ecfr.gov/current/title-21/chapter-I/subchapter-F/part-610/subpart-B/section-610.12" },
  { law: "21 CFR \u00A7 211.94", violation: "Non-pharmaceutical containers", link: "https://www.ecfr.gov/current/title-21/chapter-I/subchapter-C/part-211/subpart-F/section-211.94" },
];

export const texasLegalFramework = {
  shortAnswer: "A licensed Texas physician is permitted to administer mesenchymal exosome therapy to a consenting patient. The legal authority comes from the Texas Medical Practice Act, the physician's independent prescribing authority, and the patient's fundamental right to access treatment with informed consent. No federal or Texas state law prohibits a physician from administering an exosome biologic to a willing, consenting patient.",
  federalFramework: "Dynacord WJ-MSC exosomes are classified as a 351(a) biologic under the Public Health Service Act. This means the product is manufactured under cGMP standards with a registered FDA Drug Master File. FDA does not prohibit physician administration. FDA's authority governs manufacturers and marketing. A licensed physician administering an investigational or non-FDA-approved biologic to a consenting patient is exercising the practice of medicine, which the FDA expressly does not regulate. From FDA's own guidance: \"FDA does not regulate the practice of medicine. A licensed practitioner may prescribe off-label products to patients in the context of the practice of medicine.\" (21 CFR 312.2, FDA Guidance on Off-Label Use). The FDA has never obtained an injunction against a licensed physician solely for administering an exosome product to a consenting patient.",
  texasStateLaw: "Texas Medical Practice Act (Tex. Occ. Code Ch. 151-165) grants licensed physicians broad authority to administer treatments they deem appropriate in the exercise of clinical judgment. Texas Right to Try Act (Tex. Health & Safety Code Ch. 166A) gives terminally ill patients the explicit right to access investigational treatments with consent. The Texas Medical Board has not issued a prohibition on exosome therapy.",
  consentDoes: [
    "Confirms the patient understands the treatment is not FDA-approved for their condition and chooses to proceed anyway.",
    "Documents the physician's clinical judgment that the treatment is appropriate for that patient.",
    "Establishes the legal foundation for the physician-patient relationship and the treatment decision.",
  ],
  defensibilityTable: [
    { element: "Licensed Texas physician administering", status: "Required. Check." },
    { element: "cGMP-manufactured product", status: "Dynacord WJ-MSC exosomes. Check." },
    { element: "FDA Drug Master File registered", status: "Section 351(a) DMF on file. Check." },
    { element: "Written informed consent obtained", status: "Must be documented at time of treatment." },
    { element: "Clinical rationale documented in chart", status: "Must be documented." },
    { element: "No prohibited commercial kickback", status: "Fee is for physician services, not product referral." },
  ],
  physicianScript: "\"This therapy uses exosomes derived from mesenchymal stem cells. It is not FDA-approved for this condition. You are choosing this treatment based on available evidence, your clinical picture, and your own decision after a full discussion of risks, benefits, and alternatives. Your consent is documented and forms the basis for our treatment relationship.\"",
  bottomLine: "A Texas physician who is licensed, who documents clinical rationale, and who obtains written informed consent is on solid legal ground administering mesenchymal exosome therapy. The physician practices medicine. The FDA regulates manufacturers. Texas law protects the physician-patient relationship.",
};
