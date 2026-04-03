import type { PageConfig, CompanyInfo } from "@/types/site-config";
import SectionRenderer from "./SectionRenderer";

interface PageRendererProps {
  page: PageConfig;
  company?: CompanyInfo;
}

export default function PageRenderer({ page, company }: PageRendererProps) {
  return (
    <>
      {page.sections.map((section) => (
        <SectionRenderer key={section.id} section={section} company={company} />
      ))}
    </>
  );
}
