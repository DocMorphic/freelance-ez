import type { TestimonialsSectionConfig } from "@/types/site-config";
import TestimonialsVariant0 from "./TestimonialsVariant0";
import TestimonialsVariant1 from "./TestimonialsVariant1";

export default function Testimonials({ config }: { config: TestimonialsSectionConfig }) {
  switch (config.variant) {
    case 0:
      return <TestimonialsVariant0 config={config} />;
    case 1:
      return <TestimonialsVariant1 config={config} />;
    default:
      return <TestimonialsVariant0 config={config} />;
  }
}
