import { Task } from '@/components/Task';

type Props = {
	tasks: {
		id: number;
		name: string;
		description: string;
		assignee: string;
		createdBy: string;
		createdAt: string;
		priority: 'Low' | 'Medium' | 'High';
		status: string;
	}[];
};

export const Tasks = ({ tasks }: Props) => {
	return (
		<div className='col-span-5 bg-primary p-4 space-y-8 max-h-max overflow-scroll'>
			<h2 className='text-xl font-medium'>All Tasks ({tasks?.length})</h2>
			{tasks?.map((task) => (
				<Task key={task.id} data={task} />
			))}
		</div>
	);
};

