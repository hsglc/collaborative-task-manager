'use client';

import { createTask } from '@/actions/createTask';

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
import { SubmitTodoButton } from './SubmitTodoButton';
import { useState } from 'react';

export function CreateTaskForm() {

	return (
		<form className='text-white text-lg' action={createTask}>
			<Label>
				Name
				<Input name='name' className='text-black' />
			</Label>
			<Label>
				Description
				<Input name='description' className='text-black' />
			</Label>

			<Label>
				Priority
				<Select name='priority'>
					<SelectTrigger className='w-full text-black'>
						<SelectValue placeholder='Select the priority' />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectLabel>Priority</SelectLabel>
							<SelectItem value='1'>Low</SelectItem>
							<SelectItem value='2'>Medium</SelectItem>
							<SelectItem value='3'>High</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
			</Label>
			<SubmitTodoButton />
		</form>
	);
}
