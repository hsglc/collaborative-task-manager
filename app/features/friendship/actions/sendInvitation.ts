"use server";

import { CookieOptions, createServerClient } from "@supabase/ssr";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { z } from "zod";

type PrevState = {
	title: string;
	message: string;
	isSuccess: boolean;
};

export async function sendInvitation(prevState: PrevState, formData: FormData) {
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

	const newFriendEmail = formData.get("user_email");

	const formSchema = z.string().email();

	const validatedEmail = formSchema.parse(newFriendEmail);

	const { data: friend } = await supabase
		.from("profiles")
		.select("id")
		.eq("user_email", validatedEmail);

	if (friend?.length === 0 || !friend) {
		return {
			title: "Error",
			message: "User not found",
			isSuccess: false,
		};
	}

	const { data: existingFriend } = await supabase
		.from("friends")
		.select("friend_id")
		.eq("friend_id", friend[0].id)
		.eq("user_id", user?.id)
		.eq("status", "Pending");

	if (existingFriend?.length !== 0) {
		return {
			title: "Error",
			message: "Your invitation is already pending.",
			isSuccess: false,
		};
	}

	const { error } = await supabase
		.from("friends")
		.insert([{ user_id: user?.id, friend_id: friend[0].id }]);

	if (error) {
		return {
			title: "Error",
			message: "Failed to send invitation",
			isSuccess: false,
		};
	}
	await supabase.from("notifications").insert([
		{
			sender_id: user?.id,
			target_id: friend[0].id,
			type: "Friendship Request",
		},
	]);
	revalidatePath("/friends");
	return {
		title: "Success",
		message: "Invitation sent",
		isSuccess: true,
	};
}
