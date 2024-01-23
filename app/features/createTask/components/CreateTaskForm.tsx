"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { createTask } from "@/app/features/createTask/actions/createTaskAction";
import { fetchFriends } from "@/app/features/friendship/actions/fetchFriends";

import { Input } from "@/app/components/ui/input";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/app/components/ui/select";

import type { Friendship } from "@/types/friends";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { formSchema } from "../schema";

import { Button } from "@/app/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/app/components/ui/form";

import { ToastAction } from "@/app/components/ui/toast";
import { useToast } from "@/app/components/ui/use-toast";
import { getCurrentFormattedDate } from "@/app/lib/utils";

type Props = {
	setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
};

export function CreateTaskForm({ setIsDialogOpen }: Props) {
	const [friends, setFriends] = useState<Friendship[]>([]);

	const { toast } = useToast();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			description: "",
			priority: "Low",
			status: "Backlog",
			assignee: "",
			created_by: "",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		const { isSuccess } = await createTask(values);
		if (isSuccess) {
			setIsDialogOpen(false);
			toast({
				title: "Task created!",
				duration: 3000,
				description: getCurrentFormattedDate(),
				action: <ToastAction altText="Close this toast">Close</ToastAction>,
			});
		}
	}

	useEffect(() => {
		(async () => {
			const friends = await fetchFriends();
			if (friends) setFriends(friends.acceptedFriendshipRequests);
		})();
	}, []);

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input
									className="text-black"
									placeholder="Task name"
									{...field}
								/>
							</FormControl>
							<FormDescription>This is your task's name.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description </FormLabel>
							<FormControl>
								<Input
									className="text-black"
									placeholder="Task Description"
									{...field}
								/>
							</FormControl>
							<FormDescription>
								This is your task's description.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="priority"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Priority</FormLabel>
							<FormControl>
								<Select
									{...field}
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
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
							</FormControl>
							<FormDescription>This is your task's priority.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="status"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Status</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									{...field}
									defaultValue={field.value}
								>
									<SelectTrigger className="w-full text-black">
										<SelectValue placeholder="Select the status" />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											<SelectLabel>Status</SelectLabel>
											<SelectItem value="Backlog">Backlog</SelectItem>
											<SelectItem value="In Progress">In Progress</SelectItem>
											<SelectItem value="Waiting Approval">
												Waiting Approval
											</SelectItem>

											<SelectItem value="Done">Done</SelectItem>
										</SelectGroup>
									</SelectContent>
								</Select>
							</FormControl>
							<FormDescription>This is your task's status.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="assignee"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Assignee</FormLabel>
							<FormControl>
								<Select {...field} onValueChange={field.onChange}>
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
							</FormControl>
							<FormDescription>
								This is your public display name.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" className="w-full">
					Create Task
				</Button>
			</form>
		</Form>
	);
}
