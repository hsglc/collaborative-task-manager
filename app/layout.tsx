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
	return (
		<html lang='en'>
			<body className='text-white bg-primary'>
				<Header />
				<main>{children}</main>
			</body>
		</html>
	);
}
