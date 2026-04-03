import { useState } from "react";
import {
  complianceCategories,
  dynacordStandards,
  complianceComparison,
  violationTable,
  texasLegalFramework,
} from "../data/compliance-case";
import {
  Shield,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ExternalLink,
  ChevronDown,
  ChevronRight,
  Scale,
  FileText,
  Beaker,
  FlaskConical,
  Package,
  Snowflake,
} from "lucide-react";

const categoryIcons: Record<string, React.ReactNode> = {
  "grey-market-361": <AlertTriangle className="w-5 h-5 text-amber-500" />,
  "rose-plant": <FlaskConical className="w-5 h-5 text-pink-500" />,
  "conditioned-media": <Beaker className="w-5 h-5 text-orange-500" />,
  "research-vials": <Package className="w-5 h-5 text-red-500" />,
  "lyophilized": <Snowflake className="w-5 h-5 text-blue-400" />,
};

export default function ComplianceCase() {
  const [activeSection, setActiveSection] = useState<"categories" | "comparison" | "violations" | "texas">("categories");
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [expandedStandard, setExpandedStandard] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-6 md:p-8 border border-slate-700/50">
        <div className="flex items-center gap-3 mb-3">
          <Shield className="w-8 h-8 text-emerald-400" />
          <h2 className="text-2xl font-bold text-white">Why DynaCord Is Different</h2>
        </div>
        <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-3xl">
          The exosome market has a serious problem. Most products sold in the United States today are legally non-compliant.
          Some are dangerous. None have reached the manufacturing and documentation standard that DynaCord's WJ-MSC mesenchymal
          exosome product has achieved. This page explains what every other product gets wrong, what the law requires, and how
          DynaCord meets every standard that others fail.
        </p>
      </div>

      {/* Sub-tabs */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: "categories" as const, label: "Non-Compliant Categories", icon: <AlertTriangle className="w-4 h-4" /> },
          { id: "comparison" as const, label: "Compliance Comparison", icon: <CheckCircle2 className="w-4 h-4" /> },
          { id: "violations" as const, label: "Violations of Law", icon: <Scale className="w-4 h-4" /> },
          { id: "texas" as const, label: "Texas Legal Framework", icon: <FileText className="w-4 h-4" /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeSection === tab.id
                ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20"
                : "bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Categories Section */}
      {activeSection === "categories" && (
        <div className="space-y-4">
          {complianceCategories.map((cat) => (
            <div key={cat.id} className="bg-slate-800/60 rounded-xl border border-slate-700/50 overflow-hidden">
              <button
                onClick={() => setExpandedCategory(expandedCategory === cat.id ? null : cat.id)}
                className="w-full flex items-center gap-3 p-4 md:p-5 text-left hover:bg-slate-700/30 transition-colors"
              >
                {categoryIcons[cat.id]}
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-semibold text-sm md:text-base">{cat.title}</h3>
                  <p className="text-slate-400 text-xs md:text-sm mt-0.5">{cat.subtitle}</p>
                </div>
                {expandedCategory === cat.id ? (
                  <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-slate-400 shrink-0" />
                )}
              </button>

              {expandedCategory === cat.id && (
                <div className="px-4 md:px-5 pb-5 space-y-4 border-t border-slate-700/50 pt-4">
                  {/* What They Are */}
                  <div>
                    <h4 className="text-amber-400 font-semibold text-sm mb-2">What They Are</h4>
                    <p className="text-slate-300 text-sm leading-relaxed">{cat.whatTheyAre}</p>
                  </div>

                  {/* Why They Fail */}
                  <div>
                    <h4 className="text-red-400 font-semibold text-sm mb-2">Why They Are Non-Compliant</h4>
                    <p className="text-slate-300 text-sm leading-relaxed">{cat.whyTheyFail}</p>
                  </div>

                  {/* What DynaCord Is */}
                  <div className="bg-emerald-900/20 border border-emerald-700/30 rounded-lg p-4">
                    <h4 className="text-emerald-400 font-semibold text-sm mb-2">What DynaCord Is</h4>
                    <p className="text-slate-300 text-sm leading-relaxed">{cat.whatDynacordIs}</p>
                  </div>

                  {/* Cited Law */}
                  <div>
                    <h4 className="text-blue-400 font-semibold text-sm mb-2">Cited Law</h4>
                    <div className="space-y-2">
                      {cat.citations.map((cite, i) => (
                        <a
                          key={i}
                          href={cite.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-start gap-2 text-sm text-slate-300 hover:text-blue-400 transition-colors group"
                        >
                          <ExternalLink className="w-3.5 h-3.5 mt-0.5 text-blue-500 shrink-0 group-hover:text-blue-400" />
                          <span>
                            <span className="font-mono text-blue-400">{cite.code}</span>
                            <span className="text-slate-500 mx-1.5">-</span>
                            {cite.title}
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* DynaCord Standards */}
          <div className="mt-8">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-emerald-400" />
              <h3 className="text-xl font-bold text-white">The DynaCord Standard</h3>
            </div>
            <p className="text-slate-400 text-sm mb-4">What no other manufacturer has done.</p>

            <div className="space-y-3">
              {dynacordStandards.map((std, i) => (
                <div key={i} className="bg-emerald-900/10 border border-emerald-700/30 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setExpandedStandard(expandedStandard === i ? null : i)}
                    className="w-full flex items-center gap-3 p-4 text-left hover:bg-emerald-900/20 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-emerald-600/20 flex items-center justify-center text-emerald-400 font-bold text-sm shrink-0">
                      {i + 1}
                    </div>
                    <span className="text-white font-medium text-sm flex-1">{std.title}</span>
                    {expandedStandard === i ? (
                      <ChevronDown className="w-5 h-5 text-emerald-400 shrink-0" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-emerald-400 shrink-0" />
                    )}
                  </button>

                  {expandedStandard === i && (
                    <div className="px-4 pb-4 space-y-3 border-t border-emerald-700/20 pt-3">
                      <p className="text-slate-300 text-sm leading-relaxed">{std.description}</p>
                      <div className="space-y-1.5">
                        {std.citations.map((cite, j) => (
                          <a
                            key={j}
                            href={cite.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-start gap-2 text-sm text-slate-400 hover:text-emerald-400 transition-colors group"
                          >
                            <ExternalLink className="w-3.5 h-3.5 mt-0.5 text-emerald-500 shrink-0" />
                            <span>
                              <span className="font-mono text-emerald-400">{cite.code}</span>
                              <span className="text-slate-600 mx-1.5">-</span>
                              {cite.title}
                            </span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Comparison Table */}
      {activeSection === "comparison" && (
        <div className="bg-slate-800/60 rounded-xl border border-slate-700/50 overflow-hidden">
          <div className="p-4 md:p-5 border-b border-slate-700/50">
            <h3 className="text-white font-bold text-lg">Compliance Comparison at a Glance</h3>
            <p className="text-slate-400 text-sm mt-1">DynaCord vs. every other product category on the market.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-900/50">
                  <th className="text-left text-slate-300 font-semibold p-3 min-w-[200px]">Standard</th>
                  <th className="text-center text-slate-400 font-medium p-3 min-w-[100px]">Grey Market 361</th>
                  <th className="text-center text-slate-400 font-medium p-3 min-w-[100px]">Rose/Plant</th>
                  <th className="text-center text-slate-400 font-medium p-3 min-w-[100px]">Conditioned Media</th>
                  <th className="text-center text-slate-400 font-medium p-3 min-w-[100px]">Research Vials</th>
                  <th className="text-center text-slate-400 font-medium p-3 min-w-[100px]">Lyophilized</th>
                  <th className="text-center text-emerald-400 font-bold p-3 min-w-[120px] bg-emerald-900/20">DynaCord</th>
                </tr>
              </thead>
              <tbody>
                {complianceComparison.map((row, i) => (
                  <tr key={i} className={`border-t border-slate-700/30 ${i % 2 === 0 ? "" : "bg-slate-900/20"}`}>
                    <td className="p-3 text-slate-300 font-medium">{row.standard}</td>
                    <td className="p-3 text-center">
                      {row.greyMarket361 === "No" ? (
                        <XCircle className="w-4 h-4 text-red-500 mx-auto" />
                      ) : row.greyMarket361 === "Rarely" ? (
                        <span className="text-amber-500 text-xs">Rarely</span>
                      ) : (
                        <span className="text-slate-500 text-xs">{row.greyMarket361}</span>
                      )}
                    </td>
                    <td className="p-3 text-center">
                      {row.rosePlant === "No" ? (
                        <XCircle className="w-4 h-4 text-red-500 mx-auto" />
                      ) : row.rosePlant === "N/A" ? (
                        <span className="text-slate-600 text-xs">N/A</span>
                      ) : (
                        <span className="text-slate-500 text-xs">{row.rosePlant}</span>
                      )}
                    </td>
                    <td className="p-3 text-center">
                      {row.conditionedMedia === "No" ? (
                        <XCircle className="w-4 h-4 text-red-500 mx-auto" />
                      ) : row.conditionedMedia === "Rarely" ? (
                        <span className="text-amber-500 text-xs">Rarely</span>
                      ) : (
                        <span className="text-slate-500 text-xs">{row.conditionedMedia}</span>
                      )}
                    </td>
                    <td className="p-3 text-center">
                      {row.researchVials === "No" ? (
                        <XCircle className="w-4 h-4 text-red-500 mx-auto" />
                      ) : row.researchVials === "Rarely" ? (
                        <span className="text-amber-500 text-xs">Rarely</span>
                      ) : (
                        <span className="text-slate-500 text-xs">{row.researchVials}</span>
                      )}
                    </td>
                    <td className="p-3 text-center">
                      {row.lyophilized === "No" ? (
                        <XCircle className="w-4 h-4 text-red-500 mx-auto" />
                      ) : row.lyophilized === "Rarely" ? (
                        <span className="text-amber-500 text-xs">Rarely</span>
                      ) : (
                        <span className="text-slate-500 text-xs">{row.lyophilized}</span>
                      )}
                    </td>
                    <td className="p-3 text-center bg-emerald-900/10">
                      <div className="flex items-center justify-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-400 font-bold text-xs">{row.dynacord}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Violations Table */}
      {activeSection === "violations" && (
        <div className="space-y-6">
          <div className="bg-red-900/10 border border-red-700/30 rounded-xl p-5">
            <h3 className="text-red-400 font-bold text-lg mb-2">Violations of Federal Law</h3>
            <p className="text-slate-300 text-sm">
              Every other product category described above violates one or more of the following federal statutes.
              DynaCord violates none of these.
            </p>
          </div>

          <div className="bg-slate-800/60 rounded-xl border border-slate-700/50 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-900/50">
                    <th className="text-left text-slate-300 font-semibold p-4 min-w-[160px]">Law</th>
                    <th className="text-left text-slate-300 font-semibold p-4">Violation</th>
                    <th className="text-center text-slate-300 font-semibold p-4 w-[80px]">Source</th>
                  </tr>
                </thead>
                <tbody>
                  {violationTable.map((row, i) => (
                    <tr key={i} className={`border-t border-slate-700/30 ${i % 2 === 0 ? "" : "bg-slate-900/20"}`}>
                      <td className="p-4 font-mono text-red-400 text-sm">{row.law}</td>
                      <td className="p-4 text-slate-300">{row.violation}</td>
                      <td className="p-4 text-center">
                        <a
                          href={row.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-emerald-900/10 border border-emerald-700/30 rounded-xl p-5 text-center">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
            <p className="text-emerald-400 font-bold text-lg">DynaCord violates none of these.</p>
            <p className="text-slate-400 text-sm mt-1">That is the difference.</p>
          </div>
        </div>
      )}

      {/* Texas Legal Framework */}
      {activeSection === "texas" && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-900/30 to-slate-800/50 rounded-xl border border-blue-700/30 p-5 md:p-6">
            <div className="flex items-center gap-3 mb-3">
              <Scale className="w-7 h-7 text-blue-400" />
              <h3 className="text-xl font-bold text-white">Why Consented Mesenchymal Exosome Therapy Is Legal in Texas</h3>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">{texasLegalFramework.shortAnswer}</p>
          </div>

          {/* Federal Framework */}
          <div className="bg-slate-800/60 rounded-xl border border-slate-700/50 p-5">
            <h4 className="text-white font-bold mb-3">The Federal Framework</h4>
            <p className="text-slate-300 text-sm leading-relaxed">{texasLegalFramework.federalFramework}</p>
          </div>

          {/* Texas State Law */}
          <div className="bg-slate-800/60 rounded-xl border border-slate-700/50 p-5">
            <h4 className="text-white font-bold mb-3">Texas State Law Authority</h4>
            <p className="text-slate-300 text-sm leading-relaxed">{texasLegalFramework.texasStateLaw}</p>
          </div>

          {/* What Consent Does */}
          <div className="bg-slate-800/60 rounded-xl border border-slate-700/50 p-5">
            <h4 className="text-white font-bold mb-3">What Consent Does</h4>
            <p className="text-slate-400 text-sm mb-3">Proper informed consent does three things legally:</p>
            <div className="space-y-2">
              {texasLegalFramework.consentDoes.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-400 font-bold text-xs shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <p className="text-slate-300 text-sm">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Defensibility Table */}
          <div className="bg-slate-800/60 rounded-xl border border-slate-700/50 overflow-hidden">
            <div className="p-5 border-b border-slate-700/50">
              <h4 className="text-white font-bold">What Makes This Administration Defensible</h4>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-900/50">
                    <th className="text-left text-slate-300 font-semibold p-4">Element</th>
                    <th className="text-left text-slate-300 font-semibold p-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {texasLegalFramework.defensibilityTable.map((row, i) => (
                    <tr key={i} className={`border-t border-slate-700/30 ${i % 2 === 0 ? "" : "bg-slate-900/20"}`}>
                      <td className="p-4 text-slate-300 font-medium">{row.element}</td>
                      <td className="p-4 text-emerald-400">{row.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Physician Script */}
          <div className="bg-blue-900/10 border border-blue-700/30 rounded-xl p-5">
            <h4 className="text-blue-400 font-bold mb-3">What the Physician Tells the Patient</h4>
            <blockquote className="text-slate-300 text-sm leading-relaxed italic border-l-2 border-blue-500 pl-4">
              {texasLegalFramework.physicianScript}
            </blockquote>
            <p className="text-slate-400 text-xs mt-3">That is the conversation. That is the consent. That is the legal foundation.</p>
          </div>

          {/* Bottom Line */}
          <div className="bg-emerald-900/10 border border-emerald-700/30 rounded-xl p-5 text-center">
            <h4 className="text-emerald-400 font-bold text-lg mb-2">Bottom Line for Texas</h4>
            <p className="text-slate-300 text-sm leading-relaxed max-w-2xl mx-auto">
              {texasLegalFramework.bottomLine}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
