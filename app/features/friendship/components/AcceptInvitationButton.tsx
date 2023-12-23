"use client";
import { Button } from "@/app/components/ui/button";

import { ToastAction } from "@/app/components/ui/toast";
import { useToast } from "@/app/components/ui/use-toast";
import { getCurrentFormattedDate } from "@/app/lib/utils";

import { acceptInvitation } from "../actions/accepInvitation";

type Props = {
	id: string;
	target: "friend_id" | "user_id";
};

export const AcceptInvitationButton = ({ id, target }: Props) => {
	const { toast } = useToast();

	const acceptInvitationHandler = async () => {
		const response = await acceptInvitation(target, id);

		toast({
			title: response.message,
			description: getCurrentFormattedDate(),
			action: <ToastAction altText="Close this toast!">Close</ToastAction>,
		});
	};

	return (
		<Button
			onClick={acceptInvitationHandler}
			type="button"
			variant="success"
			className="p-3 h-8"
		>
			Accept
		</Button>
	);
};
