import Post from "@/models/post";
import { connectToDB } from "@/utils/database";

export const POST = async (request) => {
    const { userId, title, body, tag } = await request.json();

    try {
        await connectToDB();
        const newPost = new Post({ author: userId, title, body, tag });

        await newPost.save();
        return new Response(JSON.stringify(newPost), { status: 201 });
    } catch (error) {
        return new Response("Failed to create a new post", { status: 500 });
    }
};