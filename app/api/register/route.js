import { User } from "@/models/User";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

export async function POST(req) {
    const body = await req.json();
    await mongoose.connect(process.env.MONGO_URL);
    
    const pass = body.hashedPassword;
    //const name = body.name;
    console.log('The name is '+ pass);
    const notHashedPassword = pass;
    const salt = bcrypt.genSaltSync(10);
    body.hashedPassword = bcrypt.hashSync(notHashedPassword, salt);

    try {
        const user = await User.create(body);
        return Response.json(user);
    } catch (error) {
        return new Response('Internal Server Error, Register User', { status: 500});
    }

}