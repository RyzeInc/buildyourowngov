import { useState, useMemo, useEffect, useRef } from "react";

const COUNTRIES = [
  { name: "Argentina", code: "AR", region: "Americas", govType: "Presidential Republic", executive: "President (Head of State & Government)", legislative: "National Congress (Bicameral)", legislativeType: "Bicameral", judicial: "Supreme Court", economic: "Upper-middle income; market-oriented", media: "RSF 2025: Ranked 87th/180 — Difficult situation; Milei has stigmatised journalists and dismantled public media", mediaScore: 56.14, rsfRank: 87, federal: "Federal", checks: "Formal separation; presidential system", population: "46M", continent: "South America" },
  { name: "Australia", code: "AU", region: "Oceania", govType: "Parliamentary Democracy (Constitutional Monarchy)", executive: "Prime Minister (Head of Government); Monarch (Head of State)", legislative: "Parliament (Bicameral)", legislativeType: "Bicameral", judicial: "High Court", economic: "High-income; market economy", media: "RSF 2025: Ranked 29th/180 — Satisfactory situation; strong legal protections but media concentration concerns", mediaScore: 75.15, rsfRank: 29, federal: "Federal", checks: "Westminster system; executive fused with legislature", population: "26M", continent: "Oceania" },
  { name: "Brazil", code: "BR", region: "Americas", govType: "Presidential Republic", executive: "President (Head of State & Government)", legislative: "National Congress (Bicameral)", legislativeType: "Bicameral", judicial: "Supreme Federal Court", economic: "Upper-middle income; emerging market", media: "RSF 2025: Ranked 63rd/180 — Problematic situation; continued recovery after Bolsonaro era", mediaScore: 63.80, rsfRank: 63, federal: "Federal", checks: "Formal separation; presidential system", population: "216M", continent: "South America" },
  { name: "Canada", code: "CA", region: "Americas", govType: "Parliamentary Democracy (Constitutional Monarchy)", executive: "Prime Minister (Head of Government); Monarch (Head of State)", legislative: "Parliament (Bicameral)", legislativeType: "Bicameral", judicial: "Supreme Court", economic: "High-income; mixed economy", media: "RSF 2025: Ranked 21st/180 — Satisfactory situation; strong press freedoms but economic pressures on local media", mediaScore: 78.75, rsfRank: 21, federal: "Federal", checks: "Westminster system; executive fused with legislature", population: "40M", continent: "North America" },
  { name: "Chile", code: "CL", region: "Americas", govType: "Presidential Republic", executive: "President (Head of State & Government)", legislative: "National Congress (Bicameral)", legislativeType: "Bicameral", judicial: "Supreme Court", economic: "High-income; market-oriented", media: "RSF 2025: Ranked 68th/180 — Problematic situation; media concentration and ownership concerns", mediaScore: 62.25, rsfRank: 68, federal: "Unitary", checks: "Formal separation; presidential system", population: "19M", continent: "South America" },
  { name: "China", code: "CN", region: "Asia", govType: "Single-party Socialist Republic", executive: "President (Head of State); Premier (Head of Government)", legislative: "National People's Congress (Unicameral)", legislativeType: "Unicameral", judicial: "Supreme People's Court", economic: "Upper-middle income; state-led socialist market", media: "RSF 2025: Ranked 178th/180 — Very serious situation; world's biggest prison for journalists", mediaScore: 14.80, rsfRank: 178, federal: "Unitary", checks: "No formal separation; party-dominated", population: "1.4B", continent: "Asia" },
  { name: "Denmark", code: "DK", region: "Europe", govType: "Parliamentary Democracy (Constitutional Monarchy)", executive: "Prime Minister (Head of Government); Monarch (Head of State)", legislative: "Folketing (Unicameral)", legislativeType: "Unicameral", judicial: "Supreme Court", economic: "High-income; mixed welfare state", media: "RSF 2025: Ranked 6th/180 — Good situation; strong legal framework and editorial independence", mediaScore: 86.93, rsfRank: 6, federal: "Unitary", checks: "Negative parliamentarism; fused powers", population: "5.9M", continent: "Europe" },
  { name: "France", code: "FR", region: "Europe", govType: "Semi-Presidential Republic", executive: "President (Head of State); Prime Minister (Head of Government)", legislative: "Parliament (Bicameral)", legislativeType: "Bicameral", judicial: "Court of Cassation", economic: "High-income; mixed economy", media: "RSF 2025: Ranked 25th/180 — Satisfactory situation; robust press but economic and ownership pressures", mediaScore: 76.62, rsfRank: 25, federal: "Unitary", checks: "Executive shared; some separation", population: "68M", continent: "Europe" },
  { name: "Germany", code: "DE", region: "Europe", govType: "Parliamentary Republic", executive: "Chancellor (Head of Government); President (Ceremonial Head)", legislative: "Bundestag & Bundesrat (Bicameral)", legislativeType: "Bicameral", judicial: "Federal Constitutional Court", economic: "High-income; social market economy", media: "RSF 2025: Ranked 11th/180 — Good situation; strong public broadcasting and legal protections", mediaScore: 83.85, rsfRank: 11, federal: "Federal", checks: "Constructive vote of no confidence; fused executive-legislature", population: "84M", continent: "Europe" },
  { name: "Ghana", code: "GH", region: "Africa", govType: "Presidential Republic", executive: "President (Head of State & Government)", legislative: "Parliament (Unicameral)", legislativeType: "Unicameral", judicial: "Supreme Court", economic: "Lower-middle income; developing", media: "RSF 2025: Ranked 51st/180 — Problematic situation; relatively free press for the region", mediaScore: 67.13, rsfRank: 51, federal: "Unitary", checks: "Formal separation; presidential system", population: "34M", continent: "Africa" },
  { name: "Greece", code: "GR", region: "Europe", govType: "Parliamentary Republic", executive: "Prime Minister (Head of Government); President (Ceremonial)", legislative: "Parliament (Unicameral)", legislativeType: "Unicameral", judicial: "Supreme Court", economic: "High-income; advanced economy", media: "RSF 2025: Ranked 88th/180 — Difficult situation; surveillance of journalists and media concentration", mediaScore: 55.37, rsfRank: 88, federal: "Unitary", checks: "Westminster-style; fused powers", population: "10M", continent: "Europe" },
  { name: "Hungary", code: "HU", region: "Europe", govType: "Parliamentary Republic", executive: "Prime Minister (Head of Government); President (Ceremonial)", legislative: "National Assembly (Unicameral)", legislativeType: "Unicameral", judicial: "Curia (Supreme Court)", economic: "High-income; advanced economy", media: "RSF 2025: Ranked 67th/180 — Problematic situation; government influence over media landscape", mediaScore: 62.82, rsfRank: 67, federal: "Unitary", checks: "Fused powers; supermajority governance", population: "10M", continent: "Europe" },
  { name: "India", code: "IN", region: "Asia", govType: "Parliamentary Republic", executive: "Prime Minister (Head of Government); President (Head of State)", legislative: "Parliament (Bicameral)", legislativeType: "Bicameral", judicial: "Supreme Court", economic: "Lower-middle income; emerging market", media: "RSF 2025: Ranked 150th/180 — Very serious situation; media ownership concentration and pressure on journalists", mediaScore: 32.96, rsfRank: 150, federal: "Federal", checks: "Westminster-style; executive fused with legislature", population: "1.4B", continent: "Asia" },
  { name: "Israel", code: "IL", region: "Middle East", govType: "Parliamentary Republic", executive: "Prime Minister (Head of Government); President (Ceremonial)", legislative: "Knesset (Unicameral)", legislativeType: "Unicameral", judicial: "Supreme Court", economic: "High-income; advanced economy", media: "RSF 2025: Ranked 110th/180 — Difficult situation; press freedom impacted by conflict", mediaScore: 51.06, rsfRank: 110, federal: "Unitary", checks: "Fused executive-legislature", population: "9.8M", continent: "Asia" },
  { name: "Italy", code: "IT", region: "Europe", govType: "Parliamentary Republic", executive: "Prime Minister (Head of Government); President (Ceremonial)", legislative: "Parliament (Bicameral)", legislativeType: "Bicameral", judicial: "Court of Cassation", economic: "High-income; mixed economy", media: "RSF 2025: Ranked 48th/180 — Problematic situation; political pressure and organized crime threats", mediaScore: 68.01, rsfRank: 48, federal: "Unitary", checks: "Fused executive-legislature", population: "59M", continent: "Europe" },
  { name: "Japan", code: "JP", region: "Asia", govType: "Parliamentary Democracy (Constitutional Monarchy)", executive: "Prime Minister (Head of Government); Emperor (Ceremonial)", legislative: "National Diet (Bicameral)", legislativeType: "Bicameral", judicial: "Supreme Court", economic: "High-income; advanced market economy", media: "RSF 2025: Ranked 66th/180 — Problematic situation; press club system limits access", mediaScore: 63.14, rsfRank: 66, federal: "Unitary", checks: "Fused executive-legislature", population: "124M", continent: "Asia" },
  { name: "Kenya", code: "KE", region: "Africa", govType: "Presidential Republic", executive: "President (Head of State & Government)", legislative: "Parliament (Bicameral)", legislativeType: "Bicameral", judicial: "Supreme Court", economic: "Lower-middle income; developing", media: "RSF 2025: Ranked 115th/180 — Difficult situation; journalists face threats and economic pressure", mediaScore: 49.41, rsfRank: 115, federal: "Unitary", checks: "Formal separation; presidential system", population: "56M", continent: "Africa" },
  { name: "Mexico", code: "MX", region: "Americas", govType: "Presidential Republic", executive: "President (Head of State & Government)", legislative: "Congress (Bicameral)", legislativeType: "Bicameral", judicial: "Supreme Court", economic: "Upper-middle income; emerging market", media: "RSF 2025: Ranked 124th/180 — Difficult situation; most dangerous country for journalists in the region", mediaScore: 45.55, rsfRank: 124, federal: "Federal", checks: "Formal separation; presidential system", population: "130M", continent: "North America" },
  { name: "Netherlands", code: "NL", region: "Europe", govType: "Parliamentary Democracy (Constitutional Monarchy)", executive: "Prime Minister (Head of Government); Monarch (Head of State)", legislative: "States General (Bicameral)", legislativeType: "Bicameral", judicial: "Supreme Court", economic: "High-income; mixed economy", media: "RSF 2025: Ranked 3rd/180 — Good situation; strong legal and economic protections for press", mediaScore: 88.64, rsfRank: 3, federal: "Unitary", checks: "Fused executive-legislature", population: "18M", continent: "Europe" },
  { name: "Nigeria", code: "NG", region: "Africa", govType: "Presidential Republic", executive: "President (Head of State & Government)", legislative: "National Assembly (Bicameral)", legislativeType: "Bicameral", judicial: "Supreme Court", economic: "Lower-middle income; developing", media: "RSF 2025: Ranked 120th/180 — Difficult situation; journalists face arrests and economic pressure", mediaScore: 46.81, rsfRank: 120, federal: "Federal", checks: "Formal separation; presidential system", population: "224M", continent: "Africa" },
  { name: "Peru", code: "PE", region: "Americas", govType: "Presidential Republic", executive: "President (Head of State & Government)", legislative: "Congress (Unicameral)", legislativeType: "Unicameral", judicial: "Constitutional Court, Supreme Court", economic: "Upper-middle income; emerging market", media: "RSF 2025: Ranked 128th/180 — Difficult situation; political instability impacts press freedom", mediaScore: 42.88, rsfRank: 128, federal: "Unitary", checks: "Formal separation; presidential system", population: "34M", continent: "South America" },
  { name: "Philippines", code: "PH", region: "Asia", govType: "Presidential Republic", executive: "President (Head of State & Government)", legislative: "Congress (Bicameral)", legislativeType: "Bicameral", judicial: "Supreme Court", economic: "Lower-middle income; emerging market", media: "RSF 2025: Ranked 114th/180 — Difficult situation; vibrant online media but safety concerns persist", mediaScore: 49.57, rsfRank: 114, federal: "Unitary", checks: "Formal separation; presidential system", population: "117M", continent: "Asia" },
  { name: "Russia", code: "RU", region: "Europe/Asia", govType: "Semi-Presidential Republic", executive: "President (Head of State); Prime Minister (Head of Government)", legislative: "Federal Assembly (Bicameral)", legislativeType: "Bicameral", judicial: "Constitutional Court", economic: "Upper-middle income; transition economy", media: "RSF 2025: Ranked 169th/180 — Very serious situation; near-total state control, journalists imprisoned", mediaScore: 24.57, rsfRank: 169, federal: "Federal", checks: "Executive dominance; limited checks", population: "144M", continent: "Europe" },
  { name: "Singapore", code: "SG", region: "Asia", govType: "Parliamentary Republic", executive: "Prime Minister (Head of Government); President (Head of State)", legislative: "Parliament (Unicameral)", legislativeType: "Unicameral", judicial: "Supreme Court", economic: "High-income; highly developed market", media: "RSF 2025: Ranked 121st/180 — Difficult situation; government controls on media remain tight", mediaScore: 45.78, rsfRank: 121, federal: "Unitary", checks: "Fused executive-legislature; dominant party system", population: "6M", continent: "Asia" },
  { name: "South Africa", code: "ZA", region: "Africa", govType: "Parliamentary Republic", executive: "President (Head of State & Government)", legislative: "Parliament (Bicameral)", legislativeType: "Bicameral", judicial: "Constitutional Court", economic: "Upper-middle income; emerging market", media: "RSF 2025: Ranked 27th/180 — Satisfactory situation; vibrant and diverse media landscape", mediaScore: 75.71, rsfRank: 27, federal: "Unitary", checks: "Fusion of executive and legislature", population: "62M", continent: "Africa" },
  { name: "South Korea", code: "KR", region: "Asia", govType: "Presidential Republic", executive: "President (Head of State & Government)", legislative: "National Assembly (Unicameral)", legislativeType: "Unicameral", judicial: "Constitutional Court", economic: "High-income; advanced economy", media: "RSF 2025: Ranked 60th/180 — Problematic situation; political polarization affects media environment", mediaScore: 64.06, rsfRank: 60, federal: "Unitary", checks: "Formal separation; presidential system", population: "52M", continent: "Asia" },
  { name: "Sweden", code: "SE", region: "Europe", govType: "Parliamentary Democracy (Constitutional Monarchy)", executive: "Prime Minister (Head of Government); Monarch (Ceremonial)", legislative: "Riksdag (Unicameral)", legislativeType: "Unicameral", judicial: "Supreme Court", economic: "High-income; mixed welfare state", media: "RSF 2025: Ranked 4th/180 — Good situation; strong legal framework and editorial independence", mediaScore: 88.13, rsfRank: 4, federal: "Unitary", checks: "Fused executive-legislature", population: "10M", continent: "Europe" },
  { name: "Turkey", code: "TR", region: "Europe/Asia", govType: "Presidential Republic", executive: "President (Head of State & Government)", legislative: "Grand National Assembly (Unicameral)", legislativeType: "Unicameral", judicial: "Constitutional Court", economic: "Upper-middle income; emerging market", media: "RSF 2025: Ranked 157th/180 — Very serious situation; widespread censorship and journalist persecution", mediaScore: 29.40, rsfRank: 157, federal: "Unitary", checks: "Executive dominance; limited checks", population: "85M", continent: "Asia" },
  { name: "United Kingdom", code: "GB", region: "Europe", govType: "Parliamentary Democracy (Constitutional Monarchy)", executive: "Prime Minister (Head of Government); Monarch (Head of State)", legislative: "Parliament (Bicameral)", legislativeType: "Bicameral", judicial: "Supreme Court", economic: "High-income; advanced economy", media: "RSF 2025: Ranked 20th/180 — Satisfactory situation; ownership concentration is weakest indicator", mediaScore: 78.89, rsfRank: 20, federal: "Unitary with devolved powers", checks: "Westminster system; parliamentary sovereignty; fused powers", population: "68M", continent: "Europe" },
  { name: "United States", code: "US", region: "Americas", govType: "Presidential Republic", executive: "President (Head of State & Government)", legislative: "Congress (Bicameral)", legislativeType: "Bicameral", judicial: "Supreme Court", economic: "High-income; market-oriented economy", media: "RSF 2025: Ranked 57th/180 — Problematic situation; lowest ranking ever; news deserts and media distrust", mediaScore: 65.49, rsfRank: 57, federal: "Federal", checks: "Strong formal separation; checks and balances", population: "335M", continent: "North America" },
];

