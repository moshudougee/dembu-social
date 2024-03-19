"use client";
import React from 'react';
import Header from '@/components/Header';
import UserHero from '@/components/users/UserHero';
import UserBio from '@/components/users/UserBio';
import { ClipLoader } from 'react-spinners';
import useUser from '@/hooks/useUser';
import PostFeed from '@/components/posts/PostFeed';


const UserView = ({params}) => {
    const userId = params.userId;
    //console.log('User ID is ' + userId);
    const { data: fetchedUser, isLoading } = useUser(userId);
    
    if (isLoading || !fetchedUser) {
        return (
        <div className="flex justify-center items-center h-full">
            <ClipLoader color="lightblue" size={80} />
       </div>
        );
    }
  return (
    <>
        <Header showBackArrow label={fetchedUser?.name} />
        <UserHero userId={userId} />
        <UserBio userId={userId} />
        <PostFeed userId={userId} />
    </>
  )
}

export default UserView
