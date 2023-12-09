import { fetchFriends } from '../actions/fetchFriends';

import {
	CardTitle,
	CardDescription,
	CardHeader,
	CardContent,
	Card,
} from '@/app/components/ui/card';

import {
	AvatarImage,
	AvatarFallback,
	Avatar,
} from '@/app/components/ui/avatar';

export const FriendsList = async () => {
	const friends = await fetchFriends();

	if (!friends) return;

	return (
		<div className='space-y-4'>
			<Card className='w-full max-w-lg'>
				<CardHeader className='flex flex-row items-start'>
					<div className='space-y-1.5'>
						<CardTitle>Friends</CardTitle>
						<CardDescription>
							Your existing friends.
						</CardDescription>
					</div>
				</CardHeader>
				<CardContent className='border-t pt-4'>
					<div className='space-y-2'>
						{friends.map((friend) => (
							<div className='flex items-center gap-3'>
								<Avatar className='h-9 w-9'>
									<AvatarImage
										alt={friend.profiles.full_name}
										src={friend.profiles.avatar_url}
									/>
									<AvatarFallback>F1</AvatarFallback>
								</Avatar>
								<div className='grid gap-0.5 text-xs'>
									<div className='font-medium'>
										{friend.profiles.full_name}
									</div>
									<div className='text-zinc-500 dark:text-zinc-400'>
										{friend.profiles.user_email}
									</div>
								</div>
							</div>
						))}
					</div>
				</CardContent>
			</Card>
		</div>
	);
};
