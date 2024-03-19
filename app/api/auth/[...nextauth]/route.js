import bcrypt from "bcrypt";
import * as mongoose from "mongoose";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/libs/mongoConnect";
import { User } from "@/models/User";

export const authOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    adapter: MongoDBAdapter(clientPromise),
    session: {
        jwt: true,
        strategy: 'jwt'
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            id: 'credentials',
            credentials: {
                username: { label: "Email", type: "email", placeholder: "test@example.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                //console.log(credentials);
                if (!credentials?.email || !credentials?.hashedPassword) {
                    throw new Error('Empty credentials');
                  }
                const email = credentials?.email;
                const password = credentials?.hashedPassword;

                await mongoose.connect(process.env.MONGO_URL);
                const user = await User.findOne({email});
                const passwordOk = user && bcrypt.compareSync(password, user.hashedPassword);

                if (passwordOk) {
                    //console.log("Password Okay");
                return user;
                }
                //console.log("Something is wrong");
                return null
            }
        })
    ]
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST}