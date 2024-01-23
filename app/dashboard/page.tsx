import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { fetchTasks } from "@/app/features/tasks/actions/fetchTasks";

import { Sidebar } from "@/app/components/Sidebar";
import { Tasks } from "@/app/features/tasks/components/Tasks";

type searchParams = {
	category: "myTasks" | "sharedByOthers" | "sharedWithMe";
	search: "important" | "completed" | "uncompleted";
};

export default async function DashboardIndex({
	searchParams,
}: {
	searchParams: searchParams;
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

	const { category, search } = searchParams;

	const tasks = await fetchTasks();

	const categorizedTasks =
		category === "myTasks"
			? tasks.myTasks
			: category === "sharedByOthers"
			  ? tasks.sharedByOthers
			  : tasks.sharedWithMe;
	const searchedTasks =
		search === "important"
			? categorizedTasks.filter((task) => task.priority === "High")
			: search === "completed"
			  ? categorizedTasks.filter((task) => task.status === "Done")
			  : categorizedTasks.filter((task) => task.status !== "Done");

	return (
		<div className="grid grid-cols-9 h-screen max-h-[calc(100vh-64px)]">
			<Sidebar tasks={tasks} />
			<Tasks tasks={searchedTasks} search={search} />
		</div>
	);
}
