import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { Dashboard } from '@/app/components/Dashboard';

export default async function DashboardIndex({
	searchParams,
}: {
	searchParams?: { [key: string]: string };
}) {
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

	const {
		data: { session },
	} = await supabase.auth.getSession();
	if (!session) {
		redirect('/login');
	}

	return <Dashboard search={searchParams?.search ?? 'all'} />;
}
