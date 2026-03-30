// 50-State Regenerative Medicine Law Compendium + Federal Regulatory Framework
// Source: Federal RTT, Regen Consent, 50-State Laws Document v2.0 (March 2026)

export type StateStatus =
  | "RTT + Adult SC (IRB)"
  | "RTT (SC inclusive)"
  | "RTT + Adult MSC"
  | "RTT with SC Exclusion"
  | "Disclosure/Consent Required"
  | "Expansive / FDA Conflict"
  | "Research Permissive"
  | "Research Permissive (IRB)"
  | "Research Permissive (Constitutional)"
  | "hESC Restrictive"
  | "hESC Prohibited/Adult SC Permitted"
  | "Limited hESC/Adult SC"
  | "Limited Embryo Research"
  | "Adult SC Research"
  | "Cord Blood Funding"
  | "Cord Blood Donation"
  | "Cloning Prohibition"
  | "Study Only"
  | "Policy Only"
  | "University Research"
  | "Pending Expansion"
  | "Mixed"
  | "None";

export interface StateRegulation {
  state: string;
  abbreviation: string;
  status: StateStatus;
  primaryCitation: string;
  operativeLanguage: string;
  legislativeSource: string;
}

export interface FederalRegulation {
  id: string;
  title: string;
  citation: string;
  fullTextUrl: string;
  additionalUrls?: { label: string; url: string }[];
  summary: string;
  keyProvisions: string[];
  practitionerNote?: string;
}

