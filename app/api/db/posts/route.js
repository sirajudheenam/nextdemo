import Post from "@/models/post";
import { connectToDB } from "@/utils/database";

export async function GET(req, res) {
    try {
        await connectToDB();
        const posts = await Post.find({});
        // Post.bulkWrite([
        //     {
        //         insertOne: {
        //             document: {
        //                 title: "Post 1",
        //                 body: "This is the body of Post 1",
        //                 tag: "tag1",
        //                 email: "user1@example.com"
        //             }
        //         }
        //     }
        // ]);
        // const posts = await Post.find({}).populate('author');
        // console.log("Posts from DB", posts);
        return new Response(JSON.stringify(posts), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Error Fetching Posts from the database' }), { status: 500 });
    }
}

export async function POST(req, res) {
    console.log("Request", req);

    const { posts } = await req.json();
    console.log("posts received in API", posts);
    // console.log("posts received in DB", posts);

    try {
        await connectToDB();
        await Post.insertMany(posts);
        return new Response(JSON.stringify({ message: 'Posts are seeded successfully' }), { status: 200 });

    } catch (error) {
        return new Response(JSON.stringify({ error: 'Error POST Seeding Posts in the database' }), { status: 500 });
    }
}

export async function DELETE(req, res) {

    try {
        await connectToDB();
        await Post.deleteMany();

        return new Response(JSON.stringify({ message: 'Posts are deleted successfully' }), { status: 200 });

    } catch (error) {
        return new Response(JSON.stringify({ error: 'Error deleting Posts from the database' }), { status: 500 });
    }
}