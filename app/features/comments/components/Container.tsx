"use client";

import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/app/components/ui/avatar";
import { Skeleton } from "@/app/components/ui/skeleton";

import { Button } from "@/app/components/ui/button";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import { Separator } from "@/app/components/ui/separator";
import { formatRelativeTime } from "@/app/lib/shared";
import type { Comment } from "@/types/comments";
import { AddCommentForm } from "./AddCommentForm";

type Props = {
	taskId: number;
};

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/app/components/ui/dialog";

export function Container({ taskId }: Props) {
	const { push } = useRouter();

	const [comments, setComments] = useState<Comment[]>([]);

	const supabase = createBrowserClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
	);

	const fetchComments = async () => {
		const { data: comments, error } = await supabase
			.from("comments")
			.select(
				`
                id,
                comment,
                created_at,
                task_id,
                user_id,
                profiles!comments_user_id_fkey (
                    user_email,
                    avatar_url,
                    full_name
                  )
            
            `,
			)
			.eq("task_id", taskId)
			.returns<Comment[]>();

		if (error) console.log(error);
		if (comments) setComments(comments);
	};

	useEffect(() => {
		const channels = supabase
			.channel("custom-insert-channel")
			.on(
				"postgres_changes",
				{ event: "INSERT", schema: "public", table: "comments" },
				(payload) => {
					fetchComments();
				},
			)
			.subscribe();

		return () => {
			channels.unsubscribe();
		};
	}, [comments]);

	return (
		<>
			<Dialog>
				<DialogTrigger asChild>
					<Button color="primary" onClick={fetchComments}>
						Comments
					</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Comments</DialogTitle>
						<DialogDescription>
							Comments are a great way to collaborate with your team.
						</DialogDescription>
					</DialogHeader>
					<ScrollArea className="h-96">
						{comments.length > 0 ? (
							comments.map((comment) => (
								<React.Fragment key={comment.id}>
									<div className="flex flex-col gap-1">
										<div className="flex flex-col gap-2">
											<div>
												<div className="flex gap-2">
													<Avatar>
														<AvatarImage src={comment.profiles.avatar_url} />
														<AvatarFallback>
															<Skeleton className="w-[40px] h-[20px] rounded-full" />
														</AvatarFallback>
													</Avatar>
													<div className="flex flex-col justify-between">
														<div className="flex gap-3 items-center">
															<p className="text-medium font-bold">
																{comment.profiles.full_name}
															</p>
															<p className="text-gray-400 text-xs">
																{formatRelativeTime(
																	new Date(comment.created_at),
																)}
															</p>
														</div>
														<p>{comment.comment}</p>
													</div>
												</div>
											</div>
										</div>
									</div>
									<Separator className="my-2" />
								</React.Fragment>
							))
						) : (
							<p>There are no comments yet.</p>
						)}
					</ScrollArea>
					<AddCommentForm taskId={taskId} />
				</DialogContent>
			</Dialog>
		</>
	);
}
