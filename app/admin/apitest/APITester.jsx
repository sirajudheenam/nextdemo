'use client';
import React, { useEffect, useState } from 'react';
const ApiTester = () => {
    const postBody = JSON.parse(JSON.stringify(`{
        title: 'Nice Title for your Post',
        body: 'This is the body part of your blog post',
        userId: 1,
    }`));

    const putBody = JSON.parse(JSON.stringify(`{
        id: 1,
        title: 'Updated Post Title',
        body: 'Updated Post Body',
        userId: 9,
    }`));

    const patchBody = JSON.parse(JSON.stringify(`{
        id: 1,
        title: 'Wanna Patch Title ?',
        body: 'Wanna Patch Body ? ',
        userId: 8,
    }`));

    const [postId, setPostId] = useState('');
    const [method, setMethod] = useState('GET');
    const [body, setBody] = useState('');
    const [response, setResponse] = useState('');

    useEffect(() => {
        switch (method) {
            case 'PUT':
                setBody(putBody);
                break;
            case 'POST':
                setBody(postBody);
                break;
            case 'PATCH':
                setBody(patchBody);
                break;
            case 'DELETE':
                setBody('');
                break;
            default:
                setBody(postBody);
                break;
        }
    }, [method, putBody, postBody, patchBody]);

    const handleRequest = async () => {
        try {
            const requestOptions = {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: method !== 'GET' ? JSON.stringify({ body }) : undefined,
            };

            const url = (method === 'POST') ? '/api/json/posts' : `/api/json/posts/${postId}`;
            const res = await fetch(url, requestOptions);
            const data = await res.json();
            setResponse(JSON.stringify(data, null, 2));
        } catch (error) {
            console.error('Error fetching data:', error);
            setResponse('Error fetching data');
        }
    };

    return (
        <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-lg">
            <h1 className="text-xl font-semibold mb-4">API Tester</h1>

            {/* Input for ID */}
            <div className="mb-4">
                <label htmlFor="postId" className="block text-sm font-medium text-gray-700 mb-1">Post ID:</label>
                <input
                    type="text"
                    id="postId"
                    value={postId}
                    onChange={(e) => setPostId(e.target.value)}
                    placeholder="Enter post ID"
                    className="border border-gray-300 rounded-md px-3 py-2 w-full"
                />
            </div>

            {/* HTTP Method Selector */}
            <div className="mb-4">
                <label htmlFor="method" className="block text-sm font-medium text-gray-700 mb-1">HTTP Method:</label>
                <select
                    id="method"
                    value={method}
                    onChange={(e) => setMethod(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 w-full"
                >
                    <option value="GET">GET</option>
                    <option value="POST">POST</option>
                    <option value="PUT">PUT</option>
                    <option value="PATCH">PATCH</option>
                    <option value="DELETE">DELETE</option>
                </select>
            </div>

            {/* Body Input (for POST and PUT/PATCH) */}
            {(method === 'POST' || method === 'PUT' || method === 'PATCH') && (
                <>
                    <div className="mb-4">
                        <label htmlFor="body" className="block text-sm font-medium text-gray-700 mb-1">Body:</label>
                        <textarea
                            id="body"
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            placeholder="Enter JSON body"
                            rows="4"
                            className="border border-gray-300 rounded-md px-3 py-2 w-full"
                        />
                    </div>
                </>
            )}

            {/* Button to Trigger Request */}
            <button
                onClick={handleRequest}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
            >
                Send Request
            </button>

            {/* Response Display */}
            <div className="mt-6">
                <label htmlFor="response" className="block text-sm font-medium text-gray-700 mb-1">Response:</label>
                <textarea
                    id="response"
                    value={response}
                    readOnly
                    rows="6"
                    className="border border-gray-300 rounded-md px-3 py-2 w-full bg-gray-100"
                />
            </div>
        </div>
    );
};

export default ApiTester;