'use server';

import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { z } from 'zod';

export async function createTask(formData: FormData) {
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

	const createdTask = {
		name: formData.get('name'),
		description: formData.get('description'),
		priority: formData.get('priority'),
		status: formData.get('status'),
		assignee: user?.id as string,
		created_by: user?.id as string,
	};

	const data = formSchema.parse(createdTask);

	await supabase.from('tasks').insert([data]);
	revalidatePath('/dashboard');
}
