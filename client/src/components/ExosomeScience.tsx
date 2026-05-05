import { useState } from "react";

export default function ExosomeScience() {
  const [activeSection, setActiveSection] = useState("definition");

  const sections = [
    { id: "definition", label: "Definition" },
    { id: "size", label: "Size & Isolation" },
    { id: "sources", label: "Sources" },
    { id: "characteristics", label: "Characteristics" },
    { id: "research", label: "Research" },
    { id: "cancer", label: "Cancer Exosomes" },
    { id: "therapeutics", label: "Therapeutics" },
  ];

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 28, fontWeight: 700, color: "#e2e8f0", marginBottom: 8 }}>
          What Are Exosomes?
        </h2>
        <p style={{ color: "#94a3b8", fontSize: 15, lineHeight: 1.6, maxWidth: 700 }}>
          For years, scientists classified exosomes as transporters of cellular waste. That view is now obsolete. Exosomes play a central role in intercellular communication, and their therapeutic potential is reshaping regenerative medicine.
        </p>
      </div>

      {/* Section Navigation */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveSection(s.id)}
            style={{
              padding: "8px 16px",
              borderRadius: 6,
              border: activeSection === s.id ? "1px solid #3b82f6" : "1px solid #334155",
              background: activeSection === s.id ? "rgba(59,130,246,0.15)" : "rgba(30,41,59,0.5)",
              color: activeSection === s.id ? "#60a5fa" : "#94a3b8",
              fontSize: 13,
              fontWeight: 500,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Content Sections */}
      <div style={{ background: "rgba(15,23,42,0.6)", border: "1px solid #1e293b", borderRadius: 12, padding: 32 }}>
        {activeSection === "definition" && (
          <div>
            <h3 style={{ fontSize: 22, fontWeight: 600, color: "#f1f5f9", marginBottom: 16 }}>Definition</h3>
            <p style={{ color: "#cbd5e1", fontSize: 15, lineHeight: 1.8, marginBottom: 16 }}>
              Exosomes are small extracellular vesicles ranging from 30 to 150 nanometers in diameter. They are present in virtually all eukaryotic fluids. Their function is to transfer DNA, RNA, and proteins between cells, directly altering the behavior of the cells that receive them.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginTop: 24 }}>
              <div style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.2)", borderRadius: 8, padding: 16, textAlign: "center" }}>
                <div style={{ fontSize: 24, fontWeight: 700, color: "#60a5fa" }}>30-150 nm</div>
                <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 4 }}>Diameter Range</div>
              </div>
              <div style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: 8, padding: 16, textAlign: "center" }}>
                <div style={{ fontSize: 24, fontWeight: 700, color: "#34d399" }}>DNA, RNA, Protein</div>
                <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 4 }}>Cargo Types</div>
              </div>
              <div style={{ background: "rgba(168,85,247,0.08)", border: "1px solid rgba(168,85,247,0.2)", borderRadius: 8, padding: 16, textAlign: "center" }}>
                <div style={{ fontSize: 24, fontWeight: 700, color: "#a78bfa" }}>All Eukaryotic</div>
                <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 4 }}>Cell Types</div>
              </div>
            </div>
          </div>
        )}

        {activeSection === "size" && (
          <div>
            <h3 style={{ fontSize: 22, fontWeight: 600, color: "#f1f5f9", marginBottom: 16 }}>Size and Isolation</h3>
            <p style={{ color: "#cbd5e1", fontSize: 15, lineHeight: 1.8, marginBottom: 16 }}>
              Exosome diameter ranges from 30 nm to 150 nm. Because of their low refractive index and sub-150 nm size, separating exosomes from similarly sized cells and vesicles requires precision. Isolation of pure populations depends on physical techniques based on size and density, combined with biochemical analysis methods.
            </p>
            <div style={{ background: "rgba(30,41,59,0.8)", borderRadius: 8, padding: 20, marginTop: 20 }}>
              <h4 style={{ color: "#e2e8f0", fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Isolation Techniques</h4>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
                {["Ultracentrifugation", "Size Exclusion Chromatography", "Density Gradient", "Immunoaffinity Capture", "Tangential Flow Filtration", "Microfluidics"].map((tech) => (
                  <div key={tech} style={{ background: "rgba(59,130,246,0.06)", border: "1px solid #1e293b", borderRadius: 6, padding: "10px 14px", color: "#94a3b8", fontSize: 13 }}>
                    {tech}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeSection === "sources" && (
          <div>
            <h3 style={{ fontSize: 22, fontWeight: 600, color: "#f1f5f9", marginBottom: 16 }}>Sources</h3>
            <p style={{ color: "#cbd5e1", fontSize: 15, lineHeight: 1.8, marginBottom: 20 }}>
              Exosomes are present in nearly all body fluids. Their composition reflects the donor cell type and physiological state.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12 }}>
              {[
                { fluid: "Blood", icon: "🩸" },
                { fluid: "Urine", icon: "🧪" },
                { fluid: "Saliva", icon: "💧" },
                { fluid: "Synovial Fluid", icon: "🦴" },
                { fluid: "Amniotic Fluid", icon: "🤰" },
                { fluid: "Breast Milk", icon: "🍼" },
                { fluid: "Semen", icon: "🔬" },
                { fluid: "Serum/Plasma", icon: "💉" },
                { fluid: "Cell Culture Media", icon: "🧫" },
                { fluid: "Vaginal Fluid", icon: "🔬" },
              ].map((item) => (
                <div key={item.fluid} style={{ background: "rgba(30,41,59,0.8)", border: "1px solid #1e293b", borderRadius: 8, padding: "14px 16px", display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 20 }}>{item.icon}</span>
                  <span style={{ color: "#cbd5e1", fontSize: 13 }}>{item.fluid}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === "characteristics" && (
          <div>
            <h3 style={{ fontSize: 22, fontWeight: 600, color: "#f1f5f9", marginBottom: 16 }}>Characteristics</h3>
            <p style={{ color: "#cbd5e1", fontSize: 15, lineHeight: 1.8, marginBottom: 20 }}>
              Exosomes share four consistent features across cell types.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
              {[
                { title: "Size Range", desc: "30 to 150 nm in diameter", color: "#3b82f6" },
                { title: "Ubiquitous Presence", desc: "Found in nearly all bodily fluids", color: "#10b981" },
                { title: "Universal Production", desc: "All eukaryotic cell types produce them", color: "#f59e0b" },
                { title: "Donor Cell Reflection", desc: "Properties directly reflect the donor cell that generated them", color: "#a78bfa" },
              ].map((item) => (
                <div key={item.title} style={{ background: "rgba(15,23,42,0.8)", border: `1px solid ${item.color}33`, borderRadius: 10, padding: 20 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: item.color, marginBottom: 12 }}></div>
                  <h4 style={{ color: "#e2e8f0", fontSize: 15, fontWeight: 600, marginBottom: 6 }}>{item.title}</h4>
                  <p style={{ color: "#94a3b8", fontSize: 13, lineHeight: 1.5 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === "research" && (
          <div>
            <h3 style={{ fontSize: 22, fontWeight: 600, color: "#f1f5f9", marginBottom: 16 }}>Research Landscape</h3>
            <p style={{ color: "#cbd5e1", fontSize: 15, lineHeight: 1.8, marginBottom: 16 }}>
              Scientific interest in exosomes has grown sharply over the past decade. For most of research history, exosomes were treated as extracellular byproducts. That changed as evidence accumulated showing their role in communication between healthy and diseased cells. Exosomes transfer proteins, DNA, mRNA, and non-coding RNAs between cells with high efficiency.
            </p>
            <div style={{ background: "rgba(30,41,59,0.8)", borderRadius: 8, padding: 20, marginTop: 20 }}>
              <h4 style={{ color: "#e2e8f0", fontSize: 14, fontWeight: 600, marginBottom: 16 }}>Publication Leaders</h4>
              <div style={{ display: "grid", gap: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", background: "rgba(59,130,246,0.06)", borderRadius: 6, border: "1px solid #1e293b" }}>
                  <span style={{ color: "#cbd5e1", fontSize: 14 }}>United States</span>
                  <span style={{ color: "#60a5fa", fontSize: 14, fontWeight: 600 }}>~40% of publications</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", background: "rgba(59,130,246,0.06)", borderRadius: 6, border: "1px solid #1e293b" }}>
                  <span style={{ color: "#cbd5e1", fontSize: 14 }}>China</span>
                  <span style={{ color: "#60a5fa", fontSize: 14, fontWeight: 600 }}>Second globally</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", background: "rgba(59,130,246,0.06)", borderRadius: 6, border: "1px solid #1e293b" }}>
                  <span style={{ color: "#cbd5e1", fontSize: 14 }}>Dr. Susanne Gabrielsson (Karolinska Institutet)</span>
                  <span style={{ color: "#60a5fa", fontSize: 14, fontWeight: 600 }}>Leading author ("exosome")</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", background: "rgba(59,130,246,0.06)", borderRadius: 6, border: "1px solid #1e293b" }}>
                  <span style={{ color: "#cbd5e1", fontSize: 14 }}>Unicyte AG / Prof. Giovanni Camussi</span>
                  <span style={{ color: "#60a5fa", fontSize: 14, fontWeight: 600 }}>100+ papers ("extracellular vesicles")</span>
                </div>
              </div>
            </div>
            <div style={{ marginTop: 20, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
              <div style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.2)", borderRadius: 8, padding: 16, textAlign: "center" }}>
                <div style={{ fontSize: 24, fontWeight: 700, color: "#60a5fa" }}>567+</div>
                <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 4 }}>Clinical Trials (ClinicalTrials.gov)</div>
              </div>
              <div style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: 8, padding: 16, textAlign: "center" }}>
                <div style={{ fontSize: 24, fontWeight: 700, color: "#34d399" }}>100+</div>
                <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 4 }}>Active Companies</div>
              </div>
              <div style={{ background: "rgba(168,85,247,0.08)", border: "1px solid rgba(168,85,247,0.2)", borderRadius: 8, padding: 16, textAlign: "center" }}>
                <div style={{ fontSize: 24, fontWeight: 700, color: "#a78bfa" }}>40%</div>
                <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 4 }}>US Research Share</div>
              </div>
            </div>
          </div>
        )}

        {activeSection === "cancer" && (
          <div>
            <h3 style={{ fontSize: 22, fontWeight: 600, color: "#f1f5f9", marginBottom: 16 }}>Cancer Exosomes</h3>
            <p style={{ color: "#cbd5e1", fontSize: 15, lineHeight: 1.8, marginBottom: 16 }}>
              Rapidly dividing cells, including all cancer types, release exosomes in high volumes. Cancer exosomes contribute to metastasis through intercellular signaling. On a cell-for-cell basis, cancer cells produce more exosomes than healthy cells.
            </p>
            <p style={{ color: "#cbd5e1", fontSize: 15, lineHeight: 1.8, marginBottom: 20 }}>
              Cancer exosomes carry protein structures on their surface, known as chaperones, that vary by cell type but are consistently present. Because these exosomes carry biomarkers specific to the cancer cells that produced them, they hold significant potential for theranostic applications, meaning patient-specific therapy guided by targeted diagnostic findings. They also hold strong potential for non-invasive cancer detection through liquid biopsies.
            </p>
            <div style={{ background: "rgba(30,41,59,0.8)", borderRadius: 8, padding: 20 }}>
              <h4 style={{ color: "#e2e8f0", fontSize: 14, fontWeight: 600, marginBottom: 16 }}>Three Primary Applications</h4>
              <div style={{ display: "grid", gap: 12 }}>
                {[
                  { num: "01", title: "Tumor Biology", desc: "Exosomes facilitate tumor formation, metastasis, angiogenesis, and immune evasion" },
                  { num: "02", title: "Diagnostics", desc: "Cancer exosomes serve as biomarkers in liquid biopsy diagnostic tools" },
                  { num: "03", title: "Treatment Selection", desc: "Inform treatment based on individual disease progression (theranostics)" },
                ].map((item) => (
                  <div key={item.num} style={{ display: "flex", gap: 16, padding: "14px 16px", background: "rgba(239,68,68,0.04)", borderRadius: 6, border: "1px solid rgba(239,68,68,0.15)" }}>
                    <span style={{ color: "#ef4444", fontSize: 18, fontWeight: 700, minWidth: 30 }}>{item.num}</span>
                    <div>
                      <div style={{ color: "#e2e8f0", fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{item.title}</div>
                      <div style={{ color: "#94a3b8", fontSize: 13, lineHeight: 1.5 }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeSection === "therapeutics" && (
          <div>
            <h3 style={{ fontSize: 22, fontWeight: 600, color: "#f1f5f9", marginBottom: 16 }}>Therapeutics</h3>
            <p style={{ color: "#cbd5e1", fontSize: 15, lineHeight: 1.8, marginBottom: 16 }}>
              Exosomes have earned significant attention as cell-free therapeutics. Mesenchymal stem cell (MSC)-derived exosomes suppress inflammation, prevent scar tissue formation, and regulate immune response. Where a disease results from a missing or defective protein or microRNA, a patient's exosomes can be isolated, modified with the appropriate siRNA or protein, and reintroduced for treatment.
            </p>
            <p style={{ color: "#cbd5e1", fontSize: 15, lineHeight: 1.8, marginBottom: 20 }}>
              More than one hundred companies now operate across exosome therapeutics, diagnostics, research products, and manufacturing platforms. The field is advancing rapidly from bench to clinical application.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginTop: 20 }}>
              {[
                { title: "Anti-Inflammatory", desc: "MSC-derived exosomes suppress inflammatory cascades", color: "#10b981" },
                { title: "Anti-Fibrotic", desc: "Prevent scar tissue formation in damaged tissues", color: "#3b82f6" },
                { title: "Immunomodulatory", desc: "Regulate immune response without immunosuppression", color: "#f59e0b" },
                { title: "Cargo Delivery", desc: "Load siRNA, proteins, or drugs for targeted therapy", color: "#a78bfa" },
              ].map((item) => (
                <div key={item.title} style={{ background: "rgba(15,23,42,0.8)", border: `1px solid ${item.color}33`, borderRadius: 10, padding: 20 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: item.color, marginBottom: 12 }}></div>
                  <h4 style={{ color: "#e2e8f0", fontSize: 15, fontWeight: 600, marginBottom: 6 }}>{item.title}</h4>
                  <p style={{ color: "#94a3b8", fontSize: 13, lineHeight: 1.5 }}>{item.desc}</p>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 24, padding: "16px 20px", background: "rgba(59,130,246,0.06)", border: "1px solid rgba(59,130,246,0.2)", borderRadius: 8 }}>
              <p style={{ color: "#94a3b8", fontSize: 13, lineHeight: 1.6 }}>
                <span style={{ color: "#60a5fa", fontWeight: 600 }}>Key Advantage Over Whole-Cell Therapy:</span> Exosomes bypass tumorigenicity and immunogenicity risks entirely since they are acellular. The paracrine/bystander effect they deliver is organ-nonspecific but therapeutically valuable for tissue support.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Source Attribution */}
      <div style={{ marginTop: 24, padding: "12px 16px", background: "rgba(30,41,59,0.4)", borderRadius: 8, border: "1px solid #1e293b" }}>
        <p style={{ color: "#64748b", fontSize: 12, lineHeight: 1.5 }}>
          Sources: BioInformant (bioinformant.com), ClinicalTrials.gov (567 registered exosome studies), PubMed. Content for educational purposes only. Not medical advice.
        </p>
      </div>
    </div>
  );
}
