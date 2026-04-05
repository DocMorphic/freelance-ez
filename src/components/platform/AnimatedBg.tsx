import styles from "@/app/animated-bg.module.css";

export default function AnimatedBg() {
  return (
    <div className={styles.bg}>
      <div className={styles.aurora1} />
      <div className={styles.aurora2} />
      <div className={styles.aurora3} />
      <div className={styles.noise} />
      <div className={styles.horizon} />
    </div>
  );
}
