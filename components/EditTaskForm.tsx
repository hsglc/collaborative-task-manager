import { editTask } from '@/lib/supabase/editTask';

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
import { TaskActionButton } from './TaskActionButton';

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

export function EditTaskForm({ data }: Props) {
	return (
		<form
			className='text-white text-lg space-y-4'
			action={(formData: FormData) => editTask(formData, data.id)}>
			<Label className='flex flex-col gap-2'>
				Name
				<Input
					name='name'
					className='text-black'
					defaultValue={data.name}
				/>
			</Label>
			<Label className='flex flex-col gap-2'>
				Description
				<Input
					name='description'
					className='text-black'
					defaultValue={data.description}
				/>
			</Label>

			<Label className='flex flex-col gap-2'>
				Priority
				<Select name='priority' defaultValue={data.priority}>
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
				<Select name='status' defaultValue={data.status}>
					<SelectTrigger className='w-full text-black'>
						<SelectValue placeholder='Select the status' />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectLabel>Status</SelectLabel>
							<SelectItem value='Todo'>Todo</SelectItem>
							<SelectItem value='In Progress'>
								In Progress
							</SelectItem>
							<SelectItem value='Completed'>Completed</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
			</Label>
			<TaskActionButton type='edit' />
		</form>
	);
}
