import { AlertTriangle, CheckCircle, Clock } from "lucide-react";

interface ComplianceBadgeProps {
  type: "351a" | "351a-inv" | "361" | "cgmp" | "gmp" | "warning" | "no-warning" | "dmf" | "ind";
  label: string;
  size?: "sm" | "md" | "lg";
}

export function ComplianceBadge({ type, label, size = "md" }: ComplianceBadgeProps) {
  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base",
  };

  const typeClasses = {
    "351a": "bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100 border border-blue-300 dark:border-blue-700",
    "351a-inv": "bg-yellow-100 text-yellow-900 dark:bg-yellow-900 dark:text-yellow-100 border border-yellow-400 dark:border-yellow-600",
    "361": "bg-amber-100 text-amber-900 dark:bg-amber-900 dark:text-amber-100 border border-amber-300 dark:border-amber-700",
    cgmp: "bg-green-100 text-green-900 dark:bg-green-900 dark:text-green-100 border border-green-300 dark:border-green-700",
    gmp: "bg-yellow-100 text-yellow-900 dark:bg-yellow-900 dark:text-yellow-100 border border-yellow-300 dark:border-yellow-700",
    warning: "bg-red-100 text-red-900 dark:bg-red-900 dark:text-red-100 border border-red-300 dark:border-red-700",
    "no-warning": "bg-green-100 text-green-900 dark:bg-green-900 dark:text-green-100 border border-green-300 dark:border-green-700",
    dmf: "bg-purple-100 text-purple-900 dark:bg-purple-900 dark:text-purple-100 border border-purple-300 dark:border-purple-700",
    ind: "bg-indigo-100 text-indigo-900 dark:bg-indigo-900 dark:text-indigo-100 border border-indigo-300 dark:border-indigo-700",
  };

  const getIcon = () => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="w-4 h-4" />;
      case "no-warning":
      case "351a":
      case "cgmp":
      case "dmf":
      case "ind":
        return <CheckCircle className="w-4 h-4" />;
      case "351a-inv":
      case "361":
      case "gmp":
        return <Clock className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className={`inline-flex items-center gap-2 rounded-full font-medium ${sizeClasses[size]} ${typeClasses[type]}`}>
      {getIcon()}
      <span>{label}</span>
    </div>
  );
}
