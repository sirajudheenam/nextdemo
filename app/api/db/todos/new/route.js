import Todo from "@/models/todo";
import { connectToDB } from "@/utils/database";

export const POST = async (request) => {
    const { executor, title, completed } = await request.json();

    try {
        await connectToDB();
        const newTodo = new Todo({ executor, title, completed });
        await newTodo.save();
        return new Response(JSON.stringify(newTodo), { status: 201 });
    } catch (error) {
        return new Response("Failed to create a new todo", { status: 500 });
    }
};