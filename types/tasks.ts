export type Task = {
	id: number;
	name: string;
	description: string;
	created_at: string;
	created_by: string;
	priority: Priority;
	status: Status;
};

export type Priority = 'Low' | 'Medium' | 'High';
export type Status = 'Backlog' | 'In Progress' | 'Waiting Approval' | 'Done';
