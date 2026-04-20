import { ipscCompanies, ipscStats, type IPSCCompany } from "@/data/ipsc-companies";
import { BookOpen, Building2, ChevronDown, ChevronUp, ExternalLink, FlaskConical, Globe, Search, TrendingUp } from "lucide-react";
import { useMemo, useState } from "react";

const stageColors: Record<string, string> = {
  "Phase 3": "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Phase 2": "bg-blue-50 text-blue-700 border-blue-200",
  "Phase 1": "bg-sky-50 text-sky-700 border-sky-200",
  "Preclinical": "bg-gray-50 text-gray-600 border-gray-200",
  "Commercial": "bg-purple-50 text-purple-700 border-purple-200",
  "Research": "bg-amber-50 text-amber-700 border-amber-200",
  "CDMO": "bg-indigo-50 text-indigo-700 border-indigo-200",
};

export function IPSCLandscape() {
  const [search, setSearch] = useState("");
  const [stageFilter, setStageFilter] = useState<string>("all");
  const [countryFilter, setCountryFilter] = useState<string>("all");
  const [focusFilter, setFocusFilter] = useState<string>("all");
  const [expandedCompany, setExpandedCompany] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return ipscCompanies.filter((c) => {
      const matchSearch = !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.description.toLowerCase().includes(search.toLowerCase()) || c.cellType.toLowerCase().includes(search.toLowerCase());
      const matchStage = stageFilter === "all" || c.stage === stageFilter;
      const matchCountry = countryFilter === "all" || c.country === countryFilter;
      const matchFocus = focusFilter === "all" || c.focus.toLowerCase().includes(focusFilter.toLowerCase());
      return matchSearch && matchStage && matchCountry && matchFocus;
    });
  }, [search, stageFilter, countryFilter, focusFilter]);

  const countries = useMemo(() => [...new Set(ipscCompanies.map(c => c.country))].sort(), []);
  const stages = useMemo(() => [...new Set(ipscCompanies.map(c => c.stage))], []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            iPSC-Derived Cell Therapeutics Landscape
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {ipscStats.totalCompanies} companies developing iPSC-derived therapies worldwide.
            Source: <a href={ipscStats.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">BioInformant</a>
          </p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white border border-gray-200/60 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Building2 className="w-4 h-4 text-blue-500" />
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Companies</span>
          </div>
          <p className="text-2xl font-extrabold text-gray-900">{ipscStats.totalCompanies}</p>
        </div>
        <div className="bg-white border border-gray-200/60 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Globe className="w-4 h-4 text-emerald-500" />
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Countries</span>
          </div>
          <p className="text-2xl font-extrabold text-gray-900">{Object.keys(ipscStats.countryCounts).length}</p>
        </div>
        <div className="bg-white border border-gray-200/60 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <FlaskConical className="w-4 h-4 text-purple-500" />
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">In Clinical Trials</span>
          </div>
          <p className="text-2xl font-extrabold text-gray-900">{ipscCompanies.filter(c => c.stage.includes("Phase")).length}</p>
        </div>
        <div className="bg-white border border-gray-200/60 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-amber-500" />
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">CDMOs</span>
          </div>
          <p className="text-2xl font-extrabold text-gray-900">{ipscCompanies.filter(c => c.stage === "CDMO").length}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-200/60 rounded-xl p-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search companies, cell types, descriptions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
            />
          </div>
          <select
            value={stageFilter}
            onChange={(e) => setStageFilter(e.target.value)}
            className="px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="all">All Stages</option>
            {stages.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <select
            value={countryFilter}
            onChange={(e) => setCountryFilter(e.target.value)}
            className="px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="all">All Countries</option>
            {countries.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select
            value={focusFilter}
            onChange={(e) => setFocusFilter(e.target.value)}
            className="px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="all">All Focus Areas</option>
            {ipscStats.topFocus.map(f => <option key={f} value={f}>{f}</option>)}
          </select>
        </div>
        <p className="text-xs text-gray-400 mt-2">{filtered.length} of {ipscCompanies.length} companies shown</p>
      </div>

      {/* Company List */}
      <div className="space-y-2">
        {filtered.map((company) => (
          <div key={company.name} className="bg-white border border-gray-200/60 rounded-xl overflow-hidden hover:border-gray-300 transition-all">
            <button
              onClick={() => setExpandedCompany(expandedCompany === company.name ? null : company.name)}
              className="w-full flex items-center justify-between p-4 text-left"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold text-blue-600">{company.name.charAt(0)}</span>
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm font-semibold text-gray-900 truncate">{company.name}</h3>
                    {company.ticker && (
                      <span className="text-[10px] font-mono font-medium text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded">{company.ticker}</span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 truncate">{company.focus}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0 ml-3">
                <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full border ${stageColors[company.stage] || "bg-gray-50 text-gray-600 border-gray-200"}`}>
                  {company.stage}
                </span>
                <span className="text-[11px] font-medium text-gray-400 hidden sm:inline">{company.country}</span>
                {expandedCompany === company.name ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
              </div>
            </button>

            {expandedCompany === company.name && (
              <div className="px-4 pb-4 border-t border-gray-100 pt-3 animate-fade-in">
                <p className="text-sm text-gray-600 leading-relaxed">{company.description}</p>
                <div className="flex flex-wrap gap-4 mt-3">
                  <div className="text-xs">
                    <span className="text-gray-400">Cell Type:</span>{" "}
                    <span className="font-medium text-gray-700">{company.cellType}</span>
                  </div>
                  <div className="text-xs">
                    <span className="text-gray-400">Country:</span>{" "}
                    <span className="font-medium text-gray-700">{company.country}</span>
                  </div>
                  {company.url && (
                    <a href={company.url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline flex items-center gap-1">
                      <ExternalLink className="w-3 h-3" /> Website
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Source Attribution */}
      <div className="bg-gray-50 border border-gray-200/60 rounded-xl p-4 text-center">
        <p className="text-xs text-gray-500">
          Data sourced from <a href={ipscStats.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">BioInformant iPSC-Derived Cell Therapeutics Report</a> ({ipscStats.source}).
          This landscape is for informational purposes. Verify current status with each company directly.
        </p>
      </div>
    </div>
  );
}
