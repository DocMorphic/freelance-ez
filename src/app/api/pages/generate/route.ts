import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import type { PageConfig } from "@/types/site-config";

const genai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export async function POST(request: Request) {
  try {
    const { prompt, companyName, industry } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: "prompt is required" }, { status: 400 });
    }

    const systemPrompt = `You generate a single page config JSON for a website builder. The page is for "${companyName}" (${industry}).

Output a JSON object with this structure:
{
  "id": "unique-id",
  "slug": "page-slug-no-leading-slash",
  "title": "Page Title",
  "description": "Meta description",
  "sections": [
    // Each section needs: id, type, variant, background ("primary"|"secondary"), paddingSize ("md"|"lg")
    // Start with a hero section (type: "hero", variant: 1)
    // End with a cta section (type: "cta", variant: 0)
    // Add 1-3 relevant sections in between
  ]
}

Section types available: hero, stats, services, products, testimonials, faq, cta, content, processSteps, featureGrid, trustStrip, team, caseStudies, pricingTable, gallery, blogList.

Output ONLY valid JSON. No markdown, no code fences.`;

    const response = await genai.models.generateContent({
      model: "gemini-2.5-pro",
      contents: `Generate a page for: ${prompt}`,
      config: {
        systemInstruction: systemPrompt,
        temperature: 1,
        maxOutputTokens: 4000,
      },
    });

    const text = response.text || "";
    const cleaned = text.replace(/^```(?:json)?\s*\n?/i, "").replace(/\n?```\s*$/i, "").trim();
    const page = JSON.parse(cleaned) as PageConfig;

    return NextResponse.json(page);
  } catch (err) {
    console.error("Page generation error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to generate page" },
      { status: 500 }
    );
  }
}
