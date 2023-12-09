'use client';

import { createBrowserClient } from '@supabase/ssr';
import { Provider } from '@supabase/supabase-js';

import { TbBrandGithubFilled } from 'react-icons/tb';
import { BsGoogle } from 'react-icons/bs';

interface Props {
	provider: Provider;
}

const providers = {
	github: {
		name: 'Github',
		icon: <TbBrandGithubFilled />,
	},
	google: {
		name: 'Google',
		icon: <BsGoogle />,
	},
};

const SocialLoginButton = ({ provider }: Props) => {
	const supabase = createBrowserClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
	);

	const getURL = () => {
		let url =
			process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
			process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
			'http://localhost:3000/';
		// Make sure to include `https://` when not localhost.
		url = url.includes('http') ? url : `https://${url}`;
		// Make sure to include a trailing `/`.
		url = url.charAt(url.length - 1) === '/' ? url : `${url}/`;
		return url;
	};

	const loginHandler = async () => {
		await supabase.auth.signInWithOAuth({
			provider,
			options: {
				redirectTo: getURL() + '/auth/callback',
			},
		});
	};

	return (
		<div
			className='bg-[#016FF0] hover:cursor-pointer transition-all text-white font-semibold flex items-center justify-center gap-3 p-2  rounded-md'
			onClick={loginHandler}>
			{providers[provider as keyof typeof providers].icon}
			Continue with {providers[provider as keyof typeof providers].name}
		</div>
	);
};

export default SocialLoginButton;
