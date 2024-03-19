"use client";
import React from 'react';
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { ClipLoader } from 'react-spinners';
import Header from '@/components/Header';
import NotificationsFeed from '@/components/NotificationsFeed';



const Notifications = () => {
    const session = useSession();
    const status = session?.status;
    
    if (status === 'unauthenticated') {
        return redirect('/');
     }

     if (status === 'loading') {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <div className="w-full h-full flex items-center justify-center">
                    <ClipLoader size={50} color={"#123abc"} loading={true} />
                </div>
            </div>
        );
    }

    return (
        <>
            <Header label='Notifications' showBackArrow />
            <NotificationsFeed />
        </>
    );
}

export default Notifications
