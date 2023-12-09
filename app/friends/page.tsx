import React from 'react';

import { fetchFriends } from '@/app/features/friendship/actions/fetchFriends';

import { FriendsContainer } from '@/app/features/friendship/containers/FriendsContainer';

export default async function Friends() {
	return <FriendsContainer />;
}
