import Link from "next/link";
import type { HeroSectionConfig, SectionBackground } from "@/types/site-config";
import IconResolver from "@/components/template/shared/IconResolver";
import styles from "./Hero.module.css";

const BG_CLASS: Record<SectionBackground, string> = {
  primary: styles.bgPrimary,
  secondary: styles.bgSecondary,
  tertiary: styles.bgTertiary,
  accent: styles.bgPrimary, // hero accent falls back to primary bg
};

const PAD_CLASS: Record<string, string> = {
  sm: styles.padSm,
  md: styles.padMd,
  lg: styles.padLg,
};

export default function HeroVariant0({ config }: { config: HeroSectionConfig }) {
  const sectionCls = [
    styles.hero,
    BG_CLASS[config.background],
    PAD_CLASS[config.paddingSize],
  ].join(" ");

  return (
    <section className={sectionCls}>
      <div className="t-container">
        <div className={styles.heroSplit}>
          {/* Left — text content */}
          <div className={styles.heroContent}>
            {config.badge && (
              <div className={styles.heroBadge}>
                <span className={styles.heroBadgeInner}>{config.badge}</span>
              </div>
            )}

            <h1 className={styles.heroTitle}>
              {config.headline}
              {config.headlineAccent && (
                <>
                  <br />
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
              {config.cta.secondary && (
                <Link
                  href={config.cta.secondary.href}
                  className={styles.heroCtaSecondary}
                >
                  {config.cta.secondary.text}
                </Link>
              )}
            </div>

            {config.showContactInfo && (
              <div className={styles.heroContact}>
                <span className={styles.heroContactItem}>
                  <IconResolver name="phone" size={16} />
                  <span>Contact us</span>
                </span>
                <span className={styles.heroContactItem}>
                  <IconResolver name="mail" size={16} />
                  <span>Email us</span>
                </span>
              </div>
            )}
          </div>

          {/* Right — visual card */}
          {config.visualCard && (
            <div className={styles.heroVisual}>
              <div className={styles.heroCard}>
                <div className={styles.heroCardHeader}>
                  <span className={styles.heroCardDot} />
                  <span className={styles.heroCardDot} />
                  <span className={styles.heroCardDot} />
                </div>
                <div className={styles.heroCardContent}>
                  <p className={styles.heroCardLabel}>
                    {config.visualCard.title}
                  </p>
                  {config.visualCard.items.map((item, i) => (
                    <div key={i} className={styles.heroCardItem}>
                      <span className={styles.heroCardCheck}>
                        <IconResolver
                          name={item.icon ?? "check-circle"}
                          size={16}
                        />
                      </span>
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
