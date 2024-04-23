
export const GET = async (request, { params }) => {
    try {
        const { id } = params;
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch posts with id: ${id}`);
        }
        const todo = await response.json();
        return new Response(JSON.stringify(todo), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch all posts", { status: 500 });
    }
};

// Put Request
export const PUT = async (request, { params }) => {
    try {
        const { id } = params;
        const todo = await request.json();
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ todo: todo }),
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch posts with id: ${id}`);
        }
        const todoPutResponse = await response.json();
        return new Response(JSON.stringify(todoPutResponse), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch all posts", { status: 500 });
    }
};

export const PATCH = async (request, { params }) => {
    try {
        const { id } = params;
        const todo = await request.json();

        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({ todo: todo }),
        });
        if (!response.ok) {
            throw new Error(`Failed to PATCH todo with id: ${id}`);
        }
        const todoPatchResponse = await response.json();
        return new Response(JSON.stringify(todoPatchResponse), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch all posts", { status: 500 });
    }
};

export const DELETE = async (request, { params }) => {
    try {
        const { id } = params;

        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error(`Failed to delete todo with id: ${id}`);
        }
        const todoDelResponse = await response.json();
        return new Response(JSON.stringify(todoDelResponse), { status: 200 });
    } catch (error) {
        return new Response("Failed to delete todo", { status: 500 });
    }
}; 