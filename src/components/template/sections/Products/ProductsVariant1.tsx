import type { ProductsSectionConfig } from "@/types/site-config";
import SectionWrapper from "@/components/template/shared/SectionWrapper";
import styles from "./Products.module.css";

interface Props {
  config: ProductsSectionConfig;
}

/** Variant 1 — Detailed list with category badges and type tags */
export default function ProductsVariant1({ config }: Props) {
  return (
    <SectionWrapper background={config.background} paddingSize={config.paddingSize}>
      {/* Section header */}
      <div className="t-section-header">
        {config.label && <span className="t-section-label">{config.label}</span>}
        <h2>{config.heading}</h2>
        {config.description && <p>{config.description}</p>}
      </div>

      {/* Products list */}
      <div className={styles.productsList}>
        {config.items.map((item, i) => (
          <div key={i} className={styles.productRow}>
            <div className={styles.productRowContent}>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              {item.types && item.types.length > 0 && (
                <div className={styles.productTypes}>
                  {item.types.map((type, j) => (
                    <span key={j} className={styles.productTypeTag}>
                      {type}
                    </span>
                  ))}
                </div>
              )}
            </div>
            {item.category && (
              <span className={styles.productCategoryBadge}>{item.category}</span>
            )}
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
