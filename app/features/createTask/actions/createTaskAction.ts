"use server";

import { CookieOptions, createServerClient } from "@supabase/ssr";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { z } from "zod";

type PrevState = {
	message: string;
};

export async function createTask(prevState: PrevState, formData: FormData) {
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

	const formSchema = z.object({
		name: z.string().trim().min(2).max(50),
		description: z.string().trim().min(2).max(250),
		priority: z.string(),
		status: z.string(),
		assignee: z.string() ?? (user?.id as string),
		created_by: z.string(),
	});

	const createdTask = {
		name: formData.get("name"),
		description: formData.get("description"),
		priority: formData.get("priority"),
		status: formData.get("status"),
		assignee: formData.get("assignee") || (user?.id as string),
		created_by: user?.id as string,
	};

	const data = formSchema.parse(createdTask);

	const { error } = await supabase.from("tasks").insert([data]);
	if (error) {
		return {
			message: "Failed to create task",
		};
	}
	revalidatePath("/dashboard");
}
