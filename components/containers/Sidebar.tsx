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

import LogoutButton from '@/components/LogoutButton';
import Link from 'next/link';
import { CreateTaskDialog } from '@/features/createTask/components/CreateTaskDialog';

type Props = {
	numberOfTasks: {
		tasksNumber?: number;
		importantTasksNumber?: number;
		completedTasksNumber?: number;
		uncompletedTasksNumber?: number;
		sharedTasksNumber?: number;
	};
};

export const Sidebar = ({ numberOfTasks }: Props) => {
	return (
		<div className='col-span-3 bg-secondary h-full p-4 rounded-xl rounded-b-none ml-4 flex flex-col justify-between'>
			<div className='space-y-12'>
				<CreateTaskDialog />
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
								<Link href='/profile'>Profile</Link>
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem className='text-lg'>
								<Users className='mr-2 h-4 w-4' />
								<Link href='/friends'>Friends</Link>
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
