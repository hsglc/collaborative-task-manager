'use server';

import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { z } from 'zod';

export async function addFriends(formData: FormData) {
	const supabase = createServerActionClient({
		cookies,
	});

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

	const { data, error } = await supabase
		.from('friends')
		.insert([{ user_id: user?.id, friend_id: friend[0].id }])
		.select();

	if (error) {
		console.error(error);
		return;
	}
	revalidatePath('/friends');
}
