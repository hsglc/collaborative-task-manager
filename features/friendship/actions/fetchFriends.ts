'use server';

import { Friendship } from '@/types/friends';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function fetchFriends() {
	const supabase = createServerActionClient({
		cookies,
	});

	const {
		data: { user },
	} = await supabase.auth.getUser();

	let { data: friends } = await supabase
		.from('friends')
		.select(
			`
  user_id,
  profiles!friends_friend_id_fkey (
	id,
	user_email,
	username,
	avatar_url,
	full_name
  )
`
		)
		.eq('user_id', user?.id)
		.returns<Friendship[]>();

	return friends;
}
