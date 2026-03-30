import type { Country } from "./types";

// ────────────────────────────────────────────────
// EDUCATIONAL CONTENT FOR COUNTRY DETAIL CARDS
// ────────────────────────────────────────────────
// Each section has:
//   concept  — universal "what is this?" explanation
//   patterns — value-matched explanations (first matching pattern wins)
//   countryContext — function generating country-specific insight

interface PatternExplanation {
  /** Substring or regex to match against the section value */
  match: string | RegExp;
  /** Plain-language explanation of what this particular value means */
  explanation: string;
  /** Short "in practice" note */
  inPractice: string;
}

interface SectionEducation {
  concept: string;
  sources: string[];
  patterns: PatternExplanation[];
  countryContext: (c: Country) => string;
}

function matchPattern(value: string, patterns: PatternExplanation[]): PatternExplanation | undefined {
  for (const p of patterns) {
    if (typeof p.match === "string") {
      if (value.toLowerCase().includes(p.match.toLowerCase())) return p;
    } else {
      if (p.match.test(value)) return p;
    }
  }
  return undefined;
}

/** Section label map for display */
const SECTION_LABELS: Record<string, string> = {
  executive: "Executive System",
  legislative: "Legislative System",
  judicial: "Judicial System",
  federal: "Federal Structure",
  economic: "Economic System",
  checks: "Checks & Balances",
};

// ────────────────────────────────────────────────
// PUBLISHER / ORGANIZATION INDEX
// ────────────────────────────────────────────────

export interface Publisher {
  id: number;
  name: string;
  abbreviation?: string;
  url?: string;
  type: string;
  founded: string;
  tagline: string;
  bias: string;
  reputability: string;
  publications: { name: string; sections: string[]; url?: string }[];
}

/** Maps source strings to their parent organization key */
const SOURCE_TO_ORG: Record<string, string> = {
  "Constitute Project — Comparative Constitution Database (constituteproject.org)": "constitute",
  "Constitute Project — Legislative provisions across 200+ constitutions": "constitute",
  "Constitute Project — Judicial provisions across 200+ constitutions": "constitute",
  "Constitute Project — Separation of powers provisions globally": "constitute",
  "Inter-Parliamentary Union (IPU) — PARLINE database on national parliaments": "ipu",
  "Inter-Parliamentary Union (IPU) — PARLINE database on national parliaments (data.ipu.org)": "ipu",
  "UN Department of Political and Peacebuilding Affairs — governance classifications": "un",
  "UN Basic Principles on the Independence of the Judiciary (1985)": "un",
  "UN-Habitat — Global governance and decentralization frameworks": "unhabitat",
  "World Justice Project — Rule of Law Index (worldjusticeproject.org)": "wjp",
  "World Justice Project — Constraints on Government Powers indicators": "wjp",
  "Forum of Federations — Handbook of Federal Countries (forumfed.org)": "forumfed",
  "World Bank — Decentralization & Subnational Governance indicators": "worldbank",
  "World Bank — Country Income Classifications (updated annually)": "worldbank",
  "UNDP — Human Development Report and Index (hdr.undp.org)": "undp",
  "UNDP — Governance for Sustainable Human Development framework": "undp",
  "UNCTAD — Trade and Development Report": "unctad",
  "ILO — World Employment and Social Outlook": "ilo",

  // Index sources
  "UNDP — Human Development Index (HDI)": "undp",
  "OECD — Programme for International Student Assessment (PISA)": "oecd",
  "Gallup / UN SDSN — World Happiness Report": "gallup",
  "Yale / Columbia — Environmental Performance Index (EPI)": "yale_epi",
  "UBS — Global Wealth Report (Mean Wealth Per Adult)": "ubs",
  "World Bank — Gini Coefficient (Income Inequality)": "worldbank",
  "World Bank / IMF — GDP (PPP)": "imf",
  "World Bank — Government Effectiveness (WGI)": "worldbank",
  "Transparency International — Corruption Perceptions Index (CPI)": "ti",
  "World Bank — Voice & Accountability (WGI)": "worldbank",
  "WIPO — Global Innovation Index (GII)": "wipo",
  "Institute for Economics & Peace — Global Peace Index (GPI)": "iep",
};

/** Maps source strings to their canonical URLs */
const SOURCE_URLS: Record<string, string> = {
  "Constitute Project — Comparative Constitution Database (constituteproject.org)": "https://constituteproject.org",
  "Constitute Project — Legislative provisions across 200+ constitutions": "https://constituteproject.org",
  "Constitute Project — Judicial provisions across 200+ constitutions": "https://constituteproject.org",
  "Constitute Project — Separation of powers provisions globally": "https://constituteproject.org",
  "Inter-Parliamentary Union (IPU) — PARLINE database on national parliaments": "https://data.ipu.org",
  "Inter-Parliamentary Union (IPU) — PARLINE database on national parliaments (data.ipu.org)": "https://data.ipu.org",
  "UN Department of Political and Peacebuilding Affairs — governance classifications": "https://dppa.un.org",
  "UN Basic Principles on the Independence of the Judiciary (1985)": "https://www.ohchr.org/en/instruments-mechanisms/instruments/basic-principles-independence-judiciary",
  "UN-Habitat — Global governance and decentralization frameworks": "https://unhabitat.org",
  "World Justice Project — Rule of Law Index (worldjusticeproject.org)": "https://worldjusticeproject.org/rule-of-law-index",
  "World Justice Project — Constraints on Government Powers indicators": "https://worldjusticeproject.org/rule-of-law-index",
  "Forum of Federations — Handbook of Federal Countries (forumfed.org)": "https://forumfed.org",
  "World Bank — Decentralization & Subnational Governance indicators": "https://www.worldbank.org/en/topic/governance",
  "World Bank — Country Income Classifications (updated annually)": "https://datahelpdesk.worldbank.org/knowledgebase/articles/906519",
  "UNDP — Human Development Report and Index (hdr.undp.org)": "https://hdr.undp.org",
  "UNDP — Governance for Sustainable Human Development framework": "https://www.undp.org/governance",
  "UNCTAD — Trade and Development Report": "https://unctad.org/tdr",
  "ILO — World Employment and Social Outlook": "https://www.ilo.org/global/research/global-reports/weso",
  "UNDP — Human Development Index (HDI)": "https://hdr.undp.org/data-center/human-development-index",
  "OECD — Programme for International Student Assessment (PISA)": "https://www.oecd.org/pisa/",
  "Gallup / UN SDSN — World Happiness Report": "https://worldhappiness.report",
  "Yale / Columbia — Environmental Performance Index (EPI)": "https://epi.yale.edu",
  "UBS — Global Wealth Report (Mean Wealth Per Adult)": "https://www.ubs.com/global/en/family-office-uhnw/reports/global-wealth-report.html",
  "World Bank — Gini Coefficient (Income Inequality)": "https://data.worldbank.org/indicator/SI.POV.GINI",
  "World Bank / IMF — GDP (PPP)": "https://data.worldbank.org/indicator/NY.GDP.MKTP.PP.CD",
  "World Bank — Government Effectiveness (WGI)": "https://info.worldbank.org/governance/wgi/",
  "Transparency International — Corruption Perceptions Index (CPI)": "https://www.transparency.org/cpi",
  "World Bank — Voice & Accountability (WGI)": "https://info.worldbank.org/governance/wgi/",
  "WIPO — Global Innovation Index (GII)": "https://www.wipo.int/global_innovation_index",
  "Institute for Economics & Peace — Global Peace Index (GPI)": "https://www.visionofhumanity.org/maps/",
};

