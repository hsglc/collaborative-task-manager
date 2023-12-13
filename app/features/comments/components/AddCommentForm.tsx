"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { createBrowserClient } from "@supabase/ssr";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/app/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";

const formSchema = z.object({
	comment: z.string().min(1, {
		message: "Comment must be at least 1 character long.",
	}),
});

export function AddCommentForm() {
	const searchParams = useSearchParams();
	const taskId = searchParams.get("taskId");

	const supabase = createBrowserClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
	);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			comment: "",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);

		const {
			data: { user },
		} = await supabase.auth.getUser();

		const { data, error } = await supabase
			.from("comments")
			.insert([
				{
					comment: values.comment,
					task_id: taskId,
					user_id: user?.id,
				},
			])
			.select();
		if (!error) {
			form.reset();
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="comment"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Comment</FormLabel>
							<FormControl>
								<Input placeholder="Leave a comment!" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Submit</Button>
			</form>
		</Form>
	);
}
