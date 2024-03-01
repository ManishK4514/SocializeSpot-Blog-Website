"use client"

import { FaRegTrashCan } from "react-icons/fa6";
import { useRouter } from "next/navigation";

export default function RemoveBtn({ id }) {
    const router = useRouter();

    const removeTodo = async () => {
        const confirmed = confirm("Are you sure?");

        if(confirmed) {
            const res = await fetch(`http://localhost:3000/api/blogs/?id=${id}`, {
                method: "DELETE",
            });

            if(res.ok) {
                router.refresh();
            }
        }
    }

    return (
        <>
            <button onClick={removeTodo} className="text-red-400">
                <FaRegTrashCan size={24} />
            </button>
        </>
    );
}