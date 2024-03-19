import mongoose from "mongoose";
import serverAuth from "@/libs/serverAuth";
import { User } from "@/models/User";
import { Notification } from "@/models/Notification";


export async function POST(req) {
    try {
        const { userId } = await req.json();
        const  {currentUser}  = await serverAuth();
        if(!userId || typeof userId !== 'string') {
            return new Response('Internal Server Error, Invalid ID', { status: 500});
        }
        await mongoose.connect(process.env.MONGO_URL);
        const user = await User.findById(userId);
        if(!user) {
            return new Response('Internal Server Error, User not found', { status: 500});
        }
        let updatedFollowingIds = [...(user.followingIds || [])];
        updatedFollowingIds.push(userId);
        try {
            await Notification.create({
                body: 'Someone followed you',
                userId: userId
            });
            await User.findByIdAndUpdate(userId, {
                hasNotification: true
            });
        } catch (error) {
            console.log(error);
        }

        const updatedUser = await User.findByIdAndUpdate(currentUser._id, {
            followingIds: updatedFollowingIds
        });
        return Response.json(updatedUser);
    } catch (error) {
        return new Response('Internal Server Error, Follow User', { status: 500});
    }
    
}

export async function DELETE(req) {
    try {
        const { userId } = await req.json();
        const  {currentUser}  = await serverAuth();
        if(!userId || typeof userId !== 'string') {
            return new Response('Internal Server Error, Invalid ID', { status: 500});
        }
        await mongoose.connect(process.env.MONGO_URL);
        const user = await User.findById(userId);
        if(!user) {
            return new Response('Internal Server Error, User not found', { status: 500});
        }
        let updatedFollowingIds = [...(user.followingIds || [])];
        updatedFollowingIds = updatedFollowingIds.filter(id => id !== userId);

        const updatedUser = await User.findByIdAndUpdate(currentUser._id, {
            followingIds: updatedFollowingIds
        });
        return Response.json(updatedUser);
    } catch (error) {
        console.log(error);
        return new Response('Internal server error, Get current user', { status: 500});
    }
}