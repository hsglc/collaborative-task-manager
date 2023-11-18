import React from 'react';

import { fetchFriends } from '@/features/friendship/actions/fetchFriends';

import { FriendsContainer } from '@/features/friendship/containers/FriendsContainer';

export default async function Friends() {
	return <FriendsContainer />;
}
