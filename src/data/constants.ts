import type { Country, DesignOption, CategoryColor, CivicTrait, DesignPhase, CompatibilityRule, InterestGroup } from "./types";

export const COUNTRIES: Country[] = [
  { name: "Argentina", code: "AR", region: "Americas", govType: "Presidential Republic", executive: "President (Head of State & Government)", legislative: "National Congress (Bicameral)", legislativeType: "Bicameral", judicial: "Supreme Court", economic: "Upper-middle income; market-oriented", media: "Ownership: Grupo Clarín (Magnetto family) and La Nación (Mitre family) control dominant print and broadcast. Legal: Constitutional press protections; no criminal defamation since 2009. Milei administration dismantled state news agency TÉLAM in 2024. Commercial: Government advertising historically used as leverage over outlets; entertainment-oriented commercial broadcasting dominates viewership. Public: Public broadcaster dismantled by Milei administration. Model: family-conglomerate commercial.", mediaScore: 56, rsfRank: 18, federal: "Federal", checks: "Formal separation; presidential system", population: "46M", continent: "South America" },
  { name: "Australia", code: "AU", region: "Oceania", govType: "Parliamentary Democracy (Constitutional Monarchy)", executive: "Prime Minister (Head of Government); Monarch (Head of State)", legislative: "Parliament (Bicameral)", legislativeType: "Bicameral", judicial: "High Court", economic: "High-income; market economy", media: "Ownership: News Corp Australia (Murdoch family) controls ~60% of metropolitan newspaper circulation. Nine Entertainment and Seven Group hold most remaining commercial outlets. Legal: No constitutional press freedom guarantee; relies on implied freedom. Defamation law frequently used. Commercial: Advertising-funded; Murdoch properties exercise documented editorial influence on elections and policy debate. Public: ABC and SBS are publicly funded with statutory editorial independence. Model: billionaire-concentrated commercial with independent public broadcasters.", mediaScore: 93, rsfRank: 6, federal: "Federal", checks: "Westminster system; executive fused with legislature", population: "26M", continent: "Oceania" },
  { name: "Brazil", code: "BR", region: "Americas", govType: "Presidential Republic", executive: "President (Head of State & Government)", legislative: "National Congress (Bicameral)", legislativeType: "Bicameral", judicial: "Supreme Federal Court", economic: "Upper-middle income; emerging market", media: "Ownership: Grupo Globo (Marinho family) dominates television with ~40% national audience share. Record TV is owned by the Universal Church of the Kingdom of God. Legal: Constitutional press protections. Journalists covering land rights, deforestation, and organised crime in rural areas face documented physical violence. Commercial: Advertising-dependent entertainment model dominates. Digital disinformation is a documented systemic problem. Public: EBC (state-funded) exists but has limited audience and independence. Model: family-conglomerate commercial entertainment.", mediaScore: 55, rsfRank: 19, federal: "Federal", checks: "Formal separation; presidential system", population: "216M", continent: "South America" },
  { name: "Canada", code: "CA", region: "Americas", govType: "Parliamentary Democracy (Constitutional Monarchy)", executive: "Prime Minister (Head of Government); Monarch (Head of State)", legislative: "Parliament (Bicameral)", legislativeType: "Bicameral", judicial: "Supreme Court", economic: "High-income; mixed economy", media: "Ownership: Bell Media, Rogers Media, and Postmedia own majority of commercial outlets. Postmedia controls most English-language daily newspapers. Legal: Strong constitutional protections (Charter s.2(b)); robust FOI framework; shield law for journalist sources. Commercial: Advertising model with growing digital consolidation. Local newspaper closures accelerating — many communities now have no local reporting. Public: CBC/Radio-Canada is publicly funded with statutory editorial independence and significant national audience. Model: corporate-consolidated commercial with strong public broadcaster.", mediaScore: 94, rsfRank: 5, federal: "Federal", checks: "Westminster system; executive fused with legislature", population: "40M", continent: "North America" },
  { name: "Chile", code: "CL", region: "Americas", govType: "Presidential Republic", executive: "President (Head of State & Government)", legislative: "National Congress (Bicameral)", legislativeType: "Bicameral", judicial: "Supreme Court", economic: "High-income; market-oriented", media: "Ownership: El Mercurio (Edwards family) and COPESA (Saieh family) control majority of print. Canal 13 owned by the Luksic family (Chile's wealthiest). Legal: Constitutional press protections; post-2019 protest period raised concerns about coverage restrictions during demonstrations. Commercial: Ownership by business elites creates documented self-censorship on economic stories. Advertising-dependent. Public: TVN is state-owned but commercially funded, limiting editorial independence. CIPER (non-profit) is a notable independent investigative outlet. Model: oligarch-owned commercial.", mediaScore: 77, rsfRank: 12, federal: "Unitary", checks: "Formal separation; presidential system", population: "19M", continent: "South America" },
  { name: "China", code: "CN", region: "Asia", govType: "Single-party Socialist Republic", executive: "President (Head of State); Premier (Head of Government)", legislative: "National People's Congress (Unicameral)", legislativeType: "Unicameral", judicial: "Supreme People's Court", economic: "Upper-middle income; state-led socialist market", media: "Ownership: Xinhua, People's Daily, CCTV, and major digital platforms operate under CCP Propaganda Department editorial direction. All journalists require state-issued press credentials and meet education/qualification requirements. Legal: Government publishes 5-year plans, economic data, and policy documents with detailed public transparency on developmental targets. Coverage of CCP leadership decisions, 1989, Xinjiang, Tibet, and organised political opposition is restricted under national security law. Cyberspace Administration licenses digital platforms; foreign news services are not accessible without circumvention tools. Commercial: State-funded; not driven by advertising revenue or entertainment imperatives. Public: All major media is state-operated. Model: state-directed with credentialing standards and public policy transparency; restricted on political opposition and designated sensitive topics.", mediaScore: 5, rsfRank: 30, federal: "Unitary", checks: "No formal separation; party-dominated", population: "1.4B", continent: "Asia" },
  { name: "Denmark", code: "DK", region: "Europe", govType: "Parliamentary Democracy (Constitutional Monarchy)", executive: "Prime Minister (Head of Government); Monarch (Head of State)", legislative: "Folketing (Unicameral)", legislativeType: "Unicameral", judicial: "Supreme Court", economic: "High-income; mixed welfare state", media: "Ownership: Berlingske Media (Belgian DPG Media), JP/Politikens Hus (foundation-owned). No single billionaire controls dominant outlets. Legal: Among the world's strongest FOI laws. No criminal restrictions on political reporting. Journalist physical safety is high. Commercial: Subscription and advertising models; foundation ownership reduces profit-driven editorial pressure. Public: DR (Danish Broadcasting Corporation) funded by public allocation with statutory editorial independence. Model: foundation/trust-owned with independent public broadcaster.", mediaScore: 98, rsfRank: 1, federal: "Unitary", checks: "Negative parliamentarism; fused powers", population: "5.9M", continent: "Europe" },
  { name: "France", code: "FR", region: "Europe", govType: "Semi-Presidential Republic", executive: "President (Head of State); Prime Minister (Head of Government)", legislative: "Parliament (Bicameral)", legislativeType: "Bicameral", judicial: "Court of Cassation", economic: "High-income; mixed economy", media: "Ownership: Significant billionaire consolidation — Bolloré family (CNews, Canal+, Europe 1), Niel (Le Monde group), Arnault (Les Échos, Le Parisien), Bouygues (TF1). Bolloré's CNews has an explicit political orientation. Legal: Strong press protections and source protection law. Defamation remains a criminal offense. Commercial: Billionaire owners have documented influence on editorial direction; advertising-funded model. Public: France Télévisions and Radio France are publicly funded with statutory editorial independence. Model: billionaire-consolidated commercial with independent public broadcasters.", mediaScore: 85, rsfRank: 8, federal: "Unitary", checks: "Executive shared; some separation", population: "68M", continent: "Europe" },
  { name: "Germany", code: "DE", region: "Europe", govType: "Parliamentary Republic", executive: "Chancellor (Head of Government); President (Ceremonial Head)", legislative: "Bundestag & Bundesrat (Bicameral)", legislativeType: "Bicameral", judicial: "Federal Constitutional Court", economic: "High-income; social market economy", media: "Ownership: Axel Springer (KKR private equity since 2019) owns Bild and Die Welt. Bertelsmann (Mohn family) owns RTL Group. Funke and DuMont groups own regional press. Legal: Constitutional press freedom (Article 5 Basic Law). Strong source protection for journalists. Commercial: Dual public-commercial system; advertising less dominant than US model due to strong publicly-funded sector. Public: ARD and ZDF funded via household fee (Rundfunkbeitrag) with statutory editorial independence and commanding national audience share. Model: mixed commercial/public with independent public broadcasters dominant.", mediaScore: 95, rsfRank: 4, federal: "Federal", checks: "Constructive vote of no confidence; fused executive-legislature", population: "84M", continent: "Europe" },
  { name: "Ghana", code: "GH", region: "Africa", govType: "Presidential Republic", executive: "President (Head of State & Government)", legislative: "Parliament (Unicameral)", legislativeType: "Unicameral", judicial: "Supreme Court", economic: "Lower-middle income; developing", media: "Ownership: Multimedia Group, Media General, EIB Network dominate commercial broadcasting. Multiple private newspapers; no single owner dominates. Legal: Constitutional press protections; Criminal Libels Act repealed 2001. Journalist physical safety generally adequate in urban areas. Commercial: Advertising-dependent; government advertising contracts create documented editorial influence. Entertainment and political talk formats compete for audience. Public: GBC (Ghana Broadcasting Corporation) is state-funded and government-aligned. Model: pluralistic commercial.", mediaScore: 62, rsfRank: 16, federal: "Unitary", checks: "Formal separation; presidential system", population: "34M", continent: "Africa" },
  { name: "Greece", code: "GR", region: "Europe", govType: "Parliamentary Republic", executive: "Prime Minister (Head of Government); President (Ceremonial)", legislative: "Parliament (Unicameral)", legislativeType: "Unicameral", judicial: "Supreme Court", economic: "High-income; advanced economy", media: "Ownership: Major outlets owned by business figures with shipping, construction, and banking interests — Marinakis (Olympiacos owner) owns ANT1 and Kathimerini, Alafouzos owns Skai, Vardinogiannis family owns Mega. Legal: Constitutional protections exist. 2022 Predator spyware scandal revealed government-linked surveillance of journalists and politicians. Commercial: Owners' external business interests create documented editorial conflicts; advertising connected to politically-adjacent contracts. Public: ERT public broadcaster shut down during 2013 austerity crisis, reconstituted with reduced independence. Model: oligarch-owned commercial.", mediaScore: 74, rsfRank: 13, federal: "Unitary", checks: "Westminster-style; fused powers", population: "10M", continent: "Europe" },
  { name: "Hungary", code: "HU", region: "Europe", govType: "Parliamentary Republic", executive: "Prime Minister (Head of Government); President (Ceremonial)", legislative: "National Assembly (Unicameral)", legislativeType: "Unicameral", judicial: "Curia (Supreme Court)", economic: "High-income; advanced economy", media: "Ownership: KESMA foundation (government-aligned) controls ~80% of regional media. TV2 is government-aligned. Remaining independent: Telex, 444.hu, Direkt36 (non-profit investigative). Legal: EU member with nominally constitutional protections. Media authority staffed by government appointees controls broadcast licensing. Commercial: State advertising disproportionately directed to government-aligned outlets. Independent outlets survive on reader subscriptions and international grants. Public: MTVA public broadcaster operates under government-appointed board. Model: government-aligned consolidated.", mediaScore: 53, rsfRank: 20, federal: "Unitary", checks: "Fused powers; supermajority governance", population: "10M", continent: "Europe" },
  { name: "India", code: "IN", region: "Asia", govType: "Parliamentary Republic", executive: "Prime Minister (Head of Government); President (Head of State)", legislative: "Parliament (Bicameral)", legislativeType: "Bicameral", judicial: "Supreme Court", economic: "Lower-middle income; emerging market", media: "Ownership: Reliance Industries (Ambani, India's wealthiest) acquired Network18/TV18 group (CNN-News18, CNBC-TV18). Adani Group (second wealthiest) acquired NDTV. Zee Entertainment (Subhash Chandra). Independent digital: The Wire, Scroll, Newslaundry. Legal: Constitutional press protections (Article 19). Colonial-era sedition law and IT Rules 2021 used against journalists; income-tax investigations documented against critical outlets. Commercial: Billionaire-owned outlets' editorial lines align with ownership business interests. Advertising-funded model. Public: Prasar Bharati (DD/AIR) is government-controlled in practice. Model: billionaire-acquired commercial.", mediaScore: 45, rsfRank: 21, federal: "Federal", checks: "Westminster-style; executive fused with legislature", population: "1.4B", continent: "Asia" },
  { name: "Israel", code: "IL", region: "Middle East", govType: "Parliamentary Republic", executive: "Prime Minister (Head of Government); President (Ceremonial)", legislative: "Knesset (Unicameral)", legislativeType: "Unicameral", judicial: "Supreme Court", economic: "High-income; advanced economy", media: "Ownership: Haaretz (Schocken family), Yedioth Ahronoth (Moses family), Israel Hayom (previously Adelson-funded billionaire free-distribution model). Channels 12 and 13 are commercial. Legal: Military censor has constitutional authority to review security-related content before publication. General political reporting is not restricted. Commercial: Israel Hayom's free distribution model (funded by billionaire backing) disrupted the commercial press market. Advertising-dependent for other outlets. Public: Kan public broadcaster operates with statutory independence but has faced political pressure from successive governments. Model: mixed commercial with military censorship on security matters.", mediaScore: 62, rsfRank: 17, federal: "Unitary", checks: "Fused executive-legislature", population: "9.8M", continent: "Asia" },
  { name: "Italy", code: "IT", region: "Europe", govType: "Parliamentary Republic", executive: "Prime Minister (Head of Government); President (Ceremonial)", legislative: "Parliament (Bicameral)", legislativeType: "Bicameral", judicial: "Court of Cassation", economic: "High-income; mixed economy", media: "Ownership: Mediaset/MFE (Berlusconi family) controls major commercial TV channels — a legacy of a prime minister controlling most television. GEDI Group (Elkann/Agnelli auto dynasty) owns La Repubblica and La Stampa. RCS MediaGroup (Cairo) owns Corriere della Sera. Legal: Constitutional press protections. Criminal defamation on the books. Organised crime poses documented physical threat to journalists in southern regions. Commercial: Ownership by major industrial dynasties creates structural editorial conflicts of interest. Public: RAI is publicly funded but board is appointed through political process — subject to documented government pressure across administrations. Model: industrial-dynasty commercial with politically supervised public broadcaster.", mediaScore: 78, rsfRank: 11, federal: "Unitary", checks: "Fused executive-legislature", population: "59M", continent: "Europe" },
  { name: "Japan", code: "JP", region: "Asia", govType: "Parliamentary Democracy (Constitutional Monarchy)", executive: "Prime Minister (Head of Government); Emperor (Ceremonial)", legislative: "National Diet (Bicameral)", legislativeType: "Bicameral", judicial: "Supreme Court", economic: "High-income; advanced market economy", media: "Ownership: Major newspapers (Yomiuri, Asahi, Mainichi, Nikkei) are widely held or employee-owned. Television networks operate within cross-ownership keiretsu structures. Legal: Constitutional press freedom (Article 21). No criminal restrictions on political reporting. Commercial: The press club (kisha kurabu) system grants access to government sources in exchange for editorial self-restraint — documented as creating systemic self-censorship. Advertising revenue model. Public: NHK funded by household fees with statutory independence, but institutionally cautious on political coverage. Model: access-exchange commercial with press club self-censorship.", mediaScore: 80, rsfRank: 10, federal: "Unitary", checks: "Fused executive-legislature", population: "124M", continent: "Asia" },
  { name: "Kenya", code: "KE", region: "Africa", govType: "Presidential Republic", executive: "President (Head of State & Government)", legislative: "Parliament (Bicameral)", legislativeType: "Bicameral", judicial: "Supreme Court", economic: "Lower-middle income; developing", media: "Ownership: Nation Media Group (Aga Khan Foundation) and Standard Group (Moi family-associated) dominate. Royal Media Services is significant. Legal: Constitutional protections (2010 Constitution). Journalists covering security or land issues face documented physical threats. Commercial: Government advertising contracts are a major revenue source and documented editorial leverage point. Entertainment programming competes for audience. Public: KBC (Kenya Broadcasting Corporation) is government-controlled. Model: commercial with government advertising leverage.", mediaScore: 33, rsfRank: 26, federal: "Unitary", checks: "Formal separation; presidential system", population: "56M", continent: "Africa" },
  { name: "Mexico", code: "MX", region: "Americas", govType: "Presidential Republic", executive: "President (Head of State & Government)", legislative: "Congress (Bicameral)", legislativeType: "Bicameral", judicial: "Supreme Court", economic: "Upper-middle income; emerging market", media: "Ownership: Televisa-Univision and TV Azteca (Salinas Pliego, billionaire) dominate commercial television. Print and digital outlets are fragmented. Legal: Constitutional protections exist. Mexico is the Western Hemisphere's most dangerous country for journalists — CPJ documents 150+ killed since 2000; impunity rate exceeds 90%. 2024 judicial reform eliminates career judiciary. Commercial: Salinas Pliego's TV Azteca has documented alignment with political interests. Self-censorship in cartel-affected regions is pervasive. Public: No structurally independent public broadcaster of significance. Model: billionaire-commercial with endemic physical danger.", mediaScore: 39, rsfRank: 25, federal: "Federal", checks: "Formal separation; presidential system", population: "130M", continent: "North America" },
  { name: "Netherlands", code: "NL", region: "Europe", govType: "Parliamentary Democracy (Constitutional Monarchy)", executive: "Prime Minister (Head of Government); Monarch (Head of State)", legislative: "States General (Bicameral)", legislativeType: "Bicameral", judicial: "Supreme Court", economic: "High-income; mixed economy", media: "Ownership: DPG Media (Belgian) owns AD and Volkskrant. Mediahuis (Belgian), Telegraaf Media Groep. No single Dutch billionaire dominates media ownership. Legal: Strong constitutional protections. Source protection law. FOI framework functional. Commercial: Subscription and advertising model. Follow the Money and Investico (non-profit investigative) operate on reader support and grants. Public: NPO public broadcasting system funded by government allocation with statutory editorial independence. Model: distributed ownership with independent public broadcaster and non-profit investigative presence.", mediaScore: 96, rsfRank: 3, federal: "Unitary", checks: "Fused executive-legislature", population: "18M", continent: "Europe" },
  { name: "Nigeria", code: "NG", region: "Africa", govType: "Presidential Republic", executive: "President (Head of State & Government)", legislative: "National Assembly (Bicameral)", legislativeType: "Bicameral", judicial: "Supreme Court", economic: "Lower-middle income; developing", media: "Ownership: Many outlets owned by politicians or politically-connected figures. Channels TV, Arise (Nduka Obaigbena), TVC (Tinubu-associated). Punch and Premium Times are independent-leaning. Legal: Constitutional protections alongside the Cybercrimes Act used against online critics. Physical danger to journalists covering oil region, terrorism, and political corruption. Commercial: Government advertising is a major revenue source and documented editorial pressure tool. Entertainment formats and political talk dominate. Public: NTA and FRCN are government-controlled. Model: politician-owned commercial with government advertising capture.", mediaScore: 26, rsfRank: 27, federal: "Federal", checks: "Formal separation; presidential system", population: "224M", continent: "Africa" },
  { name: "Peru", code: "PE", region: "Americas", govType: "Presidential Republic", executive: "President (Head of State & Government)", legislative: "Congress (Unicameral)", legislativeType: "Unicameral", judicial: "Constitutional Court, Supreme Court", economic: "Upper-middle income; emerging market", media: "Ownership: El Comercio group (Miró Quesada family) controls dominant newspaper market share. Latina and América TV dominate broadcast. Legal: Constitutional press protections. Journalists covering drug trafficking and extractive industry conflicts face physical danger in some regions. Commercial: Advertising-dependent; ownership concentration in traditional business families. Public: TV Perú is state-operated with limited audience and editorial independence. IDL-Reporteros is a notable non-profit investigative outlet. Model: family-concentrated commercial.", mediaScore: 44, rsfRank: 22, federal: "Unitary", checks: "Formal separation; presidential system", population: "34M", continent: "South America" },
  { name: "Philippines", code: "PH", region: "Asia", govType: "Presidential Republic", executive: "President (Head of State & Government)", legislative: "Congress (Bicameral)", legislativeType: "Bicameral", judicial: "Supreme Court", economic: "Lower-middle income; emerging market", media: "Ownership: ABS-CBN (López family) was shut down in 2020 when Congress denied franchise renewal — widely documented as political retaliation for coverage. GMA Network is the dominant remaining commercial broadcaster. Legal: Constitutional press protections. One of the world's deadliest countries for journalists (CPJ documented). Rappler (Maria Ressa, Nobel laureate) faced multiple government legal actions. Commercial: Advertising-funded; entertainment formats dominate commercial broadcasting. Public: PTV4 is government-controlled. Model: commercial entertainment with documented political retaliation risk.", mediaScore: 43, rsfRank: 23, federal: "Unitary", checks: "Formal separation; presidential system", population: "117M", continent: "Asia" },
  { name: "Russia", code: "RU", region: "Europe/Asia", govType: "Semi-Presidential Republic", executive: "President (Head of State); Prime Minister (Head of Government)", legislative: "Federal Assembly (Bicameral)", legislativeType: "Bicameral", judicial: "Constitutional Court", economic: "Upper-middle income; transition economy", media: "Ownership: Channel One, Rossiya-1, NTV, and RT are state-owned or controlled through Gazprom-Media. Since 2022, remaining independent outlets (Novaya Gazeta, Echo Moskvy, Dozhd) shut down or forced into exile. Legal: Foreign Agent law, Undesirable Organizations law, and wartime censorship laws criminalise dissent from official military narrative. Extended sentences for 'discrediting' the armed forces. Commercial: State-funded model; media content directed toward narrative support of government positions. Public: All major broadcasters are state-controlled. Model: state-controlled.", mediaScore: 8, rsfRank: 29, federal: "Federal", checks: "Executive dominance; limited checks", population: "144M", continent: "Europe" },
  { name: "Singapore", code: "SG", region: "Asia", govType: "Parliamentary Republic", executive: "Prime Minister (Head of Government); President (Head of State)", legislative: "Parliament (Unicameral)", legislativeType: "Unicameral", judicial: "Supreme Court", economic: "High-income; highly developed market", media: "Ownership: SPH Media (restructured into government-supported non-profit trust, 2022) operates Straits Times. Mediacorp (state-owned) controls broadcast. Legal: POFMA (Protection from Online Falsehoods and Manipulation Act) allows government to designate and penalise content deemed false. Internal Security Act provides detention without trial. Journalists require accreditation; factual reporting on approved topics follows professional accuracy standards. Investigating PAP governance, judiciary, or security services carries legal risk. Foreign correspondents operate freely. Commercial: Not entertainment-driven; professional accuracy standards maintained within permitted scope. Public: SPH Media trust and Mediacorp are the primary outlets. Model: state-directed with professional accuracy standards within permitted scope.", mediaScore: 42, rsfRank: 24, federal: "Unitary", checks: "Fused executive-legislature; dominant party system", population: "6M", continent: "Asia" },
  { name: "South Africa", code: "ZA", region: "Africa", govType: "Parliamentary Republic", executive: "President (Head of State & Government)", legislative: "Parliament (Bicameral)", legislativeType: "Bicameral", judicial: "Constitutional Court", economic: "Upper-middle income; emerging market", media: "Ownership: Naspers/Media24 (Koos Bekker) dominates print. eMedia (eNCA). Independent Media (Iqbal Survé, documented political connections). Daily Maverick and amaBhungane are non-profit investigative outlets. Legal: Constitutional protections (Section 16) among Africa's strongest. SLAPP lawsuits used against investigative outlets. Commercial: Advertising-dependent; billionaire ownership creates documented editorial conflicts (Survé's Independent Media particularly noted). Public: SABC is publicly funded but has faced political board appointments and financial crisis. Model: mixed commercial with non-profit investigative presence and constitutionally protected press.", mediaScore: 64, rsfRank: 15, federal: "Unitary", checks: "Fusion of executive and legislature", population: "62M", continent: "Africa" },
  { name: "South Korea", code: "KR", region: "Asia", govType: "Presidential Republic", executive: "President (Head of State & Government)", legislative: "National Assembly (Unicameral)", legislativeType: "Unicameral", judicial: "Constitutional Court", economic: "High-income; advanced economy", media: "Ownership: Major newspapers (Chosun Ilbo, JoongAng Ilbo, Dong-a Ilbo) privately owned. JTBC (CJ Group, Samsung-affiliated chaebol). SBS, MBC commercial broadcasters. Legal: Constitutional press protections. December 2024 martial law attempt was reported in real time without suppression. Commercial: Advertising-funded; chaebol (industrial conglomerate) ownership creates structural editorial questions. Public: KBS and MBC are publicly funded — both have faced political pressure from successive governments regarding board appointments. Model: chaebol-commercial with politically supervised public broadcasters.", mediaScore: 73, rsfRank: 14, federal: "Unitary", checks: "Formal separation; presidential system", population: "52M", continent: "Asia" },
  { name: "Sweden", code: "SE", region: "Europe", govType: "Parliamentary Democracy (Constitutional Monarchy)", executive: "Prime Minister (Head of Government); Monarch (Ceremonial)", legislative: "Riksdag (Unicameral)", legislativeType: "Unicameral", judicial: "Supreme Court", economic: "High-income; mixed welfare state", media: "Ownership: Bonnier family owns TV4 and Dagens Nyheter. Schibsted (Norwegian) owns Aftonbladet and SvD. No single owner dominates across sectors. Legal: World's first constitutional press freedom law (1766). Source protection is constitutional. Commercial: Subscription and advertising dual model. Family and foundation ownership structures reduce short-term profit pressure. Public: SVT and SR publicly funded via independent fee with statutory editorial independence and substantial national audience share. Model: family/foundation-owned commercial with independent dominant public broadcaster.", mediaScore: 98, rsfRank: 2, federal: "Unitary", checks: "Fused executive-legislature", population: "10M", continent: "Europe" },
  { name: "Turkey", code: "TR", region: "Europe/Asia", govType: "Presidential Republic", executive: "President (Head of State & Government)", legislative: "Grand National Assembly (Unicameral)", legislativeType: "Unicameral", judicial: "Constitutional Court", economic: "Upper-middle income; emerging market", media: "Ownership: Demirören Group (government-aligned) acquired Hürriyet and CNN Türk. Kalyon Group (government-aligned) controls Sabah and ATV. Remaining critical outlets: Cumhuriyet, BirGün, Bianet, Medyascope. Legal: Anti-terrorism and criminal defamation laws used to prosecute journalists. Turkey has imprisoned more journalists than almost any other country (CPJ documented). Commercial: Government-aligned conglomerates receive disproportionate state advertising and public contracts. Independent outlets survive on reader subscriptions. Public: TRT is state-controlled. Model: government-aligned conglomerate-controlled.", mediaScore: 16, rsfRank: 28, federal: "Unitary", checks: "Executive dominance; limited checks", population: "85M", continent: "Asia" },
  { name: "United Kingdom", code: "GB", region: "Europe", govType: "Parliamentary Democracy (Constitutional Monarchy)", executive: "Prime Minister (Head of Government); Monarch (Head of State)", legislative: "Parliament (Bicameral)", legislativeType: "Bicameral", judicial: "Supreme Court", economic: "High-income; advanced economy", media: "Ownership: News UK (Murdoch family) owns Times and Sun. Daily Mail Group (Rothermere family, 4th Viscount). Reach plc owns Mirror and Express. Guardian is owned by Scott Trust (non-profit). Legal: No constitutional press freedom guarantee. UK libel law historically used as a suppression tool (libel tourism). Official Secrets Act restricts security reporting. Commercial: Tabloid sector (Sun, Daily Mail) dominates readership — operates on engagement and outrage-driven entertainment model that shapes political culture. Guardian and FT are subscription-funded. Public: BBC funded by licence fee with statutory independence, but faces ongoing government funding pressure and charter renewal leverage. Model: billionaire-tabloid commercial dominant with trust-owned and publicly funded alternatives.", mediaScore: 90, rsfRank: 7, federal: "Unitary with devolved powers", checks: "Westminster system; parliamentary sovereignty; fused powers", population: "68M", continent: "Europe" },
  { name: "United States", code: "US", region: "Americas", govType: "Presidential Republic", executive: "President (Head of State & Government)", legislative: "Congress (Bicameral)", legislativeType: "Bicameral", judicial: "Supreme Court", economic: "High-income; market-oriented economy", media: "Ownership: Six conglomerates (Comcast/NBCUniversal, Fox Corp/Murdoch, Disney/ABC, Warner Bros Discovery/CNN, Paramount, Amazon) control dominant television and streaming news. Bezos (Amazon) owns Washington Post. Murdoch controls Fox News, Wall Street Journal, New York Post. Laurene Powell Jobs owns The Atlantic. Legal: First Amendment provides strongest constitutional press protections globally. No government licensing. NYT v. Sullivan standard protects political criticism. Commercial: Fox Corporation's primetime programming characterised as entertainment rather than factual reporting in 2023 Dominion litigation. Advertising-driven model across networks maximises engagement over accuracy. ~3,500 local newspapers closed since 2005 (Northwestern Medill). Public: PBS/NPR exist but command small audience share relative to commercial sector — structurally marginalised by funding model. Model: billionaire-consolidated commercial entertainment with strong legal protections and marginalised public option.", mediaScore: 82, rsfRank: 9, federal: "Federal", checks: "Strong formal separation; checks and balances", population: "335M", continent: "North America" },
];

