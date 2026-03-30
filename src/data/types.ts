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
  // Extended fields for design matching
  authorityType?: string;
  electoralSystem?: string;
}

export interface DesignOption {
  id: string;
  label: string;
  desc: string;
  examples: string;
  icon?: string;
  color?: string;
}

export interface CivicTrait {
  id: string;
  label: string;
  desc: string;
  category: 'governance' | 'social' | 'economic' | 'military';
  icon: string;
  color?: string;
  effects: string[];
  incompatible?: string[];
}

export interface InterestGroup {
  id: string;
  label: string;
  icon: string;
  color?: string;
  desc: string;
}

export interface DesignPhase {
  id: string;
  label: string;
  desc: string;
  icon: string;
  categories: string[];
}

export interface CompatibilityRule {
  selections: [string, string][];
  type: 'synergy' | 'tension' | 'critical';
  message: string;
}

export interface CountryMatchScore {
  country: Country;
  score: number;
  matchingDimensions: string[];
}

export interface CategoryColor {
  bg: string;
  accent: string;
  light: string;
  text: string;
}
