import { useState } from "react";

const P = {
  bg: "#0a0a0f",
  bgCard: "rgba(168,85,247,0.04)",
  bgSection: "#0d0d14",
  primary: "#a855f7",
  primaryDim: "rgba(168,85,247,0.15)",
  accent: "#e879f9",
  text: "#e2e2e8",
  textMuted: "#9898a8",
  textDim: "#6b6b7b",
  border: "rgba(168,85,247,0.12)",
  borderLight: "rgba(255,255,255,0.06)",
  danger: "#ef4444",
  dangerDim: "rgba(239,68,68,0.08)",
  warning: "#f59e0b",
  warningDim: "rgba(245,158,11,0.08)",
  gold: "#d4a843",
};

interface Disclaimer {
  number: number;
  title: string;
  intendedUse: string;
  body: string[];
}

const DISCLAIMERS: Disclaimer[] = [
  {
    number: 1,
    title: "Master Regulatory Disclosure",
    intendedUse: "Product literature, websites, sales decks, brochures, and any communication describing exosome products or services.",
    body: [
      "[PRODUCT NAME] is a Wharton's Jelly mesenchymal stem cell-derived exosome biologic regulated under Section 351(a) of the Public Health Service Act. This product has not received approval, licensure, or clearance from the United States Food and Drug Administration. The product is not for sale or distribution in interstate commerce for human therapeutic use outside an authorized Investigational New Drug application, an IRB-approved clinical investigation, a Right to Try Act-compliant pathway, or an Expanded Access protocol filed with the FDA Center for Biologics Evaluation and Research.",
      "No statement in this material has been evaluated by the FDA. No claim of cure, treatment, prevention, mitigation, or diagnosis of any disease or medical condition is asserted. References to preclinical or clinical research describe the published scientific literature and do not represent endorsement, indication, or label claim for any product.",
      "Use of this product remains within the independent medical judgment of a licensed physician operating within the scope of state-licensed medical practice. The treating physician bears sole responsibility for diagnosis, treatment selection, informed consent, and patient outcomes.",
    ],
  },
  {
    number: 2,
    title: "Physician-Facing Scientific Exchange",
    intendedUse: "Materials directed exclusively to licensed healthcare professionals, including sales aids and clinical bulletins.",
    body: [
      "This material is intended solely for licensed physicians and healthcare professionals authorized to prescribe and administer biological products under applicable federal and state law. The content is scientific exchange and is not promotional. The product described is not FDA-approved, FDA-licensed, or FDA-cleared. No representation is made regarding the safety or efficacy of this product for any specific indication.",
      "Selection, prescription, and administration of this product remain the exclusive responsibility of the treating physician based on independent medical judgment, the specific clinical context of an individual patient, and applicable standards of care. Distribution, transfer, or republication of this material to patients, the public, or non-licensed parties is prohibited.",
    ],
  },
  {
    number: 3,
    title: "Patient Informed Consent Supplement",
    intendedUse: "Addendum to procedure-specific informed consent. Read aloud and signed by the patient before treatment.",
    body: [
      "You are receiving information about a product known as [PRODUCT NAME], a biologic derived from Wharton's Jelly mesenchymal stem cell-conditioned media. This product has not been approved, licensed, or cleared by the United States Food and Drug Administration for the treatment, cure, prevention, or diagnosis of any disease or medical condition.",
      "The treatment your physician has recommended represents an exercise of independent medical judgment within the scope of state-licensed practice. The procedure does not appear in FDA-approved labeling for any commercial product. Clinical outcomes are not guaranteed. Adverse events reported with biologic injections include local pain, swelling, infection, allergic reaction, and serious systemic events including, in rare cases, hospitalization.",
      "You acknowledge that you have received and understood this disclosure, that all questions have been answered, and that you accept the procedure based on the recommendation of your treating physician.",
      "Patient signature: ____________________________ Date: __________\nWitness signature: ____________________________ Date: __________",
    ],
  },
  {
    number: 4,
    title: "Website Footer and Digital Media",
    intendedUse: "Every page of a website, social media bio, podcast description, video description, and digital marketing channel.",
    body: [
      "The information on this website describes biological research products and services rendered under the supervision of licensed physicians. Statements have not been evaluated by the FDA. Products discussed are not approved, licensed, or cleared by the FDA for the diagnosis, treatment, cure, mitigation, or prevention of disease. Content presented is for general informational purposes and does not constitute medical advice. Reliance on any information for medical decisions is at the user's own risk. Consult a licensed physician for diagnosis and treatment.",
    ],
  },
  {
    number: 5,
    title: "Investigational Product Notice",
    intendedUse: "Product administered exclusively under an active IND or IRB-approved clinical protocol. Required by 21 CFR 312.6.",
    body: [
      "CAUTION: New Drug. Limited by Federal (or United States) law to investigational use.",
      "This product is administered exclusively under FDA-authorized Investigational New Drug application IND [number] and IRB-approved protocol [number]. Use outside this protocol is prohibited. The product has not been licensed or approved for any indication. Subjects participate under written informed consent that complies with 21 CFR Part 50, 21 CFR Part 56, and the principles of the Belmont Report. All adverse events are reported in accordance with 21 CFR 312.32 and the protocol-specific safety plan.",
    ],
  },
  {
    number: 6,
    title: "Research Use Only",
    intendedUse: "Laboratory product literature where the product is sold strictly for non-clinical, in vitro research only.",
    body: [
      "FOR RESEARCH USE ONLY. NOT FOR USE IN HUMANS OR ANIMALS IN A CLINICAL SETTING. NOT FOR USE IN DIAGNOSTIC PROCEDURES.",
      "This product is a non-sterile, non-validated reagent intended exclusively for in vitro research. Distribution to or use by clinicians for any human or veterinary therapeutic application is prohibited and constitutes an unauthorized intended use under 21 CFR 201.128. The seller disclaims all warranties, express or implied, including merchantability and fitness for a particular purpose, to the maximum extent permitted by law.",
    ],
  },
  {
    number: 7,
    title: "Adverse Event Reporting",
    intendedUse: "Package inserts, treatment summaries, patient discharge handouts, and any post-treatment communication.",
    body: [
      "Healthcare providers and patients are encouraged to report adverse events associated with biological products to the FDA MedWatch program at 1-800-FDA-1088 or online at www.fda.gov/medwatch. Reports involving regenerative medicine products should additionally be directed to the Center for Biologics Evaluation and Research, Office of Communication, Outreach, and Development, by email at ocod@fda.hhs.gov. Texas-licensed physicians have additional state reporting obligations under 22 TAC § 190.8.",
    ],
  },
  {
    number: 8,
    title: "No Endorsement",
    intendedUse: "Materials referencing third-party research, government databases, peer-reviewed literature, or named institutions.",
    body: [
      "References to scientific literature, university research, government databases, or third-party studies appear for informational purposes only. No endorsement, sponsorship, or affiliation with any cited author, institution, journal, or government agency is implied. Cited sources do not approve or endorse [PRODUCT NAME] or any commercial application of the underlying research. The appearance of any logo, trademark, or institutional name does not imply collaboration or licensing.",
    ],
  },
  {
    number: 9,
    title: "No Guaranteed Outcome",
    intendedUse: "Consent forms, patient education materials, marketing collateral, and any publication featuring patient outcomes.",
    body: [
      "Individual response to regenerative medicine procedures varies. No representation, warranty, or guarantee is made regarding clinical outcome, symptom relief, functional improvement, or duration of effect. Results from prior patients do not predict the response of a future patient. Testimonial content represents the personal experience of the individual featured and is not typical or generalizable. Photographs, before-and-after imagery, and case summaries are not representations of expected results.",
    ],
  },
  {
    number: 10,
    title: "Jurisdiction, Governing Law, and Severability",
    intendedUse: "Bound agreements, standalone disclosures, and any document executed by the patient or counterparty.",
    body: [
      "This disclosure is governed by the laws of the State of Texas without regard to conflict of law principles. If any provision is determined by a court of competent jurisdiction to be unenforceable, the remaining provisions remain in full force and effect. Disputes are subject to the exclusive jurisdiction of the state and federal courts located in Dallas County, Texas.",
    ],
  },
];

