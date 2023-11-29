import './globals.css';

import { Providers } from './providers';
import { Toaster } from '@/components/ui/toaster';
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
	return (
		<html lang='en' className='flex items-center justify-center'>
			<body className='text-black bg-white w-10/12 max-w-8xl '>
				<Header />
				<Providers>
					<main>{children}</main>
					<Toaster />
				</Providers>
			</body>
		</html>
	);
}
