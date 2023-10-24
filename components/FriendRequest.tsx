import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

import { Button } from '@/components/ui/button';

type Props = {
	notification: {
		id: number;
		status: string;
		sender_email: string;
		receiver_email: string;
		created_at: string;
	};
	currentUserEmail: string;
};

export const FriendRequest = ({
	notification: {
		sender_email: senderEmail,
		receiver_email: receiverEmail,
		status,
		created_at: createdAt,
	},
	currentUserEmail,
}: Props) => {
	const supabase = createClientComponentClient();

	const acceptRequestHandler = async () => {
		await supabase.from('friends').update({ status: 'Approved' }).match({
			sender_email: senderEmail,
			receiver_email: receiverEmail,
		});
	};

	const rejectRequestHandler = async () => {
		await supabase.from('friends').update({ status: 'Rejected' }).match({
			sender_email: senderEmail,
			receiver_email: receiverEmail,
		});
	};

	return (
		<div className='text-white rounded-lg p-6 border border-white space-y-2 shadow-md'>
			<p>Friend Request</p>
			<p>
				<span className='font-bold'>{senderEmail}</span>{' '}
				{status === 'Waiting'
					? 'sent you a friend request.'
					: status === 'Approved'
					? 'accepted your friend request.'
					: 'rejected your friend request.'}
			</p>
			<p
				className={`${
					status === 'Waiting'
						? 'text-yellow-500'
						: status === 'Approved'
						? 'text-green-500'
						: 'text-red-500'
				} ${status === 'Waiting' ? 'animate-pulse' : ''}`}>
				<span className='font-bold'>Status: </span>
				{status}
			</p>
			{status === 'Waiting' ? (
				<div className='flex gap-2'>
					<Button
						onClick={acceptRequestHandler}
						className='bg-green-600 hover:bg-green-600 hover:opacity-95'>
						Accept
					</Button>
					<Button
						onClick={rejectRequestHandler}
						variant='destructive'>
						Reject
					</Button>
				</div>
			) : null}
		</div>
	);
};
