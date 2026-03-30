"use client";

import type { Country } from "@/data/types";
import { FLAG_EMOJI } from "@/data/constants";
import MediaBar from "./MediaBar";

interface CompareViewProps {
  codes: string[];
  countries: Country[];
}

export default function CompareView({ codes, countries }: CompareViewProps) {
  const selected = countries.filter((c) => codes.includes(c.code));

  if (selected.length < 2) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: 40,
          color: "rgba(255,255,255,0.4)",
        }}
      >
        Select at least 2 countries to compare (use the checkboxes on country
        cards)
      </div>
    );
  }

  const fields: { key: keyof Country; label: string }[] = [
    { key: "govType", label: "Government Type" },
    { key: "executive", label: "Executive" },
    { key: "legislative", label: "Legislature" },
    { key: "judicial", label: "Judiciary" },
    { key: "federal", label: "Federal Structure" },
    { key: "economic", label: "Economy" },
    { key: "checks", label: "Checks & Balances" },
  ];

  return (
    <div style={{ overflowX: "auto", animation: "fadeIn 0.3s ease" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <h3 style={{ margin: 0, color: "#fff", fontSize: 18 }}>
          Comparing {selected.length} countries
        </h3>
      </div>
      <table
        style={{
          width: "100%",
          borderCollapse: "separate",
          borderSpacing: 0,
          fontSize: 13,
        }}
      >
        <thead>
          <tr>
            <th
              style={{
                textAlign: "left",
                padding: "10px 12px",
                color: "rgba(255,255,255,0.4)",
                fontWeight: 500,
                borderBottom: "1px solid rgba(255,255,255,0.08)",
                position: "sticky",
                left: 0,
                background: "#0F0F13",
                zIndex: 1,
                minWidth: 120,
              }}
            >
              Dimension
            </th>
            {selected.map((c) => (
              <th
                key={c.code}
                style={{
                  textAlign: "left",
                  padding: "10px 12px",
                  color: "#fff",
                  fontWeight: 600,
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                  minWidth: 180,
                }}
              >
                <span style={{ marginRight: 6 }}>{FLAG_EMOJI[c.code]}</span>
                {c.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td
              style={{
                padding: "8px 12px",
                color: "rgba(255,255,255,0.4)",
                fontWeight: 500,
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                position: "sticky",
                left: 0,
                background: "#0F0F13",
              }}
            >
              Voice & Accountability
            </td>
            {selected.map((c) => (
              <td
                key={c.code}
                style={{
                  padding: "8px 12px",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <MediaBar score={c.mediaScore} rank={c.rsfRank} />
              </td>
            ))}
          </tr>
          {fields.map((f) => (
            <tr key={f.key}>
              <td
                style={{
                  padding: "8px 12px",
                  color: "rgba(255,255,255,0.4)",
                  fontWeight: 500,
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                  position: "sticky",
                  left: 0,
                  background: "#0F0F13",
                }}
              >
                {f.label}
              </td>
              {selected.map((c) => (
                <td
                  key={c.code}
                  style={{
                    padding: "8px 12px",
                    color: "rgba(255,255,255,0.8)",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                    lineHeight: 1.4,
                  }}
                >
                  {String(c[f.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
