'use server';

import { Friendship } from '@/types/friends';
import { CookieOptions, createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function fetchFriends() {
	const cookieStore = cookies();

	const supabase = createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			cookies: {
				get(name: string) {
					return cookieStore.get(name)?.value;
				},
				set(name: string, value: string, options: CookieOptions) {
					cookieStore.set({ name, value, ...options });
				},
				remove(name: string, options: CookieOptions) {
					cookieStore.set({ name, value: '', ...options });
				},
			},
		}
	);

	const {
		data: { user },
	} = await supabase.auth.getUser();

	const { data: friends } = await supabase
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
