"use client";
import { Input } from "@nextui-org/react";
import { KeyRound } from "lucide-react";
import { useState } from "react";

import { EyeFilledIcon } from "@/icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/icons/EyeSlashFilledIcon";

const PasswordInput = () => {
	const [isVisible, setIsVisible] = useState(false);

	const toggleVisibility = () => setIsVisible(!isVisible);
	return (
		<Input
			name="password"
			label="Password"
			placeholder="Enter your password"
			labelPlacement="outside"
			required
			startContent={
				<KeyRound className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
			}
			endContent={
				<button
					className="focus:outline-none"
					type="button"
					onClick={toggleVisibility}
				>
					{isVisible ? (
						<EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
					) : (
						<EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
					)}
				</button>
			}
			type={isVisible ? "text" : "password"}
			className="w-full"
		/>
	);
};

export default PasswordInput;