export const FLAG_EMOJI: Record<string, string> = {
  AR: "🇦🇷", AU: "🇦🇺", BR: "🇧🇷", CA: "🇨🇦", CL: "🇨🇱", CN: "🇨🇳",
  DK: "🇩🇰", FR: "🇫🇷", DE: "🇩🇪", GH: "🇬🇭", GR: "🇬🇷", HU: "🇭🇺",
  IN: "🇮🇳", IL: "🇮🇱", IT: "🇮🇹", JP: "🇯🇵", KE: "🇰🇪", MX: "🇲🇽",
  NL: "🇳🇱", NG: "🇳🇬", PE: "🇵🇪", PH: "🇵🇭", RU: "🇷🇺", SG: "🇸🇬",
  ZA: "🇿🇦", KR: "🇰🇷", SE: "🇸🇪", TR: "🇹🇷", GB: "🇬🇧", US: "🇺🇸",
};

export const REGIONS: string[] = [...new Set(COUNTRIES.map((c) => c.region))].sort();

export const DESIGN_OPTIONS: Record<string, DesignOption[]> = {
  // PHASE 1: FOUNDATION
  // Options ordered alphabetically to avoid implied ranking
  authority: [
    { id: "autocratic", label: "Autocratic", desc: "Single leader holds paramount authority. Decisions are swift but unchecked. Stability depends on the character and capacity of the ruler.", examples: "Russia, Belarus, various Central Asian and Middle Eastern states", icon: "Crown", color: "#FFD700" },
    { id: "democratic", label: "Democratic", desc: "Power derived from popular consent through regular elections. Citizens choose representatives who govern on their behalf.", examples: "India, Brazil, South Africa, Germany, Japan, Indonesia, and many others globally", icon: "SealCheck", color: "#3B82F6" },
    { id: "oligarchic", label: "Oligarchic", desc: "Power concentrated in a select group — an elite council, military junta, or ruling class. Decisions made by few on behalf of many.", examples: "Singapore (administered by a dominant elite), historical Venice, various juntas", icon: "Users", color: "#8B5CF6" },
    { id: "single-party", label: "Single-Party State", desc: "One political party controls the state apparatus. Opposition parties are banned or marginalized. The party defines the national direction.", examples: "China, Cuba, Vietnam, North Korea", icon: "Star", color: "#EF4444" },
    { id: "theocratic", label: "Theocratic", desc: "Religious authority supersedes political. Government legitimacy flows from divine mandate or religious law interpreted by clerical institutions.", examples: "Iran, Vatican City, Afghanistan under Taliban rule", icon: "Book", color: "#F59E0B" },
  ],
  // PHASE 2: INSTITUTIONS
  executive: [
    { id: "presidential", label: "Presidential", desc: "Directly elected president serves as both head of state and government, independent of the legislature", examples: "USA, Brazil, South Korea", icon: "Bank", color: "#60A5FA" },
    { id: "parliamentary", label: "Parliamentary", desc: "Prime minister drawn from legislature leads government; ceremonial head of state (president or monarch)", examples: "Germany, UK, India", icon: "Buildings", color: "#A78BFA" },
    { id: "semi-presidential", label: "Semi-Presidential", desc: "Elected president shares executive power with a PM who is accountable to parliament", examples: "France, Russia", icon: "Scales", color: "#F472B6" },
    { id: "constitutional-monarchy", label: "Constitutional Monarchy", desc: "Hereditary monarch serves as head of state while elected PM governs day-to-day", examples: "Denmark, Japan, Sweden", icon: "CastleTurret", color: "#FBBF24" },
    { id: "directorial", label: "Directorial / Collective", desc: "Executive power shared among a council of equals rather than a single leader", examples: "Switzerland (Federal Council)", icon: "Handshake", color: "#34D399" },
  ],
  legislative: [
    { id: "bicameral-proportional", label: "Bicameral + Proportional", desc: "Two chambers; lower house elected by proportional representation ensuring minority voices", examples: "Germany, Netherlands, Argentina, South Africa", icon: "ChartBar", color: "#2DD4BF" },
    { id: "bicameral-majoritarian", label: "Bicameral + Majoritarian", desc: "Two chambers; winner-take-all districts (first-past-the-post or plurality voting)", examples: "USA, UK, India, Brazil", icon: "Trophy", color: "#FBBF24" },
    { id: "unicameral", label: "Unicameral", desc: "Single legislative chamber — streamlined lawmaking but fewer internal checks", examples: "Denmark, Sweden, South Korea, Ghana, Peru", icon: "Scroll", color: "#A78BFA" },
    { id: "bicameral-mixed", label: "Bicameral + Mixed", desc: "Two chambers combining proportional and majoritarian elements for balanced representation", examples: "Japan, South Korea, Italy, Mexico", icon: "Shuffle", color: "#FB923C" },
  ],
  electoral: [
    { id: "fptp", label: "First-Past-The-Post", desc: "Whoever gets the most votes in each district wins. Simple but can produce disproportionate results.", examples: "USA, UK, India, Canada, Kenya, Ghana", icon: "Medal", color: "#F87171" },
    { id: "proportional-list", label: "Proportional Representation", desc: "Seats allocated to parties in proportion to their vote share. Encourages multi-party systems.", examples: "Netherlands, Sweden, South Africa, Argentina, Israel", icon: "ChartBar", color: "#38BDF8" },
    { id: "mmp", label: "Mixed-Member Proportional", desc: "Combines local district winners with proportional top-up seats to balance representation.", examples: "Germany, New Zealand, South Korea, Bolivia", icon: "ArrowsCounterClockwise", color: "#A3E635" },
    { id: "ranked-choice", label: "Ranked Choice / STV", desc: "Voters rank candidates by preference. Eliminates spoiler effect and ensures majority support.", examples: "Australia, Ireland, Papua New Guinea, Fiji", icon: "ListNumbers", color: "#C084FC" },
    { id: "two-round", label: "Two-Round System", desc: "If no candidate wins a majority, the top candidates face a runoff. Used across all regions for presidential elections.", examples: "France, Brazil, many African and Central Asian republics", icon: "Repeat", color: "#FB923C" },
  ],
  judicial: [
    { id: "constitutional-court", label: "Dedicated Constitutional Court", desc: "Separate court focused exclusively on constitutional review with citizen access to challenge laws", examples: "Germany, South Africa, South Korea, Colombia, Turkey", icon: "BookBookmark", color: "#F472B6" },
    { id: "supreme-court", label: "Supreme Court (General)", desc: "Highest court handles both constitutional questions and final appellate cases", examples: "USA, India, Canada, Japan, Kenya", icon: "Scales", color: "#FBBF24" },
    { id: "dual-court", label: "Dual Court System", desc: "Separate constitutional and supreme/cassation courts with distinct jurisdictions", examples: "Peru, France, Italy, Mexico, Brazil", icon: "Files", color: "#60A5FA" },
    { id: "civil-law", label: "Code-Based Civil Law", desc: "Comprehensive written legal codes rather than case law precedent; judges as investigators rather than passive arbiters", examples: "Continental Europe, Latin America, Japan, much of Africa and Asia", icon: "Book", color: "#FB923C" },
  ],
  federal: [
    { id: "federal", label: "Federal", desc: "Power constitutionally shared between national and subnational governments with protected autonomy", examples: "Germany, Canada, India, Brazil, Nigeria, Australia", icon: "MapTrifold", color: "#38BDF8" },
    { id: "unitary", label: "Unitary", desc: "Central government holds primary authority; local governments exist at central discretion", examples: "France, Japan, South Korea, Chile, Indonesia", icon: "Building", color: "#A78BFA" },
    { id: "devolved", label: "Unitary with Devolution", desc: "Central government delegates specific powers to regions but retains ultimate sovereignty", examples: "United Kingdom, Italy, Spain, Philippines, South Africa", icon: "Shuffle", color: "#FBBF24" },
    { id: "confederal", label: "Confederal", desc: "Loose alliance of sovereign states with a weak central body; members retain most power", examples: "European Union (partial), African Union (partial), historical Swiss Confederation before 1848", icon: "Globe", color: "#34D399" },
  ],
  // PHASE 3: GOVERNANCE
  // Options ordered alphabetically to avoid implied ranking
  economic: [
    { id: "free-market", label: "Free Market Economy", desc: "Minimal state intervention, emphasis on private enterprise, deregulation, and individual economic freedom", examples: "USA, Singapore, Chile, Estonia", icon: "TrendUp", color: "#4ADE80" },
    { id: "mixed", label: "Mixed Economy", desc: "Pragmatic balance of market forces and strategic government intervention in key sectors", examples: "Canada, South Korea, Brazil, Australia, South Africa", icon: "Scales", color: "#60A5FA" },
    { id: "social-market", label: "Social Market Economy", desc: "Free market with strong social safety net, universal healthcare, worker protections, and robust public services", examples: "Germany, Japan, France, South Korea, Austria", icon: "FirstAid", color: "#F472B6" },
    { id: "state-led", label: "State-Led Economy", desc: "Government plays dominant role in economic planning, key industries, and resource allocation", examples: "China, Vietnam, Belarus, Qatar", icon: "HardHat", color: "#FBBF24" },
    { id: "welfare-state", label: "Comprehensive Welfare State", desc: "Universal basic services funded by high taxation — healthcare, education, childcare, elder care", examples: "Sweden, Denmark, Norway, Finland", icon: "Shield", color: "#2DD4BF" },
  ],
  // Options ordered alphabetically to avoid implied ranking
  checks: [
    { id: "constructive-noconfidence", label: "Constructive No-Confidence", desc: "Legislature can only remove the head of government by simultaneously electing a successor — prevents destabilizing power vacuums", examples: "Germany, Spain, Belgium, Hungary", icon: "Link", color: "#38BDF8" },
    { id: "fused-westminster", label: "Parliamentary Sovereignty", desc: "Executive drawn from legislature; parliament is the supreme authority and can rapidly pass or repeal legislation", examples: "UK, Australia, Canada, India, Japan", icon: "Bank", color: "#A78BFA" },
    { id: "independent-bodies", label: "Independent Oversight Bodies", desc: "Anti-corruption agencies, ombudsmen, electoral commissions, central banks insulated from political interference", examples: "Singapore, South Africa, Nordics, Indonesia", icon: "MagnifyingGlass", color: "#34D399" },
    { id: "judicial-supremacy", label: "Judicial Supremacy", desc: "Courts have final say on constitutionality; can strike down legislation and executive actions", examples: "USA, India, Germany, Colombia, Kenya", icon: "Scales", color: "#FBBF24" },
    { id: "strong-separation", label: "Strong Separation of Powers", desc: "Fully independent branches — executive, legislative, judicial — with formal checks on each other through separate elections and fixed terms", examples: "USA, Philippines, Brazil, South Korea", icon: "Lock", color: "#F87171" },
  ],
};

