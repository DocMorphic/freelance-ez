"use client";

import { X } from "lucide-react";
import { useSiteStore } from "@/store/site-store";
import { THEME_PRESETS } from "@/lib/themes/presets";
import { FONT_PAIRINGS } from "@/lib/themes/fonts";
import type { ThemePreset, FontPairing, BorderRadiusStyle, ButtonStyle, CardStyle } from "@/types/site-config";
import styles from "./ThemePanel.module.css";

const presetList = Object.values(THEME_PRESETS);
const fontList = Object.values(FONT_PAIRINGS);

export default function ThemePanel() {
  const open = useSiteStore((s) => s.themePanelOpen);
  const setOpen = useSiteStore((s) => s.setThemePanelOpen);
  const theme = useSiteStore((s) => s.config?.theme);
  const updateTheme = useSiteStore((s) => s.updateTheme);

  if (!theme) return null;

  const selectPreset = (preset: ThemePreset) => {
    const def = THEME_PRESETS[preset];
    updateTheme({
      preset,
      mode: def.mode,
      colors: def.colors,
    });
  };

  return (
    <div className={`${styles.overlay} ${open ? styles.open : ""}`}>
      <div className={styles.header}>
        <h3>Theme</h3>
        <button className={styles.closeBtn} onClick={() => setOpen(false)}>
          <X size={16} />
        </button>
      </div>

      <div className={styles.body}>
        {/* Theme Presets */}
        <div className={styles.section}>
          <div className={styles.sectionTitle}>Color Preset</div>
          <div className={styles.presetGrid}>
            {presetList.map((p) => (
              <button
                key={p.name}
                className={`${styles.presetCard} ${theme.preset === p.name ? styles.presetActive : ""}`}
                onClick={() => selectPreset(p.name)}
                title={p.description}
              >
                <div className={styles.presetSwatch}>
                  <div
                    className={styles.presetSwatchHalf}
                    style={{ background: p.colors.bgPrimary }}
                  />
                  <div
                    className={styles.presetSwatchHalf}
                    style={{ background: p.colors.primary }}
                  />
                </div>
                <span className={styles.presetLabel}>{p.label.replace("Dark ", "").replace("Light ", "")}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Font Pairings */}
        <div className={styles.section}>
          <div className={styles.sectionTitle}>Fonts</div>
          <div className={styles.fontList}>
            {fontList.map((f) => (
              <button
                key={f.id}
                className={`${styles.fontItem} ${theme.fontPairing === f.id ? styles.fontItemActive : ""}`}
                onClick={() => updateTheme({ fontPairing: f.id as FontPairing })}
              >
                <div className={styles.fontItemName}>{f.label}</div>
                <div className={styles.fontItemDesc}>{f.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Border Radius */}
        <div className={styles.section}>
          <div className={styles.sectionTitle}>Corners</div>
          <div className={styles.toggleGroup}>
            {(["sharp", "soft", "rounded"] as BorderRadiusStyle[]).map((r) => (
              <button
                key={r}
                className={`${styles.toggleBtn} ${theme.borderRadius === r ? styles.toggleActive : ""}`}
                onClick={() => updateTheme({ borderRadius: r })}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Button Style */}
        <div className={styles.section}>
          <div className={styles.sectionTitle}>Buttons</div>
          <div className={styles.toggleGroup}>
            {(["solid", "outline", "pill"] as ButtonStyle[]).map((b) => (
              <button
                key={b}
                className={`${styles.toggleBtn} ${theme.buttonStyle === b ? styles.toggleActive : ""}`}
                onClick={() => updateTheme({ buttonStyle: b })}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        {/* Card Style */}
        <div className={styles.section}>
          <div className={styles.sectionTitle}>Cards</div>
          <div className={styles.toggleGroup}>
            {(["flat", "bordered", "elevated"] as CardStyle[]).map((c) => (
              <button
                key={c}
                className={`${styles.toggleBtn} ${theme.cardStyle === c ? styles.toggleActive : ""}`}
                onClick={() => updateTheme({ cardStyle: c })}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
