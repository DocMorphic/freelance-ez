"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { FAQSectionConfig } from "@/types/site-config";
import SectionWrapper from "@/components/template/shared/SectionWrapper";
import styles from "./FAQ.module.css";

export default function FAQVariant0({ config }: { config: FAQSectionConfig }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <SectionWrapper background={config.background} paddingSize={config.paddingSize}>
      <div className="t-section-header">
        {config.label && <span className="t-section-label">{config.label}</span>}
        <h2>{config.heading}</h2>
        {config.description && <p>{config.description}</p>}
      </div>

      <div className={styles.faqAccordion}>
        {config.items.map((item, index) => (
          <div
            key={index}
            className={`${styles.faqItem} ${openIndex === index ? styles.faqItemOpen : ""}`}
          >
            <button
              className={styles.faqQuestion}
              onClick={() => toggle(index)}
              aria-expanded={openIndex === index}
            >
              <span>{item.question}</span>
              <ChevronDown
                size={20}
                className={`${styles.faqIcon} ${openIndex === index ? styles.faqIconOpen : ""}`}
              />
            </button>
            <div
              className={`${styles.faqAnswer} ${openIndex === index ? styles.faqAnswerOpen : ""}`}
            >
              <p>{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
