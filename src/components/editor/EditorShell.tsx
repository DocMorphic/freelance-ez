"use client";

import { useEffect, useCallback, useState } from "react";
import Link from "next/link";
import { Undo2, Redo2, Eye, Palette, Plus, Loader2, Download } from "lucide-react";
import { useSiteStore } from "@/store/site-store";
import type { SiteConfig } from "@/types/site-config";
import ThemeProvider from "@/components/template/ThemeProvider";
import Navbar from "@/components/template/layout/Navbar/Navbar";
import Footer from "@/components/template/layout/Footer/Footer";
import WhatsAppButton from "@/components/template/shared/WhatsAppButton";
import { useToast } from "@/components/platform/ToastProvider";
import EditorPageRenderer from "./EditorPageRenderer";
import ThemePanel from "./ThemePanel";
import "@/components/template/template.css";
import styles from "./EditorShell.module.css";

interface EditorShellProps {
  config: SiteConfig;
  siteId: string;
}

export default function EditorShell({ config: initialConfig, siteId }: EditorShellProps) {
  const setConfig = useSiteStore((s) => s.setConfig);
  const config = useSiteStore((s) => s.config);
  const isDirty = useSiteStore((s) => s.isDirty);
  const currentPageSlug = useSiteStore((s) => s.currentPageSlug);
  const setCurrentPage = useSiteStore((s) => s.setCurrentPage);
  const undo = useSiteStore((s) => s.undo);
  const redo = useSiteStore((s) => s.redo);
  const save = useSiteStore((s) => s.save);
  const undoStack = useSiteStore((s) => s.undoStack);
  const redoStack = useSiteStore((s) => s.redoStack);
  const setEditMode = useSiteStore((s) => s.setEditMode);
  const themePanelOpen = useSiteStore((s) => s.themePanelOpen);
  const setThemePanelOpen = useSiteStore((s) => s.setThemePanelOpen);
  const addPage = useSiteStore((s) => s.addPage);

  const toast = useToast();

  const [addingPage, setAddingPage] = useState(false);
  const [exporting, setExporting] = useState(false);

  async function handleExport() {
    setExporting(true);
    try {
      const res = await fetch("/api/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ siteId }),
      });
      if (!res.ok) throw new Error("Export failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${config?.company.name || "site"}.zip`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      toast.showToast(err instanceof Error ? err.message : "Export failed", "error");
    } finally {
      setExporting(false);
    }
  }

  async function handleAddPage() {
    if (!config) return;
    const pagePrompt = await toast.promptImport({
      title: "Add New Page",
      description: "Describe the page (e.g., 'Pricing page with 3 tiers')",
      placeholder: "Pricing page with Basic, Pro, and Enterprise tiers",
    });
    if (!pagePrompt) return;

    setAddingPage(true);
    try {
      const res = await fetch("/api/pages/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: pagePrompt,
          companyName: config.company.name,
          industry: config.company.industry,
        }),
      });
      if (!res.ok) throw new Error("Failed to generate page");
      const page = await res.json();
      addPage(page);
      setCurrentPage(page.slug);
    } catch (err) {
      toast.showToast(err instanceof Error ? err.message : "Failed to add page", "error");
    } finally {
      setAddingPage(false);
    }
  }

  // Init store on mount
  useEffect(() => {
    setConfig(initialConfig, siteId);
    setEditMode(true);
    return () => setEditMode(false);
  }, [initialConfig, siteId, setConfig, setEditMode]);

  // Keyboard shortcuts
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "z" && !e.shiftKey) {
      e.preventDefault();
      undo();
    } else if ((e.metaKey || e.ctrlKey) && e.key === "z" && e.shiftKey) {
      e.preventDefault();
      redo();
    } else if ((e.metaKey || e.ctrlKey) && e.key === "s") {
      e.preventDefault();
      save();
    }
  }, [undo, redo, save]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  if (!config) return null;

  const normalize = (s: string) => (s === "/" ? "" : s.replace(/^\/+/, ""));

  return (
    <div className={styles.editor}>
      {/* Top Bar */}
      <div className={styles.topBar}>
        <div className={styles.topBarLeft}>
          <Link href="/dashboard" className={styles.brand}>
            freelance<span>-ez</span>
          </Link>
        </div>
        <div className={styles.topBarActions}>
          <button className={styles.iconBtn} onClick={undo} disabled={undoStack.length === 0} title="Undo (Ctrl+Z)">
            <Undo2 size={14} />
          </button>
          <button className={styles.iconBtn} onClick={redo} disabled={redoStack.length === 0} title="Redo (Ctrl+Shift+Z)">
            <Redo2 size={14} />
          </button>
          <button
            className={styles.themeBtn}
            onClick={() => setThemePanelOpen(!themePanelOpen)}
          >
            <Palette size={12} /> Theme
          </button>
          <Link
            href={`/preview/${siteId}`}
            target="_blank"
            className={styles.previewLink}
          >
            <Eye size={12} /> Preview
          </Link>
          <button
            className={styles.saveBtn}
            onClick={save}
            disabled={!isDirty}
          >
            {isDirty ? "Save" : "Saved"}
          </button>
          <button
            className={styles.iconBtn}
            onClick={handleExport}
            disabled={exporting}
            title="Export as ZIP"
          >
            {exporting ? <Loader2 size={14} /> : <Download size={14} />}
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <div className={styles.sidebar}>
        <div className={styles.sidebarTitle}>Pages</div>
        <ul className={styles.pageList}>
          {config.pages.map((page) => (
            <li key={page.id}>
              <button
                className={`${styles.pageItem} ${normalize(page.slug) === normalize(currentPageSlug) ? styles.pageItemActive : ""}`}
                onClick={() => setCurrentPage(normalize(page.slug))}
              >
                {page.title.length > 20 ? page.title.slice(0, 20) + "..." : page.title}
              </button>
            </li>
          ))}
        </ul>
        <button className={styles.addPageBtn} onClick={handleAddPage} disabled={addingPage}>
          {addingPage ? <><Loader2 size={12} /> Adding...</> : <><Plus size={12} /> Add Page</>}
        </button>
        <div className={styles.adminInfo}>
          <p>Admin page uses mock data in preview. Connect Supabase after export for real functionality.</p>
        </div>
      </div>

      {/* Theme Panel */}
      <ThemePanel />

      {/* Main — Template Preview with Edit Overlays */}
      <div className={styles.main}>
        <ThemeProvider theme={config.theme}>
          <Navbar
            config={config.navbar}
            companyName={config.company.name}
            onNavigate={(slug) => setCurrentPage(normalize(slug))}
          />
          <main>
            <EditorPageRenderer />
          </main>
          <Footer config={config.footer} company={config.company} />
          {config.integrations.whatsapp?.enabled && (
            <WhatsAppButton
              number={config.integrations.whatsapp.number}
              message={config.integrations.whatsapp.message}
            />
          )}
        </ThemeProvider>
      </div>
    </div>
  );
}
