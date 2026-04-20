import {
  ShieldCheck,
  Database,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Star,
  Activity,
  FlaskConical,
  Syringe,
  Scale,
  Briefcase,
  Stethoscope,
  Users,
  MapPin,
  Dna,
  Mail,
  FileWarning,
  Building2,
  Gavel,
  ChevronRight,
} from "lucide-react";
import { companiesData } from "@/data/companies";

interface HomePageProps {
  onNavigate: (tab: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const goldCompany = companiesData.find((c) => c.name === "DynaCord");
  const warningCount = companiesData.filter((c) => c.fda_status?.toLowerCase().includes("warning")).length;

  return (
    <div className="space-y-0">
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative bg-[#0A1628] overflow-hidden -mx-4 md:-mx-6 -mt-6 md:-mt-8 px-4 md:px-6">
        {/* Abstract pattern overlay */}
        <div className="absolute inset-0 opacity-[0.07]" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, #C9A84C 1px, transparent 1px), radial-gradient(circle at 80% 20%, #C9A84C 0.5px, transparent 0.5px), radial-gradient(circle at 60% 80%, #4589ff 0.5px, transparent 0.5px)`,
          backgroundSize: '60px 60px, 40px 40px, 50px 50px',
        }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0A1628]" />

        <div className="relative max-w-[1400px] mx-auto pt-16 pb-12 md:pt-24 md:pb-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/20 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-pulse" />
              <span className="text-[#C9A84C] text-xs font-semibold tracking-wider uppercase">Live Regulatory Intelligence</span>
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-[3.5rem] font-extrabold text-white leading-[1.1] tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              The Exosome Industry's{" "}
              <span className="text-[#C9A84C]">Regulatory Intelligence</span>{" "}
              Platform
            </h1>

            <p className="text-base md:text-lg text-slate-400 mt-5 leading-relaxed max-w-2xl">
              28 companies. Real compliance data. FDA enforcement tracking. Built for physicians, investors, and regulators who need the truth about who is operating legally in the exosome space.
            </p>

            <div className="flex flex-wrap gap-3 mt-8">
              <button
                onClick={() => onNavigate("companies")}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#C9A84C] text-[#0A1628] font-bold text-sm rounded-lg hover:bg-[#d4b65e] transition-all shadow-lg shadow-[#C9A84C]/20"
              >
                Explore the Database
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate("regulatory")}
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white font-semibold text-sm rounded-lg hover:bg-white/5 transition-all"
              >
                What Is the 351(a) Pathway?
              </button>
            </div>
          </div>