// ────────────────────────────────────────────────
// DESIGN PHASES (game-inspired layered approach)
// ────────────────────────────────────────────────
export const DESIGN_PHASES: DesignPhase[] = [
  {
    id: "foundation",
    label: "Foundation",
    desc: "Choose how power is organized — this shapes everything else",
    icon: "Bank",
    categories: ["authority"],
  },
  {
    id: "institutions",
    label: "Institutions",
    desc: "Design the branches of government and how they interact",
    icon: "GearSix",
    categories: ["executive", "legislative", "electoral", "judicial", "federal"],
  },
  {
    id: "governance",
    label: "Governance",
    desc: "Set economic policy, accountability mechanisms, and civic traits",
    icon: "Scroll",
    categories: ["economic", "checks"],
  },
  {
    id: "identity",
    label: "Identity",
    desc: "Define your government's values with policy sliders and civic traits",
    icon: "Palette",
    categories: [],
  },
];

// ────────────────────────────────────────────────
// CIVIC TRAITS (Stellaris-inspired)
// ────────────────────────────────────────────────
export const CIVIC_TRAITS: CivicTrait[] = [
  // Governance
  { id: "meritocracy", label: "Meritocratic", desc: "Leaders selected by competence; civil service exams, professional bureaucracy", category: "governance", icon: "GraduationCap", color: "#60A5FA", effects: ["Improved government efficiency", "Reduced corruption"], incompatible: ["aristocratic"] },
  { id: "aristocratic", label: "Aristocratic", desc: "Ruling class from established families; traditions of governance and noblesse oblige", category: "governance", icon: "CastleTurret", color: "#FBBF24", effects: ["Political stability from established networks", "Risk of ossified elite"], incompatible: ["meritocracy"] },
  { id: "technocratic", label: "Technocratic", desc: "Policy driven by experts and data; scientists and economists guide major decisions", category: "governance", icon: "Flask", color: "#2DD4BF", effects: ["Evidence-based policy", "May lack democratic legitimacy"], incompatible: ["populist"] },
  { id: "populist", label: "Populist", desc: "Direct connection between leader and people; bypassing institutional intermediaries", category: "governance", icon: "Megaphone", color: "#F87171", effects: ["High mobilization of base", "Risk of institutional erosion"], incompatible: ["technocratic"] },
  { id: "decentralist", label: "Decentralist", desc: "Maximum local autonomy; decisions made at the lowest effective level (subsidiarity)", category: "governance", icon: "SquaresFour", color: "#A78BFA", effects: ["Responsive local governance", "Potential coordination challenges"] },
  // Social
  { id: "pluralist", label: "Pluralist", desc: "Embraces diversity of cultures, languages, and identities within one polity", category: "social", icon: "Globe", color: "#38BDF8", effects: ["Cultural richness and innovation", "Requires robust integration policies"], incompatible: ["nationalist"] },
  { id: "nationalist", label: "Nationalist", desc: "Strong national identity, cultural cohesion, and sovereignty over external influence", category: "social", icon: "Flag", color: "#FB923C", effects: ["Clear national identity", "Tension with minorities and internationalism"], incompatible: ["pluralist"] },
  { id: "progressive", label: "Progressive", desc: "Advocates rapid social reform, expanded civil rights, and modernization", category: "social", icon: "Plant", color: "#4ADE80", effects: ["Social innovation and rights expansion", "Cultural backlash risk"], incompatible: ["traditionalist"] },
  { id: "traditionalist", label: "Traditionalist", desc: "Preserves established customs, institutions, and social order", category: "social", icon: "Diamond", color: "#C084FC", effects: ["Social stability and continuity", "May resist needed reforms"], incompatible: ["progressive"] },
  // Economic
  { id: "merchant-republic", label: "Merchant Republic", desc: "Commerce is central to government; trade and business interests shape policy", category: "economic", icon: "Storefront", color: "#FBBF24", effects: ["Strong trade and economic growth", "Risk of plutocratic capture"] },
  { id: "green-economy", label: "Green Economy", desc: "Environmental sustainability integrated into all economic policy", category: "economic", icon: "Recycle", color: "#4ADE80", effects: ["Long-term ecological sustainability", "Short-term economic transition costs"] },
  { id: "innovation-hub", label: "Innovation Hub", desc: "Government actively promotes R&D, tech sector, and knowledge economy", category: "economic", icon: "Lightbulb", color: "#38BDF8", effects: ["High-tech growth and patents", "Digital divide risk"] },
  // Military
  { id: "pacifist", label: "Pacifist", desc: "Renounces offensive military action; focuses on diplomacy and soft power", category: "military", icon: "Bird", color: "#67E8F9", effects: ["Reduced military spending, diplomatic credibility", "Vulnerable to aggressive neighbors"], incompatible: ["militarist"] },
  { id: "militarist", label: "Militarist", desc: "Strong military tradition; armed forces as central institution of state", category: "military", icon: "Sword", color: "#F87171", effects: ["Powerful defense capability", "Risk of military overreach"], incompatible: ["pacifist"] },
  { id: "neutral", label: "Neutral", desc: "Formal neutrality in international conflicts; focuses on diplomacy and mediation rather than military alliances", category: "military", icon: "Handshake", color: "#A78BFA", effects: ["International credibility as mediator", "Limited alliance options"] },
];

