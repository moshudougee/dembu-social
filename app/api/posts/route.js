import mongoose from "mongoose";
import serverAuth from "@/libs/serverAuth";
import { Post } from "@/models/Post";

export async function GET(req) {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        const url = new URL(req.url);
        const userId = url.searchParams.get('userId');
        let posts;
        if (userId && typeof userId === 'string') {
            posts = await Post.find({userId}).sort({createdAt: 'desc'});
            /** 
            posts = await Post.find({userId})
                .populate('user')
                .populate('comments')
                .sort({createdAt: 'desc'})
                .lean();
            */
        } else {
            posts = await Post.find().sort({createdAt: 'desc'});
            /** 
            posts = await Post.find()
                .populate('user')
                .populate('comments')
                .sort({createdAt: 'desc'})
                .lean();
            */
        }
        
        return Response.json(posts);
    } catch (error) {
        console.log(error);
        return new Response('Internal server error, Get posts', { status: 500});
    }
}

export async function POST(req) {
    try {
        const { currentUser } = await serverAuth();
        await mongoose.connect(process.env.MONGO_URL);
        const {body} = await req.json();
        const post = await Post.create({body: body, userId: currentUser._id});
        return Response.json(post);
        
    } catch (error) {
        return new Response('Internal Server Error, Create Post', { status: 500});
    }
}