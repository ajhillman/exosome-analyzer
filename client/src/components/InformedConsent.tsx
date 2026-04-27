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
  clinicCityStateZip: string;
  patientName: string;
  dob: string;
  mrn: string;
  patientSignDate: string;
  witnessSignDate: string;
  witnessName: string;
  physicianSignDate: string;
  physicianName: string;
  physicianLicense: string;
  guardianName: string;
  guardianRelationship: string;
  guardianDate: string;
}

const SECTIONS = [
  {
    num: "1",
    title: "Description of Treatment",
    paragraphs: [
      "Exosome Therapy uses exosomes derived from Wharton's Jelly mesenchymal stem cells (WJ-MSCs). Exosomes are small signaling vesicles that carry growth factors, proteins, and genetic material. They are produced under pharmaceutical-grade cGMP manufacturing conditions. The product is administered by your physician via intravenous (IV) infusion or direct injection, depending on your treatment plan.",
      "Standard therapeutic dose: 5 mL containing 100 billion exosomes (20 billion per mL).",
    ],
  },
  {
    num: "2",
    title: "Goals of Treatment",
    paragraphs: [
      "The goal is to support your body's natural repair and anti-inflammatory processes. Outcomes vary. No physician or staff member is authorized to guarantee results. Any representation of guaranteed outcomes is unauthorized and should be reported to your treating physician immediately.",
    ],
  },
  {
    num: "3",
    title: "Known Risks and Possible Adverse Effects",
    subsections: [
      {
        heading: "Common Reactions (Reported in Clinical Experience)",
        items: [
          "Mild fatigue lasting 24-72 hours",
          "Low-grade fever (under 101\u00B0F) within 24 hours of infusion",
          "Redness, bruising, or soreness at the infusion site",
          "Temporary nausea or headache",
        ],
      },
      {
        heading: "Less Common but Serious Risks",
        items: [
          "Allergic or hypersensitivity reaction, including anaphylaxis",
          "Infection at the administration site",
          "Systemic immune response (fever, chills, rigors)",
          "Unknown long-term effects: This therapy is not FDA approved for this indication. Long-term safety data is limited.",
        ],
      },
      {
        heading: "Theoretical Risks Under Investigation",
        items: [
          "Potential interaction with existing medications or active inflammatory conditions",
          "Immunogenicity: unknown response in patients with autoimmune disorders",
          "Risks specific to your medical history as identified by your physician",
        ],
      },
    ],
    emergencyNote: "EMERGENCY CONTACT: If you experience difficulty breathing, severe swelling, chest pain, or loss of consciousness following treatment, call 911 immediately and then notify your treating physician.",
  },
  {
    num: "4",
    title: "Alternatives to Treatment",
    paragraphs: ["You are not required to receive Exosome Therapy. Alternatives include:"],
    items: [
      "Continued conservative management (physical therapy, medication, pain management)",
      "Other interventional procedures as recommended by your physician",
      "Watchful waiting with no active intervention",
      "Referral to another specialist for a second opinion",
    ],
    footnote: "Choosing not to receive this therapy will not affect the quality of other care you receive at this practice.",
  },
  {
    num: "5",
    title: "Voluntary Consent and Right to Withdraw",
    paragraphs: [
      "Your participation is entirely voluntary. You withdraw consent at any time before the therapy begins without penalty or impact on your care. You cannot withdraw consent after administration has started.",
      "Once you sign this form, your physician will review it with you before proceeding. Ask all questions before signing.",
    ],
  },
  {
    num: "6",
    title: "Financial Disclosure",
    paragraphs: [
      "Exosome Therapy is not covered by Medicare, Medicaid, or most commercial insurance plans. Payment is your responsibility. Fees were disclosed to you in a separate financial agreement. Signing this consent does not waive any financial obligation already agreed to in writing.",
      "If you are receiving treatment through a personal injury lien program, the terms of your Letter of Protection govern your financial obligations to this practice.",
    ],
  },
  {
    num: "7",
    title: "Privacy and HIPAA Authorization",
    paragraphs: [
      "Your protected health information (PHI) is handled under the practice's HIPAA Notice of Privacy Practices, which you received separately. De-identified outcome data from your treatment is used for internal quality improvement. No identifiable information is shared with third parties without your written authorization.",
      "If your treatment is related to a personal injury claim, you authorize disclosure of treatment records to your attorney of record and their designated insurers solely for purposes of your legal claim.",
    ],
  },
  {
    num: "8",
    title: "Patient Acknowledgments",
    paragraphs: ["By signing below, you confirm that:"],
    items: [
      "You received and read this consent form.",
      "Your physician explained the procedure, risks, benefits, and alternatives.",
      "You had the opportunity to ask questions and received satisfactory answers.",
      "You are 18 years of age or older, or your authorized representative has signed below.",
      "You are not under duress and are signing voluntarily.",
      "You understand this therapy is not FDA-approved for your specific condition.",
      "You understand no outcomes have been guaranteed to you.",
    ],
  },
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

  // Header / Clinic branding
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  const headerLine1 = "INFORMED CONSENT FOR EXOSOME THERAPY";
  doc.text(headerLine1, W / 2, y, { align: "center" });
  y += 18;

  if (form.clinicName) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text(form.clinicName, W / 2, y, { align: "center" });
    y += 14;
  } else {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("Dallas International Center of Excellence", W / 2, y, { align: "center" });
    y += 14;
  }

  doc.setFont("helvetica", "italic");
  doc.setFontSize(9);
  doc.text("Mesenchymal Stem Cell-Derived Exosomes", W / 2, y, { align: "center" });
  y += 14;

  if (form.clinicAddress) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    const fullAddr = form.clinicCityStateZip ? `${form.clinicAddress}, ${form.clinicCityStateZip}` : form.clinicAddress;
    doc.text(fullAddr, W / 2, y, { align: "center" });
    y += 14;
  } else {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text("901 Main St, Suite 3220, Dallas, TX 75202", W / 2, y, { align: "center" });
    y += 14;
  }

  doc.setDrawColor(168, 85, 247);
  doc.setLineWidth(1);
  doc.line(marginL, y, W - marginR, y);
  y += 18;

  // Patient Information
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("PATIENT INFORMATION", marginL, y);
  y += 16;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(`Patient Full Name: ${form.patientName || "____________________________________"}`, marginL, y);
  y += 14;
  doc.text(`Date of Birth: ${form.dob || "_______________"}     Medical Record / Case No.: ${form.mrn || "_______________"}`, marginL, y);
  y += 18;

  // Regulatory Notice
  doc.setDrawColor(168, 85, 247);
  doc.setLineWidth(0.5);
  doc.line(marginL, y, W - marginR, y);
  y += 14;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("REGULATORY NOTICE", marginL, y);
  y += 14;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  const regNotice = "Exosome Therapy is a biologic product manufactured under cGMP standards and registered with the FDA under a Drug Master File (Section 351(a) of the Public Health Service Act). This therapy has not received FDA approval for treatment of your specific condition. Your physician has determined, in their independent clinical judgment, that this therapy may benefit you. You have the right to ask questions before signing this consent.";
  const regLines = doc.splitTextToSize(regNotice, maxW);
  doc.text(regLines, marginL, y);
  y += regLines.length * 11 + 12;

  // Sections
  SECTIONS.forEach((section) => {
    checkPage(80);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text(`${section.num}. ${section.title.toUpperCase()}`, marginL, y);
    y += 14;

    if (section.paragraphs) {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      section.paragraphs.forEach((para) => {
        checkPage(40);
        const lines = doc.splitTextToSize(para, maxW);
        doc.text(lines, marginL, y);
        y += lines.length * 11 + 6;
      });
    }

    if ((section as any).subsections) {
      (section as any).subsections.forEach((sub: any) => {
        checkPage(40);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(8.5);
        doc.text(sub.heading, marginL + 10, y);
        y += 12;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8.5);
        sub.items.forEach((item: string) => {
          checkPage(24);
          const lines = doc.splitTextToSize(`\u2022  ${item}`, maxW - 20);
          doc.text(lines, marginL + 16, y);
          y += lines.length * 11 + 2;
        });
        y += 4;
      });
    }

    if ((section as any).emergencyNote) {
      checkPage(30);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8.5);
      const eLines = doc.splitTextToSize((section as any).emergencyNote, maxW);
      doc.text(eLines, marginL, y);
      y += eLines.length * 11 + 6;
    }

    if (section.items) {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      section.items.forEach((item) => {
        checkPage(24);
        const lines = doc.splitTextToSize(`\u2022  ${item}`, maxW - 10);
        doc.text(lines, marginL + 10, y);
        y += lines.length * 11 + 2;
      });
      y += 4;
    }

    if ((section as any).footnote) {
      checkPage(20);
      doc.setFont("helvetica", "italic");
      doc.setFontSize(8);
      const fLines = doc.splitTextToSize((section as any).footnote, maxW);
      doc.text(fLines, marginL, y);
      y += fLines.length * 10 + 6;
    }

    y += 4;
  });

  // SIGNATURES
  checkPage(120);
  doc.setDrawColor(168, 85, 247);
  doc.setLineWidth(1);
  doc.line(marginL, y, W - marginR, y);
  y += 16;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("SIGNATURES", marginL, y);
  y += 20;

  // Patient or Authorized Representative
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text("Patient or Authorized Representative", marginL, y);
  y += 16;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(`Patient / Authorized Representative Signature: _____________________________     Date: ${form.patientSignDate || "___________"}`, marginL, y);
  y += 16;
  doc.text(`Printed Name: ${form.patientName || "_____________________________"}`, marginL, y);
  y += 16;
  doc.text("Relationship to Patient (if Authorized Representative): _____________________________", marginL, y);
  y += 22;

  // Witness
  checkPage(60);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text("Witness", marginL, y);
  y += 16;
  doc.setFont("helvetica", "normal");
  doc.text(`Witness Signature: _____________________________     Date: ${form.witnessSignDate || "___________"}`, marginL, y);
  y += 16;
  doc.text(`Printed Name of Witness: ${form.witnessName || "_____________________________"}`, marginL, y);
  y += 22;

  // Treating Physician
  checkPage(80);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text("Treating Physician", marginL, y);
  y += 14;
  doc.setFont("helvetica", "italic");
  doc.setFontSize(8);
  doc.text("I have explained the nature of this procedure, the risks, the benefits, and the available alternatives to the", marginL, y);
  y += 11;
  doc.text("patient. I have answered all questions to the best of my ability.", marginL, y);
  y += 16;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(`Physician Signature: _____________________________     Date: ${form.physicianSignDate || "___________"}`, marginL, y);
  y += 16;
  doc.text(`Physician Printed Name and License No.: ${form.physicianName || "_______________"} ${form.physicianLicense || "_______________"}`, marginL, y);
  y += 22;

  // Minor Patient Section
  checkPage(60);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text("Minor Patient Section (Complete Only If Patient Is Under 18)", marginL, y);
  y += 14;
  doc.setFont("helvetica", "italic");
  doc.setFontSize(8);
  const minorNote = "This section must be completed if the patient is a minor (under 18 years of age). A parent or legal guardian with authority to consent to medical treatment must sign above as the Authorized Representative and complete this section.";
  const minorLines = doc.splitTextToSize(minorNote, maxW);
  doc.text(minorLines, marginL, y);
  y += minorLines.length * 10 + 10;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(`Parent / Legal Guardian Printed Name: ${form.guardianName || "_____________________________"}     Date: ${form.guardianDate || "___________"}`, marginL, y);
  y += 16;
  doc.text(`Relationship to Minor: ${form.guardianRelationship || "_____________________________"}`, marginL, y);
  y += 20;

  // Footer on each page
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(7);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(150);
    const footerClinic = form.clinicName || "Dallas International Center of Excellence";
    const footerAddr = form.clinicAddress ? `${form.clinicAddress}${form.clinicCityStateZip ? ", " + form.clinicCityStateZip : ""}` : "901 Main St Suite 3220, Dallas TX 75202";
    doc.text(`Version 1.0 | ${footerClinic} | ${footerAddr}`, W / 2, 755, { align: "center" });
    doc.text(`This form is reviewed annually for compliance with applicable federal and state law. | Page ${i} of ${totalPages}`, W / 2, 765, { align: "center" });
    doc.setTextColor(0);
  }

  doc.save(`Informed_Consent_${form.patientName ? form.patientName.replace(/\s+/g, "_") : "Blank"}_${new Date().toISOString().slice(0, 10)}.pdf`);
}

