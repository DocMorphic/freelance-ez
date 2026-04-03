import { create } from "zustand";
import type { SiteConfig, ThemeConfig, SectionConfig, PageConfig } from "@/types/site-config";

interface SiteStore {
  // Core state
  config: SiteConfig | null;
  siteId: string | null;
  currentPageSlug: string;
  isDirty: boolean;

  // Editor UI state
  editMode: boolean;
  selectedSectionId: string | null;
  themePanelOpen: boolean;
  sectionPickerOpen: boolean;
  sectionPickerPosition: number | null;

  // History
  undoStack: SiteConfig[];
  redoStack: SiteConfig[];

  // Init
  setConfig: (config: SiteConfig, siteId: string) => void;

  // Navigation
  setCurrentPage: (slug: string) => void;

  // Edit mode
  setEditMode: (on: boolean) => void;
  setSelectedSection: (id: string | null) => void;
  setThemePanelOpen: (open: boolean) => void;
  setSectionPickerOpen: (open: boolean, position?: number | null) => void;

  // Theme
  updateTheme: (updates: Partial<ThemeConfig>) => void;

  // Section operations
  updateSectionField: (pageSlug: string, sectionId: string, path: string, value: unknown) => void;
  moveSection: (pageSlug: string, sectionId: string, direction: "up" | "down") => void;
  removeSection: (pageSlug: string, sectionId: string) => void;
  duplicateSection: (pageSlug: string, sectionId: string) => void;
  addSection: (pageSlug: string, section: SectionConfig, position: number) => void;
  updateSectionVariant: (pageSlug: string, sectionId: string, variant: number) => void;

  // Page operations
  addPage: (page: PageConfig) => void;
  removePage: (slug: string) => void;

  // History
  undo: () => void;
  redo: () => void;

  // Persistence
  save: () => Promise<void>;
}

function pushHistory(state: SiteStore): Partial<SiteStore> {
  if (!state.config) return {};
  return {
    undoStack: [...state.undoStack.slice(-29), state.config],
    redoStack: [],
    isDirty: true,
  };
}

function setNestedValue(obj: Record<string, unknown>, path: string, value: unknown): Record<string, unknown> {
  const keys = path.split(".");
  const result = { ...obj };
  let current: Record<string, unknown> = result;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    const idx = Number(key);
    if (!isNaN(idx) && Array.isArray(current)) {
      current[idx] = { ...(current[idx] as Record<string, unknown>) };
      current = current[idx] as Record<string, unknown>;
    } else {
      current[key] = { ...(current[key] as Record<string, unknown>) };
      current = current[key] as Record<string, unknown>;
    }
  }

  const lastKey = keys[keys.length - 1];
  current[lastKey] = value;
  return result;
}

function updatePageSections(
  config: SiteConfig,
  pageSlug: string,
  updater: (sections: SectionConfig[]) => SectionConfig[]
): SiteConfig {
  return {
    ...config,
    pages: config.pages.map((p) =>
      normalizeSlug(p.slug) === normalizeSlug(pageSlug)
        ? { ...p, sections: updater(p.sections) }
        : p
    ),
  };
}

function normalizeSlug(s: string): string {
  return s === "/" ? "" : s.replace(/^\/+/, "");
}

