"use client";
import React from 'react';
import Image from 'next/image';
import useUser from '@/hooks/useUser';
import Avatar from '../Avatar';

const UserHero = ({userId}) => {
    const { data: fetchedUser } = useUser(userId);

  return (
    <div>
      <div className='bg-[#0b0a1be5] h-44 w-auto relative'>
        {fetchedUser?.coverImage && (
          <Image 
            src={fetchedUser.coverImage} 
            fill 
            alt="Cover Image" 
            style={{ objectFit: 'cover' }}
            sizes='100'
            placeholder="blur"
            blurDataURL={fetchedUser?.coverImage}
          />
        )}
        <div className="absolute -bottom-16 left-4">
          <Avatar userId={userId} isLarge hasBorder />
        </div>

      </div>
    </div>
  )
}

export default UserHero
