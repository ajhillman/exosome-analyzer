import { CompanyTable } from "@/components/CompanyTable";
import ComplianceCase from "@/components/ComplianceCase";
import { ReportCard } from "@/components/ReportCard";
import { DosingGuides } from "@/components/DosingGuides";
import { FilterPanel } from "@/components/FilterPanel";
import { DMFEducation } from "@/components/DMFEducation";
import { RegulatoryReference } from "@/components/RegulatoryReference";
import { Statistics } from "@/components/Statistics";
import { StudiesSection } from "@/components/StudiesSection";
import { useFilters } from "@/contexts/FilterContext";
import { companiesData, filterCompanies } from "@/data/companies";
import {
  Activity,
  Award,
  BookOpen,
  Building2,
  FileText,
  FlaskConical,
  LayoutDashboard,
  Scale,
  Shield,
  Syringe,
} from "lucide-react";
import { useMemo, useState } from "react";

type TabId = "dashboard" | "companies" | "reportcard" | "studies" | "dosing" | "regulatory" | "dmf" | "compliance";

export default function Home() {
  const { filters } = useFilters();
  const [activeTab, setActiveTab] = useState<TabId>("dashboard");

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

  const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: "companies", label: "Companies", icon: <Building2 className="w-4 h-4" /> },
    { id: "reportcard", label: "Report Card", icon: <Award className="w-4 h-4" /> },
    { id: "studies", label: "Clinical Studies", icon: <BookOpen className="w-4 h-4" /> },
    { id: "dosing", label: "Dosing Protocols", icon: <Syringe className="w-4 h-4" /> },
    { id: "regulatory", label: "Regulatory", icon: <Scale className="w-4 h-4" /> },
    { id: "dmf", label: "DMF Guide", icon: <FileText className="w-4 h-4" /> },
    { id: "compliance", label: "Compliance Case", icon: <Shield className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-[#f0f4f8]">
      {/* Top Header Bar */}
      <header className="bg-white border-b border-gray-200 px-6 py-3 sticky top-0 z-50 shadow-sm">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
              <FlaskConical className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900 leading-tight" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Exo Info
              </h1>
              <p className="text-[11px] text-gray-500 leading-tight">Exosome Regulatory Intelligence</p>
            </div>
          </div>

          <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-white text-blue-700 shadow-sm"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
              >
                {tab.icon}
                <span className="hidden md:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full">
              <Activity className="w-3.5 h-3.5 text-green-600" />
              <span className="text-xs font-medium text-green-700">Live Data</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1600px] mx-auto px-4 md:px-6 py-6">
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            <Statistics companies={filteredCompanies} />
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="lg:w-64 shrink-0">
                <FilterPanel />
              </div>
              <div className="flex-1">
                <CompanyTable companies={filteredCompanies} />
              </div>
            </div>
          </div>
        )}

        {activeTab === "companies" && (
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-64 shrink-0">
              <FilterPanel />
            </div>
            <div className="flex-1">
              <CompanyTable companies={filteredCompanies} />
            </div>
          </div>
        )}

        {activeTab === "reportcard" && <ReportCard companies={filteredCompanies} />}

        {activeTab === "studies" && <StudiesSection />}

        {activeTab === "dosing" && <DosingGuides />}

        {activeTab === "regulatory" && <RegulatoryReference />}

        {activeTab === "dmf" && <DMFEducation />}

        {activeTab === "compliance" && <ComplianceCase />}
      </main>
    </div>
  );
}
