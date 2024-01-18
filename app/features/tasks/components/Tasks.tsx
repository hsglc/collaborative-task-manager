import { Task } from '@/app/features/tasks/components/Task';

import { Task as NewTask } from '@/types/tasks';
import NoTask from './NoTask';

type Props = {
	tasks: NewTask[];
};

export const Tasks = ({ tasks }: Props) => {
	return (
		<div className='col-span-6  p-4 space-y-8 max-h-max overflow-scroll'>
			<h2 className='text-xl font-medium'>All Tasks ({tasks?.length})</h2>
			{tasks.length > 0 ? (
				tasks?.map((task) => <Task key={task.id} task={task} />)
			) : (
				<NoTask />
			)}
		</div>
	);
};
