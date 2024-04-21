import Post from "@/models/post";
import { connectToDB } from "@/utils/database";

// The problem is with how Vercel deals with the '/api/post' 
// route in ISR, and it doesn't update properly. To fix this,
//  we want to move it out of ISR. To do that, just add 'revalidate=0' 
//  inside the '/api/post/route.js' file like this:

export const revalidate = 0;

export const GET = async (request) => {
    try {
        await connectToDB();

        const posts = await Post.find({}).populate('author');

        return new Response(JSON.stringify(posts), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch all posts", { status: 500 });
    }
};

export const POST = async (req) => {
    const { postBulkData } = await req.json();
    console.log("postBulkData : Received at endpoint /api/post");
    console.log({ postBulkData });
    try {
        await connectToDB();// Connect to MongoDB
        // Insert dummy user data into the database
        await Post.insertMany(postBulkData);
        return new Response(JSON.stringify({ message: 'Database seeded successfully' }), { status: 200 });

    } catch (error) {
        return new Response(JSON.stringify({ error: 'Error seeding database' }), { status: 500 });
    }
};