const PUBLISHERS: Record<string, Omit<Publisher, "id" | "publications">> = {
  un: {
    name: "United Nations",
    abbreviation: "UN",
    url: "un.org",
    type: "Intergovernmental organization (193 member states)",
    founded: "1945",
    tagline: "The closest thing to a universal institutional voice on governance",
    bias: "Operates by consensus among member states, which can soften language on politically sensitive topics. Structural tension between the Security Council (where five permanent members hold veto power) and the General Assembly (one-state-one-vote). Neither bloc — Western, non-aligned, or any other — fully controls its output. Self-reported member-state data can introduce inaccuracies.",
    reputability: "The primary global governance body and the closest thing to a universal institutional voice. Its normative frameworks — such as the Basic Principles on the Independence of the Judiciary — represent negotiated international standards rather than any single country's perspective. Data collection is extensive but varies in quality by country. Widely cited as the baseline reference in international law and governance.",
  },
  undp: {
    name: "United Nations Development Programme",
    abbreviation: "UNDP",
    url: "undp.org",
    type: "UN specialized agency — development & governance",
    founded: "1965",
    tagline: "Measures what governments deliver for people, not just how they're structured",
    bias: "Views governance through the lens of human development outcomes (health, education, living standards) rather than institutional form. Funded by voluntary contributions from member states — primarily wealthier nations — which could influence priority-setting. Tends to emphasize what governments deliver for people over how they're structured.",
    reputability: "The Human Development Index is one of the most widely cited alternatives to GDP for measuring national well-being. Governance frameworks are peer-reviewed and built on decades of field research across 170+ countries. Respected across the political spectrum for outcome-based measurement.",
  },
  unctad: {
    name: "United Nations Conference on Trade and Development",
    abbreviation: "UNCTAD",
    url: "unctad.org",
    type: "UN body — trade & development",
    founded: "1964",
    tagline: "Built to give developing nations a voice in global trade",
    bias: "Explicitly advocates for developing-nation interests in global trade. More critical of free-trade orthodoxy than institutions like the World Bank or IMF. Created in 1964 as a counterweight to trade institutions that developing countries felt underserved their interests.",
    reputability: "Respected for trade data and analysis, particularly on South-South trade, commodity markets, and debt sustainability. Reports are data-driven but recommendations reflect its development mandate. Used extensively by developing-country policymakers and trade negotiators.",
  },
  ilo: {
    name: "International Labour Organization",
    abbreviation: "ILO",
    url: "ilo.org",
    type: "UN specialized agency — labor & employment",
    founded: "1919",
    tagline: "Older than the UN itself — the global authority on work and workers' rights",
    bias: "Pro-worker orientation by design. Unique tripartite structure gives governments, employers, and organized labor each a formal seat — meaning workers' interests are structurally represented in ways they aren't at most international bodies. Focuses on labor rights, social protection, and decent work.",
    reputability: "The global authority on labor statistics and employment standards. Founded in 1919, it predates the UN itself. The tripartite model ensures multiple perspectives inform its data and conventions. Statistics are globally comprehensive, though partly reliant on national reporting. Its conventions form the backbone of international labor law.",
  },
  unhabitat: {
    name: "United Nations Human Settlements Programme",
    abbreviation: "UN-Habitat",
    url: "unhabitat.org",
    type: "UN programme — urbanization & local governance",
    founded: "1978",
    tagline: "How governance actually shows up where people live — in cities and settlements",
    bias: "Urbanization and decentralization focus — views governance through the lens of how it serves cities and human settlements. Advocates for local governance empowerment and subsidiarity, which can frame decentralization more favorably than centralized alternatives.",
    reputability: "The primary UN body for urban governance data and sustainable settlement policy. Reports draw on extensive field research and country partnerships. Particularly strong on subnational governance, infrastructure equity, and spatial development — areas most international bodies undercover.",
  },
  worldbank: {
    name: "World Bank",
    url: "worldbank.org",
    type: "International financial institution",
    founded: "1944",
    tagline: "The world's largest systematic data collector on governance and economics",
    bias: "Historically associated with market-liberalization and structural-adjustment policies that critics argue harmed developing economies in the 1980s–90s. Voting power is weighted by financial contribution, giving wealthier nations more influence over lending and policy. Reforms in recent decades have moved toward recognizing institutional diversity, but a growth-oriented, market-friendly lens persists.",
    reputability: "One of the largest and most systematic data collectors on governance and economics globally. The World Development Indicators, country income classifications, and governance datasets are standard references in academia and policymaking. Methodologically rigorous, transparent about methodology. Should be read alongside sources with different priorities (e.g., UNDP for human development, ILO for labor).",
  },
  ipu: {
    name: "Inter-Parliamentary Union",
    abbreviation: "IPU",
    url: "ipu.org",
    type: "International organization of national parliaments",
    founded: "1889",
    tagline: "The oldest international political institution still operating — tracks every legislature on Earth",
    bias: "Parliamentarian-oriented — views governance through a legislative lens and advocates for stronger, more representative parliaments. Membership includes parliaments from both democratic and non-democratic states, which the IPU treats descriptively rather than normatively.",
    reputability: "The authoritative global source on parliamentary data. The PARLINE database tracks every national legislature's structure, composition, electoral system, and procedures. Neutral on system types — documents unicameral and bicameral systems without ranking them. Founded in 1889, it is the oldest international political institution still in operation.",
  },
  constitute: {
    name: "Constitute Project",
    url: "constituteproject.org",
    type: "Academic research initiative (University of Texas at Austin)",
    founded: "2013",
    tagline: "Every constitution on Earth, searchable and comparable — the text behind the power",
    bias: "Text-focused — analyzes constitutions as written documents, which may not reflect how governance actually operates in practice. Academic framing is influenced by comparative constitutional law scholarship. Funded by Google.org, which has no editorial control but is worth noting as a Silicon Valley funder.",
    reputability: "The most comprehensive comparative constitution database, covering 200+ current constitutions with full searchable text. Peer-reviewed academic project used by constitution drafters, courts, and scholars worldwide. The go-to reference for understanding what constitutions formally provide for — though users should supplement with on-the-ground sources for how provisions function in practice.",
  },
  wjp: {
    name: "World Justice Project",
    abbreviation: "WJP",
    url: "worldjusticeproject.org",
    type: "Independent multidisciplinary NGO",
    founded: "2006",
    tagline: "Surveys 150,000+ ordinary citizens annually to measure whether the law actually works",
    bias: "Rule-of-law advocacy organization — defines and measures governance through a rule-of-law framework, which some scholars argue embeds assumptions rooted in common-law traditions. Funded by diverse sources including foundations, governments, and corporations. Its framing inherently values judicial independence and constraints on government, which may read differently in legal cultures with different traditions.",
    reputability: "The Rule of Law Index surveys 150,000+ households and 3,600+ legal practitioners across 142 countries annually. Methodology is transparent, publicly documented, and peer-reviewed. Recognized by the UN and World Bank as a leading rule-of-law measurement. One of the few indices that surveys ordinary citizens rather than relying solely on expert assessments.",
  },
  forumfed: {
    name: "Forum of Federations",
    url: "forumfed.org",
    type: "International governance network",
    founded: "1999",
    tagline: "The definitive network for understanding how federal systems actually function",
    bias: "Pro-federalism orientation by mandate — exists to promote knowledge-sharing about federal and decentralized governance, which can frame federalism more favorably than centralized alternatives. Funded primarily by the Canadian government and partner federal states, giving it a perspective rooted in successful federal experiences.",
    reputability: "The leading international resource on federal systems. The Handbook of Federal Countries is a standard academic and practitioner reference. Brings together scholars and officials from federal states across all continents. Limited in scope to federal and quasi-federal systems — not a general governance source — but unmatched in its domain.",
  },
  oecd: {
    name: "Organisation for Economic Co-operation and Development",
    abbreviation: "OECD",
    url: "oecd.org",
    type: "Intergovernmental economic policy organization (38 member states)",
    founded: "1961",
    tagline: "The rich-country club's data machine — comprehensive but structurally selective",
    bias: "Membership is weighted toward wealthy, market-oriented democracies. PISA testing and economic policy recommendations embed assumptions about education and governance that reflect member-state norms. Countries that don't participate in PISA (including China nationally, India, much of sub-Saharan Africa) are simply absent from the data — creating a structural gap, not a neutral one.",
    reputability: "PISA is the most widely cited international education assessment. Methodology is transparent, peer-reviewed, and consistently applied across participating countries. Data is rigorous within its scope. Acknowledged as the standard reference for cross-country education comparison, with the caveat that non-participating countries constitute the majority of the world's population.",
  },
  gallup: {
    name: "Gallup, Inc.",
    url: "gallup.com",
    type: "Private analytics and advisory company",
    founded: "1935",
    tagline: "The world's largest continuous social survey — 160+ countries, every year",
    bias: "American-headquartered private company. The World Poll uses the Cantril ladder (life evaluation on 0–10 scale), which is a culturally specific framing — some research suggests East Asian cultures systematically report lower self-evaluations than Western cultures for the same objective conditions. Funding is commercial (clients include governments and corporations).",
    reputability: "The Gallup World Poll is the data backbone of the World Happiness Report and is used by the UN, World Bank, and hundreds of academic studies. Surveys 1,000+ adults per country per year in 160+ countries. Methodology is transparent and publicly documented. The longest-running continuous global social survey. Widely regarded as reliable for cross-country comparison, with cultural-response-style caveats noted by the researchers themselves.",
  },
  yale_epi: {
    name: "Yale Center for Environmental Law & Policy / Columbia CIESIN",
    abbreviation: "Yale EPI",
    url: "epi.yale.edu",
    type: "Academic research collaboration",
    founded: "1999",
    tagline: "The most comprehensive environmental scorecard — and its limitations are well documented",
    bias: "Methodology favours countries that have completed industrialization — developing nations building infrastructure score lower on current emissions while wealthy nations have benefited from historical pollution. Does not account for cumulative emissions, outsourced manufacturing pollution, or consumption-based footprints. Indicator weights are researcher-chosen, not universally agreed upon.",
    reputability: "The Environmental Performance Index is the most cited cross-country environmental assessment. Uses 58 indicators across 11 categories with transparent, published methodology. Peer-reviewed and updated biennially. Used by governments, the World Economic Forum, and environmental agencies worldwide. Researchers openly publish methodology debates and acknowledge structural limitations.",
  },
  ubs: {
    name: "UBS Group AG",
    abbreviation: "UBS",
    url: "ubs.com",
    type: "Multinational investment bank and financial services company",
    founded: "1862",
    tagline: "The global wealth industry's own data — comprehensive but viewed through a financial lens",
    bias: "A wealth management firm reporting on wealth — inherent framing presents wealth accumulation as the primary metric of economic success. Mean wealth figures are heavily skewed by ultra-high-net-worth individuals. The report serves UBS's commercial interest in wealth management services. No incentive to emphasize wealth inequality or the limitations of wealth as a well-being measure.",
    reputability: "Formerly the Credit Suisse Global Wealth Report, now published by UBS after the 2023 acquisition. The most comprehensive global wealth dataset, covering 200+ countries with consistent methodology since 2000. Data drawn from household surveys, national accounts, and Forbes billionaire lists. Widely cited in economics research. Mean wealth figures should always be read alongside median wealth and Gini data for meaningful interpretation.",
  },
  ti: {
    name: "Transparency International",
    abbreviation: "TI",
    url: "transparency.org",
    type: "International anti-corruption NGO",
    founded: "1993",
    tagline: "The most cited corruption measure in the world — and the most debated",
    bias: "Anti-corruption advocacy organization — its mission is to fight corruption, which frames all output. The CPI measures perceptions of public-sector corruption only — legal forms of influence (lobbying, campaign finance, revolving doors) in wealthy democracies are structurally invisible to this index. Expert and business perceptions may not reflect citizen experience. Funded by governments and foundations, primarily from Western democracies.",
    reputability: "The Corruption Perceptions Index is the single most cited corruption measure globally. Aggregates 13 independent data sources per country with transparent methodology. Peer-reviewed and published annually since 1995. Acknowledged limitations are well-documented by TI itself: it measures perceptions, not actual corruption; it covers only the public sector; and it favours countries where corruption takes legal forms invisible to the index. Should be read as one input, not the final word.",
  },
  imf: {
    name: "International Monetary Fund",
    abbreviation: "IMF",
    url: "imf.org",
    type: "International financial institution (190 member countries)",
    founded: "1944",
    tagline: "The global economy's lender of last resort — and its most contested institution",
    bias: "Voting power weighted by financial contribution — the US holds effective veto power. Historical association with structural-adjustment conditionality that critics in the Global South argue caused significant economic harm. Tends to prioritize macroeconomic stability, fiscal discipline, and market liberalization. Recent leadership has acknowledged past errors and moved toward more nuanced positions, but institutional orientation persists.",
    reputability: "The World Economic Outlook and GDP/PPP estimates are standard references in economics and policymaking worldwide. Data methodology is transparent and consistently applied across 190 countries. IMF economic statistics are the baseline for most cross-country economic comparison. Should be read with awareness of institutional perspective — particularly regarding policy prescriptions versus raw data (the data is more broadly trusted than the policy advice).",
  },
  wipo: {
    name: "World Intellectual Property Organization",
    abbreviation: "WIPO",
    url: "wipo.int",
    type: "UN specialized agency — intellectual property",
    founded: "1967",
    tagline: "Tracks innovation through the lens of intellectual property — which is one lens among many",
    bias: "IP-centric framing — measures innovation through patents, trademarks, and formal knowledge-economy outputs, which structurally favours countries with strong IP regimes. Does not capture informal innovation, indigenous knowledge, open-source development, or frugal innovation common in developing countries. Funded by IP registration fees, creating a financial stake in the expansion of the IP system.",
    reputability: "The Global Innovation Index (co-published with INSEAD and Cornell) is the most cited cross-country innovation ranking. Uses 80+ indicators with transparent methodology reviewed by an independent advisory board. Peer-reviewed and published annually. Recognized by governments worldwide for benchmarking. The index itself is more nuanced than pure IP counts — it includes institutions, education, and creative outputs — but the overall framing still advantages formal-economy innovation.",
  },
  iep: {
    name: "Institute for Economics & Peace",
    abbreviation: "IEP",
    url: "economicsandpeace.org",
    type: "Independent international think tank",
    founded: "2007",
    tagline: "Quantifying peace — and debating what that means",
    bias: "Defines peace through specific measurable indicators (militarisation, conflict, safety/security) which embed assumptions about what peace means. Militarisation indicators penalise large defence forces regardless of context — a country arming defensively against genuine threats scores the same as an aggressor. Funded by the Kilgour Foundation (Australian philanthropic family). Does not measure structural violence, economic inequality, or cultural factors.",
    reputability: "The Global Peace Index is the most widely cited cross-country peace measurement. Covers 163 countries using 23 qualitative and quantitative indicators with transparent, published methodology. Data sources include the UN, World Bank, IISS, and national statistics agencies. Referenced by the UN, World Bank, and governments worldwide. Acknowledged by researchers as one framework for measuring peace — not the only valid one.",
  },
};

