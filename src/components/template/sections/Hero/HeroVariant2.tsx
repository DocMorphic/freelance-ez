import Link from "next/link";
import type { HeroSectionConfig, SectionBackground } from "@/types/site-config";
import IconResolver from "@/components/template/shared/IconResolver";
import styles from "./Hero.module.css";

const BG_CLASS: Record<SectionBackground, string> = {
  primary: styles.bgPrimary,
  secondary: styles.bgSecondary,
  tertiary: styles.bgTertiary,
  accent: styles.bgPrimary,
};

const PAD_CLASS: Record<string, string> = {
  sm: styles.padSm,
  md: styles.padMd,
  lg: styles.padLg,
};

export default function HeroVariant2({ config }: { config: HeroSectionConfig }) {
  const sectionCls = [
    styles.hero,
    BG_CLASS[config.background],
    PAD_CLASS[config.paddingSize],
  ].join(" ");

  return (
    <section className={sectionCls}>
      <div className="t-container">
        <div className={styles.heroMinimal}>
          <h1 className={styles.heroTitle}>
            {config.headline}
            {config.headlineAccent && (
              <>
                {" "}
                <span className={styles.heroAccent}>
                  {config.headlineAccent}
                </span>
              </>
            )}
          </h1>

          <p className={styles.heroDescription}>{config.description}</p>

          <div className={styles.heroCta}>
            <Link
              href={config.cta.primary.href}
              className={styles.heroCtaPrimary}
            >
              {config.cta.primary.text}
              <IconResolver name="arrow-right" size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
