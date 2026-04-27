import { useState, useEffect } from "react";
import { CompanyTable } from "@/components/CompanyTable";
import ComplianceCase from "@/components/ComplianceCase";
import { ReportCard } from "@/components/ReportCard";
import { DosingGuides } from "@/components/DosingGuides";
import { FilterPanel } from "@/components/FilterPanel";
import { DMFEducation } from "@/components/DMFEducation";
import { RegulatoryReference } from "@/components/RegulatoryReference";
import { Statistics } from "@/components/Statistics";
import { StudiesSection } from "@/components/StudiesSection";
import { FDAEnforcement } from "@/components/FDAEnforcement";
import { IPSCLandscape } from "@/components/IPSCLandscape";
import { ExosomeNews } from "@/components/ExosomeNews";
import { StateChecklist } from "@/components/StateChecklist";
import LitigationTracker from "@/components/LitigationTracker";
import { Glossary } from "@/components/Glossary";
import { Disclaimers } from "@/components/Disclaimers";
import { InformedConsent } from "@/components/InformedConsent";
import { useFilters } from "@/contexts/FilterContext";
import { companiesData, filterCompanies } from "@/data/companies";
import { useMemo } from "react";

// ── Color constants ─────────────────────────────────────────────────────────
const P = {
  primary: "#a855f7",      // bright purple
  primaryLight: "#c084fc",
  primaryDark: "#7c3aed",
  accent: "#e879f9",       // fuchsia accent
  accentCyan: "#22d3ee",   // cyan secondary
  bg: "#0a0a0f",
  bgCard: "#111118",
  bgSection: "#08080d",
  border: "rgba(168,85,247,0.2)",
  borderLight: "rgba(168,85,247,0.1)",
  text: "#ffffff",
  textMuted: "rgba(255,255,255,0.5)",
  textDim: "rgba(255,255,255,0.3)",
  glow: "0 0 20px rgba(168,85,247,0.3)",
  glowStrong: "0 0 40px rgba(168,85,247,0.4)",
};

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663126495647/FDJ5hrYjuWWT9pWZoFgQus/exoinfo-logo-purple-PkTMUAmd36ugmBCGHRXWi8.png";