const FLAG_EMOJI = { AR:"🇦🇷",AU:"🇦🇺",BR:"🇧🇷",CA:"🇨🇦",CL:"🇨🇱",CN:"🇨🇳",DK:"🇩🇰",FR:"🇫🇷",DE:"🇩🇪",GH:"🇬🇭",GR:"🇬🇷",HU:"🇭🇺",IN:"🇮🇳",IL:"🇮🇱",IT:"🇮🇹",JP:"🇯🇵",KE:"🇰🇪",MX:"🇲🇽",NL:"🇳🇱",NG:"🇳🇬",PE:"🇵🇪",PH:"🇵🇭",RU:"🇷🇺",SG:"🇸🇬",ZA:"🇿🇦",KR:"🇰🇷",SE:"🇸🇪",TR:"🇹🇷",GB:"🇬🇧",US:"🇺🇸" };

const GOV_TYPES = ["Presidential Republic","Parliamentary Republic","Parliamentary Democracy (Constitutional Monarchy)","Semi-Presidential Republic","Single-party Socialist Republic"];
const REGIONS = [...new Set(COUNTRIES.map(c=>c.region))].sort();

const DESIGN_OPTIONS = {
  executive: [
    { id: "presidential", label: "Presidential", desc: "Directly elected president serves as head of state and government", examples: "USA, Brazil, South Korea" },
    { id: "parliamentary", label: "Parliamentary", desc: "Prime minister drawn from legislature, ceremonial head of state", examples: "Germany, UK, India" },
    { id: "semi-presidential", label: "Semi-Presidential", desc: "Elected president shares power with PM accountable to parliament", examples: "France" },
    { id: "constitutional-monarchy", label: "Constitutional Monarchy", desc: "Hereditary monarch as head of state, PM governs", examples: "Denmark, Japan, Sweden" },
  ],
  legislative: [
    { id: "bicameral-proportional", label: "Bicameral + Proportional", desc: "Two chambers; lower house elected by proportional representation", examples: "Germany, Netherlands" },
    { id: "bicameral-majoritarian", label: "Bicameral + Majoritarian", desc: "Two chambers; first-past-the-post or plurality voting", examples: "USA, UK, India" },
    { id: "unicameral", label: "Unicameral", desc: "Single legislative chamber", examples: "Denmark, Sweden, Israel" },
    { id: "bicameral-mixed", label: "Bicameral + Mixed", desc: "Two chambers with mixed electoral systems", examples: "Japan, South Korea" },
  ],
  judicial: [
    { id: "constitutional-court", label: "Dedicated Constitutional Court", desc: "Separate court focused on constitutional review with citizen access", examples: "Germany, South Africa, South Korea" },
    { id: "supreme-court", label: "Supreme Court (General)", desc: "Highest court handles both constitutional and appellate cases", examples: "USA, India, Canada" },
    { id: "dual-court", label: "Dual Court System", desc: "Separate constitutional and supreme courts", examples: "Peru, France" },
  ],
  federal: [
    { id: "federal", label: "Federal", desc: "Power shared between national and subnational governments", examples: "Germany, Canada, USA" },
    { id: "unitary", label: "Unitary", desc: "Central government holds primary authority", examples: "France, Japan, South Korea" },
    { id: "devolved", label: "Unitary with Devolution", desc: "Central government delegates some powers to regions", examples: "United Kingdom, Italy" },
  ],
  economic: [
    { id: "social-market", label: "Social Market Economy", desc: "Free market with strong social safety net and worker protections", examples: "Germany, Nordics" },
    { id: "free-market", label: "Free Market Economy", desc: "Minimal state intervention, emphasis on private enterprise", examples: "USA, Singapore" },
    { id: "mixed", label: "Mixed Economy", desc: "Balance of market forces and government intervention", examples: "France, Canada, UK" },
    { id: "state-led", label: "State-Led Economy", desc: "Government plays dominant role in economic planning", examples: "China, Singapore (partial)" },
  ],
  checks: [
    { id: "strong-separation", label: "Strong Separation of Powers", desc: "Independent branches with formal checks on each other", examples: "USA" },
    { id: "constructive-noconfidence", label: "Constructive No-Confidence", desc: "Can only remove PM by simultaneously electing a successor", examples: "Germany" },
    { id: "fused-westminster", label: "Westminster Fusion", desc: "Executive drawn from legislature with parliamentary sovereignty", examples: "UK, Australia, Canada" },
    { id: "independent-bodies", label: "Independent Oversight Bodies", desc: "Anti-corruption agencies, ombudsmen, electoral commissions", examples: "Singapore, Nordics" },
  ],
};

