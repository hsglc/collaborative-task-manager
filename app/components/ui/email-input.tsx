"use client";

import { Button } from "@/app/components/ui/button";
import { Input, InputProps } from "@/app/components/ui/input";
import { cn } from "@/lib/shared";
import { MailIcon } from "lucide-react";
import { forwardRef, useState } from "react";

const EmailInput = forwardRef<HTMLInputElement, InputProps>(
	({ className, ...props }, ref) => {
		const [showPassword, setShowPassword] = useState(false);

		return (
			<div className="relative">
				<Input
					type="email"
					name="email"
					id="email"
					className={cn("hide-password-toggle pl-10", className)}
					ref={ref}
					{...props}
				/>
				<Button
					type="button"
					variant="ghost"
					className="absolute  top-0 h-full px-3 py-2"
				>
					<MailIcon color="#aca0a0" />
				</Button>
			</div>
		);
	},
);
EmailInput.displayName = "PasswordInput";

export { EmailInput };
