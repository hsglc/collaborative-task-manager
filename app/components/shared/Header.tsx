import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

import { NavigationBar } from "./Navbar";

export const metadata = {
	title: "CollaboraMate",
	description: "Task management for teams and individuals.",
};

export const Header = async () => {
	const cookieStore = cookies();

	const supabase = createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			cookies: {
				get(name: string) {
					return cookieStore.get(name)?.value;
				},
			},
		},
	);

	const {
		data: { user },
	} = await supabase.auth.getUser();
	return (
		<header className="text-black py-21 bg-white">
			<NavigationBar user={user} />
		</header>
	);
};

export default Header;
