type UserProfile = {
	id: string;
	username: string | null;
	avatar_url: string;
	full_name: string;
    user_email: string;
};

export type Friendship = {
	id: number;
	created_at_: string;
	user_id: string;
	friend_id: string;
	status: string;
	profiles: UserProfile;
};
