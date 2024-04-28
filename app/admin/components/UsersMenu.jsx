'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

function UsersMenu() {
    const [users, setUsers] = useState([]);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
    const [isSeedEnabled, setIsSeedEnabled] = useState(true);

    //fetch data from JSONPlaceholder API
    const fetchJSONData = async function () {
        try {
            const response = await fetch('/api/json/users');
            if (!response.ok) {
                console.error('Failed to fetch users from /api/json/users');
            }
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users from JSON:', error);
        }

    };
    const fetchDBUsers = async function () {
        try {
            const response = await fetch('/api/db/users');
            if (!response.ok) {
                console.error('Failed to fetch users from /api/db/users');
            }
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users from database:', error);
        }

    };

    const generateRandomUsers = (n) => {
        const randomUsers = [];
        Array.from(Array(n).keys()).forEach((i) => {
            randomUsers.push({
                email: `user${i}@example.com`,
                username: `user${i}`,
                image: 'https://placekitten.com/200/200'
            });
        });
        console.log("users generated generateRandomUsers : ", randomUsers);
        return randomUsers;
    };

    const seedUsers = async function () {
        if (!isSeedEnabled) {
            console.log("Users already seeded..");
            return;
        }

        try {
            const randomUsers = generateRandomUsers(5);

            console.log("Before seeding Users", randomUsers);
            const response = await fetch('/api/db/users', {
                method: 'POST',
                body: JSON.stringify({ users: randomUsers }),
            });

            if (!response.ok) {
                console.error('Failed to seed database');
            }
            const data = await response.json();
            // console.log("After seeding Users", data);// Database seeded successfully
            if (response.ok) {
                router.push("/admin/users");
            }
        } catch (error) {
            console.error('Error seeding database:', error);
        }
    };

    const deleteAllUsers = () => {
        // Open confirmation dialog
        setIsConfirmationOpen(true);
    };

    const confirmDeleteAllUsers = async () => {
        try {
            // make a fetch call to delete all users
            const response = await fetch('/api/db/users', {
                method: 'DELETE'
            });
            console.log("response: ", response);
            if (!response.ok) {
                console.error('Failed to delete users');
            }
            const data = await response.json();
            console.log("data: of response.json from delete", data);
            // Reset confirmation state
            setIsConfirmationOpen(false);
        } catch (error) {
            console.error('Error deleting users:', error);
        }
    };

    const cancelDeleteAllUsers = () => {
        // Cancel deletion
        setIsConfirmationOpen(false);
    };



    useEffect(() => {
        fetchJSONData();
        fetchDBUsers();
    }, []);

    useEffect(() => {
        users && console.log("Users: ", users);
        if (users.length > 0) {
            setIsSeedEnabled(false);
        }
    }, [users]);

    return (
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-4 text-center">Post Bulk Data Operations</h1>
            <div className="flex flex-col gap-4 items-center">
                <button
                    onClick={() => fetchDBUsers()}
                    className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-4 rounded transition-colors duration-300 ease-in-out"
                >
                    Fetch DB Users
                </button>
                {isSeedEnabled && (<button
                    onClick={() => seedUsers()}
                    className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-4 rounded transition-colors duration-300 ease-in-out"
                >
                    Seed Users
                </button>)}

                <button
                    onClick={() => deleteAllUsers()}
                    className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-4 rounded transition-colors duration-300 ease-in-out"
                >
                    Delete All Users
                </button>
                {/* Confirmation Dialog */}
                {isConfirmationOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                            <p className="text-lg font-semibold mb-4">Are you sure you want to delete all users?</p>
                            <div className="flex justify-center">
                                <button
                                    onClick={confirmDeleteAllUsers}
                                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-4"
                                >
                                    Yes, Delete All
                                </button>
                                <button
                                    onClick={cancelDeleteAllUsers}
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

export default UsersMenu;