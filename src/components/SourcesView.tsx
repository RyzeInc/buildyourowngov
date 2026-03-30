"use client";

import { useState, useMemo } from "react";
import { getPublishers, type Publisher } from "@/data/education";

const COLS = 3;

export default function SourcesView() {
  const publishers = useMemo(
    () => getPublishers().sort((a, b) => a.name.localeCompare(b.name)),
    [],
  );
  const [filter, setFilter] = useState("");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [view, setView] = useState<"cards" | "list">("cards");

  const filtered = useMemo(() => {
    if (!filter) return publishers;
    const q = filter.toLowerCase();
    return publishers.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        (p.abbreviation && p.abbreviation.toLowerCase().includes(q)) ||
        p.type.toLowerCase().includes(q) ||
        p.publications.some((pub) => pub.name.toLowerCase().includes(q)),
    );
  }, [publishers, filter]);

  const expandedPublisher = useMemo(
    () => filtered.find((p) => p.id === expandedId) ?? null,
    [filtered, expandedId],
  );

  // Chunk filtered into rows of COLS for inline expansion
  const rows = useMemo(() => {
    const r: Publisher[][] = [];
    for (let i = 0; i < filtered.length; i += COLS) {
      r.push(filtered.slice(i, i + COLS));
    }
    return r;
  }, [filtered]);

  // Which row contains the expanded card?
  const expandedRowIdx = useMemo(() => {
    if (expandedId === null) return -1;
    const flatIdx = filtered.findIndex((p) => p.id === expandedId);
    return flatIdx === -1 ? -1 : Math.floor(flatIdx / COLS);
  }, [filtered, expandedId]);

  // Color index lookup (stable per publisher across views)
  const colorMap = useMemo(() => {
    const m = new Map<number, number>();
    filtered.forEach((p, i) => m.set(p.id, i));
    return m;
  }, [filtered]);

  return (
    <div style={{ animation: "fadeIn 0.3s ease" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 24,
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div>
          <h2
            style={{
              margin: 0,
              fontSize: 22,
              fontWeight: 700,
              color: "#fff",
              letterSpacing: "-0.02em",
            }}
          >
            Sources Index
          </h2>
          <p
            style={{
              margin: "6px 0 0",
              fontSize: 13,
              color: "rgba(255,255,255,0.4)",
              lineHeight: 1.5,
            }}
          >
            Organizations referenced across Polis, listed alphabetically. Each
            includes a transparency note on bias and reputability.
          </p>
        </div>

        {/* View toggle */}
        <div
          style={{
            display: "flex",
            gap: 2,
            background: "rgba(255,255,255,0.03)",
            borderRadius: 8,
            padding: 3,
          }}
        >
          {(["cards", "list"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              style={{
                background:
                  view === v ? "rgba(255,255,255,0.1)" : "transparent",
                border: "none",
                color: view === v ? "#fff" : "rgba(255,255,255,0.35)",
                padding: "6px 14px",
                borderRadius: 6,
                fontSize: 12,
                fontWeight: 500,
                cursor: "pointer",
                transition: "all 0.15s",
              }}
            >
              {v === "cards" ? "Cards" : "List"}
            </button>
          ))}
        </div>
      </div>

      {/* Search */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 20,
          flexWrap: "wrap",
        }}
      >
        <input
          type="text"
          placeholder="Search organizations or publications..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 8,
            padding: "8px 14px",
            color: "#fff",
            fontSize: 13,
            outline: "none",
            width: 300,
            transition: "border-color 0.15s",
          }}
          onFocus={(e) =>
            (e.target.style.borderColor = "rgba(139,92,246,0.4)")
          }
          onBlur={(e) =>
            (e.target.style.borderColor = "rgba(255,255,255,0.08)")
          }
        />
        <span style={{ fontSize: 12, color: "rgba(255,255,255,0.25)" }}>
          {filtered.length} organization{filtered.length !== 1 ? "s" : ""} ·{" "}
          {filtered.reduce((n, p) => n + p.publications.length, 0)} publications
        </span>
      </div>

      {/* ─── CARD VIEW ─── */}
      {view === "cards" && (
        <div>
          {rows.map((row, rowIdx) => (
            <div key={rowIdx}>
              {/* Row of cards */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${COLS}, 1fr)`,
                  gap: 14,
                  marginBottom:
                    expandedRowIdx === rowIdx ? 0 : 14,
                }}
              >
                {row.map((pub) => (
                  <PublisherCard
                    key={pub.id}
                    publisher={pub}
                    isActive={expandedId === pub.id}
                    onToggle={() =>
                      setExpandedId(
                        expandedId === pub.id ? null : pub.id,
                      )
                    }
                    colorIndex={colorMap.get(pub.id) ?? 0}
                  />
                ))}
              </div>

              {/* Inline expanded panel — appears right below this row */}
              {expandedRowIdx === rowIdx && expandedPublisher && (
                <div style={{ marginBottom: 14 }}>
                  <DetailPanel
                    publisher={expandedPublisher}
                    colorIndex={colorMap.get(expandedPublisher.id) ?? 0}
                    onClose={() => setExpandedId(null)}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ─── LIST VIEW (Bibliography) ─── */}
      {view === "list" && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 0,
          }}
        >
          {filtered.map((pub, idx) => {
            const accent = CARD_ACCENTS[(colorMap.get(pub.id) ?? 0) % CARD_ACCENTS.length];
            const isExpanded = expandedId === pub.id;

            return (
              <div key={pub.id}>
                {/* Organization entry */}
                <div
                  style={{
                    borderLeft: `3px solid ${isExpanded ? accent.text : "rgba(255,255,255,0.06)"}`,
                    padding: "16px 0 16px 20px",
                    borderBottom: isExpanded ? "none" : "1px solid rgba(255,255,255,0.04)",
                    transition: "border-color 0.15s",
                  }}
                >
                  {/* Org header line */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: 8,
                      marginBottom: 4,
                      flexWrap: "wrap",
                    }}
                  >
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : pub.id)}
                      style={{
                        background: "none",
                        border: "none",
                        padding: 0,
                        cursor: "pointer",
                        fontSize: 15,
                        fontWeight: 600,
                        color: isExpanded ? accent.text : "#fff",
                        letterSpacing: "-0.01em",
                        textAlign: "left",
                        transition: "color 0.15s",
                      }}
                      onMouseEnter={(e) => {
                        if (!isExpanded) e.currentTarget.style.color = accent.text;
                      }}
                      onMouseLeave={(e) => {
                        if (!isExpanded) e.currentTarget.style.color = "#fff";
                      }}
                    >
                      {pub.name}
                    </button>
                    {pub.abbreviation && (
                      <span
                        style={{
                          fontSize: 11,
                          color: accent.text,
                          fontWeight: 500,
                          opacity: 0.6,
                        }}
                      >
                        ({pub.abbreviation})
                      </span>
                    )}
                    <span
                      style={{
                        fontSize: 11,
                        color: "rgba(255,255,255,0.2)",
                        fontStyle: "italic",
                      }}
                    >
                      Est. {pub.founded}
                    </span>
                    {pub.url && (
                      <a
                        href={`https://${pub.url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontSize: 11,
                          color: "rgba(255,255,255,0.25)",
                          textDecoration: "none",
                          borderBottom: "1px dotted rgba(255,255,255,0.15)",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = accent.text)}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.25)")}
                      >
                        {pub.url}
                      </a>
                    )}
                  </div>

                  {/* Org type line */}
                  <div
                    style={{
                      fontSize: 11,
                      color: "rgba(255,255,255,0.3)",
                      marginBottom: 10,
                    }}
                  >
                    {pub.type}
                  </div>

                  {/* Publications as bibliography entries */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {pub.publications.map((entry, i) => (
                      <div
                        key={i}
                        style={{
                          paddingLeft: 16,
                          borderLeft: "1px solid rgba(255,255,255,0.04)",
                          display: "flex",
                          alignItems: "baseline",
                          gap: 8,
                          flexWrap: "wrap",
                        }}
                      >
                        {/* Hanging indent citation style */}
                        {entry.url ? (
                          <a
                            href={entry.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              fontSize: 13,
                              color: accent.text,
                              textDecoration: "none",
                              fontStyle: "italic",
                              lineHeight: 1.5,
                              borderBottom: `1px solid transparent`,
                              transition: "border-color 0.15s",
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.borderBottomColor = accent.border)}
                            onMouseLeave={(e) => (e.currentTarget.style.borderBottomColor = "transparent")}
                          >
                            {entry.name} ↗
                          </a>
                        ) : (
                          <span
                            style={{
                              fontSize: 13,
                              color: "rgba(255,255,255,0.55)",
                              fontStyle: "italic",
                              lineHeight: 1.5,
                            }}
                          >
                            {entry.name}
                          </span>
                        )}

                        {/* Section tags inline */}
                        {entry.sections.map((sec) => (
                          <span
                            key={sec}
                            style={{
                              fontSize: 9,
                              color: "rgba(255,255,255,0.3)",
                              background: "rgba(255,255,255,0.03)",
                              padding: "1px 6px",
                              borderRadius: 3,
                              whiteSpace: "nowrap",
                            }}
                          >
                            {sec}
                          </span>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Expanded bias/reputability panel */}
                {isExpanded && (
                  <div
                    style={{
                      borderLeft: `3px solid ${accent.text}`,
                      paddingLeft: 20,
                      paddingBottom: 16,
                      borderBottom: "1px solid rgba(255,255,255,0.04)",
                      animation: "fadeIn 0.2s ease",
                    }}
                  >
                    {/* Tagline */}
                    <div
                      style={{
                        fontSize: 13,
                        color: "rgba(255,255,255,0.45)",
                        fontStyle: "italic",
                        lineHeight: 1.5,
                        marginBottom: 12,
                        paddingBottom: 10,
                        borderBottom: "1px solid rgba(255,255,255,0.04)",
                      }}
                    >
                      &ldquo;{pub.tagline}&rdquo;
                    </div>

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 12,
                      }}
                    >
                      <div
                        style={{
                          background: "rgba(255,180,50,0.04)",
                          border: "1px solid rgba(255,180,50,0.1)",
                          borderRadius: 8,
                          padding: 14,
                        }}
                      >
                        <div
                          style={{
                            fontSize: 10,
                            fontWeight: 600,
                            letterSpacing: "0.06em",
                            textTransform: "uppercase",
                            color: "rgba(255,180,50,0.6)",
                            marginBottom: 6,
                          }}
                        >
                          Known Bias & Orientation
                        </div>
                        <div
                          style={{
                            fontSize: 12,
                            color: "rgba(255,255,255,0.55)",
                            lineHeight: 1.6,
                          }}
                        >
                          {pub.bias}
                        </div>
                      </div>

                      <div
                        style={{
                          background: "rgba(80,200,120,0.04)",
                          border: "1px solid rgba(80,200,120,0.1)",
                          borderRadius: 8,
                          padding: 14,
                        }}
                      >
                        <div
                          style={{
                            fontSize: 10,
                            fontWeight: 600,
                            letterSpacing: "0.06em",
                            textTransform: "uppercase",
                            color: "rgba(80,200,120,0.6)",
                            marginBottom: 6,
                          }}
                        >
                          Reputability
                        </div>
                        <div
                          style={{
                            fontSize: 12,
                            color: "rgba(255,255,255,0.55)",
                            lineHeight: 1.6,
                          }}
                        >
                          {pub.reputability}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {filtered.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: 60,
            color: "rgba(255,255,255,0.3)",
          }}
        >
          No organizations match your search.
        </div>
      )}
    </div>
  );
}

