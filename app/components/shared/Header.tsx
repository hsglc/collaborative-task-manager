import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

import { NavigationBar } from './Navbar';
import { User } from '@/types/users';

export const Header = async () => {
	const cookieStore = cookies();

	const supabase = createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			cookies: {
				get(name: string) {
					return cookieStore.get(name)?.value;
				},
			},
		}
	);

	const { data } = await supabase.auth.getUser();
	if (!data.user) return null;

	return <NavigationBar user={data.user as User} />;
};

export default Header;
