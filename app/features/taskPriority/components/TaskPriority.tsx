import { Priority } from "@/types/tasks";

type Props = {
	priority: Priority;
};

export const TaskPriority = ({ priority }: Props) => {
	let bgColor = "";
	switch (priority) {
		case "Low":
			bgColor = "bg-blue-600";
			break;
		case "Medium":
			bgColor = "bg-amber-600";
			break;
		case "High":
			bgColor = "bg-red-600";
			break;
		default:
			bgColor = "bg-black";
			break;
	}

	return (
		<div className="flex items-center justify-center">
			<div
				className={`py-1 px-4 rounded-lg shadow-md text-white flex  items-center justify-center ${bgColor}`}
			>
				<span className="text-lg">Priority: {priority}</span>
			</div>
		</div>
	);
};
