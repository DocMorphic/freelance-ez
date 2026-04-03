"use client";

import { useSiteStore } from "@/store/site-store";
import SectionRenderer from "@/components/template/SectionRenderer";
import EditableSectionWrapper from "./EditableSectionWrapper";

export default function EditorPageRenderer() {
  const config = useSiteStore((s) => s.config);
  const currentPageSlug = useSiteStore((s) => s.currentPageSlug);

  if (!config) return null;

  const normalize = (s: string) => (s === "/" ? "" : s.replace(/^\/+/, ""));
  const page = config.pages.find((p) => normalize(p.slug) === normalize(currentPageSlug)) ?? config.pages[0];

  if (!page) {
    return (
      <div style={{ padding: "3rem", textAlign: "center", color: "#94a3b8" }}>
        No pages found. Add a page from the sidebar.
      </div>
    );
  }

  return (
    <>
      {page.sections.map((section) => (
        <EditableSectionWrapper
          key={section.id}
          sectionId={section.id}
          sectionType={section.type}
          variant={section.variant}
        >
          <SectionRenderer section={section} company={config.company} />
        </EditableSectionWrapper>
      ))}
    </>
  );
}
