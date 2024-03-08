import Blog from "../../../../models/blog";
import connectMongoDB from "../../../../libs/mongodb";
import { NextResponse } from "next/server";

export async function GET(request, {params}) {
    const {id} = params;
    await connectMongoDB();
    const blogs = await Blog.find({email: { $regex: id, $options: 'i' }});
    return NextResponse.json(blogs);;
}