const DEPLOYMENT_TABLE = [
  { disclaimer: "1. Master Regulatory", where: "Sales decks, brochures, websites, product literature", trigger: "Any external communication" },
  { disclaimer: "2. Physician Scientific", where: "HCP-only sales aids, clinical bulletins, gated portals", trigger: "NPI-verified audience" },
  { disclaimer: "3. Patient Consent", where: "Procedure informed consent packet", trigger: "Before patient signature" },
  { disclaimer: "4. Website Footer", where: "Every page footer, social bios, video descriptions", trigger: "Public web presence" },
  { disclaimer: "5. Investigational", where: "Product label and protocol documents", trigger: "Active IND only" },
  { disclaimer: "6. Research Use Only", where: "Lab reagent product packaging", trigger: "Non-clinical sale only" },
  { disclaimer: "7. Adverse Event", where: "Package insert, discharge handouts", trigger: "Every post-treatment doc" },
  { disclaimer: "8. No Endorsement", where: "Citation sections, reference lists", trigger: "Third-party research cited" },
  { disclaimer: "9. No Guarantee", where: "Consent forms, marketing pieces", trigger: "Outcomes referenced" },
  { disclaimer: "10. Jurisdiction", where: "Standalone disclosures, signed agreements", trigger: "Executed contracts" },
];

