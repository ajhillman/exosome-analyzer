import { useState, useEffect, useRef } from "react";

/**
 * Google Translate Widget
 * Loads the Google Translate Element script and renders an inline dropdown.
 * Wrapped in a floating button on the left side of the screen.
 */

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}

let scriptLoaded = false;
let scriptLoading = false;

function loadGoogleTranslateScript(): Promise<void> {
  if (scriptLoaded) return Promise.resolve();
  if (scriptLoading) {
    return new Promise((resolve) => {
      const check = setInterval(() => {
        if (scriptLoaded) { clearInterval(check); resolve(); }
      }, 200);
    });
  }
  scriptLoading = true;
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    script.onerror = () => { scriptLoading = false; reject(new Error("Failed to load Google Translate")); };
    document.head.appendChild(script);

    window.googleTranslateElementInit = () => {
      scriptLoaded = true;
      scriptLoading = false;
      resolve();
    };
  });
}

export function GoogleTranslateWidget() {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const initRef = useRef(false);

  useEffect(() => {
    if (!open || initRef.current) return;

    loadGoogleTranslateScript()
      .then(() => {
        if (containerRef.current && window.google?.translate?.TranslateElement) {
          // Clear any existing content
          containerRef.current.innerHTML = "";
          const innerDiv = document.createElement("div");
          innerDiv.id = "google_translate_element_inner";
          containerRef.current.appendChild(innerDiv);

          new window.google.translate.TranslateElement(
            {
              pageLanguage: "en",
              includedLanguages: "en,es,fr,de,pt,zh-CN,zh-TW,ja,ko,ar,hi,ru,it,nl,pl,vi,th,tr,uk,he",
              layout: window.google.translate.TranslateElement.InlineLayout.VERTICAL,
              autoDisplay: false,
            },
            "google_translate_element_inner"
          );
          initRef.current = true;
          setLoaded(true);
        }
      })
      .catch(() => {
        setError(true);
      });
  }, [open]);

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Translate Page"
        title="Translate Page"
        style={{
          position: "fixed",
          bottom: "36px",
          left: "20px",
          zIndex: 10000,
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          background: "#1a1a2e",
          border: "2px solid rgba(34,211,238,0.5)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
          transition: "all 0.3s ease",
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 8l6 6" />
          <path d="M4 14l6-6 2-3" />
          <path d="M2 5h12" />
          <path d="M7 2h1" />
          <path d="M22 22l-5-10-5 10" />
          <path d="M14 18h6" />
        </svg>
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
            aria-label="Translate Page"
            style={{
              position: "fixed",
              bottom: "92px",
              left: "20px",
              zIndex: 10001,
              width: "300px",
              background: "#111118",
              border: "1px solid rgba(34,211,238,0.3)",
              borderRadius: "12px",
              boxShadow: "0 8px 40px rgba(0,0,0,0.6)",
              padding: "20px",
            }}
          >
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 8l6 6" />
                  <path d="M4 14l6-6 2-3" />
                  <path d="M2 5h12" />
                  <path d="M7 2h1" />
                  <path d="M22 22l-5-10-5 10" />
                  <path d="M14 18h6" />
                </svg>
                <span style={{ fontSize: "15px", fontWeight: 700, color: "#fff" }}>Translate</span>
              </div>
              <button onClick={() => setOpen(false)} style={{
                background: "none", border: "none", color: "rgba(255,255,255,0.4)",
                cursor: "pointer", fontSize: "18px", padding: "4px",
              }}>&times;</button>
            </div>

            <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.45)", margin: "0 0 12px", lineHeight: 1.5 }}>
              Select a language to translate this page. Powered by Google Translate.
            </p>

            {/* Google Translate Container */}
            <div
              ref={containerRef}
              style={{
                minHeight: "40px",
                display: "flex",
                alignItems: "center",
              }}
            >
              {!loaded && !error && (
                <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)" }}>Loading translator...</span>
              )}
              {error && (
                <span style={{ fontSize: "12px", color: "#ef4444" }}>Failed to load Google Translate. Try refreshing.</span>
              )}
            </div>

            <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.2)", margin: "12px 0 0", textAlign: "center" }}>
              Translations are machine-generated and for reference only.
            </p>
          </div>
        </>
      )}

      {/* Override Google Translate default styles to match dark theme */}
      <style>{`
        .goog-te-gadget { font-family: inherit !important; color: rgba(255,255,255,0.6) !important; }
        .goog-te-gadget .goog-te-combo {
          background: rgba(168,85,247,0.06) !important;
          border: 1px solid rgba(34,211,238,0.3) !important;
          border-radius: 8px !important;
          padding: 8px 12px !important;
          color: #fff !important;
          font-size: 13px !important;
          width: 100% !important;
          outline: none !important;
          cursor: pointer !important;
        }
        .goog-te-gadget .goog-te-combo option {
          background: #111118 !important;
          color: #fff !important;
        }
        .goog-te-gadget > span { display: none !important; }
        .goog-te-banner-frame { display: none !important; }
        #goog-gt-tt { display: none !important; }
        .goog-te-balloon-frame { display: none !important; }
        body { top: 0 !important; }
        .skiptranslate { display: none !important; }
        .goog-te-spinner-pos { display: none !important; }
      `}</style>
    </>
  );
}
