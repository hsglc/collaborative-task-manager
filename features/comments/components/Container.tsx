'use client';

import { createBrowserClient } from '@supabase/ssr';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	useDisclosure,
} from '@nextui-org/react';

import { formatRelativeTime } from '@/lib/utils';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { AddCommentForm } from './AddCommentForm';

import { Comment } from '@/types/comments';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

type Props = {
	taskId: number;
};

export function Container({ taskId }: Props) {
	const { push } = useRouter();
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const [comments, setComments] = useState<Comment[]>([]);

	const supabase = createBrowserClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
	);

	const fetchComments = async () => {
		push(`/dashboard?taskId=${taskId}`);

		onOpen();
		let { data: comments, error } = await supabase
			.from('comments')
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
            
            `
			)
			.eq('task_id', taskId)
			.returns<Comment[]>();

		if (error) console.log(error);
		if (comments) setComments(comments);
	};

	useEffect(() => {
		const channels = supabase
			.channel('custom-insert-channel')
			.on(
				'postgres_changes',
				{ event: 'INSERT', schema: 'public', table: 'comments' },
				(payload) => {
					fetchComments();
				}
			)
			.subscribe();

		return () => {
			channels.unsubscribe();
		};
	}, [comments]);

	return (
		<>
			<Button onPress={fetchComments}>
				Comments ({comments.length})
			</Button>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className='flex flex-col gap-1'>
								Comments
							</ModalHeader>
							<ModalBody>
								<ScrollArea className='h-96'>
									{comments.length > 0 ? (
										comments.map((comment) => (
											<>
												<div
													className='flex flex-col gap-1'
													key={comment.id}>
													<p>{comment.comment}</p>
													<div className='flex gap-2 items-center'>
														<Avatar>
															<AvatarImage
																src={
																	comment
																		.profiles
																		.avatar_url
																}
															/>
															<AvatarFallback>
																<Skeleton className='w-[40px] h-[20px] rounded-full' />
															</AvatarFallback>
														</Avatar>
														<div className='flex flex-col text-sm'>
															<p>
																{
																	comment
																		.profiles
																		.full_name
																}
															</p>
															<p className='text-gray-400'>
																{formatRelativeTime(
																	new Date(
																		comment.created_at
																	)
																)}
															</p>
														</div>
													</div>
												</div>
												<Separator className='my-2' />
											</>
										))
									) : (
										<p>There are no comments yet.</p>
									)}
								</ScrollArea>
								<AddCommentForm />
							</ModalBody>
							<ModalFooter>
								<Button
									color='danger'
									variant='light'
									onPress={onClose}>
									Close
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
