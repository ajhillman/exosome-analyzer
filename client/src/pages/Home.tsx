import { CompanyTable } from "@/components/CompanyTable";
import { FilterPanel } from "@/components/FilterPanel";
import { Statistics } from "@/components/Statistics";
import { useFilters } from "@/contexts/FilterContext";
import { companiesData, filterCompanies } from "@/data/companies";
import { useMemo } from "react";

export default function Home() {
  const { filters } = useFilters();

  const filteredCompanies = useMemo(() => {
    return filterCompanies(companiesData, {
      section: filters.section,
      manufacturing: filters.manufacturing,
      fda_status: filters.fda_status,
      coa: filters.coa,
      dmf: filters.dmf,
      searchTerm: filters.searchTerm,
    });
  }, [filters]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-card border-b border-border px-6 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground">Exosome Regulatory Analyzer</h1>
          <p className="text-muted-foreground mt-1">
            Compare exosome companies across regulatory status, manufacturing standards, and compliance metrics.
          </p>
        </div>
      </header>

      {/* Statistics */}
      <Statistics companies={filteredCompanies} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Filter Panel */}
        <FilterPanel />

        {/* Company Table */}
        <CompanyTable companies={filteredCompanies} />
      </div>
    </div>
  );
}
