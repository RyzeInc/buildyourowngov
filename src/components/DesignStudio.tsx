"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import html2canvas from "html2canvas-pro";
import {
  DESIGN_OPTIONS,
  DESIGN_PHASES,
  CATEGORY_COLORS,
  CATEGORY_LABELS,
  CIVIC_TRAITS,
  INTEREST_GROUPS,
  COMPATIBILITY_RULES,
  POLICY_SLIDERS,
  getInterestGroupSatisfaction,
  getCountryMatches,
  getGovernmentArchetype,
  getEmergentProperties,
  getGovernanceScores,
  getGeneratedMotto,
  getBannerGradient,
  getRiskAssessment,
  getHistoricalPrecedent,
  FLAG_EMOJI,
} from "@/data/constants";
import type { CivicTrait } from "@/data/types";
import AppIcon from "@/components/AppIcon";
import { Save, FolderOpen, Share2, Eye, Sparkles, History, BarChart2 } from "lucide-react";

const MAX_CIVICS = 3;
const PAGE_BG_COLOR = "#0F0F13";
const DESIGN_KEY = "byog-design";
const SAVES_KEY = "byog-saves";
const MAX_SAVES = 10;

export default function DesignStudio() {
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [sliders, setSliders] = useState<Record<string, number>>({
    pressFreedom: 50,
    civilRights: 50,
    politicalParticipation: 50,
  });
  const [civics, setCivics] = useState<string[]>([]);
  const [activePhase, setActivePhase] = useState(0);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [seedMode, setSeedMode] = useState(false);
  const [showSaves, setShowSaves] = useState(false);
  const [saves, setSaves] = useState<{
    name: string;
    timestamp: number;
    selections: Record<string, string>;
    sliders: Record<string, number>;
    civics: string[];
  }[]>([]);

  const handleSelect = useCallback((category: string, id: string) => {
    setSelections((prev) => {
      if (prev[category] === id) {
        const next = { ...prev };
        delete next[category];
        return next;
      }
      return { ...prev, [category]: id };
    });
  }, []);

  const handleSlider = useCallback((id: string, val: number) => {
    setSliders((prev) => ({ ...prev, [id]: val }));
  }, []);

  const handleCivic = useCallback((id: string) => {
    setCivics((prev) => {
      if (prev.includes(id)) return prev.filter((c) => c !== id);
      if (prev.length >= MAX_CIVICS) return prev;
      return [...prev, id];
    });
  }, []);

  const isCivicDisabled = useCallback(
    (trait: CivicTrait) => {
      if (civics.includes(trait.id)) return false;
      if (civics.length >= MAX_CIVICS) return true;
      if (trait.incompatible?.some((inc) => civics.includes(inc))) return true;
      return false;
    },
    [civics]
  );

  // ─── Persistence ───────────────────────────────────────────────────────────

  // Load from URL seed or localStorage on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const seed = params.get("d");
    if (seed) {
      try {
        const decoded = JSON.parse(decodeURIComponent(atob(seed)));
        if (decoded.selections && typeof decoded.selections === "object")
          setSelections(decoded.selections);
        if (decoded.sliders && typeof decoded.sliders === "object")
          setSliders((prev) => ({ ...prev, ...decoded.sliders }));
        if (Array.isArray(decoded.civics)) setCivics(decoded.civics);
        setSeedMode(true);
        return;
      } catch {
        // malformed seed — fall through to localStorage
      }
    }
    const saved = localStorage.getItem(DESIGN_KEY);
    if (!saved) return;
    try {
      const parsed = JSON.parse(saved);
      if (parsed.selections && typeof parsed.selections === "object")
        setSelections(parsed.selections);
      if (parsed.sliders && typeof parsed.sliders === "object")
        setSliders((prev) => ({ ...prev, ...parsed.sliders }));
      if (Array.isArray(parsed.civics)) setCivics(parsed.civics);
    } catch {
      // ignore malformed data
    }
  }, []);

  // Load saved design slots on mount
  useEffect(() => {
    const saved = localStorage.getItem(SAVES_KEY);
    if (!saved) return;
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) setSaves(parsed);
    } catch {}
  }, []);

  // Auto-save whenever state changes (skip in seed/read-only mode)
  useEffect(() => {
    if (seedMode) return;
    if (Object.keys(selections).length === 0 && civics.length === 0) return;
    localStorage.setItem(DESIGN_KEY, JSON.stringify({ selections, sliders, civics }));
  }, [selections, sliders, civics, seedMode]);

  const saveDesign = () => {
    const name = window.prompt("Name this design:");
    if (!name?.trim()) return;
    const newSave = { name: name.trim(), timestamp: Date.now(), selections, sliders, civics };
    const next = [newSave, ...saves].slice(0, MAX_SAVES);
    setSaves(next);
    localStorage.setItem(SAVES_KEY, JSON.stringify(next));
  };

  const loadSave = (save: (typeof saves)[0]) => {
    setSelections(save.selections);
    setSliders(save.sliders);
    setCivics(save.civics);
    setSeedMode(false);
    setShowSaves(false);
    setShowAnalysis(false);
    setActivePhase(0);
  };

  const deleteSave = (index: number) => {
    const next = saves.filter((_, i) => i !== index);
    setSaves(next);
    localStorage.setItem(SAVES_KEY, JSON.stringify(next));
  };

  const shareDesign = () => {
    try {
      const encoded = btoa(encodeURIComponent(JSON.stringify({ selections, sliders, civics })));
      const url = `${window.location.origin}${window.location.pathname}?tab=design&d=${encoded}`;
      if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(url).then(() => alert("Share URL copied to clipboard!"));
      } else {
        window.prompt("Copy this URL to share your design:", url);
      }
    } catch {
      alert("Failed to generate share URL.");
    }
  };

  const clearDesign = () => {
    if (!confirm("Reset all selections?")) return;
    setSelections({});
    setSliders({ pressFreedom: 50, civilRights: 50, politicalParticipation: 50 });
    setCivics([]);
    setSeedMode(false);
    setShowAnalysis(false);
    setActivePhase(0);
    localStorage.removeItem(DESIGN_KEY);
  };

  // ─── PNG export helpers ─────────────────────────────────────────────────────

  const crc32 = (data: Uint8Array): number => {
    const table = new Uint32Array(256);
    for (let i = 0; i < 256; i++) {
      let c = i;
      for (let j = 0; j < 8; j++) {
        c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
      }
      table[i] = c;
    }
    let crc = 0xFFFFFFFF;
    for (let i = 0; i < data.length; i++) {
      crc = table[(crc ^ data[i]) & 0xFF] ^ (crc >>> 8);
    }
    return (crc ^ 0xFFFFFFFF) >>> 0;
  };

  const addPngMetadata = (pngData: Uint8Array, keyword: string, text: string): Uint8Array => {
    const keywordBytes = new TextEncoder().encode(keyword);
    const textBytes = new TextEncoder().encode(text);
    const chunkData = new Uint8Array(keywordBytes.length + 1 + textBytes.length);
    chunkData.set(keywordBytes, 0);
    chunkData[keywordBytes.length] = 0; // null separator
    chunkData.set(textBytes, keywordBytes.length + 1);
    const length = chunkData.length;
    const lengthBytes = new Uint8Array(4);
    lengthBytes[0] = (length >> 24) & 0xFF;
    lengthBytes[1] = (length >> 16) & 0xFF;
    lengthBytes[2] = (length >> 8) & 0xFF;
    lengthBytes[3] = length & 0xFF;
    const typeBytes = new TextEncoder().encode("tEXt");
    const crcInput = new Uint8Array(typeBytes.length + chunkData.length);
    crcInput.set(typeBytes);
    crcInput.set(chunkData, typeBytes.length);
    const crc = crc32(crcInput);
    const crcBytes = new Uint8Array(4);
    crcBytes[0] = (crc >> 24) & 0xFF;
    crcBytes[1] = (crc >> 16) & 0xFF;
    crcBytes[2] = (crc >> 8) & 0xFF;
    crcBytes[3] = crc & 0xFF;
    const iendPos = pngData.length - 12;
    const result = new Uint8Array(
      pngData.length + lengthBytes.length + typeBytes.length + chunkData.length + crcBytes.length
    );
    result.set(pngData.subarray(0, iendPos), 0);
    result.set(lengthBytes, iendPos);
    result.set(typeBytes, iendPos + 4);
    result.set(chunkData, iendPos + 8);
    result.set(crcBytes, iendPos + 8 + chunkData.length);
    result.set(pngData.subarray(iendPos), iendPos + 8 + chunkData.length + 4);
    return result;
  };

  const exportScreenshot = async () => {
    // Make sure analysis is visible first
    if (!showAnalysis) {
      setShowAnalysis(true);
      await new Promise(requestAnimationFrame);
      await new Promise(requestAnimationFrame);
    }

    const container = document.getElementById("design-output");
    if (!container) return;

    await new Promise(requestAnimationFrame);

    const clone = container.cloneNode(true) as HTMLElement;
    clone.style.width = "900px";
    clone.style.maxWidth = "900px";

    const wrapper = document.createElement("div");
    wrapper.style.padding = "40px";
    wrapper.style.backgroundColor = PAGE_BG_COLOR;
    wrapper.style.display = "inline-block";
    wrapper.appendChild(clone);
    document.body.appendChild(wrapper);

    const canvas = await html2canvas(wrapper, {
      scale: 2,
      backgroundColor: PAGE_BG_COLOR,
      useCORS: true,
    });

    document.body.removeChild(wrapper);

    // Embed design metadata into the PNG
    const metadata = JSON.stringify({
      selections,
      sliders,
      civics,
      archetype: archetype.name,
      timestamp: new Date().toISOString(),
    });

    const pngDataUrl = canvas.toDataURL("image/png");
    const base64Data = pngDataUrl.split(",")[1];
    const binaryString = atob(base64Data);
    const uint8Array = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      uint8Array[i] = binaryString.charCodeAt(i);
    }

    const modifiedArray = addPngMetadata(uint8Array, "byog-design", metadata);
    const finalBlob = new Blob([modifiedArray.buffer as ArrayBuffer], { type: "image/png" });

    const link = document.createElement("a");
    const acronym = archetype.name
      .split(/\s+/)
      .map((w: string) => w[0])
      .join("")
      .toUpperCase();
    const date = new Date().toISOString().slice(0, 10);
    link.download = `byog-${acronym}-${date}.png`;
    link.href = URL.createObjectURL(finalBlob);
    link.click();
    URL.revokeObjectURL(link.href);
  };

  // Completion tracking
  const completedCategories = Object.keys(selections).length;
  const totalCategories = Object.keys(DESIGN_OPTIONS).length;
  const hasCivics = civics.length > 0;
  const overallProgress =
    (completedCategories + (hasCivics ? 1 : 0)) / (totalCategories + 1);

  // Analysis engine
  const archetype = useMemo(
    () => getGovernmentArchetype(selections, civics),
    [selections, civics]
  );
  const matches = useMemo(
    () => getCountryMatches(selections, sliders),
    [selections, sliders]
  );
  const satisfaction = useMemo(
    () => getInterestGroupSatisfaction(selections, sliders, civics),
    [selections, sliders, civics]
  );
  const compatAlerts = useMemo(() => {
    return COMPATIBILITY_RULES.filter((rule) =>
      rule.selections.every(
        ([cat, val]) => selections[cat] === val
      )
    );
  }, [selections]);

  // Uniqueness engine
  const emergentPerks = useMemo(
    () => getEmergentProperties(selections, civics, sliders),
    [selections, civics, sliders]
  );
  const govScores = useMemo(
    () => getGovernanceScores(selections, civics, sliders),
    [selections, civics, sliders]
  );
  const motto = useMemo(
    () => getGeneratedMotto(selections, civics, sliders),
    [selections, civics, sliders]
  );
  const bannerGradient = useMemo(
    () => getBannerGradient(selections, civics),
    [selections, civics]
  );
  const risks = useMemo(
    () => getRiskAssessment(selections, civics, sliders),
    [selections, civics, sliders]
  );
  const historicalPrecedent = useMemo(
    () => getHistoricalPrecedent(selections, civics),
    [selections, civics]
  );

  const currentPhase = DESIGN_PHASES[activePhase];

  return (
    <div style={{ animation: "fadeIn 0.3s ease" }}>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h2
          style={{
            margin: "0 0 6px",
            fontSize: 22,
            fontWeight: 700,
            color: "#fff",
            letterSpacing: "-0.02em",
            fontFamily: "var(--font-fraunces)",
          }}
        >
          Government Design Studio
        </h2>
        <p
          style={{
            margin: 0,
            color: "rgba(255,255,255,0.45)",
            fontSize: 14,
            lineHeight: 1.5,
          }}
        >
          Build a government layer by layer — from authority foundations to civic
          identity. Inspired by real political science and strategy game
          mechanics.
        </p>
      </div>

      {/* Persistence Toolbar */}
      <div
        style={{
          display: "flex",
          gap: 8,
          alignItems: "center",
          marginBottom: 16,
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={saveDesign}
          disabled={completedCategories === 0 && civics.length === 0}
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 6,
            padding: "5px 12px",
            color: "rgba(255,255,255,0.7)",
            fontSize: 12,
            cursor: completedCategories === 0 && civics.length === 0 ? "not-allowed" : "pointer",
            opacity: completedCategories === 0 && civics.length === 0 ? 0.4 : 1,
            transition: "all 0.15s",
          }}
        >
          <Save size={12} style={{ flexShrink: 0 }} /> Save
        </button>
        <button
          onClick={() => setShowSaves((v) => !v)}
          style={{
            background: showSaves ? "rgba(139,92,246,0.15)" : "rgba(255,255,255,0.04)",
            border: `1px solid ${showSaves ? "rgba(139,92,246,0.4)" : "rgba(255,255,255,0.08)"}`,
            borderRadius: 6,
            padding: "5px 12px",
            color: showSaves ? "#C4B5FD" : "rgba(255,255,255,0.7)",
            fontSize: 12,
            cursor: "pointer",
            transition: "all 0.15s",
          }}
        >
          <FolderOpen size={12} style={{ flexShrink: 0 }} /> Saved{saves.length > 0 ? ` (${saves.length})` : ""}
        </button>
        <button
          onClick={shareDesign}
          disabled={completedCategories === 0}
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 6,
            padding: "5px 12px",
            color: "rgba(255,255,255,0.7)",
            fontSize: 12,
            cursor: completedCategories === 0 ? "not-allowed" : "pointer",
            opacity: completedCategories === 0 ? 0.4 : 1,
            transition: "all 0.15s",
          }}
        >
          <Share2 size={12} style={{ flexShrink: 0 }} /> Share
        </button>
        <button
          onClick={clearDesign}
          disabled={completedCategories === 0 && civics.length === 0}
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 6,
            padding: "5px 12px",
            color: "rgba(255,255,255,0.5)",
            fontSize: 12,
            cursor: completedCategories === 0 && civics.length === 0 ? "not-allowed" : "pointer",
            opacity: completedCategories === 0 && civics.length === 0 ? 0.4 : 1,
            transition: "all 0.15s",
          }}
        >
          ↩ Reset
        </button>
        <button
          onClick={exportScreenshot}
          disabled={completedCategories < 2}
          style={{
            background: completedCategories >= 2 ? "rgba(20,184,166,0.12)" : "rgba(255,255,255,0.04)",
            border: `1px solid ${completedCategories >= 2 ? "rgba(20,184,166,0.3)" : "rgba(255,255,255,0.08)"}`,
            borderRadius: 6,
            padding: "5px 12px",
            color: completedCategories >= 2 ? "#5EEAD4" : "rgba(255,255,255,0.3)",
            fontSize: 12,
            cursor: completedCategories < 2 ? "not-allowed" : "pointer",
            opacity: completedCategories < 2 ? 0.4 : 1,
            transition: "all 0.15s",
          }}
        >
          ⬇ Export Image
        </button>
        {seedMode && (
          <span
            style={{
              fontSize: 11,
              color: "#A855F7",
              background: "rgba(139,92,246,0.1)",
              border: "1px solid rgba(139,92,246,0.2)",
              borderRadius: 6,
              padding: "4px 10px",
            }}
          >
            <Eye size={11} style={{ flexShrink: 0 }} /> Viewing shared design
          </span>
        )}
      </div>

      {/* Saved Designs Panel */}
      {showSaves && (
        <div
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 10,
            padding: "14px 16px",
            marginBottom: 20,
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.4)",
              marginBottom: 12,
            }}
          >
            Saved Designs
          </div>
          {saves.length === 0 ? (
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", fontStyle: "italic" }}>
              No saved designs yet. Build something and hit Save.
            </div>
          ) : (
            saves.map((save, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "8px 0",
                  borderBottom:
                    i < saves.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                }}
              >
                <div>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", fontWeight: 500 }}>
                    {save.name}
                  </div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginTop: 2 }}>
                    {new Date(save.timestamp).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                    {" · "}
                    {Object.keys(save.selections).length} choices
                  </div>
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                  <button
                    onClick={() => loadSave(save)}
                    style={{
                      background: "rgba(139,92,246,0.15)",
                      border: "1px solid rgba(139,92,246,0.3)",
                      borderRadius: 6,
                      padding: "4px 10px",
                      color: "#C4B5FD",
                      fontSize: 11,
                      cursor: "pointer",
                    }}
                  >
                    Load
                  </button>
                  <button
                    onClick={() => deleteSave(i)}
                    style={{
                      background: "rgba(239,68,68,0.08)",
                      border: "1px solid rgba(239,68,68,0.15)",
                      borderRadius: 6,
                      padding: "4px 8px",
                      color: "#F87171",
                      fontSize: 11,
                      cursor: "pointer",
                    }}
                  >
                    ×
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Archetype Name Banner */}
      {completedCategories >= 2 && (
        <div
          style={{
            background:
              `linear-gradient(135deg, ${bannerGradient.from}, ${bannerGradient.to})`,
            border: "1px solid rgba(139,92,246,0.25)",
            borderRadius: 12,
            padding: "14px 18px",
            marginBottom: 20,
            animation: "fadeIn 0.4s ease",
          }}
        >
          <div
            style={{
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "rgba(255,255,255,0.4)",
              marginBottom: 4,
            }}
          >
            Your Government
          </div>
          <div
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: "#fff",
              fontFamily: "var(--font-fraunces)",
            }}
          >
            {archetype.name}
          </div>
          <div
            style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 2 }}
          >
            {archetype.desc}
          </div>
          <div
            style={{
              fontSize: 12,
              fontStyle: "italic",
              color: "rgba(255,255,255,0.55)",
              marginTop: 8,
              borderTop: "1px solid rgba(255,255,255,0.06)",
              paddingTop: 8,
            }}
          >
            &ldquo;{motto}&rdquo;
          </div>
          {emergentPerks.length > 0 && (
            <div style={{ display: "flex", gap: 6, marginTop: 8, flexWrap: "wrap" }}>
              {emergentPerks.map((p) => (
                <span
                  key={p.id}
                  style={{
                    fontSize: 10,
                    background: "rgba(245,158,11,0.15)",
                    color: "#FBBF24",
                    borderRadius: 4,
                    padding: "3px 8px",
                    fontWeight: 600,
                  }}
                >
                  <AppIcon name={p.icon} size={10} style={{ flexShrink: 0, opacity: 0.85 }} />{" "}{p.label}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Progress bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 20,
        }}
      >
        <div
          style={{
            flex: 1,
            height: 4,
            background: "rgba(255,255,255,0.06)",
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${overallProgress * 100}%`,
              height: "100%",
              background: "linear-gradient(90deg, #8B5CF6, #14B8A6)",
              borderRadius: 2,
              transition: "width 0.4s ease",
            }}
          />
        </div>
        <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>
          {Math.round(overallProgress * 100)}%
        </span>
      </div>

      {/* Phase Navigation */}
      <div
        style={{
          display: "flex",
          gap: 6,
          marginBottom: 24,
          overflowX: "auto",
          paddingBottom: 4,
        }}
      >
        {DESIGN_PHASES.map((phase, i) => {
          const isActive = !showAnalysis && i === activePhase;
          const phaseCategories = phase.categories;
          const phaseComplete =
            phase.id === "identity"
              ? civics.length > 0
              : phaseCategories.length > 0 &&
                phaseCategories.every((c) => selections[c]);
          return (
            <button
              key={phase.id}
              onClick={() => { setShowAnalysis(false); setActivePhase(i); }}
              style={{
                flex: "1 1 0",
                minWidth: 0,
                background: isActive
                  ? "rgba(139,92,246,0.15)"
                  : "rgba(255,255,255,0.02)",
                border: `1.5px solid ${isActive ? "#8B5CF6" : "rgba(255,255,255,0.06)"}`,
                borderRadius: 10,
                padding: "10px 12px",
                cursor: "pointer",
                transition: "all 0.2s ease",
                textAlign: "center",
              }}
            >
              <AppIcon name={phase.icon} size={14} style={{ marginBottom: 4 }} />
              <div style={{ fontSize: 11, fontWeight: 700, color: isActive ? "#8B5CF6" : "rgba(255,255,255,0.6)", letterSpacing: "0.02em" }}>{phase.label}</div>
              <div
                style={{
                  fontSize: 10,
                  color: phaseComplete
                    ? "#22C55E"
                    : "rgba(255,255,255,0.25)",
                  marginTop: 2,
                }}
              >
                {phaseComplete ? "✓ complete" : "○ pending"}
              </div>
            </button>
          );
        })}
        {/* Analysis tab */}
        <button
          onClick={() => setShowAnalysis(true)}
          style={{
            flex: "1 1 0",
            minWidth: 0,
            background: showAnalysis
              ? "rgba(20,184,166,0.15)"
              : "rgba(255,255,255,0.02)",
            border: `1.5px solid ${showAnalysis ? "#14B8A6" : "rgba(255,255,255,0.06)"}`,
            borderRadius: 10,
            padding: "10px 12px",
            cursor: "pointer",
            transition: "all 0.2s ease",
            textAlign: "center",
            opacity: completedCategories >= 2 ? 1 : 0.4,
          }}
          disabled={completedCategories < 2}
        >

          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: showAnalysis ? "#14B8A6" : "rgba(255,255,255,0.6)",
              letterSpacing: "0.02em",
            }}
          >
            Analysis
          </div>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", marginTop: 2 }}>
            {completedCategories >= 2 ? "→ view" : "pick 2+"}
          </div>
        </button>
      </div>

      {/* ─── PHASE CONTENT ─── */}
      {!showAnalysis && (
        <div key={currentPhase.id} style={{ animation: "fadeIn 0.25s ease" }}>
          <div style={{ marginBottom: 16 }}>
            <div
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: "#fff",
                marginBottom: 4,
                fontFamily: "var(--font-fraunces)",
              }}
            >
              <AppIcon name={currentPhase.icon} size={15} style={{ marginRight: 6, opacity: 0.9 }} />{currentPhase.label}
            </div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.45)" }}>
              {currentPhase.desc}
            </div>
          </div>

          {/* Categories for this phase */}
          {currentPhase.categories.map((category) => {
            const options = DESIGN_OPTIONS[category];
            const colors = CATEGORY_COLORS[category];
            if (!options || !colors) return null;
            return (
              <CategorySection
                key={category}
                category={category}
                options={options}
                colors={colors}
                label={CATEGORY_LABELS[category]}
                selected={selections[category]}
                onSelect={handleSelect}
              />
            );
          })}

          {/* Identity phase: sliders + civics */}
          {currentPhase.id === "identity" && (
            <>
              {/* Policy Sliders */}
              <div style={{ marginBottom: 28 }}>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#A855F7",
                    marginBottom: 14,
                  }}
                >
                  Policy Sliders
                </div>
                {POLICY_SLIDERS.map((s) => (
                  <div key={s.id} style={{ marginBottom: 16 }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 6,
                      }}
                    >
                      <div style={{ fontSize: 13, fontWeight: 600, color: "#fff", display: "flex", alignItems: "center", gap: 5 }}>
                        <AppIcon name={s.icon} size={14} />{s.label}
                      </div>
                      <div
                        style={{
                          fontSize: 12,
                          color: "rgba(255,255,255,0.4)",
                          fontVariantNumeric: "tabular-nums",
                        }}
                      >
                        {sliders[s.id]}
                      </div>
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: "rgba(255,255,255,0.35)",
                        marginBottom: 8,
                      }}
                    >
                      {s.desc}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 10,
                          color: "rgba(255,255,255,0.3)",
                          minWidth: 80,
                          textAlign: "right",
                        }}
                      >
                        {s.low}
                      </span>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={sliders[s.id]}
                        onChange={(e) =>
                          handleSlider(s.id, parseInt(e.target.value, 10))
                        }
                        style={{ flex: 1, accentColor: "#8B5CF6" }}
                      />
                      <span
                        style={{
                          fontSize: 10,
                          color: "rgba(255,255,255,0.3)",
                          minWidth: 80,
                        }}
                      >
                        {s.high}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Civic Traits */}
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    marginBottom: 14,
                  }}
                >
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "#14B8A6",
                    }}
                  >
                    Civic Traits — pick up to {MAX_CIVICS}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: "rgba(255,255,255,0.35)",
                    }}
                  >
                    {civics.length}/{MAX_CIVICS} selected
                  </div>
                </div>

                {(
                  ["governance", "social", "economic", "military"] as const
                ).map((cat) => {
                  const traits = CIVIC_TRAITS.filter(
                    (t) => t.category === cat
                  );
                  return (
                    <div key={cat} style={{ marginBottom: 16 }}>
                      <div
                        style={{
                          fontSize: 10,
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                          color: "rgba(255,255,255,0.3)",
                          marginBottom: 8,
                        }}
                      >
                        {cat}
                      </div>
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns:
                            "repeat(auto-fill, minmax(200px, 1fr))",
                          gap: 8,
                        }}
                      >
                        {traits.map((trait) => {
                          const selected = civics.includes(trait.id);
                          const disabled = isCivicDisabled(trait);
                          return (
                            <button
                              key={trait.id}
                              onClick={() => handleCivic(trait.id)}
                              disabled={disabled}
                              style={{
                                background: selected
                                  ? "rgba(20,184,166,0.12)"
                                  : "rgba(255,255,255,0.02)",
                                border: `1.5px solid ${selected ? "#14B8A6" : "rgba(255,255,255,0.06)"}`,
                                borderRadius: 10,
                                padding: "10px 12px",
                                cursor: disabled ? "not-allowed" : "pointer",
                                textAlign: "left",
                                opacity: disabled ? 0.35 : 1,
                                transition: "all 0.2s ease",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 5,
                                  marginBottom: 4,
                                }}
                              >
                                <AppIcon name={trait.icon} size={13} color={selected ? "#14B8A6" : "rgba(255,255,255,0.5)"} />
                                <span
                                  style={{
                                    fontSize: 12,
                                    fontWeight: 600,
                                    color: selected
                                      ? "#14B8A6"
                                      : "rgba(255,255,255,0.8)",
                                  }}
                                >
                                  {trait.label}
                                </span>
                              </div>
                              <div
                                style={{
                                  fontSize: 10,
                                  color: "rgba(255,255,255,0.35)",
                                  lineHeight: 1.4,
                                }}
                              >
                                {trait.desc}
                              </div>
                              {selected && (
                                <div
                                  style={{
                                    marginTop: 6,
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: 4,
                                  }}
                                >
                                  {trait.effects.map((e, i) => (
                                    <span
                                      key={i}
                                      style={{
                                        fontSize: 9,
                                        background: "rgba(20,184,166,0.15)",
                                        color: "#5EEAD4",
                                        borderRadius: 4,
                                        padding: "2px 6px",
                                      }}
                                    >
                                      {e}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* Nav buttons */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 24,
            }}
          >
            <button
              onClick={() => {
                setShowAnalysis(false);
                setActivePhase((p) => Math.max(0, p - 1));
              }}
              disabled={activePhase === 0}
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 8,
                padding: "8px 16px",
                color: "rgba(255,255,255,0.6)",
                fontSize: 12,
                cursor: activePhase === 0 ? "not-allowed" : "pointer",
                opacity: activePhase === 0 ? 0.3 : 1,
              }}
            >
              ← Previous
            </button>
            {activePhase < DESIGN_PHASES.length - 1 ? (
              <button
                onClick={() => setActivePhase((p) => p + 1)}
                style={{
                  background: "rgba(139,92,246,0.15)",
                  border: "1px solid rgba(139,92,246,0.3)",
                  borderRadius: 8,
                  padding: "8px 16px",
                  color: "#C4B5FD",
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Next →
              </button>
            ) : (
              <button
                onClick={() => setShowAnalysis(true)}
                disabled={completedCategories < 2}
                style={{
                  background:
                    completedCategories >= 2
                      ? "rgba(20,184,166,0.15)"
                      : "rgba(255,255,255,0.04)",
                  border: `1px solid ${completedCategories >= 2 ? "rgba(20,184,166,0.3)" : "rgba(255,255,255,0.08)"}`,
                  borderRadius: 8,
                  padding: "8px 16px",
                  color:
                    completedCategories >= 2
                      ? "#5EEAD4"
                      : "rgba(255,255,255,0.3)",
                  fontSize: 12,
                  fontWeight: 600,
                  cursor:
                    completedCategories >= 2 ? "pointer" : "not-allowed",
                }}
              >
                View Analysis →
              </button>
            )}
          </div>
        </div>
      )}

      {/* ─── ANALYSIS PANEL ─── */}
      {showAnalysis && completedCategories >= 2 && (
        <div style={{ animation: "fadeIn 0.3s ease" }}>
          <button
            onClick={() => setShowAnalysis(false)}
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 8,
              padding: "6px 14px",
              color: "rgba(255,255,255,0.5)",
              fontSize: 12,
              cursor: "pointer",
              marginBottom: 20,
            }}
          >
            ← Back to Builder
          </button>
          <div id="design-output">

          {/* Selection Summary */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
              marginBottom: 24,
            }}
          >
            {Object.entries(selections).map(([cat, id]) => {
              const opt = DESIGN_OPTIONS[cat]?.find((o) => o.id === id);
              const colors = CATEGORY_COLORS[cat];
              if (!opt || !colors) return null;
              return (
                <div
                  key={cat}
                  style={{
                    background: `${colors.accent}12`,
                    border: `1px solid ${colors.accent}30`,
                    borderRadius: 6,
                    padding: "6px 10px",
                    fontSize: 11,
                  }}
                >
                  <span style={{ color: colors.accent, fontWeight: 600 }}>
                    {CATEGORY_LABELS[cat]}:
                  </span>
                  <span
                    style={{ color: "rgba(255,255,255,0.7)", marginLeft: 4, display: "inline-flex", alignItems: "center", gap: 4 }}
                  >
                    <AppIcon name={opt.icon} size={11} />{opt.label}
                  </span>
                </div>
              );
            })}
            {civics.map((c) => {
              const trait = CIVIC_TRAITS.find((t) => t.id === c);
              if (!trait) return null;
              return (
                <div
                  key={c}
                  style={{
                    background: "rgba(20,184,166,0.1)",
                    border: "1px solid rgba(20,184,166,0.25)",
                    borderRadius: 6,
                    padding: "6px 10px",
                    fontSize: 11,
                  }}
                >
                  <span style={{ color: "#14B8A6", fontWeight: 600 }}>
                    Civic:
                  </span>
                  <span
                    style={{ color: "rgba(255,255,255,0.7)", marginLeft: 4, display: "inline-flex", alignItems: "center", gap: 4 }}
                  >
                    <AppIcon name={trait.icon} size={11} />{trait.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Compatibility Alerts */}
          {compatAlerts.length > 0 && (
            <div style={{ marginBottom: 24 }}>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.5)",
                  marginBottom: 10,
                }}
              >
                Compatibility Analysis
              </div>
              {compatAlerts.map((rule, i) => {
                const color =
                  rule.type === "synergy"
                    ? "#22C55E"
                    : rule.type === "tension"
                      ? "#F59E0B"
                      : "#EF4444";
                const icon =
                  rule.type === "synergy"
                    ? "✦"
                    : rule.type === "tension"
                      ? "⚠"
                      : "✖";
                return (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      gap: 10,
                      padding: "10px 14px",
                      background: `${color}08`,
                      border: `1px solid ${color}25`,
                      borderRadius: 8,
                      marginBottom: 6,
                      alignItems: "flex-start",
                    }}
                  >
                    <span style={{ color, fontSize: 14, flexShrink: 0 }}>
                      {icon}
                    </span>
                    <div>
                      <div
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                          color,
                          marginBottom: 2,
                        }}
                      >
                        {rule.type}
                      </div>
                      <div
                        style={{
                          fontSize: 12,
                          color: "rgba(255,255,255,0.6)",
                          lineHeight: 1.4,
                        }}
                      >
                        {rule.message}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
              marginBottom: 24,
            }}
          >
            {/* Interest Group Satisfaction */}
            <div
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 12,
                padding: "18px 20px",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.5)",
                  marginBottom: 14,
                }}
              >
                Interest Group Satisfaction
              </div>
              {INTEREST_GROUPS.map((ig) => {
                const val = satisfaction[ig.id] ?? 50;
                const barColor =
                  val >= 70
                    ? "#22C55E"
                    : val >= 40
                      ? "#F59E0B"
                      : "#EF4444";
                return (
                  <div key={ig.id} style={{ marginBottom: 10 }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 4,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 12,
                          color: "rgba(255,255,255,0.7)",
                        }}
                      >
                        <AppIcon name={ig.icon} size={12} style={{ flexShrink: 0 }} />{" "}{ig.label}
                      </span>
                      <span
                        style={{
                          fontSize: 11,
                          color: barColor,
                          fontWeight: 600,
                          fontVariantNumeric: "tabular-nums",
                        }}
                      >
                        {val}%
                      </span>
                    </div>
                    <div
                      style={{
                        height: 4,
                        background: "rgba(255,255,255,0.06)",
                        borderRadius: 2,
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          width: `${val}%`,
                          height: "100%",
                          background: barColor,
                          borderRadius: 2,
                          transition: "width 0.3s ease",
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Country Matches */}
            <div
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 12,
                padding: "18px 20px",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.5)",
                  marginBottom: 14,
                }}
              >
                Closest Real-World Matches
              </div>
              {matches.length === 0 && (
                <div
                  style={{
                    fontSize: 12,
                    color: "rgba(255,255,255,0.3)",
                    fontStyle: "italic",
                  }}
                >
                  Select more categories for matches
                </div>
              )}
              {matches.slice(0, 6).map((m) => (
                <div
                  key={m.country.code}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "8px 0",
                    borderBottom: "1px solid rgba(255,255,255,0.04)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <span style={{ fontSize: 16 }}>
                      {FLAG_EMOJI[m.country.code]}
                    </span>
                    <div>
                      <div
                        style={{
                          fontSize: 12,
                          color: "rgba(255,255,255,0.8)",
                          fontWeight: 500,
                        }}
                      >
                        {m.country.name}
                      </div>
                      <div
                        style={{
                          fontSize: 10,
                          color: "rgba(255,255,255,0.3)",
                          marginTop: 1,
                        }}
                      >
                        {m.matchingDimensions.slice(0, 3).join(", ")}
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color:
                        m.score >= 70
                          ? "#22C55E"
                          : m.score >= 40
                            ? "#F59E0B"
                            : "rgba(255,255,255,0.5)",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {m.score}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Policy Slider Readout */}
          <div
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 12,
              padding: "18px 20px",
              marginBottom: 24,
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.5)",
                marginBottom: 14,
              }}
            >
              Policy Position
            </div>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              {POLICY_SLIDERS.map((s) => {
                const val = sliders[s.id];
                return (
                  <div key={s.id} style={{ flex: "1 1 120px" }}>
                    <div
                      style={{
                        fontSize: 12,
                        color: "rgba(255,255,255,0.6)",
                        marginBottom: 4,
                      }}
                    >
                      <AppIcon name={s.icon} size={11} style={{ flexShrink: 0 }} />{" "}{s.label}
                    </div>
                    <div
                      style={{
                        height: 6,
                        background: "rgba(255,255,255,0.06)",
                        borderRadius: 3,
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          width: `${val}%`,
                          height: "100%",
                          background:
                            val >= 70
                              ? "#22C55E"
                              : val >= 40
                                ? "#F59E0B"
                                : "#EF4444",
                          borderRadius: 3,
                          transition: "width 0.3s ease",
                        }}
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: 2,
                      }}
                    >
                      <span
                        style={{ fontSize: 9, color: "rgba(255,255,255,0.2)" }}
                      >
                        {s.low}
                      </span>
                      <span
                        style={{
                          fontSize: 10,
                          color: "rgba(255,255,255,0.5)",
                          fontWeight: 600,
                        }}
                      >
                        {val}
                      </span>
                      <span
                        style={{ fontSize: 9, color: "rgba(255,255,255,0.2)" }}
                      >
                        {s.high}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Emergent Properties */}
          {emergentPerks.length > 0 && (
            <div
              style={{
                background: "rgba(245,158,11,0.04)",
                border: "1px solid rgba(245,158,11,0.15)",
                borderRadius: 12,
                padding: "18px 20px",
                marginBottom: 24,
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#FBBF24",
                  marginBottom: 14,
                }}
              >
                <Sparkles size={13} style={{ flexShrink: 0 }} /> Unlocked Emergent Properties
              </div>
              {emergentPerks.map((perk) => (
                <div
                  key={perk.id}
                  style={{
                    display: "flex",
                    gap: 12,
                    padding: "12px 14px",
                    background: "rgba(245,158,11,0.06)",
                    border: "1px solid rgba(245,158,11,0.12)",
                    borderRadius: 8,
                    marginBottom: 8,
                    alignItems: "flex-start",
                  }}
                >
                  <AppIcon name={perk.icon} size={18} style={{ flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: "#FBBF24",
                        marginBottom: 3,
                        fontFamily: "var(--font-fraunces)",
                      }}
                    >
                      {perk.label}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: "rgba(255,255,255,0.55)",
                        lineHeight: 1.5,
                      }}
                    >
                      {perk.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Governance Fingerprint */}
          <div
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 12,
              padding: "18px 20px",
              marginBottom: 24,
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.5)",
                marginBottom: 14,
              }}
            >
              Governance Fingerprint
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {(Object.entries(govScores) as [string, number][]).map(([key, val]) => {
                const labels: Record<string, string> = {
                  stability: "Stability",
                  legitimacy: "Legitimacy",
                  efficiency: "Efficiency",
                  adaptability: "Adaptability",
                  representation: "Representation",
                  accountability: "Accountability",
                };
                const info = { label: labels[key] || key };
                const color = val >= 70 ? "#22C55E" : val >= 40 ? "#F59E0B" : "#EF4444";
                return (
                  <div key={key}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 4,
                      }}
                    >
                      <span style={{ fontSize: 12, color: "rgba(255,255,255,0.7)" }}>
                        {info.label}
                      </span>
                      <span
                        style={{
                          fontSize: 11,
                          color,
                          fontWeight: 600,
                          fontVariantNumeric: "tabular-nums",
                        }}
                      >
                        {val}
                      </span>
                    </div>
                    <div
                      style={{
                        height: 6,
                        background: "rgba(255,255,255,0.06)",
                        borderRadius: 3,
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          width: `${val}%`,
                          height: "100%",
                          background: `linear-gradient(90deg, ${color}CC, ${color})`,
                          borderRadius: 3,
                          transition: "width 0.4s ease",
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Risk Assessment */}
          {risks.length > 0 && (
            <div
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 12,
                padding: "18px 20px",
                marginBottom: 24,
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.5)",
                  marginBottom: 14,
                }}
              >
                Risk Assessment
              </div>
              {risks.map((risk, i) => {
                const riskColors = {
                  low: "#22C55E",
                  moderate: "#F59E0B",
                  high: "#EF4444",
                  critical: "#DC2626",
                };
                const rc = riskColors[risk.level];
                return (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      gap: 10,
                      padding: "10px 14px",
                      background: `${rc}08`,
                      border: `1px solid ${rc}20`,
                      borderRadius: 8,
                      marginBottom: 6,
                      alignItems: "flex-start",
                    }}
                  >
                    <AppIcon name={risk.icon} size={16} style={{ flexShrink: 0, marginTop: 1 }} />
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: 2,
                        }}
                      >
                        <span style={{ fontSize: 12, fontWeight: 600, color: rc }}>
                          {risk.label}
                        </span>
                        <span
                          style={{
                            fontSize: 9,
                            fontWeight: 700,
                            textTransform: "uppercase",
                            letterSpacing: "0.06em",
                            color: rc,
                            background: `${rc}15`,
                            borderRadius: 4,
                            padding: "2px 6px",
                          }}
                        >
                          {risk.level}
                        </span>
                      </div>
                      <div
                        style={{
                          fontSize: 11,
                          color: "rgba(255,255,255,0.5)",
                          lineHeight: 1.4,
                        }}
                      >
                        {risk.desc}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Historical Precedent */}
          <div
            style={{
              background: "rgba(139,92,246,0.04)",
              border: "1px solid rgba(139,92,246,0.12)",
              borderRadius: 12,
              padding: "18px 20px",
              marginBottom: 24,
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#A855F7",
                marginBottom: 10,
              }}
            >
              <History size={13} style={{ flexShrink: 0 }} /> Historical Precedent
            </div>
            <div
              style={{
                fontSize: 12,
                color: "rgba(255,255,255,0.6)",
                lineHeight: 1.65,
              }}
            >
              {historicalPrecedent}
            </div>
          </div>

          {/* Disclaimer */}
          <div
            style={{
              padding: "14px 16px",
              background: "rgba(139,92,246,0.06)",
              border: "1px solid rgba(139,92,246,0.15)",
              borderRadius: 10,
            }}
          >
            <div
              style={{
                fontSize: 12,
                color: "rgba(255,255,255,0.5)",
                lineHeight: 1.5,
              }}
            >
              Your design combines elements from multiple real-world systems.
              Each combination creates unique dynamics — no country uses this
              exact configuration. Interest group satisfaction and compatibility
              scores are simplified models inspired by political science
              research and strategy game mechanics.
            </div>
          </div>
          </div>{/* end #design-output */}
        </div>
      )}
    </div>
  );
}

/* ─── Option Button with long-hover examples tooltip ─── */
function OptionButton({
  opt,
  isSelected,
  category,
  colors,
  onSelect,
}: {
  opt: { id: string; label: string; desc: string; examples: string; icon?: string };
  isSelected: boolean;
  category: string;
  colors: { bg: string; accent: string; light: string; text: string };
  onSelect: (category: string, id: string) => void;
}) {
  const [showExamples, setShowExamples] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isSelected) {
      e.currentTarget.style.borderColor = `${colors.accent}50`;
      e.currentTarget.style.background = "rgba(255,255,255,0.04)";
    }
    timerRef.current = setTimeout(() => setShowExamples(true), 700);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isSelected) {
      e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
      e.currentTarget.style.background = "rgba(255,255,255,0.02)";
    }
    if (timerRef.current) clearTimeout(timerRef.current);
    setShowExamples(false);
  };

  return (
    <button
      onClick={() => onSelect(category, opt.id)}
      style={{
        position: "relative",
        background: isSelected ? `${colors.accent}15` : "rgba(255,255,255,0.02)",
        border: `1.5px solid ${isSelected ? colors.accent : "rgba(255,255,255,0.06)"}`,
        borderRadius: 10,
        padding: "12px 14px",
        cursor: "pointer",
        textAlign: "left",
        transition: "all 0.2s ease",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
        {opt.icon && <AppIcon name={opt.icon} size={14} />}
        <span
          style={{
            fontWeight: 600,
            fontSize: 13,
            color: isSelected ? colors.accent : "rgba(255,255,255,0.85)",
          }}
        >
          {opt.label}
        </span>
      </div>
      <div
        style={{
          fontSize: 11,
          color: "rgba(255,255,255,0.4)",
          lineHeight: 1.4,
        }}
      >
        {opt.desc}
      </div>
      {showExamples && (
        <div
          style={{
            position: "absolute",
            bottom: "calc(100% + 6px)",
            left: 0,
            right: 0,
            background: "rgba(14,14,20,0.97)",
            border: `1px solid ${colors.accent}50`,
            borderRadius: 8,
            padding: "8px 10px",
            zIndex: 50,
            pointerEvents: "none",
            boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
          }}
        >
          <div
            style={{
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: "0.07em",
              textTransform: "uppercase",
              color: colors.accent,
              marginBottom: 3,
            }}
          >
            Practiced in
          </div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", lineHeight: 1.4 }}>
            {opt.examples}
          </div>
        </div>
      )}
    </button>
  );
}

/* ─── Category Section Sub-component ─── */
function CategorySection({
  category,
  options,
  colors,
  label,
  selected,
  onSelect,
}: {
  category: string;
  options: { id: string; label: string; desc: string; examples: string; icon?: string }[];
  colors: { bg: string; accent: string; light: string; text: string };
  label: string;
  selected: string | undefined;
  onSelect: (category: string, id: string) => void;
}) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div
        style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: colors.accent,
          marginBottom: 10,
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: selected ? colors.accent : "rgba(255,255,255,0.15)",
          }}
        />
        {label}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: 8,
        }}
      >
        {options.map((opt) => (
          <OptionButton
            key={opt.id}
            opt={opt}
            isSelected={selected === opt.id}
            category={category}
            colors={colors}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}
