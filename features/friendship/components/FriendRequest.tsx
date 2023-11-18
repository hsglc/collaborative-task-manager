import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

import { Button } from '@/components/ui/button';

export const FriendRequest = () => {
	const supabase = createClientComponentClient();

	const acceptRequestHandler = async () => {
		await supabase.from('friends').update({ status: 'Approved' });
	};

	const rejectRequestHandler = async () => {
		await supabase.from('friends').update({ status: 'Rejected' });
	};

	const senderEmail = 'Test';

	let status = 'Test';

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
