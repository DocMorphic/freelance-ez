"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import type { NavbarConfig } from "@/types/site-config";
import LogoMark from "@/components/template/shared/LogoMark";
import styles from "./Navbar.module.css";

interface NavbarCenteredProps {
  config: NavbarConfig;
  companyName: string;
  onNavigate?: (slug: string) => void;
}

export default function NavbarCentered({ config, companyName, onNavigate }: NavbarCenteredProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerClasses = [
    styles.header,
    styles.centered,
    config.transparent ? styles.transparent : "",
    isScrolled ? styles.scrolled : "",
  ]
    .filter(Boolean)
    .join(" ");

  function handleClick(e: React.MouseEvent, href: string) {
    if (onNavigate) {
      e.preventDefault();
      const slug = href === "/" ? "" : href.replace(/^\//, "");
      onNavigate(slug);
      setIsOpen(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <header className={headerClasses}>
      <nav className={styles.nav}>
        <div className={styles.topRow}>
          <div />
          <Link href="/" className={styles.logo} onClick={(e) => handleClick(e, "/")}>
            <LogoMark companyName={companyName} />
          </Link>
          <div className={styles.navActions}>
            {config.showCta && (
              <Link href={config.ctaLink} className={styles.ctaBtn} onClick={(e) => handleClick(e, config.ctaLink)}>
                {config.ctaText} <ArrowRight size={16} />
              </Link>
            )}
            <button
              className={styles.menuBtn}
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <div className={styles.linksRow}>
          <ul className={styles.navLinks}>
            {config.links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={styles.navLink} onClick={(e) => handleClick(e, link.href)}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={`${styles.mobileNav} ${isOpen ? styles.mobileNavOpen : ""}`}>
          <ul className={styles.mobileNavLinks}>
            {config.links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={styles.mobileNavLink} onClick={(e) => handleClick(e, link.href)}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          {config.showCta && (
            <Link href={config.ctaLink} className={styles.mobileCta} onClick={(e) => handleClick(e, config.ctaLink)}>
              {config.ctaText} <ArrowRight size={16} />
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
