import { Task } from '@/components/Task';

import { fetchTasks } from '@/lib/supabase/fetchTasks';

import { Notifications, Sidebar, Tasks } from '@/components/containers';

type Props = {
	search: string;
};

export const Dashboard = async ({ search }: Props) => {
	const { tasks, numberOfTasks } = await fetchTasks(search);
	return (
		<div className='grid grid-cols-9 h-screen max-h-[calc(100vh-64px)]'>
			<Sidebar numberOfTasks={numberOfTasks} />
			<Tasks tasks={tasks ?? []} />

			<Notifications />
		</div>
	);
};
