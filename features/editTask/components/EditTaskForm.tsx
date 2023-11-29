'use client';

import { useEffect, useState } from 'react';

import { editTask } from '@/features/editTask/actions/editTaskAction';
import { fetchFriends } from '@/features/friendship/actions/fetchFriends';

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

import { Task } from '@/types/tasks';
import { Friendship } from '@/types/friends';
import { DatePickerWithRange } from '@/components/DatePickerWithRange';

type Props = {
	task: Task;
};

export function EditTaskForm({ task }: Props) {
	const [friends, setFriends] = useState<Friendship[]>([]);

	useEffect(() => {
		(async () => {
			const friends = await fetchFriends();
			if (friends) setFriends(friends);
		})();
	}, []);

	return (
		<form
			className='text-white text-lg space-y-4'
			action={(formData: FormData) =>
				editTask(formData, task.id, task.created_by)
			}>
			<Label className='flex flex-col gap-2'>
				Name
				<Input
					name='name'
					className='text-black'
					defaultValue={task.name}
				/>
			</Label>
			<Label className='flex flex-col gap-2'>
				Description
				<Input
					name='description'
					className='text-black'
					defaultValue={task.description}
				/>
			</Label>

			<Label className='flex flex-col gap-2'>
				Priority
				<Select name='priority' defaultValue={task.priority}>
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
				<Select name='status' defaultValue={task.status}>
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
			<Label className='flex flex-col gap-2'>
				Assignee
				<Select name='assignee' defaultValue={task.assignee}>
					<SelectTrigger className='w-full text-black'>
						<SelectValue placeholder='Select the Assignee' />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectLabel>Assignee</SelectLabel>
							{friends?.map((friend) => (
								<SelectItem
									key={friend.profiles.id}
									value={friend.profiles.id.toString()}>
									{friend.profiles.user_email}
								</SelectItem>
							))}
						</SelectGroup>
					</SelectContent>
				</Select>
			</Label>

			<Label className='flex flex-col gap-2'>
				Selete Time Range
				<DatePickerWithRange />
			</Label>
			<TaskActionButton type='edit' />
		</form>
	);
}
