"use client";

interface MediaBarProps {
  score: number;
  rank?: number;
}

export default function MediaBar({ score, rank }: MediaBarProps) {
  const color =
    score >= 70
      ? "#22C55E"
      : score >= 55
        ? "#F59E0B"
        : score >= 40
          ? "#F97316"
          : "#EF4444";

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div
        style={{
          flex: 1,
          height: 6,
          background: "rgba(255,255,255,0.08)",
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${score}%`,
            height: "100%",
            background: color,
            borderRadius: 3,
            transition: "width 0.6s ease",
          }}
        />
      </div>
      <span
        style={{
          fontSize: 11,
          color: "rgba(255,255,255,0.5)",
          minWidth: 60,
          textAlign: "right",
        }}
      >
        {score.toFixed(1)}
        {rank ? ` #${rank}` : ""}
      </span>
    </div>
  );
}
