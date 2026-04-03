import type { BlogListSectionConfig } from "@/types/site-config";
import SectionWrapper from "@/components/template/shared/SectionWrapper";
import styles from "./BlogList.module.css";

interface Props {
  config: BlogListSectionConfig;
}

/** Variant 0 — Featured post (optional) + 3-column grid */
export default function BlogListVariant0({ config }: Props) {
  const posts = config.posts;
  const featured = config.showFeatured && posts.length > 0 ? posts[0] : null;
  const gridPosts = featured ? posts.slice(1) : posts;

  return (
    <SectionWrapper background={config.background} paddingSize={config.paddingSize}>
      {/* Section header */}
      <div className="t-section-header">
        {config.label && <span className="t-section-label">{config.label}</span>}
        <h2>{config.heading}</h2>
      </div>

      <div className={styles.blogLayout}>
        {/* Featured post */}
        {featured && (
          <div className={`t-card ${styles.featuredCard}`}>
            <div className={styles.featuredPlaceholder}>
              <span className={styles.featuredPlaceholderLabel}>Featured</span>
            </div>
            <div className={styles.featuredContent}>
              <span className={styles.categoryBadge}>{featured.category}</span>
              <h3 className={styles.featuredTitle}>{featured.title}</h3>
              <p className={styles.featuredExcerpt}>{featured.excerpt}</p>
              <div className={styles.blogMeta}>
                <span>{featured.date}</span>
                <span className={styles.blogMetaDot} />
                <span>{featured.readTime}</span>
              </div>
            </div>
          </div>
        )}

        {/* Post grid */}
        {gridPosts.length > 0 && (
          <div className={styles.blogGrid}>
            {gridPosts.map((post, i) => (
              <div key={i} className={`t-card ${styles.blogCard}`}>
                <div className={styles.blogCardBody}>
                  <span className={styles.categoryBadge}>{post.category}</span>
                  <h3 className={styles.blogCardTitle}>{post.title}</h3>
                  <p className={styles.blogCardExcerpt}>{post.excerpt}</p>
                  <div className={styles.blogMeta}>
                    <span>{post.date}</span>
                    <span className={styles.blogMetaDot} />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </SectionWrapper>
  );
}
