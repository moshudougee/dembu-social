import mongoose from "mongoose";
import serverAuth from "@/libs/serverAuth";
import { Comment } from "@/models/Comment";
import { Post } from "@/models/Post";
import { User } from "@/models/User";
import { Notification } from "@/models/Notification";

export async function POST(req) {
    try {
        const { currentUser } = await serverAuth();
        const { body } = await req.json();
        const url = new URL(req.url);
        const postId = url.searchParams.get('postId');
        if (!postId || typeof postId!=='string') {
            return new Response('Internal Server Error, Invalid ID', { status: 500});
        }
        await mongoose.connect(process.env.MONGO_URL);
        const comment = await Comment.create({
            body: body,
            userId: currentUser._id,
            postId: postId
        });
        try {
            const post = await Post.findById(postId);
            if (post?.userId) {
                await Notification.create({
                    body: 'Someone commented on your post',
                    userId: post.userId
                });

                await User.findByIdAndUpdate(post.userId, {
                    hasNotification: true
                });
            }
        } catch (error) {
            console.log(error);
        }
        return Response.json(comment);
    } catch (error) {
        return new Response('Internal Server Error, Add Comment', { status: 500})
    }
}