"use client";

import { useEffect, useState } from "react";

import Post from '@/app/admin/components/Post';

const PostsList = () => {
    const [posts, setPosts] = useState([]);
    const [notification, setNotification] = useState(null);

    const showNotification = (message) => {
        setNotification(message);
        setTimeout(() => {
            setNotification(null); // Clear the notification after 5 seconds (adjust as needed)
        }, 5000); // 5000 milliseconds = 5 seconds
    };

    const onEdit = async (id, newTitle, newBody, newTag) => {
        const post = {
            title: newTitle,
            body: newBody,
            tag: newTag
        };
        try {
            const response = await fetch(`/api/db/posts/${id}`, {
                method: "PATCH",
                body: JSON.stringify(post),
            });
            if (!response.ok) {
                throw new Error("Failed to update post");
            }
            const data = await response.json();
            showNotification("Post updated successfully");
        } catch (error) {
            console.log("Error updating post:", error);
        }
    };

    const onDelete = async (id) => {
        try {
            const response = await fetch(`/api/db/posts/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error("Failed to delete post");
            }
            const data = await response.json();
            if (response.ok) {
                router.push("/admin/posts");
            }
            showNotification("Post deleted successfully");
        } catch (error) {
            console.log("Error deleting post:", error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/db/posts");
                if (!response.ok) {
                    throw new Error("Failed to fetch post");
                }
                const data = await response.json();
                showNotification("FETCHED");
                setPosts(data);
            } catch (error) {
                console.log("Error fetching posts:", error);
            }
        };
        fetchData();
    }, []);

    return (<>
        {/* Render the notification message if it exists */}
        {notification && (
            <div className="bg-green-200 text-green-800 p-3 mb-4 rounded-md">
                {notification}
            </div>
        )}
        <div className="max-w-lg mx-auto mt-8">
            <h1 className="text-2xl font-bold mb-4">Posts</h1>
            {
                posts && posts.map((post, index) => (
                    // Added key prop for list items
                    <Post key={index} post={post} onEdit={onEdit} onDelete={onDelete} />
                ))
            }
        </div>
    </>
    );
};

export default PostsList;
