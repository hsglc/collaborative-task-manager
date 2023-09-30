import Country from '@/components/Country';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export default async function Index() {
	const supabase = createServerComponentClient({ cookies });

	const {
		data: countries,
		count,
		status,
	} = await supabase.from('countries').select().match({ isEuropean: true });

	return (
		<ul className='my-auto text-foreground'>
			<p>Status : {status}</p>
			<p>Count : {count}</p>
			{countries?.map((country) => (
				<li key={country.id}>{country.name}</li>
			))}
			<Country />
		</ul>
	);
}
