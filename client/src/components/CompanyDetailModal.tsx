import { ComplianceBadge } from "@/components/ComplianceBadge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ExosomeCompany } from "@/types";
import { X } from "lucide-react";

interface CompanyDetailModalProps {
  company: ExosomeCompany;
  onClose: () => void;
}

export function CompanyDetailModal({ company, onClose }: CompanyDetailModalProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{company.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-2">Regulatory Score</h3>
            <div className="flex items-center gap-4">
              <div className="text-4xl font-bold text-primary">{company.regulatoryScore}</div>
              <div className="flex-1 bg-secondary rounded-full h-2 overflow-hidden">
                <div
                  className="bg-primary h-full transition-all"
                  style={{ width: `${company.regulatoryScore}%` }}
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-3">Regulatory Status</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Section Classification</p>
                {company.section.includes("351(a)") ? (
                  <ComplianceBadge type="351a" label={company.section} size="md" />
                ) : (
                  <ComplianceBadge type="361" label={company.section} size="md" />
                )}
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Manufacturing Standard</p>
                {company.manufacturing.includes("cGMP") ? (
                  <ComplianceBadge type="cgmp" label="cGMP" size="md" />
                ) : (
                  <ComplianceBadge type="gmp" label="GMP" size="md" />
                )}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-3">FDA Status</h3>
            {company.hasWarningLetter ? (
              <ComplianceBadge type="warning" label={company.fda_status} size="md" />
            ) : (
              <ComplianceBadge type="no-warning" label={company.fda_status} size="md" />
            )}
          </div>

          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-3">Quality & Documentation</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Certificate of Analysis</p>
                {company.coa.includes("Yes") ? (
                  <ComplianceBadge type="cgmp" label={company.coa} size="md" />
                ) : (
                  <ComplianceBadge type="gmp" label={company.coa} size="md" />
                )}
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">DMF/IND Status</p>
                {company.dmf.includes("Yes") || company.dmf.includes("IND") ? (
                  <ComplianceBadge type="dmf" label={company.dmf} size="md" />
                ) : (
                  <ComplianceBadge type="gmp" label={company.dmf} size="md" />
                )}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-2">Exosome Source</h3>
            <p className="text-base text-foreground bg-secondary p-3 rounded-lg">{company.source}</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-2">Notes</h3>
            <p className="text-base text-foreground bg-secondary p-3 rounded-lg leading-relaxed">{company.notes}</p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
