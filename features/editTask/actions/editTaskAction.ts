'use server';

import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { z } from 'zod';

export async function editTask(
	formData: FormData,
	id: number,
	created_by: string
) {
	const supabase = createServerActionClient({
		cookies,
	});

	const {
		data: { user },
	} = await supabase.auth.getUser();

	const formSchema = z.object({
		name: z.string().trim().min(2).max(50),
		description: z.string().trim().min(2).max(250),
		priority: z.string(),
		status: z.string(),
		assignee: z.string(),
		created_by: z.string(),
	});

	const updatedTask = {
		name: formData.get('name'),
		description: formData.get('description'),
		priority: formData.get('priority'),
		status: formData.get('status'),
		assignee: user?.id as string,
		created_by: created_by as string,
	};

	const data = formSchema.parse(updatedTask);

	await supabase.from('tasks').update([data]).eq('id', id).select();

	revalidatePath('/dashboard');
}
