"use client";

import { useEffect, useState } from "react";

const Post = ({ post, onEdit, onDelete }) => {
    const [editing, setEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(post.title);
    const [editedBody, setEditedBody] = useState(post.body);
    const [editedTag, setEditedTag] = useState(post.tag);

    const handleEdit = () => {
        setEditing(true);
    };

    const handleSave = () => {
        // console.log(post._id, editedTitle, editedBody, editedTag);
        // Call onEdit function with updated post data
        onEdit(post._id, editedTitle, editedBody, editedTag);
        setEditing(false);
    };

    const handleDelete = () => {
        // Call onDelete function with post ID
        onDelete(post._id);
    };

    return (
        <div className="flex flex-col justify-between border p-4 my-4 rounded-md shadow-md">
            <div className="items-center mb-2">
                {editing ? (
                    <input
                        type="text"
                        className="border rounded-md p-2 w-full"
                        value={editedTitle}
                        placeholder="Post title"
                        onChange={(e) => setEditedTitle(e.target.value)}
                    />
                ) : (
                    <h4 className="text-lg font-medium">{post.title}</h4>
                )}

                {editing ? (
                    <textarea
                        className="border rounded-md p-2 w-full text_area"
                        value={editedBody}
                        placeholder="Post body text"
                        onChange={(e) => setEditedBody(e.target.value)}
                    />
                ) : (
                    <p className="text-gray-700">{post.body}</p>
                )}
                {editing ? (
                    <input
                        className="border rounded-md p-2 w-full text_area"
                        value={editedTag}
                        placeholder="#Tags"
                        onChange={(e) => setEditedTag(e.target.value)}
                    />
                ) : (
                    <span className="inline-block bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm mt-2">
                        {post.tag}
                    </span>
                )}

                <div className="flex-end">
                    {editing ? (
                        <button
                            className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
                            onClick={handleSave}
                        >
                            Save
                        </button>
                    ) : (
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                            onClick={handleEdit}
                        >
                            Edit
                        </button>
                    )}
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded-md"
                        onClick={handleDelete}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

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
        // console.log("onEdit id:", id, "NewTitle:", newTitle, "NewBody:", newBody, "NewTag :", newTag);
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
            // console.log("response:", response);
            if (!response.ok) {
                throw new Error("Failed to update post");
            }
            const data = await response.json();
            if (response.ok) {
                router.push("/admin/posts");
            }
            setNotification("Post updated successfully");
        } catch (error) {
            console.log("Error updating post:", error);
        }

    };

    const onDelete = async (id) => {
        console.log("onDelete id:", id);
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
            setNotification("Post deleted successfully");
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
                console.log("data:", data);
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
