"use client";
import React from 'react';
import usePosts from '@/hooks/usePosts';
import PostItem from './PostItem';

const PostFeed = ({userId}) => {
    const { data: posts = [] } = usePosts(userId);
    
  return (
    <>
      {posts.map((post) => (
        <PostItem userId={userId} key={post._id} data={post} />
      ))}
    </>
  )
}

export default PostFeed
