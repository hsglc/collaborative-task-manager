import { CookieOptions, createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
	const requestUrl = new URL(request.url);
	const formData = await request.formData();
	const email = String(formData.get('email'));
	const password = String(formData.get('password'));

	const cookieStore = cookies();

	const supabase = createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			cookies: {
				get(name: string) {
					return cookieStore.get(name)?.value;
				},
				set(name: string, value: string, options: CookieOptions) {
					cookieStore.set({ name, value, ...options });
				},
				remove(name: string, options: CookieOptions) {
					cookieStore.set({ name, value: '', ...options });
				},
			},
		}
	);

	const { error } = await supabase.auth.signUp({
		email,
		password,
		options: {
			emailRedirectTo: `${requestUrl.origin}/auth/callback`,
		},
	});

	if (error) {
		return NextResponse.redirect(
			`${requestUrl.origin}/login?error=Could not authenticate user`,
			{
				// a 301 status is required to redirect from a POST to a GET route
				status: 301,
			}
		);
	}

	return NextResponse.redirect(
		`${requestUrl.origin}/login?message=Check email to continue sign in process`,
		{
			// a 301 status is required to redirect from a POST to a GET route
			status: 301,
		}
	);
}
