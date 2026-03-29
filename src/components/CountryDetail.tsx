"use client";

import type { Country } from "@/data/types";
import { FLAG_EMOJI, CATEGORY_COLORS } from "@/data/constants";
import MediaBar from "./MediaBar";

interface CountryDetailProps {
  country: Country;
  onBack: () => void;
}

export default function CountryDetail({ country, onBack }: CountryDetailProps) {
  const sections = [
    { label: "Executive System", value: country.executive, color: CATEGORY_COLORS.executive },
    { label: "Legislative System", value: country.legislative, color: CATEGORY_COLORS.legislative },
    { label: "Judicial System", value: country.judicial, color: CATEGORY_COLORS.judicial },
    { label: "Federal Structure", value: country.federal, color: CATEGORY_COLORS.federal },
    { label: "Economic System", value: country.economic, color: CATEGORY_COLORS.economic },
    { label: "Checks & Balances", value: country.checks, color: CATEGORY_COLORS.checks },
  ];

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

      <div style={{ marginBottom: 24 }}>
        <div
          style={{
            fontSize: 13,
            color: "rgba(255,255,255,0.5)",
            marginBottom: 6,
          }}
        >
          RSF Press Freedom Index 2025 — Rank #{country.rsfRank}/180
        </div>
        <MediaBar score={country.mediaScore} rank={country.rsfRank} />
        <div
          style={{
            fontSize: 12,
            color: "rgba(255,255,255,0.4)",
            marginTop: 4,
          }}
        >
          {country.media}
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 12,
        }}
      >
        {sections.map((s) => (
          <div
            key={s.label}
            style={{
              background: `${s.color.accent}08`,
              border: `1px solid ${s.color.accent}20`,
              borderRadius: 10,
              padding: "16px 18px",
            }}
          >
            <div
              style={{
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: s.color.accent,
                marginBottom: 6,
              }}
            >
              {s.label}
            </div>
            <div
              style={{
                fontSize: 14,
                color: "rgba(255,255,255,0.85)",
                lineHeight: 1.5,
              }}
            >
              {s.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
