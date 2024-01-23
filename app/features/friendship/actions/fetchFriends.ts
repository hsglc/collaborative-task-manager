"use server";

import type { Friendship } from "@/types/friends";
import { CookieOptions, createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function fetchFriends() {
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

	const {
		data: { user },
	} = await supabase.auth.getUser();

	const [receivedInvitations, sentInvitations] = await Promise.all([
		supabase
			.from("friends")
			.select(
				`
	  user_id,
	  id,
	  status,
	  profiles!friends_user_id_fkey (
		id,
		user_email,
		avatar_url,
		full_name
	  )
	`,
			)
			.eq("friend_id", user?.id)
			.neq("status", "Rejected")
			.returns<Friendship[]>(),
		supabase
			.from("friends")
			.select(
				`
	  user_id,
	  status,
	  id,
	  profiles!friends_friend_id_fkey (
		id,
		user_email,
		avatar_url,
		full_name
	  )
	`,
			)
			.eq("user_id", user?.id)
			.neq("status", "Rejected")
			.returns<Friendship[]>(),
	]);

	const acceptedFriendshipRequests = sentInvitations.data?.filter(
		(val) => val.status === "Accepted",
	);
	const acceptedFriendshipRequests2 = receivedInvitations.data?.filter(
		(val) => val.status === "Accepted",
	);

	if (acceptedFriendshipRequests && acceptedFriendshipRequests2) {
		const mergedRequests = [
			...acceptedFriendshipRequests,
			...acceptedFriendshipRequests2,
		];
		const unique = mergedRequests.filter(
			(v, i, a) => a.findIndex((t) => t.profiles.id === v.profiles.id) === i,
		);
		return {
			sendingFriendshipRequests: sentInvitations.data?.filter(
				(val) => val.status === "Pending",
			),
			receivingFriendshipRequests: receivedInvitations.data?.filter(
				(val) => val.status === "Pending",
			),
			acceptedFriendshipRequests: unique,
		};
	}
}
