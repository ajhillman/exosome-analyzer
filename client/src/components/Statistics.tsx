import { ExosomeCompany } from "@/types";
import {
  AlertTriangle,
  Award,
  Building2,
  CheckCircle,
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
  const cgmpCount = companies.filter((c) => c.manufacturing.includes("cGMP")).length;

  const metrics = [
    {
      label: "Total Companies",
      value: totalCompanies,
      icon: <Building2 className="w-[18px] h-[18px]" />,
      accentColor: "#0f62fe",
      bgTint: "rgba(15, 98, 254, 0.06)",
      iconBg: "rgba(15, 98, 254, 0.1)",
    },
    {
      label: "Compliant",
      value: compliantCompanies,
      icon: <CheckCircle className="w-[18px] h-[18px]" />,
      accentColor: "#198038",
      bgTint: "rgba(25, 128, 56, 0.06)",
      iconBg: "rgba(25, 128, 56, 0.1)",
    },
    {
      label: "FDA Warnings",
      value: warningLetterCount,
      icon: <AlertTriangle className="w-[18px] h-[18px]" />,
      accentColor: "#da1e28",
      bgTint: "rgba(218, 30, 40, 0.06)",
      iconBg: "rgba(218, 30, 40, 0.1)",
    },
    {
      label: "Avg Score",
      value: averageRegulatoryScore,
      icon: <TrendingUp className="w-[18px] h-[18px]" />,
      accentColor: "#6929c4",
      bgTint: "rgba(105, 41, 196, 0.06)",
      iconBg: "rgba(105, 41, 196, 0.1)",
    },
    {
      label: "Gold Rated",
      value: goldRated,
      icon: <Award className="w-[18px] h-[18px]" />,
      accentColor: "#b28600",
      bgTint: "rgba(178, 134, 0, 0.06)",
      iconBg: "rgba(178, 134, 0, 0.1)",
    },
    {
      label: "cGMP Verified",
      value: cgmpCount,
      icon: <Shield className="w-[18px] h-[18px]" />,
      accentColor: "#009d9a",
      bgTint: "rgba(0, 157, 154, 0.06)",
      iconBg: "rgba(0, 157, 154, 0.1)",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 stagger-children">
      {metrics.map((m) => (
        <div
          key={m.label}
          className="metric-card"
          style={{ '--accent': m.accentColor } as React.CSSProperties}
        >
          <div
            className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl"
            style={{ background: m.accentColor }}
          />
          <div className="flex items-center justify-between mb-4">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: m.iconBg, color: m.accentColor }}
            >
              {m.icon}
            </div>
          </div>
          <div
            className="text-3xl font-extrabold mb-1 tracking-tight"
            style={{ color: m.accentColor, fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            {m.value}
          </div>
          <div className="text-[11px] text-gray-400 font-medium tracking-wide uppercase">
            {m.label}
          </div>
        </div>
      ))}
    </div>
  );
}
