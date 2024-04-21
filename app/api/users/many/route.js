import User from "@/models/user";
import { connectToDB } from "@/utils/database";

export const POST = async (request) => {
    // body: 
    const { userData } = await request.json();
    // console.log("User Data");
    // console.log({ userData });
    try {
        await connectToDB();// Connect to MongoDB
        // Insert dummy user data into the database
        await User.insertMany(userData);
        return new Response(JSON.stringify({ message: 'Database seeded successfully' }), { status: 200 });

    } catch (error) {
        return new Response(JSON.stringify({ error: 'Error seeding database' }), { status: 500 });
    }
};