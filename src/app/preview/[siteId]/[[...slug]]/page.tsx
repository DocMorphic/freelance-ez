import SiteRenderer from "@/components/template/SiteRenderer";
import { TEST_CONFIG } from "@/lib/test-config";
import { supabase } from "@/lib/supabase";
import type { SiteConfig } from "@/types/site-config";

export default async function PreviewPage({
  params,
}: {
  params: Promise<{ siteId: string; slug?: string[] }>;
}) {
  const { siteId, slug } = await params;
  const pageSlug = slug?.[0] ?? "";

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
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "1rem",
            fontFamily: "var(--font)",
          }}
        >
          <h1 style={{ fontSize: "1.25rem", fontWeight: 600 }}>Site not found</h1>
          <p style={{ color: "#666", fontSize: "0.9rem" }}>
            The site &ldquo;{siteId}&rdquo; could not be loaded.
          </p>
          <a
            href="/create"
            style={{
              padding: "0.5rem 1.5rem",
              background: "#111",
              color: "#fff",
              borderRadius: "8px",
              fontSize: "0.9rem",
              marginTop: "0.5rem",
            }}
          >
            Create a new site
          </a>
        </div>
      );
    }

    config = data.config as SiteConfig;
  }

  return <SiteRenderer config={config} currentPageSlug={pageSlug} siteId={siteId} />;
}
