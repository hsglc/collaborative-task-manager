'use server';

import { CookieOptions, createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function fetchTasks(search: string) {
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
					cookieStore.set({ name, value: '', ...options });
				},
			},
		}
	);
	const {
		data: { session },
	} = await supabase.auth.getSession();

	const { data: tasks } = await supabase
		.from('tasks')
		.select('*')
		.order('created_at', { ascending: false })
		.or(
			`created_by.eq.${session?.user.id},assignee.eq.${session?.user.id}`
		);

	const tasksWithHighPriority = tasks?.filter(
		(task) => task.priority === 'High'
	);
	const completedTasks = tasks?.filter((task) => task.status === 'Done');
	const uncompletedTasks = tasks?.filter((task) => task.status !== 'Done');
	const assignedTasks = tasks?.filter(
		(task) =>
			task.assignee === session?.user.id &&
			task.created_by !== session?.user.id
	);

	const sharedTasks = tasks?.filter(
		(task) =>
			(task.assignee === session?.user.id &&
				task.created_by !== session?.user.id) ||
			(task.created_by === session?.user.id &&
				task.assignee !== session?.user.id)
	);

	const filteredTasks =
		search === 'all'
			? tasks
			: search === 'important'
			? tasksWithHighPriority
			: search === 'completed'
			? completedTasks
			: search === 'shared'
			? sharedTasks
			: uncompletedTasks;

	return {
		tasks: filteredTasks,
		numberOfTasks: {
			tasksNumber: tasks?.length,
			importantTasksNumber: tasksWithHighPriority?.length,
			completedTasksNumber: completedTasks?.length,
			uncompletedTasksNumber: uncompletedTasks?.length,
			assignedTasksNumber: assignedTasks?.length,
			sharedTasksNumber: sharedTasks?.length,
		},
	};
}
