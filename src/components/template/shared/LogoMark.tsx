import styles from "./LogoMark.module.css";

interface LogoMarkProps {
  companyName: string;
  small?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

export default function LogoMark({ companyName, small, onClick }: LogoMarkProps) {
  const firstLetter = companyName.charAt(0).toUpperCase();

  return (
    <span
      className={`${styles.logo} ${small ? styles.small : ""}`}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <span className={styles.mark}>{firstLetter}</span>
      <span className={styles.name}>{companyName}</span>
    </span>
  );
}
