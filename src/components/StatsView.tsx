"use client";

import { COUNTRIES, FLAG_EMOJI } from "@/data/constants";
import MediaBar from "./MediaBar";

function BarChart({ data, color }: { data: Record<string, number>; color: string }) {
  const max = Math.max(...Object.values(data));
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {Object.entries(data).map(([label, value]) => (
        <div
          key={label}
          style={{ display: "flex", alignItems: "center", gap: 8 }}
        >
          <div
            style={{
              width: 110,
              fontSize: 12,
              color: "rgba(255,255,255,0.5)",
              textAlign: "right",
              flexShrink: 0,
            }}
          >
            {label}
          </div>
          <div
            style={{
              flex: 1,
              height: 20,
              background: "rgba(255,255,255,0.04)",
              borderRadius: 4,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${(value / max) * 100}%`,
                height: "100%",
                background: color,
                borderRadius: 4,
                transition: "width 0.6s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                paddingRight: 6,
                fontSize: 11,
                color: "#fff",
                fontWeight: 600,
              }}
            >
              {value}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function StatsView() {
  const govTypeCounts: Record<string, number> = {};
  const federalCounts: Record<string, number> = { Federal: 0, Unitary: 0 };
  const legislativeCounts: Record<string, number> = {
    Bicameral: 0,
    Unicameral: 0,
  };
  let avgMedia = 0;

  COUNTRIES.forEach((c) => {
    const t =
      c.govType.includes("Presidential") && !c.govType.includes("Semi")
        ? "Presidential"
        : c.govType.includes("Parliamentary")
          ? "Parliamentary"
          : c.govType.includes("Semi")
            ? "Semi-Presidential"
            : "Other";
    govTypeCounts[t] = (govTypeCounts[t] || 0) + 1;
    if (c.federal.includes("Federal")) federalCounts.Federal++;
    else federalCounts.Unitary++;
    if (c.legislativeType === "Bicameral") legislativeCounts.Bicameral++;
    else legislativeCounts.Unicameral++;
    avgMedia += c.mediaScore;
  });
  avgMedia = avgMedia / COUNTRIES.length;

  const topMedia = [...COUNTRIES]
    .sort((a, b) => b.mediaScore - a.mediaScore)
    .slice(0, 5);
  const bottomMedia = [...COUNTRIES]
    .sort((a, b) => a.mediaScore - b.mediaScore)
    .slice(0, 5);

  return (
    <div style={{ animation: "fadeIn 0.3s ease" }}>
      <h2
        style={{
          margin: "0 0 20px",
          fontSize: 22,
          fontWeight: 700,
          color: "#fff",
        }}
      >
        Global patterns
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 16,
          marginBottom: 24,
        }}
      >
        <div
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 12,
            padding: 20,
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: "rgba(255,255,255,0.4)",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              marginBottom: 4,
            }}
          >
            Countries tracked
          </div>
          <div style={{ fontSize: 36, fontWeight: 700, color: "#fff" }}>
            {COUNTRIES.length}
            <span
              style={{
                fontSize: 14,
                color: "rgba(255,255,255,0.3)",
                fontWeight: 400,
              }}
            >
              {" "}
              / 193 UN
            </span>
          </div>
        </div>
        <div
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 12,
            padding: 20,
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: "rgba(255,255,255,0.4)",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              marginBottom: 4,
            }}
          >
            Avg. RSF score
          </div>
          <div
            style={{
              fontSize: 36,
              fontWeight: 700,
              color: avgMedia >= 60 ? "#22C55E" : "#F59E0B",
            }}
          >
            {avgMedia.toFixed(1)}
            <span
              style={{
                fontSize: 14,
                color: "rgba(255,255,255,0.3)",
                fontWeight: 400,
              }}
            >
              {" "}
              /100
            </span>
          </div>
        </div>
        <div
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 12,
            padding: 20,
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: "rgba(255,255,255,0.4)",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              marginBottom: 4,
            }}
          >
            Most common system
          </div>
          <div style={{ fontSize: 20, fontWeight: 700, color: "#8B5CF6" }}>
            Presidential Republic
          </div>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 16,
        }}
      >
        <div
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 12,
            padding: 20,
          }}
        >
          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: "#fff",
              marginBottom: 12,
            }}
          >
            Government types
          </div>
          <BarChart data={govTypeCounts} color="#8B5CF6" />
        </div>
        <div
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 12,
            padding: 20,
          }}
        >
          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: "#fff",
              marginBottom: 12,
            }}
          >
            Federal vs. Unitary
          </div>
          <BarChart data={federalCounts} color="#3B82F6" />
          <div
            style={{
              marginTop: 16,
              fontSize: 13,
              fontWeight: 600,
              color: "#fff",
              marginBottom: 12,
            }}
          >
            Legislative structure
          </div>
          <BarChart data={legislativeCounts} color="#14B8A6" />
        </div>
        <div
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 12,
            padding: 20,
          }}
        >
          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: "#fff",
              marginBottom: 12,
            }}
          >
            RSF top 5 (freest press)
          </div>
          {topMedia.map((c) => (
            <div
              key={c.code}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 8,
              }}
            >
              <span style={{ fontSize: 16 }}>{FLAG_EMOJI[c.code]}</span>
              <span
                style={{
                  fontSize: 12,
                  color: "rgba(255,255,255,0.7)",
                  flex: 1,
                }}
              >
                {c.name}
              </span>
              <MediaBar score={c.mediaScore} rank={c.rsfRank} />
            </div>
          ))}
        </div>
        <div
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 12,
            padding: 20,
          }}
        >
          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: "#fff",
              marginBottom: 12,
            }}
          >
            RSF bottom 5 (least free press)
          </div>
          {bottomMedia.map((c) => (
            <div
              key={c.code}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 8,
              }}
            >
              <span style={{ fontSize: 16 }}>{FLAG_EMOJI[c.code]}</span>
              <span
                style={{
                  fontSize: 12,
                  color: "rgba(255,255,255,0.7)",
                  flex: 1,
                }}
              >
                {c.name}
              </span>
              <MediaBar score={c.mediaScore} rank={c.rsfRank} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
