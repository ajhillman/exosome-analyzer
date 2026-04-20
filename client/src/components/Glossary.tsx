import { glossaryTerms, glossaryCategories, type GlossaryTerm } from "@/data/glossary";
import {
  BookOpen,
  Search,
  FlaskConical,
  Scale,
  Factory,
  Stethoscope,
  Gavel,
  Briefcase,
  Tag,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useState, useMemo } from "react";

const categoryIcons: Record<string, React.ReactNode> = {
  scientific: <FlaskConical className="w-3.5 h-3.5" />,
  regulatory: <Scale className="w-3.5 h-3.5" />,
  manufacturing: <Factory className="w-3.5 h-3.5" />,
  clinical: <Stethoscope className="w-3.5 h-3.5" />,
  legal: <Gavel className="w-3.5 h-3.5" />,
  business: <Briefcase className="w-3.5 h-3.5" />,
};

const categoryColors: Record<string, { bg: string; text: string; border: string; badge: string }> = {
  scientific: { bg: "bg-violet-50", text: "text-violet-700", border: "border-violet-200", badge: "bg-violet-100 text-violet-700" },
  regulatory: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200", badge: "bg-blue-100 text-blue-700" },
  manufacturing: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", badge: "bg-emerald-100 text-emerald-700" },
  clinical: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", badge: "bg-amber-100 text-amber-700" },
  legal: { bg: "bg-red-50", text: "text-red-700", border: "border-red-200", badge: "bg-red-100 text-red-700" },
  business: { bg: "bg-slate-50", text: "text-slate-700", border: "border-slate-200", badge: "bg-slate-100 text-slate-700" },
};

