'use client';
import React, { useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const Country = () => {
	const supabase = createClientComponentClient();

	useEffect(() => {
		const channel = supabase
			.channel('countries')
			.on(
				'postgres_changes',
				{
					event: 'INSERT',
					schema: 'public',
					table: 'countries',
				},
				(payload) => {
					console.log('payload :', payload);
				}
			)
			.subscribe();
		return () => {
			channel.unsubscribe();
		};
	}, [supabase]);

	return <div>Country</div>;
};

export default Country;
