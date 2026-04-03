import { NextResponse } from "next/server";
import { generateSiteConfig } from "@/lib/ai";
import { supabase } from "@/lib/supabase";
import { userInputSchema } from "@/lib/validation/schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate input
    const parsed = userInputSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.issues },
        { status: 400 }
      );
    }

    const input = parsed.data;

    // Generate SiteConfig via Claude API
    const config = await generateSiteConfig(input);

    // Save to Supabase
    const { data, error } = await supabase
      .from("sites")
      .insert({
        name: input.companyName,
        config,
      })
      .select()
      .single();

    if (error) {
      // If Supabase fails, still return the config (just without persistence)
      console.error("Supabase save error:", error);
      return NextResponse.json({
        siteId: config.id,
        config,
        persisted: false,
      });
    }

    return NextResponse.json({
      siteId: data.id,
      config: data.config,
      persisted: true,
    });
  } catch (err) {
    console.error("Generation error:", err);
    const message = err instanceof Error ? err.message : "Generation failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
