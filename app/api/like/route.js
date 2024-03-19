import mongoose from "mongoose";
import serverAuth from "@/libs/serverAuth";
import { Post } from "@/models/Post";
import { User } from "@/models/User";
import { Notification } from "@/models/Notification";

export async function POST(req) {
    try {
        const { postId } = await req.json();
        console.log('Post Id is ' + postId);
        const  {currentUser}  = await serverAuth();
        if(!postId || typeof postId !==  'string') {
            return new Response('Internal Server Error, Invalid ID', { status: 500});
        }
        await mongoose.connect(process.env.MONGO_URL);
        const post = await Post.findById(postId);
        if(!post) {
            return new Response('Internal Server Error, Post not found', { status: 500});
        }
        let updatedLikedIds = [...(post.likedIds || [])];
        updatedLikedIds.push(currentUser._id);
        try {
            if(post?.userId) {
                await Notification.create({
                    body: 'Someone liked your post',
                    userId: post.userId
                });
            }

            await User.findByIdAndUpdate(post.userId,{
                hasNotification: true
            })
        } catch (error) {
            console.log(error);
        }
        const updatedPost = await Post.findByIdAndUpdate(postId, {
            likedIds: updatedLikedIds
        });
        return Response.json(updatedPost);
    } catch (error) {
        return new Response('Internal Server Error, Liked Post', { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        const { postId } = await req.json();
        const  {currentUser}  = await serverAuth();
        if(!postId || typeof postId !== 'string') {
            return new Response('Internal Server Error, Invalid ID', { status: 500});
        }
        await mongoose.connect(process.env.MONGO_URL);
        const post = await Post.findById(postId);
        if(!post) {
            return new Response('Internal Server Error, Post not found', { status: 500});
        }
        let updatedLikedIds = [...(post.likedIds || [])];
        updatedLikedIds = updatedLikedIds.filter(id => id !== currentUser?._id);
        const updatedPost = await Post.findByIdAndUpdate(postId, {
            likedIds: updatedLikedIds
        });
        return Response.json(updatedPost);
    } catch (error) {
        return new Response('Internal Server Error, Liked Post', { status: 500 });
    }
}