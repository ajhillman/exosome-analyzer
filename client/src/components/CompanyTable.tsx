import { ComplianceBadge } from "@/components/ComplianceBadge";
import { ExosomeCompany } from "@/types";
import {
  AlertTriangle,
  Award,
  ChevronRight,
  ExternalLink,
  Globe,
  Shield,
  Star,
} from "lucide-react";
import { useState } from "react";
import { CompanyDetailModal } from "./CompanyDetailModal";

interface CompanyTableProps {
  companies: ExosomeCompany[];
}

function ScoreRing({ score, size = 48 }: { score: number; size?: number }) {
  const radius = (size - 6) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color =
    score >= 80
      ? "#10b981"
      : score >= 60
        ? "#f59e0b"
        : score >= 40
          ? "#f97316"
          : "#ef4444";

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={4}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={4}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-700"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-bold text-gray-800">{score}</span>
      </div>
    </div>
  );
}

function GradeIndicator({ grade }: { grade?: string }) {
  const colors: Record<string, string> = {
    "A+": "bg-emerald-100 text-emerald-800 border-emerald-200",
    A: "bg-green-100 text-green-800 border-green-200",
    B: "bg-blue-100 text-blue-800 border-blue-200",
    C: "bg-yellow-100 text-yellow-800 border-yellow-200",
    D: "bg-orange-100 text-orange-800 border-orange-200",
    F: "bg-red-100 text-red-800 border-red-200",
  };
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold border ${colors[grade || "C"] || colors.C}`}
    >
      {grade || "N/A"}
    </span>
  );
}

export function CompanyTable({ companies }: CompanyTableProps) {
  const [selectedCompany, setSelectedCompany] = useState<ExosomeCompany | null>(null);

  return (
    <>
      <div className="space-y-3">
        {companies.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl shadow-sm">
            <p className="text-gray-500 text-lg">No companies match your filters.</p>
            <p className="text-gray-400 text-sm mt-2">Try adjusting your search criteria.</p>
          </div>
        ) : (
          companies.map((company) => (
            <div
              key={company.id}
              onClick={() => setSelectedCompany(company)}
              className={`bg-white rounded-2xl shadow-sm border hover:shadow-lg transition-all duration-200 cursor-pointer group ${
                company.id === "dynacord"
                  ? "border-blue-200 ring-1 ring-blue-100"
                  : company.hasWarningLetter
                    ? "border-red-100"
                    : "border-gray-100"
              }`}
            >
              {company.id === "dynacord" && (
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-1.5 rounded-t-2xl flex items-center gap-2">
                  <Star className="w-3.5 h-3.5 fill-yellow-300 text-yellow-300" />
                  <span className="text-xs font-semibold tracking-wide">
                    GOLD STANDARD - 351(a) REGISTERED - cGMP COMPLIANT
                  </span>
                </div>
              )}

              <div className="p-4">
                <div className="flex items-start gap-4">
                  {/* Logo */}
                  <div className="w-14 h-14 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden shrink-0">
                    {company.company_logo_url ? (
                      <img
                        src={company.company_logo_url}
                        alt={company.name}
                        className="w-full h-full object-cover rounded-xl"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                          (e.target as HTMLImageElement).parentElement!.innerHTML = `<span class="text-lg font-bold text-gray-400">${company.name.charAt(0)}</span>`;
                        }}
                      />
                    ) : (
                      <span className="text-lg font-bold text-gray-400">
                        {company.name.charAt(0)}
                      </span>
                    )}
                  </div>

                  {/* Main Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
                            {company.name}
                          </h3>
                          <GradeIndicator grade={company.company_grade} />
                          {company.hasWarningLetter && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium bg-red-100 text-red-700 border border-red-200">
                              <AlertTriangle className="w-3 h-3" />
                              FDA Warning
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">{company.source}</p>
                        {company.website && (
                          <a
                            href={
                              company.website.startsWith("http")
                                ? company.website
                                : `https://${company.website}`
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 mt-1"
                          >
                            <Globe className="w-3 h-3" />
                            {company.website.replace(/^https?:\/\/(www\.)?/, "")}
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}
                      </div>

                      <div className="flex items-center gap-3">
                        <ScoreRing score={company.regulatoryScore} />
                        <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-blue-500 transition-colors" />
                      </div>
                    </div>

                    {/* Badges Row */}
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {company.section.includes("351(a)") ? (
                        <ComplianceBadge type={company.section.includes("Investigational") ? "351a-inv" : "351a"} label={company.section} size="sm" />
                      ) : (
                        <ComplianceBadge type="361" label={company.section} size="sm" />
                      )}
                      {company.manufacturing.includes("cGMP") ? (
                        <ComplianceBadge type="cgmp" label="cGMP" size="sm" />
                      ) : (
                        <ComplianceBadge type="gmp" label="GMP" size="sm" />
                      )}
                      {company.coa.includes("Yes") && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-teal-50 text-teal-700 border border-teal-200">
                          <Shield className="w-2.5 h-2.5" />
                          COA
                        </span>
                      )}
                      {company.insurance_coverage && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-indigo-50 text-indigo-700 border border-indigo-200">
                          <Award className="w-2.5 h-2.5" />
                          Insured
                        </span>
                      )}
                      {company.patents && company.patents.length > 0 && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-purple-50 text-purple-700 border border-purple-200">
                          {company.patents.length} Patents
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {selectedCompany && (
        <CompanyDetailModal
          company={selectedCompany}
          onClose={() => setSelectedCompany(null)}
        />
      )}
    </>
  );
}
