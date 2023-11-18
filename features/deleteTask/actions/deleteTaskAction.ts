'use server';

import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export async function deleteTask(id: number) {
	const supabase = createServerActionClient({
		cookies,
	});

	await supabase.from('tasks').delete().eq('id', id);

	revalidatePath('/dashboard');
}
