import { GoogleGenAI } from "@google/genai";
import { buildSystemPrompt } from "@/lib/prompts/system-prompt";
import { siteConfigSchema } from "@/lib/validation/schema";
import type { SiteConfig, UserInput } from "@/types/site-config";

const genai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

const MODEL = "gemini-2.5-pro";

function buildUserPrompt(input: UserInput): string {
  const services = input.services
    .map((s) => `  - ${s.name}: ${s.description}`)
    .join("\n");

  const products = input.products?.length
    ? input.products.map((p) => `  - ${p.name}: ${p.description}`).join("\n")
    : "None";

  const socialLines: string[] = [];
  if (input.socialLinks?.linkedin) socialLines.push(`LinkedIn: ${input.socialLinks.linkedin}`);
  if (input.socialLinks?.twitter) socialLines.push(`Twitter: ${input.socialLinks.twitter}`);
  if (input.socialLinks?.instagram) socialLines.push(`Instagram: ${input.socialLinks.instagram}`);
  if (input.socialLinks?.facebook) socialLines.push(`Facebook: ${input.socialLinks.facebook}`);
  const social = socialLines.length > 0 ? socialLines.join(", ") : "None";

  const whatsapp = input.whatsapp || input.contactPhone || "None";

  return `Generate a complete SiteConfig JSON for:

Company: ${input.companyName}
Industry: ${input.industry}
Tagline: ${input.tagline || "(generate one)"}
Description: ${input.description}
Services:
${services}
Products:
${products}
Location: ${input.city || "N/A"}, ${input.country}
Address: ${input.contactAddress || "N/A"}
Contact: ${input.contactEmail}${input.contactPhone ? `, ${input.contactPhone}` : ""}
WhatsApp: ${whatsapp}
Social: ${social}
Design preference: "${input.designDescription}"
Dark mode: ${input.preferDarkMode ? "Yes" : "No preference"}
Include blog page: ${input.wantBlog ? "Yes - generate a blog page with 3-4 sample posts" : "No"}
Include case studies: ${input.wantCaseStudies ? "Yes - generate a case studies page with 2-3 examples" : "No"}

Pages to generate: Home, About, Services, Contact`;
}

export async function generateSiteConfig(input: UserInput): Promise<SiteConfig> {
  const systemPrompt = buildSystemPrompt();
  const userPrompt = buildUserPrompt(input);

  // First attempt
  const rawJson = await callGemini(systemPrompt, userPrompt);
  const firstResult = validateSiteConfig(rawJson);

  if (firstResult.success) {
    return normalizeSlugs(firstResult.data as SiteConfig);
  }

  // Retry with correction
  const correctionPrompt = `The JSON you generated has validation errors:\n\n${firstResult.error}\n\nFix these errors and return ONLY the corrected JSON — no explanation, no markdown fences.`;

  const correctedJson = await callGemini(
    systemPrompt,
    userPrompt + "\n\n" + correctionPrompt
  );
  const retryResult = validateSiteConfig(correctedJson);

  if (retryResult.success) {
    return normalizeSlugs(retryResult.data as SiteConfig);
  }

  throw new Error(
    `Failed to generate valid SiteConfig after retry. Validation errors:\n${retryResult.error}`
  );
}

async function callGemini(systemPrompt: string, userPrompt: string): Promise<string> {
  const response = await genai.models.generateContent({
    model: MODEL,
    contents: userPrompt,
    config: {
      systemInstruction: systemPrompt,
      temperature: 1,
      maxOutputTokens: 16000,
    },
  });

  const text = response.text;
  if (!text) {
    throw new Error("Gemini response contained no text");
  }

  return text;
}

