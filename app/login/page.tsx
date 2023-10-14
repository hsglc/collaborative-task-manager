import Link from 'next/link';
import Messages from './messages';

import SocialloginButton from '@/components/SocialLoginButton';

export default async function Login() {
	return (
		<div className='flex flex-col w-full m-auto px-8 sm:max-w-2xl justify-center gap-2 h-screen max-h-[calc(100vh-68px)] space-y-8 text-lg'>
			<div className='flex flex-col gap-3 '>
				<SocialloginButton provider='google' />
				<SocialloginButton provider='github' />
			</div>
			<form
				className=' flex flex-col w-full justify-center gap-1 text-foreground'
				action='/auth/sign-in'
				method='post'>
				<label className='text-md' htmlFor='email'>
					Email
				</label>
				<input
					className='rounded-md px-4 py-2 bg-inherit border mb-6'
					name='email'
					placeholder='you@example.com'
					required
				/>
				<label className='text-md' htmlFor='password'>
					Password
				</label>
				<input
					className='rounded-md px-4 py-2 bg-inherit border mb-6'
					type='password'
					name='password'
					placeholder='••••••••'
					required
				/>
				<button className='bg-green-700 rounded px-4 py-2 text-white mb-2'>
					Sign In
				</button>
				<button
					formAction='/auth/sign-up'
					className='border border-gray-700 rounded px-4 py-2  mb-2'>
					Sign Up
				</button>
				<Messages />
			</form>
		</div>
	);
}
