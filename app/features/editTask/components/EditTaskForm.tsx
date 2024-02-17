"use client";

import { useEffect, useState } from "react";

//@ts-expect-error
import { useFormState } from "react-dom";

import { editTask } from "@/app/features/editTask/actions/editTaskAction";
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

import type { Friendship } from "@/types/friends";
import type { Task } from "@/types/tasks";

type Props = {
  task: Task;
};

const initialState = {
  message: null,
};

export function EditTaskForm({ task }: Props) {
  const [friends, setFriends] = useState<Friendship[]>([]);
  const [state, formAction] = useFormState(editTask, initialState);

  useEffect(() => {
    (async () => {
      const friends = await fetchFriends();
      if (friends) setFriends(friends.acceptedFriendshipRequests);
    })();
  }, []);

  return (
    <form className="text-white text-lg space-y-4" action={formAction}>
      <Input name="id" className="hidden" defaultValue={task.id} />
      <Label className="flex flex-col gap-2">
        Name
        <Input placeholder="name" name="name" className="text-black" defaultValue={task.name} />
      </Label>
      <Label className="flex flex-col gap-2">
        Description
        <Input placeholder="description" name="description" className="text-black" defaultValue={task.description} />
      </Label>

      <Label className="flex flex-col gap-2">
        Priority
        <Select name="priority" defaultValue={task.priority}>
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
        <Select name="status" defaultValue={task.status}>
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
      {/* <Label className='flex flex-col gap-2'>
				Assignee
				<Select name='assignee' defaultValue={task.assignee}>
					<SelectTrigger className='w-full text-black'>
						<SelectValue placeholder='Select the Assignee' />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectLabel>Assignee</SelectLabel>
							{friends?.map((friend) => (
								<SelectItem
									key={friend.profiles.id}
									value={friend.profiles.id.toString()}>
									{friend.profiles.user_email}
								</SelectItem>
							))}
						</SelectGroup>
					</SelectContent>
				</Select>
			</Label> */}

      <FormActionButton>Edit</FormActionButton>
      {state?.message}
    </form>
  );
}
