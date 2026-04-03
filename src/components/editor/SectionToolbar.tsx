"use client";

import { ChevronUp, ChevronDown, Copy, Trash2 } from "lucide-react";
import { useSiteStore } from "@/store/site-store";
import styles from "./SectionToolbar.module.css";

const MAX_VARIANTS: Record<string, number> = {
  hero: 2, stats: 1, services: 2, products: 1, testimonials: 1,
  faq: 1, cta: 1, content: 2, contact: 1, processSteps: 1,
  featureGrid: 1, trustStrip: 0, team: 1, caseStudies: 0,
  pricingTable: 1, gallery: 0, blogList: 1,
};

interface SectionToolbarProps {
  sectionId: string;
  sectionType: string;
  variant: number;
}

export default function SectionToolbar({ sectionId, sectionType, variant }: SectionToolbarProps) {
  const pageSlug = useSiteStore((s) => s.currentPageSlug);
  const moveSection = useSiteStore((s) => s.moveSection);
  const removeSection = useSiteStore((s) => s.removeSection);
  const duplicateSection = useSiteStore((s) => s.duplicateSection);
  const updateSectionVariant = useSiteStore((s) => s.updateSectionVariant);

  const maxVariant = MAX_VARIANTS[sectionType] ?? 0;

  return (
    <>
      <div className={`${styles.typeLabel} ${styles.labelVisible}`}>
        {sectionType}
      </div>
      <div className={`${styles.toolbar} ${styles.visible}`}>
        <button className={styles.btn} onClick={() => moveSection(pageSlug, sectionId, "up")} title="Move up">
          <ChevronUp size={14} />
        </button>
        <button className={styles.btn} onClick={() => moveSection(pageSlug, sectionId, "down")} title="Move down">
          <ChevronDown size={14} />
        </button>

        {maxVariant > 0 && (
          <>
            <span className={styles.divider} />
            <select
              className={styles.variantSelect}
              value={variant}
              onChange={(e) => updateSectionVariant(pageSlug, sectionId, Number(e.target.value))}
              title="Layout variant"
            >
              {Array.from({ length: maxVariant + 1 }, (_, i) => (
                <option key={i} value={i}>v{i}</option>
              ))}
            </select>
          </>
        )}

        <span className={styles.divider} />
        <button className={styles.btn} onClick={() => duplicateSection(pageSlug, sectionId)} title="Duplicate">
          <Copy size={14} />
        </button>
        <button
          className={`${styles.btn} ${styles.btnDanger}`}
          onClick={() => {
            if (window.confirm("Delete this section?")) {
              removeSection(pageSlug, sectionId);
            }
          }}
          title="Delete"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </>
  );
}
