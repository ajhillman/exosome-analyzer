import { useState, useEffect, useRef } from "react";

// ── Radar SVG Animation ──────────────────────────────────────────────────────
function RadarVisualization() {
  return (
    <div style={{ position: "relative", width: "520px", height: "520px", flexShrink: 0 }}>
      <style>{`
        @keyframes radarSweep {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes ping1 { 0%,100%{opacity:0;r:4} 50%{opacity:1;r:7} }
        @keyframes ping2 { 0%,100%{opacity:0;r:3} 50%{opacity:1;r:6} }
        @keyframes ping3 { 0%,100%{opacity:0;r:5} 60%{opacity:1;r:9} }
        @keyframes exoFloat {
          0%,100%{transform:translateY(0px) scale(1)}
          50%{transform:translateY(-12px) scale(1.04)}
        }
        @keyframes pulseRing {
          0%{opacity:.6;transform:scale(1)}
          100%{opacity:0;transform:scale(1.6)}
        }
        @keyframes particleDrift {
          0%{transform:translate(0,0);opacity:.7}
          33%{transform:translate(8px,-14px);opacity:1}
          66%{transform:translate(-6px,-8px);opacity:.8}
          100%{transform:translate(0,0);opacity:.7}
        }
        @keyframes hexPulse {
          0%,100%{opacity:.15} 50%{opacity:.4}
        }
        @keyframes dataStream {
          0%{stroke-dashoffset:200}
          100%{stroke-dashoffset:0}
        }
        .radar-sweep {
          transform-origin: 260px 260px;
          animation: radarSweep 3s linear infinite;
        }
        .exo-float { animation: exoFloat 4s ease-in-out infinite; }
        .pulse-ring1 { animation: pulseRing 2.4s ease-out infinite; }
        .pulse-ring2 { animation: pulseRing 2.4s ease-out infinite 0.8s; }
        .pulse-ring3 { animation: pulseRing 2.4s ease-out infinite 1.6s; }
        .p1 { animation: ping1 2.8s ease-in-out infinite 0.3s; }
        .p2 { animation: ping2 3.2s ease-in-out infinite 1.1s; }
        .p3 { animation: ping3 2.6s ease-in-out infinite 1.9s; }
        .hex1 { animation: hexPulse 3s ease-in-out infinite 0s; }
        .hex2 { animation: hexPulse 3s ease-in-out infinite 1s; }
        .hex3 { animation: hexPulse 3s ease-in-out infinite 2s; }
      `}</style>
      <svg viewBox="0 0 520 520" width="520" height="520" style={{ position: "absolute", inset: 0 }}>
        <defs>
          <radialGradient id="radarBg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00ff88" stopOpacity="0.08"/>
            <stop offset="100%" stopColor="#000" stopOpacity="0"/>
          </radialGradient>
          <radialGradient id="sweepGrad" cx="0%" cy="50%" r="100%">
            <stop offset="0%" stopColor="#00ff88" stopOpacity="0.5"/>
            <stop offset="100%" stopColor="#00ff88" stopOpacity="0"/>
          </radialGradient>
          <radialGradient id="exoGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00d4ff"/>
            <stop offset="100%" stopColor="#0088cc"/>
          </radialGradient>
          <linearGradient id="dataLine1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00ff88" stopOpacity="0"/>
            <stop offset="50%" stopColor="#00ff88" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#00ff88" stopOpacity="0"/>
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="strongGlow">
            <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
            <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        {/* Background fill */}
        <circle cx="260" cy="260" r="250" fill="url(#radarBg)"/>

        {/* Hex grid background */}
        {[
          [100,80],[200,80],[300,80],[400,80],[50,160],[150,160],[250,160],[350,160],[450,160],
          [100,240],[200,240],[300,240],[400,240],[50,320],[150,320],[250,320],[350,320],[450,320],
          [100,400],[200,400],[300,400],[400,400]
        ].map(([x,y],i) => (
          <polygon key={i}
            points={`${x},${y-18} ${x+16},${y-9} ${x+16},${y+9} ${x},${y+18} ${x-16},${y+9} ${x-16},${y-9}`}
            fill="none" stroke="#00ff88" strokeWidth="0.5"
            className={i%3===0?"hex1":i%3===1?"hex2":"hex3"}
          />
        ))}

        {/* Radar rings */}
        {[220, 160, 100, 50].map((r, i) => (
          <circle key={i} cx="260" cy="260" r={r}
            fill="none" stroke="#00ff88"
            strokeWidth={i === 0 ? 1 : 0.6}
            strokeOpacity={0.25 - i * 0.04}
            strokeDasharray={i % 2 === 0 ? "none" : "4 6"}
          />
        ))}

        {/* Cross-hairs */}
        <line x1="260" y1="40" x2="260" y2="480" stroke="#00ff88" strokeWidth="0.5" strokeOpacity="0.2"/>
        <line x1="40" y1="260" x2="480" y2="260" stroke="#00ff88" strokeWidth="0.5" strokeOpacity="0.2"/>
        <line x1="104" y1="104" x2="416" y2="416" stroke="#00ff88" strokeWidth="0.5" strokeOpacity="0.12"/>
        <line x1="416" y1="104" x2="104" y2="416" stroke="#00ff88" strokeWidth="0.5" strokeOpacity="0.12"/>

        {/* Radar sweep */}
        <g className="radar-sweep">
          <path d="M260,260 L260,40 A220,220 0 0,1 400,100 Z" fill="url(#sweepGrad)" opacity="0.7"/>
          <line x1="260" y1="260" x2="260" y2="40" stroke="#00ff88" strokeWidth="1.5" strokeOpacity="0.9" filter="url(#glow)"/>
        </g>

        {/* Data stream lines */}
        <line x1="80" y1="180" x2="240" y2="260" stroke="url(#dataLine1)" strokeWidth="1" strokeDasharray="8 4"/>
        <line x1="380" y1="150" x2="280" y2="255" stroke="url(#dataLine1)" strokeWidth="1" strokeDasharray="6 6"/>
        <line x1="420" y1="340" x2="285" y2="270" stroke="url(#dataLine1)" strokeWidth="1" strokeDasharray="5 5"/>

        {/* Ping blips */}
        <circle cx="160" cy="190" r="4" fill="#00ff88" filter="url(#glow)" className="p1"/>
        <circle cx="360" cy="160" r="3" fill="#00d4ff" filter="url(#glow)" className="p2"/>
        <circle cx="400" cy="320" r="5" fill="#00ff88" filter="url(#glow)" className="p3"/>
        <circle cx="130" cy="350" r="3" fill="#00d4ff" filter="url(#glow)" className="p2"/>
        <circle cx="310" cy="120" r="4" fill="#00ff88" filter="url(#glow)" className="p1"/>

        {/* Exosome labels at blips */}
        <text x="172" y="185" fill="#00ff88" fontSize="9" fontFamily="monospace" opacity="0.8">EXO-147</text>
        <text x="368" y="155" fill="#00d4ff" fontSize="9" fontFamily="monospace" opacity="0.8">MSC-039</text>
        <text x="368" y="315" fill="#00ff88" fontSize="9" fontFamily="monospace" opacity="0.8">EXO-891</text>
        <text x="72" y="345" fill="#00d4ff" fontSize="9" fontFamily="monospace" opacity="0.8">CD63+</text>

        {/* Center exosome */}
        <g className="exo-float">
          {/* Pulse rings behind */}
          <circle cx="260" cy="260" r="28" fill="none" stroke="#00d4ff" strokeWidth="12" strokeOpacity="0.15" className="pulse-ring1"/>
          <circle cx="260" cy="260" r="28" fill="none" stroke="#00d4ff" strokeWidth="8" strokeOpacity="0.2" className="pulse-ring2"/>
          <circle cx="260" cy="260" r="28" fill="none" stroke="#00d4ff" strokeWidth="4" strokeOpacity="0.3" className="pulse-ring3"/>

          {/* Exosome body */}
          <circle cx="260" cy="260" r="28" fill="url(#exoGrad)" filter="url(#strongGlow)" opacity="0.9"/>
          <circle cx="260" cy="260" r="20" fill="none" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.4"/>

          {/* Surface proteins */}
          {[0,45,90,135,180,225,270,315].map((deg, i) => {
            const rad = (deg * Math.PI) / 180;
            const x1 = 260 + Math.cos(rad) * 28;
            const y1 = 260 + Math.sin(rad) * 28;
            const x2 = 260 + Math.cos(rad) * 36;
            const y2 = 260 + Math.sin(rad) * 36;
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#00d4ff" strokeWidth="2" strokeLinecap="round"/>;
          })}

          {/* Center cross */}
          <text x="260" y="264" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold" fontFamily="monospace">EXO</text>
        </g>

        {/* Corner data readouts */}
        <text x="30" y="50" fill="#00ff88" fontSize="8" fontFamily="monospace" opacity="0.6">SCAN: ACTIVE</text>
        <text x="30" y="62" fill="#00ff88" fontSize="8" fontFamily="monospace" opacity="0.6">FREQ: 2.4GHz</text>
        <text x="380" y="490" fill="#00d4ff" fontSize="8" fontFamily="monospace" opacity="0.6">PARTICLES: 2.4K</text>
        <text x="380" y="502" fill="#00d4ff" fontSize="8" fontFamily="monospace" opacity="0.6">RANGE: 30-150nm</text>
      </svg>
    </div>
  );
}

