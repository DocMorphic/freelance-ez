"use client";

import { useState, useCallback } from "react";
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

export default function SiteRenderer({ config, currentPageSlug = "", siteId }: SiteRendererProps) {
  const [activeSlug, setActiveSlug] = useState(normalizeSlug(currentPageSlug));

  const handleNavigate = useCallback((slug: string) => {
    const normalized = normalizeSlug(slug);
    setActiveSlug(normalized);

    // Sync URL without full page reload
    if (siteId) {
      const path = normalized
        ? `/preview/${siteId}/${normalized}`
        : `/preview/${siteId}`;
      window.history.pushState(null, "", path);
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [siteId]);

  // Admin page renders standalone (no Navbar/Footer)
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
      <Navbar
        config={config.navbar}
        companyName={config.company.name}
        onNavigate={handleNavigate}
      />
      <main>
        <PageRenderer page={currentPage} company={config.company} />
      </main>
      <Footer config={config.footer} company={config.company} />
      {config.integrations.whatsapp?.enabled && (
        <WhatsAppButton
          number={config.integrations.whatsapp.number}
          message={config.integrations.whatsapp.message}
        />
      )}
    </ThemeProvider>
  );
}
