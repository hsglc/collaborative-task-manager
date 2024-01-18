/**
 * v0 by Vercel.
 * @see https://v0.dev/t/7D4P3oXD5j2
 */
export default function NoTask() {
	return (
		<div className="flex flex-col items-center justify-center h-64  rounded-md shadow-md p-4">
			<InboxIcon className="h-16 w-16 text-gray-400" />
			<h2 className="text-2xl font-semibold text-gray-700 mt-4">No Tasks</h2>
			<p className="text-gray-500 mt-2">
				You have no tasks at the moment. Enjoy your free time!
			</p>
		</div>
	);
}

function InboxIcon({ className }: { className: string }) {
	return (
		<svg
			className={className}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
			<path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
		</svg>
	);
}
