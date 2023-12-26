"use client";

import { useSearchParams } from "next/navigation";

import { cn } from "@/app/lib/utils";
import { Accordion, AccordionItem } from "@nextui-org/react";
import Link from "next/link";

type Props = {
	numberOfTasks: {
		tasksNumber?: number;
		importantTasksNumber?: number;
		completedTasksNumber?: number;
		uncompletedTasksNumber?: number;
		sharedTasksNumber?: number;
	};
};

export const SidebarLinks = ({ numberOfTasks }: Props) => {
	const { completedTasksNumber, importantTasksNumber, uncompletedTasksNumber } =
		numberOfTasks;

	const links = [
		// {
		// 	name: 'All tasks',
		// 	search: 'all',
		// 	sizeOfTasks: tasksNumber,
		// },
		{
			name: "Important tasks",
			search: "important",
			sizeOfTasks: importantTasksNumber,
		},
		{
			name: "Completed tasks",
			search: "completed",
			sizeOfTasks: completedTasksNumber,
		},
		{
			name: "Uncompleted tasks",
			search: "uncompleted",
			sizeOfTasks: uncompletedTasksNumber,
		},
		// {
		// 	name: 'Shared tasks',
		// 	search: 'shared',
		// 	sizeOfTasks: sharedTasksNumber,
		// },
	];

	// const { push } = useRouter();
	const searchParams = useSearchParams().get("search");

	const defaultContent =
		"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

	return (
		<Accordion>
			<AccordionItem key="my-tasks" aria-label="My Tasks" title="My Tasks">
				<div className="flex flex-col gap-3">
					{links.map(({ search, name, sizeOfTasks }) => (
						<Link
							key={search}
							className={cn(
								"text-black hover:bg-black hover:text-white   w-full text-lg text-start p-2 transition-all relative flex items-center",
								{
									"bg-black text-white": searchParams === search,
								},
							)}
							href={{
								pathname: "/dashboard",
								query: { search },
							}}
						>
							{name} ({sizeOfTasks})
						</Link>
					))}
				</div>
			</AccordionItem>
			<AccordionItem
				key="shared-tasks"
				aria-label="Shared Tasks"
				title="Shared Tasks"
			>
				<div className="flex flex-col gap-3">
					{links.map(({ search, name, sizeOfTasks }) => (
						<Link
							key={search}
							className={cn(
								"text-black hover:bg-black hover:text-white  w-full text-lg text-start p-2 transition-all relative flex items-center",
								{
									"bg-black text-white": searchParams === search,
								},
							)}
							href={{
								pathname: "/dashboard",
								query: { search },
							}}
						>
							{name} ({sizeOfTasks})
						</Link>
					))}
				</div>
			</AccordionItem>
		</Accordion>
	);
};
