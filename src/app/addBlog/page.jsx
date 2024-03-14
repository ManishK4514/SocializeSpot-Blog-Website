"use client"

import React, { useRef, useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { Editor } from '@tinymce/tinymce-react';
import Navbar from '@/components/Navbar';
import { getSession, useSession, signOut } from "next-auth/react";
import { redirect } from 'next/navigation';

export default function AddTodo() {
    const { data: session } = useSession();
    const editorRef = useRef(null);
    const [title, setTitle] = useState("");
    const [thumbnail, setThumbnail] = useState(null);
    const router = useRouter();

    const handleThumbnailChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setThumbnail(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !thumbnail || !editorRef.current) {
            alert("Title, Thumbnail and Blog Content are required.");
            return;
        }

        try {
            const formData = new FormData();
            formData.append('file', thumbnail);
            formData.append('upload_preset', 'ml_default');
            formData.append('cloud_name', 'dvxwjcwcm');

            const uploadResponse = await fetch("https://api.cloudinary.com/v1_1/dvxwjcwcm/upload", {
                method: "POST",
                body: formData
            });

            const Image = await uploadResponse.json();
            const ThumbnailUrl = Image.url;

            const res = await fetch("api/blogs", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({ email: session.user.email, title, thumbnail: ThumbnailUrl, content: editorRef.current.getContent() }),
            });

            if (res.ok) {
                router.refresh();
                router.push("/");
            }
            else throw new Error("Failed to create a blog");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="bg-[#995959] h-screen">
            <Navbar />
            <div className="mt-4 mx-7  md:mx-12 pt-4 pb-8">
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        input className="border border-slate-500 px-8 py-3 rounded-xl"
                        type="text"
                        placeholder="Todo Title"
                    />

                    <input type="file" accept="image/*" onChange={handleThumbnailChange} className="bg-white border border-slate-500 px-8 py-3 rounded-xl" />

                    <Editor
                        apiKey='bzz9rqo5vthy2kl0nzr7xgfedv90tl6mrfjcz990u31t7xrn'
                        onInit={(evt, editor) => editorRef.current = editor}
                        initialValue="<p>This is the initial content of the editor.</p>"
                        init={{
                            height: 500,
                            menubar: false,
                            plugins: [
                                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                            ],
                            toolbar: 'undo redo | formatselect | ' +
                                'bold italic forecolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | image media | help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                    />

                    <button type="submit" className="bg-green-600 font-bold text-white py-3 px-6 w-fit rounded-sm">Add Blog</button>
                </form>
            </div>
        </div>
    );
}
