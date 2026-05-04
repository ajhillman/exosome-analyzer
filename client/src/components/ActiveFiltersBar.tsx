import { X, Filter } from "lucide-react";
import { useFilters } from "@/contexts/FilterContext";

interface FilterChip {
  category: string;
  value: string;
  filterKey: string;
}

export function ActiveFiltersBar() {
  const { filters, updateFilter, resetFilters } = useFilters();

  const chips: FilterChip[] = [];

  // Section filters
  filters.section.forEach((v) => chips.push({ category: "Section", value: v, filterKey: "section" }));
  // Manufacturing filters
  filters.manufacturing.forEach((v) => chips.push({ category: "Manufacturing", value: v, filterKey: "manufacturing" }));
  // FDA Status filters
  filters.fda_status.forEach((v) => chips.push({ category: "FDA Status", value: v, filterKey: "fda_status" }));
  // COA filters
  filters.coa.forEach((v) => chips.push({ category: "COA", value: v, filterKey: "coa" }));
  // DMF filters
  filters.dmf.forEach((v) => chips.push({ category: "DMF", value: v, filterKey: "dmf" }));
  // Company Type filters
  filters.companyType.forEach((v) => chips.push({ category: "Type", value: v, filterKey: "companyType" }));

  if (chips.length === 0) return null;

  const removeChip = (chip: FilterChip) => {
    const current = filters[chip.filterKey as keyof typeof filters] as string[];
    const updated = current.filter((v) => v !== chip.value);
    updateFilter(chip.filterKey as keyof typeof filters, updated);
  };

  return (
    <div
      className="active-filters-bar"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        flexWrap: "wrap",
        padding: "12px 16px",
        marginBottom: "16px",
        background: "rgba(15, 98, 254, 0.04)",
        border: "1px solid rgba(15, 98, 254, 0.15)",
        borderRadius: "10px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "6px", marginRight: "4px" }}>
        <Filter className="w-3.5 h-3.5" style={{ color: "#0f62fe" }} />
        <span
          style={{
            fontSize: "11px",
            fontWeight: 700,
            color: "#0f62fe",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}
        >
          Active Filters
        </span>
        <span
          style={{
            fontSize: "10px",
            fontWeight: 600,
            color: "#fff",
            background: "#0f62fe",
            borderRadius: "10px",
            padding: "1px 7px",
            minWidth: "18px",
            textAlign: "center",
          }}
        >
          {chips.length}
        </span>
      </div>

      {chips.map((chip, i) => (
        <button
          key={`${chip.filterKey}-${chip.value}-${i}`}
          onClick={() => removeChip(chip)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            padding: "4px 10px 4px 12px",
            fontSize: "11px",
            fontWeight: 500,
            color: "#1a1a2e",
            background: "#fff",
            border: "1px solid rgba(0,0,0,0.1)",
            borderRadius: "20px",
            cursor: "pointer",
            transition: "all 0.15s ease",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#fee2e2";
            e.currentTarget.style.borderColor = "#fca5a5";
            e.currentTarget.style.color = "#dc2626";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#fff";
            e.currentTarget.style.borderColor = "rgba(0,0,0,0.1)";
            e.currentTarget.style.color = "#1a1a2e";
          }}
        >
          <span style={{ color: "#6b7280", fontSize: "10px", fontWeight: 600 }}>{chip.category}:</span>
          <span>{chip.value}</span>
          <X className="w-3 h-3" style={{ marginLeft: "2px", opacity: 0.5 }} />
        </button>
      ))}

      <button
        onClick={resetFilters}
        style={{
          marginLeft: "auto",
          display: "flex",
          alignItems: "center",
          gap: "4px",
          padding: "4px 12px",
          fontSize: "11px",
          fontWeight: 600,
          color: "#dc2626",
          background: "rgba(220, 38, 38, 0.06)",
          border: "1px solid rgba(220, 38, 38, 0.2)",
          borderRadius: "20px",
          cursor: "pointer",
          transition: "all 0.15s ease",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(220, 38, 38, 0.12)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(220, 38, 38, 0.06)";
        }}
      >
        <X className="w-3 h-3" />
        Clear All
      </button>
    </div>
  );
}
