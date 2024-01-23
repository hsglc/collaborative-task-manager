"use server";

import type { Task } from "@/types/tasks";
import { CookieOptions, createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function fetchTasks() {
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
		data: { session },
	} = await supabase.auth.getSession();

	const { data: tasks } = await supabase
		.from("tasks")
		.select("*")
		.order("created_at", { ascending: false })
		.or(`created_by.eq.${session?.user.id},assignee.eq.${session?.user.id}`)
		.returns<Task[]>();
	const myTasks = tasks?.filter(
		(task) =>
			task.created_by === session?.user.id &&
			task.assignee === session?.user.id,
	);
	const sharedByOthers = tasks?.filter(
		(task) =>
			task.created_by === session?.user.id &&
			task.assignee !== session?.user.id,
	);

	const sharedWithMe = tasks?.filter(
		(task) =>
			task.created_by !== session?.user.id &&
			task.assignee === session?.user.id,
	);

	if (!myTasks || !sharedByOthers || !sharedWithMe) {
		return {
			myTasks: [],
			sharedByOthers: [],
			sharedWithMe: [],
		};
	}

	return {
		myTasks,
		sharedByOthers,
		sharedWithMe,
	};
}
