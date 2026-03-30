import { ComplianceBadge } from "@/components/ComplianceBadge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ExosomeCompany } from "@/types";
import {
  AlertTriangle,
  Award,
  BookOpen,
  Building2,
  CheckCircle,
  ExternalLink,
  FileText,
  Globe,
  MapPin,
  Shield,
  Star,
  Users,
  XCircle,
} from "lucide-react";

interface CompanyDetailModalProps {
  company: ExosomeCompany;
  onClose: () => void;
}

function ScoreBar({ score }: { score: number }) {
  const color =
    score >= 80
      ? "bg-emerald-500"
      : score >= 60
        ? "bg-amber-500"
        : score >= 40
          ? "bg-orange-500"
          : "bg-red-500";
  return (
    <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
      <div
        className={`${color} h-full rounded-full transition-all duration-700`}
        style={{ width: `${score}%` }}
      />
    </div>
  );
}

export function CompanyDetailModal({ company, onClose }: CompanyDetailModalProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0 gap-0">
        {/* Header with gradient */}
        {company.id === "dynacord" ? (
          <div className="bg-gradient-to-r from-blue-700 to-blue-900 p-6 text-white">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-4 h-4 fill-yellow-300 text-yellow-300" />
              <span className="text-xs font-semibold tracking-wider uppercase opacity-90">
                Gold Standard - 351(a) Registered
              </span>
            </div>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-white flex items-center gap-3">
                {company.company_logo_url && (
                  <img
                    src={company.company_logo_url}
                    alt={company.name}
                    className="w-12 h-12 rounded-xl border-2 border-white/30 object-cover"
                  />
                )}
                {company.name}
              </DialogTitle>
            </DialogHeader>
            <p className="text-blue-200 text-sm mt-1">{company.source}</p>
          </div>
        ) : (
          <div className={`p-6 ${company.hasWarningLetter ? "bg-red-50" : "bg-gray-50"}`}>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                {company.company_logo_url && (
                  <img
                    src={company.company_logo_url}
                    alt={company.name}
                    className="w-12 h-12 rounded-xl border border-gray-200 object-cover"
                  />
                )}
                {company.name}
                {company.hasWarningLetter && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium bg-red-100 text-red-700">
                    <AlertTriangle className="w-3 h-3" />
                    FDA Warning Letter
                  </span>
                )}
              </DialogTitle>
            </DialogHeader>
            <p className="text-gray-500 text-sm mt-1">{company.source}</p>
          </div>
        )}

        <div className="p-6 space-y-6">
          {/* Website Link */}
          {company.website && (
            <a
              href={
                company.website.startsWith("http")
                  ? company.website
                  : `https://${company.website}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-xl hover:bg-blue-100 transition-colors text-sm font-medium"
            >
              <Globe className="w-4 h-4" />
              {company.website.replace(/^https?:\/\/(www\.)?/, "")}
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}

          {/* Score Section */}
          <div className="bg-gray-50 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-gray-600">Regulatory Score</span>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-gray-900">{company.regulatoryScore}</span>
                <span className="text-sm text-gray-400">/100</span>
              </div>
            </div>
            <ScoreBar score={company.regulatoryScore} />
            <div className="flex justify-between mt-2 text-[10px] text-gray-400 font-medium">
              <span>Critical</span>
              <span>Low</span>
              <span>Moderate</span>
              <span>Compliant</span>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <div className="text-xs text-gray-500 mb-1">Grade</div>
              <div className="text-lg font-bold text-gray-900">{company.company_grade || "N/A"}</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <div className="text-xs text-gray-500 mb-1">Risk Level</div>
              <div className={`text-sm font-bold ${
                company.regulatory_risk_level === "Lowest" || company.regulatory_risk_level === "Low"
                  ? "text-green-700"
                  : company.regulatory_risk_level === "Moderate"
                    ? "text-amber-700"
                    : "text-red-700"
              }`}>
                {company.regulatory_risk_level || "N/A"}
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <div className="text-xs text-gray-500 mb-1">FDA Rating</div>
              <div className={`text-sm font-bold ${
                company.fda_compliance_rating === "Gold"
                  ? "text-amber-600"
                  : company.fda_compliance_rating === "Silver"
                    ? "text-gray-500"
                    : "text-red-600"
              }`}>
                {company.fda_compliance_rating || "N/A"}
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <div className="text-xs text-gray-500 mb-1">Years Active</div>
              <div className="text-lg font-bold text-gray-900">{company.years_in_business || company.company_age || "N/A"}</div>
            </div>
          </div>

          {/* Regulatory Status */}
          <div>
            <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
              <Shield className="w-4 h-4 text-blue-600" />
              Regulatory Status
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white border border-gray-100 rounded-xl p-3">
                <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1.5">Section</p>
                {company.section.includes("351(a)") ? (
                  <ComplianceBadge type="351a" label={company.section} size="md" />
                ) : (
                  <ComplianceBadge type="361" label={company.section} size="md" />
                )}
              </div>
              <div className="bg-white border border-gray-100 rounded-xl p-3">
                <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1.5">Manufacturing</p>
                {company.manufacturing.includes("cGMP") ? (
                  <ComplianceBadge type="cgmp" label="cGMP" size="md" />
                ) : (
                  <ComplianceBadge type="gmp" label="GMP" size="md" />
                )}
              </div>
              <div className="bg-white border border-gray-100 rounded-xl p-3">
                <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1.5">FDA Status</p>
                {company.hasWarningLetter ? (
                  <ComplianceBadge type="warning" label={company.fda_status} size="md" />
                ) : (
                  <ComplianceBadge type="no-warning" label={company.fda_status} size="md" />
                )}
              </div>
              <div className="bg-white border border-gray-100 rounded-xl p-3">
                <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1.5">COA</p>
                {company.coa.includes("Yes") ? (
                  <ComplianceBadge type="cgmp" label={company.coa} size="md" />
                ) : (
                  <ComplianceBadge type="gmp" label={company.coa} size="md" />
                )}
              </div>
            </div>
          </div>

          {/* Manufacturing Details */}
          <div>
            <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-blue-600" />
              Manufacturing Details
            </h3>
            <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <tbody>
                  {company.iso_cleanroom && (
                    <tr className="border-b border-gray-50">
                      <td className="px-4 py-2.5 text-gray-500 font-medium w-40">Cleanroom</td>
                      <td className="px-4 py-2.5 text-gray-900">{company.iso_cleanroom}</td>
                    </tr>
                  )}
                  {company.storage_method && (
                    <tr className="border-b border-gray-50">
                      <td className="px-4 py-2.5 text-gray-500 font-medium">Storage</td>
                      <td className="px-4 py-2.5 text-gray-900">{company.storage_method}</td>
                    </tr>
                  )}
                  {company.container_type && (
                    <tr className="border-b border-gray-50">
                      <td className="px-4 py-2.5 text-gray-500 font-medium">Container</td>
                      <td className="px-4 py-2.5 text-gray-900">{company.container_type}</td>
                    </tr>
                  )}
                  {company.facility_location && (
                    <tr className="border-b border-gray-50">
                      <td className="px-4 py-2.5 text-gray-500 font-medium">Facility</td>
                      <td className="px-4 py-2.5 text-gray-900 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-gray-400" />
                        {company.facility_location}
                      </td>
                    </tr>
                  )}
                  {company.third_party_testing && (
                    <tr className="border-b border-gray-50">
                      <td className="px-4 py-2.5 text-gray-500 font-medium">Testing</td>
                      <td className="px-4 py-2.5 text-gray-900">{company.third_party_testing}</td>
                    </tr>
                  )}
                  {company.post_thaw_viability && (
                    <tr>
                      <td className="px-4 py-2.5 text-gray-500 font-medium">Viability</td>
                      <td className="px-4 py-2.5 text-gray-900">{company.post_thaw_viability}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Insurance */}
          {company.insurance_coverage && (
            <div>
              <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                <Award className="w-4 h-4 text-blue-600" />
                Insurance Coverage
              </h3>
              <div className="bg-green-50 border border-green-100 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-semibold text-green-800">
                    {company.insurance_provider || "Products Liability Insurance"}
                  </span>
                </div>
                {company.insurance_coverage_amount && (
                  <p className="text-sm text-green-700 ml-6">Coverage: {company.insurance_coverage_amount}</p>
                )}
                {company.insurance_policy_number && (
                  <p className="text-xs text-green-600 ml-6 mt-0.5">Policy: {company.insurance_policy_number}</p>
                )}
              </div>
            </div>
          )}

          {/* Patents */}
          {company.patents && company.patents.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600" />
                Patents ({company.patents.length})
              </h3>
              <div className="space-y-2">
                {company.patents.map((patent, i) => (
                  <div
                    key={i}
                    className="bg-purple-50 border border-purple-100 rounded-xl p-3 text-sm text-purple-900"
                  >
                    {patent}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* COA Bioactive Markers */}
          {company.coa_bioactive_markers && company.coa_bioactive_markers.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-600" />
                COA Bioactive Markers
              </h3>
              <div className="space-y-1.5">
                {company.coa_bioactive_markers.map((marker, i) => (
                  <div
                    key={i}
                    className="bg-teal-50 border border-teal-100 rounded-lg px-3 py-2 text-xs text-teal-900"
                  >
                    {marker}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Leadership Team */}
          {company.leadership_team && company.leadership_team.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-600" />
                Leadership Team
              </h3>
              <div className="space-y-3">
                {company.leadership_team.map((member, i) => (
                  <div key={i} className="bg-white border border-gray-100 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-xs font-bold text-blue-700">
                          {member.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">{member.name}</p>
                        {member.title && (
                          <p className="text-xs text-gray-500">{member.title}</p>
                        )}
                      </div>
                    </div>
                    {member.background && (
                      <p className="text-xs text-gray-600 mt-2 leading-relaxed">{member.background}</p>
                    )}
                    {member.regulatory_history && (
                      <div className="mt-2 bg-blue-50 rounded-lg p-2">
                        <p className="text-[10px] text-blue-600 font-semibold uppercase tracking-wider mb-1">Regulatory History</p>
                        <p className="text-xs text-blue-800 leading-relaxed">{member.regulatory_history}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notes */}
          <div>
            <h3 className="text-sm font-bold text-gray-700 mb-2">Notes</h3>
            <p className="text-sm text-gray-600 bg-gray-50 p-4 rounded-xl leading-relaxed">
              {company.notes}
            </p>
          </div>

          {/* Negative Press / Litigation */}
          {(company.litigation_count !== undefined && company.litigation_count > 0) && (
            <div>
              <h3 className="text-sm font-bold text-red-700 mb-3 flex items-center gap-2">
                <XCircle className="w-4 h-4 text-red-600" />
                Litigation ({company.litigation_count} cases)
              </h3>
              {company.litigation_cases?.map((c, i) => (
                <div key={i} className="bg-red-50 border border-red-100 rounded-xl p-3 mb-2">
                  <p className="text-sm font-medium text-red-900">{c.case_name}</p>
                  {c.court && <p className="text-xs text-red-700 mt-1">{c.court}</p>}
                  {c.allegations && (
                    <ul className="mt-1 space-y-0.5">
                      {c.allegations.map((a, j) => (
                        <li key={j} className="text-xs text-red-800">- {a}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Close Button */}
          <div className="pt-2">
            <button
              onClick={onClose}
              className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-medium transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
