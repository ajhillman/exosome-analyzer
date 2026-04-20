import { stateRegulations, type StateRegulation } from "@/data/regulatory";
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Search,
  MapPin,
  FileText,
  ExternalLink,
  ChevronDown,
  Shield,
  Scale,
} from "lucide-react";
import { useState, useMemo } from "react";

type CheckStatus = "yes" | "no" | "partial" | "varies";

interface StateChecklistItem {
  state: string;
  abbreviation: string;
  rttLaw: CheckStatus;
  regenMedStatute: CheckStatus;
  informedConsentRequired: CheckStatus;
  practiceOfMedicine: CheckStatus;
  boardOversight: CheckStatus;
  exosomesAddressed: CheckStatus;
  notes: string;
  keyStatute?: string;
  statuteUrl?: string;
}

const stateChecklistData: StateChecklistItem[] = [
  { state: "Alabama", abbreviation: "AL", rttLaw: "yes", regenMedStatute: "no", informedConsentRequired: "yes", practiceOfMedicine: "yes", boardOversight: "yes", exosomesAddressed: "no", notes: "RTT Act (SB 258, 2017). No specific regenerative medicine statute. Practice of medicine doctrine applies.", keyStatute: "Ala. Code 22-8E-1", statuteUrl: "https://law.justia.com/codes/alabama/title-22/chapter-8e/" },
  { state: "Alaska", abbreviation: "AK", rttLaw: "no", regenMedStatute: "no", informedConsentRequired: "yes", practiceOfMedicine: "yes", boardOversight: "yes", exosomesAddressed: "no", notes: "No RTT law. No specific regenerative medicine statute. Standard medical practice rules apply." },
  { state: "Arizona", abbreviation: "AZ", rttLaw: "yes", regenMedStatute: "yes", informedConsentRequired: "yes", practiceOfMedicine: "yes", boardOversight: "yes", exosomesAddressed: "partial", notes: "RTT Act (HB 2382, 2014, first state). SB 1399 (2022) allows stem cell therapy under informed consent. Broad practice of medicine protections.", keyStatute: "A.R.S. 36-3604", statuteUrl: "https://www.azleg.gov/ars/36/03604.htm" },
  { state: "Arkansas", abbreviation: "AR", rttLaw: "yes", regenMedStatute: "no", informedConsentRequired: "yes", practiceOfMedicine: "yes", boardOversight: "yes", exosomesAddressed: "no", notes: "RTT Act (SB 3, 2015). No specific regenerative medicine statute.", keyStatute: "Ark. Code 20-15-2501" },
  { state: "California", abbreviation: "CA", rttLaw: "yes", regenMedStatute: "partial", informedConsentRequired: "yes", practiceOfMedicine: "yes", boardOversight: "yes", exosomesAddressed: "partial", notes: "RTT Act (AB 1668, 2016). SB 512 (2017) requires informed consent for stem cell treatments. Active enforcement against unlicensed clinics.", keyStatute: "Cal. Health & Safety Code 111655", statuteUrl: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?sectionNum=111655.&lawCode=HSC" },
  { state: "Colorado", abbreviation: "CO", rttLaw: "yes", regenMedStatute: "no", informedConsentRequired: "yes", practiceOfMedicine: "yes", boardOversight: "yes", exosomesAddressed: "no", notes: "RTT Act (HB 1281, 2014). Practice of medicine doctrine applies.", keyStatute: "C.R.S. 25-45-101" },
  { state: "Connecticut", abbreviation: "CT", rttLaw: "yes", regenMedStatute: "no", informedConsentRequired: "yes", practiceOfMedicine: "yes", boardOversight: "yes", exosomesAddressed: "no", notes: "RTT Act (SB 380, 2016). Standard medical practice rules." },
  { state: "Delaware", abbreviation: "DE", rttLaw: "no", regenMedStatute: "no", informedConsentRequired: "yes", practiceOfMedicine: "yes", boardOversight: "yes", exosomesAddressed: "no", notes: "No RTT law. No specific regenerative medicine statute." },
  { state: "Florida", abbreviation: "FL", rttLaw: "yes", regenMedStatute: "yes", informedConsentRequired: "yes", practiceOfMedicine: "yes", boardOversight: "yes", exosomesAddressed: "partial", notes: "RTT Act (HB 21, 2016). HB 1549 (2019) expanded stem cell therapy protections. Active regenerative medicine market.", keyStatute: "Fla. Stat. 456.41", statuteUrl: "http://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0400-0499/0456/Sections/0456.41.html" },
  { state: "Georgia", abbreviation: "GA", rttLaw: "yes", regenMedStatute: "no", informedConsentRequired: "yes", practiceOfMedicine: "yes", boardOversight: "yes", exosomesAddressed: "no", notes: "RTT Act (SB 1, 2016). Practice of medicine doctrine applies.", keyStatute: "O.C.G.A. 31-51-1" },
  { state: "Hawaii", abbreviation: "HI", rttLaw: "no", regenMedStatute: "no", informedConsentRequired: "yes", practiceOfMedicine: "yes", boardOversight: "yes", exosomesAddressed: "no", notes: "No RTT law. No specific regenerative medicine statute." },
  { state: "Idaho", abbreviation: "ID", rttLaw: "yes", regenMedStatute: "no", informedConsentRequired: "yes", practiceOfMedicine: "yes", boardOversight: "yes", exosomesAddressed: "no", notes: "RTT Act (HB 4, 2015). Standard medical practice rules.", keyStatute: "Idaho Code 39-9503" },
  { state: "Illinois", abbreviation: "IL", rttLaw: "yes", regenMedStatute: "no", informedConsentRequired: "yes", practiceOfMedicine: "yes", boardOversight: "yes", exosomesAddressed: "no", notes: "RTT Act (SB 1561, 2017). No specific regenerative medicine statute.", keyStatute: "410 ILCS 56/1" },
  { state: "Indiana", abbreviation: "IN", rttLaw: "yes", regenMedStatute: "no", informedConsentRequired: "yes", practiceOfMedicine: "yes", boardOversight: "yes", exosomesAddressed: "no", notes: "RTT Act (HB 1065, 2015). Standard medical practice rules.", keyStatute: "IC 16-42-26" },
  { state: "Iowa", abbreviation: "IA", rttLaw: "yes", regenMedStatute: "no", informedConsentRequired: "yes", practiceOfMedicine: "yes", boardOversight: "yes", exosomesAddressed: "no", notes: "RTT Act (SF 484, 2018). No specific regenerative medicine statute." },
  { state: "Kansas", abbreviation: "KS", rttLaw: "yes", regenMedStatute: "no", informedConsentRequired: "yes", practiceOfMedicine: "yes", boardOversight: "yes", exosomesAddressed: "no", notes: "RTT Act (SB 150, 2017). Standard medical practice rules." },
  { state: "Kentucky", abbreviation: "KY", rttLaw: "yes", regenMedStatute: "no", informedConsentRequired: "yes", practiceOfMedicine: "yes", boardOversight: "yes", exosomesAddressed: "no", notes: "RTT Act (HB 3, 2017). No specific regenerative medicine statute." },
  { state: "Louisiana", abbreviation: "LA", rttLaw: "yes", regenMedStatute: "no", informedConsentRequired: "yes", practiceOfMedicine: "yes", boardOversight: "yes", exosomesAddressed: "no", notes: "RTT Act (HB 808, 2014). Practice of medicine doctrine applies.", keyStatute: "La. R.S. 40:1300.381" },
  { state: "Maine", abbreviation: "ME", rttLaw: "yes", regenMedStatute: "no", informedConsentRequired: "yes", practiceOfMedicine: "yes", boardOversight: "yes", exosomesAddressed: "no", notes: "RTT Act (LD 1507, 2017). Standard medical practice rules." },
  { state: "Maryland", abbreviation: "MD", rttLaw: "no", regenMedStatute: "no", informedConsentRequired: "yes", practiceOfMedicine: "yes", boardOversight: "yes", exosomesAddressed: "no", notes: "No RTT law. No specific regenerative medicine statute." },
  { state: "Massachusetts", abbreviation: "MA", rttLaw: "no", regenMedStatute: "no", informedConsentRequired: "yes", practiceOfMedicine: "yes", boardOversight: "yes", exosomesAddressed: "no", notes: "No RTT law. No specific regenerative medicine statute. Active enforcement environment." },
  { state: "Michigan", abbreviation: "MI", rttLaw: "yes", regenMedStatute: "no", informedConsentRequired: "yes", practiceOfMedicine: "yes", boardOversight: "yes", exosomesAddressed: "no", notes: "RTT Act (SB 991, 2014). No specific regenerative medicine statute.", keyStatute: "MCL 333.26451" },
  { state: "Minnesota", abbreviation: "MN", rttLaw: "yes", regenMedStatute: "no", informedConsentRequired: "yes", practiceOfMedicine: "yes", boardOversight: "yes", exosomesAddressed: "no", notes: "RTT Act (SF 1, 2015). Standard medical practice rules." },
  { state: "Mississippi", abbreviation: "MS", rttLaw: "yes", regenMedStatute: "no", informedConsentRequired: "yes", practiceOfMedicine: "yes", boardOversight: "yes", exosomesAddressed: "no", notes: "RTT Act (HB 1104, 2016). Practice of medicine doctrine applies." },
  { state: "Missouri", abbreviation: "MO", rttLaw: "yes", regenMedStatute: "no", informedConsentRequired: "yes", practiceOfMedicine: "yes", boardOversight: "yes", exosomesAddressed: "no", notes: "RTT Act (SB 199, 2014). No specific regenerative medicine statute.", keyStatute: "Mo. Rev. Stat. 191.480" },
  { state: "Montana", abbreviation: "MT", rttLaw: "yes", regenMedStatute: "no", informedConsentRequired: "yes", practiceOfMedicine: "yes", boardOversight: "yes", exosomesAddressed: "no", notes: "RTT Act (SB 201, 2015). Standard medical practice rules." },
  { state: "Nebraska", abbreviation: "NE", rttLaw: "yes", regenMedStatute: "no", informedConsentRequired: "yes", practiceOfMedicine: "yes", boardOversight: "yes", exosomesAddressed: "no", notes: "RTT Act (LB 1006, 2018). Notable: 2019 exosome adverse events at Nebraska clinic prompted FDA safety notification." },
  { state: "Nevada", abbreviation: "NV", rttLaw: "yes", regenMedStatute: "yes", informedConsentRequired: "yes", practiceOfMedicine: "yes", boardOversight: "yes", exosomesAddressed: "partial", notes: "RTT Act (AB 164, 2015). SB 287 (2019) created regenerative medicine framework. Active market.", keyStatute: "NRS 629A.010", statuteUrl: "https://www.leg.state.nv.us/nrs/nrs-629a.html" },
  { state: "New Hampshire", abbreviation: "NH", rttLaw: "yes", regenMedStatute: "no", informedConsentRequired: "yes", practiceOfMedicine: "yes", boardOversight: "yes", exosomesAddressed: "no", notes: "RTT Act (SB 219, 2017). Standard medical practice rules." },
  { state: "New Jersey", abbreviation: "NJ", rttLaw: "no", regenMedStatute: "no", informedConsentRequired: "yes", practiceOfMedicine: "yes", boardOversight: "yes", exosomesAddressed: "no", notes: "No RTT law. No specific regenerative medicine statute." },
  { state: "New Mexico", abbreviation: "NM", rttLaw: "no", regenMedStatute: "no", informedConsentRequired: "yes", practiceOfMedicine: "yes", boardOversight: "yes", exosomesAddressed: "no", notes: "No RTT law. No specific regenerative medicine statute." },
  { state: "New York", abbreviation: "NY", rttLaw: "no", regenMedStatute: "no", informedConsentRequired: "yes", practiceOfMedicine: "yes", boardOversight: "yes", exosomesAddressed: "no", notes: "No RTT law. No specific regenerative medicine statute. Active enforcement environment." },
  { state: "North Carolina", abbreviation: "NC", rttLaw: "yes", regenMedStatute: "no", informedConsentRequired: "yes", practiceOfMedicine: "yes", boardOversight: "yes", exosomesAddressed: "no", notes: "RTT Act (HB 401, 2017). Practice of medicine doctrine applies." },
  { state: "North Dakota", abbreviation: "ND", rttLaw: "yes", regenMedStatute: "no", informedConsentRequired: "yes", practiceOfMedicine: "yes", boardOversight: "yes", exosomesAddressed: "no", notes: "RTT Act (HB 1306, 2015). Standard medical practice rules." },
  { state: "Ohio", abbreviation: "OH", rttLaw: "yes", regenMedStatute: "no", informedConsentRequired: "yes", practiceOfMedicine: "yes", boardOversight: "yes", exosomesAddressed: "no", notes: "RTT Act (HB 504, 2018). No specific regenerative medicine statute." },
  { state: "Oklahoma", abbreviation: "OK", rttLaw: "yes", regenMedStatute: "yes", informedConsentRequired: "yes", practiceOfMedicine: "yes", boardOversight: "yes", exosomesAddressed: "partial", notes: "RTT Act (SB 1165, 2015). HB 2791 (2020) created regenerative medicine framework with informed consent requirements.", keyStatute: "63 O.S. 2-313.1" },
  { state: "Oregon", abbreviation: "OR", rttLaw: "yes", regenMedStatute: "no", informedConsentRequired: "yes", practiceOfMedicine: "yes", boardOversight: "yes", exosomesAddressed: "no", notes: "RTT Act (SB 1045, 2017). Standard medical practice rules." },
  { state: "Pennsylvania", abbreviation: "PA", rttLaw: "yes", regenMedStatute: "no", informedConsentRequired: "yes", practiceOfMedicine: "yes", boardOversight: "yes", exosomesAddressed: "no", notes: "RTT Act (SB 1052, 2018). No specific regenerative medicine statute." },
  { state: "Rhode Island", abbreviation: "RI", rttLaw: "no", regenMedStatute: "no", informedConsentRequired: "yes", practiceOfMedicine: "yes", boardOversight: "yes", exosomesAddressed: "no", notes: "No RTT law. No specific regenerative medicine statute." },
  { state: "South Carolina", abbreviation: "SC", rttLaw: "yes", regenMedStatute: "no", informedConsentRequired: "yes", practiceOfMedicine: "yes", boardOversight: "yes", exosomesAddressed: "no", notes: "RTT Act (SB 311, 2016). Practice of medicine doctrine applies." },
  { state: "South Dakota", abbreviation: "SD", rttLaw: "yes", regenMedStatute: "no", informedConsentRequired: "yes", practiceOfMedicine: "yes", boardOversight: "yes", exosomesAddressed: "no", notes: "RTT Act (HB 1114, 2016). Standard medical practice rules." },
  { state: "Tennessee", abbreviation: "TN", rttLaw: "yes", regenMedStatute: "no", informedConsentRequired: "yes", practiceOfMedicine: "yes", boardOversight: "yes", exosomesAddressed: "no", notes: "RTT Act (SB 280, 2015). No specific regenerative medicine statute.", keyStatute: "Tenn. Code 63-1-167" },
  { state: "Texas", abbreviation: "TX", rttLaw: "yes", regenMedStatute: "yes", informedConsentRequired: "yes", practiceOfMedicine: "yes", boardOversight: "yes", exosomesAddressed: "partial", notes: "RTT Act (SB 439, 2017). HB 810 (Charlie's Law, 2017) created adult stem cell framework. SB 1050 (2019) expanded. Strong practice of medicine protections.", keyStatute: "Tex. Health & Safety Code 1002.001", statuteUrl: "https://statutes.capitol.texas.gov/Docs/HS/htm/HS.1002.htm" },
  { state: "Utah", abbreviation: "UT", rttLaw: "yes", regenMedStatute: "yes", informedConsentRequired: "yes", practiceOfMedicine: "yes", boardOversight: "yes", exosomesAddressed: "partial", notes: "RTT Act (HB 94, 2015). HB 227 (2020) created regenerative medicine framework.", keyStatute: "Utah Code 26-62-101" },
  { state: "Vermont", abbreviation: "VT", rttLaw: "no", regenMedStatute: "no", informedConsentRequired: "yes", practiceOfMedicine: "yes", boardOversight: "yes", exosomesAddressed: "no", notes: "No RTT law. No specific regenerative medicine statute." },
  { state: "Virginia", abbreviation: "VA", rttLaw: "yes", regenMedStatute: "no", informedConsentRequired: "yes", practiceOfMedicine: "yes", boardOversight: "yes", exosomesAddressed: "no", notes: "RTT Act (HB 1612, 2017). Standard medical practice rules." },
  { state: "Washington", abbreviation: "WA", rttLaw: "no", regenMedStatute: "no", informedConsentRequired: "yes", practiceOfMedicine: "yes", boardOversight: "yes", exosomesAddressed: "no", notes: "No RTT law. No specific regenerative medicine statute." },
  { state: "West Virginia", abbreviation: "WV", rttLaw: "yes", regenMedStatute: "no", informedConsentRequired: "yes", practiceOfMedicine: "yes", boardOversight: "yes", exosomesAddressed: "no", notes: "RTT Act (SB 20, 2015). Practice of medicine doctrine applies." },
  { state: "Wisconsin", abbreviation: "WI", rttLaw: "yes", regenMedStatute: "no", informedConsentRequired: "yes", practiceOfMedicine: "yes", boardOversight: "yes", exosomesAddressed: "no", notes: "RTT Act (AB 414, 2017). Standard medical practice rules." },
  { state: "Wyoming", abbreviation: "WY", rttLaw: "yes", regenMedStatute: "no", informedConsentRequired: "yes", practiceOfMedicine: "yes", boardOversight: "yes", exosomesAddressed: "no", notes: "RTT Act (HB 186, 2015). No specific regenerative medicine statute." },
];

function StatusIcon({ status }: { status: CheckStatus }) {
  switch (status) {
    case "yes":
      return <CheckCircle className="w-4 h-4 text-[#198038]" />;
    case "no":
      return <XCircle className="w-4 h-4 text-[#da1e28]" />;
    case "partial":
      return <AlertTriangle className="w-4 h-4 text-[#b28600]" />;
    case "varies":
      return <AlertTriangle className="w-4 h-4 text-[#6929c4]" />;
  }
}

function StatusLabel({ status }: { status: CheckStatus }) {
  const styles: Record<CheckStatus, string> = {
    yes: "bg-emerald-50 text-emerald-700 border-emerald-200",
    no: "bg-red-50 text-red-700 border-red-200",
    partial: "bg-amber-50 text-amber-700 border-amber-200",
    varies: "bg-purple-50 text-purple-700 border-purple-200",
  };
  const labels: Record<CheckStatus, string> = {
    yes: "Yes",
    no: "No",
    partial: "Partial",
    varies: "Varies",
  };
  return (
    <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded border ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}

function StateRow({ item, expanded, onToggle }: { item: StateChecklistItem; expanded: boolean; onToggle: () => void }) {
  const checks = [
    { label: "RTT Law", value: item.rttLaw },
    { label: "Regen Med Statute", value: item.regenMedStatute },
    { label: "Informed Consent Req.", value: item.informedConsentRequired },
    { label: "Practice of Medicine", value: item.practiceOfMedicine },
    { label: "Board Oversight", value: item.boardOversight },
    { label: "Exosomes Addressed", value: item.exosomesAddressed },
  ];

  const yesCount = checks.filter(c => c.value === "yes").length;
  const partialCount = checks.filter(c => c.value === "partial").length;

  return (
    <div className="card-premium overflow-hidden">
      <div
        className="p-3 md:p-4 cursor-pointer hover:bg-gray-50/30 transition-colors"
        onClick={onToggle}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
            <span className="text-xs font-bold text-gray-500">{item.abbreviation}</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-gray-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{item.state}</h3>
              {item.rttLaw === "yes" && (
                <span className="text-[9px] font-medium px-1.5 py-0.5 rounded bg-blue-50 text-blue-600 border border-blue-200">RTT</span>
              )}
              {item.regenMedStatute === "yes" && (
                <span className="text-[9px] font-medium px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-600 border border-emerald-200">REGEN</span>
              )}
              {item.exosomesAddressed !== "no" && (
                <span className="text-[9px] font-medium px-1.5 py-0.5 rounded bg-purple-50 text-purple-600 border border-purple-200">EXO</span>
              )}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-20 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#198038]"
                  style={{ width: `${((yesCount + partialCount * 0.5) / checks.length) * 100}%` }}
                />
              </div>
              <span className="text-[10px] text-gray-400">{yesCount}/{checks.length}</span>
            </div>
          </div>

          {/* Desktop inline checks */}
          <div className="hidden md:flex items-center gap-1.5">
            {checks.map((c, i) => (
              <div key={i} title={c.label}>
                <StatusIcon status={c.value} />
              </div>
            ))}
          </div>

          <ChevronDown className={`w-4 h-4 text-gray-300 shrink-0 transition-transform ${expanded ? "rotate-180" : ""}`} />
        </div>
      </div>

      {expanded && (
        <div className="border-t border-gray-100 px-3 md:px-4 py-4 animate-fade-in">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-3">
            {checks.map((c, i) => (
              <div key={i} className="flex items-center gap-2 bg-gray-50/80 rounded-lg p-2.5 border border-gray-100/60">
                <StatusIcon status={c.value} />
                <div>
                  <p className="text-[11px] font-medium text-gray-700">{c.label}</p>
                  <StatusLabel status={c.value} />
                </div>
              </div>
            ))}
          </div>
          <div className="bg-gray-50/80 rounded-lg p-3 border border-gray-100/60">
            <p className="text-xs text-gray-600 leading-relaxed">{item.notes}</p>
            {item.keyStatute && (
              <div className="mt-2 flex items-center gap-2">
                <FileText className="w-3.5 h-3.5 text-gray-400" />
                {item.statuteUrl ? (
                  <a href={item.statuteUrl} target="_blank" rel="noopener noreferrer" className="text-[11px] text-blue-600 hover:underline font-medium flex items-center gap-1">
                    {item.keyStatute} <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="text-[11px] text-gray-500 font-medium">{item.keyStatute}</span>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export function StateChecklist() {
  const [search, setSearch] = useState("");
  const [expandedState, setExpandedState] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "rtt" | "regen" | "exo">("all");

  const filtered = useMemo(() => {
    let result = stateChecklistData;
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(s => s.state.toLowerCase().includes(q) || s.abbreviation.toLowerCase().includes(q));
    }
    if (filter === "rtt") result = result.filter(s => s.rttLaw === "yes");
    if (filter === "regen") result = result.filter(s => s.regenMedStatute === "yes");
    if (filter === "exo") result = result.filter(s => s.exosomesAddressed !== "no");
    return result;
  }, [search, filter]);

  const stats = useMemo(() => ({
    rtt: stateChecklistData.filter(s => s.rttLaw === "yes").length,
    regen: stateChecklistData.filter(s => s.regenMedStatute === "yes").length,
    exo: stateChecklistData.filter(s => s.exosomesAddressed !== "no").length,
    total: stateChecklistData.length,
  }), []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          State-by-State Regenerative Medicine Checklist
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          50-state regulatory landscape for regenerative medicine, Right to Try, and exosome therapy.
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="card-premium p-4 text-center">
          <div className="text-2xl font-extrabold text-[#198038]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{stats.rtt}</div>
          <div className="text-[10px] text-gray-400 font-medium mt-1">RTT STATES</div>
        </div>
        <div className="card-premium p-4 text-center">
          <div className="text-2xl font-extrabold text-[#0f62fe]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{stats.regen}</div>
          <div className="text-[10px] text-gray-400 font-medium mt-1">REGEN MED STATUTES</div>
        </div>
        <div className="card-premium p-4 text-center">
          <div className="text-2xl font-extrabold text-[#6929c4]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{stats.exo}</div>
          <div className="text-[10px] text-gray-400 font-medium mt-1">EXOSOMES ADDRESSED</div>
        </div>
        <div className="card-premium p-4 text-center">
          <div className="text-2xl font-extrabold text-gray-700" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{stats.total}</div>
          <div className="text-[10px] text-gray-400 font-medium mt-1">TOTAL STATES</div>
        </div>
      </div>

      {/* Legend */}
      <div className="card-premium p-4">
        <h3 className="text-xs font-bold text-gray-700 mb-2">Checklist Categories</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
          <div className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-[#198038]" /><span className="text-[10px] text-gray-500">RTT Law</span></div>
          <div className="flex items-center gap-1.5"><Scale className="w-3.5 h-3.5 text-[#0f62fe]" /><span className="text-[10px] text-gray-500">Regen Med Statute</span></div>
          <div className="flex items-center gap-1.5"><FileText className="w-3.5 h-3.5 text-[#b28600]" /><span className="text-[10px] text-gray-500">Informed Consent</span></div>
          <div className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-[#6929c4]" /><span className="text-[10px] text-gray-500">Practice of Medicine</span></div>
          <div className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-gray-400" /><span className="text-[10px] text-gray-500">Board Oversight</span></div>
          <div className="flex items-center gap-1.5"><AlertTriangle className="w-3.5 h-3.5 text-[#da1e28]" /><span className="text-[10px] text-gray-500">Exosomes Addressed</span></div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
          <input
            type="text"
            placeholder="Search by state name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200/60 rounded-xl text-sm text-gray-900 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300"
          />
        </div>
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
          {[
            { id: "all" as const, label: "All" },
            { id: "rtt" as const, label: `RTT (${stats.rtt})` },
            { id: "regen" as const, label: `Regen (${stats.regen})` },
            { id: "exo" as const, label: `Exo (${stats.exo})` },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-3 py-2 rounded-md text-xs font-medium transition-all ${
                filter === f.id ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* State List */}
      <div className="space-y-2">
        {filtered.map((item) => (
          <StateRow
            key={item.abbreviation}
            item={item}
            expanded={expandedState === item.abbreviation}
            onToggle={() => setExpandedState(expandedState === item.abbreviation ? null : item.abbreviation)}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <MapPin className="w-8 h-8 text-gray-200 mx-auto mb-3" />
          <p className="text-sm text-gray-400">No states match your search.</p>
        </div>
      )}
    </div>
  );
}
