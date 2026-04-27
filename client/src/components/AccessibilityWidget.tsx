import { useState, useEffect, useCallback } from "react";

/**
 * ADA Accessibility Widget
 * Provides font size adjustment, high contrast mode, dyslexia-friendly font,
 * reduced motion, link highlighting, and a text-spacing toggle.
 * Persists preferences in localStorage.
 */

const STORAGE_KEY = "ada-accessibility-prefs";

interface Prefs {
  fontSize: number; // 0 = default, 1 = large, 2 = x-large
  highContrast: boolean;
  dyslexiaFont: boolean;
  reducedMotion: boolean;
  highlightLinks: boolean;
  textSpacing: boolean;
}

const DEFAULT_PREFS: Prefs = {
  fontSize: 0,
  highContrast: false,
  dyslexiaFont: false,
  reducedMotion: false,
  highlightLinks: false,
  textSpacing: false,
};

function loadPrefs(): Prefs {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...DEFAULT_PREFS, ...JSON.parse(raw) };
  } catch { /* ignore */ }
  return { ...DEFAULT_PREFS };
}

function savePrefs(p: Prefs) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(p)); } catch { /* ignore */ }
}

const FONT_SIZES = ["100%", "115%", "130%"];
const FONT_LABELS = ["Default", "Large", "X-Large"];

export function AccessibilityWidget() {
  const [open, setOpen] = useState(false);
  const [prefs, setPrefs] = useState<Prefs>(loadPrefs);

  const applyPrefs = useCallback((p: Prefs) => {
    const root = document.documentElement;

    // Font size
    root.style.fontSize = FONT_SIZES[p.fontSize] || "100%";

    // High contrast
    if (p.highContrast) {
      root.classList.add("ada-high-contrast");
    } else {
      root.classList.remove("ada-high-contrast");
    }

    // Dyslexia font
    if (p.dyslexiaFont) {
      root.classList.add("ada-dyslexia-font");
    } else {
      root.classList.remove("ada-dyslexia-font");
    }

    // Reduced motion
    if (p.reducedMotion) {
      root.classList.add("ada-reduced-motion");
    } else {
      root.classList.remove("ada-reduced-motion");
    }

    // Highlight links
    if (p.highlightLinks) {
      root.classList.add("ada-highlight-links");
    } else {
      root.classList.remove("ada-highlight-links");
    }

    // Text spacing
    if (p.textSpacing) {
      root.classList.add("ada-text-spacing");
    } else {
      root.classList.remove("ada-text-spacing");
    }
  }, []);

  useEffect(() => {
    applyPrefs(prefs);
    savePrefs(prefs);
  }, [prefs, applyPrefs]);

  const update = (key: keyof Prefs, value: any) => {
    setPrefs(prev => ({ ...prev, [key]: value }));
  };

  const resetAll = () => {
    setPrefs({ ...DEFAULT_PREFS });
  };

  const cycleFontSize = () => {
    setPrefs(prev => ({ ...prev, fontSize: (prev.fontSize + 1) % 3 }));
  };

  const activeCount = [
    prefs.fontSize > 0,
    prefs.highContrast,
    prefs.dyslexiaFont,
    prefs.reducedMotion,
    prefs.highlightLinks,
    prefs.textSpacing,
  ].filter(Boolean).length;

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Accessibility Options"
        title="Accessibility Options"
        style={{
          position: "fixed",
          bottom: "96px",
          left: "20px",
          zIndex: 10000,
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          background: "#1a1a2e",
          border: "2px solid rgba(168,85,247,0.5)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
          transition: "all 0.3s ease",
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="4.5" r="2.5" />
          <path d="M12 7v5" />
          <path d="M8 10l4 2 4-2" />
          <path d="M9 20l3-5 3 5" />
        </svg>
        {activeCount > 0 && (
          <span style={{
            position: "absolute", top: "-4px", right: "-4px",
            width: "18px", height: "18px", borderRadius: "50%",
            background: "#a855f7", color: "#fff", fontSize: "10px",
            fontWeight: 700, display: "flex", alignItems: "center",
            justifyContent: "center",
          }}>{activeCount}</span>
        )}
      </button>

      {/* Panel */}
      {open && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setOpen(false)}
            style={{
              position: "fixed", inset: 0, zIndex: 9999,
              background: "rgba(0,0,0,0.3)",
            }}
          />
          <div
            role="dialog"
            aria-label="Accessibility Settings"
            style={{
              position: "fixed",
              bottom: "152px",
              left: "20px",
              zIndex: 10001,
              width: "320px",
              maxHeight: "70vh",
              overflowY: "auto",
              background: "#111118",
              border: "1px solid rgba(168,85,247,0.3)",
              borderRadius: "12px",
              boxShadow: "0 8px 40px rgba(0,0,0,0.6)",
              padding: "20px",
            }}
          >
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="4.5" r="2.5" />
                  <path d="M12 7v5" />
                  <path d="M8 10l4 2 4-2" />
                  <path d="M9 20l3-5 3 5" />
                </svg>
                <span style={{ fontSize: "15px", fontWeight: 700, color: "#fff" }}>Accessibility</span>
              </div>
              <button onClick={() => setOpen(false)} style={{
                background: "none", border: "none", color: "rgba(255,255,255,0.4)",
                cursor: "pointer", fontSize: "18px", padding: "4px",
              }}>&times;</button>
            </div>

            {/* Font Size */}
            <OptionRow
              icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 7V4h16v3"/><path d="M9 20h6"/><path d="M12 4v16"/></svg>}
              label="Text Size"
              value={FONT_LABELS[prefs.fontSize]}
              onClick={cycleFontSize}
              active={prefs.fontSize > 0}
            />

            {/* High Contrast */}
            <ToggleRow
              icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 2v20"/><path d="M12 2a10 10 0 0 1 0 20"/></svg>}
              label="High Contrast"
              checked={prefs.highContrast}
              onChange={(v) => update("highContrast", v)}
            />

            {/* Dyslexia Font */}
            <ToggleRow
              icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 7V4h16v3"/><path d="M9 20h6"/><path d="M12 4v16"/></svg>}
              label="Dyslexia-Friendly Font"
              checked={prefs.dyslexiaFont}
              onChange={(v) => update("dyslexiaFont", v)}
            />

            {/* Reduced Motion */}
            <ToggleRow
              icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>}
              label="Reduce Motion"
              checked={prefs.reducedMotion}
              onChange={(v) => update("reducedMotion", v)}
            />

            {/* Highlight Links */}
            <ToggleRow
              icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>}
              label="Highlight Links"
              checked={prefs.highlightLinks}
              onChange={(v) => update("highlightLinks", v)}
            />

            {/* Text Spacing */}
            <ToggleRow
              icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10H3"/><path d="M21 6H3"/><path d="M21 14H3"/><path d="M21 18H3"/></svg>}
              label="Increase Text Spacing"
              checked={prefs.textSpacing}
              onChange={(v) => update("textSpacing", v)}
            />

            {/* Reset */}
            <button
              onClick={resetAll}
              style={{
                width: "100%", marginTop: "16px",
                background: "rgba(239,68,68,0.1)",
                border: "1px solid rgba(239,68,68,0.25)",
                color: "#ef4444", padding: "10px",
                borderRadius: "8px", fontSize: "12px",
                fontWeight: 600, cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              Reset All Settings
            </button>

            <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.25)", margin: "12px 0 0", textAlign: "center" }}>
              ADA Accessibility Widget | WCAG 2.1 AA
            </p>
          </div>
        </>
      )}
    </>
  );
}

