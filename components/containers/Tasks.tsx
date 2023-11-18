import { Task } from '@/components/Task';

import { Task as NewTask } from '@/types/tasks';

type Props = {
	tasks: NewTask[];
};

export const Tasks = ({ tasks }: Props) => {
	return (
		<div className='col-span-6 bg-primary p-4 space-y-8 max-h-max overflow-scroll'>
			<h2 className='text-xl font-medium'>All Tasks ({tasks?.length})</h2>
			{tasks?.map((task) => (
				<Task key={task.id} task={task} />
			))}
		</div>
	);
};
