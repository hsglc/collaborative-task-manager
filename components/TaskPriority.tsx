type Props = {
	priority: 'Low' | 'Medium' | 'High';
};

export const TaskPriority = ({ priority }: Props) => {
	let colorClass = '';
	switch (priority) {
		case 'Low':
			colorClass = 'bg-blue-500';
			break;
		case 'Medium':
			colorClass = 'bg-yellow-500';
			break;
		case 'High':
			colorClass = 'bg-red-500';
			break;
		default:
			colorClass = 'bg-gray-500';
	}

	return (
		<div className='flex items-center justify-center'>
			<div
				className={`py-1 px-4 rounded-lg shadow-md text-white flex  items-center justify-center ${colorClass}`}>
				<span className='text-lg font-bold'>Priority: {priority}</span>
			</div>
		</div>
	);
};