/* ── Sub-components ── */

function ToggleRow({ icon, label, checked, onChange }: {
  icon: React.ReactNode;
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.06)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <span style={{ color: checked ? "#a855f7" : "rgba(255,255,255,0.35)" }}>{icon}</span>
        <span style={{ fontSize: "13px", color: checked ? "#fff" : "rgba(255,255,255,0.6)" }}>{label}</span>
      </div>
      <button
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        style={{
          width: "40px", height: "22px", borderRadius: "11px",
          background: checked ? "#a855f7" : "rgba(255,255,255,0.1)",
          border: "none", cursor: "pointer", position: "relative",
          transition: "background 0.2s",
        }}
      >
        <span style={{
          position: "absolute", top: "2px",
          left: checked ? "20px" : "2px",
          width: "18px", height: "18px", borderRadius: "50%",
          background: "#fff", transition: "left 0.2s",
          boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
        }} />
      </button>
    </div>
  );
}

function OptionRow({ icon, label, value, onClick, active }: {
  icon: React.ReactNode;
  label: string;
  value: string;
  onClick: () => void;
  active: boolean;
}) {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.06)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <span style={{ color: active ? "#a855f7" : "rgba(255,255,255,0.35)" }}>{icon}</span>
        <span style={{ fontSize: "13px", color: active ? "#fff" : "rgba(255,255,255,0.6)" }}>{label}</span>
      </div>
      <button
        onClick={onClick}
        style={{
          background: active ? "rgba(168,85,247,0.15)" : "rgba(255,255,255,0.06)",
          border: `1px solid ${active ? "rgba(168,85,247,0.3)" : "rgba(255,255,255,0.1)"}`,
          color: active ? "#a855f7" : "rgba(255,255,255,0.5)",
          padding: "4px 12px", borderRadius: "6px", fontSize: "11px",
          fontWeight: 600, cursor: "pointer", transition: "all 0.2s",
        }}
      >
        {value}
      </button>
    </div>
  );
}
