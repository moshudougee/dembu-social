"use client";
import React from 'react';
import useUsers from '@/hooks/useUsers';
import Avatar from '../Avatar';


const FollowBar = () => {
  // There is some logic wrong with this interms of updating after changes
  const { data: users = [], isLoading, error } = useUsers();

  if(isLoading) {
    return (
      <div>Loading...</div>
    )
  }
  if(error || users.length === 0) {
    return (
      <div>An error occurred...</div>
    );
  }
  return (
    <div className='px-6 py-4 hidden lg:block'>
      <div className='bg-[#0b0a1be5] rounded-xl p-4'>
        <h2 className='text-white text-xl font-semibold'>Who to follow</h2>
        <div className='flex flex-col gap-6 mt-4'>
          {users.map((user) => (
              <div key={user._id} className="flex flex-row gap-4">
                <Avatar userId = {user._id}  />
                <div className="flex flex-col">
                  <p className="text-white font-semibold text-sm">{user.name}</p>
                  <p className="text-neutral-400 text-sm">@{user.username}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default FollowBar
