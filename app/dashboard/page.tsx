import { Dashboard } from '@/components/Dashboard';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function DashboardIndex({
	searchParams,
}: {
	searchParams?: { [key: string]: string };
}) {
	const supabase = createServerComponentClient({ cookies });
	const {
		data: { session },
	} = await supabase.auth.getSession();
	if (!session) {
		redirect('/login');
	}

	return <Dashboard search={searchParams?.search ?? 'all'} />;
}