export const federalRegulations: FederalRegulation[] = [
  {
    id: "rtt",
    title: "The Federal Right to Try Act",
    citation: "21 U.S.C. § 360bbb-0a | Pub. L. 115-176 (May 30, 2018)",
    fullTextUrl: "https://www.law.cornell.edu/uscode/text/21/360bbb-0a",
    additionalUrls: [
      { label: "FDA Official Guidance", url: "https://www.fda.gov/patients/learn-about-expanded-access-and-other-treatment-options/right-try" },
      { label: "U.S. House Office of Law Revision", url: "https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title21-section360bbb-0a" },
    ],
    summary: "Allows eligible patients with life-threatening conditions to access investigational drugs that have completed Phase 1 clinical trials, without requiring FDA approval.",
    keyProvisions: [
      "Eligible patient: diagnosed with life-threatening disease, exhausted approved options, unable to participate in clinical trial, provided written informed consent.",
      "Eligible investigational drug: Phase 1 completed, not yet approved, active IND or BLA application filed, active development ongoing.",
      "Exempt from sections 352(f), 353(b)(4), 355(a), 355(i) FD&C Act and 351(a) PHS Act, and 21 CFR Parts 50, 56, 312.",
      "No liability for sponsors, manufacturers, prescribers, or dispensers unless reckless/willful misconduct, gross negligence, or intentional tort.",
      "Manufacturer must submit annual summary to FDA: doses supplied, patients treated, uses, serious adverse events.",
    ],
  },
  {
    id: "phs-351",
    title: "Public Health Service Act Section 351 - Biologics Regulation",
    citation: "42 U.S.C. § 262(a) | PHS Act § 351(a)",
    fullTextUrl: "https://www.law.cornell.edu/uscode/text/42/262",
    additionalUrls: [
      { label: "FDA CBER Overview", url: "https://www.fda.gov/vaccines-blood-biologics/biologics-license-applications-bla-process-cber" },
    ],
    summary: "No person shall introduce any biological product into interstate commerce unless a biologics license is in effect and each package is properly labeled.",
    keyProvisions: [
      "Biologics License Application (BLA) required for all biological products in interstate commerce.",
      "Biological product defined: virus, therapeutic serum, toxin, antitoxin, vaccine, blood/blood component, allergenic product, protein, or analogous product.",
      "Packages must be labeled with proper name, manufacturer name/address/license number, and expiration date.",
    ],
    practitionerNote: "Exosome preparations, cell therapies, and tissue-derived biologics meeting this definition require a BLA under 351(a) unless they qualify as minimally manipulated HCT/Ps under 21 CFR Part 1271.",
  },
  {
    id: "hctp",
    title: "21 CFR Part 1271 - HCT/P Definitions and Regulatory Thresholds",
    citation: "21 CFR § 1271.3 | 21 CFR § 1271.10",
    fullTextUrl: "https://www.ecfr.gov/current/title-21/chapter-I/subchapter-L/part-1271",
    summary: "Defines Human Cells, Tissues, and Cellular and Tissue-Based Products (HCT/Ps) and the criteria for regulation solely under Section 361 of the PHS Act.",
    keyProvisions: [
      "HCT/P: articles containing or consisting of human cells or tissues intended for implantation, transplantation, infusion, or transfer into a human recipient.",
      "Minimal manipulation: processing that does not alter original relevant characteristics (structural tissue) or relevant biological characteristics (cells/nonstructural tissues).",
      "361 HCT/P criteria (ALL must be met): minimally manipulated, homologous use only, no combination with another article (except water/crystalloids/sterilizing agents), and either no systemic effect or autologous/first-degree relative/reproductive use.",
    ],
    practitionerNote: "Any HCT/P that FAILS to meet all criteria above, including exosome preparations, allogeneic MSC-derived products, systemically administered cell therapies, and products with more than minimal manipulation, requires a 351(a) BLA.",
  },
  {
    id: "informed-consent",
    title: "21 CFR § 50.25 - Elements of Informed Consent",
    citation: "21 CFR § 50.25",
    fullTextUrl: "https://www.ecfr.gov/current/title-21/chapter-I/subchapter-A/part-50/subpart-B/section-50.25",
    additionalUrls: [
      { label: "FDA Guidance on Informed Consent", url: "https://www.fda.gov/regulatory-information/search-fda-guidance-documents/informed-consent" },
    ],
    summary: "Specifies the basic and additional elements required for legally valid informed consent in research involving human subjects.",
    keyProvisions: [
      "Basic elements: research statement, risks, benefits, alternatives, confidentiality, compensation/treatment for injury, contact information, voluntary participation.",
      "Additional elements: unforeseeable risks, termination circumstances, additional costs, withdrawal consequences, new findings disclosure.",
      "Non-preemption: federal requirements do not preempt state/local laws requiring additional disclosure.",
    ],
  },
  {
    id: "life-threatening",
    title: "21 CFR § 312.81 - Definition: Life-Threatening Condition",
    citation: "21 CFR § 312.81",
    fullTextUrl: "https://www.ecfr.gov/current/title-21/chapter-I/subchapter-D/part-312/subpart-E/section-312.81",
    summary: "Defines life-threatening conditions for purposes of expanded access and Right to Try eligibility.",
    keyProvisions: [
      "Life-threatening: diseases where likelihood of death is high unless course is interrupted, or diseases with potentially fatal outcomes where endpoint is survival.",
      "Immediately life-threatening: reasonable probability of death within months, or premature death likely without early treatment.",
    ],
  },
  {
    id: "rmat",
    title: "RMAT Designation - Regenerative Medicine Advanced Therapy",
    citation: "21 U.S.C. § 356(g) | 21st Century Cures Act, Section 3033",
    fullTextUrl: "https://www.fda.gov/vaccines-blood-biologics/cellular-gene-therapy-products/regenerative-medicine-advanced-therapy-designation",
    additionalUrls: [
      { label: "CBER RMAT Guidance", url: "https://www.fda.gov/media/120267/download" },
    ],
    summary: "Expedited development and review pathway for regenerative medicine therapies with preliminary clinical evidence of addressing unmet medical needs for serious conditions.",
    keyProvisions: [
      "Eligible products: cell therapy, therapeutic tissue engineering product, human cell and tissue product, or combination product.",
      "Requirement: preliminary clinical evidence indicating potential to address unmet medical needs for serious or life-threatening disease.",
      "Benefits: expedited development, priority review, accelerated approval pathway.",
    ],
  },
];