const CATEGORY_COLORS = {
  executive: { bg: "#2D1B69", accent: "#8B5CF6", light: "#EDE9FE", text: "#C4B5FD" },
  legislative: { bg: "#134E4A", accent: "#14B8A6", light: "#CCFBF1", text: "#5EEAD4" },
  judicial: { bg: "#7C2D12", accent: "#F97316", light: "#FFF7ED", text: "#FDBA74" },
  federal: { bg: "#1E3A5F", accent: "#3B82F6", light: "#EFF6FF", text: "#93C5FD" },
  economic: { bg: "#14532D", accent: "#22C55E", light: "#F0FDF4", text: "#86EFAC" },
  checks: { bg: "#78350F", accent: "#F59E0B", light: "#FFFBEB", text: "#FCD34D" },
};

const CATEGORY_LABELS = {
  executive: "Executive Branch",
  legislative: "Legislative Branch",
  judicial: "Judicial Branch",
  federal: "Federal Structure",
  economic: "Economic Model",
  checks: "Checks & Balances",
};

function MediaBar({ score, rank }) {
  const color = score >= 70 ? "#22C55E" : score >= 55 ? "#F59E0B" : score >= 40 ? "#F97316" : "#EF4444";
  const label = score >= 85 ? "Good" : score >= 70 ? "Satisfactory" : score >= 55 ? "Problematic" : score >= 40 ? "Difficult" : "Very serious";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ flex: 1, height: 6, background: "rgba(255,255,255,0.08)", borderRadius: 3, overflow: "hidden" }}>
        <div style={{ width: `${score}%`, height: "100%", background: color, borderRadius: 3, transition: "width 0.6s ease" }} />
      </div>
      <span style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", minWidth: 60, textAlign: "right" }}>
        {score.toFixed(1)}{rank ? ` #${rank}` : ""}
      </span>
    </div>
  );
}

