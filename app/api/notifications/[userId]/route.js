import mongoose from "mongoose";
import { User } from "@/models/User";
import { Notification } from "@/models/Notification";

export async function GET(req, { params }) {
    try {
        const userId = params.userId;
        if(!userId || typeof userId!=='string') {
            return new Response('Internal Server Error, Invalid ID', { status: 500});
        }
        await mongoose.connect(process.env.MONGO_URL);
        const notifications = await Notification.find({userId}).sort({createdAt: 'desc'});

        await User.findByIdAndUpdate(userId, {
            hasNotification: false
        });

        return Response.json(notifications);
    } catch (error) {
        return new Response('Internal Server Error, Get Notifications', { status: 500});
    }
}