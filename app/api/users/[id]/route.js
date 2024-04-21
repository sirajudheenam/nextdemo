import User from "@/models/user";
import { connectToDB } from "@/utils/database";

export const GET = async (request, { params }) => {
    console.log("request:", request);
    console.log("params:", params);
    const { id } = params;
    console.log("id:", id);
    try {
        await connectToDB();
        const user = await User.find({ _id: id }); // Fetch all users from the database
        return new Response(JSON.stringify(user), { status: 200 });
    } catch (error) {
        return new Response(`Failed to fetch user ${id}`, { status: 500 });
    }
}; 