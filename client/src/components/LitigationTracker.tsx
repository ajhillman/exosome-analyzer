import { useState, useMemo } from "react";
import { litigationRecords, inspectionRecords, executiveBackgrounds } from "../data/litigation";
import { Search, Scale, AlertTriangle, Shield, ChevronDown, ChevronUp, ExternalLink, User, FileWarning, Building2 } from "lucide-react";

export default function LitigationTracker() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedCompany, setSelectedCompany] = useState("all");
  const [expandedCase, setExpandedCase] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"cases" | "inspections" | "executives">("cases");

  const companies = useMemo(() => {
    const set = new Set(litigationRecords.map(r => r.companyName));
    return Array.from(set).sort();
  }, []);

  const caseTypes = useMemo(() => {
    const types = new Set<string>();
    litigationRecords.forEach(r => {
      r.allegations.forEach(a => types.add(a));
    });
    return Array.from(types).sort();
  }, []);

  const filteredCases = useMemo(() => {
    return litigationRecords.filter(r => {
      const matchesSearch = searchTerm === "" ||
        r.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.caseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.notes.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.plaintiff.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.defendant.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCompany = selectedCompany === "all" || r.companyName === selectedCompany;
      return matchesSearch && matchesCompany;
    });
  }, [searchTerm, selectedCompany]);

  const filteredInspections = useMemo(() => {
    return inspectionRecords.filter(r => {
      const matchesSearch = searchTerm === "" ||
        r.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.notes.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCompany = selectedCompany === "all" || r.companyName === selectedCompany;
      return matchesSearch && matchesCompany;
    });
  }, [searchTerm, selectedCompany]);

  const filteredExecutives = useMemo(() => {
    return executiveBackgrounds.filter(e => {
      const matchesSearch = searchTerm === "" ||
        e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.background.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCompany = selectedCompany === "all" || e.companyName === selectedCompany;
      return matchesSearch && matchesCompany;
    });
  }, [searchTerm, selectedCompany]);

  const getStatusColor = (status: string) => {
    if (status.toLowerCase().includes("convicted") || status.toLowerCase().includes("prevailed")) return "text-red-600 bg-red-50 border-red-200";
    if (status.toLowerCase().includes("active") || status.toLowerCase().includes("ongoing") || status.toLowerCase().includes("investigation")) return "text-amber-700 bg-amber-50 border-amber-200";
    if (status.toLowerCase().includes("settled") || status.toLowerCase().includes("filed")) return "text-blue-600 bg-blue-50 border-blue-200";
    if (status.toLowerCase().includes("denied") || status.toLowerCase().includes("bankruptcy")) return "text-red-600 bg-red-50 border-red-200";
    return "text-slate-600 bg-slate-50 border-slate-200";
  };

  const getRiskColor = (level: string) => {
    if (level === "high") return "text-red-700 bg-red-50 border-red-200";
    if (level === "medium") return "text-amber-700 bg-amber-50 border-amber-200";
    return "text-emerald-700 bg-emerald-50 border-emerald-200";
  };

  // Statistics
  const totalCases = litigationRecords.length;
  const companiesWithCases = new Set(litigationRecords.map(r => r.companyName)).size;
  const activeCases = litigationRecords.filter(r =>
    r.status.toLowerCase().includes("active") ||
    r.status.toLowerCase().includes("ongoing") ||
    r.status.toLowerCase().includes("investigation") ||
    r.status.toLowerCase().includes("pending")
  ).length;
  const criminalCases = litigationRecords.filter(r =>
    r.allegations.some(a => a.toLowerCase().includes("criminal") || a.toLowerCase().includes("felony"))
  ).length;

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <Scale className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Cases</span>
          </div>
          <p className="text-2xl font-bold text-slate-900">{totalCases}</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <Building2 className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Companies</span>
          </div>
          <p className="text-2xl font-bold text-slate-900">{companiesWithCases}</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Active</span>
          </div>
          <p className="text-2xl font-bold text-amber-600">{activeCases}</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <Shield className="w-4 h-4 text-red-500" />
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Criminal</span>
          </div>
          <p className="text-2xl font-bold text-red-600">{criminalCases}</p>
        </div>
      </div>

      {/* DynaCord Clean Record Banner */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center gap-3">
        <Shield className="w-5 h-5 text-emerald-600 flex-shrink-0" />
        <div>
          <p className="text-sm font-semibold text-emerald-800">DynaCord: Zero Litigation, Zero FDA Enforcement Actions</p>
          <p className="text-xs text-emerald-600 mt-0.5">No federal or state court cases. No FDA warning letters. No untitled letters. No inspectional observations. Clean record across all databases searched (PACER, Justia, CourtListener, Trellis Law, FDA CBER).</p>
        </div>
      </div>

      {/* Sub-tabs */}
      <div className="flex gap-1 bg-slate-100 rounded-lg p-1">
        {[
          { id: "cases" as const, label: "Court Cases", icon: Scale, count: filteredCases.length },
          { id: "inspections" as const, label: "FDA Inspections", icon: FileWarning, count: filteredInspections.length },
          { id: "executives" as const, label: "Key Executives", icon: User, count: filteredExecutives.length },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === tab.id
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
            <span className={`text-xs px-1.5 py-0.5 rounded-full ${
              activeTab === tab.id ? "bg-slate-100 text-slate-700" : "bg-slate-200 text-slate-500"
            }`}>{tab.count}</span>
          </button>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search cases, companies, parties..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
          />
        </div>
        <select
          value={selectedCompany}
          onChange={e => setSelectedCompany(e.target.value)}
          className="px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        >
          <option value="all">All Companies</option>
          {companies.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Cases Tab */}
      {activeTab === "cases" && (
        <div className="space-y-3">
          {filteredCases.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <Scale className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No cases found matching your criteria.</p>
            </div>
          ) : (
            filteredCases.map(record => (
              <div key={record.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setExpandedCase(expandedCase === record.id ? null : record.id)}
                  className="w-full text-left p-4 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                          {record.companyName}
                        </span>
                        <span className="text-xs text-slate-400">{record.filingDate}</span>
                      </div>
                      <p className="text-sm font-semibold text-slate-900 truncate">
                        {record.caseNumber !== "Not specified" && record.caseNumber !== "Unknown"
                          ? `${record.caseNumber} — `
                          : ""}
                        {record.plaintiff} v. {record.defendant}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">{record.jurisdiction}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full border ${getStatusColor(record.status)}`}>
                        {record.status.split(".")[0]}
                      </span>
                      {expandedCase === record.id ? (
                        <ChevronUp className="w-4 h-4 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      )}
                    </div>
                  </div>
                </button>

                {expandedCase === record.id && (
                  <div className="px-4 pb-4 border-t border-slate-100 pt-3 space-y-3">
                    <div>
                      <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Allegations</p>
                      <div className="flex flex-wrap gap-1.5">
                        {record.allegations.map((a, i) => (
                          <span key={i} className="text-xs bg-red-50 text-red-700 px-2 py-0.5 rounded-full border border-red-100">
                            {a}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Status</p>
                      <p className="text-sm text-slate-700">{record.status}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Details</p>
                      <p className="text-sm text-slate-600 leading-relaxed">{record.notes}</p>
                    </div>
                    <div className="flex items-center gap-2 pt-1">
                      <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Plaintiff:</p>
                      <p className="text-xs text-slate-700">{record.plaintiff}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Defendant:</p>
                      <p className="text-xs text-slate-700">{record.defendant}</p>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* Inspections Tab */}
      {activeTab === "inspections" && (
        <div className="space-y-3">
          {filteredInspections.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <FileWarning className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No inspection records found.</p>
            </div>
          ) : (
            filteredInspections.map(record => (
              <div key={record.id} className="bg-white border border-slate-200 rounded-xl p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded-full border border-red-100">
                      {record.companyName}
                    </span>
                    <p className="text-sm font-semibold text-slate-900 mt-1.5">
                      FEI #{record.feiNumber} — Inspection {record.inspectionDate}
                    </p>
                  </div>
                  {record.formFDA483 && (
                    <span className="text-xs font-medium text-red-700 bg-red-50 px-2 py-1 rounded-full border border-red-200">
                      FDA 483 Issued
                    </span>
                  )}
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1.5">Violations</p>
                  <ul className="space-y-1">
                    {record.violations.map((v, i) => (
                      <li key={i} className="text-xs text-slate-600 flex items-start gap-2">
                        <span className="text-red-400 mt-0.5 flex-shrink-0">&#9679;</span>
                        {v}
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="text-xs text-slate-500 italic">{record.notes}</p>
              </div>
            ))
          )}
        </div>
      )}

      {/* Executives Tab */}
      {activeTab === "executives" && (
        <div className="space-y-3">
          {filteredExecutives.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <User className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No executive records found.</p>
            </div>
          ) : (
            filteredExecutives.map(exec => (
              <div key={exec.id} className="bg-white border border-slate-200 rounded-xl p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-bold text-slate-900">{exec.name}</p>
                    <p className="text-xs text-slate-500">{exec.title} — {exec.companyName}</p>
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full border ${getRiskColor(exec.riskLevel)}`}>
                    {exec.riskLevel.toUpperCase()} RISK
                  </span>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Background</p>
                  <p className="text-sm text-slate-600">{exec.background}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Regulatory History</p>
                  <p className="text-sm text-slate-600">{exec.regulatoryHistory}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Litigation History</p>
                  <p className="text-sm text-slate-600">{exec.litigationHistory}</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
