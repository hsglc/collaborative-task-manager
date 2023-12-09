'use client';

//@ts-expect-error
import { useFormStatus } from 'react-dom';

import { Button } from '@/app/components/ui/button';

type Props = {
	text: string;
};

export function FormActionButton({ text }: Props) {
	const { pending } = useFormStatus();

	return (
		<Button
			className='w-full bg-green-700 hover:bg-green-500 flex-center gap-3'
			type='submit'
			aria-disabled={pending}>
			{pending ? 'Processing...' : text}
			{pending ? (
				<div className='flex justify-center items-center h-screen'>
					<div className='animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white' />
				</div>
			) : null}
		</Button>
	);
}
