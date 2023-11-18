import { CreateTaskForm } from '@/features/createTask/components/CreateTaskForm';

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export const CreateTaskDialog = () => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					variant='outline'
					className='text-primaryYellow w-full font-semibold text-lg p-6'>
					New Task
				</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[625px] bg-secondary color-white'>
				<DialogHeader>
					<DialogTitle>Create a new task</DialogTitle>
					<DialogDescription>
						Create a new task to save it to your list
					</DialogDescription>
				</DialogHeader>
				<CreateTaskForm />
			</DialogContent>
		</Dialog>
	);
};
