import React, { useState, useEffect } from "react";
import RemoveBtn from "./RemoveBtn";
import Link from "next/link";
import { PiNotePencilBold } from "react-icons/pi";
import Image from "next/image";

const getBlogs = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs`, {
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

export default function BlogList() {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getBlogs();
            setBlogs(data);
        };
        fetchData();
    }, []);

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 3xl:grid-cols-5 gap-5">
                {blogs.map((blog) => (
                    <Link key={blog._id} href={`./getBlog/${blog._id}`}>
                        <div className="flex flex-col justify-evenly gap-2 w-full h-full p-5 border border-gray-300 bg-slate-100 rounded-xl">
                            <div style={{ position: 'relative', width: '100%', height: '200px' }}>
                                <Image
                                    src={blog.thumbnail}
                                    alt="Thumbnail"
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-lg"
                                />
                            </div>
                            <hr className="border-gray-200" />
                            <p className="font-bold text-lg">{blog.title}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
}