/** Index sources — mapped through SOURCE_TO_ORG for inclusion in the publisher directory */
const INDEX_SOURCES: { source: string; label: string }[] = [
  { source: "UNDP — Human Development Index (HDI)", label: "Global Indices" },
  { source: "OECD — Programme for International Student Assessment (PISA)", label: "Global Indices" },
  { source: "Gallup / UN SDSN — World Happiness Report", label: "Global Indices" },
  { source: "Yale / Columbia — Environmental Performance Index (EPI)", label: "Global Indices" },
  { source: "UBS — Global Wealth Report (Mean Wealth Per Adult)", label: "Global Indices" },
  { source: "World Bank — Gini Coefficient (Income Inequality)", label: "Global Indices" },
  { source: "World Bank / IMF — GDP (PPP)", label: "Global Indices" },
  { source: "World Bank — Government Effectiveness (WGI)", label: "Global Indices" },
  { source: "Transparency International — Corruption Perceptions Index (CPI)", label: "Global Indices" },
  { source: "World Bank — Voice & Accountability (WGI)", label: "Global Indices" },
  { source: "WIPO — Global Innovation Index (GII)", label: "Global Indices" },
  { source: "Institute for Economics & Peace — Global Peace Index (GPI)", label: "Global Indices" },
];

/** Build the full publisher index from education + index sources */
export function getPublishers(): Publisher[] {
  // Collect publications per org from SECTION_EDUCATION
  const orgPubs = new Map<string, Map<string, Set<string>>>();
  for (const [key, ed] of Object.entries(SECTION_EDUCATION)) {
    for (const src of ed.sources) {
      const orgKey = SOURCE_TO_ORG[src] ?? "unknown";
      if (!orgPubs.has(orgKey)) orgPubs.set(orgKey, new Map());
      const pubs = orgPubs.get(orgKey)!;
      if (!pubs.has(src)) pubs.set(src, new Set());
      pubs.get(src)!.add(SECTION_LABELS[key] ?? key);
    }
  }

  // Also include index sources
  for (const { source, label } of INDEX_SOURCES) {
    const orgKey = SOURCE_TO_ORG[source] ?? "unknown";
    if (!orgPubs.has(orgKey)) orgPubs.set(orgKey, new Map());
    const pubs = orgPubs.get(orgKey)!;
    if (!pubs.has(source)) pubs.set(source, new Set());
    pubs.get(source)!.add(label);
  }

  let id = 1;
  const result: Publisher[] = [];
  for (const [orgKey, meta] of Object.entries(PUBLISHERS)) {
    const pubs = orgPubs.get(orgKey);
    if (!pubs) continue;
    const publications: { name: string; sections: string[]; url?: string }[] = [];
    for (const [name, secs] of pubs) {
      publications.push({ name, sections: Array.from(secs), url: SOURCE_URLS[name] });
    }
    result.push({ id: id++, ...meta, publications });
  }
  return result;
}

