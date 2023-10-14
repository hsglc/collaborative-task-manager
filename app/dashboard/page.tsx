import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';

import { LogOut, Settings, User, UserPlus, Users } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';

import LogoutButton from '@/components/LogoutButton';
import { CreateTaskForm } from '@/components/CreateTaskForm';

export default async function DashboardIndex() {
	const supabase = createServerComponentClient({ cookies });
	const {
		data: { session },
	} = await supabase.auth.getSession();
	if (!session) {
		redirect('/login');
	}

	let { data: tasks } = await supabase
		.from('todo')
		.select('*')
		.eq('assignee', session.user.id);

	const tasksNumber = tasks?.length;

	const importantTasksNumber = tasks?.filter(
		(task) => task.priority === 3
	).length;

	const todaysTasksNumber = tasks?.filter((task) => {
		const today = new Date();
		const taskDate = new Date(task.createdAt);
		return taskDate.getDate() === today.getDate();
	}).length;

	return (
		<div className='grid grid-cols-9 h-screen max-h-[calc(100vh-64px)]'>
			<div className='col-span-2 bg-secondary h-full p-4 flex flex-col justify-between'>
				<div className='space-y-12'>
					<Dialog>
						<DialogTrigger asChild>
							<Button
								variant='outline'
								className='text-primaryYellow w-full font-semibold text-lg p-6'>
								New Task
							</Button>
						</DialogTrigger>
						<DialogContent className='sm:max-w-[425px] bg-secondary color-white'>
							<DialogHeader>
								<DialogTitle>Create a new task</DialogTitle>
								<DialogDescription>
									Cretae a new task to be completed
								</DialogDescription>
							</DialogHeader>
							<CreateTaskForm />
						</DialogContent>
					</Dialog>

					<div className='flex flex-col gap-4 items-start'>
						<button className='text-[#8D90B1] hover:bg-next hover:text-white w-full text-lg text-start p-2 transition-all'>
							Today's tasks ({todaysTasksNumber})
						</button>
						<button className='text-[#8D90B1] hover:bg-next hover:text-white w-full text-lg text-start p-2 transition-all'>
							All tasks ({tasksNumber})
						</button>
						<button className='text-[#8D90B1] hover:bg-next hover:text-white w-full text-lg text-start p-2 transition-all'>
							Important tasks ({importantTasksNumber})
						</button>
						<button className='text-[#8D90B1] hover:bg-next hover:text-white w-full text-lg text-start p-2 transition-all'>
							Completed tasks
						</button>
						<button className='text-[#8D90B1] hover:bg-next hover:text-white w-full text-lg text-start p-2 transition-all'>
							Uncompleted tasks
						</button>
					</div>
				</div>
				<div>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant='outline'
								className='bg-primary left-24 important-left'>
								<Settings />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className='w-72 mb-2 ml-4'>
							<DropdownMenuLabel>My Account</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuGroup>
								<DropdownMenuItem className='text-lg'>
									<User className='mr-2 h-4 w-4' />
									<span>Profile</span>
								</DropdownMenuItem>
								<DropdownMenuItem className='text-lg'>
									<Settings className='mr-2 h-4 w-4' />
									<span>Settings</span>
								</DropdownMenuItem>
							</DropdownMenuGroup>
							<DropdownMenuSeparator />
							<DropdownMenuGroup>
								<DropdownMenuItem className='text-lg'>
									<Users className='mr-2 h-4 w-4' />
									<span>Team</span>
								</DropdownMenuItem>
								<DropdownMenuItem className='text-lg'>
									<UserPlus className='mr-2 h-4 w-4' />
									<span>Invite users</span>
								</DropdownMenuItem>
							</DropdownMenuGroup>
							<DropdownMenuSeparator />
							<DropdownMenuItem className='text-lg'>
								<LogOut className='mr-2 h-4 w-4' />
								<LogoutButton />
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>

			<div className='col-span-5 bg-primary p-4 space-y-8 max-h-max overflow-scroll'>
				<h2 className='font-bold text-2xl'>
					All Tasks ({tasks?.length})
				</h2>
				{tasks?.map((task) => (
					<div
						key={task.id}
						className='rounded-md p-4 bg-upcoming shadow-sm'>
						<h4>{task.name}</h4>
						<p>{task.description}</p>
					</div>
				))}
			</div>

			<div className='col-span-2 bg-secondary p-4'>RIGHT</div>
		</div>
	);
}
