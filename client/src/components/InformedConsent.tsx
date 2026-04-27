import { useState } from "react";
import jsPDF from "jspdf";

const P = {
  primary: "#a855f7",
  primaryLight: "#c084fc",
  primaryDark: "#7c3aed",
  accent: "#e879f9",
  bg: "#0a0a0f",
  bgCard: "#111118",
  border: "rgba(168,85,247,0.2)",
  borderLight: "rgba(168,85,247,0.1)",
  text: "#ffffff",
  textMuted: "rgba(255,255,255,0.5)",
  textDim: "rgba(255,255,255,0.3)",
  glow: "0 0 20px rgba(168,85,247,0.3)",
};

interface FormData {
  clinicName: string;
  clinicAddress: string;
  patientName: string;
  dob: string;
  mrn: string;
  patientSignDate: string;
  patientSignTime: string;
  witnessSignDate: string;
  physicianSignDate: string;
  physicianName: string;
  physicianLicense: string;
}

const SECTIONS = [
  {
    num: "1",
    title: "Product Identification",
    items: [
      "WJ-MSC derived exosomes, biologic product",
      "Regulated under Section 351(a) of the Public Health Service Act",
      "FDA Drug Master File on record with the manufacturer",
      "Manufactured under cGMP (21 CFR 210/211, 21 CFR 600 series)",
      "Investigational status, not FDA-approved for any indication",
    ],
  },
  {
    num: "2",
    title: "Nature of Treatment",
    items: [
      "Acellular biologic containing extracellular vesicles",
      "Routes of administration as ordered by the treating physician",
      "Dose, frequency, and duration documented in the chart",
      "Treatment is elective",
    ],
  },
  {
    num: "3",
    title: "Investigational Disclosure",
    items: [
      "The product has not received a Biologics License Application (BLA) approval",
      "Long-term safety and efficacy are not fully characterized",
      "Outcomes vary between patients",
      "No therapeutic benefit is guaranteed",
    ],
  },
  {
    num: "4",
    title: "Known and Possible Risks",
    items: [
      "Pain, redness, swelling, or bruising at the administration site",
      "Allergic or hypersensitivity reaction, including anaphylaxis",
      "Infection",
      "Fever, chills, headache, fatigue, nausea",
      "Inflammatory or immune response",
      "Vascular events with intravenous administration",
      "Unknown long-term risks",
      "Theoretical risk of tumorigenicity, not observed in published WJ-MSC exosome literature",
    ],
  },
  {
    num: "5",
    title: "Possible Benefits",
    items: [
      "Potential reduction in tissue inflammation",
      "Potential support of tissue repair processes",
      "Potential symptom relief",
      "Benefits are not guaranteed",
    ],
  },
  {
    num: "6",
    title: "Alternatives",
    items: [
      "Standard pharmacologic therapy",
      "Surgical intervention",
      "Physical therapy and rehabilitation",
      "Pain management",
      "No treatment",
    ],
  },
  {
    num: "7",
    title: "Voluntary Nature",
    items: [
      "Participation is voluntary",
      "Refusal will not affect access to other medical care",
      "Withdrawal is permitted before administration",
      "Once administered, the product cannot be retrieved",
    ],
  },
  {
    num: "8",
    title: "Financial Terms",
    items: [
      "Treatment is self-pay unless documented otherwise",
      "Insurance reimbursement is not guaranteed",
      "Total cost has been disclosed in writing",
      "No federal healthcare program funds are billed for this service in compliance with 42 USC 1320a-7b (Anti-Kickback Statute) and 42 USC 1395nn (Stark Law)",
    ],
  },
  {
    num: "9",
    title: "Privacy and HIPAA",
    items: [
      "Health information is protected under 45 CFR 160 and 164",
      "De-identified outcome data are used for quality assurance, registry, and internal research",
      "Identifiable disclosures require separate written authorization",
    ],
  },
  {
    num: "10",
    title: "Treatment-Related Injury",
    items: [
      "The provider will coordinate medical care for any treatment-related injury",
      "No automatic financial compensation is offered",
      "Patient retains all legal rights under state and federal law",
      "This consent does not waive claims for gross negligence or willful misconduct",
    ],
  },
  {
    num: "11",
    title: "New Information",
    items: [
      "Patient will be notified of new findings affecting willingness to continue",
      "Updated FDA guidance affecting product classification will be communicated",
    ],
  },
  {
    num: "12",
    title: "Right to Ask Questions",
    items: [
      "Questions have been answered by the treating physician",
      "Patient has been given written and verbal information",
      "Patient confirms understanding before signing",
    ],
  },
];

