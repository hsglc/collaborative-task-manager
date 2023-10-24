'use client';

import { format, parseISO } from 'date-fns';
import { Calendar, Trash2, Pencil } from 'lucide-react';

import { deleteTask } from '@/lib/supabase/deleteTask';
import { Button } from '@/components/ui/button';

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
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

import { TaskPriority } from './TaskPriority';
import { EditTaskForm } from './EditTaskForm';

type Props = {
	data: {
		id: number;
		name: string;
		description: string;
		createdAt: string;
		priority: 'Low' | 'Medium' | 'High';
		status: string;
	};
};

export const Task = ({ data }: Props) => {
	const date = parseISO(data.createdAt);
	const formattedDate = format(date, 'dd/MM/yyyy');

	return (
		<div className='rounded-md p-4 bg-upcoming shadow-sm space-y-3'>
			<h4 className='text-2xl font-semibold text-white'>{data.name}</h4>
			<div className='flex-center justify-between'>
				<p>{data.description}</p>
				<div className='flex-center gap-4'>
					<TaskPriority priority={data.priority} />
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
							<EditTaskForm data={data} />
						</DialogContent>
					</Dialog>

					<AlertDialog>
						<AlertDialogTrigger>
							<HoverCard>
								<HoverCardTrigger>
									<Trash2 className='hover:scale-110 hover:cursor-pointer  transition-all ' />
								</HoverCardTrigger>
								<HoverCardContent
									className='bg-secondary border-primary text-white text-center text-lg'
									align='center'
									sideOffset={20}>
									Delete this task.
								</HoverCardContent>
							</HoverCard>
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle className='text-2xl'>
									Are you absolutely sure?
								</AlertDialogTitle>
								<AlertDialogDescription className='text-white text-lg'>
									This action cannot be undone. This will
									permanently delete your task.
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel>Cancel</AlertDialogCancel>
								<AlertDialogAction
									onClick={() => deleteTask(data.id)}>
									Delete
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				</div>
			</div>
			<div className='flex-center gap-2'>
				<Calendar />
				{formattedDate}
			</div>
		</div>
	);
};
