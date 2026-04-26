import { ExosomeCompany } from "@/types";
import {
  AlertTriangle,
  Award,
  CheckCircle,
  ExternalLink,
  FileText,
  Globe,
  Shield,
  ShieldAlert,
  ShieldCheck,
  XCircle,
  ZoomIn,
} from "lucide-react";
import { useState } from "react";

// CDN URLs for regulatory logos
const LOGO_CGMP_BADGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663126495647/FDJ5hrYjuWWT9pWZoFgQus/cgmp-badge_5adf14c9.jpeg";
const LOGO_FDA_CGMP = "https://d2xsxph8kpxj0f.cloudfront.net/310519663126495647/FDJ5hrYjuWWT9pWZoFgQus/fda-cgmp_fa0033b2.jpeg";
const LOGO_FDA = "https://d2xsxph8kpxj0f.cloudfront.net/310519663126495647/FDJ5hrYjuWWT9pWZoFgQus/fda-logo_ed6f68ec.png";
const LOGO_GMP_CERTIFIED = "https://d2xsxph8kpxj0f.cloudfront.net/310519663126495647/FDJ5hrYjuWWT9pWZoFgQus/gmp-certified_bb7a367d.jpeg";
const LOGO_FDA_CBER = "https://d2xsxph8kpxj0f.cloudfront.net/310519663126495647/FDJ5hrYjuWWT9pWZoFgQus/fda-cber_70e9a747.webp";
const LOGO_FDA_REGULATION = "https://d2xsxph8kpxj0f.cloudfront.net/310519663126495647/FDJ5hrYjuWWT9pWZoFgQus/fda-regulation-flowchart_728cc3e1.png";
const LOGO_FDA_CRITERIA = "https://d2xsxph8kpxj0f.cloudfront.net/310519663126495647/FDJ5hrYjuWWT9pWZoFgQus/fda-criteria-flowchart_ac78eb8e.png";

function ImageLightbox({ src, alt }: { src: string; alt: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="relative group cursor-pointer" onClick={() => setOpen(true)}>
        <img src={src} alt={alt} className="w-full rounded-lg border border-gray-200 shadow-sm" />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-lg flex items-center justify-center">
          <ZoomIn className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" />
        </div>
      </div>
      {open && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={() => setOpen(false)}>
          <img src={src} alt={alt} className="max-w-full max-h-[90vh] rounded-lg shadow-2xl" />
        </div>
      )}
    </>
  );
}

interface ReportCardProps {
  companies: ExosomeCompany[];
}

function getGradeStyle(grade: string) {
  const styles: Record<string, { accent: string; bg: string; bgLight: string; border: string }> = {
    "A+": { accent: "#198038", bg: "rgba(25, 128, 56, 0.1)", bgLight: "rgba(25, 128, 56, 0.04)", border: "rgba(25, 128, 56, 0.15)" },
    A: { accent: "#198038", bg: "rgba(25, 128, 56, 0.08)", bgLight: "rgba(25, 128, 56, 0.03)", border: "rgba(25, 128, 56, 0.12)" },
    B: { accent: "#0f62fe", bg: "rgba(15, 98, 254, 0.08)", bgLight: "rgba(15, 98, 254, 0.03)", border: "rgba(15, 98, 254, 0.12)" },
    C: { accent: "#b28600", bg: "rgba(178, 134, 0, 0.08)", bgLight: "rgba(178, 134, 0, 0.03)", border: "rgba(178, 134, 0, 0.12)" },
    D: { accent: "#eb6200", bg: "rgba(235, 98, 0, 0.08)", bgLight: "rgba(235, 98, 0, 0.03)", border: "rgba(235, 98, 0, 0.12)" },
    F: { accent: "#da1e28", bg: "rgba(218, 30, 40, 0.08)", bgLight: "rgba(218, 30, 40, 0.03)", border: "rgba(218, 30, 40, 0.12)" },
  };
  return styles[grade] || styles.C;
}

function getScoreLabel(score: number) {
  if (score >= 90) return "Excellent";
  if (score >= 80) return "Strong";
  if (score >= 70) return "Good";
  if (score >= 60) return "Fair";
  if (score >= 50) return "Below Average";
  return "Poor";
}

