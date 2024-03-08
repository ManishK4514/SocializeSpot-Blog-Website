import mongoose, { Schema } from "mongoose";

const blogSchema = new Schema(
    {
        email: String,
        title: String,
        thumbnail: String,
        content: String,
        comments: {
            type: [
                {
                    username: String,
                    text: String,
                }
            ],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);

export default Blog;