// ── Particle Background ──────────────────────────────────────────────────────
function ParticleField() {
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 8 + 4,
    delay: Math.random() * 6,
    opacity: Math.random() * 0.5 + 0.1,
  }));

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      <style>{`
        @keyframes particleFloat {
          0%,100% { transform: translateY(0px) translateX(0px); opacity: var(--op); }
          33% { transform: translateY(-30px) translateX(10px); opacity: calc(var(--op) * 1.5); }
          66% { transform: translateY(-15px) translateX(-8px); opacity: calc(var(--op) * 0.7); }
        }
      `}</style>
      {particles.map(p => (
        <div key={p.id} style={{
          position: "absolute",
          left: `${p.x}%`,
          top: `${p.y}%`,
          width: `${p.size}px`,
          height: `${p.size}px`,
          borderRadius: "50%",
          background: p.id % 3 === 0 ? "#00ff88" : p.id % 3 === 1 ? "#00d4ff" : "#ffffff",
          "--op": p.opacity,
          animation: `particleFloat ${p.duration}s ease-in-out infinite ${p.delay}s`,
          boxShadow: `0 0 ${p.size * 3}px currentColor`,
        } as React.CSSProperties}/>
      ))}
    </div>
  );
}

// ── Scrolling Ticker ─────────────────────────────────────────────────────────
function DataTicker() {
  const items = [
    "CD63+ • CD81+ • CD9+", "Size: 30-150nm", "Zeta Potential: -12 to -30mV",
    "Protein Cargo: TSG101", "miRNA: hsa-miR-21", "EXO-SCAN ACTIVE",
    "Particle Tracking Analysis", "Nanoparticle Tracking Analysis", "Western Blot Verified",
    "Transmission Electron Microscopy", "Flow Cytometry Validated", "CD63+ • CD81+ • CD9+",
  ];
  const text = items.join("  //  ");

  return (
    <div style={{ background: "#00ff88", overflow: "hidden", whiteSpace: "nowrap", padding: "8px 0" }}>
      <style>{`
        @keyframes tickerScroll {
          from { transform: translateX(100vw); }
          to   { transform: translateX(-200%); }
        }
        .ticker-text { animation: tickerScroll 25s linear infinite; display: inline-block; }
      `}</style>
      <span className="ticker-text" style={{
        fontFamily: "monospace",
        fontSize: "12px",
        fontWeight: 600,
        color: "#000",
        letterSpacing: "0.05em",
      }}>
        {text}  //  {text}
      </span>
    </div>
  );
}

// ── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ value, label, sub }: { value: string; label: string; sub: string }) {
  return (
    <div style={{
      textAlign: "center",
      padding: "32px 24px",
      borderLeft: "1px solid rgba(0,255,136,0.2)",
    }}>
      <div style={{ fontSize: "48px", fontWeight: 800, color: "#00ff88", fontFamily: "monospace", lineHeight: 1 }}>
        {value}
      </div>
      <div style={{ fontSize: "14px", color: "#fff", fontWeight: 600, marginTop: "8px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
        {label}
      </div>
      <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", marginTop: "4px" }}>
        {sub}
      </div>
    </div>
  );
}

// ── Analysis Card ────────────────────────────────────────────────────────────
function AnalysisCard({ icon, title, description, tag }: {
  icon: string; title: string; description: string; tag: string;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "rgba(0,255,136,0.06)" : "rgba(255,255,255,0.03)",
        border: hovered ? "1px solid rgba(0,255,136,0.4)" : "1px solid rgba(255,255,255,0.08)",
        borderRadius: "4px",
        padding: "28px 24px",
        transition: "all 0.25s ease",
        cursor: "default",
        transform: hovered ? "translateY(-4px)" : "none",
      }}
    >
      <div style={{ fontSize: "28px", marginBottom: "14px" }}>{icon}</div>
      <div style={{
        display: "inline-block",
        background: "rgba(0,212,255,0.15)",
        border: "1px solid rgba(0,212,255,0.3)",
        color: "#00d4ff",
        fontSize: "10px",
        fontFamily: "monospace",
        letterSpacing: "0.1em",
        padding: "2px 8px",
        borderRadius: "2px",
        marginBottom: "12px",
        textTransform: "uppercase",
      }}>{tag}</div>
      <h3 style={{ color: "#fff", fontSize: "16px", fontWeight: 700, margin: "0 0 10px 0" }}>{title}</h3>
      <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "14px", lineHeight: 1.6, margin: 0 }}>{description}</p>
    </div>
  );
}

