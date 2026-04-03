import type { TrustStripSectionConfig } from "@/types/site-config";
import SectionWrapper from "@/components/template/shared/SectionWrapper";
import IconResolver from "@/components/template/shared/IconResolver";
import styles from "./TrustStrip.module.css";

interface Props {
  config: TrustStripSectionConfig;
}

/** TrustStrip — Horizontal bar with trust badges (icon + title + description) */
export default function TrustStrip({ config }: Props) {
  return (
    <SectionWrapper
      background={config.background}
      paddingSize="sm"
      className={styles.strip}
    >
      <div className={styles.grid}>
        {config.items.map((item, i) => (
          <div key={i} className={styles.item}>
            <div className={styles.icon}>
              <IconResolver name={item.icon} size={24} />
            </div>
            <div className={styles.content}>
              <span className={styles.title}>{item.title}</span>
              <span className={styles.desc}>{item.description}</span>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