const ATTESTATION_PATIENT = [
  "I am at least 18 years of age and legally competent",
  "I have read or had read to me this consent",
  "I have had the opportunity to ask questions",
  "I voluntarily consent to WJ-MSC exosome administration",
];

const ATTESTATION_PHYSICIAN = [
  "I have personally explained the nature, risks, benefits, and alternatives",
  "The patient demonstrated understanding",
  "I have answered all questions",
];

const REGULATORY_REFS = [
  "21 CFR Part 50 (Informed Consent)",
  "21 CFR Part 1271 (HCT/P Regulations)",
  "21 CFR Part 312 (Investigational New Drug Application, where applicable)",
  "45 CFR Part 46 (Common Rule)",
  "45 CFR Parts 160 and 164 (HIPAA)",
  "Section 351(a), Public Health Service Act",
  "42 USC 1320a-7b (Anti-Kickback Statute)",
  "42 USC 1395nn (Stark Law)",
  "Texas Health and Safety Code Chapter 241",
  "Texas Medical Disclosure Panel, 25 TAC Chapter 601",
  "Texas Occupations Code Chapter 164",
];

function generatePDF(form: FormData) {
  const doc = new jsPDF({ unit: "pt", format: "letter" });
  const W = doc.internal.pageSize.getWidth();
  const marginL = 50;
  const marginR = 50;
  const maxW = W - marginL - marginR;
  let y = 50;

  const addPage = () => { doc.addPage(); y = 50; };
  const checkPage = (needed: number) => { if (y + needed > 720) addPage(); };

  // Clinic branding
  if (form.clinicName) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text(form.clinicName.toUpperCase(), W / 2, y, { align: "center" });
    y += 16;
    if (form.clinicAddress) {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.text(form.clinicAddress, W / 2, y, { align: "center" });
      y += 14;
    }
    doc.setDrawColor(168, 85, 247);
    doc.setLineWidth(0.5);
    doc.line(marginL + 80, y, W - marginR - 80, y);
    y += 16;
  }

  // Title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("PATIENT INFORMED CONSENT", W / 2, y, { align: "center" });
  y += 20;
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text("Wharton's Jelly Mesenchymal Stem Cell (WJ-MSC) Exosome Administration", W / 2, y, { align: "center" });
  y += 28;

  // Patient info
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text(`Patient Name: `, marginL, y);
  doc.setFont("helvetica", "normal");
  doc.text(form.patientName || "____________________", marginL + 80, y);

  doc.setFont("helvetica", "bold");
  doc.text(`DOB: `, marginL + 280, y);
  doc.setFont("helvetica", "normal");
  doc.text(form.dob || "___________", marginL + 305, y);

  doc.setFont("helvetica", "bold");
  doc.text(`MRN: `, marginL + 420, y);
  doc.setFont("helvetica", "normal");
  doc.text(form.mrn || "___________", marginL + 448, y);
  y += 24;

  // Horizontal line
  doc.setDrawColor(168, 85, 247);
  doc.setLineWidth(1);
  doc.line(marginL, y, W - marginR, y);
  y += 16;

  // Sections
  SECTIONS.forEach((section) => {
    checkPage(80);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text(`${section.num}. ${section.title}`, marginL, y);
    y += 16;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    section.items.forEach((item) => {
      checkPage(30);
      const lines = doc.splitTextToSize(`\u2022  ${item}`, maxW - 10);
      doc.text(lines, marginL + 10, y);
      y += lines.length * 12 + 2;
    });
    y += 8;
  });

  // Patient Attestation
  checkPage(100);
  doc.setDrawColor(168, 85, 247);
  doc.line(marginL, y, W - marginR, y);
  y += 16;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("Patient Attestation", marginL, y);
  y += 16;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  ATTESTATION_PATIENT.forEach((item) => {
    checkPage(20);
    doc.text(`\u2022  ${item}`, marginL + 10, y);
    y += 14;
  });
  y += 12;

  // Patient signature
  checkPage(60);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("Patient Signature: _______________________", marginL, y);
  doc.text(`Date: ${form.patientSignDate || "___________"}`, marginL + 280, y);
  doc.text(`Time: ${form.patientSignTime || "_______"}`, marginL + 400, y);
  y += 20;
  doc.text("Witness Signature: ______________________", marginL, y);
  doc.text(`Date: ${form.witnessSignDate || "___________"}`, marginL + 280, y);
  y += 24;

  // Physician Attestation
  checkPage(100);
  doc.setDrawColor(168, 85, 247);
  doc.line(marginL, y, W - marginR, y);
  y += 16;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("Physician Attestation", marginL, y);
  y += 16;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  ATTESTATION_PHYSICIAN.forEach((item) => {
    checkPage(20);
    doc.text(`\u2022  ${item}`, marginL + 10, y);
    y += 14;
  });
  y += 12;

  checkPage(60);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("Physician Signature: _____________________", marginL, y);
  doc.text(`Date: ${form.physicianSignDate || "___________"}`, marginL + 280, y);
  y += 20;
  doc.text(`Printed Name and Texas Medical License #: ${form.physicianName || "_____________________"} ${form.physicianLicense || ""}`, marginL, y);
  y += 28;

  // Regulatory Authority
  checkPage(80);
  doc.setDrawColor(168, 85, 247);
  doc.line(marginL, y, W - marginR, y);
  y += 16;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("Regulatory Authority", marginL, y);
  y += 16;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  REGULATORY_REFS.forEach((ref) => {
    checkPage(16);
    doc.text(`\u2022  ${ref}`, marginL + 10, y);
    y += 12;
  });

  // Footer on each page
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(7);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(150);
    doc.text(`ExoInfo.org - Patient Informed Consent - Page ${i} of ${totalPages}`, W / 2, 760, { align: "center" });
    doc.text(`Generated ${new Date().toLocaleDateString()}`, W / 2, 772, { align: "center" });
    doc.setTextColor(0);
  }

  doc.save(`Informed_Consent_${form.patientName ? form.patientName.replace(/\s+/g, "_") : "Blank"}_${new Date().toISOString().slice(0, 10)}.pdf`);
}

