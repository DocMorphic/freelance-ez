import type { BlogListSectionConfig } from "@/types/site-config";
import BlogListVariant0 from "./BlogListVariant0";
import BlogListVariant1 from "./BlogListVariant1";

interface Props {
  config: BlogListSectionConfig;
}

/** Dispatcher — picks the right BlogList variant */
export default function BlogList({ config }: Props) {
  switch (config.variant) {
    case 0:
      return <BlogListVariant0 config={config} />;
    case 1:
      return <BlogListVariant1 config={config} />;
    default:
      return <BlogListVariant0 config={config} />;
  }
}