// ────────────────────────────────────────────────
// INTEREST GROUPS (Victoria 3-inspired)
// ────────────────────────────────────────────────
export const INTEREST_GROUPS: InterestGroup[] = [
  { id: "military", label: "Military", icon: "Sword", color: "#F87171", desc: "Armed forces and security establishment" },
  { id: "business", label: "Business / Capital", icon: "Buildings", color: "#60A5FA", desc: "Corporations, entrepreneurs, investors" },
  { id: "labor", label: "Labor / Workers", icon: "Wrench", color: "#FB923C", desc: "Unions, workers, employee organizations" },
  { id: "intelligentsia", label: "Intelligentsia", icon: "GraduationCap", color: "#A78BFA", desc: "Academics, professionals, media, civil society" },
  { id: "religious", label: "Religious Groups", icon: "Church", color: "#FBBF24", desc: "Faith communities and religious institutions" },
  { id: "rural", label: "Rural / Landowners", icon: "Grains", color: "#4ADE80", desc: "Agricultural interests, rural communities" },
];

// Interest group satisfaction based on selections
export function getInterestGroupSatisfaction(
  selections: Record<string, string>,
  sliders: Record<string, number>,
  civics: string[],
): Record<string, number> {
  const satisfaction: Record<string, number> = {
    military: 50, business: 50, labor: 50,
    intelligentsia: 50, religious: 50, rural: 50,
  };

  // Authority effects
  if (selections.authority === "democratic") { satisfaction.intelligentsia += 15; satisfaction.labor += 10; satisfaction.military -= 5; }
  if (selections.authority === "autocratic") { satisfaction.military += 15; satisfaction.intelligentsia -= 20; satisfaction.labor -= 10; }
  if (selections.authority === "theocratic") { satisfaction.religious += 30; satisfaction.intelligentsia -= 15; satisfaction.business -= 5; }
  if (selections.authority === "single-party") { satisfaction.military += 10; satisfaction.intelligentsia -= 25; satisfaction.business -= 10; }
  if (selections.authority === "oligarchic") { satisfaction.business += 20; satisfaction.labor -= 15; satisfaction.intelligentsia -= 10; }

  // Economic effects
  if (selections.economic === "free-market") { satisfaction.business += 25; satisfaction.labor -= 15; satisfaction.rural -= 5; }
  if (selections.economic === "social-market") { satisfaction.labor += 15; satisfaction.business -= 5; satisfaction.intelligentsia += 10; }
  if (selections.economic === "welfare-state") { satisfaction.labor += 25; satisfaction.business -= 15; satisfaction.intelligentsia += 5; }
  if (selections.economic === "state-led") { satisfaction.business -= 20; satisfaction.labor += 5; satisfaction.military += 5; }
  if (selections.economic === "mixed") { satisfaction.business += 5; satisfaction.labor += 5; }

  // Executive effects
  if (selections.executive === "presidential") { satisfaction.military += 5; }
  if (selections.executive === "parliamentary") { satisfaction.intelligentsia += 5; satisfaction.labor += 5; }
  if (selections.executive === "constitutional-monarchy") { satisfaction.religious += 5; satisfaction.rural += 10; }

  // Federal effects
  if (selections.federal === "federal") { satisfaction.rural += 10; }
  if (selections.federal === "unitary") { satisfaction.military += 5; satisfaction.rural -= 5; }

  // Slider effects
  const pressFreedom = sliders.pressFreedom ?? 50;
  const civilRights = sliders.civilRights ?? 50;
  const politicalParticipation = sliders.politicalParticipation ?? 50;

  satisfaction.intelligentsia += Math.round((pressFreedom - 50) * 0.4);
  satisfaction.religious -= Math.round((civilRights - 50) * 0.15);
  satisfaction.labor += Math.round((politicalParticipation - 50) * 0.3);
  satisfaction.military -= Math.round((civilRights - 50) * 0.1);
  satisfaction.business -= Math.round((politicalParticipation - 50) * 0.15);

  // Civic effects
  if (civics.includes("militarist")) { satisfaction.military += 20; satisfaction.intelligentsia -= 10; }
  if (civics.includes("pacifist")) { satisfaction.military -= 15; satisfaction.intelligentsia += 10; }
  if (civics.includes("merchant-republic")) { satisfaction.business += 15; satisfaction.labor -= 10; }
  if (civics.includes("green-economy")) { satisfaction.business -= 10; satisfaction.intelligentsia += 10; satisfaction.rural += 5; }
  if (civics.includes("traditionalist")) { satisfaction.religious += 15; satisfaction.rural += 10; satisfaction.intelligentsia -= 10; }
  if (civics.includes("progressive")) { satisfaction.intelligentsia += 15; satisfaction.religious -= 15; }
  if (civics.includes("meritocracy")) { satisfaction.intelligentsia += 10; satisfaction.rural -= 5; }
  if (civics.includes("populist")) { satisfaction.labor += 10; satisfaction.rural += 10; satisfaction.intelligentsia -= 10; }
  if (civics.includes("technocratic")) { satisfaction.intelligentsia += 10; satisfaction.business += 5; satisfaction.rural -= 10; }
  if (civics.includes("innovation-hub")) { satisfaction.business += 10; satisfaction.intelligentsia += 10; }
  if (civics.includes("neutral")) { satisfaction.military -= 10; satisfaction.intelligentsia += 5; }

  // Clamp 0-100
  for (const k of Object.keys(satisfaction)) {
    satisfaction[k] = Math.max(0, Math.min(100, satisfaction[k]));
  }
  return satisfaction;
}

