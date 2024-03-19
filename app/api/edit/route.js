import mongoose from "mongoose";
import serverAuth from "@/libs/serverAuth";
import { User } from "@/models/User";

export async function PUT(req) {
    try {
        const { currentUser } = await serverAuth();
        const { name, username, bio, profileImage, coverImage } = await req.json();
        if(!name || !username) {
            return new Response('Internal Server Error, Missing Name or Username', { status: 500});
        }
        await mongoose.connect(process.env.MONGO_URL);
        const updatedUser = await User.findOneAndUpdate(
            { _id: currentUser._id },
            { name, username, bio, profileImage, coverImage },
            { upsert: true }
        );
        return Response.json(updatedUser);
    } catch (error) {
        return new Response('Internal Server Error, Edit Profile', { status: 500});
    }
    
}