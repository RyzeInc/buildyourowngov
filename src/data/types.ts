export interface Country {
  name: string;
  code: string;
  region: string;
  govType: string;
  executive: string;
  legislative: string;
  legislativeType: string;
  judicial: string;
  economic: string;
  media: string;
  mediaScore: number;
  rsfRank: number;
  federal: string;
  checks: string;
  population: string;
  continent: string;
}

export interface DesignOption {
  id: string;
  label: string;
  desc: string;
  examples: string;
}

export interface CategoryColor {
  bg: string;
  accent: string;
  light: string;
  text: string;
}
