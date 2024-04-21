import { useRouter } from "next/navigation";

export default async function SeedButton() {

    // Example frontend code to trigger the seed route

    const seedUsers = async () => {
        // Define an array of dummy user data
        const userData = [
            { email: 'user4@example.com', username: 'user4', image: 'https://example.com/user4.jpg' },
            { email: 'user5@example.com', username: 'user5', image: 'https://example.com/user5.jpg' },
            { email: 'user6@example.com', username: 'user6', image: 'https://example.com/user6.jpg' },
            // Add more dummy user objects as needed
        ];

        const x = [...25];
        console.log(x);

        // x.forEach(id) {
        //     userData.push({
        //         email: `mail${id}@example${id}.com`,
        //         username: `dearuser${id}`,
        //         image: `https://example.com/user${id}.jpg`,
        //     }
        // }
        try {
            const response = await fetch('/api/db/seed', {
                method: 'POST',
                body: JSON.stringify({ userData: userData }),
            });

            if (!response.ok) {
                console.error('Failed to seed database');
            }
            const data = await response.json();
            console.log(data.message); // Database seeded successfully
            if (response.ok) {
                router.push("/admin/users");
            }
        } catch (error) {
            console.error('Error seeding database:', error);
        }
    };
    return (<button
        type="button"
        className="inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
        onClick={() => seedUsers()}
    >
        Seed DummyData
    </button>);

};
