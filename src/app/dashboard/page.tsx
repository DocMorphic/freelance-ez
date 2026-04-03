import { redirect } from "next/navigation";
import { createServerSupabase } from "@/lib/supabase-server";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
  const supabase = await createServerSupabase();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: sites } = await supabase
    .from("sites")
    .select("id, name, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <DashboardClient
      user={{ email: user.email ?? "" }}
      sites={sites ?? []}
    />
  );
}