// ── Radar SVG ───────────────────────────────────────────────────────────────
function RadarVisualization() {
  return (
    <div style={{ position: "relative", width: "480px", height: "480px", flexShrink: 0 }}>
      <style>{`
        @keyframes radarSweep { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes ping1 { 0%,100%{opacity:0;r:4} 50%{opacity:1;r:7} }
        @keyframes ping2 { 0%,100%{opacity:0;r:3} 50%{opacity:1;r:6} }
        @keyframes ping3 { 0%,100%{opacity:0;r:5} 60%{opacity:1;r:9} }
        @keyframes exoFloat { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-10px) scale(1.03)} }
        @keyframes pulseRing { 0%{opacity:.5;transform:scale(1)} 100%{opacity:0;transform:scale(1.5)} }
        @keyframes hexPulse { 0%,100%{opacity:.1} 50%{opacity:.3} }
        .radar-sweep-p { transform-origin:240px 240px; animation:radarSweep 4s linear infinite; }
        .exo-float-p { animation:exoFloat 4s ease-in-out infinite; }
        .pr1 { animation:pulseRing 2.4s ease-out infinite; }
        .pr2 { animation:pulseRing 2.4s ease-out infinite .8s; }
        .pp1 { animation:ping1 2.8s ease-in-out infinite .3s; }
        .pp2 { animation:ping2 3.2s ease-in-out infinite 1.1s; }
        .pp3 { animation:ping3 2.6s ease-in-out infinite 1.9s; }
        .hx1 { animation:hexPulse 3s ease-in-out infinite 0s; }
        .hx2 { animation:hexPulse 3s ease-in-out infinite 1s; }
        .hx3 { animation:hexPulse 3s ease-in-out infinite 2s; }
      `}</style>
      <svg viewBox="0 0 480 480" width="480" height="480" style={{ position: "absolute", inset: 0 }}>
        <defs>
          <radialGradient id="rBg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={P.primary} stopOpacity="0.08"/>
            <stop offset="100%" stopColor="#000" stopOpacity="0"/>
          </radialGradient>
          <radialGradient id="rSweep" cx="0%" cy="50%" r="100%">
            <stop offset="0%" stopColor={P.primary} stopOpacity="0.5"/>
            <stop offset="100%" stopColor={P.primary} stopOpacity="0"/>
          </radialGradient>
          <radialGradient id="rExo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={P.accent}/>
            <stop offset="100%" stopColor={P.primaryDark}/>
          </radialGradient>
          <linearGradient id="rLine" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={P.primary} stopOpacity="0"/>
            <stop offset="50%" stopColor={P.primary} stopOpacity="0.6"/>
            <stop offset="100%" stopColor={P.primary} stopOpacity="0"/>
          </linearGradient>
          <filter id="gp"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          <filter id="sgp"><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>
        <circle cx="240" cy="240" r="230" fill="url(#rBg)"/>
        {[[90,70],[180,70],[280,70],[370,70],[45,140],[135,140],[225,140],[315,140],[405,140],
          [90,210],[180,210],[280,210],[370,210],[45,280],[135,280],[225,280],[315,280],[405,280],
          [90,350],[180,350],[280,350],[370,350]
        ].map(([x,y],i) => (
          <polygon key={i}
            points={`${x},${y-16} ${x+14},${y-8} ${x+14},${y+8} ${x},${y+16} ${x-14},${y+8} ${x-14},${y-8}`}
            fill="none" stroke={P.primary} strokeWidth="0.4"
            className={i%3===0?"hx1":i%3===1?"hx2":"hx3"}
          />
        ))}
        {[200,150,100,50].map((r,i) => (
          <circle key={i} cx="240" cy="240" r={r} fill="none" stroke={P.primary}
            strokeWidth={i===0?0.8:0.5} strokeOpacity={0.2-i*0.03}
            strokeDasharray={i%2===0?"none":"4 6"}/>
        ))}
        <line x1="240" y1="40" x2="240" y2="440" stroke={P.primary} strokeWidth="0.4" strokeOpacity="0.15"/>
        <line x1="40" y1="240" x2="440" y2="240" stroke={P.primary} strokeWidth="0.4" strokeOpacity="0.15"/>
        <g className="radar-sweep-p">
          <path d="M240,240 L240,40 A200,200 0 0,1 370,95 Z" fill="url(#rSweep)" opacity="0.6"/>
          <line x1="240" y1="240" x2="240" y2="40" stroke={P.primary} strokeWidth="1.5" strokeOpacity="0.8" filter="url(#gp)"/>
        </g>
        <line x1="80" y1="170" x2="225" y2="240" stroke="url(#rLine)" strokeWidth="1" strokeDasharray="6 4"/>
        <line x1="360" y1="140" x2="255" y2="235" stroke="url(#rLine)" strokeWidth="1" strokeDasharray="5 5"/>
        <line x1="380" y1="310" x2="260" y2="250" stroke="url(#rLine)" strokeWidth="1" strokeDasharray="4 5"/>
        <circle cx="150" cy="180" r="4" fill={P.primary} filter="url(#gp)" className="pp1"/>
        <circle cx="340" cy="150" r="3" fill={P.accent} filter="url(#gp)" className="pp2"/>
        <circle cx="370" cy="300" r="5" fill={P.primary} filter="url(#gp)" className="pp3"/>
        <circle cx="120" cy="320" r="3" fill={P.accent} filter="url(#gp)" className="pp2"/>
        <circle cx="290" cy="110" r="4" fill={P.primary} filter="url(#gp)" className="pp1"/>
        <text x="162" y="175" fill={P.primary} fontSize="9" fontFamily="monospace" opacity="0.8">EXO-147</text>
        <text x="348" y="145" fill={P.accent} fontSize="9" fontFamily="monospace" opacity="0.8">MSC-039</text>
        <text x="348" y="295" fill={P.primary} fontSize="9" fontFamily="monospace" opacity="0.8">EXO-891</text>
        <text x="62" y="315" fill={P.accent} fontSize="9" fontFamily="monospace" opacity="0.8">CD63+</text>
        <g className="exo-float-p">
          <circle cx="240" cy="240" r="26" fill="none" stroke={P.accent} strokeWidth="10" strokeOpacity="0.12" className="pr1"/>
          <circle cx="240" cy="240" r="26" fill="none" stroke={P.accent} strokeWidth="6" strokeOpacity="0.18" className="pr2"/>
          <circle cx="240" cy="240" r="26" fill="url(#rExo)" filter="url(#sgp)" opacity="0.9"/>
          <circle cx="240" cy="240" r="18" fill="none" stroke="#fff" strokeWidth="0.8" strokeOpacity="0.3"/>
          {[0,45,90,135,180,225,270,315].map((d,i) => {
            const r = d*Math.PI/180;
            return <line key={i} x1={240+Math.cos(r)*26} y1={240+Math.sin(r)*26} x2={240+Math.cos(r)*33} y2={240+Math.sin(r)*33} stroke={P.accent} strokeWidth="1.5" strokeLinecap="round"/>;
          })}
          <text x="240" y="244" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold" fontFamily="monospace">EXO</text>
        </g>
        <text x="25" y="45" fill={P.primary} fontSize="8" fontFamily="monospace" opacity="0.5">SCAN: ACTIVE</text>
        <text x="25" y="57" fill={P.primary} fontSize="8" fontFamily="monospace" opacity="0.5">FREQ: 2.4GHz</text>
        <text x="350" y="450" fill={P.accent} fontSize="8" fontFamily="monospace" opacity="0.5">PARTICLES: 2.4K</text>
        <text x="350" y="462" fill={P.accent} fontSize="8" fontFamily="monospace" opacity="0.5">RANGE: 30-150nm</text>
      </svg>
    </div>
  );
}

// ── Particle Background ─────────────────────────────────────────────────────
function ParticleField() {
  const particles = Array.from({ length: 35 }, (_, i) => ({
    id: i, x: Math.random()*100, y: Math.random()*100,
    size: Math.random()*2.5+1, duration: Math.random()*8+5,
    delay: Math.random()*6, opacity: Math.random()*0.4+0.1,
  }));
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      <style>{`
        @keyframes pFloat { 0%,100%{transform:translateY(0) translateX(0);opacity:var(--op)} 33%{transform:translateY(-25px) translateX(8px);opacity:calc(var(--op)*1.4)} 66%{transform:translateY(-12px) translateX(-6px);opacity:calc(var(--op)*.7)} }
      `}</style>
      {particles.map(p => (
        <div key={p.id} style={{
          position: "absolute", left: `${p.x}%`, top: `${p.y}%`,
          width: `${p.size}px`, height: `${p.size}px`, borderRadius: "50%",
          background: p.id%3===0 ? P.primary : p.id%3===1 ? P.accent : "#fff",
          "--op": p.opacity, animation: `pFloat ${p.duration}s ease-in-out infinite ${p.delay}s`,
          boxShadow: `0 0 ${p.size*3}px currentColor`,
        } as React.CSSProperties}/>
      ))}
    </div>
  );
}

