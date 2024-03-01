import Blog from "../../../../models/blog";
import connectMongoDB from "../../../../libs/mongodb";
import { NextResponse } from "next/server";

export async function PUT(request, {params}) {
    const {id} = params;
    const {newTitle: title, newThumbnail: thumbnail, newContent: content} = await request.json();
    await connectMongoDB();
    await Blog.findByIdAndUpdate(id, {title, thumbnail, content});
    return NextResponse.json({message: "Blog updated!"}, {status: 200});
}

export async function GET(request, {params}) {
    const {id} = params;
    await connectMongoDB();
    const blog = await Blog.findOne({_id: id});
    return NextResponse.json({blog}, {status: 200});
}