export function InformedConsent() {
  const [form, setForm] = useState<FormData>({
    clinicName: "",
    clinicAddress: "",
    patientName: "",
    dob: "",
    mrn: "",
    patientSignDate: "",
    patientSignTime: "",
    witnessSignDate: "",
    physicianSignDate: "",
    physicianName: "",
    physicianLicense: "",
  });
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(SECTIONS.map(s => s.num)));
  const [allExpanded, setAllExpanded] = useState(true);

  const update = (field: keyof FormData, value: string) => setForm(prev => ({ ...prev, [field]: value }));

  const toggleSection = (num: string) => {
    setExpandedSections(prev => {
      const next = new Set(prev);
      if (next.has(num)) next.delete(num); else next.add(num);
      return next;
    });
  };

  const toggleAll = () => {
    if (allExpanded) {
      setExpandedSections(new Set());
    } else {
      setExpandedSections(new Set(SECTIONS.map(s => s.num)));
    }
    setAllExpanded(!allExpanded);
  };

  const inputStyle: React.CSSProperties = {
    background: "rgba(168,85,247,0.06)",
    border: `1px solid ${P.border}`,
    borderRadius: "8px",
    padding: "10px 14px",
    color: P.text,
    fontSize: "14px",
    width: "100%",
    outline: "none",
    transition: "border-color 0.2s",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: "11px",
    fontWeight: 600,
    color: P.textMuted,
    textTransform: "uppercase" as const,
    letterSpacing: "0.08em",
    marginBottom: "6px",
    display: "block",
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: "40px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
          <div style={{
            width: "40px", height: "40px", borderRadius: "10px",
            background: `linear-gradient(135deg, ${P.primary}, ${P.accent})`,
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px",
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10 9 9 9 8 9"/>
            </svg>
          </div>
          <div>
            <h2 style={{ fontSize: "24px", fontWeight: 800, margin: 0, letterSpacing: "-0.02em" }}>
              Patient Informed Consent
            </h2>
            <p style={{ fontSize: "13px", color: P.textMuted, margin: "2px 0 0 0" }}>
              WJ-MSC Exosome Administration, 21 CFR Part 50 Compliant
            </p>
          </div>
        </div>
      </div>

      {/* Patient Info Form */}
      <div style={{
        background: P.bgCard, border: `1px solid ${P.border}`, borderRadius: "12px",
        padding: "28px", marginBottom: "24px",
      }}>
        <h3 style={{ fontSize: "14px", fontWeight: 700, color: P.primary, marginBottom: "20px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
          Clinic / Practice Information
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
          <div>
            <label style={labelStyle}>Clinic / Practice Name</label>
            <input style={inputStyle} value={form.clinicName} onChange={e => update("clinicName", e.target.value)} placeholder="e.g. Advanced Regenerative Medicine" />
          </div>
          <div>
            <label style={labelStyle}>Clinic Address (optional)</label>
            <input style={inputStyle} value={form.clinicAddress} onChange={e => update("clinicAddress", e.target.value)} placeholder="e.g. 123 Main St, Austin, TX 78701" />
          </div>
        </div>
        <h3 style={{ fontSize: "14px", fontWeight: 700, color: P.primary, marginBottom: "20px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
          Patient Information
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "16px" }}>
          <div>
            <label style={labelStyle}>Patient Name</label>
            <input style={inputStyle} value={form.patientName} onChange={e => update("patientName", e.target.value)} placeholder="Full legal name" />
          </div>
          <div>
            <label style={labelStyle}>Date of Birth</label>
            <input style={inputStyle} type="date" value={form.dob} onChange={e => update("dob", e.target.value)} />
          </div>
          <div>
            <label style={labelStyle}>MRN</label>
            <input style={inputStyle} value={form.mrn} onChange={e => update("mrn", e.target.value)} placeholder="Medical Record #" />
          </div>
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <button onClick={toggleAll} style={{
          background: "transparent", border: `1px solid ${P.border}`, color: P.textMuted,
          padding: "8px 16px", borderRadius: "6px", fontSize: "12px", cursor: "pointer",
        }}>
          {allExpanded ? "Collapse All" : "Expand All"} Sections
        </button>
        <button onClick={() => generatePDF(form)} style={{
          background: `linear-gradient(135deg, ${P.primary}, ${P.accent})`,
          border: "none", color: "#fff", padding: "10px 24px", borderRadius: "8px",
          fontSize: "13px", fontWeight: 600, cursor: "pointer", boxShadow: P.glow,
          display: "flex", alignItems: "center", gap: "8px",
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          Download PDF
        </button>
      </div>

      {/* Consent Sections */}
      {SECTIONS.map((section) => (
        <div key={section.num} style={{
          background: P.bgCard, border: `1px solid ${P.border}`, borderRadius: "10px",
          marginBottom: "8px", overflow: "hidden",
        }}>
          <button onClick={() => toggleSection(section.num)} style={{
            width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
            background: "transparent", border: "none", color: P.text, padding: "16px 20px",
            cursor: "pointer", textAlign: "left",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{
                width: "28px", height: "28px", borderRadius: "6px",
                background: expandedSections.has(section.num) ? `rgba(168,85,247,0.15)` : "rgba(255,255,255,0.05)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "12px", fontWeight: 700, color: P.primary, flexShrink: 0,
              }}>{section.num}</span>
              <span style={{ fontSize: "15px", fontWeight: 600 }}>{section.title}</span>
            </div>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{
              transform: expandedSections.has(section.num) ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.2s",
            }}>
              <path d="M4 6L8 10L12 6" stroke={P.textMuted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          {expandedSections.has(section.num) && (
            <div style={{ padding: "0 20px 16px 60px" }}>
              {section.items.map((item, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "flex-start", gap: "10px",
                  padding: "6px 0", fontSize: "13px", color: "rgba(255,255,255,0.75)", lineHeight: 1.6,
                }}>
                  <span style={{ color: P.primary, marginTop: "2px", flexShrink: 0 }}>{"\u2022"}</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Patient Attestation */}
      <div style={{
        background: P.bgCard, border: `1px solid rgba(168,85,247,0.3)`, borderRadius: "12px",
        padding: "28px", marginTop: "24px", marginBottom: "16px",
      }}>
        <h3 style={{ fontSize: "14px", fontWeight: 700, color: P.primary, marginBottom: "16px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
          Patient Attestation
        </h3>
        {ATTESTATION_PATIENT.map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px", padding: "5px 0", fontSize: "13px", color: "rgba(255,255,255,0.75)", lineHeight: 1.6 }}>
            <span style={{ color: P.accent, marginTop: "2px" }}>{"\u2022"}</span>
            <span>{item}</span>
          </div>
        ))}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginTop: "20px" }}>
          <div>
            <label style={labelStyle}>Patient Signature Date</label>
            <input style={inputStyle} type="date" value={form.patientSignDate} onChange={e => update("patientSignDate", e.target.value)} />
          </div>
          <div>
            <label style={labelStyle}>Time</label>
            <input style={inputStyle} type="time" value={form.patientSignTime} onChange={e => update("patientSignTime", e.target.value)} />
          </div>
          <div>
            <label style={labelStyle}>Witness Signature Date</label>
            <input style={inputStyle} type="date" value={form.witnessSignDate} onChange={e => update("witnessSignDate", e.target.value)} />
          </div>
        </div>
      </div>

      {/* Physician Attestation */}
      <div style={{
        background: P.bgCard, border: `1px solid rgba(168,85,247,0.3)`, borderRadius: "12px",
        padding: "28px", marginBottom: "16px",
      }}>
        <h3 style={{ fontSize: "14px", fontWeight: 700, color: P.primary, marginBottom: "16px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
          Physician Attestation
        </h3>
        {ATTESTATION_PHYSICIAN.map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px", padding: "5px 0", fontSize: "13px", color: "rgba(255,255,255,0.75)", lineHeight: 1.6 }}>
            <span style={{ color: P.accent, marginTop: "2px" }}>{"\u2022"}</span>
            <span>{item}</span>
          </div>
        ))}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginTop: "20px" }}>
          <div>
            <label style={labelStyle}>Physician Signature Date</label>
            <input style={inputStyle} type="date" value={form.physicianSignDate} onChange={e => update("physicianSignDate", e.target.value)} />
          </div>
          <div>
            <label style={labelStyle}>Printed Name</label>
            <input style={inputStyle} value={form.physicianName} onChange={e => update("physicianName", e.target.value)} placeholder="Full name" />
          </div>
          <div>
            <label style={labelStyle}>TX Medical License #</label>
            <input style={inputStyle} value={form.physicianLicense} onChange={e => update("physicianLicense", e.target.value)} placeholder="License number" />
          </div>
        </div>
      </div>

      {/* Regulatory Authority */}
      <div style={{
        background: P.bgCard, border: `1px solid ${P.border}`, borderRadius: "12px",
        padding: "28px", marginBottom: "24px",
      }}>
        <h3 style={{ fontSize: "14px", fontWeight: 700, color: P.textMuted, marginBottom: "16px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
          Regulatory Authority
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px 24px" }}>
          {REGULATORY_REFS.map((ref, i) => (
            <div key={i} style={{ fontSize: "12px", color: P.textDim, padding: "4px 0", lineHeight: 1.5 }}>
              {"\u2022"} {ref}
            </div>
          ))}
        </div>
      </div>

      {/* Download CTA */}
      <div style={{
        background: `linear-gradient(135deg, rgba(168,85,247,0.1), rgba(232,121,249,0.08))`,
        border: `1px solid ${P.border}`, borderRadius: "12px",
        padding: "32px", textAlign: "center",
      }}>
        <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.7)", margin: "0 0 16px 0" }}>
          Fill in the fields above, then download a formatted PDF ready for signatures.
        </p>
        <button onClick={() => generatePDF(form)} style={{
          background: `linear-gradient(135deg, ${P.primary}, ${P.accent})`,
          border: "none", color: "#fff", padding: "14px 40px", borderRadius: "10px",
          fontSize: "15px", fontWeight: 700, cursor: "pointer", boxShadow: P.glow,
          display: "inline-flex", alignItems: "center", gap: "10px",
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          Download Informed Consent PDF
        </button>
        <p style={{ fontSize: "11px", color: P.textDim, margin: "12px 0 0 0" }}>
          PDF generated client-side. No patient data is transmitted or stored.
        </p>
      </div>
    </div>
  );
}