          {/* Hero Stats Bar */}
          <div className="grid grid-cols-3 gap-4 mt-12 max-w-2xl">
            {[
              { value: "28", label: "Companies Tracked" },
              { value: "0", label: "FDA-Approved Exosome Products" },
              { value: "351(a)", label: "The Gold Standard Pathway" },
            ].map((stat) => (
              <div key={stat.label} className="text-center border-t border-white/10 pt-4">
                <div className="text-2xl md:text-3xl font-extrabold text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {stat.value}
                </div>
                <div className="text-[11px] md:text-xs text-slate-500 font-medium mt-1 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT IS EXOINFO ──────────────────────────────── */}
      <section className="py-16 md:py-20">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[#C9A84C] text-xs font-bold tracking-widest uppercase">About This Platform</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mt-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Clarity in a Largely Unregulated Market
            </h2>
            <p className="text-gray-500 text-sm md:text-base mt-4 leading-relaxed">
              The exosome market is growing fast. Regulatory oversight has not kept pace. Hundreds of clinics offer exosome infusions. Most operate outside FDA compliance. Patients and providers have no reliable way to evaluate who is operating legally.
            </p>
            <p className="text-gray-500 text-sm md:text-base mt-3 leading-relaxed">
              ExoInfo tracks every significant exosome company in the United States. We score each one on regulatory compliance, manufacturing standards, source material transparency, and FDA enforcement history. We update the database in real time as FDA issues warning letters, INDs are filed, and clinical evidence evolves.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: <ShieldCheck className="w-6 h-6" />,
                title: "Compliance Ratings",
                body: "Every company rated on FDA regulatory status, cGMP manufacturing, product classification, and enforcement history. Gold, Silver, and Non-Compliant designations.",
                color: "text-emerald-600",
                bg: "bg-emerald-50",
                border: "border-emerald-100",
              },
              {
                icon: <Database className="w-6 h-6" />,
                title: "28-Company Database",
                body: "Source material, dosing data, manufacturing certifications, clinical trial status, and litigation history. All in one place.",
                color: "text-blue-600",
                bg: "bg-blue-50",
                border: "border-blue-100",
              },
              {
                icon: <AlertTriangle className="w-6 h-6" />,
                title: "FDA Warning Letter Tracker",
                body: "Real-time tracking of FDA enforcement actions against exosome companies. Know which operators have been put on notice.",
                color: "text-amber-600",
                bg: "bg-amber-50",
                border: "border-amber-100",
              },
            ].map((card) => (
              <div key={card.title} className={`bg-white rounded-2xl border ${card.border} p-6 shadow-sm hover:shadow-md transition-all group`}>
                <div className={`w-12 h-12 rounded-xl ${card.bg} ${card.color} flex items-center justify-center mb-4`}>
                  {card.icon}
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2">{card.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REGULATORY FRAMEWORK ─────────────────────────── */}
      <section className="py-16 md:py-20 bg-[#0A1628] -mx-4 md:-mx-6 px-4 md:px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[#C9A84C] text-xs font-bold tracking-widest uppercase">Understanding the Rules</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mt-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Two Pathways. One Right Answer.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* 351(a) */}
            <div className="bg-white/5 rounded-2xl border border-[#C9A84C]/30 p-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C9A84C] to-[#d4b65e]" />
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-5 h-5 text-[#C9A84C]" />
                <span className="text-[#C9A84C] text-xs font-bold tracking-wider uppercase">Gold Standard</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-4">351(a) BLA Pathway</h3>
              <ul className="space-y-3">
                {[
                  "Full FDA biologics approval pathway",
                  "Requires IND, clinical trials, and Biologics License Application",
                  "Drug Master File protects manufacturing IP",
                  "cGMP manufacturing required at commercial scale",
                  "The only pathway that results in a fully approved exosome therapeutic",
                  "No exosome product has received 351(a) approval yet, creating a significant first-mover opportunity",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-[#C9A84C] shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* 361 HCT/P */}
            <div className="bg-white/5 rounded-2xl border border-red-500/20 p-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-red-400" />
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                <span className="text-red-400 text-xs font-bold tracking-wider uppercase">High Risk</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-4">361 HCT/P (Minimal Manipulation)</h3>
              <ul className="space-y-3">
                {[
                  "Applies only to tissues meeting \"minimal manipulation\" and \"homologous use\" criteria",
                  "Exosomes almost universally fail both tests under current FDA interpretation",
                  "Companies marketing exosomes as 361 HCT/Ps face significant enforcement risk",
                  "FDA has issued multiple warning letters to 361 operators in the exosome space",
                  "Not a legally defensible pathway for most exosome products",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="text-center mt-8">
            <button
              onClick={() => onNavigate("regulatory")}
              className="inline-flex items-center gap-2 text-[#C9A84C] text-sm font-semibold hover:text-[#d4b65e] transition-colors"
            >
              See Our Full Regulatory Guide
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ── GOLD RATED SPOTLIGHT ─────────────────────────── */}
      <section className="py-16 md:py-20">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[#C9A84C] text-xs font-bold tracking-widest uppercase">Gold Rated Companies</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mt-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              The Highest Compliance Standard in the Industry
            </h2>
            <p className="text-gray-500 text-sm md:text-base mt-4 leading-relaxed">
              Gold Rated companies on ExoInfo meet the most rigorous criteria: active pursuit of the 351(a) BLA pathway, verifiable cGMP manufacturing, Drug Master File on file with the FDA, and no outstanding enforcement actions.
            </p>
          </div>

          {goldCompany && (
            <div className="max-w-2xl mx-auto bg-white rounded-2xl border-2 border-[#C9A84C]/30 shadow-lg shadow-[#C9A84C]/5 overflow-hidden">
              <div className="bg-gradient-to-r from-[#C9A84C]/10 to-[#C9A84C]/5 px-6 py-3 flex items-center justify-between border-b border-[#C9A84C]/20">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-[#C9A84C] fill-[#C9A84C]" />
                  <span className="text-[#C9A84C] text-xs font-bold tracking-wider uppercase">Gold Rated</span>
                </div>
                <span className="text-xs text-gray-400 font-medium">{goldCompany.company_age} years in business</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{goldCompany.name}</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Source Material", value: "hUCMSC-Exos (Wharton's Jelly MSC-derived)" },
                    { label: "Regulatory Pathway", value: "351(a) BLA" },
                    { label: "DMF Status", value: "Filed (Type II, CBER 2021)" },
                    { label: "Manufacturing", value: "TRUE cGMP Certified" },
                    { label: "Clinical Trials", value: "13 Pre-IND Pathways Active" },
                    { label: "Liability Insurance", value: "$20M CNA Coverage" },
                  ].map((row) => (
                    <div key={row.label} className="bg-gray-50 rounded-lg p-3">
                      <div className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">{row.label}</div>
                      <div className="text-sm text-gray-800 font-medium mt-0.5">{row.value}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="px-6 pb-5">
                <button
                  onClick={() => onNavigate("reportcard")}
                  className="inline-flex items-center gap-2 text-[#C9A84C] text-sm font-semibold hover:text-[#b8973f] transition-colors"
                >
                  View All Gold Rated Companies
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── DATA CATEGORIES GRID ─────────────────────────── */}
      <section className="py-16 md:py-20 bg-[#F4F6F9] -mx-4 md:-mx-6 px-4 md:px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[#C9A84C] text-xs font-bold tracking-widest uppercase">What We Track</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mt-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Every Data Point That Matters
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[
              { icon: <Scale className="w-5 h-5" />, title: "FDA Regulatory Status", desc: "351(a), 361 HCT/P, or unapproved", color: "text-blue-600", bg: "bg-blue-50" },
              { icon: <Building2 className="w-5 h-5" />, title: "cGMP Manufacturing", desc: "Verified certifications and facility data", color: "text-emerald-600", bg: "bg-emerald-50" },
              { icon: <FlaskConical className="w-5 h-5" />, title: "Source Material", desc: "Umbilical cord, bone marrow, adipose, iPSC-derived", color: "text-violet-600", bg: "bg-violet-50" },
              { icon: <Syringe className="w-5 h-5" />, title: "Dosing Protocols", desc: "Reported concentrations, delivery methods, and dosing ranges", color: "text-amber-600", bg: "bg-amber-50" },
              { icon: <Activity className="w-5 h-5" />, title: "Clinical Trial Data", desc: "Active INDs, published studies, and ClinicalTrials.gov registrations", color: "text-teal-600", bg: "bg-teal-50" },
              { icon: <Gavel className="w-5 h-5" />, title: "Litigation History", desc: "Filed suits, judgments, and regulatory settlements", color: "text-red-600", bg: "bg-red-50" },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-xl border border-gray-100 p-5 flex items-start gap-4 shadow-sm hover:shadow-md transition-all">
                <div className={`w-10 h-10 rounded-lg ${item.bg} ${item.color} flex items-center justify-center shrink-0`}>
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900">{item.title}</h3>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FDA WARNING LETTERS ──────────────────────────── */}
      <section className="py-16 md:py-20 bg-[#0A1628] -mx-4 md:-mx-6 px-4 md:px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-red-400 text-xs font-bold tracking-widest uppercase">Enforcement Tracker</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mt-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              The FDA Is Watching. So Are We.
            </h2>
            <p className="text-slate-400 text-sm md:text-base mt-4 leading-relaxed">
              FDA enforcement in the exosome space is accelerating. Warning letters have targeted companies making unsubstantiated therapeutic claims, operating outside HCT/P regulations, and marketing products without proper authorization. ExoInfo maintains a live database of every enforcement action in the sector.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto mb-10">
            {[
              { value: String(warningCount), label: "Warning Letters Issued" },
              { value: "3", label: "Companies Under Active Review" },
              { value: "2", label: "Injunctions Filed" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-extrabold text-red-400" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {stat.value}
                </div>
                <div className="text-[10px] text-slate-500 font-medium mt-1 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => onNavigate("enforcement")}
              className="inline-flex items-center gap-2 px-6 py-3 bg-red-500/10 border border-red-500/20 text-red-400 font-semibold text-sm rounded-lg hover:bg-red-500/20 transition-all"
            >
              <FileWarning className="w-4 h-4" />
              View the FDA Warning Letter Database
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ── WHO USES EXOINFO ─────────────────────────────── */}
      <section className="py-16 md:py-20">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[#C9A84C] text-xs font-bold tracking-widest uppercase">Built For</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mt-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Built for Every Stakeholder in the Exosome Ecosystem
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: <Stethoscope className="w-6 h-6" />,
                title: "Physicians",
                body: "You need to know which products are safe to administer. Our compliance ratings tell you which companies have verifiable manufacturing standards and which ones are operating in a regulatory gray zone.",
                color: "text-blue-600",
                bg: "bg-blue-50",
                accent: "border-t-blue-500",
              },
              {
                icon: <Briefcase className="w-6 h-6" />,
                title: "Investors",
                body: "Capital in the regenerative medicine sector follows regulatory defensibility. Our 351(a) pathway tracking identifies which companies have built a real regulatory moat.",
                color: "text-[#C9A84C]",
                bg: "bg-[#C9A84C]/10",
                accent: "border-t-[#C9A84C]",
              },
              {
                icon: <Users className="w-6 h-6" />,
                title: "Patients",
                body: "Before receiving any exosome therapy, patients deserve to know whether their provider is using a product from a compliant manufacturer. Our database makes that possible.",
                color: "text-emerald-600",
                bg: "bg-emerald-50",
                accent: "border-t-emerald-500",
              },
              {
                icon: <Scale className="w-6 h-6" />,
                title: "Regulators & Legal Counsel",
                body: "ExoInfo aggregates enforcement history, state regulation variations, and company compliance records. A single source of truth for regulatory and legal analysis.",
                color: "text-slate-600",
                bg: "bg-slate-50",
                accent: "border-t-slate-500",
              },
            ].map((card) => (
              <div key={card.title} className={`bg-white rounded-2xl border border-gray-100 ${card.accent} border-t-2 p-6 shadow-sm hover:shadow-md transition-all`}>
                <div className={`w-12 h-12 rounded-xl ${card.bg} ${card.color} flex items-center justify-center mb-4`}>
                  {card.icon}
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2">{card.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── iPSC LANDSCAPE PREVIEW ───────────────────────── */}
      <section className="py-16 md:py-20 bg-[#F4F6F9] -mx-4 md:-mx-6 px-4 md:px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8 max-w-4xl mx-auto">
            <div className="flex-1">
              <span className="text-violet-600 text-xs font-bold tracking-widest uppercase">Emerging Technology</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mt-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                The iPSC Frontier: What's Coming Next
              </h2>
              <p className="text-gray-500 text-sm md:text-base mt-4 leading-relaxed">
                Induced pluripotent stem cell-derived exosomes represent the next generation of the sector. ExoInfo tracks the iPSC landscape separately, covering early-stage companies, research institutions, and the regulatory questions that remain unanswered as this technology moves toward clinical application.
              </p>
              <button
                onClick={() => onNavigate("ipsc")}
                className="inline-flex items-center gap-2 mt-6 text-violet-600 text-sm font-semibold hover:text-violet-700 transition-colors"
              >
                Explore the iPSC Overview
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="w-48 h-48 rounded-2xl bg-gradient-to-br from-violet-100 to-violet-50 border border-violet-200/50 flex items-center justify-center shrink-0">
              <Dna className="w-16 h-16 text-violet-300" />
            </div>
          </div>
        </div>
      </section>

      {/* ── STATE REGULATIONS ────────────────────────────── */}
      <section className="py-16 md:py-20">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8 max-w-4xl mx-auto">
            <div className="w-48 h-48 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-50 border border-blue-200/50 flex items-center justify-center shrink-0 order-2 md:order-1">
              <MapPin className="w-16 h-16 text-blue-300" />
            </div>
            <div className="flex-1 order-1 md:order-2">
              <span className="text-blue-600 text-xs font-bold tracking-widest uppercase">State-Level Compliance</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mt-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Federal Rules Are the Floor. State Rules Vary.
              </h2>
              <p className="text-gray-500 text-sm md:text-base mt-4 leading-relaxed">
                Several states have enacted or proposed regulations specific to regenerative medicine and exosome therapies. State medical boards have taken independent action against non-compliant providers even where federal enforcement has not acted. ExoInfo maps the state-level regulatory landscape so you know the full compliance picture.
              </p>
              <button
                onClick={() => onNavigate("statechecklist")}
                className="inline-flex items-center gap-2 mt-6 text-blue-600 text-sm font-semibold hover:text-blue-700 transition-colors"
              >
                View State Regulation Map
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ───────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-[#0A1628] -mx-4 md:-mx-6 px-4 md:px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="max-w-xl mx-auto text-center">
            <span className="text-[#C9A84C] text-xs font-bold tracking-widest uppercase">Stay Current</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mt-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Regulatory Intelligence Delivered to Your Inbox
            </h2>
            <p className="text-slate-400 text-sm mt-4 leading-relaxed">
              The exosome regulatory landscape changes fast. FDA guidance, warning letters, new IND filings, and state actions. ExoInfo surfaces what matters the moment it happens.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30 focus:border-[#C9A84C]/50"
              />
              <button className="px-6 py-3 bg-[#C9A84C] text-[#0A1628] font-bold text-sm rounded-lg hover:bg-[#d4b65e] transition-all shadow-lg shadow-[#C9A84C]/20 whitespace-nowrap">
                Subscribe
              </button>
            </div>
            <p className="text-slate-600 text-[11px] mt-3">No spam. Unsubscribe any time. For physicians, investors, and industry professionals.</p>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────── */}
      <footer className="py-12 bg-[#060D1A] -mx-4 md:-mx-6 px-4 md:px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-white font-extrabold text-lg" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                ExoInfo.org
              </h3>
              <p className="text-slate-500 text-sm mt-2 leading-relaxed">
                The Exosome Industry's Regulatory Intelligence Platform
              </p>
            </div>

            <div>
              <h4 className="text-slate-400 text-xs font-bold tracking-wider uppercase mb-3">Quick Links</h4>
              <div className="space-y-2">
                {[
                  { label: "Company Database", tab: "companies" },
                  { label: "FDA Warning Letters", tab: "enforcement" },
                  { label: "Regulatory Guide", tab: "regulatory" },
                  { label: "351(a) vs 361 Overview", tab: "regulatory" },
                  { label: "Clinical Trials", tab: "studies" },
                  { label: "State Regulations", tab: "statechecklist" },
                  { label: "Glossary", tab: "glossary" },
                ].map((link) => (
                  <button
                    key={link.label}
                    onClick={() => onNavigate(link.tab)}
                    className="block text-slate-500 text-sm hover:text-[#C9A84C] transition-colors"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-slate-400 text-xs font-bold tracking-wider uppercase mb-3">Legal</h4>
              <div className="space-y-2">
                <p className="text-slate-500 text-sm">Privacy Policy</p>
                <p className="text-slate-500 text-sm">Terms of Use</p>
              </div>
              <p className="text-slate-600 text-[11px] mt-4 leading-relaxed">
                ExoInfo provides informational data only. Nothing on this site constitutes legal, medical, or investment advice.
              </p>
            </div>
          </div>

          <div className="border-t border-white/5 mt-8 pt-6">
            <p className="text-slate-600 text-xs text-center">
              &copy; 2026 ExoInfo.org. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
