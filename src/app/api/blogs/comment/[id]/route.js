import Blog from "../../../../../models/blog";
import connectMongoDB from "../../../../../libs/mongodb";
import { NextResponse } from "next/server";

export async function PUT(request, {params}) {
    const {id} = params;
    const {username, text} = await request.json();
    await connectMongoDB();
    
    // Find the blog by ID
    let blog = await Blog.findById(id);

    // If the blog doesn't exist, return a 404 error
    if (!blog) {
        return NextResponse.json({message: "Blog not found!"}, {status: 404});
    }

    // Initialize the comments field as an empty array if it doesn't exist
    if (!blog.comments) {
        blog.comments = [];
    }

    // Add the new comment to the comments array
    blog.comments.push({ username, text });

    try {
        await blog.save();
        return NextResponse.json({message: "Comment updated!"}, {status: 200});
    } catch (error) {
        console.error(error);
        return NextResponse.json({message: "Failed to update comment!"}, {status: 500});
    }
}



export async function GET(request, {params}) {
    const {id} = params;
    await connectMongoDB();
    const blog = await Blog.findOne({_id: id}, {comment: 1}); 
    return NextResponse.json({comment: blog.comment}, {status: 200});
}