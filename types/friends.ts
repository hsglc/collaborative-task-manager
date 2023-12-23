type UserProfile = {
	id: string;
	avatar_url: string;
	full_name: string;
	user_email: string;
};

export type Friendship = {
	user_id: string;
	status: string;
	profiles: UserProfile;
};
