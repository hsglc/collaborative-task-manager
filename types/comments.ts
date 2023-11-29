export type Comment = {
	id: string;
	user_id: string;
	task_id: number;
	comment: string;
	created_at: string;
	profiles: {
		user_email: string;
		avatar_url: string;
		full_name: string;
	};
};
