import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import './globals.css';
import Header from '@/components/shared/Header';

export const metadata = {
	title: 'CollabMate',
	description: 'CollabMate is a task management app for teams.',
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const supabase = createServerComponentClient({ cookies });

	const {
		data: { user },
	} = await supabase.auth.getUser();
	return (
		<html lang='en'>
			<body className='text-white bg-primary'>
				<Header />
				<main>{children}</main>
			</body>
		</html>
	);
}