// Stable color palette — each card gets a distinct accent
const CARD_ACCENTS = [
  { bg: "rgba(139,92,246,0.07)", border: "rgba(139,92,246,0.18)", text: "rgba(139,92,246,0.8)", glow: "rgba(139,92,246,0.12)" },
  { bg: "rgba(59,130,246,0.07)", border: "rgba(59,130,246,0.18)", text: "rgba(59,130,246,0.8)", glow: "rgba(59,130,246,0.12)" },
  { bg: "rgba(16,185,129,0.07)", border: "rgba(16,185,129,0.18)", text: "rgba(16,185,129,0.8)", glow: "rgba(16,185,129,0.12)" },
  { bg: "rgba(245,158,11,0.07)", border: "rgba(245,158,11,0.18)", text: "rgba(245,158,11,0.8)", glow: "rgba(245,158,11,0.12)" },
  { bg: "rgba(236,72,153,0.07)", border: "rgba(236,72,153,0.18)", text: "rgba(236,72,153,0.8)", glow: "rgba(236,72,153,0.12)" },
  { bg: "rgba(168,85,247,0.07)", border: "rgba(168,85,247,0.18)", text: "rgba(168,85,247,0.8)", glow: "rgba(168,85,247,0.12)" },
  { bg: "rgba(6,182,212,0.07)", border: "rgba(6,182,212,0.18)", text: "rgba(6,182,212,0.8)", glow: "rgba(6,182,212,0.12)" },
  { bg: "rgba(251,113,133,0.07)", border: "rgba(251,113,133,0.18)", text: "rgba(251,113,133,0.8)", glow: "rgba(251,113,133,0.12)" },
  { bg: "rgba(34,197,94,0.07)", border: "rgba(34,197,94,0.18)", text: "rgba(34,197,94,0.8)", glow: "rgba(34,197,94,0.12)" },
  { bg: "rgba(99,102,241,0.07)", border: "rgba(99,102,241,0.18)", text: "rgba(99,102,241,0.8)", glow: "rgba(99,102,241,0.12)" },
];

