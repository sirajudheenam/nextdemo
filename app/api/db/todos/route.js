import Todo from "@/models/todo";
import { connectToDB } from "@/utils/database";

export async function GET(req, res) {

    try {
        await connectToDB();
        const todos = await Todo.find({}).populate('executor');
        return new Response(JSON.stringify(todos), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Error seeding Todos in the database' }), { status: 500 });
    }
}

export async function POST(req, res) {
    const todos = await req.json();

    try {
        await connectToDB();
        await Todo.insertMany(todos);

        return new Response(JSON.stringify({ message: 'Todos are added successfully' }), { status: 200 });

    } catch (error) {
        return new Response(JSON.stringify({ error: 'Error seeding Todos in the database' }), { status: 500 });
    }
}

export async function DELETE(req, res) {

    try {
        await connectToDB();
        await Todo.deleteMany();

        return new Response(JSON.stringify({ message: 'Todos are deleted successfully' }), { status: 200 });

    } catch (error) {
        return new Response(JSON.stringify({ error: 'Error deleting Todos from the database' }), { status: 500 });
    }
}