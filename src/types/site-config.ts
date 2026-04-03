// ============================================================
// SiteConfig — The single JSON document that drives a generated website.
// Every template component, the theme system, the editor, and the
// export pipeline all read from this schema.
// ============================================================

// --- Top Level ---

export interface SiteConfig {
  id: string;
  version: number;
  createdAt: string;
  updatedAt: string;

  company: CompanyInfo;
  theme: ThemeConfig;
  navbar: NavbarConfig;
  footer: FooterConfig;
  pages: PageConfig[];
  seo: SEOConfig;
  integrations: IntegrationsConfig;
}

// --- Company ---

export interface CompanyInfo {
  name: string;
  tagline: string;
  industry: string;
  description: string;
  foundedYear?: number;
  location: {
    address?: string;
    city?: string;
    state?: string;
    country: string;
  };
  contact: {
    phone?: string;
    email: string;
    whatsapp?: string;
  };
  social?: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    facebook?: string;
  };
}

// --- Theme ---

export type ThemePreset =
  | "dark-copper"
  | "dark-emerald"
  | "dark-sapphire"
  | "dark-rose"
  | "dark-amber"
  | "dark-violet"
  | "light-sage"
  | "light-ocean"
  | "light-terracotta"
  | "light-slate"
  | "light-forest"
  | "light-coral";

export type FontPairing =
  | "playfair-inter"
  | "dm-serif-dm-sans"
  | "montserrat-open-sans"
  | "raleway-lato"
  | "merriweather-source-sans"
  | "space-grotesk-inter"
  | "libre-baskerville-nunito"
  | "poppins-work-sans";

export type BorderRadiusStyle = "sharp" | "soft" | "rounded";
export type ButtonStyle = "solid" | "outline" | "pill";
export type CardStyle = "flat" | "bordered" | "elevated";
export type SpacingDensity = "compact" | "normal" | "spacious";

export interface ThemeColors {
  bgPrimary: string;
  bgSecondary: string;
  bgTertiary: string;
  bgCard: string;
  primary: string;
  primaryLight: string;
  primaryDark: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  textInverse: string;
  border: string;
  borderHover: string;
  success: string;
}

export interface ThemeConfig {
  preset: ThemePreset;
  mode: "dark" | "light";
  colors: ThemeColors;
  fontPairing: FontPairing;
  borderRadius: BorderRadiusStyle;
  spacing: SpacingDensity;
  buttonStyle: ButtonStyle;
  cardStyle: CardStyle;
}

// --- Navbar & Footer ---

export interface NavbarConfig {
  variant: "standard" | "centered" | "minimal";
  showCta: boolean;
  ctaText: string;
  ctaLink: string;
  links: Array<{ label: string; href: string }>;
  transparent: boolean;
}

export interface FooterConfig {
  variant: "standard" | "minimal" | "centered";
  columns: Array<{
    title: string;
    links: Array<{ label: string; href: string }>;
  }>;
  showContact: boolean;
  showSocial: boolean;
  bottomText: string;
}

// --- Pages & Sections ---

export interface PageConfig {
  id: string;
  slug: string;
  title: string;
  description: string;
  sections: SectionConfig[];
}

// --- Section Union Type ---

export type SectionConfig =
  | HeroSectionConfig
  | StatsSectionConfig
  | ServicesSectionConfig
  | ProductsSectionConfig
  | TestimonialsSectionConfig
  | FAQSectionConfig
  | CTASectionConfig
  | ContentSectionConfig
  | ContactSectionConfig
  | ProcessStepsSectionConfig
  | FeatureGridSectionConfig
  | TrustStripSectionConfig
  | TeamSectionConfig
  | CaseStudiesSectionConfig
  | PricingTableSectionConfig
  | GallerySectionConfig
  | BlogListSectionConfig;

export type SectionType = SectionConfig["type"];

export type SectionBackground = "primary" | "secondary" | "tertiary" | "accent";
export type SectionPadding = "sm" | "md" | "lg";

interface BaseSectionConfig {
  id: string;
  type: string;
  variant: number;
  background: SectionBackground;
  paddingSize: SectionPadding;
}

// --- Individual Section Types ---

export interface HeroSectionConfig extends BaseSectionConfig {
  type: "hero";
  variant: 0 | 1 | 2;
  // 0 = split (text left, visual card right)
  // 1 = centered (text center, no visual)
  // 2 = minimal (headline + subtitle only)
  badge?: string;
  headline: string;
  headlineAccent?: string;
  description: string;
  cta: {
    primary: { text: string; href: string };
    secondary?: { text: string; href: string };
  };
  showContactInfo: boolean;
  visualCard?: {
    title: string;
    items: Array<{ icon?: string; text: string }>;
  };
}

export interface StatsSectionConfig extends BaseSectionConfig {
  type: "stats";
  variant: 0 | 1;
  // 0 = horizontal bar with dividers
  // 1 = cards grid
  items: Array<{ value: string; label: string }>;
  animated: boolean;
}

export interface ServicesSectionConfig extends BaseSectionConfig {
  type: "services";
  variant: 0 | 1 | 2;
  // 0 = card grid (4 col)
  // 1 = cards with feature lists (3 col)
  // 2 = alternating left/right rows
  label?: string;
  heading: string;
  description?: string;
  items: Array<{
    icon: string;
    title: string;
    description: string;
    features?: string[];
  }>;
  ctaText?: string;
  ctaLink?: string;
}

