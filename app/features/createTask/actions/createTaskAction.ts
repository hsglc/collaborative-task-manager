"use server";

import { CookieOptions, createServerClient } from "@supabase/ssr";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { z } from "zod";
import { formSchema } from "../schema";

type Params = z.infer<typeof formSchema>;

export async function createTask(data: Params) {
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

	const result = formSchema.safeParse(data);

	if (!result.success || !user) {
		return {
			message: "Failed to create task",
			isSuccess: false,
		};
	}

	result.data.created_by = user?.id;
	if (result.data.assignee === "") {
		result.data.assignee = user?.id;
	}

	const { error } = await supabase.from("tasks").insert([result.data]);
	if (error) {
		return {
			message: "Failed to create task",
			isSuccess: false,
		};
	}

	if (data.assignee !== "") {
		await supabase.from("notifications").insert([
			{
				sender_id: user?.id,
				target_id: data.assignee,
				type: "New Task Assigned",
			},
		]);
	}

	revalidatePath("/dashboard");

	return {
		message: "Task created successfully",
		isSuccess: true,
	};
}
