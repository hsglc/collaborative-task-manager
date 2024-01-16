"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";

//@ts-expect-error
import { useFormState } from "react-dom";

import { createTask } from "@/app/features/createTask/actions/createTaskAction";
import { fetchFriends } from "@/app/features/friendship/actions/fetchFriends";

import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/app/components/ui/select";
import { FormActionButton } from "../../../components/shared/FormActionButton";

import { Friendship } from "@/types/friends";

type Props = {
	setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
};
type InitialState = {
	message: null | string;
	isSuccess: boolean;
};

const initialState: InitialState = {
	message: null,
	isSuccess: false,
};

export function CreateTaskForm({ setIsDialogOpen }: Props) {
	const [friends, setFriends] = useState<Friendship[]>([]);
	const [state, formAction] = useFormState(createTask, initialState);

	useEffect(() => {
		(async () => {
			const friends = await fetchFriends();
			if (friends) setFriends(friends.acceptedFriendshipRequests);
		})();
	}, []);

	useEffect(() => {
		if (state.isSuccess) {
			setIsDialogOpen(false);
		}
	}, [state]);

	return (
		<form className="text-white text-lg space-y-4" action={formAction}>
			<Label className="flex flex-col gap-2">
				Name
				<Input
					placeholder="Task name"
					name="name"
					className="text-black placeholder:text-black"
				/>
			</Label>
			<Label className="flex flex-col gap-2">
				Description
				<Input
					placeholder="Task description"
					name="description"
					className="text-black placeholder:text-black"
				/>
			</Label>
			<Label className="flex flex-col gap-2">
				Priority
				<Select name="priority">
					<SelectTrigger className="w-full text-black">
						<SelectValue placeholder="Select the priority" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectLabel>Priority</SelectLabel>
							<SelectItem value="Low">Low</SelectItem>
							<SelectItem value="Medium">Medium</SelectItem>
							<SelectItem value="High">High</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
			</Label>
			<Label className="flex flex-col gap-2">
				Status
				<Select name="status">
					<SelectTrigger className="w-full text-black">
						<SelectValue placeholder="Select the status" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectLabel>Status</SelectLabel>
							<SelectItem value="Backlog">Backlog</SelectItem>
							<SelectItem value="In Progress">In Progress</SelectItem>
							<SelectItem value="Waiting Approval">Waiting Approval</SelectItem>

							<SelectItem value="Done">Done</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
			</Label>
			<Label className="flex flex-col gap-2">
				Assignee
				<Select name="assignee">
					<SelectTrigger className="w-full text-black">
						<SelectValue placeholder="Select the Assignee" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectLabel>Assignee</SelectLabel>
							{friends?.map((friend) => (
								<SelectItem
									key={friend.profiles.id}
									value={friend.profiles.id.toString()}
								>
									{friend.profiles.user_email}
								</SelectItem>
							))}
						</SelectGroup>
					</SelectContent>
				</Select>
			</Label>
			{state?.message}
			<FormActionButton>Create</FormActionButton>
		</form>
	);
}
