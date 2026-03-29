"use client";

import { useState } from "react";
import {
  DESIGN_OPTIONS,
  CATEGORY_COLORS,
  CATEGORY_LABELS,
} from "@/data/constants";
import type { DesignOption, CategoryColor } from "@/data/types";

export default function DesignStudio() {
  const [selections, setSelections] = useState<Record<string, string>>({});

  const handleSelect = (category: string, id: string) => {
    setSelections((prev) => ({ ...prev, [category]: id }));
  };

  const completionCount = Object.keys(selections).length;
  const totalCategories = Object.keys(DESIGN_OPTIONS).length;

  const getStrengths = () => {
    const strengths: string[] = [];
    const weaknesses: string[] = [];
    if (selections.executive === "semi-presidential")
      strengths.push(
        "Flexible executive that can handle both domestic and foreign challenges"
      );
    if (selections.executive === "presidential")
      weaknesses.push("Risk of executive-legislative gridlock");
    if (selections.legislative === "bicameral-proportional")
      strengths.push(
        "Proportional representation ensures minority voices are heard"
      );
    if (selections.legislative === "unicameral") {
      strengths.push("Fast, efficient lawmaking");
      weaknesses.push("Fewer legislative checks on majority power");
    }
    if (selections.judicial === "constitutional-court")
      strengths.push(
        "Dedicated constitutional review with citizen access strengthens rights protection"
      );
    if (selections.federal === "federal")
      strengths.push("Regional autonomy accommodates local diversity");
    if (selections.federal === "unitary") {
      strengths.push("Clear, unified national policy");
      weaknesses.push("Less room for regional experimentation");
    }
    if (selections.economic === "social-market")
      strengths.push(
        "Strong safety net enables economic risk-taking and social mobility"
      );
    if (selections.economic === "free-market") {
      strengths.push("Maximum economic dynamism and innovation");
      weaknesses.push("Risk of inequality without corrective policy");
    }
    if (selections.checks === "constructive-noconfidence")
      strengths.push(
        "Government stability — can't topple without a replacement"
      );
    if (selections.checks === "independent-bodies")
      strengths.push("Institutional accountability beyond electoral cycles");
    if (
      selections.checks === "strong-separation" &&
      selections.executive === "parliamentary"
    )
      weaknesses.push(
        "Tension: strong separation pairs awkwardly with parliamentary executive"
      );
    return { strengths, weaknesses };
  };

  return (
    <div style={{ animation: "fadeIn 0.3s ease" }}>
      <div style={{ marginBottom: 28 }}>
        <h2
          style={{
            margin: "0 0 6px",
            fontSize: 22,
            fontWeight: 700,
            color: "#fff",
            letterSpacing: "-0.02em",
          }}
        >
          Design your government
        </h2>
        <p
          style={{
            margin: 0,
            color: "rgba(255,255,255,0.45)",
            fontSize: 14,
            lineHeight: 1.5,
          }}
        >
          Mix and match institutional features from governments worldwide. Select
          one option from each category to build your ideal system.
        </p>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 24,
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
              width: `${(completionCount / totalCategories) * 100}%`,
              height: "100%",
              background: "linear-gradient(90deg, #8B5CF6, #14B8A6)",
              borderRadius: 2,
              transition: "width 0.4s ease",
            }}
          />
        </div>
        <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>
          {completionCount}/{totalCategories}
        </span>
      </div>

      {Object.entries(DESIGN_OPTIONS).map(([category, options]) => {
        const colors = CATEGORY_COLORS[category];
        return (
          <div key={category} style={{ marginBottom: 20 }}>
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
                  background: selections[category]
                    ? colors.accent
                    : "rgba(255,255,255,0.15)",
                }}
              />
              {CATEGORY_LABELS[category]}
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                gap: 8,
              }}
            >
              {options.map((opt) => {
                const isSelected = selections[category] === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelect(category, opt.id)}
                    style={{
                      background: isSelected
                        ? `${colors.accent}15`
                        : "rgba(255,255,255,0.02)",
                      border: `1.5px solid ${isSelected ? colors.accent : "rgba(255,255,255,0.06)"}`,
                      borderRadius: 10,
                      padding: "12px 14px",
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.borderColor = `${colors.accent}50`;
                        e.currentTarget.style.background =
                          "rgba(255,255,255,0.04)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.borderColor =
                          "rgba(255,255,255,0.06)";
                        e.currentTarget.style.background =
                          "rgba(255,255,255,0.02)";
                      }
                    }}
                  >
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: 13,
                        color: isSelected
                          ? colors.accent
                          : "rgba(255,255,255,0.85)",
                        marginBottom: 3,
                      }}
                    >
                      {opt.label}
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: "rgba(255,255,255,0.4)",
                        lineHeight: 1.4,
                        marginBottom: 4,
                      }}
                    >
                      {opt.desc}
                    </div>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.25)" }}>
                      e.g. {opt.examples}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}

      {completionCount >= 3 && (
        <div
          style={{
            marginTop: 24,
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 14,
            padding: "22px 24px",
            animation: "fadeIn 0.4s ease",
          }}
        >
          <h3
            style={{
              margin: "0 0 14px",
              fontSize: 16,
              color: "#fff",
              fontWeight: 600,
            }}
          >
            {completionCount === totalCategories
              ? "Your complete government design"
              : `Analysis (${completionCount}/${totalCategories} selected)`}
          </h3>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
              marginBottom: 16,
            }}
          >
            {Object.entries(selections).map(([cat, id]) => {
              const opt = DESIGN_OPTIONS[cat].find((o) => o.id === id);
              const colors = CATEGORY_COLORS[cat];
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
                    style={{ color: "rgba(255,255,255,0.7)", marginLeft: 4 }}
                  >
                    {opt?.label}
                  </span>
                </div>
              );
            })}
          </div>

          {(() => {
            const { strengths, weaknesses } = getStrengths();
            return (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    strengths.length && weaknesses.length ? "1fr 1fr" : "1fr",
                  gap: 16,
                }}
              >
                {strengths.length > 0 && (
                  <div>
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        color: "#22C55E",
                        marginBottom: 8,
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                      }}
                    >
                      Strengths
                    </div>
                    {strengths.map((s, i) => (
                      <div
                        key={i}
                        style={{
                          fontSize: 12,
                          color: "rgba(255,255,255,0.6)",
                          marginBottom: 6,
                          paddingLeft: 12,
                          borderLeft: "2px solid rgba(34,197,94,0.3)",
                          lineHeight: 1.4,
                        }}
                      >
                        {s}
                      </div>
                    ))}
                  </div>
                )}
                {weaknesses.length > 0 && (
                  <div>
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        color: "#F59E0B",
                        marginBottom: 8,
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                      }}
                    >
                      Tensions to watch
                    </div>
                    {weaknesses.map((w, i) => (
                      <div
                        key={i}
                        style={{
                          fontSize: 12,
                          color: "rgba(255,255,255,0.6)",
                          marginBottom: 6,
                          paddingLeft: 12,
                          borderLeft: "2px solid rgba(245,158,11,0.3)",
                          lineHeight: 1.4,
                        }}
                      >
                        {w}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })()}

          {completionCount === totalCategories && (
            <div
              style={{
                marginTop: 16,
                padding: "12px 16px",
                background: "rgba(139,92,246,0.08)",
                border: "1px solid rgba(139,92,246,0.2)",
                borderRadius: 8,
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  color: "rgba(255,255,255,0.7)",
                  lineHeight: 1.5,
                }}
              >
                Your design combines elements from multiple real-world systems.
                No existing country uses this exact combination — you&apos;ve
                created something original. As more countries are added to the
                database, you&apos;ll be able to find even more institutional
                innovations to incorporate.
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
