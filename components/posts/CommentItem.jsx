"use client";
import React, { useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { formatDistanceToNowStrict } from 'date-fns';
import useUser from '@/hooks/useUser';
import Avatar from '../Avatar';

const CommentItem = ({ data = {} }) => {
    const router = useRouter();
    const { data: user } = useUser(data.userId);
    
    const goToUser = useCallback((ev) => {
        ev.stopPropagation();
        const url = `/users/${data.userId}`;
        router.push(url);
    }, [router, data.userId]);

    const createdAt = useMemo(() => {
        if(!data?.createdAt) {
            return null;
        }
        return formatDistanceToNowStrict(new Date(data.createdAt));
    },[data.createdAt]);


  return (
    <div 
        className='
            border-b-[1px] 
            border-neutral-600 
            p-5 
            cursor-pointer 
            hover:bg-[#0b0a1be5] 
            transition
        '
    >
        <div className='flex flex-row items-start gap-3'>
            <Avatar userId={data.userId} />
            <div>
                <div className='flex flex-row items-center gap-2'>
                    <p 
                    onClick={goToUser}
                    className='
                        text-white 
                        font-semibold 
                        cursor-pointer 
                        hover:underline
                    '
                    >
                        {user?.name}
                    </p>
                    <span 
                    onClick={goToUser}
                    className='
                        text-neutral-500
                        cursor-pointer
                        hover:underline
                        hidden
                        md:block
                    '
                    >
                        @{user?.username}
                    </span>
                    <span className='text-neutral-500 text-sm'>
                        {createdAt}
                    </span>
                </div>
                <div className='text-white mt-1'>
                    {data.body}
                </div>   
            </div>
        </div>
    </div>
  )
}

export default CommentItem
