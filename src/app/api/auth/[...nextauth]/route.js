import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "../../../../models/user";
import connectMongoDB from "@/libs/mongodb";
import bcrypt from "bcryptjs";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }),
        CredentialsProvider({
            name: "Credentials",
            async authorize(credentials) {
                const {email, password} = credentials;

                try {
                    await connectMongoDB();
                    const user = await User.findOne({ email: email });

                    if(!user) {
                        throw new Error("No user found with this email address, please sign in...!")
                    }

                    const passwordMatch = await bcrypt.compare(password, user.password);

                    if(!passwordMatch) {
                        throw new Error("Username or Password doesn't match...!")
                    }

                    return user;
                } catch(error) {
                    console.log("Error: " + error);
                }
            },
        })
    ],
    secret: "bDbC9363dBVWEuhX5WQCXX9d0Eda4j7SLztFEd82Bbk=",
});

export { handler as GET, handler as POST };
