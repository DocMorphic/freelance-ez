"use client";

import { useState } from "react";
import { useSiteStore } from "@/store/site-store";
import SectionToolbar from "./SectionToolbar";
import styles from "./SectionToolbar.module.css";

interface EditableSectionWrapperProps {
  sectionId: string;
  sectionType: string;
  variant: number;
  children: React.ReactNode;
}

export default function EditableSectionWrapper({
  sectionId,
  sectionType,
  variant,
  children,
}: EditableSectionWrapperProps) {
  const [hovered, setHovered] = useState(false);
  const selectedSectionId = useSiteStore((s) => s.selectedSectionId);
  const setSelectedSection = useSiteStore((s) => s.setSelectedSection);
  const isSelected = selectedSectionId === sectionId;

  return (
    <div
      className={`${styles.wrapper} ${isSelected ? styles.selected : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedSection(sectionId);
      }}
    >
      {hovered && (
        <SectionToolbar
          sectionId={sectionId}
          sectionType={sectionType}
          variant={variant}
        />
      )}
      {children}
    </div>
  );
}
