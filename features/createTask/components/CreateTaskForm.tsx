import { createTask } from '@/features/createTask/actions/createTaskAction';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

import { TaskActionButton } from '../../../components/TaskActionButton';

export function CreateTaskForm() {
	return (
		<form className='text-white text-lg space-y-4' action={createTask}>
			<Label className='flex flex-col gap-2'>
				Name
				<Input name='name' className='text-black' />
			</Label>
			<Label className='flex flex-col gap-2'>
				Description
				<Input name='description' className='text-black' />
			</Label>

			<Label className='flex flex-col gap-2'>
				Priority
				<Select name='priority'>
					<SelectTrigger className='w-full text-black'>
						<SelectValue placeholder='Select the priority' />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectLabel>Priority</SelectLabel>
							<SelectItem value='Low'>Low</SelectItem>
							<SelectItem value='Medium'>Medium</SelectItem>
							<SelectItem value='High'>High</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
			</Label>
			<Label className='flex flex-col gap-2'>
				Status
				<Select name='status'>
					<SelectTrigger className='w-full text-black'>
						<SelectValue placeholder='Select the status' />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectLabel>Status</SelectLabel>
							<SelectItem value='Backlog'>Backlog</SelectItem>
							<SelectItem value='In Progress'>
								In Progress
							</SelectItem>
							<SelectItem value='Waiting Approval'>
								Waiting Approval
							</SelectItem>

							<SelectItem value='Done'>Done</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
			</Label>
			<TaskActionButton type='create' />
		</form>
	);
}
