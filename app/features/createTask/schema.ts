import { z } from "zod";

export const formSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, {
      message: "This field must be at least 2 characters long.",
    })
    .max(80, {
      message: "This field must be at most 80 characters long.",
    }),
  description: z
    .string()
    .trim()
    .min(2, {
      message: "This field must be at least 2 characters long.",
    })
    .max(350, {
      message: "This field must be at most 350 characters long.",
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
