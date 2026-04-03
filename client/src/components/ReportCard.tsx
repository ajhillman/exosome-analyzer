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
} from "lucide-react";
import { useState } from "react";

interface ReportCardProps {
  companies: ExosomeCompany[];
}

function getGradeColor(grade: string) {
  switch (grade) {
    case "A+":
      return { bg: "bg-emerald-500", text: "text-white", ring: "ring-emerald-300", light: "bg-emerald-50", border: "border-emerald-200", textDark: "text-emerald-800" };
    case "A":
      return { bg: "bg-green-500", text: "text-white", ring: "ring-green-300", light: "bg-green-50", border: "border-green-200", textDark: "text-green-800" };
    case "B":
      return { bg: "bg-blue-500", text: "text-white", ring: "ring-blue-300", light: "bg-blue-50", border: "border-blue-200", textDark: "text-blue-800" };
    case "C":
      return { bg: "bg-amber-500", text: "text-white", ring: "ring-amber-300", light: "bg-amber-50", border: "border-amber-200", textDark: "text-amber-800" };
    case "D":
      return { bg: "bg-orange-500", text: "text-white", ring: "ring-orange-300", light: "bg-orange-50", border: "border-orange-200", textDark: "text-orange-800" };
    case "F":
      return { bg: "bg-red-500", text: "text-white", ring: "ring-red-300", light: "bg-red-50", border: "border-red-200", textDark: "text-red-800" };
    default:
      return { bg: "bg-gray-400", text: "text-white", ring: "ring-gray-300", light: "bg-gray-50", border: "border-gray-200", textDark: "text-gray-800" };
  }
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
  const colors = getGradeColor(grade);
  const radius = (size - 12) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;
  const strokeColor =
    grade === "A+" ? "#10b981" :
    grade === "A" ? "#22c55e" :
    grade === "B" ? "#3b82f6" :
    grade === "C" ? "#f59e0b" :
    grade === "D" ? "#f97316" :
    "#ef4444";

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="6"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={strokeColor}
          strokeWidth="6"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-2xl font-black ${colors.textDark}`}>{grade}</span>
        <span className="text-[10px] text-gray-500 font-medium">{score}/100</span>
      </div>
    </div>
  );
}

function CriteriaRow({ label, passed, detail }: { label: string; passed: boolean | null; detail?: string }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
      <div className="flex items-center gap-2">
        {passed === true && <CheckCircle className="w-4 h-4 text-emerald-500" />}
        {passed === false && <XCircle className="w-4 h-4 text-red-500" />}
        {passed === null && <AlertTriangle className="w-4 h-4 text-amber-500" />}
        <span className="text-sm text-gray-700">{label}</span>
      </div>
      {detail && <span className="text-xs text-gray-500 max-w-[200px] text-right">{detail}</span>}
    </div>
  );
}

function CompanyReportCard({ company }: { company: ExosomeCompany }) {
  const [expanded, setExpanded] = useState(false);
  const grade = company.company_grade || "N/A";
  const colors = getGradeColor(grade);
  const score = company.regulatoryScore;

  const criteria = [
    {
      label: "FDA Drug Manufacturer Registration",
      passed: company.section?.includes("351(a)") && !company.section?.includes("Investigational") ? true : company.section?.includes("351(a)") ? null : false,
      detail: company.section || "Unknown",
    },
    {
      label: "cGMP Manufacturing",
      passed: company.manufacturing?.includes("cGMP") && !company.manufacturing?.includes("deviations") ? true : company.manufacturing?.includes("cGMP") ? null : false,
      detail: company.manufacturing,
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
      label: "Drug Master File (DMF)",
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
    <div className={`bg-white rounded-2xl border ${colors.border} shadow-sm overflow-hidden transition-all duration-300 ${expanded ? "ring-2 " + colors.ring : ""}`}>
      <div
        className="p-5 cursor-pointer hover:bg-gray-50/50 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-5">
          {/* Logo */}
          <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden shrink-0">
            {company.company_logo_url ? (
              <img src={company.company_logo_url} alt={company.name} className="w-10 h-10 object-contain" />
            ) : (
              <Globe className="w-6 h-6 text-gray-400" />
            )}
          </div>

          {/* Score Circle */}
          <CircularScore score={score} grade={grade} size={80} />

          {/* Company Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-base font-bold text-gray-900 truncate">{company.name}</h3>
              {company.fda_compliance_rating === "Gold" && (
                <Award className="w-4 h-4 text-amber-500 shrink-0" />
              )}
            </div>
            <p className="text-xs text-gray-500 mb-2">{company.section}</p>
            <div className="flex items-center gap-3">
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${colors.bg} ${colors.text}`}>
                {grade === "A+" && <ShieldCheck className="w-3 h-3" />}
                {(grade === "A" || grade === "B") && <Shield className="w-3 h-3" />}
                {(grade === "C" || grade === "D") && <ShieldAlert className="w-3 h-3" />}
                {grade === "F" && <XCircle className="w-3 h-3" />}
                Grade {grade}
              </span>
              <span className="text-xs text-gray-500">{getScoreLabel(score)}</span>
              <span className="text-xs text-gray-400">{passCount}/{totalCount} criteria met</span>
            </div>
          </div>

          {/* Score Bar */}
          <div className="hidden md:block w-40">
            <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
              <div
                className={`${colors.bg} h-full rounded-full transition-all duration-700`}
                style={{ width: `${score}%` }}
              />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-[10px] text-gray-400">0</span>
              <span className="text-[10px] text-gray-400">100</span>
            </div>
          </div>

          {/* Expand Arrow */}
          <div className={`transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}>
            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Expanded Detail */}
      {expanded && (
        <div className="border-t border-gray-100 px-5 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Criteria Checklist */}
            <div>
              <h4 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600" />
                Regulatory Criteria
              </h4>
              <div className="bg-gray-50 rounded-xl p-3">
                {criteria.map((c, i) => (
                  <CriteriaRow key={i} label={c.label} passed={c.passed} detail={c.detail} />
                ))}
              </div>
            </div>

            {/* Summary Panel */}
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-blue-600" />
                  Compliance Summary
                </h4>
                <div className={`${colors.light} ${colors.border} border rounded-xl p-4`}>
                  <div className="flex items-center gap-3 mb-3">
                    <CircularScore score={score} grade={grade} size={60} />
                    <div>
                      <p className={`text-lg font-black ${colors.textDark}`}>{getScoreLabel(score)}</p>
                      <p className="text-xs text-gray-500">Regulatory Score: {score}/100</p>
                    </div>
                  </div>
                  {company.fda_compliance_description && (
                    <p className="text-xs text-gray-600 leading-relaxed line-clamp-4">
                      {company.fda_compliance_description}
                    </p>
                  )}
                </div>
              </div>

              {/* Quick Facts */}
              <div className="grid grid-cols-2 gap-2">
                {company.website && (
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-gray-50 rounded-lg p-2.5 text-xs text-blue-600 hover:bg-blue-50 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Website
                  </a>
                )}
                {company.years_in_business && (
                  <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-2.5 text-xs text-gray-600">
                    <Globe className="w-3.5 h-3.5" />
                    {company.years_in_business} yrs in business
                  </div>
                )}
                {company.patents && (
                  <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-2.5 text-xs text-gray-600">
                    <FileText className="w-3.5 h-3.5" />
                    {company.patents.length} patent(s)
                  </div>
                )}
                {company.negative_press_count !== undefined && company.negative_press_count > 0 && (
                  <div className="flex items-center gap-2 bg-red-50 rounded-lg p-2.5 text-xs text-red-600">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    {company.negative_press_count} negative report(s)
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
      {/* Summary Header */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
          Industry Report Card
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {["A+", "A", "B", "C", "D", "F"].map((grade) => {
            const colors = getGradeColor(grade);
            const count = gradeDistribution[grade] || 0;
            return (
              <div
                key={grade}
                className={`${colors.light} ${colors.border} border rounded-xl p-3 text-center`}
              >
                <div className={`text-2xl font-black ${colors.textDark}`}>{grade}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {count} {count === 1 ? "company" : "companies"}
                </div>
              </div>
            );
          })}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-center">
            <div className="text-2xl font-black text-gray-700">{avgScore}</div>
            <div className="text-xs text-gray-500 mt-1">Avg Score</div>
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
