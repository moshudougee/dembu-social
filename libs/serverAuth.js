import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { User } from "@/models/User";

const serverAuth = async () => {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            throw new Error('Not signed in');
        }
        await mongoose.connect(process.env.MONGO_URL);
        const email = session.user.email;
        const currentUser = await User.findOne({email});
        if (!currentUser) {
            throw new Error('Not signed in');
        }
        return {currentUser}; 
    } catch (error) {
        console.log(error);
        return;
    }
    
};

export default serverAuth;