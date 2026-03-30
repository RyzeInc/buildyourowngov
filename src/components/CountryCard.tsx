"use client";

import type { Country } from "@/data/types";
import { FLAG_EMOJI } from "@/data/constants";

interface CountryCardProps {
  country: Country;
  onClick: () => void;
  isCompare: boolean;
  onToggleCompare?: (code: string) => void;
  compact?: boolean;
  sortIndex?: {
    value: number | null;
    format: (v: number) => string;
    color: string;
    label: string;
  };
}

export default function CountryCard({
  country,
  onClick,
  isCompare,
  onToggleCompare,
  compact,
  sortIndex,
}: CountryCardProps) {
  const govColor =
    country.govType.includes("Presidential") &&
    !country.govType.includes("Semi")
      ? "#8B5CF6"
      : country.govType.includes("Parliamentary")
        ? "#14B8A6"
        : country.govType.includes("Semi")
          ? "#F97316"
          : "#EF4444";

  return (
    <div
      onClick={onClick}
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 12,
        padding: compact ? "14px 16px" : "20px 22px",
        cursor: "pointer",
        transition: "all 0.2s ease",
        position: "relative",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.background = "rgba(255,255,255,0.06)";
        el.style.borderColor = "rgba(255,255,255,0.12)";
        el.style.transform = "translateY(-1px)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.background = "rgba(255,255,255,0.03)";
        el.style.borderColor = "rgba(255,255,255,0.06)";
        el.style.transform = "translateY(0)";
      }}
    >
      {onToggleCompare && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleCompare(country.code);
          }}
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            width: 22,
            height: 22,
            borderRadius: 4,
            border: isCompare ? "none" : "1.5px solid rgba(255,255,255,0.2)",
            background: isCompare ? "#8B5CF6" : "transparent",
            color: "#fff",
            fontSize: 12,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.15s",
          }}
        >
          {isCompare ? "✓" : ""}
        </button>
      )}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: compact ? 6 : 10,
        }}
      >
        <span style={{ fontSize: compact ? 22 : 28 }}>
          {FLAG_EMOJI[country.code]}
        </span>
        <div>
          <div
            style={{
              fontWeight: 600,
              fontSize: compact ? 14 : 16,
              color: "#fff",
              letterSpacing: "-0.01em",
            }}
          >
            {country.name}
          </div>
          <div
            style={{
              fontSize: 11,
              color: "rgba(255,255,255,0.4)",
              marginTop: 1,
            }}
          >
            {country.region} · {country.population}
          </div>
        </div>
      </div>
      <div
        style={{
          display: "inline-block",
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          color: govColor,
          background: `${govColor}18`,
          padding: "3px 8px",
          borderRadius: 4,
          marginBottom: compact ? 6 : 10,
        }}
      >
        {country.govType.split("(")[0].trim()}
      </div>
      {!compact && (
        <>
          <div
            style={{
              fontSize: 12,
              color: "rgba(255,255,255,0.5)",
              marginTop: 8,
            }}
          >
            {country.federal} · {country.legislativeType}
          </div>
        </>
      )}

      {/* Sort index badge — appears when sorting by an index */}
      {sortIndex && (
        <div
          style={{
            marginTop: compact ? 6 : 10,
            paddingTop: compact ? 6 : 8,
            borderTop: "1px solid rgba(255,255,255,0.04)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              fontSize: 10,
              color: "rgba(255,255,255,0.3)",
              textTransform: "uppercase",
              letterSpacing: "0.04em",
              fontWeight: 500,
            }}
          >
            {sortIndex.label}
          </span>
          <span
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: sortIndex.value !== null ? sortIndex.color : "rgba(255,255,255,0.15)",
              letterSpacing: "-0.02em",
            }}
          >
            {sortIndex.value !== null ? sortIndex.format(sortIndex.value) : "No data"}
          </span>
        </div>
      )}
    </div>
  );
}
