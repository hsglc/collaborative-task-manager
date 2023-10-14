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
	console.log('formData :', formData);
	console.log('name :', formData.get('name'));

	const formSchema = z.object({
		name: z.string().trim().min(2).max(50),
		description: z.string().trim().min(2).max(250),
		priority: z.string(),
		assignee: z.string(),
		createdBy: z.string(),
	});

	const newTodo = {
		name: formData.get('name'),
		description: formData.get('description'),
		priority: formData.get('priority'),
		assignee: user?.id as string,
		createdBy: user?.id as string,
	};

	const data = formSchema.parse(newTodo);

	await supabase.from('todo').insert([data]);
	revalidatePath('/dashboard');
}
