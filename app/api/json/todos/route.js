
export const GET = async (request) => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        if (!response.ok) {
            throw new Error('Failed to fetch posts');
        }
        const todos = await response.json();
        return new Response(JSON.stringify(todos), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch all todos", { status: 500 });
    }
};
