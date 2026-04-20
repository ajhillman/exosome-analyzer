import { ComplianceBadge } from "@/components/ComplianceBadge";
import { ExosomeCompany } from "@/types";
import {
  AlertTriangle,
  Award,
  Building2,
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

function ScoreRing({ score, size = 44 }: { score: number; size?: number }) {
  const radius = (size - 6) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color =
    score >= 80
      ? "#198038"
      : score >= 60
        ? "#b28600"
        : score >= 40
          ? "#eb6200"
          : "#da1e28";

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(0,0,0,0.06)"
          strokeWidth={3}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={3}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-700"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-bold" style={{ color, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{score}</span>
      </div>
    </div>
  );
}

function GradeIndicator({ grade }: { grade?: string }) {
  const styles: Record<string, { bg: string; text: string; border: string }> = {
    "A+": { bg: "rgba(25, 128, 56, 0.08)", text: "#198038", border: "rgba(25, 128, 56, 0.2)" },
    A: { bg: "rgba(25, 128, 56, 0.06)", text: "#198038", border: "rgba(25, 128, 56, 0.15)" },
    B: { bg: "rgba(15, 98, 254, 0.06)", text: "#0f62fe", border: "rgba(15, 98, 254, 0.15)" },
    C: { bg: "rgba(178, 134, 0, 0.06)", text: "#b28600", border: "rgba(178, 134, 0, 0.15)" },
    D: { bg: "rgba(235, 98, 0, 0.06)", text: "#eb6200", border: "rgba(235, 98, 0, 0.15)" },
    F: { bg: "rgba(218, 30, 40, 0.06)", text: "#da1e28", border: "rgba(218, 30, 40, 0.15)" },
  };
  const s = styles[grade || "C"] || styles.C;
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold shrink-0"
      style={{ background: s.bg, color: s.text, border: `1px solid ${s.border}`, fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      {grade || "N/A"}
    </span>
  );
}

export function CompanyTable({ companies }: CompanyTableProps) {
  const [selectedCompany, setSelectedCompany] = useState<ExosomeCompany | null>(null);

  return (
    <>
      <div className="space-y-2.5">
        {companies.length === 0 ? (
          <div className="text-center py-16 card-premium">
            <p className="text-gray-400 text-base font-medium">No companies match your filters.</p>
            <p className="text-gray-300 text-sm mt-2">Try adjusting your search criteria.</p>
          </div>
        ) : (
          companies.map((company, index) => (
            <div
              key={company.id}
              onClick={() => setSelectedCompany(company)}
              className="card-premium cursor-pointer group"
              style={{
                animationDelay: `${index * 0.03}s`,
                ...(company.id === "dynacord" ? {
                  border: '1px solid rgba(15, 98, 254, 0.2)',
                  boxShadow: '0 0 0 1px rgba(15, 98, 254, 0.08), 0 2px 8px rgba(15, 98, 254, 0.06)',
                } : company.hasWarningLetter ? {
                  border: '1px solid rgba(218, 30, 40, 0.12)',
                } : {}),
              }}
            >
              {company.id === "dynacord" && (
                <div className="dynacord-glow text-white px-5 py-2 rounded-t-2xl flex items-center gap-2">
                  <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300 shrink-0" />
                  <span className="text-[11px] font-semibold tracking-[0.08em] uppercase">
                    Gold Standard, 351(a) Registered, cGMP Compliant
                  </span>
                </div>
              )}

              <div className="p-4">
                {/* Single unified row: Logo | Name+Grade+Source | Score+Arrow */}
                <div className="flex items-center gap-3">
                  {/* Logo */}
                  <div className="w-11 h-11 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden shrink-0 p-1.5">
                    {company.company_logo_url ? (
                      <img
                        src={company.company_logo_url}
                        alt={company.name}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                          (e.target as HTMLImageElement).parentElement!.innerHTML = `<span class="text-base font-bold text-gray-300" style="font-family: 'Plus Jakarta Sans', sans-serif">${company.name.charAt(0)}</span>`;
                        }}
                      />
                    ) : (
                      <span className="text-base font-bold text-gray-300" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        {company.name.charAt(0)}
                      </span>
                    )}
                  </div>

                  {/* Name + Grade + Source */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm font-bold text-gray-900 group-hover:text-[#0f62fe] transition-colors truncate" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        {company.name}
                      </h3>
                      <GradeIndicator grade={company.company_grade} />
                      {company.hasWarningLetter && (
                        <span className="warning-badge shrink-0">
                          <AlertTriangle className="w-3 h-3" />
                          <span className="hidden sm:inline">FDA Warning</span>
                          <span className="sm:hidden">FDA</span>
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-gray-400 mt-0.5 truncate font-medium">{company.source}</p>
                    <div className="flex items-center gap-3 mt-0.5 flex-wrap">
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
                          className="inline-flex items-center gap-1 text-[11px] text-[#0f62fe] hover:text-[#0043ce] font-medium transition-colors"
                        >
                          <Globe className="w-3 h-3" />
                          <span className="hidden sm:inline">{company.website.replace(/^https?:\/\/(www\.)?/, "")}</span>
                          <ExternalLink className="w-2.5 h-2.5 opacity-50 hidden sm:inline" />
                        </a>
                      )}
                      {company.company_age && company.company_age > 0 && (
                        <span className="inline-flex items-center gap-1 text-[11px] text-gray-400 font-medium">
                          <Building2 className="w-3 h-3" />
                          {company.company_age} {company.company_age === 1 ? 'year' : 'years'} in business
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Score Ring + Arrow */}
                  <div className="flex items-center gap-2 shrink-0">
                    <ScoreRing score={company.regulatoryScore} size={40} />
                    <ChevronRight className="w-4 h-4 text-gray-200 group-hover:text-[#0f62fe] transition-colors" />
                  </div>
                </div>

                {/* Badges row */}
                <div className="flex flex-wrap gap-1.5 mt-3 pl-14">
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
                    <span className="badge-premium" style={{ background: 'rgba(0, 157, 154, 0.06)', color: '#009d9a', border: '1px solid rgba(0, 157, 154, 0.15)' }}>
                      <Shield className="w-2.5 h-2.5" />
                      COA
                    </span>
                  )}
                  {company.insurance_coverage && (
                    <span className="badge-premium" style={{ background: 'rgba(105, 41, 196, 0.06)', color: '#6929c4', border: '1px solid rgba(105, 41, 196, 0.15)' }}>
                      <Award className="w-2.5 h-2.5" />
                      Insured
                    </span>
                  )}
                  {company.patents && company.patents.length > 0 && (
                    <span className="badge-premium" style={{ background: 'rgba(15, 98, 254, 0.06)', color: '#0f62fe', border: '1px solid rgba(15, 98, 254, 0.15)' }}>
                      {company.patents.length} Patents
                    </span>
                  )}
                  {company.dmf.includes("Yes") && (
                    <span className="badge-premium" style={{ background: 'rgba(0, 157, 154, 0.06)', color: '#009d9a', border: '1px solid rgba(0, 157, 154, 0.15)' }}>
                      DMF
                    </span>
                  )}
                  {company.third_party_testing && company.third_party_testing.includes("Eurofins") && (
                    <span className="badge-premium" style={{ background: 'rgba(105, 41, 196, 0.06)', color: '#6929c4', border: '1px solid rgba(105, 41, 196, 0.15)' }}>
                      3rd Party Lab
                    </span>
                  )}
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
