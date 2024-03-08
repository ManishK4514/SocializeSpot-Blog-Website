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
                const res = await fetch(`https://socializespot.vercel.app/api/blogs/${id}`, {
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
        return <div>Loading...</div>;
    }

    const { title, thumbnail, content } = blog;

    return (
        <div className="bg-[#995959] h-screen">
            <Navbar />
            <div className="mt-4  mx-12 pt-4">
                <EditBlogForm id={id} title={title} thumbnail={thumbnail} content={content} />
            </div>
        </div>
    );
};

export default EditTodo;
