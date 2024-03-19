import mongoose from "mongoose";
import { Comment } from "@/models/Comment";

export async function GET(req, { params }) {
    try {
        const postId = params.postId;
        if (!postId || typeof postId!=='string') {
            return new Response('Internal Server Error, Invalid ID', { status: 500});
        }
        await mongoose.connect(process.env.MONGO_URL);
        const comments = await Comment.find({postId}).sort({createdAt: 'desc'});
        return Response.json(comments);
    } catch (error) {
        return new Response('Internal Server Error, Get Comments', { status: 500});
    }
}