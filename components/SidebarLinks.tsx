'use client';

import { cn } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';

type Props = {
	numberOfTasks: {
		tasksNumber?: number;
		importantTasksNumber?: number;
		completedTasksNumber?: number;
		uncompletedTasksNumber?: number;
	};
};

export const SidebarLinks = ({ numberOfTasks }: Props) => {
	const {
		tasksNumber,
		completedTasksNumber,
		importantTasksNumber,
		uncompletedTasksNumber,
	} = numberOfTasks;

	const buttons = {
		all: {
			name: 'All tasks',
			search: 'all',
			sizeOfTasks: tasksNumber,
		},
		important: {
			name: 'Important tasks',
			search: 'important',
			sizeOfTasks: importantTasksNumber,
		},
		complemeted: {
			name: 'Completed tasks',
			search: 'completed',
			sizeOfTasks: completedTasksNumber,
		},
		uncompleted: {
			name: 'Uncompleted tasks',
			search: 'uncompleted',
			sizeOfTasks: uncompletedTasksNumber,
		},
	};

	const { push } = useRouter();
	const searchParams = useSearchParams().get('search');

	return (
		<div className='flex flex-col gap-4 items-start'>
			{Object.keys(buttons).map((key) => {
				const { name, search, sizeOfTasks } =
					buttons[key as keyof typeof buttons];
				return (
					<button
						key={key}
						onClick={() => push(`/dashboard?search=${search}`)}
						className={cn(
							'text-[#8D90B1] hover:bg-next hover:text-white w-full text-lg text-start p-2 transition-all relative flex items-center',
							searchParams === search ? 'bg-next text-white' : ''
						)}>
						{name} ({sizeOfTasks})
						{searchParams === search ? <span className='absolute right-0 bg-white w-1 h-full'/> : null}
					</button>
				);
			})}
		</div>
	);
};
