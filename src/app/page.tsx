import Link from "next/link";
import { ArrowRight } from "lucide-react";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <nav className={styles.nav}>
        <div className={styles.navBrand}>
          freelance<span>-ez</span>
        </div>
        <div className={styles.navRight}>
          <Link href="/login" className={styles.navLink}>
            Sign in
          </Link>
          <Link href="/create" className={styles.navCta}>
            Get Started
          </Link>
        </div>
      </nav>

      <section className={styles.hero}>
        <h1 className={styles.title}>
          Professional websites, built in minutes.
        </h1>
        <p className={styles.subtitle}>
          Enter your company details. AI generates a complete, polished website
          — ready to customize and deploy.
        </p>
        <Link href="/signup" className={styles.btnPrimary}>
          Build Your Site <ArrowRight size={16} />
        </Link>
        <div className={styles.chips}>
          <span className={styles.chip}>
            <span className={styles.chipDot} />
            AI-powered content
          </span>
          <span className={styles.chip}>
            <span className={styles.chipDot} />
            12 premium themes
          </span>
          <span className={styles.chip}>
            <span className={styles.chipDot} />
            One-click deploy
          </span>
        </div>
      </section>
    </div>
  );
}
