import type { BlogListSectionConfig } from "@/types/site-config";
import SectionWrapper from "@/components/template/shared/SectionWrapper";
import styles from "./BlogList.module.css";

interface Props {
  config: BlogListSectionConfig;
}

/** Variant 1 — Simple vertical list with date, category, title, excerpt */
export default function BlogListVariant1({ config }: Props) {
  return (
    <SectionWrapper background={config.background} paddingSize={config.paddingSize}>
      {/* Section header */}
      <div className="t-section-header">
        {config.label && <span className="t-section-label">{config.label}</span>}
        <h2>{config.heading}</h2>
      </div>

      {/* Post list */}
      <div className={styles.blogListSimple}>
        {config.posts.map((post, i) => (
          <div key={i} className={styles.blogListRow}>
            <span className={styles.blogListDate}>{post.date}</span>
            <span className={styles.blogListCategory}>{post.category}</span>
            <div className={styles.blogListContent}>
              <h3 className={styles.blogListTitle}>{post.title}</h3>
              <p className={styles.blogListExcerpt}>{post.excerpt}</p>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
