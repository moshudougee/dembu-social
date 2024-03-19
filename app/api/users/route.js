import mongoose from "mongoose";
import { User } from "@/models/User";

export async function GET() {
    await mongoose.connect(process.env.MONGO_URL);
    
    try {
        const users = await User.find().sort({createdAt: 'desc'});
        return Response.json(users);
    } catch (error) {
        return new Response('Internal Server Error, Get Users', { status: 500});
    }
}