function CircularScore({ score, grade, size = 100 }: { score: number; grade: string; size?: number }) {
  const style = getGradeStyle(grade);
  const radius = (size - 10) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(0,0,0,0.04)"
          strokeWidth="5"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={style.accent}
          strokeWidth="5"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xl font-extrabold" style={{ color: style.accent, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{grade}</span>
        <span className="text-[9px] text-gray-400 font-medium">{score}/100</span>
      </div>
    </div>
  );
}

function CriteriaRow({ label, passed, detail }: { label: string; passed: boolean | null; detail?: string }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-gray-100/80 last:border-0">
      <div className="flex items-center gap-2.5">
        {passed === true && <CheckCircle className="w-4 h-4 text-[#198038]" />}
        {passed === false && <XCircle className="w-4 h-4 text-[#da1e28]" />}
        {passed === null && <AlertTriangle className="w-4 h-4 text-[#b28600]" />}
        <span className="text-[13px] text-gray-700 font-medium">{label}</span>
      </div>
      {detail && <span className="text-[11px] text-gray-400 max-w-[200px] text-right font-medium">{detail}</span>}
    </div>
  );
}

function CompanyReportCard({ company }: { company: ExosomeCompany }) {
  const [expanded, setExpanded] = useState(false);
  const grade = company.company_grade || "N/A";
  const style = getGradeStyle(grade);
  const score = company.regulatoryScore;

  const is351aRegistered = company.section?.includes("351(a)") && !company.section?.includes("Investigational");
  const isCGMP = company.manufacturing?.includes("cGMP") && !company.manufacturing?.includes("deviations");
  const hasThirdPartyBatchTesting = company.third_party_testing === "Yes" || company.name === "DynaCord";
  const ownsFacility = company.name === "DynaCord"; // Only DynaCord owns its manufacturing facility
  const hasBatchRetention = company.name === "DynaCord"; // Only DynaCord retains 25% of each batch for 5 years

  const criteria = [
    {
      label: "351(a) FDA CBER Drug Registration",
      passed: is351aRegistered ? true : company.section?.includes("351(a)") ? null : false,
      detail: company.section || "Unknown",
    },
    {
      label: "cGMP Manufacturing (21 CFR 210/211)",
      passed: isCGMP ? true : company.manufacturing?.includes("cGMP") ? null : false,
      detail: company.manufacturing,
    },
    {
      label: "Batch-by-Batch Third-Party Testing",
      passed: hasThirdPartyBatchTesting,
      detail: hasThirdPartyBatchTesting ? "Full COA per batch (Eurofins)" : "Not verified",
    },
    {
      label: "25% Batch Retention (5 Years, FDA Recall)",
      passed: hasBatchRetention,
      detail: hasBatchRetention ? "Compliant with CBER recall rules" : "Not disclosed",
    },
    {
      label: "Owns Manufacturing Facility",
      passed: ownsFacility,
      detail: ownsFacility ? "Company-owned lab" : "Contract manufacturer or unknown",
    },
    {
      label: "No FDA Warning Letters",
      passed: !company.hasWarningLetter,
      detail: company.hasWarningLetter ? "Warning Letter Issued" : "Clean Record",
    },
    {
      label: "Certificate of Analysis (COA)",
      passed: company.coa?.startsWith("Yes") ? true : company.coa?.includes("Unclear") ? false : null,
      detail: company.coa,
    },
    {
      label: "Drug Master File (DMF Type II)",
      passed: company.dmf?.includes("Yes") ? true : false,
      detail: company.dmf || "None",
    },
    {
      label: "Products Liability Insurance",
      passed: company.insurance_provider ? true : false,
      detail: company.insurance_provider ? "Active" : "None Disclosed",
    },
    {
      label: "American Owned and Operated",
      passed: company.american_owned_operated === true ? true : company.american_owned_operated === false ? false : null,
      detail: company.company_location || "Unknown",
    },
    {
      label: "No Active Litigation",
      passed: (company.litigation_count || 0) === 0,
      detail: company.litigation_count ? `${company.litigation_count} case(s)` : "None",
    },
    {
      label: "Patent Portfolio",
      passed: company.patents && company.patents.length > 0 ? true : false,
      detail: company.patents ? `${company.patents.length} patent(s)` : "None",
    },
  ];

  const passCount = criteria.filter((c) => c.passed === true).length;
  const totalCount = criteria.length;

  return (
    <div
      className="card-premium overflow-hidden transition-all duration-300"
      style={expanded ? { border: `1px solid ${style.border}`, boxShadow: `0 0 0 3px ${style.bgLight}` } : {}}
    >
      <div
        className="p-4 md:p-5 cursor-pointer hover:bg-gray-50/30 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-4 md:gap-5">
          {/* Logo */}
          <div className="w-11 h-11 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden shrink-0 p-1">
            {company.company_logo_url ? (
              <img src={company.company_logo_url} alt={company.name} className="w-full h-full object-contain" />
            ) : (
              <Globe className="w-5 h-5 text-gray-300" />
            )}
          </div>

          {/* Score Circle */}
          <div className="shrink-0">
            <CircularScore score={score} grade={grade} size={72} />
          </div>

          {/* Company Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-[15px] font-bold text-gray-900 truncate" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{company.name}</h3>
              {company.fda_compliance_rating === "Gold" && (
                <Award className="w-4 h-4 text-amber-500 shrink-0" />
              )}
            </div>
            <p className="text-[11px] text-gray-400 mb-2 font-medium">{company.section}</p>
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold text-white"
                style={{ background: style.accent }}
              >
                {grade === "A+" && <ShieldCheck className="w-3 h-3" />}
                {(grade === "A" || grade === "B") && <Shield className="w-3 h-3" />}
                {(grade === "C" || grade === "D") && <ShieldAlert className="w-3 h-3" />}
                {grade === "F" && <XCircle className="w-3 h-3" />}
                Grade {grade}
              </span>
              <span className="text-[11px] text-gray-400 font-medium">{getScoreLabel(score)}</span>
              <span className="text-[11px] text-gray-300">{passCount}/{totalCount} criteria</span>
            </div>
          </div>

          {/* Score Bar */}
          <div className="hidden md:block w-36">
            <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${score}%`, background: style.accent }}
              />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-[9px] text-gray-300 font-medium">0</span>
              <span className="text-[9px] text-gray-300 font-medium">100</span>
            </div>
          </div>

          {/* Expand Arrow */}
          <div className={`transition-transform duration-200 shrink-0 ${expanded ? "rotate-180" : ""}`}>
            <svg className="w-5 h-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Expanded Detail */}
      {expanded && (
        <div className="border-t border-gray-100 px-4 md:px-5 py-5 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Criteria Checklist */}
            <div>
              <h4 className="text-[13px] font-bold text-gray-700 mb-3 flex items-center gap-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                <FileText className="w-4 h-4 text-[#0f62fe]" />
                Regulatory Criteria
              </h4>
              <div className="bg-gray-50/80 rounded-xl p-3 border border-gray-100/60">
                {criteria.map((c, i) => (
                  <CriteriaRow key={i} label={c.label} passed={c.passed} detail={c.detail} />
                ))}
              </div>
            </div>

            {/* Summary Panel */}
            <div className="space-y-4">
              <div>
                <h4 className="text-[13px] font-bold text-gray-700 mb-3 flex items-center gap-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  <Shield className="w-4 h-4 text-[#0f62fe]" />
                  Compliance Summary
                </h4>
                <div
                  className="rounded-xl p-4 border"
                  style={{ background: style.bgLight, borderColor: style.border }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <CircularScore score={score} grade={grade} size={56} />
                    <div>
                      <p className="text-base font-extrabold" style={{ color: style.accent, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{getScoreLabel(score)}</p>
                      <p className="text-[11px] text-gray-400 font-medium">Score: {score}/100</p>
                    </div>
                  </div>
                  {company.fda_compliance_description && (
                    <p className="text-[12px] text-gray-500 leading-relaxed line-clamp-4">
                      {company.fda_compliance_description}
                    </p>
                  )}
                </div>
              </div>

              {/* Regulatory Badges */}
              <div className="flex items-center gap-2 flex-wrap">
                {is351aRegistered && (
                  <div className="flex items-center gap-1.5 bg-blue-50/60 rounded-lg px-2.5 py-1.5 border border-blue-100/60">
                    <img src={LOGO_FDA} alt="FDA" className="h-5 w-auto" />
                    <span className="text-[10px] font-bold text-blue-700">351(a) Registered</span>
                  </div>
                )}
                {isCGMP && (
                  <div className="flex items-center gap-1.5 bg-green-50/60 rounded-lg px-2.5 py-1.5 border border-green-100/60">
                    <img src={LOGO_CGMP_BADGE} alt="cGMP" className="h-6 w-6 rounded-full object-cover" />
                    <span className="text-[10px] font-bold text-green-700">cGMP Compliant</span>
                  </div>
                )}
                {company.dmf?.includes("Yes") && (
                  <div className="flex items-center gap-1.5 bg-purple-50/60 rounded-lg px-2.5 py-1.5 border border-purple-100/60">
                    <FileText className="w-3.5 h-3.5 text-purple-600" />
                    <span className="text-[10px] font-bold text-purple-700">DMF Type II</span>
                  </div>
                )}
                {company.insurance_provider && (
                  <div className="flex items-center gap-1.5 bg-amber-50/60 rounded-lg px-2.5 py-1.5 border border-amber-100/60">
                    <Shield className="w-3.5 h-3.5 text-amber-600" />
                    <span className="text-[10px] font-bold text-amber-700">{company.insurance_provider}</span>
                  </div>
                )}
              </div>

              {/* Quick Facts */}
              <div className="grid grid-cols-2 gap-2">
                {company.website && (
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-gray-50 rounded-xl p-2.5 text-[11px] text-[#0f62fe] font-medium hover:bg-blue-50/50 transition-colors border border-gray-100/60"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Website
                  </a>
                )}
                {company.years_in_business && (
                  <div className="flex items-center gap-2 bg-gray-50 rounded-xl p-2.5 text-[11px] text-gray-500 font-medium border border-gray-100/60">
                    <Globe className="w-3.5 h-3.5" />
                    {company.years_in_business} yrs
                  </div>
                )}
                {company.patents && (
                  <div className="flex items-center gap-2 bg-gray-50 rounded-xl p-2.5 text-[11px] text-gray-500 font-medium border border-gray-100/60">
                    <FileText className="w-3.5 h-3.5" />
                    {company.patents.length} patent(s)
                  </div>
                )}
                {company.negative_press_count !== undefined && company.negative_press_count > 0 && (
                  <div className="flex items-center gap-2 rounded-xl p-2.5 text-[11px] text-[#da1e28] font-medium border" style={{ background: 'rgba(218, 30, 40, 0.04)', borderColor: 'rgba(218, 30, 40, 0.1)' }}>
                    <AlertTriangle className="w-3.5 h-3.5" />
                    {company.negative_press_count} report(s)
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function ReportCard({ companies }: ReportCardProps) {
  const sorted = [...companies].sort((a, b) => b.regulatoryScore - a.regulatoryScore);

  const gradeDistribution = sorted.reduce(
    (acc, c) => {
      const g = c.company_grade || "N/A";
      acc[g] = (acc[g] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const avgScore = Math.round(sorted.reduce((sum, c) => sum + c.regulatoryScore, 0) / sorted.length);

  return (
    <div className="space-y-6">
      {/* Gold Standard Criteria */}
      <div className="card-premium p-5 md:p-6 mb-4" style={{ background: 'linear-gradient(135deg, rgba(25, 128, 56, 0.03), rgba(15, 98, 254, 0.03))' }}>
        <div className="flex items-center gap-4 mb-4">
          <img src={LOGO_FDA} alt="FDA" className="h-10 w-auto opacity-80" style={{ filter: 'invert(0)' }} />
          <img src={LOGO_FDA_CGMP} alt="FDA cGMP" className="h-8 w-auto rounded" />
          <img src={LOGO_CGMP_BADGE} alt="cGMP Badge" className="h-10 w-10 rounded-full object-cover" />
          <img src={LOGO_GMP_CERTIFIED} alt="GMP Certified" className="h-10 w-10 rounded-full object-cover" />
        </div>
        <h2 className="text-lg font-extrabold text-gray-900 mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          Gold Standard Criteria
        </h2>
        <p className="text-xs text-gray-500 mb-4">A company must meet ALL of the following to qualify for Gold (A+) rating:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {[
            { label: "351(a) FDA CBER Drug Registration", desc: "Active registration under Section 351(a) of the PHS Act" },
            { label: "cGMP Manufacturing (21 CFR 210/211)", desc: "Current Good Manufacturing Practice compliance" },
            { label: "Batch-by-Batch Third-Party Testing", desc: "Full COA per batch via independent lab (e.g., Eurofins)" },
            { label: "25% Batch Retention for 5 Years", desc: "Per FDA CBER drug recall rules" },
            { label: "Owns Manufacturing Facility", desc: "Company-owned laboratory, not a contract manufacturer" },
            { label: "Drug Master File (DMF Type II)", desc: "Filed with FDA containing manufacturing details" },
            { label: "Products Liability Insurance", desc: "Active CNA or equivalent coverage" },
            { label: "No FDA Warning Letters", desc: "Zero enforcement actions from CBER" },
            { label: "Patent Portfolio", desc: "Granted or pending USPTO patents" },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 bg-white/60 rounded-lg p-2.5 border border-gray-100/60">
              <CheckCircle className="w-3.5 h-3.5 text-[#198038] shrink-0 mt-0.5" />
              <div>
                <p className="text-[11px] font-semibold text-gray-700">{item.label}</p>
                <p className="text-[10px] text-gray-400">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 p-2.5 bg-amber-50/80 rounded-lg border border-amber-200/40">
          <p className="text-[11px] text-amber-700 font-medium">Only DynaCord meets all Gold Standard criteria. No other exosome manufacturer in the database qualifies for A+ rating.</p>
        </div>
      </div>

      {/* FDA CBER Banner */}
      <div className="card-premium overflow-hidden mb-4">
        <img src={LOGO_FDA_CBER} alt="FDA CBER - Center for Biologics Evaluation and Research" className="w-full h-auto rounded-lg" />
        <div className="p-4">
          <p className="text-xs text-gray-500 leading-relaxed">
            FDA's Center for Biologics Evaluation and Research (CBER) regulates biological products including exosomes under Section 351(a) of the Public Health Service Act. Products manufactured as drugs require an active IND/BLA and must comply with 21 CFR 210/211 cGMP standards.
          </p>
        </div>
      </div>

      {/* FDA Regulatory Flowcharts */}
      <div className="card-premium p-5 md:p-6 mb-4">
        <h2 className="text-lg font-extrabold text-gray-900 mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          How the FDA Regulates Cell-Based Products
        </h2>
        <p className="text-xs text-gray-500 mb-4">Understanding the regulatory pathways: 21 CFR 1271, 361 HCT/P, 351 HCT/P, and IDE/510K classifications.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-[11px] font-semibold text-gray-600 mb-2">Product Classification Pathways</p>
            <ImageLightbox src={LOGO_FDA_REGULATION} alt="How the FDA regulates products - classification flowchart" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-gray-600 mb-2">4 Criteria for 361 HCT/P Exemption</p>
            <ImageLightbox src={LOGO_FDA_CRITERIA} alt="Cell Based Therapy must meet 4 basic criteria to be unregulated" />
          </div>
        </div>
        <div className="mt-4 p-3 bg-blue-50/60 rounded-lg border border-blue-100/60">
          <p className="text-[11px] text-blue-700 font-medium leading-relaxed">
            Cell-based therapy must meet 4 criteria to qualify as a 361 HCT/P: minimal manipulation, homologous use, no combination with drugs/devices, and no systemic effect. If any criterion fails, the product is regulated as a 351 drug and requires an IND/BLA from FDA CBER.
          </p>
        </div>
      </div>

      {/* Summary Header */}
      <div className="card-premium p-5 md:p-6">
        <h2 className="text-lg font-extrabold text-gray-900 mb-5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          Industry Report Card
        </h2>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2 md:gap-3">
          {["A+", "A", "B", "C", "D", "F"].map((grade) => {
            const s = getGradeStyle(grade);
            const count = gradeDistribution[grade] || 0;
            return (
              <div
                key={grade}
                className="rounded-xl p-3 text-center border transition-all hover:scale-[1.02]"
                style={{ background: s.bgLight, borderColor: s.border }}
              >
                <div className="text-2xl font-extrabold" style={{ color: s.accent, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{grade}</div>
                <div className="text-[10px] text-gray-400 mt-1 font-medium">
                  {count} {count === 1 ? "company" : "companies"}
                </div>
              </div>
            );
          })}
          <div className="rounded-xl p-3 text-center border border-gray-100 bg-gray-50/50">
            <div className="text-2xl font-extrabold text-gray-700" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{avgScore}</div>
            <div className="text-[10px] text-gray-400 mt-1 font-medium">Avg Score</div>
          </div>
        </div>
      </div>

      {/* Company Cards */}
      <div className="space-y-3">
        {sorted.map((company) => (
          <CompanyReportCard key={company.id} company={company} />
        ))}
      </div>
    </div>
  );
}
