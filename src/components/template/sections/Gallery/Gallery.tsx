import type { GallerySectionConfig } from "@/types/site-config";
import SectionWrapper from "@/components/template/shared/SectionWrapper";
import styles from "./Gallery.module.css";

interface Props {
  config: GallerySectionConfig;
}

/** Gallery — Grid of cards with gradient placeholder backgrounds and title overlay */
export default function Gallery({ config }: Props) {
  return (
    <SectionWrapper background={config.background} paddingSize={config.paddingSize}>
      {/* Section header */}
      <div className="t-section-header">
        {config.label && <span className="t-section-label">{config.label}</span>}
        <h2>{config.heading}</h2>
      </div>

      {/* Gallery grid */}
      <div className={styles.galleryGrid}>
        {config.items.map((item, i) => (
          <div key={i} className={styles.galleryCard}>
            <div
              className={styles.galleryBg}
              style={{ background: item.placeholderGradient }}
            />
            <div className={styles.galleryOverlay}>
              <p className={styles.galleryTitle}>{item.title}</p>
              {item.description && (
                <p className={styles.galleryDesc}>{item.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
