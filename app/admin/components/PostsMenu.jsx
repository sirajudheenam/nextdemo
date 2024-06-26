'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
function PostsMenu() {
    const [posts, setPosts] = useState([]);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

    const router = useRouter();
    //fetch data from JSONPlaceholder API
    const fetchJSONData = async function () {
        try {
            const response = await fetch('/api/json/posts');
            if (!response.ok) {
                console.error('Failed to fetch posts from /api/json/posts');
            }
            const data = await response.json();
            setPosts(data);
        } catch (error) {
            console.error('Error fetching posts from JSON:', error);
        }

    };
    const fetchDBPosts = async function () {
        try {
            const response = await fetch('/api/db/posts');
            if (!response.ok) {
                console.error('Failed to fetch posts from /api/db/posts');
            }
            const data = await response.json();
            setPosts(data);
        } catch (error) {
            console.error('Error fetching posts from database:', error);
        }

    };

    const generateRandomPosts = (n) => {
        const randomPosts = [];
        Array.from(Array(n).keys()).forEach((i) => {
            randomPosts.push({
                author: `email_${i}@example.com`,
                title: `Post title ${i}`,
                body: `Post body ${i}`,
                tag: i + 1,
                email: `email_${i}@example.com`
            });
        });
        console.log("posts generated generateRandomPosts : ", randomPosts);
        return randomPosts;
    };

    const seedPosts = async function () {
        try {
            const randomPosts = generateRandomPosts(50);

            console.log("Before seeding Posts", randomPosts);
            const response = await fetch('/api/db/posts', {
                method: 'POST',
                body: JSON.stringify({ posts: randomPosts }),
            });

            if (!response.ok) {
                console.error('Failed to seed database');
            }
            const data = await response.json();
            // console.log("After seeding Posts", data);// Database seeded successfully
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
            const response = await fetch('/api/db/posts', {
                method: 'DELETE'
            });
            if (!response.ok) {
                console.error('Failed to delete posts');
            }
            const data = await response.json();
            console.log("Deleted all posts...");
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
        fetchDBPosts();
    }, []);

    // useEffect(() => {
    //     posts && console.log("Posts: ", posts);
    // }, [posts]);

    return (
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-4 text-center">Post Bulk Data Operations</h1>
            <div className="flex flex-col gap-4 items-center">
                <button
                    onClick={() => fetchDBPosts()}
                    className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-4 rounded transition-colors duration-300 ease-in-out"
                >
                    Fetch DB Posts
                </button>
                <button
                    onClick={() => seedPosts()}
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