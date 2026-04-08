"use client";

import { useState, useCallback, useRef } from "react";
import type { SiteConfig } from "@/types/site-config";
import ThemeProvider from "./ThemeProvider";
import Navbar from "./layout/Navbar/Navbar";
import Footer from "./layout/Footer/Footer";
import PageRenderer from "./PageRenderer";
import AdminPage from "./pages/AdminPage";
import WhatsAppButton from "./shared/WhatsAppButton";
import "./template.css";

interface SiteRendererProps {
  config: SiteConfig;
  currentPageSlug?: string;
  siteId?: string;
}

const normalizeSlug = (s: string) => (s === "/" ? "" : s.replace(/^\/+/, ""));

// Internal page paths that should be intercepted
const INTERNAL_PATHS = ["/", "/about", "/services", "/contact", "/blog", "/case-studies", "/admin", "/metals", "/pricing"];

export default function SiteRenderer({ config, currentPageSlug = "", siteId }: SiteRendererProps) {
  const [activeSlug, setActiveSlug] = useState(normalizeSlug(currentPageSlug));
  const containerRef = useRef<HTMLDivElement>(null);

  const handleNavigate = useCallback((slug: string) => {
    const normalized = normalizeSlug(slug);
    setActiveSlug(normalized);

    if (siteId) {
      const path = normalized
        ? `/preview/${siteId}/${normalized}`
        : `/preview/${siteId}`;
      window.history.pushState(null, "", path);
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [siteId]);

  // Intercept ALL internal link clicks within the template
  const handleClick = useCallback((e: React.MouseEvent) => {
    const target = (e.target as HTMLElement).closest("a");
    if (!target) return;

    const href = target.getAttribute("href");
    if (!href) return;

    // Skip external links, mailto, tel, hash links, and new-tab links
    if (href.startsWith("http") || href.startsWith("mailto:") ||
        href.startsWith("tel:") || href.startsWith("#") ||
        target.getAttribute("target") === "_blank") {
      return;
    }

    // Check if this is an internal page link
    const cleanHref = href.split("?")[0].split("#")[0];
    if (INTERNAL_PATHS.includes(cleanHref) || config.pages.some(p => `/${normalizeSlug(p.slug)}` === cleanHref || normalizeSlug(p.slug) === normalizeSlug(cleanHref))) {
      e.preventDefault();
      handleNavigate(cleanHref);
    }
  }, [handleNavigate, config.pages]);

  // Admin page renders standalone
  if (activeSlug === "admin") {
    return (
      <ThemeProvider theme={config.theme}>
        <AdminPage companyName={config.company.name} onBack={() => handleNavigate("")} />
      </ThemeProvider>
    );
  }

  const currentPage = config.pages.find((p) => normalizeSlug(p.slug) === activeSlug) ?? config.pages[0];

  if (!currentPage) {
    return null;
  }

  return (
    <ThemeProvider theme={config.theme}>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <div ref={containerRef} onClick={handleClick}>
        <Navbar
          config={config.navbar}
          companyName={config.company.name}
          onNavigate={handleNavigate}
        />
        <main>
          <PageRenderer page={currentPage} company={config.company} />
        </main>
        <Footer config={config.footer} company={config.company} />
      </div>
      {config.integrations.whatsapp?.enabled && (
        <WhatsAppButton
          number={config.integrations.whatsapp.number}
          message={config.integrations.whatsapp.message}
        />
      )}
    </ThemeProvider>
  );
}
