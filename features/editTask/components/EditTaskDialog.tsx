import { Pencil } from 'lucide-react';

import { EditTaskForm } from './EditTaskForm';

import { Button } from '@/components/ui/button';
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from '@/components/ui/hover-card';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';

import { Task } from '@/types/tasks';

type Props = {
	task: Task;
};

export const EditTaskDialog = ({ task }: Props) => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='ghost' className='hover:bg-none'>
					<HoverCard>
						<HoverCardTrigger>
							<Pencil className='hover:scale-110 hover:cursor-pointer transition-all' />
						</HoverCardTrigger>
						<HoverCardContent
							className='bg-secondary border-primary text-white text-center text-lg'
							align='center'
							sideOffset={20}>
							Edit this task.
						</HoverCardContent>
					</HoverCard>
				</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[625px] bg-secondary'>
				<DialogHeader>
					<DialogTitle>Edit this task</DialogTitle>
					<DialogDescription>
						Edit this task to save it to your list.
					</DialogDescription>
				</DialogHeader>
				<EditTaskForm task={task} />
			</DialogContent>
		</Dialog>
	);
};
