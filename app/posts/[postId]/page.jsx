"use client";
import React from 'react';
import { ClipLoader } from 'react-spinners';
import usePost from '@/hooks/usePost';
import useComments from '@/hooks/useComments';
import Header from '@/components/Header';
import Form from '@/components/Form';
import PostItem from '@/components/posts/PostItem';
import CommentFeed from '@/components/posts/CommentFeed';

const PostView = ({ params }) => {
    const postId = params.postId;
    const { data: fetchedPost, isLoading } = usePost(postId);
    const { data: comments = [] } = useComments(postId);
    if (isLoading ||!fetchedPost || !comments) {
        return (
            <div className="flex justify-center items-center h-full">
                <ClipLoader color="lightblue" size={80} />
            </div>
        );
    }
  return (
    <>
        <Header showBackArrow label='Post' />
        <PostItem data={fetchedPost} />
        <Form postId={postId} isComment placeholder='Post your reply' />
        <CommentFeed comment={comments} />
    </>
  )
}

export default PostView
