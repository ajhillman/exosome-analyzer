import { ExosomeCompany } from "@/types";
import {
  AlertTriangle,
  Award,
  Building2,
  CheckCircle,
  FileText,
  Shield,
  TrendingUp,
} from "lucide-react";

interface StatisticsProps {
  companies: ExosomeCompany[];
}

export function Statistics({ companies }: StatisticsProps) {
  const totalCompanies = companies.length;
  const compliantCompanies = companies.filter(
    (c) => !c.hasWarningLetter && c.regulatoryScore >= 70
  ).length;
  const warningLetterCount = companies.filter((c) => c.hasWarningLetter).length;
  const averageRegulatoryScore =
    companies.length > 0
      ? Math.round(
          companies.reduce((sum, c) => sum + c.regulatoryScore, 0) / companies.length
        )
      : 0;
  const goldRated = companies.filter((c) => c.fda_compliance_rating === "Gold").length;
  const patentHolders = companies.filter((c) => c.patents && c.patents.length > 0).length;
  const cgmpCount = companies.filter((c) => c.manufacturing.includes("cGMP")).length;

  const metrics = [
    {
      label: "Total Companies",
      value: totalCompanies,
      icon: <Building2 className="w-5 h-5" />,
      color: "from-blue-500 to-blue-600",
      bgLight: "bg-blue-50",
      textColor: "text-blue-700",
      iconBg: "bg-blue-100",
    },
    {
      label: "Compliant",
      value: compliantCompanies,
      icon: <CheckCircle className="w-5 h-5" />,
      color: "from-emerald-500 to-emerald-600",
      bgLight: "bg-emerald-50",
      textColor: "text-emerald-700",
      iconBg: "bg-emerald-100",
    },
    {
      label: "FDA Warnings",
      value: warningLetterCount,
      icon: <AlertTriangle className="w-5 h-5" />,
      color: "from-red-500 to-red-600",
      bgLight: "bg-red-50",
      textColor: "text-red-700",
      iconBg: "bg-red-100",
    },
    {
      label: "Avg Score",
      value: averageRegulatoryScore,
      icon: <TrendingUp className="w-5 h-5" />,
      color: "from-violet-500 to-violet-600",
      bgLight: "bg-violet-50",
      textColor: "text-violet-700",
      iconBg: "bg-violet-100",
    },
    {
      label: "Gold Rated",
      value: goldRated,
      icon: <Award className="w-5 h-5" />,
      color: "from-amber-500 to-amber-600",
      bgLight: "bg-amber-50",
      textColor: "text-amber-700",
      iconBg: "bg-amber-100",
    },
    {
      label: "cGMP Verified",
      value: cgmpCount,
      icon: <Shield className="w-5 h-5" />,
      color: "from-teal-500 to-teal-600",
      bgLight: "bg-teal-50",
      textColor: "text-teal-700",
      iconBg: "bg-teal-100",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {metrics.map((m) => (
        <div
          key={m.label}
          className={`${m.bgLight} rounded-2xl p-4 border border-white/60 shadow-sm hover:shadow-md transition-shadow`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className={`${m.iconBg} ${m.textColor} p-2 rounded-xl`}>
              {m.icon}
            </div>
          </div>
          <div className={`text-3xl font-bold ${m.textColor} mb-1`}>{m.value}</div>
          <div className="text-xs text-gray-500 font-medium">{m.label}</div>
        </div>
      ))}
    </div>
  );
}
