import mongoose from "mongoose";
import { Post } from "@/models/Post";

export async function GET(req, { params }) {
    await mongoose.connect(process.env.MONGO_URL);
    const _id = params.postId;

    if(!_id || typeof _id !== 'string') {
        return new Response('Internal Server Error, Invalid ID', { status: 500});
    }

    try {
        const post = await Post.findById(_id);
        return Response.json(post);
    } catch (error) {
        return new Response('Internal Server Error, Get Post', { status: 500});
    }

}