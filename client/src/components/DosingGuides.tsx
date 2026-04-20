import { dosingGuides, DosingGuide } from "@/data/studies";
import {
  Activity,
  AlertCircle,
  Clock,
  Droplets,
  Heart,
  Syringe,
  Target,
  Wind,
} from "lucide-react";
import { useState } from "react";

const routeIcons: Record<string, React.ReactNode> = {
  "Intravenous (IV) Infusion": <Droplets className="w-5 h-5" />,
  "Nebulized / Inhaled": <Wind className="w-5 h-5" />,
  "Direct Injection (Intra-articular)": <Target className="w-5 h-5" />,
  "Direct Injection (Intrathecal)": <Activity className="w-5 h-5" />,
  "Direct Injection (Intradermal/Subcutaneous)": <Heart className="w-5 h-5" />,
  "Direct Injection (Intracavernosal)": <Syringe className="w-5 h-5" />,
  "Direct Injection (Intradiscal)": <Target className="w-5 h-5" />,
};

const routeColors: Record<string, { bg: string; border: string; text: string; accent: string }> = {
  "Intravenous (IV) Infusion": {
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-800",
    accent: "bg-blue-600",
  },
  "Nebulized / Inhaled": {
    bg: "bg-cyan-50",
    border: "border-cyan-200",
    text: "text-cyan-800",
    accent: "bg-cyan-600",
  },
  "Direct Injection (Intra-articular)": {
    bg: "bg-green-50",
    border: "border-green-200",
    text: "text-green-800",
    accent: "bg-green-600",
  },
  "Direct Injection (Intrathecal)": {
    bg: "bg-purple-50",
    border: "border-purple-200",
    text: "text-purple-800",
    accent: "bg-purple-600",
  },
  "Direct Injection (Intradermal/Subcutaneous)": {
    bg: "bg-pink-50",
    border: "border-pink-200",
    text: "text-pink-800",
    accent: "bg-pink-600",
  },
  "Direct Injection (Intracavernosal)": {
    bg: "bg-orange-50",
    border: "border-orange-200",
    text: "text-orange-800",
    accent: "bg-orange-600",
  },
  "Direct Injection (Intradiscal)": {
    bg: "bg-amber-50",
    border: "border-amber-200",
    text: "text-amber-800",
    accent: "bg-amber-600",
  },
};

function DosingCard({ guide }: { guide: DosingGuide }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const colors = routeColors[guide.route] || routeColors["Intravenous (IV) Infusion"];
  const icon = routeIcons[guide.route] || <Syringe className="w-5 h-5" />;

  return (
    <div
      className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all`}
    >
      {/* Header */}
      <div
        className={`${colors.accent} text-white p-4 cursor-pointer`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              {icon}
            </div>
            <div>
              <h3 className="font-bold text-base">{guide.route}</h3>
              <p className="text-white/80 text-xs mt-0.5 line-clamp-1">{guide.description.slice(0, 80)}...</p>
            </div>
          </div>
          <div className="text-white/60">
            {isExpanded ? "Click to collapse" : "Click to expand"}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={`p-5 space-y-4 ${isExpanded ? "" : "hidden"}`}>
        {/* Description */}
        <p className="text-sm text-gray-700 leading-relaxed">{guide.description}</p>

        {/* Dosing */}
        <div className={`${colors.bg} border ${colors.border} rounded-xl p-4`}>
          <div className="flex items-center gap-2 mb-2">
            <Syringe className={`w-4 h-4 ${colors.text}`} />
            <h4 className={`text-xs font-bold ${colors.text} uppercase tracking-wider`}>
              Typical Dose (Aggressive Protocol)
            </h4>
          </div>
          <p className={`text-sm ${colors.text} font-medium leading-relaxed`}>{guide.typicalDose}</p>
        </div>

        {/* Frequency */}
        <div className="bg-gray-50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-gray-600" />
            <h4 className="text-xs font-bold text-gray-600 uppercase tracking-wider">
              Frequency / Schedule
            </h4>
          </div>
          <p className="text-sm text-gray-800 leading-relaxed">{guide.frequency}</p>
        </div>

        {/* Indications */}
        <div>
          <h4 className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
            Indications
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {guide.indications.map((ind, i) => (
              <span
                key={i}
                className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium ${colors.bg} ${colors.text} border ${colors.border}`}
              >
                {ind}
              </span>
            ))}
          </div>
        </div>

        {/* Clinical Notes */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
            <div>
              <h4 className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">
                Clinical Notes
              </h4>
              <p className="text-sm text-amber-900 leading-relaxed">{guide.notes}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Collapsed Preview */}
      {!isExpanded && (
        <div className="p-4 space-y-3">
          <p className="text-sm text-gray-600 line-clamp-2">{guide.description}</p>
          <div className="flex flex-wrap gap-1.5">
            {guide.indications.slice(0, 4).map((ind, i) => (
              <span
                key={i}
                className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-medium bg-gray-50 text-gray-600 border border-gray-200"
              >
                {ind}
              </span>
            ))}
            {guide.indications.length > 4 && (
              <span className="text-[10px] text-gray-400">+{guide.indications.length - 4} more</span>
            )}
          </div>
          <button
            onClick={() => setIsExpanded(true)}
            className={`text-sm font-medium ${colors.text} hover:underline`}
          >
            View full dosing protocol
          </button>
        </div>
      )}
    </div>
  );
}

export function DosingGuides() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Syringe className="w-5 h-5 text-blue-600" />
          hUCMSC-Exos / WJ-MSC Dosing Protocols
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Aggressive dosing guidelines for hUCMSC-Exos (Wharton's Jelly mesenchymal stem cell-derived exosomes) across {dosingGuides.length} delivery routes. Based on published human clinical data.
        </p>
        <div className="mt-3 bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
          <p className="text-xs text-amber-800">
            These protocols are compiled from peer-reviewed clinical studies for educational reference. All dosing decisions should be made by qualified physicians based on individual patient assessment. Aggressive protocols represent the upper range of published dosing data.
          </p>
        </div>
      </div>

      {/* Route Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {dosingGuides.map((guide) => {
          const colors = routeColors[guide.route] || routeColors["Intravenous (IV) Infusion"];
          const icon = routeIcons[guide.route] || <Syringe className="w-5 h-5" />;
          return (
            <div key={guide.route} className={`${colors.bg} border ${colors.border} rounded-xl p-3 flex items-center gap-3`}>
              <div className={`${colors.accent} text-white p-2 rounded-lg`}>{icon}</div>
              <div>
                <p className={`text-sm font-bold ${colors.text}`}>{guide.route}</p>
                <p className="text-xs text-gray-500">{guide.indications.length} indications</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Full Protocol Cards */}
      <div className="space-y-4">
        {dosingGuides.map((guide) => (
          <DosingCard key={guide.route} guide={guide} />
        ))}
      </div>
    </div>
  );
}
