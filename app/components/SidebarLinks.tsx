'use client';

import { useSearchParams } from 'next/navigation';

import { cn } from '@/app/lib/utils';
import { Accordion, AccordionItem } from '@nextui-org/react';
import Link from 'next/link';

export const SidebarLinks = () => {
	const links = [
		{
			name: 'Important tasks',
			search: 'important',
			sizeOfTasks: 3,
		},
		{
			name: 'Completed tasks',
			search: 'completed',
			sizeOfTasks: 3,
		},
		{
			name: 'Uncompleted tasks',
			search: 'uncompleted',
			sizeOfTasks: 3,
		},
	];

	// const { push } = useRouter();
	const searchQuery = useSearchParams().get('search');
	const categoryQuery = useSearchParams().get('category');

	const defaultContent =
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

	return (
		<Accordion>
			<AccordionItem
				key='my-tasks'
				aria-label='My tasks'
				title='My tasks'>
				<div className='flex flex-col gap-3'>
					{links.map(({ search, name, sizeOfTasks }) => (
						<Link
							key={search}
							className={cn(
								'text-black hover:bg-black hover:text-white   w-full text-lg text-start p-2 transition-all relative flex items-center',
								{
									'bg-black text-white':
										searchQuery === search &&
										categoryQuery === 'my-tasks',
								}
							)}
							href={{
								pathname: '/dashboard',
								query: { category: 'my-tasks', search },
							}}>
							{name} ({sizeOfTasks})
						</Link>
					))}
				</div>
			</AccordionItem>
			<AccordionItem
				key='shared-by-others'
				aria-label='Shared by others'
				title='Shared by others'>
				<div className='flex flex-col gap-3'>
					{links.map(({ search, name, sizeOfTasks }) => (
						<Link
							key={search}
							className={cn(
								'text-black hover:bg-black hover:text-white  w-full text-lg text-start p-2 transition-all relative flex items-center',
								{
									'bg-black text-white':
										searchQuery === search &&
										categoryQuery === 'shared-by-others',
								}
							)}
							href={{
								pathname: '/dashboard',
								query: { category: 'shared-by-others', search },
							}}>
							{name} ({sizeOfTasks})
						</Link>
					))}
				</div>
			</AccordionItem>
			<AccordionItem
				key='shared-with-me'
				aria-label='Shared with me'
				title='Shared with me'>
				<div className='flex flex-col gap-3'>
					{links.map(({ search, name, sizeOfTasks }) => (
						<Link
							key={search}
							className={cn(
								'text-black hover:bg-black hover:text-white  w-full text-lg text-start p-2 transition-all relative flex items-center',
								{
									'bg-black text-white':
										searchQuery === search &&
										categoryQuery === 'shared-with-me',
								}
							)}
							href={{
								pathname: '/dashboard',
								query: { category: 'shared-with-me', search },
							}}>
							{name} ({sizeOfTasks})
						</Link>
					))}
				</div>
			</AccordionItem>
		</Accordion>
	);
};
