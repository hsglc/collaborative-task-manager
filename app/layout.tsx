import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';

import './globals.css';

export const metadata = {
	title: 'Collaborative Task Manager',
	description: 'A collaborative task manager built with Supabase and Next.js',
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
				<header className='text-white py-21 bg-primary'>
					<nav className='w-full flex justify-center'>
						<div className='w-full max-w-7xl flex justify-between items-center p-3 text-sm'>
							<div />
							<div>
								{user ? (
									<div className='flex-center gap-12'>
										<div className='flex-center gap-3'>
											<Avatar>
												<AvatarImage
													src={
														user.user_metadata
															.avatar_url
													}
												/>
												<AvatarFallback>
													<Skeleton className='w-[100px] h-[20px] rounded-full' />
												</AvatarFallback>
											</Avatar>
											Hey, {user.user_metadata.full_name}!
										</div>
									</div>
								) : (
									<Link
										href='/login'
										className='py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover'>
										Login
									</Link>
								)}
							</div>
						</div>
					</nav>
				</header>
				<main>{children}</main>
			</body>
		</html>
	);
}
