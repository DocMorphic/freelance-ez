"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";
import ToastProvider from "@/components/platform/ToastProvider";

export default function Providers({ children }: { children: ReactNode }) {
  const router = useRouter();

  // Listen for auth state changes — keeps session alive across tabs/refreshes
  useEffect(() => {
    const supabase = createClient();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event) => {
        if (event === "SIGNED_OUT") {
          router.push("/login");
        }
        // On TOKEN_REFRESHED or SIGNED_IN, the browser client
        // automatically updates the cookies — no action needed
      }
    );

    return () => subscription.unsubscribe();
  }, [router]);

  return <ToastProvider>{children}</ToastProvider>;
}
