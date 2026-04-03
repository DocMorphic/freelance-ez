import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// GET — read a single site config
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ siteId: string }> }
) {
  const { siteId } = await params;

  const { data, error } = await supabase
    .from("sites")
    .select("*")
    .eq("id", siteId)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }

  return NextResponse.json(data);
}

// PUT — update a site config
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ siteId: string }> }
) {
  const { siteId } = await params;
  const body = await request.json();
  const { config } = body;

  if (!config) {
    return NextResponse.json({ error: "config is required" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("sites")
    .update({ config, updated_at: new Date().toISOString() })
    .eq("id", siteId)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