// ────────────────────────────────────────────────
// COMPATIBILITY RULES
// ────────────────────────────────────────────────
export const COMPATIBILITY_RULES: CompatibilityRule[] = [
  // Synergies
  { selections: [["authority", "democratic"], ["checks", "strong-separation"]], type: "synergy", message: "Strong separation of powers reinforces democratic accountability by ensuring no single branch can dominate." },
  { selections: [["executive", "parliamentary"], ["checks", "constructive-noconfidence"]], type: "synergy", message: "Constructive no-confidence vote protects parliamentary stability by requiring a replacement government before removing an incumbent." },
  { selections: [["executive", "parliamentary"], ["checks", "fused-westminster"]], type: "synergy", message: "Parliamentary sovereignty with a legislature-drawn executive creates fast, decisive governance." },
  { selections: [["economic", "social-market"], ["federal", "federal"]], type: "synergy", message: "Federal structure allows regions to customize social market policies to local conditions." },
  { selections: [["electoral", "proportional-list"], ["legislative", "unicameral"]], type: "synergy", message: "Proportional representation in a single chamber ensures diverse minority voices are heard while streamlining lawmaking." },
  { selections: [["electoral", "mmp"], ["legislative", "bicameral-proportional"]], type: "synergy", message: "Mixed-member elections with two chambers provide both local constituency representation and proportional outcomes." },
  { selections: [["authority", "democratic"], ["electoral", "proportional-list"]], type: "synergy", message: "Proportional representation maximizes democratic inclusion — seat shares mirror vote shares across parties." },
  { selections: [["executive", "directorial"], ["federal", "federal"]], type: "synergy", message: "A collective executive with federalism enables consensus governance across diverse regions and interests." },
  { selections: [["checks", "independent-bodies"], ["judicial", "constitutional-court"]], type: "synergy", message: "Independent oversight bodies plus dedicated constitutional court create layered accountability." },
  { selections: [["economic", "welfare-state"], ["electoral", "proportional-list"]], type: "synergy", message: "Proportional representation builds the broad coalitions needed to sustain welfare state policies." },

  // Tensions
  { selections: [["authority", "autocratic"], ["checks", "strong-separation"]], type: "tension", message: "Autocratic authority fundamentally conflicts with strong separation of powers — one will erode the other." },
  { selections: [["authority", "democratic"], ["electoral", "fptp"]], type: "tension", message: "FPTP in a democracy can produce governments with minority support, limiting democratic legitimacy." },
  { selections: [["executive", "presidential"], ["checks", "fused-westminster"]], type: "tension", message: "Westminster fusion assumes the executive emerges from legislature — incompatible with a separate presidential election." },
  { selections: [["economic", "free-market"], ["economic", "welfare-state"]], type: "tension", message: "Free market and comprehensive welfare state pull in opposing directions on taxation and regulation." },
  { selections: [["authority", "theocratic"], ["judicial", "constitutional-court"]], type: "tension", message: "Constitutional court review may conflict with theocratic authority if religious law supersedes constitution." },
  { selections: [["authority", "single-party"], ["electoral", "proportional-list"]], type: "tension", message: "Proportional representation designed for multi-party competition conflicts with single-party control." },
  { selections: [["executive", "presidential"], ["legislative", "unicameral"]], type: "tension", message: "A powerful president facing a single chamber with no upper house check can create imbalanced power dynamics." },
  { selections: [["authority", "democratic"], ["checks", "judicial-supremacy"]], type: "tension", message: "Judicial supremacy can override democratic will — a 'counter-majoritarian difficulty' debated since the founding." },

  // Critical tensions
  { selections: [["authority", "autocratic"], ["electoral", "proportional-list"]], type: "critical", message: "Autocracy with proportional elections is fundamentally contradictory — elections would be performative." },
  { selections: [["authority", "theocratic"], ["checks", "fused-westminster"]], type: "critical", message: "Westminster parliamentary sovereignty is incompatible with theocratic divine authority." },
  { selections: [["authority", "single-party"], ["checks", "strong-separation"]], type: "critical", message: "Strong separation requires independent branches — impossible under single-party dominance." },
];

// ────────────────────────────────────────────────
// COUNTRY MATCHING
// ────────────────────────────────────────────────
export function getCountryMatches(
  selections: Record<string, string>,
  sliders: Record<string, number>,
): { country: Country; score: number; matchingDimensions: string[] }[] {
  const matchMap: Record<string, Partial<Record<string, string[]>>> = {
    authority: {
      democratic: ["AU", "CA", "DK", "FR", "DE", "GH", "GR", "IN", "IL", "IT", "JP", "NL", "SE", "ZA", "KR", "GB", "US", "CL", "BR", "AR", "PE", "MX"],
      autocratic: ["RU", "TR"],
      "single-party": ["CN", "SG"],
      oligarchic: ["RU", "SG"],
    },
    executive: {
      presidential: ["US", "BR", "KR", "AR", "CL", "GH", "KE", "MX", "NG", "PE", "PH", "TR"],
      parliamentary: ["DE", "GB", "IN", "AU", "CA", "DK", "GR", "HU", "IL", "IT", "JP", "NL", "SE", "SG", "ZA"],
      "semi-presidential": ["FR", "RU"],
      "constitutional-monarchy": ["DK", "JP", "SE", "NL", "AU", "CA", "GB"],
    },
    legislative: {
      "bicameral-proportional": ["DE", "NL", "ZA"],
      "bicameral-majoritarian": ["US", "GB", "IN", "CA", "AU"],
      unicameral: ["DK", "SE", "IL", "GH", "GR", "HU", "KR", "SG", "TR", "PE"],
      "bicameral-mixed": ["JP", "IT", "MX"],
    },
    electoral: {
      fptp: ["US", "GB", "IN", "CA", "GH", "KE", "NG"],
      "proportional-list": ["NL", "SE", "IL", "ZA", "DK", "GR", "TR", "AR"],
      mmp: ["DE", "NL"],
      "ranked-choice": ["AU"],
      "two-round": ["FR", "BR"],
    },
    judicial: {
      "constitutional-court": ["DE", "ZA", "KR", "IT", "HU", "TR", "RU"],
      "supreme-court": ["US", "IN", "CA", "AU", "GB", "JP", "SE", "DK", "NL", "GH", "KE", "NG", "MX", "PH", "SG"],
      "dual-court": ["FR", "PE", "IT"],
    },
    federal: {
      federal: ["US", "DE", "IN", "CA", "AU", "BR", "AR", "MX", "NG", "RU"],
      unitary: ["FR", "JP", "KR", "DK", "SE", "NL", "GH", "GR", "HU", "IL", "IT", "KE", "PE", "PH", "SG", "TR", "CL", "CN"],
      devolved: ["GB", "IT"],
    },
    economic: {
      "social-market": ["DE", "DK", "SE", "NL", "FR"],
      "free-market": ["US", "SG"],
      mixed: ["CA", "AU", "GB", "JP", "KR", "IT"],
      "state-led": ["CN", "SG", "RU"],
      "welfare-state": ["DK", "SE", "NL"],
    },
    checks: {
      "strong-separation": ["US"],
      "constructive-noconfidence": ["DE"],
      "fused-westminster": ["GB", "AU", "CA", "IN"],
      "independent-bodies": ["SG", "DK", "SE", "NL", "ZA"],
      "judicial-supremacy": ["US", "IN", "DE"],
    },
  };

  const scores: Record<string, { score: number; dims: string[] }> = {};

  for (const [category, selectedId] of Object.entries(selections)) {
    const matches = matchMap[category]?.[selectedId];
    if (!matches) continue;
    for (const code of matches) {
      if (!scores[code]) scores[code] = { score: 0, dims: [] };
      scores[code].score += 1;
      scores[code].dims.push(CATEGORY_LABELS[category] || category);
    }
  }

  // Bonus for voice & accountability alignment
  const pressFreedom = sliders.pressFreedom ?? 50;
  for (const c of COUNTRIES) {
    if (!scores[c.code]) scores[c.code] = { score: 0, dims: [] };
    const diff = Math.abs(pressFreedom - c.mediaScore);
    if (diff < 15) {
      scores[c.code].score += 0.5;
      scores[c.code].dims.push("Voice & Accountability");
    }
  }

  const totalCategories = Object.keys(selections).length || 1;

  return COUNTRIES
    .map((c) => ({
      country: c,
      score: Math.round(((scores[c.code]?.score || 0) / totalCategories) * 100),
      matchingDimensions: scores[c.code]?.dims || [],
    }))
    .filter((m) => m.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8);
}

