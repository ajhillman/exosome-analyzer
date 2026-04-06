import { useFilters } from "@/contexts/FilterContext";
import { Search, X, SlidersHorizontal } from "lucide-react";

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
      <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-[0.06em] mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        {label}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {options.map((option) => {
          const isActive = selected.includes(option);
          return (
            <button
              key={option}
              onClick={() => onToggle(option)}
              className={`px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-all duration-200 border ${
                isActive
                  ? "bg-[#0f62fe] text-white border-[#0f62fe] shadow-sm"
                  : "bg-white text-gray-500 border-gray-200/80 hover:border-gray-300 hover:text-gray-700"
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
    <div className="card-premium p-4 md:p-5 sticky top-24">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-gray-400" />
          <span className="text-sm font-bold text-gray-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Filters</span>
        </div>
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="flex items-center gap-1 text-[11px] font-medium text-[#0f62fe] hover:text-[#0043ce] transition-colors"
          >
            <X className="w-3 h-3" />
            Clear
          </button>
        )}
      </div>

      <div className="relative mb-5">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-300" />
        <input
          type="text"
          placeholder="Search companies..."
          value={filters.searchTerm}
          onChange={(e) => updateFilter("searchTerm", e.target.value)}
          className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200/80 rounded-xl text-[13px] text-gray-700 placeholder:text-gray-300 focus:outline-none focus:border-[#0f62fe] focus:ring-2 focus:ring-[#0f62fe]/10 transition-all"
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
