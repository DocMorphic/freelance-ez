import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { generateSiteConfig } from "@/lib/ai";
import { supabase } from "@/lib/supabase";
import { userInputSchema } from "@/lib/validation/schema";

export async function POST(request: Request) {
  try {
    // Get authenticated user
    const cookieStore = await cookies();
    const supabaseAuth = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll() {},
        },
      }
    );

    const { data: { user } } = await supabaseAuth.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

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

    // Generate SiteConfig via Gemini API
    const config = await generateSiteConfig(input);

    // Save to Supabase with user_id
    const { data, error } = await supabase
      .from("sites")
      .insert({
        name: input.companyName,
        config,
        user_id: user.id,
      })
      .select()
      .single();

    if (error) {
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