/* ─── Portrait card ─── */
function PublisherCard({
  publisher,
  isActive,
  onToggle,
  colorIndex,
}: {
  publisher: Publisher;
  isActive: boolean;
  onToggle: () => void;
  colorIndex: number;
}) {
  const accent = CARD_ACCENTS[colorIndex % CARD_ACCENTS.length];
  const monogram = publisher.abbreviation ?? publisher.name.split(" ").map(w => w[0]).join("").slice(0, 3);

  const sections = useMemo(() => {
    const set = new Set<string>();
    for (const pub of publisher.publications) {
      for (const s of pub.sections) set.add(s);
    }
    return Array.from(set).sort();
  }, [publisher.publications]);

  return (
    <button
      onClick={onToggle}
      style={{
        background: isActive ? accent.bg : "rgba(255,255,255,0.015)",
        borderRadius: 14,
        border: `1px solid ${isActive ? accent.border : "rgba(255,255,255,0.05)"}`,
        padding: 0,
        cursor: "pointer",
        textAlign: "left",
        transition: "all 0.2s ease",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        position: "relative",
      }}
      onMouseEnter={(e) => {
        if (!isActive) {
          e.currentTarget.style.background = "rgba(255,255,255,0.035)";
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
          e.currentTarget.style.transform = "translateY(-2px)";
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          e.currentTarget.style.background = "rgba(255,255,255,0.015)";
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
          e.currentTarget.style.transform = "translateY(0)";
        }
      }}
    >
      {/* Top accent zone with large monogram */}
      <div
        style={{
          background: accent.bg,
          padding: "28px 20px 22px",
          borderBottom: `1px solid ${accent.border}`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Faded giant monogram in background */}
        <div
          style={{
            position: "absolute",
            right: -8,
            top: -12,
            fontSize: 90,
            fontWeight: 900,
            color: accent.glow,
            lineHeight: 1,
            letterSpacing: "-0.04em",
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          {monogram}
        </div>

        <div style={{ position: "relative", zIndex: 1 }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: accent.text,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              marginBottom: 6,
            }}
          >
            Est. {publisher.founded}
          </div>
          <div
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: "#fff",
              lineHeight: 1.2,
              letterSpacing: "-0.01em",
            }}
          >
            {publisher.name}
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "16px 20px 18px", flex: 1, display: "flex", flexDirection: "column" }}>
        <div
          style={{
            fontSize: 12,
            color: "rgba(255,255,255,0.35)",
            marginBottom: 10,
          }}
        >
          {publisher.type}
        </div>

        <div
          style={{
            fontSize: 13,
            color: "rgba(255,255,255,0.55)",
            lineHeight: 1.55,
            fontStyle: "italic",
            flex: 1,
          }}
        >
          &ldquo;{publisher.tagline}&rdquo;
        </div>

        {/* Section pills */}
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginTop: 14 }}>
          {sections.map((sec) => (
            <span
              key={sec}
              style={{
                fontSize: 9,
                color: accent.text,
                background: accent.bg,
                padding: "3px 8px",
                borderRadius: 4,
                border: `1px solid ${accent.border}`,
                fontWeight: 500,
              }}
            >
              {sec}
            </span>
          ))}
        </div>

        {/* Footer stats */}
        <div
          style={{
            marginTop: 12,
            paddingTop: 10,
            borderTop: "1px solid rgba(255,255,255,0.04)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: 10, color: "rgba(255,255,255,0.25)" }}>
            {publisher.publications.length} publication{publisher.publications.length !== 1 ? "s" : ""} cited
          </span>
          {publisher.url && (
            <span style={{ fontSize: 10, color: accent.text, opacity: 0.6 }}>
              {publisher.url}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}

/* ─── Shared detail panel (used in both views) ─── */
function DetailPanel({
  publisher,
  colorIndex,
  onClose,
}: {
  publisher: Publisher;
  colorIndex: number;
  onClose: () => void;
}) {
  const accent = CARD_ACCENTS[colorIndex % CARD_ACCENTS.length];
  const monogram = publisher.abbreviation ?? publisher.name.split(" ").map(w => w[0]).join("").slice(0, 3);

  const allSections = useMemo(() => {
    const set = new Set<string>();
    for (const pub of publisher.publications) {
      for (const s of pub.sections) set.add(s);
    }
    return Array.from(set).sort();
  }, [publisher.publications]);

  return (
    <div
      style={{
        marginTop: 14,
        background: "rgba(255,255,255,0.02)",
        border: `1px solid ${accent.border}`,
        borderRadius: 12,
        overflow: "hidden",
        animation: "fadeIn 0.2s ease",
      }}
    >
      {/* Top accent bar */}
      <div
        style={{
          background: accent.bg,
          padding: "20px 22px 16px",
          borderBottom: `1px solid ${accent.border}`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Ghost monogram */}
        <div
          style={{
            position: "absolute",
            right: 16,
            top: -10,
            fontSize: 72,
            fontWeight: 900,
            color: accent.glow,
            lineHeight: 1,
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          {monogram}
        </div>

        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <div>
            <div
              style={{
                fontSize: 10,
                fontWeight: 600,
                color: accent.text,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginBottom: 4,
              }}
            >
              Est. {publisher.founded} · {publisher.type}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 8,
                flexWrap: "wrap",
              }}
            >
              <span
                style={{ fontSize: 20, fontWeight: 700, color: "#fff" }}
              >
                {publisher.name}
              </span>
              {publisher.abbreviation && (
                <span
                  style={{
                    fontSize: 13,
                    color: accent.text,
                    fontWeight: 500,
                  }}
                >
                  {publisher.abbreviation}
                </span>
              )}
            </div>
            {publisher.url && (
              <div
                style={{
                  fontSize: 11,
                  color: accent.text,
                  opacity: 0.6,
                  marginTop: 3,
                }}
              >
                {publisher.url}
              </div>
            )}

            {/* Section tags */}
            <div
              style={{
                display: "flex",
                gap: 5,
                marginTop: 10,
                flexWrap: "wrap",
              }}
            >
              {allSections.map((sec) => (
                <span
                  key={sec}
                  style={{
                    fontSize: 10,
                    color: accent.text,
                    background: accent.bg,
                    padding: "2px 8px",
                    borderRadius: 4,
                    border: `1px solid ${accent.border}`,
                    fontWeight: 500,
                  }}
                >
                  {sec}
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: "rgba(255,255,255,0.3)",
              fontSize: 20,
              cursor: "pointer",
              padding: "0 4px",
              lineHeight: 1,
              flexShrink: 0,
            }}
          >
            ×
          </button>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "18px 22px 20px" }}>
        {/* Tagline */}
        <div
          style={{
            fontSize: 14,
            color: "rgba(255,255,255,0.55)",
            fontStyle: "italic",
            lineHeight: 1.5,
            marginBottom: 18,
            paddingBottom: 14,
            borderBottom: "1px solid rgba(255,255,255,0.04)",
          }}
        >
          &ldquo;{publisher.tagline}&rdquo;
        </div>

        {/* Bias & Reputability — side by side */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 12,
            marginBottom: 18,
          }}
        >
          <div
            style={{
              background: "rgba(255,180,50,0.04)",
              border: "1px solid rgba(255,180,50,0.1)",
              borderRadius: 8,
              padding: 14,
            }}
          >
            <div
              style={{
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "rgba(255,180,50,0.6)",
                marginBottom: 6,
              }}
            >
              Known Bias & Orientation
            </div>
            <div
              style={{
                fontSize: 12,
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1.6,
              }}
            >
              {publisher.bias}
            </div>
          </div>

          <div
            style={{
              background: "rgba(80,200,120,0.04)",
              border: "1px solid rgba(80,200,120,0.1)",
              borderRadius: 8,
              padding: 14,
            }}
          >
            <div
              style={{
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "rgba(80,200,120,0.6)",
                marginBottom: 6,
              }}
            >
              Reputability
            </div>
            <div
              style={{
                fontSize: 12,
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1.6,
              }}
            >
              {publisher.reputability}
            </div>
          </div>
        </div>

        {/* Publications */}
        <div>
          <div
            style={{
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.25)",
              marginBottom: 8,
            }}
          >
            Publications Cited
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {publisher.publications.map((pub, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 10,
                  padding: "8px 12px",
                  background: "rgba(255,255,255,0.02)",
                  borderRadius: 6,
                }}
              >
                <div style={{ flex: 1 }}>
                  {pub.url ? (
                    <a
                      href={pub.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontSize: 12,
                        color: accent.text,
                        lineHeight: 1.4,
                        textDecoration: "none",
                        borderBottom: `1px solid ${accent.border}`,
                        transition: "opacity 0.15s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
                      onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                    >
                      {pub.name} ↗
                    </a>
                  ) : (
                    <div
                      style={{
                        fontSize: 12,
                        color: "rgba(255,255,255,0.6)",
                        lineHeight: 1.4,
                      }}
                    >
                      {pub.name}
                    </div>
                  )}
                  <div
                    style={{
                      display: "flex",
                      gap: 4,
                      marginTop: 4,
                      flexWrap: "wrap",
                    }}
                  >
                    {pub.sections.map((sec) => (
                      <span
                        key={sec}
                        style={{
                          fontSize: 9,
                          color: "rgba(255,255,255,0.3)",
                          background: "rgba(255,255,255,0.03)",
                          padding: "1px 6px",
                          borderRadius: 3,
                        }}
                      >
                        {sec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
