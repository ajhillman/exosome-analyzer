import { useState, useMemo } from "react";
import {
  Search,
  ExternalLink,
  ChevronDown,
  ChevronRight,
  Scale,
  FileText,
  MapPin,
  Shield,
  BookOpen,
  AlertTriangle,
  CheckCircle,
  Info,
} from "lucide-react";
import {
  federalRegulations,
  stateRegulations,
  statusColors,
  type StateRegulation,
  type StateStatus,
} from "@/data/regulatory";

function FederalCard({ reg }: { reg: (typeof federalRegulations)[0] }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-5 flex items-start gap-4"
      >
        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 mt-0.5">
          <Scale className="w-5 h-5 text-blue-600" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 text-sm leading-snug">{reg.title}</h3>
          <p className="text-xs text-gray-500 mt-1 font-mono">{reg.citation}</p>
          <p className="text-xs text-gray-600 mt-2 line-clamp-2">{reg.summary}</p>
        </div>
        <div className="shrink-0 mt-1">
          {expanded ? (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronRight className="w-5 h-5 text-gray-400" />
          )}
        </div>
      </button>
      {expanded && (
        <div className="px-5 pb-5 border-t border-gray-100">
          <div className="mt-4 space-y-3">
            <div>
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Key Provisions
              </h4>
              <ul className="space-y-2">
                {reg.keyProvisions.map((p, i) => (
                  <li key={i} className="flex gap-2 text-xs text-gray-700">
                    <CheckCircle className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
            {reg.practitionerNote && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                <div className="flex gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-amber-800 mb-1">Practitioner Note</p>
                    <p className="text-xs text-amber-700">{reg.practitionerNote}</p>
                  </div>
                </div>
              </div>
            )}
            <div className="flex flex-wrap gap-2 pt-2">
              <a
                href={reg.fullTextUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium hover:bg-blue-100 transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
                Full Text
              </a>
              {reg.additionalUrls?.map((u, i) => (
                <a
                  key={i}
                  href={u.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 text-gray-600 rounded-lg text-xs font-medium hover:bg-gray-100 transition-colors"
                >
                  <ExternalLink className="w-3 h-3" />
                  {u.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StateCard({ state }: { state: StateRegulation }) {
  const [expanded, setExpanded] = useState(false);
  const colors = statusColors[state.status];

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-sm transition-shadow">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-4 flex items-center gap-3"
      >
        <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center shrink-0 font-bold text-gray-700 text-sm">
          {state.abbreviation}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold text-gray-900 text-sm">{state.state}</h3>
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${colors.bg} ${colors.text} ${colors.border}`}
            >
              {state.status}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-0.5 font-mono truncate">{state.primaryCitation}</p>
        </div>
        <div className="shrink-0">
          {expanded ? (
            <ChevronDown className="w-4 h-4 text-gray-400" />
          ) : (
            <ChevronRight className="w-4 h-4 text-gray-400" />
          )}
        </div>
      </button>
      {expanded && (
        <div className="px-4 pb-4 border-t border-gray-100">
          <div className="mt-3 space-y-3">
            <div>
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                Operative Language
              </h4>
              <p className="text-xs text-gray-700 leading-relaxed">{state.operativeLanguage}</p>
            </div>
            <a
              href={state.legislativeSource}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 text-gray-600 rounded-lg text-xs font-medium hover:bg-gray-100 transition-colors"
            >
              <ExternalLink className="w-3 h-3" />
              Legislative Source
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export function RegulatoryReference() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [activeSection, setActiveSection] = useState<"federal" | "states" | "consent">("federal");

  const filteredStates = useMemo(() => {
    let filtered = stateRegulations;
    if (selectedStatus !== "all") {
      filtered = filtered.filter((s) => s.status === selectedStatus);
    }
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (s) =>
          s.state.toLowerCase().includes(term) ||
          s.abbreviation.toLowerCase().includes(term) ||
          s.primaryCitation.toLowerCase().includes(term) ||
          s.operativeLanguage.toLowerCase().includes(term)
      );
    }
    return filtered;
  }, [searchTerm, selectedStatus]);

  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    stateRegulations.forEach((s) => {
      counts[s.status] = (counts[s.status] || 0) + 1;
    });
    return counts;
  }, []);

  const uniqueStatuses = useMemo(() => {
    return [...new Set(stateRegulations.map((s) => s.status))].sort();
  }, []);

  // Categorize states for the summary
  const rttStates = stateRegulations.filter((s) => s.status.includes("RTT")).length;
  const disclosureStates = stateRegulations.filter((s) => s.status.includes("Disclosure")).length;
  const conflictStates = stateRegulations.filter((s) => s.status.includes("Conflict")).length;
  const noneStates = stateRegulations.filter((s) => s.status === "None").length;

  const sections = [
    { id: "federal" as const, label: "Federal Framework", icon: <Shield className="w-4 h-4" />, count: federalRegulations.length },
    { id: "states" as const, label: "50-State Compendium", icon: <MapPin className="w-4 h-4" />, count: stateRegulations.length },
    { id: "consent" as const, label: "Consent Form", icon: <FileText className="w-4 h-4" />, count: null },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold">Regulatory Reference</h2>
            <p className="text-slate-300 text-xs">
              Federal and 50-State Regenerative Medicine Law Compendium v2.0 (March 2026)
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
          <div className="bg-white/10 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold">{federalRegulations.length}</p>
            <p className="text-[10px] text-slate-300 uppercase tracking-wider">Federal Statutes</p>
          </div>
          <div className="bg-white/10 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold">{rttStates}</p>
            <p className="text-[10px] text-slate-300 uppercase tracking-wider">RTT States</p>
          </div>
          <div className="bg-white/10 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold">{disclosureStates}</p>
            <p className="text-[10px] text-slate-300 uppercase tracking-wider">Disclosure Req.</p>
          </div>
          <div className="bg-white/10 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold">{noneStates}</p>
            <p className="text-[10px] text-slate-300 uppercase tracking-wider">No Law</p>
          </div>
        </div>
      </div>

      {/* Section Tabs */}
      <div className="flex gap-2 flex-wrap">
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveSection(s.id)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              activeSection === s.id
                ? "bg-slate-800 text-white shadow-md"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            {s.icon}
            {s.label}
            {s.count !== null && (
              <span
                className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                  activeSection === s.id ? "bg-white/20" : "bg-gray-100"
                }`}
              >
                {s.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Federal Framework */}
      {activeSection === "federal" && (
        <div className="space-y-3">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex gap-2">
              <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <p className="text-xs text-blue-800">
                The following federal statutes and regulations govern the administration, manufacture, and informed consent requirements for regenerative medicine therapies in the United States. All operative text is quoted directly from authoritative sources.
              </p>
            </div>
          </div>
          {federalRegulations.map((reg) => (
            <FederalCard key={reg.id} reg={reg} />
          ))}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
            <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
              Federal Regulatory Reference Sources
            </h4>
            <div className="flex flex-wrap gap-2">
              {[
                { label: "FDA.gov", url: "https://www.fda.gov" },
                { label: "CBER", url: "https://www.fda.gov/vaccines-blood-biologics" },
                { label: "eCFR", url: "https://www.ecfr.gov" },
                { label: "U.S. Code (Cornell)", url: "https://www.law.cornell.edu/uscode/text/21" },
                { label: "GovInfo", url: "https://www.govinfo.gov/" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-white text-gray-600 rounded-lg text-xs font-medium border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <ExternalLink className="w-3 h-3" />
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 50-State Compendium */}
      {activeSection === "states" && (
        <div className="space-y-4">
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search states, citations, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300"
              />
            </div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300"
            >
              <option value="all">All Statuses ({stateRegulations.length})</option>
              {uniqueStatuses.map((status) => (
                <option key={status} value={status}>
                  {status} ({statusCounts[status]})
                </option>
              ))}
            </select>
          </div>

          {/* Status Legend */}
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Status Code Legend
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { code: "RTT + Adult SC (IRB)", meaning: "Right to Try expanded to include adult stem cells; IRB oversight required." },
                { code: "Expansive / FDA Conflict", meaning: "State law authorizes non-FDA-approved biologics; creates direct conflict with federal jurisdiction." },
                { code: "Disclosure/Consent Required", meaning: "Provider must disclose FDA non-approval status in writing and obtain signed informed consent." },
                { code: "RTT (SC inclusive)", meaning: "Right to Try law does not exclude stem cells; general RTT pathway available." },
                { code: "hESC Restrictive", meaning: "Prohibits research or use of human embryonic stem cells; adult cells generally permitted." },
                { code: "Research Permissive", meaning: "State explicitly permits stem cell research including hESC; clinical access may not be separately authorized." },
                { code: "None", meaning: "No enacted regenerative medicine or stem cell specific legislation." },
              ].map((item) => {
                const c = statusColors[item.code as StateStatus] || statusColors["None"];
                return (
                  <div key={item.code} className="flex gap-2 items-start">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border shrink-0 ${c.bg} ${c.text} ${c.border}`}
                    >
                      {item.code}
                    </span>
                    <p className="text-[11px] text-gray-600">{item.meaning}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Results count */}
          <p className="text-xs text-gray-500">
            Showing {filteredStates.length} of {stateRegulations.length} states
          </p>

          {/* State Cards */}
          <div className="space-y-2">
            {filteredStates.map((state) => (
              <StateCard key={state.abbreviation} state={state} />
            ))}
          </div>

          {filteredStates.length === 0 && (
            <div className="text-center py-12 bg-white rounded-2xl border border-gray-200">
              <MapPin className="w-8 h-8 text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-gray-500">No states match your search criteria.</p>
            </div>
          )}

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-center">
            <p className="text-[10px] text-gray-500">
              Sources: FSMB State Board Overview (Aug. 2024) | State Legislature Databases | 2025 Legislative Updates
            </p>
          </div>
        </div>
      )}

      {/* Consent Form */}
      {activeSection === "consent" && (
        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
            {/* Consent Header */}
            <div className="bg-gradient-to-r from-blue-900 to-blue-800 p-6 text-white text-center">
              <p className="text-[10px] uppercase tracking-[0.2em] text-blue-200 mb-2">
                U.S. Food and Drug Administration / Department of Health and Human Services
              </p>
              <h3 className="text-lg font-bold mb-1">Universal FDA-Compliant Informed Consent to Treat</h3>
              <p className="text-sm text-blue-200">Regenerative Medicine</p>
              <div className="mt-3 flex flex-wrap justify-center gap-2">
                {["21 U.S.C. § 360bbb-0a", "42 U.S.C. § 262", "21 CFR Part 1271", "21 CFR § 50.25", "21 CFR § 312.81"].map((cite) => (
                  <span key={cite} className="px-2 py-0.5 bg-white/10 rounded text-[10px] font-mono">
                    {cite}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Disclosure Notice */}
              <div className="bg-red-50 border-2 border-red-300 rounded-xl p-4">
                <h4 className="text-sm font-bold text-red-900 uppercase text-center mb-2">
                  Required Federal and Multi-State Disclosure Notice
                </h4>
                <p className="text-sm text-red-800 font-semibold text-center">
                  THIS REGENERATIVE MEDICINE TREATMENT HAS NOT BEEN APPROVED BY THE FOOD AND DRUG ADMINISTRATION (FDA).
                </p>
                <p className="text-xs text-red-700 mt-2 text-center">
                  Required under: CA Bus. & Prof. Code § 2290.5 | Utah Code SB 199 (2024) | VT Stat. tit. 18 § 4501 | WA RCW § 18.130.420
                </p>
              </div>

              {/* Parts Overview */}
              {[
                { part: "A", title: "Patient and Treatment Identification", items: ["Patient full legal name, DOB, medical record number", "Treating physician name, license number, practice info", "Investigational product name, IND number, manufacturer", "Regulatory pathway selection (Federal RTT, Expanded Access, State RTT, Standard of Care)"] },
                { part: "B", title: "Patient Eligibility Attestation", items: ["Life-threatening or seriously debilitating condition confirmed", "Exhaustion of approved treatment options documented", "Clinical trial ineligibility certified (for Federal RTT)", "Voluntary informed decision confirmed"] },
                { part: "C", title: "Product Description and Regulatory Status", items: ["Product classification (exosome, MSC, autologous, placental, cord blood, gene therapy, PRP)", "Source material, route of administration, dose/volume, frequency", "FDA regulatory status: approved/Phase 1/active IND/RMAT/361 vs 351", "State authorization pathway"] },
                { part: "D", title: "Risks, Benefits, and Alternatives", items: ["Known risks: lack of proven efficacy, immune response, infection, tumorigenicity, off-target effects", "Injection/infusion site complications, unknown long-term effects, drug interactions", "Reproductive risks, failure to achieve treatment goals", "Alternatives: standard of care, clinical trials, expanded access, palliative care, second opinion"] },
                { part: "E", title: "Financial Disclosure", items: ["Product cost, administration fee, follow-up monitoring costs", "Insurance coverage status", "Physician compensation disclosure (no manufacturer compensation for RTT certification)"] },
                { part: "F", title: "Confidentiality and Records", items: ["Medical records maintained as confidential per federal and state law", "FDA inspection authority acknowledged", "De-identified data in manufacturer annual summary"] },
                { part: "G", title: "Adverse Event Reporting", items: ["Patient obligation to report new/worsening symptoms immediately", "Physician obligation to report to manufacturer and FDA MedWatch", "Emergency contact information required"] },
                { part: "H", title: "Patient Rights", items: ["Right to withdraw at any time without penalty", "Right to new findings that affect willingness to continue", "Right to questions, records, second opinion", "Right against discrimination and coercion"] },
                { part: "I", title: "State-Specific Mandatory Disclosures", items: ["California (Cal. Bus. & Prof. Code § 2290.5)", "Utah (SB 199, 2024)", "Vermont (Act 61, 2021)", "Washington (RCW § 18.130.420)", "Texas (Tex. H&S Code § 161.101)", "Alabama / Mississippi / North Carolina RTT adult stem cell disclosures"] },
                { part: "J", title: "Physician Certification", items: ["Life-threatening condition confirmed per 21 CFR § 312.81", "Approved options exhausted", "Clinical trial ineligibility documented", "Full consent form reviewed with patient", "Product qualifies under applicable pathway", "Benefits outweigh risks per clinical judgment", "Good standing with licensing board, no manufacturer compensation"] },
              ].map((section) => (
                <div key={section.part} className="border border-gray-200 rounded-xl overflow-hidden">
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-900">
                      Part {section.part}: {section.title}
                    </h4>
                  </div>
                  <div className="p-4">
                    <ul className="space-y-1.5">
                      {section.items.map((item, i) => (
                        <li key={i} className="flex gap-2 text-xs text-gray-700">
                          <CheckCircle className="w-3 h-3 text-green-500 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}

              {/* Signature Block */}
              <div className="border-2 border-gray-300 rounded-xl p-5 bg-gray-50">
                <h4 className="text-sm font-bold text-gray-900 mb-4 text-center">Signature Block</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {["Patient/Authorized Representative Signature", "Treating Physician Signature", "Witness Signature (if required by state)", "Date and Time"].map((field) => (
                    <div key={field} className="border-b border-gray-300 pb-2">
                      <p className="text-[10px] text-gray-500 uppercase tracking-wider">{field}</p>
                      <div className="h-8" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center">
                <p className="text-[10px] text-gray-400">
                  Version 2.0 | 21 U.S.C. § 360bbb-0a | 21 CFR § 50.25 | All 50-State Disclosure Laws
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
