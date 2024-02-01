"use client";

import { CreateTaskForm } from "@/app/features/createTask/components/CreateTaskForm";

import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { useState } from "react";

export const CreateTaskDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <Dialog open={isDialogOpen} onOpenChange={(open) => setIsDialogOpen(open)}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setIsDialogOpen(true)}
          variant="outline"
          className="text-primaryYellow w-full font-semibold text-lg p-6"
        >
          New Task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px] bg-black text-white">
        <DialogHeader>
          <DialogTitle>Create a new task</DialogTitle>
          <DialogDescription>Create a new task to save it to your list</DialogDescription>
        </DialogHeader>
        <CreateTaskForm setIsDialogOpen={setIsDialogOpen} />
      </DialogContent>
    </Dialog>
  );
};