export function getEducation(
  section: string,
  value: string,
  country: Country,
): { concept: string; explanation: string; inPractice: string; countryInsight: string; sources: string[] } {
  const ed = SECTION_EDUCATION[section];
  if (!ed) return { concept: "", explanation: "", inPractice: "", countryInsight: "", sources: [] };
  const pat = matchPattern(value, ed.patterns);
  return {
    concept: ed.concept,
    explanation: pat?.explanation ?? "",
    inPractice: pat?.inPractice ?? "",
    countryInsight: ed.countryContext(country),
    sources: ed.sources,
  };
}

// ────────────────────────────────────────────────

const SECTION_EDUCATION: Record<string, SectionEducation> = {
  executive: {
    concept:
      "The executive is the organ of government responsible for implementing and enforcing laws, directing public administration, and representing the state internationally. The UN classifies executive systems by whether the head of state and head of government are the same person or different roles, and whether executive authority derives from direct election, parliamentary confidence, or other mechanisms. The Constitute Project documents over 200 constitutions and identifies presidential, parliamentary, and semi-presidential as the three primary executive models globally.",

    sources: [
      "Constitute Project — Comparative Constitution Database (constituteproject.org)",
      "Inter-Parliamentary Union (IPU) — PARLINE database on national parliaments",
      "UN Department of Political and Peacebuilding Affairs — governance classifications",
    ],

    patterns: [
      {
        match: /President \(Head of State & Government\)/i,
        explanation:
          "This is a presidential system: one person is both the symbolic leader of the nation (head of state) and the actual decision-maker running the government (head of government). They're typically elected directly by the people, independent of the legislature, and serve a fixed term. They can't be removed by a parliamentary vote — only by impeachment for serious offenses.",
        inPractice:
          "The president picks their own cabinet, can veto laws, and sets foreign policy. But they need the legislature to pass budgets and laws. This creates a tug-of-war that can lead to gridlock — or creative compromise.",
      },
      {
        match: /Prime Minister.*Monarch/i,
        explanation:
          "This is a parliamentary monarchy: the real governing power lies with the Prime Minister, who is a member of parliament and leads the majority party or coalition. The monarch is head of state but plays a ceremonial role — opening parliament, receiving ambassadors, and serving as a symbol of national continuity. The PM can be removed at any time if they lose the confidence of parliament.",
        inPractice:
          "The PM and cabinet are drawn from parliament, so the executive and legislature are fused. This usually means legislation passes more easily, but the flip side is less formal separation between the branches. The monarch provides stability across elections — a constant when governments change.",
      },
      {
        match: /Prime Minister.*Emperor/i,
        explanation:
          "This is a unique constitutional monarchy where the Emperor is purely ceremonial — a symbol of the state and unity of the people, with no political power whatsoever. The Prime Minister, chosen by parliament, holds all executive authority. Japan's post-WWII constitution explicitly stripped the Emperor of governing power.",
        inPractice:
          "The PM leads through parliamentary majority, similar to other parliamentary democracies. The Emperor performs rituals, receives foreign dignitaries, and embodies cultural continuity — but cannot comment on politics or influence policy.",
      },
      {
        match: /Prime Minister.*President \(Ceremonial\)|Prime Minister.*President \(Head of State\)|Prime Minister.*President \(Ceremonial Head\)/i,
        explanation:
          "This is a parliamentary republic: the Prime Minister runs the government as head of government, while a separately elected or appointed President serves a mostly ceremonial role as head of state. Unlike a monarchy, both positions are chosen through democratic processes. The PM needs the continuous confidence of parliament to stay in power.",
        inPractice:
          "The president signs laws, represents the nation abroad, and may have reserve powers (like dissolving parliament in crisis), but day-to-day governance is entirely the PM's domain. The PM rises and falls with parliamentary support — if the coalition breaks, so does the government.",
      },
      {
        match: /President \(Head of State\).*Premier/i,
        explanation:
          "In this single-party system, the President is head of state and the paramount leader, while the Premier (or Prime Minister) manages the government apparatus. In practice, the President — who also leads the ruling party — holds decisive authority. The Premier implements the party's decisions rather than setting independent policy.",
        inPractice:
          "Power flows through the party hierarchy more than through formal government institutions. The Premier manages the State Council (cabinet), but strategic direction comes from the party's top leadership. Government positions often reflect party rank.",
      },
      {
        match: /President \(Head of State\).*Prime Minister/i,
        explanation:
          "This is a semi-presidential system: the President is directly elected by the people and holds significant executive powers (foreign policy, defense, dissolution of parliament), while the Prime Minister — appointed by the President but accountable to parliament — handles domestic governance. This split executive creates a dual power structure.",
        inPractice:
          "When the president's party controls parliament, the PM is essentially the president's lieutenant. But when opposition controls parliament (\"cohabitation\"), the PM gains real independent power and the president is constrained. This system can be flexible — or tense.",
      },
      {
        // South Africa's unique parliamentary system where parliament elects the President
        match: /President \(Head of State & Government\)/i,
        explanation:
          "The President serves as both head of state and head of government. In some countries this means direct election (presidential system), while in others the president is chosen by parliament (parliamentary system with an executive president). Either way, executive power is concentrated in one office.",
        inPractice:
          "Having one person serve both roles means there's no split between ceremonial and governing authority. The president is the face of the nation AND the decision-maker. This concentration can be efficient but requires strong checks from other branches.",
      },
    ],

    countryContext(c: Country) {
      if (c.executive.includes("Prime Minister") && c.executive.includes("Monarch")) {
        return `In ${c.name}, the monarchy is constitutional — the ${c.code === "JP" ? "Emperor" : "monarch"} reigns but does not rule. The real political battles happen in parliament, where the Prime Minister must maintain a legislative majority. This system has given ${c.name} both governmental flexibility and institutional stability.`;
      }
      if (c.govType.includes("Semi-Presidential")) {
        return `${c.name}'s semi-presidential system means power-sharing between the President and Prime Minister. This dual executive emerged from ${c.code === "FR" ? "Charles de Gaulle's desire for a strong presidency within a parliamentary tradition" : "a constitutional design trying to balance strong leadership with parliamentary accountability"}. When different parties hold each office, governance becomes a negotiation.`;
      }
      if (c.govType.includes("Single-party")) {
        return `In ${c.name}, the ruling party provides the organizing structure for governance. The President's authority stems from their position within the party as much as from the constitutional office. Government institutions function within the party's framework, creating a unified chain of command from national to local level.`;
      }
      if (c.executive.includes("President (Head of State & Government)") && c.govType.includes("Parliamentary")) {
        return `${c.name} has an unusual system: despite being a parliamentary republic, the President serves as both head of state and head of government — elected by the legislature, not directly by the people. If parliament loses confidence, the president falls. This concentrates executive power while keeping it accountable to legislators.`;
      }
      if (c.executive.includes("President (Head of State & Government)")) {
        return `${c.name}'s president holds unified executive power — they don't share the role with a monarch or prime minister. This means one person sets the national agenda, commands the military, and represents the nation. The strength of checks on this power depends on the independence of ${c.name}'s legislature and judiciary.`;
      }
      return `${c.name}'s executive structure reflects its particular history and political evolution. The way power is organized at the top shapes how responsive, stable, and accountable the government is to its people.`;
    },
  },

  legislative: {
    concept:
      "The legislature is the body responsible for debating, amending, and enacting laws, approving budgets, and overseeing the executive. The Inter-Parliamentary Union (IPU) tracks 190+ national parliaments and classifies them as unicameral (one chamber) or bicameral (two chambers). According to IPU data, roughly 79 countries use bicameral systems and 115 use unicameral ones. The choice between them reflects each country's size, federal structure, and governance traditions.",

    sources: [
      "Inter-Parliamentary Union (IPU) — PARLINE database on national parliaments (data.ipu.org)",
      "Constitute Project — Legislative provisions across 200+ constitutions",
    ],

    patterns: [
      {
        match: /Bicameral/i,
        explanation:
          "A bicameral legislature has two separate chambers — typically a lower house (representing the people proportionally) and an upper house (representing regions, states, or providing a review function). Bills usually must pass both chambers. This slows lawmaking but adds a deliberative check — one chamber can block or revise the other's proposals.",
        inPractice:
          "The two chambers often have different compositions, different term lengths, and sometimes different powers. The lower house usually controls the budget and can sometimes override the upper house. The upper house may represent territorial interests (like states or provinces) or serve as a chamber of sober second thought.",
      },
      {
        match: /Unicameral/i,
        explanation:
          "A unicameral legislature has a single chamber — all elected representatives sit together in one body. Laws only need to pass one vote. This makes lawmaking faster and more transparent (no behind-doors reconciliation between chambers), but removes the safety valve of a second chamber catching hasty legislation.",
        inPractice:
          "Unicameral systems are common in smaller nations or those with strong internal cohesion. Without a second chamber, other checks become more important — a strong judiciary, active civil society, or robust committee systems within the legislature itself.",
      },
    ],

    countryContext(c: Country) {
      const name = c.legislative.replace(/ \(.*\)/, "");
      if (c.legislativeType === "Bicameral") {
        const isFederal = c.federal.includes("Federal");
        if (isFederal) {
          return `${c.name}'s ${name} has two chambers, which is typical for federal countries — the upper house represents the states or provinces, giving regions a direct voice in national legislation. This ensures that large population centers can't simply outvote smaller regions on every issue.`;
        }
        return `Even though ${c.name} is ${c.federal.toLowerCase()}, it maintains a bicameral ${name}. The upper house provides legislative review and may represent different constituencies than the lower house — adding a deliberative layer where legislation gets a second look before becoming law.`;
      }
      return `${c.name}'s ${name} handles all legislation in a single chamber. With ${c.population} people represented, this streamlined structure means laws move through the process without the delays of inter-chamber negotiations. ${c.judicial.includes("Constitutional") ? "The Constitutional Court provides an external check on legislative quality." : "Other institutions — the judiciary, the executive — provide checks on legislative power."}`;
    },
  },

  judicial: {
    concept:
      "The judiciary interprets and applies the law, resolves disputes, and in many systems reviews the constitutionality of government actions. The UN Basic Principles on the Independence of the Judiciary (1985) outline international standards, while recognizing that judicial systems vary widely across legal traditions — common law, civil law, religious law, customary law, and hybrid systems. The World Justice Project tracks rule-of-law indicators across 142 countries without assuming one model is superior.",

    sources: [
      "UN Basic Principles on the Independence of the Judiciary (1985)",
      "World Justice Project — Rule of Law Index (worldjusticeproject.org)",
      "Constitute Project — Judicial provisions across 200+ constitutions",
    ],

    patterns: [
      {
        match: /Supreme Court/i,
        explanation:
          "A Supreme Court is the highest court in the judicial system, serving as the final court of appeal. In many countries, it also has the power of constitutional review — the ability to strike down laws that violate the constitution. This concentrates significant interpretive power in a small body of judges, which supporters see as protecting constitutional principles and critics see as empowering unelected officials over the legislature.",
        inPractice:
          "Supreme Court justices are usually appointed (not elected) to ensure independence from political pressure. Their decisions set binding precedents that shape the law for decades. The appointment process — who picks them, for how long they serve — is one of the most consequential political decisions a country makes.",
      },
      {
        match: /Supreme Federal Court/i,
        explanation:
          "A Supreme Federal Court serves as both the highest court of appeal and the guardian of the federal constitution. It resolves disputes between the federal government and states, and between states themselves. It can declare laws unconstitutional and has played an increasingly activist role in governance.",
        inPractice:
          "In a federal system, this court is especially important — it's the referee between levels of government. Its decisions on what falls under federal vs. state jurisdiction shape the practical balance of power. Justices often become powerful political figures in their own right.",
      },
      {
        match: /High Court/i,
        explanation:
          "The High Court serves as the final court of appeal and has the power of constitutional judicial review — it can invalidate laws that conflict with the constitution. It's the ultimate arbiter of legal disputes in the country, combining the roles of constitutional guardian and highest appellate court.",
        inPractice:
          "High Court decisions are binding on all other courts. The court typically hears cases of major constitutional significance, disputes between states, and matters of federal jurisdiction. Its interpretations of the constitution evolve over time, adapting founding principles to modern challenges.",
      },
      {
        match: /Constitutional Court/i,
        explanation:
          "A dedicated Constitutional Court exists solely to decide constitutional questions — it doesn't hear regular appeals or criminal cases. Citizens, legislators, or other courts can refer laws to it for review. This focused role makes it a powerful guardian of constitutional rights, separate from the regular court system.",
        inPractice:
          "Constitutional courts can review laws before they take effect (abstract review) or after they're challenged in a real case (concrete review). Many allow individual citizens to file constitutional complaints directly. This model, originating in Austria and spreading across Europe, Latin America, Asia, and Africa, represents one of several approaches to constitutional oversight.",
      },
      {
        match: /Court of Cassation/i,
        explanation:
          "The Court of Cassation is the highest court in the civil law tradition. It doesn't re-examine facts — it only checks whether lower courts correctly applied the law. This is a fundamentally different approach from common law supreme courts: it ensures legal consistency rather than re-judging cases.",
        inPractice:
          "In countries with a Court of Cassation, constitutional review is usually handled by a separate Constitutional Council or Court. The regular judiciary and constitutional review are parallel tracks. This dual system means ordinary cases and constitutional questions are handled by specialized bodies.",
      },
      {
        match: /Supreme People's Court/i,
        explanation:
          "The Supreme People's Court is the highest judicial organ. It operates within a governance model where the judiciary is coordinated under the ruling party's leadership, rather than functioning as an independent branch that checks political authority. The court interprets and applies law within the policy framework set by the party and the National People's Congress.",
        inPractice:
          "The court handles appeals, supervises lower courts, and issues judicial interpretations that guide lower courts nationwide. It does not have the power to strike down legislation. This reflects a different theory of governance from separation-of-powers systems — one where institutional coordination under unified leadership is prioritized over inter-branch competition.",
      },
      {
        match: /Curia/i,
        explanation:
          "The Curia is Hungary's supreme court (its historical name, revived to reconnect with pre-communist legal traditions). It serves as the highest court of appeal in the regular court system. Constitutional questions are handled by a separate Constitutional Court. The relationship between these judicial bodies and the political branches has been a subject of significant domestic and international debate.",
        inPractice:
          "The Curia reviews lower court decisions for legal consistency and correctness. Hungary's broader judicial landscape reflects ongoing tensions between different visions of governance — debates about judicial appointment processes, court jurisdiction, and institutional independence that are active in many countries worldwide.",
      },
    ],

    countryContext(c: Country) {
      const hasConstitutionalCourt = c.judicial.toLowerCase().includes("constitutional");
      const isPresidential = c.executive.includes("President (Head of State & Government)");
      const hasLimitedChecks = c.checks.toLowerCase().includes("limited") || c.checks.toLowerCase().includes("no formal");

      if (hasLimitedChecks) {
        return `In ${c.name}, while the ${c.judicial} exists formally, its relationship to political authority is a subject of ongoing evolution. In systems with concentrated executive power, courts navigate between applying the law and operating within political realities. The judiciary's role and degree of autonomy remain actively debated both within ${c.name} and among outside observers.`;
      }
      if (hasConstitutionalCourt) {
        return `${c.name}'s ${c.judicial} is a dedicated constitutional guardian — it focuses specifically on constitutional questions and reviewing whether laws conform to the constitution. This specialized model of judicial review is widely used across Europe, Asia, and Latin America, and often allows individual citizens to bring constitutional complaints directly.`;
      }
      if (isPresidential) {
        return `In ${c.name}'s presidential system, the ${c.judicial} plays a vital balancing role between the president and legislature. When the two elected branches clash, the court is often called upon to referee — making judicial appointments one of the highest-stakes political decisions.`;
      }
      return `${c.name}'s ${c.judicial} serves as the final interpreter of the law. How the judiciary relates to other branches — its composition, appointment process, and degree of autonomy — shapes whether courts serve primarily as instruments of legal consistency, as checks on political power, or as both.`;
    },
  },

  federal: {
    concept:
      "Territorial organization describes how power is distributed between central and subnational governments. The UN-Habitat framework and World Bank governance indicators recognize a spectrum: federal systems where subnational units have constitutionally protected authority, unitary systems where power flows from the center, and hybrid arrangements with devolution. According to the Forum of Federations, 25 countries formally identify as federal — home to roughly 40% of the world's population.",

    sources: [
      "Forum of Federations — Handbook of Federal Countries (forumfed.org)",
      "UN-Habitat — Global governance and decentralization frameworks",
      "World Bank — Decentralization & Subnational Governance indicators",
    ],

    patterns: [
      {
        match: /^Federal$/i,
        explanation:
          "In a federal system, power is constitutionally divided between the national government and subnational units (states, provinces, Länder, etc.). Neither level can simply abolish the other — their authority is protected by the constitution. Each level has its own laws, courts, and sometimes even its own constitution.",
        inPractice:
          "Federalism means you might face different laws depending on where you live within the same country — different tax rates, different education systems, different criminal penalties. This allows local adaptation but can create inequalities between regions. The central government handles defense, foreign policy, and nationwide standards.",
      },
      {
        match: /Unitary with devolved/i,
        explanation:
          "This is a unitary state with devolution — the central government has delegated significant powers to regional bodies, but retains ultimate sovereignty. Unlike true federalism, these powers could theoretically be taken back. In practice though, devolution has created strong regional identities and institutions that would be politically impossible to dismantle.",
        inPractice:
          "Devolved regions have their own parliaments and control areas like education, health, and some taxation. But their authority flows from the central government, not from the constitution. This creates an evolving, sometimes tense relationship between the center and the regions.",
      },
      {
        match: /Unitary/i,
        explanation:
          "In a unitary state, the central government holds supreme authority. Local or regional governments exist but their powers come from the center — they can be created, modified, or abolished by national legislation. This creates a uniform legal framework across the entire country.",
        inPractice:
          "Unitary doesn't mean centralized in practice — many unitary states grant significant local autonomy. But the key difference from federalism is that this autonomy isn't constitutionally guaranteed. The central government can, in principle, restructure or override local decisions.",
      },
    ],

    countryContext(c: Country) {
      if (c.federal === "Federal") {
        const isLarge = parseInt(c.population) >= 100 || c.population.includes("B");
        if (isLarge) {
          return `${c.name}'s federal system is partly a response to governing ${c.population} people across a vast territory. Federalism lets different regions address local needs while maintaining national unity. In practice, the balance of power between ${c.name}'s central and state/provincial governments is constantly negotiated through legislation, court decisions, and political bargaining.`;
        }
        return `${c.name}'s federal structure gives its constituent states or provinces real autonomy — they aren't just administrative districts. This federal arrangement typically reflects the country's history: either distinct regions coming together (like former colonies or kingdoms) or a deliberate choice to protect regional diversity within a unified nation.`;
      }
      if (c.federal.includes("devolved")) {
        return `${c.name}'s devolution settlement is a pragmatic compromise — recognizing distinct national identities within the state without fully federalizing. The devolved parliaments have real power in their domains, but constitutional sovereignty remains at the center. This arrangement continues to evolve as regions push for more autonomy.`;
      }
      const isLargeUnitary = parseInt(c.population) >= 50 || c.population.includes("B");
      if (isLargeUnitary) {
        return `Despite having ${c.population} people, ${c.name} maintains a unitary structure — central government authority extends across the entire country. This can enable consistent national policy but may struggle to accommodate regional diversity. How much local autonomy exists in practice varies significantly from the constitutional framework.`;
      }
      return `${c.name}'s unitary structure means national law applies uniformly. For a country of ${c.population} people, this keeps governance straightforward — there's one set of rules, one legal system, one national framework. Local governments handle day-to-day services but within centrally defined boundaries.`;
    },
  },

  economic: {
    concept:
      "A country's economic system determines how resources are produced, distributed, and governed. The World Bank classifies economies by income level (low, lower-middle, upper-middle, high), the UN Conference on Trade and Development (UNCTAD) tracks development status, and the UNDP Human Development Index measures outcomes beyond GDP — health, education, and standard of living. No single metric captures whether an economic system serves its people well; different models optimize for different goals.",

    sources: [
      "World Bank — Country Income Classifications (updated annually)",
      "UNDP — Human Development Report and Index (hdr.undp.org)",
      "UNCTAD — Trade and Development Report",
      "ILO — World Employment and Social Outlook",
    ],

    patterns: [
      {
        match: /market-oriented/i,
        explanation:
          "A market-oriented economy relies primarily on private enterprise, competition, and price signals to allocate resources. The government sets rules and enforces contracts but generally avoids picking winners or running businesses. Trade is encouraged, regulation is lighter, and economic freedom is prioritized.",
        inPractice:
          "People and companies make most economic decisions themselves. Taxes tend to be lower, but so is the social safety net. Success depends heavily on market conditions, and inequality can be significant. The government steps in mainly to correct market failures, not to direct economic activity.",
      },
      {
        match: /social market/i,
        explanation:
          "A social market economy combines free market competition with a strong social safety net. The state ensures universal healthcare, education, and worker protections while letting private businesses drive economic growth. It's the \"capitalism with guardrails\" model — market freedom within social boundaries.",
        inPractice:
          "Higher taxes fund comprehensive public services. Workers have strong protections — unions are powerful, benefits are generous, and firing is harder. The trade-off: labor markets can be less flexible and business costs higher. But poverty is lower, inequality is narrower, and economic shocks are cushioned.",
      },
      {
        match: /mixed economy/i,
        explanation:
          "A mixed economy pragmatically blends market forces with government intervention. Some sectors are left to private enterprise while others — healthcare, education, infrastructure — see significant public involvement. It's the most common economic model globally, sitting between pure free market and state-led approaches.",
        inPractice:
          "The government owns or regulates strategically important sectors while leaving most commerce to the private sector. Tax levels and social spending fall between the Nordic welfare states and the more laissez-faire economies. The exact mix is constantly debated and shifts with elections.",
      },
      {
        match: /welfare state/i,
        explanation:
          "A comprehensive welfare state provides universal public services funded by high taxation — cradle-to-grave coverage including healthcare, education, childcare, parental leave, unemployment insurance, and elder care. The state takes responsibility for ensuring a baseline quality of life for all citizens.",
        inPractice:
          "Taxes are among the highest in the world — but citizens receive extensive services in return. Poverty and inequality are typically very low. Critics argue this reduces economic dynamism and personal incentive; supporters point to consistently high rankings in happiness, health, and social mobility.",
      },
      {
        match: /state-led|socialist market/i,
        explanation:
          "In a state-led economy, the government plays the dominant role in economic planning and controls key industries — banking, energy, telecommunications, transportation. The state directs investment, sets industrial policy, and may own or control the largest enterprises. Market elements exist but within a state-defined framework.",
        inPractice:
          "The government can mobilize resources on a massive scale and pursue long-term industrial strategy without electoral pressure. But state control can lead to inefficiency, corruption, and misallocation. Success depends heavily on the competence and integrity of the planning apparatus.",
      },
      {
        match: /developing/i,
        explanation:
          "A developing economy is one that's still building its industrial base, institutions, and infrastructure. Income levels are lower, a larger share of the population works in agriculture, and the formal economic sector may not reach everyone. These economies often grow faster than developed ones but face greater volatility and institutional challenges.",
        inPractice:
          "The government faces a balancing act: attracting foreign investment while building domestic capacity, growing fast while spreading benefits broadly, and developing institutions while still trying to meet basic needs. Economic policy is often the most consequential and contested arena of governance.",
      },
      {
        match: /emerging market/i,
        explanation:
          "An emerging market economy is transitioning from developing to developed — it has significant industrial capacity, growing middle class, and increasing integration into the global economy, but hasn't yet achieved the stability and income levels of advanced economies. These countries often experience rapid growth alongside significant inequality.",
        inPractice:
          "Emerging markets attract foreign investment with high growth potential but carry political and economic risks. The government must manage rapid urbanization, growing inequality, and integration into global markets while building institutions strong enough to handle the stresses of fast development.",
      },
      {
        match: /advanced|highly developed/i,
        explanation:
          "An advanced economy has high income levels, sophisticated financial markets, diverse industrial sectors, and strong institutions. The economy is primarily service-based, technology-driven, and deeply integrated into global trade. Growth is typically slower but more stable than developing economies.",
        inPractice:
          "Citizens generally enjoy high living standards, but challenges include managing inequality, sustaining innovation, funding aging populations, and adapting to technological disruption. Economic policy debates focus on optimization — tax rates, regulation levels, trade policy — rather than fundamental development.",
      },
      {
        match: /transition/i,
        explanation:
          "A transition economy is shifting from a centrally planned (communist/socialist) system to a market-based one. This involves privatizing state enterprises, liberalizing prices, building market institutions from scratch, and integrating into the global economy — all while managing the social dislocation these changes cause.",
        inPractice:
          "Transition economies face unique challenges: building market institutions where none existed, handling mass privatization (often marred by insider capture), and managing the human cost as unprofitable state enterprises close. The speed and fairness of transition varies enormously — some countries thrived while others saw oligarchs capture state assets.",
      },
    ],

    countryContext(c: Country) {
      const isHighIncome = c.economic.toLowerCase().includes("high-income");
      const pressScore = c.mediaScore;

      if (c.economic.toLowerCase().includes("state-led") || c.economic.toLowerCase().includes("socialist")) {
        return `${c.name}'s state-led economic model gives the government a central role in directing economic development. State-owned enterprises operate in key sectors, and the government sets strategic investment priorities. Proponents argue this enables long-term planning and rapid infrastructure development; critics raise questions about efficiency, market distortion, and individual economic choice. ${c.name}'s economic trajectory offers evidence for evaluating these trade-offs.`;
      }
      if (c.economic.toLowerCase().includes("welfare")) {
        return `${c.name}'s welfare state model represents a social contract: citizens pay some of the world's highest taxes, and in return receive comprehensive public services from birth to old age. This model has produced some of the world's lowest poverty rates and highest quality-of-life indicators — but requires sustained economic productivity and social trust to maintain.`;
      }
      if (isHighIncome && pressScore > 75) {
        return `${c.name} combines high income levels with relatively open information flows (press freedom ranked #${c.rsfRank}/180). Some scholars argue these reinforce each other; others note that economic development can precede or follow media openness in different sequences across countries. ${c.name}'s particular combination reflects its historical path rather than a universal formula.`;
      }
      if (c.economic.toLowerCase().includes("developing")) {
        return `As a developing economy with ${c.population} people, ${c.name}'s economic policy is about building the foundations: infrastructure, institutions, human capital. The choices made now — how to tax, who to regulate, what to invest in — will shape the country's trajectory for decades. Press freedom (ranked #${c.rsfRank}/180) affects whether those choices face public scrutiny.`;
      }
      return `${c.name}'s economic system has evolved through the country's particular history and political choices. With ${c.population} people and a press freedom rank of #${c.rsfRank}/180, the interaction between economic power, political power, and public accountability defines how well the economy serves its citizens.`;
    },
  },

  checks: {
    concept:
      "Checks and balances describe the mechanisms through which governmental power is distributed, constrained, and held accountable. The Constitute Project documents separation-of-powers provisions across 200+ constitutions, while the UNDP Governance Framework recognizes that accountability can operate through different channels: institutional competition between branches, internal party mechanisms, judicial oversight, ombudsman offices, or community-level governance. No single model has a monopoly on accountability.",

    sources: [
      "UNDP — Governance for Sustainable Human Development framework",
      "Constitute Project — Separation of powers provisions globally",
      "World Justice Project — Constraints on Government Powers indicators",
    ],

    patterns: [
      {
        match: /Strong formal separation/i,
        explanation:
          "Strong separation of powers means each branch — executive, legislative, judicial — is independently elected or appointed, has distinct powers, and can check the others. The president can veto laws; the legislature controls spending and can impeach; the judiciary can strike down unconstitutional actions. No branch can dominate without the others pushing back.",
        inPractice:
          "This creates a system of intentional friction. Every major decision involves negotiation between branches. Proponents value the protection against concentrated power; critics point to the gridlock and slow response that can result. When different parties control different branches, governance often becomes a sustained negotiation rather than a streamlined process.",
      },
      {
        match: /Westminster.*fused|parliamentary sovereignty.*fused/i,
        explanation:
          "In the Westminster system, the executive (Prime Minister and cabinet) is drawn from the legislature — they're fused, not separated. Parliament is sovereign: it can pass any law, and no court can overrule it. The PM governs as long as they command a parliamentary majority. If they lose it, they lose power.",
        inPractice:
          "This system is fast and decisive — the government can pass its agenda without the gridlock of separate branches. But the check on power is political (losing elections, losing party confidence) rather than institutional (courts striking down laws). The opposition's role is to scrutinize and offer an alternative, not to veto.",
      },
      {
        match: /Constructive vote of no confidence/i,
        explanation:
          "The constructive vote of no confidence is an innovation: parliament can only remove the head of government by simultaneously electing a successor. You can't just vote out a chancellor — you must vote someone else in. This prevents the instability of governments being toppled without a viable replacement.",
        inPractice:
          "This mechanism was invented to prevent the kind of parliamentary chaos that plagued the Weimar Republic. It makes governments stable — a chancellor can only be replaced, not simply destroyed. But it also means an unpopular government can survive as long as the opposition can't agree on an alternative.",
      },
      {
        match: /Formal separation.*presidential/i,
        explanation:
          "This presidential system has a formal separation of powers: the president, legislature, and judiciary are constitutionally distinct branches with their own mandates. The president can't dissolve the legislature; the legislature can't remove the president through a simple vote. Each branch has tools to check the others — vetoes, judicial review, confirmation powers.",
        inPractice:
          "The effectiveness of this separation depends on whether institutions are truly independent or captured by political interests. On paper, the branches check each other. In practice, the strength of democratic norms, the independence of the judiciary, and the country's political culture determine whether these checks are real or performative.",
      },
      {
        match: /Fused.*executive.*legislature|Fusion of executive/i,
        explanation:
          "A fused executive-legislature means the head of government comes from, and depends on, the legislature. The PM must maintain parliamentary confidence. This means less formal separation between these two branches — but the judiciary typically provides an independent check, and elections are the ultimate accountability mechanism.",
        inPractice:
          "Governments can act decisively because they already have legislative support. But if one party dominates both the government and parliament overwhelmingly, opposition becomes weakened. The strength of the judiciary, free press, and civil society become crucial checks in the absence of formal branch separation.",
      },
      {
        match: /Executive dominance|limited checks/i,
        explanation:
          "When the executive holds dominant power and formal checks are limited, political authority is concentrated — whether through constitutional design, political practice, or both. The legislature and judiciary may exist as institutions but have limited capacity to independently override executive decisions. This can reflect a deliberate governance philosophy favoring decisive leadership or can result from the gradual erosion of institutional autonomy.",
        inPractice:
          "Concentrated executive power can enable rapid, coordinated policy and long-term planning without legislative gridlock. The trade-off is that errors, corruption, or abuses of power have fewer institutional correctives. Whether this concentration benefits or harms citizens depends heavily on the quality and accountability of leadership — and on whether alternative accountability mechanisms (media, civil society, internal party processes) function effectively.",
      },
      {
        match: /No formal separation.*party/i,
        explanation:
          "In a single-party system, the party serves as the unifying structure across all branches of government. The legislature, judiciary, and executive operate within the party's framework rather than as independent, competing institutions. Accountability is primarily internal — through party discipline, performance evaluation, and hierarchical oversight rather than through multi-party electoral competition.",
        inPractice:
          "This model enables long-term strategic planning and coordinated policy implementation without the delays of inter-branch negotiation or electoral cycles. Internal mechanisms like anti-corruption commissions, performance metrics, and intra-party review processes provide accountability within the system. Critics point to the lack of external corrective mechanisms, while proponents argue that internal accountability can be more systematic and results-oriented than electoral competition.",
      },
      {
        match: /dominant party/i,
        explanation:
          "A dominant party system means one party has maintained power for an extended period through a combination of electoral success, institutional advantages, and public trust. Opposition parties exist and compete but have not achieved power rotation. This can reflect genuine popular support, structural advantages built into the system, or both.",
        inPractice:
          "Elections occur regularly and opposition parties contest them, but incumbency advantages — name recognition, institutional knowledge, access to resources — make displacement difficult. Some dominant party systems produce highly effective governance (as in Singapore's rapid development), while others use institutional advantages to entrench power without delivering comparable results. The key question is whether the system remains responsive to citizens' needs or becomes self-serving.",
      },
      {
        match: /Negative parliamentarism/i,
        explanation:
          "Negative parliamentarism means a government doesn't need a parliamentary majority vote to take office — it just needs to not be actively opposed by a majority. The government survives unless a majority explicitly votes against it. This subtle distinction enables minority governments, where a party governs without having the most seats.",
        inPractice:
          "This system makes coalition politics more fluid. Minority governments can form and govern by building different legislative majorities for different issues. It encourages compromise and cross-party cooperation but can also lead to weaker, less stable governments that struggle to pass ambitious legislation.",
      },
      {
        match: /supermajority/i,
        explanation:
          "When one party or coalition controls a supermajority (typically two-thirds), they can change the constitution, override vetoes, and reshape the rules of the political game itself. Normal checks and balances assume no single actor can unilaterally rewrite the rules — a supermajority breaks that assumption.",
        inPractice:
          "Constitutional supermajorities can be used to entrench power by changing election rules, judicial appointment processes, and civil liberties protections. International observers watch closely when any government approaches supermajority power, as the temptation to reshape the system in one's favor is historically difficult for governing parties to resist.",
      },
    ],

    countryContext(c: Country) {
      const pressRank = c.rsfRank;
      const hasLimitedChecks = c.checks.toLowerCase().includes("limited") || c.checks.toLowerCase().includes("no formal");
      const isWestminster = c.checks.toLowerCase().includes("westminster");

      if (hasLimitedChecks) {
        return `${c.name}'s governance concentrates authority in the executive, with formal checks playing a limited role in practice. Press freedom (ranked #${pressRank}/180) indicates limited independent media — one of several accountability mechanisms that vary widely across governance models. Whether accountability operates through formal institutional checks, internal party mechanisms, or other channels differs significantly across countries.`;
      }
      if (isWestminster) {
        return `${c.name}'s Westminster-derived system relies on political rather than structural checks: the PM needs parliamentary confidence, not just constitutional authority. With press freedom ranked #${pressRank}/180, media scrutiny ${pressRank <= 30 ? "provides a robust informal check — journalists and opposition parties serve as watchdogs that compensate for the lack of formal separation" : "faces challenges that weaken this informal accountability mechanism"}.`;
      }
      if (c.checks.toLowerCase().includes("strong")) {
        return `${c.name}'s governance features robust formal mechanisms for inter-branch competition — each branch has constitutional tools to constrain the others. This model prioritizes preventing power concentration through institutional friction. Press freedom (ranked #${pressRank}/180) indicates ${pressRank <= 30 ? "additional informal accountability through media scrutiny" : "that informal accountability mechanisms face their own pressures, independent of formal structures"}.`;
      }
      return `In ${c.name}, the balance of power between branches operates through ${c.checks.toLowerCase()}. Press freedom (ranked #${pressRank}/180) affects how visible this balance is to the public — ${pressRank <= 50 ? "a relatively free press means citizens can see when checks fail" : "constrained press freedom means power imbalances may go unreported"}.`;
    },
  },
};
