import mongoose from "mongoose";
import { User } from "@/models/User";

export async function GET(req, { params }) {
    await mongoose.connect(process.env.MONGO_URL);
    
    const _id = params.userId;
    

    try {
        if (!_id || typeof _id !== 'string') {
            return new Response('Internal Server Error, Invalid ID', { status: 500});
        }

        const existingUser = await User.findById(_id).lean();
        
        const followersCount = await User.find({followingIds: _id}).countDocuments().lean();
        

        return Response.json({...existingUser, followersCount});

    } catch (error) {
        return new Response('Internal Server Error, Get Users and Followers', { status: 500});
    }
}