export const stateRegulations: StateRegulation[] = [
  {
    state: "Alabama",
    abbreviation: "AL",
    status: "RTT + Adult SC (IRB)",
    primaryCitation: "Ala. Code § 22-5D-1; SB 16 (2017)",
    operativeLanguage: "SB 16 Sec. 1: Allows investigational adult stem cell therapies to patients with severe chronic or terminal diseases after exhausting other treatment options, with patient informed consent and oversight by an Institutional Review Board. Licensing boards may not sanction licensees following proper protocol.",
    legislativeSource: "https://alison.legislature.state.al.us/",
  },
  {
    state: "Alaska",
    abbreviation: "AK",
    status: "None",
    primaryCitation: "No enacted law",
    operativeLanguage: "No regenerative medicine or stem cell specific legislation enacted as of 2024-2025.",
    legislativeSource: "https://www.akleg.gov/",
  },
  {
    state: "Arizona",
    abbreviation: "AZ",
    status: "hESC Restrictive",
    primaryCitation: "Ariz. Rev. Stat. § 36-2302 to 36-2313",
    operativeLanguage: "§ 36-2302: A person shall not knowingly: (1) Create or attempt to create a human being by somatic cell nuclear transfer; (2) Transfer a product of somatic cell nuclear transfer into a uterine environment; or (3) Use, research, or experiment on a product of somatic cell nuclear transfer. Does not restrict adult stem cell therapies.",
    legislativeSource: "https://www.azleg.gov/",
  },
  {
    state: "Arkansas",
    abbreviation: "AR",
    status: "RTT (SC inclusive)",
    primaryCitation: "Ark. Code § 20-15-2101; SB 185/SB 417/HB 1407",
    operativeLanguage: "§ 20-15-2101 Right to Try: Allows an eligible patient diagnosed with a terminal illness access to investigational drugs after exhausting approved treatments. The law does not explicitly exclude stem cells or regenerative biologics.",
    legislativeSource: "https://www.arkleg.state.ar.us/",
  },
  {
    state: "California",
    abbreviation: "CA",
    status: "Disclosure/Consent Required",
    primaryCitation: "Cal. Health & Safety Code § 24170 et seq.; SB 512 (2017); SB 1495 (2018)",
    operativeLanguage: "SB 512 (Cal. Bus. & Prof. Code § 2290.5): A physician and surgeon who performs or recommends a stem cell therapy that has not been approved by the FDA shall, prior to performing or recommending the therapy, provide the patient with a written disclosure stating that the stem cell therapy has not been approved by the FDA. The patient shall sign the disclosure before receiving the therapy. Violation constitutes unprofessional conduct.",
    legislativeSource: "https://leginfo.legislature.ca.gov/",
  },
  {
    state: "Colorado",
    abbreviation: "CO",
    status: "Cord Blood Funding",
    primaryCitation: "Colo. Rev. Stat. § 25-40-102",
    operativeLanguage: "§ 25-40-102(1)(a): The general assembly finds that cord blood is desirable for use in stem cell transplants because it has a large number of adult blood stem cells. The general assembly establishes the adult stem cells cure fund for advancing umbilical cord blood collection for public blood banks.",
    legislativeSource: "https://leg.colorado.gov/",
  },
  {
    state: "Connecticut",
    abbreviation: "CT",
    status: "Research Permissive",
    primaryCitation: "Conn. Gen. Stat. § 19a-490o; Pub. Act 05-149",
    operativeLanguage: "Pub. Act 05-149: Creates a state stem cell research program. Human embryo research is permitted provided the research is conducted before gastrulation occurs. Prohibits reproductive cloning. Establishes peer review committee with scientific and ethics representation.",
    legislativeSource: "https://www.cga.ct.gov/",
  },
  {
    state: "Delaware",
    abbreviation: "DE",
    status: "None",
    primaryCitation: "No enacted law",
    operativeLanguage: "No regenerative medicine or stem cell specific legislation enacted as of 2024-2025.",
    legislativeSource: "https://legis.delaware.gov/",
  },
  {
    state: "Florida",
    abbreviation: "FL",
    status: "Pending Expansion",
    primaryCitation: "Fla. Stat. § 390.0111(6); SB 1768/HB 1617 (2025)",
    operativeLanguage: "§ 390.0111(6): Experimentation on a fetus for purposes not related to preserving or prolonging the life or health of the fetus is prohibited. 2025 bills SB 1768 and HB 1617 pending: Would authorize licensed practitioners to provide adult stem cell therapies to patients with terminal or chronic illness without FDA approval, with required informed consent.",
    legislativeSource: "https://www.flsenate.gov/",
  },
  {
    state: "Georgia",
    abbreviation: "GA",
    status: "Study Only",
    primaryCitation: "GA SR 1059 (2016) - study committee only",
    operativeLanguage: "SR 1059: A committee shall be created to study issues related to stem cell therapies, including disciplinary action taken against providers. Committee was not appointed and no findings were produced. No enacted substantive law.",
    legislativeSource: "https://www.legis.ga.gov/",
  },
  {
    state: "Hawaii",
    abbreviation: "HI",
    status: "None",
    primaryCitation: "No enacted law",
    operativeLanguage: "No regenerative medicine or stem cell specific legislation enacted as of 2024-2025.",
    legislativeSource: "https://www.capitol.hawaii.gov/",
  },
  {
    state: "Idaho",
    abbreviation: "ID",
    status: "hESC Restrictive",
    primaryCitation: "Idaho Code § 39-9306 (2016)",
    operativeLanguage: "§ 39-9306: No person shall utilize human embryonic stem cells for research, experimentation, or transplant purposes. The prohibition does not apply to research using adult stem cells or cord blood stem cells.",
    legislativeSource: "https://legislature.idaho.gov/",
  },
  {
    state: "Illinois",
    abbreviation: "IL",
    status: "Research Permissive",
    primaryCitation: "410 ILCS 110 (2008); Exec. Order 6 (2005)",
    operativeLanguage: "410 ILCS 110/5: The State shall allow the use of public funds for the derivation and use of human embryonic stem cells from any source; shall create an oversight committee for grants; shall prohibit cloning and the purchase or sale of fetal tissue. The Illinois Regenerative Institute for Stem Cell Research is hereby established.",
    legislativeSource: "https://www.ilga.gov/",
  },
  {
    state: "Indiana",
    abbreviation: "IN",
    status: "hESC Restrictive",
    primaryCitation: "I.C. § 16-18-2-56.5; I.C. § 35-46-5-3(f)",
    operativeLanguage: "I.C. § 35-46-5-3(d): A person who knowingly or intentionally: (1) participates in the cloning of a human being; (2) implants a cloned human embryo into a uterine environment; or (3) uses a human embryo for embryonic stem cell research, commits unlawful use of an embryo.",
    legislativeSource: "https://iga.in.gov/",
  },
  {
    state: "Iowa",
    abbreviation: "IA",
    status: "Mixed",
    primaryCitation: "Iowa Code § 707B.2; 2007 Acts Ch. 6",
    operativeLanguage: "Iowa Code § 707B.2: A person shall not use or attempt to use human somatic cell nuclear transfer to create a human embryo for reproductive purposes. 2007 Acts Ch. 6: Allows researchers to create embryonic stem cells through cloning for research purposes while prohibiting reproductive cloning.",
    legislativeSource: "https://www.legis.iowa.gov/",
  },
  {
    state: "Kansas",
    abbreviation: "KS",
    status: "Adult SC Research",
    primaryCitation: "K.S.A. § 76-3b01 et seq.; SB 199 (2013)",
    operativeLanguage: "SB 199: There is hereby established at the University of Kansas Medical Center an adult stem cell research and patient therapy center. The center shall conduct research on and provide therapies involving adult stem cells and stem cells from umbilical cord blood and amniotic fluid.",
    legislativeSource: "https://www.kslegislature.org/",
  },
  {
    state: "Kentucky",
    abbreviation: "KY",
    status: "None",
    primaryCitation: "No enacted law",
    operativeLanguage: "No regenerative medicine or stem cell specific legislation enacted as of 2024-2025.",
    legislativeSource: "https://legislature.ky.gov/",
  },
  {
    state: "Louisiana",
    abbreviation: "LA",
    status: "RTT with SC Exclusion",
    primaryCitation: "LSA-R.S. 9 § 121; HB 899 (2024)",
    operativeLanguage: "HB 899 § 1(4): 'Individualized investigational treatment' does not include any drug, biological product, or device derived from human primary or secondary embryonic stem cells or cell lines. LSBME Policy: Physicians shall not administer stem cell products unless FDA has (A) approved the product, (B) approved the product as an IND and patient is enrolled in FDA-approved trial, or (C) issued a permissive use disclaimer, or (D) exempted the product from approval.",
    legislativeSource: "https://www.legis.la.gov/",
  },
  {
    state: "Maine",
    abbreviation: "ME",
    status: "hESC Restrictive",
    primaryCitation: "MRS tit. 22, § 1593",
    operativeLanguage: "MRS tit. 22, § 1593: The sale, use, or purchase of human embryos for any type of experimentation is prohibited. This section does not restrict the use of adult stem cells derived from blood, bone marrow, or other non-embryonic sources.",
    legislativeSource: "https://legislature.maine.gov/",
  },
  {
    state: "Maryland",
    abbreviation: "MD",
    status: "Research Permissive",
    primaryCitation: "Md. Code, Health Gen. § 13-2101 et seq.; Stem Cell Act of 2006",
    operativeLanguage: "Md. Stem Cell Research Act: It is the policy of the State that stem cell research conducted in this State should be conducted according to the highest ethical standards and consistent with State and federal law. Research using embryonic stem cells and adult stem cells is permitted. The Maryland Stem Cell Research Commission is established to award grants.",
    legislativeSource: "https://mgaleg.maryland.gov/",
  },
  {
    state: "Massachusetts",
    abbreviation: "MA",
    status: "Research Permissive",
    primaryCitation: "MGL c.111L; 105 CMR 960",
    operativeLanguage: "MGL c.111L § 1: It shall be the policy of the Commonwealth to actively foster research and therapies in the life sciences and regenerative medicine by permitting research and clinical applications involving the derivation and use of human embryonic stem cells, human embryonic germ cells, and human adult stem cells, including those derived from embryos.",
    legislativeSource: "https://malegislature.gov/",
  },
  {
    state: "Michigan",
    abbreviation: "MI",
    status: "Research Permissive (IRB)",
    primaryCitation: "MCL § 333.16275; Mich. Const. Art. I § 27 (2008)",
    operativeLanguage: "Mich. Const. Art. I § 27: Nothing in this section shall alter Michigan's current prohibition on human cloning. Stem cell research and therapies shall be conducted and provided in this state in accordance with state and local laws of general applicability including laws concerning scientific and medical practices. Institutional review board oversight is required.",
    legislativeSource: "https://www.legislature.mi.gov/",
  },
  {
    state: "Minnesota",
    abbreviation: "MN",
    status: "Research Permissive",
    primaryCitation: "Minn. Stat. § 145.422",
    operativeLanguage: "§ 145.422 Subd. 1: A stem cell is the primordial, undifferentiated cell that is the precursor to cells of a particular tissue. Stem cell research for experimentation that scientific evidence has shown to be harmless to the embryo in utero is permitted. State funding is available through Regenerative Medicine Minnesota.",
    legislativeSource: "https://www.leg.mn.gov/",
  },
  {
    state: "Mississippi",
    abbreviation: "MS",
    status: "RTT + Adult MSC",
    primaryCitation: "Miss. Code § 41-7-201 et seq.; SB 2830 (2020)",
    operativeLanguage: "SB 2830: The Right to Try Act is expanded to include treatments with adult mesenchymal stem cells (MSCs) extracted from a patient's own bone marrow. These may be administered to patients with a debilitating disability, traumatic injury, or terminal illness. Written informed consent is required before such treatment. Licensing boards may not take adverse action against practitioners following protocol.",
    legislativeSource: "https://www.legislature.ms.gov/",
  },
  {
    state: "Missouri",
    abbreviation: "MO",
    status: "Research Permissive (Constitutional)",
    primaryCitation: "Mo. Const. Art. III § 38(d); 2006 Ballot Measure",
    operativeLanguage: "Mo. Const. Art. III § 38(d): To ensure that Missouri patients have access to stem cell therapies and cures, that Missouri researchers can conduct stem cell research in the state, and that all such research is conducted safely and ethically, any research permitted under federal law on human pluripotent stem cells or human embryonic stem cells shall be permitted in this state.",
    legislativeSource: "https://www.senate.mo.gov/",
  },
  {
    state: "Montana",
    abbreviation: "MT",
    status: "Research Permissive",
    primaryCitation: "MCA § 50-11-103",
    operativeLanguage: "MCA § 50-11-103: Human reproductive cloning is hereby prohibited. This section shall not prohibit research using embryonic stem cell lines of uncloned origin that are currently approved by the federal government for research purposes.",
    legislativeSource: "https://leg.mt.gov/",
  },
  {
    state: "Nebraska",
    abbreviation: "NE",
    status: "Limited hESC/Adult SC",
    primaryCitation: "Neb. Rev. Stat. § 71-7606; LB 606 (2008)",
    operativeLanguage: "§ 71-7606: Research on human embryonic stem cells is authorized as long as such research is not performed on human embryos obtained from aborted fetuses. LB 606: Researchers at the University of Nebraska Medical Center may continue research on human embryonic stem cell lines using federally approved lines; no state funds and facilities shall be used to destroy or create an embryo for research purposes.",
    legislativeSource: "https://nebraskalegislature.gov/",
  },
  {
    state: "Nevada",
    abbreviation: "NV",
    status: "Expansive / FDA Conflict",
    primaryCitation: "NRS ch. 639 (2023 biologics law); SB 363 (2019)",
    operativeLanguage: "2023 Nevada Law (ch. 639): A licensed health care provider may administer or provide to a patient a biological product or gene therapy that has not been approved by the FDA, provided the product is manufactured in compliance with applicable state health and safety standards and the patient provides written informed consent acknowledging that the product has not received FDA approval. This law creates a direct conflict with federal jurisdiction over biologics under the FDC Act.",
    legislativeSource: "https://www.leg.state.nv.us/",
  },
  {
    state: "New Hampshire",
    abbreviation: "NH",
    status: "Limited Embryo Research",
    primaryCitation: "N.H. Rev. Stat. § 168-B:15",
    operativeLanguage: "§ 168-B:15: An in vitro human embryo may be used in research conducted prior to uterine transfer as long as the research complies with federal and state law.",
    legislativeSource: "https://www.gencourt.state.nh.us/",
  },
  {
    state: "New Jersey",
    abbreviation: "NJ",
    status: "Research Permissive",
    primaryCitation: "N.J. Stat. § 26:2Z-2; Stem Cell Research Bond Act (2007)",
    operativeLanguage: "N.J. Stat. § 26:2Z-2: Research involving the derivation and use of human embryonic stem cells, human embryonic germ cells, and human adult stem cells, including somatic cell nuclear transplantation, is permitted in this State. The New Jersey Stem Cell Research Fund provides grants for stem cell research.",
    legislativeSource: "https://www.njleg.state.nj.us/",
  },
  {
    state: "New Mexico",
    abbreviation: "NM",
    status: "hESC Restrictive",
    primaryCitation: "NMSA § 24-9A-3",
    operativeLanguage: "§ 24-9A-3: No person shall knowingly engage in the conduct of experimentation on a live unborn human being, except when the experimentation relates to the continuation of the normal pregnancy of that particular live unborn human being.",
    legislativeSource: "https://www.nmlegis.gov/",
  },
  {
    state: "New York",
    abbreviation: "NY",
    status: "Research Permissive",
    primaryCitation: "N.Y. Pub. Health Law § 265-a; NYSTEM",
    operativeLanguage: "N.Y. Pub. Health Law § 265-a: The New York State Stem Cell Science program is hereby established to make grants for basic, applied, translational, or other research activities that will advance scientific discoveries related to stem cell biology and develop new therapies for serious diseases. Reproductive cloning of a human being is prohibited.",
    legislativeSource: "https://www.nysenate.gov/",
  },
  {
    state: "North Carolina",
    abbreviation: "NC",
    status: "RTT + Adult SC (IRB)",
    primaryCitation: "N.C. Gen. Stat. § 90-321.10; HB 934 (2020)",
    operativeLanguage: "HB 934 § 90-321.10: A licensed physician may administer investigational adult stem cell treatments to a patient diagnosed with a terminal or chronic illness after all other options have been exhausted, provided: (1) written informed consent is obtained, (2) an Institutional Review Board has approved or is overseeing the protocol, and (3) no private sale or purchase of adult stem cells is involved.",
    legislativeSource: "https://www.ncleg.gov/",
  },
  {
    state: "North Dakota",
    abbreviation: "ND",
    status: "Cloning Prohibition",
    primaryCitation: "N.D. Cent. Code § 14-02.2-01",
    operativeLanguage: "§ 14-02.2-01: Human cloning is prohibited. For the purposes of this section, 'human cloning' means the attempt to create a human being by somatic cell nuclear transfer. This section does not prohibit in vitro fertilization or the use of embryos created through in vitro fertilization for research purposes.",
    legislativeSource: "https://www.legis.nd.gov/",
  },
  {
    state: "Ohio",
    abbreviation: "OH",
    status: "Cloning Prohibition",
    primaryCitation: "Ohio Rev. Code § 2919.14",
    operativeLanguage: "§ 2919.14(A): No person shall purchase or sell a human fetus or embryo. § 2919.16: No person shall engage in or attempt to engage in human reproductive cloning. The Ohio Medical Board has noted the absence of stem cell therapy oversight regulations.",
    legislativeSource: "https://www.legislature.ohio.gov/",
  },
  {
    state: "Oklahoma",
    abbreviation: "OK",
    status: "Adult SC Research",
    primaryCitation: "OK HB 3126 (2024); 63 Okl. St. § 1-730.1 et seq.",
    operativeLanguage: "HB 3126: The legislature hereby authorizes safe and ethical research on adult stem cells and stem cells from umbilical cord blood and amniotic fluid. No person shall conduct research using a human embryo. The Oklahoma Stem Cell Research Act encourages research and clinical application of non-embryonic stem cells.",
    legislativeSource: "https://www.oklegislature.gov/",
  },
  {
    state: "Oregon",
    abbreviation: "OR",
    status: "None",
    primaryCitation: "No enacted law",
    operativeLanguage: "No regenerative medicine or stem cell specific legislation enacted as of 2024-2025. 2007 HB 2801 died in committee.",
    legislativeSource: "https://www.oregonlegislature.gov/",
  },
  {
    state: "Pennsylvania",
    abbreviation: "PA",
    status: "Policy Only",
    primaryCitation: "No enacted law",
    operativeLanguage: "No enacted state legislation. The Pennsylvania Medical Society endorses human stem cell research including embryonic, adult, and cord blood stem cells. No licensing board enforcement action framework enacted.",
    legislativeSource: "https://www.legis.state.pa.us/",
  },
  {
    state: "Rhode Island",
    abbreviation: "RI",
    status: "None",
    primaryCitation: "No enacted law",
    operativeLanguage: "No regenerative medicine or stem cell specific legislation enacted as of 2024-2025.",
    legislativeSource: "https://www.rilegislature.gov/",
  },
  {
    state: "South Carolina",
    abbreviation: "SC",
    status: "None",
    primaryCitation: "No enacted law",
    operativeLanguage: "No enacted law. 2008 SC S 173 died in committee. State medical board has issued advisory opinion. No enforcement framework enacted.",
    legislativeSource: "https://www.scstatehouse.gov/",
  },
  {
    state: "South Dakota",
    abbreviation: "SD",
    status: "hESC Prohibited/Adult SC Permitted",
    primaryCitation: "SDLRC § 34-14-18",
    operativeLanguage: "§ 34-14-18: No person may, for any purpose, knowingly conduct nontherapeutic research that destroys a human embryo or that subjects a human embryo to substantial risk of injury or death. Human non-embryonic (somatic or adult) stem cells are legal to use for approved purposes.",
    legislativeSource: "https://sdlegislature.gov/",
  },
  {
    state: "Tennessee",
    abbreviation: "TN",
    status: "Cord Blood Donation",
    primaryCitation: "Tenn. Code § 68-32-105",
    operativeLanguage: "§ 68-32-105: A mother who delivers a child may donate the umbilical cord blood and placenta of the child following delivery. The donation may be made to a public or private cord blood bank for research, therapeutic purposes, or for potential use in the treatment of disease.",
    legislativeSource: "https://www.capitol.tn.gov/",
  },
  {
    state: "Texas",
    abbreviation: "TX",
    status: "RTT + Adult SC (IRB)",
    primaryCitation: "Tex. Health & Safety Code § 161.101 et seq.; HB 810 (2018); HB 3148 (2019); 22 Tex. Admin. Code § 198.6",
    operativeLanguage: "HB 810 § 161.101: A physician licensed in this state may, with the consent of the patient, administer an investigational adult stem cell treatment to a patient diagnosed with a severe chronic or terminal illness if all other options have been exhausted, the treatment is overseen by an Institutional Review Board, and written informed consent is obtained. Licensing boards may not revoke, fail to renew, or suspend the license of a physician for administering such treatment in compliance with this chapter. HB 3148: Establishes the state investigational stem cell treatment registry administered by DSHS.",
    legislativeSource: "https://capitol.texas.gov/",
  },
  {
    state: "Utah",
    abbreviation: "UT",
    status: "Expansive / FDA Conflict",
    primaryCitation: "Utah Code § 58-85-101 et seq. (RTT); SB 199 (2024); Utah Code § 26B-1-426",
    operativeLanguage: "SB 199 (effective May 1, 2024): A health care provider shall not administer a stem cell therapy not approved by the FDA unless, before administering the therapy, the provider (1) provides the patient or patient's representative a written notice prominently stating 'THIS STEM CELL TREATMENT HAS NOT BEEN APPROVED BY THE FOOD AND DRUG ADMINISTRATION'; and (2) obtains signed written informed consent. Advertising for such therapy must include the FDA non-approval disclosure. SB 199 applies to placental and perinatal stem cell therapies.",
    legislativeSource: "https://le.utah.gov/",
  },
  {
    state: "Vermont",
    abbreviation: "VT",
    status: "Disclosure/Consent Required",
    primaryCitation: "Vt. Stat. Ann. tit. 18, § 4501; Act 61 (2021)",
    operativeLanguage: "Act 61 (codified at tit. 18, § 4501): A health care practitioner who administers an FDA-unapproved stem cell-related treatment shall, before beginning treatment: (1) provide a standardized written notice stating the treatment is not FDA approved; and (2) obtain signed, informed consent from the patient or authorized representative. A practitioner shall not advertise such therapy without disclosing non-approval status. Failure to comply constitutes unprofessional conduct subject to board discipline.",
    legislativeSource: "https://legislature.vermont.gov/",
  },
  {
    state: "Virginia",
    abbreviation: "VA",
    status: "Research Permissive",
    primaryCitation: "Va. Code § 32.1-162.22; Va. Code § 32.1-162.31",
    operativeLanguage: "§ 32.1-162.22: Human reproductive cloning is prohibited. Research on cloned human embryos is permitted. There is no limit specified for culturing embryos in vitro. § 32.1-162.31: The Christopher Reeve Stem Cell Research Fund is established to support medical and biomedical stem cell research at institutions of higher education in the Commonwealth relating to the causes and cures of disease.",
    legislativeSource: "https://lis.virginia.gov/",
  },
  {
    state: "Washington",
    abbreviation: "WA",
    status: "Disclosure/Consent Required",
    primaryCitation: "RCW § 18.130.420; HB 2356 (2019)",
    operativeLanguage: "RCW § 18.130.420: A licensed provider who performs a stem cell therapy that has not been approved by the FDA shall, before performing the therapy: (1) provide the patient with written notice that the therapy has not been approved by the FDA; and (2) obtain written informed consent from the patient or authorized representative. Failure to provide notice or obtain consent is unprofessional conduct.",
    legislativeSource: "https://app.leg.wa.gov/",
  },
  {
    state: "West Virginia",
    abbreviation: "WV",
    status: "None",
    primaryCitation: "No enacted law",
    operativeLanguage: "No regenerative medicine or stem cell specific legislation enacted as of 2024-2025.",
    legislativeSource: "https://www.wvlegislature.gov/",
  },
  {
    state: "Wisconsin",
    abbreviation: "WI",
    status: "University Research",
    primaryCitation: "No enacted law (University research active)",
    operativeLanguage: "No enacted patient access legislation. University of Wisconsin has significant stem cell research programs. No specific state law governs clinical administration of regenerative therapies outside of standard medical practice law.",
    legislativeSource: "https://docs.legis.wisconsin.gov/",
  },
  {
    state: "Wyoming",
    abbreviation: "WY",
    status: "None",
    primaryCitation: "No enacted law",
    operativeLanguage: "No regenerative medicine or stem cell specific legislation enacted as of 2024-2025.",
    legislativeSource: "https://wyoleg.gov/",
  },
];

