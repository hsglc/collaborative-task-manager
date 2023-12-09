'use server';

import { CookieOptions, createServerClient } from '@supabase/ssr';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { z } from 'zod';

export async function addFriends(formData: FormData) {
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

	const newFriendEmail = formData.get('user_email');

	const formSchema = z.string().email();

	const validatedEmail = formSchema.parse(newFriendEmail);

	const { data: friend } = await supabase
		.from('profiles')
		.select('id')
		.eq('user_email', validatedEmail);

	if (!friend) return;

	const { error } = await supabase
		.from('friends')
		.insert([{ user_id: user?.id, friend_id: friend[0].id }])
		.select();

	if (error) {
		console.error(error);
		return;
	}
	revalidatePath('/friends');
}