function clearForm(setForm: React.Dispatch<React.SetStateAction<FormData>>) {
  setForm({
    clinicName: "",
    clinicAddress: "",
    clinicCityStateZip: "",
    patientName: "",
    dob: "",
    mrn: "",
    patientSignDate: "",
    witnessSignDate: "",
    witnessName: "",
    physicianSignDate: "",
    physicianName: "",
    physicianLicense: "",
    guardianName: "",
    guardianRelationship: "",
    guardianDate: "",
  });
}

export function InformedConsent() {
  const [form, setForm] = useState<FormData>({
    clinicName: "",
    clinicAddress: "",
    clinicCityStateZip: "",
    patientName: "",
    dob: "",
    mrn: "",
    patientSignDate: "",
    witnessSignDate: "",
    witnessName: "",
    physicianSignDate: "",
    physicianName: "",
    physicianLicense: "",
    guardianName: "",
    guardianRelationship: "",
    guardianDate: "",
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
              Informed Consent for Exosome Therapy
            </h2>
            <p style={{ fontSize: "13px", color: P.textMuted, margin: "2px 0 0 0" }}>
              Mesenchymal Stem Cell-Derived Exosomes, 21 CFR Part 50 Compliant
            </p>
          </div>
        </div>
      </div>

      {/* Clinic / Practice Info */}
      <div style={{
        background: P.bgCard, border: `1px solid ${P.border}`, borderRadius: "12px",
        padding: "28px", marginBottom: "24px",
      }}>
        <h3 style={{ fontSize: "14px", fontWeight: 700, color: P.primary, marginBottom: "20px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
          Clinic / Practice Information
        </h3>
        <div className="consent-grid-3" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "20px" }}>
          <div>
            <label style={labelStyle}>Clinic / Practice Name</label>
            <input style={inputStyle} value={form.clinicName} onChange={e => update("clinicName", e.target.value)} placeholder="e.g. Dallas International Center of Excellence" />
          </div>
          <div>
            <label style={labelStyle}>Street Address</label>
            <input style={inputStyle} value={form.clinicAddress} onChange={e => update("clinicAddress", e.target.value)} placeholder="e.g. 901 Main St, Suite 3220" />
          </div>
          <div>
            <label style={labelStyle}>City, State, ZIP</label>
            <input style={inputStyle} value={form.clinicCityStateZip} onChange={e => update("clinicCityStateZip", e.target.value)} placeholder="e.g. Dallas, TX 75202" />
          </div>
        </div>

        <h3 style={{ fontSize: "14px", fontWeight: 700, color: P.primary, marginBottom: "20px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
          Patient Information
        </h3>
        <div className="consent-grid-3" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "16px" }}>
          <div>
            <label style={labelStyle}>Patient Full Name</label>
            <input style={inputStyle} value={form.patientName} onChange={e => update("patientName", e.target.value)} placeholder="Full legal name" />
          </div>
          <div>
            <label style={labelStyle}>Date of Birth</label>
            <input style={inputStyle} type="date" value={form.dob} onChange={e => update("dob", e.target.value)} />
          </div>
          <div>
            <label style={labelStyle}>Medical Record / Case No.</label>
            <input style={inputStyle} value={form.mrn} onChange={e => update("mrn", e.target.value)} placeholder="MRN or Case #" />
          </div>
        </div>
      </div>

      {/* Regulatory Notice */}
      <div style={{
        background: "rgba(168,85,247,0.06)",
        border: `1px solid rgba(168,85,247,0.25)`,
        borderRadius: "10px",
        padding: "20px",
        marginBottom: "24px",
      }}>
        <h3 style={{ fontSize: "13px", fontWeight: 700, color: P.primary, margin: "0 0 10px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
          Regulatory Notice
        </h3>
        <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.75)", lineHeight: 1.7, margin: 0 }}>
          Exosome Therapy is a biologic product manufactured under cGMP standards and registered with the FDA under a Drug Master File (Section 351(a) of the Public Health Service Act). This therapy has not received FDA approval for treatment of your specific condition. Your physician has determined, in their independent clinical judgment, that this therapy benefits you. You have the right to ask questions before signing this consent.
        </p>
      </div>

      {/* Controls */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "12px" }}>
        <button onClick={toggleAll} style={{
          background: "transparent", border: `1px solid ${P.border}`, color: P.textMuted,
          padding: "8px 16px", borderRadius: "6px", fontSize: "12px", cursor: "pointer",
        }}>
          {allExpanded ? "Collapse All" : "Expand All"} Sections
        </button>
        <div style={{ display: "flex", gap: "12px" }}>
          <button onClick={() => window.print()} style={{
            background: "transparent", border: `1px solid ${P.border}`, color: P.textMuted,
            padding: "10px 20px", borderRadius: "8px", fontSize: "13px", fontWeight: 600, cursor: "pointer",
            display: "flex", alignItems: "center", gap: "8px",
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 6 2 18 2 18 9"/>
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
              <rect x="6" y="14" width="12" height="8"/>
            </svg>
            Print
          </button>
          <button onClick={() => clearForm(setForm)} style={{
            background: "transparent", border: `1px solid rgba(239,68,68,0.3)`, color: "rgba(239,68,68,0.8)",
            padding: "10px 20px", borderRadius: "8px", fontSize: "13px", fontWeight: 600, cursor: "pointer",
            display: "flex", alignItems: "center", gap: "8px",
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
            </svg>
            Clear Form
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
              {section.paragraphs && section.paragraphs.map((para, i) => (
                <p key={`p-${i}`} style={{
                  fontSize: "13px", color: "rgba(255,255,255,0.75)", lineHeight: 1.7,
                  margin: i < section.paragraphs!.length - 1 ? "0 0 10px" : section.items || (section as any).subsections ? "0 0 10px" : "0",
                }}>
                  {para}
                </p>
              ))}
              {(section as any).subsections && (section as any).subsections.map((sub: any, si: number) => (
                <div key={`sub-${si}`} style={{ marginBottom: "12px" }}>
                  <div style={{ fontSize: "13px", fontWeight: 600, color: P.primaryLight, marginBottom: "6px" }}>{sub.heading}</div>
                  {sub.items.map((item: string, ii: number) => (
                    <div key={ii} style={{
                      display: "flex", alignItems: "flex-start", gap: "10px",
                      padding: "4px 0", fontSize: "13px", color: "rgba(255,255,255,0.75)", lineHeight: 1.6,
                    }}>
                      <span style={{ color: P.primary, marginTop: "2px", flexShrink: 0 }}>{"\u2022"}</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              ))}
              {(section as any).emergencyNote && (
                <div style={{
                  background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)",
                  borderRadius: "8px", padding: "12px 16px", marginTop: "8px",
                }}>
                  <p style={{ fontSize: "12px", fontWeight: 600, color: "#ef4444", lineHeight: 1.6, margin: 0 }}>
                    {(section as any).emergencyNote}
                  </p>
                </div>
              )}
              {section.items && section.items.map((item, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "flex-start", gap: "10px",
                  padding: "4px 0", fontSize: "13px", color: "rgba(255,255,255,0.75)", lineHeight: 1.6,
                }}>
                  <span style={{ color: P.primary, marginTop: "2px", flexShrink: 0 }}>{"\u2022"}</span>
                  <span>{item}</span>
                </div>
              ))}
              {(section as any).footnote && (
                <p style={{ fontSize: "12px", color: P.textMuted, fontStyle: "italic", marginTop: "8px", marginBottom: 0 }}>
                  {(section as any).footnote}
                </p>
              )}
            </div>
          )}
        </div>
      ))}

      {/* Signatures Section */}
      <div style={{
        background: P.bgCard, border: `1px solid rgba(168,85,247,0.3)`, borderRadius: "12px",
        padding: "28px", marginTop: "24px", marginBottom: "16px",
      }}>
        <h3 style={{ fontSize: "16px", fontWeight: 700, color: P.text, marginBottom: "24px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
          Signatures
        </h3>

        {/* Patient or Authorized Representative */}
        <div style={{ marginBottom: "24px", paddingBottom: "24px", borderBottom: `1px solid ${P.borderLight}` }}>
          <h4 style={{ fontSize: "13px", fontWeight: 700, color: P.primary, marginBottom: "16px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Patient or Authorized Representative
          </h4>
          <div className="consent-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div>
              <label style={labelStyle}>Patient / Authorized Rep Signature Date</label>
              <input style={inputStyle} type="date" value={form.patientSignDate} onChange={e => update("patientSignDate", e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>Printed Name</label>
              <input style={inputStyle} value={form.patientName} onChange={e => update("patientName", e.target.value)} placeholder="Full legal name" readOnly />
            </div>
          </div>
        </div>

        {/* Witness */}
        <div style={{ marginBottom: "24px", paddingBottom: "24px", borderBottom: `1px solid ${P.borderLight}` }}>
          <h4 style={{ fontSize: "13px", fontWeight: 700, color: P.primary, marginBottom: "16px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Witness
          </h4>
          <div className="consent-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div>
              <label style={labelStyle}>Witness Signature Date</label>
              <input style={inputStyle} type="date" value={form.witnessSignDate} onChange={e => update("witnessSignDate", e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>Printed Name of Witness</label>
              <input style={inputStyle} value={form.witnessName} onChange={e => update("witnessName", e.target.value)} placeholder="Witness full name" />
            </div>
          </div>
        </div>

        {/* Treating Physician */}
        <div style={{ marginBottom: "24px", paddingBottom: "24px", borderBottom: `1px solid ${P.borderLight}` }}>
          <h4 style={{ fontSize: "13px", fontWeight: 700, color: P.primary, marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Treating Physician
          </h4>
          <p style={{ fontSize: "12px", color: P.textMuted, fontStyle: "italic", margin: "0 0 16px", lineHeight: 1.6 }}>
            I have explained the nature of this procedure, the risks, the benefits, and the available alternatives to the patient. I have answered all questions to the best of my ability.
          </p>
          <div className="consent-grid-3" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
            <div>
              <label style={labelStyle}>Physician Signature Date</label>
              <input style={inputStyle} type="date" value={form.physicianSignDate} onChange={e => update("physicianSignDate", e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>Physician Printed Name</label>
              <input style={inputStyle} value={form.physicianName} onChange={e => update("physicianName", e.target.value)} placeholder="Full name" />
            </div>
            <div>
              <label style={labelStyle}>License No.</label>
              <input style={inputStyle} value={form.physicianLicense} onChange={e => update("physicianLicense", e.target.value)} placeholder="License number" />
            </div>
          </div>
        </div>

        {/* Minor Patient Section */}
        <div>
          <h4 style={{ fontSize: "13px", fontWeight: 700, color: P.accent, marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Minor Patient Section (Under 18 Only)
          </h4>
          <p style={{ fontSize: "12px", color: P.textMuted, fontStyle: "italic", margin: "0 0 16px", lineHeight: 1.6 }}>
            This section must be completed if the patient is a minor (under 18 years of age). A parent or legal guardian with authority to consent to medical treatment must sign above as the Authorized Representative and complete this section.
          </p>
          <div className="consent-grid-3" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
            <div>
              <label style={labelStyle}>Parent / Legal Guardian Name</label>
              <input style={inputStyle} value={form.guardianName} onChange={e => update("guardianName", e.target.value)} placeholder="Full name" />
            </div>
            <div>
              <label style={labelStyle}>Relationship to Minor</label>
              <input style={inputStyle} value={form.guardianRelationship} onChange={e => update("guardianRelationship", e.target.value)} placeholder="e.g. Parent, Legal Guardian" />
            </div>
            <div>
              <label style={labelStyle}>Date</label>
              <input style={inputStyle} type="date" value={form.guardianDate} onChange={e => update("guardianDate", e.target.value)} />
            </div>
          </div>
        </div>
      </div>

      {/* Download / Print / Clear CTA */}
      <div style={{
        background: `linear-gradient(135deg, rgba(168,85,247,0.1), rgba(232,121,249,0.08))`,
        border: `1px solid ${P.border}`, borderRadius: "12px",
        padding: "32px", textAlign: "center",
      }}>
        <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.7)", margin: "0 0 16px 0" }}>
          Fill in the fields above, then download a formatted PDF ready for signatures.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
          <button onClick={() => window.print()} style={{
            background: "transparent", border: `1px solid ${P.border}`, color: P.textMuted,
            padding: "14px 32px", borderRadius: "10px", fontSize: "15px", fontWeight: 600, cursor: "pointer",
            display: "inline-flex", alignItems: "center", gap: "10px",
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 6 2 18 2 18 9"/>
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
              <rect x="6" y="14" width="12" height="8"/>
            </svg>
            Print
          </button>
          <button onClick={() => clearForm(setForm)} style={{
            background: "transparent", border: `1px solid rgba(239,68,68,0.3)`, color: "rgba(239,68,68,0.8)",
            padding: "14px 32px", borderRadius: "10px", fontSize: "15px", fontWeight: 600, cursor: "pointer",
            display: "inline-flex", alignItems: "center", gap: "10px",
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
            </svg>
            Clear Form
          </button>
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
        </div>
        <p style={{ fontSize: "11px", color: P.textDim, margin: "12px 0 0 0" }}>
          Version 1.0 | PDF generated client-side. No patient data is transmitted or stored. This form is reviewed annually for compliance with applicable federal and state law.
        </p>
      </div>
    </div>
  );
}