function validateSiteConfig(raw: string): {
  success: true;
  data: unknown;
} | {
  success: false;
  error: string;
} {
  let parsed: unknown;
  try {
    const cleaned = raw
      .replace(/^```(?:json)?\s*\n?/i, "")
      .replace(/\n?```\s*$/i, "")
      .trim();
    parsed = JSON.parse(cleaned);
  } catch (e) {
    return {
      success: false,
      error: `Invalid JSON: ${e instanceof Error ? e.message : String(e)}`,
    };
  }

  // Pre-validation cleanup: filter out empty formTypes fields
  const obj = parsed as Record<string, unknown>;
  if (obj.pages && Array.isArray(obj.pages)) {
    for (const page of obj.pages as Record<string, unknown>[]) {
      if (page.sections && Array.isArray(page.sections)) {
        for (const section of page.sections as Record<string, unknown>[]) {
          const s = section;

          // Universal defaults for all sections
          if (!s.id) s.id = `${s.type}-${Math.random().toString(36).slice(2, 8)}`;
          if (!s.background) s.background = "primary";
          if (!s.paddingSize) s.paddingSize = "lg";
          if (s.variant === undefined) s.variant = 0;

          // Hero defaults
          if (s.type === "hero") {
            if (!s.headline) s.headline = "Welcome";
            if (!s.description) s.description = "We are here to help.";
            if (!s.cta) s.cta = { primary: { text: "Get Started", href: "/contact" } };
            if (s.showContactInfo === undefined) s.showContactInfo = false;
          }

          // Sections that need a heading
          if (["services", "stats", "testimonials", "faq", "content", "processSteps",
               "featureGrid", "team", "caseStudies", "pricingTable", "gallery",
               "blogList", "products", "contact"].includes(s.type as string)) {
            if (!s.heading) s.heading = s.type === "contact" ? "Contact Us" : "Learn More";
          }

          // CTA defaults
          if (s.type === "cta") {
            if (!s.heading) s.heading = "Get Started Today";
            if (!s.description) s.description = "Reach out to learn more.";
            if (!s.buttons || !Array.isArray(s.buttons) || (s.buttons as unknown[]).length === 0) {
              s.buttons = [{ text: "Contact Us", href: "/contact", style: "primary" }];
            }
          }

          // Stats defaults
          if (s.type === "stats") {
            if (!s.items || !Array.isArray(s.items) || (s.items as unknown[]).length === 0) {
              s.items = [{ value: "100+", label: "Clients" }];
            }
            if (s.animated === undefined) s.animated = true;
          }

          // Services defaults
          if (s.type === "services") {
            if (!s.items || !Array.isArray(s.items) || (s.items as unknown[]).length === 0) {
              s.items = [{ icon: "Briefcase", title: "Our Service", description: "We deliver quality." }];
            }
          }

          // Testimonials defaults
          if (s.type === "testimonials") {
            if (!s.items || !Array.isArray(s.items) || (s.items as unknown[]).length === 0) {
              s.items = [{ quote: "Great service!", name: "John Doe" }];
            }
          }

          // FAQ defaults
          if (s.type === "faq") {
            if (!s.items || !Array.isArray(s.items) || (s.items as unknown[]).length === 0) {
              s.items = [{ question: "How can we help?", answer: "Contact us to learn more." }];
            }
          }

          // ProcessSteps defaults
          if (s.type === "processSteps") {
            if (!s.steps || !Array.isArray(s.steps) || (s.steps as unknown[]).length === 0) {
              s.steps = [{ number: "01", title: "Step One", description: "Get started." }];
            }
          }

          // FeatureGrid defaults
          if (s.type === "featureGrid") {
            if (!s.items || !Array.isArray(s.items) || (s.items as unknown[]).length === 0) {
              s.items = [{ title: "Feature", description: "A great feature." }];
            }
          }

          // Contact defaults
          if (s.type === "contact") {
            if (!s.formFields) s.formFields = [];
            if (s.showContactInfo === undefined) s.showContactInfo = true;
            if (s.showWhatsApp === undefined) s.showWhatsApp = false;
            if (Array.isArray(s.formTypes)) {
              s.formTypes = (s.formTypes as Record<string, unknown>[]).filter(
                (ft) => Array.isArray(ft.fields) && ft.fields.length > 0
              );
            }
          }

          // TrustStrip defaults
          if (s.type === "trustStrip") {
            if (!s.items || !Array.isArray(s.items) || (s.items as unknown[]).length === 0) {
              s.items = [{ icon: "Shield", title: "Trusted", description: "Verified" }];
            }
          }

          // Team defaults
          if (s.type === "team") {
            if (!s.members || !Array.isArray(s.members) || (s.members as unknown[]).length === 0) {
              s.members = [{ name: "Team Member", role: "Role" }];
            }
          }

          // Products defaults
          if (s.type === "products") {
            if (!s.items || !Array.isArray(s.items) || (s.items as unknown[]).length === 0) {
              s.items = [{ name: "Product", description: "Our product." }];
            }
          }

          // PricingTable defaults
          if (s.type === "pricingTable") {
            if (!s.tiers || !Array.isArray(s.tiers) || (s.tiers as unknown[]).length === 0) {
              s.tiers = [{ name: "Basic", price: "$0", description: "Free tier", features: ["Feature 1"], cta: { text: "Get Started", href: "/contact" } }];
            }
          }

          // Gallery defaults
          if (s.type === "gallery") {
            if (!s.items || !Array.isArray(s.items) || (s.items as unknown[]).length === 0) {
              s.items = [{ title: "Project", placeholderGradient: "linear-gradient(135deg, #667eea, #764ba2)" }];
            }
          }

          // BlogList defaults
          if (s.type === "blogList") {
            if (s.showFeatured === undefined) s.showFeatured = true;
            if (!s.posts || !Array.isArray(s.posts) || (s.posts as unknown[]).length === 0) {
              s.posts = [{ slug: "post-1", title: "Blog Post", excerpt: "Read more.", category: "News", date: "2026-01-01", readTime: "3 min" }];
            }
          }

          // CaseStudies defaults
          if (s.type === "caseStudies") {
            if (!s.items || !Array.isArray(s.items) || (s.items as unknown[]).length === 0) {
              s.items = [{ title: "Case Study", industry: "General", challenge: "The challenge.", solution: "Our solution.", results: ["Great results"] }];
            }
          }
        }
      }
    }
  }

  const result = siteConfigSchema.safeParse(parsed);

  if (result.success) {
    return { success: true, data: result.data };
  }

  const errors = result.error.issues
    .slice(0, 10)
    .map((issue) => {
      const path = issue.path.join(".");
      return `- ${path}: ${issue.message}`;
    })
    .join("\n");

  const total = result.error.issues.length;
  const suffix = total > 10 ? `\n... and ${total - 10} more errors` : "";

  return {
    success: false,
    error: errors + suffix,
  };
}

function normalizeSlugs(config: SiteConfig): SiteConfig {
  return {
    ...config,
    pages: config.pages.map((page) => ({
      ...page,
      slug: page.slug === "/" ? "" : page.slug.replace(/^\/+/, ""),
    })),
  };
}
