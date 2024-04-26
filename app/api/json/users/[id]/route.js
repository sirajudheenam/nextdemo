
export const GET = async (request, { params }) => {
    try {
        const { id } = params;
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch users with id: ${id}`);
        }
        const user = await response.json();
        return new Response(JSON.stringify(user), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch all users", { status: 500 });
    }
};

// Put Request
export const PUT = async (request, { params }) => {
    try {
        const { id } = params;
        const user = await request.json();
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ user: user }),
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch users with id: ${id}`);
        }
        const userPutResponse = await response.json();
        return new Response(JSON.stringify(userPutResponse), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch all users", { status: 500 });
    }
};

export const PATCH = async (request, { params }) => {
    try {
        const { id } = params;
        const user = await request.json();

        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({ user: user }),
        });
        if (!response.ok) {
            throw new Error(`Failed to PATCH user with id: ${id}`);
        }
        const userPatchResponse = await response.json();
        return new Response(JSON.stringify(userPatchResponse), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch all users", { status: 500 });
    }
};

export const DELETE = async (request, { params }) => {
    try {
        const { id } = params;

        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error(`Failed to delete user with id: ${id}`);
        }
        const userDelResponse = await response.json();
        return new Response(JSON.stringify(userDelResponse), { status: 200 });
    } catch (error) {
        return new Response("Failed to delete user", { status: 500 });
    }
}; 