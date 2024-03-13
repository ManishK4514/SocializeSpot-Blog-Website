"use client";

import { useState, useEffect } from "react";
import EditBlogForm from "../../../components/EditBlogForm";
import Navbar from "@/components/Navbar";

const EditTodo = ({ params }) => {
    const { id } = params;
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs/${id}`, {
                    cache: "no-store",
                });
                if (!res.ok) {
                    throw new Error("Failed to fetch blog");
                }
                const data = await res.json();
                setBlog(data.blog);
            } catch (error) {
                console.log(error);
            }
        };

        fetchBlog();
    }, [id]);

    if (!blog) {
        return <div className="flex justify-center items-center">Loading...</div>;
    }

    const { title, thumbnail, content } = blog;

    return (
        <div className="bg-[#995959] h-screen">
            <Navbar />
            <div className="mt-4  mx-7 md:mx-12 pt-4 pb-8">
                <EditBlogForm id={id} title={title} thumbnail={thumbnail} content={content} />
            </div>
        </div>
    );
};

export default EditTodo;