function TermCard({ term, isExpanded, onToggle }: { term: GlossaryTerm; isExpanded: boolean; onToggle: () => void }) {
  const colors = categoryColors[term.category];

  return (
    <div
      className={`bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden ${isExpanded ? "ring-1 ring-blue-100" : ""}`}
    >
      <button
        onClick={onToggle}
        className="w-full text-left p-4 flex items-start gap-3"
      >
        <div className={`mt-0.5 p-1.5 rounded-lg ${colors.bg} ${colors.text} shrink-0`}>
          {categoryIcons[term.category]}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-sm font-bold text-gray-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {term.abbreviation ? (
                <>
                  <span className="text-[#0f62fe]">{term.abbreviation}</span>
                  <span className="text-gray-300 mx-1.5 font-normal">|</span>
                  {term.term}
                </>
              ) : (
                term.term
              )}
            </h3>
          </div>
          {!isExpanded && (
            <p className="text-xs text-gray-400 mt-1 line-clamp-1">{term.definition}</p>
          )}
        </div>
        <div className="shrink-0 mt-1">
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-gray-300" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-300" />
          )}
        </div>
      </button>

      {isExpanded && (
        <div className="px-4 pb-4 pt-0">
          <div className="ml-9">
            <p className="text-sm text-gray-600 leading-relaxed">{term.definition}</p>
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider ${colors.badge}`}>
                {categoryIcons[term.category]}
                {term.category}
              </span>
              {term.relatedTerms && term.relatedTerms.map((rt) => (
                <span key={rt} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium bg-gray-50 text-gray-500 border border-gray-100">
                  <Tag className="w-2.5 h-2.5" />
                  {rt}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function Glossary() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [expandedTerms, setExpandedTerms] = useState<Set<string>>(new Set());
  const [expandAll, setExpandAll] = useState(false);

  const filteredTerms = useMemo(() => {
    let terms = glossaryTerms;

    if (activeCategory !== "all") {
      terms = terms.filter((t) => t.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      terms = terms.filter(
        (t) =>
          t.term.toLowerCase().includes(q) ||
          (t.abbreviation && t.abbreviation.toLowerCase().includes(q)) ||
          t.definition.toLowerCase().includes(q) ||
          (t.relatedTerms && t.relatedTerms.some((rt) => rt.toLowerCase().includes(q)))
      );
    }

    return terms.sort((a, b) => {
      if (a.abbreviation && b.abbreviation) return a.abbreviation.localeCompare(b.abbreviation);
      if (a.abbreviation) return -1;
      if (b.abbreviation) return 1;
      return a.term.localeCompare(b.term);
    });
  }, [searchQuery, activeCategory]);

  const toggleTerm = (termKey: string) => {
    setExpandedTerms((prev) => {
      const next = new Set(prev);
      if (next.has(termKey)) {
        next.delete(termKey);
      } else {
        next.add(termKey);
      }
      return next;
    });
  };

  const toggleExpandAll = () => {
    if (expandAll) {
      setExpandedTerms(new Set());
      setExpandAll(false);
    } else {
      setExpandedTerms(new Set(filteredTerms.map((t) => t.term)));
      setExpandAll(true);
    }
  };

  // Group terms by first letter for alphabetical navigation
  const groupedTerms = useMemo(() => {
    const groups: Record<string, GlossaryTerm[]> = {};
    filteredTerms.forEach((term) => {
      const letter = (term.abbreviation || term.term).charAt(0).toUpperCase();
      if (!groups[letter]) groups[letter] = [];
      groups[letter].push(term);
    });
    return groups;
  }, [filteredTerms]);

  const letters = Object.keys(groupedTerms).sort();

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              Glossary of Terms
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {glossaryTerms.length} definitions covering scientific, regulatory, manufacturing, clinical, legal, and business terminology used in the exosome industry
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 font-medium">{filteredTerms.length} terms</span>
            <button
              onClick={toggleExpandAll}
              className="text-xs font-medium text-[#0f62fe] hover:text-[#0043ce] transition-colors px-2 py-1 rounded-md hover:bg-blue-50"
            >
              {expandAll ? "Collapse All" : "Expand All"}
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative mt-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search terms, abbreviations, or definitions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 bg-gray-50 transition-all"
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mt-3">
          {glossaryCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeCategory === cat.id
                  ? "bg-[#0f62fe] text-white shadow-sm"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-100"
              }`}
            >
              {cat.id !== "all" && categoryIcons[cat.id]}
              {cat.label}
              <span className={`ml-0.5 text-[10px] ${activeCategory === cat.id ? "text-blue-200" : "text-gray-400"}`}>
                ({cat.count})
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Key Terms Highlight */}
      {activeCategory === "all" && !searchQuery && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            {
              abbr: "hUCMSC-Exos",
              full: "Human Umbilical Cord Mesenchymal Stem Cell-Derived Exosomes",
              color: "from-blue-600 to-indigo-700",
            },
            {
              abbr: "WJ-MSC",
              full: "Wharton's Jelly Mesenchymal Stem Cells",
              color: "from-violet-600 to-purple-700",
            },
            {
              abbr: "EVs",
              full: "Extracellular Vesicles",
              color: "from-emerald-600 to-teal-700",
            },
          ].map((item) => (
            <button
              key={item.abbr}
              onClick={() => setSearchQuery(item.abbr)}
              className={`bg-gradient-to-br ${item.color} rounded-xl p-4 text-left hover:scale-[1.02] transition-transform shadow-sm`}
            >
              <span className="text-white/60 text-[10px] font-semibold uppercase tracking-wider">Key Term</span>
              <h3 className="text-white text-lg font-bold mt-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {item.abbr}
              </h3>
              <p className="text-white/70 text-xs mt-1 leading-relaxed">{item.full}</p>
            </button>
          ))}
        </div>
      )}

      {/* Alphabetical Letter Navigation */}
      {letters.length > 3 && (
        <div className="flex flex-wrap gap-1">
          {letters.map((letter) => (
            <a
              key={letter}
              href={`#glossary-${letter}`}
              className="w-7 h-7 flex items-center justify-center rounded-md text-xs font-bold text-gray-500 hover:text-[#0f62fe] hover:bg-blue-50 transition-colors"
            >
              {letter}
            </a>
          ))}
        </div>
      )}

      {/* Terms List */}
      {filteredTerms.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
          <Search className="w-8 h-8 text-gray-200 mx-auto" />
          <p className="text-gray-400 text-sm font-medium mt-3">No terms match your search.</p>
          <p className="text-gray-300 text-xs mt-1">Try a different keyword or category.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {letters.map((letter) => (
            <div key={letter} id={`glossary-${letter}`}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg font-bold text-[#0f62fe]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {letter}
                </span>
                <div className="flex-1 h-px bg-gray-100" />
                <span className="text-[10px] text-gray-300 font-medium">{groupedTerms[letter].length} terms</span>
              </div>
              <div className="space-y-2">
                {groupedTerms[letter].map((term) => (
                  <TermCard
                    key={term.term}
                    term={term}
                    isExpanded={expandedTerms.has(term.term)}
                    onToggle={() => toggleTerm(term.term)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
