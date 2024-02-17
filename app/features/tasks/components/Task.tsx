import { format, parseISO } from "date-fns";
import { Calendar } from "lucide-react";

import { Container } from "@/app/features/comments/components/Container";
import { DeleteTaskDialog } from "@/app/features/deleteTask/components/DeleteTaskDialog";
import { EditTaskDialog } from "@/app/features/editTask/components/EditTaskDialog";
import { TaskPriority } from "@/app/features/taskPriority/components/TaskPriority";

import { formatRelativeTime } from "@/app/lib/shared";
import type { Task as NewTask } from "@/types/tasks";

type Props = {
  task: NewTask;
};

export const Task = ({ task }: Props) => {
  const date = parseISO(task.created_at);
  const formattedDate = formatRelativeTime(new Date(task.created_at));

  return (
    <div data-testid="task" className="rounded-md p-4 text-black shadow-sm shadow-black space-y-3 ">
      <h4 className="text-2xl font-semibold">{task.name}</h4>
      <div className="flex-center justify-between">
        <p>{task.description}</p>
        <div className="flex-center gap-4">
          <TaskPriority priority={task.priority} />

          <EditTaskDialog task={task} />
          <DeleteTaskDialog taskId={task.id} />

          <Container taskId={task.id} />
        </div>
      </div>
      <div className="flex-center gap-2 text-gray-500">
        <Calendar />
        created {formattedDate}
      </div>
    </div>
  );
};
