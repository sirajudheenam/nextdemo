const getURL = (id) => {
    return `https://jsonplaceholder.typicode.com/posts/${id}`;
};
export async function GET(req, { params }) {
    const { id } = params;
    const url = getURL(id);
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch data (status ${response.status})`);
        }
        const data = await response.json();
        return Response.json(data);
    } catch (error) {
        console.error('API Route Error:', error.message);
        return Response.json({ error: 'Customized [GET] Error' });
    }
}

export async function PUT(req, { params }) {
    console.log("Params", params);
    const { id } = params;
    console.log("REQUEST body", req.body);
    const reqJSON = await req.json();
    console.log(reqJSON);
    const url = getURL(id);
    try {
        const response = await fetch(url,
            {
                method: 'PUT',
                body: JSON.stringify(reqJSON),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            });
        if (!response.ok) {
            throw new Error(`Failed to fetch data (status ${response.status})`);
        }
        const data = await response.json();
        return Response.json(data);
    } catch (error) {
        console.error('API Route Error:', error.message);
        return Response.json({ error: 'Customized [PUT] Error' });
    }
}

export async function PATCH(req, { params }) {
    console.log("Params", params);
    const { id } = params;
    console.log("REQUEST body", req.body);
    const url = getURL(id);
    try {
        const response = await fetch(url, {
            method: 'PATCH',
            body: JSON.stringify({
                title: 'Patched Title',
                body: 'Patched Body'
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        if (!response.ok) {
            throw new Error(`Failed to PATCH data (status ${response.status})`);
        }
        const data = await response.json();
        return Response.json(data);
    } catch (error) {
        console.error('API Route Error:', error.message);
        return Response.json({ error: 'Customized [PATCH] Error' });
    }
}

export async function DELETE(req, { params }) {
    const { id } = params;
    const url = getURL(id);
    try {
        const response = await fetch(url, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(`Failed to DELETE data (status ${response.status})`);
        }
        const data = await response.json();
        return Response.json(data);
    } catch (error) {
        console.error('API Route Error:', error.message);
        return Response.json({ error: 'Customized [DELETE] Error' });
    }
}