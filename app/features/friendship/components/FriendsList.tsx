import { fetchFriends } from "../actions/fetchFriends";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/app/components/ui/card";

import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/app/components/ui/avatar";
import CancelInvitationButton from "./CancelInvitationButton";

export const FriendsList = async () => {
	const friends = await fetchFriends();

	if (!friends) return;

	return (
		<div className="flex gap-4">
			<Card className="w-full max-w-lg">
				<CardHeader className="flex flex-row items-start">
					<div className="space-y-1.5">
						<CardTitle>Friends</CardTitle>
						<CardDescription>Your existing friends.</CardDescription>
					</div>
				</CardHeader>
				<CardContent className="border-t pt-4">
					<div className="space-y-2">
						{friends
							.filter((fr) => fr.status === "Accepted")
							.map((friend) => (
								<div
									key={friend.profiles.id}
									className="flex items-center gap-3"
								>
									<Avatar className="h-9 w-9">
										<AvatarImage
											alt={friend.profiles.full_name}
											src={friend.profiles.avatar_url}
										/>
										<AvatarFallback>F1</AvatarFallback>
									</Avatar>
									<div className="grid gap-0.5 text-xs">
										<div className="font-medium">
											{friend.profiles.full_name}
										</div>
										<div className="text-zinc-500 dark:text-zinc-400">
											{friend.profiles.user_email}
										</div>
									</div>
								</div>
							))}
					</div>
				</CardContent>
			</Card>
			<Card className="w-full max-w-lg">
				<CardHeader className="flex flex-row items-start">
					<div className="space-y-1.5">
						<CardTitle>Waiting for approval</CardTitle>
						<CardDescription>Your pending friend requests.</CardDescription>
					</div>
				</CardHeader>
				<CardContent className="border-t pt-4">
					<div className="space-y-2">
						{friends
							.filter((fr) => fr.status === "Pending")
							.map((friend) => (
								<div
									key={friend.profiles.id}
									className="flex items-center justify-between"
								>
									<div className="flex items-center gap-3">
										<Avatar className="h-9 w-9">
											<AvatarImage
												alt={friend.profiles.full_name}
												src={friend.profiles.avatar_url}
											/>
											<AvatarFallback>
												{friend.profiles.full_name.slice(0, 2)}
											</AvatarFallback>
										</Avatar>
										<div className="grid gap-0.5 text-xs">
											<div className="font-medium">
												{friend.profiles.full_name}
											</div>
											<div className="text-zinc-500 dark:text-zinc-400">
												{friend.profiles.user_email}
											</div>
										</div>
									</div>
									<CancelInvitationButton id={friend.profiles.id} />
								</div>
							))}
					</div>
				</CardContent>
			</Card>
		</div>
	);
};
