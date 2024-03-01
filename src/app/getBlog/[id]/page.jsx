"use client"

import React, { useState, useEffect } from "react";
import { PiNotePencilBold } from "react-icons/pi";
import RemoveBtn from "../../../components/RemoveBtn";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Link from "next/link";

const getBlogById = async (id) => {
    try {
        const res = await fetch(`http://localhost:3000/api/blogs/${id}`, {
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

const GetBlog = ({ params }) => {
    const { id } = params;
    const [blog, setBlog] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            const data = await getBlogById(id);
            setBlog(data.blog);
        };
        fetchData();
    }, [id]);

    if (!blog) {
        return <div className="flex justify-center items-center">Loading...</div>;
    }

    const { title, thumbnail, content } = blog;

    return (
        <div className="mx-auto px-[100px] py-5">
            <div>
                <Navbar />
                <div className="mt-4">
                    <div className="flex flex-col gap-4">
                        <div className="relative w-full border-2 p-2 rounded-2xl">
                            <img className="w-full rounded-2xl" src={thumbnail} alt="" />
                            <div className="absolute top-5 right-5 flex flex-col gap-2 bg-white rounded-lg p-2">
                                <RemoveBtn id={blog._id} />
                                <Link href={`http://localhost:3000/editBlog/${blog._id}`}>
                                    <PiNotePencilBold size={24} />
                                </Link>
                            </div>
                        </div>
                        <div className="text-2xl font-bold">Title: {title}</div>
                        <div dangerouslySetInnerHTML={{ __html: content }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GetBlog;
