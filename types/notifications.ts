export type Notification = {
	created_at: string;
	id: number;
	is_read: boolean;
	target_id: string;
	sender_id: string;
	type:
		| 'Friendship Request'
		| 'Friendship Accepted'
		| 'Friendship Rejected'
		| 'New Task Assigned'
		| 'Task Updated';
	profiles: {
		avatar_url: string;
		full_name: string;
		user_email: string;
		id: string;
	};
};
