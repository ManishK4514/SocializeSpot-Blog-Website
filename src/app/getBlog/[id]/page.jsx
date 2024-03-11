"use client"

import React, { useState, useEffect } from "react";
import { PiNotePencilBold } from "react-icons/pi";
import RemoveBtn from "../../../components/RemoveBtn";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useSession } from "next-auth/react";

const getBlogById = async (id) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs/${id}`, {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch blog");
        }

        return res.json();
    } catch (error) {
        console.log(error);
    }
}

const getUserById = async (id) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${id}`, {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch blogs");
        }

        const data = await res.json();

        return data;
    } catch (error) {
        console.log("Error loading blogs: ", error);
    }
}

const GetBlog = ({ params }) => {
    const { id } = params;
    const [blog, setBlog] = useState(null);
    const [user, setUser] = useState(null);
    const [commentText, setCommentText] = useState(null);
    const router = useRouter();
    const { data: session } = useSession();

    useEffect(() => {
        const fetchData = async () => {
            const data = await getBlogById(id);
            setBlog(data.blog);
        };

        if(!blog) fetchData();

        const fetchUserData = async () => {
            const data = await getUserById(session?.user?.email);
            setUser(data);
        };
        
        fetchUserData();
    }, [id]);

    if (!blog) {
        return <div className="flex justify-center items-center">Loading...</div>;
    }

    const { email, title, thumbnail, content, comments } = blog;

    const handleComment = async () => {
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs/comment/${id}`;

        try {
            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username: session?.user?.name || user.username || 'Anonymous', text: commentText }),
            });

            if (!response.ok) {
                throw new Error("Failed to add comment");
            }

            const updatedBlogData = await getBlogById(id);
            setBlog(updatedBlogData.blog);
            setCommentText("");

        } catch (error) {
            console.error("Error adding comment:", error.message);
        }
    }

    return (
        <div className="bg-[#995959] h-full">
            <Navbar />
            <div className="mt-4  mx-12 pt-4 bg-white p-10 rounded-md gap-5 mb-11">
                <div className="flex flex-col gap-4">
                    <div className="relative w-full border-2 p-2 rounded-2xl">
                        <img className="w-full rounded-2xl" src={thumbnail} alt="" />
                        {email === session?.user?.email && <div className="absolute top-5 right-5 flex flex-col gap-2 bg-white rounded-lg p-2">
                            <RemoveBtn id={blog._id} />
                            <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/editBlog/${blog._id}`}>
                                <PiNotePencilBold size={24} />
                            </Link>
                        </div>}
                    </div>
                    <div className="text-2xl font-bold">Title: {title}</div>
                    <div dangerouslySetInnerHTML={{ __html: content }} />

                    <div className="bg-white rounded-lg shadow-md mb-5 overflow-hidden p-2 w-full my-10">
                        <div className="flex flex-row items-center">
                            <img className="w-[60px]" src="https://static.vecteezy.com/system/resources/previews/019/879/186/original/user-icon-on-transparent-background-free-png.png" alt="" />
                            <p className="font-bold text-xl">{session?.user?.name || user.username || 'Anonymous'}</p>
                        </div>
                        <textarea
                            type="text"
                            value={commentText}
                            onChange={(e) => { setCommentText(e.target.value); }}
                            placeholder="Write a comment..."
                            className="bg-transparent rounded shadow-inner h-18 my-2 p-[20px] resize-none w-full border border-gray-200"

                        >
                        </textarea>
                        <button
                            onClick={handleComment}
                            className="bg-blue-500 border-none rounded text-gray-200 cursor-pointer float-right font-semibold p-2"
                        >
                            Comment
                        </button>
                    </div>

                    {comments.map((comment, index) => (
                        <div key={index} className="flex flex-row items-center justify-start bg-transparent rounded-full shadow-inner h-18 my-2 p-[20px] resize-none w-full border border-gray-200">
                            <div>
                                <img className="w-[75px]" src="https://static.vecteezy.com/system/resources/previews/019/879/186/original/user-icon-on-transparent-background-free-png.png" alt="" />
                            </div>
                            <div>
                                <div>
                                    <p className="font-bold text-xl">{comment.username}</p>
                                </div>
                                <div>
                                    <p className="text-lg">{comment.text}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GetBlog;
