import Todo from "@/models/todo";
import { connectToDB } from "@/utils/database";

export const GET = async (request, { params }) => {
    const { id } = params;
    try {
        await connectToDB();
        // const todo = await Todo.find({ _id: id }); // This will return an Array
        const todo = await Todo.findById(id); // This returns an Object with Todo
        return new Response(JSON.stringify(todo), { status: 200 });
    } catch (error) {
        return new Response(`Failed to fetch user ${id}`, { status: 500 });
    }
};

export const PATCH = async (request, { params }) => {
    const { todo } = await request.json();

    try {
        await connectToDB();

        // Find the existing Todo by ID
        const existingTodo = await Todo.findById(params.id);

        if (!existingTodo) {
            return new Response("Todo not found", { status: 404 });
        }

        // Update the Todo with new data
        existingTodo.title = todo.title;
        existingTodo.completed = todo.completed;

        await existingTodo.save();

        return new Response("Successfully updated the Todos", { status: 200 });
    } catch (error) {
        return new Response("Error Updating Todo", { status: 500 });
    }
};

export const DELETE = async (request, { params }) => {
    try {
        const { id } = params;
        await connectToDB();

        // Find the Todo by ID and remove it
        await Todo.findByIdAndDelete(id);

        return new Response(`Todo with id # ${params.id} deleted successfully.`, { status: 200 });
    } catch (error) {
        return new Response("Error deleting Todo", { status: 500 });
    }
};