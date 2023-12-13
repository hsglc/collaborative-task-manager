import { Pencil } from "lucide-react";

import { EditTaskForm } from "./EditTaskForm";

import { Button } from "@/app/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/app/components/ui/dialog";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/app/components/ui/hover-card";

import { Task } from "@/types/tasks";

type Props = {
	task: Task;
};

export const EditTaskDialog = ({ task }: Props) => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="ghost" className="hover:bg-none">
					<HoverCard>
						<HoverCardTrigger>
							<Pencil className="hover:scale-110 hover:cursor-pointer transition-all" />
						</HoverCardTrigger>
						<HoverCardContent
							className="bg-black text-white text-center text-xl"
							align="center"
							sideOffset={20}
						>
							Edit this task.
						</HoverCardContent>
					</HoverCard>
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[625px] bg-black text-white ">
				<DialogHeader>
					<DialogTitle className="text-xl font-medium">
						Edit this task
					</DialogTitle>
					<DialogDescription className="text-lg font-medium">
						Edit this task to save it to your list.
					</DialogDescription>
				</DialogHeader>
				<EditTaskForm task={task} />
			</DialogContent>
		</Dialog>
	);
};
