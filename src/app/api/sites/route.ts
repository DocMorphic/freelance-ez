import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// POST — create a new site
export async function POST(request: Request) {
  const body = await request.json();
  const { name, config } = body;

  if (!name || !config) {
    return NextResponse.json({ error: "name and config are required" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("sites")
    .insert({ name, config })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

// GET — list all sites
export async function GET() {
  const { data, error } = await supabase
    .from("sites")
    .select("id, name, created_at, updated_at")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
