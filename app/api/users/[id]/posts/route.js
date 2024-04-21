import Post from "@/models/post";
import { connectToDB } from "@/utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB();
        // console.log("params.id: ", params.id);
        const posts = await Post.find({ author: params.id }).populate("author");
        return new Response(JSON.stringify(posts), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch Posts created by user", { status: 500 });
    }
}; 