// ────────────────────────────────────────────────
// GOVERNMENT ARCHETYPE GENERATOR
// ────────────────────────────────────────────────
export function getGovernmentArchetype(
  selections: Record<string, string>,
  civics: string[],
): { name: string; desc: string } {
  const auth = selections.authority;
  const exec = selections.executive;
  const econ = selections.economic;

  const parts: string[] = [];

  // Prefix from civics
  if (civics.includes("technocratic")) parts.push("Technocratic");
  else if (civics.includes("populist")) parts.push("Populist");
  else if (civics.includes("meritocracy")) parts.push("Meritocratic");
  else if (civics.includes("green-economy")) parts.push("Green");
  else if (civics.includes("merchant-republic")) parts.push("Mercantile");

  // Economic modifier
  if (econ === "social-market" || econ === "welfare-state") parts.push("Social");
  else if (econ === "free-market") parts.push("Liberal");
  else if (econ === "state-led") parts.push("Statist");

  // Government form
  if (auth === "democratic" && exec === "presidential") parts.push("Presidential Republic");
  else if (auth === "democratic" && exec === "parliamentary") parts.push("Parliamentary Democracy");
  else if (auth === "democratic" && exec === "semi-presidential") parts.push("Semi-Presidential Republic");
  else if (auth === "democratic" && exec === "constitutional-monarchy") parts.push("Constitutional Monarchy");
  else if (auth === "democratic" && exec === "directorial") parts.push("Directorial Republic");
  else if (auth === "autocratic") parts.push("Autocratic State");
  else if (auth === "theocratic") parts.push("Theocratic Republic");
  else if (auth === "single-party") parts.push("Single-Party State");
  else if (auth === "oligarchic") parts.push("Oligarchic Republic");
  else if (exec) {
    const execLabel = DESIGN_OPTIONS.executive.find((o) => o.id === exec)?.label || "";
    parts.push(execLabel + " Government");
  } else if (auth) {
    parts.push(DESIGN_OPTIONS.authority.find((o) => o.id === auth)?.label + " State");
  }

  // Suffix from civics
  if (civics.includes("pacifist")) parts.push("(Pacifist)");
  else if (civics.includes("militarist")) parts.push("(Militarist)");
  else if (civics.includes("neutral")) parts.push("(Neutral)");

  const name = parts.join(" ") || "Unnamed Government";

  const descParts: string[] = [];
  if (selections.federal === "federal") descParts.push("a federation");
  else if (selections.federal === "confederal") descParts.push("a confederation");
  else descParts.push("a unitary state");

  if (selections.electoral === "proportional-list") descParts.push("with proportional elections");
  else if (selections.electoral === "mmp") descParts.push("with mixed-member proportional voting");
  else if (selections.electoral === "fptp") descParts.push("with first-past-the-post voting");
  else if (selections.electoral === "ranked-choice") descParts.push("with ranked-choice voting");

  if (selections.checks === "strong-separation") descParts.push("and strict separation of powers");
  else if (selections.checks === "independent-bodies") descParts.push("and independent oversight bodies");

  const desc = descParts.length > 0
    ? "Structured as " + descParts.join(" ") + "."
    : "A custom government design.";

  return { name, desc };
}

// ────────────────────────────────────────────────
// SLIDER DEFINITIONS
// ────────────────────────────────────────────────
export const POLICY_SLIDERS = [
  {
    id: "pressFreedom",
    label: "Press Freedom",
    desc: "How free is the media to report without government interference?",
    low: "State-controlled media",
    high: "Fully independent press",
    icon: "Newspaper",
    color: "#38BDF8",
  },
  {
    id: "civilRights",
    label: "Civil Rights",
    desc: "Level of individual rights and freedoms guaranteed to citizens",
    low: "Restricted rights",
    high: "Expansive civil liberties",
    icon: "Scales",
    color: "#FB923C",
  },
  {
    id: "politicalParticipation",
    label: "Political Participation",
    desc: "How involved are citizens in governance beyond voting?",
    low: "Elite decision-making",
    high: "Direct democracy elements",
    icon: "UsersThree",
    color: "#4ADE80",
  },
];

export const CATEGORY_COLORS: Record<string, CategoryColor> = {
  authority: { bg: "#3B1764", accent: "#A855F7", light: "#F3E8FF", text: "#D8B4FE" },
  executive: { bg: "#2D1B69", accent: "#8B5CF6", light: "#EDE9FE", text: "#C4B5FD" },
  legislative: { bg: "#134E4A", accent: "#14B8A6", light: "#CCFBF1", text: "#5EEAD4" },
  electoral: { bg: "#164E63", accent: "#06B6D4", light: "#CFFAFE", text: "#67E8F9" },
  judicial: { bg: "#7C2D12", accent: "#F97316", light: "#FFF7ED", text: "#FDBA74" },
  federal: { bg: "#1E3A5F", accent: "#3B82F6", light: "#EFF6FF", text: "#93C5FD" },
  economic: { bg: "#14532D", accent: "#22C55E", light: "#F0FDF4", text: "#86EFAC" },
  checks: { bg: "#78350F", accent: "#F59E0B", light: "#FFFBEB", text: "#FCD34D" },
};

export const CATEGORY_LABELS: Record<string, string> = {
  authority: "Authority Type",
  executive: "Executive Branch",
  legislative: "Legislative Branch",
  electoral: "Electoral System",
  judicial: "Judicial Branch",
  federal: "Federal Structure",
  economic: "Economic Model",
  checks: "Checks & Balances",
};

// ────────────────────────────────────────────────
// EMERGENT PROPERTIES (combo-unlocked perks)
// ────────────────────────────────────────────────
interface EmergentProperty {
  id: string;
  label: string;
  icon: string;
  color: string;
  desc: string;
  conditions: (sel: Record<string, string>, civ: string[], sl: Record<string, number>) => boolean;
}

const EMERGENT_PROPERTIES: EmergentProperty[] = [
  // Institutional combos
  { id: "nordic-model", label: "The Nordic Model", icon: "Snowflake", color: "#67E8F9", desc: "High-trust welfare state with proportional representation, strong unions, and press freedom. The gold standard of 'cuddly capitalism.'", conditions: (s, _c, sl) => s.economic === "welfare-state" && s.electoral === "proportional-list" && s.legislative === "unicameral" && (sl.pressFreedom ?? 50) >= 70 },
  { id: "swiss-consensus", label: "Swiss Consensus Machine", icon: "Mountains", color: "#A78BFA", desc: "Directorial executive + federalism + direct democracy elements. Everyone gets a say, nothing moves fast, and it somehow works.", conditions: (s, _c, sl) => s.executive === "directorial" && s.federal === "federal" && (sl.politicalParticipation ?? 50) >= 75 },
  { id: "westminster-express", label: "Westminster Express", icon: "Train", color: "#F87171", desc: "Parliamentary sovereignty with fused powers. Bills fly through, PMs are powerful, and the opposition's job is to oppose.", conditions: (s) => s.executive === "parliamentary" && s.checks === "fused-westminster" && s.legislative === "bicameral-majoritarian" },
  { id: "american-experiment", label: "The American Experiment", icon: "Flag", color: "#60A5FA", desc: "Presidential system with strong separation, FPTP elections, and federal structure. A system designed by people who feared concentrated power.", conditions: (s) => s.authority === "democratic" && s.executive === "presidential" && s.checks === "strong-separation" && s.federal === "federal" && s.electoral === "fptp" },
  { id: "german-engineering", label: "German Engineering", icon: "GearSix", color: "#FBBF24", desc: "MMP elections, constructive no-confidence, constitutional court, federal structure. Precision-built after learning hard lessons from history.", conditions: (s) => s.electoral === "mmp" && s.checks === "constructive-noconfidence" && s.judicial === "constitutional-court" && s.federal === "federal" },
  { id: "iron-curtain", label: "The Vanguard State", icon: "Lock", color: "#EF4444", desc: "Single-party state with a state-led economy and heavily restricted civil freedoms. The governing party positions itself as the sole legitimate representative of the people.", conditions: (s, _c, sl) => s.authority === "single-party" && s.economic === "state-led" && (sl.pressFreedom ?? 50) < 30 },
  { id: "enlightened-autocracy", label: "Enlightened Autocracy", icon: "Sparkle", color: "#FFD700", desc: "Autocratic authority paired with technocratic governance and economic growth. The 'benevolent dictator' dream — works until the dictator stops being benevolent.", conditions: (s, c) => s.authority === "autocratic" && c.includes("technocratic") && (s.economic === "state-led" || s.economic === "mixed") },
  { id: "merchant-prince", label: "City of Merchant Princes", icon: "Storefront", color: "#FBBF24", desc: "Oligarchic authority with free markets and merchant republic traits. Money talks, and here it governs too.", conditions: (s, c) => s.authority === "oligarchic" && s.economic === "free-market" && c.includes("merchant-republic") },
  { id: "green-utopia", label: "Green Utopia", icon: "Leaf", color: "#4ADE80", desc: "Democratic authority with a green economy, welfare state, and high civil rights. A model of sustainable governance that prioritizes ecological balance alongside social welfare.", conditions: (s, c, sl) => s.authority === "democratic" && c.includes("green-economy") && (s.economic === "welfare-state" || s.economic === "social-market") && (sl.civilRights ?? 50) >= 70 },
  { id: "fortress-state", label: "Fortress State", icon: "CastleTurret", color: "#94A3B8", desc: "Militarist traditions with nationalist identity. A state defined by who it keeps out as much as who it lets in.", conditions: (_s, c) => c.includes("militarist") && c.includes("nationalist") },
  { id: "cosmopolitan-hub", label: "Cosmopolitan Hub", icon: "Globe", color: "#38BDF8", desc: "Pluralist society with innovation focus and open markets. A magnet for talent, ideas, and capital from around the world.", conditions: (s, c) => c.includes("pluralist") && c.includes("innovation-hub") && (s.economic === "free-market" || s.economic === "mixed") },
  { id: "peoples-republic", label: "People's Republic", icon: "Users", color: "#F87171", desc: "Democratic authority with populist leadership, high participation, and welfare spending. The masses rule, for better or worse.", conditions: (s, c, sl) => s.authority === "democratic" && c.includes("populist") && s.economic === "welfare-state" && (sl.politicalParticipation ?? 50) >= 70 },
  { id: "theocratic-council", label: "Council of the Faithful", icon: "Book", color: "#F59E0B", desc: "Theocratic authority with traditionalist values and religious law. The sacred and the political are one.", conditions: (s, c) => s.authority === "theocratic" && c.includes("traditionalist") },
  { id: "techno-meritocracy", label: "Silicon Republic", icon: "Desktop", color: "#2DD4BF", desc: "Democratic meritocracy focused on innovation and technology. Data-driven governance with performance metrics at the centre of policy.", conditions: (s, c) => s.authority === "democratic" && c.includes("meritocracy") && c.includes("innovation-hub") },
  { id: "peaceful-federation", label: "Peace Federation", icon: "Bird", color: "#67E8F9", desc: "Federal pacifist democracy with strong civil rights. Devoted to diplomacy, mediation, and the belief that war is never the answer.", conditions: (s, c, sl) => s.authority === "democratic" && s.federal === "federal" && c.includes("pacifist") && (sl.civilRights ?? 50) >= 70 },
  { id: "crowned-republic", label: "The Crowned Republic", icon: "Crown", color: "#FFD700", desc: "Constitutional monarchy with progressive values and proportional representation. Ancient crown, modern heart.", conditions: (s, c) => s.executive === "constitutional-monarchy" && c.includes("progressive") && s.electoral === "proportional-list" },
  { id: "decentralized-web", label: "The Decentralized Web", icon: "ShareNetwork", color: "#C084FC", desc: "Federal or confederal structure with strong decentralist values and high participation. Power flows from the bottom up.", conditions: (s, c, sl) => (s.federal === "federal" || s.federal === "confederal") && c.includes("decentralist") && (sl.politicalParticipation ?? 50) >= 60 },
  { id: "aristocratic-order", label: "The Old Order", icon: "Bank", color: "#94A3B8", desc: "Oligarchic authority with aristocratic traditions and a constitutional monarchy. Noblesse oblige as state philosophy.", conditions: (s, c) => s.authority === "oligarchic" && c.includes("aristocratic") && s.executive === "constitutional-monarchy" },
];

