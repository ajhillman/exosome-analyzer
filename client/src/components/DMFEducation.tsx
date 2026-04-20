import { useState } from "react";
import {
  BookOpen,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  FileText,
  Info,
  Shield,
  CheckCircle2,
} from "lucide-react";
import {
  dmfDefinition,
  dmfSteps,
  ctdModules,
  dmfBenefits,
  feeReferences,
  bottomLine,
} from "@/data/dmf-education";

export function DMFEducation() {
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  const [showCTD, setShowCTD] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-2xl p-6 text-white">
        <div className="flex items-start gap-3">
          <FileText className="w-8 h-8 shrink-0 mt-1" />
          <div>
            <h2 className="text-2xl font-bold">{dmfDefinition.title}</h2>
            <p className="text-blue-100 mt-3 text-sm leading-relaxed">
              {dmfDefinition.plainDefinition}
            </p>
            <div className="mt-4 bg-white/10 rounded-xl p-4 border border-white/20">
              <p className="text-white font-semibold text-sm">
                {dmfDefinition.plainTerms}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Type II Explanation */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-start gap-3">
          <Info className="w-6 h-6 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              Type II DMF for hUCMSC-Exos / WJ-MSC Exosomes
            </h3>
            <p className="text-gray-600 text-sm mt-2 leading-relaxed">
              {dmfDefinition.typeIICovers}
            </p>
          </div>
        </div>
      </div>

      {/* Biologics Distinction */}
      <div className="bg-amber-50 rounded-2xl border border-amber-200 p-6">
        <div className="flex items-start gap-3">
          <Shield className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-lg font-bold text-amber-900">
              CBER vs. CDER: Biologics Distinction
            </h3>
            <p className="text-amber-800 text-sm mt-2 leading-relaxed">
              {dmfDefinition.biologicsDistinction}
            </p>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {dmfBenefits.map((benefit, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-3">
              <CheckCircle2 className="w-5 h-5 text-blue-600" />
            </div>
            <h4 className="font-bold text-gray-900 text-sm">{benefit.title}</h4>
            <p className="text-gray-500 text-xs mt-2 leading-relaxed">
              {benefit.description}
            </p>
          </div>
        ))}
      </div>

      {/* 7-Step Process */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-600" />
          7-Step DMF Filing Process
        </h3>
        <div className="space-y-2">
          {dmfSteps.map((step) => (
            <div
              key={step.number}
              className="border border-gray-100 rounded-xl overflow-hidden"
            >
              <button
                onClick={() =>
                  setExpandedStep(
                    expandedStep === step.number ? null : step.number
                  )
                }
                className="w-full flex items-center gap-3 p-4 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center text-sm font-bold shrink-0">
                  {step.number}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="font-semibold text-gray-900 text-sm">
                    {step.title}
                  </span>
                </div>
                {expandedStep === step.number ? (
                  <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
                )}
              </button>
              {expandedStep === step.number && (
                <div className="px-4 pb-4 border-t border-gray-100 pt-3">
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {step.description}
                  </p>
                  {step.details && (
                    <ul className="mt-3 space-y-1.5">
                      {step.details.map((d, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-xs text-gray-500"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0 mt-1.5" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* CTD Module 3 */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <button
          onClick={() => setShowCTD(!showCTD)}
          className="w-full flex items-center justify-between"
        >
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            CTD Module 3 Sections (Drug Substance)
          </h3>
          {showCTD ? (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronRight className="w-5 h-5 text-gray-400" />
          )}
        </button>
        {showCTD && (
          <div className="mt-4 space-y-2">
            {ctdModules.map((mod, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
              >
                <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded shrink-0">
                  {mod.section}
                </span>
                <span className="text-sm text-gray-700">{mod.content}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Fee and Reference Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Info className="w-5 h-5 text-blue-600" />
          Fees, Contacts, and References
        </h3>
        <div className="space-y-2">
          {feeReferences.map((ref, i) => (
            <div
              key={i}
              className="flex items-start justify-between gap-4 p-3 bg-gray-50 rounded-lg"
            >
              <span className="text-sm font-medium text-gray-700">
                {ref.item}
              </span>
              <span className="text-sm text-gray-500 text-right shrink-0">
                {ref.link ? (
                  <a
                    href={ref.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 inline-flex items-center gap-1"
                  >
                    {ref.detail.length > 60
                      ? ref.detail.slice(0, 57) + "..."
                      : ref.detail}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  ref.detail
                )}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Line */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl p-6 text-white">
        <h3 className="text-lg font-bold mb-3">The Bottom Line</h3>
        <p className="text-emerald-50 text-sm leading-relaxed">{bottomLine}</p>
      </div>
    </div>
  );
}
