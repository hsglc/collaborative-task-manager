export type User = {
	id: string;
	aud: string;
	role: string;
	email: string;
	email_confirmed_at: string;
	created_at: string;
	updated_at: string;
	app_metadata: {
		provider: string;
		providers: string[];
	};
	identities: IdentityInfo[];
	user_metadata: {
		avatar_url: string;
		email: string;
		email_verified: boolean;
		full_name: string;
		iss: string;
		name: string;
		phone_verified: boolean;
		picture: string;
		preferred_username: string;
		provider_id: string;
		sub: string;
		user_name: string;
	};
	last_sign_in_at: string;
	phone: string;
};

interface IdentityInfo {
	created_at: string;
	email: string;
	id: string;
	identity_data: {
		avatar_url: string;
		email: string;
		email_verified: boolean;
		full_name: string;
		iss: string;
		name: string;
		phone_verified: boolean;
		picture: string;
		provider_id: string;
		sub: string;
	};
	identity_id: string;
	last_sign_in_at: string;
	provider: string;
	user_id: string;
}