export interface ProductsSectionConfig extends BaseSectionConfig {
  type: "products";
  variant: 0 | 1;
  // 0 = image cards grid
  // 1 = detailed list with types
  label?: string;
  heading: string;
  description?: string;
  items: Array<{
    name: string;
    description: string;
    category?: string;
    types?: string[];
    imagePlaceholder?: string;
  }>;
}

export interface TestimonialsSectionConfig extends BaseSectionConfig {
  type: "testimonials";
  variant: 0 | 1;
  // 0 = grid (3 col)
  // 1 = single featured quote
  heading: string;
  label?: string;
  items: Array<{
    quote: string;
    name: string;
    role?: string;
    company?: string;
    location?: string;
  }>;
}

export interface FAQSectionConfig extends BaseSectionConfig {
  type: "faq";
  variant: 0 | 1;
  // 0 = accordion
  // 1 = two-column Q&A pairs
  heading: string;
  label?: string;
  description?: string;
  items: Array<{ question: string; answer: string }>;
}

export interface CTASectionConfig extends BaseSectionConfig {
  type: "cta";
  variant: 0 | 1;
  // 0 = centered with gradient bg
  // 1 = split (text left, buttons right)
  heading: string;
  description: string;
  buttons: Array<{
    text: string;
    href: string;
    style: "primary" | "secondary";
  }>;
}

export interface ContentSectionConfig extends BaseSectionConfig {
  type: "content";
  variant: 0 | 1 | 2;
  // 0 = two-column text + side card
  // 1 = centered text block
  // 2 = text + checklist
  label?: string;
  heading: string;
  paragraphs: string[];
  sideCard?: {
    heading: string;
    subtitle?: string;
    stats?: Array<{ value: string; label: string }>;
    icon?: string;
  };
  checklistItems?: string[];
}

export type FormField = {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "textarea" | "select";
  required: boolean;
  placeholder?: string;
  options?: string[];
};

export interface ContactSectionConfig extends BaseSectionConfig {
  type: "contact";
  variant: 0 | 1;
  // 0 = two-column info + form
  // 1 = centered form only
  heading: string;
  description?: string;
  formFields: FormField[];
  // Optional: type-based form switching (buyer/seller/general)
  formTypes?: Array<{
    id: string;
    label: string;
    fields: FormField[];
  }>;
  showContactInfo: boolean;
  showWhatsApp: boolean;
}

export interface ProcessStepsSectionConfig extends BaseSectionConfig {
  type: "processSteps";
  variant: 0 | 1;
  // 0 = numbered circles
  // 1 = vertical timeline
  heading: string;
  label?: string;
  description?: string;
  steps: Array<{
    number: string;
    title: string;
    description: string;
  }>;
}

export interface FeatureGridSectionConfig extends BaseSectionConfig {
  type: "featureGrid";
  variant: 0 | 1;
  // 0 = icon + title + desc cards
  // 1 = checkmark list
  heading: string;
  label?: string;
  items: Array<{
    icon?: string;
    title: string;
    description: string;
  }>;
}

export interface TrustStripSectionConfig extends BaseSectionConfig {
  type: "trustStrip";
  variant: 0;
  items: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
}

export interface TeamSectionConfig extends BaseSectionConfig {
  type: "team";
  variant: 0 | 1;
  // 0 = cards grid
  // 1 = list with descriptions
  heading: string;
  label?: string;
  members: Array<{
    name: string;
    role: string;
    bio?: string;
    icon?: string;
  }>;
}

export interface CaseStudiesSectionConfig extends BaseSectionConfig {
  type: "caseStudies";
  variant: 0;
  heading: string;
  label?: string;
  items: Array<{
    title: string;
    industry: string;
    region?: string;
    challenge: string;
    solution: string;
    results: string[];
    metrics?: Record<string, string>;
  }>;
}

export interface PricingTableSectionConfig extends BaseSectionConfig {
  type: "pricingTable";
  variant: 0 | 1;
  // 0 = cards (3 col)
  // 1 = comparison table
  heading: string;
  label?: string;
  tiers: Array<{
    name: string;
    price: string;
    period?: string;
    description: string;
    features: string[];
    cta: { text: string; href: string };
    highlighted?: boolean;
  }>;
}

export interface GallerySectionConfig extends BaseSectionConfig {
  type: "gallery";
  variant: 0;
  heading: string;
  label?: string;
  items: Array<{
    title: string;
    description?: string;
    placeholderGradient: string;
  }>;
}

export interface BlogListSectionConfig extends BaseSectionConfig {
  type: "blogList";
  variant: 0 | 1;
  // 0 = featured + grid
  // 1 = simple list
  heading: string;
  label?: string;
  showFeatured: boolean;
  posts: Array<{
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    date: string;
    readTime: string;
  }>;
}

// --- SEO & Integrations ---

export interface SEOConfig {
  siteName: string;
  defaultTitle: string;
  titleTemplate: string;
  defaultDescription: string;
  keywords: string[];
}

export interface IntegrationsConfig {
  supabase?: {
    enabled: boolean;
    contactForm: boolean;
  };
  analytics?: {
    gaId?: string;
  };
  whatsapp?: {
    enabled: boolean;
    number: string;
    message: string;
  };
}

// --- User Input (for the create form) ---

export interface UserInput {
  companyName: string;
  industry: string;
  tagline?: string;
  description: string;
  services: Array<{ name: string; description: string }>;
  products?: Array<{ name: string; description: string }>;
  contactEmail: string;
  contactPhone?: string;
  contactAddress?: string;
  city?: string;
  country: string;
  whatsapp?: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    facebook?: string;
  };
  designDescription: string;
  preferDarkMode?: boolean;
  wantBlog?: boolean;
  wantCaseStudies?: boolean;
}
