import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFilters } from "@/contexts/FilterContext";
import { X } from "lucide-react";

const filterOptions = {
  section: ["351(a)", "361", "351(a) (Investigational)", "361 (FDA disputes)", "361 (Cosmetic)"],
  manufacturing: ["cGMP", "GMP", "GMP (Cited for violations)", "GMP (FDA cited cGMP deviations)"],
  fda_status: ["No Warning Letters", "Warning Letter (Sept 2023)", "Warning Letter (Jan 2025)", "Warning Letter (Sept 2025)"],
  coa: ["Yes (Batch-by-batch)", "Yes (Internal)", "Yes", "No/Unclear"],
  dmf: ["Yes", "Yes (IND for ExoFlo)", "Yes (IND for Zofin)", "No", "No (In process for IND)"],
};

export function FilterPanel() {
  const { filters, updateFilter, resetFilters } = useFilters();

  const handleCheckboxChange = (filterKey: keyof typeof filterOptions, value: string, checked: boolean) => {
    const currentValues = filters[filterKey] as string[];
    if (checked) {
      updateFilter(filterKey, [...currentValues, value]);
    } else {
      updateFilter(filterKey, currentValues.filter((v) => v !== value));
    }
  };

  const hasActiveFilters =
    filters.section.length > 0 ||
    filters.manufacturing.length > 0 ||
    filters.fda_status.length > 0 ||
    filters.coa.length > 0 ||
    filters.dmf.length > 0 ||
    filters.searchTerm.length > 0;

  return (
    <div className="w-full lg:w-80 bg-card border-r border-border p-6 space-y-6 overflow-y-auto max-h-screen">
      <div>
        <h2 className="text-lg font-bold text-foreground mb-4">Filters</h2>

        <div className="mb-6">
          <Label htmlFor="search" className="text-sm font-medium mb-2 block">
            Search Companies
          </Label>
          <Input
            id="search"
            placeholder="Search by name or source..."
            value={filters.searchTerm}
            onChange={(e) => updateFilter("searchTerm", e.target.value)}
            className="w-full"
          />
        </div>

        {Object.entries(filterOptions).map(([key, options]) => (
          <div key={key} className="mb-6">
            <h3 className="text-sm font-semibold text-foreground mb-3 capitalize">
              {key === "fda_status" ? "FDA Status" : key === "coa" ? "Certificate of Analysis" : key === "dmf" ? "DMF/IND Status" : key}
            </h3>
            <div className="space-y-2">
              {options.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <Checkbox
                    id={`${key}-${option}`}
                    checked={(filters[key as keyof typeof filters] as string[]).includes(option)}
                    onCheckedChange={(checked) => handleCheckboxChange(key as keyof typeof filterOptions, option, checked as boolean)}
                  />
                  <Label htmlFor={`${key}-${option}`} className="text-sm font-normal cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        ))}

        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={resetFilters}
            className="w-full flex items-center gap-2"
          >
            <X className="w-4 h-4" />
            Clear Filters
          </Button>
        )}
      </div>
    </div>
  );
}
