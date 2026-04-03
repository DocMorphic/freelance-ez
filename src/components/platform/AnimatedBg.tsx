import styles from "@/app/animated-bg.module.css";

export default function AnimatedBg() {
  return (
    <div className={styles.bg}>
      <div className={styles.blob1} />
      <div className={styles.blob2} />
      <div className={styles.blob3} />
    </div>
  );
}
