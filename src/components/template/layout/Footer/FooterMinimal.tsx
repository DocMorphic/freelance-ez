import Link from "next/link";
import type { FooterConfig, CompanyInfo } from "@/types/site-config";
import styles from "./Footer.module.css";

interface FooterMinimalProps {
  config: FooterConfig;
  company: CompanyInfo;
}

export default function FooterMinimal({ config, company }: FooterMinimalProps) {
  const currentYear = new Date().getFullYear();

  /* Grab links from the first column (if any) for the inline row */
  const inlineLinks = config.columns.length > 0 ? config.columns[0].links : [];

  return (
    <footer className={styles.minimal}>
      <div className={styles.container}>
        <div className={styles.minimalInner}>
          <p>
            {config.bottomText
              ? config.bottomText.replace("{year}", String(currentYear))
              : `\u00A9 ${currentYear} ${company.name}. All rights reserved.`}
          </p>

          {inlineLinks.length > 0 && (
            <ul className={styles.minimalLinks}>
              {inlineLinks.map((link, i) => (
                <li key={`${link.href}-${i}`}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </footer>
  );
}
