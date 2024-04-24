'use client';
import React, { useState, useEffect } from 'react';
export default function Posts() {

    const [posts, setPosts] = useState([]);
    const [post, setPost] = useState([]);
    const [postResponse, setPostResponse] = useState({});
    const [putResponse, setPutResponse] = useState({});
    const [patchResponse, setPatchResponse] = useState({});
    const [deleteResponse, setDeleteResponse] = useState({});

    // Fetch Posts
    const fetchPosts = async () => {
        try {
            const response = await fetch("/api/json/posts");
            if (!response.ok) {
                throw new Error("[GET]:Network response was not ok. CLIENT (fetchPosts)");
            }
            const json = await response.json();
            setPosts(json);
        } catch (error) {
            console.error("Error fetching data (fetchPosts):", error);
        }
    };

    const fetchPost = async () => {
        try {
            const response = await fetch("/api/json/posts/1");
            if (!response.ok) {
                throw new Error("[GET]:Network response was not ok. CLIENT (fetchPost)");
            }
            const json = await response.json();
            setPost(json);
        } catch (error) {
            console.error("Error fetching data (fetchPost):", error);
        }
    };

    const addPost = async () => {
        try {
            const response = await fetch("/api/json/posts", {
                method: 'POST',
                body: JSON.stringify({
                    id: 1,
                    title: 'Newly Added Post',
                    body: 'Newly Added Body',
                    userId: 6,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            }
            );
            if (!response.ok) {
                throw new Error("[POST]:Network response was not ok. CLIENT (POSTPosts)");
            }
            const json = await response.json();
            setPostResponse(json);
        } catch (error) {
            console.error("Error POSTING data (POSTPosts):", error);
        }
    };

    // PUT Request to Next.js API
    const updatePost = async () => {
        try {
            const response = await fetch("/api/json/posts/1", {
                method: 'PUT',
                body: JSON.stringify({
                    id: 1,
                    title: 'updated Post',
                    body: 'Updated Body',
                    userId: 9,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            }
            );
            if (!response.ok) {
                throw new Error("[PUT]:Network response was not ok. CLIENT (updatePost)");
            }
            const json = await response.json();
            setPutResponse(json);
        } catch (error) {
            console.error("Error PUT data (updatePost):", error);
        }
    };

    // PATCH Request to Next.js API
    const patchPost = async () => {
        try {
            const response = await fetch("/api/json/posts/1", {
                method: 'PATCH',
                body: JSON.stringify({
                    title: 'Patched Title',
                    body: 'Patched Body'
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            }
            );
            if (!response.ok) {
                throw new Error("[PUT]:Network response was not ok. CLIENT (patchPost)");
            }
            const json = await response.json();
            setPatchResponse(json);
        } catch (error) {
            console.error("Error PATCH data (patchPost):", error);
        }
    };

    // DELETE Request to Next.js API
    const deletePost = async () => {
        try {
            const response = await fetch("/api/json/posts/1", {
                method: 'DELETE'
            }
            );
            if (!response.ok) {
                throw new Error("[DELETE]:Network response was not ok. CLIENT (deletePost)");
            }
            const json = await response.json();
            setPatchResponse(json);
        } catch (error) {
            console.error("Error DELETE data (deletePost):", error);
        }
    };

    useEffect(() => {
        fetchPosts(); // Call the async function to fetch data
        addPost(); // Call POST function
        fetchPost();
        updatePost();
        patchPost();
        deletePost();
    }, []); // Empty dependency array means this effect runs once on mount

    useEffect(() => {
        console.log("Posts: ", posts);

    }, [posts]);

    useEffect(() => {
        console.log("Post / 1: ", post);
    }, [post]);

    useEffect(() => {
        console.log("postResponse", postResponse);
    }, [postResponse]);

    useEffect(() => {
        console.log("put Response: ", putResponse);
    }, [putResponse]);

    useEffect(() => {
        console.log("patch Response: ", patchResponse);
    }, [patchResponse]);

    useEffect(() => {
        console.log("delete Response: ", deleteResponse);
    }, [deleteResponse]);

    return (
        <div>
            <h1>Posts</h1>
        </div>
    );
}