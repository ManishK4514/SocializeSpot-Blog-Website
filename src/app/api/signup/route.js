import { NextResponse } from "next/server";
import connectMongoDB from "../../../libs/mongodb";
import User from "../../../models/user";
import bcrypt from "bcryptjs";

export async function POST(request) {
    try {
        const { username, email, password } = await request.json();
        const hashedPassword = await bcrypt.hash(password, 10);

        await connectMongoDB();
        await User.create({username, email, password: hashedPassword});

        return NextResponse.json(
            { message: "User Registered successfully..." },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "An error occurred while registering the user." },
            { status: 500 }
        );
    }
}
