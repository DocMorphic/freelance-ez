"use client";

import type { SectionBackground, SectionPadding } from "@/types/site-config";
import { useScrollReveal } from "./useScrollReveal";
import styles from "./SectionWrapper.module.css";

const BG_CLASS: Record<SectionBackground, string> = {
  primary: "t-section-bg-primary",
  secondary: "t-section-bg-secondary",
  tertiary: "t-section-bg-tertiary",
  accent: "t-section-bg-accent",
};

const PADDING_CLASS: Record<SectionPadding, string> = {
  sm: "t-section-sm",
  md: "t-section",
  lg: "t-section",
};

interface SectionWrapperProps {
  background: SectionBackground;
  paddingSize: SectionPadding;
  children: React.ReactNode;
  className?: string;
}

export default function SectionWrapper({
  background,
  paddingSize,
  children,
  className = "",
}: SectionWrapperProps) {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`${PADDING_CLASS[paddingSize]} ${BG_CLASS[background]} ${styles.section} ${isVisible ? styles.visible : ""} ${className}`}
    >
      <div className="t-container">
        {children}
      </div>
    </section>
  );
}
