"use client";

import { type ThemeConfig, type BorderRadiusStyle, type ButtonStyle, type CardStyle, type SpacingDensity } from "@/types/site-config";
import { FONT_PAIRINGS } from "@/lib/themes/fonts";

const RADIUS_MAP: Record<BorderRadiusStyle, { sm: string; md: string; lg: string; xl: string }> = {
  sharp:   { sm: "4px",  md: "6px",  lg: "8px",  xl: "12px" },
  soft:    { sm: "6px",  md: "12px", lg: "16px", xl: "24px" },
  rounded: { sm: "12px", md: "16px", lg: "24px", xl: "32px" },
};

const SPACING_MAP: Record<SpacingDensity, { section: string; sectionSm: string }> = {
  compact:  { section: "4rem",  sectionSm: "3rem" },
  normal:   { section: "5rem",  sectionSm: "3.5rem" },
  spacious: { section: "8rem",  sectionSm: "5rem" },
};

// Button border-radius overrides based on style
const BUTTON_RADIUS: Record<ButtonStyle, string> = {
  solid:   "var(--t-radius-md)",
  outline: "var(--t-radius-md)",
  pill:    "9999px",
};

// Card border/shadow based on card style
const CARD_BORDER: Record<CardStyle, string> = {
  flat:     "none",
  bordered: "1px solid var(--t-border)",
  elevated: "none",
};

const CARD_SHADOW: Record<CardStyle, string> = {
  flat:     "none",
  bordered: "none",
  elevated: "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)",
};

interface ThemeProviderProps {
  theme: ThemeConfig;
  children: React.ReactNode;
}

export default function ThemeProvider({ theme, children }: ThemeProviderProps) {
  const fontPair = FONT_PAIRINGS[theme.fontPairing];
  const radius = RADIUS_MAP[theme.borderRadius];
  const spacing = SPACING_MAP[theme.spacing];

  const cssVars: Record<string, string> = {
    // Colors
    "--t-bg-primary": theme.colors.bgPrimary,
    "--t-bg-secondary": theme.colors.bgSecondary,
    "--t-bg-tertiary": theme.colors.bgTertiary,
    "--t-bg-card": theme.colors.bgCard,
    "--t-primary": theme.colors.primary,
    "--t-primary-light": theme.colors.primaryLight,
    "--t-primary-dark": theme.colors.primaryDark,
    "--t-text-primary": theme.colors.textPrimary,
    "--t-text-secondary": theme.colors.textSecondary,
    "--t-text-muted": theme.colors.textMuted,
    "--t-text-inverse": theme.colors.textInverse,
    "--t-border": theme.colors.border,
    "--t-border-hover": theme.colors.borderHover,
    "--t-success": theme.colors.success,

    // Fonts
    "--t-font-heading": `'${fontPair.heading}', ${fontPair.headingFallback}`,
    "--t-font-body": `'${fontPair.body}', ${fontPair.bodyFallback}`,

    // Border Radius
    "--t-radius-sm": radius.sm,
    "--t-radius-md": radius.md,
    "--t-radius-lg": radius.lg,
    "--t-radius-xl": radius.xl,
    "--t-radius-full": "9999px",

    // Spacing
    "--t-section-padding": spacing.section,
    "--t-section-padding-sm": spacing.sectionSm,

    // Shadows (adapt opacity for dark vs light)
    "--t-shadow-sm": theme.mode === "dark"
      ? "0 1px 3px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.3)"
      : "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)",
    "--t-shadow-md": theme.mode === "dark"
      ? "0 4px 6px -1px rgba(0,0,0,0.4), 0 2px 4px -1px rgba(0,0,0,0.3)"
      : "0 4px 6px -1px rgba(0,0,0,0.08), 0 2px 4px -1px rgba(0,0,0,0.04)",
    "--t-shadow-lg": theme.mode === "dark"
      ? "0 10px 15px -3px rgba(0,0,0,0.4), 0 4px 6px -2px rgba(0,0,0,0.3)"
      : "0 10px 15px -3px rgba(0,0,0,0.08), 0 4px 6px -2px rgba(0,0,0,0.04)",
    "--t-shadow-accent": `0 4px 20px ${theme.colors.primary}26`,
    "--t-shadow-accent-tint": `0 4px 20px ${theme.colors.primary}26`,
    "--t-shadow-xl": theme.mode === "dark"
      ? "0 20px 25px -5px rgba(0,0,0,0.5), 0 10px 10px -5px rgba(0,0,0,0.3)"
      : "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.05)",

    // Primary alpha variants
    "--t-primary-alpha-8": `${theme.colors.primary}14`,
    "--t-primary-alpha-15": `${theme.colors.primary}26`,
    "--t-primary-alpha-20": `${theme.colors.primary}33`,

    // Button
    "--t-btn-radius": BUTTON_RADIUS[theme.buttonStyle],
    "--t-btn-border": theme.buttonStyle === "outline" ? `1px solid var(--t-border-hover)` : "none",

    // Card
    "--t-card-border": CARD_BORDER[theme.cardStyle],
    "--t-card-shadow": CARD_SHADOW[theme.cardStyle],
    "--t-card-bg": theme.cardStyle === "flat" ? theme.colors.bgSecondary : theme.colors.bgCard,

    // Container
    "--t-container-max": "1200px",
    "--t-container-padding": "1.5rem",

    // Transitions
    "--t-transition-fast": "0.15s ease",
    "--t-transition-normal": "0.2s ease",
    "--t-transition-slow": "0.3s ease",
  };

  return (
    <div
      className="template-root"
      style={cssVars as React.CSSProperties}
    >
      {children}
    </div>
  );
}
