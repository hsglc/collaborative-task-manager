"use server";

import { CookieOptions, createServerClient } from "@supabase/ssr";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { z } from "zod";

type PrevState = {
	message: string;
	isSuceess: boolean;
};

export async function editTask(prevState: PrevState, formData: FormData) {
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

	const formSchema = z.object({
		name: z.string().trim().min(2).max(50),
		description: z.string().trim().min(2).max(250),
		priority: z.string(),
		status: z.string(),
	});

	const updatedTask = {
		name: formData.get("name"),
		description: formData.get("description"),
		priority: formData.get("priority"),
		status: formData.get("status"),
	};

	const data = formSchema.parse(updatedTask);

	const { error } = await supabase
		.from("tasks")
		.update({
			name: data.name,
			description: data.description,
			priority: data.priority,
			status: data.status,
		})
		.eq("id", formData.get("id"));

	if (error) {
		return {
			message: "Failed to edit task",
			isSuccess: true,
		};
	}

	revalidatePath("/dashboard");
}
