'use client';

// @ts-ignore
import { experimental_useFormStatus as useFormStatus } from 'react-dom';

import { Button } from '@/components/ui/button';

type Props = {
	type: 'create' | 'edit';
};

export function TaskActionButton({ type }: Props) {
	const { pending } = useFormStatus();

	const text = type === 'create' ? 'Create' : 'Edit';

	return (
		<Button
			className='w-full bg-green-700 hover:bg-green-500 flex-center gap-3'
			type='submit'
			aria-disabled={pending}>
			{pending ? 'Processing...' : text}
			{pending ? (
				<div className='flex justify-center items-center h-screen'>
					<div className='animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white'></div>
				</div>
			) : null}
		</Button>
	);
}