function CountryCard({ country, onClick, isCompare, onToggleCompare, compact }) {
  const govColor = country.govType.includes("Presidential") && !country.govType.includes("Semi")
    ? "#8B5CF6" : country.govType.includes("Parliamentary")
    ? "#14B8A6" : country.govType.includes("Semi")
    ? "#F97316" : "#EF4444";

  return (
    <div onClick={onClick} style={{
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.06)",
      borderRadius: 12,
      padding: compact ? "14px 16px" : "20px 22px",
      cursor: "pointer",
      transition: "all 0.2s ease",
      position: "relative",
    }}
    onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
    onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.transform = "translateY(0)"; }}
    >
      {onToggleCompare && (
        <button onClick={e => { e.stopPropagation(); onToggleCompare(country.code); }} style={{
          position: "absolute", top: 10, right: 10, width: 22, height: 22, borderRadius: 4,
          border: isCompare ? "none" : "1.5px solid rgba(255,255,255,0.2)",
          background: isCompare ? "#8B5CF6" : "transparent",
          color: "#fff", fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          transition: "all 0.15s",
        }}>{isCompare ? "✓" : ""}</button>
      )}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: compact ? 6 : 10 }}>
        <span style={{ fontSize: compact ? 22 : 28 }}>{FLAG_EMOJI[country.code]}</span>
        <div>
          <div style={{ fontWeight: 600, fontSize: compact ? 14 : 16, color: "#fff", letterSpacing: "-0.01em" }}>{country.name}</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 1 }}>{country.region} · {country.population}</div>
        </div>
      </div>
      <div style={{
        display: "inline-block", fontSize: 10, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase",
        color: govColor, background: `${govColor}18`, padding: "3px 8px", borderRadius: 4, marginBottom: compact ? 6 : 10,
      }}>{country.govType.split("(")[0].trim()}</div>
      {!compact && (
        <>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginBottom: 4 }}>RSF Press Freedom Index</div>
          <MediaBar score={country.mediaScore} rank={country.rsfRank} />
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 8 }}>{country.federal} · {country.legislativeType}</div>
        </>
      )}
    </div>
  );
}

