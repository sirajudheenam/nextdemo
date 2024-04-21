import User from "@/models/user";
import { connectToDB } from "@/utils/database";

export async function POST(req, res) {
    const { userData } = await req.json();
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
}
