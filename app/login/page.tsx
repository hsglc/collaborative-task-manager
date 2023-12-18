import { Button, Divider } from "@nextui-org/react";

import SocialloginButton from "@/app/components/SocialLoginButton";
import { Suspense } from "react";
import MailInput from "./mailInput";
import Messages from "./messages";
import PasswordInput from "./passwordInput";

export default async function Login() {
	return (
		<div className="flex flex-col w-full m-auto px-8 sm:max-w-2xl justify-center gap-2 h-screen max-h-[calc(100vh-68px)] space-y-8 text-lg">
			<div className="flex flex-col gap-3 ">
				<SocialloginButton provider="google" />
				<SocialloginButton provider="github" />
			</div>
			<div className="flex items-center justify-between">
				<Divider className="w-[210px]" />
				<p>or sign up with email</p>
				<Divider className="w-[210px]" />
			</div>
			<form
				className=" flex flex-col w-full justify-center gap-3 text-foreground"
				action="/auth/sign-in"
				method="post"
			>
				<MailInput />
				<PasswordInput />

				<Button color="primary" variant="solid" type="submit">
					Sign In
				</Button>

				<Button
					type="submit"
					formAction="/auth/sign-up"
					color="primary"
					variant="bordered"
				>
					Sign Up
				</Button>
				<Suspense fallback={<div>Loading...</div>}>
					<Messages />
				</Suspense>
			</form>
		</div>
	);
}
