import { CompanyTable } from "@/components/CompanyTable";
import ComplianceCase from "@/components/ComplianceCase";
import { ReportCard } from "@/components/ReportCard";
import { DosingGuides } from "@/components/DosingGuides";
import { FilterPanel } from "@/components/FilterPanel";
import { DMFEducation } from "@/components/DMFEducation";
import { RegulatoryReference } from "@/components/RegulatoryReference";
import { Statistics } from "@/components/Statistics";
import { StudiesSection } from "@/components/StudiesSection";
import { FDAEnforcement } from "@/components/FDAEnforcement";
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
  FileWarning,
  Shield,
  Syringe,
  Menu,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";

type TabId = "dashboard" | "companies" | "reportcard" | "studies" | "dosing" | "regulatory" | "dmf" | "compliance" | "enforcement";

export default function Home() {
  const { filters } = useFilters();
  const [activeTab, setActiveTab] = useState<TabId>("dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    { id: "compliance", label: "Compliance", icon: <Shield className="w-4 h-4" /> },
    { id: "enforcement", label: "FDA Enforcement", icon: <FileWarning className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-[#f7f8fa]">
      {/* Premium Header */}
      <header className="sticky top-0 z-50 glass border-b border-black/[0.06]">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Brand */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl dynacord-glow flex items-center justify-center">
                <FlaskConical className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-base font-extrabold text-gray-900 leading-tight tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  Exo Info
                </h1>
                <p className="text-[10px] text-gray-400 font-medium tracking-widest uppercase leading-tight">
                  Regulatory Intelligence
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center">
              <div className="flex items-center gap-0.5 bg-gray-100/80 rounded-xl p-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-all duration-200 whitespace-nowrap ${
                      activeTab === tab.id
                        ? "tab-active"
                        : "text-gray-500 hover:text-gray-700 hover:bg-white/50"
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </div>
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-200/60 rounded-full">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[11px] font-semibold text-emerald-700 tracking-wide">LIVE</span>
              </div>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-black/[0.06] bg-white/95 backdrop-blur-xl animate-fade-in">
            <div className="max-w-[1400px] mx-auto px-4 py-3">
              <div className="grid grid-cols-3 gap-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex flex-col items-center gap-1.5 px-3 py-3 rounded-xl text-[11px] font-medium transition-all ${
                      activeTab === tab.id
                        ? "bg-blue-50 text-blue-700 border border-blue-200/60"
                        : "text-gray-500 hover:bg-gray-50 border border-transparent"
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-[1400px] mx-auto px-4 md:px-6 py-6 md:py-8">
        {activeTab === "dashboard" && (
          <div className="space-y-6 md:space-y-8">
            <div className="animate-fade-in-up">
              <Statistics companies={filteredCompanies} />
            </div>
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="lg:w-64 shrink-0 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <FilterPanel />
              </div>
              <div className="flex-1 animate-fade-in" style={{ animationDelay: '0.15s' }}>
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
        {activeTab === "enforcement" && <FDAEnforcement />}
      </main>
    </div>
  );
}
