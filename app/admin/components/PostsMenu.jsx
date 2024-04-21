'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

function PostsMenu() {
    const [postBulkData, setPostBulkData] = useState([]);
    console.log("bulkPosts on :", postBulkData);

    const router = useRouter();
    const fetchJSONData = async function () {
        try {
            const response = await fetch('/api/json/posts');
            if (!response.ok) {
                console.error('Failed to fetch posts from /api/json/posts');
            }
            const data = await response.json();
            setPostBulkData(data);
            console.log("fetched JSON Data");
            console.log(data);
        } catch (error) {
            console.error('Error seeding database:', error);
        }

    };

    const insertBulkPosts = async function () {
        try {
            const response = await fetch('/api/post', {
                method: 'POST',
                body: JSON.stringify({ postBulkData: postBulkData }),
            });

            if (!response.ok) {
                console.error('Failed to seed database');
            }
            const data = await response.json();
            console.log("After seeding Posts", data);// Database seeded successfully
            if (response.ok) {
                router.push("/admin/posts");
            }
        } catch (error) {
            console.error('Error seeding database:', error);
        }
    };

    const deleteAllPosts = async function () {
        try {
            //TODO:
            const response = await fetch('/api/post/deleteall', {
                method: 'POST',
            });
            if (!response.ok) {
                console.error('Failed to delete posts');
            }
            const data = await response.json();
            console.log("After deleting Posts", data);// Database seeded successfully
            if (response.ok) {
                router.push("/admin/posts");
            }
        } catch (error) {
            console.error('Error deleting posts:', error);
        }
    };

    useEffect(() => {
        fetchJSONData();
    }, []);

    return (
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-4 text-center">Bulk Data Operations</h1>
            <div className="flex flex-col gap-4 items-center">
                <button
                    onClick={() => insertBulkPosts()}
                    className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-4 rounded transition-colors duration-300 ease-in-out"
                >
                    Seed Posts
                </button>
                <button
                    onClick={() => deleteAllPosts()}
                    className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-4 rounded transition-colors duration-300 ease-in-out"
                >
                    Delete All Posts
                </button>
            </div>
        </div>
    );
};

export default PostsMenu;