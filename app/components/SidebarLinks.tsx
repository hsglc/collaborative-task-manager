"use client";

import { useSearchParams } from "next/navigation";

import { cn } from "@/app/lib/utils";
import type { Task } from "@/types/tasks";
import { Accordion, AccordionItem } from "@nextui-org/react";
import Link from "next/link";

type Props = {
	tasks: {
		myTasks: Task[];
		sharedByOthers: Task[];
		sharedWithMe: Task[];
	};
};

const categorizeTasks = (tasks: Task[]) => {
	const importantTasks = tasks.filter((task) => task.priority === "High");
	const completedTasks = tasks.filter((task) => task.status === "Done");
	const uncompletedTasks = tasks.filter((task) => task.status !== "Done");
	return [
		{
			name: "Important tasks",
			search: "important",
			sizeOfTasks: importantTasks.length,
		},
		{
			name: "Completed tasks",
			search: "completed",
			sizeOfTasks: completedTasks.length,
		},
		{
			name: "Uncompleted tasks",
			search: "uncompleted",
			sizeOfTasks: uncompletedTasks.length,
		},
	];
};

export const SidebarLinks = ({ tasks }: Props) => {
	const categorizedTasks = {
		myTasks: {
			tasks: categorizeTasks(tasks.myTasks),
		},
		sharedByOthers: {
			tasks: categorizeTasks(tasks.sharedByOthers),
		},
		sharedWithMe: {
			tasks: categorizeTasks(tasks.sharedWithMe),
		},
	};

	const searchQuery = useSearchParams().get("search");
	const categoryQuery = useSearchParams().get("category");

	return (
		<Accordion>
			<AccordionItem key="my-tasks" aria-label="My tasks" title="My tasks">
				<div className="flex flex-col gap-3">
					{categorizedTasks.myTasks.tasks.map(
						({ search, name, sizeOfTasks }) => (
							<Link
								key={search}
								className={cn(
									"text-black hover:bg-black hover:text-white   w-full text-lg text-start p-2 transition-all relative flex items-center",
									{
										"bg-black text-white":
											searchQuery === search && categoryQuery === "myTasks",
									},
								)}
								href={{
									pathname: "/dashboard",
									query: { category: "myTasks", search },
								}}
							>
								{name} ({sizeOfTasks})
							</Link>
						),
					)}
				</div>
			</AccordionItem>
			<AccordionItem
				key="shared-by-others"
				aria-label="Shared by others"
				title="Shared by others"
			>
				<div className="flex flex-col gap-3">
					{categorizedTasks.sharedByOthers.tasks.map(
						({ search, name, sizeOfTasks }) => (
							<Link
								key={search}
								className={cn(
									"text-black hover:bg-black hover:text-white  w-full text-lg text-start p-2 transition-all relative flex items-center",
									{
										"bg-black text-white":
											searchQuery === search &&
											categoryQuery === "sharedByOthers",
									},
								)}
								href={{
									pathname: "/dashboard",
									query: {
										category: "sharedByOthers",
										search,
									},
								}}
							>
								{name} ({sizeOfTasks})
							</Link>
						),
					)}
				</div>
			</AccordionItem>
			<AccordionItem
				key="shared-with-me"
				aria-label="Shared with me"
				title="Shared with me"
			>
				<div className="flex flex-col gap-3">
					{categorizedTasks.sharedWithMe.tasks.map(
						({ search, name, sizeOfTasks }) => (
							<Link
								key={search}
								className={cn(
									"text-black hover:bg-black hover:text-white  w-full text-lg text-start p-2 transition-all relative flex items-center",
									{
										"bg-black text-white":
											searchQuery === search &&
											categoryQuery === "sharedWithMe",
									},
								)}
								href={{
									pathname: "/dashboard",
									query: {
										category: "sharedWithMe",
										search,
									},
								}}
							>
								{name} ({sizeOfTasks})
							</Link>
						),
					)}
				</div>
			</AccordionItem>
		</Accordion>
	);
};
