import { useFilters } from "@/contexts/FilterContext";
import { Filter, RotateCcw, Search } from "lucide-react";

const SECTION_OPTIONS = ["351(a)", "361 HCT/P (Tissue Bank)", "351(a) (Investigational)", "361 HCT/P (FDA Disputes)", "361 HCT/P (Cosmetic)", "Autologous (Practice of Medicine)"];
const MANUFACTURING_OPTIONS = ["cGMP", "GMP"];
const FDA_STATUS_OPTIONS = ["No Warning Letters", "Warning Letter"];
const COA_OPTIONS = ["Yes", "No/Unclear"];
const DMF_OPTIONS = ["Yes", "No"];

function FilterGroup({
  label,
  options,
  selected,
  onToggle,
}: {
  label: string;
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <div className="mb-4">
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">{label}</p>
      <div className="space-y-1">
        {options.map((option) => {
          const isActive = selected.includes(option);
          return (
            <button
              key={option}
              onClick={() => onToggle(option)}
              className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                isActive
                  ? "bg-blue-100 text-blue-800 border border-blue-200"
                  : "text-gray-600 hover:bg-gray-50 border border-transparent"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function FilterPanel() {
  const { filters, updateFilter, resetFilters } = useFilters();

  const hasActiveFilters =
    filters.section.length > 0 ||
    filters.manufacturing.length > 0 ||
    filters.fda_status.length > 0 ||
    filters.coa.length > 0 ||
    filters.dmf.length > 0 ||
    filters.searchTerm.length > 0;

  const toggleFilter = (key: keyof typeof filters, value: string) => {
    const current = filters[key] as string[];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    updateFilter(key, updated);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-bold text-gray-800">Filters</span>
        </div>
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            Clear
          </button>
        )}
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
        <input
          type="text"
          placeholder="Search companies..."
          value={filters.searchTerm}
          onChange={(e) => updateFilter("searchTerm", e.target.value)}
          className="w-full pl-8 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <FilterGroup
        label="Section"
        options={SECTION_OPTIONS}
        selected={filters.section}
        onToggle={(v) => toggleFilter("section", v)}
      />

      <FilterGroup
        label="Manufacturing"
        options={MANUFACTURING_OPTIONS}
        selected={filters.manufacturing}
        onToggle={(v) => toggleFilter("manufacturing", v)}
      />

      <FilterGroup
        label="FDA Status"
        options={FDA_STATUS_OPTIONS}
        selected={filters.fda_status}
        onToggle={(v) => toggleFilter("fda_status", v)}
      />

      <FilterGroup
        label="COA"
        options={COA_OPTIONS}
        selected={filters.coa}
        onToggle={(v) => toggleFilter("coa", v)}
      />

      <FilterGroup
        label="DMF/IND"
        options={DMF_OPTIONS}
        selected={filters.dmf}
        onToggle={(v) => toggleFilter("dmf", v)}
      />
    </div>
  );
}
