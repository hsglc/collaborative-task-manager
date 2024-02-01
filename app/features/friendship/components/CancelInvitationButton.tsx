"use client";
import { Button } from "@/app/components/ui/button";

import { ToastAction } from "@/app/components/ui/toast";
import { useToast } from "@/app/components/ui/use-toast";
import { getCurrentFormattedDate } from "@/app/lib/shared";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { cancelInvitation } from "../actions/cancelInvitation";

type Props = {
  id: number;
};

export const CancelInvitationButton = ({ id }: Props) => {
  const { toast } = useToast();

  const cancelInvitationHandler = async () => {
    const response = await cancelInvitation(id);

    toast({
      title: response.message,
      description: getCurrentFormattedDate(),
      action: <ToastAction altText="Close this toast!">Close</ToastAction>,
    });
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button type="button" variant="destructive" className="p-3 h-8">
            Cancel
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[625px] bg-black text-white">
          <DialogHeader>
            <DialogTitle>Are you sure you want to cancel this invitation?</DialogTitle>
            <DialogDescription>You will not be able to undo this action.</DialogDescription>
          </DialogHeader>
          <DialogClose asChild>
            <Button type="button" variant="destructive" onClick={cancelInvitationHandler}>
              Yes
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
};
