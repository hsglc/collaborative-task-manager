'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
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
	const supabase = createClientComponentClient();

	const loginHandler = async () => {
		await supabase.auth.signInWithOAuth({
			provider,
			options: {
				redirectTo: 'http://localhost:3000/auth/callback',
			},
		});
	};

	return (
		<div
			className='bg-[#2e2e2e] hover:bg-[#343434] hover:cursor-pointer transition-all text-white font-semibold flex items-center justify-center gap-3 p-2 border border-[#505050] rounded-md'
			onClick={loginHandler}>
			{providers[provider as keyof typeof providers].icon}
			Continue with {providers[provider as keyof typeof providers].name}
		</div>
	);
};

export default SocialLoginButton;
