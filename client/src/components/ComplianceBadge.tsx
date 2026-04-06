import { AlertTriangle, CheckCircle, Clock, Shield, FileText } from "lucide-react";

interface ComplianceBadgeProps {
  type: "351a" | "351a-inv" | "361" | "cgmp" | "gmp" | "warning" | "no-warning" | "dmf" | "ind";
  label: string;
  size?: "sm" | "md" | "lg";
}

export function ComplianceBadge({ type, label, size = "md" }: ComplianceBadgeProps) {
  const sizeClasses = {
    sm: "px-2 py-0.5 text-[10px] gap-1",
    md: "px-2.5 py-1 text-[11px] gap-1.5",
    lg: "px-3 py-1.5 text-xs gap-1.5",
  };

  const iconSize = size === "sm" ? "w-2.5 h-2.5" : size === "md" ? "w-3 h-3" : "w-3.5 h-3.5";

  const typeStyles: Record<string, { bg: string; color: string; border: string; icon: React.ReactNode }> = {
    "351a": {
      bg: "linear-gradient(135deg, rgba(15, 98, 254, 0.08) 0%, rgba(15, 98, 254, 0.04) 100%)",
      color: "#0f62fe",
      border: "rgba(15, 98, 254, 0.2)",
      icon: <Shield className={iconSize} />,
    },
    "351a-inv": {
      bg: "linear-gradient(135deg, rgba(178, 134, 0, 0.08) 0%, rgba(178, 134, 0, 0.04) 100%)",
      color: "#b28600",
      border: "rgba(178, 134, 0, 0.2)",
      icon: <Clock className={iconSize} />,
    },
    "361": {
      bg: "linear-gradient(135deg, rgba(178, 134, 0, 0.06) 0%, rgba(178, 134, 0, 0.03) 100%)",
      color: "#92400e",
      border: "rgba(146, 64, 14, 0.15)",
      icon: <AlertTriangle className={iconSize} />,
    },
    cgmp: {
      bg: "linear-gradient(135deg, rgba(25, 128, 56, 0.08) 0%, rgba(25, 128, 56, 0.04) 100%)",
      color: "#198038",
      border: "rgba(25, 128, 56, 0.2)",
      icon: <CheckCircle className={iconSize} />,
    },
    gmp: {
      bg: "linear-gradient(135deg, rgba(178, 134, 0, 0.06) 0%, rgba(178, 134, 0, 0.03) 100%)",
      color: "#854d0e",
      border: "rgba(133, 77, 14, 0.15)",
      icon: <AlertTriangle className={iconSize} />,
    },
    warning: {
      bg: "linear-gradient(135deg, rgba(218, 30, 40, 0.08) 0%, rgba(218, 30, 40, 0.04) 100%)",
      color: "#da1e28",
      border: "rgba(218, 30, 40, 0.2)",
      icon: <AlertTriangle className={iconSize} />,
    },
    "no-warning": {
      bg: "linear-gradient(135deg, rgba(25, 128, 56, 0.08) 0%, rgba(25, 128, 56, 0.04) 100%)",
      color: "#198038",
      border: "rgba(25, 128, 56, 0.2)",
      icon: <CheckCircle className={iconSize} />,
    },
    dmf: {
      bg: "linear-gradient(135deg, rgba(105, 41, 196, 0.08) 0%, rgba(105, 41, 196, 0.04) 100%)",
      color: "#6929c4",
      border: "rgba(105, 41, 196, 0.2)",
      icon: <FileText className={iconSize} />,
    },
    ind: {
      bg: "linear-gradient(135deg, rgba(15, 98, 254, 0.06) 0%, rgba(15, 98, 254, 0.03) 100%)",
      color: "#0f62fe",
      border: "rgba(15, 98, 254, 0.15)",
      icon: <FileText className={iconSize} />,
    },
  };

  const style = typeStyles[type] || typeStyles["361"];

  return (
    <span
      className={`inline-flex items-center rounded-lg font-semibold ${sizeClasses[size]}`}
      style={{
        background: style.bg,
        color: style.color,
        border: `1px solid ${style.border}`,
        letterSpacing: '0.02em',
      }}
    >
      {style.icon}
      {label}
    </span>
  );
}
