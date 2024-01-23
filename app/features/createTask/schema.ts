import { z } from "zod";

export const formSchema = z.object({
	name: z
		.string()
		.trim()
		.min(2, {
			message: "This field must be at least 2 characters long.",
		})
		.max(50, {
			message: "This field must be at most 50 characters long.",
		}),
	description: z
		.string()
		.trim()
		.min(2, {
			message: "This field must be at least 2 characters long.",
		})
		.max(250, {
			message: "This field must be at most 250 characters long.",
		}),
	priority: z.string({
		required_error: "This field is required.",
	}),
	status: z.string({
		required_error: "This field is required.",
	}),
	assignee: z.string().optional(),
	created_by: z.string(),
});
