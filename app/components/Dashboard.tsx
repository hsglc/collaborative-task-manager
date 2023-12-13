import { fetchTasks } from "@/app/features/tasks/actions/fetchTasks";

import { Sidebar } from "@/app/components/Sidebar";
import { Tasks } from "@/app/features/tasks/components/Tasks";

type Props = {
	search: string;
};

export const Dashboard = async ({ search }: Props) => {
	const { tasks, numberOfTasks } = await fetchTasks(search);
	return (
		<div className="grid grid-cols-9 h-screen max-h-[calc(100vh-64px)]">
			<Sidebar numberOfTasks={numberOfTasks} />
			<Tasks tasks={tasks ?? []} />
		</div>
	);
};