function CountryDetail({ country, onBack }) {
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
      <button onClick={onBack} style={{
        background: "none", border: "none", color: "rgba(255,255,255,0.5)", cursor: "pointer",
        fontSize: 13, marginBottom: 16, padding: 0, display: "flex", alignItems: "center", gap: 4,
      }}>← Back to all countries</button>
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
        <span style={{ fontSize: 48 }}>{FLAG_EMOJI[country.code]}</span>
        <div>
          <h2 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: "#fff", letterSpacing: "-0.02em" }}>{country.name}</h2>
          <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, marginTop: 2 }}>{country.govType}</div>
          <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 13, marginTop: 2 }}>{country.region} · Population: {country.population}</div>
        </div>
      </div>

      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 6 }}>RSF Press Freedom Index 2025 — Rank #{country.rsfRank}/180</div>
        <MediaBar score={country.mediaScore} rank={country.rsfRank} />
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>{country.media}</div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 }}>
        {sections.map(s => (
          <div key={s.label} style={{
            background: `${s.color.accent}08`, border: `1px solid ${s.color.accent}20`,
            borderRadius: 10, padding: "16px 18px",
          }}>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: s.color.accent, marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontSize: 14, color: "rgba(255,255,255,0.85)", lineHeight: 1.5 }}>{s.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CompareView({ codes, countries, onClose }) {
  const selected = countries.filter(c => codes.includes(c.code));
  if (selected.length < 2) return (
    <div style={{ textAlign: "center", padding: 40, color: "rgba(255,255,255,0.4)" }}>
      Select at least 2 countries to compare (use the checkboxes on country cards)
    </div>
  );

  const fields = [
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
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <h3 style={{ margin: 0, color: "#fff", fontSize: 18 }}>Comparing {selected.length} countries</h3>
      </div>
      <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0, fontSize: 13 }}>
        <thead>
          <tr>
            <th style={{ textAlign: "left", padding: "10px 12px", color: "rgba(255,255,255,0.4)", fontWeight: 500, borderBottom: "1px solid rgba(255,255,255,0.08)", position: "sticky", left: 0, background: "#0F0F13", zIndex: 1, minWidth: 120 }}>Dimension</th>
            {selected.map(c => (
              <th key={c.code} style={{ textAlign: "left", padding: "10px 12px", color: "#fff", fontWeight: 600, borderBottom: "1px solid rgba(255,255,255,0.08)", minWidth: 180 }}>
                <span style={{ marginRight: 6 }}>{FLAG_EMOJI[c.code]}</span>{c.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: "8px 12px", color: "rgba(255,255,255,0.4)", fontWeight: 500, borderBottom: "1px solid rgba(255,255,255,0.06)", position: "sticky", left: 0, background: "#0F0F13" }}>RSF Press Freedom</td>
            {selected.map(c => (
              <td key={c.code} style={{ padding: "8px 12px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <MediaBar score={c.mediaScore} rank={c.rsfRank} />
              </td>
            ))}
          </tr>
          {fields.map(f => (
            <tr key={f.key}>
              <td style={{ padding: "8px 12px", color: "rgba(255,255,255,0.4)", fontWeight: 500, borderBottom: "1px solid rgba(255,255,255,0.06)", position: "sticky", left: 0, background: "#0F0F13" }}>{f.label}</td>
              {selected.map(c => (
                <td key={c.code} style={{ padding: "8px 12px", color: "rgba(255,255,255,0.8)", borderBottom: "1px solid rgba(255,255,255,0.06)", lineHeight: 1.4 }}>{c[f.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function DesignStudio() {
  const [selections, setSelections] = useState({});
  const [showSummary, setShowSummary] = useState(false);

  const handleSelect = (category, id) => {
    setSelections(prev => ({ ...prev, [category]: id }));
  };

  const completionCount = Object.keys(selections).length;
  const totalCategories = Object.keys(DESIGN_OPTIONS).length;

  const getStrengths = () => {
    const strengths = [];
    const weaknesses = [];
    if (selections.executive === "semi-presidential") strengths.push("Flexible executive that can handle both domestic and foreign challenges");
    if (selections.executive === "presidential") weaknesses.push("Risk of executive-legislative gridlock");
    if (selections.legislative === "bicameral-proportional") strengths.push("Proportional representation ensures minority voices are heard");
    if (selections.legislative === "unicameral") { strengths.push("Fast, efficient lawmaking"); weaknesses.push("Fewer legislative checks on majority power"); }
    if (selections.judicial === "constitutional-court") strengths.push("Dedicated constitutional review with citizen access strengthens rights protection");
    if (selections.federal === "federal") strengths.push("Regional autonomy accommodates local diversity");
    if (selections.federal === "unitary") { strengths.push("Clear, unified national policy"); weaknesses.push("Less room for regional experimentation"); }
    if (selections.economic === "social-market") strengths.push("Strong safety net enables economic risk-taking and social mobility");
    if (selections.economic === "free-market") { strengths.push("Maximum economic dynamism and innovation"); weaknesses.push("Risk of inequality without corrective policy"); }
    if (selections.checks === "constructive-noconfidence") strengths.push("Government stability — can't topple without a replacement");
    if (selections.checks === "independent-bodies") strengths.push("Institutional accountability beyond electoral cycles");
    if (selections.checks === "strong-separation" && selections.executive === "parliamentary") weaknesses.push("Tension: strong separation pairs awkwardly with parliamentary executive");
    return { strengths, weaknesses };
  };

  return (
    <div style={{ animation: "fadeIn 0.3s ease" }}>
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ margin: "0 0 6px", fontSize: 22, fontWeight: 700, color: "#fff", letterSpacing: "-0.02em" }}>Design your government</h2>
        <p style={{ margin: 0, color: "rgba(255,255,255,0.45)", fontSize: 14, lineHeight: 1.5 }}>
          Mix and match institutional features from governments worldwide. Select one option from each category to build your ideal system.
        </p>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
        <div style={{ flex: 1, height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}>
          <div style={{ width: `${(completionCount / totalCategories) * 100}%`, height: "100%", background: "linear-gradient(90deg, #8B5CF6, #14B8A6)", borderRadius: 2, transition: "width 0.4s ease" }} />
        </div>
        <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>{completionCount}/{totalCategories}</span>
      </div>

      {Object.entries(DESIGN_OPTIONS).map(([category, options]) => {
        const colors = CATEGORY_COLORS[category];
        return (
          <div key={category} style={{ marginBottom: 20 }}>
            <div style={{
              fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
              color: colors.accent, marginBottom: 10, display: "flex", alignItems: "center", gap: 6,
            }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: selections[category] ? colors.accent : "rgba(255,255,255,0.15)" }} />
              {CATEGORY_LABELS[category]}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 8 }}>
              {options.map(opt => {
                const isSelected = selections[category] === opt.id;
                return (
                  <button key={opt.id} onClick={() => handleSelect(category, opt.id)} style={{
                    background: isSelected ? `${colors.accent}15` : "rgba(255,255,255,0.02)",
                    border: `1.5px solid ${isSelected ? colors.accent : "rgba(255,255,255,0.06)"}`,
                    borderRadius: 10, padding: "12px 14px", cursor: "pointer", textAlign: "left",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={e => { if (!isSelected) { e.currentTarget.style.borderColor = `${colors.accent}50`; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}}
                  onMouseLeave={e => { if (!isSelected) { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.background = "rgba(255,255,255,0.02)"; }}}
                  >
                    <div style={{ fontWeight: 600, fontSize: 13, color: isSelected ? colors.accent : "rgba(255,255,255,0.85)", marginBottom: 3 }}>{opt.label}</div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", lineHeight: 1.4, marginBottom: 4 }}>{opt.desc}</div>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.25)" }}>e.g. {opt.examples}</div>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}

      {completionCount >= 3 && (
        <div style={{
          marginTop: 24, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 14, padding: "22px 24px", animation: "fadeIn 0.4s ease",
        }}>
          <h3 style={{ margin: "0 0 14px", fontSize: 16, color: "#fff", fontWeight: 600 }}>
            {completionCount === totalCategories ? "Your complete government design" : `Analysis (${completionCount}/${totalCategories} selected)`}
          </h3>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
            {Object.entries(selections).map(([cat, id]) => {
              const opt = DESIGN_OPTIONS[cat].find(o => o.id === id);
              const colors = CATEGORY_COLORS[cat];
              return (
                <div key={cat} style={{
                  background: `${colors.accent}12`, border: `1px solid ${colors.accent}30`,
                  borderRadius: 6, padding: "6px 10px", fontSize: 11,
                }}>
                  <span style={{ color: colors.accent, fontWeight: 600 }}>{CATEGORY_LABELS[cat]}:</span>
                  <span style={{ color: "rgba(255,255,255,0.7)", marginLeft: 4 }}>{opt?.label}</span>
                </div>
              );
            })}
          </div>

          {(() => {
            const { strengths, weaknesses } = getStrengths();
            return (
              <div style={{ display: "grid", gridTemplateColumns: strengths.length && weaknesses.length ? "1fr 1fr" : "1fr", gap: 16 }}>
                {strengths.length > 0 && (
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: "#22C55E", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>Strengths</div>
                    {strengths.map((s, i) => (
                      <div key={i} style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", marginBottom: 6, paddingLeft: 12, borderLeft: "2px solid rgba(34,197,94,0.3)", lineHeight: 1.4 }}>{s}</div>
                    ))}
                  </div>
                )}
                {weaknesses.length > 0 && (
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: "#F59E0B", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>Tensions to watch</div>
                    {weaknesses.map((w, i) => (
                      <div key={i} style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", marginBottom: 6, paddingLeft: 12, borderLeft: "2px solid rgba(245,158,11,0.3)", lineHeight: 1.4 }}>{w}</div>
                    ))}
                  </div>
                )}
              </div>
            );
          })()}

          {completionCount === totalCategories && (
            <div style={{ marginTop: 16, padding: "12px 16px", background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.2)", borderRadius: 8 }}>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", lineHeight: 1.5 }}>
                Your design combines elements from multiple real-world systems. No existing country uses this exact combination — you've created something original. As more countries are added to the database, you'll be able to find even more institutional innovations to incorporate.
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function StatsView() {
  const govTypeCounts = {};
  const federalCounts = { Federal: 0, Unitary: 0 };
  const legislativeCounts = { Bicameral: 0, Unicameral: 0 };
  let avgMedia = 0;

  COUNTRIES.forEach(c => {
    const t = c.govType.includes("Presidential") && !c.govType.includes("Semi") ? "Presidential" : c.govType.includes("Parliamentary") ? "Parliamentary" : c.govType.includes("Semi") ? "Semi-Presidential" : "Other";
    govTypeCounts[t] = (govTypeCounts[t] || 0) + 1;
    if (c.federal.includes("Federal")) federalCounts.Federal++;
    else federalCounts.Unitary++;
    if (c.legislativeType === "Bicameral") legislativeCounts.Bicameral++;
    else legislativeCounts.Unicameral++;
    avgMedia += c.mediaScore;
  });
  avgMedia = avgMedia / COUNTRIES.length;

  const topMedia = [...COUNTRIES].sort((a, b) => b.mediaScore - a.mediaScore).slice(0, 5);
  const bottomMedia = [...COUNTRIES].sort((a, b) => a.mediaScore - b.mediaScore).slice(0, 5);

  const BarChart = ({ data, color }) => {
    const max = Math.max(...Object.values(data));
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {Object.entries(data).map(([label, value]) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 110, fontSize: 12, color: "rgba(255,255,255,0.5)", textAlign: "right", flexShrink: 0 }}>{label}</div>
            <div style={{ flex: 1, height: 20, background: "rgba(255,255,255,0.04)", borderRadius: 4, overflow: "hidden" }}>
              <div style={{ width: `${(value / max) * 100}%`, height: "100%", background: color, borderRadius: 4, transition: "width 0.6s ease", display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: 6, fontSize: 11, color: "#fff", fontWeight: 600 }}>{value}</div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={{ animation: "fadeIn 0.3s ease" }}>
      <h2 style={{ margin: "0 0 20px", fontSize: 22, fontWeight: 700, color: "#fff" }}>Global patterns</h2>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16, marginBottom: 24 }}>
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>Countries tracked</div>
          <div style={{ fontSize: 36, fontWeight: 700, color: "#fff" }}>{COUNTRIES.length}<span style={{ fontSize: 14, color: "rgba(255,255,255,0.3)", fontWeight: 400 }}> / 193 UN</span></div>
        </div>
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>Avg. RSF score</div>
          <div style={{ fontSize: 36, fontWeight: 700, color: avgMedia >= 60 ? "#22C55E" : "#F59E0B" }}>{avgMedia.toFixed(1)}<span style={{ fontSize: 14, color: "rgba(255,255,255,0.3)", fontWeight: 400 }}> /100</span></div>
        </div>
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>Most common system</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: "#8B5CF6" }}>Presidential Republic</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#fff", marginBottom: 12 }}>Government types</div>
          <BarChart data={govTypeCounts} color="#8B5CF6" />
        </div>
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#fff", marginBottom: 12 }}>Federal vs. Unitary</div>
          <BarChart data={federalCounts} color="#3B82F6" />
          <div style={{ marginTop: 16, fontSize: 13, fontWeight: 600, color: "#fff", marginBottom: 12 }}>Legislative structure</div>
          <BarChart data={legislativeCounts} color="#14B8A6" />
        </div>
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#fff", marginBottom: 12 }}>RSF top 5 (freest press)</div>
          {topMedia.map(c => (
            <div key={c.code} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <span style={{ fontSize: 16 }}>{FLAG_EMOJI[c.code]}</span>
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", flex: 1 }}>{c.name}</span>
              <MediaBar score={c.mediaScore} rank={c.rsfRank} />
            </div>
          ))}
        </div>
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#fff", marginBottom: 12 }}>RSF bottom 5 (least free press)</div>
          {bottomMedia.map(c => (
            <div key={c.code} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <span style={{ fontSize: 16 }}>{FLAG_EMOJI[c.code]}</span>
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", flex: 1 }}>{c.name}</span>
              <MediaBar score={c.mediaScore} rank={c.rsfRank} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState("explore");
  const [search, setSearch] = useState("");
  const [filterGov, setFilterGov] = useState("All");
  const [filterRegion, setFilterRegion] = useState("All");
  const [filterFederal, setFilterFederal] = useState("All");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [compareCodes, setCompareCodes] = useState([]);
  const [showCompare, setShowCompare] = useState(false);

  const filtered = useMemo(() => {
    return COUNTRIES.filter(c => {
      if (search && !c.name.toLowerCase().includes(search.toLowerCase()) && !c.region.toLowerCase().includes(search.toLowerCase())) return false;
      if (filterGov !== "All" && !c.govType.includes(filterGov)) return false;
      if (filterRegion !== "All" && c.region !== filterRegion) return false;
      if (filterFederal !== "All" && !c.federal.includes(filterFederal)) return false;
      return true;
    });
  }, [search, filterGov, filterRegion, filterFederal]);

  const toggleCompare = (code) => {
    setCompareCodes(prev => prev.includes(code) ? prev.filter(c => c !== code) : prev.length < 5 ? [...prev, code] : prev);
  };

  const tabs = [
    { id: "explore", label: "Explore" },
    { id: "compare", label: `Compare${compareCodes.length ? ` (${compareCodes.length})` : ""}` },
    { id: "design", label: "Design" },
    { id: "stats", label: "Patterns" },
  ];

  const selStyle = (val, current) => ({
    background: val === current ? "rgba(255,255,255,0.1)" : "transparent",
    border: `1px solid ${val === current ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.06)"}`,
    color: val === current ? "#fff" : "rgba(255,255,255,0.4)",
    padding: "5px 12px", borderRadius: 6, fontSize: 12, cursor: "pointer",
    transition: "all 0.15s",
  });

  return (
    <div style={{
      minHeight: "100vh", background: "#0F0F13", color: "#fff",
      fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&family=Fraunces:opsz,wght@9..144,400;9..144,700&display=swap');
        @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        * { box-sizing: border-box; }
        input[type="range"] { -webkit-appearance: none; height: 4px; background: rgba(255,255,255,0.1); border-radius: 2px; outline: none; }
        input[type="range"]::-webkit-slider-thumb { -webkit-appearance: none; width: 14px; height: 14px; border-radius: 50%; background: #8B5CF6; cursor: pointer; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }
      `}</style>

      {/* Header */}
      <header style={{
        borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "20px 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12,
      }}>
        <div>
          <h1 style={{
            margin: 0, fontSize: 20, fontWeight: 700, letterSpacing: "-0.03em",
            fontFamily: "'Fraunces', serif", color: "#fff",
          }}>
            <span style={{ color: "#8B5CF6" }}>Polis</span> — Comparative Politics
          </h1>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 2 }}>{COUNTRIES.length} nations · Growing toward full UN coverage</div>
        </div>
        <div style={{ display: "flex", gap: 4, background: "rgba(255,255,255,0.03)", borderRadius: 8, padding: 3 }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => { setTab(t.id); setSelectedCountry(null); }} style={{
              background: tab === t.id ? "rgba(255,255,255,0.1)" : "transparent",
              border: "none", color: tab === t.id ? "#fff" : "rgba(255,255,255,0.4)",
              padding: "7px 14px", borderRadius: 6, fontSize: 13, fontWeight: 500,
              cursor: "pointer", transition: "all 0.15s",
            }}>{t.label}</button>
          ))}
        </div>
      </header>

      {/* Main */}
      <main style={{ padding: "24px", maxWidth: 1200, margin: "0 auto" }}>

        {tab === "explore" && !selectedCountry && (
          <div style={{ animation: "fadeIn 0.3s ease" }}>
            {/* Filters */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20, alignItems: "center" }}>
              <input
                type="text" placeholder="Search countries..." value={search} onChange={e => setSearch(e.target.value)}
                style={{
                  background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 8, padding: "8px 14px", color: "#fff", fontSize: 13, outline: "none",
                  width: 200, transition: "border-color 0.15s",
                }}
                onFocus={e => e.target.style.borderColor = "rgba(139,92,246,0.4)"}
                onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
              />
              <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                {["All", "Presidential", "Parliamentary", "Semi-Presidential"].map(g => (
                  <button key={g} onClick={() => setFilterGov(g)} style={selStyle(g, filterGov)}>{g}</button>
                ))}
              </div>
              <select value={filterRegion} onChange={e => setFilterRegion(e.target.value)} style={{
                background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 6, padding: "5px 10px", color: "rgba(255,255,255,0.7)", fontSize: 12, outline: "none",
              }}>
                <option value="All">All Regions</option>
                {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
              <select value={filterFederal} onChange={e => setFilterFederal(e.target.value)} style={{
                background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 6, padding: "5px 10px", color: "rgba(255,255,255,0.7)", fontSize: 12, outline: "none",
              }}>
                <option value="All">All Structures</option>
                <option value="Federal">Federal</option>
                <option value="Unitary">Unitary</option>
              </select>
            </div>

            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", marginBottom: 12 }}>{filtered.length} countries · Click to explore · Check to compare</div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 12 }}>
              {filtered.map(c => (
                <CountryCard
                  key={c.code} country={c}
                  onClick={() => setSelectedCountry(c)}
                  isCompare={compareCodes.includes(c.code)}
                  onToggleCompare={toggleCompare}
                />
              ))}
            </div>

            {filtered.length === 0 && (
              <div style={{ textAlign: "center", padding: 60, color: "rgba(255,255,255,0.3)" }}>
                No countries match your filters. Try adjusting your search.
              </div>
            )}
          </div>
        )}

        {tab === "explore" && selectedCountry && (
          <CountryDetail country={selectedCountry} onBack={() => setSelectedCountry(null)} />
        )}

        {tab === "compare" && (
          <CompareView codes={compareCodes} countries={COUNTRIES} onClose={() => setShowCompare(false)} />
        )}

        {tab === "design" && <DesignStudio />}

        {tab === "stats" && <StatsView />}
      </main>

      <footer style={{
        borderTop: "1px solid rgba(255,255,255,0.04)", padding: "16px 24px", textAlign: "center",
        fontSize: 11, color: "rgba(255,255,255,0.2)",
      }}>
        Polis v1.0 · Press freedom data: RSF World Press Freedom Index 2025 · Expanding to all 193 UN member states
      </footer>
    </div>
  );
}
