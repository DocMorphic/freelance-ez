import type { FAQSectionConfig } from "@/types/site-config";
import SectionWrapper from "@/components/template/shared/SectionWrapper";
import styles from "./FAQ.module.css";

export default function FAQVariant1({ config }: { config: FAQSectionConfig }) {
  return (
    <SectionWrapper background={config.background} paddingSize={config.paddingSize}>
      <div className="t-section-header">
        {config.label && <span className="t-section-label">{config.label}</span>}
        <h2>{config.heading}</h2>
        {config.description && <p>{config.description}</p>}
      </div>

      <div className={styles.faqColumns}>
        {config.items.map((item, index) => (
          <div key={index} className={styles.faqPair}>
            <h3 className={styles.faqPairQuestion}>{item.question}</h3>
            <p className={styles.faqPairAnswer}>{item.answer}</p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
