export async function updateUser(userId, formData) {
    console.log("updateUser: ", userId, formData);
    return { appendedUser: `Hello, ${userId} ` };
}
const usersJSONURL = (process.env.NODE_ENV !== 'production')
    ? 'https://nextdemo.technotipstoday.dev/api/json/users' :
    'http://localhost:3000/api/json/users';

const usersDBURL = (process.env.NODE_ENV !== 'production')
    ? 'https://nextdemo.technotipstoday.dev/api/db/users' :
    'http://localhost:3000/api/db/users';

export async function getUsersFromJSON() {
    const res = await fetch(usersJSONURL);
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch users from JSON endpoint');
    }

    return res.json();
}

export async function getUsersFromDB() {
    const res = await fetch(usersDBURL);
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch users from DB');
    }

    return res.json();
}
