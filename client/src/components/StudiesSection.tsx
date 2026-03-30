import {
  clinicalStudies,
  ClinicalStudy,
  deliveryRoutes,
  therapeuticAreas,
} from "@/data/studies";
import {
  BookOpen,
  Calendar,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Filter,
  Search,
  Syringe,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";

function StudyCard({
  study,
  isExpanded,
  onToggle,
}: {
  study: ClinicalStudy;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const routeColor: Record<string, string> = {
    "Intravenous (IV)": "bg-blue-100 text-blue-800 border-blue-200",
    "Nebulized/Inhaled": "bg-cyan-100 text-cyan-800 border-cyan-200",
    "Direct Injection (Intra-articular)": "bg-green-100 text-green-800 border-green-200",
    "Direct Injection (Intrathecal)": "bg-purple-100 text-purple-800 border-purple-200",
    "Direct Injection (Intradermal/Subcutaneous)": "bg-pink-100 text-pink-800 border-pink-200",
    "Direct Injection (Intracavernosal)": "bg-orange-100 text-orange-800 border-orange-200",
    "Direct Injection (Intradiscal)": "bg-amber-100 text-amber-800 border-amber-200",
    "Direct Injection": "bg-teal-100 text-teal-800 border-teal-200",
    "Not specified": "bg-gray-100 text-gray-600 border-gray-200",
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
      <div className="p-4 cursor-pointer" onClick={onToggle}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1.5">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                <Calendar className="w-2.5 h-2.5" />
                {study.year}
              </span>
              <span
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold border ${routeColor[study.route] || routeColor["Not specified"]}`}
              >
                <Syringe className="w-2.5 h-2.5" />
                {study.route}
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-medium bg-gray-50 text-gray-600 border border-gray-200">
                {study.therapeuticArea}
              </span>
            </div>
            <h3 className="text-sm font-bold text-gray-900 leading-snug line-clamp-2">
              {study.title}
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              {study.authors} - {study.journal}
            </p>
          </div>
          <div className="shrink-0 mt-1">
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="px-4 pb-4 space-y-3 border-t border-gray-50 pt-3">
          <div>
            <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-1">Summary</p>
            <p className="text-sm text-gray-700 leading-relaxed">{study.summary}</p>
          </div>

          {study.dosing && study.dosing !== "Not specified" && (
            <div className="bg-blue-50 rounded-xl p-3">
              <p className="text-[10px] text-blue-600 uppercase tracking-wider font-semibold mb-1">
                Dosing Protocol
              </p>
              <p className="text-sm text-blue-900">{study.dosing}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-1">Patients</p>
              <p className="text-sm text-gray-800 flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-gray-400" />
                {study.patients}
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-1">Delivery Route</p>
              <p className="text-sm text-gray-800">{study.route}</p>
            </div>
          </div>

          {study.outcomes && study.outcomes !== study.summary && (
            <div className="bg-green-50 rounded-xl p-3">
              <p className="text-[10px] text-green-600 uppercase tracking-wider font-semibold mb-1">Key Outcomes</p>
              <p className="text-sm text-green-900">{study.outcomes}</p>
            </div>
          )}

          {study.url && (
            <a
              href={study.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              <BookOpen className="w-4 h-4" />
              View Full Study
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      )}
    </div>
  );
}

export function StudiesSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArea, setSelectedArea] = useState<string>("All");
  const [selectedRoute, setSelectedRoute] = useState<string>("All");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filteredStudies = useMemo(() => {
    return clinicalStudies.filter((s) => {
      const matchesSearch =
        !searchTerm ||
        s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.authors.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.therapeuticArea.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesArea = selectedArea === "All" || s.therapeuticArea === selectedArea;
      const matchesRoute = selectedRoute === "All" || s.route === selectedRoute;
      return matchesSearch && matchesArea && matchesRoute;
    });
  }, [searchTerm, selectedArea, selectedRoute]);

  const studyCountByRoute = useMemo(() => {
    const counts: Record<string, number> = {};
    clinicalStudies.forEach((s) => {
      counts[s.route] = (counts[s.route] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              WJ-MSC Exosome Clinical Studies
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {clinicalStudies.length} peer-reviewed human studies on Wharton's Jelly mesenchymal stem cell exosomes
            </p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-lg">
              <Syringe className="w-3.5 h-3.5 text-blue-600" />
              <span className="text-xs font-medium text-blue-700">
                IV: {studyCountByRoute["Intravenous (IV)"] || 0}
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-cyan-50 rounded-lg">
              <Syringe className="w-3.5 h-3.5 text-cyan-600" />
              <span className="text-xs font-medium text-cyan-700">
                Nebulized: {studyCountByRoute["Nebulized/Inhaled"] || 0}
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-lg">
              <Syringe className="w-3.5 h-3.5 text-green-600" />
              <span className="text-xs font-medium text-green-700">
                Injection: {Object.entries(studyCountByRoute)
                  .filter(([k]) => k.startsWith("Direct"))
                  .reduce((sum, [, v]) => sum + v, 0)}
              </span>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mt-4 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search studies by title, author, condition, or keyword..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors"
          >
            <Filter className="w-4 h-4" />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>

          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1 block">Therapeutic Area</label>
                <select
                  value={selectedArea}
                  onChange={(e) => setSelectedArea(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="All">All Areas ({clinicalStudies.length})</option>
                  {therapeuticAreas.map((area) => (
                    <option key={area} value={area}>
                      {area} ({clinicalStudies.filter((s) => s.therapeuticArea === area).length})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1 block">Delivery Route</label>
                <select
                  value={selectedRoute}
                  onChange={(e) => setSelectedRoute(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="All">All Routes</option>
                  {deliveryRoutes.map((route) => (
                    <option key={route} value={route}>
                      {route} ({studyCountByRoute[route] || 0})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results Count */}
      <p className="text-sm text-gray-500">
        Showing {filteredStudies.length} of {clinicalStudies.length} studies
      </p>

      {/* Study Cards */}
      <div className="space-y-3">
        {filteredStudies.map((study) => (
          <StudyCard
            key={study.id}
            study={study}
            isExpanded={expandedId === study.id}
            onToggle={() => setExpandedId(expandedId === study.id ? null : study.id)}
          />
        ))}
      </div>

      {filteredStudies.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl shadow-sm">
          <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 text-lg">No studies match your search criteria.</p>
          <p className="text-gray-400 text-sm mt-1">Try broadening your search terms or filters.</p>
        </div>
      )}
    </div>
  );
}
