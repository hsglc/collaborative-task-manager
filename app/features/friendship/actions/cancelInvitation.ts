"use server";

import type { Friend } from "@/types/friends";
import { CookieOptions, createServerClient } from "@supabase/ssr";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function cancelInvitation(id: number) {
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: "", ...options });
        },
      },
    },
  );

  const { data } = await supabase.from("friends").select("*").eq("id", id).returns<Friend[]>();

  if (data) {
    await Promise.all([
      supabase
        .from("friends")
        .update({
          status: "Rejected",
        })
        .eq("id", id),
      supabase.from("notifications").insert({
        is_read: false,
        sender_id: data[0].friend_id,
        target_id: data[0].user_id,
        type: "Friendship Rejected",
      }),
    ]);
  }

  revalidatePath("/friends");
  return {
    message: "Invitation canceled!",
  };
}
