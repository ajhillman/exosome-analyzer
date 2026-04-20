import { useState, useMemo } from "react";
import {
  enforcementActions,
  enforcementStats,
  type EnforcementAction,
} from "../data/fda-enforcement";
import {
  AlertTriangle,
  ExternalLink,
  Search,
  Shield,
  FileWarning,
  Bell,
  ChevronDown,
  ChevronRight,
  TrendingUp,
  Calendar,
  Filter,
} from "lucide-react";

type FilterType = "all" | "Warning Letter" | "Untitled Letter" | "Public Safety Notification";

export function FDAEnforcement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<FilterType>("all");
  const [expandedYear, setExpandedYear] = useState<number | null>(2026);

  const filteredActions = useMemo(() => {
    return enforcementActions.filter((action) => {
      const matchesSearch =
        searchTerm === "" ||
        action.entity.toLowerCase().includes(searchTerm.toLowerCase()) ||
        action.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (action.location && action.location.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesType = filterType === "all" || action.type === filterType;
      return matchesSearch && matchesType;
    });
  }, [searchTerm, filterType]);

  const groupedByYear = useMemo(() => {
    const groups: Record<number, EnforcementAction[]> = {};
    filteredActions.forEach((action) => {
      if (!groups[action.year]) groups[action.year] = [];
      groups[action.year].push(action);
    });
    return Object.entries(groups)
      .sort(([a], [b]) => Number(b) - Number(a))
      .map(([year, actions]) => ({ year: Number(year), actions }));
  }, [filteredActions]);

  const typeIcon = (type: EnforcementAction["type"]) => {
    switch (type) {
      case "Warning Letter":
        return <FileWarning className="w-4 h-4 text-red-500" />;
      case "Untitled Letter":
        return <AlertTriangle className="w-4 h-4 text-amber-500" />;
      case "Public Safety Notification":
        return <Bell className="w-4 h-4 text-blue-500" />;
    }
  };

  const typeBadgeColor = (type: EnforcementAction["type"]) => {
    switch (type) {
      case "Warning Letter":
        return "bg-red-100 text-red-800 border-red-200";
      case "Untitled Letter":
        return "bg-amber-50 text-amber-800 border-amber-200";
      case "Public Safety Notification":
        return "bg-blue-50 text-blue-800 border-blue-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="bg-gradient-to-r from-red-900 via-slate-900 to-slate-800 rounded-2xl p-6 md:p-8 border border-red-800/30">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="w-8 h-8 text-red-400" />
          <div>
            <h2 className="text-2xl font-bold text-white">FDA/CBER Enforcement Timeline</h2>
            <p className="text-slate-400 text-sm">Warning Letters and Untitled Letters, {enforcementStats.yearRange}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <p className="text-3xl font-bold text-white">{enforcementStats.totalActions}</p>
            <p className="text-slate-400 text-xs mt-1">Total Actions</p>
          </div>
          <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/20">
            <p className="text-3xl font-bold text-red-400">{enforcementStats.warningLetters}</p>
            <p className="text-slate-400 text-xs mt-1">Warning Letters</p>
          </div>
          <div className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/20">
            <p className="text-3xl font-bold text-amber-400">{enforcementStats.untitledLetters}</p>
            <p className="text-slate-400 text-xs mt-1">Untitled Letters</p>
          </div>
          <div className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/20">
            <p className="text-3xl font-bold text-blue-400">{enforcementStats.safetyNotifications}</p>
            <p className="text-slate-400 text-xs mt-1">Safety Notifications</p>
          </div>
        </div>

        <div className="mt-4 bg-red-900/30 rounded-lg p-3 border border-red-700/30">
          <p className="text-red-200 text-sm leading-relaxed">
            {enforcementStats.keyInsight}
          </p>
        </div>
      </div>

      {/* DynaCord Distinction */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
          <Shield className="w-5 h-5 text-emerald-600" />
        </div>
        <div>
          <h3 className="font-bold text-emerald-900 text-sm">DynaCord: Zero FDA Enforcement Actions</h3>
          <p className="text-emerald-700 text-sm mt-1">
            DynaCord has never received a Warning Letter, Untitled Letter, or any FDA enforcement action.
            It is the only hUCMSC-Exos (WJ-MSC exosome) product manufactured as a drug under FDA CBER with 351(a) registration,
            cGMP manufacturing, batch-by-batch Eurofins third-party testing, CNA liability insurance, and a Type II DMF.
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search entities, locations, or descriptions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400"
          />
        </div>
        <div className="flex gap-2">
          <div className="flex items-center gap-1.5 px-3 py-2 bg-gray-100 rounded-lg">
            <Filter className="w-3.5 h-3.5 text-gray-500" />
            <span className="text-xs text-gray-500 font-medium">Type:</span>
          </div>
          {(["all", "Warning Letter", "Untitled Letter", "Public Safety Notification"] as FilterType[]).map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                filterType === type
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              {type === "all" ? "All" : type === "Public Safety Notification" ? "PSN" : type.replace(" Letter", "")}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Showing {filteredActions.length} of {enforcementActions.length} enforcement actions
        </p>
        <a
          href={enforcementStats.cberEnforcementUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-800 transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          FDA CBER Enforcement Page
        </a>
      </div>

      {/* Timeline by Year */}
      <div className="space-y-3">
        {groupedByYear.map(({ year, actions }) => {
          const wlCount = actions.filter((a) => a.type === "Warning Letter").length;
          const ulCount = actions.filter((a) => a.type === "Untitled Letter").length;
          const psnCount = actions.filter((a) => a.type === "Public Safety Notification").length;

          return (
            <div key={year} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
              <button
                onClick={() => setExpandedYear(expandedYear === year ? null : year)}
                className="w-full flex items-center gap-4 p-4 md:p-5 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <span className="text-xl font-bold text-gray-900">{year}</span>
                </div>
                <div className="flex items-center gap-2 flex-1">
                  {wlCount > 0 && (
                    <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                      {wlCount} Warning{wlCount > 1 ? "s" : ""}
                    </span>
                  )}
                  {ulCount > 0 && (
                    <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
                      {ulCount} Untitled
                    </span>
                  )}
                  {psnCount > 0 && (
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                      {psnCount} PSN
                    </span>
                  )}
                  <span className="text-gray-400 text-xs ml-auto mr-2">{actions.length} total</span>
                </div>
                {year >= 2021 && (
                  <TrendingUp className="w-4 h-4 text-red-400 shrink-0" />
                )}
                {expandedYear === year ? (
                  <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-400 shrink-0" />
                )}
              </button>

              {expandedYear === year && (
                <div className="border-t border-gray-100">
                  {actions.map((action) => (
                    <div
                      key={action.id}
                      className="flex items-start gap-3 p-4 md:px-5 border-b border-gray-50 last:border-b-0 hover:bg-gray-50/50 transition-colors"
                    >
                      <div className="mt-0.5 shrink-0">{typeIcon(action.type)}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="font-semibold text-gray-900 text-sm">{action.entity}</span>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${typeBadgeColor(action.type)}`}>
                            {action.type}
                          </span>
                        </div>
                        {action.location && (
                          <p className="text-xs text-gray-500 mb-1">{action.location}</p>
                        )}
                        <p className="text-sm text-gray-600 leading-relaxed">{action.description}</p>
                        <div className="flex flex-wrap items-center gap-3 mt-2">
                          <span className="text-xs text-gray-400">{action.date}</span>
                          {action.cberReference && (
                            <span className="text-xs text-gray-400 font-mono">{action.cberReference}</span>
                          )}
                          <a
                            href={action.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 transition-colors"
                          >
                            <ExternalLink className="w-3 h-3" />
                            {action.sourceLabel}
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Key Sources */}
      <div className="bg-gray-50 rounded-xl border border-gray-200 p-5">
        <h3 className="font-bold text-gray-900 text-sm mb-3">Key FDA Sources</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <a
            href={enforcementStats.cberEnforcementUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors group"
          >
            <ExternalLink className="w-4 h-4 text-blue-500 group-hover:text-blue-600" />
            <span className="text-sm text-gray-700 group-hover:text-blue-700">CBER Enforcement Actions</span>
          </a>
          <a
            href={enforcementStats.consumerAlertUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors group"
          >
            <ExternalLink className="w-4 h-4 text-blue-500 group-hover:text-blue-600" />
            <span className="text-sm text-gray-700 group-hover:text-blue-700">Consumer Alert: Stem Cells & Exosomes</span>
          </a>
          <a
            href={enforcementStats.approvedProductsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors group"
          >
            <ExternalLink className="w-4 h-4 text-blue-500 group-hover:text-blue-600" />
            <span className="text-sm text-gray-700 group-hover:text-blue-700">Approved Cell & Gene Therapy Products</span>
          </a>
        </div>
      </div>
    </div>
  );
}
