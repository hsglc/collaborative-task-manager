"use client";

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
import { Friendship } from "@/types/friends";
import { createBrowserClient } from "@supabase/ssr";
import { useEffect, useReducer } from "react";
import { AcceptInvitationButton } from "./AcceptInvitationButton";
import { CancelInvitationButton } from "./CancelInvitationButton";

interface FriendState {
	sendingInvitations: Friendship[];
	receivedInvitations: Friendship[];
	acceptedInvitations: Friendship[];
}

type FriendAction =
	| { type: "INITIALIZE"; payload: FriendState }
	| { type: "SET_SENDING"; payload: Friendship[] }
	| { type: "SET_RECEIVED"; payload: Friendship[] }
	| { type: "SET_ACCEPTED"; payload: Friendship[] };

const initialState: FriendState = {
	sendingInvitations: [],
	receivedInvitations: [],
	acceptedInvitations: [],
};

function friendReducer(state: FriendState, action: FriendAction): FriendState {
	switch (action.type) {
		case "INITIALIZE":
			return action.payload;
		case "SET_SENDING":
			return { ...state, sendingInvitations: action.payload };
		case "SET_RECEIVED":
			return { ...state, receivedInvitations: action.payload };
		case "SET_ACCEPTED":
			return { ...state, acceptedInvitations: action.payload };
		default:
			return state;
	}
}

export const FriendsList = () => {
	const [state, dispatch] = useReducer(friendReducer, initialState);

	const supabase = createBrowserClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
	);

	const fetchFriendships = async () => {
		const data = await fetchFriends();
		if (data) {
			dispatch({
				type: "INITIALIZE",
				payload: {
					sendingInvitations: data.sendingFriendshipRequests as Friendship[],
					receivedInvitations: data.receivingFriendshipRequests as Friendship[],
					acceptedInvitations: data.acceptedFriendshipRequests,
				},
			});
		}
	};

	useEffect(() => {
		fetchFriendships();
	}, []);

	useEffect(() => {
		const channels = supabase
			.channel("custom-all-channel")
			.on(
				"postgres_changes",
				{ event: "*", schema: "public", table: "friends" },
				(payload) => {
					fetchFriendships();
				},
			)
			.subscribe();

		return () => {
			channels.unsubscribe();
		};
	}, [state]);

	return (
		<div className="flex flex-col gap-4 xl:flex-row">
			<Card className="w-full max-w-lg">
				<CardHeader className="flex flex-row items-start">
					<div className="space-y-1.5">
						<CardTitle>Friends</CardTitle>
						<CardDescription>Your existing friends.</CardDescription>
					</div>
				</CardHeader>
				<CardContent className="border-t pt-4">
					<div className="space-y-2">
						{state.acceptedInvitations.length > 0 ? (
							state.acceptedInvitations.map((friend) => (
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
							))
						) : (
							<p>Loading...</p>
						)}
					</div>
				</CardContent>
			</Card>
			<Card className="w-full max-w-lg">
				<CardHeader className="flex flex-row items-start">
					<div className="space-y-1.5">
						<CardTitle>Waiting for approval from you</CardTitle>
						<CardDescription>
							You can accept or cancel friend requests here.
						</CardDescription>
					</div>
				</CardHeader>
				<CardContent className="border-t pt-4">
					<div className="space-y-2">
						{state.receivedInvitations.length > 0
							? state.receivedInvitations.map((friend) => (
									<div
										key={friend.profiles.id}
										className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between"
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
										<div className="flex gap-3">
											<AcceptInvitationButton
												target="friend_id"
												id={friend.profiles.id}
											/>
											<CancelInvitationButton
												target="friend_id"
												id={friend.profiles.id}
											/>
										</div>
									</div>
							  ))
							: null}
					</div>
				</CardContent>
			</Card>
			<Card className="w-full max-w-lg">
				<CardHeader className="flex flex-row items-start">
					<div className="space-y-1.5">
						<CardTitle>Waiting for approval from your friends</CardTitle>
						<CardDescription>
							You can cancel your friend requests here.
						</CardDescription>
					</div>
				</CardHeader>
				<CardContent className="border-t pt-4">
					<div className="space-y-2">
						{state.sendingInvitations.length > 0
							? state.sendingInvitations.map((friend) => (
									<div
										key={friend.user_id}
										className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between"
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
										<div className="flex xl:block">
											<CancelInvitationButton
												target="user_id"
												id={friend.profiles.id}
											/>
										</div>
									</div>
							  ))
							: null}
					</div>
				</CardContent>
			</Card>
		</div>
	);
};
