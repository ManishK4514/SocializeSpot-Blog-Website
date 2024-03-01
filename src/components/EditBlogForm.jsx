"use client"

import React, { useRef, useState } from 'react';
import { useRouter } from "next/navigation";
import { Editor } from '@tinymce/tinymce-react';

export default function EditBlogForm({ id, title, thumbnail, content }) {
    const [newTitle, setNewTitle] = useState(title);
    const [newThumbnail, setNewThumbnail] = useState(null);
    const editorRef = useRef(null);

    const handleThumbnailChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setNewThumbnail(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };


    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`http://localhost:3000/api/blogs/${id}`, {
                method: 'PUT',
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({ newTitle, newThumbnail, newContent : editorRef.current.getContent() }),
            });

            if (!res.ok) {
                throw new Error("Failed to update todo");
            }

            router.refresh();
            router.push("/");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
                onChange={(e) => { setNewTitle(e.target.value) }}
                value={newTitle}
                input className="border border-slate-500 px-8 py-2"
                type="text"
                placeholder="Todo Title"
            />

            <input type="file" accept="image/*" onChange={handleThumbnailChange} className="border border-slate-500 px-8 py-2" />

            <Editor
                apiKey='g5oq0crxkw9oh4ad42r2c6e5yguwsg8ko0dass88oxi92rrx'
                onInit={(evt, editor) => editorRef.current = editor}
                initialValue={content} 
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

            <button type="submit" className="bg-green-600 font-bold text-white py-3 px-6 w-fit rounded-sm">Update Blog</button>
        </form>
    );
}