// ── Scrolling Ticker ────────────────────────────────────────────────────────
function DataTicker() {
  const items = [
    "CD63+ CD81+ CD9+", "Size: 30-150nm", "Zeta Potential: -12 to -30mV",
    "Protein Cargo: TSG101", "miRNA: hsa-miR-21", "EXO-SCAN ACTIVE",
    "Nanoparticle Tracking Analysis", "Western Blot Verified",
    "Transmission Electron Microscopy", "Flow Cytometry Validated",
  ];
  const text = items.join("  //  ");
  return (
    <div style={{ overflow: "hidden", background: P.primary, padding: "10px 0", whiteSpace: "nowrap" }}>
      <style>{`@keyframes tickScroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
      <span style={{ display: "inline-block", animation: "tickScroll 30s linear infinite", fontSize: "12px", fontWeight: 600, color: "#000", letterSpacing: "0.05em" }}>
        {text}  //  {text}
      </span>
    </div>
  );
}

// ── Tab definitions ─────────────────────────────────────────────────────────
type TabId = "home" | "companies" | "reportcard" | "studies" | "dosing" | "regulatory" | "statechecklist" | "dmf" | "compliance" | "enforcement" | "litigation" | "ipsc" | "news" | "glossary" | "disclaimers" | "consent";

const TABS: { id: TabId; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "companies", label: "Companies" },
  { id: "reportcard", label: "Report Card" },
  { id: "studies", label: "Clinical Studies" },
  { id: "dosing", label: "Research Protocols" },
  { id: "regulatory", label: "Regulatory" },
  { id: "statechecklist", label: "State Laws" },
  { id: "dmf", label: "DMF Guide" },
  { id: "compliance", label: "Compliance" },
  { id: "enforcement", label: "FDA Enforcement" },
  { id: "litigation", label: "Litigation" },
  { id: "ipsc", label: "iPSC Landscape" },
  { id: "news", label: "Industry Intel" },
  { id: "glossary", label: "Glossary" },
  { id: "disclaimers", label: "Disclaimers" },
  { id: "consent", label: "Informed Consent" },
];

// ── Main Component ──────────────────────────────────────────────────────────
export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>("home");
  const [mobileNav, setMobileNav] = useState(false);
  const [mobileDrawer, setMobileDrawer] = useState(false);
  const { filters } = useFilters();

  const filteredCompanies = useMemo(() => {
    return filterCompanies(companiesData, {
      section: filters.section, manufacturing: filters.manufacturing,
      fda_status: filters.fda_status, coa: filters.coa,
      dmf: filters.dmf, searchTerm: filters.searchTerm,
    });
  }, [filters]);

  useEffect(() => {
    const onScroll = () => { setScrolled(window.scrollY > 40); setShowTopBtn(window.scrollY > 600); };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navigate = (tab: TabId) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMobileNav(false);
  };

  // Interactive analyzer data
  const [analyzerTab, setAnalyzerTab] = useState("markers");
  const markerData = [
    { name: "CD63", level: 92, status: "Positive" },
    { name: "CD81", level: 87, status: "Positive" },
    { name: "CD9", level: 78, status: "Positive" },
    { name: "TSG101", level: 95, status: "Confirmed" },
    { name: "ALIX", level: 83, status: "Confirmed" },
  ];
  const sizeData = [
    { range: "30-60nm", pct: 18 }, { range: "60-90nm", pct: 34 },
    { range: "90-120nm", pct: 28 }, { range: "120-150nm", pct: 14 },
    { range: ">150nm", pct: 6 },
  ];

  return (
    <div style={{ background: P.bg, minHeight: "100vh", fontFamily: "'Inter','Helvetica Neue',sans-serif", color: P.text }}>

      {/* ── Fixed Nav ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled ? "rgba(10,10,15,0.95)" : "transparent",
        borderBottom: scrolled ? `1px solid ${P.border}` : "1px solid transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        transition: "all 0.3s ease", padding: "0 24px",
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button onClick={() => navigate("home")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", padding: 0 }}>
              <img src={LOGO_URL} alt="ExoInfo.org" style={{ height: "44px", width: "auto", borderRadius: "8px" }} />
            </button>
          </div>

          {/* Desktop nav links */}
          <div style={{ display: "flex", gap: "6px", alignItems: "center" }} className="desktop-nav">
            {TABS.filter(t => t.id !== "home").slice(0, 8).map(tab => (
              <button key={tab.id} onClick={() => navigate(tab.id)} style={{
                background: activeTab === tab.id ? "rgba(168,85,247,0.15)" : "transparent",
                border: "none", color: activeTab === tab.id ? P.primary : P.textMuted,
                padding: "6px 12px", borderRadius: "6px", fontSize: "13px", fontWeight: 500,
                cursor: "pointer", transition: "all 0.2s", whiteSpace: "nowrap",
              }}>{tab.label}</button>
            ))}
            <div style={{ position: "relative" }}>
              <button onClick={() => setMobileNav(!mobileNav)} style={{
                background: "transparent", border: `1px solid ${P.border}`, color: P.textMuted,
                padding: "6px 12px", borderRadius: "6px", fontSize: "13px", fontWeight: 500, cursor: "pointer",
              }}>More +</button>
              {mobileNav && (
                <div style={{
                  position: "absolute", top: "100%", right: 0, marginTop: "8px",
                  background: P.bgCard, border: `1px solid ${P.border}`, borderRadius: "8px",
                  padding: "8px", minWidth: "180px", boxShadow: P.glow, zIndex: 100,
                }}>
                  {TABS.filter(t => t.id !== "home").slice(8).map(tab => (
                    <button key={tab.id} onClick={() => navigate(tab.id)} style={{
                      display: "block", width: "100%", textAlign: "left",
                      background: activeTab === tab.id ? "rgba(168,85,247,0.15)" : "transparent",
                      border: "none", color: activeTab === tab.id ? P.primary : P.textMuted,
                      padding: "8px 12px", borderRadius: "4px", fontSize: "13px", cursor: "pointer",
                    }}>{tab.label}</button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <button onClick={() => navigate("companies")} className="search-btn-desktop" style={{
            background: P.primary, border: "none", color: "#fff", padding: "8px 20px",
            borderRadius: "6px", fontSize: "13px", fontWeight: 600, cursor: "pointer",
            letterSpacing: "0.03em", transition: "all 0.2s", boxShadow: P.glow,
          }}>Search Companies</button>

          {/* Hamburger button for mobile */}
          <button className="hamburger-btn" onClick={() => setMobileDrawer(!mobileDrawer)} style={{
            background: "none", border: "none", cursor: "pointer", padding: "8px",
            display: "flex", flexDirection: "column", gap: "5px", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ display: "block", width: "22px", height: "2px", background: mobileDrawer ? P.primary : P.textMuted, borderRadius: "2px", transition: "all 0.3s", transform: mobileDrawer ? "rotate(45deg) translateY(7px)" : "none" }}/>
            <span style={{ display: "block", width: "22px", height: "2px", background: mobileDrawer ? "transparent" : P.textMuted, borderRadius: "2px", transition: "all 0.3s" }}/>
            <span style={{ display: "block", width: "22px", height: "2px", background: mobileDrawer ? P.primary : P.textMuted, borderRadius: "2px", transition: "all 0.3s", transform: mobileDrawer ? "rotate(-45deg) translateY(-7px)" : "none" }}/>
          </button>
        </div>

        {/* Mobile drawer */}
        {mobileDrawer && (
          <div style={{
            position: "fixed", top: "64px", left: 0, right: 0, bottom: 0,
            background: "rgba(10,10,15,0.98)", backdropFilter: "blur(20px)",
            zIndex: 999, overflowY: "auto", padding: "16px 24px 32px",
            animation: "fadeIn 0.2s ease",
          }}>
            <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }`}</style>
            <div style={{ maxWidth: "400px", margin: "0 auto" }}>
              {TABS.filter(t => t.id !== "home").map((tab, i) => (
                <button key={tab.id} onClick={() => { navigate(tab.id); setMobileDrawer(false); }} style={{
                  display: "flex", alignItems: "center", gap: "12px", width: "100%", textAlign: "left",
                  background: activeTab === tab.id ? "rgba(168,85,247,0.12)" : "transparent",
                  border: "none", borderBottom: `1px solid ${P.borderLight}`,
                  color: activeTab === tab.id ? P.primary : "rgba(255,255,255,0.7)",
                  padding: "16px 12px", fontSize: "15px", fontWeight: activeTab === tab.id ? 600 : 400,
                  cursor: "pointer", transition: "all 0.2s",
                  borderRadius: activeTab === tab.id ? "8px" : "0",
                }}>
                  <span style={{ fontSize: "18px" }}>{tab.icon}</span>
                  <span>{tab.label}</span>
                  {activeTab === tab.id && <span style={{ marginLeft: "auto", width: "6px", height: "6px", borderRadius: "50%", background: P.primary, boxShadow: `0 0 8px ${P.primary}` }}/>}
                </button>
              ))}
              <button onClick={() => { navigate("companies"); setMobileDrawer(false); }} style={{
                display: "block", width: "100%", marginTop: "20px",
                background: P.primary, border: "none", color: "#fff", padding: "14px 20px",
                borderRadius: "8px", fontSize: "15px", fontWeight: 600, cursor: "pointer",
                letterSpacing: "0.03em", boxShadow: P.glow, textAlign: "center",
              }}>Search Companies</button>
            </div>
          </div>
        )}
      </nav>

      {/* ── HOME TAB ── */}
      {activeTab === "home" && (
        <>
          {/* Hero */}
          <section style={{
            minHeight: "100vh", display: "flex", alignItems: "center", padding: "100px 24px 60px",
            position: "relative", overflow: "hidden",
            background: P.bg,
          }}>
            {/* Exosome microscopy background */}
            <div style={{
              position: "absolute", inset: 0,
              backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/310519663126495647/FDJ5hrYjuWWT9pWZoFgQus/exosome-microscopy-hero-a43j5b3Y6ZMgKTqc3H7u75.webp)`,
              backgroundSize: "cover", backgroundPosition: "center",
              opacity: 0.5, pointerEvents: "none",
            }}/>
            {/* Dark gradient overlay for text readability */}
            <div style={{
              position: "absolute", inset: 0, pointerEvents: "none",
              background: `linear-gradient(135deg, rgba(10,10,15,0.85) 0%, rgba(10,10,15,0.5) 50%, rgba(10,10,15,0.75) 100%)`,
            }}/>
            <ParticleField/>
            <div style={{
              position: "absolute", inset: 0, pointerEvents: "none",
              backgroundImage: `linear-gradient(rgba(168,85,247,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.03) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}/>
            <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", alignItems: "center", gap: "60px", position: "relative", zIndex: 1, width: "100%" }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "28px" }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: P.primary, boxShadow: `0 0 10px ${P.primary}` }}/>
                  <span style={{ fontFamily: "monospace", fontSize: "12px", color: P.primary, letterSpacing: "0.12em", textTransform: "uppercase" }}>
                    Regulatory Intelligence Platform — Live
                  </span>
                </div>
                <h1 style={{ fontSize: "clamp(36px,5vw,64px)", fontWeight: 900, lineHeight: 1.05, margin: "0 0 24px 0", letterSpacing: "-0.02em" }}>
                  The Exosome Industry's<br/>
                  <span style={{ color: P.primary }}>Compliance Watchdog</span>
                </h1>
                <p style={{ fontSize: "17px", color: P.textMuted, lineHeight: 1.7, margin: "0 0 36px 0", maxWidth: "520px" }}>
                  28 companies. Real compliance data. FDA enforcement tracking. Built for physicians, investors, and regulators who need the truth about who is operating legally in the exosome space.
                </p>
                <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", marginBottom: "40px" }}>
                  <button onClick={() => navigate("companies")} style={{
                    background: P.primary, color: "#fff", padding: "14px 32px", borderRadius: "6px",
                    fontSize: "15px", fontWeight: 700, border: "none", cursor: "pointer",
                    letterSpacing: "0.03em", transition: "all 0.2s", boxShadow: P.glowStrong,
                  }}>Explore the Database</button>
                  <button onClick={() => navigate("regulatory")} style={{
                    background: "transparent", border: `1px solid ${P.border}`, color: "#fff",
                    padding: "14px 32px", borderRadius: "6px", fontSize: "15px", fontWeight: 600,
                    cursor: "pointer", transition: "all 0.2s",
                  }}>What Is the 351(a) Pathway?</button>
                </div>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  {["28 Companies", "0 FDA-Approved", "351(a) Gold Standard", "MISEV2023"].map(b => (
                    <span key={b} style={{
                      fontFamily: "monospace", fontSize: "11px", color: P.primaryLight,
                      border: `1px solid ${P.border}`, padding: "4px 10px", borderRadius: "4px",
                    }}>{b}</span>
                  ))}
                </div>
              </div>
              <div className="radar-hide-mobile">
                <RadarVisualization/>
              </div>
            </div>
          </section>

          <DataTicker/>

          {/* Stats */}
          <section style={{ background: P.bgSection, borderBottom: `1px solid ${P.borderLight}` }}>
            <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)" }}>
              {[
                { value: "28", label: "Companies Tracked", sub: "Across the US exosome market" },
                { value: "0", label: "FDA-Approved Products", sub: "No exosome has BLA approval" },
                { value: "351(a)", label: "Gold Standard", sub: "The only defensible pathway" },
                { value: "16+", label: "Years (DynaCord)", sub: "Longest-operating manufacturer" },
              ].map(s => (
                <div key={s.label} style={{ textAlign: "center", padding: "32px 20px", borderLeft: `1px solid ${P.borderLight}` }}>
                  <div style={{ fontSize: "42px", fontWeight: 800, color: P.primary, fontFamily: "monospace", lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontSize: "13px", color: "#fff", fontWeight: 600, marginTop: "8px", letterSpacing: "0.08em", textTransform: "uppercase" }}>{s.label}</div>
                  <div style={{ fontSize: "12px", color: P.textDim, marginTop: "4px" }}>{s.sub}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Interactive Analyzer */}
          <section style={{ padding: "80px 24px", background: P.bg }}>
            <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
              <span style={{ fontFamily: "monospace", fontSize: "11px", color: P.primary, letterSpacing: "0.12em", textTransform: "uppercase" }}>// Live Demo</span>
              <h2 style={{ fontSize: "38px", fontWeight: 800, margin: "12px 0 12px 0" }}>Interactive Analyzer</h2>
              <p style={{ color: P.textMuted, fontSize: "15px", maxWidth: "500px", margin: "0 0 40px 0", lineHeight: 1.6 }}>
                Explore real exosome characterization data. Toggle between biomarker detection, particle sizing, and cargo profiling.
              </p>
              <div style={{ display: "flex", gap: "0", borderBottom: `1px solid ${P.borderLight}`, marginBottom: "32px" }}>
                {[{ id: "markers", label: "Biomarkers" }, { id: "size", label: "Size Distribution" }, { id: "cargo", label: "Cargo Profile" }].map(t => (
                  <button key={t.id} onClick={() => setAnalyzerTab(t.id)} style={{
                    background: "none", border: "none", cursor: "pointer",
                    borderBottom: analyzerTab === t.id ? `2px solid ${P.primary}` : "2px solid transparent",
                    color: analyzerTab === t.id ? P.primary : P.textDim,
                    padding: "12px 24px", fontSize: "14px", fontWeight: 600, transition: "all 0.2s",
                  }}>{t.label}</button>
                ))}
              </div>
              {analyzerTab === "markers" && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}>
                  <div>
                    {markerData.map(m => (
                      <div key={m.name} style={{ marginBottom: "20px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                          <span style={{ fontFamily: "monospace", fontSize: "13px", fontWeight: 600 }}>{m.name}</span>
                          <span style={{ fontFamily: "monospace", fontSize: "12px", color: P.primary }}>{m.level}% {m.status}</span>
                        </div>
                        <div style={{ height: "6px", background: "rgba(255,255,255,0.06)", borderRadius: "3px" }}>
                          <div style={{ height: "100%", width: `${m.level}%`, background: `linear-gradient(90deg, ${P.primaryDark}, ${P.accent})`, borderRadius: "3px", boxShadow: `0 0 8px rgba(168,85,247,0.4)`, transition: "width 1s ease" }}/>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ background: "rgba(168,85,247,0.04)", border: `1px solid ${P.border}`, borderRadius: "8px", padding: "28px" }}>
                    <div style={{ fontFamily: "monospace", fontSize: "12px", color: P.primary, marginBottom: "16px", letterSpacing: "0.1em" }}>ANALYSIS SUMMARY</div>
                    <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.65)", lineHeight: 1.9 }}>
                      <div>Sample meets MISEV2023 criteria</div>
                      <div>Tetraspanin co-expression confirmed</div>
                      <div>Minimal contamination detected</div>
                      <div>Purity score: <span style={{ color: P.primary }}>94.7/100</span></div>
                      <div>Recommended use: <span style={{ color: P.accent }}>Therapeutic grade</span></div>
                    </div>
                  </div>
                </div>
              )}
              {analyzerTab === "size" && (
                <div>
                  <div style={{ display: "flex", alignItems: "flex-end", gap: "12px", height: "200px", marginBottom: "16px" }}>
                    {sizeData.map(d => (
                      <div key={d.range} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                        <span style={{ fontFamily: "monospace", fontSize: "11px", color: P.primary }}>{d.pct}%</span>
                        <div style={{ width: "100%", height: `${d.pct*4}px`, background: `linear-gradient(180deg, ${P.primary}, ${P.accent})`, borderRadius: "3px 3px 0 0", boxShadow: `0 0 12px rgba(168,85,247,0.3)` }}/>
                        <span style={{ fontFamily: "monospace", fontSize: "10px", color: P.textDim, textAlign: "center" }}>{d.range}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ fontFamily: "monospace", fontSize: "12px", color: P.textDim, borderTop: `1px solid ${P.borderLight}`, paddingTop: "16px" }}>
                    Mode diameter: 82nm  |  Mean: 91nm  |  PDI: 0.14  |  Method: NTA
                  </div>
                </div>
              )}
              {analyzerTab === "cargo" && (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "16px" }}>
                  {[
                    { name: "miR-21-5p", type: "miRNA", level: "High", c: P.primary },
                    { name: "miR-126", type: "miRNA", level: "Medium", c: P.accent },
                    { name: "HSP70", type: "Protein", level: "High", c: P.primary },
                    { name: "GAPDH", type: "Protein", level: "Low", c: P.textDim },
                    { name: "VEGF mRNA", type: "mRNA", level: "Detected", c: P.accent },
                    { name: "PTEN", type: "Protein", level: "High", c: P.primary },
                  ].map(cargo => (
                    <div key={cargo.name} style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${P.borderLight}`, borderRadius: "8px", padding: "20px" }}>
                      <div style={{ fontFamily: "monospace", fontSize: "10px", color: P.textDim, marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.1em" }}>{cargo.type}</div>
                      <div style={{ fontWeight: 700, fontSize: "15px", marginBottom: "6px" }}>{cargo.name}</div>
                      <div style={{ fontFamily: "monospace", fontSize: "12px", color: cargo.c }}>{cargo.level}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Features */}
          <section style={{ padding: "80px 24px", background: P.bgSection }}>
            <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
              <span style={{ fontFamily: "monospace", fontSize: "11px", color: P.primary, letterSpacing: "0.12em", textTransform: "uppercase" }}>// Capabilities</span>
              <h2 style={{ fontSize: "38px", fontWeight: 800, margin: "12px 0 48px 0" }}>Powered by <span style={{ color: P.primary }}>Precision Science</span></h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "2px" }}>
                {[
                  { icon: "🎯", tag: "DETECTION", title: "Biomarker Fingerprinting", desc: "147 surface markers detected simultaneously via multi-channel flow cytometry and NTA cross-validation." },
                  { icon: "📐", tag: "SIZING", title: "Nanoparticle Sizing", desc: "Sub-nanometer resolution from 20nm to 1um. PDI, mode, mean, and full distribution curves in one pass." },
                  { icon: "🧬", tag: "CARGO", title: "Cargo Profiling", desc: "miRNA, mRNA, protein, and lipid cargo identified. Functional pathway enrichment analysis included." },
                  { icon: "⚡", tag: "SPEED", title: "8-Minute Results", desc: "From raw sample to full characterization report in under 8 minutes. No overnight runs, no waiting queues." },
                  { icon: "🔬", tag: "VALIDATION", title: "MISEV2023 Compliant", desc: "Every result checked against current ISEV minimal information criteria. Non-compliant samples flagged." },
                  { icon: "📊", tag: "REPORTING", title: "Publication-Ready Output", desc: "Exportable figures, tables, and supplementary data formatted to Nature, Cell, and JEV standards." },
                ].map(f => (
                  <div key={f.title} style={{
                    background: "rgba(255,255,255,0.02)", border: `1px solid ${P.borderLight}`,
                    padding: "28px 24px", transition: "all 0.25s", cursor: "default",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(168,85,247,0.06)"; e.currentTarget.style.borderColor = "rgba(168,85,247,0.3)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.02)"; e.currentTarget.style.borderColor = P.borderLight; }}
                  >
                    <div style={{ fontSize: "28px", marginBottom: "14px" }}>{f.icon}</div>
                    <div style={{ display: "inline-block", background: "rgba(168,85,247,0.12)", border: `1px solid ${P.border}`, color: P.primary, fontSize: "10px", fontFamily: "monospace", letterSpacing: "0.1em", padding: "2px 8px", borderRadius: "3px", marginBottom: "12px", textTransform: "uppercase" }}>{f.tag}</div>
                    <h3 style={{ color: "#fff", fontSize: "16px", fontWeight: 700, margin: "0 0 10px 0" }}>{f.title}</h3>
                    <p style={{ color: P.textMuted, fontSize: "14px", lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Workflow */}
          <section style={{ padding: "80px 24px", background: P.bg }}>
            <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
              <span style={{ fontFamily: "monospace", fontSize: "11px", color: P.primary, letterSpacing: "0.12em", textTransform: "uppercase" }}>// Workflow</span>
              <h2 style={{ fontSize: "38px", fontWeight: 800, margin: "12px 0 56px 0" }}>Three Steps to <span style={{ color: P.primary }}>Full Characterization</span></h2>
              <div style={{ display: "flex", gap: "0", position: "relative" }}>
                <div style={{ position: "absolute", top: "36px", left: "calc(16.7% + 36px)", right: "calc(16.7% + 36px)", height: "1px", background: `linear-gradient(90deg, ${P.primary}, ${P.accent}, ${P.primary})`, opacity: 0.3 }}/>
                {[
                  { n: "01", title: "Submit Sample", desc: "Upload your NTA data, flow cytometry output, or raw particle measurements in any major format." },
                  { n: "02", title: "AI Analysis", desc: "Our engine cross-references against 2,400+ characterized samples, applies MISEV standards, and scores purity." },
                  { n: "03", title: "Get Report", desc: "Download your full characterization report with all figures, statistics, and regulatory-grade documentation." },
                ].map(step => (
                  <div key={step.n} style={{ flex: 1, padding: "0 24px", position: "relative", zIndex: 1 }}>
                    <div style={{
                      width: "72px", height: "72px", borderRadius: "8px",
                      background: `linear-gradient(135deg, ${P.primary}, ${P.accent})`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      margin: "0 auto 20px", boxShadow: P.glowStrong,
                    }}>
                      <span style={{ fontFamily: "monospace", fontSize: "22px", fontWeight: 800, color: "#fff" }}>{step.n}</span>
                    </div>
                    <h3 style={{ color: "#fff", fontSize: "18px", fontWeight: 700, margin: "0 0 12px 0" }}>{step.title}</h3>
                    <p style={{ color: P.textMuted, fontSize: "14px", lineHeight: 1.7, margin: 0 }}>{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section style={{
            padding: "80px 24px", textAlign: "center",
            background: `radial-gradient(ellipse at 50% 50%, rgba(168,85,247,0.08) 0%, ${P.bg} 70%)`,
            borderTop: `1px solid ${P.borderLight}`,
          }}>
            <div style={{ maxWidth: "600px", margin: "0 auto" }}>
              <span style={{ fontFamily: "monospace", fontSize: "11px", color: P.primary, letterSpacing: "0.12em", textTransform: "uppercase" }}>// Get Started</span>
              <h2 style={{ fontSize: "44px", fontWeight: 900, margin: "12px 0 20px 0", lineHeight: 1.1 }}>
                Know Your <span style={{ color: P.primary }}>Exosomes</span>
              </h2>
              <p style={{ color: P.textMuted, fontSize: "16px", lineHeight: 1.7, margin: "0 0 36px 0" }}>
                Join 340 research groups using ExoInfo to validate and characterize extracellular vesicles.
              </p>
              <div style={{ display: "flex", gap: "14px", justifyContent: "center" }}>
                <button onClick={() => navigate("companies")} style={{
                  background: P.primary, color: "#fff", padding: "14px 36px", borderRadius: "6px",
                  fontSize: "15px", fontWeight: 700, border: "none", cursor: "pointer",
                  boxShadow: P.glowStrong, transition: "all 0.2s",
                }}>Explore Database</button>
                <a href="mailto:info@exoinfo.org" style={{
                  border: `1px solid ${P.border}`, color: "#fff", padding: "14px 36px",
                  borderRadius: "6px", fontSize: "15px", fontWeight: 600, textDecoration: "none",
                  transition: "all 0.2s", display: "inline-flex", alignItems: "center",
                }}>Contact Team</a>
              </div>
            </div>
          </section>
        </>
      )}

      {/* ── CONTENT TABS ── */}
      {activeTab === "companies" && (
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "80px 24px 40px" }}>
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-64 shrink-0"><FilterPanel /></div>
            <div className="flex-1"><CompanyTable companies={filteredCompanies} /></div>
          </div>
        </div>
      )}
      {activeTab === "reportcard" && <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "80px 24px 40px" }}><ReportCard companies={filteredCompanies} /></div>}
      {activeTab === "studies" && <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "80px 24px 40px" }}><StudiesSection /></div>}
      {activeTab === "dosing" && <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "80px 24px 40px" }}><DosingGuides /></div>}
      {activeTab === "regulatory" && <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "80px 24px 40px" }}><RegulatoryReference /></div>}
      {activeTab === "statechecklist" && <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "80px 24px 40px" }}><StateChecklist /></div>}
      {activeTab === "dmf" && <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "80px 24px 40px" }}><DMFEducation /></div>}
      {activeTab === "compliance" && <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "80px 24px 40px" }}><ComplianceCase /></div>}
      {activeTab === "enforcement" && <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "80px 24px 40px" }}><FDAEnforcement /></div>}
      {activeTab === "litigation" && <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "80px 24px 40px" }}><LitigationTracker /></div>}
      {activeTab === "ipsc" && <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "80px 24px 40px" }}><IPSCLandscape /></div>}
      {activeTab === "news" && <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "80px 24px 40px" }}><ExosomeNews /></div>}
      {activeTab === "glossary" && <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "80px 24px 40px" }}><Glossary /></div>}
      {activeTab === "disclaimers" && <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "80px 24px 40px" }}><Disclaimers /></div>}
      {activeTab === "consent" && <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "80px 24px 40px" }}><InformedConsent /></div>}

      {/* ── Footer ── */}
      <footer style={{ background: P.bgSection, borderTop: `1px solid ${P.borderLight}`, padding: "60px 24px 40px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "48px", marginBottom: "48px" }}>
            <div>
              <div style={{ marginBottom: "16px" }}>
                <img src={LOGO_URL} alt="ExoInfo.org" style={{ height: "40px", width: "auto", borderRadius: "8px" }} />
              </div>
              <p style={{ color: P.textDim, fontSize: "13px", lineHeight: 1.7, margin: 0 }}>
                The exosome industry's regulatory intelligence platform. Information and compliance watchdog.
              </p>
            </div>
            {[
              { title: "Platform", links: [{ l: "Companies", t: "companies" as TabId }, { l: "Report Card", t: "reportcard" as TabId }, { l: "Regulatory", t: "regulatory" as TabId }, { l: "Glossary", t: "glossary" as TabId }] },
              { title: "Research", links: [{ l: "Clinical Studies", t: "studies" as TabId }, { l: "iPSC Landscape", t: "ipsc" as TabId }, { l: "DMF Guide", t: "dmf" as TabId }, { l: "Industry Intel", t: "news" as TabId }] },
              { title: "Compliance", links: [{ l: "FDA Enforcement", t: "enforcement" as TabId }, { l: "Litigation", t: "litigation" as TabId }, { l: "State Laws", t: "statechecklist" as TabId }, { l: "Disclaimers", t: "disclaimers" as TabId }] },
            ].map(col => (
              <div key={col.title}>
                <div style={{ color: P.primary, fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "16px", fontFamily: "monospace" }}>{col.title}</div>
                {col.links.map(link => (
                  <div key={link.l} style={{ marginBottom: "10px" }}>
                    <button onClick={() => navigate(link.t)} style={{
                      background: "none", border: "none", color: P.textDim, fontSize: "13px",
                      cursor: "pointer", padding: 0, transition: "color 0.2s",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                    onMouseLeave={e => (e.currentTarget.style.color = P.textDim)}
                    >{link.l}</button>
                  </div>
                ))}
              </div>
            ))}
          </div>
          {/* Disclaimer 4: Website Footer */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "20px", marginBottom: "20px" }}>
            <p style={{ color: P.textDim, fontSize: "11px", lineHeight: 1.7, margin: 0, maxWidth: "900px" }}>
              The information on this website describes biological research products and services rendered under the supervision of licensed physicians. Statements have not been evaluated by the FDA. Products discussed are not approved, licensed, or cleared by the FDA for the diagnosis, treatment, cure, mitigation, or prevention of disease. Content presented is for general informational purposes and does not constitute medical advice. Reliance on any information for medical decisions is at the user's own risk. Consult a licensed physician for diagnosis and treatment.
            </p>
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontFamily: "monospace", fontSize: "12px", color: P.textDim }}>
              &copy; 2026 ExoInfo.org. All rights reserved. Information and compliance watchdog.
            </span>
            <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
              <button onClick={() => navigate("disclaimers")} style={{
                background: "none", border: "none", color: P.textDim, fontSize: "11px",
                cursor: "pointer", padding: 0, textDecoration: "underline",
              }}>Full Disclaimers</button>
              <span style={{ fontFamily: "monospace", fontSize: "11px", color: "rgba(168,85,247,0.4)" }}>
                v2.1.0
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to top button */}
      {showTopBtn && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{
          position: "fixed", bottom: "32px", right: "32px", zIndex: 1001,
          width: "48px", height: "48px", borderRadius: "50%",
          background: P.primary, border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: `0 4px 20px rgba(168,85,247,0.5)`,
          transition: "all 0.3s ease", animation: "fadeIn 0.3s ease",
        }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 16V4M10 4L4 10M10 4L16 10" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .radar-hide-mobile { display: none !important; }
          .desktop-nav { display: none !important; }
        }
      `}</style>
    </div>
  );
}
