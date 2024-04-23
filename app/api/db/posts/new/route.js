import Post from "@/models/post";
import User from "@/models/user";
import { connectToDB } from "@/utils/database";

export const POST = async (request) => {
    const { userId, title, body, tag, session } = await request.json();

    try {
        await connectToDB();
        const newPost = new Post({ author: userId, title, body, tag, session });
        const newUser = new User({
            email: session.user.email,
            username: session.user.login,
            image: session.user.image
        });
        await newUser.save();
        await newPost.save();
        return new Response(JSON.stringify(newPost), { status: 201 });
    } catch (error) {
        return new Response("Failed to create a new post", { status: 500 });
    }
};