export function getEmergentProperties(
  selections: Record<string, string>,
  civics: string[],
  sliders: Record<string, number>,
): { id: string; label: string; icon: string; color: string; desc: string }[] {
  return EMERGENT_PROPERTIES.filter((ep) => ep.conditions(selections, civics, sliders));
}

// ────────────────────────────────────────────────
// GOVERNANCE SCORES (multi-axis fingerprint)
// ────────────────────────────────────────────────
export interface GovernanceScores {
  stability: number;     // resistance to crisis and regime change
  legitimacy: number;    // perceived right to rule
  efficiency: number;    // speed and quality of governance
  adaptability: number;  // ability to reform and respond
  representation: number;// how many voices are heard
  accountability: number;// checks on power abuse
}

export function getGovernanceScores(
  selections: Record<string, string>,
  civics: string[],
  sliders: Record<string, number>,
): GovernanceScores {
  const s: GovernanceScores = {
    stability: 50, legitimacy: 50, efficiency: 50,
    adaptability: 50, representation: 50, accountability: 50,
  };

  // Authority effects
  const auth = selections.authority;
  if (auth === "democratic") { s.legitimacy += 25; s.representation += 15; s.accountability += 10; s.efficiency -= 5; }
  if (auth === "autocratic") { s.efficiency += 20; s.stability += 10; s.legitimacy -= 20; s.accountability -= 25; s.representation -= 30; }
  if (auth === "oligarchic") { s.efficiency += 10; s.stability += 5; s.legitimacy -= 10; s.representation -= 20; s.accountability -= 15; }
  if (auth === "theocratic") { s.stability += 15; s.legitimacy += 5; s.adaptability -= 20; s.representation -= 15; }
  if (auth === "single-party") { s.efficiency += 15; s.stability += 5; s.legitimacy -= 15; s.representation -= 30; s.accountability -= 20; s.adaptability -= 10; }

  // Executive effects
  const exec = selections.executive;
  if (exec === "presidential") { s.stability += 10; s.efficiency -= 5; s.accountability += 5; }
  if (exec === "parliamentary") { s.adaptability += 15; s.efficiency += 10; s.representation += 5; }
  if (exec === "semi-presidential") { s.adaptability += 5; s.stability += 5; }
  if (exec === "constitutional-monarchy") { s.stability += 15; s.legitimacy += 10; }
  if (exec === "directorial") { s.representation += 15; s.efficiency -= 10; s.stability += 5; }

  // Legislative effects
  const leg = selections.legislative;
  if (leg === "bicameral-proportional") { s.representation += 15; s.efficiency -= 5; s.accountability += 5; }
  if (leg === "bicameral-majoritarian") { s.stability += 5; s.efficiency += 5; s.representation -= 5; }
  if (leg === "unicameral") { s.efficiency += 15; s.accountability -= 5; s.representation -= 5; }
  if (leg === "bicameral-mixed") { s.representation += 10; }

  // Electoral effects
  const elec = selections.electoral;
  if (elec === "fptp") { s.stability += 10; s.efficiency += 5; s.representation -= 15; }
  if (elec === "proportional-list") { s.representation += 20; s.adaptability += 5; s.stability -= 5; }
  if (elec === "mmp") { s.representation += 15; s.legitimacy += 5; }
  if (elec === "ranked-choice") { s.representation += 10; s.legitimacy += 10; }
  if (elec === "two-round") { s.legitimacy += 5; s.representation += 5; }

  // Judicial effects
  const jud = selections.judicial;
  if (jud === "constitutional-court") { s.accountability += 15; s.legitimacy += 5; }
  if (jud === "supreme-court") { s.accountability += 10; s.stability += 5; }
  if (jud === "dual-court") { s.accountability += 12; }
  if (jud === "civil-law") { s.efficiency += 5; s.adaptability += 5; }

  // Federal effects
  const fed = selections.federal;
  if (fed === "federal") { s.representation += 10; s.adaptability += 10; s.efficiency -= 10; }
  if (fed === "unitary") { s.efficiency += 10; s.representation -= 5; }
  if (fed === "devolved") { s.adaptability += 5; s.representation += 5; }
  if (fed === "confederal") { s.representation += 15; s.efficiency -= 15; s.stability -= 10; }

  // Economic effects
  const econ = selections.economic;
  if (econ === "social-market") { s.stability += 10; s.legitimacy += 5; }
  if (econ === "free-market") { s.efficiency += 10; s.adaptability += 10; s.stability -= 5; }
  if (econ === "mixed") { s.adaptability += 5; s.stability += 5; }
  if (econ === "state-led") { s.efficiency += 5; s.adaptability -= 10; }
  if (econ === "welfare-state") { s.legitimacy += 10; s.stability += 10; s.efficiency -= 5; }

  // Checks effects
  const chk = selections.checks;
  if (chk === "strong-separation") { s.accountability += 20; s.efficiency -= 10; }
  if (chk === "constructive-noconfidence") { s.stability += 15; s.accountability += 10; }
  if (chk === "fused-westminster") { s.efficiency += 15; s.accountability -= 5; }
  if (chk === "independent-bodies") { s.accountability += 15; s.legitimacy += 5; }
  if (chk === "judicial-supremacy") { s.accountability += 15; s.adaptability -= 5; }

  // Civic effects
  if (civics.includes("meritocracy")) { s.efficiency += 10; s.legitimacy += 5; }
  if (civics.includes("technocratic")) { s.efficiency += 15; s.adaptability += 5; s.representation -= 5; }
  if (civics.includes("populist")) { s.representation += 10; s.stability -= 10; s.efficiency -= 5; }
  if (civics.includes("decentralist")) { s.representation += 10; s.adaptability += 5; s.efficiency -= 5; }
  if (civics.includes("pluralist")) { s.representation += 10; s.adaptability += 5; }
  if (civics.includes("nationalist")) { s.stability += 10; s.representation -= 10; }
  if (civics.includes("progressive")) { s.adaptability += 15; s.stability -= 5; }
  if (civics.includes("traditionalist")) { s.stability += 15; s.adaptability -= 15; }
  if (civics.includes("merchant-republic")) { s.efficiency += 5; s.adaptability += 5; }
  if (civics.includes("green-economy")) { s.adaptability += 5; s.legitimacy += 5; }
  if (civics.includes("innovation-hub")) { s.adaptability += 10; s.efficiency += 5; }
  if (civics.includes("pacifist")) { s.legitimacy += 5; s.stability -= 5; }
  if (civics.includes("militarist")) { s.stability += 10; s.legitimacy -= 5; }
  if (civics.includes("neutral")) { s.legitimacy += 5; s.stability += 5; }
  if (civics.includes("aristocratic")) { s.stability += 10; s.representation -= 10; }

  // Slider effects
  const pf = sliders.pressFreedom ?? 50;
  const cr = sliders.civilRights ?? 50;
  const pp = sliders.politicalParticipation ?? 50;
  s.accountability += Math.round((pf - 50) * 0.2);
  s.legitimacy += Math.round((cr - 50) * 0.15);
  s.representation += Math.round((pp - 50) * 0.2);
  s.adaptability += Math.round((pp - 50) * 0.1);

  // Clamp 0-100
  for (const k of Object.keys(s) as (keyof GovernanceScores)[]) {
    s[k] = Math.max(0, Math.min(100, s[k]));
  }
  return s;
}

// ────────────────────────────────────────────────
// GENERATED MOTTOS
// ────────────────────────────────────────────────
const MOTTO_POOL: { conditions: (s: Record<string, string>, c: string[], sl: Record<string, number>) => boolean; mottos: string[] }[] = [
  // Democratic + high freedom
  { conditions: (s, _c, sl) => s.authority === "democratic" && (sl.civilRights ?? 50) >= 70, mottos: ["Liberty and justice, for all.", "The voice of the people is the voice of the nation.", "In freedom, we find strength.", "Where the people lead, the state follows."] },
  // Democratic + social economy
  { conditions: (s) => s.authority === "democratic" && (s.economic === "welfare-state" || s.economic === "social-market"), mottos: ["Prosperity shared is prosperity doubled.", "No one left behind.", "Freedom from want, freedom from fear.", "The measure of a nation is how it treats its least."] },
  // Autocratic
  { conditions: (s) => s.authority === "autocratic", mottos: ["Order above all.", "One will, one nation.", "Strength through discipline.", "Stability is the first freedom."] },
  // Theocratic
  { conditions: (s) => s.authority === "theocratic", mottos: ["Under divine guidance, we prosper.", "Faith is the foundation of law.", "By the will of the heavens.", "In sacred trust, we govern."] },
  // Single-party
  { conditions: (s) => s.authority === "single-party", mottos: ["United under one banner.", "The party and the people are one.", "Serve the collective, serve the future.", "Forward, together, always."] },
  // Oligarchic
  { conditions: (s) => s.authority === "oligarchic", mottos: ["Guided by the wise.", "Excellence in governance.", "The capable shall lead.", "Prosperity through stewardship."] },
  // Federal
  { conditions: (s) => s.federal === "federal" || s.federal === "confederal", mottos: ["United in diversity.", "Many states, one purpose.", "E pluribus unum.", "Strength in our differences."] },
  // Green civic
  { conditions: (_s, c) => c.includes("green-economy"), mottos: ["For this generation and the next.", "Harmony with nature, progress for all.", "Growth without destruction.", "The earth is our constitution."] },
  // Militarist
  { conditions: (_s, c) => c.includes("militarist"), mottos: ["Through strength, peace.", "Eternal vigilance.", "Defend, protect, prevail.", "Our shield is our resolve."] },
  // Pacifist
  { conditions: (_s, c) => c.includes("pacifist"), mottos: ["Peace is our greatest victory.", "Diplomacy before all else.", "The pen is mightier.", "Cooperation above conflict."] },
  // Meritocratic/technocratic
  { conditions: (_s, c) => c.includes("meritocracy") || c.includes("technocratic"), mottos: ["Knowledge is governance.", "Let reason prevail.", "Merit opens every door.", "Guided by evidence, driven by purpose."] },
  // Progressive
  { conditions: (_s, c) => c.includes("progressive"), mottos: ["The future belongs to the bold.", "Reform is the truest patriotism.", "Ever forward, never back.", "Progress is our tradition."] },
  // Traditionalist
  { conditions: (_s, c) => c.includes("traditionalist"), mottos: ["Honor the roots, grow the tree.", "Wisdom of ages, strength of today.", "What endures, matters.", "Built on the shoulders of our ancestors."] },
  // Pluralist
  { conditions: (_s, c) => c.includes("pluralist"), mottos: ["Many cultures, one nation.", "Diversity is our superpower.", "Every voice, every story.", "In our differences, our strength."] },
  // Nationalist
  { conditions: (_s, c) => c.includes("nationalist"), mottos: ["Our land, our destiny.", "One people, one purpose.", "Sovereignty above all.", "The nation endures."] },
  // Neutral
  { conditions: (_s, c) => c.includes("neutral"), mottos: ["A friend to all, an enemy to none.", "Neutrality with purpose.", "The honest broker.", "In peace, we trust."] },
  // Innovation
  { conditions: (_s, c) => c.includes("innovation-hub"), mottos: ["Innovate. Iterate. Inspire.", "The future is what we build.", "Ideas without borders.", "Where invention meets governance."] },
  // Fallback
  { conditions: () => true, mottos: ["For the common good.", "A more perfect union.", "Justice, order, progress.", "Governing with purpose."] },
];

