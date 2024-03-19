"use client";
import React, { useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from 'react-icons/ai';
import { formatDistanceToNowStrict } from 'date-fns';
import useCurrentUser from '@/hooks/useCurrentUser';
import useComments from '@/hooks/useComments';
import useUser from '@/hooks/useUser';
import useLoginModal from '@/hooks/useLoginModal';
import useLike from '@/hooks/useLike';
import Avatar from '../Avatar';

const PostItem = ({data = {}, userId}) => {
    const router = useRouter();
    const loginModal = useLoginModal();

    const {data: currentUser} = useCurrentUser();
    const {data: user} = useUser(data.userId);
    const {data: comments = []} = useComments(data._id);
    const { hasLiked, toggleLike } = useLike({postId: data._id, userId});

    const goToUser= useCallback((ev) => {
        ev.stopPropagation();
        router.push(`/users/${data.userId}`)
    }, [router, data.userId ]);

    const goToPost = useCallback(() => {
      router.push(`/posts/${data._id}`);
    }, [router, data._id]);

    const onLike = useCallback(async (ev) => {
      ev.stopPropagation();
      if(!currentUser) {
        return loginModal.onOpen();
      }

      toggleLike();
    },[loginModal,currentUser, toggleLike]);

    const LikeIcon = hasLiked? AiFillHeart : AiOutlineHeart;

    const createdAt = useMemo(() => {
      if(!data?.createdAt) {
        return null;
      }

      return formatDistanceToNowStrict(new Date(data.createdAt));
    },[data.createdAt])

  return (
    <div
      onClick={goToPost}
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
          <div className='flex flex-row items-start gap-3'>
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
          <div className='flex flex-row items-center gap-10 mt-3'>
            <div
              className='
                flex 
                flex-row 
                items-center 
                text-neutral-500 
                gap-2 
                cursor-pointer 
                transition 
                hover:text-sky-500
              '
            >
              <AiOutlineMessage size={20} />
              <p>
                {comments?.length || 0}
              </p>
            </div>
            <div
              onClick={onLike}
              className='
                flex 
                flex-row 
                items-center 
                text-neutral-500 
                gap-2 
                cursor-pointer 
                transition 
                hover:text-red-500
              '
            >
              <LikeIcon color={hasLiked ? 'red' : ''} size={20} />
              <p>
                {data.likedIds?.length || 0}
              </p>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default PostItem
