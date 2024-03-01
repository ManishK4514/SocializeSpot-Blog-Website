import EditBlogForm from "../../../components/EditBlogForm";
import Navbar from "@/components/Navbar";

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

export default async function EditTodo({ params }) {
    const { id } = params;
    const { blog } = await getBlogById(id);
    const { title, thumbnail, content } = await blog;
    return (
        <div className="mx-auto px-[100px] py-5">
            <div>
                <Navbar />
                <div className="mt-4">
                    <EditBlogForm id={id} title={title} thumbnail={thumbnail} content={content} />
                </div>
            </div>
        </div>
    );
}