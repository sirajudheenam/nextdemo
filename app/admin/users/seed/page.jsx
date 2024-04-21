// import SeedButton from "./SeedButton";
'use client';

const SeedPage = () => {

    // Function to fetch random images from Unsplash
    //TODO: Fix with Server Component
    // https://github.com/unsplash/unsplash-js
    // https://stackblitz.com/edit/unsplash-js-javascript?file=src%2Findex.js
    // async function fetchRandomImages(count) {
    //     const response = await fetch(`https://source.unsplash.com/random/${count}`);
    //     return response?.data?.map(image => image.urls.small);
    // }

    // Function to generate random user data
    const generateRandomUsers = async function (count) {
        // const randomImages = await fetchRandomImages(count);
        // console.log("randomImages", randomImages);

        const users = [];
        for (let i = 0; i < count; i++) {
            const user = {
                username: `User ${i + 1}`,
                email: `user${i + 1}@example.com`,
                // image: randomImages && randomImages[i],
                image: 'https://picsum.photos/200'
            };
            users.push(user);
        }
        return users;
    };


    const insertUsers = async function (userData) {
        console.log("userData on insertUsers:", userData);
        try {
            const response = await fetch('/api/users/many', {
                method: 'POST',
                body: JSON.stringify({ userData: userData }),
            });

            if (!response.ok) {
                console.error('Failed to seed database');
            }
            const data = await response.json();
            console.log(data); // Database seeded successfully
            if (response.ok) {
                router.push("/admin/users");
            }
        } catch (error) {
            console.error('Error seeding database:', error);
        }
    };
    const handleSeedUsers = async function () {
        const numberOfUsers = 25;
        const userData = await generateRandomUsers(numberOfUsers);
        await insertUsers(userData);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-bold mb-4">Seed Page</h1>
            <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded transition-colors duration-300 ease-in-out"
                onClick={() => handleSeedUsers()}
            >
                Seed Users
            </button>
        </div>
    );
};

export default SeedPage;