// ── Main Component ───────────────────────────────────────────────────────────
export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("markers");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const markerData = [
    { name: "CD63", level: 92, status: "Positive" },
    { name: "CD81", level: 87, status: "Positive" },
    { name: "CD9",  level: 78, status: "Positive" },
    { name: "TSG101", level: 95, status: "Confirmed" },
    { name: "ALIX",  level: 83, status: "Confirmed" },
  ];

  const sizeData = [
    { range: "30-60nm", pct: 18 },
    { range: "60-90nm", pct: 34 },
    { range: "90-120nm", pct: 28 },
    { range: "120-150nm", pct: 14 },
    { range: ">150nm",  pct: 6 },
  ];

  return (
    <div style={{ background: "#000", minHeight: "100vh", fontFamily: "'Inter','Helvetica Neue',sans-serif", color: "#fff" }}>

      {/* ── Nav ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled ? "rgba(0,0,0,0.95)" : "transparent",
        borderBottom: scrolled ? "1px solid rgba(0,255,136,0.2)" : "1px solid transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        transition: "all 0.3s ease",
        padding: "0 48px",
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663126495647/FDJ5hrYjuWWT9pWZoFgQus/exoinfo-logo_03a8e7fd.png" alt="ExoInfo.org" style={{ height: "40px", width: "auto", filter: "brightness(0) invert(1)" }} />
          </div>
          <div style={{ display: "flex", gap: "32px" }}>
            {["Analysis", "Protocols", "Research", "About"].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} style={{
                color: "rgba(255,255,255,0.6)",
                textDecoration: "none",
                fontSize: "14px",
                letterSpacing: "0.05em",
                transition: "color 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "#00ff88")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
              >{item}</a>
            ))}
          </div>
          <a href="#analysis" style={{
            background: "transparent",
            border: "1px solid #00ff88",
            color: "#00ff88",
            padding: "8px 20px",
            borderRadius: "2px",
            fontSize: "13px",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            textDecoration: "none",
            transition: "all 0.2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "#00ff88"; e.currentTarget.style.color = "#000"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#00ff88"; }}
          >Analyze Now</a>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section style={{
        minHeight: "100vh",
        background: "radial-gradient(ellipse at 60% 50%, rgba(0,255,136,0.05) 0%, #000 60%)",
        display: "flex",
        alignItems: "center",
        padding: "100px 48px 60px",
        position: "relative",
        overflow: "hidden",
      }}>
        <ParticleField/>
        {/* Grid overlay */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "linear-gradient(rgba(0,255,136,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}/>

        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", alignItems: "center", gap: "80px", position: "relative", zIndex: 1 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Status badge */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "28px" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#00ff88", boxShadow: "0 0 10px #00ff88", animation: "pulse 2s infinite" }}/>
              <span style={{ fontFamily: "monospace", fontSize: "12px", color: "#00ff88", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                Exosome Analysis Platform — Active
              </span>
            </div>

            <h1 style={{ fontSize: "clamp(40px,5vw,68px)", fontWeight: 900, lineHeight: 1.05, margin: "0 0 24px 0", letterSpacing: "-0.02em" }}>
              See What's Inside<br/>
              <span style={{ color: "#00ff88" }}>Every Exosome</span>
            </h1>

            <p style={{ fontSize: "18px", color: "rgba(255,255,255,0.6)", lineHeight: 1.7, margin: "0 0 40px 0", maxWidth: "500px" }}>
              Real-time biomarker detection, nanoparticle sizing, and cargo profiling. Built for researchers who need answers in minutes, not months.
            </p>

            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "48px" }}>
              <a href="#analysis" style={{
                background: "#00ff88",
                color: "#000",
                padding: "14px 32px",
                borderRadius: "2px",
                fontSize: "15px",
                fontWeight: 700,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                textDecoration: "none",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
              >Start Analysis</a>
              <a href="#research" style={{
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.25)",
                color: "#fff",
                padding: "14px 32px",
                borderRadius: "2px",
                fontSize: "15px",
                fontWeight: 600,
                letterSpacing: "0.05em",
                textDecoration: "none",
                transition: "border-color 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(0,255,136,0.5)")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)")}
              >View Research</a>
            </div>

            {/* Badges */}
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              {["NTA Validated", "ISO 15189", "MISEV2023 Compliant", "HIPAA"].map(badge => (
                <span key={badge} style={{
                  fontFamily: "monospace",
                  fontSize: "11px",
                  color: "rgba(0,255,136,0.8)",
                  border: "1px solid rgba(0,255,136,0.25)",
                  padding: "4px 10px",
                  borderRadius: "2px",
                  letterSpacing: "0.05em",
                }}>{badge}</span>
              ))}
            </div>
          </div>

          <RadarVisualization/>
        </div>
      </section>

      {/* ── Ticker ── */}
      <DataTicker/>

      {/* ── Stats ── */}
      <section style={{ background: "#080808", borderBottom: "1px solid rgba(0,255,136,0.1)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)" }}>
          <StatCard value="2,400+" label="Samples Analyzed" sub="Across 14 tissue types"/>
          <StatCard value="99.2%" label="Detection Accuracy" sub="vs. gold standard NTA"/>
          <StatCard value="< 8min" label="Time to Result" sub="From sample to report"/>
          <StatCard value="147" label="Biomarkers Tracked" sub="Surface + cargo profiling"/>
        </div>
      </section>

      {/* ── Live Analyzer ── */}
      <section id="analysis" style={{ padding: "96px 48px", background: "#000" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ marginBottom: "16px" }}>
            <span style={{ fontFamily: "monospace", fontSize: "11px", color: "#00ff88", letterSpacing: "0.15em", textTransform: "uppercase" }}>// Live Demo</span>
          </div>
          <h2 style={{ fontSize: "42px", fontWeight: 800, margin: "0 0 16px 0" }}>Interactive Analyzer</h2>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "16px", maxWidth: "500px", margin: "0 0 48px 0", lineHeight: 1.6 }}>
            Explore real exosome characterization data. Switch between marker expression, size distribution, and cargo analysis.
          </p>

          {/* Tab bar */}
          <div style={{ display: "flex", borderBottom: "1px solid rgba(255,255,255,0.1)", marginBottom: "40px", gap: "0" }}>
            {[
              { id: "markers", label: "Surface Markers" },
              { id: "size", label: "Size Distribution" },
              { id: "cargo", label: "Cargo Profile" },
            ].map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                background: "none",
                border: "none",
                borderBottom: activeTab === tab.id ? "2px solid #00ff88" : "2px solid transparent",
                color: activeTab === tab.id ? "#00ff88" : "rgba(255,255,255,0.4)",
                padding: "12px 24px",
                fontSize: "14px",
                fontWeight: 600,
                cursor: "pointer",
                letterSpacing: "0.05em",
                transition: "all 0.2s",
              }}>{tab.label}</button>
            ))}
          </div>

          {/* Tab content */}
          {activeTab === "markers" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", alignItems: "center" }}>
              <div>
                {markerData.map(m => (
                  <div key={m.name} style={{ marginBottom: "20px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                      <span style={{ fontFamily: "monospace", fontSize: "13px", color: "#fff", fontWeight: 600 }}>{m.name}</span>
                      <span style={{ fontFamily: "monospace", fontSize: "12px", color: "#00ff88" }}>{m.level}% • {m.status}</span>
                    </div>
                    <div style={{ height: "6px", background: "rgba(255,255,255,0.08)", borderRadius: "3px" }}>
                      <div style={{ height: "100%", width: `${m.level}%`, background: "linear-gradient(90deg, #00ff88, #00d4ff)", borderRadius: "3px", boxShadow: "0 0 8px rgba(0,255,136,0.4)", transition: "width 1s ease" }}/>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ background: "rgba(0,255,136,0.04)", border: "1px solid rgba(0,255,136,0.15)", borderRadius: "4px", padding: "28px" }}>
                <div style={{ fontFamily: "monospace", fontSize: "12px", color: "#00ff88", marginBottom: "16px", letterSpacing: "0.1em" }}>ANALYSIS SUMMARY</div>
                <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.7)", lineHeight: 1.8 }}>
                  <div>• Sample meets MISEV2023 criteria</div>
                  <div>• Tetraspanin co-expression confirmed</div>
                  <div>• Minimal contamination detected</div>
                  <div>• Purity score: <span style={{ color: "#00ff88" }}>94.7/100</span></div>
                  <div>• Recommended use: <span style={{ color: "#00d4ff" }}>Therapeutic grade</span></div>
                </div>
              </div>
            </div>
          )}
          {activeTab === "size" && (
            <div>
              <div style={{ display: "flex", alignItems: "flex-end", gap: "12px", height: "200px", marginBottom: "16px" }}>
                {sizeData.map(d => (
                  <div key={d.range} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontFamily: "monospace", fontSize: "11px", color: "#00ff88" }}>{d.pct}%</span>
                    <div style={{ width: "100%", height: `${d.pct * 4}px`, background: "linear-gradient(180deg, #00ff88, #00d4ff)", borderRadius: "2px 2px 0 0", boxShadow: "0 0 12px rgba(0,255,136,0.3)" }}/>
                    <span style={{ fontFamily: "monospace", fontSize: "10px", color: "rgba(255,255,255,0.4)", textAlign: "center" }}>{d.range}</span>
                  </div>
                ))}
              </div>
              <div style={{ fontFamily: "monospace", fontSize: "12px", color: "rgba(255,255,255,0.4)", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "16px" }}>
                Mode diameter: 82nm  •  Mean: 91nm  •  PDI: 0.14  •  Method: NTA
              </div>
            </div>
          )}
          {activeTab === "cargo" && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "16px" }}>
              {[
                { name: "miR-21-5p", type: "miRNA", level: "High", color: "#00ff88" },
                { name: "miR-126",   type: "miRNA", level: "Medium", color: "#00d4ff" },
                { name: "HSP70",     type: "Protein", level: "High", color: "#00ff88" },
                { name: "GAPDH",     type: "Protein", level: "Low", color: "rgba(255,255,255,0.4)" },
                { name: "VEGF mRNA", type: "mRNA", level: "Detected", color: "#00d4ff" },
                { name: "PTEN",      type: "Protein", level: "High", color: "#00ff88" },
              ].map(c => (
                <div key={c.name} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "4px", padding: "20px" }}>
                  <div style={{ fontFamily: "monospace", fontSize: "11px", color: "rgba(255,255,255,0.4)", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.1em" }}>{c.type}</div>
                  <div style={{ fontWeight: 700, fontSize: "15px", marginBottom: "6px" }}>{c.name}</div>
                  <div style={{ fontFamily: "monospace", fontSize: "12px", color: c.color }}>{c.level}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Features ── */}
      <section id="research" style={{ padding: "96px 48px", background: "#050505" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ marginBottom: "16px" }}>
            <span style={{ fontFamily: "monospace", fontSize: "11px", color: "#00ff88", letterSpacing: "0.15em", textTransform: "uppercase" }}>// Capabilities</span>
          </div>
          <h2 style={{ fontSize: "42px", fontWeight: 800, margin: "0 0 60px 0" }}>Powered by<br/><span style={{ color: "#00ff88" }}>Precision Science</span></h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "2px" }}>
            {[
              { icon: "🎯", tag: "DETECTION", title: "Biomarker Fingerprinting", desc: "147 surface markers detected simultaneously via multi-channel flow cytometry and NTA cross-validation." },
              { icon: "📐", tag: "SIZING", title: "Nanoparticle Sizing", desc: "Sub-nanometer resolution from 20nm to 1μm. PDI, mode, mean, and full distribution curves in one pass." },
              { icon: "🧬", tag: "CARGO", title: "Cargo Profiling", desc: "miRNA, mRNA, protein, and lipid cargo identified. Functional pathway enrichment analysis included." },
              { icon: "⚡", tag: "SPEED", title: "8-Minute Results", desc: "From raw sample to full characterization report in under 8 minutes. No overnight runs, no waiting queues." },
              { icon: "🔬", tag: "VALIDATION", title: "MISEV2023 Compliant", desc: "Every result checked against current ISEV minimal information criteria. Non-compliant samples flagged automatically." },
              { icon: "📊", tag: "REPORTING", title: "Publication-Ready Output", desc: "Exportable figures, tables, and supplementary data formatted to Nature, Cell, and JEV standards." },
            ].map(f => (
              <AnalysisCard key={f.title} {...f}/>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section style={{ padding: "96px 48px", background: "#000" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
          <div style={{ marginBottom: "16px" }}>
            <span style={{ fontFamily: "monospace", fontSize: "11px", color: "#00ff88", letterSpacing: "0.15em", textTransform: "uppercase" }}>// Workflow</span>
          </div>
          <h2 style={{ fontSize: "42px", fontWeight: 800, margin: "0 0 64px 0" }}>Three Steps to<br/><span style={{ color: "#00ff88" }}>Full Characterization</span></h2>
          <div style={{ display: "flex", gap: "0", position: "relative" }}>
            <div style={{ position: "absolute", top: "36px", left: "calc(16.7% + 36px)", right: "calc(16.7% + 36px)", height: "1px", background: "linear-gradient(90deg, #00ff88, #00d4ff, #00ff88)", opacity: 0.4 }}/>
            {[
              { n: "01", title: "Submit Sample", desc: "Upload your NTA data, flow cytometry output, or raw particle measurements in any major format." },
              { n: "02", title: "AI Analysis", desc: "Our engine cross-references against 2,400+ characterized samples, applies MISEV standards, and scores purity." },
              { n: "03", title: "Get Report", desc: "Download your full characterization report with all figures, statistics, and regulatory-grade documentation." },
            ].map(step => (
              <div key={step.n} style={{ flex: 1, padding: "0 24px", position: "relative", zIndex: 1 }}>
                <div style={{
                  width: "72px", height: "72px", borderRadius: "4px",
                  background: "linear-gradient(135deg, #00ff88, #00d4ff)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 20px",
                  boxShadow: "0 0 30px rgba(0,255,136,0.3)",
                }}>
                  <span style={{ fontFamily: "monospace", fontSize: "22px", fontWeight: 800, color: "#000" }}>{step.n}</span>
                </div>
                <h3 style={{ color: "#fff", fontSize: "18px", fontWeight: 700, margin: "0 0 12px 0" }}>{step.title}</h3>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px", lineHeight: 1.7, margin: 0 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{
        padding: "96px 48px",
        background: "radial-gradient(ellipse at 50% 50%, rgba(0,255,136,0.08) 0%, #000 70%)",
        textAlign: "center",
        borderTop: "1px solid rgba(0,255,136,0.15)",
      }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <div style={{ fontFamily: "monospace", fontSize: "11px", color: "#00ff88", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "20px" }}>
            // Ready to Analyze
          </div>
          <h2 style={{ fontSize: "48px", fontWeight: 900, margin: "0 0 20px 0", lineHeight: 1.1 }}>
            Know Your<br/><span style={{ color: "#00ff88" }}>Exosomes</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "16px", lineHeight: 1.7, margin: "0 0 40px 0" }}>
            Join 340 research groups using exoinfo to validate and characterize extracellular vesicles.
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
            <a href="#analysis" style={{
              background: "#00ff88", color: "#000", padding: "16px 40px",
              borderRadius: "2px", fontSize: "15px", fontWeight: 700,
              letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity="0.85")}
            onMouseLeave={e => (e.currentTarget.style.opacity="1")}
            >Start Free Analysis</a>
            <a href="mailto:info@exoinfo.org" style={{
              border: "1px solid rgba(255,255,255,0.2)", color: "#fff",
              padding: "16px 40px", borderRadius: "2px", fontSize: "15px",
              fontWeight: 600, textDecoration: "none", transition: "border-color 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.borderColor="rgba(0,255,136,0.5)")}
            onMouseLeave={e => (e.currentTarget.style.borderColor="rgba(255,255,255,0.2)")}
            >Contact Team</a>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ background: "#000", borderTop: "1px solid rgba(0,255,136,0.1)", padding: "60px 48px 40px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "48px", marginBottom: "48px" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663126495647/FDJ5hrYjuWWT9pWZoFgQus/exoinfo-logo_03a8e7fd.png" alt="ExoInfo.org" style={{ height: "36px", width: "auto", filter: "brightness(0) invert(1)" }} />
              </div>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px", lineHeight: 1.7, margin: 0 }}>
                Precision exosome characterization for the next generation of extracellular vesicle research.
              </p>
            </div>
            {[
              { title: "Platform", links: ["Analyzer", "Protocols", "API Access", "Integrations"] },
              { title: "Research", links: ["Publications", "Datasets", "Methods", "Standards"] },
              { title: "Company", links: ["About", "Contact", "Terms", "Privacy"] },
            ].map(col => (
              <div key={col.title}>
                <div style={{ color: "#00ff88", fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "16px", fontFamily: "monospace" }}>{col.title}</div>
                {col.links.map(link => (
                  <div key={link} style={{ marginBottom: "10px" }}>
                    <a href="#" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none", fontSize: "13px", transition: "color 0.2s" }}
                    onMouseEnter={e => (e.currentTarget.style.color="#fff")}
                    onMouseLeave={e => (e.currentTarget.style.color="rgba(255,255,255,0.4)")}
                    >{link}</a>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontFamily: "monospace", fontSize: "12px", color: "rgba(255,255,255,0.25)" }}>
              © 2026 exoinfo.org — Research use only
            </span>
            <span style={{ fontFamily: "monospace", fontSize: "11px", color: "rgba(0,255,136,0.4)" }}>
              v2.1.0 • MISEV2023
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
