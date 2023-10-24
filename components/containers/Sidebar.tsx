import { LogOut, Settings, User, UserPlus, Users } from 'lucide-react';

import { SidebarLinks } from '@/components/SidebarLinks';
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
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';

import LogoutButton from '@/components/LogoutButton';
import { CreateTaskForm } from '@/components/CreateTaskForm';

type Props = {
	numberOfTasks: {
		tasksNumber?: number;
		importantTasksNumber?: number;
		completedTasksNumber?: number;
		uncompletedTasksNumber?: number;
	};
};

export const Sidebar = ({ numberOfTasks }: Props) => {
	return (
		<div className='col-span-2 bg-secondary h-full p-4 rounded-xl rounded-b-none ml-4 flex flex-col justify-between'>
			<div className='space-y-12'>
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

				<SidebarLinks numberOfTasks={numberOfTasks} />
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
	);
};
