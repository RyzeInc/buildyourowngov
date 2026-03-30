"use client";

/**
 * AppIcon — maps string icon names (stored in data files) to React icon components.
 *
 * Phosphor Icons (@phosphor-icons/react) — thematic / content icons used in
 *   option cards, civic traits, indices, emergent properties, etc.
 * Lucide React (lucide-react) — UI / functional icons used in section headers,
 *   button labels, and indicators.
 *
 * Only the icons actually in use are imported, so tree-shaking works correctly.
 */

// ── Phosphor ──────────────────────────────────────────────────────────────────
import {
  // Authority
  Crown,
  SealCheck,       // democratic
  Users,
  Star,
  Book,
  // Executive
  Bank,
  Buildings,
  Scales,
  CastleTurret,    // constitutional-monarchy, aristocratic
  Handshake,
  // Legislative / Electoral
  ChartBar,
  Trophy,
  Scroll,
  Shuffle,
  Medal,
  ArrowsCounterClockwise,
  ListNumbers,
  Repeat,
  // Judicial
  BookBookmark,
  Files,
  // Federal
  MapTrifold,      // federal
  Building,
  Globe,
  // Economic
  TrendUp,
  FirstAid,
  HardHat,
  Shield,
  // Checks
  Link,
  MagnifyingGlass,
  Lock,
  // Phases
  GearSix,
  Palette,
  // Civic traits
  GraduationCap,
  Flask,
  Megaphone,
  SquaresFour,
  Flag,
  Plant,
  Diamond,
  Storefront,
  Recycle,
  Lightbulb,
  Bird,            // pacifist / dove substitute
  Sword,
  Wrench,
  Church,
  Grains,          // rural / agricultural
  // Interest groups / sliders
  Newspaper,
  UsersThree,
  // Emergent properties
  Snowflake,
  Mountains,
  Train,
  Sparkle,
  Leaf,
  Desktop,
  ShareNetwork,
  // Indices
  Dna,             // HDI
  Books,
  Smiley,
  Coins,
  // Risk icons
  Warning,
  XCircle,
  WarningCircle,
  Timer,
} from "@phosphor-icons/react";

// ── Lucide ────────────────────────────────────────────────────────────────────
import {
  HelpCircle,
  AlertTriangle,
  History,
  Info,
} from "lucide-react";

// ── Registry ──────────────────────────────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PHOSPHOR_ICONS: Record<string, React.ComponentType<any>> = {
  // Authority options
  Crown,
  SealCheck,
  Users,
  Star,
  Book,
  // Executive options
  Bank,
  Buildings,
  Scales,
  CastleTurret,
  Handshake,
  // Legislative / Electoral
  ChartBar,
  Trophy,
  Scroll,
  Shuffle,
  Medal,
  ArrowsCounterClockwise,
  ListNumbers,
  Repeat,
  // Judicial
  BookBookmark,
  Files,
  // Federal
  MapTrifold,
  Building,
  Globe,
  // Economic
  TrendUp,
  FirstAid,
  HardHat,
  Shield,
  // Checks
  Link,
  MagnifyingGlass,
  Lock,
  // Design phases
  GearSix,
  Palette,
  // Civic traits
  GraduationCap,
  Flask,
  Megaphone,
  SquaresFour,
  Flag,
  Plant,
  Diamond,
  Storefront,
  Recycle,
  Lightbulb,
  Bird,
  Sword,
  Wrench,
  Church,
  Grains,
  // Interest groups & sliders
  Newspaper,
  UsersThree,
  // Emergent properties
  Snowflake,
  Mountains,
  Train,
  Sparkle,
  Leaf,
  Desktop,
  ShareNetwork,
  // Indices
  Dna,
  Books,
  Smiley,
  Coins,
  // Risk assessment
  Warning,
  XCircle,
  WarningCircle,
  Timer,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LUCIDE_ICONS: Record<string, React.ComponentType<any>> = {
  HelpCircle,
  AlertTriangle,
  History,
  Info,
};

// ── Component ─────────────────────────────────────────────────────────────────
interface AppIconProps {
  name: string | undefined;
  size?: number;
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone";
  color?: string;
  style?: React.CSSProperties;
}

export default function AppIcon({
  name,
  size = 16,
  weight = "regular",
  color,
  style,
}: AppIconProps) {
  if (!name) return null;
  const PhosphorIcon = PHOSPHOR_ICONS[name];
  if (PhosphorIcon) {
    return <PhosphorIcon size={size} weight={weight} color={color} style={style} />;
  }

  const LucideIcon = LUCIDE_ICONS[name];
  if (LucideIcon) {
    return <LucideIcon size={size} color={color} style={style} />;
  }

  return null;
}
