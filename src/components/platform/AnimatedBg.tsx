import styles from "@/app/animated-bg.module.css";

export default function AnimatedBg() {
  return (
    <div className={styles.bg}>
      <div className={styles.gradient} />
      <div className={styles.grid} />
      <div className={styles.glow1} />
      <div className={styles.glow2} />
      <div className={styles.noise} />
    </div>
  );
}
