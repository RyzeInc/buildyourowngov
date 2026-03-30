"use client";

import { useState } from "react";
import type { Country } from "@/data/types";
import { FLAG_EMOJI, CATEGORY_COLORS } from "@/data/constants";
import { HelpCircle, Landmark, BookOpen, AlertTriangle } from "lucide-react";
import AppIcon from "@/components/AppIcon";
import { getEducation } from "@/data/education";
import { INDEX_DEFS, COUNTRY_INDICES, COUNTRY_INDEX_CONTEXT, getIndexRank, getIndexStats, countryName } from "@/data/indices";

interface CountryDetailProps {
  country: Country;
  onBack: () => void;
}

type SectionKey = "executive" | "legislative" | "judicial" | "federal" | "economic" | "checks";

interface SectionDef {
  label: string;
  key: SectionKey;
  value: string;
  color: { bg: string; accent: string; light: string; text: string };
}

function EducationalPanel({ section, country, onClose }: { section: SectionDef; country: Country; onClose: () => void }) {
  const edu = getEducation(section.key, section.value, country);
  const c = section.color;

  return (
    <div
      style={{
        background: `${c.accent}06`,
        border: `1px solid ${c.accent}30`,
        borderRadius: 12,
        padding: "20px 24px",
        marginTop: 12,
        animation: "fadeIn 0.2s ease",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: c.accent }}>
          {section.label}: {section.value}
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          style={{ background: "none", border: "none", color: c.accent, cursor: "pointer", fontSize: 13, padding: "4px 8px" }}
        >
          ✕ close
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 8, padding: "14px 16px" }}>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 8, display: "flex", alignItems: "center", gap: 4 }}>
            <HelpCircle size={10} />
            What is this?
          </div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", lineHeight: 1.7 }}>
            {edu.concept}
          </div>
        </div>

        <div style={{ background: `${c.accent}06`, borderRadius: 8, padding: "14px 16px", border: `1px solid ${c.accent}15` }}>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: c.accent, marginBottom: 8, display: "flex", alignItems: "center", gap: 4 }}>
            <Landmark size={10} />
            How it works in {country.name}
          </div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", lineHeight: 1.7 }}>
            {edu.countryInsight}
          </div>
        </div>
      </div>

      {edu.explanation && (
        <div style={{ background: `${c.accent}08`, borderLeft: `3px solid ${c.accent}50`, borderRadius: "0 8px 8px 0", padding: "14px 16px", marginTop: 12 }}>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: c.accent, marginBottom: 8, display: "flex", alignItems: "center", gap: 4 }}>
            <BookOpen size={10} />
            What does &ldquo;{section.value}&rdquo; mean?
          </div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", lineHeight: 1.7 }}>
            {edu.explanation}
          </div>
          {edu.inPractice && (
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", lineHeight: 1.65, marginTop: 10, fontStyle: "italic", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 10 }}>
              In practice: {edu.inPractice}
            </div>
          )}
        </div>
      )}

      {edu.sources && edu.sources.length > 0 && (
        <div style={{ marginTop: 12, paddingTop: 10, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: 4 }}>
            Sources
          </div>
          {edu.sources.map((src, i) => (
            <div key={i} style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", lineHeight: 1.6 }}>
              {src}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function CountryDetail({ country, onBack }: CountryDetailProps) {
  const [activeSection, setActiveSection] = useState<SectionKey | null>(null);
  const [activeIndex, setActiveIndex] = useState<string | null>(null);
  const indices = COUNTRY_INDICES[country.code] ?? {};

  const sections: SectionDef[] = [
    { label: "Executive System", key: "executive", value: country.executive, color: CATEGORY_COLORS.executive },
    { label: "Legislative System", key: "legislative", value: country.legislative, color: CATEGORY_COLORS.legislative },
    { label: "Judicial System", key: "judicial", value: country.judicial, color: CATEGORY_COLORS.judicial },
    { label: "Federal Structure", key: "federal", value: country.federal, color: CATEGORY_COLORS.federal },
    { label: "Economic System", key: "economic", value: country.economic, color: CATEGORY_COLORS.economic },
    { label: "Checks & Balances", key: "checks", value: country.checks, color: CATEGORY_COLORS.checks },
  ];

  const active = sections.find((s) => s.key === activeSection);

  return (
    <div style={{ animation: "fadeIn 0.3s ease" }}>
      <button
        onClick={onBack}
        style={{
          background: "none",
          border: "none",
          color: "rgba(255,255,255,0.5)",
          cursor: "pointer",
          fontSize: 13,
          marginBottom: 16,
          padding: 0,
          display: "flex",
          alignItems: "center",
          gap: 4,
        }}
      >
        ← Back to all countries
      </button>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          marginBottom: 24,
        }}
      >
        <span style={{ fontSize: 48 }}>{FLAG_EMOJI[country.code]}</span>
        <div>
          <h2
            style={{
              margin: 0,
              fontSize: 28,
              fontWeight: 700,
              color: "#fff",
              letterSpacing: "-0.02em",
            }}
          >
            {country.name}
          </h2>
          <div
            style={{
              color: "rgba(255,255,255,0.5)",
              fontSize: 14,
              marginTop: 2,
            }}
          >
            {country.govType}
          </div>
          <div
            style={{
              color: "rgba(255,255,255,0.35)",
              fontSize: 13,
              marginTop: 2,
            }}
          >
            {country.region} · Population: {country.population}
          </div>
        </div>
      </div>

      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginBottom: 12, fontStyle: "italic" }}>
        Click any card to learn what it means and how it works in {country.name}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 12,
          marginBottom: 32,
        }}
      >
        {sections.map((s) => {
          const isActive = activeSection === s.key;
          return (
            <div
              key={s.key}
              onClick={() => setActiveSection(isActive ? null : s.key)}
              style={{
                background: `${s.color.accent}${isActive ? "12" : "08"}`,
                border: `1px solid ${s.color.accent}${isActive ? "50" : "20"}`,
                borderRadius: 10,
                padding: "16px 18px",
                cursor: "pointer",
                transition: "border-color 0.2s ease, background 0.2s ease",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: s.color.accent }}>
                  {s.label}
                </div>
                <div style={{ fontSize: 10, color: isActive ? s.color.accent : "rgba(255,255,255,0.3)", flexShrink: 0, marginLeft: 8 }}>
                  {isActive ? "▲ showing" : "▼ learn more"}
                </div>
              </div>
              <div style={{ fontSize: 14, color: "rgba(255,255,255,0.85)", lineHeight: 1.5, fontWeight: 500 }}>
                {s.value}
              </div>
            </div>
          );
        })}
      </div>

      {active && (
        <EducationalPanel
          section={active}
          country={country}
          onClose={() => setActiveSection(null)}
        />
      )}

      <div style={{ marginBottom: 24 }}>
        <div
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "rgba(255,255,255,0.5)",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            marginBottom: 4,
          }}
        >
          Global indices
        </div>
        <div
          style={{
            fontSize: 11,
            color: "rgba(255,255,255,0.3)",
            marginBottom: 12,
            fontStyle: "italic",
          }}
        >
          Click any index to see what it measures, how to interpret the score, and important caveats
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 10,
          }}
        >
          {INDEX_DEFS.map((def) => {
            const val = indices[def.id];
            const rank = getIndexRank(country.code, def.id);
            const stats = getIndexStats(def.id);
            const isActive = activeIndex === def.id;
            const isMedia = def.id === "voiceAccountability";

            return (
              <div key={def.id} style={{ gridColumn: isActive ? "1 / -1" : undefined }}>
                <div
                  onClick={() => setActiveIndex(isActive ? null : def.id)}
                  style={{
                    background: isActive ? `${def.color}12` : "rgba(255,255,255,0.03)",
                    border: `1px solid ${isActive ? `${def.color}50` : "rgba(255,255,255,0.06)"}`,
                    borderRadius: isActive ? "10px 10px 0 0" : 10,
                    padding: "14px 16px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 6,
                    }}
                  >
                    <div
                      style={{
                        fontSize: 10,
                        fontWeight: 600,
                        letterSpacing: "0.05em",
                        textTransform: "uppercase",
                        color: def.color,
                      }}
                    >
                      <AppIcon name={def.icon} size={11} style={{ flexShrink: 0 }} /> {def.name}
                    </div>
                    <div
                      style={{
                        fontSize: 9,
                        color: isActive ? def.color : "rgba(255,255,255,0.3)",
                      }}
                    >
                      {isActive ? "▲" : "▼"}
                    </div>
                  </div>
                  {val != null ? (
                    <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                      <span
                        style={{
                          fontSize: 22,
                          fontWeight: 700,
                          color: "#fff",
                        }}
                      >
                        {def.format(val)}
                      </span>
                      {rank && (
                        <span
                          style={{
                            fontSize: 11,
                            color: "rgba(255,255,255,0.35)",
                          }}
                        >
                          #{rank}/{stats?.count ?? 30}
                        </span>
                      )}
                    </div>
                  ) : (
                    <span style={{ fontSize: 13, color: "rgba(255,255,255,0.3)" }}>
                      No data
                    </span>
                  )}
                  <div
                    style={{
                      fontSize: 10,
                      color: "rgba(255,255,255,0.3)",
                      marginTop: 2,
                    }}
                  >
                    {def.source}, {def.year}
                  </div>
                </div>
                {isActive && (
                  <div
                    style={{
                      background: `${def.color}06`,
                      border: `1px solid ${def.color}30`,
                      borderTop: "none",
                      borderRadius: "0 0 10px 10px",
                      padding: "16px 20px",
                      animation: "fadeIn 0.2s ease",
                    }}
                  >
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                      <div>
                        <div style={{ fontSize: 11, fontWeight: 600, color: def.color, marginBottom: 6 }}>
                          What this measures
                        </div>
                        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", lineHeight: 1.7 }}>
                          {def.description}
                        </div>

                        {stats && (
                          <div
                            style={{
                              marginTop: 12,
                              padding: "10px 12px",
                              background: "rgba(255,255,255,0.03)",
                              borderRadius: 8,
                              display: "flex",
                              gap: 16,
                              flexWrap: "wrap",
                            }}
                          >
                            <div>
                              <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>
                                Avg (30 tracked)
                              </div>
                              <div style={{ fontSize: 16, fontWeight: 700, color: "rgba(255,255,255,0.7)" }}>
                                {def.format(stats.avg)}
                              </div>
                            </div>
                            <div>
                              <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>
                                Best
                              </div>
                              <div style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.6)" }}>
                                {def.format(stats.max)} <span style={{ fontSize: 10, fontWeight: 400 }}>({countryName(stats.maxCountry)})</span>
                              </div>
                            </div>
                            <div>
                              <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>
                                Lowest
                              </div>
                              <div style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.6)" }}>
                                {def.format(stats.min)} <span style={{ fontSize: 10, fontWeight: 400 }}>({countryName(stats.minCountry)})</span>
                              </div>
                            </div>
                            <div>
                              <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>
                                Countries with data
                              </div>
                              <div style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.6)" }}>
                                {stats.count}/30
                              </div>
                            </div>
                          </div>
                        )}
                        {COUNTRY_INDEX_CONTEXT[country.code]?.[def.id] && (
                          <div style={{ marginTop: 12 }}>
                            <div style={{ fontSize: 11, fontWeight: 600, color: def.color, marginBottom: 6 }}>
                              Why {country.name} scores this way
                            </div>
                            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", lineHeight: 1.7 }}>
                              {COUNTRY_INDEX_CONTEXT[country.code][def.id]}
                            </div>
                          </div>
                        )}
                      </div>

                      <div>
                        <div style={{ fontSize: 11, fontWeight: 600, color: def.color, marginBottom: 6 }}>
                          How to read this
                        </div>
                        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", lineHeight: 1.7 }}>
                          {def.interpretation}
                        </div>

                        <div style={{ fontSize: 11, fontWeight: 600, color: "#F59E0B", marginTop: 12, marginBottom: 6, display: "flex", alignItems: "center", gap: 4 }}>
                          <AlertTriangle size={11} /> Caveats
                        </div>
                        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>
                          {def.caveats}
                        </div>

                        {isMedia && (
                          <div style={{ marginTop: 12 }}>
                            <div style={{ fontSize: 11, fontWeight: 600, color: def.color, marginBottom: 6 }}>
                              Media landscape: {country.name}
                            </div>
                            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", lineHeight: 1.7 }}>
                              {country.media}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
