export async function updateUser(userId, formData) {
    console.log("updateUser: ", userId, formData);
    return { appendedUser: `Hello, ${userId} ` };
}

export async function getUsersFromJSON() {
    const res = await fetch('/api/json/users');
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch users from JSON endpoint');
    }

    return res.json();
}

export async function getUsersFromDB() {
    const res = await fetch('/api/db/users');
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch users from DB');
    }

    return res.json();
}
