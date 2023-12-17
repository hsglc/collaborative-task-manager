import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { fetchTasks } from "@/app/features/tasks/actions/fetchTasks";

import { Sidebar } from "@/app/components/Sidebar";
import { Tasks } from "@/app/features/tasks/components/Tasks";

export default async function DashboardIndex({
	searchParams,
}: {
	searchParams: { [key: string]: string };
}) {
	const cookieStore = cookies();

	const supabase = createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			cookies: {
				get(name: string) {
					return cookieStore.get(name)?.value;
				},
			},
		},
	);

	const {
		data: { session },
	} = await supabase.auth.getSession();
	if (!session) {
		redirect("/login");
	}

	const { tasks, numberOfTasks } = await fetchTasks(
		searchParams.search ?? "all",
	);

	return (
		<div className="grid grid-cols-9 h-screen max-h-[calc(100vh-64px)]">
			<Sidebar numberOfTasks={numberOfTasks} />
			<Tasks tasks={tasks ?? []} />
		</div>
	);
}
