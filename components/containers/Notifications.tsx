'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns';
import { Building2 } from 'lucide-react';

import { Skeleton } from '@/components/ui/skeleton';
import { FriendRequest } from '../FriendRequest';

interface Notification {
	commit_timestamp: string;
	errors: any;
	eventType: 'DELETE' | 'INSERT' | 'UPDATE';
	new: New;
	old: Old;
	schema: string;
	table: string;
}

interface New {
	id: number;
	status: string;
	sender_email: string;
	receiver_email: string;
	created_at: string;
}

interface Old {
	id: number;
}

interface User {
	email: string;
}

export const Notifications = () => {
	const supabase = createClientComponentClient();
	const [user, setUser] = useState<User>({} as User);
	const [notifications, setNotifications] = useState<New[]>([]);

	console.log('user :', user);

	const getUserAndNotifications = async () => {
		const {
			data: { user },
		} = await supabase.auth.getUser();
		const { data: notifications } = await supabase
			.from('friends')
			.select('*');

		const newNotifications = notifications?.filter((notification) => {
			return (
				notification.receiver_email === user?.email ||
				notification.sender_email === user?.email
			);
		});

		setNotifications(newNotifications as New[]);
		setUser(user as User);
	};

	useEffect(() => {
		getUserAndNotifications();
	}, []);

	useEffect(() => {
		const channel = supabase
			.channel('friends')
			.on(
				'postgres_changes',
				{
					schema: 'public',
					table: 'friends',
					event: '*',
				},
				(payload) => {
					const notification = payload as Notification;
					if (
						notification.new.receiver_email !== user.email &&
						notification.new.sender_email !== user.email
					) {
						return;
					}

					if (notification.eventType === 'INSERT') {
						setNotifications([...notifications, notification.new]);
					} else if (notification.eventType === 'UPDATE') {
						const updatedNotifications = notifications.map(
							(oldNotification) => {
								if (
									oldNotification.id === notification.new.id
								) {
									return notification.new;
								}
								return oldNotification;
							}
						);
						setNotifications(updatedNotifications);
					}
				}
			)
			.subscribe();
		return () => {
			supabase.removeChannel(channel);
		};
	}, [user, notifications]);

	return (
		<div className='col-span-2 bg-secondary p-4 space-y-8 rounded-xl rounded-b-none mr-4'>
			<h4 className='text-xl font-medium flex-center gap-4'>
				{' '}
				<span>NOTIFICATION CENTER</span> <Building2 />
			</h4>
			<div className='space-y-4'>
				{notifications.length > 0 ? (
					<div className='space-y-4'>
						<div>
							<h2 className='text-lg font-bold mb-4'>
								Unread Messages (
								{
									notifications.filter(
										(notification) =>
											notification.status === 'Waiting' &&
											notification.receiver_email ===
												user.email
									).length
								}
								)
							</h2>
							<div className='space-y-3'>
								{notifications
									.filter(
										(notification) =>
											notification.status === 'Waiting' &&
											notification.receiver_email ===
												user.email
									)
									.map((notification) => {
										return (
											<FriendRequest
												currentUserEmail={user.email}
												notification={notification}
												key={notification.id}
											/>
										);
									})}
							</div>
						</div>
						<div>
							<h2 className='text-lg font-bold mb-4'>
								Read Messages (
								{
									notifications.filter(
										(notification) =>
											notification.status !== 'Waiting'
									).length
								}
								)
							</h2>
							<div className='space-y-3'>
								{notifications
									.filter(
										(notification) =>
											notification.status ===
												'Approved' ||
											notification.status === 'Rejected'
									)
									.map((notification) => {
										return (
											<FriendRequest
												currentUserEmail={user.email}
												notification={notification}
												key={notification.id}
											/>
										);
									})}
							</div>
						</div>
					</div>
				) : (
					<div className='space-y-6'>
						<Skeleton className='w-full h-[28px] rounded-lg' />
						<Skeleton className='w-full h-[28px] rounded-lg' />
						<Skeleton className='w-full h-[28px] rounded-lg' />
						<Skeleton className='w-full h-[28px] rounded-lg' />
						<Skeleton className='w-full h-[28px] rounded-lg' />
					</div>
				)}
			</div>
		</div>
	);
};
