import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
	CardTitle,
	CardDescription,
	CardHeader,
	CardContent,
	CardFooter,
	Card,
} from '@/components/ui/card';
import { addFriends } from '@/features/friendship/actions/addFriends';

export const AddNewFriendsCard = () => {
	return (
		<Card className='w-full max-w-lg'>
			<form action={addFriends}>
				<CardHeader className='flex flex-row items-start'>
					<div className='space-y-1.5'>
						<CardTitle>Send Friend Request</CardTitle>
						<CardDescription>
							Invite a friend via email.
						</CardDescription>
					</div>
				</CardHeader>
				<CardContent className='border-t pt-4'>
					<div className='space-y-2'>
						<Label className='sr-only' htmlFor='user_email'>
							Email
						</Label>
						<Input
							name='user_email'
							className='text-black'
							id='user_email'
							placeholder="Enter friend's email"
							type='email'
						/>
					</div>
				</CardContent>
				<CardFooter>
					<Button variant='ghost'>Cancel</Button>
					<Button className='ml-auto'>Send Request</Button>
				</CardFooter>
			</form>
		</Card>
	);
};
