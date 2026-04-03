import { z } from "zod/v4";

// --- Enums & Primitives ---

const themePreset = z.enum([
  "dark-copper", "dark-emerald", "dark-sapphire",
  "dark-rose", "dark-amber", "dark-violet",
  "light-sage", "light-ocean", "light-terracotta",
  "light-slate", "light-forest", "light-coral",
]);

const fontPairing = z.enum([
  "playfair-inter", "dm-serif-dm-sans", "montserrat-open-sans",
  "raleway-lato", "merriweather-source-sans", "space-grotesk-inter",
  "libre-baskerville-nunito", "poppins-work-sans",
]);

const sectionBackground = z.enum(["primary", "secondary", "tertiary", "accent"]);
const sectionPadding = z.enum(["sm", "md", "lg"]);
const hexColor = z.string().regex(/^#[0-9a-fA-F]{6}$/);

// --- Theme ---

const themeColorsSchema = z.object({
  bgPrimary: hexColor,
  bgSecondary: hexColor,
  bgTertiary: hexColor,
  bgCard: hexColor,
  primary: hexColor,
  primaryLight: hexColor,
  primaryDark: hexColor,
  textPrimary: hexColor,
  textSecondary: hexColor,
  textMuted: hexColor,
  textInverse: hexColor,
  border: hexColor,
  borderHover: hexColor,
  success: hexColor,
});

const themeConfigSchema = z.object({
  preset: themePreset,
  mode: z.enum(["dark", "light"]),
  colors: themeColorsSchema,
  fontPairing: fontPairing,
  borderRadius: z.enum(["sharp", "soft", "rounded"]),
  spacing: z.enum(["compact", "normal", "spacious"]),
  buttonStyle: z.enum(["solid", "outline", "pill"]),
  cardStyle: z.enum(["flat", "bordered", "elevated"]),
});

// --- Company ---

const companyInfoSchema = z.object({
  name: z.string().min(1),
  tagline: z.string().min(1),
  industry: z.string().min(1),
  description: z.string().min(1),
  foundedYear: z.number().optional(),
  location: z.object({
    address: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    country: z.string().min(1),
  }),
  contact: z.object({
    phone: z.string().optional(),
    email: z.string().email(),
    whatsapp: z.string().optional(),
  }),
  social: z.object({
    linkedin: z.string().optional(),
    twitter: z.string().optional(),
    instagram: z.string().optional(),
    facebook: z.string().optional(),
  }).optional(),
});

// --- Navbar & Footer ---

const navbarConfigSchema = z.object({
  variant: z.enum(["standard", "centered", "minimal"]),
  showCta: z.boolean(),
  ctaText: z.string(),
  ctaLink: z.string(),
  links: z.array(z.object({ label: z.string(), href: z.string() })),
  transparent: z.boolean(),
});

const footerConfigSchema = z.object({
  variant: z.enum(["standard", "minimal", "centered"]),
  columns: z.array(z.object({
    title: z.string(),
    links: z.array(z.object({ label: z.string(), href: z.string() })),
  })),
  showContact: z.boolean(),
  showSocial: z.boolean(),
  bottomText: z.string(),
});

// --- Base Section Fields ---

const baseSectionFields = {
  id: z.string().min(1),
  background: sectionBackground,
  paddingSize: sectionPadding,
};

// --- Section Schemas ---

const heroSectionSchema = z.object({
  ...baseSectionFields,
  type: z.literal("hero"),
  variant: z.union([z.literal(0), z.literal(1), z.literal(2)]),
  badge: z.string().optional(),
  headline: z.string().min(1),
  headlineAccent: z.string().optional(),
  description: z.string().min(1),
  cta: z.object({
    primary: z.object({ text: z.string(), href: z.string() }),
    secondary: z.object({ text: z.string(), href: z.string() }).optional(),
  }),
  showContactInfo: z.boolean(),
  visualCard: z.object({
    title: z.string(),
    items: z.array(z.object({ icon: z.string().optional(), text: z.string() })),
  }).optional(),
});

const statsSectionSchema = z.object({
  ...baseSectionFields,
  type: z.literal("stats"),
  variant: z.union([z.literal(0), z.literal(1)]),
  items: z.array(z.object({ value: z.string(), label: z.string() })).min(1),
  animated: z.boolean(),
});

const servicesSectionSchema = z.object({
  ...baseSectionFields,
  type: z.literal("services"),
  variant: z.union([z.literal(0), z.literal(1), z.literal(2)]),
  label: z.string().optional(),
  heading: z.string().min(1),
  description: z.string().optional(),
  items: z.array(z.object({
    icon: z.string(),
    title: z.string(),
    description: z.string(),
    features: z.array(z.string()).optional(),
  })).min(1),
  ctaText: z.string().optional(),
  ctaLink: z.string().optional(),
});

const productsSectionSchema = z.object({
  ...baseSectionFields,
  type: z.literal("products"),
  variant: z.union([z.literal(0), z.literal(1)]),
  label: z.string().optional(),
  heading: z.string().min(1),
  description: z.string().optional(),
  items: z.array(z.object({
    name: z.string(),
    description: z.string(),
    category: z.string().optional(),
    types: z.array(z.string()).optional(),
    imagePlaceholder: z.string().optional(),
  })).min(1),
});

const testimonialsSectionSchema = z.object({
  ...baseSectionFields,
  type: z.literal("testimonials"),
  variant: z.union([z.literal(0), z.literal(1)]),
  heading: z.string().min(1),
  label: z.string().optional(),
  items: z.array(z.object({
    quote: z.string(),
    name: z.string(),
    role: z.string().optional(),
    company: z.string().optional(),
    location: z.string().optional(),
  })).min(1),
});

const faqSectionSchema = z.object({
  ...baseSectionFields,
  type: z.literal("faq"),
  variant: z.union([z.literal(0), z.literal(1)]),
  heading: z.string().min(1),
  label: z.string().optional(),
  description: z.string().optional(),
  items: z.array(z.object({ question: z.string(), answer: z.string() })).min(1),
});

const ctaSectionSchema = z.object({
  ...baseSectionFields,
  type: z.literal("cta"),
  variant: z.union([z.literal(0), z.literal(1)]),
  heading: z.string().min(1),
  description: z.string().min(1),
  buttons: z.array(z.object({
    text: z.string(),
    href: z.string(),
    style: z.enum(["primary", "secondary"]),
  })).min(1),
});

const contentSectionSchema = z.object({
  ...baseSectionFields,
  type: z.literal("content"),
  variant: z.union([z.literal(0), z.literal(1), z.literal(2)]),
  label: z.string().optional(),
  heading: z.string().min(1),
  paragraphs: z.array(z.string()).min(1),
  sideCard: z.object({
    heading: z.string(),
    subtitle: z.string().optional(),
    stats: z.array(z.object({ value: z.string(), label: z.string() })).optional(),
    icon: z.string().optional(),
  }).optional(),
  checklistItems: z.array(z.string()).optional(),
});

const formFieldSchema = z.object({
  name: z.string(),
  label: z.string(),
  type: z.enum(["text", "email", "tel", "textarea", "select"]),
  required: z.boolean(),
  placeholder: z.string().optional(),
  options: z.array(z.string()).optional(),
});

const contactSectionSchema = z.object({
  ...baseSectionFields,
  type: z.literal("contact"),
  variant: z.union([z.literal(0), z.literal(1)]),
  heading: z.string().min(1),
  description: z.string().optional(),
  formFields: z.array(formFieldSchema).min(1),
  formTypes: z.array(z.object({
    id: z.string(),
    label: z.string(),
    fields: z.array(formFieldSchema).min(1),
  })).optional(),
  showContactInfo: z.boolean(),
  showWhatsApp: z.boolean(),
});

const processStepsSectionSchema = z.object({
  ...baseSectionFields,
  type: z.literal("processSteps"),
  variant: z.union([z.literal(0), z.literal(1)]),
  heading: z.string().min(1),
  label: z.string().optional(),
  description: z.string().optional(),
  steps: z.array(z.object({
    number: z.string(),
    title: z.string(),
    description: z.string(),
  })).min(1),
});

const featureGridSectionSchema = z.object({
  ...baseSectionFields,
  type: z.literal("featureGrid"),
  variant: z.union([z.literal(0), z.literal(1)]),
  heading: z.string().min(1),
  label: z.string().optional(),
  items: z.array(z.object({
    icon: z.string().optional(),
    title: z.string(),
    description: z.string(),
  })).min(1),
});

const trustStripSectionSchema = z.object({
  ...baseSectionFields,
  type: z.literal("trustStrip"),
  variant: z.literal(0),
  items: z.array(z.object({
    icon: z.string(),
    title: z.string(),
    description: z.string(),
  })).min(1),
});

const teamSectionSchema = z.object({
  ...baseSectionFields,
  type: z.literal("team"),
  variant: z.union([z.literal(0), z.literal(1)]),
  heading: z.string().min(1),
  label: z.string().optional(),
  members: z.array(z.object({
    name: z.string(),
    role: z.string(),
    bio: z.string().optional(),
    icon: z.string().optional(),
  })).min(1),
});

const caseStudiesSectionSchema = z.object({
  ...baseSectionFields,
  type: z.literal("caseStudies"),
  variant: z.literal(0),
  heading: z.string().min(1),
  label: z.string().optional(),
  items: z.array(z.object({
    title: z.string(),
    industry: z.string(),
    region: z.string().optional(),
    challenge: z.string(),
    solution: z.string(),
    results: z.array(z.string()),
    metrics: z.record(z.string(), z.string()).optional(),
  })).min(1),
});

const pricingTableSectionSchema = z.object({
  ...baseSectionFields,
  type: z.literal("pricingTable"),
  variant: z.union([z.literal(0), z.literal(1)]),
  heading: z.string().min(1),
  label: z.string().optional(),
  tiers: z.array(z.object({
    name: z.string(),
    price: z.string(),
    period: z.string().optional(),
    description: z.string(),
    features: z.array(z.string()),
    cta: z.object({ text: z.string(), href: z.string() }),
    highlighted: z.boolean().optional(),
  })).min(1),
});

const gallerySectionSchema = z.object({
  ...baseSectionFields,
  type: z.literal("gallery"),
  variant: z.literal(0),
  heading: z.string().min(1),
  label: z.string().optional(),
  items: z.array(z.object({
    title: z.string(),
    description: z.string().optional(),
    placeholderGradient: z.string(),
  })).min(1),
});

const blogListSectionSchema = z.object({
  ...baseSectionFields,
  type: z.literal("blogList"),
  variant: z.union([z.literal(0), z.literal(1)]),
  heading: z.string().min(1),
  label: z.string().optional(),
  showFeatured: z.boolean(),
  posts: z.array(z.object({
    slug: z.string(),
    title: z.string(),
    excerpt: z.string(),
    category: z.string(),
    date: z.string(),
    readTime: z.string(),
  })).min(1),
});

// --- Section Union ---

const sectionConfigSchema = z.discriminatedUnion("type", [
  heroSectionSchema,
  statsSectionSchema,
  servicesSectionSchema,
  productsSectionSchema,
  testimonialsSectionSchema,
  faqSectionSchema,
  ctaSectionSchema,
  contentSectionSchema,
  contactSectionSchema,
  processStepsSectionSchema,
  featureGridSectionSchema,
  trustStripSectionSchema,
  teamSectionSchema,
  caseStudiesSectionSchema,
  pricingTableSectionSchema,
  gallerySectionSchema,
  blogListSectionSchema,
]);

// --- Page ---

const pageConfigSchema = z.object({
  id: z.string().min(1),
  slug: z.string(),
  title: z.string().min(1),
  description: z.string(),
  sections: z.array(sectionConfigSchema).min(1),
});

// --- SEO & Integrations ---

const seoConfigSchema = z.object({
  siteName: z.string().min(1),
  defaultTitle: z.string().min(1),
  titleTemplate: z.string(),
  defaultDescription: z.string(),
  keywords: z.array(z.string()),
});

const integrationsConfigSchema = z.object({
  supabase: z.object({
    enabled: z.boolean(),
    contactForm: z.boolean(),
  }).optional(),
  analytics: z.object({
    gaId: z.string().optional(),
  }).optional(),
  whatsapp: z.object({
    enabled: z.boolean(),
    number: z.string(),
    message: z.string(),
  }).optional(),
});

// --- Full SiteConfig Schema ---

export const siteConfigSchema = z.object({
  id: z.string().min(1),
  version: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  company: companyInfoSchema,
  theme: themeConfigSchema,
  navbar: navbarConfigSchema,
  footer: footerConfigSchema,
  pages: z.array(pageConfigSchema).min(1),
  seo: seoConfigSchema,
  integrations: integrationsConfigSchema,
});

// --- User Input Schema ---

export const userInputSchema = z.object({
  companyName: z.string().min(1),
  industry: z.string().min(1),
  tagline: z.string().optional(),
  description: z.string().min(1),
  services: z.array(z.object({
    name: z.string().min(1),
    description: z.string().min(1),
  })).min(1),
  products: z.array(z.object({
    name: z.string().min(1),
    description: z.string().min(1),
  })).optional(),
  contactEmail: z.string().email(),
  contactPhone: z.string().optional(),
  contactAddress: z.string().optional(),
  city: z.string().optional(),
  country: z.string().min(1),
  whatsapp: z.string().optional(),
  socialLinks: z.object({
    linkedin: z.string().optional(),
    twitter: z.string().optional(),
    instagram: z.string().optional(),
    facebook: z.string().optional(),
  }).optional(),
  designDescription: z.string().min(1),
  preferDarkMode: z.boolean().optional(),
  wantBlog: z.boolean().optional(),
  wantCaseStudies: z.boolean().optional(),
});

export type ValidatedSiteConfig = z.infer<typeof siteConfigSchema>;
export type ValidatedUserInput = z.infer<typeof userInputSchema>;