const WARNING_TERMS = [
  { term: '"FDA Registered" or "FDA Listed"', reason: "Establishment registration is not approval. FDA treats this as deceptive." },
  { term: '"Cures" or "Reverses" any disease', reason: "Establishes drug intent. Triggers BLA requirement under 351(a)." },
  { term: '"Anti-aging" or "Tissue regeneration"', reason: "Disease claim. Triggers Unapproved New Drug status." },
  { term: '"Safe and effective" without approval', reason: "False efficacy claim. Section 502(a) misbranding." },
  { term: '"Treats COVID, Alzheimer\'s, autism, etc."', reason: "Non-homologous use. Documented in 2019 and 2024 Warning Letters." },
  { term: '"Administered by chiropractor / naturopath"', reason: "Outside scope of biologic administration. Triggers state board referral." },
  { term: '"Patented stem cell technology"', reason: "Patents do not equate to FDA approval and conflate IP with regulatory status." },
];

const AUTHORITY_REFS = [
  "Section 351(a), Public Health Service Act, 42 U.S.C. § 262",
  "Federal Food, Drug, and Cosmetic Act, 21 U.S.C. §§ 321, 331, 351, 352, 355",
  "21 CFR Part 50 (Protection of Human Subjects)",
  "21 CFR Part 56 (IRBs)",
  "21 CFR Part 312 (IND)",
  "21 CFR Part 1271 (HCT/Ps)",
  "21 CFR 201.128 (Intended Use)",
  "21 CFR 312.6 (Investigational labeling)",
  "21 CFR 312.32 (IND safety reporting)",
  "21 CFR 610.12 (Sterility)",
  "FDA Guidance on Regenerative Medicine Therapies (2017 framework, periodic updates)",
  "FDA Public Safety Notification on Exosome Products (December 6, 2019, and subsequent CBER alerts)",
  "21st Century Cures Act, Section 3033, Regenerative Medicine Advanced Therapy designation",
  "Texas Health and Safety Code § 243",
  "22 TAC §§ 165, 166, 190",
  "United States v. Caronia, 703 F.3d 149 (2d Cir. 2012)",
  "Amarin Pharma, Inc. v. FDA, 119 F. Supp. 3d 196 (S.D.N.Y. 2015)",
];

