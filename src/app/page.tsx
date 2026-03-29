"use client";

import { useState, useMemo } from "react";
import type { Country } from "@/data/types";
import { COUNTRIES, REGIONS } from "@/data/constants";
import CountryCard from "@/components/CountryCard";
import CountryDetail from "@/components/CountryDetail";
import CompareView from "@/components/CompareView";
import DesignStudio from "@/components/DesignStudio";
import StatsView from "@/components/StatsView";

export default function Home() {
  const [tab, setTab] = useState("explore");
  const [search, setSearch] = useState("");
  const [filterGov, setFilterGov] = useState("All");
  const [filterRegion, setFilterRegion] = useState("All");
  const [filterFederal, setFilterFederal] = useState("All");
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [compareCodes, setCompareCodes] = useState<string[]>([]);

  const filtered = useMemo(() => {
    return COUNTRIES.filter((c) => {
      if (
        search &&
        !c.name.toLowerCase().includes(search.toLowerCase()) &&
        !c.region.toLowerCase().includes(search.toLowerCase())
      )
        return false;
      if (filterGov !== "All" && !c.govType.includes(filterGov)) return false;
      if (filterRegion !== "All" && c.region !== filterRegion) return false;
      if (filterFederal !== "All" && !c.federal.includes(filterFederal))
        return false;
      return true;
    });
  }, [search, filterGov, filterRegion, filterFederal]);

  const toggleCompare = (code: string) => {
    setCompareCodes((prev) =>
      prev.includes(code)
        ? prev.filter((c) => c !== code)
        : prev.length < 5
          ? [...prev, code]
          : prev
    );
  };

  const tabs = [
    { id: "explore", label: "Explore" },
    {
      id: "compare",
      label: `Compare${compareCodes.length ? ` (${compareCodes.length})` : ""}`,
    },
    { id: "design", label: "Design" },
    { id: "stats", label: "Patterns" },
  ];

  const selStyle = (val: string, current: string) => ({
    background: val === current ? "rgba(255,255,255,0.1)" : "transparent",
    border: `1px solid ${val === current ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.06)"}`,
    color: val === current ? "#fff" : "rgba(255,255,255,0.4)",
    padding: "5px 12px",
    borderRadius: 6,
    fontSize: 12,
    cursor: "pointer" as const,
    transition: "all 0.15s",
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0F0F13",
        color: "#fff",
        fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
      }}
    >
      {/* Header */}
      <header
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          padding: "20px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: 20,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              fontFamily: "'Fraunces', serif",
              color: "#fff",
            }}
          >
            <span style={{ color: "#8B5CF6" }}>Polis</span> — Comparative
            Politics
          </h1>
          <div
            style={{
              fontSize: 11,
              color: "rgba(255,255,255,0.3)",
              marginTop: 2,
            }}
          >
            {COUNTRIES.length} nations · Growing toward full UN coverage
          </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: 4,
            background: "rgba(255,255,255,0.03)",
            borderRadius: 8,
            padding: 3,
          }}
        >
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setTab(t.id);
                setSelectedCountry(null);
              }}
              style={{
                background:
                  tab === t.id ? "rgba(255,255,255,0.1)" : "transparent",
                border: "none",
                color: tab === t.id ? "#fff" : "rgba(255,255,255,0.4)",
                padding: "7px 14px",
                borderRadius: 6,
                fontSize: 13,
                fontWeight: 500,
                cursor: "pointer",
                transition: "all 0.15s",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </header>

      {/* Main */}
      <main style={{ padding: "24px", maxWidth: 1200, margin: "0 auto" }}>
        {tab === "explore" && !selectedCountry && (
          <div style={{ animation: "fadeIn 0.3s ease" }}>
            {/* Filters */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
                marginBottom: 20,
                alignItems: "center",
              }}
            >
              <input
                type="text"
                placeholder="Search countries..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 8,
                  padding: "8px 14px",
                  color: "#fff",
                  fontSize: 13,
                  outline: "none",
                  width: 200,
                  transition: "border-color 0.15s",
                }}
                onFocus={(e) =>
                  (e.target.style.borderColor = "rgba(139,92,246,0.4)")
                }
                onBlur={(e) =>
                  (e.target.style.borderColor = "rgba(255,255,255,0.08)")
                }
              />
              <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                {[
                  "All",
                  "Presidential",
                  "Parliamentary",
                  "Semi-Presidential",
                ].map((g) => (
                  <button
                    key={g}
                    onClick={() => setFilterGov(g)}
                    style={selStyle(g, filterGov)}
                  >
                    {g}
                  </button>
                ))}
              </div>
              <select
                value={filterRegion}
                onChange={(e) => setFilterRegion(e.target.value)}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 6,
                  padding: "5px 10px",
                  color: "rgba(255,255,255,0.7)",
                  fontSize: 12,
                  outline: "none",
                }}
              >
                <option value="All">All Regions</option>
                {REGIONS.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
              <select
                value={filterFederal}
                onChange={(e) => setFilterFederal(e.target.value)}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 6,
                  padding: "5px 10px",
                  color: "rgba(255,255,255,0.7)",
                  fontSize: 12,
                  outline: "none",
                }}
              >
                <option value="All">All Structures</option>
                <option value="Federal">Federal</option>
                <option value="Unitary">Unitary</option>
              </select>
            </div>

            <div
              style={{
                fontSize: 12,
                color: "rgba(255,255,255,0.3)",
                marginBottom: 12,
              }}
            >
              {filtered.length} countries · Click to explore · Check to compare
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                gap: 12,
              }}
            >
              {filtered.map((c) => (
                <CountryCard
                  key={c.code}
                  country={c}
                  onClick={() => setSelectedCountry(c)}
                  isCompare={compareCodes.includes(c.code)}
                  onToggleCompare={toggleCompare}
                />
              ))}
            </div>

            {filtered.length === 0 && (
              <div
                style={{
                  textAlign: "center",
                  padding: 60,
                  color: "rgba(255,255,255,0.3)",
                }}
              >
                No countries match your filters. Try adjusting your search.
              </div>
            )}
          </div>
        )}

        {tab === "explore" && selectedCountry && (
          <CountryDetail
            country={selectedCountry}
            onBack={() => setSelectedCountry(null)}
          />
        )}

        {tab === "compare" && (
          <CompareView codes={compareCodes} countries={COUNTRIES} />
        )}

        {tab === "design" && <DesignStudio />}

        {tab === "stats" && <StatsView />}
      </main>

      <footer
        style={{
          borderTop: "1px solid rgba(255,255,255,0.04)",
          padding: "16px 24px",
          textAlign: "center",
          fontSize: 11,
          color: "rgba(255,255,255,0.2)",
        }}
      >
        Polis v1.0 · Press freedom data: RSF World Press Freedom Index 2025 ·
        Expanding to all 193 UN member states
      </footer>
    </div>
  );
}
