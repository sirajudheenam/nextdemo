'use client';
import { useState, useEffect } from "react";

function PostsMenu() {
    const [postBulkData, setPostBulkData] = useState([]);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

    //fetch data from JSONPlaceholder API
    const fetchJSONData = async function () {
        try {
            const response = await fetch('/api/json/posts');
            if (!response.ok) {
                console.error('Failed to fetch posts from /api/json/posts');
            }
            const data = await response.json();
            setPostBulkData(data);
        } catch (error) {
            console.error('Error seeding database:', error);
        }

    };

    const insertBulkPosts = async function () {
        try {
            const response = await fetch('/api/db/posts', {
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

    const deleteAllPosts = () => {
        // Open confirmation dialog
        setIsConfirmationOpen(true);
    };

    const confirmDeleteAllPosts = async () => {
        try {
            // make a fetch call to delete all posts
            const response = await fetch('/api/db/posts');
            if (!response.ok) {
                console.error('Failed to delete posts');
            }
            const data = await response.json();
            console.log("Deleting all posts...");
            // Reset confirmation state
            setIsConfirmationOpen(false);
        } catch (error) {
            console.error('Error deleting posts:', error);
        }
    };

    const cancelDeleteAllPosts = () => {
        // Cancel deletion
        setIsConfirmationOpen(false);
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
                {/* Confirmation Dialog */}
                {isConfirmationOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                            <p className="text-lg font-semibold mb-4">Are you sure you want to delete all posts?</p>
                            <div className="flex justify-center">
                                <button
                                    onClick={confirmDeleteAllPosts}
                                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-4"
                                >
                                    Yes, Delete All
                                </button>
                                <button
                                    onClick={cancelDeleteAllPosts}
                                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}


            </div>
        </div>
    );
};

export default PostsMenu;