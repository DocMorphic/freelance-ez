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
          if (section.type === "contact" && Array.isArray(section.formTypes)) {
            section.formTypes = (section.formTypes as Record<string, unknown>[]).filter(
              (ft) => Array.isArray(ft.fields) && ft.fields.length > 0
            );
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