export const useSiteStore = create<SiteStore>((set, get) => ({
  config: null,
  siteId: null,
  currentPageSlug: "",
  isDirty: false,
  editMode: false,
  selectedSectionId: null,
  themePanelOpen: false,
  sectionPickerOpen: false,
  sectionPickerPosition: null,
  undoStack: [],
  redoStack: [],

  setConfig: (config, siteId) => set({
    config,
    siteId,
    isDirty: false,
    undoStack: [],
    redoStack: [],
    currentPageSlug: "",
  }),

  setCurrentPage: (slug) => set({ currentPageSlug: normalizeSlug(slug), selectedSectionId: null }),
  setEditMode: (on) => set({ editMode: on }),
  setSelectedSection: (id) => set({ selectedSectionId: id }),
  setThemePanelOpen: (open) => set({ themePanelOpen: open }),
  setSectionPickerOpen: (open, position = null) => set({ sectionPickerOpen: open, sectionPickerPosition: position }),

  updateTheme: (updates) => {
    const state = get();
    if (!state.config) return;
    const history = pushHistory(state);
    set({
      ...history,
      config: {
        ...state.config,
        theme: { ...state.config.theme, ...updates },
      },
    });
  },

  updateSectionField: (pageSlug, sectionId, path, value) => {
    const state = get();
    if (!state.config) return;
    const history = pushHistory(state);
    set({
      ...history,
      config: updatePageSections(state.config, pageSlug, (sections) =>
        sections.map((s) =>
          s.id === sectionId
            ? (setNestedValue(s as unknown as Record<string, unknown>, path, value) as unknown as SectionConfig)
            : s
        )
      ),
    });
  },

  moveSection: (pageSlug, sectionId, direction) => {
    const state = get();
    if (!state.config) return;
    const history = pushHistory(state);
    set({
      ...history,
      config: updatePageSections(state.config, pageSlug, (sections) => {
        const idx = sections.findIndex((s) => s.id === sectionId);
        if (idx === -1) return sections;
        const newIdx = direction === "up" ? idx - 1 : idx + 1;
        if (newIdx < 0 || newIdx >= sections.length) return sections;
        const arr = [...sections];
        [arr[idx], arr[newIdx]] = [arr[newIdx], arr[idx]];
        return arr;
      }),
    });
  },

  removeSection: (pageSlug, sectionId) => {
    const state = get();
    if (!state.config) return;
    const history = pushHistory(state);
    set({
      ...history,
      config: updatePageSections(state.config, pageSlug, (sections) =>
        sections.filter((s) => s.id !== sectionId)
      ),
      selectedSectionId: state.selectedSectionId === sectionId ? null : state.selectedSectionId,
    });
  },

  duplicateSection: (pageSlug, sectionId) => {
    const state = get();
    if (!state.config) return;
    const history = pushHistory(state);
    set({
      ...history,
      config: updatePageSections(state.config, pageSlug, (sections) => {
        const idx = sections.findIndex((s) => s.id === sectionId);
        if (idx === -1) return sections;
        const clone = { ...sections[idx], id: `${sections[idx].id}-copy-${Date.now()}` };
        const arr = [...sections];
        arr.splice(idx + 1, 0, clone);
        return arr;
      }),
    });
  },

  addSection: (pageSlug, section, position) => {
    const state = get();
    if (!state.config) return;
    const history = pushHistory(state);
    set({
      ...history,
      config: updatePageSections(state.config, pageSlug, (sections) => {
        const arr = [...sections];
        arr.splice(position, 0, section);
        return arr;
      }),
    });
  },

  updateSectionVariant: (pageSlug, sectionId, variant) => {
    const state = get();
    if (!state.config) return;
    const history = pushHistory(state);
    set({
      ...history,
      config: updatePageSections(state.config, pageSlug, (sections) =>
        sections.map((s) =>
          s.id === sectionId ? { ...s, variant } as SectionConfig : s
        )
      ),
    });
  },

  addPage: (page) => {
    const state = get();
    if (!state.config) return;
    const history = pushHistory(state);
    set({
      ...history,
      config: {
        ...state.config,
        pages: [...state.config.pages, page],
        navbar: {
          ...state.config.navbar,
          links: [
            ...state.config.navbar.links.filter((l) => l.href !== "/admin"),
            { label: page.title.split(" ")[0], href: `/${page.slug}` },
            ...state.config.navbar.links.filter((l) => l.href === "/admin"),
          ],
        },
      },
    });
  },

  removePage: (slug) => {
    const state = get();
    if (!state.config) return;
    const history = pushHistory(state);
    const normalized = normalizeSlug(slug);
    set({
      ...history,
      config: {
        ...state.config,
        pages: state.config.pages.filter((p) => normalizeSlug(p.slug) !== normalized),
        navbar: {
          ...state.config.navbar,
          links: state.config.navbar.links.filter((l) => normalizeSlug(l.href) !== normalized),
        },
      },
      currentPageSlug: state.currentPageSlug === normalized ? "" : state.currentPageSlug,
    });
  },

  undo: () => {
    const state = get();
    if (state.undoStack.length === 0 || !state.config) return;
    const prev = state.undoStack[state.undoStack.length - 1];
    set({
      config: prev,
      undoStack: state.undoStack.slice(0, -1),
      redoStack: [...state.redoStack, state.config],
      isDirty: true,
    });
  },

  redo: () => {
    const state = get();
    if (state.redoStack.length === 0 || !state.config) return;
    const next = state.redoStack[state.redoStack.length - 1];
    set({
      config: next,
      redoStack: state.redoStack.slice(0, -1),
      undoStack: [...state.undoStack, state.config!],
      isDirty: true,
    });
  },

  save: async () => {
    const state = get();
    if (!state.config || !state.siteId) return;
    await fetch(`/api/sites/${state.siteId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ config: state.config }),
    });
    set({ isDirty: false });
  },
}));