export function Disclaimers() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [expandAll, setExpandAll] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const copyToClipboard = (d: Disclaimer) => {
    const text = `DISCLAIMER ${d.number}: ${d.title.toUpperCase()}\n\nIntended Use: ${d.intendedUse}\n\n${d.body.join("\n\n")}`;
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(d.number);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const toggleDisclaimer = (num: number) => {
    if (expandAll) {
      setExpandAll(false);
      setExpandedId(num);
    } else {
      setExpandedId(expandedId === num ? null : num);
    }
  };

  const toggleAll = () => {
    setExpandAll(!expandAll);
    setExpandedId(null);
  };

  const isExpanded = (num: number) => expandAll || expandedId === num;

  return (
    <div style={{ color: P.text }}>
      {/* Header */}
      <div style={{
        background: `linear-gradient(135deg, rgba(168,85,247,0.08) 0%, rgba(232,121,249,0.04) 100%)`,
        border: `1px solid ${P.border}`,
        borderRadius: "10px",
        padding: "20px",
        marginBottom: "16px",
      }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "8px" }}>
          <div style={{
            width: "32px", height: "32px", borderRadius: "8px",
            background: P.primaryDim, display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "16px", flexShrink: 0,
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={P.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="12" y1="18" x2="12" y2="12" />
              <line x1="9" y1="15" x2="15" y2="15" />
            </svg>
          </div>
          <div>
            <h2 style={{ fontSize: "18px", fontWeight: 700, margin: "0 0 4px", color: P.text }}>
              FDA / CBER Regulatory Disclaimer Framework
            </h2>
            <p style={{ color: P.textMuted, fontSize: "12px", margin: "0 0 2px", lineHeight: 1.5 }}>
              Mesenchymal Exosome Products and Regenerative Medicine Services
            </p>
            <p style={{ color: P.textDim, fontSize: "11px", margin: 0 }}>
              Prepared by Office of Regulatory Counsel | Effective April 26, 2026
            </p>
          </div>
        </div>
      </div>

      {/* Expand/Collapse All */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h3 style={{ fontSize: "14px", fontWeight: 700, color: P.text, margin: 0 }}>
          10 Disclaimers
        </h3>
        <button onClick={toggleAll} style={{
          background: P.primaryDim, border: `1px solid ${P.border}`, color: P.primary,
          padding: "5px 12px", borderRadius: "6px", fontSize: "11px", fontWeight: 600,
          cursor: "pointer", transition: "all 0.2s",
        }}>
          {expandAll ? "Collapse All" : "Expand All"}
        </button>
      </div>

      {/* Disclaimer Cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "20px" }}>
        {DISCLAIMERS.map((d) => (
          <div key={d.number} style={{
            background: isExpanded(d.number) ? P.bgCard : P.bgSection,
            border: `1px solid ${isExpanded(d.number) ? P.border : P.borderLight}`,
            borderRadius: "12px",
            overflow: "hidden",
            transition: "all 0.3s ease",
          }}>
            {/* Header row */}
            <button onClick={() => toggleDisclaimer(d.number)} style={{
              width: "100%", display: "flex", alignItems: "center", gap: "10px",
              padding: "10px 14px", background: "none", border: "none", cursor: "pointer",
              textAlign: "left",
            }}>
              <span style={{
                width: "24px", height: "24px", borderRadius: "5px",
                background: isExpanded(d.number) ? P.primary : P.primaryDim,
                color: isExpanded(d.number) ? "#fff" : P.primary,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "11px", fontWeight: 700, flexShrink: 0,
                transition: "all 0.3s",
              }}>
                {d.number}
              </span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "12px", fontWeight: 600, color: P.text }}>{d.title}</div>
                <div style={{ fontSize: "10px", color: P.textDim, marginTop: "2px" }}>{d.intendedUse}</div>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={P.textMuted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{
                transform: isExpanded(d.number) ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.3s",
                flexShrink: 0,
              }}>
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {/* Expanded body */}
            {isExpanded(d.number) && (
              <div style={{
                padding: "0 14px 14px 48px",
                borderTop: `1px solid ${P.borderLight}`,
              }}>
                <div style={{ paddingTop: "10px" }}>
                  <div style={{
                    display: "inline-block",
                    background: P.primaryDim,
                    color: P.primary,
                    fontSize: "9px",
                    fontWeight: 600,
                    padding: "2px 6px",
                    borderRadius: "3px",
                    marginBottom: "8px",
                    letterSpacing: "0.04em",
                  }}>
                    INTENDED USE: {d.intendedUse}
                  </div>
                  {d.body.map((para, i) => (
                    <p key={i} style={{
                      color: P.text,
                      fontSize: "11px",
                      lineHeight: 1.6,
                      margin: i < d.body.length - 1 ? "0 0 6px" : "0",
                      whiteSpace: para.includes("____") ? "pre-line" : undefined,
                    }}>
                      {para}
                    </p>
                  ))}
                  {/* Copy to Clipboard */}
                  <div style={{ marginTop: "10px", paddingTop: "8px", borderTop: `1px solid ${P.borderLight}` }}>
                    <button
                      onClick={(e) => { e.stopPropagation(); copyToClipboard(d); }}
                      style={{
                        display: "inline-flex", alignItems: "center", gap: "8px",
                        background: copiedId === d.number ? "rgba(34,197,94,0.12)" : P.primaryDim,
                        border: `1px solid ${copiedId === d.number ? "rgba(34,197,94,0.3)" : P.border}`,
                        color: copiedId === d.number ? "#22c55e" : P.primary,
                        padding: "4px 10px", borderRadius: "5px", fontSize: "10px", fontWeight: 600,
                        cursor: "pointer", transition: "all 0.2s",
                      }}
                    >
                      {copiedId === d.number ? (
                        <>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                          Copied
                        </>
                      ) : (
                        <>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
                          Copy to Clipboard
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Operational Deployment Guidance */}
      <div style={{
        background: P.bgCard,
        border: `1px solid ${P.border}`,
        borderRadius: "8px",
        padding: "16px",
        marginBottom: "16px",
      }}>
        <h3 style={{ fontSize: "13px", fontWeight: 700, color: P.primary, margin: "0 0 10px", letterSpacing: "0.04em" }}>
          OPERATIONAL DEPLOYMENT GUIDANCE
        </h3>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
            <thead>
              <tr>
                {["Disclaimer", "Where It Goes", "Trigger to Add"].map((h) => (
                  <th key={h} style={{
                    textAlign: "left", padding: "6px 10px",
                    borderBottom: `2px solid ${P.border}`,
                    color: P.textMuted, fontWeight: 600, fontSize: "9px",
                    letterSpacing: "0.06em", textTransform: "uppercase",
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {DEPLOYMENT_TABLE.map((row, i) => (
                <tr key={i} style={{ borderBottom: `1px solid ${P.borderLight}` }}>
                  <td style={{ padding: "6px 10px", color: P.text, fontWeight: 600, fontSize: "11px" }}>{row.disclaimer}</td>
                  <td style={{ padding: "6px 10px", color: P.textMuted, fontSize: "11px" }}>{row.where}</td>
                  <td style={{ padding: "6px 10px" }}>
                    <span style={{
                      background: P.primaryDim, color: P.primary,
                      padding: "2px 6px", borderRadius: "3px", fontSize: "10px", fontWeight: 500,
                    }}>{row.trigger}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── DISCLAIMERS MOVED TO BOTTOM ── */}

      {/* Regulatory Reality */}
      <div style={{
        background: P.bgCard,
        border: `1px solid ${P.border}`,
        borderRadius: "8px",
        padding: "16px",
        marginBottom: "16px",
      }}>
        <h3 style={{ fontSize: "13px", fontWeight: 700, color: P.primary, margin: "0 0 8px", letterSpacing: "0.04em" }}>
          REGULATORY REALITY
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <p style={{ color: P.text, fontSize: "11px", lineHeight: 1.6, margin: 0 }}>
            As of the date above, the United States Food and Drug Administration has approved zero exosome products for therapeutic use in humans. Wharton's Jelly mesenchymal stem cell-derived exosomes intended for systemic administration, injection, implantation, or any therapeutic indication fall within the definition of a biological product under Section 351(a) of the Public Health Service Act, 42 U.S.C. § 262(i). Distribution in interstate commerce without an approved Biologics License Application is unlawful.
          </p>
          <p style={{ color: P.text, fontSize: "11px", lineHeight: 1.6, margin: 0 }}>
            A Drug Master File on file with the FDA does not equate to product approval. A DMF is a confidential reference document that supports a future BLA submission. It does not authorize commercial distribution.
          </p>
          <p style={{ color: P.text, fontSize: "11px", lineHeight: 1.6, margin: 0 }}>
            Disclaimer language reduces but does not eliminate enforcement risk. Disclaimers do not immunize unlawful marketing, off-label promotion of unapproved drugs, or distribution of unlicensed biological products. Pair the language below with strict operational compliance: IND-authorized clinical investigation, IRB oversight where applicable, Right to Try or Expanded Access pathways, or genuine practice of medicine confined to the treating physician.
          </p>
        </div>
      </div>

      {/* What Disclaimers Do Not Fix */}
      <div style={{
        background: P.dangerDim,
        border: `1px solid rgba(239,68,68,0.2)`,
        borderRadius: "8px",
        padding: "16px",
        marginBottom: "16px",
      }}>
        <h3 style={{ fontSize: "13px", fontWeight: 700, color: P.danger, margin: "0 0 8px", letterSpacing: "0.04em" }}>
          WHAT DISCLAIMERS DO NOT FIX
        </h3>
        <p style={{ color: P.text, fontSize: "11px", lineHeight: 1.6, margin: "0 0 8px" }}>
          Disclaimer language does not authorize any of the following. Do not rely on disclaimers as a substitute for the underlying lawful pathway.
        </p>
        <ul style={{ margin: 0, padding: "0 0 0 16px", display: "flex", flexDirection: "column", gap: "4px" }}>
          {[
            "Interstate distribution of unlicensed biological products under Section 351(a) of the Public Health Service Act.",
            "Promotion of unapproved drugs for therapeutic indications under Section 502(f) of the Federal Food, Drug, and Cosmetic Act.",
            "Unsubstantiated efficacy claims under Section 5 of the Federal Trade Commission Act.",
            "Marketing of cell or exosome products as cures or treatments outside an approved BLA, an active IND, or a state hospital exemption pathway.",
            "Off-label promotion that exceeds the bounds of physician scientific exchange under FDAMA Section 114 and First Amendment jurisprudence (Caronia, Amarin, Pacira).",
          ].map((item, i) => (
            <li key={i} style={{ color: P.text, fontSize: "11px", lineHeight: 1.5 }}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Language That Triggers Warning Letters */}
      <div style={{
        background: P.bgCard,
        border: `1px solid ${P.border}`,
        borderRadius: "8px",
        padding: "16px",
        marginBottom: "16px",
      }}>
        <h3 style={{ fontSize: "13px", fontWeight: 700, color: P.danger, margin: "0 0 4px", letterSpacing: "0.04em" }}>
          LANGUAGE THAT TRIGGERS WARNING LETTERS
        </h3>
        <p style={{ color: P.textMuted, fontSize: "10px", margin: "0 0 10px", lineHeight: 1.5 }}>
          The following terms appear repeatedly in FDA Warning Letters issued to clinics and manufacturers marketing exosome products. Remove every instance from product literature, social media, and physician communications regardless of whether disclaimers are present.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {WARNING_TERMS.map((wt, i) => (
            <div key={i} className="disclaimer-term-grid" style={{
              display: "grid", gridTemplateColumns: "1fr 2fr", gap: "16px",
              padding: "8px 10px",
              background: i % 2 === 0 ? "rgba(239,68,68,0.04)" : "transparent",
              borderRadius: "8px",
            }}>
              <div style={{ color: P.danger, fontWeight: 600, fontSize: "11px" }}>{wt.term}</div>
              <div style={{ color: P.textMuted, fontSize: "10px", lineHeight: 1.5 }}>{wt.reason}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Attorney Notice */}
      <div style={{
        background: P.warningDim,
        border: `1px solid rgba(245,158,11,0.25)`,
        borderRadius: "8px",
        padding: "14px",
        marginBottom: "16px",
      }}>
        <div style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={P.warning} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: "2px" }}>
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          <div>
            <h3 style={{ fontSize: "12px", fontWeight: 700, color: P.warning, margin: "0 0 4px" }}>
              ATTORNEY NOTICE AND USE LIMITATIONS
            </h3>
            <p style={{ color: P.text, fontSize: "11px", lineHeight: 1.6, margin: 0 }}>
              This document provides template disclaimer language for review and customization by qualified FDA regulatory counsel of record. The content does not constitute legal advice. No attorney-client relationship is formed by access to or use of this material. Each entity should engage retained counsel to review, customize, and approve every disclaimer before deployment in commerce, clinical practice, marketing, or patient-facing communications. Disclaimer language reinforces operational compliance. It does not substitute for it.
            </p>
          </div>
        </div>
      </div>

      {/* Authority References */}
      <div style={{
        background: P.bgCard,
        border: `1px solid ${P.border}`,
        borderRadius: "8px",
        padding: "16px",
        marginBottom: "10px",
      }}>
        <h3 style={{ fontSize: "13px", fontWeight: 700, color: P.primary, margin: "0 0 8px", letterSpacing: "0.04em" }}>
          AUTHORITY REFERENCES
        </h3>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "4px",
        }}>
          {AUTHORITY_REFS.map((ref, i) => (
            <div key={i} style={{
              display: "flex", gap: "10px", alignItems: "flex-start",
              padding: "4px 8px", borderRadius: "4px",
              background: i % 2 === 0 ? "rgba(168,85,247,0.04)" : "transparent",
            }}>
              <span style={{ color: P.primary, fontSize: "12px", marginTop: "2px", flexShrink: 0 }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
              </span>
              <span style={{ color: P.textMuted, fontSize: "10px", lineHeight: 1.4 }}>{ref}</span>
            </div>
          ))}
        </div>
      </div>

      {/* End notice */}
      <div style={{
        textAlign: "center",
        padding: "12px",
        color: P.textDim,
        fontSize: "10px",
        fontStyle: "italic",
      }}>
        End of Disclaimer Framework. Customize and execute under counsel of record before deployment.
      </div>
    </div>
  );
}
