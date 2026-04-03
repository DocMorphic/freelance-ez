"use client";

import { useState } from "react";
import { Quote } from "lucide-react";
import type { TestimonialsSectionConfig } from "@/types/site-config";
import SectionWrapper from "@/components/template/shared/SectionWrapper";
import styles from "./Testimonials.module.css";

export default function TestimonialsVariant1({ config }: { config: TestimonialsSectionConfig }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const item = config.items[activeIndex];

  if (!item) return null;

  return (
    <SectionWrapper background={config.background} paddingSize={config.paddingSize}>
      <div className="t-section-header">
        {config.label && <span className="t-section-label">{config.label}</span>}
        <h2>{config.heading}</h2>
      </div>

      <div className={styles.featuredQuote}>
        <Quote size={40} className={styles.featuredQuoteIcon} />
        <p className={styles.featuredQuoteText}>{item.quote}</p>
        <div className={styles.featuredAuthor}>
          <span className={styles.featuredAuthorName}>{item.name}</span>
          {(item.role || item.company) && (
            <span className={styles.featuredAuthorRole}>
              {[item.role, item.company].filter(Boolean).join(", ")}
            </span>
          )}
          {item.location && (
            <span className={styles.featuredAuthorLocation}>{item.location}</span>
          )}
        </div>

        {config.items.length > 1 && (
          <div className={styles.featuredDots}>
            {config.items.map((_, i) => (
              <button
                key={i}
                className={`${styles.featuredDot} ${i === activeIndex ? styles.featuredDotActive : ""}`}
                onClick={() => setActiveIndex(i)}
                aria-label={`Show testimonial ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </SectionWrapper>
  );
}
