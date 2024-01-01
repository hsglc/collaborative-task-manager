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
};
