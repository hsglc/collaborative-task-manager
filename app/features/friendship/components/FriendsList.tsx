"use client";

import { fetchFriends } from "../actions/fetchFriends";

import { Spinner } from "@nextui-org/react";

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
import { useEffect, useReducer, useState } from "react";
import { AcceptInvitationButton } from "./AcceptInvitationButton";
import { CancelInvitationButton } from "./CancelInvitationButton";

interface FriendState {
	sendingInvitations: Friendship[];
	receivedInvitations: Friendship[];
	acceptedInvitations: Friendship[];
	userId: string;
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
	userId: "",
};

interface Notifications {
	commit_timestamp: string;
	errors: any;
	eventType: "DELETE" | "INSERT" | "UPDATE";
	new: Notification;
	old: Old;
	schema: string;
	table: string;
}

interface Notification {
	created_at: string;
	id: number;
	user_id: string;
	friend_id: string;
	status: "Pending" | "Accepted" | "Rejected";
}

interface Old {
	id: number;
}

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
	const [loading, setLoading] = useState(true);

	const supabase = createBrowserClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
	);

	const fetchFriendships = async () => {
		const data = await fetchFriends();

		const [friendships, user] = await Promise.all([
			fetchFriends(),
			supabase.auth.getUser(),
		]);
		if (friendships && user.data.user) {
			dispatch({
				type: "INITIALIZE",
				payload: {
					userId: user.data.user.id,
					sendingInvitations:
						friendships.sendingFriendshipRequests as Friendship[],
					receivedInvitations:
						friendships.receivingFriendshipRequests as Friendship[],
					acceptedInvitations: friendships.acceptedFriendshipRequests,
				},
			});
		}
		setLoading(false);
	};

	useEffect(() => {
		fetchFriendships();
	}, []);

	useEffect(() => {
		const channels = supabase
			.channel("custom-all-channel")
			.on(
				"postgres_changes",
				{
					event: "*",
					schema: "public",
					table: "friends",
				},
				(payload) => {
					const notification = payload as Notifications;
					if (
						notification.new.user_id === state.userId ||
						notification.new.friend_id === state.userId
					) {
						fetchFriendships();
					}
				},
			)
			.subscribe();

		return () => {
			channels.unsubscribe();
		};
	}, [state]);

	return (
		<div className="flex flex-col gap-4 xl:flex-row">
			<Card className="w-full">
				<CardHeader className="flex flex-row items-start">
					<div className="space-y-1.5">
						<CardTitle>Friends</CardTitle>
						<CardDescription>Your existing friends.</CardDescription>
					</div>
				</CardHeader>
				<CardContent className="border-t pt-4">
					<div className="space-y-2">
						{!loading ? (
							state.acceptedInvitations.map((friendship) => (
								<div key={friendship.id} className="flex items-center gap-3">
									<Avatar className="h-9 w-9">
										<AvatarImage
											alt={friendship.profiles.full_name}
											src={friendship.profiles.avatar_url}
										/>
										<AvatarFallback>F1</AvatarFallback>
									</Avatar>
									<div className="grid gap-0.5 text-xs">
										<div className="font-medium">
											{friendship.profiles.full_name}
										</div>
										<div className="text-zinc-500 dark:text-zinc-400">
											{friendship.profiles.user_email}
										</div>
									</div>
								</div>
							))
						) : (
							<Spinner />
						)}
					</div>
				</CardContent>
			</Card>
			<Card className="w-full ">
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
						{!loading ? (
							state.receivedInvitations.map((friendship) => (
								<div
									key={friendship.id}
									className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between"
								>
									<div className="flex items-center gap-3">
										<Avatar className="h-9 w-9">
											<AvatarImage
												alt={friendship.profiles.full_name}
												src={friendship.profiles.avatar_url}
											/>
											<AvatarFallback>
												{friendship.profiles.full_name.slice(0, 2)}
											</AvatarFallback>
										</Avatar>
										<div className="grid gap-0.5 text-xs">
											<div className="font-medium">
												{friendship.profiles.full_name}
											</div>
											<div className="text-zinc-500 dark:text-zinc-400">
												{friendship.profiles.user_email}
											</div>
										</div>
									</div>
									<div className="flex gap-3">
										<AcceptInvitationButton id={friendship.id} />
										<CancelInvitationButton id={friendship.id} />
									</div>
								</div>
							))
						) : (
							<Spinner />
						)}
					</div>
				</CardContent>
			</Card>
			<Card className="w-full ">
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
						{!loading ? (
							state.sendingInvitations.map((friendship) => (
								<div
									key={friendship.id}
									className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between"
								>
									<div className="flex items-center gap-3">
										<Avatar className="h-9 w-9">
											<AvatarImage
												alt={friendship.profiles.full_name}
												src={friendship.profiles.avatar_url}
											/>
											<AvatarFallback>
												{friendship.profiles.full_name.slice(0, 2)}
											</AvatarFallback>
										</Avatar>
										<div className="grid gap-0.5 text-xs">
											<div className="font-medium">
												{friendship.profiles.full_name}
											</div>
											<div className="text-zinc-500 dark:text-zinc-400">
												{friendship.profiles.user_email}
											</div>
										</div>
									</div>
									<div className="flex xl:block">
										<CancelInvitationButton id={friendship.id} />
									</div>
								</div>
							))
						) : (
							<Spinner />
						)}
					</div>
				</CardContent>
			</Card>
		</div>
	);
};
