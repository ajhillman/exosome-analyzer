import { ComplianceBadge } from "@/components/ComplianceBadge";
import { Button } from "@/components/ui/button";
import { ExosomeCompany } from "@/types";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { CompanyDetailModal } from "./CompanyDetailModal";

interface CompanyTableProps {
  companies: ExosomeCompany[];
}

export function CompanyTable({ companies }: CompanyTableProps) {
  const [selectedCompany, setSelectedCompany] = useState<ExosomeCompany | null>(null);

  const getRegulatoryScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 dark:text-green-400";
    if (score >= 60) return "text-yellow-600 dark:text-yellow-400";
    if (score >= 40) return "text-orange-600 dark:text-orange-400";
    return "text-red-600 dark:text-red-400";
  };

  return (
    <>
      <div className="flex-1 overflow-auto">
        <div className="space-y-3 p-6">
          {companies.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No companies match your filters.</p>
              <p className="text-muted-foreground text-sm mt-2">Try adjusting your search criteria.</p>
            </div>
          ) : (
            companies.map((company) => (
              <div
                key={company.id}
                className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-foreground">{company.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{company.source}</p>
                  </div>
                  <div className={`text-2xl font-bold ${getRegulatoryScoreColor(company.regulatoryScore)}`}>
                    {company.regulatoryScore}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="flex flex-wrap gap-2">
                    {company.section.includes("351(a)") ? (
                      <ComplianceBadge type="351a" label={company.section} size="sm" />
                    ) : (
                      <ComplianceBadge type="361" label={company.section} size="sm" />
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {company.manufacturing.includes("cGMP") ? (
                      <ComplianceBadge type="cgmp" label="cGMP" size="sm" />
                    ) : (
                      <ComplianceBadge type="gmp" label="GMP" size="sm" />
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="flex flex-wrap gap-2">
                    {company.hasWarningLetter ? (
                      <ComplianceBadge type="warning" label="FDA Warning Letter" size="sm" />
                    ) : (
                      <ComplianceBadge type="no-warning" label="No Warning Letters" size="sm" />
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {company.coa.includes("Yes") ? (
                      <ComplianceBadge type="cgmp" label="COA Available" size="sm" />
                    ) : (
                      <ComplianceBadge type="gmp" label="No COA" size="sm" />
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="flex flex-wrap gap-2">
                    {company.dmf.includes("Yes") || company.dmf.includes("IND") ? (
                      <ComplianceBadge type="dmf" label={company.dmf} size="sm" />
                    ) : (
                      <ComplianceBadge type="gmp" label="No DMF/IND" size="sm" />
                    )}
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedCompany(company)}
                  className="w-full justify-between text-primary hover:bg-primary/10"
                >
                  View Details
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            ))
          )}
        </div>
      </div>

      {selectedCompany && (
        <CompanyDetailModal
          company={selectedCompany}
          onClose={() => setSelectedCompany(null)}
        />
      )}
    </>
  );
}
