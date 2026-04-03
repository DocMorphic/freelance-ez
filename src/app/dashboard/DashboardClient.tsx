"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase-browser";
import styles from "./dashboard.module.css";

interface Site {
  id: string;
  name: string;
  created_at: string;
}

interface DashboardClientProps {
  user: { email: string };
  sites: Site[];
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function DashboardClient({
  user,
  sites,
}: DashboardClientProps) {
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/login";
  }

  async function handleDelete(siteId: string, siteName: string) {
    if (!window.confirm(`Delete "${siteName}"? This cannot be undone.`)) return;
    await fetch(`/api/sites/${siteId}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <div className={styles.page}>
      <nav className={styles.nav}>
        <Link href="/dashboard" className={styles.navBrand}>
          freelance<span>-ez</span>
        </Link>
        <div className={styles.navRight}>
          <span className={styles.userEmail}>{user.email}</span>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            Log out
          </button>
        </div>
      </nav>

      <main className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.title}>Your Sites</h1>
          {sites.length > 0 && (
            <Link href="/create" className={styles.newSiteBtn}>
              + New Site
            </Link>
          )}
        </div>

        {sites.length === 0 ? (
          <div className={styles.empty}>
            <h2 className={styles.emptyTitle}>No sites yet</h2>
            <p className={styles.emptyText}>
              Create your first professional website in minutes with AI.
            </p>
            <Link href="/create" className={styles.emptyBtn}>
              Create Your First Site
            </Link>
          </div>
        ) : (
          <div className={styles.grid}>
            {sites.map((site) => (
              <div key={site.id} className={styles.card}>
                <h3 className={styles.cardName}>{site.name}</h3>
                <p className={styles.cardDate}>
                  Created {formatDate(site.created_at)}
                </p>
                <div className={styles.cardActions}>
                  <Link
                    href={`/editor/${site.id}`}
                    className={styles.cardLink}
                  >
                    Edit &rarr;
                  </Link>
                  <Link
                    href={`/preview/${site.id}`}
                    target="_blank"
                    className={styles.previewLink}
                  >
                    Preview
                  </Link>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => handleDelete(site.id, site.name)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
