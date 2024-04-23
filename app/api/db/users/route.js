import User from "@/models/user";
import { connectToDB } from "@/utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB();
        const users = await User.find(); // Fetch all users from the database
        return new Response(JSON.stringify(users), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch all users", { status: 500 });
    }
};

export const POST = async (request) => {
    const { userData } = await request.json();
    try {
        await connectToDB();
        await User.insertMany(userData);
        return new Response(JSON.stringify({ message: 'Users seeded successfully' }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Error seeding Users' }), { status: 500 });
    }
};

export const DELETE = async (request) => {
    try {
        await connectToDB();
        await User.DeleteMany();
        return new Response(JSON.stringify({ message: 'Users deleted successfully' }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Error deleting Users' }), { status: 500 });
    }
};