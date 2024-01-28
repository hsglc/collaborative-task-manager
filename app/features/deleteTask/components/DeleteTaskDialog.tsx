"use client";

import { Trash2 } from "lucide-react";

import { deleteTask } from "@/app/features/deleteTask/actions/deleteTaskAction";

import { ToastAction } from "@/app/components/ui/toast";
import { useToast } from "@/app/components/ui/use-toast";

import { getCurrentFormattedDate } from "@/lib/shared";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/app/components/ui/alert-dialog";

import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/app/components/ui/hover-card";

type Props = {
	taskId: number;
};

export const DeleteTaskDialog = ({ taskId }: Props) => {
	const { toast } = useToast();

	const deleteTaskHandler = async () => {
		const isSuccess = await deleteTask(taskId);

		toast({
			title: isSuccess ? "Task deleted!" : "Task not deleted!",
			description: getCurrentFormattedDate(),
			action: <ToastAction altText="Close this toast!">Close</ToastAction>,
		});
	};

	return (
		<AlertDialog>
			<AlertDialogTrigger>
				<HoverCard>
					<HoverCardTrigger>
						<Trash2 className="hover:scale-110 hover:cursor-pointer  transition-all " />
					</HoverCardTrigger>
					<HoverCardContent
						className="bg-black text-white text-center text-lg"
						align="center"
						sideOffset={20}
					>
						Delete this task.
					</HoverCardContent>
				</HoverCard>
			</AlertDialogTrigger>
			<AlertDialogContent className="bg-black text-white">
				<AlertDialogHeader>
					<AlertDialogTitle className="text-2xl">
						Are you absolutely sure?
					</AlertDialogTitle>
					<AlertDialogDescription className="text-white text-lg">
						This action cannot be undone. This will permanently delete your
						task.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel className="bg-white text-black">
						Cancel
					</AlertDialogCancel>
					<AlertDialogAction
						className="bg-red-500 text-white"
						onClick={deleteTaskHandler}
					>
						Delete
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
