import { Button } from "@/app/components/ui/button";
import { EmailInput } from "@/app/components/ui/email-input";
import { PasswordInput } from "@/app/components/ui/password-input";
import { Separator } from "@/app/components/ui/separator";
import SocialloginButton from "@/app/login/components/SocialLoginButton";
import { createClient } from "@/app/lib/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { login, signup } from "./actions";

export default async function Login() {
	const cookieStore = cookies();
	const supabase = createClient(cookieStore);

	const { data, error } = await supabase.auth.getUser();
	if (!error || data?.user) {
		redirect("/dashboard");
	}

	return (
		<div className="flex flex-col w-full m-auto px-8 sm:max-w-2xl justify-center gap-2 h-screen max-h-[calc(100vh-68px)] space-y-8 text-lg">
			<div className="flex flex-col gap-3 ">
				<SocialloginButton provider="google" />
				<SocialloginButton provider="github" />
			</div>
			<div className="flex items-center justify-between">
				<Separator className="w-[210px]" />
				<p>or sign up with email</p>
				<Separator className="w-[210px]" />
			</div>
			<form className=" flex flex-col w-full justify-center gap-3 text-foreground">
				<EmailInput autoComplete="email" placeholder="Email" />
				<PasswordInput autoComplete="password" placeholder="Password" />

				<Button
					color="primary"
					variant="black"
					type="submit"
					formAction={login}
				>
					Sign In
				</Button>

				<Button
					type="submit"
					formAction={signup}
					color="primary"
					variant="black"
				>
					Sign Up
				</Button>
			</form>
		</div>
	);
}
