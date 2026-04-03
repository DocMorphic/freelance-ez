import EditorShell from "@/components/editor/EditorShell";
import { TEST_CONFIG } from "@/lib/test-config";
import { supabase } from "@/lib/supabase";
import type { SiteConfig } from "@/types/site-config";

export default async function EditorPage({
  params,
}: {
  params: Promise<{ siteId: string }>;
}) {
  const { siteId } = await params;

  let config: SiteConfig;

  if (siteId === "test") {
    config = TEST_CONFIG;
  } else {
    const { data, error } = await supabase
      .from("sites")
      .select("config")
      .eq("id", siteId)
      .single();

    if (error || !data) {
      return (
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "1rem" }}>
          <h1 style={{ fontSize: "1.25rem", fontWeight: 600 }}>Site not found</h1>
          <a href="/dashboard" style={{ padding: "0.5rem 1.5rem", background: "#635bff", color: "#fff", borderRadius: "8px", fontSize: "0.9rem" }}>
            Back to Dashboard
          </a>
        </div>
      );
    }

    config = data.config as SiteConfig;
  }

  return <EditorShell config={config} siteId={siteId} />;
}
