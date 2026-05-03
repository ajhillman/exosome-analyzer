import { FilterState } from "@/types";
import React, { createContext, useContext, useState } from "react";

interface FilterContextType {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
  resetFilters: () => void;
  updateFilter: (key: keyof FilterState, value: any) => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

const defaultFilters: FilterState = {
  section: [],
  manufacturing: [],
  fda_status: [],
  coa: [],
  dmf: [],
  companyType: [],
  searchTerm: "",
};

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  const updateFilter = (key: keyof FilterState, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <FilterContext.Provider value={{ filters, setFilters, resetFilters, updateFilter }}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilters() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useFilters must be used within a FilterProvider");
  }
  return context;
}
