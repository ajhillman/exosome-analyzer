import { useState, useRef, useEffect } from "react";
import { ArrowUpDown, ChevronDown, ArrowUp, ArrowDown } from "lucide-react";

export type SortField = "regulatoryScore" | "name" | "years_in_business" | "company_grade";
export type SortDirection = "asc" | "desc";

interface SortOption {
  label: string;
  field: SortField;
  defaultDirection: SortDirection;
}

const SORT_OPTIONS: SortOption[] = [
  { label: "Score (High to Low)", field: "regulatoryScore", defaultDirection: "desc" },
  { label: "Score (Low to High)", field: "regulatoryScore", defaultDirection: "asc" },
  { label: "Name (A-Z)", field: "name", defaultDirection: "asc" },
  { label: "Name (Z-A)", field: "name", defaultDirection: "desc" },
  { label: "Years in Business (Most)", field: "years_in_business", defaultDirection: "desc" },
  { label: "Years in Business (Least)", field: "years_in_business", defaultDirection: "asc" },
  { label: "Grade (Best First)", field: "company_grade", defaultDirection: "asc" },
  { label: "Grade (Worst First)", field: "company_grade", defaultDirection: "desc" },
];

interface SortDropdownProps {
  sortField: SortField;
  sortDirection: SortDirection;
  onSortChange: (field: SortField, direction: SortDirection) => void;
  totalCount: number;
}

export function SortDropdown({ sortField, sortDirection, onSortChange, totalCount }: SortDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentLabel = SORT_OPTIONS.find(
    (o) => o.field === sortField && o.defaultDirection === sortDirection
  )?.label || "Score (High to Low)";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "12px",
        gap: "12px",
        flexWrap: "wrap",
      }}
    >
      <span
        style={{
          fontSize: "12px",
          fontWeight: 600,
          color: "#6b7280",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}
      >
        Showing <span style={{ color: "#1a1a2e", fontWeight: 700 }}>{totalCount}</span> {totalCount === 1 ? "company" : "companies"}
      </span>

      <div ref={ref} style={{ position: "relative" }}>
        <button
          onClick={() => setOpen(!open)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "6px 12px",
            fontSize: "11px",
            fontWeight: 600,
            color: "#374151",
            background: "#fff",
            border: "1px solid rgba(0,0,0,0.1)",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "all 0.15s ease",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
          }}
        >
          <ArrowUpDown className="w-3.5 h-3.5" style={{ color: "#6b7280" }} />
          <span>Sort: {currentLabel}</span>
          <ChevronDown
            className="w-3 h-3"
            style={{
              color: "#9ca3af",
              transition: "transform 0.2s ease",
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
            }}
          />
        </button>

        {open && (
          <div
            style={{
              position: "absolute",
              top: "calc(100% + 4px)",
              right: 0,
              zIndex: 50,
              minWidth: "220px",
              background: "#fff",
              border: "1px solid rgba(0,0,0,0.08)",
              borderRadius: "10px",
              boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
              padding: "4px",
              animation: "fadeIn 0.15s ease",
            }}
          >
            {SORT_OPTIONS.map((option) => {
              const isActive = option.field === sortField && option.defaultDirection === sortDirection;
              return (
                <button
                  key={`${option.field}-${option.defaultDirection}`}
                  onClick={() => {
                    onSortChange(option.field, option.defaultDirection);
                    setOpen(false);
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    width: "100%",
                    padding: "8px 12px",
                    fontSize: "12px",
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? "#0f62fe" : "#374151",
                    background: isActive ? "rgba(15, 98, 254, 0.06)" : "transparent",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    transition: "all 0.1s ease",
                    textAlign: "left",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.background = "rgba(0,0,0,0.03)";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.background = "transparent";
                  }}
                >
                  {option.defaultDirection === "asc" ? (
                    <ArrowUp className="w-3 h-3" style={{ opacity: 0.5 }} />
                  ) : (
                    <ArrowDown className="w-3 h-3" style={{ opacity: 0.5 }} />
                  )}
                  {option.label}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
