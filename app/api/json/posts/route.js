export async function GET() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) {
            console.log(response);
            throw new Error('Network response was not ok. API SERVER');
        }
        const data = await response.json();
        return Response.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // rethrow the error for handling elsewhere if needed
    }
}

export async function POST(req) {
    const reqJSON = await req.json();
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(reqJSON),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        });
        if (!response.ok) {
            console.log(response);
            throw new Error('Network response was not ok. API SERVER');
        }
        const data = await response.json();
        return Response.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // rethrow the error for handling elsewhere if needed
    }
}

