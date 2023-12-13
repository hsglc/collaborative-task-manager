import { Button } from "@/app/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { addFriends } from "@/app/features/friendship/actions/addFriends";

export const AddNewFriendsCard = () => {
	return (
		<Card className="w-full max-w-lg">
			<form action={addFriends}>
				<CardHeader className="flex flex-row items-start">
					<div className="space-y-1.5">
						<CardTitle>Send Friend Request</CardTitle>
						<CardDescription>Invite a friend via email.</CardDescription>
					</div>
				</CardHeader>
				<CardContent className="border-t pt-4">
					<div className="space-y-2">
						<Label className="sr-only" htmlFor="user_email">
							Email
						</Label>
						<Input
							name="user_email"
							className="text-black"
							id="user_email"
							placeholder="Enter friend's email"
							type="email"
						/>
					</div>
				</CardContent>
				<CardFooter>
					<Button variant="ghost">Cancel</Button>
					<Button className="ml-auto">Send Request</Button>
				</CardFooter>
			</form>
		</Card>
	);
};
