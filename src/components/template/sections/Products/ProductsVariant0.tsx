import type { ProductsSectionConfig } from "@/types/site-config";
import SectionWrapper from "@/components/template/shared/SectionWrapper";
import styles from "./Products.module.css";

interface Props {
  config: ProductsSectionConfig;
}

/** Variant 0 — 3-column image cards grid with gradient placeholders */
export default function ProductsVariant0({ config }: Props) {
  return (
    <SectionWrapper background={config.background} paddingSize={config.paddingSize}>
      {/* Section header */}
      <div className="t-section-header">
        {config.label && <span className="t-section-label">{config.label}</span>}
        <h2>{config.heading}</h2>
        {config.description && <p>{config.description}</p>}
      </div>

      {/* Cards grid */}
      <div className={styles.productsGrid}>
        {config.items.map((item, i) => (
          <div key={i} className={styles.productCard}>
            <div
              className={styles.productImagePlaceholder}
              style={
                item.imagePlaceholder
                  ? { background: item.imagePlaceholder }
                  : undefined
              }
            />
            <div className={styles.productCardContent}>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
