"use client";
import { Button } from "@/app/components/ui/button";

import { ToastAction } from "@/app/components/ui/toast";
import { useToast } from "@/app/components/ui/use-toast";
import { getCurrentFormattedDate } from "@/app/lib/utils";

import { acceptInvitation } from "../actions/accepInvitation";

type Props = {
	id: number;
};

export const AcceptInvitationButton = ({ id }: Props) => {
	const { toast } = useToast();

	const acceptInvitationHandler = async () => {
		const response = await acceptInvitation(id);

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
