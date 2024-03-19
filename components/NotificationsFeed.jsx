"use client";
import React, { useEffect } from 'react';
import { FaDragon } from 'react-icons/fa';
import useNotifications from '@/hooks/useNotifications';
import useCurrentUser from '@/hooks/useCurrentUser';

const NotificationsFeed = () => {
    const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
    const { data: fetchedNotifications = [] } = useNotifications(currentUser?._id);

    useEffect(() => {
        mutateCurrentUser();
    }, [mutateCurrentUser]);

    if(fetchedNotifications.length === 0) {
        return (
            <div className="text-neutral-600 text-center p-6 text-xl">
              No notifications
            </div>
          );
    }
    return (
        <div className='flex flex-col'>
            {fetchedNotifications.map((notification) => (
            <div key={notification._id} className="flex flex-row items-center p-6 gap-4 border-b-[1px] border-neutral-800">
                <FaDragon color='white' size={32} />
                <p className="text-white">
                    {notification.body}
                </p>
            </div>
            ))}
        </div>
    )
}

export default NotificationsFeed