// Status color mapping for UI
export const statusColors: Record<StateStatus, { bg: string; text: string; border: string }> = {
  "RTT + Adult SC (IRB)": { bg: "bg-green-100", text: "text-green-800", border: "border-green-300" },
  "RTT (SC inclusive)": { bg: "bg-green-50", text: "text-green-700", border: "border-green-200" },
  "RTT + Adult MSC": { bg: "bg-emerald-100", text: "text-emerald-800", border: "border-emerald-300" },
  "RTT with SC Exclusion": { bg: "bg-orange-100", text: "text-orange-800", border: "border-orange-300" },
  "Disclosure/Consent Required": { bg: "bg-blue-100", text: "text-blue-800", border: "border-blue-300" },
  "Expansive / FDA Conflict": { bg: "bg-red-100", text: "text-red-800", border: "border-red-300" },
  "Research Permissive": { bg: "bg-indigo-100", text: "text-indigo-800", border: "border-indigo-300" },
  "Research Permissive (IRB)": { bg: "bg-indigo-50", text: "text-indigo-700", border: "border-indigo-200" },
  "Research Permissive (Constitutional)": { bg: "bg-indigo-100", text: "text-indigo-800", border: "border-indigo-300" },
  "hESC Restrictive": { bg: "bg-amber-100", text: "text-amber-800", border: "border-amber-300" },
  "hESC Prohibited/Adult SC Permitted": { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
  "Limited hESC/Adult SC": { bg: "bg-yellow-100", text: "text-yellow-800", border: "border-yellow-300" },
  "Limited Embryo Research": { bg: "bg-yellow-50", text: "text-yellow-700", border: "border-yellow-200" },
  "Adult SC Research": { bg: "bg-teal-100", text: "text-teal-800", border: "border-teal-300" },
  "Cord Blood Funding": { bg: "bg-cyan-100", text: "text-cyan-800", border: "border-cyan-300" },
  "Cord Blood Donation": { bg: "bg-cyan-50", text: "text-cyan-700", border: "border-cyan-200" },
  "Cloning Prohibition": { bg: "bg-gray-100", text: "text-gray-800", border: "border-gray-300" },
  "Study Only": { bg: "bg-gray-50", text: "text-gray-600", border: "border-gray-200" },
  "Policy Only": { bg: "bg-gray-50", text: "text-gray-600", border: "border-gray-200" },
  "University Research": { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200" },
  "Pending Expansion": { bg: "bg-sky-100", text: "text-sky-800", border: "border-sky-300" },
  "Mixed": { bg: "bg-gray-100", text: "text-gray-700", border: "border-gray-300" },
  "None": { bg: "bg-gray-50", text: "text-gray-500", border: "border-gray-200" },
};
