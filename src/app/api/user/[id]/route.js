import User from "@/models/user";
import connectMongoDB from "@/libs/mongodb";
import { NextResponse } from "next/server";

export async function GET(request, {params}) {
    const {id} = params;
    await connectMongoDB();
    const user = await User.findOne({email: { $regex: id, $options: 'i' }});
    return NextResponse.json(user);;
}