export function getGeneratedMotto(
  selections: Record<string, string>,
  civics: string[],
  sliders: Record<string, number>,
): string {
  // Create a deterministic hash from selections to pick a consistent motto
  const seed = Object.entries(selections).sort().map(([k, v]) => `${k}:${v}`).join("|")
    + "||" + civics.sort().join(",")
    + "||" + Object.entries(sliders).sort().map(([k, v]) => `${k}:${Math.round(v / 10)}`).join(",");
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash + seed.charCodeAt(i)) | 0;
  }
  hash = Math.abs(hash);

  // Find matching motto pools
  const matching = MOTTO_POOL.filter((m) => m.conditions(selections, civics, sliders));
  if (matching.length === 0) return "For the common good.";

  // Pick pool based on hash, then motto within pool
  const pool = matching[hash % matching.length];
  return pool.mottos[hash % pool.mottos.length];
}

// ────────────────────────────────────────────────
// DYNAMIC BANNER GRADIENT (visual identity)
// ────────────────────────────────────────────────
export function getBannerGradient(
  selections: Record<string, string>,
  civics: string[],
): { from: string; to: string } {
  const auth = selections.authority;
  const econ = selections.economic;

  // Base gradient from authority type
  let from = "rgba(139,92,246,0.2)";  // purple default
  let to = "rgba(20,184,166,0.12)";    // teal default

  if (auth === "democratic") { from = "rgba(59,130,246,0.2)"; to = "rgba(34,197,94,0.12)"; }       // blue → green
  if (auth === "autocratic") { from = "rgba(239,68,68,0.2)"; to = "rgba(168,85,247,0.12)"; }       // red → purple
  if (auth === "theocratic") { from = "rgba(245,158,11,0.2)"; to = "rgba(217,119,6,0.12)"; }       // amber → amber
  if (auth === "oligarchic") { from = "rgba(168,85,247,0.2)"; to = "rgba(245,158,11,0.12)"; }      // purple → amber
  if (auth === "single-party") { from = "rgba(239,68,68,0.2)"; to = "rgba(245,158,11,0.12)"; }     // red → amber

  // Modify 'to' based on economy
  if (econ === "welfare-state") to = "rgba(34,197,94,0.15)";       // green
  if (econ === "free-market") to = "rgba(6,182,212,0.12)";          // cyan
  if (econ === "state-led") to = "rgba(239,68,68,0.1)";             // red

  // Civic override for strong identities
  if (civics.includes("green-economy")) { from = "rgba(34,197,94,0.2)"; to = "rgba(20,184,166,0.15)"; }
  if (civics.includes("militarist")) { from = "rgba(127,29,29,0.25)"; to = "rgba(239,68,68,0.12)"; }
  if (civics.includes("pacifist")) { from = "rgba(59,130,246,0.15)"; to = "rgba(255,255,255,0.08)"; }

  return { from, to };
}

// ────────────────────────────────────────────────
// STABILITY & RISK ASSESSMENT
// ────────────────────────────────────────────────
export interface RiskAssessment {
  label: string;
  icon: string;
  level: "low" | "moderate" | "high" | "critical";
  desc: string;
}

export function getRiskAssessment(
  selections: Record<string, string>,
  civics: string[],
  sliders: Record<string, number>,
): RiskAssessment[] {
  const risks: RiskAssessment[] = [];

  // Democratic backsliding risk
  if (selections.authority === "democratic") {
    let backslideRisk = 0;
    if (selections.electoral === "fptp") backslideRisk += 1;
    if (selections.checks === "fused-westminster") backslideRisk += 1;
    if (civics.includes("populist")) backslideRisk += 2;
    if ((sliders.pressFreedom ?? 50) < 40) backslideRisk += 2;
    if (selections.judicial !== "constitutional-court") backslideRisk += 1;
    if (backslideRisk >= 4) risks.push({ label: "Democratic Backsliding", icon: "Warning", level: "high", desc: "Weak institutional checks combined with populist tendencies create vulnerability to democratic erosion." });
    else if (backslideRisk >= 2) risks.push({ label: "Democratic Backsliding", icon: "Warning", level: "moderate", desc: "Some institutional gaps could be exploited to concentrate power." });
  }

  // Gridlock risk
  if (selections.executive === "presidential" && selections.checks === "strong-separation") {
    risks.push({ label: "Legislative Gridlock", icon: "Timer", level: "moderate", desc: "Strong separation with presidential system risks deadlock when executive and legislature disagree." });
  }

  // Legitimacy crisis
  if (selections.authority !== "democratic" && (sliders.civilRights ?? 50) < 30 && (sliders.pressFreedom ?? 50) < 30) {
    risks.push({ label: "Legitimacy Crisis", icon: "WarningCircle", level: "high", desc: "Low civil rights and press freedom without democratic mandate may fuel unrest." });
  }

  // Coalition instability
  if (selections.electoral === "proportional-list" && selections.executive === "parliamentary") {
    risks.push({ label: "Coalition Fragility", icon: "Warning", level: "moderate", desc: "Proportional representation creates multi-party parliaments where coalition governments can be unstable." });
  }

  // Over-centralization
  if (selections.federal === "unitary" && selections.authority !== "democratic" && !civics.includes("decentralist")) {
    risks.push({ label: "Over-Centralization", icon: "XCircle", level: "high", desc: "Unitary non-democratic state concentrates power dangerously without regional counterweights." });
  }

  // Reform stagnation
  if (civics.includes("traditionalist") && selections.checks === "strong-separation") {
    risks.push({ label: "Reform Stagnation", icon: "Timer", level: "moderate", desc: "Traditionalist values combined with veto-heavy institutions may block needed reforms." });
  }

  // Military overreach
  if (civics.includes("militarist") && selections.authority !== "democratic") {
    risks.push({ label: "Military Overreach", icon: "XCircle", level: "high", desc: "Militarist tradition in a non-democratic state raises risk of military influence over civilian governance." });
  }

  // Economic volatility
  if (selections.economic === "free-market" && (sliders.civilRights ?? 50) < 40) {
    risks.push({ label: "Economic Inequality", icon: "Warning", level: "moderate", desc: "Free market without strong civil rights protections may entrench economic stratification." });
  }

  // Theocratic tension with modernity
  if (selections.authority === "theocratic" && civics.includes("progressive")) {
    risks.push({ label: "Sacred-Secular Tension", icon: "XCircle", level: "critical", desc: "Theocratic authority and progressive values are fundamentally incompatible — expect severe internal conflict." });
  }

  // Confederal fragmentation
  if (selections.federal === "confederal") {
    risks.push({ label: "Fragmentation Risk", icon: "Warning", level: "moderate", desc: "Confederal structure risks member states drifting apart without strong binding institutions." });
  }

  return risks;
}

// ────────────────────────────────────────────────
// HISTORICAL PRECEDENT GENERATOR
// ────────────────────────────────────────────────
export function getHistoricalPrecedent(
  selections: Record<string, string>,
  civics: string[],
): string {
  const auth = selections.authority;
  const exec = selections.executive;
  const econ = selections.economic;
  const fed = selections.federal;

  if (auth === "democratic" && exec === "parliamentary" && (econ === "welfare-state" || econ === "social-market") && fed !== "federal") {
    return "This configuration mirrors the Scandinavian model that emerged in the mid-20th century — parliamentary democracies that built comprehensive welfare states through broad social consensus. Small, homogeneous societies that punched above their weight in quality of life.";
  }
  if (auth === "democratic" && exec === "presidential" && fed === "federal") {
    return "This echoes presidential federalism adopted across the Americas and beyond after independence movements of the 18th and 19th centuries. Designed to distribute power and prevent its concentration, these systems often face tension between executive ambition and legislative independence.";
  }
  if (auth === "democratic" && exec === "parliamentary" && exec === "parliamentary" && selections.checks === "fused-westminster") {
    return "The Westminster tradition, adopted across many nations over the 19th and 20th centuries — including former British territories that subsequently reaffirmed it through their own democratic processes. A system where the prime minister's power derives from commanding a parliamentary majority, requiring strong parliamentary conventions to check executive authority.";
  }
  if (auth === "democratic" && exec === "semi-presidential") {
    return "Semi-presidentialism, pioneered by the French Fifth Republic in 1958 to solve chronic parliamentary instability. Two-headed executives can provide flexibility — or create 'cohabitation' standoffs when president and PM come from opposing parties.";
  }
  if (auth === "autocratic" && civics.includes("technocratic")) {
    return "The developmental autocracy model — seen in post-war South Korea, Singapore's early years, and contemporary China. Prioritizing economic development and state capacity over political liberalization. History shows these systems can deliver rapid modernization, but succession challenges and resistance to reform remain recurring patterns.";
  }
  if (auth === "theocratic") {
    return "Theocratic governance has deep historical roots across multiple faith traditions — from medieval Christendom to the Papal States to Tibet's historical clerical governance to modern Iran's Islamic Republic. Where divine law supersedes human legislation, legitimacy is claimed through sacred authority, and reform faces institutional resistance when framed as challenging that authority.";
  }
  if (auth === "single-party") {
    return "Single-party states — from the Soviet model to China's 'socialism with Chinese characteristics' to Cuba's revolutionary state. The party as vanguard, claiming to represent the people while controlling all levers of power. Some deliver economic growth; all typically constrain political pluralism and independent political activity.";
  }
  if (auth === "oligarchic" && civics.includes("merchant-republic")) {
    return "Echoes of Venice's Most Serene Republic — where merchant families governed through councils, and commercial success was the path to political power. Singapore today shares DNA with this model: elite governance justified by exceptional economic performance.";
  }
  if (exec === "directorial") {
    return "The Swiss Federal Council model, born in 1848 — where executive power is shared among seven equals, each representing different parties and regions. Radical consensus politics that produces stability through inclusion, not exclusion.";
  }
  if (exec === "constitutional-monarchy" && civics.includes("progressive")) {
    return "Constitutional monarchies that evolved into highly egalitarian societies — the crown providing historical continuity and national identity while democratic institutions deliver legitimacy and reform capacity. Combining the symbolic stability of monarchy with the responsiveness of democracy.";
  }
  if (econ === "welfare-state" && selections.electoral === "proportional-list") {
    return "The proportional welfare state — characteristic of Northern and Western Europe from the 1960s onward. Broad coalition governments built universal services that enjoy cross-party support. These systems are expensive but produce high social cohesion and trust.";
  }
  if (fed === "confederal") {
    return "Confederations are historically fragile — the Swiss Confederation before 1848, the Articles of Confederation in early America, and arguably the EU today. States jealously guard sovereignty, and the center must negotiate rather than command.";
  }

  // Default
  return "This combination draws from multiple historical traditions, creating a novel institutional arrangement. While no single country has implemented this exact configuration, its individual components each have proven track records in different contexts around the world.";
}
