"use client";
import React from 'react';
import CommentItem from './CommentItem';

const CommentFeed = ({ comment = [] }) => {
  return (
    <>
    {comment.map((comment) => (
      <CommentItem key={comment._id} data={comment} />
    ))}
    </>
  )
}

export default CommentFeed
