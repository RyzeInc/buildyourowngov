"use client";

import { useState, useMemo, useEffect } from "react";
import type { Country } from "@/data/types";
import { COUNTRIES, REGIONS } from "@/data/constants";
import { COUNTRY_INDICES, INDEX_DEFS } from "@/data/indices";
import CountryCard from "@/components/CountryCard";
import CountryDetail from "@/components/CountryDetail";
import CompareView from "@/components/CompareView";
import DesignStudio from "@/components/DesignStudio";
import StatsView from "@/components/StatsView";
import SourcesView from "@/components/SourcesView";

export default function Home() {
  const [tab, setTab] = useState("explore");
  const [search, setSearch] = useState("");
  const [filterGov, setFilterGov] = useState("All");
  const [filterRegion, setFilterRegion] = useState("All");
  const [filterFederal, setFilterFederal] = useState("All");
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [compareCodes, setCompareCodes] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("name");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  // Auto-navigate to tab from URL (e.g. shared design URLs use ?tab=design)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sharedTab = params.get("tab");
    if (sharedTab && ["explore", "compare", "design", "stats", "sources"].includes(sharedTab)) {
      setTab(sharedTab);
    }
  }, []);

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

  const sorted = useMemo(() => {
    const list = [...filtered];
    if (sortBy === "name") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "population") {
      const parsePopulation = (p: string) => {
        const n = parseFloat(p);
        if (p.includes("B")) return n * 1e9;
        if (p.includes("M")) return n * 1e6;
        return n;
      };
      list.sort((a, b) => parsePopulation(a.population) - parsePopulation(b.population));
    } else {
      // Sort by an index
      list.sort((a, b) => {
        const va = COUNTRY_INDICES[a.code]?.[sortBy] ?? null;
        const vb = COUNTRY_INDICES[b.code]?.[sortBy] ?? null;
        if (va === null && vb === null) return 0;
        if (va === null) return 1;
        if (vb === null) return -1;
        return va - vb;
      });
    }
    if (sortDir === "desc") list.reverse();
    return list;
  }, [filtered, sortBy, sortDir]);

  const activeIndexDef = useMemo(
    () => INDEX_DEFS.find((d) => d.id === sortBy) ?? null,
    [sortBy],
  );

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
    { id: "sources", label: "Sources" },
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
          rowGap: 12,
          columnGap: 12,
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
            rowGap: 4,
            columnGap: 4,
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
            {/* Search + Filters */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                rowGap: 8,
                columnGap: 8,
                marginBottom: 12,
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
              <div style={{ display: "flex", rowGap: 4, columnGap: 4, flexWrap: "wrap" }}>
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

            {/* Sort bar */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                rowGap: 8,
                columnGap: 8,
                marginBottom: 16,
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  color: "rgba(255,255,255,0.3)",
                  fontWeight: 500,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                Sort by
              </span>
              <select
                value={sortBy}
                onChange={(e) => {
                  const id = e.target.value;
                  setSortBy(id);
                  // Auto-set sensible direction
                  if (id === "name") {
                    setSortDir("asc");
                  } else {
                    const def = INDEX_DEFS.find((d) => d.id === id);
                    if (def) {
                      setSortDir(def.higherIsBetter ? "desc" : "asc");
                    } else {
                      setSortDir("desc"); // population
                    }
                  }
                }}
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
                <option value="name">Name (A–Z)</option>
                <option value="population">Population</option>
                {INDEX_DEFS.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
              <button
                onClick={() => setSortDir((d) => (d === "asc" ? "desc" : "asc"))}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 6,
                  padding: "5px 10px",
                  color: "rgba(255,255,255,0.5)",
                  fontSize: 12,
                  cursor: "pointer",
                  transition: "all 0.15s",
                  display: "flex",
                  alignItems: "center",
                  rowGap: 4,
                  columnGap: 4,
                }}
              >
                {sortDir === "asc" ? "↑ Low → High" : "↓ High → Low"}
              </button>

              <span
                style={{
                  fontSize: 12,
                  color: "rgba(255,255,255,0.25)",
                  marginLeft: 4,
                }}
              >
                {sorted.length} countries
              </span>

              {/* Active filter/sort indicator pills */}
              {(filterGov !== "All" || filterRegion !== "All" || filterFederal !== "All" || search) && (
                <button
                  onClick={() => {
                    setSearch("");
                    setFilterGov("All");
                    setFilterRegion("All");
                    setFilterFederal("All");
                  }}
                  style={{
                    background: "rgba(139,92,246,0.1)",
                    border: "1px solid rgba(139,92,246,0.2)",
                    borderRadius: 6,
                    padding: "4px 10px",
                    color: "rgba(139,92,246,0.7)",
                    fontSize: 11,
                    cursor: "pointer",
                    transition: "all 0.15s",
                  }}
                >
                  Clear filters ×
                </button>
              )}
            </div>

            {/* Active sort badge — explains the index when sorting by one */}
            {activeIndexDef && (
              <div
                style={{
                  background: `${activeIndexDef.color}0C`,
                  border: `1px solid ${activeIndexDef.color}25`,
                  borderRadius: 8,
                  padding: "8px 14px",
                  marginBottom: 14,
                  display: "flex",
                  alignItems: "center",
                  rowGap: 10,
                  columnGap: 10,
                }}
              >
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: activeIndexDef.color,
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontSize: 12,
                    color: "rgba(255,255,255,0.5)",
                    lineHeight: 1.4,
                  }}
                >
                  Sorted by <strong style={{ color: activeIndexDef.color }}>{activeIndexDef.fullName}</strong>
                  {" "}({activeIndexDef.source}, {activeIndexDef.year}).{" "}
                  {activeIndexDef.higherIsBetter
                    ? "Higher values rank first."
                    : "Lower values rank first."}
                  {" "}Scale: {activeIndexDef.scale}.
                </span>
              </div>
            )}

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                rowGap: 12,
                columnGap: 12,
              }}
            >
              {sorted.map((c) => (
                <CountryCard
                  key={c.code}
                  country={c}
                  onClick={() => setSelectedCountry(c)}
                  isCompare={compareCodes.includes(c.code)}
                  onToggleCompare={toggleCompare}
                  sortIndex={activeIndexDef ? {
                    value: COUNTRY_INDICES[c.code]?.[activeIndexDef.id] ?? null,
                    format: activeIndexDef.format,
                    color: activeIndexDef.color,
                    label: activeIndexDef.name,
                  } : undefined}
                />
              ))}
            </div>

            {sorted.length === 0 && (
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

        {tab === "sources" && <SourcesView />}
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
