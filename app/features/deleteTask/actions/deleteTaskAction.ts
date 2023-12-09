'use server';

import { CookieOptions, createServerClient } from '@supabase/ssr';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export async function deleteTask(id: number) {
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

	const { error } = await supabase.from('tasks').delete().eq('id', id);
	if (error)
		return {
			message: 'Failed to delete task',
		};

	revalidatePath('/dashboard');
}
