import Post from "@/models/post";
import { connectToDB } from "@/utils/database";

export const revalidate = 0;

export const GET = async (request) => {
    try {
        await connectToDB();
        // get all the posts and populate corresponding author from User table
        const posts = await Post.find({}).populate('author');
        return new Response(JSON.stringify(posts), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch all posts", { status: 500 });
    }
};

export const POST = async (req) => {
    const { posts } = await req.json();

    try {
        await connectToDB();
        await Post.insertMany(postBulkData);
        return new Response(JSON.stringify({ message: 'Posts seeded successfully' }), { status: 200 });

    } catch (error) {
        return new Response(JSON.stringify({ error: 'Error seeding Posts' }), { status: 500 });
    }
};

// Deletes every record of Posts from the database
export const DELETE = async (req) => {
    try {
        await connectToDB();// Connect to MongoDB
        // Delete
        await Post.deleteMany();
        return new Response(JSON.stringify({ message: 'All Posts deleted successfully' }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Error deleting Posts' }), { status: 500 });
    }
};