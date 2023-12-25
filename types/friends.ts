export type UserProfile = {
	id: string;
	avatar_url: string;
	full_name: string;
	user_email: string;
	friend_id: string;
};

export type Friendship = {
	user_id: string;
	status: string;
	id: number;
	profiles: UserProfile;
};

export type Friend = {
	id: string;
	user_id: string;
	friend_id: string;
	status: 'Pending' | 'Accepted' | 'Rejected';
	created_at: string;
};
